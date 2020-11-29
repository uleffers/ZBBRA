import { action, decorate } from 'mobx';

import { ArrayFetchingStore } from "./baseStores/fetchingStores/ArrayFetchingStore";
import {AccountDTO, Configuration, TransactionApi, TransactionDTO} from "swagger-api";
import {AccountStore} from "./AccountStore";
import {BudgetCategoryStore} from "./BudgetCategoryStore";

export class TransactionStore extends ArrayFetchingStore<TransactionDTO> {
    transactionApi: TransactionApi = new TransactionApi(undefined, undefined, this.rootStore.axiosInstance);
    
    accountInformationStore: AccountStore = new AccountStore(this.rootStore);
    budgetCategoryStore: BudgetCategoryStore = new BudgetCategoryStore(this.rootStore);

    getTransactionsInInterval = (dateFrom:Date, dateTo:Date) => {
        const promise = this.transactionApi.apiTransactionsGettransactionsintervalGet(dateFrom, dateTo, undefined);
        this.callPromise(promise, false);
    }
    
    getTransactionsInMonth = (month:number, year:number) => {
        const promise = this.transactionApi.apiTransactionsGettransactionsinmonthGet(month, year, undefined);
        this.callPromise(promise, false);
    }
    
    updateTransaction = (transactionDTO: TransactionDTO) => {
        const promise = this.transactionApi.apiTransactionsUpdatePatch(transactionDTO, undefined);
        this.callPromise(promise, false);
    }
}

decorate(TransactionStore, {
    getTransactionsInInterval: action,
    getTransactionsInMonth: action,
    updateTransaction: action,
});