import React, { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { UserPersona } from '../types/persona';
import { scrapeRedditUser } from '../services/redditScraper';
import { generatePersona } from '../services/personaAnalyzer';

interface PersonaGeneratorProps {
  onPersonaGenerated: (persona: UserPersona) => void;
  onError: (error: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const PersonaGenerator: React.FC<PersonaGeneratorProps> = ({
  onPersonaGenerated,
  onError,
  isLoading,
  setIsLoading
}) => {
  const [profileUrl, setProfileUrl] = useState('');

  const validateRedditUrl = (url: string): boolean => {
    const redditUserPattern = /^https?:\/\/(www\.)?reddit\.com\/user\/[a-zA-Z0-9_-]+\/?$/;
    return redditUserPattern.test(url);
  };

  const extractUsername = (url: string): string => {
    const match = url.match(/\/user\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profileUrl.trim()) {
      onError('Please enter a Reddit profile URL');
      return;
    }

    if (!validateRedditUrl(profileUrl)) {
      onError('Please enter a valid Reddit user profile URL (e.g., https://www.reddit.com/user/username)');
      return;
    }

    setIsLoading(true);
    
    try {
      const username = extractUsername(profileUrl);
      console.log(`Starting analysis for user: ${username}`);
      
      // Scrape Reddit user data
      const userData = await scrapeRedditUser(profileUrl);
      console.log('User data scraped:', userData);
      
      // Generate persona using AI analysis
      const persona = await generatePersona(userData);
      console.log('Persona generated:', persona);
      
      onPersonaGenerated(persona);
    } catch (error) {
      console.error('Error generating persona:', error);
      onError(error instanceof Error ? error.message : 'Failed to generate persona');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="profileUrl" className="block text-sm font-medium text-gray-700 mb-2">
            Reddit Profile URL
          </label>
          <input
            type="url"
            id="profileUrl"
            value={profileUrl}
            onChange={(e) => setProfileUrl(e.target.value)}
            placeholder="https://www.reddit.com/user/username"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            disabled={isLoading}
          />
          <p className="mt-2 text-sm text-gray-500">
            Enter a Reddit user profile URL to analyze their activity and generate a persona
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading || !profileUrl.trim()}
          className="w-full flex items-center justify-center px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Search className="w-5 h-5 mr-2" />
          {isLoading ? 'Analyzing...' : 'Generate Persona'}
        </button>
      </form>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">How it works:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Scrapes public posts and comments from the Reddit profile</li>
              <li>Analyzes content using AI to identify patterns and characteristics</li>
              <li>Generates a comprehensive user persona with supporting evidence</li>
              <li>Provides downloadable report with detailed analysis</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
          <div className="text-sm text-yellow-800">
            <p className="font-medium mb-1">Example URLs:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>https://www.reddit.com/user/kojied</li>
              <li>https://www.reddit.com/user/Hungry-Move-6603</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonaGenerator;