Ext.define('WebAppClassic.view.main.purchaseorder.ModifyOrderDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.modifyOrderDetailController',
    
    editOrderDetail: function () {
        var edit = Ext.create({
            xtype:'editorderdetail'
        })
        edit.show();

        var form = this.getView().down('#orderDetailItemId').getForm().getFieldValues();
        edit.getForm().setValues(form)       
    },

    editActualOrderDetail: function(){
        var formValue = this.getView().getForm().getFieldValues();
        var orderDetail = Ext.getCmp("orderDetailId").down('#orderDetailItemId').getForm().getFieldValues();
        //console.log(orderDetail);
        //console.log(formValue);
        orderDetail.OrderQty = formValue.OrderQty;
        orderDetail.ProductId = formValue.ProductId;
        orderDetail.PurchaseOrderNo = formValue.PurchaseOrderNo;
        orderDetail.Remark = "";
        //console.log(JSON.stringify(orderDetail));
        Ext.Ajax.request({
            method: 'POST',
            url: '/api/PurchaseOrderDetail/EditOrderDetail',
            headers: { 'Content-Type': 'application/json' },
            params: JSON.stringify(orderDetail),
            dataType: 'json',      
            success: function (Result) {
                var data = Ext.decode(Result.responseText);
                console.log(data);
                if (data.IsSuccess == true) {
                    console.log("success");
                    //detail.down('form').getForm().setValues(data.Data);
                } else {
                    alert(data.ErrorMessage);
                }
            }
        });
    }
});