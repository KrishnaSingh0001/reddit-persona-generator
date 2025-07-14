import requests
import time
import json
import re
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
from typing import Dict, List, Optional
import logging

class RedditScraper:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
        self.base_url = "https://www.reddit.com"
        
    def extract_username_from_url(self, url: str) -> str:
        """Extract username from Reddit profile URL"""
        pattern = r'/user/([^/]+)'
        match = re.search(pattern, url)
        if match:
            return match.group(1)
        raise ValueError("Invalid Reddit profile URL")
    
    def scrape_user_profile(self, username: str) -> Dict:
        """Scrape user profile information"""
        profile_url = f"{self.base_url}/user/{username}"
        
        try:
            response = self.session.get(profile_url)
            response.raise_for_status()
            
            # Try to get JSON data first (new Reddit)
            json_data = self._extract_json_data(response.text)
            if json_data:
                return self._parse_json_profile(json_data, username)
            
            # Fallback to HTML parsing (old Reddit)
            soup = BeautifulSoup(response.text, 'html.parser')
            return self._parse_html_profile(soup, username)
            
        except Exception as e:
            logging.error(f"Error scraping profile for {username}: {e}")
            return {"username": username, "error": str(e)}
    
    def _extract_json_data(self, html: str) -> Optional[Dict]:
        """Extract JSON data from Reddit's embedded script tags"""
        try:
            # Look for Redux store data
            pattern = r'window\.__r = ({.*?});'
            match = re.search(pattern, html, re.DOTALL)
            if match:
                return json.loads(match.group(1))
        except:
            pass
        return None
    
    def _parse_json_profile(self, data: Dict, username: str) -> Dict:
        """Parse profile data from JSON"""
        profile_info = {
            "username": username,
            "posts": [],
            "comments": [],
            "subreddits": set(),
            "karma": {"post": 0, "comment": 0},
            "account_age": None,
            "profile_description": ""
        }
        
        try:
            # Navigate through Reddit's complex JSON structure
            users = data.get("users", {}).get("models", {})
            user_data = users.get(username, {})
            
            if user_data:
                profile_info["karma"]["post"] = user_data.get("linkKarma", 0)
                profile_info["karma"]["comment"] = user_data.get("commentKarma", 0)
                profile_info["account_age"] = user_data.get("createdUtc")
                profile_info["profile_description"] = user_data.get("subreddit", {}).get("publicDescription", "")
        except Exception as e:
            logging.warning(f"Error parsing JSON profile data: {e}")
        
        return profile_info
    
    def _parse_html_profile(self, soup: BeautifulSoup, username: str) -> Dict:
        """Parse profile data from HTML (fallback method)"""
        profile_info = {
            "username": username,
            "posts": [],
            "comments": [],
            "subreddits": set(),
            "karma": {"post": 0, "comment": 0},
            "account_age": None,
            "profile_description": ""
        }
        
        # Extract karma information
        karma_elements = soup.find_all(text=re.compile(r'\d+\s+karma'))
        for karma_text in karma_elements:
            numbers = re.findall(r'\d+', karma_text)
            if numbers:
                profile_info["karma"]["total"] = int(numbers[0])
        
        return profile_info
    
    def scrape_user_posts(self, username: str, limit: int = 50) -> List[Dict]:
        """Scrape user's posts"""
        posts = []
        posts_url = f"{self.base_url}/user/{username}/submitted.json?limit={limit}"
        
        try:
            response = self.session.get(posts_url)
            if response.status_code == 200:
                data = response.json()
                for post in data.get("data", {}).get("children", []):
                    post_data = post.get("data", {})
                    posts.append({
                        "title": post_data.get("title", ""),
                        "subreddit": post_data.get("subreddit", ""),
                        "score": post_data.get("score", 0),
                        "num_comments": post_data.get("num_comments", 0),
                        "created_utc": post_data.get("created_utc", 0),
                        "selftext": post_data.get("selftext", ""),
                        "url": post_data.get("url", ""),
                        "permalink": post_data.get("permalink", "")
                    })
            time.sleep(1)  # Rate limiting
        except Exception as e:
            logging.error(f"Error scraping posts for {username}: {e}")
        
        return posts
    
    def scrape_user_comments(self, username: str, limit: int = 100) -> List[Dict]:
        """Scrape user's comments"""
        comments = []
        comments_url = f"{self.base_url}/user/{username}/comments.json?limit={limit}"
        
        try:
            response = self.session.get(comments_url)
            if response.status_code == 200:
                data = response.json()
                for comment in data.get("data", {}).get("children", []):
                    comment_data = comment.get("data", {})
                    comments.append({
                        "body": comment_data.get("body", ""),
                        "subreddit": comment_data.get("subreddit", ""),
                        "score": comment_data.get("score", 0),
                        "created_utc": comment_data.get("created_utc", 0),
                        "permalink": comment_data.get("permalink", ""),
                        "link_title": comment_data.get("link_title", "")
                    })
            time.sleep(1)  # Rate limiting
        except Exception as e:
            logging.error(f"Error scraping comments for {username}: {e}")
        
        return comments
    
    def get_complete_user_data(self, profile_url: str) -> Dict:
        """Get complete user data from profile URL"""
        username = self.extract_username_from_url(profile_url)
        
        print(f"Scraping data for user: {username}")
        
        # Get profile info
        profile_data = self.scrape_user_profile(username)
        
        # Get posts and comments
        posts = self.scrape_user_posts(username)
        comments = self.scrape_user_comments(username)
        
        # Combine all data
        complete_data = {
            **profile_data,
            "posts": posts,
            "comments": comments,
            "total_posts": len(posts),
            "total_comments": len(comments)
        }
        
        # Extract subreddits from posts and comments
        subreddits = set()
        for post in posts:
            if post.get("subreddit"):
                subreddits.add(post["subreddit"])
        for comment in comments:
            if comment.get("subreddit"):
                subreddits.add(comment["subreddit"])
        
        complete_data["subreddits"] = list(subreddits)
        complete_data["total_subreddits"] = len(subreddits)
        
        return complete_data