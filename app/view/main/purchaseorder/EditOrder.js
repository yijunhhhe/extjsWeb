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
        { name: 'Code', type: 'string'}
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
    autoLoad: true,
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
        },   
        ]
    }, {       
        xtype: 'form',
        region: 'center',
        itemId:'orderDetailItemId',
        title: 'Order Detail',
        bodyPadding:10,
        items: [
            //{ 
            //    xtype: 'combo',
            //    fieldLabel: 'ProductId',
            //    store: product,
            //    name: 'ProductId',
            //    queryMode: 'local',
            //    displayField: 'Name',
            //    valueField: 'Id',
            //    editable: false,
            //    allowBlank:false,
            //   // queryParam: 'query',
            //}, {
            //    xtype: 'textfield',
            //    fieldLabel: 'OrderQty',
            //    name:'OrderQty',
            //},
            {
                itemId: 'orderDetailGrid',
                xtype: 'grid',
                scrollable: true,
                height:270,
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
                        //console.log(orderDetail);         
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


//{
//    xtype: 'form',
//    region: 'east',
//    width: 250,
//    bodyPadding: 10,
//    title: 'Product Filter',
//    defaultType: 'textfield',
//    defaults: {
//        // width: 200,
//        anchor: '100%',
//    },
//    collapsible: true,
//    items: [{
//        fieldLabel: 'Bacode',
//        name: 'Bacode',
//    }, {
//        fieldLabel: 'Code',
//        name: 'Code',
//    }, {
//        fieldLabel: 'Name',
//        name: 'Name',
//    }, {
//        fieldLabel: 'Color',
//        name: 'Color',
//    }, {
//        fieldLabel: 'Size',
//        name: 'Size',
//    }, {
//        xtype: 'button',
//        text: 'Filter',
//        listeners: {
//            click: 'addFilter'
//        }
//    }],
//},

//{
//    text:'Edit',
//    listeners: {
//        click: function () {
//            //get the index of the store
//            var index = this.up('grid').getView().getStore().indexOf(this.up('grid').getView().getSelectionModel().getSelection()[0]);
//            //console.log(this.up('grid').getView().getSelectionModel().getSelection()[0])
//            var orderDetail = this.up('grid').getView().getSelectionModel().getSelected().items[0].data;

//            //get the form value(object)
//            var formValue = this.up('grid').getView().up('form').getForm().getValues();
//            orderDetail.ProductId = formValue.ProductId;
//            orderDetail.OrderQty = formValue.OrderQty;
//            orderDetail.Remark = formValue.Remark;

//            //update the data in store
//            this.up('grid').getView().getStore().removeAt(index);
//            this.up('grid').getView().getStore().insert(index, orderDetail);

//            //clear the form 
//            this.up('grid').getView().up('form').getForm().reset();
//            //all the data now are stored in orderDetailStore
//        }
//    }
//},