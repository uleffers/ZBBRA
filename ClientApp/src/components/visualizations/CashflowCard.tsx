import React, {useState} from 'react';
import {Button, Card, Col, Divider, Row} from "antd";
import text from "../../Texts";
import CashflowCharts from "./CashflowCharts";
import {CashflowOverviewDTO} from "swagger-api";

export interface CashflowCardProps {
    CashflowOverview: CashflowOverviewDTO
    Month: number
    Year: number
}

const CashflowCard: React.FC<CashflowCardProps> = (props:CashflowCardProps) => {
    const [showAllCategoriesState, setShowAllCategoriesState] = useState(false);
    const texts = text.visualisationPage;

    const getTopCategories = () => {
        let i = 0;
        let categories = [];
        if (!props.CashflowOverview.cashflowCategories) return;
        
        while (i < 5 && i < (props.CashflowOverview.cashflowCategories?.length || 0)){
            categories.push(<p>{props.CashflowOverview.cashflowCategories[i].budgetCategoryName}: {props.CashflowOverview.cashflowCategories[i].spent || 0} kr.</p>);
            i++;
        }
        
        if (!showAllCategoriesState){
            let remainingCategories = 0;

            while (i < (props.CashflowOverview.cashflowCategories?.length || 0)){
                remainingCategories +=props.CashflowOverview.cashflowCategories[i].spent || 0;
                i++;
            }

            if (remainingCategories !== 0){
                categories.push(<p>{texts.otherCategories}: {remainingCategories} {texts.currencies.dkk}</p>);
                categories.push(<Button type="primary" onClick={() => setShowAllCategoriesState(true)}>{texts.expand}</Button>);
            }
        } else {
            while (i < (props.CashflowOverview.cashflowCategories?.length || 0)){
                categories.push(<p>{props.CashflowOverview.cashflowCategories[i].budgetCategoryName}: {props.CashflowOverview.cashflowCategories[i].spent || 0} {texts.currencies.dkk}</p>);
                i++;
            }
            categories.push(<Button type="primary" onClick={() => setShowAllCategoriesState(false)}>{texts.collapse}</Button>);
        }
        
        return categories;
    }
    
    return (
        <Row align={"top"} gutter={8}>
            <Col span={4}>
                <Card title={texts.cashflowCard}>
                        <p><b>{texts.income}: </b>{props.CashflowOverview.incomeTotal} {texts.currencies.dkk}</p>
                        <p><b>{texts.totalExpense}: </b>{props.CashflowOverview.expenseTotal} {texts.currencies.dkk}</p>
                        <Divider orientation={"left"}>{texts.topCategories}</Divider>
                        {getTopCategories()}
                </Card>
            </Col>
            <CashflowCharts CashflowOverview={props.CashflowOverview}/>
        </Row>
            
    );
};

export default CashflowCard;