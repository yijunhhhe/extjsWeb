Ext.define('WebAppClassic.model.UserModel', {
    extend: 'Ext.data.Model',
   
    fields: [
        { name:'Id', type:'string' },
        { name: 'AccountNo', type: 'string' },
        { name: 'Password', type: 'string' },
        { name: 'EpcCode', type: 'string' },
        { name: 'Name', type: 'string' },
        { name: 'EnName', type: 'string' },
        { name: 'Type', type: 'string' },
        { name: 'Role', type: 'string' },
        { name: 'OrganizationId', type: 'string' },
        { name: 'IsDisabled', type: 'string' },
        { name: 'IsDeleted', type: 'string' },
        { name: 'Remark', type: 'string' },
        { name: 'CreateBy', type: 'string' },
        { name: 'ModifyBy', type: 'string' },
        { name: 'ModifyDate', type: 'string' },
        { name: 'CreateDate', type: 'string' },
    ]    
});