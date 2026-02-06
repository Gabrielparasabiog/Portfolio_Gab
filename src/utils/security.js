// Security utilities to protect data and prevent console manipulation

// Prevent console access
export const protectConsole = () => {
  // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
  document.addEventListener('keydown', (e) => {
    // F12
    if (e.keyCode === 123) {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+I
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+J
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
      e.preventDefault();
      return false;
    }
    // Ctrl+U
    if (e.ctrlKey && e.keyCode === 85) {
      e.preventDefault();
      return false;
    }
    // Ctrl+S
    if (e.ctrlKey && e.keyCode === 83) {
      e.preventDefault();
      return false;
    }
  });

  // Disable right-click context menu
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  });

  // Disable text selection (optional - can be removed if needed)
  // document.addEventListener('selectstart', (e) => {
  //   e.preventDefault();
  //   return false;
  // });

  // Protect console (but allow errors for debugging in development)
  if (process.env.NODE_ENV === 'production' && typeof console !== 'undefined') {
    const noop = () => {};
    console.log = noop;
    console.warn = noop;
    console.info = noop;
    console.debug = noop;
    // Keep console.error for critical errors
  }

  // Protect against DevTools
  let devtools = { open: false };
  const element = new Image();
  Object.defineProperty(element, 'id', {
    get: function() {
      devtools.open = true;
      return '';
    }
  });

  setInterval(() => {
    devtools.open = false;
    console.log(element);
    if (devtools.open) {
      // DevTools detected - can redirect or show warning
      // window.location.href = 'about:blank';
    }
  }, 1000);
};

// Protect data from modification
export const protectData = () => {
  // Freeze critical data objects
  const criticalData = {
    name: 'Gabriel Paras Abiog',
    email: 'gabrielparasabiog@gmail.com',
    location: '117 Patnuaby St. Brgy San Agustin Q.C',
    website: 'www.reallygreatsite.com'
  };

  // Make data read-only
  Object.freeze(criticalData);
  Object.seal(criticalData);

  // Prevent modification of window objects
  Object.defineProperty(window, 'criticalData', {
    value: criticalData,
    writable: false,
    configurable: false,
    enumerable: false
  });
};

// Input sanitization
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/<iframe/gi, '')
    .replace(/<object/gi, '')
    .replace(/<embed/gi, '')
    .trim()
    .substring(0, 500);
};

// Validate input
export const validateInput = (input) => {
  if (!input || typeof input !== 'string') return false;
  
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /onerror=/i,
    /onload=/i,
    /<iframe/i,
    /<object/i,
    /<embed/i
  ];
  
  return !dangerousPatterns.some(pattern => pattern.test(input)) && 
         input.length <= 500 && 
         input.trim().length > 0;
};

