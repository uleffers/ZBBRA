import {observer} from "mobx-react-lite";
import {Col, Form, InputNumber, Row, Select} from "antd";
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
    
    const isEditing = (budgetCategoryId:string) => {
        return budgetCategoryId === editingKey;
    };

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
                if (currentItem.budgetEntryId){
                    console.log(form.getFieldValue('budgetEntryAmount'));
                    await store.updateBudgetEntry(currentItem.budgetEntryId, form.getFieldValue('budgetEntryAmount') ?? 0);
                } else {
                    console.log("Adding new entry");
                    const returnBudgetEntry: CreateBudgetEntryDTO = {
                        month: monthState === 0 ? new Date().getMonth() + 1: monthState,
                        year: yearState === 0 ? new Date().getFullYear() : yearState,
                        budgetEntryAmount: form.getFieldValue('budgetEntryAmount'),
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
                    <BudgetTableOuter 
                        budgetEntries={store.payload} 
                        form={form} 
                        isEditing={isEditing}
                        onEdit={onEdit}
                        onCancelEdit={onCancelEdit}
                        onEditSave={onEditSave}
                    />
                </>
            )
            : <React.Fragment />
    )});

export default BudgetTableContainer;