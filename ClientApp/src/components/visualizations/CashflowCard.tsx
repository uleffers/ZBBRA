import React from "react";
import {Card} from "antd";
import text from "../../Texts";
import {BudgetOverviewDTO} from "swagger-api";

export interface CashflowCardProps {
    budgetOverview?: BudgetOverviewDTO;
}

const CashflowCard: React.FC = () => {
    const texts = text.visualisationPage;

    return (
        <Card title={texts.cashflowCard} >
            <b>{texts.income}: </b>
        </Card>
    );
};