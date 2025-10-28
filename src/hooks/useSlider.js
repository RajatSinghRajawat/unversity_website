import { useState, useEffect } from 'react';

/**
 * ========================================
 * AUTOMATIC SLIDER HOOK (ऑटोमेटिक स्लाइडर)
 * ========================================
 * 
 * यह hook images या content को automatically slide करता है
 * 
 * Example:
 * const currentSlide = useSlider(5, 3000);
 * // 5 slides को हर 3 seconds में बदलेगा
 */

export const useSlider = (totalSlides, interval = 4000) => {
  // कौन सी slide अभी दिख रही है (0 से शुरू होती है)
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // अगर सिर्फ 1 slide है तो कुछ मत करो
    if (totalSlides <= 1) return;
    
    // हर कुछ seconds में next slide पर जाओ
    const timer = setInterval(() => {
      setCurrentSlide((previousSlide) => {
        // अगर last slide पर हैं तो फिर से first slide पर जाओ
        // नहीं तो अगली slide पर जाओ
        return (previousSlide + 1) % totalSlides;
      });
    }, interval);
    
    // जब component बंद हो तो timer बंद करो (memory leak से बचने के लिए)
    return () => clearInterval(timer);
  }, [totalSlides, interval]);

  // वर्तमान slide का number return करो
  return currentSlide;
};
