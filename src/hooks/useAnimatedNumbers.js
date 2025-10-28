import { useState, useEffect } from 'react';

/**
 * ========================================
 * ANIMATED NUMBERS HOOK (एनिमेटेड नंबर्स)
 * ========================================
 * 
 * यह hook numbers को 0 से final value तक animate करता है
 * जैसे: 0 → 1 → 2 → 3 → ... → 100
 * 
 * Example:
 * const animatedNumbers = useAnimatedNumbers(
 *   [{number: "100+", label: "Students"}], // data
 *   2000,  // 2 seconds में animation complete हो
 *   500    // 500ms देर से शुरू करो
 * );
 */

export const useAnimatedNumbers = (data, animationDuration = 2000, startDelay = 500) => {
  // सभी animated numbers को store करने के लिए array
  const [animatedNumbers, setAnimatedNumbers] = useState(
    data.map(() => 0) // शुरू में सभी 0 होंगे
  );

  useEffect(() => {
    // थोड़ी देर बाद animation शुरू करो
    const delayTimeout = setTimeout(() => {
      
      // हर number के लिए interval बनाओ
      const intervals = data.map((item, index) => {
        // Original number में से सिर्फ digits निकालो (+ या k हटा दो)
        const targetNumber = parseInt(item.number.replace(/[^0-9]/g, '')) || 0;
        
        // Animation की settings
        const stepTime = 50;  // हर 50ms में update करो
        const totalSteps = animationDuration / stepTime;  // कुल कितने steps होंगे
        const incrementPerStep = targetNumber / totalSteps;  // हर step में कितना बढ़ाना है
        
        let currentValue = 0;  // अभी की value
        
        // हर 50ms में यह function चलेगा
        return setInterval(() => {
          currentValue += incrementPerStep;  // value बढ़ाओ
          
          // अगर target से ज्यादा हो गया तो रोक दो
          if (currentValue >= targetNumber) {
            currentValue = targetNumber;
            clearInterval(intervals[index]);  // interval बंद करो
          }
          
          // State update करो
          setAnimatedNumbers((previousNumbers) => {
            const newNumbers = [...previousNumbers];
            newNumbers[index] = Math.round(currentValue);  // round करके save करो
            return newNumbers;
          });
        }, stepTime);
      });

      // Cleanup: सभी intervals को बंद करो
      return () => intervals.forEach((interval) => clearInterval(interval));
    }, startDelay);

    // Cleanup: timeout को भी बंद करो
    return () => clearTimeout(delayTimeout);
  }, [data, animationDuration, startDelay]);

  // Animated numbers return करो
  return animatedNumbers;
};
