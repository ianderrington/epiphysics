'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Lightbulb, 
  PenTool, 
  Code, 
  Brain, 
  Users, 
  BookOpen,
  Trophy,
  Rocket,
  Zap,
  Compass,
  Sparkles,
  Activity,
  Heart,
  ArrowRight,
  Map,
  FlaskConical,
  Network
} from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: string;
  url?: string;
  link?: string; // legacy alias
}

interface FeaturesProps {
  features: Feature[];
  title?: string;
  description?: string;
}

export default function Features({ features, title = "What I do", description = "Important focus areas for the future" }: FeaturesProps) {
  // Icon mapping
  const getIconComponent = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'lightbulb': return <Lightbulb className="h-6 w-6" />;
      case 'pen': return <PenTool className="h-6 w-6" />;
      case 'code': return <Code className="h-6 w-6" />;
      case 'brain': return <Brain className="h-6 w-6" />;
      case 'users': return <Users className="h-6 w-6" />;
      case 'book': return <BookOpen className="h-6 w-6" />;
      case 'trophy': return <Trophy className="h-6 w-6" />;
      case 'rocket': return <Rocket className="h-6 w-6" />;
      case 'zap': return <Zap className="h-6 w-6" />;
      case 'compass': return <Compass className="h-6 w-6" />;
      case 'sparkles': return <Sparkles className="h-6 w-6" />;
      case 'activity': return <Activity className="h-6 w-6" />;
      case 'heart': return <Heart className="h-6 w-6" />;
      case 'arrow-right': return <ArrowRight className="h-6 w-6" />;
      case 'map': return <Map className="h-6 w-6" />;
      case 'flask': return <FlaskConical className="h-6 w-6" />;
      case 'network': return <Network className="h-6 w-6" />;
      default: return <Lightbulb className="h-6 w-6" />;
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            {title}
          </h2>
          {description && (
            <p className="text-lg text-gray-600">
              {description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const href = feature.url || feature.link;
            const isExternal = href?.startsWith('http');
            const CardContent = (
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                    {getIconComponent(feature.icon)}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            );

            const cardClasses = "group bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 cursor-pointer block";

            return href ? (
              isExternal ? (
                <a key={index} href={href} target="_blank" rel="noopener noreferrer" className={cardClasses}>
                  {CardContent}
                </a>
              ) : (
                <Link key={index} href={href} className={cardClasses}>
                  {CardContent}
                </Link>
              )
            ) : (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                {CardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 