import { action, decorate, observable } from 'mobx';

import { ErrorAndLoadingBindingStore } from '../ErrorAndLoadingBindingStore';

export class SimpleModalStore extends ErrorAndLoadingBindingStore {
    isShown: boolean = false;
    // code duplicate with other Modal Stores
    // duplication made on purpose due to TS problems with resolving generic types
    // noinspection DuplicatedCode

    showModal = () => {
        this.isShown = true;
    };

    hideModal = () => {
        this.isShown = false;
    };
}

decorate(SimpleModalStore, {
    hideModal: action,
    isShown: observable,
    showModal: action,
});