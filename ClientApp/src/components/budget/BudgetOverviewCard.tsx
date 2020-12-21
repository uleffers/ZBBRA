import {BudgetEntrySpentDTO, BudgetGroupDTO, BudgetOverviewDTO} from "swagger-api";
import {Card} from "antd";
import React from "react";
import text from "../../Texts";

export interface BudgetOverviewCardProps {
    budgetOverview?: BudgetOverviewDTO;
}

const BudgetOverviewCard: React.FC<BudgetOverviewCardProps> = (props: BudgetOverviewCardProps) => {
    const texts = text.budgetPage;

    return (
        <Card title={texts.overview}>
            <span>
                <p style={{color: ((props.budgetOverview?.toBeBudgeted || 0 ) < 0 ? "red" : "green")}}><b>{texts.toBudget}:</b> {(props.budgetOverview?.toBeBudgeted || 0 )} kr.</p><br/>
                <p><b>{texts.income}:</b> {props.budgetOverview?.income || 0} kr.</p>
                <p><b>{texts.spent}:</b> {props.budgetOverview?.spent || 0} kr.</p>
                <p><b>{texts.budgeted}:</b> {props.budgetOverview?.budgeted || 0} kr.</p>
            </span>
        </Card>
    )
};

export default BudgetOverviewCard;