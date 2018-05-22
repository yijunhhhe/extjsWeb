Ext.define('WebAppClassic.store.Users', {
    extend: 'Ext.data.Store',

    alias: 'store.user',

    fields: [
        'username', 'password'
    ],

    data: { items: [
        { username: 'asdf',password: '123' },
        { username: 'yijun', password:'123' },
    ]},

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
