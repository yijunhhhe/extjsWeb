var typeCombo = Ext.create('WebAppClassic.store.TypeCombo');

Ext.define('WebAppClassic.view.main.user.UserField', {
    extend: 'Ext.form.Panel',
    xtype: 'userfield',
    requires: [
        'WebAppClassic.view.main.user.UserViewModel',
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
   
    ]
   
});


