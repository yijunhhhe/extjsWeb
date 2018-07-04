﻿Ext.define('WebAppClassic.view.main.purchaseorder.ModifyOrderController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.modifyOrderController',
    
    deleteOrder: function () {
        var select = this.getView().down('exportablegrid').getSelectionModel().getSelected().items[0].data;
        delete select.id;
        select.IsDeleted = true;
        Ext.MessageBox.confirm('delete', 'yes?', function (btn, text) {
            if (btn == "yes") {     
                Ext.Ajax.request({
                    method: 'POST',
                    url: '/Api/PurchaseOrder/DeletePurchaseWithDetail',
                    headers: { 'Content-Type': 'application/json' },
                    params: JSON.stringify(select),
                    dataType: 'json',
                    success: function (Result) {
                        var data = Ext.decode(Result.responseText);
                        //console.log(data);
                        if (data.IsSuccess == true) {
                            console.log("success");
                            Ext.getCmp('orderId').down('exportablegrid').getStore().reload();
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
    getExcel: function(){
        var filterObject = Ext.getCmp('orderId').down('#searchForm').getForm().getValues();
        var orderView = Ext.getCmp('orderId');
        //url = '/Api/PurchaseOrder/getExcel?dto=' + JSON.stringify(filterObject);
        //window.open(url);
        var form = Ext.getCmp('orderId').down('#searchForm').submit({
            params: JSON.stringify(filterObject)
        });
    },

    searchOrder: function () {
        var filterObject = Ext.getCmp('orderId').down('#searchForm').getForm().getValues();
        var ostore = Ext.getCmp('orderId').down('exportablegrid').getStore();
        //var load = { filter: {} };
        //load.filter = filterObject;

        ostore.on('beforeload',function(store,options){
            Ext.apply(ostore.proxy.extraParams, filterObject);
        })
        ostore.reload();
        
        //var orderView = Ext.getCmp('orderId');
        //filterObject.ItemNum = 8;
        //Ext.getCmp('orderId').getViewModel().data.searchFilter = filterObject;
        //console.log(Ext.getCmp('orderId').down('exportablegrid').getStore());
        //Ext.getCmp("orderId").down("exportablegrid").getStore().load(1); 
        //Ext.Ajax.request({
        //    method: 'POST',
        //    url: '/Api/PurchaseOrder/SearchPurchaseByDto',
        //    headers: { 'Content-Type': 'application/json' },
        //    params: JSON.stringify(filterObject),
        //    dataType: 'json',
        //    success: function (Result) {
        //        var data = Ext.decode(Result.responseText);
        //        if (data.IsSuccess == true) {
        //            console.log("success");
        //            console.log(data.Data);
        //            if (Ext.getCmp('searchFilterId') != undefined) {
        //                Ext.getCmp('searchFilterId').close();
        //            }
        //            Ext.getCmp('orderId').down('exportablegrid').getStore().setData(data.Data);
        //            Ext.getCmp("orderId").down("#pageBar").down("displayfield").setValue(1);
        //            //Ext.getCmp("orderId").down("#totalNumberItem").setValue(data.Data.length);
        //            //console.log(orderView.down('grid').getStore());
        //        } else {
        //            alert(data.ErrorMessage);
        //        }
        //    }
        //});
    },
    
    addOrderDetail: function(){
        
        var filter = Ext.create({
            xtype: 'productfilter'
        });
      
    },
    
    addOrder: function () {

        var add = Ext.create({
            xtype: 'addorder'
        });
        addOrderValue = Ext.getCmp('addOrderId').down('#orderItemId').getForm();   
    },

    actualAddOrder: function () {

        if (!this.getView().down('#orderItemId').getForm().isValid()) {
            alert('Please fill out the required field');
            return;
        }

        if (this.getView().down('grid').getStore().getData().items.length == 0) {
            alert('Please add at least one order Detail');
            return;
        }

        var orderDetailLength = this.getView().down('#orderDetailItemId').down('grid').getStore().getData().items.length;
        if (orderDetailLength == 0) {
            alert('Please add at least one order detail');
            return;
        }

        var orderValue = this.getView().down('#orderItemId').getForm().getValues();
        var orderDetailValue = this.getView().down('#orderDetailItemId').down('grid').getStore().getData().items;
        var detailArray = [];
        var newDetailArray = [];
        var orderNo = orderValue.OrderNo;
        
        orderDetailValue.forEach(function (element) {
            detailArray[detailArray.length] = element.data;
        });
        
        for(var i = 0; i < detailArray.length; i++) {
            var a = { PurchaseOrderNo: orderNo, ProductId: detailArray[i].ProductId, OrderQty: detailArray[i].OrderQty }
            newDetailArray[newDetailArray.length] = a       
        };

        orderDetail = {}
        orderDetail.purchaseOrder = orderValue;
        orderDetail.purchaseOrderDetails = newDetailArray;
        
        Ext.Ajax.request({
            method: 'POST',
            url: '/Api/PurchaseOrder/AddPurchaseOrder',
            headers: { 'Content-Type': 'application/json' },
            params: [
               JSON.stringify(orderDetail),
            ],
            dataType: 'json',
            success: function (Result) {
                var data = Ext.decode(Result.responseText);
                console.log(Result);
                if (data.IsSuccess == true) {
                    console.log("success");
                    Ext.getCmp('orderId').down('exportablegrid').getStore().reload();
                    Ext.getCmp('addOrderId').down('grid').getStore().removeAll();
                    Ext.getCmp('addOrderId').destroy();   
                } else {
                    alert(data.ErrorMessage);
                }
            }
        });
    },

    productFilter: function(){
    
        var filter = this.getView().down('form').getForm().getValues();

        Ext.Ajax.request({
            method: 'POST',
            url: '/Api/Product/SearchProductByDto',
            headers: { 'Content-Type': 'application/json' },
            params: JSON.stringify(filter),
            dataType: 'json',
            success: function (Result) {
                var data = Ext.decode(Result.responseText);
                if (data.IsSuccess == true) {
                    console.log("success");
                    Ext.getCmp('productFilterId').down('grid').getStore().setData(data.Data);
                } else {
                    alert(data.ErrorMessage);
                }
            }
        });
    },

    editOrder: function () {
        if (Ext.getCmp('orderId').down('exportablegrid').getSelectionModel().getSelected().items.length == 0) {
            alert("Please select a record")
            return
        }
        var edit = Ext.create({
            xtype: 'editorder',
        });
        Ext.getCmp('editOrderId').down('#DcItemId').getStore().load();
        Ext.getCmp('editOrderId').down('#BrandItemId').getStore().load();
        Ext.getCmp('editOrderId').down('#FactoryItemId').getStore().load();
        
        //set values of order form
        var select = this.getView().down('exportablegrid').getSelectionModel().getSelected().items[0].data;
        select.DeliveryDate = select.DeliveryDate.replace("T", " ");
        var form = Ext.getCmp("editOrderId").down('#orderItemId').getForm().setValues(select);
        
        var detailStore = Ext.getCmp('orderId').down('#orderDetailGrid').getStore().getData().items;
        var detailArray = [];
        detailStore.forEach(function (element) {
            detailArray[detailArray.length] = element.data
        });
        
        Ext.getCmp('editOrderId').down('#orderDetailGrid').getStore().setData(detailArray);
    },

    actualEditOrder: function () {

        var thisView = this.getView();
        if (!this.getView().down('#orderItemId').getForm().isValid()) {
            alert('Please fill out the required field');
            return;
        }
        //get the order 
        var order = Ext.getCmp("orderId").down('exportablegrid').getSelectionModel().getSelected().items[0].data;
        delete order.id;
        var newOrder = Ext.getCmp("editOrderId").down('#orderItemId').getForm().getValues();
        order.BrandId = newOrder.BrandId;
        order.FactoryId = newOrder.FactoryId;
        order.DcId = newOrder.DcId;
        order.DeliveryDate = newOrder.DeliveryDate;
        order.DeliveryAddress = newOrder.DeliveryAddress;
        order.PayMethod = newOrder.PayMethod;
        
        //get the detail     
        var orderDetailValue = this.getView().down('#orderDetailGrid').getStore().getData().items;
        var detailArray = [];
        var newDetailArray = [];
        orderDetailValue.forEach(function (element) { 
            detailArray[detailArray.length] = element.data;         
        });
        
        for (var i = 0; i < detailArray.length; i++) {
            var a = { PurchaseOrderNo: order.OrderNo, ProductId: detailArray[i].ProductId, OrderQty: detailArray[i].OrderQty }
            newDetailArray[newDetailArray.length] = a
        };
        
        orderDetail = {}
        orderDetail.purchaseOrder = order;
        orderDetail.purchaseOrderDetails = newDetailArray;

        Ext.Ajax.request({
            method: 'POST',
            url: '/Api/PurchaseOrder/EditPurchaseWithDetail',
            headers: { 'Content-Type': 'application/json' },
            params: JSON.stringify(orderDetail),
            dataType: 'json',
            success: function (Result) {
                var data = Ext.decode(Result.responseText);
                console.log(Result);
                if (data.IsSuccess == true) {
                    console.log("success");
                    Ext.getCmp('orderId').down('exportablegrid').getStore().reload();
                    thisView.destroy();   
                } else {
                    alert(data.ErrorMessage);
                }
            }
        });
    },

    orderJump: function () {
        var pageNum = Ext.getCmp("orderId").down("#pageBar").down("textfield").getValue();
        //var filter = Ext.getCmp("orderId").down('#searchForm').getForm().getValues();
        var filter = Ext.getCmp("orderId").getViewModel().data.searchFilter;
        if (pageNum <= 0) {
            alert(">0");
        }
        filter.PageNum = pageNum;
        var itemNum = 8;
        filter.ItemNum = itemNum;

        Ext.Ajax.request({
            method: 'POST',
            url: '/Api/PurchaseOrder/SearchPurchaseByDto',
            headers: { 'Content-Type': 'application/json' },
            params: JSON.stringify(filter),
            dataType: 'json',
            success: function (Result) {
                var data = Ext.decode(Result.responseText);
                if (data.IsSuccess == true) {
                    console.log("success");
                    console.log(data.Data);
                    Ext.getCmp('orderId').down('exportablegrid').getStore().setData(data.Data);
                    Ext.getCmp("orderId").down("#pageBar").down("displayfield").setValue(pageNum);
                    //Ext.getCmp("orderId").down("#totalNumberItem").setValue(data.Data.length);
                    //console.log(orderView.down('grid').getStore());
                } else {
                    alert(data.ErrorMessage);
                }
            }
        });
    },

    orderNext: function () {
        var pageNum = Ext.getCmp("orderId").down("#pageBar").down("displayfield").getValue();
        pageNum = parseInt(pageNum) + 1;
        var filter = Ext.getCmp("orderId").getViewModel().data.searchFilter;
        filter.PageNum = pageNum;
        var itemNum = 8;
        filter.ItemNum = itemNum;
        Ext.Ajax.request({
            method: 'POST',
            url: '/Api/PurchaseOrder/SearchPurchaseByDto',
            headers: { 'Content-Type': 'application/json' },
            params: JSON.stringify(filter),
            dataType: 'json',
            success: function (Result) {
                var data = Ext.decode(Result.responseText);
                if (data.IsSuccess == true) {
                    console.log("success");
                    console.log(data.Data);
                    Ext.getCmp('orderId').down('exportablegrid').getStore().setData(data.Data);
                    //Ext.getCmp("orderId").down("#pageBar").down("textfield").setValue(pageNum);
                    Ext.getCmp("orderId").down("#pageBar").down("displayfield").setValue(pageNum);
                    //console.log(orderView.down('grid').getStore());
                    //Ext.getCmp("orderId").down("#totalNumberItem").setValue(data.Data.length);
                } else {
                    alert(data.ErrorMessage);
                }
            }
        });
    },

    orderLast: function () {
        var pageNum = Ext.getCmp("orderId").down("#pageBar").down("displayfield").getValue();
        if (parseInt(pageNum) > 1) {
            pageNum = pageNum - 1;
        }
        var filter = Ext.getCmp("orderId").getViewModel().data.searchFilter;
        filter.PageNum = pageNum;
        var itemNum = 8;
        filter.ItemNum = itemNum;
        Ext.Ajax.request({
            method: 'POST',
            url: '/Api/PurchaseOrder/SearchPurchaseByDto',
            headers: { 'Content-Type': 'application/json' },
            params: JSON.stringify(filter),
            dataType: 'json',
            success: function (Result) {
                var data = Ext.decode(Result.responseText);
                if (data.IsSuccess == true) {
                    console.log("success");
                    console.log(data.Data);
                    Ext.getCmp('orderId').down('exportablegrid').getStore().setData(data.Data);
                    //Ext.getCmp("orderId").down("#pageBar").down("textfield").setValue(pageNum);
                    Ext.getCmp("orderId").down("#pageBar").down("displayfield").setValue(pageNum);
                    //console.log(orderView.down('grid').getStore());
                    //Ext.getCmp("orderId").down("#totalNumberItem").setValue(data.Data.length);
                } else {
                    alert(data.ErrorMessage);
                }
            }
        });
    }
    
})