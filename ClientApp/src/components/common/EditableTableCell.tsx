import {Input, InputNumber, Form, DatePicker, Select} from 'antd';
import React, {Children} from "react";
import {TransactionDTO} from "swagger-api";

export interface EditableTableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    required: boolean;
    inputType: 'amount' | 'text' | 'date' | 'select' ;
    index: number;
    children: React.ReactNode;
    selectOptions?: React.ReactNode[];
    autoFocus?:boolean;
    onPressEnter?:any;
}

const EditableTableCell: React.FC<EditableTableCellProps> = (props: EditableTableCellProps) => {
    let inputNode;
    
    const defaultOnPressEnter = () => {
        return;
    };
    
    switch(props.inputType){
        case 'text':
        {
            inputNode = <Input autoFocus={props.autoFocus ?? false} onPressEnter={props.onPressEnter ?? defaultOnPressEnter}/>;
            break;
        }
        case "amount":
        {
            inputNode = <InputNumber style={{float:'right'}} autoFocus={props.autoFocus ?? false} onPressEnter={props.onPressEnter ?? defaultOnPressEnter} />
            break;
        }
        case "date":
        {
            inputNode = <DatePicker autoFocus={props.autoFocus ?? false}/>
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


export default EditableTableCell;