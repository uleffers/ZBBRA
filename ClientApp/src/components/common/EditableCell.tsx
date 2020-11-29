import {Input, InputNumber, Form, DatePicker} from 'antd';
import React, {Children} from "react";
import {TransactionDTO} from "swagger-api";

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    required: boolean;
    inputType: 'number' | 'text' | 'date';
    record: TransactionDTO;
    index: number;
    children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = (props: EditableCellProps) => {
    let inputNode;
    
    switch(props.inputType){
        case 'text':
        {
            inputNode = <Input />;
            break;
        }
        case "number":
        {
            inputNode = <InputNumber />
            break;
        }
        case "date":
        {
            inputNode = <DatePicker />
            break;
        }
        default:
        {
            inputNode = <Input />;
            break;
        }
    }
    
    return <td>
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