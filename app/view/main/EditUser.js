Ext.define('WebAppClassic.view.main.EditUser', {
    extend: 'Ext.form.Panel',
    xtype: 'edituser',
    //id: 'editId',
    requires: [
        'WebAppClassic.view.main.UserField',
        'WebAppClassic.view.main.ModifyUserController',
        'WebAppClassic.view.main.UserViewModel',
    ],

    title: 'Edit User',
    controller: 'modifyUserController',
    viewModel: 'userViewModel',
    scrollable: true,
    padding: '10px',
    height: 500,
    width:400,
    floating: true,
    closable:true,
    items: [
        {
            itemId: 'userfield',
            xtype: 'userfield'
        }
    ],

    buttons: [{
        itemId:'submitbtn',
        text: 'Submit',
        listeners: {
            click: 'modifyUser'
        }
    }, {
        text: 'cancel',
        listeners: {
            click: function () {
                this.up('form').close();
            }
        }
    }]
});