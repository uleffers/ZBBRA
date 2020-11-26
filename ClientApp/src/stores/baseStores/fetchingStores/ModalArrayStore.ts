import { action, decorate, observable } from 'mobx';

import { ArrayFetchingStore } from './ArrayFetchingStore';

export class ModalArrayStore<T> extends ArrayFetchingStore<T> {
    isShown: boolean = false;
    // code duplicate with ModalObjectStore
    // duplication made on purpose due to TS problems with resolving generic types
    // noinspection DuplicatedCode

    showModal = () => {
        this.isShown = true;
    };

    hideModal = () => {
        this.isShown = false;
    };
}

decorate(ModalArrayStore, {
    hideModal: action,
    isShown: observable,
    showModal: action,
});