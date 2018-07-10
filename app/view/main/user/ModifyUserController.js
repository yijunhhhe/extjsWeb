Ext.define('WebAppClassic.view.main.user.ModifyUserController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.modifyUserController',

    addUser: function () {
        //add user
        var addUserView = this.getView();
        var userModel = addUserView.down('#userfield').getViewModel().data;
        var userInfo = {};
        //console.log(addUserView.down('#userfield').down('#checkbox').getValue().Role);
        //console.log(addUserView.down('#userfield').getViewModel().data);
        userInfo.AccountNo = userModel.AccountNo;
        userInfo.Password = userModel.Password;
        userInfo.EpcCode = userModel.EpcCode;
        userInfo.Name = userModel.Name;
        userInfo.EnName = userModel.EnName;
        userInfo.Type = userModel.Type;
        if (addUserView.down('#userfield').down('#checkbox').getValue().Role != undefined) {
            userInfo.Role = addUserView.down('#userfield').down('#checkbox').getValue().Role.toString();
        } else {
            userInfo.Role = "";
        }
        userInfo.OrganizationId = userModel.OrganizationId;
        userInfo.IsDisabled = userModel.IsDisabled;
        userInfo.IsDeleted = userModel.IsDeleted;
        userInfo.Remark = userModel.Remark;
        userInfo.CreateBy = localStorage.getItem("Account");
        userInfo.CreateDate = userModel.CreateDate;
        userInfo.ModifyBy = localStorage.getItem("Account");
        userInfo.ModifyDate = userModel.ModifyDate;
        //console.log(JSON.stringify(userInfo));
        Ext.Ajax.request({
            method: 'POST',
            url: '/Api/Account/AddAccount',
            headers: { 'Content-Type': 'application/json' },
            params: JSON.stringify(userInfo),
            dataType: 'json',
            success: function (Result) {
                var data = Ext.decode(Result.responseText);
                console.log(data);
                if (data.IsSuccess === true) {
                    console.log("success");
                    var store = Ext.getCmp('user').down("#searchuser").getStore();
                    store.reload();
                    addUserView.up('user').setActiveTab(0);
                    addUserView.getForm().reset();     
                } else {
                    alert(data.ErrorMessage);
                }
            }

        })

    },

    searchUser: function () {
        var filterObject = Ext.getCmp('searchUserId').down('#searchForm').getForm().getValues();
        
        Ext.Ajax.request({
            method: 'POST',
            url: '/Api/Account/SearchAccount',
            headers: { 'Content-Type': 'application/json' },
            params: JSON.stringify(filterObject),
            dataType: 'json',
            success: function (Result) {
                var data = Ext.decode(Result.responseText);
                if (data.IsSuccess == true) {
                    console.log("success");
                    console.log(data.Data);
                    Ext.getCmp('searchUserId').getStore().setData(data.Data);
                    //Ext.getCmp("orderId").down("#pageBar").down("displayfield").setValue(1);
                    //Ext.getCmp("orderId").down("#totalNumberItem").setValue(data.Data.length);
                    //console.log(orderView.down('grid').getStore());
                } else {
                    alert(data.ErrorMessage);
                }
            }
        });
        //var mystore = this.getView().getStore();
        //var searchUserView = this.getView();
        //var userModel = searchUserView.getViewModel();
        //var account = userModel.data.AccountNo;

        //mystore.filter('AccountNo', account);
        
    },

    selectUser: function () {
        //modify user
        if (this.getView().getSelectionModel().getSelected().items.length == 0) {
            alert("please select an user");
        } else {
            var edit = Ext.create({
                xtype: 'edituser'
            });
            edit.show();
            //console.log(this.getView().getSelectionModel().getSelected().items.length);
            var data = this.getView().getSelectionModel().getSelected().items[0].data;
            var form = edit.down('#userfield').getForm();
            data.Role = data.Role.split(",");
            form.setValues(data);
        }
       
    },

    modifyUser: function () {
        var edit = this.getView();
        var select = Ext.getCmp('searchUserId').getSelectionModel().getSelected().items[0].data;
        //get new value from the form
        var userValue = edit.getValues();
        if (userValue.Role != undefined) {
            userValue.Role = userValue.Role.toString();
        } else {
            userValue.Role = "";
        }      
        delete select.id;
        select.AccountNo = userValue.AccountNo;
        select.Password = userValue.Password;
        select.EpcCode = userValue.EpcCode;
        select.Name = userValue.Name;
        select.EnName = userValue.EnName;
        select.Type = userValue.Type;
        select.Role = userValue.Role;
        select.IsDisabled = userValue.IsDisabled;
        select.Remark = select.Remark;
        
        select.ModifyBy = localStorage.getItem("Account");
       
        Ext.Ajax.request({
            method: 'POST',
            url: '/api/Account/EditAccount',
            headers: { 'Content-Type': 'application/json' },
            params: JSON.stringify(select),
            dataType: 'json',
            success: function (Result) {
                var data = Ext.decode(Result.responseText);
                console.log(data);
                if (data.IsSuccess == true) {
                    console.log("success");
                } else {
                    alert(data.ErrorMessage);
                }
            }
        });
        this.getView().destroy();
        var store = Ext.getCmp('user').down("#searchuser").getStore();
        var searchUserView = Ext.getCmp('user').down("#searchuser")
        store.reload();
        searchUserView.getView().refresh();
    },

    deleteUser: function () {
        if (this.getView().getSelectionModel().getSelected().items.length == 0) {
            alert("please select an user");
        } else {
            var currentUser = localStorage.getItem("Account");
            var data = this.getView().getSelectionModel().getSelected().items[0].data.Id;
            Ext.MessageBox.confirm('delete', 'yes?', function (btn, text) {
                if (btn == "yes") {
                    Ext.Ajax.request({
                        method: 'POST',
                        url: '/api/Account/DeleteAccount?Id=' + data + "&User= " + localStorage.getItem("Account") ,
                        headers: { 'Content-Type': 'application/json' },
                        dataType: 'json',
                        success: function (Result) {
                            var data = Ext.decode(Result.responseText);
                            if (data.IsSuccess == true) {
                                console.log("success");
                                var store = Ext.getCmp('user').down("#searchuser").getStore();
                                var searchUserView = Ext.getCmp('user').down("#searchuser")
                                store.reload();
                                searchUserView.getView().refresh(); 
                            } else {
                                alert(data.ErrorMessage);
                            }
                        },
                        failure: function (Result) {

                        }
                    });
                } else {

                }
            });
        }
        
    }
});