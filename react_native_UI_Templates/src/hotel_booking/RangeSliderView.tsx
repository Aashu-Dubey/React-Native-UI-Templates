import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  StyleProp,
  ViewStyle,
} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

interface Props {}

const CustomMarker = (props: { triangleStyle: StyleProp<ViewStyle> }) => (
  <View style={styles.shadowBg}>
    <View style={styles.markerStyle}>
      <View style={props.triangleStyle} />
    </View>
  </View>
);

const RangeSliderView: React.FC<Props> = () => {
  const { width } = useWindowDimensions();

  const { containerStyle, trackStyle, selectedStyle } = styles;
  return (
    <MultiSlider
      {...{ containerStyle, trackStyle, selectedStyle }}
      markerContainerStyle={{ height: 52 }}
      values={[100, 800]}
      sliderLength={width - 40}
      max={1000}
      allowOverlap
      isMarkersSeparated
      customMarkerLeft={(_) => (
        <CustomMarker triangleStyle={styles.triangleLeftStyle} />
      )}
      customMarkerRight={(_) => (
        <CustomMarker triangleStyle={styles.triangleRightStyle} />
      )}
      enableLabel
      customLabel={(prop) => {
        const {
          oneMarkerValue,
          twoMarkerValue,
          oneMarkerLeftPosition,
          twoMarkerLeftPosition,
          // oneMarkerPressed,
          // twoMarkerPressed,
        } = prop;
        const leftLabelDistance = oneMarkerLeftPosition - (width - 32) / 2 + 3;
        const rightLabelDistance = twoMarkerLeftPosition - 18 / 2 + 3;
        return (
          <View>
            {Number.isFinite(oneMarkerLeftPosition) &&
              Number.isFinite(oneMarkerValue) && (
                <View style={[styles.sliderLabel, { left: leftLabelDistance }]}>
                  <Text style={styles.sliderLabelText}>${oneMarkerValue}</Text>
                </View>
              )}

            {Number.isFinite(twoMarkerLeftPosition) &&
              Number.isFinite(twoMarkerValue) && (
                <View
                  style={[
                    styles.sliderLabel,
                    { left: rightLabelDistance, position: 'absolute' },
                  ]}
                >
                  <Text style={styles.sliderLabelText}>${twoMarkerValue}</Text>
                </View>
              )}
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
    alignSelf: 'center',
  },
  trackStyle: {
    backgroundColor: 'lightgrey',
    height: 4,
    borderRadius: 8,
  },
  selectedStyle: {
    backgroundColor: '#54D3C2',
    height: 6,
    borderRadius: 8,
  },
  sliderLabel: { minWidth: 50, padding: 8 },
  sliderLabelText: { textAlign: 'center' },
  triangleRightStyle: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderBottomWidth: 5,
    borderTopWidth: 5,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'white',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    marginLeft: 7,
  },
  triangleLeftStyle: {
    width: 0,
    height: 0,
    borderRightWidth: 8,
    borderBottomWidth: 5,
    borderTopWidth: 5,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderRightColor: 'white',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    marginLeft: 5,
  },
  markerStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#54D3C2',
    borderColor: 'white',
    borderWidth: 2,
    justifyContent: 'center',
  },
  shadowBg: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 7.49,
  },
});

export default RangeSliderView;
