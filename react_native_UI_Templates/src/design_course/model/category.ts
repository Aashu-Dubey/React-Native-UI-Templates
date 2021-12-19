import { AppImages } from '../../../res';

export interface CategoryType {
  id: number;
  imagePath: any;
  title: string;
  lessonCount: number;
  money: number;
  rating: number;
}

export const CATEGORY_LIST: CategoryType[] = [
  {
    id: 0,
    imagePath: AppImages.interFace1,
    title: 'User interface Design',
    lessonCount: 24,
    money: 25,
    rating: 4.3,
  },
  {
    id: 1,
    imagePath: AppImages.interFace2,
    title: 'User interface Design',
    lessonCount: 22,
    money: 18,
    rating: 4.6,
  },
  {
    id: 2,
    imagePath: AppImages.interFace1,
    title: 'User interface Design',
    lessonCount: 24,
    money: 25,
    rating: 4.3,
  },
  {
    id: 3,
    imagePath: AppImages.interFace2,
    title: 'User interface Design',
    lessonCount: 22,
    money: 18,
    rating: 4.6,
  },
];

export const POPULAR_COURSE_LIST: CategoryType[] = [
  {
    id: 0,
    imagePath: AppImages.interFace3,
    title: 'App Design Course',
    lessonCount: 12,
    money: 25,
    rating: 4.8,
  },
  {
    id: 1,
    imagePath: AppImages.interFace4,
    title: 'Web Design Course',
    lessonCount: 28,
    money: 208,
    rating: 4.9,
  },
  {
    id: 2,
    imagePath: AppImages.interFace3,
    title: 'App Design Course',
    lessonCount: 12,
    money: 25,
    rating: 4.8,
  },
  {
    id: 3,
    imagePath: AppImages.interFace4,
    title: 'Web Design Course',
    lessonCount: 28,
    money: 208,
    rating: 4.9,
  },
];
