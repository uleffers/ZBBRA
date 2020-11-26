import { configure } from 'mobx';

import { RootStore } from '../rootStore';

configure({enforceActions: 'observed'});

export abstract class BaseStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }
}
