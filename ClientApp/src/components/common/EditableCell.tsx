import {Input, InputNumber, Form, DatePicker, Select} from 'antd';
import React, {Children} from "react";
import {TransactionDTO} from "swagger-api";

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    required: boolean;
    inputType: 'amount' | 'text' | 'date' | 'select' ;
    record: TransactionDTO;
    index: number;
    children: React.ReactNode;
    selectOptions?: React.ReactNode[];
}

const EditableCell: React.FC<EditableCellProps> = (props: EditableCellProps) => {
    let inputNode;
    
    switch(props.inputType){
        case 'text':
        {
            inputNode = <Input />;
            break;
        }
        case "amount":
        {
            inputNode = <InputNumber />
            break;
        }
        case "date":
        {
            inputNode = <DatePicker />
            break;
        }
        case "select":
        {
            inputNode = (
                <Select allowClear={true}>
                    {props.selectOptions}
                </Select>)
            break;
        }
        default:
        {
            inputNode = <Input />;
            break;
        }
    }
    
    return <td align={(props.inputType === "amount" ? "right" : "left")}>
            {
                props.editing ?
                    <Form.Item name={props.dataIndex} style={{margin: 0}} required={false}>
                        {inputNode}
                    </Form.Item>
                    : (props.children)
            }
            </td>
            ;
};


export default EditableCell;