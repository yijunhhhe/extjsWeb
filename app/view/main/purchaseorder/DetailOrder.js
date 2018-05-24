Ext.define('WebAppClassic.view.main.purchaseorder.DetailOrder', {
    extend: 'Ext.window.Window',
    xtype: 'detailorder',
    requires: [
        'WebAppClassic.view.main.purchaseorder.ModifyOrderDetailController',
    ],
    width: 500,
    height:600,
    autoShow:true,
    closable: true,
    controller: 'modifyOrderDetailController',
    items: {
        itemId:'orderDetailId',
        xtype: 'form',
        defaultType: 'displayfield',
        padding:10,
        items: [{
            fieldLabel: 'PurchaseOrderId',
            name: 'PurchaseOrderId'
        }, {
            fieldLabel: 'PurchaseOrderNo',
            name: 'PurchaseOrderNo'
        }, {
            fieldLabel: 'ProductId',
            name: 'ProductId'
        }, {
            fieldLabel: 'OrderQty',
            name: 'OrderQty'
        }, {
            fieldLabel: 'IdDeleted',
            name: 'IsDeleted'
        }, {
            fieldLabel: 'CreateBy',
            name: 'CreateBy'
        }, {
            fieldLabel: 'CreateDate',
            name: 'CreateDate'
        }, {
            fieldLabel: 'ModifyBy',
            name: 'ModifyBy'
        }, {
            fieldLabel: 'ModifyDate',
            name: 'ModifyDate'
        }, {
            xtype: 'button',
            text: 'Edit',
            listeners: {
                click:'editOrderDetail'
            }
        }
        ],

       
    }

});