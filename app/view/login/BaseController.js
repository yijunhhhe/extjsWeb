Ext.define('WebAppModern.view.main.BaseController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.base',
    singleton: true,

    requires: [
        'Ext.Toast',
        'Ext.MessageBox',
        'Ext.Toolbar'
    ],

    isDesktop: !window.AndroidApi,

    constructor: function () {
        var me = this;
        Base = me;
    },

    mask: function (isMask, msg) {
        var me = this;
        if (isMask) {
            Ext.Viewport.mask({

                style: 'font-size:2rem',

                xtype: 'loadmask',
                message: '<font style="color:#fff">' + (msg ? msg : 'loading') + '</b>'
            });
        } else {
            Ext.Viewport.unmask();
        }
        me.isMasking = isMask;
    },

    showErrorMsg: function (message, title, callback) {
        if (!message) return;
        if (!Ext.isString(message)) {
            title = message.title;
            message = message.message;
        }
        if (!title) {
            title = '错误';
        }
        return Ext.Msg.show({
            title: title,
            message: '<font style="word-break:break-word;font-size:1rem;text-decoration: underline;font-weight: bolder;color:red">' + message + '</font>',
            buttons: [
                {
                    text: '确定',
                    itemId: 'ok'
                }
            ],
            buttonToolbar: {
                padding: 2,
                docked: 'bottom',
                defaults: {
                    xtype: 'button',
                    margin: 2,
                },
                layout: {
                    type: 'hbox',
                    pack: 'center',
                },
            },
            fn: function (btn) {
                if (callback) {
                    callback(arguments);
                }
            }

        });
    },

    showToast: function (message, title, delay) {
        if (!Ext.isString(message)) {
            title = message.title;
            delay = message.timeout;
            message = message.message;
        }

        if (!title) {
            title = '提示';
        }

        if (!delay) {
            delay = 3000;
        }

        Ext.toast({
            message: '<div style="padding:0.5rem;word-break:break-word;font-size:14px;line-height:22px">' + message + '</div>',
            title: title,
            timeout: delay,
        })
    },

    getIsMasking: function () {
        var me = this;
        return me.isMasking;
    },


});