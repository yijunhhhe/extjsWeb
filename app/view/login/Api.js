Ext.define('WebAppModern.view.main.Api', {
    extend: 'Ext.app.ViewController',
    singleton: true,
    alias: 'controller.api',

    api: null,
    webListeners: {},
    viewController: null,

    constructor: function () {
        var me = this;
        if (window.AndroidApi)
            me.apiBuild();
    },

    apiBuild: function () {
        var me = this,
            android = window.AndroidApi;
        apiController = me;
        onAndroidMessage = this.receiver;
        me.api = api;
    },

    //非常重要：App通过调用onAndroidMessage,会给网页发送消息
    receiver: function (msg) {
        var me = apiController;
        /*
        msg的成员：
        type表示消息类型；
        data表示具体的数据
        */
        var data = msg.data;
        var type = msg.type;
        if (!msg.ok) {
            var text = type + ':' + msg.error;
            log(text);//将log打印到网页中
            log(type + ':' + msg.error);//将log输出到android控制台
        }
        else {
            for (var i in me.webListeners[type]) {

                me.webListeners[type][i](data);
            }
        }
    },

    getApi: function () {
        var me = this;
        return me.api;
    },

    addListeners: function (type, fun, isClear) {
        var me = this;
        if (isClear)
            me.webListeners[type] = [];
        if (!me.webListeners[type]) {
            me.webListeners[type] = [];
        }

        me.webListeners[type][me.webListeners[type].length] = fun;
    },

    removeListeners: function (typen, fun) {
        //todo
    },

    getViewController: function () {
        var me = this;
        return me.viewController;
    },
    setViewController: function (value) {
        var me = this;
        return me.viewController = value;
    }
});

