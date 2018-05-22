Ext.define('WebAppClassic.view.main.AddUser', {
    extend: 'Ext.form.Panel',
    requires: [
        "WebAppClassic.view.main.UserViewModel",
        "WebAppClassic.view.main.ModifyUserController",
        "WebAppClassic.view.main.UserField",
    ],
    title: "add user",   
    viewModel: 'userViewModel',
    controller: 'modifyUserController',
    xtype: 'adduser',
    padding: '10px',
    defaultType: 'textfield',
    height:600,
    scrollable: true,
    items: [
        {
            itemId: 'userfield',
            xtype: 'userfield',
        },
    ],

    buttons: [{
        text: 'Submit',
        
        listeners: {
            click:'addUser'
        }
    }, {
        text: 'cancel',
        
    }]
});