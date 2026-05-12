import '@testing-library/jest-dom';

beforeAll(() => {
  if (!window.scrollTo) {
    window.scrollTo = jest.fn();
  } else {
    jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
  }

  if (!window.IntersectionObserver) {
    window.IntersectionObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }

  if (!window.HTMLElement.prototype.scrollIntoView) {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  }
});

afterAll(() => {
  if (window.scrollTo && window.scrollTo.mockRestore) {
    window.scrollTo.mockRestore();
  }
});
