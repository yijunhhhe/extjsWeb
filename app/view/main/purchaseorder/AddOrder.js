var orderDetail = Ext.create('Ext.data.Store', {
    fields: [
        { name: 'Id', type: 'string' },
        { name: 'PurchaseOrderId', type: 'string' },
        { name: 'PurchaseOrderNo', type: 'string' },
        { name: 'ProductId', type: 'string' },
        { name: 'OrderQty', type: 'string' },
        { name: 'IsDeleted', type: 'string' },
        { name: 'Remark', type: 'string' },
        { name: 'CreateBy', type: 'string' },
        { name: 'ModifyBy', type: 'string' },
        { name: 'ModifyDate', type: 'string' },
        { name: 'Bacode', type: 'string' },
        { name: 'Name', type: 'string' },
        { name: 'Size', type: 'string' },
        { name: 'Color', type: 'string' },
        { name: 'Code', type: 'string' },
    ],
})


var brand = Ext.create('Ext.data.Store', {
    fields: [
        { name: 'Id', type: 'string' },
        { name: 'Type', type: 'string' },
        { name: 'Name', type: 'string' },
    ],

    filters: [{
        property: 'Type',
        value: 'Brand'
    }],
    proxy: {
        type: 'ajax',
        url: '/Api/Organization/GetAllOrganization',
        actionMethod: 'Get',
        reader: {
            type: 'json',
            rootProperty: 'Data'
        }
    },
})
var dc = Ext.create('Ext.data.Store', {
    fields: [
        { name: 'Id', type: 'string' },
        { name: 'Type', type: 'string' },
        { name: 'Name', type: 'string' },
    ],

    filters: [{
        property: 'Type',
        value: 'Store'
    }],

    proxy: {
        type: 'ajax',
        url: '/Api/Organization/GetAllOrganization',
        actionMethod: 'Get',
        reader: {
            type: 'json',
            rootProperty: 'Data'
        }
    },
})
var factory = Ext.create('Ext.data.Store', {
    fields: [
        { name: 'Id', type: 'string' },
        { name: 'Type', type: 'string' },
        { name: 'Name', type: 'string' },
    ],

    filters: [{
        property: 'Type',
        value: 'Factory'
    }],

    proxy: {
        type: 'ajax',
        url: '/Api/Organization/GetAllOrganization',
        actionMethod: 'Get',
        reader: {
            type: 'json',
            rootProperty: 'Data'
        }
    },
})

var product = Ext.create('Ext.data.Store', {
    fields: [
        { name: 'Id', type: 'string' },
        { name: 'Name', type: 'string' },
    ],
})

var payment = Ext.create('Ext.data.Store', {
    fields: ['Type'],
    data: [
        { "Type": "CASH", },
        { "Type": "TRANSFER", },
    ]
});

Ext.define("WebAppClassic.view.main.purchaseorder.AddOrder", {
    extend: 'Ext.window.Window',
    initComponent: function () {
        this.on('beforeadd', function (me, field) {
            if (!field.allowBlank)
                field.labelSeparator += '<span style="color: rgb(255, 0, 0); padding-left: 2px;">*</span>';
        });
        this.callParent(arguments);
    },
    xtype: 'addorder',
    id: 'addOrderId',
    title: 'Add Order',
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
    layout: 'border',
    height: 600,
    labelWidth: 'auto',
    width: 900,
    items: [
        {

            itemId: 'orderItemId',
            xtype: 'form',
            layout: 'column',
            height: 200,
            bodyPadding: 10,
            region: 'north',
            title: 'Order',
            defaultType: 'textfield',
            defaults: {
                padding: 5
            },
            items: [{
                fieldLabel: 'OrderNo',
                name: 'OrderNo',
                value: 'BPDK170',
                allowBlank: false
            }, {
                xtype: 'combo',
                fieldLabel: 'BrandId',
                name: 'BrandId',
                store: brand,
                queryMode: 'remote',
                displayField: 'Name',
                valueField: 'Id',
                editable: false,
                queryParam: 'query',
                allowBlank: false
            }, {
                xtype: 'combo',
                fieldLabel: 'FactoryId',
                name: 'FactoryId',
                store: factory,
                queryMode: 'remote',
                displayField: 'Name',
                valueField: 'Id',
                editable: false,
                queryParam: 'query',
                allowBlank: false
            }, {
                xtype: 'combo',
                fieldLabel: 'DcId',
                name: 'DcId',
                store: dc,
                queryMode: 'remote',
                displayField: 'Name',
                valueField: 'Id',
                editable: false,
                queryParam: 'query',
                allowBlank: false

            }, {
                xtype: 'datefield',
                fieldLabel: 'DeliveryDate',
                name: 'DeliveryDate',
                format: 'Y-m-d H:i:s',
                value: new Date(),
                minValue: new Date(),
                editable: false,
                allowBlank: false
            }, {
                fieldLabel: 'DeliveryAddress',
                name: 'DeliveryAddress',
                allowBlank: false
            }, {
                xtype: 'combo',
                fieldLabel: 'PayMethod',
                name: 'PayMethod',
                store: payment,
                queryMode: 'local',
                displayField: 'Type',
                valueField: 'Type',
                editable: false,
                //allowBlank: false
            }, ]
        }, {
            itemId: 'orderDetailItemId',
            store: orderDetail,
            xtype: 'form',
            region: 'center',
            bodyPadding: 10,
            height: 300,
            title: 'Order Detail',
            defaultType: 'textfield',
            items: [

            {
                xtype: 'grid',
                scrollable: true,
                height: 250,
                store: orderDetail,
                columns: [
                     { text: 'ProductId', dataIndex: 'ProductId', flex: 1 },
                     { text: 'Bacode', dataIndex: 'Bacode', flex: 1, },
                    { text: 'Code', dataIndex: 'Code', flex: 1, },
                    { text: 'Name', dataIndex: 'Name', flex: 1, },
                    { text: 'OrderQty', dataIndex: 'OrderQty', flex: 1 },
                ],
                listeners: {
                    rowclick: function (grid, record, tr, rowIndex, e, eOpts) {
                        //fill out the form
                        var orderDetail = this.getView().getSelectionModel().getSelected().items[0].data;
                        //console.log(orderDetail);
                        this.getView().up('form').getForm().setValues(orderDetail);
                    },
                },
                buttons: [{
                    text: 'Add',
                    listeners: {
                        click: 'addOrderDetail'
                    }
                }, {
                    text: "Delete",
                    listeners: {
                        click: function () {
                            var store = this.up('form').down('grid').getStore();
                            var index = store.indexOf(this.up('form').down('grid').getView().getSelectionModel().getSelection()[0]);
                            if (index != -1) {
                                this.up('form').down('grid').getView().getStore().removeAt(index);
                            }
                        }
                    }
                }
                ]

            },



            ],



        }, {
            xtype: 'button',
            region: 'south',
            text: 'submit',
            listeners: {
                click: 'actualAddOrder'
            }
        }]
});

