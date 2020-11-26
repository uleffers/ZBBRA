import React from 'react';
import {TransactionTableContainer} from "./TransactionTableContainer";
import {Divider, PageHeader} from "antd";
import Text from "../../Texts";
import {observer} from "mobx-react-lite";

const TransactionPage: React.FC = observer(() => {
    return (
        <>
            <PageHeader title={Text.transactionPage.title}/>
            <Divider />
            <TransactionTableContainer/>
        </>
    );
});

export default TransactionPage;