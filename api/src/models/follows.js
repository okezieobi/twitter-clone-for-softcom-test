import Numbers from '../helpers/uniqueNos';

const { uniqueIds } = Numbers;

export default class FollowModel {
  static requestData(userId = 0, followId = 0) {
    return [userId, followId, uniqueIds(), uniqueIds()];
  }
}
