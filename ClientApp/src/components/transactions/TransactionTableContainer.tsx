import { observer } from 'mobx-react-lite';
import React, {useEffect} from 'react';
import {TransactionStore} from "../../stores/TransactionStore";
import {useStore} from "../../Hooks/stores";
import TransactionTable from "./TransactionTable";

export interface TransactionTableContainerProps {
    month: number;
    year: number;
}
export const TransactionTableContainer: React.FC<TransactionTableContainerProps> = observer((props: TransactionTableContainerProps) => {
    const store: TransactionStore = useStore(TransactionStore);
    useEffect(() => {
        store.getTransactionsInMonth(props.month, props.year);
        store.accountInformationStore.getAccounts();
        store.budgetCategoryStore.getBudgetCategories();
    }, []);
    
    return (
    !!store.payload ?
        (
            <TransactionTable 
                transactionResults={store.payload} 
                accounts={store.accountInformationStore.payload} 
                budgetCategories={store.budgetCategoryStore.payload}
            />
        )
        : <React.Fragment />
    )
})