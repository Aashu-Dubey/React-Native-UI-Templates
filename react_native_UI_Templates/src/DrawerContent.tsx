import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  Image,
  // ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  DrawerContentComponentProps,
  // DrawerContentOptions,
  DrawerContentScrollView,
  // useDrawerProgress,
} from '@react-navigation/drawer';
import { DrawerActions, NavigationState } from '@react-navigation/native';
import Animated from 'react-native-reanimated'; // useAnimatedStyle, // interpolate, // AnimatedStyleProp,
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyPressable from './components/MyPressable';
import { AppImages } from '../res';

type DrawerScene = {
  label: string;
  icon: any;
  isAssetIcon?: boolean;
  routeKey?: string;
};

interface DrawerItemProps extends DrawerScene {
  translateX: Animated.Adaptable<number>;
  // bgAnimStyle: AnimatedStyleProp<ViewStyle>;
}

const DRAWER_SCENES: DrawerScene[] = [
  { label: 'Home', icon: 'home', routeKey: 'home' },
  {
    label: 'Help',
    icon: AppImages.support_icon,
    isAssetIcon: true,
    routeKey: 'help',
  },
  { label: 'Feedback', icon: 'help', routeKey: 'feedback' },
  { label: 'Invite Friend', icon: 'group', routeKey: 'invite_friend' },
  { label: 'Rate the app', icon: 'share' },
  { label: 'About Us', icon: 'info' },
];

const getActiveRouteState = (
  routes: NavigationState['routes'],
  index: number,
  routeKey: string,
) => routes[index].name.toLowerCase().indexOf(routeKey?.toLowerCase()) >= 0;

const DrawerItemRow: React.FC<
  DrawerItemProps & DrawerContentComponentProps
> = props => {
  const {
    state,
    label,
    icon,
    isAssetIcon = false,
    routeKey,
    translateX,
    // bgAnimStyle,
  } = props;
  const { routes, index } = state;

  const sceneOptions = props.descriptors[routes[index].key]?.options;

  const window = useWindowDimensions();
  const rowWidth = (window.width * 0.75 * 80) / 100;

  const focused = routeKey
    ? getActiveRouteState(routes, index, routeKey)
    : false;
  // const tintColor = focused ? props.activeBackgroundColor : 'black'; // v5
  const tintColor = focused
    ? sceneOptions?.drawerActiveBackgroundColor
    : 'black';

  return (
    <MyPressable
      style={styles.drawerRowStyle}
      touchOpacity={0.6}
      onPress={() =>
        routeKey
          ? props.navigation.navigate(routeKey)
          : props.navigation.dispatch(DrawerActions.closeDrawer())
      }
    >
      <Animated.View
        style={[
          styles.drawerRowbackViewStyle,
          {
            width: rowWidth,
            backgroundColor: focused
              ? // ? props.activeBackgroundColor
                // : props.inactiveBackgroundColor,
                sceneOptions?.drawerActiveBackgroundColor
              : sceneOptions?.drawerInactiveBackgroundColor,
            transform: [{ translateX }],
          },
          // bgAnimStyle,
        ]}
      />
      <View style={styles.drawerRowContentContainer}>
        {isAssetIcon ? (
          <Image
            source={icon}
            style={{ width: 24, height: 24, tintColor }}
            resizeMode="contain"
          />
        ) : (
          <Icon name={icon} size={24} color={tintColor} />
        )}
        <Text
          numberOfLines={1}
          style={[styles.drawerRowTextStyle, { color: tintColor }]}
        >
          {label}
        </Text>
      </View>
    </MyPressable>
  );
};

const DrawerContent: React.FC<DrawerContentComponentProps> = props => {
  const window = useWindowDimensions();
  const rowWidth = (window.width * 0.75 * 80) / 100;
  // const progress = useDrawerProgress();

  const rotate = Animated.interpolateNode(props.progress, {
    inputRange: [0, 1],
    outputRange: [0.3, 0],
  });
  const scale = Animated.interpolateNode(props.progress, {
    inputRange: [0, 1],
    outputRange: [0.9, 1],
  });
  const translateX = Animated.interpolateNode(props.progress, {
    inputRange: [0, 1],
    outputRange: [-rowWidth, 0],
  });

  // For @react-navigation/drawer v6 (more latest versions)
  /* const drawerStyle = useAnimatedStyle(() => {
    const drawerProgress = progress as Animated.SharedValue<number>;

    return {
      transform: [
        { rotate: `${interpolate(drawerProgress.value, [0, 1], [0.3, 0])}rad` },
        { scale: interpolate(drawerProgress.value, [0, 1], [0.9, 1]) },
      ],
    };
  }, []);
  const bgAnimStyle = useAnimatedStyle(() => {
    const drawerProgress = progress as Animated.SharedValue<number>;

    return {
      transform: [
        {
          translateX: interpolate(drawerProgress.value, [0, 1], [-rowWidth, 0]),
        },
      ],
    };
  }, []); */

  return (
    <SafeAreaView edges={['right', 'bottom', 'left']} style={{ flex: 1 }}>
      <View style={{ padding: 16, marginTop: 40 }}>
        <Animated.View
          style={[
            styles.drawerAvatarStyle,
            styles.avatarShadow,
            { transform: [{ rotate: rotate as any, scale }] },
            // drawerStyle,
          ]}
        >
          <Animated.Image
            style={[
              styles.drawerAvatarStyle,
              { transform: [{ rotate: rotate as any, scale }] },
              // drawerStyle,
            ]}
            source={AppImages.userImage}
          />
        </Animated.View>
        <Text style={styles.userName}>Chris Hemsworth</Text>
      </View>
      <View style={styles.divider} />

      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ flexGrow: 1, paddingTop: 0 }}
      >
        {DRAWER_SCENES.map(scene => (
          <DrawerItemRow
            key={scene.label}
            {...{ ...props, ...scene, translateX /* , bgAnimStyle */ }}
          />
        ))}
      </DrawerContentScrollView>

      <MyPressable style={styles.signOutBtnStyle}>
        <Text
          style={{ flex: 1, fontSize: 16, fontFamily: 'WorkSans-SemiBold' }}
        >
          Sign Out
        </Text>
        <Icon name="power-settings-new" size={20} color="red" />
      </MyPressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  userName: {
    fontSize: 18,
    color: '#3A5160',
    fontFamily: 'WorkSans-SemiBold',
    paddingTop: 8,
    paddingLeft: 4,
  },
  drawerRowStyle: {
    marginHorizontal: 0,
    paddingVertical: 8,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  drawerRowbackViewStyle: {
    opacity: 0.3,
    height: 48,
    borderRadius: 24,
    borderTopStartRadius: 0,
    borderBottomStartRadius: 0,
  },
  drawerRowTextStyle: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '500',
  },
  drawerRowContentContainer: {
    flexDirection: 'row',
    padding: 8,
    paddingHorizontal: 16,
    position: 'absolute',
  },
  drawerAvatarStyle: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarShadow: {
    elevation: 24,
    shadowColor: '#3A5160',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
  divider: {
    backgroundColor: 'darkgrey',
    height: StyleSheet.hairlineWidth,
  },
  signOutBtnStyle: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'darkgrey',
  },
});

export default DrawerContent;
