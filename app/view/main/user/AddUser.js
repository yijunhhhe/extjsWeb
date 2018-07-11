Ext.define('WebAppClassic.view.main.user.AddUser', {
    extend: 'Ext.form.Panel',
    requires: [
        "WebAppClassic.view.main.user.UserViewModel",
        "WebAppClassic.view.main.user.ModifyUserController",
        "WebAppClassic.view.main.user.UserField",
    ],
    title: "add user",   
    viewModel: 'userViewModel',
    controller: 'modifyUserController',
    xtype: 'adduser',
    padding: '10px',
    defaultType: 'textfield',
    height:540,
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