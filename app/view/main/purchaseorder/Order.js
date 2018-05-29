Ext.define("WebAppClassic.view.main.purchaseorder.Order", {
    extend: "Ext.panel.Panel",
    requires: [
             'WebAppClassic.store.OrderStore',
             'WebAppClassic.view.main.purchaseorder.ModifyOrderController',
    ],
    xtype: 'order',
    id:'orderId',
    controller: 'modifyOrderController',
    scrollable:true,
    layout:'border',
    height:650,
    items: [{
        region:'center',
        scrollable: true,
        store: {
            type: 'orderStore'
        },
        xtype: 'grid',
        tbar: [
        {
            itemId: 'searchName',
            xtype: 'textfield',
            name: 'orderno',
            fieldLabel: 'Search by OrderNo',
            //bind: '{OrderNo}',
        }, {
            xtype: 'button',
            text: 'Search',
            listeners: {
                click: 'searchOrder'
            }
        }, {
            xtype: 'tbfill'
        }, {
            xtype: 'button',
            text: 'Add',
            listeners: {
                click: 'addOrder'
            }
        }, {
            xtype: 'button',
            text: 'Detail',
            listeners: {
                click: 'orderDetail'
            }
        }, {
            xtype: 'button',
            text: 'Edit',
            listeners: {
                click: 'editOrder'
            }
        }, {
            xtype: 'button',
            text: 'Delete',
            listeners: {
                click: 'deleteOrder'
            }
        }
        ],
        columns: [
            { text: 'OrderNo', dataIndex: 'OrderNo' },
            { text: 'DeliveryAddress', dataIndex: 'DeliveryAddress', flex: 1, },
            { text: 'PayMethod', dataIndex: 'PayMethod', flex: 1 },
            { text: 'Status', dataIndex: 'Status', flex: 1 },
            { text: 'IsDeleted', dataIndex: 'IsDeleted', flex: 1 },
        ],
        listeners: {
            rowclick: function (grid, record, tr, rowIndex, e, eOpts) {
                //console.log(record.data);
                this.getView().up('panel').up('panel').down('#orderDetailGrid').getStore().setAutoLoad(true);
                console.log(this.getView().up('panel').up('panel').down('#orderDetailGrid').getStore().filter('PurchaseOrderId',record.get('Id')));
                //set up order detail store 
                //filter the store here

            },
            refresh: function (page, eOpts) {
                alert("ASf");
            }
        },

    },
    //{
    //    xtype: 'form',
    //    region: 'south',
    //    height:100,
    //    defaultType: 'displayfield',
    //    bodyPadding: 10,
    //    items: [{
    //        fieldLabel: 'PurchaseOrderId',
    //        name: 'PurchaseOrderId'
    //    }, {
    //        fieldLabel: 'PurchaseOrderNo',
    //        name: 'PurchaseOrderNo'
    //    }, {
    //        fieldLabel: 'ProductId',
    //        name: 'ProductId'
    //    }, {
    //        fieldLabel: 'OrderQty',
    //        name: 'OrderQty'
    //    }, {
            
    //    }],
        
    //},
    {
        height: 200,
        maxHeight:400,
        itemId:'orderDetailGrid',
        title:'orderDetail',
        region:'south',
        xtype:'grid',

        store: {
            type: 'orderDetailStore'
        },
        columns:[
            { text: 'PurchaseOrderId', dataIndex: 'PurchaseOrderId' },
            { text: 'PurchaseOrderNo', dataIndex: 'PurchaseOrderNo', flex: 1, },
            { text: 'ProductId', dataIndex: 'ProductId', flex: 1 },
            { text: 'OrderQty', dataIndex: 'OrderQty', flex: 1 },
            { text: 'IsDeleted', dataIndex: 'IsDeleted', flex: 1 },
        ],
    }]
    
});