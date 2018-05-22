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