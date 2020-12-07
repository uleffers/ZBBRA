import React from 'react';
import {Form, Popconfirm, Select, Table} from "antd";
import text from "../../Texts";
import {AccountDTO, BudgetCategoryDTO, TransactionDTO} from "swagger-api";
import formatDate from "../../Utils/formatDate";
import EditableCell from "../common/EditableCell";
import {MONTH_INT_MAP} from "../../Utils/MonthMapper";

export interface TransactionTableProps {
    transactionResults: Array<TransactionDTO>;
    budgetCategories: Array<BudgetCategoryDTO>;
    accounts: Array<AccountDTO>;
    isEditing: Function;
    onEdit: Function;
    onCancelEdit: any;
    onEditSave: Function;
    editingKey: string;
    form:any;
}

const TransactionTable: React.FC<TransactionTableProps> = (props: TransactionTableProps) => {
    const texts = text.transactionPage;
    const tableName = '-transactionTable';
    const { Option } = Select;

    const generateAccountOptions = () => {
        return props.accounts.map(function (account, i) {
            return <Option value={account.accountId || ''}>{account.accountName || ''}</Option>
        })
    }
    
    const generateCategoryOptions = () => {
        return props.budgetCategories.map(function (category, i) {
            return <Option value={category.budgetCategoryId || ''}>{category.categoryName}</Option>
        })
    }
    
    const columns = [
        {
            title: texts.date,
            dataIndex: 'transactionDate',
            key: 'date' + tableName,
            render: (date: Date ) => { 
                return formatDate(new Date(date.toString() ?? '')); 
            },
            onCell: (record: TransactionDTO) => ({
                record,
                inputType: 'text',
                dataIndex: 'transactionDate',
                title: texts.date,
                editing: props.isEditing(record.transactionId),
            }),
        },
        {
            title: texts.expense,
            dataIndex: 'expenseAmount',
            key: 'expenseAmount' + tableName,
            align: 'right' as 'right',
            render: (expenseAmount: Number) => {
                return (expenseAmount !== 0 ? expenseAmount.toFixed(2).toString() + " kr." : '')
            },
            onCell: (record: TransactionDTO) => ({
                record,
                inputType: 'amount',
                dataIndex: 'expenseAmount',
                title: texts.expense,
                editing: props.isEditing(record.transactionId),
            }),
        },
        {
            title: texts.income,
            dataIndex: 'incomeAmount',
            key: 'incomeAmount' + tableName,
            align: 'right' as 'right',
            render: (incomeAmount: Number) => {
                return (incomeAmount !== 0 ? incomeAmount.toFixed(2).toString() + " kr." : '');
            },
            onCell: (record: TransactionDTO) => ({
                record,
                inputType: 'amount',
                dataIndex: 'incomeAmount',
                title: texts.income,
                editing: props.isEditing(record.transactionId),
            }),
        },
        {
            title: texts.category,
            dataIndex: 'budgetCategoryId',
            key: 'category' + tableName,
            render: (budgetCategoryId: string) => {
                return props.budgetCategories.find(cat => cat.budgetCategoryId === budgetCategoryId)?.categoryName ?? '';
            },
            onCell: (record: TransactionDTO) => ({
                record,
                inputType: 'select',
                dataIndex: 'budgetCategoryId',
                title: texts.category,
                editing: props.isEditing(record.transactionId),
                selectOptions: generateCategoryOptions(),
            }),
        },
        {
            title: texts.account,
            dataIndex: 'accountId',
            key: 'account' + tableName,
            render: (accountId: string) => {
                return props.accounts.find(a => a.accountId == accountId)?.accountName ?? '';
            },
            onCell: (record: TransactionDTO) => ({
                record,
                inputType: 'select',
                dataIndex: 'accountId',
                title: texts.account,
                editing: props.isEditing(record.transactionId),
                selectOptions: generateAccountOptions(),
            }),
        },
        {
            title: texts.note,
            dataIndex: 'transactionNote',
            key: 'note' + tableName,
            onCell: (record: TransactionDTO) => ({
                record,
                inputType: 'text',
                dataIndex: 'transactionNote',
                title: texts.note,
                editing: props.isEditing(record.transactionId),
            }),
        },
        {
            title: 'Edit',
            dataIndex: 'operation',
            width: 50,
            render: (unUsed: any, record: any) => {
                const editable = props.isEditing(record.transactionId);
                return editable ? (
                    <span>
                        <a
                            href="javascript:;"
                            onClick={() => props.onEditSave(record)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </a>
                        <Popconfirm title="Sure to cancel?" onConfirm={props.onCancelEdit}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <a onClick={() => props.onEdit(record)}>
                        Edit
                    </a>
                );
            },
        },
    ];
    
    return (
        <Form form={props.form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                className={'advancedSearch-table'}
                columns={columns}
                dataSource={props.transactionResults}
                pagination={{pageSize: 20}}
            />
        </Form>
        
    );
};

export default TransactionTable;