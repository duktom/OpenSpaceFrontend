import { Dimensions, Image, ImageSourcePropType } from 'react-native';

export const getImageSizeAccordingToScreenHeight = (
  source: ImageSourcePropType,
  heightMultiplier: number = 1
) => {
  const img = Image.resolveAssetSource(source);
  const screenHeight = Dimensions.get('window').height * heightMultiplier;
  const scaleFactor = img.height / screenHeight;
  const imageWidth = img.width / scaleFactor;

  return {
    width: imageWidth,
    height: screenHeight,
  };
};
