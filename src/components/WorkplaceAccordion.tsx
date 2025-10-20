import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerPlus } from '@fortawesome/pro-light-svg-icons';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Workplace } from '../data/workplaces';

/**
 * Props interface for WorkplaceAccordion component
 */
interface WorkplaceAccordionProps {
  workplace: Workplace;
  isOpen: boolean;
  onToggle: () => void;
}

/**
 * WorkplaceAccordion Component
 * 
 * Renders the workplace/studio section with:
 * - Location information and studio details
 * - Expandable gallery of studio images
 * - React Slick carousel for image navigation
 * - Intersection Observer for scroll-based animations
 * 
 * This component is similar to ClientAccordion but specifically
 * designed for showcasing the physical studio spaces.
 */
const WorkplaceAccordion: React.FC<WorkplaceAccordionProps> = ({ workplace, isOpen, onToggle }) => {
  // State to track if the accordion is visible in the viewport
  const [isVisible, setIsVisible] = useState(false);
  
  // Track loaded images
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>({});
  
  // Ref to the accordion DOM element for intersection observer
  const accordionRef = useRef<HTMLDivElement>(null);
  
  // Ref to the Slick slider component
  const sliderRef = useRef<Slider>(null);

  /**
   * Intersection Observer effect
   * Triggers animation when accordion comes into view
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 } // Trigger when 10% of element is visible
    );

    if (accordionRef.current) {
      observer.observe(accordionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  /**
   * Handle image load
   */
  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  /**
   * Navigate to previous slide
   */
  const goToPrev = () => {
    sliderRef.current?.slickPrev();
  };

  /**
   * Navigate to next slide
   */
  const goToNext = () => {
    sliderRef.current?.slickNext();
  };

  /**
   * Slick carousel configuration for studio images
   * Uses fade transition for smooth image changes
   */
  const settings = {
    dots: true,           // Show navigation dots
    infinite: true,       // Loop back to first slide after last
    speed: 500,          // Animation speed in milliseconds
    slidesToShow: 1,     // Show one slide at a time
    slidesToScroll: 1,   // Scroll one slide at a time
    autoplay: false,     // Disable autoplay (user controls)
    arrows: false,       // Hide arrows for cleaner look
    fade: true,          // Use fade transition instead of slide
    cssEase: 'linear',   // Linear easing for smooth fade
    adaptiveHeight: true, // Adjust height based on content
    responsive: [
      {
        breakpoint: 768,  // Mobile breakpoint
        settings: {
          arrows: false   // Keep arrows hidden on mobile
        }
      }
    ]
  };

  return (
    <div 
      ref={accordionRef}
      className={`workplaces-section py-16 px-6x transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-20">
        {/* Section Header */}
        <div className="mb-8 max-w-[1040px]">
          <h2 className="text-xl md:text-2xl font-thin text-jules-primary dark:text-jules-primary-dark mb-4">
            <span className="icon mr-2 -ml-14 mr-8">
              <i className="fal fa-briefcase text-xl md:text-2xl"></i>
            </span>
            {workplace.title}
          </h2>
          <p className="text-lg md:text-2xl font-thin text-gray-500 dark:text-gray-400 mb-14">
            {workplace.subtitle}
          </p>
        </div>

        {/* Current/Main Experience - Always Visible */}
        <div className="work-experience max-w-[1040px]">
          
          {/* Involved Ltd - Main Current Role */}
          <div className="experience-item mb-8">
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-4">
              <h3 className="text-xl md:text-2xl font-medium text-jules-primary dark:text-jules-primary-dark">
                Frontend Web Developer & Designer
              </h3>
              <span className="text-sm md:text-lg font-thin text-gray-500 dark:text-gray-400">
                2013 - Present
              </span>
            </div>
            <h4 className="text-lg md:text-2xl font-thin text-gray-700 dark:text-gray-300 mb-4">
              Involved Ltd | Creative Digital Agency
            </h4>
            <p className="text-lg md:text-2xl font-thin text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              Collingwood, Melbourne | <a href="https://involved.com.au" target="_blank" rel="noopener noreferrer" className="underline hover:text-jules-accent dark:hover:text-jules-accent-dark transition-colors">involved.com.au</a>
            </p>
            <p className="text-lg md:text-2xl font-thin text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              <strong className="font-medium">Select clients:</strong> Accor, ANCAP, Gristmill Productions, Pieces of Eight, The Holistic Ingredient, Outré Gallery
            </p>
            <p className="text-lg md:text-2xl font-thin text-gray-700 dark:text-gray-300 leading-relaxed">
              For over 12 years I have been a key part of Involved, a boutique digital agency in Collingwood, Melbourne. 
              As an experienced Frontend Developer and Designer, my role has spanned multiple areas of the business, from frontend 
              development and UI/UX design, to branding, SEO data strategies, campaign work and client management.
            </p>
            <p className="text-lg md:text-2xl font-thin text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
              I have had the opportunity to work with major clients such as Accor, ANCAP Car Safety and Gristmill. 
              I've also worked on various ecommerce brands, corporate websites, creative projects for film and media 
              clients and not-for-profit organisations. Standout projects include leading the development of The Holistic 
              Ingredient's Shopify ecommerce site, and ANCAP's custom-built CMS platform which delivers a seamless, 
              data-driven user experience.
            </p>
          </div>

          {/* View More Button */}
          <button
            onClick={onToggle}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-sm font-thin transition-colors mb-8"
          >
            {isOpen ? 'View Less' : 'View More Experience'}
          </button>

          {/* Additional Experience - Collapsible */}
          {isOpen && (
            <div className="additional-experience pt-8 border-t border-gray-300 dark:border-gray-700">

              {/* Yoobee - Diploma Tutor */}
              <div className="experience-item mb-12">
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-4">
                    <h3 className="text-xl md:text-2xl font-medium text-jules-primary dark:text-jules-primary-dark">
                      Web Development Diploma Tutor
                    </h3>
                    <span className="text-sm md:text-lg font-thin text-gray-500 dark:text-gray-400">
                      2012 - 2013
                    </span>
                  </div>
                  <h4 className="text-lg md:text-2xl font-thin text-gray-700 dark:text-gray-300 mb-4">
                    Yoobee Technology and Design
                  </h4>
                  <p className="text-lg md:text-2xl font-thin text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    Wellington, New Zealand
                  </p>
                  <p className="text-lg md:text-2xl font-thin text-gray-700 dark:text-gray-300 leading-relaxed">
                    Marked assignments for the one-year Web Diploma, troubleshooting and testing student work. I provided 
                    feedback on more efficient approaches, which deepened my understanding of HTML, CSS, PHP, and MySQL. 
                    I also developed strong time management skills by helping students plan their projects and occasionally 
                    tutored classes of up to 20 when required.
                  </p>
                </div>

              {/* Yoobee - Short Course Tutor */}
              <div className="experience-item mb-12">
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-4">
                    <h3 className="text-xl md:text-2xl font-medium text-jules-primary dark:text-jules-primary-dark">
                      Web Development Short Course Tutor
                    </h3>
                    <span className="text-sm md:text-lg font-thin text-gray-500 dark:text-gray-400">
                      2012 - 2013
                    </span>
                  </div>
                  <h4 className="text-lg md:text-2xl font-thin text-gray-700 dark:text-gray-300 mb-4">
                    Yoobee Technology and Design
                  </h4>
                  <p className="text-lg md:text-2xl font-thin text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    Wellington, New Zealand
                  </p>
                  <p className="text-lg md:text-2xl font-thin text-gray-700 dark:text-gray-300 leading-relaxed">
                    Designed and delivered two-day courses in HTML & CSS or PHP & MySQL. This experience helped me solidify 
                    my understanding of the core concepts and best practices of these languages. I taught classes of up to 
                    ten students, mostly IT and corporate professionals looking to upskill.
                  </p>
                </div>

              {/* Education */}
              <div className="education-section mt-16 pt-8 border-t border-gray-300 dark:border-gray-700">
                  <h3 className="text-2xl md:text-3xl font-medium text-jules-primary dark:text-jules-primary-dark mb-8">
                    Education
                  </h3>
                  
                <div className="education-item mb-8">
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-4">
                      <h4 className="text-xl font-medium text-gray-900 dark:text-white">
                        Diploma in Web Development and Design
                      </h4>
                      <span className="text-sm md:text-lg font-thin text-gray-500 dark:text-gray-400">
                        2010 - 2012
                      </span>
                    </div>
                    <p className="text-lg md:text-2xl font-thin text-gray-700 dark:text-gray-300 mb-2">
                      Yoobee Technology and Design | Wellington, New Zealand
                    </p>
                    <p className="text-lg md:text-2xl font-thin text-gray-600 dark:text-gray-400 leading-relaxed">
                      Awarded the <strong className="font-medium">Webco Interactive Excellence Award</strong> – a national award judged by industry specialists.
                    </p>
                      </div>

                <div className="education-item">
                  <h4 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                    Certificate in Web and Graphic Design
                  </h4>
                    <p className="text-lg md:text-2xl font-thin text-gray-700 dark:text-gray-300">
                    Yoobee Technology and Design | Wellington, New Zealand
                  </p>
                      </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkplaceAccordion; 