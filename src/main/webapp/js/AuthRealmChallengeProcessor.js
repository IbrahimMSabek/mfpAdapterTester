/**
 * Challenge Handler
 */
var isChallenged = false;
var securityCheckName = 'Auth'; //Default

var UserLoginChallengeHandler = function(securityCheckNameOverRide) {

    //Override Scope
    securityCheckName = (securityCheckNameOverRide != null && securityCheckNameOverRide != undefined && securityCheckNameOverRide != "") ? securityCheckNameOverRide : securityCheckName;

    var userLoginChallengeHandler = WL.Client.createSecurityCheckChallengeHandler(securityCheckName);
    userLoginChallengeHandler.securityCheckName = securityCheckName;
    window.challenge = userLoginChallengeHandler;

    userLoginChallengeHandler.handleChallenge = function(response) {

        console.log(response);

    }

    userLoginChallengeHandler.collectInfo = function(){
        
    };

    userLoginChallengeHandler.handleSuccess = function(data) {
        WL.Logger.debug("handleSuccess",data);
        isChallenged = false;
       
        WL.Logger.debug("authentication NOT required ");

    };

    userLoginChallengeHandler.handleFailure = function(error) {
        if(typeof(userLoginChallengeHandler) != "undefined")
            userLoginChallengeHandler.cancel();
        WL.Logger.debug("handleFailure: " + error.failure);
        isChallenged = false;
    };

    return userLoginChallengeHandler;

};
