/* eslint-disable camelcase */
import Numbers from '../helpers/uniqueNos';
import SharedModel from './index';

const { uniqueIds } = Numbers;
const { handleArrayData } = SharedModel;

export default class TweetModels {
  static requestData(tweet = '', id = 0) {
    return [uniqueIds(), tweet, id];
  }

  static responseData({ tweet, id, created_on }) {
    return {
      id: parseInt(id, 10),
      tweet: String(tweet),
      createdOn: Date(created_on),
    };
  }

  static responseArray(array) {
    return handleArrayData(array, TweetModels.responseData);
  }
}
