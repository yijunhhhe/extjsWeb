Ext.define("WebAppClassic.view.main.purchaseorder.Order", {
    extend: "Ext.grid.Panel",
    xtype: 'order',
    id:'orderId',
    requires: [
        'WebAppClassic.store.OrderStore',
        'WebAppClassic.view.main.purchaseorder.ModifyOrderController',
       // 'WebAppClassic.view.main.purchaseorder.OrderDetail',
    ],
    controller: 'modifyOrderController',
    //viewController: '',
    store: {
        type: 'orderStore'
    },
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
            xtype:'tbfill'
        }, {
            xtype: 'button',
            text: 'Detail',
            listeners: {
                click:'orderDetail'
            }
        }, {
            xtype: 'button',
            text: 'Edit',
            listeners: {
                click:'editOrder'
            }
        }, {
            xtype: 'button',
            text: 'Delete',
            listeners: {
                //click:''
            }
        }
    ],
    columns: [
        { text: 'OrderNo', dataIndex: 'OrderNo' },
        { text: 'DeliveryAddress', dataIndex: 'DeliveryAddress', flex: 1, },
        { text: 'PayMethod', dataIndex: 'PayMethod', flex: 1 },
        { text: 'Status', dataIndex: 'Status', flex: 1 }
    ]
});