import { FallbackContext } from 'context/FallbackContext';
import { useCallback, useContext } from 'react';

export const usePage = () => {
  const { updateFallback } = useContext(FallbackContext);
  const onLoad = useCallback(
    (component) => {
      if (component === undefined) {
        component = null;
      }
      updateFallback(component);
    },
    [updateFallback],
  );

  return { onLoad };
};
