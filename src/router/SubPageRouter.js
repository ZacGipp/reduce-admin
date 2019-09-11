/**
 * Created by Zed on 2019/8/28.
 */

export default class SubPageRouter {
  context = null;
  page2Path = null;
  pathStack = [];
  constructor(context, pages) {
    this.context = context;
    this.routerPage2Path(pages);
  }
  routerPage2Path(pages) {
    if (pages) {
      this.page2Path = {};
      pages.map(p => {
        const key = Object.keys(p)[0];
        this.page2Path[key] = {page: p[key], props: {}};
      });
    }
  }

  getPageFromKey(pageName) {
    return this.page2Path[pageName];
  }

  goPage(pageName, leftPageData, extraData) {
    const nextPage = this.getPageFromKey(pageName);
    if (!nextPage) {
      throw new Error(`can not find page: ${pageName}  (registered pages ：${this.page2Path.length > 0 ? this.page2Path : "null"})`);
    }
    nextPage.props.leftPageData = leftPageData;
    nextPage.props.extraData = extraData;
    nextPage.props.ghostPageData = "";
    this.pathStack.push(this.context.state.currentPage);
    this.context.setState({currentPage: nextPage});
  }

  pageBack(leftPageData, extraData) {
    const returnPage = this.pathStack.pop();
    if (!returnPage) {
      console.error("no where to go");
      return;
    }

    returnPage.props.ghostPageData = leftPageData;
    returnPage.props.extraData = extraData;
    this.context.setState({currentPage: returnPage});
  }

  pageBackTo(pageName, rightPageData, leftPageData, extraData) {
    let returnPage;
    while (this.pathStack.length > 0) {
      const _returnPage = this.pathStack.pop();
      if (_returnPage.pageName === pageName) returnPage = _returnPage;
    }
    if (!returnPage) throw new Error(`页面${pageName}不存在！`);
    returnPage.rightPageData = rightPageData;
    returnPage.ghostPageData = leftPageData;
    returnPage.extraData = extraData;
    this.context.currentPage = returnPage;
  }

  pageCanBack() {
    return this.pathStack.length > 0;
  }
}
