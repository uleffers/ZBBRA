import {BudgetEntrySpentDTO, BudgetGroupDTO} from "swagger-api";
import {Card} from "antd";
import React from "react";
import text from "../../Texts";

export interface BudgetOverviewCardProps {
    budgetEntries: Array<BudgetGroupDTO>;
    income: number;
}

const BudgetOverviewCard: React.FC<BudgetOverviewCardProps> = (props: BudgetOverviewCardProps) => {
    const texts = text.budgetPage;


    const budgeted = props.budgetEntries?.reduce( function(cnt,o){ return cnt + (o.budgetEntryAmount || 0); }, 0);
    const spent = props.budgetEntries?.reduce( function(cnt,o){ return cnt + (o.transactionSum || 0); }, 0);

    const toBudget = props.income - budgeted;
    return (
        <Card title={texts.overview}>
            <span>
                <p style={{color: (toBudget < 0 ? "red" : "green")}}><b>{texts.toBudget}:</b> {toBudget} kr.</p><br/>
                <p><b>{texts.income}:</b> {props.income} kr.</p>
                <p><b>{texts.spent}:</b> {spent} kr.</p>
                <p><b>{texts.budgetted}:</b> {budgeted} kr.</p>
            </span>
        </Card>
    )
};

export default BudgetOverviewCard;