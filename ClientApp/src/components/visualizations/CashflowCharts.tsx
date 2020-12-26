import React from "react";
import {CashflowOverviewDTO} from "swagger-api";
import {Card, Col, Divider, Row} from "antd";
import {Cell, Legend, Pie, PieChart, Tooltip} from "recharts";
import text from "../../Texts";

export interface CashflowChartsProps {
    CashflowOverview: CashflowOverviewDTO
}

const CashflowCharts: React.FC<CashflowChartsProps> = (props: CashflowChartsProps) => {
    const texts = text.visualisationPage;

    const COLORS = [
        '#336600', '#006d8f', '#a92b10',
        '#00845e', '#007634', '#009186',
        '#00c5ff', '#c2faff', '#477f90',
        '#ab6629', '#00a2c5', '#386c5f',
        '#e79a5a', '#a6ae9c', '#727a69',
        '#009cab', '#00a5c9', '#2f4858'];
    const chartCategories = props.CashflowOverview.cashflowCategories?.map((x, i) => ({ name:x.budgetCategoryName, value: x.spent })) || [];
    const chartGroups = props.CashflowOverview.cashflowGroups?.map((x, i) => ({ name:x.budgetCategoryName, value: x.spent })) || [];

    return (
        <>
            <Col span={10}>
                <Card title={texts.groupedGraph}>
                    <PieChart width={600} height={400}>
                        <Pie data={chartGroups} dataKey="value" cy={200} outerRadius={150} >
                            {
                                chartGroups.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                            }
                        </Pie>
                        <Tooltip />
                        <Legend layout="vertical" verticalAlign="top" align="left"/>
                    </PieChart>
                </Card>
            </Col>
            <Col span={10}>
                <Card title={texts.detailedGraph}>
                    <PieChart width={600} height={400}>
                        <Pie data={chartCategories} dataKey="value" cy={200} outerRadius={150} >
                            {
                                chartCategories.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                            }
                        </Pie>
                        <Tooltip />
                        <Legend layout="vertical" verticalAlign="top" align="left"/>
                    </PieChart>
                </Card>
            </Col>
        </>
    );
};

export default CashflowCharts;