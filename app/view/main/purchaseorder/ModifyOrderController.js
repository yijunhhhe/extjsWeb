Ext.define('WebAppClassic.view.main.purchaseorder.ModifyOrderController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.modifyOrderController',
    
    deleteOrder: function () {
        var select = this.getView().down('grid').getSelectionModel().getSelected().items[0].data;
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
                            Ext.getCmp('orderId').down('grid').getStore().reload();
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

    searchOrderAddFilter: function () {
        var searchFitler = Ext.create({
            xtype: 'searchfilter'
        });
        searchFitler.show();

        
    },

    searchOrder: function () {
        //var filterObject = {};
        //if (Ext.getCmp('searchFilterId') != undefined) {
        //    var filterValue = Ext.getCmp('searchFilterId').down('form').getForm().getValues();
        //    var filterObject = filterValue;         
        //    }
        var filterObject = Ext.getCmp('orderId').down('#searchForm').getForm().getValues();
        
        var orderView = Ext.getCmp('orderId');
        //var filterObject = this.getView().getViewModel().data.searchFilter;
        
        //if (!Object.keys(filterObject).length) {
        //    var searchName = orderView.down('#searchName').getValue();
        //    var searchType = orderView.down('combo').getValue();
        //    if (searchType == null) {
        //        alert('Please select an filter');
        //        return 
        //    }
        //    var object = {}
            
        //    object[searchType] = searchName;
        //    filterObject = object;
        //}
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
                    Ext.getCmp('orderId').down('grid').getStore().setData(data.Data);                
                    //console.log(orderView.down('grid').getStore());
                } else {
                    alert(data.ErrorMessage);
                }
            }
        });
    },
    
    addFilter: function () {
        var addOrderView = this.getView();
        var filter = this.getView().down('form').getForm().getValues();
        if (filter.Bacode == "" && filter.Code == "" && filter.Color == "" && filter.Name == "" && filter.Size == "") {
            alert("Please enter something");
            return;
        }
        console.log(filter);
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
                    console.log(data.Data);
                    addOrderView.down('#orderDetailItemId').down('combo').getStore().setData(data.Data);
                    
                    console.log(addOrderView.down('#orderDetailItemId').down('combo').getStore());

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

        //var detail = this.getView().down('#orderDetailItemId').getForm().getValues();
        //if (detail.ProductId == "" && detail.OrderQty == "" && detail.Remark == "" || detail.ProductId == "") {
        //    return
        //}
        //var model = this.getView().getViewModel().data.detail;
        //model[model.length] = detail;
        //this.getView().getViewModel().data.detail = model;
        //this.getView().down('grid').getStore().setData(model);
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
        var orderDetailValue = this.getView().down('#orderDetailItemId').down('grid').getStore().getData().items;
        //var detailStore = this.getView().down('#orderDetailGrid').getStore().getData().items;
        var detailArray = [];
        var newDetailArray = []
        var orderNo = orderValue.OrderNo;
        
        orderDetailValue.forEach(function (element) {
            detailArray[detailArray.length] = element.data;
        });
        
        for(var i = 0; i < detailArray.length; i++) {
            var a = { PurchaseOrderNo: orderNo, ProductId: detailArray[i].ProductId, OrderQty: detailArray[i].OrderQty }
            console.log(orderNo);
            newDetailArray[newDetailArray.length] = a       
        };
        
        orderValue.PurchaseOrderDetails = newDetailArray;
        debugger;
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
        //if (filter.Bacode == "" && filter.Code == "" && filter.Color == "" && filter.Name == "" && filter.Size == "") {
        //    alert("Please enter something");
        //    return;
        //}

        //var filterview = Ext.create({
        //    xtype: 'filterdetail'
        //});

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
                    //console.log(data.Data);
                    Ext.getCmp('productFilterId').down('grid').getStore().setData(data.Data);
                    //console.log(addOrderView.down('#orderDetailItemId').down('combo').getStore());

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
        Ext.getCmp('editOrderId').down('#DcItemId').getStore().load();
        Ext.getCmp('editOrderId').down('#BrandItemId').getStore().load();
        Ext.getCmp('editOrderId').down('#FactoryItemId').getStore().load();
        Ext.Ajax.request({
            method: 'POST',
            url: '/Api/Product/SearchProductByDto',
            headers: { 'Content-Type': 'application/json' },
            params: JSON.stringify({}),
            dataType: 'json',
            success: function (Result) {
                var data = Ext.decode(Result.responseText);

                if (data.IsSuccess == true) {
                    //console.log("success");
                    //console.log(data.Data);
                    //Ext.getCmp('editOrderId').down('#orderDetailItemId').down('combo').getStore().setData(data.Data);

                    //console.log(addOrderView.down('#orderDetailItemId').down('combo').getStore());

                } else {
                    alert(data.ErrorMessage);
                }
            }
        });
        //set values of order form
        var select = this.getView().down('grid').getSelectionModel().getSelected().items[0].data;
        select.DeliveryDate = select.DeliveryDate.replace("T", " ");
        var form = Ext.getCmp("editOrderId").down('#orderItemId').getForm().setValues(select);
        

        var detailStore = Ext.getCmp('orderId').down('#orderDetailGrid').getStore().getData().items;
        var detailArray = [];
        detailStore.forEach(function (element) {
            detailArray[detailArray.length] = element.data
        });
        
        Ext.getCmp('editOrderId').down('#orderDetailGrid').getStore().setData(detailArray);
        //console.log(detailStore.items);
        //console.log(this.getView().getSelectionModel().getSelected().items[0].data);
    },

    actualEditOrder: function () {

        var thisView = this.getView();

        //get the order 
        var order = Ext.getCmp("orderId").down('grid').getSelectionModel().getSelected().items[0].data;   
        delete order.id;
        var newOrder = Ext.getCmp("editOrderId").down('#orderItemId').getForm().getValues();
        order.BrandId = newOrder.BrandId;
        order.FactoryId = newOrder.FactoryId;
        order.DcId = newOrder.DcId;
        order.DeliveryDate = newOrder.DeliveryDate;
        order.DeliveryAddress = newOrder.DeliveryAddress;
        order.PayMethod = newOrder.PayMethod;
        order.Remark = newOrder.Remark;
        debugger

        //get the detail     
        var orderDetailValue = this.getView().down('#orderDetailGrid').getStore().getData().items;
        var detailArray = [];
        var newDetailArray = [];
        //console.log(store);
        orderDetailValue.forEach(function (element) { 
            detailArray[detailArray.length] = element.data;         
        });
        
        for (var i = 0; i < detailArray.length; i++) {
            var a = { PurchaseOrderNo: order.OrderNo, ProductId: detailArray[i].ProductId, OrderQty: detailArray[i].OrderQty }
            //console.log(orderNo);
            newDetailArray[newDetailArray.length] = a
        };
        
        order.PurchaseOrderDetails = newDetailArray;
        console.log(order);
        

        Ext.Ajax.request({
            method: 'POST',
            url: '/Api/PurchaseOrder/EditPurchaseWithDetail',
            headers: { 'Content-Type': 'application/json' },
            params: JSON.stringify(order),
            dataType: 'json',
            success: function (Result) {
                var data = Ext.decode(Result.responseText);
                console.log(Result);
                if (data.IsSuccess == true) {
                    console.log("success");
                    Ext.getCmp('orderId').down('grid').getStore().reload();
                    thisView.destroy();   
                } else {
                    alert(data.ErrorMessage);
                }
            }
        });
    },

    
})