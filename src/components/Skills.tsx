import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPalette,
  faCode,
  faUsers,
  faPenFancy,
  faChartLine,
  faLightbulb,
  faMobileAndroidAlt,
  faDesktop
} from '@fortawesome/pro-light-svg-icons';

/**
 * Skill interface defining the structure of skill data
 */
export interface Skill {
  name: string;
  icon: any;
  level: number; // 1-100 for visual bar
  description?: string;
}

/**
 * Props interface for Skills component
 */
interface SkillsProps {
  title?: string;
  subtitle?: string;
  skills?: Skill[];
}

/**
 * Default skills data
 * Can be overridden via props
 */
const defaultSkills: Skill[] = [
  {
    name: 'UI/UX Design',
    icon: faPalette,
    level: 95,
    description: 'Creating intuitive and beautiful user experiences'
  },
  {
    name: 'Front-End Development',
    icon: faCode,
    level: 90,
    description: 'React, TypeScript, modern web technologies'
  },
  {
    name: 'Responsive Design',
    icon: faMobileAndroidAlt,
    level: 95,
    description: 'Mobile-first, cross-platform solutions'
  },
  {
    name: 'Web Development',
    icon: faDesktop,
    level: 90,
    description: 'Full-stack web application development'
  },
  {
    name: 'Creative Direction',
    icon: faLightbulb,
    level: 85,
    description: 'Leading creative projects from concept to completion'
  },
  {
    name: 'Design & Creative Suite',
    icon: faPalette,
    level: 90,
    description: 'Adobe Photoshop, XD, Illustrator, and Canva'
  },
  {
    name: 'Content Strategy',
    icon: faPenFancy,
    level: 85,
    description: 'Crafting compelling narratives and messaging'
  },
  {
    name: 'Analytics & Strategy',
    icon: faChartLine,
    level: 80,
    description: 'Data-driven decision making'
  }
];

/**
 * Skills Component
 * 
 * A visually engaging skills showcase with:
 * - Icon-based skill cards
 * - Animated progress bars
 * - Hover effects and descriptions
 * - Intersection observer for scroll-based animations
 */
const Skills: React.FC<SkillsProps> = ({ 
  title = 'Skills & Expertise',
  subtitle = 'A blend of creative and technical capabilities',
  skills = defaultSkills 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  /**
   * Intersection Observer effect
   * Triggers animation when skills section comes into view
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="skills-section py-16 px-6x"
    >
      <div className="max-w-[1600px] mx-auto px-20 md:px-20">
        {/* Section Header - matching accordion style */}
        <div className="mb-8 max-w-[1040px]">
          <h2 className="text-xl md:text-2xl font-thin text-jules-primary dark:text-jules-primary-dark mb-4">
            <span className="icon mr-2 -ml-14 mr-9">
              <i className="fal fa-lightbulb text-xl md:text-2xl"></i>
            </span>
            {title}
          </h2>
          <p className="text-lg md:text-2xl font-thin text-gray-500 dark:text-gray-400">
            {subtitle}
          </p>
        </div>

        {/* Skills Grid - Full Width, 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className={`skill-item flex flex-col h-full pr-14 transition-all duration-500 ease-out
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{
                transitionDelay: `${index * 100}ms`
              }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {/* Skill Name with Icon (matching accordion style) */}
              <div className="flex items-center mb-4">
                <span className="icon mr-2 -ml-14 mr-8">
                  <FontAwesomeIcon 
                    icon={skill.icon} 
                    className={`text-gray-600 dark:text-gray-500 text-xl md:text-2xl transition-transform duration-300 
                      ${hoveredSkill === skill.name ? 'scale-110' : 'scale-100'}`}
                  />
                </span>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  {skill.name}
                </h3>
              </div>

              {/* Skill Description */}
              {skill.description && (
                <p className="text-lg font-thin text-gray-600 dark:text-gray-400 mb-3 flex-grow">
                  {skill.description}
                </p>
              )}

              {/* Skill Level Dots - Pinned to bottom */}
              <div className="flex gap-2 mt-auto">
                {Array.from({ length: 10 }).map((_, dotIndex) => {
                  const threshold = (dotIndex + 1) * 10;
                  const isFilled = skill.level >= threshold;
                  return (
                    <div
                      key={dotIndex}
                      className={`w-2 h-2 rounded-full transition-all duration-500 ease-out
                        ${isFilled 
                          ? 'bg-jules-primary dark:bg-jules-primary-dark' 
                          : 'bg-gray-200 dark:bg-gray-700'
                        }
                        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                      style={{
                        transitionDelay: `${index * 100 + 300 + (dotIndex * 50)}ms`
                      }}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        </div>
        <div className="max-w-[1600px] mx-auto px-5 md:px-20">

        {/* Optional: Skills Summary Stats */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          <div className="stat-card">
            <div className="text-4xl md:text-6xl font-thin text-jules-primary dark:text-jules-primary-dark mb-2">
              12+
            </div>
            <div className="text-lg font-thin text-gray-600 dark:text-gray-400">
              Years Experience
            </div>
          </div>
          <div className="stat-card">
            <div className="text-4xl md:text-6xl font-thin text-jules-primary dark:text-jules-primary-dark mb-2">
              50+
            </div>
            <div className="text-lg font-thin text-gray-600 dark:text-gray-400">
              Projects Completed
            </div>
          </div>
          <div className="stat-card">
            <div className="text-4xl md:text-6xl font-thin text-jules-primary dark:text-jules-primary-dark mb-2">
              15+
            </div>
            <div className="text-lg font-thin text-gray-600 dark:text-gray-400">
              Long Term Clients
            </div>
          </div>
          <div className="stat-card">
            <div className="text-4xl md:text-6xl font-thin text-jules-primary dark:text-jules-primary-dark mb-2">
              20+
            </div>
            <div className="text-lg font-thin text-gray-600 dark:text-gray-400">
              Technologies Mastered
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;

