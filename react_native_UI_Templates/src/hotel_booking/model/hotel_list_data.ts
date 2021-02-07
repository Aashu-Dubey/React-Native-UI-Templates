import { AppImages } from '../../../res';

export interface HotelListType {
  id: number;
  imagePath: any;
  titleTxt: string;
  subTxt: string;
  dist: number;
  reviews: number;
  rating: number;
  perNight: number;
}

export const HOTEL_LIST: HotelListType[] = [
  // 1st item dummy for 'stickyHeaderIndices'
  {
    id: 0,
    imagePath: '',
    titleTxt: '',
    subTxt: '',
    dist: 0,
    reviews: 0,
    rating: 0,
    perNight: 0,
  },
  {
    id: 1,
    imagePath: AppImages.hotel_1,
    titleTxt: 'Grand Royal Hotel',
    subTxt: 'Wembley, London',
    dist: 2.0,
    reviews: 80,
    rating: 4.4,
    perNight: 180,
  },
  {
    id: 2,
    imagePath: AppImages.hotel_2,
    titleTxt: 'Queen Hotel',
    subTxt: 'Wembley, London',
    dist: 4.0,
    reviews: 74,
    rating: 4.5,
    perNight: 200,
  },
  {
    id: 3,
    imagePath: AppImages.hotel_3,
    titleTxt: 'Grand Royal Hotel',
    subTxt: 'Wembley, London',
    dist: 3.0,
    reviews: 62,
    rating: 4.0,
    perNight: 60,
  },
  {
    id: 4,
    imagePath: AppImages.hotel_4,
    titleTxt: 'Queen Hotel',
    subTxt: 'Wembley, London',
    dist: 7.0,
    reviews: 90,
    rating: 4.4,
    perNight: 170,
  },
  {
    id: 5,
    imagePath: AppImages.hotel_5,
    titleTxt: 'Grand Royal Hotel',
    subTxt: 'Wembley, London',
    dist: 2.0,
    reviews: 240,
    rating: 4.5,
    perNight: 200,
  },
];
