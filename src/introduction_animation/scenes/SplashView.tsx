import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MyPressable from '../../components/MyPressable';
import { AppImages } from '../../assets';

interface Props {
  onNextClick: () => void;
  animationController: React.MutableRefObject<Animated.Value>;
}

const SplashView: React.FC<Props> = ({ onNextClick, animationController }) => {
  const window = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const splashTranslateY = animationController.current.interpolate({
    inputRange: [0, 0.2, 0.8],
    outputRange: [0, -window.height, -window.height],
  });

  const introImageData = Image.resolveAssetSource(AppImages.introduction_image);

  return (
    <Animated.View
      style={{ flex: 1, transform: [{ translateY: splashTranslateY }] }}
    >
      <ScrollView style={{ flexGrow: 0 }} alwaysBounceVertical={false}>
        <View>
          <Image
            style={{
              width: window.width,
              height: undefined,
              aspectRatio: introImageData
                ? introImageData.width / introImageData.height
                : 357 / 470,
            }}
            source={AppImages.introduction_image}
          />
        </View>
        <Text style={styles.title}>Clearhead</Text>
        <Text style={styles.subtitle}>
          Lorem ipsum dolor sit amet,consectetur{'\n'}adipiscing elit,sed do
          eiusmod tempor{'\n'}incididunt ut labore
        </Text>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: 8 + insets.bottom }]}>
        <View style={styles.buttonContainer}>
          <MyPressable
            style={styles.button}
            android_ripple={{ color: 'powderblue' }}
            touchOpacity={0.6}
            onPress={() => onNextClick()}
          >
            <Text style={styles.buttonText}>Let's begin</Text>
          </MyPressable>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'WorkSans-Bold',
    paddingVertical: 8,
  },
  subtitle: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'WorkSans-Regular',
    paddingHorizontal: 24,
  },
  footer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: 8,
  },
  buttonContainer: {
    borderRadius: 38,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  button: {
    height: 58,
    backgroundColor: 'rgb(21, 32, 54)',
    paddingVertical: 16,
    paddingHorizontal: 56,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'WorkSans-Regular',
    color: 'white',
  },
});

export default SplashView;
