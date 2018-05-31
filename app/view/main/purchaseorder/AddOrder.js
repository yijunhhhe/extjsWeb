﻿var orderDetail = Ext.create('Ext.data.Store', {
    fields: [
        { name: 'ProductId', type: 'string' },
        { name: 'OrderQty', type: 'string' },
        { name: 'Remark', type: 'string' },
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

    //proxy: {
    //    type: 'ajax',
    //    url: '/Api/Product/GetProductAll',
    //    actionMethod: 'Get',
    //    reader: {
    //        type: 'json',
    //        rootProperty: 'Data'
    //    }
    //},

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
    xtype: 'addorder',
    id:'addOrderId',
    requires: [
        'WebAppClassic.view.main.purchaseorder.ModifyOrderController',
        'WebAppClassic.view.main.purchaseorder.OrderDetailViewModel',
    ],
    controller: 'modifyOrderController',
    viewModel:{
        type:"orderDetailViewModel"
    },
    autoShow: true,
    closable: true,
    layout: 'border',
    height: 600,
    labelWidth:'auto',
    width:900,
    items: [{
        xtype: 'form',
        region: 'east',
        width: 250,
        bodyPadding: 10,
        title:'Filter',
        defaultType: 'textfield',
        defaults:{
           // width: 200,
            anchor:'100%',
        },
        collapsible: true,
        items: [{
            fieldLabel: 'Bacode',
            name: 'Bacode',
        }, {
            fieldLabel: 'Code',
            name:'Code',
        }, {
            fieldLabel: 'Name',
            name: 'Name',
        }, {
            fieldLabel: 'Color',
            name: 'Color',
        }, {
            fieldLabel: 'Size',
            name: 'Size',
        },{
            xtype: 'button',
            text: 'Filter',
            listeners: {
                click: 'addFilter'
            }
        }],
    },
        {
        itemId:'orderItemId',
        xtype: 'form',
        width: 300,
        bodyPadding:10,
        region:'west',
        title:'Order',
        defaultType: 'textfield',
        items: [{
            fieldLabel: 'OrderNo',
            name:'OrderNo'
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

        }, {
            xtype:'datefield',
            fieldLabel: 'DeliveryDate',
            name: 'DeliveryDate',
            format: 'Y-m-d H:i:s',
            value: new Date()
        }, {
            fieldLabel: 'DeliveryAddress',
            name: 'DeliveryAddress'
        }, {
            xtype: 'combo',
            fieldLabel: 'PayMethod',
            name: 'PayMethod',
            store: payment,
            queryMode: 'local',
            displayField: 'Type',
            valueField: 'Type',
            editable: false,

        }, {
            fieldLabel: 'Remark',
            name: 'Remark'
        }, ]
    }, {
        itemId: 'orderDetailItemId',
        store: orderDetail,     
        xtype: 'form',
        region: 'center',
        bodyPadding:10,
        
        title:'Order Detail',
        defaultType: 'textfield',
        items: [{
            xtype: 'combo',
            fieldLabel: 'ProductId',
            store:product,
            name: 'ProductId',
            queryMode: 'local',
            displayField: 'Name',
            valueField: 'Id',
        }, {
            fieldLabel: 'OrderQty',
            name: 'OrderQty'
        }, {
            fieldLabel: 'Remark',
            name: 'Remark'
        }, {
            xtype: 'button',
            text: 'Add',
            listeners: {
                click:'addOrderDetail'
            }
        }, {
            xtype: 'button',
            text: 'Delete',
            listeners: {
                click: function () {
                    var store = this.up('form').down('grid').getStore();
                    var index = store.indexOf(this.up('form').down('grid').getView().getSelectionModel().getSelection()[0]);
                    if (index != -1) {
                        this.up('form').down('grid').getView().getStore().removeAt(index);
                        this.up('window').getViewModel().data.detail.splice(index, 1);
                    }
                }
            }
        }, {
            xtype: 'grid',
            scrollable: true,
            height: 300,
            store: orderDetail,
            columns: [
                 { text: 'ProductId', dataIndex: 'ProductId' },
                { text: 'OrderQty', dataIndex: 'OrderQty', flex: 1, },
                { text: 'Remark', dataIndex: 'Remark', flex: 1 },
            ]
    
    }],



    }, {
        xtype: 'button',
        region:'south',
        text: 'submit',
        listeners: {
            click:'actualAddOrder'
        }
    }]
});