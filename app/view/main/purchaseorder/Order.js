﻿var search = Ext.create('WebAppClassic.store.SearchOrderStore');
var orderStore = Ext.create('WebAppClassic.store.OrderStore');
var orderDetailStore = Ext.create('WebAppClassic.store.OrderDetailStore');

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
             'WebAppClassic.view.main.purchaseorder.OrderDetailViewModel',
             'Ext.ux.ExportableGrid',
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
        store: orderStore,
        xtype: 'exportablegrid',       
        bbar: [{
            store:orderStore,
            pageSize: 8,
            xtype: 'pagingtoolbar',    
            displayInfo: true
        }],
        tbar: [{
            xtype: 'form',
            standardSubmit: true,
            url:'/Api/PurchaseOrder/getExcel',
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
                    text: 'Export',
                    listeners: {
                        click: 'getExcel'
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
            rowclick: 'orderClick',
        },
    },
    {
        height: 250,
        maxHeight: 400,
        itemId: 'orderDetailGrid',
        region: 'south',
        xtype: 'grid',
        store: orderDetailStore,
        columns: [
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
       }],
        bbar: [{
            xtype: 'form',
            layout: 'column',
            itemId: 'pageBar',
            items: [{
                store: orderDetailStore,
                pageSize: 3,
                xtype: 'pagingtoolbar',
                displayInfo: true
            }]
        }],
    }]
});


//    {
//    xtype: 'button',
//    text: 'last',
//    listeners: {
//        click: 'orderLast',
//    }
//},{
//    xtype: "displayfield",
//    value: "1",
//    margin:"0, 10",
//}, {
//    xtype: 'button',
//    text: 'next',
//    listeners: {
//        click: 'orderNext',
//    }
//}, {
//    xtype: 'textfield',
//    name: 'page',
//    value: '1',
//    width: 50,
//}, {
//    xtype: "button",
//    text: 'jump',
//    listeners: {
//        click: 'orderJump',
//    }
//},

//{
//    xtype: "displayfield",
//    itemId: 'totalNumberItem',
//    fieldLabel: 'total',
//    labelWidth: 40,
//    text: '',
//    margin: '0 10',
//}

//viewConfig: {
//    listeners: {
//        viewready: function (view) {
//            //view.getStore().on('beforeload', function (store, options) {
//            //    console.log(options._page);
//            //    console.log(options._start);
//            //    console.log(options._start);
//            //});
            //Ext.getCmp("orderId").down("exportablegrid").getStore().load({
            //    params: {
            //        // specify params for the first page load if using paging
            //        start: 0,
            //        limit: 12,

            //    }
            //}); 
//            //var filterObject = Ext.getCmp('orderId').down('#searchForm').getForm().getValues();

//            //Ext.getCmp("orderId").down("exportablegrid").getStore().on('beforeload', function (store, options) {
//            //    Ext.getCmp('orderId').getViewModel().data.searchFilter.page = options._page;
//            //    Ext.getCmp('orderId').getViewModel().data.searchFilter.start = options._start;
//            //    Ext.getCmp('orderId').getViewModel().data.searchFilter.limit = options._limit;
//            //    Ext.apply(store.proxy.extraParams);
//            //});

//        }
//    },
//},

//{
//    xtype: 'button',
//    text: 'last',
//    listeners: {
//        click: function () {
//            var viewData = Ext.getCmp('orderId').down('exportablegrid').getSelectionModel().getSelected().items[0].data;
//            var pageNum = Ext.getCmp("orderId").down("#detailDisplayField").getValue();
//            var itemNum = "3";

//            if (parseInt(pageNum) > 1) {
//                pageNum = pageNum - 1;
//            }
                        
