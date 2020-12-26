import React from "react";
import {BudgetViewCategoryDTO, BudgetViewCategoryGroupDTO} from "swagger-api";
import text from "../../Texts";
import {Table} from "antd";
import BudgetTableInner from "./BudgetTableInner";

export interface BudgetTableOuterProps {
    budgetEntries: Array<BudgetViewCategoryGroupDTO>;
    form:  any;
    isEditing: Function;
    onEdit: Function;
    onCancelEdit: any;
    onEditSave: Function;
}

const BudgetTableOuter: React.FC<BudgetTableOuterProps> = (props: BudgetTableOuterProps) => {
    const texts = text.budgetPage;
    const widthNumbers = "17.5%";
    const widthCategoryName = "20.5%";
    const widthEdit = "8%";
    
    const tableName = '-BudgetTableInner';
    
    const columns = [
        {
            title: texts.category,
            dataIndex: 'categoryGroupName',
            key: 'categoryGroupName' + tableName,
            width: widthCategoryName,
            render: (record:any) => <b>{record}</b>
        },
        {
            title: texts.rollingBudget,
            dataIndex: 'previousBudgetEntrySum',
            key: 'previousBudgetEntrySum' + tableName,
            width: widthNumbers,
            render: (record:any) => <b>{record} kr.</b>,
            align:"right" as "right"
        },
        {
            title: texts.budgeted,
            dataIndex: 'budgetEntryAmount',
            key: 'budgetEntryAmount' + tableName,
            width: widthNumbers,
            render: (record:any) => <b>{record} kr.</b>,
            align:"right" as "right"
        },
        {
            title: texts.spent,
            dataIndex: 'transactionSum',
            key: 'transactionSum' + tableName,
            width: widthNumbers,
            render: (record:any) => <b>{record} kr.</b>,
            align:"right" as "right"
        },
        {
            title: texts.result,
            dataIndex: 'remaining',
            key: 'remaining' + tableName,
            width: widthNumbers,
            render: (record:any) => <b style={{color: ((record || 0 ) < 0 ? "red" : "black")}}>{record} kr.</b>,
            align:"right" as "right"
        },
        {
            title: texts.actions,
            dataIndex: 'operation',
            key: 'operation' + tableName,
            width: widthEdit,
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
            scroll={{ x: 1300 }}
            bordered={true}
            pagination={false}
            expandable={{
                expandedRowRender: (record:BudgetViewCategoryGroupDTO) => (
                    <BudgetTableInner 
                        budgetEntries={record.budgetEntrySpentDTOs || new Array<BudgetViewCategoryDTO>()}
                        form={props.form}
                        isEditing={props.isEditing}
                        onEdit={props.onEdit}
                        onCancelEdit={props.onCancelEdit}
                        onEditSave={props.onEditSave}
                        categoryGroupName={record.categoryGroupName ?? ''}
                    />
                ),
                expandRowByClick: true,
            }}
        />
    )
};

export default BudgetTableOuter;