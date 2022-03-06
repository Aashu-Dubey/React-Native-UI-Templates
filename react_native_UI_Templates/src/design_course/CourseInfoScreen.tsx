import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  ImageBackground,
  useWindowDimensions,
  ScrollView,
  Pressable,
  Platform,
  Animated,
  Easing,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppImages } from '../../res';
import Config from '../Config';

interface Props {}

const infoHeight = 364.0;

const CourseInfoScreen: React.FC<Props> = () => {
  const window = useWindowDimensions();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  // const tempHeight = window.height - window.width / 1.2 + 24.0;
  const marginTop =
    Platform.OS === 'ios' ? Math.max(insets.top, 20) : StatusBar.currentHeight;

  const favIconScale = useRef<Animated.Value>(new Animated.Value(0.1));
  const opacity1 = useRef<Animated.Value>(new Animated.Value(0));
  const opacity2 = useRef<Animated.Value>(new Animated.Value(0));
  const opacity3 = useRef<Animated.Value>(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(favIconScale.current, {
      toValue: 1,
      duration: 1000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    Animated.parallel([
      Animated.timing(opacity1.current, {
        toValue: 1,
        duration: 500,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity2.current, {
        toValue: 1,
        duration: 500,
        delay: 400,
        useNativeDriver: true,
      }),
      Animated.timing(opacity3.current, {
        toValue: 1,
        duration: 500,
        delay: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const getTimeBoxUI = (text1: string, text2: string) => (
    <View style={styles.timeBoxContainer}>
      <Text style={[styles.textStyle, styles.timeBoxTitle]}>{text1}</Text>
      <Text style={[styles.textStyle, { fontSize: 14 }]}>{text2}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <ImageBackground
        style={{ flex: 1 }}
        imageStyle={{ height: window.width / 1.2 }}
        source={AppImages.webInterFace}
      >
        <View
          style={{
            flex: 1,
            shadowColor: 'grey',
            shadowOffset: { width: 1.1, height: 1.1 },
            shadowOpacity: 0.2,
            shadowRadius: 10.0,
          }}
        >
          <ScrollView
            style={[
              styles.scrollContainer,
              {
                marginTop: window.width / 1.2 - 24,
                paddingBottom: insets.bottom,
              },
            ]}
            contentContainerStyle={{
              flexGrow: 1,
              minHeight: infoHeight,
              // maxHeight: tempHeight > infoHeight ? tempHeight : infoHeight,
            }}
          >
            <Text style={styles.courseTitle}>{'Web Design\nCourse'}</Text>
            <View style={styles.priceRatingContainer}>
              <Text
                style={[
                  styles.textStyle,
                  { flex: 1, color: 'rgb(0, 182, 240)' },
                ]}
              >
                $28.99
              </Text>
              <Text style={styles.textStyle}>4.3</Text>
              <Icon name="star" size={24} color="rgb(0, 182, 240)" />
            </View>
            <Animated.View
              style={{
                flexDirection: 'row',
                padding: 8,
                opacity: opacity1.current,
              }}
              renderToHardwareTextureAndroid // just to avoid UI glitch when animating view with elevation
            >
              {getTimeBoxUI('24', 'Classes')}
              {getTimeBoxUI('2 hours', 'Time')}
              {getTimeBoxUI('24', 'Seat')}
            </Animated.View>
            <Animated.Text
              style={[styles.courseDescription, { opacity: opacity2.current }]}
              numberOfLines={3}
            >
              Lorem ipsum is simply dummy text of printing & typesetting
              industry, Lorem ipsum is simply dummy text of printing &
              typesetting industry.
            </Animated.Text>
            <Animated.View
              style={[styles.footerContainer, { opacity: opacity3.current }]}
              renderToHardwareTextureAndroid
            >
              <View style={styles.addView}>
                <Icon name="add" size={28} color="rgb(0, 182, 240)" />
              </View>
              <View style={{ width: 16 }} />
              <View style={styles.joinCourse}>
                <Pressable android_ripple={{ color: 'lightgrey' }}>
                  <Text style={styles.joinCourseText}>Join Course</Text>
                </Pressable>
              </View>
            </Animated.View>
          </ScrollView>
        </View>
        <Animated.View
          style={[
            styles.favoriteIcon,
            {
              top: window.width / 1.2 - 24 - 35,
              transform: [{ scale: favIconScale.current }],
            },
          ]}
        >
          <Icon name="favorite" size={28} color="white" />
        </Animated.View>
        <Pressable
          style={({ pressed }) => [
            styles.backBtn,
            { marginTop, opacity: !Config.isAndroid && pressed ? 0.4 : 1 },
          ]}
          android_ripple={{ color: 'darkgrey', borderless: true, radius: 28 }}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back-ios" size={24} color="black" />
        </Pressable>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 8,
    elevation: 16,
  },
  courseTitle: {
    fontSize: 22,
    fontFamily: 'WorkSans-SemiBold',
    letterSpacing: 0.27,
    paddingTop: 32,
    paddingLeft: 18,
    paddingRight: 16,
  },
  priceRatingContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 22,
    fontFamily: 'WorkSans-Regular',
    color: 'darkslategrey',
    letterSpacing: 0.27,
  },
  timeBoxContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    alignItems: 'center',
    margin: 8,
    paddingHorizontal: 18,
    paddingVertical: 12,
    elevation: 3,
    shadowColor: 'grey',
    shadowOffset: { width: 1.1, height: 1.1 },
    shadowOpacity: 0.22,
    shadowRadius: 8.0,
  },
  timeBoxTitle: {
    fontSize: 14,
    fontFamily: 'WorkSans-SemiBold',
    color: 'rgb(0, 182, 240)',
  },
  courseDescription: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'WorkSans-Regular',
    textAlign: 'justify',
    color: 'darkslategrey',
    letterSpacing: 0.27,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  footerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  addView: {
    width: 48,
    height: 48,
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinCourse: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: 'rgb(0, 182, 240)',
    elevation: 4,
    shadowColor: 'rgb(0, 182, 240)',
    shadowOffset: { width: 1.1, height: 1.1 },
    shadowOpacity: 0.5,
    shadowRadius: 10.0,
    ...Platform.select({ android: { overflow: 'hidden' } }),
  },
  joinCourseText: {
    padding: 18,
    paddingVertical: 12,
    fontSize: 18,
    fontFamily: 'WorkSans-SemiBold',
    alignSelf: 'center',
    color: 'white',
  },
  favoriteIcon: {
    position: 'absolute',
    right: 35,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgb(0, 182, 240)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 18,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
  backBtn: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CourseInfoScreen;
