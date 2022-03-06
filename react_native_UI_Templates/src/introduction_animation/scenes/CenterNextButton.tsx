import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NextButtonArrow from './components/NextButtonArrow';

interface Props {
  onNextClick: () => void;
  animationController: React.MutableRefObject<Animated.Value>;
}

interface DotIndicatorProps {
  index: number;
  selectedIndex: number;
}
const DotIndicator: React.FC<DotIndicatorProps> = ({
  index,
  selectedIndex,
}) => {
  const activeIndexRef = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(activeIndexRef.current, {
      toValue: index === selectedIndex ? 1 : 0,
      duration: 480,
      useNativeDriver: false,
    }).start();
  }, [selectedIndex, index]);

  const bgColor = activeIndexRef.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E3E4E4', '#132137'],
  });

  return (
    <Animated.View
      style={[styles.pageIndicator, { backgroundColor: bgColor }]}
    />
  );
};

const CenterNextButton: React.FC<Props> = ({
  onNextClick,
  animationController,
}) => {
  const opacity = useRef<Animated.Value>(new Animated.Value(0));
  const currentOpacity = useRef<number>(0);

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    // I think this condition could be better?
    animationController.current.addListener(({ value }) => {
      const isVisible = value >= 0.2 && value <= 0.6;
      if (
        (isVisible && currentOpacity.current === 0) ||
        (!isVisible && currentOpacity.current === 1)
      ) {
        Animated.timing(opacity.current, {
          toValue: isVisible ? 1 : 0,
          duration: 480,
          useNativeDriver: true,
        }).start();
        currentOpacity.current = isVisible ? 1 : 0;
      }

      if (value >= 0.7) {
        setSelectedIndex(3);
      } else if (value >= 0.5) {
        setSelectedIndex(2);
      } else if (value >= 0.3) {
        setSelectedIndex(1);
      } else if (value >= 0.1) {
        setSelectedIndex(0);
      }
    });
  }, [animationController]);

  const topViewAnim = animationController.current.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8],
    outputRange: [96 * 5, 0, 0, 0, 0], // 96 is total height of next button view
  });
  const loginTextMoveAnimation = animationController.current.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8],
    outputRange: [30 * 5, 30 * 5, 30 * 5, 30 * 5, 0], // 96 is total height of next button view
  });

  const dots = useMemo(() => [0, 1, 2, 3], []);

  const { bottom } = useSafeAreaInsets();
  const paddingBottom = 16 + bottom;

  return (
    <Animated.View
      style={[
        styles.container,
        { paddingBottom, transform: [{ translateY: topViewAnim }] },
      ]}
    >
      <Animated.View
        style={[styles.dotsContainer, { opacity: opacity.current }]}
      >
        {dots.map((item) => (
          <DotIndicator
            key={item}
            index={item}
            {...{ selectedIndex, animationController }}
          />
        ))}
      </Animated.View>

      <NextButtonArrow {...{ animationController }} onBtnPress={onNextClick} />

      <Animated.View
        style={[
          styles.footerTextContainer,
          { transform: [{ translateY: loginTextMoveAnimation }] },
        ]}
      >
        <Text style={{ color: 'grey', fontFamily: 'WorkSans-Regular' }}>
          Already have an account?{' '}
        </Text>
        <Text style={styles.loginText}>Login</Text>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // paddingBottom: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  pageIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 4,
  },
  footerTextContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  loginText: {
    color: '#132137',
    fontSize: 16,
    fontFamily: 'WorkSans-Bold',
  },
});

export default CenterNextButton;
