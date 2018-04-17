APITester.factory("GENERIC_UTILITIES",function(CONSTANTS,$rootScope){
    var GENERIC_UTILITIES = {
        
            log : function(message){
                if(CONSTANTS.DEBUG){
                    console.log(message);
                }
            }
        
        };

    return GENERIC_UTILITIES;
});
