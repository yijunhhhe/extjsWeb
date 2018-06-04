Ext.define('WebAppClassic.view.main.purchaseorder.ProductFilter', {
    extend: 'Ext.window.Window',
    xtype: 'productfilter',
    requires: [
        'WebAppClassic.view.main.purchaseorder.ModifyOrderController',
        'WebAppClassic.view.main.purchaseorder.OrderDetailViewModel',
    ],
    controller: 'modifyOrderController',
    viewModel: {
        type: "orderDetailViewModel"
    },
    autoShow: true,
    closable: true,
    //layout: 'border',
    height: 400,

    width: 300,

    items: [
        {
            xtype: 'form',
            region: 'east',
            width: 300,
            bodyPadding: 10,
            title: 'Product Filter',
            defaultType: 'textfield',
            defaults: {
                anchor: '100%',
            },
            items: [{
                fieldLabel: 'Bacode',
                name: 'Bacode',
            }, {
                fieldLabel: 'Code',
                name: 'Code',
            }, {
                fieldLabel: 'Name',
                name: 'Name',
            }, {
                fieldLabel: 'Color',
                name: 'Color',
            }, {
                fieldLabel: 'Size',
                name: 'Size',
            }, {
                xtype: 'button',
                text: 'Filter',
                listeners: {
                    click: 'productFilter'
                }
            }],
            

        }
    ]
});