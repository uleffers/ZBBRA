import React from 'react';
import {Form, Popconfirm, Table} from "antd";
import text from "../../Texts";
import {AccountDTO, BudgetCategoryDTO, TransactionDTO} from "swagger-api";
import formatDate from "../../Utils/formatDate";
import EditableCell from "../common/EditableCell";

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
    
    const columns = [
        {
            title: texts.date,
            dataIndex: 'transactionDate',
            key: 'date' + tableName,
            render: (date: Date ) => { 
                return formatDate(new Date(date.toString() ?? '')); 
            },
            Editable: false,
        },
        {
            title: texts.amount,
            dataIndex: 'transactionAmount',
            key: 'amount' + tableName,
            render: (amount: Number) => {
                return amount.toFixed(2).toString() + " kr."
            },
            Editable: false,
        },
        {
            title: texts.category,
            dataIndex: 'budgetCategoryId',
            key: 'category' + tableName,
            render: (budgetCategoryId: string) => {
                return props.budgetCategories.find(cat => cat.budgetCategoryId === budgetCategoryId)?.categoryName ?? '';
            },
            Editable: false,
        },
        {
            title: texts.account,
            dataIndex: 'accountId',
            key: 'account' + tableName,
            render: (accountId: string) => {
                return props.accounts.find(a => a.accountId == accountId)?.accountName ?? '';
            },
            Editable: false,
        },
        {
            title: texts.note,
            dataIndex: 'transactionNote',
            key: 'note' + tableName,
            Editable: true,
        },
        {
            title: '',
            dataIndex: 'operation',
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
    
    const mergedColumns = columns.map((col) => {
        if (!col.Editable){
            return col;
        }
        
        return {
            ...col,
            onCell: (record: TransactionDTO) => ({
                record,
                inputType: 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: props.isEditing(record.transactionId),
            }),
        };
    });
    
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
                columns={mergedColumns}
                dataSource={props.transactionResults}
                pagination={{pageSize: 20}}
            />
        </Form>
        
    );
};

export default TransactionTable;