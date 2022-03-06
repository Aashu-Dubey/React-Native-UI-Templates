import React, { useRef } from 'react';
import { StyleSheet, Text, Animated, useWindowDimensions } from 'react-native';
import { AppImages } from '../../../res';

interface Props {
  animationController: React.MutableRefObject<Animated.Value>;
}

const IMAGE_WIDTH = 350;
const IMAGE_HEIGHT = 350;
const WelcomeView: React.FC<Props> = ({ animationController }) => {
  const window = useWindowDimensions();

  const careRef = useRef<Text | null>(null);

  const slideAnim = animationController.current.interpolate({
    inputRange: [0, 0.6, 0.8],
    outputRange: [window.width, window.width, 0],
  });

  const textEndVal = 26 * 2; // 26 being text's height (font size)
  const welcomeTextAnim = animationController.current.interpolate({
    inputRange: [0, 0.6, 0.8],
    outputRange: [textEndVal, textEndVal, 0],
  });

  const imageEndVal = IMAGE_WIDTH * 4;
  const imageAnim = animationController.current.interpolate({
    inputRange: [0, 0.6, 0.8],
    outputRange: [imageEndVal, imageEndVal, 0],
  });

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateX: slideAnim }] }]}
    >
      <Animated.Image
        style={[styles.image, { transform: [{ translateX: imageAnim }] }]}
        source={AppImages.welcome}
      />
      <Animated.Text
        style={[styles.title, { transform: [{ translateX: welcomeTextAnim }] }]}
        ref={careRef}
      >
        Welcome
      </Animated.Text>
      <Text style={styles.subtitle}>
        Stay organised and live stress-free with you-do app
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    paddingBottom: 100,
  },
  image: {
    maxWidth: IMAGE_WIDTH,
    maxHeight: IMAGE_HEIGHT,
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    fontFamily: 'WorkSans-Bold',
  },
  subtitle: {
    textAlign: 'center',
    fontFamily: 'WorkSans-Regular',
    paddingHorizontal: 64,
    paddingVertical: 16,
  },
});

export default WelcomeView;
