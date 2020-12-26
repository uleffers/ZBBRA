import { AxiosPromise } from 'axios';
import { action, decorate, observable, runInAction } from 'mobx';

import {BaseStore} from "../BaseStore";

export class ObjectFetchingStore<T> extends BaseStore {
    payload: T | undefined;

    // code duplicate with ArrayFetchingStore
    // duplication made on purpose due to TS problems with resolving generic types
    // noinspection DuplicatedCode
    public callPromise = async (promise: AxiosPromise<T>) => {
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