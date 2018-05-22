Ext.define('WebAppClassic.store.Personnel', {
    extend: 'Ext.data.Store',

    alias: 'store.personnel',

    fields: [
        'name', 'email', 'phone', 'lastname'
    ],

    data: { items: [
        { name: 'asdf', email: "jeanluc.picard@enterprise.com", phone: "555-111-1111", lastname:'asdf' },
        { name: 'Worf',     email: "worf.moghsson@enterprise.com",  phone: "555-222-2222",lastname:'asfdsaf' },
        { name: 'Deanna',   email: "deanna.troi@enterprise.com",    phone: "555-333-3333", lastname:'zxvc'},
        { name: 'Data',     email: "mr.data@enterprise.com",        phone: "555-444-4444",lastname:'asdfasdf'		}
    ]},

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
