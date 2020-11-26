import { action, decorate, observable } from 'mobx';

import { BaseStore } from './BaseStore';

export class LoadingStore extends BaseStore {
    loading: boolean = false;

    enableLoading = () => {
        this.loading = true;
    };

    disableLoading = () => {
        this.loading = false;
    };
}

decorate(LoadingStore, {
    loading: observable,
    enableLoading: action,
    disableLoading: action
});