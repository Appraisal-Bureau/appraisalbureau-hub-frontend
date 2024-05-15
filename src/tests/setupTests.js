import { act } from 'react-dom/test-utils';

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

global.window = { location: { pathname: null } };
