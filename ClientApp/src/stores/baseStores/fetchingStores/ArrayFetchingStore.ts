import { AxiosPromise } from 'axios';
import { action, decorate, observable, runInAction } from 'mobx';

import {BaseStore} from "../BaseStore";

export class ArrayFetchingStore<T> extends BaseStore {
    payload: Array<T> = [];

    // code duplicate with ObjectFetchingStore
    // duplication made on purpose due to TS problems with resolving generic types
    // noinspection DuplicatedCode
    public callPromise = async (
        promise:
            AxiosPromise,
        loader: boolean = false,
        successCallback?: Function,
        noResponseCallBack?: Function) => {
        try {
            return await promise.then(result => {
                runInAction(() => {
                    if (result && result.data) {
                        this.payload = result.data;
                    }
                    if (noResponseCallBack && result.status === 204) {
                        noResponseCallBack();
                    }
                    if (successCallback && result.status === 200) {
                        successCallback(result);
                    }
                });
            });
        } catch (err) {
            runInAction(
                () => {
                    this.payload = [];
                }
            );
        }
    };
}

decorate(ArrayFetchingStore, {
    payload: observable,
    callPromise: action
});