import React, { useEffect, useRef, useState, useMemo } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

/**
 * Client interface - imported from data file
 */
interface Client {
  id: string;
  name: string;
  icon: string;
  description: string;
  website?: string;
  images: string[];
  videos?: { src: string; poster?: string }[];
}

/**
 * Props interface for ClientGallery component
 */
interface ClientGalleryProps {
  client: Client;
}

/**
 * Media item interface for unified handling of images and videos
 */
interface MediaItem {
  type: 'image' | 'video';
  src: string;
  index: number;
  poster?: string;
}

/**
 * ClientGallery Component
 * 
 * Renders a carousel gallery for a client's work, handling both images and videos.
 * Features:
 * - Unified media handling (images + videos in same carousel)
 * - Video auto-play when slide is active
 * - Video pause/reset when leaving slide
 * - Preloading of adjacent media for smooth transitions
 * - Responsive design with mobile optimisations
 */
const ClientGallery: React.FC<ClientGalleryProps> = ({ client }) => {
  // Current slide index
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Track loaded images
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>({});
  
  // Ref to the Slick slider component
  const sliderRef = useRef<Slider>(null);
  
  // Refs to video elements for programmatic control
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  
  /**
   * Combine all media items (images + videos) into a unified array
   * This allows seamless navigation between different media types
   */
  const allMedia: MediaItem[] = useMemo(() => [
    // Add all images first
    ...client.images.map((image, index) => ({
      type: 'image' as const,
      src: image,
      index
    })),
    // Add all videos after images
    ...(client.videos || []).map((video, index) => ({
      type: 'video' as const,
      src: video.src,
      poster: video.poster,
      index: client.images.length + index
    }))
  ], [client.images, client.videos]);

  /**
   * Check if images are already cached on mount
   * This prevents the loading flash for preloaded images
   */
  useEffect(() => {
    allMedia.forEach((media, index) => {
      if (media.type === 'image') {
        const img = new Image();
        img.onload = () => {
          // Image loaded successfully
          setLoadedImages(prev => ({ ...prev, [index]: true }));
        };
        img.src = media.src;
        
        // If image is already cached, it will be complete immediately
        if (img.complete) {
          setLoadedImages(prev => ({ ...prev, [index]: true }));
        }
      }
    });
  }, [allMedia]);

  /**
   * Preload adjacent media for smooth transitions
   * Preloads the next and previous items to reduce loading delays
   */
  useEffect(() => {
    const preloadMedia = (index: number) => {
      const media = allMedia[index];
      if (!media) return;

      if (media.type === 'image') {
        // Preload image
        const img = new Image();
        img.src = media.src;
      } else if (media.type === 'video') {
        // Preload video metadata and poster
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.src = media.src;
        if (media.poster) {
          const posterImg = new Image();
          posterImg.src = media.poster;
        }
      }
    };

    // Preload next and previous items
    const nextIndex = (currentSlide + 1) % allMedia.length;
    const prevIndex = currentSlide === 0 ? allMedia.length - 1 : currentSlide - 1;
    
    preloadMedia(nextIndex);
    preloadMedia(prevIndex);
  }, [currentSlide, allMedia]);

  /**
   * Handle slide changes and video control
   * Pauses all videos and plays the current one if it's a video
   */
  const handleAfterChange = (currentSlideIndex: number) => {
    setCurrentSlide(currentSlideIndex);
    
    // Pause all videos and reset them to beginning
    Object.values(videoRefs.current).forEach(video => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });

    // Play the current video if it exists
    const currentMedia = allMedia[currentSlideIndex];
    if (currentMedia?.type === 'video') {
      const video = videoRefs.current[currentSlideIndex];
      if (video) {
        // Try to play the video (may be blocked by browser autoplay policies)
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Auto-play was prevented, but that's okay
            console.log('Video auto-play prevented by browser');
          });
        }
      }
    }
  };

  /**
   * Slick carousel configuration
   * Defines behavior, animations, and responsive settings
   */
  const settings = {
    dots: true,           // Show navigation dots
    infinite: true,       // Loop back to first slide after last
    speed: 500,          // Animation speed in milliseconds
    slidesToShow: 1,     // Show one slide at a time
    slidesToScroll: 1,   // Scroll one slide at a time
    autoplay: false,     // Disable autoplay (user controls)
    arrows: false,        // Show navigation arrows
    afterChange: handleAfterChange, // Callback after slide change
    responsive: [
      {
        breakpoint: 768,  // Mobile breakpoint
        settings: {
          arrows: false   // Hide arrows on mobile for better UX
        }
      }
    ]
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
   * Handle image load
   */
  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  /**
   * Render individual gallery item (image or video)
   */
  const renderGalleryItem = (media: MediaItem) => {
    const isLoaded = loadedImages[media.index] || false;
    
    const content = media.type === 'image' ? (
      <>
        {!isLoaded && <div className="image-loading" />}
        <img
          src={media.src}
          alt={`${client.name} - ${media.index + 1}`}
          className={`w-full h-full object-cover transition-opacity duration-300 relative z-10 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => handleImageLoad(media.index)}
        />
      </>
    ) : (
      <video
        ref={(el) => {
          // Store ref for programmatic control
          videoRefs.current[media.index] = el;
        }}
        src={media.src}
        poster={media.poster}
        className="w-full h-full object-cover"
        muted           // Required for autoplay
        autoPlay        // Auto-play when slide becomes active
        playsInline     // Play inline on mobile devices
        preload="metadata" // Preload metadata for better performance
        loop           // Loop the video
      />
    );

    return (
      <div key={media.index} className="aspect-video relative group">
        {content}
        
        {/* Navigation overlay areas */}
        <div className="absolute inset-0 flex pointer-events-none">
          {/* Left navigation area */}
          <div
            className="w-1/2 h-full cursor-carousel-prev pointer-events-auto"
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
            }}
            style={{
              cursor: `url('/images/chevron-left-light.svg') 17 17, w-resize`
            }}
          />
          
          {/* Right navigation area */}
          <div
            className="w-1/2 h-full cursor-carousel-next pointer-events-auto"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            style={{
              cursor: `url('/images/chevron-right-light.svg') 17 17, e-resize`
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="client-gallery py-10 relative">
      <Slider ref={sliderRef} {...settings}>
        {allMedia.map(renderGalleryItem)}
      </Slider>
      
      {/* Mobile counter - hidden on desktop */}
      <div className="md:hidden absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-thin">
        {currentSlide + 1} / {allMedia.length}
      </div>
    </div>
  );
};

export default ClientGallery; 