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
        console.log(orderDetail);
        console.log(formValue);
        
    }
});