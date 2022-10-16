import React from 'react';
import { StatusBar, StyleSheet, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import {
  HomeScene,
  DrawerContent,
  HelpScene,
  FeedbackScene,
  InviteFriendScene,
} from '.';
import { CourseInfoScreen, HomeDesignCourse } from './design_course';
import { IntroductionAnimationScreen } from './introduction_animation';
import HotelHomeScreen, {
  HEADER_OPTIONS,
} from './hotel_booking/HotelHomeScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerNavigator: React.FC = () => {
  const window = useWindowDimensions();

  return (
    <Drawer.Navigator
      drawerStyle={{
        width: window.width * 0.75,
        backgroundColor: 'rgb(237, 240, 242, 0.5)',
      }}
      sceneContainerStyle={styles.drawerSceneContainer}
      drawerContentOptions={{ activeBackgroundColor: '#5cbbff' }}
      drawerContent={props => <DrawerContent {...props} />}
      drawerType="back"
      overlayColor="transparent"
      edgeWidth={window.width}
    >
      <Drawer.Screen name="home" component={HomeScene} />
      <Drawer.Screen name="help" component={HelpScene} />
      <Drawer.Screen name="feedback" component={FeedbackScene} />
      <Drawer.Screen name="invite_friend" component={InviteFriendScene} />
    </Drawer.Navigator>
  );
};

export default () => {
  const inset = useSafeAreaInsets();

  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainDrawer" component={DrawerNavigator} />

        <Stack.Screen
          name="Hotel"
          component={HotelHomeScreen}
          options={{
            headerShown: true,
            headerStyle: { height: 60 + inset.top },
            ...HEADER_OPTIONS,
          }}
        />

        <Stack.Screen name="DesignCourse" component={HomeDesignCourse} />
        <Stack.Screen name="CourseInfo" component={CourseInfoScreen} />

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
