/**
 * Workplace Data Structure and Interfaces
 * 
 * This file contains the workplace/studio information for the Involved website.
 * It defines the structure for showcasing the physical studio spaces where
 * the team works.
 */

/**
 * Workplace interface defining the structure of workplace data
 */
export interface Workplace {
  id: string;        // Unique identifier for the workplace
  title: string;     // Main title (e.g., "Workplaces.")
  subtitle: string;  // Description of the workplace locations
  images: string[];  // Array of studio image file paths
}

/**
 * Workplace data object containing Jules's work experience
 * 
 * This object contains:
 * - Title and subtitle describing work experience
 * - Images showcasing the workplaces
 * 
 * Work Experience:
 * - Involved (2013 - Present): Frontend Web Developer & Designer
 * - Yoobee Technology and Design (2012 - 2013): Web Development Tutor
 */
export const workplaces: Workplace = {
  id: 'experience',
  title: 'Experience.',
  subtitle: 'Over 12 years crafting digital experiences in Melbourne, with roots in education and a passion for sharing knowledge.',
  images: [
    '/images/studio/bedford.jpg',    // Involved studio in Collingwood
    '/images/studio/studio01.jpg'    // Additional workspace image
  ]
}; 