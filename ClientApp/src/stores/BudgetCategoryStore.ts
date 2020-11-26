import {ArrayFetchingStore} from "./baseStores/fetchingStores/ArrayFetchingStore";
import {AccountDTO, BaseInformationApi, BudgetCategoryDTO} from "swagger-api";
import {action, decorate} from "mobx";
import {AccountStore} from "./AccountStore";

export class BudgetCategoryStore extends ArrayFetchingStore<BudgetCategoryDTO> {
    baseInformationApi: BaseInformationApi = new BaseInformationApi(undefined, undefined, this.rootStore.axiosInstance);
    
    getBudgetCategories = () => {
        const promise = this.baseInformationApi.apiBaseinformationGetbudgetcategoriesGet();
        this.callPromise(promise, false);
    }
}

decorate(BudgetCategoryStore, {
    getBudgetCategories: action
});