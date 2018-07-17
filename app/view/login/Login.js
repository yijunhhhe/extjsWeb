Ext.define('WebAppClassic.view.login.Login', {
    extend: 'Ext.window.Window',
    xtype: 'login',
    id: 'loginId',
    requires: [
        'WebAppClassic.view.login.LoginController',
        'Ext.form.Panel',
		'WebAppClassic.view.login.LoginViewModel'
    ],
    navigation: 'ui',
    controller: 'login',

    viewModel: {
        type: 'loginViewModel'
    },
    
    title: 'Login Window',
    bodyPadding: 10,
    closable: false,
    autoShow: true,
    listeners: {
        painted: 'initCtl'
    },
    items: {
        bodyPadding: 0,
        xtype: 'form',
        reference: 'form',
        defaultType: 'textfield',
        items: [
            {
                itemId: 'epc',
                xtype: 'textfield',
                name: 'username',
                fieldLabel: 'Username',
                allowBlank: false,
                bind: '{accountNo}'
            }, {
                xtype: 'textfield',
                name: 'password',
                inputType: 'password',
                fieldLabel: 'Password',
                bind: '{password}',

                allowBlank: false,
            }, {
                xtype: 'displayfield',
                hideEmptyLabel: false,
                value: 'Enter any non-blank password'
            }],
        buttons: [{
            text: 'Login',
            formBind: true,
            listeners: {
                click: 'onLoginClick'
            }
        },
        {
            text: 'ReadTag',
            listeners: {
                click: 'readTagClick',
            }
        }
        ]
    },
    fbar: [{
        xtype: 'label',
        itemId: 'lbl',

    }]
});