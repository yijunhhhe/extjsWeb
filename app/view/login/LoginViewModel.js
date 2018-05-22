Ext.define('WebAppClassic.view.login.LoginViewModel',{
	extend: 'Ext.app.ViewModel',
	
	alias: 'viewmodel.loginViewModel',
	requires:[
		'WebAppClassic.view.login.LoginController'
	],
	data: {
        accountNo: "",
        password: "",
    }
});