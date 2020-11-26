import { AxiosPromise } from 'axios';
import { action, decorate, observable, runInAction } from 'mobx';

import { ErrorAndLoadingBindingStore } from '../ErrorAndLoadingBindingStore';

export class ObjectFetchingStore<T> extends ErrorAndLoadingBindingStore {
    payload: T | undefined;

    // code duplicate with ArrayFetchingStore
    // duplication made on purpose due to TS problems with resolving generic types
    // noinspection DuplicatedCode
    public callPromise = async (promise: AxiosPromise<T>, loader: boolean = false, currentWindow?: Window) => {
        this.bindLoadingAndErrorHandling(promise, loader, currentWindow);
        try {
            return await promise.then(result => {
                runInAction(() => {
                    if (result && result.data) {
                        this.payload = result.data;
                    }
                });
            });
        } catch (err) {
            runInAction(
                () => {
                    this.payload = undefined;
                }
            );
        }
    };
}

decorate(ObjectFetchingStore, {
    payload: observable,
    callPromise: action
});