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
                { text: 'ProductId', dataIndex: 'Id', flex: 1 },
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
                        if (Ext.getCmp('productFilterId').down('grid').getSelectionModel().getSelected().items.length == 0) {
                            alert('Please select a product');
                            return
                        }
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
                                minValue: 1,
                            }, {
                                xtype: "button",
                                text: 'Add',
                                formBind: true,
                                listeners: {
                                    click: function () {
                                        //orderQty
                                        var text = parseInt(Ext.getCmp('productFilterCount').down('numberfield').getValue());
                                        if (text < 1) {
                                            alert('number needed to be bigger than 0');
                                        }
                                        //selected product 
                                        var selected = Ext.getCmp('productFilterId').down('grid').getSelectionModel().getSelected().items[0].data;
                                       
                                        //get order info
                                       
                                        var newOrderDetail = {};
                                        
                                        //object.OrderQty = text
                                        //object.ProductId = object.Id;
                                        if (Ext.getCmp('addOrderId') == undefined) {
                                            var order = Ext.getCmp('editOrderId').down('#orderItemId').getForm().getValues();
                                            var editStore = Ext.getCmp('editOrderId').down('#orderDetailGrid').getStore();                                         
                                            var detailStore = editStore.getData().items;
                                            if (detailStore.length == 0) {
                                                var newOrderDetail = {
                                                    PurchaseOrderNo: order.PurchaseOrderNo, ProductId: selected.Id, OrderQty: text, Bacode: selected.Bacode,
                                                    Size: selected.Size, Name: selected.Name, Color: selected.Color, Code: selected.Code
                                                }
                                            }
                                            for (var i = 0; i < detailStore.length; i++) {
                                                if (detailStore[i].data.ProductId == selected.Id) {
                                                    var eleQty = parseInt(detailStore[i].data.OrderQty);
                                                    var qty = eleQty + text;
                                                    newOrderDetail = detailStore[i].data
                                                    newOrderDetail.OrderQty = qty;
                                                    var index = editStore.indexOfId(detailStore[i].data.id);
                                                    editStore.removeAt(index);
                                                } else {
                                                    var newOrderDetail = {
                                                        PurchaseOrderNo: order.PurchaseOrderNo, ProductId: selected.Id, OrderQty: text, Bacode: selected.Bacode,
                                                        Size: selected.Size, Name: selected.Name, Color: selected.Color, Code: selected.Code
                                                    }
                                                }
                                            }
                                            
                                        } else if (Ext.getCmp('editOrderId') == undefined) {
                                            var order = Ext.getCmp('addOrderId').down('#orderItemId').getForm().getValues();
                                            var addStore = Ext.getCmp('addOrderId').down('#orderDetailItemId').down('grid').getStore();
                                            var detailStore = addStore.getData().items;
                                            if (detailStore.length == 0) {
                                                newOrderDetail = {
                                                    PurchaseOrderNo: order.PurchaseOrderNo, ProductId: selected.Id, OrderQty: text, Bacode: selected.Bacode,
                                                    Size: selected.Size, Name: selected.Name, Color: selected.Color, Code: selected.Code
                                                }
                                            }
                                            for (var i = 0; i < detailStore.length; i++) {
                                                if (detailStore[i].data.ProductId == selected.Id) {
                                                    var eleQty = parseInt(detailStore[i].data.OrderQty);
                                                    var qty = eleQty + text;
                                                    newOrderDetail = detailStore[i].data
                                                    newOrderDetail.OrderQty = qty;
                                                    var index = addStore.indexOfId(detailStore[i].data.id);
                                                    addStore.removeAt(index);
                                                    
                                                } else {
                                                    var newOrderDetail = {
                                                        PurchaseOrderNo: order.PurchaseOrderNo, ProductId: selected.Id, OrderQty: text, Bacode: selected.Bacode,
                                                        Size: selected.Size, Name: selected.Name, Color: selected.Color, Code: selected.Code
                                                    }
                                                }
                                            }
                                            
                                        }
                                      
                                        
                                        if (Ext.getCmp('addOrderId') == undefined) {
                                            Ext.getCmp('editOrderId').down('#orderDetailGrid').getStore().add(newOrderDetail)
                                            Ext.getCmp('productFilterId').destroy();
                                        } else if (Ext.getCmp('editOrderId') == undefined) {
                                            Ext.getCmp('addOrderId').down('#orderDetailItemId').down('grid').getStore().add(newOrderDetail);
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