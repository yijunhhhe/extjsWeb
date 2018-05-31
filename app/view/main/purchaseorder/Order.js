var search = Ext.create('Ext.data.Store', {
    fields: [
        { name: 'Type', type: 'string' },
       
    ],

    data: [
         { "Type": "OrderNo", },
         { "Type": "DeliveryAddress", },
         { "Type": "DeliveryDate", },

    ]
    
})

Ext.define("WebAppClassic.view.main.purchaseorder.Order", {
    extend: "Ext.panel.Panel",
    requires: [
             'WebAppClassic.store.OrderStore',
             'WebAppClassic.view.main.purchaseorder.ModifyOrderController',
             'WebAppClassic.view.main.purchaseorder.OrderDetailViewModel'
    ],
    xtype: 'order',
    id: 'orderId',
    viewModel:'orderDetailViewModel',
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
            fieldLabel: 'Search',
            //bind: '{OrderNo}',
        }, {
            xtype: 'combo',
            name: 'Search',
            width:120,
            store: search,
            queryMode: 'local',
            displayField: 'Type',
            valueField: 'Type',
        }, {
            xtype: 'button',
            text: 'AddFilter',
            listeners: {
                click: 'searchOrderAddFilter'
            }
        }, {
            xtype: 'button',
            text: 'Search',
            listeners: {
                click: 'searchOrder'
            }
        }, {
            xtype: 'displayfield',
            name: 'filterTip'
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
            { text: 'DeliveryDate', dataIndex: 'DeliveryDate', flex: 1 },
            { text: 'Status', dataIndex: 'Status', flex: 1 },
            { text: 'PayMethod', dataIndex: 'PayMethod', flex: 1 },
        ],
        listeners: {
            rowclick: function (grid, record, tr, rowIndex, e, eOpts) {
                //console.log(record.data);
                this.getView().up('panel').up('panel').down('#orderDetailGrid').getStore().reload();
                this.getView().up('panel').up('panel').down('#orderDetailGrid').getStore().setAutoLoad(true);
                this.getView().up('panel').up('panel').down('#orderDetailGrid').getStore().filter([
                    { property: 'PurchaseOrderId', value: record.get('Id') },
                    { property:'IsDeleted', value:'false' }]);
                //set up order detail store 
                //filter the store here

            },
        },
    },
    {
        height: 250,
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
        ],
    }]
    
});