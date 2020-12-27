import React from "react";
import {CashflowOverviewDTO} from "swagger-api";
import {Card, Col} from "antd";
import {Bar, BarChart, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import text from "../../Texts";
import {COLORS} from "../../Utils/Colors";

export interface CashflowChartsProps {
    CashflowOverview: CashflowOverviewDTO
}

const CashflowCharts: React.FC<CashflowChartsProps> = (props: CashflowChartsProps) => {
    const texts = text.visualisationPage;
    
    const chartCategories = props.CashflowOverview.cashflowCategories?.map((x, i) => ({ name:x.budgetCategoryName, value: x.spent })) || [];
    const chartGroups = props.CashflowOverview.cashflowGroups?.map((x, i) => ({ name:x.budgetCategoryName, value: x.spent })) || [];
    const overviewBar:any = [{"Income":props.CashflowOverview.incomeTotal, "Expense":props.CashflowOverview.expenseTotal}];
    const formatter = (value:any) => {
        return value + " " + texts.currencies.dkk;
    }
    
    return (
        <>
            <Card.Grid style={{width:"15%", minHeight:450}} hoverable={false} >
                <div style={{ width: '100%', height: 400 }}>
                    <ResponsiveContainer>
                        <BarChart 
                            data={overviewBar} 
                            margin={{
                            top: 8, right: 8, left: 8, bottom: 8,
                            }}
                        >
                            <YAxis tickFormatter={formatter}/>
                            <Tooltip formatter={formatter} />
                            <Legend />
                            <Bar dataKey="Income" fill="#336600" />
                            <Bar dataKey="Expense" fill="#a92b10" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card.Grid>
            <Card.Grid style={{width:"35%", minHeight:450}} hoverable={false}>
                <div style={{ width: '100%', height: 400 }}>
                    <ResponsiveContainer>
                        <PieChart >
                            <Pie data={chartGroups} dataKey="value" cy={200} outerRadius={150} >
                                {
                                    chartGroups.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                                }
                            </Pie>
                            <Tooltip formatter={formatter} />
                            <Legend layout="vertical" verticalAlign="top" align="left"/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </Card.Grid>
            <Card.Grid style={{width:"35%", minHeight:450}} hoverable={false}>
                <div style={{ width: '100%', height: 400 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie data={chartCategories} dataKey="value" cy={200} outerRadius={150} >
                                {
                                    chartCategories.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                                }
                            </Pie>
                            <Tooltip formatter={formatter}/>
                            <Legend layout="vertical" verticalAlign="top" align="left"/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </Card.Grid>
        </>
    );
};

export default CashflowCharts;