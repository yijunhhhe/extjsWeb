var orderDetail = Ext.create('Ext.data.Store', {
    fields: [
        { name: 'ProductId', type: 'string' },
        { name: 'OrderQty', type: 'string' },
        { name: 'Remark', type: 'string' },
    ],
})

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
    autoShow: true,
    layout: 'border',
    height: 600,
    width:700,
    title: 'Edit Order',
    items: [{
        region:'west',
        xtype: 'form',
        title:'Order',
        bodyPadding: 10,
        width:350,
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
            xtype: 'datefield',
            fieldLabel: 'DeliveryDate',
            name: 'DeliveryDate',
            anchor: '100%',
            value: new Date()
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
        },
        //{
        //    xtype: 'button',
        //    text: "Edit",
        //    listeners: {
        //        click:'actualEditOrder',
        //    }
        //}, {
        //    xtype: 'button',
        //    text: "Cancel",
        //    listeners: {
        //        click: function () {
        //            this.up('window').close();
        //        },
        //    }
        //}

        ]
    }, {
       
        xtype: 'form',
        region: 'east',
        title: 'Order Detail',
        width:350,
        bodyPadding:10,
        items: [
            { 
                xtype: 'combo',
                fieldLabel: 'ProductId',
                name: 'ProductId',
                //store: ,
                queryMode: 'local',
                //displayField: 'Status',
                //valueField: 'Status',      
            }, {
                xtype: 'textfield',
                fieldLabel: 'OrderQty',
                name:'OrderQty',
            }, {
                xtype: 'textfield',
                fieldLabel: 'Remark',
                name:'Remark',
            }, {
                itemId: 'orderDetailGrid',
                xtype: 'grid',
                store: orderDetail,
                columns: [
                    { text: 'ProductId', dataIndex: 'ProductId' },
                    { text: 'OrderQty', dataIndex: 'OrderQty', flex: 1, },
                    { text: 'Remark', dataIndex: 'Remark', flex: 1 },
                ]
            }
        ]
    },
    {
        region:'south',
        xtype: 'button',
        region: 'south',
        text: 'submit',
        listeners: {
            click: 'actualAddOrder'
        }
    }
    ]

});
