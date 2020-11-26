import React from 'react';
import {Table} from "antd";
import text from "../../Texts";
import {AccountDTO, BudgetCategoryDTO, TransactionDTO} from "swagger-api";
import formatDate from "../../Utils/formatDate";

export interface TransactionTableProps {
    transactionResults: Array<TransactionDTO>;
    budgetCategories: Array<BudgetCategoryDTO>;
    accounts: Array<AccountDTO>;
}

const TransactionTable: React.FC<TransactionTableProps> = (props: TransactionTableProps) => {
    const texts = text.transactionPage;
    const tableName = '-transactionTable';
    
    const columns = [
        {
            title: texts.date,
            dataIndex: 'transactionDate',
            key: 'date' + tableName,
            render: (date: Date ) => { 
                return formatDate(new Date(date.toString() ?? '')); 
            }
        },
        {
            title: texts.amount,
            dataIndex: 'transactionAmount',
            key: 'amount' + tableName,
        },
        {
            title: texts.category,
            dataIndex: 'budgetCategoryId',
            key: 'category' + tableName,
            render: (budgetCategoryId: string) => {
                console.log(budgetCategoryId);
                return props.budgetCategories.find(cat => cat.budgetCategoryId === budgetCategoryId)?.categoryName ?? '';
            }
        },
        {
            title: texts.account,
            dataIndex: 'accountId',
            key: 'account' + tableName,
            render: (accountId: string) => {
                return props.accounts.find(a => a.accountId == accountId)?.accountName ?? '';
            }
        },
        {
            title: texts.note,
            dataIndex: 'transactionNote',
            key: 'note' + tableName,
        },
    ];
    
    return (
        <Table
            className={'advancedSearch-table'}
            columns={columns}
            dataSource={props.transactionResults}
            pagination={{pageSize: 20}}
        />
    );
};

export default TransactionTable;