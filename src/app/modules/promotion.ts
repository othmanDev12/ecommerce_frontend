import {MyPromotionType} from '../enums/myPromotionType';

export interface Promotion {
  promotionId: number,
  promotionName: string,
  promotionType: MyPromotionType,
  beginDate: Date,
  endDate: Date,
  value: number
}
