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
        url: '/Api/PurchaseOrder/GetAllOrder',
        actionMethod: 'Get',
        reader: {
            type: 'json',
            rootProperty:'data'
        }
    }
});