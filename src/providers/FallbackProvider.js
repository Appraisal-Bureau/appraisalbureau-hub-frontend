import { FallbackContext } from 'context/FallbackContext';
import { Suspense, useCallback, useMemo, useState } from 'react';

export const FallbackProvider = ({ children }) => {
  const [fallback, setFallback] = useState(null);

  const updateFallback = useCallback((fallback) => {
    setFallback(() => fallback);
  }, []);

  const renderChildren = useMemo(() => {
    return children;
  }, [children]);

  return (
    <FallbackContext.Provider value={{ updateFallback }}>
      <Suspense fallback={fallback}>{renderChildren}</Suspense>
    </FallbackContext.Provider>
  );
};
