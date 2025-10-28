import { useState, useEffect } from 'react';

/**
 * ========================================
 * SCROLL TO TOP BUTTON HOOK
 * ========================================
 * 
 * यह hook scroll-to-top button को show/hide करता है
 * और button click करने पर page को top पर ले जाता है
 * 
 * Example:
 * const [showButton, scrollToTop] = useScrollToTop(200);
 * // 200px scroll करने के बाद button दिखेगा
 */

export const useScrollToTop = (scrollThreshold = 200) => {
  // Button दिखाना है या नहीं
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // जब user scroll करे तो यह function चलेगा
    const handleScroll = () => {
      // अगर user ने threshold से ज्यादा scroll किया है तो button दिखाओ
      if (window.scrollY > scrollThreshold) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    // Scroll event को listen करो
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup: जब component बंद हो तो listener हटा दो
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollThreshold]);

  // Page को top पर ले जाने वाला function
  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0,           // सबसे ऊपर जाओ
      behavior: 'smooth' // smooth animation के साथ
    });
  };

  // Button की visibility और scroll function return करो
  return [showButton, scrollToTop];
};
