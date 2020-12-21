import {action, decorate, observable, runInAction} from 'mobx';

import { ArrayFetchingStore } from "./baseStores/fetchingStores/ArrayFetchingStore";
import {BudgetApi, BudgetGroupDTO, BudgetOverviewDTO, CreateBudgetEntryDTO, TransactionApi} from "swagger-api";

export class BudgetStore extends ArrayFetchingStore<BudgetGroupDTO> {
    budgetApi: BudgetApi = new BudgetApi(undefined, undefined, this.rootStore.axiosInstance);
    
    overview?: BudgetOverviewDTO;
    
    getBudgetInMonth = async (month: number, year: number) => {
        const promise = this.budgetApi.apiBudgetGetGet(month, year, undefined);
        await this.callPromise(promise, false);
        
        const promiseOverview = this.budgetApi.apiBudgetOverviewGet(month, year, undefined);
        
        await promiseOverview.then(result => {
            runInAction(() => {
                this.overview = result.data;
            });
        });
    }

    addBudgetEntry = async (createBudgetEntryDTO: CreateBudgetEntryDTO) => {
        const promise = this.budgetApi.apiBudgetAddPost(createBudgetEntryDTO, undefined);
        const _ignore = await this.callPromise(promise, false)
    }
    
    updateBudgetEntry = async (budgetEntryId:string, budgetEntryAmount:number) => {
        const promise = this.budgetApi.apiBudgetUpdatePatch(budgetEntryId, budgetEntryAmount, undefined);
        const _ignore = await this.callPromise(promise, false);
    }
    
    initializeBudgetEntries = async (month:number, year:number) => {
        const promise = this.budgetApi.apiBudgetInitializePost(month, year, undefined);
        const _ignore = await this.callPromise(promise, false);
    }
    
}

decorate(BudgetStore, {
    getBudgetInMonth: action,
    addBudgetEntry: action,
    updateBudgetEntry: action,
    initializeBudgetEntries: action,
    overview: observable,
});