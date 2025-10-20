import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {
  faSuitcase,
  faRoad,
  faPaperPlane,
  faPalette,
  faGlassCheers,
  faCut,
  faTv,
  faCreditCard,
  faMobileAndroidAlt,
  faGem,
  faRingsWedding,
  faPaintBrushAlt,
  faFish,
  faSpa,
  faBuilding,
  faBiking
} from '@fortawesome/pro-light-svg-icons';
import { Client } from '../data/clients';
import ClientGallery from './ClientGallery';

/**
 * Props interface for ClientAccordion component
 */
interface ClientAccordionProps {
  client: Client;
  isOpen: boolean;
  onToggle: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

/**
 * Icon mapping object
 * Maps client icon names from the data to actual FontAwesome icon components
 * This allows for dynamic icon rendering based on client data
 */
const iconMap: { [key: string]: any } = {
  'fa-suitcase': faSuitcase,
  'fa-road': faRoad,
  'fa-paper-plane': faPaperPlane,
  'fa-palette': faPalette,
  'fa-glass-cheers': faGlassCheers,
  'fa-cut': faCut,
  'fa-tv-retro': faTv,
  'fa-credit-card': faCreditCard,
  'fa-mobile-android-alt': faMobileAndroidAlt,
  'fa-gem': faGem,
  'fa-rings-wedding': faRingsWedding,
  'fa-paint-brush-alt': faPaintBrushAlt,
  'fa-fish': faFish,
  'fa-spa': faSpa,
  'fa-building': faBuilding,
  'fa-biking': faBiking
};

/**
 * ClientAccordion Component
 * 
 * Renders an individual client accordion item with:
 * - Client name and icon
 * - Expandable content with description and gallery
 * - Smooth animations and transitions
 * - Intersection Observer for scroll-based animations
 */
const ClientAccordion: React.FC<ClientAccordionProps> = ({ 
  client, 
  isOpen, 
  onToggle, 
  onNext, 
  onPrev, 
  hasNext, 
  hasPrev 
}) => {
  // State to track if the accordion is visible in the viewport
  const [isVisible, setIsVisible] = useState(false);
  
  // Ref to the accordion DOM element for intersection observer
  const accordionRef = useRef<HTMLDivElement>(null);
  
  // Get the appropriate icon for this client, fallback to faTimes if not found
  const icon = iconMap[client.icon] || faTimes;

  /**
   * Intersection Observer effect
   * Triggers animation when accordion comes into view
   * Uses a small negative rootMargin to trigger slightly before full visibility
   * Also preloads the first image for better performance
   */
  useEffect(() => {
    const currentRef = accordionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Preload the first image when accordion comes into view
          if (client.images && client.images.length > 0) {
            const firstImage = new Image();
            firstImage.src = client.images[0];
          }
          
          // Also preload first video poster if available
          if (client.videos && client.videos.length > 0 && client.videos[0].poster) {
            const firstPoster = new Image();
            firstPoster.src = client.videos[0].poster;
          }
          
          // Stop observing once visible to improve performance
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger 50px before element enters viewport
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [client.images, client.videos]);

  return (
    <div 
      ref={accordionRef}
      className={`client-accordion w-full ${isOpen ? 'open' : ''} ${client.categories?.join(' ') || ''} transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="wrapper mx-auto">
        <div className={`item-container w-full transition-colors duration-300 ${
              isOpen ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}>
          {/* Accordion Trigger Button */}
          <button 
            className={`js-accordion-trigger w-full text-left py-4 transition-colors border-t border-gray-200 dark:border-gray-700`}
            onClick={onToggle}
          >
            <div className="list flex items-center justify-between max-w-[1600px] px-20 py-2 mx-auto">
              {/* Client Info (Icon + Name) */}
              <div className="flex items-center">
                <span className="icon">
                  <FontAwesomeIcon icon={icon} className="text-gray-600 text-xl md:text-2xl -ml-14" />
                </span>
                <span className="client-name font-thin text-xl md:text-2xl ml-0">{client.name}</span>
              </div>
              
              {/* Right side: Navigation buttons and Close icon */}
              <div className="flex items-center gap-3">
                {/* Navigation Pills (only show when accordion is open) */}
                {isOpen && (
                  <>
                    {hasPrev && onPrev && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onPrev();
                        }}
                        className="hidden md:inline-block px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-sm font-thin transition-colors"
                      >
                        Previous Client
                      </button>
                    )}
                    
                    {hasNext && onNext && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNext();
                        }}
                        className="hidden md:inline-block px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-sm font-thin transition-colors"
                      >
                        Next Client
                      </button>
                    )}
                  </>
                )}
                
              {/* Toggle Icon (Rotating X) */}
              <span className="close">
                <FontAwesomeIcon 
                  icon={faTimes} 
                  className={`text-gray-400 transition-transform duration-300 text-xl ${
                    isOpen ? 'rotate-0' : 'rotate-45'
                  }`}
                />
              </span>
              </div>
            </div>
          </button>
          
          {/* Expandable Content */}
          {isOpen && (
            <div className="client-info py-4 max-w-[1600px] px-0 md:px-20 mx-auto">
              {/* Client Description */}
              <div className="client-intro mb-6 text-left max-w-[1000px]">
                <p className="text-gray-700 dark:text-white leading-relaxed text-lg md:text-2xl font-thin px-6 md:px-0">
                  {client.description}
                  {/* Website link if available */}
                  {client.website && (
                    <>
                      {' '}
                      <a 
                        href={`https://${client.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-jules-primary hover:text-jules-accent dark:text-jules-primary-dark dark:hover:text-jules-accent-dark underline transition-colors"
                      >
                        {client.website}
                      </a>
                    </>
                  )}
                </p>
                
                {/* Credit information if available */}
                {client.credit && (
                  <p className="text-lg md:text-2xl font-thin text-gray-500 mt-2 px-6 md:px-0">
                    {client.credit}
                  </p>
                )}
              </div>
              
              {/* Client Gallery */}
              <div className="client-gallery w-full">
                <ClientGallery client={client} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientAccordion; 