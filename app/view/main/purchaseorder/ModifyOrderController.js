Ext.define('WebAppClassic.view.main.purchaseorder.ModifyOrderController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.modifyOrderController',

    searchOrder: function () {
        var userView = this.getView();
        var searchName = userView.down('#searchName').getValue();
        var store = userView.getStore();
        console.log(searchName);
        console.log(store);
        store.filter('OrderNo', searchName);
    },
    
    addOrder:function () {
        
    },

    editOrder: function () {
        var edit = Ext.create({
            xtype: 'editorder',
        });
        var select = this.getView().getSelectionModel().getSelected().items[0].data;
        var form = Ext.getCmp("editOrderId").down('form').getForm().setValues(select);
        //console.log(this.getView().getSelectionModel().getSelected());
    },

    actualEditOrder: function () {
        var thisView = this.getView();
        var order = Ext.getCmp("orderId").getSelectionModel().getSelected().items[0].data;
        var newOrder = this.getView().down('form').getForm().getFieldValues();
        delete order.id;
        order.BrandId = newOrder.BrandId;
        order.FactoryId = newOrder.FactoryId;
        order.DcId = newOrder.DcId;
        order.DeliveryDate = newOrder.DeliveryDate;
        order.DeliveryAddress = newOrder.DeliveryAddress;
        order.PayMethod = newOrder.PayMethod;
        order.Status = newOrder.Status;
        order.Remark = newOrder.Remark;
        console.log(order);
        Ext.Ajax.request({
            method: 'POST',
            url: '/api/PurchaseOrder/EditOrder',
            headers: { 'Content-Type': 'application/json' },
            params: JSON.stringify(order),
            dataType: 'json',
            success: function (Result) {
                var data = Ext.decode(Result.responseText);
                //console.log(data);
                if (data.IsSuccess !== true) {
                    console.log("success");
                    Ext.getCmp('orderId').getStore().reload();
                    thisView.destroy();   
                } else {
                    alert(data.ErrorMessage);
                }
            }
        });
    },

    orderDetail: function(){
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
        //console.log(detail.down('form').getForm().setValues({PurchaseOrderId:'3',PurchaseOrderNo:'4'}));
    }
})