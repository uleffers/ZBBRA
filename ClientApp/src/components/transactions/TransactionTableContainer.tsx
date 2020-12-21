import { observer } from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import {TransactionStore} from "../../stores/TransactionStore";
import {useStore} from "../../Hooks/stores";
import TransactionTable from "./TransactionTable";
import {MONTH_INT_MAP} from "../../Utils/MonthMapper";
import {Button, Col, Form, InputNumber, Row, Select} from "antd";
import {TransactionDTO} from "swagger-api/dist/api/api";
import formatDate from "../../Utils/formatDate";
import {CreateTransactionDTO} from "swagger-api";

import { PlusOutlined } from '@ant-design/icons';

export const TransactionTableContainer: React.FC = observer(() => {

    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    
    const [monthState, setMonthState] = useState(0);
    const [yearState, setYearState] = useState(0);
    
    const [newTransaction, setNewTransaction] = useState('')

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
        
        form.setFieldsValue({transactionDate: formatDate(new Date(record.transactionDate?.toString() ?? ''))})
        setEditingKey(record.transactionId ?? '');
    };

    const onCancelEdit = () => {
        setEditingKey('');
        setNewTransaction('')
    };
    
    const handleAdd = () => {
        const returnTransaction: TransactionDTO = {
            transactionId: '-1',
            transactionNote: '',
            incomeAmount: 0,
            expenseAmount: 0,
            transactionDate: new Date()
        };
        setNewTransaction(JSON.stringify(returnTransaction))
        onEdit(returnTransaction);
    }
    
    const onEditSave = async (e: TransactionDTO) => {
        try {
            const row = await form.validateFields();
            
            let currentItem = store.payload.find((transaction) => transaction.transactionId == editingKey);
            const incomeAmount = (form.getFieldValue('incomeAmount') !== null && form.getFieldValue('incomeAmount') !== "")
                ? form.getFieldValue('incomeAmount')
                : 0;

            const expenseAmount = (form.getFieldValue('expenseAmount') !== null && form.getFieldValue('expenseAmount') !== "")
                ? form.getFieldValue('expenseAmount')
                : 0;
            if (currentItem){
                let dateString = form.getFieldValue('transactionDate');
                let date = dateString.split('-');

                const returnTransaction: TransactionDTO = {
                    transactionId: currentItem.transactionId,
                    budgetCategoryId: (form.getFieldValue('budgetCategoryId') !== '' ? form.getFieldValue('budgetCategoryId') : null),
                    accountId: form.getFieldValue('accountId'),
                    transactionNote: form.getFieldValue('transactionNote'),
                    expenseAmount: expenseAmount,
                    incomeAmount: incomeAmount,
                    transactionDate: new Date(Date.UTC(parseInt(date[2]) , parseInt(date[1]) - 1, parseInt(date[0])))
                };
                
                await store.updateTransaction(returnTransaction);
            } else {
                let dateString = form.getFieldValue('transactionDate');
                let date = dateString.split('-');

                const returnTransaction: CreateTransactionDTO = {
                    budgetCategoryId: (form.getFieldValue('budgetCategoryId') !== '' ? form.getFieldValue('budgetCategoryId') : null),
                    accountId: form.getFieldValue('accountId'),
                    transactionNote: form.getFieldValue('transactionNote'),
                    expenseAmount: expenseAmount,
                    incomeAmount: incomeAmount,
                    transactionDate: new Date(Date.UTC(parseInt(date[2]) , parseInt(date[1]) - 1, parseInt(date[0])))
                };

                await store.addTransaction(returnTransaction);
                setNewTransaction('');
            }
            setEditingKey('');
            updateTransactionTable();
        } catch (errInfo)
        {
            console.log("Could not validate fields.", errInfo);
        }
    };
    
    const generateOptions = () => {
        let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        return months.map(function (month, i) {
            return <Option value={month}>{MONTH_INT_MAP.get(month) || 'NotMapped'}</Option>
        })
    }

    const onDelete = async (e: TransactionDTO) => {
        if (!!e.transactionId){
            await store.deleteTransaction(e.transactionId);
            updateTransactionTable();
        }
    }
    
    
    return (
    !!store.payload ?
        (   
            <>
                <Row align="bottom" style={{marginBottom:8}}>
                    <Col span={2}>
                        <Select 
                            onChange={onMonthChange} 
                            defaultValue={new Date().getMonth() + 1} 
                            style={{width:"100%"}}
                        >
                            {generateOptions()}
                        </Select>
                    </Col>
                    <Col span={2}>
                        <InputNumber 
                            onChange={onYearChange} 
                            defaultValue={new Date().getFullYear()}
                            style={{width:"100%"}}
                        />
                    </Col>
                    <Col span={2} offset={17}>
                        <span >Netto: {
                            (store.payload.map((dto) => dto.incomeAmount || 0).reduce((a, b) => a + b, 0)
                                - store.payload.map((dto) => dto.expenseAmount || 0).reduce((a, b) => a + b, 0))
                            .toFixed(2)} kr.</span>
                    </Col>
                    <Col span={1}>
                        <Button onClick={handleAdd} type="primary" style={{float:'right', width:"100%"}}>
                            <PlusOutlined />
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <TransactionTable
                            transactionResults={newTransaction==='' ? store.payload : [JSON.parse(newTransaction), ...store.payload]}
                            accounts={store.accountInformationStore.payload}
                            budgetCategories={store.budgetCategoryStore.payload}
                            isEditing={isEditing}
                            onEdit={onEdit}
                            onCancelEdit={onCancelEdit}
                            onEditSave={onEditSave}
                            form={form}
                            editingKey={editingKey}
                            onDelete={onDelete}
                        />
                    </Col>
                </Row>
            </>
        )
        : <React.Fragment />
    )
})