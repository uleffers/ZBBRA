import React, {useState} from 'react';
import {Col, Layout, Menu, Row} from 'antd';
import styles from './App.module.less';
import Footer from "./components/footer/Footer";
import text from "./Texts";
import BudgetPage from "./components/budget/budgetPage";

import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect,
} from 'react-router-dom';
import VisualizationPage from "./components/visualizations/VisualizationPage";
import TransactionPage from "./components/transactions/TransactionPage";

const { Header, Content } = Layout;

const App = () => {
    return (
            <Router>
                <Header className={styles.header} >
                    <Row justify="space-between">
                        <Col span={4}>
                            <h1 style={{color: "#336600"}}>{text.header.headerText}</h1>
                        </Col>
                        <Col span={5}>
                            <Menu mode={'horizontal'}>
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
                        </Col>
                    </Row>
                </Header>
                <Layout >
                        <Content style={{ margin: "16px 16px", background: "#fff" }}>
                            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
                                <Switch>
                                    <Route path="/budget" component={BudgetPage}/>
                                    <Route path="/transactions" component={TransactionPage}/>
                                    <Route path="/visualizations" component={VisualizationPage}/>
                                    <Route exact path="/">
                                        <Redirect to="/budget" />
                                    </Route>
                                </Switch>
                            </div>
                        </Content>
                        <Footer/>
                </Layout>
            </Router>
        );
    };

export default App;