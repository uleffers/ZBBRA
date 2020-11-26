import { AxiosPromise } from 'axios';

import { LoadingStore } from './LoadingStore';

export class ErrorAndLoadingBindingStore extends LoadingStore {
    bindLoadingAndErrorHandling = (promise: AxiosPromise, loader: boolean = false, currentWindow?: Window) => {
        // if (loader) {
        //     this.enableLoading();
        // }
        // promise.catch(error => {
        //     this.disableLoading
        // })
        //     .finally(this.disableLoading);
        return promise;
    }
}