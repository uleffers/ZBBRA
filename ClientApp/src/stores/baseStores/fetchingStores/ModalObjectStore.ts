import { action, decorate, observable } from 'mobx';

import { ObjectFetchingStore } from './ObjectFetchingStore';

export class ModalObjectStore<T> extends ObjectFetchingStore<T> {
    isShown: boolean = false;
    // code duplicate with ModalArrayStore
    // duplication made on purpose due to TS problems with resolving generic types
    // noinspection DuplicatedCode

    showModal = () => {
        this.isShown = true;
    };

    hideModal = () => {
        this.isShown = false;
    };
}

decorate(ModalObjectStore, {
    hideModal: action,
    isShown: observable,
    showModal: action,
});