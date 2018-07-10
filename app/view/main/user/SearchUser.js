Ext.define("WebAppClassic.view.main.user.SearchUser", {
    extend: 'Ext.grid.Panel',
    xtype: 'searchuser',
    id:'searchUserId',
    requires: [
        'WebAppClassic.view.main.user.ModifyUserController',
        'WebAppClassic.view.main.user.UserViewModel',
        'WebAppClassic.store.UserStore',
    ],

    store: {
        type: 'userStore'
    },

    controller: 'modifyUserController',
    viewModel: 'userViewModel',
    height: 600,
   
    title: 'search User',
    viewConfig: {
        //scrollable: true,
    },
    
    columns:[
        { text: 'Account', dataIndex: 'AccountNo',  },
        { text: 'Password', dataIndex: 'Password', flex: 1,  },
        { text: 'Role', dataIndex: 'Role', flex: 1, },
        { text: 'Name', dataIndex: 'Name', flex: 1, },
        { text: 'IsDisabled', dataIndex: 'IsDisabled', flex: 1, },
    ],

    tbar: [
        {
            xtype: 'form',
            layout: 'column',
            itemId: 'searchForm',
            defaults: {
                labelWidth: 70,
                width: 200,
                margin: '0 5',
            },
            items: [
                {
                    width:250,
                    labelWidth: 120,
                    xtype: 'textfield',
                    name: 'AccountNo',
                    fieldLabel: 'Search by Account',
                    bind: '{AccountNo}',
                },
                {
                    itemId: 'Name',
                    xtype: 'textfield',
                    name: 'Name',
                    fieldLabel: 'Name',
                }, {
                    itemId: 'Role',
                    xtype: 'textfield',
                    name: 'Role',
                    fieldLabel: 'Role',
                },]
        },
         {
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