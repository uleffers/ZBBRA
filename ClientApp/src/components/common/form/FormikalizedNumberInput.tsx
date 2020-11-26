import { Form, InputNumber } from 'antd';
import React from 'react';

export interface FormikalizedNumberInputProps {
    formik: any;
    label?: string;
    name: string;
    disabled?: boolean;
    min?: number;
    max?: number;
}

const FormikalizedNumberInput: React.FC<FormikalizedNumberInputProps> = (props: FormikalizedNumberInputProps) => {
    const { formik } = props;

    return (
        <div
            className="input-number">
            <Form.Item label={props.label}>
                <InputNumber
                    type="number"
                    name={props.name}
                    value={formik.values[props.name]}
                    onBlur={formik.handleBlur}
                    disabled={props.disabled}
                    onChange={value => formik.setFieldValue(props.name, value)}
                    min={props.min}
                    max={props.max}
                />
            </Form.Item>
        </div>
    );
};
export default FormikalizedNumberInput;