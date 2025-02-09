export const dispatchCustomEvent = (eventName, detail) => {
  const event = new CustomEvent(eventName, { detail });
  window.dispatchEvent(event);
};

export const listenCustomEvent = (eventName, handler) => {
  window.addEventListener(eventName, handler);
  return () => {
    window.removeEventListener(eventName, handler);
  };
};
