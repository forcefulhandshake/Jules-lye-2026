/**
 * Client Data Structure and Interfaces
 * 
 * This file contains all the client/portfolio data for the Involved website.
 * Each client has images, videos, descriptions, and metadata that gets rendered
 * in the accordion components.
 */

/**
 * Interface for individual client images
 * Currently not used but available for future enhancements
 */
export interface ClientImage {
  src: string;
  alt: string;
  type: 'image' | 'video';
  videoSrc?: string;
}

/**
 * Main Client interface defining the structure of client data
 */
export interface Client {
  id: string;                    // Unique identifier for the client
  name: string;                  // Display name of the client
  icon: string;                  // FontAwesome icon class name
  description: string;           // Client description and work details
  website?: string;              // Optional website URL (without https://)
  credit?: string;               // Optional photo/video credits
  images: string[];              // Array of image file paths
  videos?: { src: string; poster?: string }[]; // Optional video files with posters
  categories?: string[];         // Optional categories for filtering/styling
}

/**
 * Client data array containing all portfolio items
 * 
 * Each client object contains:
 * - Basic info (name, description, website)
 * - Media assets (images and videos)
 * - Metadata (credits, categories)
 * 
 * Images and videos are stored as file paths relative to the public directory
 * Categories can be used for filtering or applying special styles
 */
