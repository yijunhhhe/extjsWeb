Ext.define("WebAppClassic.view.main.purchaseorder.AddOrder", {
    extend: 'Ext.window.Window',
    xtype: 'addorder',
    id:'addOrderId',
    requires: [
        'WebAppClassic.view.main.purchaseorder.ModifyOrderController'
    ],
    controller: 'modifyOrderController',
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
            fieldLabel: 'BrandId',
            name: 'BrandId'
        }, {
            fieldLabel: 'FactoryId',
            name: 'FactoryId'
        }, {
            fieldLabel: 'DcId',
            name: 'DcId'
        }, {
            fieldLabel: 'DeliveryDate',
            name: 'DeliveryDate'
        }, {
            fieldLabel: 'DeliveryAddress',
            name: 'DeliveryAddress'
        }, {
            fieldLabel: 'PayMethod',
            name: 'PayMethod'
        }, {
            fieldLabel: 'Status',
            name: 'Status'
        }, {
            fieldLabel: 'Remark',
            name: 'Remark'
        }, ]
    }, {
        itemId:'orderDetailItemId',
        xtype: 'form',
        region: 'east',
        bodyPadding:10,
        width:350,
        title:'Order Detail',
        defaultType: 'textfield',
        items: [{
            fieldLabel: 'ProductId',
            name:'ProductId'
        }, {
            fieldLabel: 'OrderQty',
            name: 'OrderQty'
        }, {
            fieldLabel: 'Remark',
            name: 'Remark'
        }, ]

    }, {
        xtype: 'button',
        region:'south',
        text: 'submit',
        listeners: {
            click:'actualAddOrder'
        }
    }]
});