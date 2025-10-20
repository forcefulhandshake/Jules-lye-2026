import React, { useState, useRef } from 'react';
import './App.css';
import Intro from './components/Intro';
import Skills from './components/Skills';
import ClientAccordion from './components/ClientAccordion';
import WorkplaceAccordion from './components/WorkplaceAccordion';
import { clients } from './data/clients';
import { workplaces } from './data/workplaces';

/**
 * Main App Component
 * 
 * This is the root component that manages the overall layout and state
 * for my personal website. It handles:
 * - Accordion state management (only one client accordion open at a time)
 * - Smooth scrolling to opened accordions
 * - Rendering all major sections (Intro, Clients, Workplaces, Contact)
 */
function App() {
  // State to track which client accordion is currently open
  // Only one accordion can be open at a time for better UX
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);
  
  // State to track if the workplace accordion is open
  const [openWorkplaceAccordion, setOpenWorkplaceAccordion] = useState<boolean>(false);
  
  // Refs to store DOM elements for each client accordion
  // Used for smooth scrolling when accordions are opened
  const accordionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  
  // Ref for the workplace accordion section
  const workplaceAccordionRef = useRef<HTMLDivElement | null>(null);

  /**
   * Handles opening/closing client accordions
   * @param clientId - The ID of the client accordion to toggle
   */
  const handleAccordionToggle = (clientId: string) => {
    if (openAccordionId === clientId) {
      // If clicking the same accordion, close it
      setOpenAccordionId(null);
    } else {
      // If clicking a different accordion, close the current one and open the new one
      setOpenAccordionId(clientId);
      
      // Smooth scroll to the newly opened accordion after a brief delay
      // This allows the accordion to fully open before scrolling
      setTimeout(() => {
        const accordionElement = accordionRefs.current[clientId];
        if (accordionElement) {
          accordionElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
          });
        }
      }, 100);
    }
  };

  /**
   * Navigate to next accordion
   */
  const handleNextAccordion = () => {
    if (!openAccordionId) return;
    
    const currentIndex = clients.findIndex(c => c.id === openAccordionId);
    if (currentIndex < clients.length - 1) {
      handleAccordionToggle(clients[currentIndex + 1].id);
    }
  };

  /**
   * Navigate to previous accordion
   */
  const handlePrevAccordion = () => {
    if (!openAccordionId) return;
    
    const currentIndex = clients.findIndex(c => c.id === openAccordionId);
    if (currentIndex > 0) {
      handleAccordionToggle(clients[currentIndex - 1].id);
    }
  };

  /**
   * Handles scrolling to and optionally opening the experience section
   */
  const handleWorkplaceAccordionToggle = () => {
    // Smooth scroll to the experience section
    if (workplaceAccordionRef.current) {
      workplaceAccordionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
    
    // Don't auto-open anymore, let user control with the button
    // Just scroll to the section
  };

  return (
    <div className="App min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Intro Section with wrapper */}
      {/* contact-section mt-16 text-left wrapper mx-auto px-20 py-40 max-w-[1600px] */}
      <div className="wrapper mx-auto px-20 pt-16 max-w-[1600px]">
        <Intro onWorkplacesClick={handleWorkplaceAccordionToggle} />
      </div>
      
      {/* Skills Section */}
      <Skills />
      
      {/* Clients/Portfolio Section - Full Width */}
      <div className="clients-section py-16">
        <div className="max-w-[1600px] mx-auto px-20 mb-8">
          <div className="max-w-[1040px]">
            <h2 className="text-xl md:text-2xl font-thin text-jules-primary dark:text-jules-primary-dark mb-4">
              <span className="icon mr-2 -ml-14 mr-8">
                <i className="fal fa-briefcase text-xl md:text-2xl"></i>
              </span>
              Selected Work.
            </h2>
            <p className="text-lg md:text-2xl font-thin text-gray-500 dark:text-gray-400 mb-14">
              A showcase of projects and clients I've had the pleasure of working with over the years.
            </p>
          </div>
        </div>
        
        {/* Render all client accordions - Full Width */}
        <div className="clients-list">
          {clients.map((client, index) => (
            <div
              key={client.id}
              ref={(el) => {
                // Store ref for smooth scrolling
                accordionRefs.current[client.id] = el;
              }}
              style={{
                // Stagger animation delay for each accordion
                animationDelay: `${index * 100}ms`
              }}
            >
              <ClientAccordion
                client={client}
                isOpen={openAccordionId === client.id}
                onToggle={() => handleAccordionToggle(client.id)}
                onNext={handleNextAccordion}
                onPrev={handlePrevAccordion}
                hasNext={index < clients.length - 1}
                hasPrev={index > 0}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Additional clients mention section with wrapper */}
      <div className="intro-footer mt-16 text-left px-6x py-8">
          <h3 className="text-xl md:text-2xl font-thin text-jules-primary dark:text-jules-primary-dark mb-4 max-w-[1600px] px-20 mx-auto">
          <span className="icon mr-2 -ml-14 mr-8">
            <i className="fal fa-briefcase text-xl md:text-2xl"></i>
          </span>
          Throughout my career I've also had the pleasure of working with
          <br /><br />
          <span className="sub text-lg md:text-2xl text-gray-600 dark:text-gray-400 max-w-[1040px] inline-block">
            ABC Television, Australian Cycling Road Safety, AusRAP, iRap, Kath & Kim, Lucy Folk, Mitchellake, Medibank, RACV, RACQ, Realestate.com.au, World Vision and many more amazing clients.
          </span>
        </h3>
        <h3 className="text-lg md:text-2xl font-thin text-gray-600 dark:text-gray-400 max-w-[1600px] px-20 mx-auto">
          <span className="sub">Grateful for every collaboration.</span>
        </h3>
      </div>
      
      {/* Experience Section - Full Width */}
      <div ref={workplaceAccordionRef}>
        <WorkplaceAccordion
          workplace={workplaces}
          isOpen={openWorkplaceAccordion}
          onToggle={() => setOpenWorkplaceAccordion(!openWorkplaceAccordion)}
        />
      </div>
      
      {/* Contact Information Section with wrapper */}
      <div className="contact-section mt-16 text-left wrapper mx-auto px-20 py-20 max-w-[1600px]">
        <h2 className="text-xl md:text-3xl font-medium text-jules-primary dark:text-jules-primary-dark mb-8">
          Let's Connect
        </h2>
        <h3 className="text-lg md:text-2xl font-thin text-jules-primary dark:text-jules-primary-dark mb-4">
          <a href="tel:+61450677657" className="hover:text-jules-accent dark:hover:text-jules-accent-dark transition-colors">
            +61 (0) 450 677 657
          </a>
          <br />
          <a href="mailto:hello@juleslye.com" className="hover:text-jules-accent dark:hover:text-jules-accent-dark transition-colors">
            hello@juleslye.com
          </a>
          <br />
          <a href="https://juleslye.com" target="_blank" rel="noopener noreferrer" className="hover:text-jules-accent dark:hover:text-jules-accent-dark transition-colors">
            juleslye.com
          </a>
          <br />
          <a href="https://linkedin.com/in/juleslye" target="_blank" rel="noopener noreferrer" className="hover:text-jules-accent dark:hover:text-jules-accent-dark transition-colors">
            linkedin.com/in/juleslye
          </a>
        </h3>
        <h3 className="text-lg md:text-2xl font-thin text-gray-600 dark:text-gray-400 mb-2 mt-8">
          <span className="sub">Brunswick, Melbourne</span>
          <br />
          <span className="sub">Victoria, Australia</span>
        </h3>
        <h3 className="text-lg md:text-2xl font-thin text-gray-600 dark:text-gray-400 mt-8">
          <span className="sub">Available for freelance projects and full-time opportunities.</span>
        </h3>
      </div>
    </div>
  );
}

export default App;
