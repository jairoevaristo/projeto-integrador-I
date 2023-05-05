export const acceptImageUpload = (typeImage: string) => {
    const types = [
      'image/jpeg',
      'image/jpg',
      'image/png',
    ];
  
    if (types.includes(typeImage)) {
      return true;
    }
  
    return false;
  }