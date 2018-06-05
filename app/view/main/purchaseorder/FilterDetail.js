var product = Ext.create('Ext.data.Store', {
    fields: [
        { name: 'Id', type: 'string' },
        { name: 'Name', type: 'string' },
        { name: 'Bacode', type: 'string' },
        { name: 'Code', type: 'string'},
        { name: 'Color', type: 'string'},
        { name: 'Size', type: 'string' },
    ],
});

Ext.define('WebAppClassic.view.main.purchaseorder.FilterDetail', {
    extend: 'Ext.window.Window',
    xtype: 'filterdetail',
    id: 'filterDetailId',
    requires: [
        'WebAppClassic.view.main.purchaseorder.ModifyOrderController',
        'WebAppClassic.view.main.purchaseorder.OrderDetailViewModel',
    ],
    controller: 'modifyOrderController',
    viewModel: {
        type: "orderDetailViewModel"
    },
    autoShow: true,
    closable: true,
    //layout: 'border',
    height: 400,
    labelWidth: 'auto',
    width: 700,

    items: [
        {
            xtype: 'grid',
            scrollable: true,
            //height: 100,
            store: product,
            columns: [
                 { text: 'ProductId', dataIndex: 'Id', flex: 1 },
                { text: 'Bacode', dataIndex: 'Bacode', flex: 1, },
                { text: 'Code', dataIndex: 'Code', flex: 1, },
                { text: 'Name', dataIndex: 'Name', flex: 1, },
                { text: 'Color', dataIndex: 'Color', flex: 1, },
                { text: 'Size', dataIndex: 'Size', flex: 1, },
            ],
            buttons: [{
                text: 'Add',
                listeners: {
                    click: function () {
                        //Ext.getCmp('filterDetailId').down('grid').getView().getSelectionModel().getSelected().items[0].data.ProductId;
                        Ext.Msg.prompt('Qty', 'Please enter the qty :', function (btn, text) {
                            if (Ext.getCmp('filterDetailId').down('grid').getSelectionModel().getSelected().items[0] == undefined) {
                                alert('Please select an order');
                                return;
                            }
                            if (btn == 'ok') {
                                if (text == "") {
                                    alert("Please enter a number");
                                    return
                                }
                                //var object = Ext.getCmp('filterDetailId').down('grid').getSelectionModel().getSelected().items[0].data;
                                var store = Ext.getCmp('filterDetailId').down('grid').getStore();
                                var index = store.indexOf(Ext.getCmp('filterDetailId').down('grid').getView().getSelectionModel().getSelection()[0]);
                                var object = store.getAt(index);
                                object.data.OrderQty = text
                                object.data.ProductId = object.data.Id;
                                delete object.data.Id;
                                var a = Ext.getCmp('addOrderId');
                                debugger
                                if (Ext.getCmp('addOrderId') == undefined) {
                                    Ext.getCmp('editOrderId').down('#orderDetailGrid').getStore().add(object)
                                } else if (Ext.getCmp('editOrderId') == undefined) {
                                    Ext.getCmp('addOrderId').down('#orderDetailItemId').down('grid').getStore().add(object);
                                }

                            }
                        });
                    }
                }
            }]
                     
        }
    ]
});