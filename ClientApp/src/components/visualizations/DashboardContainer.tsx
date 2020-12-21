import React, {useEffect, useState} from 'react';
import {MONTH_INT_MAP} from "../../Utils/MonthMapper";
import text from "../../Texts";
import {Button, Col, Form, InputNumber, Row, Select} from "antd";
import {BudgetStore} from "../../stores/BudgetStore";
import {useStore} from "../../Hooks/stores";
import {FileAddOutlined} from "@ant-design/icons";
import BudgetTableOuter from "../budget/BugetTableOuter";
import BudgetOverviewCard from "../budget/BudgetOverviewCard";

const DashboardContainer: React.FC = () => {
    const texts = text.visualisationPage;

    const [monthState, setMonthState] = useState(0);
    const [yearState, setYearState] = useState(0);

    const { Option } = Select;
    // const store: BudgetStore = useStore(BudgetStore);

    useEffect(() => {
        let d = new Date();
        setYearState(new Date().getFullYear());
        setMonthState(new Date().getMonth() + 1)
    }, []);

    const onMonthChange = async (e: any) => {
        if (e !== monthState) {
            setMonthState(e);
            // await store.getBudgetInMonth(e, yearState === 0 ? new Date().getFullYear() : yearState);
        }
    }

    const onYearChange = async (e: any) => {
        if (e !== yearState && e >= 1000 && e <= 9999) {
            setYearState(e);
            // await store.getBudgetInMonth(monthState === 0 ? new Date().getMonth() + 1 : monthState, e);
        }
    }
    const generateOptions = () => {
        let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        return months.map(function (month, i) {
            return <Option value={month}>{MONTH_INT_MAP.get(month) || 'NotMapped'}</Option>
        })
    }
    
    return (
        true ? // !!store.payload ?
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
                    </Row>
                    <Row align={"top"} gutter={8} style={{backgroundColor:"green"}}>
                            <p>filler</p>
                    </Row>
                </>
            )
            : <React.Fragment />
    );
};

export default DashboardContainer;