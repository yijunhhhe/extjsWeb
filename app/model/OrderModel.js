Ext.define("WebAppClassic.model.OrderModel", {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'Id', type:'string'},
        { name: 'OrderNo', type: 'string' },
        { name: 'BrandId', type: 'string' },
        { name: 'FactoryId', type: 'string' },
        { name: 'DcId', type: 'string' },
        { name: 'DeliveryDate', type: 'string' },
        { name: 'DeliveryAddress', type: 'string' },
        { name: 'PayMethod', type: 'string' },
        { name: 'Status', type: 'string' },
        { name: 'IsDeleted', type: 'string' },
        { name: 'Remark', type: 'string' },
        { name: 'CreateBy', type: 'string' },
        { name: 'CreateDate', type: 'string' },
        { name: 'ModifyBy', type: 'string' },
        { name: 'ModifyDate', type: 'string' },
    ]
})