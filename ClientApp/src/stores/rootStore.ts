import { createContext } from 'react';
import {TransactionStore} from "./TransactionStore";
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {AccountStore} from "./AccountStore";
import {BudgetCategoryStore} from "./BudgetCategoryStore";
import {BudgetStore} from "./BudgetStore";
import {DashboardStore} from "./DashboardStore";

export class RootStore {
    transactionStore: TransactionStore = new TransactionStore(this);
    accountInformationStore: AccountStore = new AccountStore(this);
    budgetCategoryStore: BudgetCategoryStore = new BudgetCategoryStore(this);
    budgetStore: BudgetStore = new BudgetStore(this);
    dashboardStore: DashboardStore = new DashboardStore(this);
    
    private innerAxiosInstance?: AxiosInstance;

    get axiosInstance(): AxiosInstance {
        if (!this.innerAxiosInstance) {
            this.innerAxiosInstance = axios.create();

            this.innerAxiosInstance?.interceptors.response.use(
                (response: AxiosResponse) => {
                    return response;
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        } 
        return this.innerAxiosInstance ?? axios.create();
    }
}

export const storeContext = createContext(new RootStore());