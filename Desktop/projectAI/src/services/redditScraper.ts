import { RedditUserData, RedditPost, RedditComment } from '../types/persona';

// Mock Reddit API responses for demonstration
const mockUserData: { [key: string]: RedditUserData } = {
  'kojied': {
    username: 'kojied',
    posts: [
      {
        title: "Just finished my first marathon!",
        content: "After 6 months of training, I finally completed my first marathon in 4:15. The feeling is incredible! Started running during the pandemic as a way to stay active and it became my passion.",
        subreddit: 'running',
        score: 245,
        created: '2024-01-15',
        url: 'https://reddit.com/r/running/post1'
      },
      {
        title: "Best budget gaming setup for 2024?",
        content: "Looking to upgrade my gaming setup on a budget. Currently have a GTX 1060 and wondering if I should upgrade GPU first or get a new monitor. Mainly play FPS games and some RPGs.",
        subreddit: 'buildapc',
        score: 89,
        created: '2024-01-10',
        url: 'https://reddit.com/r/buildapc/post2'
      },
      {
        title: "Homemade pizza attempt #47",
        content: "Still trying to perfect my pizza dough recipe. This time I tried a 72-hour cold fermentation and the results were much better! The crust had great flavor and texture.",
        subreddit: 'Pizza',
        score: 156,
        created: '2024-01-08',
        url: 'https://reddit.com/r/Pizza/post3'
      }
    ],
    comments: [
      {
        content: "I had the same issue with my build. Make sure your PSU can handle the new GPU before upgrading. I learned this the hard way!",
        subreddit: 'buildapc',
        score: 23,
        created: '2024-01-12',
        context: 'GPU upgrade discussion'
      },
      {
        content: "The key is really in the hydration level of your dough. I've found 65-70% hydration works best for home ovens. Also, try adding a bit of olive oil for better texture.",
        subreddit: 'Pizza',
        score: 45,
        created: '2024-01-09',
        context: 'Pizza dough tips'
      },
      {
        content: "Congrats on the marathon! I'm training for my first half marathon right now. Any tips for dealing with knee pain during long runs?",
        subreddit: 'running',
        score: 12,
        created: '2024-01-16',
        context: 'Marathon training discussion'
      },
      {
        content: "This game has been consuming my life for the past month. The story is incredible and the graphics are stunning even on my older setup.",
        subreddit: 'gaming',
        score: 8,
        created: '2024-01-14',
        context: 'Game review discussion'
      }
    ],
    subreddits: ['running', 'buildapc', 'Pizza', 'gaming', 'fitness', 'cooking'],
    accountAge: '3 years',
    karma: 2847
  },
  'Hungry-Move-6603': {
    username: 'Hungry-Move-6603',
    posts: [
      {
        title: "Finally got my dream job in data science!",
        content: "After 8 months of job searching and countless interviews, I finally landed a data scientist position at a tech startup. The interview process was intense but worth it. For anyone struggling with the job search, don't give up!",
        subreddit: 'datascience',
        score: 342,
        created: '2024-01-20',
        url: 'https://reddit.com/r/datascience/post1'
      },
      {
        title: "My cat's reaction to the new automatic feeder",
        content: "Bought an automatic feeder thinking it would make feeding easier. My cat just sits next to it all day waiting for food to appear. I think I've created a monster.",
        subreddit: 'cats',
        score: 1247,
        created: '2024-01-18',
        url: 'https://reddit.com/r/cats/post2'
      },
      {
        title: "Best Python libraries for time series analysis?",
        content: "Working on a project involving stock price prediction and looking for recommendations on Python libraries. Currently using pandas and numpy but wondering if there are better specialized tools.",
        subreddit: 'Python',
        score: 78,
        created: '2024-01-15',
        url: 'https://reddit.com/r/Python/post3'
      }
    ],
    comments: [
      {
        content: "I use Prophet for most of my time series work. It's really good at handling seasonality and holidays. ARIMA is also solid for more traditional approaches.",
        subreddit: 'MachineLearning',
        score: 34,
        created: '2024-01-17',
        context: 'Time series analysis discussion'
      },
      {
        content: "My cat does the exact same thing! I think they're just fascinated by the mechanical sounds. Mine also tries to 'help' by pawing at the dispenser.",
        subreddit: 'cats',
        score: 67,
        created: '2024-01-19',
        context: 'Cat behavior discussion'
      },
      {
        content: "The key to data science interviews is practicing coding problems and being able to explain your thought process clearly. Also, have real projects to show, not just coursework.",
        subreddit: 'cscareerquestions',
        score: 89,
        created: '2024-01-21',
        context: 'Job interview advice'
      },
      {
        content: "I've been learning React for the past few months and it's been a game changer for my data visualization projects. The component-based approach makes everything so much cleaner.",
        subreddit: 'webdev',
        score: 15,
        created: '2024-01-16',
        context: 'Web development discussion'
      }
    ],
    subreddits: ['datascience', 'cats', 'Python', 'MachineLearning', 'cscareerquestions', 'webdev', 'programming'],
    accountAge: '2 years',
    karma: 4521
  }
};

export const scrapeRedditUser = async (profileUrl: string): Promise<RedditUserData> => {
  // Extract username from URL
  const usernameMatch = profileUrl.match(/\/user\/([a-zA-Z0-9_-]+)/);
  if (!usernameMatch) {
    throw new Error('Invalid Reddit profile URL');
  }
  
  const username = usernameMatch[1];
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Check if we have mock data for this user
  if (mockUserData[username]) {
    return mockUserData[username];
  }
  
  // For unknown users, generate some basic mock data
  return {
    username,
    posts: [
      {
        title: "Sample post from user activity",
        content: "This is a sample post showing user engagement patterns and interests.",
        subreddit: 'general',
        score: 10,
        created: '2024-01-01',
        url: `https://reddit.com/r/general/sample`
      }
    ],
    comments: [
      {
        content: "Sample comment showing communication style and engagement.",
        subreddit: 'general',
        score: 5,
        created: '2024-01-01',
        context: 'General discussion'
      }
    ],
    subreddits: ['general'],
    accountAge: '1 year',
    karma: 100
  };
};