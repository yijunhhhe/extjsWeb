var product = Ext.create('Ext.data.Store', {
    fields: [
        { name: 'Id', type: 'string' },
        { name: 'Name', type: 'string' },
        { name: 'Bacode', type: 'string' },
        { name: 'Code', type: 'string' },
        { name: 'Color', type: 'string' },
        { name: 'Size', type: 'string' },
    ],
});
Ext.define('WebAppClassic.view.main.purchaseorder.ProductFilter', {
    extend: 'Ext.window.Window',
    xtype: 'productfilter',
    id:'productFilterId',
    requires: [
        'WebAppClassic.view.main.purchaseorder.ModifyOrderController',
        'WebAppClassic.view.main.purchaseorder.OrderDetailViewModel',
    ],
    controller: 'modifyOrderController',
    viewModel: {
        type: "orderDetailViewModel"
    },
    title: 'Product Filter',
    autoShow: true,
    closable: true,
    layout: 'border',
    height: 500,
    width: 1000,
    items: [
        {
            xtype: 'form',
            region: 'west',
            width: 300,
            bodyPadding: 20,
            
            defaultType: 'textfield',
            defaults: {
                anchor: '90%',
            },
            items: [{
                fieldLabel: 'Bacode',
                name: 'Bacode',
            }, {
                fieldLabel: 'Code',
                name: 'Code',
            }, {
                fieldLabel: 'Name',
                name: 'Name',
            }, {
                fieldLabel: 'Color',
                name: 'Color',
            }, {
                fieldLabel: 'Size',
                name: 'Size',
            }, {
                xtype: 'button',
                text: 'Filter',
                listeners: {
                    click: 'productFilter'
                }
            }],
            

        }, {
            xtype: 'grid',
            scrollable: true,
            //height: 100,
            bodyPadding: 10,
            region:'center',
            store: product,
            columns: [
                 //{ text: 'ProductId', dataIndex: 'Id', flex: 1 },
                { text: 'Bacode', dataIndex: 'Bacode', flex: 1, },
                { text: 'Code', dataIndex: 'Code', flex: 1, },
                { text: 'Name', dataIndex: 'Name', flex: 1, },
                { text: 'Color', dataIndex: 'Color', flex: 1, },
                { text: 'Size', dataIndex: 'Size', flex: 1, },
            ],
            buttons: [{
                text: 'Confirm',
                listeners: {
                    click: function () {
                        var count = Ext.create('Ext.form.Panel', {
                            region:'east',
                            title: 'count',
                            bodyPadding:5,
                            width: 150,
                            id:'productFilterCount',
                           // layout:'form',
                            items: [{
                                anchor: '90%',
                                labelWidth:50,
                                xtype: 'numberfield',
                                name: 'Count',
                                fieldLabel: 'Count',
                                allowBlank: false,
                                editable:true,
                                minValue: 0,
                            }, {
                                xtype: "button",
                                text: 'Add',
                                formBind: true,
                                listeners: {
                                    click: function () {
                                        //orderQty
                                        var text = Ext.getCmp('productFilterCount').down('numberfield').getValue();
                                        //get the selected data in product filter and add orderQty in it
                                        var store = Ext.getCmp('productFilterId').down('grid').getStore();
                                        
                                        var index = store.indexOf(Ext.getCmp('productFilterId').down('grid').getView().getSelectionModel().getSelection()[0]);
                                        var object = store.getAt(index);
                                        object.data.OrderQty = text
                                        object.data.ProductId = object.data.Id;
                                        
                                        if (Ext.getCmp('addOrderId') == undefined) {
                                            var store = Ext.getCmp('editOrderId').down('#orderDetailGrid').getStore();
                                            var detailStore = store.getData().items;
                                        } else if (Ext.getCmp('editOrderId') == undefined) {
                                            var store = Ext.getCmp('addOrderId').down('#orderDetailItemId').down('grid').getStore();
                                            var detailStore = store.getData().items;
                                        }
                                        detailStore.forEach(function (element) {
                                            if (element.data.ProductId == object.data.ProductId) {
                                                var qty = element.data.OrderQty + object.data.OrderQty
                                                object.data.OrderQty = qty;
                                                var index = store.indexOfId(element.data.id);
                                                store.removeAt(index);
                                                debugger
                                            }
                                        });

                                        if (Ext.getCmp('addOrderId') == undefined) {
                                            Ext.getCmp('editOrderId').down('#orderDetailGrid').getStore().add(object)
                                            Ext.getCmp('productFilterId').destroy();
                                        } else if (Ext.getCmp('editOrderId') == undefined) {
                                            Ext.getCmp('addOrderId').down('#orderDetailItemId').down('grid').getStore().add(object);
                                            Ext.getCmp('productFilterId').destroy();
                                        }
                                    }
                                }
                            }]
                        });

                        Ext.getCmp('productFilterId').insert(1, count);
                        
                    }
                }
            }]

        }
    ]
});