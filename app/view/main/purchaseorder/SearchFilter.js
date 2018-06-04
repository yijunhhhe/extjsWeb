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

Ext.define('WebAppClassic.view.main.purchaseorder.SearchFilter', {
    extend: 'Ext.window.Window',
    xtype: 'searchfilter',
    id: 'searchFilterId',
    requires: [
        'WebAppClassic.view.main.purchaseorder.ModifyOrderController',
    ],
    controller: 'modifyOrderController',
    autoShow: true,
    closable: true,
    items: [{
        xtype: 'form',

        bodyPadding: 10,
        items: [{
            xtype: 'textfield',
            fieldLabel: "OrderNo",
            name: "OrderNo",
        }, {
            xtype: 'textfield',
            fieldLabel: "DeliveryAddress",
            name: "DeliveryAddress",
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Start Date',
            name: 'startDate',
            id: 'startdt',
            vtype: 'daterange',
            format: 'Y-m-d H:i:s',
            endDateField: 'enddt', // id of the end date field
            
        },
        {
            xtype: 'datefield',
            fieldLabel: 'End Date',
            name: 'endDate',
            id: 'enddt',
            vtype: 'daterange',
            format: 'Y-m-d H:i:s',
            startDateField: 'startdt', // id of the start date field
            
        }, {
            xtype: 'button',
            text: 'submit',
            listeners: {
                click: 'searchOrder'
            }
        }, {
            xtype: 'button',
            text: 'close',
            listeners: {
                click: function () {
                    this.up('searchfilter').close();
                }
            }
        }],
    }

    ]
})