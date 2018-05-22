﻿Ext.define('WebAppClassic.view.main.User', {
    extend: 'Ext.tab.Panel',
    xtype: 'user',
    id:'user',
    requires: [
        'WebAppClassic.view.main.AddUser',
        'WebAppClassic.view.main.SearchUser',
        'WebAppClassic.view.main.EditUser',
    ],
    scrollable: true,
    ui:'navigation',
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