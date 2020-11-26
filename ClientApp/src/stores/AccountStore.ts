import {ArrayFetchingStore} from "./baseStores/fetchingStores/ArrayFetchingStore";
import {AccountDTO, BaseInformationApi} from "swagger-api";
import {action, decorate} from "mobx";

export class AccountStore extends ArrayFetchingStore<AccountDTO> {
    baseInformationApi: BaseInformationApi = new BaseInformationApi(undefined, undefined, this.rootStore.axiosInstance);

    getAccounts = () => {
        const promise = this.baseInformationApi.apiBaseinformationGetaccountsGet();
        this.callPromise(promise, false);
    }
}


decorate(AccountStore, {
    getAccounts: action
});