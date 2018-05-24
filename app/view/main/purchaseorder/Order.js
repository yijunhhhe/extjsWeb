Ext.define("WebAppClassic.view.main.purchaseorder.Order", {
    extend: "Ext.grid.Panel",
    xtype:'order',
    requires: [
        'WebAppClassic.store.OrderStore',
        'WebAppClassic.view.main.purchaseorder.ModifyOrderController',
       // 'WebAppClassic.view.main.purchaseorder.DetailOrder',
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
                click:'detailOrder'
            }
        }, {
            xtype: 'button',
            text: 'Edit',
            listeners: {
                //click:''
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
        { text: 'BrandId', dataIndex: 'BrandId', flex: 1, },
        { text: 'FactoryId', dataIndex: 'FactoryId', flex: 1 },
        { text: 'DcId', dataIndex:'DcId', flex: 1}
    ]
});