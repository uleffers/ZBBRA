import {BudgetEntrySpentDTO, BudgetGroupDTO, TransactionDTO} from "swagger-api";
import text from "../../Texts";
import React from "react";
import {Button, Form, Input, Popconfirm, Table} from "antd";
import EditableBudgetCell from "./EditableBudgetCell";
import EditableTableCell from "../common/EditableTableCell";
import {CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined} from "@ant-design/icons";

export interface BudgetTableInnerProps {
    budgetEntries: Array<BudgetEntrySpentDTO>;
    form:  any;
    isEditing: Function;
    onEdit: Function;
    onCancelEdit: any;
    onEditSave: Function;
    categoryGroupName: string;
}

const BudgetTableInner: React.FC<BudgetTableInnerProps> = (props: BudgetTableInnerProps) => {
    const texts = text.budgetPage;

    const tableName = '-innerBudgetTable';
    const columns = [
        {
            dataIndex: 'budgetCategoryName',
            key: 'budgetCategoryName' + tableName,
            width: 400,
            onCell: (record: BudgetEntrySpentDTO) => ({
                record,
                inputType: 'text',
                dataIndex: 'budgetCategoryName',
                title: texts.category,
                editing:false,
            }),
        },
        {
            dataIndex: 'previousBudgetEntrySum',
            key: 'previousBudgetEntrySum' + tableName,
            width: 300,
            onCell: (record: BudgetEntrySpentDTO) => ({
                record,
                inputType: 'amount',
                dataIndex: 'previousBudgetEntrySum',
                title: texts.rollingBudget,
                editing:false,
            }),
            render: (record:any) => <p>{record} kr.</p>
        },
        {
            dataIndex: 'budgetEntryAmount',
            key: 'budgetEntryAmount' + tableName,
            width: 300,
            onCell: (record: BudgetEntrySpentDTO) => ({
                record,
                inputType: 'amount',
                dataIndex: 'budgetEntryAmount',
                title: texts.budgetted,
                editing: props.isEditing(record.budgetCategoryId),
            }),
            render: (record:any) => <p>{record} kr.</p>
        },
        {
            dataIndex: 'transactionSum',
            key: 'transactionSum' + tableName,
            width: 300,
            onCell: (record: BudgetEntrySpentDTO) => ({
                record,
                inputType: 'amount',
                dataIndex: 'transactionSum',
                title: texts.spent,
                editing:false,
            }),
            render: (record:any) => <p>{record} kr.</p>
        },
        {
            dataIndex: 'remaining',
            key: 'remaining' + tableName,
            width: 300,
            onCell: (record: BudgetEntrySpentDTO) => ({
                record,
                inputType: 'amount',
                dataIndex: 'remaining',
                title: texts.result,
                editing:false,
            }),
            render: (record:any) => <p>{record} kr.</p>
        },
        {
            title: 'Edit',
            dataIndex: 'operation',
            width: 75,
            key: 'operation' + tableName,
            render: (unUsed: any, record: BudgetEntrySpentDTO) => {
                const editable = props.isEditing(record.budgetCategoryId);
                return editable ? (
                    <span>
                        <Button onClick={async () => await props.onEditSave(record)} type="default">
                            <CheckOutlined />
                        </Button>
                        <Button onClick={() => props.onCancelEdit} type="default">
                            <CloseOutlined />
                        </Button>
                    </span>
                ) : (
                    <span>
                        <Button onClick={() => props.onEdit(record)} type="default">
                            <EditOutlined />
                        </Button>
                    </span>

                );
            }
        },
    ];
    
    return (
        <Form form={props.form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableTableCell,
                    },
                }}
                bordered 
                columns={columns} 
                dataSource={props.budgetEntries}
                pagination={false}
                showHeader={false}
            />
        </Form>
    )
};

export default BudgetTableInner;