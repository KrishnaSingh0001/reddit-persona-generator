import { RedditUserData, UserPersona, PersonaCharacteristic } from '../types/persona';

// Simulated AI analysis - in a real implementation, this would call an LLM API
export const generatePersona = async (userData: RedditUserData): Promise<UserPersona> => {
  // Simulate AI processing time
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  const { username, posts, comments, subreddits } = userData;
  
  // Analyze content to generate persona characteristics
  const demographics = analyzeDemographics(posts, comments, subreddits);
  const interests = analyzeInterests(posts, comments, subreddits);
  const personality = analyzePersonality(posts, comments);
  const behavior = analyzeBehavior(posts, comments, subreddits);
  const communication = analyzeCommunication(posts, comments);
  
  return {
    username,
    profileUrl: `https://www.reddit.com/user/${username}`,
    demographics,
    interests,
    personality,
    behavior,
    communication,
    metadata: {
      totalPosts: posts.length,
      totalComments: comments.length,
      subreddits,
      analysisDate: new Date().toLocaleDateString()
    }
  };
};

const analyzeDemographics = (posts: any[], comments: any[], subreddits: string[]): PersonaCharacteristic[] => {
  const characteristics: PersonaCharacteristic[] = [];
  
  // Age estimation based on interests and language patterns
  if (subreddits.includes('college') || subreddits.includes('university')) {
    characteristics.push({
      characteristic: 'Age Range',
      value: '18-25 years old',
      evidence: 'Active in college/university related subreddits',
      confidence: 0.7
    });
  } else if (subreddits.includes('cscareerquestions') || subreddits.includes('datascience')) {
    characteristics.push({
      characteristic: 'Age Range',
      value: '25-35 years old',
      evidence: 'Professional career-focused discussions and job searching activity',
      confidence: 0.8
    });
  } else {
    characteristics.push({
      characteristic: 'Age Range',
      value: '25-40 years old',
      evidence: 'General activity patterns and interests suggest working-age adult',
      confidence: 0.6
    });
  }
  
  // Location hints
  const locationHints = posts.concat(comments).map(item => item.content || item.title || '').join(' ');
  if (locationHints.includes('college') || locationHints.includes('university')) {
    characteristics.push({
      characteristic: 'Education Level',
      value: 'College/University level',
      evidence: 'References to academic institutions and technical discussions',
      confidence: 0.7
    });
  }
  
  // Tech background
  if (subreddits.some(sub => ['programming', 'Python', 'datascience', 'MachineLearning', 'buildapc'].includes(sub))) {
    characteristics.push({
      characteristic: 'Professional Background',
      value: 'Technology/Engineering field',
      evidence: 'Active participation in technical subreddits and programming discussions',
      confidence: 0.9
    });
  }
  
  return characteristics;
};

const analyzeInterests = (posts: any[], comments: any[], subreddits: string[]): PersonaCharacteristic[] => {
  const characteristics: PersonaCharacteristic[] = [];
  
  // Gaming interests
  if (subreddits.includes('gaming') || subreddits.includes('buildapc')) {
    characteristics.push({
      characteristic: 'Gaming',
      value: 'PC Gaming enthusiast',
      evidence: 'Posts about gaming setups and hardware discussions',
      confidence: 0.8
    });
  }
  
  // Fitness/Health
  if (subreddits.includes('running') || subreddits.includes('fitness')) {
    characteristics.push({
      characteristic: 'Fitness & Health',
      value: 'Running and endurance sports',
      evidence: 'Marathon completion posts and fitness-related discussions',
      confidence: 0.9
    });
  }
  
  // Cooking
  if (subreddits.includes('Pizza') || subreddits.includes('cooking')) {
    characteristics.push({
      characteristic: 'Culinary Interests',
      value: 'Home cooking and baking enthusiast',
      evidence: 'Detailed posts about pizza making and recipe experimentation',
      confidence: 0.8
    });
  }
  
  // Pets
  if (subreddits.includes('cats') || subreddits.includes('dogs')) {
    characteristics.push({
      characteristic: 'Pet Ownership',
      value: 'Cat owner and animal lover',
      evidence: 'Posts about pet behavior and care',
      confidence: 0.9
    });
  }
  
  // Technology
  if (subreddits.includes('Python') || subreddits.includes('datascience')) {
    characteristics.push({
      characteristic: 'Technology',
      value: 'Data science and programming',
      evidence: 'Technical discussions about Python libraries and data analysis',
      confidence: 0.9
    });
  }
  
  return characteristics;
};

