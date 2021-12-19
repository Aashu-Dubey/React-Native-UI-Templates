import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  ListRenderItemInfo,
  Pressable,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Config from '../Config';
import { CategoryType } from './model/category';

interface Props {
  data: ListRenderItemInfo<CategoryType>;
  onScreenClicked: () => void;
}

const PopulerCourseListView: React.FC<Props> = ({ data, onScreenClicked }) => {
  const { index, item } = data;
  const translateY = useRef<Animated.Value>(new Animated.Value(50)).current;
  const opacity = useRef<Animated.Value>(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 1000,
        delay: index * (1000 / 3),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        delay: index * (1000 / 3),
        useNativeDriver: true,
      }),
    ]).start();
  });

  return (
    <Animated.View
      style={[styles.container, { opacity, transform: [{ translateY }] }]}
      renderToHardwareTextureAndroid // just to avoid UI glitch when animating view with elevation
    >
      <Pressable
        style={({ pressed }) => [
          {
            flex: 1,
            aspectRatio: 0.8,
            opacity: !Config.isAndroid && pressed ? 0.6 : 1,
          },
        ]}
        android_ripple={{ color: 'lightgrey' }}
        onPress={onScreenClicked}
      >
        <View style={styles.bgColorView} />
        <View style={{ ...StyleSheet.absoluteFillObject }}>
          <View style={{ padding: 16 }}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.lessionCountRatingContainer}>
              <Text style={[styles.textStyle, { flex: 1, fontSize: 12 }]}>
                {item.lessonCount} lesson
              </Text>
              <Text style={styles.textStyle}>{item.rating}</Text>
              <Icon name="star" size={20} color="rgb(0, 182, 240)" />
            </View>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Animated.View style={[styles.imageContainer /*, { opacity }, */]}>
              <Image
                style={{ height: '100%', borderRadius: 16, aspectRatio: 1.28 }}
                source={item.imagePath}
              />
            </Animated.View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 16,
  },
  bgColorView: {
    flex: 1,
    marginBottom: 48,
    borderRadius: 16,
    backgroundColor: '#F8FAFB',
  },
  title: {
    fontSize: 16,
    fontFamily: 'WorkSans-SemiBold',
    letterSpacing: 0.27,
    color: 'rgb(23, 38, 42)',
  },
  lessionCountRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
  },
  textStyle: {
    fontSize: 18,
    fontFamily: 'WorkSans-Regular',
    letterSpacing: 0.27,
    color: 'rgb(58, 81, 96)',
  },
  imageContainer: {
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 4,
    elevation: 2,
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.22,
    shadowRadius: 6.0,
  },
});

export default PopulerCourseListView;
