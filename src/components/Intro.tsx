import React, { useState, useEffect } from 'react';

/**
 * Props interface for Intro component
 */
interface IntroProps {
  onWorkplacesClick?: () => void;
}

/**
 * Intro Component
 * 
 * This component handles the main hero section with typewriter animation.
 * Features:
 * - Blinking cursor
 * - Typewriter effect that types phrases after name
 * - Backspace animation returning to base name
 */
const Intro: React.FC<IntroProps> = ({ onWorkplacesClick }) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const baseName = 'Jules Lye';
  const phrases = [
    'would love to meet you!',
    'loves code and coffee.',
    '- peace & love & code.',
    'builds beautiful websites.',
    'sometimes builds guitar pedals too.',
    'is super keen to connect.',
    'creates exceptional experiences.',
    'lives in Brunswick, Melbourne.'
  ];
  
  useEffect(() => {
    let currentPhraseIndex = 0;
    let timeoutId: NodeJS.Timeout;
    
    const typePhrase = (phrase: string, currentIndex: number = 0) => {
      if (currentIndex <= phrase.length) {
        setDisplayText(baseName + ' ' + phrase.substring(0, currentIndex));
        timeoutId = setTimeout(() => typePhrase(phrase, currentIndex + 1), 80);
      } else {
        // Phrase fully typed, wait 10 seconds
        timeoutId = setTimeout(() => backspacePhrase(phrase, phrase.length), 10000);
      }
    };
    
    const backspacePhrase = (phrase: string, currentIndex: number) => {
      if (currentIndex >= 0) {
        setDisplayText(baseName + ' ' + phrase.substring(0, currentIndex));
        timeoutId = setTimeout(() => backspacePhrase(phrase, currentIndex - 1), 40);
      } else {
        // Back to base name, wait 10 seconds then start next phrase
        setDisplayText(baseName);
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        timeoutId = setTimeout(() => {
          typePhrase(phrases[currentPhraseIndex]);
        }, 10000);
      }
    };
    
    // Initial delay before first phrase
    setDisplayText(baseName);
    timeoutId = setTimeout(() => {
      typePhrase(phrases[0]);
    }, 10000);
    
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="intro mx-auto mb-16 text-left">
      <div className="max-w-[1040px]">
      {/* Title with Typewriter Effect */}
      <div id="jules" className="mb-8 min-h-[60px] md:min-h-[30px]">
        <h1 className="text-2xl font-medium text-jules-primary dark:text-jules-primary-dark leading-tight">
          {displayText}
          <span className="cursor animate-blink">|</span>
        </h1>
      </div>
      
      {/* Tagline */}
      <h1 className="text-2xl font-thin mb-8 leading-relaxed">
        <span className="block text-gray-400">
          Frontend Developer & Designer
        </span>
      </h1>
      
      {/* Main description paragraphs */}
      <div className="space-y-6 mb-8">
        <h2 className="text-xl md:text-2xl font-thin text-jules-primary dark:text-jules-primary-dark leading-relaxed">
          Hi, I'm Jules. For 12 years, I've been crafting exceptional digital experiences at Involved, a digital agency in Collingwood, Melbourne.
        </h2>
        
        <h2 className="text-xl md:text-2xl font-thin text-jules-primary dark:text-jules-primary-dark leading-relaxed">
          From frontend development to web design, I specialise in creating accessible, high-performing websites. I love the intersection of beautiful design and clean code—focusing on both the little details and the bigger picture.
        </h2>
        
        <h2 className="text-xl md:text-2xl font-thin text-jules-primary dark:text-jules-primary-dark leading-relaxed">
          I've worked with amazing brands in tourism, retail, ecommerce, and beyond—from Accor to ANCAP Car Safety. Before digital, I spent 10 years in music retail, which gave me a solid understanding of what businesses need to thrive online.
        </h2>
        
        {/* Final paragraph with link to workplaces */}
        <h2 className="text-xl md:text-2xl font-thin text-jules-primary dark:text-jules-primary-dark leading-relaxed">
          When I'm not coding, you'll find me with my family in Brunswick, playing guitar, sketching, or exploring Melbourne's music scene. Want to know more about my{' '}
          <span 
            className="workplaces underline cursor-pointer hover:text-jules-accent dark:hover:text-jules-accent-dark transition-colors"
            onClick={onWorkplacesClick}
          >
            experience
          </span>
          ?
        </h2>
      </div>
      </div>
    </div>
  );
};

export default Intro; 