Ext.define("WebAppClassic.view.main.purchaseorder.EditOrderDetail", {
    extend: "Ext.form.Panel",
    xtype: 'editorderdetail',
    requires: [
        'WebAppClassic.view.main.purchaseorder.ModifyOrderDetailController',
    ],
    controller:'modifyOrderDetailController',
    defaultType: 'textfield',
    floating: true,
    closable: true,
    bodyPadding:20,
    width: 350,
    height:450,
    items: [
        {
            fieldLabel:'PurchaseOrderNo',
            name:'PurchaseOrderNo',
        }, {
            fieldLabel: 'ProductId',
            name:'ProductId'
        }, {
            fieldLabel: 'OrderQty',
            name: 'OrderQty',
        }, 
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Submit',
            listeners: {
                click:'editActualOrderDetail'
            }
        }, {
        
            xtype: 'button',
            text: 'Cancel',
            listeners: {
                click: function () {
                    this.up('form').close();
                }
            }
        }
    ]


});