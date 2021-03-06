﻿var typeCombo = Ext.create('Ext.data.Store', {
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

Ext.define('WebAppClassic.view.main.UserField', {
    extend: 'Ext.form.Panel',
    xtype: 'userfield',
    requires: [
        'WebAppClassic.view.main.UserViewModel',
        'WebAppClassic.model.UserModel'
    ],
    model:'userModel',
    viewModel:'userViewModel',
    defaultType: 'textfield',
    scrollable: true,
    items: [{
        padding: '10px 0 0 0',
        fieldLabel: 'AccountNo',
        name: 'AccountNo',
        bind: '{AccountNo}',
    }, {
        fieldLabel: 'Password',
        name: 'Password',
        bind: '{Password}',
    }, {
        fieldLabel: 'EpcCode',
        name: 'EpcCode',
        bind: '{EpcCode}',
    }, {
        fieldLabel: 'Name',
        name: 'Name',
        bind: '{Name}',
    }, {
        fieldLabel: 'EnName',
        name: 'EnName',
        bind: '{EnName}',
    },
    {
        xtype:'combo',
        fieldLabel: 'Type',
        name: 'Type',
        store: typeCombo,
        queryMode: 'local',
        displayField: 'Type',
        valueField:'Type',
        bind: '{Type}',
    },
    {
        itemId:'checkbox',
        xtype:'checkboxgroup',
        fieldLabel: 'Role',
        columns: 1,
        items:[{
            boxLabel:'DC',
            name: 'Role',
            inputValue: 'DC',
        }, {
            boxLabel:'STORE',
            name:'Role',
            inputValue: 'STORE',
        },{
            boxLabel:'BRAND',
            name:'Role',
            inputValue: 'BRAND',
        }, {
            boxLabel: 'ADMIN',
            name: 'Role',
            inputValue: 'ADMIN',
        }
        ],
        
    }, {
        xtype:'checkboxfield',
        fieldLabel: 'Disabled',
        boxLabel: 'IsDisabled',
        name: 'IsDisabled',
        inputValue: true,
        bind: '{IsDisabled}',
    },{
        fieldLabel: 'Remark',
        name: 'Remark',
        bind: '{Remark}',
    },
    //{
    //    fieldLabel: 'CreateBy',
    //    name: 'CreateBy',
    //    bind: '{CreateBy}',
    //}, {
    //    fieldLabel: 'CreateDate',
    //    name: 'CreateDate',
    //    bind: '{CreateDate}',
    //}, {
    //    fieldLabel: 'ModifyBy',
    //    name: 'ModifyBy',
    //    bind: '{ModifyBy}',
    //}, {
    //    fieldLabel: 'ModifyDate',
    //    name: 'ModifyDate',
    //    bind: '{ModifyDate}',
    //},

    ]
   
});


