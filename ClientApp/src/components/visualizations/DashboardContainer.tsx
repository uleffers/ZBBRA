import React, {useEffect, useState} from 'react';
import {DashboardStore} from "../../stores/DashboardStore";
import CashflowCard from "./CashflowCard";
import {Col, InputNumber, Row, Select} from "antd";
import {useStore} from "../../Hooks/stores";
import {MONTH_INT_MAP} from "../../Utils/MonthMapper";
import {observer} from "mobx-react-lite";
import NetworthChart from "./NetworthChart";

const DashboardContainer: React.FC = observer(() => {
    const [monthState, setMonthState] = useState(0);
    const [yearState, setYearState] = useState(0);

    const store: DashboardStore = useStore(DashboardStore);
    const { Option } = Select;

    useEffect(() => {
        let d = new Date();
        store.getCashflow(d.getMonth() + 1, d.getFullYear());
        store.getAccountBalances();
        setYearState(new Date().getFullYear());
        setMonthState(new Date().getMonth() + 1)
    }, []);
    
    const onMonthChange = (e: any) => {
        if (e !== monthState) {
            setMonthState(e);
            store.getCashflow(e, yearState === 0 ? new Date().getFullYear() : yearState);
        }
    }

    const onYearChange = (e: any) => {
        if (e !== yearState && e >= 1000 && e <= 9999) {
            setYearState(e);
            store.getCashflow(monthState === 0 ? new Date().getMonth() + 1 : monthState, e);
        }
    }
    
    const generateOptions = () => {
        let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        return months.map(function (month, i) {
            return <Option value={month}>{MONTH_INT_MAP.get(month) || 'NotMapped'}</Option>
        })
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
                                min={1000}
                                max={9999}
                            />
                        </Col>
                    </Row>
                    <CashflowCard CashflowOverview={store.payload} />
                    <NetworthChart BalanceHistory={store.balanceHistory} />
                </>
            )
            : <React.Fragment />
    );
});

export default DashboardContainer;