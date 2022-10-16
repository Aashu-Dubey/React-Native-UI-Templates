import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackNavigationOptions } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomerCalendar from './CalendarPopupView';
import FilterModal from './FiltersModal';
import HotelListItem from './HotelListItem';
import MyPressable from '../components/MyPressable';
import { HOTEL_LIST } from './model/hotel_list_data';

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

// Header's UI customisation for react-navigation's default screen header.
export const HEADER_OPTIONS: StackNavigationOptions = {
  headerTitle: 'Explore',
  headerTitleAlign: 'center',
  headerTitleStyle: { fontSize: 22, fontFamily: 'WorkSans-SemiBold' },
  headerLeft: props => (
    <MyPressable
      {...props}
      style={{ padding: 8, marginLeft: 8 }}
      android_ripple={{ color: 'grey', radius: 20, borderless: true }}
    >
      <Icon name="arrow-back" size={25} color="black" />
    </MyPressable>
  ),
  headerRight: () => (
    <View style={{ flexDirection: 'row' }}>
      <Icon
        style={{ paddingHorizontal: 8 }}
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
  ),
};

const HotelHomeScreen: React.FC = () => {
  const inset = useSafeAreaInsets();

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
          <Text style={{ fontSize: 16, fontFamily: 'WorkSans-Regular' }}>
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
          <Text style={{ fontSize: 16, fontFamily: 'WorkSans-Regular' }}>
            1 Room - 2 Adults
          </Text>
        </View>
      </View>
    </View>
  );

  const renderItem = useCallback(
    data =>
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
              <Text style={{ fontSize: 16, fontFamily: 'WorkSans-Regular' }}>
                Filter
              </Text>
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
  container: { flex: 1, backgroundColor: 'rgb(242, 242, 242)' },
  list: { flexGrow: 1, backgroundColor: 'white' },
  searchInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 32,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 16,
    fontSize: 18,
    elevation: 8,
    shadowColor: 'lightgrey',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  searchBtnContainer: {
    borderRadius: 36,
    shadowColor: 'grey',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  searchBtn: {
    padding: 12,
    backgroundColor: '#54D3C2',
    borderRadius: 36,
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
    fontSize: 16,
    alignSelf: 'center',
    fontFamily: 'WorkSans-Regular',
  },
});

export default HotelHomeScreen;
