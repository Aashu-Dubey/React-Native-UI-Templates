import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Image,
  Animated,
  ListRenderItemInfo,
  View,
  Text,
  FlatList,
  Easing,
  useWindowDimensions,
  GestureResponderEvent,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyPressable from './components/MyPressable';
import { AppImages } from './assets';
import { showToast } from './util/action';

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
];

interface ListItemProps {
  data: ListRenderItemInfo<(typeof DEMOS)[0]>;
  isGrid: boolean;
  onScreenClicked: ((event: GestureResponderEvent) => void) | null | undefined;
}

const ListItem: React.FC<ListItemProps> = ({
  data,
  isGrid,
  onScreenClicked,
}) => {
  const { index, item } = data;

  const { width } = useWindowDimensions();

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

  return (
    <Animated.View
      style={{
        width: itemWidth,
        height: itemWidth / 1.5,
        margin: 6,
        // height: isGrid ? 120 : 250,
        opacity,
        transform: [{ translateY }],
      }}
    >
      <Image
        style={[
          styles.demoImg,
          { opacity: item.screenName === '' ? 0.4 : 1.0 }, // Faded if Template is not available
        ]}
        source={item.background}
        resizeMode="cover"
      />

      <MyPressable
        style={styles.demoPressable}
        android_ripple={{ color: 'rgba(128,128,128,0.3)' }}
        touchOpacity={0.6}
        onPress={onScreenClicked}
      />
    </Animated.View>
  );
};

const HomeScene: React.FC = () => {
  const navigation = useNavigation<any>();
  const inset = useSafeAreaInsets();

  const [isGrid, setGrid] = useState(true);

  const onTemplateClicked = (temp: (typeof DEMOS)[0]) => {
    if (temp.screenName) {
      navigation.navigate(temp.screenName);
    } else {
      showToast('Coming soon...');
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, marginTop: inset.top ? inset.top : 24 }}
      edges={['left', 'right']}
    >
      <View style={styles.headerContainer}>
        <MyPressable
          style={{ marginLeft: 8 }}
          android_ripple={{ color: 'grey', radius: 20, borderless: true }}
          touchOpacity={0.6}
          onPress={() => navigation.toggleDrawer()}
        >
          <Icon name="menu" size={25} color="black" />
        </MyPressable>
        <Text style={styles.headerText}>React-Native UI</Text>
        <MyPressable
          style={{ marginRight: 8 }}
          android_ripple={{ color: 'grey', radius: 20, borderless: true }}
          touchOpacity={0.6}
          onPress={() => setGrid(!isGrid)}
        >
          <Icon
            name={isGrid ? 'dashboard' : 'view-agenda'}
            size={25}
            color="black"
          />
        </MyPressable>
      </View>

      <FlatList
        key={isGrid ? 'G' : 'L'}
        style={{ marginHorizontal: 6 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: inset.bottom }}
        numColumns={isGrid ? 2 : 1}
        showsVerticalScrollIndicator={false}
        data={DEMOS}
        renderItem={data => (
          <ListItem
            {...{ data, isGrid }}
            onScreenClicked={() => onTemplateClicked(data.item)}
          />
        )}
        keyExtractor={item => item.name}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 0,
  },
  headerText: {
    flex: 1,
    color: 'black',
    fontSize: 22,
    fontFamily: 'WorkSans-Bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  demoImg: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  demoPressable: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(128,128,128,0.1)',
    borderRadius: 4,
  },
});

export default HomeScene;