const analyzePersonality = (posts: any[], comments: any[]): PersonaCharacteristic[] => {
  const characteristics: PersonaCharacteristic[] = [];
  
  const allContent = posts.concat(comments).map(item => item.content || item.title || '').join(' ').toLowerCase();
  
  // Helpfulness
  if (allContent.includes('help') || allContent.includes('tip') || allContent.includes('advice')) {
    characteristics.push({
      characteristic: 'Helpfulness',
      value: 'Highly helpful and supportive',
      evidence: 'Frequently offers advice and tips to other users',
      confidence: 0.8
    });
  }
  
  // Persistence
  if (allContent.includes('training') || allContent.includes('practice') || allContent.includes('months')) {
    characteristics.push({
      characteristic: 'Persistence',
      value: 'Goal-oriented and persistent',
      evidence: 'Long-term commitment to training and skill development',
      confidence: 0.8
    });
  }
  
  // Curiosity
  if (allContent.includes('wondering') || allContent.includes('question') || allContent.includes('best')) {
    characteristics.push({
      characteristic: 'Curiosity',
      value: 'Inquisitive and eager to learn',
      evidence: 'Frequently asks questions and seeks recommendations',
      confidence: 0.7
    });
  }
  
  // Detail-oriented
  if (allContent.includes('recipe') || allContent.includes('setup') || allContent.includes('process')) {
    characteristics.push({
      characteristic: 'Attention to Detail',
      value: 'Methodical and detail-oriented',
      evidence: 'Detailed descriptions of processes and methodical approach to hobbies',
      confidence: 0.8
    });
  }
  
  return characteristics;
};

const analyzeBehavior = (posts: any[], comments: any[], subreddits: string[]): PersonaCharacteristic[] => {
  const characteristics: PersonaCharacteristic[] = [];
  
  // Posting frequency
  characteristics.push({
    characteristic: 'Activity Level',
    value: 'Moderately active user',
    evidence: `${posts.length} posts and ${comments.length} comments analyzed`,
    confidence: 0.9
  });
  
  // Community engagement
  if (comments.length > posts.length) {
    characteristics.push({
      characteristic: 'Engagement Style',
      value: 'More likely to comment than post',
      evidence: 'Higher comment-to-post ratio suggests preference for discussion over content creation',
      confidence: 0.8
    });
  }
  
  // Subreddit diversity
  characteristics.push({
    characteristic: 'Interest Diversity',
    value: subreddits.length > 5 ? 'Diverse interests' : 'Focused interests',
    evidence: `Active in ${subreddits.length} different subreddits`,
    confidence: 0.9
  });
  
  // Quality over quantity
  const avgScore = posts.reduce((sum, post) => sum + post.score, 0) / posts.length;
  if (avgScore > 50) {
    characteristics.push({
      characteristic: 'Content Quality',
      value: 'Creates high-quality, engaging content',
      evidence: `Average post score of ${Math.round(avgScore)} indicates good community reception`,
      confidence: 0.8
    });
  }
  
  return characteristics;
};

const analyzeCommunication = (posts: any[], comments: any[]): PersonaCharacteristic[] => {
  const characteristics: PersonaCharacteristic[] = [];
  
  const allContent = posts.concat(comments).map(item => item.content || item.title || '').join(' ');
  
  // Tone analysis
  if (allContent.includes('!') && allContent.includes('incredible') || allContent.includes('amazing')) {
    characteristics.push({
      characteristic: 'Tone',
      value: 'Enthusiastic and positive',
      evidence: 'Uses exclamation points and positive language frequently',
      confidence: 0.8
    });
  }
  
  // Technical communication
  if (allContent.includes('GPU') || allContent.includes('library') || allContent.includes('algorithm')) {
    characteristics.push({
      characteristic: 'Technical Communication',
      value: 'Comfortable with technical terminology',
      evidence: 'Uses technical terms and discusses complex topics clearly',
      confidence: 0.9
    });
  }
  
  // Storytelling
  if (posts.some(post => (post.content || '').length > 200)) {
    characteristics.push({
      characteristic: 'Communication Style',
      value: 'Detailed storyteller',
      evidence: 'Writes comprehensive posts with context and background information',
      confidence: 0.8
    });
  }
  
  // Community interaction
  if (comments.some(comment => comment.content.includes('same') || comment.content.includes('agree'))) {
    characteristics.push({
      characteristic: 'Social Interaction',
      value: 'Relates well to others and builds on conversations',
      evidence: 'Shows empathy and connection in responses to other users',
      confidence: 0.7
    });
  }
  
  return characteristics;
};