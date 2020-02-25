export default class SharedModel {
  static handleArrayData(array = [], method) {
    return array.map((data) => method(data) || []);
  }
}
