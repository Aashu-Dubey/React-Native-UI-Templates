import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  SafeAreaView,
  Pressable,
  StatusBar,
} from 'react-native';
import CustomCalendar from './CustomCalendar';

interface Props {
  showCal: boolean;
  setShowCal: any;
  minimumDate: Date | null;
  initialStartDate: Date | null;
  initialEndDate: Date | null;
  onApplyClick: (startData: Date | null, endData: Date | null) => void;
}

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

const WEEKS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CustomerCalendar: React.FC<Props> = ({
  showCal,
  setShowCal,
  minimumDate,
  initialStartDate,
  initialEndDate,
  onApplyClick,
}) => {
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);

  const formattedDate = (date: Date | null) => {
    return date
      ? `${WEEKS[date?.getDay()]}, ${String(date.getDate()).padStart(2, '0')} ${
          HALF_MONTHS[date.getMonth()]
        }`
      : '--/--';
  };

  return (
    <Modal
      visible={showCal}
      animationType="fade"
      transparent
      onRequestClose={() => setShowCal(false)}
    >
      <StatusBar backgroundColor="rgba(0,0,0, 0.5)" />
      <SafeAreaView style={styles.containerStyle}>
        <View style={{ backgroundColor: 'white', borderRadius: 24 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.timelineContainerStyle}>
              <Text style={styles.fromToTextStyle}>From</Text>
              <Text style={styles.startEndDateTextStyles}>
                {formattedDate(startDate)}
              </Text>
            </View>
            <View style={styles.verticleDivider} />
            <View style={styles.timelineContainerStyle}>
              <Text style={styles.fromToTextStyle}>To</Text>
              <Text style={styles.startEndDateTextStyles}>
                {formattedDate(endDate)}
              </Text>
            </View>
          </View>
          <View style={{ height: 0.5, backgroundColor: 'lightgrey' }} />

          <CustomCalendar
            minDate={minimumDate}
            startDate={startDate}
            endDate={endDate}
            startEndDateChange={(startDateData, endDateData) => {
              setStartDate(startDateData);
              setEndDate(endDateData);
            }}
          />

          <View style={{ padding: 16, paddingTop: 8 }}>
            <View
              style={{ borderRadius: 24, elevation: 8, overflow: 'hidden' }}
            >
              <Pressable
                style={styles.applyBtn}
                android_ripple={{ color: 'lighgrey' }}
                onPress={() => {
                  onApplyClick(startDate, endDate);
                  setShowCal(false);
                }}
              >
                <Text style={styles.applyBtnText}>Apply</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0, 0.5)',
    padding: 24,
  },
  timelineContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fromToTextStyle: {
    fontSize: 16,
    fontFamily: 'WorkSans-Regular',
    color: 'rgba(128, 128, 128, 0.8)',
    marginBottom: 4,
  },
  startEndDateTextStyles: { fontSize: 16, fontFamily: 'WorkSans-Bold' },
  applyBtn: {
    backgroundColor: '#54D3C2',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyBtnText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'WorkSans-Medium',
  },
  verticleDivider: {
    height: 74,
    width: 1,
    backgroundColor: 'grey',
    opacity: 0.4,
  },
});

export default CustomerCalendar;
