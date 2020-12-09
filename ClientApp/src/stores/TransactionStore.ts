import { action, decorate } from 'mobx';

import { ArrayFetchingStore } from "./baseStores/fetchingStores/ArrayFetchingStore";
import {AccountDTO, Configuration, CreateTransactionDTO, TransactionApi, TransactionDTO} from "swagger-api";
import {AccountStore} from "./AccountStore";
import {BudgetCategoryStore} from "./BudgetCategoryStore";
import {useState} from "react";

export class TransactionStore extends ArrayFetchingStore<TransactionDTO> {
    
    transactionApi: TransactionApi = new TransactionApi(undefined, undefined, this.rootStore.axiosInstance);
    
    accountInformationStore: AccountStore = new AccountStore(this.rootStore);
    budgetCategoryStore: BudgetCategoryStore = new BudgetCategoryStore(this.rootStore);

    getTransactionsInInterval = (dateFrom:Date, dateTo:Date) => {
        const promise = this.transactionApi.apiTransactionsGettransactionsintervalGet(dateFrom, dateTo, undefined);
        const _ignore =this.callPromise(promise, false);
    }
    
    getTransactionsInMonth = (month:number, year:number) => {
        const promise = this.transactionApi.apiTransactionsGettransactionsinmonthGet(month, year, undefined);
        const _ignore = this.callPromise(promise, false);
    }
    
    updateTransaction = async (transactionDTO: TransactionDTO) => {
        const promise = this.transactionApi.apiTransactionsUpdatePatch(transactionDTO, undefined);
        const _ignore = await this.callPromise(promise, false);
    }
    
    addTransaction = async (createTransactionDTO: CreateTransactionDTO) => {
        const promise = this.transactionApi.apiTransactionsAddPost(createTransactionDTO, undefined);
        const _ignore = await this.callPromise(promise, false);
    }
    
    deleteTransaction = async (transactionId: string) => {
        const promise = this.transactionApi.apiTransactionsDeleteDelete(transactionId, undefined);
        const _ignore = await this.callPromise(promise, false);
    }
}

decorate(TransactionStore, {
    getTransactionsInInterval: action,
    getTransactionsInMonth: action,
    updateTransaction: action,
    addTransaction: action,
    deleteTransaction: action,
});