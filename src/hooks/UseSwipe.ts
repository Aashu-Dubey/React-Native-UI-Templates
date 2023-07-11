import React from 'react';
import { Dimensions } from 'react-native';

interface swipeFunction {
  onSwipeLeft?: any;
  onSwipeRight?: any;
  onSwipeUp?: any;
  onSwipeDown?: any;
}

export function useSwipe(swipeFun: swipeFunction, rangeOffset = 4) {
  const windowWidth = Dimensions.get('window').width;
  let firstTouch = 0;
  let firstTouchY = 0;

  const { onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown } = swipeFun;

  // set user touch start position
  const onTouchStart = (e: any) => {
    firstTouch = e.nativeEvent.pageX;
    firstTouchY = e.nativeEvent.pageY;
  };

  // when touch ends check for swipe directions
  const onTouchEnd = (e: any) => {
    // get touch position and screen size
    const positionX = e.nativeEvent.pageX;
    const positionY = e.nativeEvent.pageY;
    const range = windowWidth / rangeOffset;

    // check if position is growing positively and has reached specified range
    if (positionX - firstTouch > range) {
      onSwipeRight && onSwipeRight();
    }
    // check if position is growing negatively and has reached specified range
    else if (firstTouch - positionX > range) {
      onSwipeLeft && onSwipeLeft();
    } else if (firstTouchY - positionY > range) {
      onSwipeUp && onSwipeUp();
    } else if (positionY - firstTouchY > range) {
      onSwipeDown && onSwipeDown();
    }
  };

  return { onTouchStart, onTouchEnd };
}
