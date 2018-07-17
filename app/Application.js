/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('WebAppClassic.Application', {
    extend: 'Ext.app.Application',

    name: 'WebAppClassic',

	requires:[
		'WebAppClassic.view.main.Main',
		'WebAppClassic.view.login.Login',
        'WebAppClassic.view.login.Api',
        'WebAppClassic.view.login.BaseController'
	],
    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },

    stores: [
        // TODO: add global / shared stores here
    ],

    launch: function () {
        // TODO - Launch the application
        var loggedIn;
		loggedIn = localStorage.getItem("LoggedIn");
		Ext.create({
            xtype: loggedIn ? 'app-main' : 'login'
        });
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
