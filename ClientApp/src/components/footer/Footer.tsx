import { Layout } from 'antd';
import React from 'react';

import text from '../../Texts';

import styles from './Footer.module.less';

const AntdFooter = Layout.Footer;

const Footer: React.FC = () => {

    return (
        <AntdFooter className={styles.footer}>
            {text.footer.footerText}
        </AntdFooter>
    );
};

export default Footer;