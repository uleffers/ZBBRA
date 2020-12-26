import {InputNumber} from 'antd';
import React from "react";
import {TransactionDTO} from "swagger-api";

export interface EditableBudgetCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    required: boolean;
    inputType: 'amount' | 'text' | 'date' | 'select' ;
    record: TransactionDTO;
    index: number;
    children: React.ReactNode;
    selectOptions?: React.ReactNode[];
    onEditBlur:Function;
}

const EditableBudgetCell: React.FC<EditableBudgetCellProps> = (props: EditableBudgetCellProps) => {
    const onBlur = (e:any) => {
        console.log(e);
        props.onEditBlur(e, props.record);
    }
    
    return <td align={(props.inputType == 'amount' ? "right" : 'left')}>
        {
            props.editing ?
                    <InputNumber onBlur={onBlur} />
                : (props.children)
        }
    </td>
        ;
}  ;

export default EditableBudgetCell;