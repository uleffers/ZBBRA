import { Layout, Menu } from 'antd';
import React from 'react';

import LogoBar from "../logoBar/LogoBar";
import TransactionTable from "../transactions/TransactionTable";
import text from "../../Texts";
import logo from "../../Assets/logo.png";
import styles from "./NavigationBar.module.less";

import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,

} from 'react-router-dom';
import BudgetPage from "../budget/budgetPage";

const { Header, Sider, Content } = Layout;

const NavigationBar: React.FC = () => {
    
    return (
        <Router>
            <Header className={styles.header}>
                <img src={logo} className={styles.logo} alt="logo" />
                {text.header.headerText}
            </Header>
            <Layout style={{   minHeight: "100vh" }}>
                <Sider className={styles.sider}>
                    <Menu className={styles.menuItem} theme={'light'} defaultSelectedKeys={['1']} mode={'inline'} >
                        <Menu.Item key="1">
                            <Link to="/budget">
                                <span>{text.header.budgetTableMenu}</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/transactions">
                                <span>{text.header.transactionTableMenu}</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/visualizations">
                                <span>{text.header.visualizationsMenu}</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Content style={{ margin: "0 16px", background: "#fff" }}>
                        <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
                            <Switch>
                                <Route path="/budget" component={BudgetPage}/>
                                <Route path="/transactions" component={TransactionTable}/>
                                <Route path="/visualizations" component={TransactionTable}/>
                            </Switch>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    );
};

export default NavigationBar;