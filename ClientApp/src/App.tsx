import React from 'react';
import {Layout, Menu, Row} from 'antd';
import styles from './App.module.less';
import Footer from "./components/footer/Footer";
import logo from "./Assets/logo.png";
import text from "./Texts";
import BudgetPage from "./components/budget/budgetPage";

import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,

} from 'react-router-dom';
import VisualizationPage from "./components/visualizations/VisualizationPage";
import TransactionPage from "./components/transactions/TransactionPage";

const { Header, Sider, Content } = Layout;

const App = () => {
    return (
            <Router>
                <Header hasSider={true} className={styles.header} >
                    <h1>{text.header.headerText}</h1>
                </Header>
                <Layout style={{ height: "100vh"}}>
                    <Sider className={styles.sider} >
                        <Menu theme={'light'} defaultSelectedKeys={['1']} mode={'inline'} >
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
                    <Layout >
                        <Content style={{ margin: "16px 16px", background: "#fff" }}>
                            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
                                <Switch>
                                    <Route path="/budget" component={BudgetPage}/>
                                    <Route path="/transactions" component={TransactionPage}/>
                                    <Route path="/visualizations" component={VisualizationPage}/>
                                </Switch>
                            </div>
                        </Content>
                        <Footer/>
                    </Layout>
                </Layout>
            </Router>
        );
    };

export default App;