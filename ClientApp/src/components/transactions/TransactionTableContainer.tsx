import { observer } from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import {TransactionStore} from "../../stores/TransactionStore";
import {useStore} from "../../Hooks/stores";
import TransactionTable from "./TransactionTable";
import {MONTH_INT_MAP} from "../../Utils/MonthMapper";
import {Col, Form, InputNumber, Row, Select} from "antd";
import {TransactionDTO} from "swagger-api/dist/api/api";

export const TransactionTableContainer: React.FC = observer(() => {

    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    
    const [monthState, setMonthState] = useState(0);
    const [yearState, setYearState] = useState(0);
    
    

    const store: TransactionStore = useStore(TransactionStore);
    const { Option } = Select;

    useEffect(() => {
        let d = new Date();
        store.getTransactionsInMonth(d.getMonth() + 1, d.getFullYear());
        store.accountInformationStore.getAccounts();
        store.budgetCategoryStore.getBudgetCategories();
        }, []);

    const onMonthChange = (e: any) => {
        if (e !== monthState){
            setMonthState(e);
            store.getTransactionsInMonth(e, yearState === 0 ? new Date().getFullYear() : yearState);
        }
    }

    const onYearChange = (e: any) => {
        if (e !== yearState && e>=1000 && e <= 9999){
            setYearState(e);
            store.getTransactionsInMonth(monthState === 0 ? new Date().getMonth() + 1: monthState, e);
        }
    }

    const isEditing = (transactionId?: string) => transactionId === editingKey;

    const updateTransactionTable = () =>  {
        store.getTransactionsInMonth(monthState === 0 ? new Date().getMonth() + 1: monthState, yearState === 0 ? new Date().getFullYear() : yearState);
    }
    const onEdit = (record: TransactionDTO) => {
        form.setFieldsValue({
            transactionDate: '',
            transactionAmount: '',
            transactionNote: '',
            budgetCategoryId: '',
            accountId: '',
            ...record,
        });
        setEditingKey(record.transactionId ?? '');
    };

    const onCancelEdit = () => {
        console.log("onCancelEdit")
        setEditingKey('');
    };
    
    const onEditSave = async (e: TransactionDTO) => {
        console.log("onEditSave")
        try {
            const row = await form.validateFields();
            
            let currentItem = store.payload.find((transaction) => transaction.transactionId == e.transactionId);
            
            if (currentItem){
                console.log("setting note");
                console.log(form.getFieldValue('transactionNote'))
                currentItem.transactionNote = form.getFieldValue('transactionNote');
                await store.updateTransaction(e);
            }
            setEditingKey('');
            updateTransactionTable();

        } catch (errInfo)
        {
            console.log("Could not validate fields.", errInfo);
        }
    };
    
    return (
    !!store.payload ?
        (   
            <>
                <Row>
                    <Col span={20}>
                        <span>Netto: {store.payload.map((dto) => dto.transactionAmount || 0).reduce((a, b) => a + b, 0)} kr.</span>
                    </Col>
                    <Col span={2}>
                        <Select onChange={onMonthChange} style={{ width: 120 }} defaultValue={new Date().getMonth() + 1}>
                            <Option value={1}>{MONTH_INT_MAP.get(1) || 'NotMapped'}</Option>
                            <Option value={2}>{MONTH_INT_MAP.get(2) || 'NotMapped'}</Option>
                            <Option value={3}>{MONTH_INT_MAP.get(3) || 'NotMapped'}</Option>
                            <Option value={4}>{MONTH_INT_MAP.get(4) || 'NotMapped'}</Option>
                            <Option value={5}>{MONTH_INT_MAP.get(5) || 'NotMapped'}</Option>
                            <Option value={6}>{MONTH_INT_MAP.get(6) || 'NotMapped'}</Option>
                            <Option value={7}>{MONTH_INT_MAP.get(7) || 'NotMapped'}</Option>
                            <Option value={8}>{MONTH_INT_MAP.get(8) || 'NotMapped'}</Option>
                            <Option value={9}>{MONTH_INT_MAP.get(9) || 'NotMapped'}</Option>
                            <Option value={10}>{MONTH_INT_MAP.get(10) || 'NotMapped'}</Option>
                            <Option value={11}>{MONTH_INT_MAP.get(11) || 'NotMapped'}</Option>
                            <Option value={12}>{MONTH_INT_MAP.get(12) || 'NotMapped'}</Option>
                        </Select>
                    </Col>
                    <Col span={2}>
                        <InputNumber onChange={onYearChange} defaultValue={new Date().getFullYear()}/>
                    </Col>
                </Row>
                <TransactionTable
                    transactionResults={store.payload}
                    accounts={store.accountInformationStore.payload}
                    budgetCategories={store.budgetCategoryStore.payload}
                    isEditing={isEditing}
                    onEdit={onEdit}
                    onCancelEdit={onCancelEdit}
                    onEditSave={onEditSave}
                    form={form}
                    editingKey={editingKey}
                />
            </>
        )
        : <React.Fragment />
    )
})