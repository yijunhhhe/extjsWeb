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

    },

    orderDetail: function(){
        var detail = Ext.create({
            xtype: 'orderdetail'
        });
        var select = this.getView().getSelectionModel().getSelected().items[0].data;
        var selectId = select.Id;
        console.log(selectId);
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