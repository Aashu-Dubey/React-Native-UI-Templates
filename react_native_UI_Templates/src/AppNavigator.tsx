import React from 'react';
import { StatusBar, StyleSheet, useWindowDimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  HomeScene,
  DrawerContent,
  HelpScene,
  FeedbackScene,
  InviteFriendScene,
} from '.';
import { CourseInfoScreen, HomeDesignCourse } from './design_course';
import { IntroductionAnimationScreen } from './introduction_animation';
import HotelHomeScreen from './hotel_booking/HotelHomeScreen';

/**
 * TODO:- Temporarily using r-nav-drawer version '6.0.0-next.2', as after this version, shadow issue started appearing for drawer
 * As explained here:- https://github.com/react-navigation/react-navigation/issues/10946
 * replace with the latest version, once this issue is fixed (or if not, find a workaround).
 */
const Drawer = createDrawerNavigator();
/**
 * TODO:- Temporarily using r-nav-stack instead of r-nav-native-stack cause of following issue:
 * https://github.com/react-navigation/react-navigation/issues/10941
 * Replace with r-nav-native-stack, once this is fixed.
 */
const Stack = createStackNavigator();
// const Stack = createNativeStackNavigator();

const DrawerNavigator: React.FC = () => {
  const window = useWindowDimensions();

  return (
    <Drawer.Navigator
      // drawerStyle={{
      //   width: window.width * 0.75,
      //   backgroundColor: 'rgb(237, 240, 242, 0.5)',
      // }}
      // sceneContainerStyle={styles.drawerSceneContainer}
      screenOptions={{
        drawerStyle: {
          width: window.width * 0.75,
          backgroundColor: 'rgb(237, 240, 242, 0.5)',
        },
        sceneContainerStyle: styles.drawerSceneContainer,
        drawerActiveBackgroundColor: '#5cbbff',
        drawerType: 'back',
        overlayColor: 'transparent',
        swipeEdgeWidth: window.width,
        headerShown: false,
      }}
      // drawerContentOptions={{ activeBackgroundColor: '#5cbbff' }}
      drawerContent={props => <DrawerContent {...props} />}
      // drawerType="back"
      // overlayColor="transparent"
      // edgeWidth={window.width}
    >
      <Drawer.Screen name="home" component={HomeScene} />
      <Drawer.Screen name="help" component={HelpScene} />
      <Drawer.Screen name="feedback" component={FeedbackScene} />
      <Drawer.Screen name="invite_friend" component={InviteFriendScene} />
    </Drawer.Navigator>
  );
};

export default () => {
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainDrawer" component={DrawerNavigator} />

        <Stack.Screen name="Hotel" component={HotelHomeScreen} />

        <Stack.Group>
          <Stack.Screen name="DesignCourse" component={HomeDesignCourse} />
          <Stack.Screen name="CourseInfo" component={CourseInfoScreen} />
        </Stack.Group>

        <Stack.Screen
          name="onBoarding"
          component={IntroductionAnimationScreen}
        />
      </Stack.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  drawerSceneContainer: {
    elevation: 24,
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
  },
});
