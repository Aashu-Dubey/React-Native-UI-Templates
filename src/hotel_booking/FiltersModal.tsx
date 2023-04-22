import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RangeSliderView from './RangeSliderView';
import SliderView from './SliderView';
import MyPressable from '../components/MyPressable';
import MySwitch from './Switch';
import Config from '../Config';

interface Props {
  showFilter: boolean;
  setShowFilter: any;
}

const popularFList = [
  { titleTxt: 'Free Breakfast', isSelected: false },
  { titleTxt: 'Free Parking', isSelected: false },
  { titleTxt: 'Pool', isSelected: true },
  { titleTxt: 'Pet Friendly', isSelected: false },
  { titleTxt: 'Free wifi', isSelected: false },
];

const accomodation_List = [
  { titleTxt: 'All', isSelected: false },
  { titleTxt: 'Apartment', isSelected: false },
  { titleTxt: 'Home', isSelected: true },
  { titleTxt: 'Villa', isSelected: false },
  { titleTxt: 'Hotel', isSelected: false },
  { titleTxt: 'Resort', isSelected: false },
];

const FilterModal: React.FC<Props> = ({ showFilter, setShowFilter }) => {
  const [popularFilterList, setPopularFilterList] = useState(popularFList);
  const [accomodationList, setAccomodationList] = useState(accomodation_List);

  const getPList = () => {
    const noList: JSX.Element[] = [];
    let count = 0;
    const columnCount = 2;

    for (let i = 0; i < popularFilterList.length / columnCount; i++) {
      const listUI: JSX.Element[] = [];
      for (let j = 0; j < columnCount; j++) {
        const data = popularFilterList[count];
        listUI.push(
          <View
            key={`popular_${j}`}
            style={{ flex: 1, borderRadius: 4, overflow: 'hidden' }}
          >
            <MyPressable
              style={styles.checkBoxBtn}
              touchOpacity={0.6}
              onPress={() => {
                data.isSelected = !data.isSelected;
                setPopularFilterList([...popularFilterList]);
              }}
            >
              <Icon
                name={data.isSelected ? 'check-box' : 'check-box-outline-blank'}
                size={25}
                color={data.isSelected ? '#54D3C2' : 'lightgrey'}
              />
              <Text style={styles.checkTitle}>{data.titleTxt}</Text>
            </MyPressable>
          </View>,
        );

        if (count < popularFilterList.length - 1) {
          count += 1;
        } else {
          break;
        }
      }
      noList.push(
        <View key={noList.length} style={{ flex: 1, flexDirection: 'row' }}>
          {listUI}
        </View>,
      );
    }

    return noList;
  };

  const checkAppPosition = (index: number) => {
    if (index === 0) {
      const isAllSelected = accomodationList[0].isSelected;
      accomodationList.forEach(d => (d.isSelected = !isAllSelected));
    } else {
      accomodationList[index].isSelected = !accomodationList[index].isSelected;

      let count = 0;
      for (let i = 0; i < accomodationList.length; i++) {
        if (i !== 0) {
          const data = accomodationList[i];
          if (data.isSelected) {
            count += 1;
          }
        }
      }

      accomodationList[0].isSelected = count === accomodationList.length - 1;
    }

    setAccomodationList([...accomodationList]);
  };

  const getAccomodationListUI = () => {
    const noList: JSX.Element[] = [];
    for (let i = 0; i < accomodationList.length; i++) {
      const data = accomodationList[i];
      noList.push(
        <View key={i} style={{ borderRadius: 4, overflow: 'hidden' }}>
          <MyPressable
            style={{ flexDirection: 'row', padding: 12 }}
            touchOpacity={0.6}
            onPress={() => checkAppPosition(i)}
          >
            <Text style={styles.switchText}>{data.titleTxt}</Text>
            <MySwitch
              onColor="#54D3C2"
              offColor="rgba(158,158,158, 0.3)"
              thumbColor="white"
              value={data.isSelected}
              onValueChange={() => checkAppPosition(i)}
            />
          </MyPressable>
        </View>,
      );
      if (i === 0) {
        noList.push(<View key="divider" style={styles.divider} />);
      }
    }
    return noList;
  };

  return (
    <Modal
      visible={showFilter}
      animationType="slide"
      transparent
      onRequestClose={() => setShowFilter(false)}
    >
      <StatusBar backgroundColor="white" />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={styles.header}>
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <MyPressable
              style={{ padding: 8 }}
              android_ripple={{ color: 'grey', radius: 20, borderless: true }}
              touchOpacity={0.6}
              onPress={() => setShowFilter(false)}
            >
              <Icon name="close" size={25} color="black" />
            </MyPressable>
          </View>
          <Text style={[styles.headerText]}>Filters</Text>
          <View style={{ flex: 1 }} />
        </View>
        <View style={styles.headerShadow} />

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingVertical: 16 }}
        >
          <Text style={styles.sectionTitle}>Price (for 1 night)</Text>
          <RangeSliderView />
          <View style={styles.divider} />

          <Text style={[styles.sectionTitle, { paddingVertical: 12 }]}>
            Popular filters
          </Text>
          <View style={{ paddingHorizontal: 16 }}>{getPList()}</View>
          <View style={styles.divider} />

          <Text
            style={[styles.sectionTitle, { paddingTop: 16, paddingBottom: 24 }]}
          >
            Distance from city center
          </Text>
          <SliderView />
          <View style={styles.divider} />

          <Text
            style={[styles.sectionTitle, { paddingTop: 16, paddingBottom: 8 }]}
          >
            Type of Accommodation
          </Text>
          <View style={{ paddingHorizontal: 16 }}>
            {getAccomodationListUI()}
          </View>
        </ScrollView>

        <View style={styles.divider} />
        <View style={styles.applyBtnShadow}>
          <View style={styles.buttonContainer}>
            <MyPressable
              style={styles.button}
              touchOpacity={0.6}
              onPress={() => setShowFilter(false)}
            >
              <Text style={styles.buttonText}>Apply</Text>
            </MyPressable>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  headerText: {
    color: 'black',
    fontSize: 22,
    fontFamily: 'WorkSans-Bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  headerShadow: {
    height: Config.isAndroid ? 0.2 : 1,
    elevation: 4,
    backgroundColor: 'lightgrey',
  },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: 'lightgrey' },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'WorkSans-Regular',
    color: 'darkgrey',
    paddingHorizontal: 16,
  },
  checkBoxBtn: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 8,
  },
  checkTitle: {
    color: 'black',
    marginStart: 4,
    fontFamily: 'WorkSans-Regular',
  },
  switchText: {
    flex: 1,
    color: 'black',
    fontFamily: 'WorkSans-Regular',
    alignSelf: 'center',
  },
  buttonContainer: {
    backgroundColor: '#54D3C2',
    borderRadius: 24,
    elevation: 8,
    overflow: 'hidden',
  },
  button: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
  },
  applyBtnShadow: {
    backgroundColor: '#54D3C2',
    borderRadius: 24,
    margin: 16,
    marginTop: 8,
    shadowColor: 'grey',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'WorkSans-Medium',
  },
});

export default FilterModal;
