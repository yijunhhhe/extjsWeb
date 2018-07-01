Ext.define('WebAppClassic.model.Users',{
	extend: 'Ext.data.Model',
	fields:[
		{name:'username', type:'string'},
		{name:'password', type:'string'}
	]
});

var user = Ext.create('WebAppClassic.model.Users',{
		username:'asdf',
		password:'asd'
	});