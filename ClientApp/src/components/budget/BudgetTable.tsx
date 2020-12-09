import {BudgetEntrySpentDTO, BudgetGroupDTO} from "swagger-api";
import text from "../../Texts";
import React from "react";
import {Table} from "antd";

export interface BudgetTableProps {
    budgetEntries: Array<BudgetEntrySpentDTO>;
}

const BudgetTable: React.FC<BudgetTableProps> = (props: BudgetTableProps) => {
    const texts = text.budgetPage;

    const tableName = '-innerBudgetTable';
    const columns = [
        {
            dataIndex: 'budgetCategoryName',
            key: 'budgetCategoryName' + tableName,
            width: 400
        },
        {
            dataIndex: 'previousBudgetEntrySum',
            key: 'previousBudgetEntrySum' + tableName,
            width: 300
        },
        {
            dataIndex: 'budgetEntryAmount',
            key: 'budgetEntryAmount' + tableName,
            width: 300
        },
        {
            dataIndex: 'transactionSum',
            key: 'transactionSum' + tableName,
            width: 300
        },
        {
            dataIndex: 'remaining',
            key: 'remaining' + tableName,
            width: 300
        }
    ];
    
    return (
        <Table 
            bordered 
            columns={columns} 
            dataSource={props.budgetEntries}
            pagination={false}
            showHeader={false}
        />
    )
};

export default BudgetTable;