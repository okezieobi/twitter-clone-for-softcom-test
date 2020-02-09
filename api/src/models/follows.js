import Numbers from '../helpers/uniqueNos';

const { uniqueIds } = Numbers;

export default class FollowModel {
  static prepareRequest(userId = 0, followId = 0) {
    return [userId, followId, uniqueIds(), uniqueIds()];
  }
}
