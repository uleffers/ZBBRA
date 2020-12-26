import {BudgetViewCategoryDTO} from "swagger-api";
import text from "../../Texts";
import React from "react";
import {Button, Form, Table} from "antd";
import EditableTableCell from "../common/EditableTableCell";
import {CheckOutlined, CloseOutlined, EditOutlined} from "@ant-design/icons";

export interface BudgetTableInnerProps {
    budgetEntries: Array<BudgetViewCategoryDTO>;
    form:  any;
    isEditing: Function;
    onEdit: Function;
    onCancelEdit: any;
    onEditSave: Function;
    categoryGroupName: string;
}

const BudgetTableInner: React.FC<BudgetTableInnerProps> = (props: BudgetTableInnerProps) => {
    const texts = text.budgetPage;
    const widthNumbers = "17.5%";
    const widthCategoryName = "20.5%";
    const widthEdit = "8%"; 
    
    const tableName = '-innerBudgetTable';
    const columns = [
        {
            dataIndex: 'budgetCategoryName',
            key: 'budgetCategoryName' + tableName,
            width: widthCategoryName,
            onCell: (record: BudgetViewCategoryDTO) => ({
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
            width: widthNumbers,
            onCell: (record: BudgetViewCategoryDTO) => ({
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
            width: widthNumbers,
            onCell: (record: BudgetViewCategoryDTO) => ({
                record,
                inputType: 'amount',
                dataIndex: 'budgetEntryAmount',
                title: texts.budgeted,
                editing: props.isEditing(record.budgetCategoryId),
                autoFocus:true,
                onPressEnter:props.onEditSave,
            }),
            render: (record:any) => <p>{record} kr.</p>
        },
        {
            dataIndex: 'transactionSum',
            key: 'transactionSum' + tableName,
            width: widthNumbers,
            onCell: (record: BudgetViewCategoryDTO) => ({
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
            width: widthNumbers,
            onCell: (record: BudgetViewCategoryDTO) => ({
                record,
                inputType: 'amount',
                dataIndex: 'remaining',
                title: texts.result,
                editing:false,
            }),
            render: (record:any) => <p style={{color: ((record || 0 ) < 0 ? "red" : "black")}}>{record} kr.</p>
        },
        {
            title: 'Edit',
            dataIndex: 'operation',
            width: widthEdit,
            key: 'operation' + tableName,
            render: (unUsed: any, record: BudgetViewCategoryDTO) => {
                const editable = props.isEditing(record.budgetCategoryId);
                return editable ? (
                    <span>
                        <Button onClick={async () => await props.onEditSave(record)} type="default">
                            <CheckOutlined />
                        </Button>
                        <Button onClick={() => props.onCancelEdit()} type="default" danger={true}>
                            <CloseOutlined />
                        </Button>
                    </span>
                ) : (
                    <span>
                        <Button onClick={() => props.onEdit(record)} type="default">
                            <EditOutlined  />
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
                style={{margin:0}}
            />
        </Form>
    )
};

export default BudgetTableInner;