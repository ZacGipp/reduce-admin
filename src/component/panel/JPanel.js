/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: JPanel.js @author: walljack@163.com @date: 18-3-8 下午6:56 @version: 1.0
 */

import React from "react";
import PropTypes from "prop-types";
import injectSheet from 'react-jss';

@injectSheet({
    panel: {
        maxWidth: '30rem',
    },
    panelTitle: {
        marginBottom: '1rem',
    },
})
export default class JPanel extends React.Component {

    render() {
        const {title, children, classes} = this.props;
        return <div className={classes.panel}>
            {
                title ? <div className={classes.panelTitle}>
                    {title}
                </div> : ''
            }
            {
                children
            }
        </div>;
    }
}

JPanel.propTypes = {
    title: PropTypes.string, // 存储页面状态数据
};

JPanel.defaultProps = {};
