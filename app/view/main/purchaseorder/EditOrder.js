var payMethodCombo = Ext.create('Ext.data.Store', {
    fields: ['PayMethod'],
    data: [
        { "PayMethod": "CASH", },
        { "PayMethod": "TRANSFER", }, 
    ]
});

var statusCombo = Ext.create('Ext.data.Store', {
    fields: ['Status'],
    data: [
        { "Status": "CREATE", },
        { "Status": "PROCESS", },

    ]
});

Ext.define('WebAppClassic.view.main.purchaseorder.EditOrder', {
    extend: 'Ext.window.Window',
    xtype: 'editorder',
    requires: [
        'WebAppClassic.view.main.purchaseorder.ModifyOrderController',
    ],
    id:'editOrderId',
    controller: 'modifyOrderController',
    autoShow:true,
    title: 'Edit Order',
    items: [{
        xtype: 'form',
        padding:10,
        defaultType: 'textfield',
        items: [{
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
            xtype: 'combo',
            fieldLabel: 'PayMethod',
            name: 'PayMethod',
            store: payMethodCombo,
            queryMode: 'local',
            displayField: 'PayMethod',
            valueField: 'PayMethod',      
        }, {
            xtype: 'combo',
            fieldLabel: 'Status',
            name: 'Status',
            store: statusCombo,
            queryMode: 'local',
            displayField: 'Status',
            valueField: 'Status',      
        },  {
            fieldLabel: 'Remark',
            name: 'Remark'
        }, {
            xtype: 'button',
            text: "Edit",
            listeners: {
                click:'actualEditOrder',
            }
        }, {
            xtype: 'button',
            text: "Cancel",
            listeners: {
                click: function () {
                    this.up('window').close();
                },
            }
        }

        ]
    }]

});
