import { action, decorate } from 'mobx';

import { ArrayFetchingStore } from "./baseStores/fetchingStores/ArrayFetchingStore";
import {BudgetApi, BudgetEntryDTO, BudgetGroupDTO, CreateBudgetEntryDTO} from "swagger-api";

export class BudgetStore extends ArrayFetchingStore<BudgetGroupDTO> {
    budgetApi: BudgetApi = new BudgetApi(undefined, undefined, this.rootStore.axiosInstance);

    getBudgetInMonth = (month:number, year:number) => {
        const promise = this.budgetApi.apiBudgetGetGet(month, year, undefined);
        const _ignore = this.callPromise(promise, false);
    }

    addBudgetEntry = async (createBudgetEntryDTO: CreateBudgetEntryDTO) => {
        const promise = this.budgetApi.apiBudgetAddPost(createBudgetEntryDTO, undefined);
        const _ignore = await this.callPromise(promise, false)
    }
    
    updateBudgetEntry = async (budgetEntryDTO: BudgetEntryDTO) => {
        const promise = this.budgetApi.apiBudgetUpdatePatch(budgetEntryDTO, undefined);
        const _ignore = await this.callPromise(promise, false);
    }
    
}

decorate(BudgetStore, {
    getBudgetInMonth: action,
    addBudgetEntry: action,
    updateBudgetEntry: action,
});