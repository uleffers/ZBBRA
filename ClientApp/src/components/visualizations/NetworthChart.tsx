import React from 'react';
import {AccountBalanceDTO, BalanceHistoryDTO} from "swagger-api";
import {Card, Col, Divider, Row} from "antd";
import {Area, AreaChart, CartesianGrid, Legend, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {type} from "os";
import {COLORS} from "../../Utils/Colors";
import text from "../../Texts";

export interface NetworthChartProps {
    BalanceHistory?: Array<BalanceHistoryDTO>
}

const NetworthChart: React.FC<NetworthChartProps> = (props:NetworthChartProps) => {
    const texts = text.visualisationPage;

    const getMonthString = (month?: Date) => {
        if (!month) return "";
        let date = new Date(month);
        return date.getMonth() + 1 + "/" + date.getFullYear();
    }
    
    const getAccountData = () => {
        let returnData:any = [];
        
        props.BalanceHistory?.forEach(x => {
            let currentMonth: any = {};
            currentMonth["name"] = getMonthString(x.month);
            x.accountBalances?.forEach((a:AccountBalanceDTO) => {
                if (!!a.accountName && !!a.accountBalance)
                {
                    currentMonth[a.accountName] = a.accountBalance;
                }
            });
            returnData.push(currentMonth);
        })
        
        return returnData;
    }
    
    const getAreas = () => {
        let returnAreas:any = [];
        if (props.BalanceHistory && props.BalanceHistory.length !== 0)
        {
            let accounts = props.BalanceHistory[0].accountBalances?.map((account, i) => (account.accountName));
            accounts?.forEach((a,index) => {
                if (!!a){
                    let color = COLORS[index % COLORS.length];
                    returnAreas.push(<Area type="monotone" dataKey={a} stackId="1" stroke={color} fill={color} />)
                }
            })
        }
        return returnAreas;
    }
    
    const getAccountBalances = () => {
        let returnList:any = [];
        let total:number = 0;
        let previousTotal:number = 0;
        
        if (props.BalanceHistory && props.BalanceHistory.length !== 0)
        {
            let account = props.BalanceHistory[props.BalanceHistory.length - 1].accountBalances?.map((account, i) => {
                total += account.accountBalance || 0;
                return <p>{account.accountName}: {account.accountBalance} {texts.currencies.dkk}</p>
            });
            returnList.push(account);
            
            if (props.BalanceHistory.length > 1)
            {
                props.BalanceHistory[props.BalanceHistory.length - 2].accountBalances?.forEach(a => {
                    previousTotal += a.accountBalance || 0;
                })
            }
        }

        let difference = total >= previousTotal ? "+" : "-";
        
        returnList.unshift(<Divider />);
        
        returnList.unshift(<p><b>{texts.total}: </b>{total} {texts.currencies.dkk} (+{total-previousTotal} {texts.currencies.dkk})</p>)
        return returnList;
    }
    
    const formatter = (value:any) => {
        return value + " " + texts.currencies.dkk;
    }
    
    return (
        !!props.BalanceHistory
        ? 
            (
                <Row align="top" style={{marginBottom:8}} gutter={8}>
                    <Col span={24}>
                        <Card title={texts.accountBalances}>
                            <Card.Grid style={{width:"15%"}} hoverable={false}>
                                {getAccountBalances()}
                            </Card.Grid>
                            <Card.Grid style={{width:"85%"}} hoverable={false}>
                                <div style={{ width: '100%', height: 400 }}>
                                    <ResponsiveContainer>
                                        <AreaChart
                                            data={getAccountData()}
                                            margin={{
                                                top: 30, right: 8, left: 8, bottom: 30,
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis tickFormatter={formatter} />
                                            <Tooltip formatter={formatter}/>
                                            {getAreas()}
                                            <Legend layout="vertical" verticalAlign="top" align="left"/>
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card.Grid>
                        </Card>
                    </Col>
                </Row>
            )
        : <React.Fragment />
    );
};

export default NetworthChart;