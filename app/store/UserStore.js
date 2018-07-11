Ext.define('WebAppClassic.store.UserStore', {
    extend: 'Ext.data.Store',
    alias:'store.userStore',
    autoLoad: true,
    require: [
        'WebAppClassic.model.UserModel'
    ],
    model: 'WebAppClassic.model.UserModel',

    proxy: {
        type: 'ajax',
        url: '/api/Account/GetAccount',
        actionMethods: 'GET',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});

Ext.define('WebAppClassic.store.TypeCombo', {
    extend: 'Ext.data.Store',
    fields: ['Type'],
    data: [
        { "Type": "通用", },
        { "Type": "账号密码类", },
        { "Type": "授权卡类", },
        { "Type": "EPC", },
        { "Type": "PWD", },
        { "Type": "ALL", }
    ]
});