
/**
 * 根据时间戳返回对应的y，m，d
 * @param  {[type]} tNum [description]
 * @return {string}      [description]
 */
export function timeToYmd(tNum, sep) {
  let date = tNum ? new Date(tNum) : new Date();
  let y = date.getFullYear() + '';
  let m = (date.getMonth() + 101 + '').substring(1);
  let d = (date.getDate() + 100 + '').substring(1);

  if (sep === '年月日') {
    return y + '年' + m + '月' + d + '日';
  } else if (typeof sep === 'string') {
    return [y, m, d].join(sep);
  } else {
    return [y, m, d].join('-');
  }
}

/**
 * 生成相关联的时间
 * 参考当前时间分别返回：
 * 三分钟之内显示 刚刚，
 * 一小时之内显示 xx分钟之前，
 * 当天显示 今天 时:分,
 * 不是当天显示 xxxx年xx月xx日 时:分
 * @param  {[type]} tNum [description]
 * @return {[type]}      [description]
 */
export function timeToRelative(tNum, curt) {
  let cur = curt ? new Date(curt) : new Date();
  let t = new Date(tNum);
  let diff = cur.getTime() - tNum;
  let re;

  let dbHours = (t.getHours() + 100 + '').substring(1);
  let dbMinutes = (t.getMinutes() + 100 + '').substring(1);

  if (diff < 180000) {
    // 3*60*1000
    re = '刚刚';
  } else if (diff < 3600000) {
    // 60*60*1000
    re = Math.round(diff / 60000) + '分钟之前';
  } else if (diff < 86400000 && t.getDate() === cur.getDate()) {
    // 24小时之内，且天数和当前是同一天
    // 24*60*60*1000
    re = '今天 ' + dbHours + ':' + dbMinutes;
  } else {
    re = timeToYmd(tNum) + ' ' + dbHours + ':' + dbMinutes;
  }
  return re;
}

// 获取url?后某参数
export function getQueryString(name) {
  const search = {};
  window.location.search.substr(1).split("&").forEach(kv => {
    if (kv) {
      const kvs = kv.split("=");
      search[kvs[0]] = kvs[1];
    }
  });
  return search[name] || "";
}

// 获取url？后所有参数组成的对象
export function getUrlSearchObj() {
  const search = {};
  window.location.search.substr(1).split("&").forEach(kv => {
    if (kv) {
      const kvs = kv.split("=");
      search[kvs[0]] = kvs[1];
    }
  });
  return search || {};
}

/**
 * 检查当前设备环境，是否是android，ios，微信
 * @return {[type]} [description]
 */
export function browserEnv() {
  let ua = window.navigator.userAgent.toLowerCase();
  let isWeixin = ua.indexOf('micromessenger') !== -1;
  let isAndroid = ua.indexOf('android') !== -1;
  let isIos = (ua.indexOf('iphone') !== -1) || (ua.indexOf('ipad') !== -1);
  let isAlipay = /alipayclient/.test(ua);
  return {
    isWeixin,
    isAlipay,
    isAndroid,
    isIos,
  };
}

export function isMobile() {
  const sUserAgent = navigator.userAgent.toLowerCase();
  const bIsIpad = sUserAgent.match(/ipad/i);
  const bIsIphoneOs = sUserAgent.match(/iphone os/i);
  const bIsMidp = sUserAgent.match(/midp/i);
  const bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i);
  const bIsUc = sUserAgent.match(/ucweb/i);
  const bIsAndroid = sUserAgent.match(/android/i);
  const bIsCE = sUserAgent.match(/windows ce/i);
  const bIsWM = sUserAgent.match(/windows mobile/i);
  return (
    bIsIpad ||
    bIsIphoneOs ||
    bIsMidp ||
    bIsUc7 ||
    bIsUc ||
    bIsAndroid ||
    bIsCE ||
    bIsWM
  );
}

/**
 * 把对象数组转换成一个对象，新对象包含了原对象数组中的各个对象。
 * 指定原对象数组中每个对象的一个属性，用它的值来作为新对象中指向各个对象的属性名。
 * eg.
 * 转换前
 * arr = [
 *    {k:'obj1',x:1,y:2,z:3},
 *    {k:'obj2',x:4,y:5,z:6}
 * ]
 *
 * arrToObj(arr, 'k');
 * 转换后
 * obj = {
	 * 	ojb1: {k:'obj1',x:1,y:2,z:3},
	 * 	obj2: {k:'obj2',x:4,y:5,z:6}
	 * }
 *
 * @param {[type]} arr 待转换的对象数组
 * @param {[type]} key 作为对象索引的属性的属性名
 */
export function arrToObj(arr, key) {
  let i, tmp, obj = {};
  for (i = 0; i < arr.length; i++) {
    tmp = arr[i];
    if (!obj.hasOwnProperty(tmp[key])) {
      obj[tmp[key]] = tmp;
    }
  }
  return obj;
}

/**
 * 生成随机字符串
 */
export function getRandom(len, radix) {
  //获取随机数
  const CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  let chars = CHARS, uuid = [], i;
  radix = radix || chars.length;
  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    let r;

    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('');
}

/**
 * 动态加载js
 * @param url
 * @param callback
 */
export function loadScript(url, callback) {
  const queryScript = document.querySelector("[src='" + url + "']");
  if (queryScript) return;

  let script = document.createElement("script");
  script.type = "text/javascript";
  if (script.readyState) { //IE
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" ||
        script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else { //Others: Firefox, Safari, Chrome, and Opera
    script.onload = function () {
      callback();
    };
  }
  script.src = url;
  document.head.appendChild(script);
}

/**
 * 设置session中的值
 * @param key
 * @param value
 */
export function setSession(key, value) {
  window.sessionStorage.setItem(key, value);
}

/**
 * 获取session中的值
 * @param key
 * @returns {string | null}
 */
export function getSession(key) {
  return window.sessionStorage.getItem(key);
}

/**
 * 获取session中的值并转化为json
 * @param key
 * @returns {*}
 */
export function getSessionToJson(key) {
  try {
    return JSON.parse(getSession(key));
  } catch (e) {
    return null;
  }
}

/**
 * 删除session
 * @param key
 */
export function removeSession(key) {
  window.sessionStorage.removeItem(key);
}

// 去除字符串所有标点
export function stripScript(s) {
  let pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
  let rs = "";
  for (let i = 0; i < s.length; i++) {
    rs = rs + s.substr(i, 1).replace(pattern, '');
  }
  return rs;
}

// 解决精度问题
// 加法
export function accAdd(arg1, arg2) {
  let r1, r2, m;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
}

// 减法
export function subtr(arg1, arg2) {
  let r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  n = (r1 >= r2) ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

/**
 * 自定义事件
 * @param eventName
 * @param cause
 * @param target
 */
export function dispatchCustomEvent(eventName, cause = "", target = document) {
  const event = document.createEvent('Event');
  event.initEvent(eventName, true, false);
  event.cause = cause;

  target.dispatchEvent(event);
}

/**
 * document中添加监听事件
 * @param event
 * @param func
 */
export function catchEvent(event, func) {
  document.addEventListener(event, func);
}

/**
 * 移除document中监听事件
 * @param event
 * @param func
 */
export function removeEvent(event, func) {
  document.removeEventListener(event, func);
}

/**
 * 获取屏幕尺寸
 * @returns {{width: number, height: number}}
 */
export function getScreenSize() {
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  };
}

// 关闭入口loading
export function removeAppLoading() {
  const appLoading = document.querySelector("#appLoading");
  if (appLoading) {
    appLoading.remove();
    document.querySelector("#appLoadingStyle").remove();
  }
}

