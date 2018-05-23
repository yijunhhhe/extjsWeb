Ext.define("WebAppClassic.view.main.purchaseorder.Order", {
    extend: "Ext.grid.Panel",
    xtype:'order',
    requires: [
        'WebAppClassic.store.OrderStore',
    ],
    //Controller: '',
    //viewController: '',
    store: {
        type: 'orderStore'
    },
    tbar: [
        {
            xtype: 'textfield', 
            name: 'orderno',
            fieldLabel: 'Search by OrderNo',
            //bind: '{OrderNo}',
        }, {
            xtype: 'button',
            text: 'Search',
            listners: {
                //click:''
            }
        }, {
            xtype:'tbfill'
        }, {
            xtype: 'button',
            text: 'Add',
            listeners: {
                //click:''
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