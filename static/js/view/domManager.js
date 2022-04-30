export let domManager = {
  insertChildHTML(parentIdentifier, childHTML) {
    const parent = document.querySelector(parentIdentifier);
    if (parent) {
      parent.insertAdjacentHTML("beforeend", childHTML);
    } else {
      console.error("could not find such html element: " + parentIdentifier);
    }
  },
  appendChild(parentIdentifier, child) {
    const parent = document.querySelector(parentIdentifier);
    if (parent) {
      parent.appendChild(child);
    } else {
      console.error("could not find such html element: " + parentIdentifier);
    }
  },
  addEventListener(parentIdentifier, eventType, eventHandler) {
    const parent = document.querySelector(parentIdentifier);
    if (parent) {
      parent.addEventListener(eventType, eventHandler);
    } else {
      console.error("could not find such html element: " + parentIdentifier);
    }
  },
};
