Ext.define('WebAppClassic.store.OrderStore', {
    extend: 'Ext.data.Store',
    requires: [
        'WebAppClassic.model.OrderModel'
    ],
    alias: 'store.orderStore',
    pageSize: 8,
    autoLoad: {start: 0, limit: 8},
    //autoLoad: false,
    model: 'WebAppClassic.model.OrderModel',
     //item per page
    proxy: {
        type: 'ajax',
        url: '/Api/PurchaseOrder/GetPageOrder',
        actionMethod: 'Get',
        reader: {
            type: 'json',
            rootProperty: 'Data',
            totalProperty:'Total',
        }
    },
    
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



//store.load({
//    params: {
//        start: 0,
//        limit: 8
//    }
//});
