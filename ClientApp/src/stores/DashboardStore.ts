import {BalanceHistoryDTO, CashflowOverviewDTO, DashboardApi} from "swagger-api";
import {action, decorate, observable, runInAction} from "mobx";
import {ObjectFetchingStore} from "./baseStores/fetchingStores/ObjectFetchingStore";

export class DashboardStore extends ObjectFetchingStore<CashflowOverviewDTO> {
    dashboardApi: DashboardApi = new DashboardApi(undefined, undefined, this.rootStore.axiosInstance);
    balanceHistory?: Array<BalanceHistoryDTO>;
    
    getCashflow = (month: number, year: number) => {
        const promise = this.dashboardApi.apiDashboardGetoverviewGet(month, year);
        const _ignore = this.callPromise(promise);
    }

    getAccountBalances = async () => {
        const promise = this.dashboardApi.apiDashboardGetbalancehistoryGet();
        promise.then(result => {
            runInAction(() => {
                this.balanceHistory = result.data;
            });
        });
    }
}

decorate(DashboardStore, {
    getCashflow: action,
    balanceHistory: observable,
});