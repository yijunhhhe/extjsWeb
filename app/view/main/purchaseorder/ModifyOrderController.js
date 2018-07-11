Ext.define('WebAppClassic.view.main.purchaseorder.ModifyOrderController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.modifyOrderController',
    
    deleteOrder: function () {
        var select = this.getView().down('exportablegrid').getSelectionModel().getSelected().items[0].data;       
        delete select.id;
        select.IsDeleted = true;
        select.ModifyBy = localStorage.getItem("Account");
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

    deleteOrderDetail: function(){
        var store = this.getView().down('grid').getStore();
        var index = store.indexOf(this.getView().down('grid').getView().getSelectionModel().getSelection()[0]);
        if (index != -1) {
            this.getView().down('grid').getView().getStore().removeAt(index);
        }
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
        
        ostore.on('beforeload',function(store,options){
            Ext.apply(ostore.proxy.extraParams, filterObject);
        })
        ostore.reload();
        
        //var orderView = Ext.getCmp('orderId');
        //filterObject.ItemNum = 8;
        //Ext.getCmp('orderId').getViewModel().data.searchFilter = filterObject;
        //console.log(Ext.getCmp('orderId').down('exportablegrid').getStore());
        //Ext.getCmp("orderId").down("exportablegrid").getStore().load(1); 
        Ext.Ajax.request({
            method: 'POST',
            url: '/Api/PurchaseOrder/SearchPurchaseByDto',
            headers: { 'Content-Type': 'application/json' },
            params: JSON.stringify(filterObject),
            dataType: 'json',
            success: function (Result) {
                var data = Ext.decode(Result.responseText);
                if (data.IsSuccess == true) {
                    console.log("success");
                    console.log(data.Data);
                    if (Ext.getCmp('searchFilterId') != undefined) {
                        Ext.getCmp('searchFilterId').close();
                    }
                    Ext.getCmp('orderId').down('exportablegrid').getStore().setData(data.Data);
                    Ext.getCmp("orderId").down("#pageBar").down("displayfield").setValue(1);
                } else {
                    alert(data.ErrorMessage);
                }
            }
        });
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
        
        orderValue.CreateBy = localStorage.getItem("Account");
        orderValue.ModifyBy = localStorage.getItem("Account");
        orderDetailValue.forEach(function (element) {
            detailArray[detailArray.length] = element.data;
        });
        
        for(var i = 0; i < detailArray.length; i++) {
            var a = { PurchaseOrderNo: orderNo, ProductId: detailArray[i].ProductId, OrderQty: detailArray[i].OrderQty, ModifyBy: localStorage.getItem("Account"), CreateBy: detailArray[i].CreateBy, CreateDate: detailArray[i].CreateDate, Remark: detailArray[i].Remark }
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
        order.ModifyBy = localStorage.getItem("Account");
        //get the detail     
        var orderDetailValue = this.getView().down('#orderDetailGrid').getStore().getData().items;
        var detailArray = [];
        var newDetailArray = [];
        orderDetailValue.forEach(function (element) { 
            detailArray[detailArray.length] = element.data;         
        });
        
        for (var i = 0; i < detailArray.length; i++) {
            var a = { PurchaseOrderNo: order.OrderNo, ProductId: detailArray[i].ProductId, OrderQty: detailArray[i].OrderQty, ModifyBy: localStorage.getItem("Account"), CreateBy: detailArray[i].CreateBy, CreateDate: detailArray[i].CreateDate, Remark: detailArray[i].Remark }
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

    orderClick: function () {
        var orderView = this.getView().down('exportablegrid');
        var viewData = this.getView().down('exportablegrid').getSelectionModel().getSelected().items[0].data;
        Ext.Ajax.request({
            method: 'GET',
            url: '/Api/PurchaseOrderDetail/SearchPurchaseOrderDetail?id=' + viewData.Id + '&code=a' + '&pageNum=0' + '&itemNum=0',
            headers: { 'Content-Type': 'application/json' },
            dataType: 'json',
            success: function (Result) {
                var data = Ext.decode(Result.responseText);
                if (data.IsSuccess == true) {
                    Ext.getCmp('orderId').down('#orderDetailGrid').getStore().setData(data.Data);
                    var count = orderView.getSelectionModel().getSelected().items[0].data.Remark;
                    Ext.getCmp('orderId').down('#titleCount').setValue(count);  
                } else {
                    alert(data.ErrorMessage);
                }
            }
        });
    },

    productFilterConfirmClick: function () {
        if (Ext.getCmp('productFilterId').down('grid').getSelectionModel().getSelected().items.length == 0) {
            alert('Please select a product');
            return
        }
        var count = Ext.create('Ext.form.Panel', {
            region: 'east',
            title: 'count',
            bodyPadding: 5,
            width: 150,
            id: 'productFilterCount',
            // layout:'form',
            items: [{
                anchor: '90%',
                labelWidth: 50,
                xtype: 'numberfield',
                name: 'Count',
                fieldLabel: 'Count',
                allowBlank: false,
                editable: true,
                minValue: 1,
            }, {
                xtype: "button",
                text: 'Add',
                formBind: true,
                listeners: {
                    click: function () {
                        //orderQty
                        var text = parseInt(Ext.getCmp('productFilterCount').down('numberfield').getValue());
                        if (text < 1) {
                            alert('number needed to be bigger than 0');
                        }
                        //selected product 
                        var selected = Ext.getCmp('productFilterId').down('grid').getSelectionModel().getSelected().items[0].data;  
                        var newOrderDetail = {};

                        if (Ext.getCmp('addOrderId') == undefined) {
                            var order = Ext.getCmp('editOrderId').down('#orderItemId').getForm().getValues();
                            var editStore = Ext.getCmp('editOrderId').down('#orderDetailGrid').getStore();
                            var detailStore = editStore.getData().items;
                            if (detailStore.length == 0) {
                                var newOrderDetail = {
                                    PurchaseOrderNo: order.PurchaseOrderNo, ProductId: selected.Id, OrderQty: text, Bacode: selected.Bacode,
                                    Size: selected.Size, Name: selected.Name, Color: selected.Color, Code: selected.Code
                                }
                            }
                            for (var i = 0; i < detailStore.length; i++) {
                                if (detailStore[i].data.ProductId == selected.Id) {
                                    var eleQty = parseInt(detailStore[i].data.OrderQty);
                                    var qty = eleQty + text;
                                    newOrderDetail = detailStore[i].data
                                    newOrderDetail.OrderQty = qty;
                                    var index = editStore.indexOfId(detailStore[i].data.id);
                                    editStore.removeAt(index);
                                } else {
                                    var newOrderDetail = {
                                        PurchaseOrderNo: order.PurchaseOrderNo, ProductId: selected.Id, OrderQty: text, Bacode: selected.Bacode,
                                        Size: selected.Size, Name: selected.Name, Color: selected.Color, Code: selected.Code
                                    }
                                }
                            }
                        } else if (Ext.getCmp('editOrderId') == undefined) {
                            var order = Ext.getCmp('addOrderId').down('#orderItemId').getForm().getValues();
                            var addStore = Ext.getCmp('addOrderId').down('#orderDetailItemId').down('grid').getStore();
                            var detailStore = addStore.getData().items;
                            if (detailStore.length == 0) {
                                newOrderDetail = {
                                    PurchaseOrderNo: order.PurchaseOrderNo, ProductId: selected.Id, OrderQty: text, Bacode: selected.Bacode,
                                    Size: selected.Size, Name: selected.Name, Color: selected.Color, Code: selected.Code
                                }
                            }
                            for (var i = 0; i < detailStore.length; i++) {
                                if (detailStore[i].data.ProductId == selected.Id) {
                                    var eleQty = parseInt(detailStore[i].data.OrderQty);
                                    var qty = eleQty + text;
                                    newOrderDetail = detailStore[i].data
                                    newOrderDetail.OrderQty = qty;
                                    var index = addStore.indexOfId(detailStore[i].data.id);
                                    addStore.removeAt(index);

                                } else {
                                    var newOrderDetail = {
                                        PurchaseOrderNo: order.PurchaseOrderNo, ProductId: selected.Id, OrderQty: text, Bacode: selected.Bacode,
                                        Size: selected.Size, Name: selected.Name, Color: selected.Color, Code: selected.Code
                                    }
                                }
                            }
                        }
                        if (Ext.getCmp('addOrderId') == undefined) {
                            Ext.getCmp('editOrderId').down('#orderDetailGrid').getStore().add(newOrderDetail)
                            Ext.getCmp('productFilterId').destroy();
                        } else if (Ext.getCmp('editOrderId') == undefined) {
                            Ext.getCmp('addOrderId').down('#orderDetailItemId').down('grid').getStore().add(newOrderDetail);
                            Ext.getCmp('productFilterId').destroy();
                        }
                    }
                }
            }]
        });
        Ext.getCmp('productFilterId').insert(1, count);
    }   
})


//orderJump: function () {
//    var pageNum = Ext.getCmp("orderId").down("#pageBar").down("textfield").getValue();
//    var filter = Ext.getCmp("orderId").getViewModel().data.searchFilter;
//    if (pageNum <= 0) {
//        alert(">0");
//    }
//    filter.PageNum = pageNum;
//    var itemNum = 8;
//    filter.ItemNum = itemNum;

//    Ext.Ajax.request({
//        method: 'POST',
//        url: '/Api/PurchaseOrder/SearchPurchaseByDto',
//        headers: { 'Content-Type': 'application/json' },
//        params: JSON.stringify(filter),
//        dataType: 'json',
//        success: function (Result) {
//            var data = Ext.decode(Result.responseText);
//            if (data.IsSuccess == true) {
//                console.log("success");
//                console.log(data.Data);
//                Ext.getCmp('orderId').down('exportablegrid').getStore().setData(data.Data);
//                Ext.getCmp("orderId").down("#pageBar").down("displayfield").setValue(pageNum);
//                //Ext.getCmp("orderId").down("#totalNumberItem").setValue(data.Data.length);
//                //console.log(orderView.down('grid').getStore());
//            } else {
//                alert(data.ErrorMessage);
//            }
//        }
//    });
//},

//orderNext: function () {
//    var pageNum = Ext.getCmp("orderId").down("#pageBar").down("displayfield").getValue();
//    pageNum = parseInt(pageNum) + 1;
//    var filter = Ext.getCmp("orderId").getViewModel().data.searchFilter;
//    filter.PageNum = pageNum;
//    var itemNum = 8;
//    filter.ItemNum = itemNum;
//    Ext.Ajax.request({
//        method: 'POST',
//        url: '/Api/PurchaseOrder/SearchPurchaseByDto',
//        headers: { 'Content-Type': 'application/json' },
//        params: JSON.stringify(filter),
//        dataType: 'json',
//        success: function (Result) {
//            var data = Ext.decode(Result.responseText);
//            if (data.IsSuccess == true) {
//                console.log("success");
//                console.log(data.Data);
//                Ext.getCmp('orderId').down('exportablegrid').getStore().setData(data.Data);
//                //Ext.getCmp("orderId").down("#pageBar").down("textfield").setValue(pageNum);
//                Ext.getCmp("orderId").down("#pageBar").down("displayfield").setValue(pageNum);
//                //console.log(orderView.down('grid').getStore());
//                //Ext.getCmp("orderId").down("#totalNumberItem").setValue(data.Data.length);
//            } else {
//                alert(data.ErrorMessage);
//            }
//        }
//    });
//},

//orderLast: function () {
//    var pageNum = Ext.getCmp("orderId").down("#pageBar").down("displayfield").getValue();
//    if (parseInt(pageNum) > 1) {
//        pageNum = pageNum - 1;
//    }
//    var filter = Ext.getCmp("orderId").getViewModel().data.searchFilter;
//    filter.PageNum = pageNum;
//    var itemNum = 8;
//    filter.ItemNum = itemNum;
//    Ext.Ajax.request({
//        method: 'POST',
//        url: '/Api/PurchaseOrder/SearchPurchaseByDto',
//        headers: { 'Content-Type': 'application/json' },
//        params: JSON.stringify(filter),
//        dataType: 'json',
//        success: function (Result) {
//            var data = Ext.decode(Result.responseText);
//            if (data.IsSuccess == true) {
//                console.log("success");
//                console.log(data.Data);
//                Ext.getCmp('orderId').down('exportablegrid').getStore().setData(data.Data);
//                //Ext.getCmp("orderId").down("#pageBar").down("textfield").setValue(pageNum);
//                Ext.getCmp("orderId").down("#pageBar").down("displayfield").setValue(pageNum);
//                //console.log(orderView.down('grid').getStore());
//                //Ext.getCmp("orderId").down("#totalNumberItem").setValue(data.Data.length);
//            } else {
//                alert(data.ErrorMessage);
//            }
//        }
//    });
//},