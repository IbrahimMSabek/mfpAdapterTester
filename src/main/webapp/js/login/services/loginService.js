Login.service("loginUtility",function($http,CONSTANTS,GENERIC_UTILITIES){
    
    //Signin
    this.signIn = function(securityCheckName, parameters, successCallBack, failureCallBack){
        WLAuthorizationManager.login(securityCheckName,parameters).then(function(response){
            GENERIC_UTILITIES.log(response);
            successCallBack(response);
        },function (error) {
            GENERIC_UTILITIES.log(error);
            failureCallBack(error);
        });
        
    };

});