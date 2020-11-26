import { Col, Row } from 'antd';
import React from 'react';

import text from '../../Texts';

import styles from './LogoBar.module.less';
import logo from '../../Assets/logo.png'

const LogoBar: React.FC = () => {

    return (
        <Row className={styles.logoBar} justify={'start'}>
            <Col>
                <img src={logo} className={styles.logoIcon} alt="logo" />
            </Col>

            <div className={styles.title}>
                    {text.header.headerText}
            </div>
        </Row>
    );
};

export default LogoBar;
