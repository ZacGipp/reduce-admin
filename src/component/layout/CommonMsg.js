/**
 * Created by Zed on 2019/8/6.
 * 消息组件 包括提示、通知、对话框
 */
import React from 'react';
import { message, notification } from 'antd';

export default class CommonMsg extends React.Component {

  constructor() {
    super();
    // 全局message配置
    message.config({
      top: 20, // 消息距离顶部的位置
      duration: 2, // 默认自动关闭延时，单位秒
      maxCount: 3, // 最大显示数, 超过限制时，最早的消息会被自动关闭
      getContainer: () => document.body, // 配置渲染节点的输出位置
    });
    // 全局notification配置
    notification.config({
      placement: 'topRight', // 弹出位置，可选 topLeft topRight bottomLeft bottomRight
      top: 24, // 消息从顶部弹出时，距离顶部的位置，单位像素
      bottom: 50, // 消息从底部弹出时，距离底部的位置，单位像素。
      duration: 3, // 默认自动关闭延时，单位秒
      getContainer: () => document.body, // 配置渲染节点的输出位置
    });
  }

  static info(msg, duration, onClose) {
    message.info(msg, duration, onClose);
  }

  static success(msg, duration, onClose) {
    message.success(msg, duration, onClose);
  }

  static error(msg, duration, onClose) {
    message.error(msg, duration, onClose);
  }

  static warning(msg, duration, onClose) {
    message.warning(msg, duration, onClose);
  }

  static msg(type, msg, duration, onClose) {
    message[type](msg, duration, onClose);
  }

  static notificationInfo(msg, descr, duration, onClose, onClick) {
    notification.info({
      message: msg,
      description: descr,
      duration,
      onClose,
      onClick,
    });
  }

  render() {
    return '';
  }
}