export const clients: Client[] = [
  {
    id: 'accor',
    name: 'Accor',
    icon: 'fa-suitcase',
    description: 'Digital creative, production and web pages for global hotel brand across Asia Pacific. 2019—2022.',
    website: 'accor.com',
    images: [
      '/images/accor/accor_1.jpg',
      '/images/accor/accor_2.jpg',
      '/images/accor/accor_3.jpg',
      '/images/accor/accor_4.jpg',
      '/images/accor/accor_5.jpg',
      '/images/accor/accor_6.jpg',
      '/images/accor/accor_7.jpg',
      '/images/accor/accor_8.jpg',
      '/images/accor/accor_9.jpg',
      '/images/accor/accor_10.jpg',
      '/images/accor/accor_11.jpg',
      '/images/accor/accor_12.jpg',
      '/images/accor/accor_13.jpg',
      '/images/accor/accor_14.jpg',
      '/images/accor/accor_15.jpg',
      '/images/accor/accor_16.jpg',
      '/images/accor/accor_17.jpg',
      '/images/accor/accor_19.jpg',
      '/images/accor/accor_20.jpg',
      '/images/accor/accor_21.jpg',
      '/images/accor/accor_23.jpg',
      '/images/accor/accor_24.jpg'
    ],
    videos: [
      { src: '/images/accor/accor_18.mp4', poster: '/images/accor/accor_18-poster.jpg' },
      { src: '/images/accor/accor_22.mp4', poster: '/images/accor/accor_22-poster.jpg' },
      { src: '/images/accor/accor_25.mp4', poster: '/images/accor/accor_25-poster.jpg' }
    ]
  },
  {
    id: 'ancap',
    name: 'Australasian New Car Assessment Program (ANCAP)',
    icon: 'fa-road',
    description: 'Strategy, collateral, campaigns and bespoke digital platform for ANCAP, Australasia’s leading vehicle safety authority. 2013—ongoing',
    website: 'ancap.com.au',
    images: [
      '/images/ancap/ancap0.jpg',
      '/images/ancap/ancap1.jpg',
      '/images/ancap/ancap2.jpg',
      '/images/ancap/ancap3.jpg',
      '/images/ancap/ancap4.jpg',
      '/images/ancap/ancap5.jpg',
      '/images/ancap/ancap6.jpg',
      '/images/ancap/ancap7.jpg',
      '/images/ancap/ancap8.jpg',
      '/images/ancap/ancap9.jpg'
    ],
    videos: [
      { src: '/images/ancap/ancap10.mp4', poster: '/images/ancap/ancap10-poster.jpg' }
    ]
  },
  {
    id: 'aiac',
    name: 'Australian International Aviation College',
    icon: 'fa-paper-plane',
    description: 'Art direction, design and development for international flight training facility based on the NSW mid-north coast. 2013—ongoing.',
    website: 'aiacollege.com.au',
    credit: 'Photography: Anne Johnston, AIAC students.',
    images: [
      '/images/aiac/aiac0.jpg',
      '/images/aiac/aiac1.jpg',
      '/images/aiac/aiac2.jpg',
      '/images/aiac/aiac3.jpg',
      '/images/aiac/aiac4.jpg',
      '/images/aiac/aiac5.jpg',
      '/images/aiac/aiac6.jpg',
      '/images/aiac/aiac7.jpg',
      '/images/aiac/aiac8.jpg'
    ]
  },
  {
    id: 'art-gallery-ballarat',
    name: 'Art Gallery of Ballarat',
    icon: 'fa-palette',
    description: 'Design and build of an online exhibition showcasing The Vizard Foundation Art Collection of the 1990s. This immersive website features 124 works by 51 prominent Australian artists. 2024—ongoing.',
    website: 'vizardfoundationartcollection.com.au/the-nineties',
    images: [
      '/images/art-gallery-ballarat/ballarat0.jpg',
      '/images/art-gallery-ballarat/ballarat1.jpg'
    ]
  },
  {
    id: 'box-grove-vineyard',
    name: 'Box Grove Vineyard',
    icon: 'fa-glass-cheers',
    description: 'Strategy, digital and marketing for award-winning boutique vineyard specialising in Rhone and Italian varietals. Avenel, Victoria. 2007—ongoing.',
    website: 'boxgrovevineyard.com.au',
    categories: ['shopify'], // Category for Shopify-based projects
    images: [
      '/images/box-grove-vineyard/bgv0.jpg',
      '/images/box-grove-vineyard/bgv1.jpg',
      '/images/box-grove-vineyard/bgv2.jpg',
      '/images/box-grove-vineyard/bgv3.jpg',
      '/images/box-grove-vineyard/bgv4.jpg',
      '/images/box-grove-vineyard/bgv5.jpg',
      '/images/box-grove-vineyard/bgv6.jpg',
      '/images/box-grove-vineyard/bgv7.jpg',
      '/images/box-grove-vineyard/bgv8.jpg',
      '/images/box-grove-vineyard/bgv9.jpg',
      '/images/box-grove-vineyard/bgv10.jpg'
    ]
  },
  {
    id: 'designsource',
    name: 'Designsource',
    icon: 'fa-cut',
    description: 'Website for agency specialising in fabric sourcing, design consultancy, garment development, production management and fashion branding.',
    website: 'designsource.com.au',
    credit: 'Photography: Eve Wilson',
    images: [
      '/images/designsource/ds0.jpg',
      '/images/designsource/ds1.jpg',
      '/images/designsource/ds2.jpg',
      '/images/designsource/ds3.jpg',
      '/images/designsource/ds4.jpg',
      '/images/designsource/ds5.jpg',
      '/images/designsource/ds6.jpg'
    ]
  },
  {
    id: 'gristmill',
    name: 'Gristmill',
    icon: 'fa-tv-retro',
    description: 'An immersive website showcasing the work of Gristmill, an award-winning production company founded by Wayne Hope and Robyn Butler. 2013—ongoing.',
    website: 'gristmill.com.au',
    images: [
      '/images/gristmill/gristmill_2.jpg',
      '/images/gristmill/gristmill_3.jpg',
      '/images/gristmill/gristmill_4.png',
      '/images/gristmill/gristmill_5.jpg'
    ],
    videos: [
      { src: '/images/gristmill/gristmill_1.mp4', poster: '/images/gristmill/gristmill_poster.jpg' }
    ]
  },
  // {
  //   id: 'mastercard',
  //   name: 'Mastercard®',
  //   icon: 'fa-credit-card',
  //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget iaculis lacus. In eu euismod massa. Nam metus enim, ornare sed dui at, condimentum dictum ex. Aenean sollicitudin fermentum arcu sed tristique. Quisque consectetur efficitur odio.',
  //   categories: ['no-content'], // Category for placeholder content
  //   images: [
  //     '/images/big.png',
  //     '/images/big.png',
  //     '/images/big.png',
  //     '/images/big.png',
  //     '/images/big.png',
  //     '/images/big.png'
  //   ]
  // },
  {
    id: 'motorola',
    name: 'Motorola UK',
    icon: 'fa-mobile-android-alt',
    description: 'Digital creative and production for Razr and Edge product launches across Europe. 2020—2022.',
    website: 'motorola.co.uk',
    images: [
      '/images/motorola/motorola4.jpg',
      '/images/motorola/motorola5.jpg'
    ],
    videos: [
      { src: '/images/motorola/motorola3.mp4', poster: '/images/motorola/motorola3-poster.jpg' },
      { src: '/images/motorola/motorola2.mp4', poster: '/images/motorola/motorola2-poster.jpg' },
      { src: '/images/motorola/motorola6.mp4', poster: '/images/motorola/motorola6-poster.jpg' }
    ]
  },
  {
    id: 'melanie-katsalidis',
    name: 'Melanie Katsalidis',
    icon: 'fa-gem',
    description: 'Commerce platform development and support for renowned Melbourne jeweller and designer. Customised Shopify and Mailchimp. Since 2006.',
    website: 'melaniekatsalidis.com',
    credit: 'Brand: Mike Giesser.',
    categories: ['shopify'], // Category for Shopify-based projects
    images: [
      '/images/melanie-katsalidis/mk0.jpg',
      '/images/melanie-katsalidis/mk1.jpg',
      '/images/melanie-katsalidis/mk2.jpg',
      '/images/melanie-katsalidis/mk3.jpg',
      '/images/melanie-katsalidis/mk4.jpg'
    ]
  },
  // {
  //   id: 'pieces-of-eight',
  //   name: 'Pieces of Eight',
  //   icon: 'fa-rings-wedding',
  //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget iaculis lacus. In eu euismod massa. Nam metus enim, ornare sed dui at, condimentum dictum ex. Aenean sollicitudin fermentum arcu sed tristique. Quisque consectetur efficitur odio.',
  //   website: 'piecesofeight.com.au',
  //   categories: ['shopify', 'no-content'], // Categories for Shopify and placeholder content
  //   images: [
  //     '/images/big.png',
  //     '/images/big.png',
  //     '/images/big.png',
  //     '/images/big.png',
  //     '/images/big.png',
  //     '/images/big.png'
  //   ]
  // },
  {
    id: 'potter-museum',
    name: 'Potter Museum',
    icon: 'fa-paint-brush-alt',
    description: 'Design and build of exhibition apps for the University of Melbourne\'s art museum. 2014—ongoing.',
    images: [
      '/images/potter-museum/potter0.jpg',
      '/images/potter-museum/potter1.jpg',
      '/images/potter-museum/potter5.jpg',
      '/images/potter-museum/potter6.jpg',
      '/images/potter-museum/potter7.jpg'
    ]
  },
  {
    id: 'fishmongers-son',
    name: 'The Fishmonger\'s Son',
    icon: 'fa-fish',
    description: 'Branding, signage and marketing for local seafood deli, The Fishmonger\'s Son. 2018—ongoing.',
    images: [
      '/images/fishmongers-son/tfs1.jpg',
      '/images/fishmongers-son/tfs2.jpg',
      '/images/fishmongers-son/tfs3.jpg',
      '/images/fishmongers-son/tfs4.jpg'
    ]
  },
  {
    id: 'holistic-ingrediant',
    name: 'The Holistic Ingredient',
    icon: 'fa-spa',
    description: 'Bespoke package design, custom Shopify development, strategic direction and ongoing support for Amy Crawford, creator of The Holistic Ingredient lifestyle store and daily blends range. 2013—ongoing.',
    website: 'theholisticingredient.com',
    categories: ['shopify'], // Category for Shopify-based projects
    images: [
      '/images/holistic-ingrediant/amy_1.jpg',
      '/images/holistic-ingrediant/amy_2.jpg',
      '/images/holistic-ingrediant/amy_3.jpg',
      '/images/holistic-ingrediant/amy_4.jpg'
    ]
  },
  {
    id: 'westfield',
    name: 'Westfield',
    icon: 'fa-building',
    description: 'Digital creative support for Westfield Direct launch and seasonal campaigns. 2020—2022. With Sibling.',
    website: 'westfield.com.au',
    images: [
      '/images/westfield/westfield0.jpg',
      '/images/westfield/westfield2.jpg',
      '/images/westfield/westfield4.jpg'
    ],
    videos: [
      { src: '/images/westfield/westfield1.mp4', poster: '/images/westfield/westfield1-poster.jpg' },
      { src: '/images/westfield/westfield3.mp4', poster: '/images/westfield/westfield3-poster.jpg' },
      { src: '/images/westfield/westfield5.mp4', poster: '/images/westfield/westfield5-poster.jpg' }
    ]
  },
  {
    id: 'kms-for-kids',
    name: '1200kms for Kids',
    icon: 'fa-biking',
    description: 'Pro-bono design and development support for annual 1,200 kilometre east coast charity ride, raising funds for the Children\'s Hospital Foundation. 2009—ongoing.',
    website: '1200kmsforkids.com',
    images: [
      '/images/1200kms-for-kids/kids0.jpg',
      '/images/1200kms-for-kids/kids1.jpg',
      '/images/1200kms-for-kids/kids2.jpg',
      '/images/1200kms-for-kids/kids3.jpg',
      '/images/1200kms-for-kids/kids4.jpg',
      '/images/1200kms-for-kids/kids5.jpg'
    ]
  }
]; 