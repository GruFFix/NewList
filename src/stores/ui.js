import { transaction, observable } from 'mobx';

class UIStore {
  @observable activeCountryKey = 0;
  @observable activeCategoryKey = 0;

  setState(newState) {
    transaction(() => {
      Object.keys(newState).forEach(key => {
        if (key !== 'setState') {
          this[key] = newState[key];
        }
      });
    });
  }
}

export default new UIStore();
