﻿Ext.define('WebAppClassic.view.main.purchaseorder.ModifyOrderController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.modifyOrderController',
    
    deleteOrder: function () {
        var select = this.getView().getSelectionModel().getSelected().items[0].data;
        delete select.id;
        select.IsDeleted = true;
        Ext.MessageBox.confirm('delete', 'yes?', function (btn, text) {
            if (btn == "yes") {     
                Ext.Ajax.request({
                    method: 'POST',
                    url: '/Api/PurchaseOrder/DeletePurchaseWithDetail?purchaseId=' + select.Id,
                    headers: { 'Content-Type': 'application/json' },
                    dataType: 'json',
                    success: function (Result) {
                        var data = Ext.decode(Result.responseText);
                        //console.log(data);
                        if (data.IsSuccess == true) {
                            console.log("success");
                            Ext.getCmp('orderId').getStore().reload();
                            thisView.destroy();
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

        
    },

    searchOrder: function () {
        var userView = this.getView();
        var searchName = userView.down('#searchName').getValue();
        var store = userView.getStore();
        console.log(searchName);
        console.log(store);
        store.filter('OrderNo', searchName);
    },
    
    addOrderDetail: function(){
        
        var detail = this.getView().down('#orderDetailItemId').getForm().getValues();
        var model = this.getView().getViewModel().data.detail;
        model[model.length] = detail;
        this.getView().getViewModel().data.detail = model;
        this.getView().down('grid').getStore().setData(model);
        //console.log(model);

    },
    
    addOrder: function () {

        var add = Ext.create({
            xtype: 'addorder'
        });
        addOrderValue = Ext.getCmp('addOrderId').down('#orderItemId').getForm();
        //console.log(addOrderValue);
    },

    actualAddOrder: function(){
        var orderValue = this.getView().down('#orderItemId').getForm().getValues();
        var orderDetailValue = this.getView().getViewModel().data.detail;
        orderDetailValue.forEach(function (element) {
            element.PurchaseOrderNo = orderValue.OrderNo;
            //console.log(element);
            delete id;
        });
        orderValue.PurchaseOrderDetails = orderDetailValue;
        
        console.log(orderValue);
        //console.log(orderDetailValue);
        Ext.Ajax.request({
            method: 'POST',
            url: '/Api/PurchaseOrder/AddPurchaseOrder',
            headers: { 'Content-Type': 'application/json' },
            params: JSON.stringify(orderValue),
            dataType: 'json',
            success: function (Result) {
                var data = Ext.decode(Result.responseText);
                console.log(Result);
                if (data.IsSuccess == true) {
                    console.log("success");
                    Ext.getCmp('orderId').down('grid').getStore().reload();
                    orderDetailValue.PurchaseOrderId = data.Data
                    Ext.Ajax.request({
                        method: 'POST',
                        url: '/Api/PurchaseOrderDetail/AddOrderDetail',
                        headers: { 'Content-Type': 'application/json' },
                        params: JSON.stringify(orderDetailValue),
                        dataType: 'json',
                        success: function (Result) {
                            var data = Ext.decode(Result.responseText);
                            this.getView().getViewModel().data.detail = [];
                            console.log(Result);
                            if (data.IsSuccess == true) {
                                console.log("success");
                                Ext.getCmp('orderId').getStore().reload();
                                //thisView.destroy();
                            } else {
                                alert(data.ErrorMessage);
                            }
                        }
                    })
                } else {
                    alert(data.ErrorMessage);
                }
            }
        });
        
    },

    editOrder: function () {
        var edit = Ext.create({
            xtype: 'editorder',
        });
        var select = this.getView().down('grid').getSelectionModel().getSelected().items[0].data;
        var form = Ext.getCmp("editOrderId").down('form').getForm().setValues(select);
        var detailStore = this.getView().down('#orderDetailGrid').getStore().getData().items;
        var detailArray = [];
        detailStore.forEach(function (element) {
            detailArray[detailArray.length] = element.data
        });
        console.log(detailArray);
        //var a = [{ ProductId: "f5465602-d09e-44ff-901a-9bf422998865", OrderQty: "2", Remark: "" }];
        console.log(Ext.getCmp('editOrderId').down('#orderDetailGrid').getStore().setData(detailArray));
        //console.log(detailStore.items);
        //console.log(this.getView().getSelectionModel().getSelected().items[0].data);
    },

    actualEditOrder: function () {
        var thisView = this.getView();
        var order = Ext.getCmp("orderId").getSelectionModel().getSelected().items[0].data;
        var newOrder = this.getView().down('form').getForm().getFieldValues();
        //console.log(newOrder);
        //console.log(order);
        delete order.id;
        order.BrandId = newOrder.BrandId;
        order.FactoryId = newOrder.FactoryId;
        order.DcId = newOrder.DcId;
        if (newOrder.DeliveryDate != null) {
            order.DeliveryDate = newOrder.DeliveryDate;
        }
        order.DeliveryAddress = newOrder.DeliveryAddress;
        order.PayMethod = newOrder.PayMethod;
        order.Status = newOrder.Status;
        order.Remark = newOrder.Remark;
        console.log(order);
        Ext.Ajax.request({
            method: 'POST',
            url: '/Api/PurchaseOrder/EditOrder',
            headers: { 'Content-Type': 'application/json' },
            params: JSON.stringify(order),
            dataType: 'json',
            success: function (Result) {
                var data = Ext.decode(Result.responseText);
                console.log(Result);
                if (data.IsSuccess == true) {
                    console.log("success");
                    Ext.getCmp('orderId').getStore().reload();
                    thisView.destroy();   
                } else {
                    alert(data.ErrorMessage);
                }
            }
        });
    },

    orderDetail: function () {
        if (this.getView().getSelectionModel().getSelected() == undefined) {
            alert("please select something");
        } else {
            var detail = Ext.create({
                xtype: 'orderdetail'
            });
            var select = this.getView().getSelectionModel().getSelected().items[0].data;
            console.log(select);
            var selectId = select.Id;
            // console.log(selectId);
            Ext.Ajax.request({
                method: 'GET',
                url: '/api/PurchaseOrderDetail/GetSingleOrderDetail?Id=' + selectId,
                headers: { 'Content-Type': 'application/json' },
                dataType: 'json',
                success: function (Result) {
                    var data = Ext.decode(Result.responseText);
                    //console.log(data);
                    if (data.IsSuccess == true) {
                        //console.log("success");
                        detail.down('form').getForm().setValues(data.Data);
                    } else {
                        alert(data.ErrorMessage);
                    }
                }
            });

            Ext.Ajax.request({
                method: 'GET',
                url: '/api/Organization/GetSingleOrganization?organizationId=' + select.FactoryId,
                headers: { 'Content-Type': 'application/json' },
                dataType: 'json',
                success: function (Result) {
                    var data = Ext.decode(Result.responseText);
                    //console.log(data);
                    if (data.IsSuccess == true) {
                        //console.log("success");
                        detail.down('#factoryItemId').getForm().setValues(data.Data);
                    } else {
                        alert(data.ErrorMessage);
                    }
                }
            });
            Ext.Ajax.request({
                method: 'GET',
                url: '/api/Organization/GetSingleOrganization?organizationId=' + select.DcId,
                headers: { 'Content-Type': 'application/json' },
                dataType: 'json',
                success: function (Result) {
                    var data = Ext.decode(Result.responseText);
                    //console.log(data);
                    if (data.IsSuccess == true) {
                        //console.log("success");
                        detail.down('#dcItemId').getForm().setValues(data.Data);
                    } else {
                        alert(data.ErrorMessage);
                    }
                }
            });
            Ext.Ajax.request({
                method: 'GET',
                url: '/api/Organization/GetSingleOrganization?organizationId=' + select.BrandId,
                headers: { 'Content-Type': 'application/json' },
                dataType: 'json',
                success: function (Result) {
                    var data = Ext.decode(Result.responseText);
                    //console.log(data);
                    if (data.IsSuccess == true) {
                        //console.log("success");
                        detail.down('#brandItemId').getForm().setValues(data.Data);
                    } else {
                        alert(data.ErrorMessage);
                    }
                }
            });
        }
        

        
        //console.log(detail.down('form').getForm().setValues({PurchaseOrderId:'3',PurchaseOrderNo:'4'}));
    }
})