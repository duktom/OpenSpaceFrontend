import { Dimensions, Image, ImageSourcePropType } from 'react-native';

export const getImageSizeAccordingToScreenWidth = (
  source: ImageSourcePropType,
  widthMultiplier: number = 1
) => {
  const img = Image.resolveAssetSource(source);
  const screenWidth = Dimensions.get('window').width * widthMultiplier;
  const scaleFactor = img.width / screenWidth;
  const imageHeight = img.height / scaleFactor;

  return {
    width: screenWidth,
    height: imageHeight,
  };
};
