/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('WebAppClassic.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'WebAppClassic.view.main.AddUser',
        'WebAppClassic.view.main.MainController',
        'WebAppClassic.view.main.MainModel',
        'WebAppClassic.view.main.List',
        'WebAppClassic.view.main.UserViewModel',
        'WebAppClassic.view.main.ModifyUserController',
        'WebAppClassic.view.main.SearchUser',
        'WebAppClassic.store.UserStore',
        'WebAppClassic.view.main.User'
    ],
    
    controller: 'main',
    viewModel: 'main',
	plugins: 'viewport',
    
	ui: 'navigation',

	tabBarHeaderPosition: 1,
	titleRotation: 0,
    tabRotation: 0,

	header: {
	    layout: {
	        align: 'stretchmax'
	    },
	    title: {
	        bind: {
	            text: 'RFID'
	        },
	        flex: 0
	    },
	    
	    items: [{
	        xtype: 'button',
	        text: 'Logout',
	        margin: '10 0',
	        handler: 'onClickButton'
	    }]
	},

	tabBar: {
	    flex: 1,
	    layout: {
	        align: 'stretch',
	        overflowHandler: 'none'
	    }
	},

	responsiveConfig: {
	    tall: {
	        headerPosition: 'top'
	    },
	    wide: {
	        headerPosition: 'left'
	    }
	},


	defaults: {
	    bodyPadding: 20,
	    tabConfig: {
	        plugins: 'responsive',
	        responsiveConfig: {
	            wide: {
	                iconAlign: 'left',
	                textAlign: 'left'
	            },
	            tall: {
	                iconAlign: 'top',
	                textAlign: 'center',
	                width: 120
	            }
	        }
	    }
	},
	
    items: [   
       {
		title:'Users',
		iconCls: 'fa-user',
		items:[{
           xtype:'user'
		}],
	},{
	    title: 'Search',
	    iconCls: 'fa-user'
	}],
   
});
