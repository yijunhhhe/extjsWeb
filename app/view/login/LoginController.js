Ext.define('WebAppClassic.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',
	
    readTagClick: function(){
        var me = this;
        var result = apiController.getApi().readTag();
        if (result) {
            me.epcReceive(result);
        }
    },

    onLoginClick: function() {
		var loginView = this.getView();
		var viewModel = loginView.getViewModel();
		var accountInfo = {}
		accountInfo.accountNo = viewModel.data.accountNo;
		accountInfo.password = viewModel.data.password;
		console.log(accountInfo);
		Ext.Ajax.request({
            method:'POST',
		    url: '/Api/Account/Login',
		    params: JSON.stringify(accountInfo),
		    dataType: 'json',
		    headers: { 'Content-Type': 'application/json' },
		    success: function (Result) {
		        var data = Ext.decode(Result.responseText);
		        if (data.ErrorMessage == "user doesnt exist or password incorrect") {
		            alert("user doesnt exist or password incorrect");
		        } else {
		            console.log(data);
		            localStorage.setItem("LoggedIn", true);
		            localStorage.setItem("Account", accountInfo.accountNo);
		            loginView.destroy();
		            Ext.create({
		                xtype: 'app-main'
		            });
		        }		        
		    },
		    failure: function (Response) {
		        viewModel.applyData("");
		        alert("this user does not exist");
		    }
		})	
    }
});