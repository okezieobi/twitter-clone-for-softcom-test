import randomId from 'unique-random';

export default class Numbers {
  static uniqueIds() {
    return randomId(1000000000000, 9000000000000);
  }

  static accountNo() {
    return randomId(1000000000, 9000000000);
  }
}
