import React from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  Pressable,
  Platform,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Config from '../../Config';

interface Props {
  onBackClick: () => void;
  onSkipClick: () => void;
  animationController: React.MutableRefObject<Animated.Value>;
}

const TopBackSkipView: React.FC<Props> = ({
  onBackClick,
  onSkipClick,
  animationController,
}) => {
  const { top } = useSafeAreaInsets();
  const marginTop = Platform.OS === 'ios' ? top : StatusBar.currentHeight;

  const headerTranslateY = animationController.current.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8],
    outputRange: [-(58 + (marginTop ?? 0)), 0, 0, 0, 0],
  });
  const skipAnim = animationController.current.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8],
    outputRange: [0, 0, 0, 0, 80],
  });

  return (
    <Animated.View
      style={[
        styles.buttonContainer,
        { marginTop, transform: [{ translateY: headerTranslateY }] },
      ]}
    >
      <Pressable
        style={({ pressed }) => [
          styles.backBtn,
          { opacity: !Config.isAndroid && pressed ? 0.4 : 1 },
        ]}
        android_ripple={{ color: 'darkgrey', borderless: true, radius: 28 }}
        onPress={() => onBackClick()}
      >
        <Icon name="arrow-back-ios" size={24} color="black" />
      </Pressable>

      <Animated.View style={{ transform: [{ translateX: skipAnim }] }}>
        <Pressable
          style={({ pressed }) => [
            { opacity: !Config.isAndroid && pressed ? 0.4 : 1 },
          ]}
          android_ripple={{ color: 'darkgrey', borderless: true, radius: 28 }}
          onPress={() => onSkipClick()}
        >
          <Text style={{ fontFamily: 'WorkSans-Regular' }}>Skip</Text>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 8,
    paddingRight: 16,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  backBtn: {
    width: 56,
    height: 56,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TopBackSkipView;
