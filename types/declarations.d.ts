declare module '*.png' {
  const content: any; // or string, depending on your setup
  export default content;
}

// Add other image types as needed
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
