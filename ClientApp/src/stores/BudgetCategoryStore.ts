import {ArrayFetchingStore} from "./baseStores/fetchingStores/ArrayFetchingStore";
import {BaseInformationApi, BudgetCategoryDTO} from "swagger-api";
import {action, decorate} from "mobx";

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