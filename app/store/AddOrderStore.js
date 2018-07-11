Ext.define('WebAppClassic.store.AddOrderStore', {
    extend: 'Ext.data.Store',
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
});

Ext.define('WebAppClassic.store.FactoryStore', {
    extend: 'Ext.data.Store',
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
});

Ext.define('WebAppClassic.store.DcStore', {
    extend: 'Ext.data.Store',
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
});

Ext.define('WebAppClassic.store.BrandStore', {
    extend: 'Ext.data.Store',
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
});

Ext.define('WebAppClassic.store.Payment', {
    extend: 'Ext.data.Store',
    fields: ['Type'],
    data: [
        { "Type": "CASH", },
        { "Type": "TRANSFER", },
    ]
});

Ext.define('WebAppClassic.store.PayMethod', {
    extend: 'Ext.data.Store',
    fields: ['PayMethod'],
    data: [
        { "PayMethod": "CASH", },
        { "PayMethod": "TRANSFER", },
    ]
});