//            Ext.Ajax.request({
//                method: 'GET',
//                url: '/Api/PurchaseOrderDetail/SearchPurchaseOrderDetail?id=' + viewData.Id + '&code=a' + '&pageNum=' + pageNum + '&itemNum=' + itemNum,
//                headers: { 'Content-Type': 'application/json' },
//                success: function (Result) {
//                    var data = Ext.decode(Result.responseText);
//                    if (data.IsSuccess == true) {
//                        console.log("success");
//                        console.log(data.Data);
//                        Ext.getCmp('orderId').down("#detailDisplayField").setValue(pageNum);
//                        //Ext.getCmp("orderId").down("#pageBar").down("textfield").setValue(pageNum);
//                        Ext.getCmp('orderId').down('#orderDetailGrid').getStore().setData(data.Data);
//                        //console.log(orderView.down('grid').getStore());
//                    } else {
//                        alert(data.ErrorMessage);
//                    }
//                }
//            });
//        }
//    }
//}, {
//xtype: "displayfield",
//itemId:"detailDisplayField",
//value: "1",
//margin: "0, 10",
//}, {
//xtype: 'button',
//text: 'next',
//listeners: {
//    click: function () {
//        var viewData = Ext.getCmp('orderId').down('exportablegrid').getSelectionModel().getSelected().items[0].data;
//        var pageNum = Ext.getCmp("orderId").down("#detailDisplayField").getValue(); pageNum = parseInt(pageNum) + 1;
//        var itemNum = "3";
//        Ext.Ajax.request({
//            method: 'GET',
//            url: '/Api/PurchaseOrderDetail/SearchPurchaseOrderDetail?id=' + viewData.Id + '&code=a' + '&pageNum=' + pageNum + '&itemNum=' + itemNum,
//            headers: { 'Content-Type': 'application/json' },
//            success: function (Result) {
//                var data = Ext.decode(Result.responseText);
//                if (data.IsSuccess == true) {
//                    console.log("success");
//                    console.log(data.Data);
//                    Ext.getCmp('orderId').down('#detailDisplayField').setValue(pageNum);
//                    Ext.getCmp('orderId').down('#orderDetailGrid').getStore().setData(data.Data);
//                } else {
//                    alert(data.ErrorMessage);
//                }
//            }
//        });
//    }
//}
//}, {
//    xtype: 'textfield',
//    name: 'page',
//    itemId: "detailTextField",
//    value: '1',
//    width: 50,
//    }, {
//xtype: "button",
//text: 'jump',
//listeners: {
//    click: function () {
//        var viewData = Ext.getCmp('orderId').down('exportablegrid').getSelectionModel().getSelected().items[0].data;

//        var pageNum = Ext.getCmp("orderId").down('#detailTextField').getValue();
//        if (pageNum <= 0) {
//            alert(">0")
//        }
//        var itemNum = "3";
//        Ext.Ajax.request({
//            method: 'GET',
//            url: '/Api/PurchaseOrderDetail/SearchPurchaseOrderDetail?id=' + viewData.Id + '&code=a' + '&pageNum=' + pageNum + '&itemNum=' + itemNum,
//            headers: { 'Content-Type': 'application/json' },
//            success: function (Result) {
//                var data = Ext.decode(Result.responseText);
//                if (data.IsSuccess == true) {
//                    console.log("success");
//                    console.log(data.Data);
//                    Ext.getCmp('orderId').down('#orderDetailGrid').getStore().setData(data.Data);
//                    Ext.getCmp("orderId").down('#detailDisplayField').setValue(pageNum);
//                } else {
//                    alert(data.ErrorMessage);
//                }
//            }
//        });
//    }
//}
//}

//Ext.create('Ext.ux.data.PagingStore', {
//    requires: [
//        'WebAppClassic.model.OrderModel',
//    ],
//    model: 'WebAppClassic.model.OrderModel',
//    pageSize: 3,
//    lastOptions: { start: 0, limit: 3, page: 1 },
//    fields: [
//        { name: 'Id', type: 'string' },
//        { name: 'PurchaseOrderId', type: 'string' },
//        { name: 'PurchaseOrderNo', type: 'string' },
//        { name: 'ProductId', type: 'string' },
//        { name: 'OrderQty', type: 'string' },
//        { name: 'IsDeleted', type: 'string' },
//        { name: 'Remark', type: 'string' },
//        { name: 'CreateBy', type: 'string' },
//        { name: 'ModifyBy', type: 'string' },
//        { name: 'ModifyDate', type: 'string' },
//        { name: 'Bacode', type: 'string' },
//        { name: 'Name', type: 'string' },
//        { name: 'Size', type: 'string' },
//        { name: 'Color', type: 'string' },
//        { name: 'Count', type: 'string' }
//    ],
//    //proxy: {
//    //    type: 'ajax',
//    //    url: 'artist.json',
//    //    reader: {
//    //        type: 'json',
//    //        root: 'rows'
//    //    }
//    //}
//});