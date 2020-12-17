import {observer} from "mobx-react-lite";
import {Button, Card, Col, Form, InputNumber, Row, Select} from "antd";
import React, {useEffect, useState} from "react";
import {useStore} from "../../Hooks/stores";
import {BudgetStore} from "../../stores/BudgetStore";
import {MONTH_INT_MAP} from "../../Utils/MonthMapper";
import text from "../../Texts";
import BudgetTableOuter from "./BugetTableOuter";
import {
    BudgetEntrySpentDTO,
    CreateBudgetEntryDTO
} from "swagger-api";
import {EmptyGuid} from "../../Utils/EmptyGuid";
import {FileAddOutlined, PlusOutlined} from "@ant-design/icons";
import BudgetOverviewCard from "./BudgetOverviewCard";

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
        setYearState(new Date().getFullYear());
        setMonthState(new Date().getMonth() + 1)
    }, []);

    const onMonthChange = async (e: any) => {
        if (e !== monthState) {
            setMonthState(e);
            await store.getBudgetInMonth(e, yearState === 0 ? new Date().getFullYear() : yearState);
            console.log(store.income);
        }
    }

    const onYearChange = async (e: any) => {
        if (e !== yearState && e >= 1000 && e <= 9999) {
            setYearState(e);
            await store.getBudgetInMonth(monthState === 0 ? new Date().getMonth() + 1 : monthState, e);
        }
    }
    
    const isEditing = (budgetCategoryId:string) => {
        return budgetCategoryId === editingKey;
    };

    const updateBudgetTable = () =>  {
        store.getBudgetInMonth(monthState === 0 ? new Date().getMonth() + 1: monthState, yearState === 0 ? new Date().getFullYear() : yearState);
    }

    const onCancelEdit = () => {
        console.log("onCancelEdit");
        setEditingKey('');
    };

    const generateOptions = () => {
        let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        return months.map(function (month, i) {
            return <Option value={month}>{MONTH_INT_MAP.get(month) || 'NotMapped'}</Option>
        })
    }
    
    const onEdit = (record: BudgetEntrySpentDTO) => {
        form.setFieldsValue({
            budgetEntryId:'',
            budgetEntryAmount: '',
            transactionSum: '',
            remaining: '',
            previousBudgetEntrySum: '',
            budgetCategoryName: '',
            budgetCategoryId: '',
            ...record,
        });

        if (record.budgetEntryAmount === 0 && record.defaultBudgetEntryAmount !== 0){
            form.setFieldsValue({budgetEntryAmount:record.defaultBudgetEntryAmount});
        }
        setEditingKey(record.budgetCategoryId ?? '');
    };

        const onEditSave = async (e: BudgetEntrySpentDTO) => {
        console.log("onEditSave");
        try {
            const row = await form.validateFields();

            let currentItem = store.payload.find((budgetGroup) => budgetGroup.budgetEntrySpentDTOs
                    ?.find((budgetEntry) => budgetEntry.budgetCategoryId === editingKey))
                ?.budgetEntrySpentDTOs
                ?.find((budgetEntry) => budgetEntry.budgetCategoryId === editingKey);
            console.log(currentItem);

            if (currentItem){
                const entryAmount = (form.getFieldValue('budgetEntryAmount') !== null && form.getFieldValue('budgetEntryAmount') !== "") 
                    ? form.getFieldValue('budgetEntryAmount') 
                    : 0;
                console.log(entryAmount);
                if (currentItem.budgetEntryId && currentItem.budgetEntryId !== EmptyGuid){
                    console.log(currentItem.budgetEntryId);
                    await store.updateBudgetEntry(currentItem.budgetEntryId, entryAmount );
                } else {
                    console.log("Adding new entry");
                    const returnBudgetEntry: CreateBudgetEntryDTO = {
                        month: monthState === 0 ? new Date().getMonth() + 1: monthState,
                        year: yearState === 0 ? new Date().getFullYear() : yearState,
                        budgetEntryAmount: entryAmount,
                        budgetCategoryId: currentItem.budgetCategoryId,
                    };
                    await store.addBudgetEntry(returnBudgetEntry);
                }
            }
            setEditingKey('');
            updateBudgetTable()
        } catch (errInfo)
        {
            console.log("Could not validate fields.", errInfo);
        }
    };
    
    const onAutofill = async () => {
        await store.initializeBudgetEntries(monthState, yearState);
        updateBudgetTable();
    }
    
    return (
        !!store.payload ?
            (
                <>
                    <Row align="bottom" style={{marginBottom:8}} gutter={8}>
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
                        <Col span={0.5}>
                            <Button onClick={onAutofill} type="primary" style={{float:'right', width:"100%"}} >
                                <FileAddOutlined />
                            </Button>
                        </Col>
                    </Row>
                    <Row align={"top"} gutter={8}>
                        <Col span={20}>
                            <BudgetTableOuter
                                budgetEntries={store.payload}
                                form={form}
                                isEditing={isEditing}
                                onEdit={onEdit}
                                onCancelEdit={onCancelEdit}
                                onEditSave={onEditSave}
                            />
                        </Col>
                        <Col span={4}>
                            <BudgetOverviewCard budgetEntries={store.payload} income={store.income}/>
                        </Col>
                    </Row>
                </>
            )
            : <React.Fragment />
    )});

export default BudgetTableContainer;