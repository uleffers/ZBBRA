import React from 'react';
import {Card, Col, Divider, PageHeader, Row} from "antd";
import Text from "../../Texts";
import {TransactionTableContainer} from "../transactions/TransactionTableContainer";
import BudgetTableContainer from "./BudgetTableContainer";

const BudgetPage: React.FC = () => {
    return (
        <>
            <PageHeader title={Text.budgetPage.title}/>
            <Divider />
            <BudgetTableContainer/>
        </>
    );
};

export default BudgetPage;