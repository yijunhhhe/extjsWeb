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

    searchOrder: function () {
        var userView = this.getView();
        var searchName = userView.down('#searchName').getValue();
        var searchType = userView.down('combo').getValue();
        var store = userView.down('grid').getStore();
        console.log(searchName);
        console.log(store.getData());
        store.filter(searchType, searchName);
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
                    Ext.getCmp('addOrderId').down('grid').getStore().removeAll();
                    Ext.getCmp('addOrderId').destroy();
                    
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
        //set values of order form
        var select = this.getView().down('grid').getSelectionModel().getSelected().items[0].data;
        select.DeliveryDate = select.DeliveryDate.replace("T", " ");
        var form = Ext.getCmp("editOrderId").down('form').getForm().setValues(select);
        //Ext.getCmp("editOrderId").down('form').down('#dateItemId').setValue(select.DeliveryDate);
        //console.log(date);
        //console.log(Ext.getCmp("editOrderId").down('form').getForm().getValues());

        //set data in orderdetail's grid
        var detailStore = this.getView().down('#orderDetailGrid').getStore().getData().items;
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
        var newOrder = this.getView().down('form').getForm().getFieldValues();
        delete order.id;
        order.BrandId = newOrder.BrandId;
        order.FactoryId = newOrder.FactoryId;
        order.DcId = newOrder.DcId;
        if (newOrder.DeliveryDate != null) {
            order.DeliveryDate = newOrder.DeliveryDate;
        }
        order.DeliveryAddress = newOrder.DeliveryAddress;
        order.PayMethod = newOrder.PayMethod;
        order.Remark = newOrder.Remark;

        //get the detail
        var detailArray = [];
        var store = this.getView().down('#orderDetailGrid').getStore().getData().getRange();
        //console.log(store);
        store.forEach(function (element) {
            delete element.data.id
            detailArray[detailArray.length] = element.data;
            //console.log(element);   
        });
        order.PurchaseOrderDetails = detailArray;
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