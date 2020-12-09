import {observer} from "mobx-react-lite";
import {Button, Card, Col, Form, InputNumber, Row, Select, Table} from "antd";
import React, {useEffect, useState} from "react";
import {TransactionStore} from "../../stores/TransactionStore";
import {useStore} from "../../Hooks/stores";
import {BudgetStore} from "../../stores/BudgetStore";
import {MONTH_INT_MAP} from "../../Utils/MonthMapper";
import {PlusOutlined} from "@ant-design/icons";
import TransactionTable from "../transactions/TransactionTable";
import BudgetTable from "./BudgetTable";
import text from "../../Texts";

import {BudgetEntrySpentDTO} from "swagger-api";

export const BudgetTableContainer: React.FC = observer(() => {
    const texts = text.budgetPage;

    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');

    const [monthState, setMonthState] = useState(0);
    const [yearState, setYearState] = useState(0);


    const store: BudgetStore = useStore(BudgetStore);
    const { Option } = Select;

    useEffect(() => {
        let d = new Date();
        store.getBudgetInMonth(d.getMonth() + 1, d.getFullYear());
    }, []);

    const onMonthChange = (e: any) => {
        if (e !== monthState){
            setMonthState(e);
            store.getBudgetInMonth(e, yearState === 0 ? new Date().getFullYear() : yearState);
        }
    }

    const onYearChange = (e: any) => {
        if (e !== yearState && e>=1000 && e <= 9999){
            setYearState(e);
            store.getBudgetInMonth(monthState === 0 ? new Date().getMonth() + 1: monthState, e);
        }
    }

    const isEditing = (transactionId?: string) => transactionId === editingKey;

    const updateBudgetTable = () =>  {
        store.getBudgetInMonth(monthState === 0 ? new Date().getMonth() + 1: monthState, yearState === 0 ? new Date().getFullYear() : yearState);
    }

    const onCancelEdit = () => {
        setEditingKey('');
    };

    const generateOptions = () => {
        let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        return months.map(function (month, i) {
            return <Option value={month}>{MONTH_INT_MAP.get(month) || 'NotMapped'}</Option>
        })
    }
    const tableName = '-outerBudgetTable';

    const columns = [
        {
            title: texts.category,
            dataIndex: 'categoryGroupName',
            key: 'categoryGroupName',
            width: 400,
            render: (record:any) => <b>{record}</b>
        },
        {
            title: texts.rollingBudget,
            dataIndex: 'previousBudgetEntrySum',
            key: 'previousBudgetEntrySum' + tableName,
            width: 300,
            render: (record:any) => <b>{record} kr.</b>
        },
        {
            title: texts.budgetted,
            dataIndex: 'budgetEntryAmount',
            key: 'budgetEntryAmount' + tableName,
            width: 300,
            render: (record:any) => <b>{record} kr.</b>
        },
        {
            title: texts.spent,
            dataIndex: 'transactionSum',
            key: 'transactionSum' + tableName,
            width: 300,
            render: (record:any) => <b>{record} kr.</b>
        },
        {
            title: texts.result,
            dataIndex: 'remaining',
            key: 'remaining' + tableName,
            width: 300,
            render: (record:any) => <b>{record} kr.</b>
        }
    ]
    
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
                    </Row>
                    <Table 
                        columns={columns}
                        dataSource={store.payload.map((x,i) => ({
                            key: i, 
                            categoryGroupName: x.categoryGroupName,
                            previousBudgetEntrySum: x.previousBudgetEntrySum,
                            budgetEntryAmount: x.budgetEntryAmount,
                            transactionSum: x.transactionSum,
                            remaining: x.remaining,
                            budgetEntrySpentDTOs: x.budgetEntrySpentDTOs
                        }))}
                        pagination={false}
                        expandable={{
                            expandedRowRender:record => (
                                <BudgetTable budgetEntries={record.budgetEntrySpentDTOs || new Array<BudgetEntrySpentDTO>()} />
                            ),
                        }}
                    />
                </>
            )
            : <React.Fragment />
    )});

export default BudgetTableContainer;