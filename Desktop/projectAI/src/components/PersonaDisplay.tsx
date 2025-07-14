import React from 'react';
import { UserPersona, PersonaCharacteristic } from '../types/persona';
import { User, Brain, Heart, MessageCircle, TrendingUp, Calendar, Hash, BarChart3 } from 'lucide-react';

interface PersonaDisplayProps {
  persona: UserPersona;
}

const PersonaSection: React.FC<{
  title: string;
  icon: React.ReactNode;
  characteristics: PersonaCharacteristic[];
  color: string;
}> = ({ title, icon, characteristics, color }) => (
  <div className="mb-6">
    <div className="flex items-center mb-3">
      <div className={`p-2 rounded-lg ${color} mr-3`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    </div>
    <div className="space-y-3">
      {characteristics.map((char, index) => (
        <div key={index} className="bg-gray-50 rounded-lg p-3">
          <div className="flex justify-between items-start mb-1">
            <span className="font-medium text-gray-900">{char.characteristic}</span>
            {char.confidence && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {Math.round(char.confidence * 100)}% confidence
              </span>
            )}
          </div>
          <p className="text-gray-700 mb-2">{char.value}</p>
          {char.evidence && (
            <div className="text-xs text-gray-600 bg-white p-2 rounded border-l-2 border-orange-300">
              <span className="font-medium">Evidence:</span> {char.evidence}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

const PersonaDisplay: React.FC<PersonaDisplayProps> = ({ persona }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg p-6">
        <div className="flex items-center mb-2">
          <User className="w-6 h-6 mr-2" />
          <h2 className="text-xl font-bold">u/{persona.username}</h2>
        </div>
        <p className="text-orange-100 text-sm">{persona.profileUrl}</p>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <BarChart3 className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-900">{persona.metadata.totalPosts}</div>
          <div className="text-sm text-blue-700">Posts</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <MessageCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-900">{persona.metadata.totalComments}</div>
          <div className="text-sm text-green-700">Comments</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <Hash className="w-6 h-6 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-purple-900">{persona.metadata.subreddits.length}</div>
          <div className="text-sm text-purple-700">Subreddits</div>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 text-center">
          <Calendar className="w-6 h-6 text-orange-600 mx-auto mb-2" />
          <div className="text-xs font-bold text-orange-900">{persona.metadata.analysisDate}</div>
          <div className="text-sm text-orange-700">Analyzed</div>
        </div>
      </div>

      {/* Active Subreddits */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">Active Subreddits</h4>
        <div className="flex flex-wrap gap-2">
          {persona.metadata.subreddits.slice(0, 10).map((subreddit, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm border"
            >
              r/{subreddit}
            </span>
          ))}
          {persona.metadata.subreddits.length > 10 && (
            <span className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-sm">
              +{persona.metadata.subreddits.length - 10} more
            </span>
          )}
        </div>
      </div>

      {/* Persona Sections */}
      <div className="space-y-6">
        <PersonaSection
          title="Demographics"
          icon={<User className="w-5 h-5 text-blue-600" />}
          characteristics={persona.demographics}
          color="bg-blue-100"
        />

        <PersonaSection
          title="Interests & Hobbies"
          icon={<Heart className="w-5 h-5 text-red-600" />}
          characteristics={persona.interests}
          color="bg-red-100"
        />

        <PersonaSection
          title="Personality Traits"
          icon={<Brain className="w-5 h-5 text-purple-600" />}
          characteristics={persona.personality}
          color="bg-purple-100"
        />

        <PersonaSection
          title="Behavioral Patterns"
          icon={<TrendingUp className="w-5 h-5 text-green-600" />}
          characteristics={persona.behavior}
          color="bg-green-100"
        />

        <PersonaSection
          title="Communication Style"
          icon={<MessageCircle className="w-5 h-5 text-orange-600" />}
          characteristics={persona.communication}
          color="bg-orange-100"
        />
      </div>
    </div>
  );
};

export default PersonaDisplay;