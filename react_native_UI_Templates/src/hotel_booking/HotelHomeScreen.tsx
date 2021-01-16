import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  SafeAreaView,
  TextInput,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomerCalendar from './CalendarPopupView';
import FilterModal from './FiltersModal';
import HotelListItem from './HotelListItem';
import { HOTEL_LIST } from './model/hotel_list_data';

interface Props {}

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

const HotelHomeScreen: React.FC<Props> = () => {
  // const headerHeight = useHeaderHeight();
  // const navigation = useNavigation();

  // const topMargin = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight ?? 0;

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return date;
  });

  const [showCal, setShowCal] = useState<boolean>(false);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          style={
            {
              // backgroundColor: 'white',
              // elevation: 16,
              // paddingHorizontal: 8,
            }
          }
          contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}
          data={HOTEL_LIST}
          renderItem={(data) =>
            data.index > 0 ? (
              <HotelListItem {...{ data }} />
            ) : (
              <View style={styles.stickyHeaderContainer}>
                <Text style={styles.hotelCountText}>530 hotels found</Text>
                <Pressable
                  style={{ flexDirection: 'row', padding: 8 }}
                  android_ripple={{ color: 'lighgrey' }}
                  onPress={() => setShowFilter(true)}
                >
                  <Text
                    style={{ fontSize: 16, fontFamily: 'WorkSans-Regular' }}
                  >
                    Filter
                  </Text>
                  <Icon
                    style={{ paddingHorizontal: 8 }}
                    name="sort"
                    size={24}
                    color="#54D3C2"
                  />
                </Pressable>
              </View>
            )
          }
          keyExtractor={(item) => item.id.toString()}
          stickyHeaderIndices={[1]}
          nestedScrollEnabled
          ListHeaderComponent={() => (
            <View style={{ backgroundColor: 'rgb(242, 242, 242)' }}>
              <View style={{ flexDirection: 'row', padding: 16 }}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="London..."
                  selectionColor="#54D3C2"
                />
                <Pressable
                  style={styles.searchBtn}
                  onPress={() => {}}
                  android_ripple={{
                    color: 'grey',
                    radius: 28,
                    borderless: true,
                  }}
                >
                  <Icon name="search" size={30} color="white" />
                </Pressable>
              </View>
              <View style={styles.headerDetailContainer}>
                <Pressable
                  style={styles.headerSectionContainer}
                  android_ripple={{ color: 'lighgrey' }}
                  onPress={() => setShowCal(true)}
                >
                  <Text style={styles.headerDetailTitle}>Choose date</Text>
                  <Text
                    style={{ fontSize: 16, fontFamily: 'WorkSans-Regular' }}
                  >
                    {String(startDate.getDate()).padStart(2, '0')},{' '}
                    {HALF_MONTHS[startDate.getMonth()]} -{' '}
                    {String(endDate.getDate()).padStart(2, '0')},{' '}
                    {HALF_MONTHS[endDate.getMonth()]}
                  </Text>
                </Pressable>
                <View style={styles.verticalDivider} />
                <View style={styles.headerSectionContainer}>
                  <Text style={styles.headerDetailTitle}>Number of Rooms</Text>
                  <Text
                    style={{ fontSize: 16, fontFamily: 'WorkSans-Regular' }}
                  >
                    1 Room - 2 Adults
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
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
  searchInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 32,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 16,
    fontSize: 18,
    elevation: 8,
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
    backgroundColor: 'black',
    marginRight: 8,
    marginVertical: 8,
  },
  headerSectionContainer: { flex: 1, paddingHorizontal: 8, paddingVertical: 4 },
  stickyHeaderContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 8,
    // marginHorizontal: 8,
  },
  hotelCountText: {
    flex: 1,
    fontSize: 16,
    textAlignVertical: 'center',
    fontFamily: 'WorkSans-Regular',
  },
});

export default HotelHomeScreen;
