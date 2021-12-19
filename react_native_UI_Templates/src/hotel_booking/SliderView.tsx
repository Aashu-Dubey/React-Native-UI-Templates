import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';

interface Props {}

const SliderView: React.FC<Props> = () => {
  const [distValue, setDistValue] = useState(50.0);

  return (
    <Slider
      containerStyle={{ marginHorizontal: 16, marginBottom: 12 }}
      trackStyle={{ height: 6 }}
      thumbStyle={styles.thumbStyle}
      // renderThumbComponent={() => (
      //   <View style={styles.shadowBg}>
      //     <View style={styles.thumbStyle} />
      //   </View>
      // )}
      value={distValue}
      step={1}
      minimumValue={0}
      maximumValue={100}
      onValueChange={(value) => setDistValue(value[0])}
      thumbTintColor="#54D3C2"
      minimumTrackTintColor="#54D3C2"
      maximumTrackTintColor="lightgrey"
      animateTransitions
      animationType="spring"
      renderAboveThumbComponent={() => (
        <Text style={[styles.thumbText, { right: distValue }]}>
          Less than {(distValue / 10).toFixed(1)} km
        </Text>
      )}
    />
  );
};

const styles = StyleSheet.create({
  thumbStyle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
    elevation: 8,
    // backgroundColor: '#54D3C2',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 7.49,
  },
  thumbText: { width: 170, textAlign: 'center' },
});

export default SliderView;
