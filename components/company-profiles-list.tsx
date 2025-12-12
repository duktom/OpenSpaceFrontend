import mockImage from '@/assets/images/mock-image.png';
import { Image, View } from 'react-native';

export function CompanyProfilesList() {
  return (
    <>
      {Array.from({ length: 20 }).map((_, index) => (
        <View key={index}>
          <Image source={mockImage} />
        </View>
      ))}
    </>
  );
}
