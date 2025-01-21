function getImgUrl(name) {
    if (!name) {
      return '/images/default.jpg'; // Default image in the public folder
    }
    return `/images/${name}`; // Construct URL for images in public folder
  }
  export { getImgUrl };
  