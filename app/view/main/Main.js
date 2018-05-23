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
        'WebAppClassic.view.main.MainController', 
       'WebAppClassic.view.main.purchaseorder.Order',    
        'WebAppClassic.view.main.user.User'
    ],
    
    controller: 'main',
	plugins: 'viewport',
    
	ui: 'navigation',

	tabBarHeaderPosition: 1,
	titleRotation: 0,
	tabRotation: 0,
	defaultButtonUI: 'default',
	
    header: {
        
	    layout: {
	        align: 'stretchmax'
	    },
	    title: {
	       
	       text: 'RFID',
	        
	        flex: 0
	    },
	    
	    items: [
            {
              xtype: 'button',
              ui:'round',  
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
	    title: 'Orders',
	    items: [{
            xtype:'order'
	    }],
	}],
   
});
