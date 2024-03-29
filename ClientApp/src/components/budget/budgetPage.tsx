﻿import React from 'react';
import {Divider, PageHeader} from "antd";
import Text from "../../Texts";
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