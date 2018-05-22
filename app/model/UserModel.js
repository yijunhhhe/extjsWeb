Ext.define('WebAppClassic.model.UserModel', {
    extend: 'Ext.data.Model',
   
    fields: [
        { name:'id', type:'string' },
        { name: 'AccountNo', type: 'string' },
        { name: 'Password', type: 'string' },
        { name: 'EpcCode', type: 'string' },
        { name: 'Name', type: 'string' },
        { name: 'EnName', type: 'string' },
        { name: 'Type', type: 'string' },
        { name: 'Role', type: 'string' },
        { name: 'OrganizationId', type: 'string' },
    ]
});