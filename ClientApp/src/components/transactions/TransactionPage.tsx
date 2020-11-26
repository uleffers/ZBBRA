import React from 'react';
import {TransactionTableContainer} from "./TransactionTableContainer";

const TransactionPage: React.FC = () => {
    return (
        <TransactionTableContainer month={11} year={2020}/>
    );
};

export default TransactionPage;