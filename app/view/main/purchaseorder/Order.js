var search = Ext.create('Ext.data.Store', {
    fields: [
        { name: 'Type', type: 'string' },
       
    ],

    data: [
         { "Type": "OrderNo", },
         { "Type": "DeliveryAddress", },
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
            text: 'Search',
            listeners: {
                click: 'searchOrder'
            }
        }, {
            xtype: 'button',
            text: 'AddFilter',
            listeners: {
                click: 'searchOrderAddFilter'
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
            { text: 'Count', dataIndex: 'Remark', flex: 1 },
            { text: 'DeliveryAddress', dataIndex: 'DeliveryAddress', flex: 1, },
            { text: 'DeliveryDate', dataIndex: 'DeliveryDate', flex: 1 },
            { text: 'Status', dataIndex: 'Status', flex: 1 },
            
            
        ],
        listeners: {
            rowclick: function (grid, record, tr, rowIndex, e, eOpts) {
                
                var viewData = this.getView().getSelectionModel().getSelected().items[0].data;
                var thisView = this.getView();
                
                Ext.Ajax.request({
                    method: 'GET',
                    url: '/Api/PurchaseOrderDetail/SearchPurchaseOrderDetail?id='+ viewData.Id+'&code=a',
                    headers: { 'Content-Type': 'application/json' },
                   // params: JSON.stringify(order),
                    dataType: 'json',
                    success: function (Result) {
                        var data = Ext.decode(Result.responseText);
                        //console.log(Result);
                        if (data.IsSuccess == true) {
                            //console.log(data.Data);
                            Ext.getCmp('orderId').down('#orderDetailGrid').getStore().setData(data.Data);
                            
                            //Ext.getCmp('orderId').down('grid').getStore().reload();
                            //thisView.destroy();
                        } else {
                            alert(data.ErrorMessage);
                        }
                    }
                });


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
            { text: 'ProductId', dataIndex: 'ProductId', flex: 1 },
            { text: 'Bacode', dataIndex: 'Bacode', flex: 1 },
            { text: 'Name', dataIndex: 'Name', flex: 1 },
            { text: 'Size', dataIndex: 'Size', flex: 1 },
            { text: 'OrderQty', dataIndex: 'OrderQty', flex: 1 },
        ],
    }]
    
});