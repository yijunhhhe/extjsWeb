Ext.define("WebAppClassic.view.main.SearchUser", {
    extend: 'Ext.grid.Panel',
    xtype: 'searchuser',
    
    requires: [
        'WebAppClassic.view.main.ModifyUserController',
        'WebAppClassic.view.main.UserViewModel',
        'WebAppClassic.store.UserStore',
    ],

    store: {
        type: 'userStore'
    },

    controller: 'modifyUserController',
    viewModel: 'userViewModel',
    height: 600,
    buttons: [{
        text:'fck'
    }],

    title: 'search User',
    viewConfig: {
        //scrollable: true,
    },
    
    columns:[
        { text: 'Account', dataIndex: 'AccountNo',  },
        { text: 'Password', dataIndex: 'Password', flex: 1,  },
        { text: 'Name', dataIndex: 'Name', flex: 1, },
    ],

    tbar:[
        {
            xtype: 'textfield', 
            name: 'username',
            fieldLabel: 'Search by Account',
            bind: '{AccountNo}',
        }, {
            xtype: 'button',
            text: 'Search',
            listeners: {
                click: 'searchUser'
            }
        }, {
            xtype: "tbfill"
        },{
            itemId: 'edituserbtn',
            text: 'Edit User',
            listeners: {
                click: 'selectUser'
            }
        }, {
            xtype: 'button',
            text: 'Delete User',    
            listeners: {
                click:'deleteUser'
            }
        }
           
    ],
    
   

});