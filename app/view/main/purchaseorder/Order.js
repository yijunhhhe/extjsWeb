var search = Ext.create('Ext.data.Store', {
    fields: [
        { name: 'Type', type: 'string' },

    ],

    data: [
         { "Type": "OrderNo", },
         { "Type": "DeliveryAddress", },
    ]

});

Ext.apply(Ext.form.field.VTypes, {
    daterange: function (val, field) {
        var date = field.parseDate(val);

        if (!date) {
            return false;
        }
        if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
            var start = field.up('form').down('#' + field.startDateField);
            start.setMaxValue(date);
            start.validate();
            this.dateRangeMax = date;
        }
        else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
            var end = field.up('form').down('#' + field.endDateField);
            end.setMinValue(date);
            end.validate();
            this.dateRangeMin = date;
        }
        return true;
    },
    daterangeText: 'Start date must be less than end date'
});

Ext.define("WebAppClassic.view.main.purchaseorder.Order", {
    extend: "Ext.panel.Panel",
    requires: [
             'WebAppClassic.store.OrderStore',
             'WebAppClassic.view.main.purchaseorder.ModifyOrderController',
             'WebAppClassic.view.main.purchaseorder.OrderDetailViewModel'
    ],
    xtype: 'order',
    id: 'orderId',
    viewModel: 'orderDetailViewModel',
    controller: 'modifyOrderController',
    scrollable: true,
    layout: 'border',
    height: 650,
    items: [{
        region: 'center',
        scrollable: true,
        store: {
            type: 'orderStore'
        },
        xtype: 'grid',
        tbar: [{

            xtype: 'form',
            layout: 'column',
            itemId: 'searchForm',
            defaults: {
                labelWidth: 70,
                width: 200,
                margin: '0 5',
            },
            items: [
                {
                    itemId: 'orderNo',
                    xtype: 'textfield',
                    name: 'OrderNo',
                    fieldLabel: 'OrderNo',

                }, {
                    labelWidth: 100,
                    itemId: 'deliveryAddress',
                    xtype: 'textfield',
                    name: 'DeliveryAddress',
                    fieldLabel: 'DeliveryAddress',

                }, {
                    xtype: 'datefield',
                    fieldLabel: 'Start Date',
                    name: 'startDate',
                    id: 'startdt',
                    vtype: 'daterange',
                    format: 'Y-m-d H:i:s',
                    endDateField: 'enddt', // id of the end date field
                    editable: false
                }, {
                    xtype: 'datefield',
                    fieldLabel: 'End Date',
                    name: 'endDate',
                    id: 'enddt',
                    vtype: 'daterange',
                    format: 'Y-m-d H:i:s',
                    startDateField: 'startdt', // id of the start date field
                    editable: false
                }, {
                    width: 80,
                    xtype: 'button',
                    text: 'Search',
                    listeners: {
                        click: 'searchOrder'
                    }
                }, {
                    width: 60,
                    xtype: 'button',
                    text: 'Clear',
                    listeners: {
                        click: function () {
                            this.up('form').getForm().reset();
                            
                        }
                    }
                }, ]
        },
        {
            xtype: 'tbfill'
        }, {
            xtype: 'button',
            text: 'Add',
            listeners: {
                click: 'addOrder'
            }
        }, {
            xtype: 'button',
            text: 'Edit',
            listeners: {
                click: 'editOrder'
            }
        }, {
            xtype: 'button',
            text: 'Delete',
            listeners: {
                click: 'deleteOrder'
            }
        }
        ],
        columns: [
            { text: 'OrderNo', dataIndex: 'OrderNo' },
            { text: 'Count', dataIndex: 'Remark', flex: 1 },
            { text: 'DeliveryAddress', dataIndex: 'DeliveryAddress', flex: 1, },
            { text: 'DeliveryDate', dataIndex: 'DeliveryDate', flex: 1 },
            { text: 'Status', dataIndex: 'Status', flex: 1 },


        ],
        listeners: {
            rowclick: function (grid, record, tr, rowIndex, e, eOpts) {
                var orderView = this.getView();
                var viewData = this.getView().getSelectionModel().getSelected().items[0].data;
                //var thisView = this.getView();

                Ext.Ajax.request({
                    method: 'GET',
                    url: '/Api/PurchaseOrderDetail/SearchPurchaseOrderDetail?id=' + viewData.Id + '&code=a',
                    headers: { 'Content-Type': 'application/json' },
                    // params: JSON.stringify(order),
                    dataType: 'json',
                    success: function (Result) {
                        var data = Ext.decode(Result.responseText);
                        //console.log(Result);
                        if (data.IsSuccess == true) {
                            //console.log(data.Data);
                            Ext.getCmp('orderId').down('#orderDetailGrid').getStore().setData(data.Data);
                            var count = orderView.getSelectionModel().getSelected().items[0].data.Remark;

                            Ext.getCmp('orderId').down('#titleCount').setValue(count)
                            //Ext.getCmp('orderId').down('grid').getStore().reload();
                            //thisView.destroy();
                        } else {
                            alert(data.ErrorMessage);
                        }
                    }
                });
            },
        },
    },
    {
        height: 250,
        maxHeight: 400,
        itemId: 'orderDetailGrid',

        region: 'south',
        xtype: 'grid',

        store: {
            type: 'orderDetailStore'
        },
        columns: [
            //{ text: 'ProductId', dataIndex: 'ProductId', flex: 1 },
            { text: 'Bacode', dataIndex: 'Bacode', flex: 1 },
            { text: 'Name', dataIndex: 'Name', flex: 1 },
            { text: 'Size', dataIndex: 'Size', flex: 1 },
            { text: 'OrderQty', dataIndex: 'OrderQty', flex: 1 },
        ],
        tbar: [
       {
           itemId: 'titleCount',
           xtype: 'displayfield',
           name: 'orderno',
           fieldLabel: 'OrderDetail',
           //bind: '{OrderNo}',
       }
        ],
    }]

});