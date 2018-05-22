Ext.define('WebAppClassic.view.main.UserViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.userViewModel',
    required:[
        'WebAppClassic.store.UserStore'
    ],
    //store:'userStore',
    data: {
        AccountNo: "",
        Password: "",
        EpcCode: "",
        Name: "",
        EnName: "",
        Type: "",
        Role: {},
        OrganizationId: "",
        IsDisabled: "",
        IsDeleted: "",
        Remark: "",
        CreateBy: "",
        CreateDate: "",
        ModifyBy: "",
        ModifyDate: "",

    }
});