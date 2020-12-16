import React from "react";
import {BudgetEntrySpentDTO, BudgetGroupDTO, TransactionDTO} from "swagger-api";
import text from "../../Texts";
import {Table} from "antd";
import BudgetTableInner from "./BudgetTableInner";

export interface BudgetTableOuterProps {
    budgetEntries: Array<BudgetGroupDTO>;
    form:  any;
    isEditing: Function;
    onEdit: Function;
    onCancelEdit: any;
    onEditSave: Function;
}

const BudgetTableOuter: React.FC<BudgetTableOuterProps> = (props: BudgetTableOuterProps) => {
    const texts = text.budgetPage;

    const tableName = '-BudgetTableInner';
    
    const columns = [
        {
            title: texts.category,
            dataIndex: 'categoryGroupName',
            key: 'categoryGroupName' + tableName,
            width: 400,
            render: (record:any) => <b>{record}</b>
        },
        {
            title: texts.rollingBudget,
            dataIndex: 'previousBudgetEntrySum',
            key: 'previousBudgetEntrySum' + tableName,
            width: 300,
            render: (record:any) => <b>{record} kr.</b>,
            align:"right" as "right"
        },
        {
            title: texts.budgetted,
            dataIndex: 'budgetEntryAmount',
            key: 'budgetEntryAmount' + tableName,
            width: 300,
            render: (record:any) => <b>{record} kr.</b>,
            align:"right" as "right"
        },
        {
            title: texts.spent,
            dataIndex: 'transactionSum',
            key: 'transactionSum' + tableName,
            width: 300,
            render: (record:any) => <b>{record} kr.</b>,
            align:"right" as "right"
        },
        {
            title: texts.result,
            dataIndex: 'remaining',
            key: 'remaining' + tableName,
            width: 300,
            render: (record:any) => <b>{record} kr.</b>,
            align:"right" as "right"
        },
        {
            title: texts.actions,
            dataIndex: 'operation',
            key: 'operation' + tableName,
            width: 75,
        }
    ]

    return (
        <Table
            columns={columns}
            dataSource={props.budgetEntries.map((x,i) => ({
                key: i,
                categoryGroupName: x.categoryGroupName,
                previousBudgetEntrySum: x.budgetEntrySpentDTOs?.reduce( function(cnt,o){ return cnt + (o.previousBudgetEntrySum || 0); }, 0),
                budgetEntryAmount: x.budgetEntrySpentDTOs?.reduce( function(cnt,o){ return cnt + (o.budgetEntryAmount || 0); }, 0),
                transactionSum: x.budgetEntrySpentDTOs?.reduce( function(cnt,o){ return cnt + (o.transactionSum || 0); }, 0),
                remaining: x.budgetEntrySpentDTOs?.reduce( function(cnt,o){ return cnt + (o.remaining || 0); }, 0),
                budgetEntrySpentDTOs: x.budgetEntrySpentDTOs
            }))}
            pagination={false}
            expandable={{
                expandedRowRender: (record:BudgetGroupDTO) => (
                    <BudgetTableInner 
                        budgetEntries={record.budgetEntrySpentDTOs || new Array<BudgetEntrySpentDTO>()}
                        form={props.form}
                        isEditing={props.isEditing}
                        onEdit={props.onEdit}
                        onCancelEdit={props.onCancelEdit}
                        onEditSave={props.onEditSave}
                        categoryGroupName={record.categoryGroupName ?? ''}
                    />
                ),
            }}
        />
    )
};

export default BudgetTableOuter;