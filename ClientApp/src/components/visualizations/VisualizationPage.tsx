import React from 'react';
import DashboardContainer from "./DashboardContainer";
import {Divider, PageHeader} from "antd";
import Text from "../../Texts";
import BudgetTableContainer from "../budget/BudgetTableContainer";

const VisualizationPage: React.FC = () => {
    return (
        <>
            <PageHeader title={Text.visualisationPage.title}/>
            <Divider />
            <DashboardContainer />
        </>
    );
};

export default VisualizationPage;