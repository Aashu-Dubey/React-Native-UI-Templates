import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Pressable,
  Image,
  Animated,
  ListRenderItemInfo,
  View,
  Text,
  StatusBar,
  Platform,
  Easing,
  useWindowDimensions,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/stack';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppImages } from '../res';
import { showToast } from './util/action';
import Config from './Config';

interface Props {}

const DEMOS = [
  {
    name: 'onBoarding',
    background: AppImages.introduction_animation,
    screenName: 'onBoarding',
  },
  {
    name: 'hotel',
    background: AppImages.hotel_booking,
    screenName: 'Hotel',
  },
  {
    name: 'fitness_app',
    background: AppImages.fitness_app,
    screenName: '',
  },
  {
    name: 'design_course',
    background: AppImages.design_course,
    screenName: 'DesignCourse',
  },
  /* {
    name: '',
    background: undefined,
    screenName: '',
  }, */
];

interface ListItemProps {
  data: ListRenderItemInfo<typeof DEMOS[0]>;
  isGrid: boolean;
  onScreenClicked: () => void;
}
const ListItem: React.FC<ListItemProps> = ({
  data,
  isGrid,
  onScreenClicked,
}) => {
  const { width } = useWindowDimensions();
  const { index, item } = data;
  const translateY = useRef<Animated.Value>(new Animated.Value(50)).current;
  const opacity = useRef<Animated.Value>(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 1000,
        delay: index * (1000 / 3),
        easing: Easing.bezier(0.4, 0.0, 0.2, 1.0),
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

  const itemWidth = isGrid ? (width - 36) / 2 : width - 24;

  /* if (item.name.length === 0) { // handling odd number of grid list
    return null;
  } */
  return (
    <Animated.View
      style={{
        // flex: 1,
        width: itemWidth,
        height: itemWidth / 1.5,
        margin: 6,
        // height: isGrid ? 120 : 250,
        opacity,
        transform: [{ translateY }],
      }}
    >
      <Image
        style={{
          width: '100%',
          height: '100%',
          // aspectRatio: 1.5,
          borderRadius: 4,
          opacity: item.screenName === '' ? 0.4 : 1.0, // Faded if Template is not available
        }}
        source={item.background}
        resizeMode="cover"
      />

      <Pressable
        style={({ pressed }) => [
          {
            // flex: 1,
            borderRadius: 4,
            backgroundColor: 'rgba(128,128,128,0.1)',
            ...StyleSheet.absoluteFillObject,
            opacity: !Config.isAndroid && pressed ? 0.6 : 1,
          },
        ]}
        android_ripple={{ color: 'rgba(128,128,128,0.3)' }}
        onPress={onScreenClicked}
      />
    </Animated.View>
  );
};

const HomeScene: React.FC<Props> = () => {
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation<any>();
  const [isGrid, setGrid] = useState(true);

  const onTemplateClicked = (temp: typeof DEMOS[0]) => {
    if (temp.screenName) {
      navigation.navigate(temp.screenName);
    } else {
      showToast('Coming soon...');
    }
  };

  const inset = useSafeAreaInsets();
  const marginTop =
    Platform.OS === 'ios' ? inset.top : StatusBar.currentHeight ?? 24;

  return (
    <SafeAreaView style={{ flex: 1, marginTop }} edges={['left', 'right']}>
      <View
        style={{
          height: 52,
          flexDirection: 'row',
          alignItems: 'center',
          padding: 8,
          paddingBottom: 0,
        }}
      >
        <Pressable
          style={({ pressed }) => [
            {
              marginTop: 8,
              marginLeft: 8,
              opacity: !Config.isAndroid && pressed ? 0.6 : 1,
            },
          ]}
          onPress={() => navigation.toggleDrawer()}
          android_ripple={{ color: 'grey', radius: 20, borderless: true }}
        >
          <Icon name="menu" size={25} color="black" />
        </Pressable>
        <Text style={styles.headerText}>React-Native UI</Text>
        <Pressable
          style={({ pressed }) => [
            {
              marginTop: 8,
              marginRight: 8,
              opacity: !Config.isAndroid && pressed ? 0.6 : 1,
            },
          ]}
          onPress={() => setGrid(!isGrid)}
          android_ripple={{ color: 'grey', radius: 20, borderless: true }}
        >
          <Icon
            name={isGrid ? 'dashboard' : 'view-agenda'}
            size={25}
            color="black"
          />
        </Pressable>
      </View>
      <FlatList
        key={isGrid ? 'G' : 'L'}
        style={{ marginTop: headerHeight, marginHorizontal: 6 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: inset.bottom }}
        data={DEMOS}
        keyExtractor={(item) => item.name}
        numColumns={isGrid ? 2 : 1}
        renderItem={(data) => (
          <ListItem
            data={data}
            isGrid={isGrid}
            onScreenClicked={() => onTemplateClicked(data.item)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerText: {
    flex: 1,
    fontSize: 22,
    fontFamily: 'WorkSans-Bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingTop: 4,
  },
});

export default HomeScene;
