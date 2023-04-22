import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  useWindowDimensions,
  FlatList,
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

interface CategoryBtn {
  text: string;
  selectedCat: string;
  onPress: () => void;
}

const CATEGORIES = ['Ui/Ux', 'Coding', 'Basic UI'];

const CategoryButton = ({ text, selectedCat, onPress }: CategoryBtn) => (
  <>
    <View style={styleCatrgory(selectedCat === text).categoryBtnContainer}>
      <MyPressable touchOpacity={0.6} onPress={onPress}>
        <Text style={styleCatrgory(selectedCat === text).categoryBtnText}>
          {text}
        </Text>
      </MyPressable>
    </View>
    {text !== CATEGORIES[2] && <View style={{ width: 16 }} />}
  </>
);

const HomeDesignCourse: React.FC = () => {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const [selectedCategory, setSelectedCategory] = useState('Ui/Ux');

  const paddingTop = Config.isIos
    ? Math.max(insets.top, 20)
    : StatusBar.currentHeight;

  const renderScrollableHeader = (
    <>
      <View style={[styles.searchInputMainContainer, { width: width * 0.75 }]}>
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
      </View>
      <Text style={styles.sectionHeaderText}>Category</Text>
      <View style={styles.categoryRowContainer}>
        {CATEGORIES.map(text => (
          <CategoryButton
            {...{ text, key: text }}
            selectedCat={selectedCategory}
            onPress={() => setSelectedCategory(text)}
          />
        ))}
      </View>

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
      <Text style={styles.sectionHeaderText}>Popular Course</Text>
    </>
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop }}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.header}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.headerTextNormal}>Choose your</Text>
          <Text style={styles.headerTextBold}>Design Course</Text>
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
    color: 'black',
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
    color: 'black',
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

export default HomeDesignCourse;
