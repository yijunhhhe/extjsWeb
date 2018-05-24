Ext.define('WebAppClassic.view.main.purchaseorder.OrderDetail', {
    extend: 'Ext.window.Window',
    xtype: 'orderdetail',
    id:'orderDetailId',
    requires: [
        'WebAppClassic.view.main.purchaseorder.ModifyOrderDetailController',
    ],
    width: 500,
    height:600,
    autoShow:true,
    closable: true,
    controller: 'modifyOrderDetailController',
    items: {
        itemId:'orderDetailItemId',
        xtype: 'form',
        defaultType: 'displayfield',
        padding:10,
        items: [{
            fieldLabel: 'Id',
            name: 'Id'
        }, {
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
            fieldLabel: 'IsDeleted',
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
        }, {
            xtype: 'button',
            text: 'Delete',
            listeners: {
                click:'deleteOrderDetail'
            }
        }
        ],

       
    }

});