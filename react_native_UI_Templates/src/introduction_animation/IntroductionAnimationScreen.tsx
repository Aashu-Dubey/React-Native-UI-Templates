import React, { useCallback, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  useWindowDimensions,
  Animated,
  Easing,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  SplashView,
  RelaxView,
  CareView,
  MoodDiaryView,
  WelcomeView,
  TopBackSkipView,
  CenterNextButton,
} from './index';

interface Props {}

const IntroductionAnimationScreen: React.FC<Props> = () => {
  const navigation = useNavigation();

  const window = useWindowDimensions();

  const animationController = useRef<Animated.Value>(new Animated.Value(0));
  const animValue = useRef<number>(0);

  useEffect(() => {
    animationController.current.addListener(
      ({ value }) => (animValue.current = value),
    );
  }, []);

  const relaxTranslateY = animationController.current.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8],
    outputRange: [window.height, 0, 0, 0, 0],
  });

  const playAnimation = useCallback(
    (toValue: number, duration: number = 1600) => {
      Animated.timing(animationController.current, {
        toValue,
        duration,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1.0),
        // here it is false only cause of width animation in 'NextButtonArrow.tsx', as width doesn't support useNativeDriver: true
        // TODO:- find better solution so we can use true here and animation also work
        useNativeDriver: false,
      }).start();
    },
    [],
  );

  const onNextClick = useCallback(() => {
    let toValue;
    if (animValue.current === 0) {
      toValue = 0.2;
    } else if (animValue.current >= 0 && animValue.current <= 0.2) {
      toValue = 0.4;
    } else if (animValue.current > 0.2 && animValue.current <= 0.4) {
      toValue = 0.6;
    } else if (animValue.current > 0.4 && animValue.current <= 0.6) {
      toValue = 0.8;
    } else if (animValue.current > 0.6 && animValue.current <= 0.8) {
      navigation.goBack();
    }

    toValue !== undefined && playAnimation(toValue);
  }, [playAnimation, navigation]);

  const onBackClick = useCallback(() => {
    let toValue;
    if (animValue.current >= 0 && animValue.current <= 0.2) {
      toValue = 0.0;
    } else if (animValue.current > 0.2 && animValue.current <= 0.4) {
      toValue = 0.2;
    } else if (animValue.current > 0.4 && animValue.current <= 0.6) {
      toValue = 0.4;
    } else if (animValue.current > 0.6 && animValue.current <= 0.8) {
      toValue = 0.6;
    } else if (animValue.current > 0.8 && animValue.current <= 1.0) {
      toValue = 0.8;
    }

    toValue !== undefined && playAnimation(toValue);
  }, [playAnimation]);

  const onSkipClick = useCallback(() => {
    playAnimation(0.8, 1200);
  }, [playAnimation]);

  return (
    <View style={{ flex: 1, backgroundColor: 'rgb(245, 235, 226)' }}>
      <SplashView {...{ onNextClick, animationController }} />

      <Animated.View
        style={[
          styles.scenesContainer,
          { transform: [{ translateY: relaxTranslateY }] },
        ]}
      >
        <RelaxView {...{ animationController }} />

        <CareView {...{ animationController }} />

        <MoodDiaryView {...{ animationController }} />

        <WelcomeView {...{ animationController }} />
      </Animated.View>

      <TopBackSkipView {...{ onBackClick, onSkipClick, animationController }} />

      <CenterNextButton {...{ onNextClick, animationController }} />
    </View>
  );
};

const styles = StyleSheet.create({
  scenesContainer: {
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
  },
});

export default IntroductionAnimationScreen;
