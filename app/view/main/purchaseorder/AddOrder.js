var orderDetail = Ext.create('Ext.data.Store', {
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
    width:700,
    items: [{
        itemId:'orderItemId',
        xtype: 'form',
        width: 350,
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
        region: 'east',
        bodyPadding:10,
        width:350,
        title:'Order Detail',
        defaultType: 'textfield',
        items: [{
            xtype: 'combo',
            fieldLabel: 'ProductId',
            store:product,
            name: 'ProductId',
            queryMode: 'remote',
            displayField: 'Name',
            valueField: 'Id',
            queryParam: 'query',
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
        },{
            xtype: 'grid',
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