Ext.define('WebAppClassic.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',
    initCtl: function () {
        var me = this;
        me.IsScanning = false;
        if (!Base.isDesktop) {
            var result = apiController.getApi().open();
            if (!result || !result.ok || !result.data) {
                Base.showErrorMsg('无法使用RFID,请检查设备是否正常', '网络异常');
            }
            else {
                var result = apiController.getApi().setSetting([{ key: 'Power', value: '15' }]);
            }
        }
        me.keyListeners(true);
        Base.mask(false);
        apiController.addListeners('Inventory', me.inventoryEpcReceive, true);
        var ipResult = apiController.getApi().getIpAndMac();
        if (ipResult && !ipResult.error && ipResult.ok && ipResult.data) {
            Base.IP = ipResult.data;
        }
        else {
            Base.showErrorMsg("getIpMac Error");
        }
    },
    readTagClick: function () {
        var me = this;
        //
        var result = apiController.getApi().readTag();
        
        if (result) {         
            me.epcReceive(result);
        }
        
    },

    epcReceive: function (msg) {
        if (!msg.data) {
            return;
        }
        var me = this,
            vm = me.getViewModel(),
            epccode = msg.data.epc,
            tid = msg.data.tid;
        if (!epccode) {
            Base.showErrorMsg("请扫描标签");
            return;
        }
        me.getView().down('#epc').setValue(epccode);
       
        var viewModel = Ext.getCmp('loginId').getViewModel();
        var accountInfo = {};
        accountInfo.accountNo = viewModel.data.accountNo;
        accountInfo.password = viewModel.data.password;
        accountInfo.EpcCode = epccode;
        Ext.Ajax.request({
            method: 'POST',
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
                    Ext.getCmp('loginId').destroy();
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

    },

    onLoginClick: function() {
		var loginView = this.getView();
		var viewModel = loginView.getViewModel();
		var accountInfo = {}
		accountInfo.accountNo = viewModel.data.accountNo;
		accountInfo.password = viewModel.data.password;
		accountInfo.EpcCode = "A16361991258212075330000";
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