import { useState, useCallback } from 'react';

/**
 * ========================================
 * ACCORDION HOOK (खुलने-बंद होने वाला मेनू)
 * ========================================
 * 
 * यह hook multiple accordions को manage करता है
 * Accordion = वो menu जो click करने पर खुलता/बंद होता है
 * 
 * Example:
 * const [states, toggle, closeAll] = useAccordion(['menu1', 'menu2', 'menu3']);
 * 
 * toggle('menu1');  // menu1 को खोलो/बंद करो
 * closeAll();       // सभी को बंद करो
 * states.menu1      // true = खुला है, false = बंद है
 */

export const useAccordion = (menuKeys = []) => {
  // सभी menus की initial state बनाओ (सभी बंद होंगे)
  // Example: { menu1: false, menu2: false, menu3: false }
  const initialState = menuKeys.reduce((allStates, key) => {
    allStates[key] = false;  // हर menu को false (बंद) रखो
    return allStates;
  }, {});

  // सभी menus की states store करो
  const [openStates, setOpenStates] = useState(initialState);

  // किसी एक menu को खोलो/बंद करो
  const toggleAccordion = useCallback((menuKey) => {
    setOpenStates((previousStates) => ({
      ...previousStates,               // पुरानी सभी states रखो
      [menuKey]: !previousStates[menuKey]  // सिर्फ इस menu को toggle करो
    }));
  }, []);

  // सभी menus को बंद करो
  const closeAll = useCallback(() => {
    setOpenStates(initialState);  // सभी को फिर से false कर दो
  }, [initialState]);

  // Return करो: [states, toggle function, closeAll function]
  return [openStates, toggleAccordion, closeAll];
};
