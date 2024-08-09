import { store } from './store.js';

const defaultState = {
  initialized: false,
  context: {},
};

export default class AppModel {
  static appStore;

  static init() {
    AppModel.appStore = store(defaultState, 'app');
  }
}
