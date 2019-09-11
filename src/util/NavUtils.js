import React from "react";

// 路由导航
export default class NavUtils {

    static history;

    static setHistory(history) {
        NavUtils.history = history;
    }

    static linkTo(url) {
      NavUtils.history.push(url);
    }

    static back() {
        NavUtils.history.goBack();
    }

    static test() {
        console.log(NavUtils.history);
    }

    static replace(path, state) {
        NavUtils.history.replace(path, state);
    }
}
