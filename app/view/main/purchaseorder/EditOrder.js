var orderDetail = Ext.create('Ext.data.Store', {
    fields: [
        { name: 'ProductId', type: 'string' },
        { name: 'OrderQty', type: 'string' },
        { name: 'Remark', type: 'string' },
        { name: 'CreateBy', type: 'string' },
        { name: 'CreateDate', type: 'string' },
        { name: 'Id', type: 'string' },
        { name: 'IsDeleted', type: 'string' },
        { name: 'ModifyBy', type: 'string' },
        { name: 'ModifyDate', type: 'string' },
        { name: 'PurchaseOrderId', type: 'string' },
        { name: 'PurchaseOrderNo', type: 'string' },
    ],
})

var payMethodCombo = Ext.create('Ext.data.Store', {
    fields: ['PayMethod'],
    data: [
        { "PayMethod": "CASH", },
        { "PayMethod": "TRANSFER", }, 
    ]
});

var statusCombo = Ext.create('Ext.data.Store', {
    fields: ['Status'],
    data: [
        { "Status": "CREATE", },
        { "Status": "PROCESS", },
    ]
});

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

    proxy: {
        type: 'ajax',
        url: '/Api/Product/GetProductAll',
        actionMethod: 'Get',
        reader: {
            type: 'json',
            rootProperty: 'Data'
        }
    },
})

Ext.define('WebAppClassic.view.main.purchaseorder.EditOrder', {
    extend: 'Ext.window.Window',
    xtype: 'editorder',
    requires: [
        'WebAppClassic.view.main.purchaseorder.ModifyOrderController',
    ],
    id:'editOrderId',
    controller: 'modifyOrderController',
    autoShow: true,
    layout: 'border',
    height: 600,
    width:700,
    title: 'Edit Order',
    items: [{
        region:'west',
        xtype: 'form',
        title:'Order',
        bodyPadding: 10,
        width:350,
        defaultType: 'textfield',
        items: [{
            itemId:'BrandItemId',
            xtype: 'combo',
            fieldLabel: 'BrandId',
            name: 'BrandId',
            store: brand,
            queryMode: 'remote',
            displayField: 'Id',
            valueField: 'Id',
            editable: false,
        }, {
            xtype: 'combo',
            fieldLabel: 'FactoryId',
            name: 'FactoryId',
            store: factory,
            queryMode: 'remote',
            displayField: 'Id',
            valueField: 'Id',
            editable: false,
            queryParam: 'query',
        }, {
            xtype: 'combo',
            fieldLabel: 'DcId',
            name: 'DcId',
            store: dc,
            queryMode: 'remote',
            displayField: 'Id',
            valueField: 'Id',
            editable: false,
            queryParam: 'query',
        }, {
            xtype: 'datefield',
            fieldLabel: 'DeliveryDate',
            name: 'DeliveryDate',
            format: 'Y-m-d H:i:s',
            
        }, {
            fieldLabel: 'DeliveryAddress',
            name: 'DeliveryAddress'
        }, {
            xtype: 'combo',
            fieldLabel: 'PayMethod',
            name: 'PayMethod',
            store: payMethodCombo,
            queryMode: 'local',
            displayField: 'PayMethod',
            valueField: 'PayMethod',      
        },  {
            fieldLabel: 'Remark',
            name: 'Remark'
        },
        ]
    }, {
       
        xtype: 'form',
        region: 'east',
        title: 'Order Detail',
        width:350,
        bodyPadding:10,
        items: [
            { 
                xtype: 'combo',
                fieldLabel: 'ProductId',
                store: product,
                name: 'ProductId',
                queryMode: 'remote',
                displayField: 'Id',
                valueField: 'Id',
                editable: false,
                queryParam: 'query',
            }, {
                xtype: 'textfield',
                fieldLabel: 'OrderQty',
                name:'OrderQty',
            }, {
                xtype: 'textfield',
                fieldLabel: 'Remark',
                name:'Remark',
            }, {
                itemId: 'orderDetailGrid',
                xtype: 'grid',
                scrollable: true,
                height:300,
                store: orderDetail,
                columns: [
                    { text: 'ProductId', dataIndex: 'ProductId' },
                    { text: 'OrderQty', dataIndex: 'OrderQty', flex: 1, },
                    { text: 'Remark', dataIndex: 'Remark', flex: 1 },
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
                    text:'Edit',
                    listeners: {
                        click: function () {
                            //get the index of the store
                            var index = this.up('grid').getView().getStore().indexOf(this.up('grid').getView().getSelectionModel().getSelection()[0]);
                            //console.log(this.up('grid').getView().getSelectionModel().getSelection()[0])
                            var orderDetail = this.up('grid').getView().getSelectionModel().getSelected().items[0].data;

                            //get the form value(object)
                            var formValue = this.up('grid').getView().up('form').getForm().getValues();
                            orderDetail.ProductId = formValue.ProductId;
                            orderDetail.OrderQty = formValue.OrderQty;
                            orderDetail.Remark = formValue.Remark;

                            //update the data in store
                            this.up('grid').getView().getStore().removeAt(index);
                            this.up('grid').getView().getStore().insert(index, orderDetail);

                            //clear the form 
                            this.up('grid').getView().up('form').getForm().reset();
                            //all the data now are stored in orderDetailStore
                        }
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
