import {CashflowOverviewDTO, DashboardApi} from "swagger-api";
import {action, decorate} from "mobx";
import {ObjectFetchingStore} from "./baseStores/fetchingStores/ObjectFetchingStore";

export class DashboardStore extends ObjectFetchingStore<CashflowOverviewDTO> {
    dashboardApi: DashboardApi = new DashboardApi(undefined, undefined, this.rootStore.axiosInstance);

    getCashflow = (month: number, year: number) => {
        const promise = this.dashboardApi.apiDashboardGetoverviewGet(month, year);
        const _ignore = this.callPromise(promise);
    }
}

decorate(DashboardStore, {
    getCashflow: action,
});