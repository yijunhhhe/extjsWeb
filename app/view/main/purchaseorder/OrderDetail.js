//Ext.define('WebAppClassic.view.main.purchaseorder.OrderDetail', {
//    extend: 'Ext.window.Window',
//    xtype: 'orderdetail',
//    id:'orderDetailId',
//    requires: [
//        'WebAppClassic.view.main.purchaseorder.ModifyOrderDetailController',
//    ],
//    width: 1010,
//    height:650,
//    autoShow:true,
//    closable: true,
//    controller: 'modifyOrderDetailController',
//    layout:'column',
//    items: [{
//        width: 250,
//        itemId: 'orderDetailItemId',
//        title:'OrderDetail',
//        xtype: 'form',
//        defaultType: 'displayfield',
//        bodyPadding: 10,
//        items: [{
//            fieldLabel: 'Id',
//            name: 'Id'
//        }, {
//            fieldLabel: 'PurchaseOrderId',
//            name: 'PurchaseOrderId'
//        }, {
//            fieldLabel: 'PurchaseOrderNo',
//            name: 'PurchaseOrderNo'
//        }, {
//            fieldLabel: 'ProductId',
//            name: 'ProductId'
//        }, {
//            fieldLabel: 'OrderQty',
//            name: 'OrderQty'
//        }, {
//            fieldLabel: 'IsDeleted',
//            name: 'IsDeleted'
//        }, {
//            fieldLabel: 'CreateBy',
//            name: 'CreateBy'
//        }, {
//            fieldLabel: 'CreateDate',
//            name: 'CreateDate'
//        }, {
//            fieldLabel: 'ModifyBy',
//            name: 'ModifyBy'
//        }, {
//            fieldLabel: 'ModifyDate',
//            name: 'ModifyDate'
//        },
//        {
//            xtype: 'button',
//            text: 'Edit',
//            listeners: {
//                click:'editOrderDetail'
//            }
//        }, {
//            xtype: 'button',
//            text: 'Delete',
//            listeners: {
//                click:'deleteOrderDetail'
//            }
//        }
//        ], 
//    }, {
//        width: 250,
//        xtype: 'form',
//        itemId: 'factoryItemId',
//        defaultType: 'displayfield',
//        title:'Factory',
//        bodyPadding: 10,
//        items: [{
//            fieldLabel: 'Id',
//            name: 'Id'
//        }, {
//            fieldLabel: 'Name',
//            name: 'Name'
//        }, {
//            fieldLabel: 'EnName',
//            name: 'EnName'
//        }, {
//            fieldLabel: 'Location',
//            name: 'Location'
//        }, {
//            fieldLabel: 'Type',
//            name: 'Type'
//        }, {
//            fieldLabel: 'Code',
//            name: 'Code'
//        }, {
//            fieldLabel: 'IsDeleted',
//            name: 'IsDeleted'
//        }, {
//            fieldLabel: 'Remark',
//            name: 'Remark'
//        }, {
//            fieldLabel: 'CreateBy',
//            name: 'CreateBy'
//        }, {
//            fieldLabel: 'CreateDate',
//            name: 'CreateDate'
//        },
//        //{
//        //    xtype: 'button',
//        //    text: 'Edit',
//        //    listeners: {
//        //        //click: 'editOrderDetail'
//        //    }
//        //}, {
//        //    xtype: 'button',
//        //    text: 'Delete',
//        //    listeners: {
//        //        //click: 'deleteOrderDetail'
//        //    }
//        //}
//        ],

//    }, {
//        width: 250,
//        xtype: 'form',
//        defaultType: 'displayfield',
//        itemId: 'dcItemId',
//        title: 'Dc',
//        bodyPadding: 10,
//        items: [{
//            fieldLabel: 'Id',
//            name: 'Id'
//        }, {
//            fieldLabel: 'Name',
//            name: 'Name'
//        }, {
//            fieldLabel: 'EnName',
//            name: 'EnName'
//        }, {
//            fieldLabel: 'Location',
//            name: 'Location'
//        }, {
//            fieldLabel: 'Type',
//            name: 'Type'
//        }, {
//            fieldLabel: 'Code',
//            name: 'Code'
//        }, {
//            fieldLabel: 'IsDeleted',
//            name: 'IsDeleted'
//        }, {
//            fieldLabel: 'Remark',
//            name: 'Remark'
//        }, {
//            fieldLabel: 'CreateBy',
//            name: 'CreateBy'
//        }, {
//            fieldLabel: 'CreateDate',
//            name: 'CreateDate'
//        },
//        //{
//        //    xtype: 'button',
//        //    text: 'Edit',
//        //    listeners: {
//        //        //click: 'editOrderDetail'
//        //    }
//        //}, {
//        //    xtype: 'button',
//        //    text: 'Delete',
//        //    listeners: {
//        //        click: 'deleteOrderDetail'
//        //    }
//        //}
//        ],

//    }, {
//        width: 250,
//        xtype: 'form',
//        defaultType: 'displayfield',
//        itemId: 'brandItemId',
//        title: 'Brand',
//        bodyPadding: 10,
//        items: [{
//            fieldLabel: 'Id',
//            name: 'Id'
//        }, {
//            fieldLabel: 'Name',
//            name: 'Name'
//        }, {
//            fieldLabel: 'EnName',
//            name: 'EnName'
//        }, {
//            fieldLabel: 'Location',
//            name: 'Location'
//        }, {
//            fieldLabel: 'Type',
//            name: 'Type'
//        }, {
//            fieldLabel: 'Code',
//            name: 'Code'
//        }, {
//            fieldLabel: 'IsDeleted',
//            name: 'IsDeleted'
//        }, {
//            fieldLabel: 'Remark',
//            name: 'Remark'
//        }, {
//            fieldLabel: 'CreateBy',
//            name: 'CreateBy'
//        }, {
//            fieldLabel: 'CreateDate',
//            name: 'CreateDate'
//        },
//        //{
//        //    xtype: 'button',
//        //    text: 'Edit',
//        //    listeners: {
//        //        //click: 'editOrderDetail'
//        //    }
//        //}, {
//        //    xtype: 'button',
//        //    text: 'Delete',
//        //    listeners: {
//        //        click: 'deleteOrderDetail'
//        //    }
//        //}
//        ],

//    }]

//});