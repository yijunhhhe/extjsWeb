Ext.define('WebAppClassic.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',
	
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
		        if (data.ErrorMessage == "user doesnt exist") {
		            alert("user does not exist");
		        } else if(data.ErrorMessage == "incorrect password") {
		            alert("incorrect password");
		        } else {
		            console.log(data);
		            localStorage.setItem("LoggedIn", true);
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