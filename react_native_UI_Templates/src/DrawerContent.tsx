import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  Pressable,
  Image,
} from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import { DrawerActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppImages } from '../res';

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
      style={styles.drawerRowStyle}
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
            //   marginVertical: 8,
            transform: [{ translateX }],
          },
        ]}
      />
      <View
        style={{
          flexDirection: 'row',
          padding: 8,
          paddingHorizontal: 16,
          position: 'absolute',
        }}
      >
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
      {/* <DrawerItem
            label="Home"
            onPress={() => props.navigation.navigate('Home')}
            labelStyle={{ marginLeft: -24, fontSize: 16, paddingVertical: 8 }}
            icon={({ focused }) => (
              <Icon
                style={{ paddingHorizontal: 6 }}
                name="home"
                size={24}
                color={focused ? props.activeBackgroundColor : 'black'}
              />
            )}
            style={{
              position: 'absolute',
              width: window.width * 0.75,
              backgroundColor: 'transparent',
              marginLeft: 0,
              //   borderRadius: 24,
              //   borderTopStartRadius: 0,
              //   borderBottomStartRadius: 0,
            }}
            focused={getActiveRouteState(routes, index, 'Home')}
          /> */}
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
    <>
      <View style={{ padding: 16, marginTop: 30 }}>
        <Animated.View
          style={[
            styles.drawerAvatarStyle,
            {
              elevation: 16,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 8,
              },
              shadowOpacity: 0.44,
              shadowRadius: 10.32,
              transform: [{ rotate, scale }],
            },
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
        <Text
          style={{
            fontSize: 18,
            color: 'grey',
            fontFamily: 'WorkSans-SemiBold',
            paddingTop: 4,
          }}
        >
          Chris Hemsworth
        </Text>
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
        style={styles.signOutBtnStyle}
        android_ripple={{ color: 'lightgrey' }}
      >
        <Text
          style={{ flex: 1, fontSize: 16, fontFamily: 'WorkSans-SemiBold' }}
        >
          Sign Out
        </Text>
        <Icon name="power-settings-new" size={20} color="red" />
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
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
  drawerAvatarStyle: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  divider: {
    backgroundColor: 'black',
    height: StyleSheet.hairlineWidth,
    opacity: 0.6,
  },
  signOutBtnStyle: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default DrawerContent;
