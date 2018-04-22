Requests.service("requestsUtility",function($http,CONSTANTS,GENERIC_UTILITIES){
    
    //run Api
    this.runAPI = function(invocationData, successCallBack, failureCallBack,index){
        var method = invocationData.methodType ? invocationData.methodType : WLResourceRequest.GET;
        var path = "adapters/" + invocationData.adapterName + "/" + invocationData.procedureName;
        var resourceRequest = new WLResourceRequest(path, method,120000);
        var parameters = invocationData.parameters;

        if ((method == WLResourceRequest.POST || method == WLResourceRequest.PUT) && invocationData.consumeType.toLowerCase() != "json") {
            resourceRequest.sendFormParameters(parameters).then(function (data) {
                console.log("Success Call Adpater : ", invocationData, data.responseJSON);
                var res = {
                    invocationResult: data.responseJSON
                }
                successCallBack(res,index);
            }, function (response) {
                console.log("Failed Call Adpater : ", invocationData, response);
                failureCallBack(response,index);
            });
        } else {
            if(invocationData.consumeType.toLowerCase() == "json"){
                resourceRequest.setHeader("Content-Type","application/json");
            }
            resourceRequest.send(method == WLResourceRequest.GET ? null : parameters).then(function (data) {
                console.log("Success Call Adpater : ", invocationData, data.responseJSON);
                var res = {
                    invocationResult: data.responseJSON
                }
                successCallBack(res,index);
            }, function (response) {
                console.log("Failed Call Adpater : ", invocationData, response);
                failureCallBack(response,index);
            });
        }
        
    };

});