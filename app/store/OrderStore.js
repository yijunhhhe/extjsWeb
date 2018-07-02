Ext.define('WebAppClassic.store.OrderStore', {
    extend: 'Ext.data.Store',
    requires: [
        'WebAppClassic.model.OrderModel'
    ],
    alias: 'store.orderStore',
    autoLoad: true,
    model: 'WebAppClassic.model.OrderModel',

    proxy: {
        type: 'ajax',
        url: '/Api/PurchaseOrder/InitialGetPageOrder?page=1&&itemNum=8',
        actionMethod: 'Get',
        reader: {
            type: 'json',
            rootProperty:'data'
        }
    }
});

Ext.define('WebAppClassic.store.OrderDetailStore', {
    extend: 'Ext.data.Store',
    requires: [
        'WebAppClassic.model.OrderModel'
    ],
    alias: 'store.orderDetailStore',
    
    //model: 'WebAppClassic.model.OrderModel',

    fields: [
        { name:'Id', type:'string' },
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
        { name: 'Count', type: 'string'}
    ],

    


});