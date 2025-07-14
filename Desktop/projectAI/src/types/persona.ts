export interface PersonaCharacteristic {
  characteristic: string;
  value: string;
  evidence?: string;
  confidence?: number;
}

export interface UserPersona {
  username: string;
  profileUrl: string;
  demographics: PersonaCharacteristic[];
  interests: PersonaCharacteristic[];
  personality: PersonaCharacteristic[];
  behavior: PersonaCharacteristic[];
  communication: PersonaCharacteristic[];
  metadata: {
    totalPosts: number;
    totalComments: number;
    subreddits: string[];
    analysisDate: string;
  };
}

export interface RedditPost {
  title: string;
  content: string;
  subreddit: string;
  score: number;
  created: string;
  url: string;
}

export interface RedditComment {
  content: string;
  subreddit: string;
  score: number;
  created: string;
  context: string;
}

export interface RedditUserData {
  username: string;
  posts: RedditPost[];
  comments: RedditComment[];
  subreddits: string[];
  accountAge?: string;
  karma?: number;
}