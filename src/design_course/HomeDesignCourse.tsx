import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  useWindowDimensions,
  FlatList,
  Platform,
  Animated
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CategoryListView from './CategoryListView';
import PopulerCourseListView from './PopulerCourseListView';
import MyPressable from '../components/MyPressable';
import { CATEGORY_LIST, POPULAR_COURSE_LIST } from './model/category';
import { AppImages } from '../assets';
import Config from '../Config';
import { CATEGORIES } from '../util/constants';
import functions from '@react-native-firebase/functions';

interface CategoryBtn {
  text: string;
  selectedCat: string;
  onPress: () => void;
}

if (__DEV__) {
  functions().useEmulator('localhost', 5001);
}

const CategoryButton = ({ text, selectedCat, onPress }: CategoryBtn) => (
  <>
    <View style={styleCatrgory(selectedCat === text).categoryBtnContainer}>
      <MyPressable touchOpacity={0.6} onPress={onPress}>
        <Text style={styleCatrgory(selectedCat === text).categoryBtnText}>
          {text}
        </Text>
      </MyPressable>
    </View>
    {<View style={{ width: 16 }} />}
  </>
);

const HomeScene: React.FC = () => {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const opacity3 = useRef<Animated.Value>(new Animated.Value(0));

  const [selectedCategory, setSelectedCategory] = useState('Ui/Ux');
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);

  const paddingTop = Config.isIos
    ? Math.max(insets.top, 20)
    : StatusBar.currentHeight;
  
  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity3.current, {
        toValue: 1,
        duration: 500,
        delay: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    functions()
      .httpsCallable('getAllFinanceBooks')()
      .then(response => {
        setBook(response.data);
        setLoading(false);
      });
  }, []);


  const renderScrollableHeader = (
    <>
      <Animated.View
        style={[styles.randomPickBookContainer, { opacity: opacity3.current }]}
        renderToHardwareTextureAndroid
      >
        <View style={styles.joinCourse}>
          <MyPressable onPress={() => console.log(book)}>
            <Text style={styles.joinCourseText}>Read Something</Text>
          </MyPressable>
        </View>
        <View style={{ width: 16 }} />
        <View style={styles.addView}>
          <Icon name="add" size={28} color="rgb(0, 182, 240)" />
        </View>
      </Animated.View>
      {/* search bar */}
      {/* <View style={[styles.searchInputMainContainer, { width: width * 0.75 }]}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={[
              styles.searchInput,
              !Config.isAndroid && { paddingVertical: 16 },
            ]}
            autoCapitalize="none"
            selectionColor="dodgerblue"
            placeholderTextColor="#B9BABC"
            placeholder="Search for course"
          />
          <Icon name="search" size={25} color="#B9BABC" />
        </View>
      </View> */}
      {/* Popular */}
      <Text style={styles.sectionHeaderText}>Popular Books</Text>

      <FlatList
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 3}}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={CATEGORIES}
        renderItem={data => (
          <CategoryButton
            text={data.item}
            selectedCat={selectedCategory}
            onPress={() => setSelectedCategory(data.item)}
          />
        )}
        keyExtractor={(category) => category}
      />
      

      <FlatList
        contentContainerStyle={{ padding: 16 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={CATEGORY_LIST}
        renderItem={data => (
          <CategoryListView
            {...{ data }}
            onScreenClicked={() => navigation.navigate('CourseInfo')}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
      <Text style={styles.sectionHeaderText}>Categories</Text>
    </>
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop }}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.header}>
        
        <View style={{ flex: 1, justifyContent: 'center' }}>
        <MyPressable
          style={{ marginLeft: 8 }}
          android_ripple={{ color: 'grey', radius: 20, borderless: true }}
          touchOpacity={0.6}
          onPress={() => navigation.toggleDrawer()}
        >
          <Icon name="menu" size={25} color="black" />
        </MyPressable>
          {/* <Text style={styles.headerTextNormal}>Choose your</Text>
          <Text style={styles.headerTextBold}>Design Course</Text> */}
        </View>
        
        <Image
          style={{ width: 60, height: 60 }}
          source={AppImages.design_header_image}
        />
      </View>

      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 16 + insets.bottom,
        }}
        columnWrapperStyle={{ paddingHorizontal: 8 }}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={POPULAR_COURSE_LIST}
        ListHeaderComponent={renderScrollableHeader}
        ItemSeparatorComponent={() => <View style={{ height: 32 }} />}
        renderItem={data => (
          <PopulerCourseListView
            {...{ data }}
            onScreenClicked={() => navigation.navigate('CourseInfo')}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
  randomPickBookContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingVertical:25,
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
  searchInputMainContainer: {
    marginTop: 8,
    marginLeft: 18,
    height: 64,
  },
  searchInputContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFB',
    marginVertical: 8,
    borderRadius: 13,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'WorkSans-SemiBold',
    color: 'dodgerblue',
  },
  sectionHeaderText: {
    fontSize: 22,
    fontFamily: 'WorkSans-SemiBold',
    letterSpacing: 0.27,
    paddingTop: 8,
    paddingLeft: 18,
    paddingRight: 16,
    marginBottom: 16,
  },
  categoryRowContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingHorizontal: 18,
  },
  headerTextNormal: {
    color: 'grey',
    fontFamily: 'WorkSans-Regular',
    letterSpacing: 0.2,
  },
  headerTextBold: {
    fontSize: 22,
    fontFamily: 'WorkSans-Bold',
    letterSpacing: 0.2,
  },
});

const styleCatrgory = (selected: boolean) =>
  StyleSheet.create({
    categoryBtnContainer: {
      flex: 1,
      overflow: 'hidden',
      borderRadius: 24,
      borderColor: 'rgb(0, 182, 240)',
      borderWidth: 1,
      backgroundColor: selected ? 'rgb(0, 182, 240)' : 'transparent',
    },
    categoryBtnText: {
      padding: 18,
      paddingVertical: 12,
      fontSize: 12,
      fontFamily: 'WorkSans-SemiBold',
      letterSpacing: 0.27,
      alignSelf: 'center',
      color: selected ? 'white' : 'rgb(0, 182, 240)',
    },
  });

export default HomeScene;
