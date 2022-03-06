import React, { useRef } from 'react';
import { StyleSheet, Text, Animated, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Config from '../../../Config';

interface Props {
  onBtnPress: () => void;
  animationController: React.MutableRefObject<Animated.Value>;
}

const IconPressable = Animated.createAnimatedComponent(Icon);

/*
 * TODO:- find better solution for this animation so we don't have to use 'useNativeDriver: false' in 'IntroductionAnimationScreen.tsx' as width doesn't support it yet
 */
const NextButtonArrow: React.FC<Props> = ({
  onBtnPress,
  animationController,
}) => {
  const arrowAnim = useRef<Animated.AnimatedInterpolation>(
    new Animated.Value(0),
  );

  /* // const [arrowState, setArrowState] = useState(0);
  // const valueRef = useRef(0);

  // const iconTransitionAnim = useRef(new Animated.Value(0));
  // const iconOpacityAnim = useRef(new Animated.Value(1));
  // const transitionAnim = useRef(new Animated.Value(36));
  // const opacityAnim = useRef(new Animated.Value(0));

  useEffect(() => {
    // INITIAL SOLUTION
    // a little workaround we can say, we can't assign interpolate to 'arrowAnim.current' at line 76, but as we're calling 'addListener' first the assign interpolation, both are working (though animation not proper sometimes)
    // If we do this first then 'addListener' won't work
    // TODO:- find a better solution to this
    arrowAnim.current.addListener(({ value }: any) => {
      if (
        (valueRef.current < 0.7 && value >= 0.7) ||
        (valueRef.current > 0.7 && value <= 0.7)
      ) {
        valueRef.current = value;
        const config = {
          duration: 480,
          easing: Easing.bezier(0.4, 0.0, 0.2, 1.0),
          useNativeDriver: true,
        };
        Animated.parallel([
          Animated.timing(transitionAnim.current, {
            toValue: value > 0.7 ? 0 : 36,
            ...config,
          }),
          Animated.timing(opacityAnim.current, {
            toValue: value > 0.7 ? 1 : 0,
            ...config,
          }),
          Animated.timing(iconTransitionAnim.current, {
            toValue: value <= 0.7 ? 0 : -36,
            ...config,
          }),
          Animated.timing(iconOpacityAnim.current, {
            toValue: value <= 0.7 ? 1 : 0,
            ...config,
          }),
        ]).start();
      }
    });
  }, []);

  const onArrowPress = () => {
    Animated.timing(arrowAnim.current, {
      toValue: arrowState === 1 ? 0 : 1,
      duration: 1600,
      useNativeDriver: false,
    }).start(() => setArrowState(arrowState === 1 ? 0 : 1));
  }; */

  arrowAnim.current = animationController.current.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8],
    outputRange: [0, 0, 0, 0, 1],
  });

  // for transition from arrow to sign up
  const transitionAnim = arrowAnim.current.interpolate({
    inputRange: [0, 0.85, 1],
    outputRange: [36, 0, 0],
  });
  const opacityAnim = arrowAnim.current.interpolate({
    inputRange: [0, 0.7, 1],
    outputRange: [0, 0, 1],
  });
  const iconTransitionAnim = arrowAnim.current.interpolate({
    inputRange: [0, 0.35, 0.85, 1], // or [0, 0.85, 1],
    outputRange: [0, 0, -36, -36], // or [0, 0, -36]
  });
  const iconOpacityAnim = arrowAnim.current.interpolate({
    inputRange: [0, 0.7, 1],
    outputRange: [1, 0, 0],
  });
  // end

  const widthAnim = arrowAnim.current.interpolate({
    inputRange: [0, 1],
    outputRange: [58, 258],
  });

  const marginBottomAnim = arrowAnim.current.interpolate({
    inputRange: [0, 1],
    outputRange: [38, 0],
  });

  const radiusAnim = arrowAnim.current.interpolate({
    inputRange: [0, 1],
    outputRange: [40, 8],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: widthAnim,
          borderRadius: radiusAnim,
          marginBottom: marginBottomAnim,
        },
      ]}
    >
      <Pressable
        style={({ pressed }) => [
          {
            flex: 1,
            justifyContent: 'center',
            opacity: !Config.isAndroid && pressed ? 0.4 : 1,
          },
        ]}
        android_ripple={{ color: 'darkgrey' }}
        onPress={() => onBtnPress()}
      >
        {/* {valueRef.current > 0.7 ? ( */}
        <Animated.View
          style={[
            styles.signupContainer,
            {
              opacity: opacityAnim,
              transform: [{ translateY: transitionAnim }],
            },
          ]}
        >
          <Text style={styles.signupText}>Sign Up</Text>
          <Icon name="arrow-forward" size={24} color="white" />
        </Animated.View>
        {/* ) : ( */}
        <IconPressable
          style={[
            styles.icon,
            {
              opacity: iconOpacityAnim,
              transform: [{ translateY: iconTransitionAnim }],
            },
          ]}
          name="arrow-forward-ios"
          size={24}
          color="white"
        />
        {/* )} */}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 58,
    backgroundColor: 'rgb(21, 32, 54)',
    overflow: 'hidden',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  signupText: {
    fontSize: 18,
    fontFamily: 'WorkSans-Medium',
    color: 'white',
  },
  icon: {
    position: 'absolute',
    alignSelf: 'center',
  },
});

export default NextButtonArrow;
