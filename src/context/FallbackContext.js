import { createContext } from 'react';

export const FallbackContext = createContext({
  updateFallback: () => {},
});
