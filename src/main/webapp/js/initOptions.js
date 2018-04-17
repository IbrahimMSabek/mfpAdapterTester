var Messages = {
    // Add here your messages for the default language.
    // Generate a similar file with a language suffix containing the translated messages.
    // key1 : message1,
};

var wlInitOptions = {
    mfpContextRoot : '/mfp', // "mfp" // QIIBOCDEV / QIIBOCUAT //QIIBOCPROD is the default context root in the MobileFirst Foundation
    applicationId : 'qiib' // Replace with your own value.
};
//console.log = function(){}
// Called automatically after MFP fram0ework initialization by WL.Client.init(wlInitOptions).
function initApplication() {

    //MFP APIs should only be called within wlCommonInit() or after it has been called, to ensure that the APIs have loaded properly

    window.userLoginChallengeHandler = UserLoginChallengeHandler();

    /*
     window.PinCodeChallengeHandler = PinCodeChallengeHandler();
     */
	/* window.mobileDcdeviceReady = true;
	 
     if ((window.mobileJSLoaded == true) && (window.mobileDeviceReady == true)) {    	  	 
    	     //  intializeRouter();  	 
     }*/

}

/*var app = {
    // Application Constructor
    initialize: function () {
        console.log("APP INITiALIZE");
        this.bindEvents();
    },

    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        var self = this;
		document.addEventListener("deviceready", app.ready, false);
    },

    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, 'app.receivedEvent(...);' must be explicitly called.
    ready: function () {
        console.log("DOCUMENT IS READY")
        _receivedEvent('ready');
		
		var permissions = cordova.plugins.permissions;
		
		permissions.hasPermission(permissions.ACCESS_COARSE_LOCATION, checkPermissionACCESS_COARSE_LOCATIONCallback, null);
		
		function checkPermissionACCESS_COARSE_LOCATIONCallback(status) {
		  if(!status.hasPermission) {
			var errorCallback = function() {
			  console.warn('ACCESS_COARSE_LOCATION permission is not turned on');
			  permissions.hasPermission(permissions.ACCESS_FINE_LOCATION, checkPermissionACCESS_FINE_LOCATIONCallback, null);
			}
		 
			permissions.requestPermission(
			  permissions.ACCESS_COARSE_LOCATION,
			  function(status) {
				  permissions.hasPermission(permissions.ACCESS_FINE_LOCATION, checkPermissionACCESS_FINE_LOCATIONCallback, null);
				if(!status.hasPermission) errorCallback();
			  },
			  errorCallback);
		  }
		}		
		
		function checkPermissionACCESS_FINE_LOCATIONCallback(status) {
		  if(!status.hasPermission) {
			var errorCallback = function() {
			  console.warn('ACCESS_FINE_LOCATION permission is not turned on');
			}
		 
			permissions.requestPermission(
			  permissions.ACCESS_FINE_LOCATION,
			  function(status) {
				if(!status.hasPermission) errorCallback();
			  },
			  errorCallback);
		  }
		}

    }
};*/

/**
 * Update the DOM on a received event.
 * @param id
 * @private
 */
/*var _receivedEvent = function (id) {
    var self = this;
    console.log("_receivedEvent :::: " + id);
};

app.initialize();*/