Ext.define('WebAppClassic.view.main.user.User', {
    extend: 'Ext.tab.Panel',
    xtype: 'user',
    id:'user',
    requires: [
        'WebAppClassic.view.main.user.AddUser',
        'WebAppClassic.view.main.user.SearchUser',
        'WebAppClassic.view.main.user.EditUser',
    ],
    scrollable: true,
    height: 610,
    
    ui:'alternative',
    items: [{
        itemId:'searchuser',
        title: 'Search User',
        xtype: 'searchuser'
    },{
        title: 'Add User',
        xtype: 'adduser'
    }, {
        title: 'edit user',
        xtype: 'edituser',

    }],





});