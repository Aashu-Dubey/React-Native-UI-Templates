import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  Pressable,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppImages } from '../res';
import Config from './Config';

interface DrawerItemProps {
  label: string;
  icon: any;
  isAssetIcon?: boolean;
  translateX: Animated.Adaptable<number>;
  onpress?: () => void | null | undefined;
}

const DrawerItemRow: React.FC<
  DrawerItemProps & DrawerContentComponentProps<DrawerContentOptions>
> = (props) => {
  const window = useWindowDimensions();
  const rowWidth = (window.width * 0.75 * 80) / 100;
  const {
    state,
    label,
    icon,
    isAssetIcon = false,
    translateX,
    onpress,
  } = props;
  const { routes, index } = state;
  const focused = getActiveRouteState(routes, index, label);

  const tintColor = focused ? props.activeBackgroundColor : 'black';
  return (
    <Pressable
      style={({ pressed }) => [
        styles.drawerRowStyle,
        { opacity: !Config.isAndroid && pressed ? 0.6 : 1 },
      ]}
      android_ripple={{ color: 'lightgrey' }}
      onPress={onpress}
    >
      <Animated.View
        style={[
          styles.drawerRowbackViewStyle,
          {
            width: rowWidth,
            backgroundColor: focused
              ? props.activeBackgroundColor
              : props.inactiveBackgroundColor,
            transform: [{ translateX }],
          },
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
    </Pressable>
  );
};

const getActiveRouteState = (routes: any[], index: number, name: string) =>
  routes[index].name.toLowerCase().indexOf(name.toLowerCase()) >= 0;

const DrawerContent: React.FC<DrawerContentComponentProps<
  DrawerContentOptions
>> = (props) => {
  const window = useWindowDimensions();
  const rowWidth = (window.width * 0.75 * 80) / 100;
  const rotate = Animated.interpolate(props.progress, {
    inputRange: [0, 1],
    outputRange: [0.3, 0],
  });
  const scale = Animated.interpolate(props.progress, {
    inputRange: [0, 1],
    outputRange: [0.9, 1],
  });
  const translateX = Animated.interpolate(props.progress, {
    inputRange: [0, 1],
    outputRange: [-rowWidth, 0],
  });

  return (
    <SafeAreaView edges={['right', 'bottom', 'left']} style={{ flex: 1 }}>
      <View style={{ padding: 16, marginTop: 40 }}>
        <Animated.View
          style={[
            styles.drawerAvatarStyle,
            styles.avatarShadow,
            { transform: [{ rotate, scale }] },
          ]}
        >
          <Animated.Image
            style={[
              styles.drawerAvatarStyle,
              { transform: [{ rotate, scale }] },
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
        <DrawerItemRow
          label="Home"
          icon="home"
          {...{ ...props, translateX }}
          onpress={() => props.navigation.navigate('Home')}
        />
        <DrawerItemRow
          label="Help"
          icon={AppImages.support_icon}
          isAssetIcon
          {...{ ...props, translateX }}
          onpress={() => props.navigation.navigate('Help')}
        />
        <DrawerItemRow
          label="Feedback"
          icon="help"
          {...{ ...props, translateX }}
          onpress={() => props.navigation.navigate('Feedback')}
        />
        <DrawerItemRow
          label="Invite Friend"
          icon="group"
          {...{ ...props, translateX }}
          onpress={() => props.navigation.navigate('Invite Friend')}
        />
        <DrawerItemRow
          label="Rate the app"
          icon="share"
          {...{ ...props, translateX }}
          onpress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
        />
        <DrawerItemRow
          label="About Us"
          icon="info"
          {...{ ...props, translateX }}
          onpress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
        />
      </DrawerContentScrollView>

      <Pressable
        style={({ pressed }) => [
          styles.signOutBtnStyle,
          { opacity: !Config.isAndroid && pressed ? 0.4 : 1 },
        ]}
        android_ripple={{ color: 'lightgrey' }}
      >
        <Text
          style={{ flex: 1, fontSize: 16, fontFamily: 'WorkSans-SemiBold' }}
        >
          Sign Out
        </Text>
        <Icon name="power-settings-new" size={20} color="red" />
      </Pressable>
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
    // opacity: 0.6,
  },
  signOutBtnStyle: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'darkgrey',
  },
});

export default DrawerContent;
