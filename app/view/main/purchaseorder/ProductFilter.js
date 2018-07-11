var product = orderDetailStore = Ext.create('WebAppClassic.store.ProductFilterStore');

Ext.define('WebAppClassic.view.main.purchaseorder.ProductFilter', {
    extend: 'Ext.window.Window',
    xtype: 'productfilter',
    id:'productFilterId',
    requires: [
        'WebAppClassic.view.main.purchaseorder.ModifyOrderController',
        'WebAppClassic.view.main.purchaseorder.OrderDetailViewModel',
    ],
    controller: 'modifyOrderController',
    viewModel: {
        type: "orderDetailViewModel"
    },
    title: 'Product Filter',
    autoShow: true,
    closable: true,
    layout: 'border',
    height: 500,
    width: 1000,
    items: [
        {
            xtype: 'form',
            region: 'west',
            width: 300,
            bodyPadding: 20,
            
            defaultType: 'textfield',
            defaults: {
                anchor: '90%',
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
        }, {
            xtype: 'grid',
            scrollable: true,
            bodyPadding: 10,
            region:'center',
            store: product,
            columns: [
                { text: 'ProductId', dataIndex: 'Id', flex: 1 },
                { text: 'Bacode', dataIndex: 'Bacode', flex: 1, },
                { text: 'Code', dataIndex: 'Code', flex: 1, },
                { text: 'Name', dataIndex: 'Name', flex: 1, },
                { text: 'Color', dataIndex: 'Color', flex: 1, },
                { text: 'Size', dataIndex: 'Size', flex: 1, },
            ],
            buttons: [{
                text: 'Confirm',
                listeners: {
                    click: 'productFilterConfirmClick',
                }
            }]
        }
    ]
});