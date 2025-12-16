import mockJobImage from '@/assets/images/mock-job-image.png';
import { Image, View } from 'react-native';

export function CompanyProfilesList() {
  return (
    <>
      {Array.from({ length: 20 }).map((_, index) => (
        <View key={index}>
          <Image source={mockJobImage} />
        </View>
      ))}
    </>
  );
}
