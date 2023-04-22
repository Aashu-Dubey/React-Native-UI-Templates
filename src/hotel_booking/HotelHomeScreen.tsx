import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  useWindowDimensions,
  ListRenderItemInfo,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomerCalendar from './CalendarPopupView';
import FilterModal from './FiltersModal';
import HotelListItem from './HotelListItem';
import MyPressable from '../components/MyPressable';
import { HOTEL_LIST, HotelListType } from './model/hotel_list_data';

const HALF_MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const HotelHomeScreen: React.FC = () => {
  const window = useWindowDimensions();
  const inset = useSafeAreaInsets();
  const navigation = useNavigation();

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(() => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return date;
  });
  const [showCal, setShowCal] = useState<boolean>(false);
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const contentHeader = (
    <View style={{ backgroundColor: 'rgb(242, 242, 242)' }}>
      <View style={{ flexDirection: 'row', padding: 16 }}>
        <TextInput
          style={styles.searchInput}
          placeholder="London..."
          placeholderTextColor="#3c3c434c"
          selectionColor="#54D3C2"
        />
        <View style={styles.searchBtnContainer}>
          <MyPressable
            style={styles.searchBtn}
            android_ripple={{ color: 'grey', radius: 28, borderless: true }}
            touchOpacity={0.6}
          >
            <Icon name="search" size={30} color="white" />
          </MyPressable>
        </View>
      </View>
      <View style={styles.headerDetailContainer}>
        <MyPressable
          style={styles.headerSectionContainer}
          touchOpacity={0.6}
          onPress={() => setShowCal(true)}
        >
          <Text style={styles.headerDetailTitle}>Choose date</Text>
          <Text style={styles.sectionText}>
            {`${String(startDate.getDate()).padStart(2, '0')}, ${
              HALF_MONTHS[startDate.getMonth()]
            } - ${String(endDate.getDate()).padStart(2, '0')}, ${
              HALF_MONTHS[endDate.getMonth()]
            }`}
          </Text>
        </MyPressable>
        <View style={styles.verticalDivider} />
        <View style={styles.headerSectionContainer}>
          <Text style={styles.headerDetailTitle}>Number of Rooms</Text>
          <Text style={styles.sectionText}>1 Room - 2 Adults</Text>
        </View>
      </View>
    </View>
  );

  const renderItem = useCallback(
    (data: ListRenderItemInfo<HotelListType>) =>
      data.index > 0 ? (
        <HotelListItem {...{ data }} />
      ) : (
        <View style={styles.stickyHeaderContainer}>
          <Text style={styles.hotelCountText}>530 hotels found</Text>
          <View style={{ borderRadius: 4, overflow: 'hidden' }}>
            <MyPressable
              style={{ flexDirection: 'row', padding: 8 }}
              onPress={() => setShowFilter(true)}
            >
              <Text style={styles.sectionText}>Filter</Text>
              <Icon
                style={{ paddingHorizontal: 8 }}
                name="sort"
                size={24}
                color="#54D3C2"
              />
            </MyPressable>
          </View>
        </View>
      ),
    [],
  );

  return (
    <>
      {/* Header */}
      <View
        style={[
          styles.header,
          { height: 52 + inset.top, paddingTop: inset.top },
        ]}
      >
        <View style={styles.headerLeft}>
          <MyPressable
            style={{ padding: 8 }}
            android_ripple={{ color: 'grey', radius: 20, borderless: true }}
            onPress={navigation.goBack}
          >
            <Icon name="arrow-back" size={25} color="black" />
          </MyPressable>
        </View>
        <View
          style={{
            marginHorizontal: 16,
            maxWidth: window.width - 16 - 32 - 41 - 74, // 16, 32:- total padding/margin; 41, 74:- left and right view's width
          }}
        >
          <Text style={styles.headerTitle} numberOfLines={1}>
            Explore
          </Text>
        </View>
        <View style={styles.headerRight}>
          <Icon
            style={{ paddingRight: 8 }}
            name="favorite-border"
            size={25}
            color="black"
          />
          <Icon
            style={{ paddingHorizontal: 8 }}
            name="location-pin"
            size={25}
            color="black"
          />
        </View>
      </View>

      <View style={styles.container}>
        <FlatList
          contentContainerStyle={[styles.list, { paddingBottom: inset.bottom }]}
          stickyHeaderIndices={[1]}
          nestedScrollEnabled
          ListHeaderComponent={contentHeader}
          data={HOTEL_LIST}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>

      <CustomerCalendar
        {...{ showCal, setShowCal }}
        minimumDate={new Date()}
        initialStartDate={startDate}
        initialEndDate={endDate}
        onApplyClick={(startData, endData) => {
          if (startData != null && endData != null) {
            setStartDate(startData);
            setEndDate(endData);
          }
        }}
      />
      <FilterModal {...{ showFilter, setShowFilter }} />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'lightgrey',
  },
  headerLeft: {
    alignItems: 'flex-start',
    flexGrow: 1,
    flexBasis: 0,
  },
  headerTitle: {
    color: 'black',
    fontSize: 22,
    fontFamily: 'WorkSans-SemiBold',
    textAlign: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexGrow: 1,
    flexBasis: 0,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgb(242, 242, 242)',
  },
  list: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 32,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 16,
    color: 'black',
    fontSize: 18,
    elevation: 8,
    shadowColor: 'lightgrey',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  searchBtnContainer: {
    borderRadius: 36,
    elevation: 12,
  },
  searchBtn: {
    padding: 12,
    backgroundColor: '#54D3C2',
    borderRadius: 36,
    shadowColor: 'grey',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  headerDetailContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerDetailTitle: {
    color: 'darkgrey',
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'WorkSans-Regular',
  },
  sectionText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'WorkSans-Regular',
  },
  verticalDivider: {
    width: 1,
    backgroundColor: 'darkgrey',
    marginRight: 8,
    marginVertical: 8,
  },
  headerSectionContainer: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  stickyHeaderContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  hotelCountText: {
    flex: 1,
    color: 'black',
    fontSize: 16,
    alignSelf: 'center',
    fontFamily: 'WorkSans-Regular',
  },
});

export default HotelHomeScreen;
