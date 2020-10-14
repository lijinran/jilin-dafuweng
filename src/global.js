/* 全局变量 */

window.th = {
    gqBarcode2020: window.location.host.indexOf("192") > -1 || window.location.host.indexOf("jlzy.taiheiot") > -1
        ? "3FsRMP4nKaMOH251"
        : "tqbC976gBgwtn279", //2020国庆活动入口码 测试环境：3FsRMP4nKaMOH251  正式环境： tqbC976gBgwtn279 
    wappId: window.location.host.indexOf("192") > -1 || window.location.host.indexOf("jlzy.taiheiot") > -1
        ? "wx88141635dc4c7980"
        : "wx097398502102a3c6", // 测试环境： wx88141635dc4c7980  正式环境： wx097398502102a3c6
    Domain:window.location.host.indexOf("192") > -1 || window.location.host.indexOf("jlzy.taiheiot") > -1
            ? "https://jlzy.taiheiot.com/jump.html"
            : "https://jlgy.yunzhi.co/jump.html",            
    callPage: `/jilin/jilin-ucenter/wxLogin.html`, //微信登录
    trophy: `/jilin/jilin-ucenter/trophy.html`,  //我的奖品
    pinless: `/jilin/jilin-ucenter/pinless.html`, //注册
    noscan: `/jilin/jilin-ucenter/noscan.html` //非微信
};
window.msg = {
    failMsg: "网络连接失败",
};
window.prefix = window.localStorage.getItem("project") || "__jilin__"