var orderDetail = Ext.create('WebAppClassic.store.AddOrderStore');
var payMethodCombo = Ext.create('WebAppClassic.store.PayMethod');
var brand = Ext.create('WebAppClassic.store.BrandStore');
var dc = Ext.create('WebAppClassic.store.DcStore');
var factory = Ext.create('WebAppClassic.store.FactoryStore');

Ext.define('WebAppClassic.view.main.purchaseorder.EditOrder', {
    extend: 'Ext.window.Window',
    xtype: 'editorder',
    title:'Edit Order',
    requires: [
        'WebAppClassic.view.main.purchaseorder.ModifyOrderController',
    ],
    id:'editOrderId',
    controller: 'modifyOrderController',
    autoShow: true,
    layout: 'border',
    height: 600,
    width:900,
    title: 'Edit Order',
    items: [
        {
        region:'north',
        xtype: 'form',
        itemId: 'orderItemId',
        title: 'Order',
        layout: 'column',
        defaults:{
            padding: 5
        },
        bodyPadding: 10,
        width:300,
        defaultType: 'textfield',
        items: [{
            itemId:'BrandItemId',
            xtype: 'combo',
            fieldLabel: 'BrandId',
            name: 'BrandId',
            store: brand,
            queryMode: 'remote',
            displayField: 'Name',
            valueField: 'Id',
            editable: false,
            allowBlank:false,
        }, {
            xtype: 'combo',
            itemId: 'FactoryItemId',
            fieldLabel: 'FactoryId',
            name: 'FactoryId',
            store: factory,
            queryMode: 'remote',
            displayField: 'Name',
            valueField: 'Id',
            editable: false,
            queryParam: 'query',
            allowBlank: false,
        }, {
            xtype: 'combo',
            itemId: 'DcItemId',
            fieldLabel: 'DcId',
            name: 'DcId',
            store: dc,
            queryMode: 'remote',
            displayField: 'Name',
            valueField: 'Id',
            editable: false,
            queryParam: 'query',
            allowBlank: false,
        }, {
            xtype: 'datefield',
            fieldLabel: 'DeliveryDate',
            name: 'DeliveryDate',
            format: 'Y-m-d H:i:s',
            allowBlank: false,
            editable: false,
        }, {
            fieldLabel: 'DeliveryAddress',
            name: 'DeliveryAddress',
            allowBlank: false,
        }, {
            xtype: 'combo',
            fieldLabel: 'PayMethod',
            name: 'PayMethod',
            store: payMethodCombo,
            queryMode: 'local',
            displayField: 'PayMethod',
            valueField: 'PayMethod',
            //allowBlank: false,
        },   
        ]
    }, {       
        xtype: 'form',
        region: 'center',
        itemId:'orderDetailItemId',
        title: 'Order Detail',
        bodyPadding:10,
        items: [
            {
                itemId: 'orderDetailGrid',
                xtype: 'grid',
                scrollable: true,
                height:300,
                store: orderDetail,
                columns: [
                     { text: 'ProductId', dataIndex: 'ProductId', flex: 1 },
                     { text: 'Bacode', dataIndex: 'Bacode', flex: 1, },
                    { text: 'Name', dataIndex: 'Name', flex: 1, },
                    { text: 'OrderQty', dataIndex: 'OrderQty', flex: 1 },
                ],
                listeners: {
                    rowclick: function (grid, record, tr, rowIndex, e, eOpts) {
                        //fill out the form
                        var orderDetail = this.getView().getSelectionModel().getSelected().items[0].data;       
                        this.getView().up('form').getForm().setValues(orderDetail);
                    },
                },
                buttons: [{
                    text: 'Add',
                    formBind: true,
                    listeners: {
                        click: function () {
                            var filter = Ext.create({
                                xtype: 'productfilter'
                            });
                        }
                    }
                },
                {
                    text: "Delete",
                    listeners: {
                        click: 'deleteOrderDetail',
                    }
                }],
            }
        ]
    },
    {
        region:'south',
        xtype: 'button',
        region: 'south',
        text: 'submit',
        listeners: {
            click: 'actualEditOrder'
        }
    }
    ]

});


