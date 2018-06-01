var orderDetail = Ext.create('Ext.data.Store', {
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
    ],
})


var brand = Ext.create('Ext.data.Store', {
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
})
var dc = Ext.create('Ext.data.Store', {
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
})
var factory = Ext.create('Ext.data.Store', {
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
})

var product = Ext.create('Ext.data.Store', {
    fields: [
        { name: 'Id', type: 'string' },
        { name: 'Name', type: 'string' },
    ],

    //proxy: {
    //    type: 'ajax',
    //    url: '/Api/Product/GetProductAll',
    //    actionMethod: 'Get',
    //    reader: {
    //        type: 'json',
    //        rootProperty: 'Data'
    //    }
    //},

})

var payment = Ext.create('Ext.data.Store', {
    fields: ['Type'],
    data: [
        { "Type": "CASH", },
        { "Type": "TRANSFER", },     
    ]
});




Ext.define("WebAppClassic.view.main.purchaseorder.AddOrder", {
    extend: 'Ext.window.Window',
    xtype: 'addorder',
    id:'addOrderId',
    requires: [
        'WebAppClassic.view.main.purchaseorder.ModifyOrderController',
        'WebAppClassic.view.main.purchaseorder.OrderDetailViewModel',
    ],
    controller: 'modifyOrderController',
    viewModel:{
        type:"orderDetailViewModel"
    },
    autoShow: true,
    closable: true,
    layout: 'border',
    height: 600,
    labelWidth:'auto',
    width:900,
    items: [{
        xtype: 'form',
        region: 'east',
        width: 250,
        bodyPadding: 10,
        title:'Product Filter',
        defaultType: 'textfield',
        defaults:{
           // width: 200,
            anchor:'100%',
        },
        collapsible: true,
        items: [{
            fieldLabel: 'Bacode',
            name: 'Bacode',
        }, {
            fieldLabel: 'Code',
            name:'Code',
        }, {
            fieldLabel: 'Name',
            name: 'Name',
        }, {
            fieldLabel: 'Color',
            name: 'Color',
        }, {
            fieldLabel: 'Size',
            name: 'Size',
        },{
            xtype: 'button',
            text: 'Filter',
            listeners: {
                click: 'addFilter'
            }
        }],
    },
        {
        itemId:'orderItemId',
        xtype: 'form',
        width: 300,
        bodyPadding:10,
        region:'west',
        title:'Order',
        defaultType: 'textfield',
        items: [{
            fieldLabel: 'OrderNo',
            name:'OrderNo'
        }, {
            xtype: 'combo',
            fieldLabel: 'BrandId',
            name: 'BrandId',
            store: brand,
            queryMode: 'remote',
            displayField: 'Name',
            valueField: 'Id',
            editable: false,
            queryParam: 'query',  
        }, {
            xtype: 'combo',
            fieldLabel: 'FactoryId',
            name: 'FactoryId',
            store: factory,
            queryMode: 'remote',
            displayField: 'Name',
            valueField: 'Id',
            editable: false,
            queryParam: 'query',
        }, {
            xtype: 'combo',
            fieldLabel: 'DcId',
            name: 'DcId',
            store: dc,
            queryMode: 'remote',
            displayField: 'Name',
            valueField: 'Id',
            editable: false,
            queryParam: 'query',

        }, {
            xtype:'datefield',
            fieldLabel: 'DeliveryDate',
            name: 'DeliveryDate',
            format: 'Y-m-d H:i:s',
            value: new Date()
        }, {
            fieldLabel: 'DeliveryAddress',
            name: 'DeliveryAddress'
        }, {
            xtype: 'combo',
            fieldLabel: 'PayMethod',
            name: 'PayMethod',
            store: payment,
            queryMode: 'local',
            displayField: 'Type',
            valueField: 'Type',
            editable: false,

        }, {
            fieldLabel: 'Remark',
            name: 'Remark'
        }, ]
    }, {
        itemId: 'orderDetailItemId',
        store: orderDetail,     
        xtype: 'form',
        region: 'center',
        bodyPadding:10,
        
        title:'Order Detail',
        defaultType: 'textfield',
        items: [{
            xtype: 'combo',
            fieldLabel: 'ProductId',
            store:product,
            name: 'ProductId',
            queryMode: 'local',
            displayField: 'Name',
            valueField: 'Id',
            allowBlank:false
        }, {
            fieldLabel: 'OrderQty',
            name: 'OrderQty'
        }, {
            fieldLabel: 'Remark',
            name: 'Remark'
        }, {
            xtype: 'button',
            text: 'Add',
            formBind: true,
            listeners: {
                click:'addOrderDetail'
            }
        }, {
            xtype: 'button',
            text: 'Edit',
            listeners: {
                        click: function () {
                            //get the index of the store
                            var index = this.up('form').down('grid').getView().getStore().indexOf(this.up('form').down('grid').getView().getSelectionModel().getSelection()[0]);
                            //console.log(this.up('grid').getView().getSelectionModel().getSelection()[0])
                            var orderDetail = this.up('form').down('grid').getView().getSelectionModel().getSelected().items[0].data;
                            var model = this.up('window').getViewModel().data.detail
                            //get the form value(object)
                            var formValue = this.up('form').getForm().getValues();
                            orderDetail.ProductId = formValue.ProductId;
                            orderDetail.OrderQty = formValue.OrderQty;
                            orderDetail.Remark = formValue.Remark;

                            //update the data in store
                            this.up('form').down('grid').getView().getStore().removeAt(index);
                            this.up('form').down('grid').getView().getStore().insert(index, orderDetail);
                            model[index] = orderDetail;
                            this.up('window').getViewModel().data.detail = model
                            //clear the form 
                            this.up('form').down('grid').getView().up('form').getForm().reset();
                            //all the data now are stored in orderDetailStore
                        }
                    }
        },
        {
            xtype: 'button',
            text: 'Delete',
            listeners: {
                click: function () {
                    var store = this.up('form').down('grid').getStore();
                    var index = store.indexOf(this.up('form').down('grid').getView().getSelectionModel().getSelection()[0]);
                    if (index != -1) {
                        this.up('form').down('grid').getView().getStore().removeAt(index);
                        this.up('window').getViewModel().data.detail.splice(index, 1);
                    }
                }
            }
        }, {
            xtype: 'grid',
            scrollable: true,
            height: 300,
            store: orderDetail,
            columns: [
                 { text: 'ProductId', dataIndex: 'ProductId',flex: 1 },
                { text: 'OrderQty', dataIndex: 'OrderQty', flex: 0, },
            ],
            listeners: {
                rowclick: function (grid, record, tr, rowIndex, e, eOpts) {
                    //fill out the form
                    var orderDetail = this.getView().getSelectionModel().getSelected().items[0].data;
                    //console.log(orderDetail);
                    this.getView().up('form').getForm().setValues(orderDetail);



                },
            },
    
    }],



    }, {
        xtype: 'button',
        region:'south',
        text: 'submit',
        listeners: {
            click:'actualAddOrder'
        }
    }]
});