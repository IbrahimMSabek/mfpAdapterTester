/**
 * 
 */
Requests.controller('addRequestController',function($scope,$state,$ionicLoading,loginUtility,$rootScope,CONSTANTS,GENERIC_UTILITIES,$filter){
    $scope.init = function(){
        if ($state.params.index != null & $state.params.index != undefined) {
            var requestsCollection = localStorage.getItem("requests") != null ? JSON.parse(localStorage.getItem("requests")) : [];
            //$scope.parameters = requestsCollection[$state.params.index].parameters;
            $scope.adapterName = requestsCollection[$state.params.index].adapterName;
            $scope.procedureName = requestsCollection[$state.params.index].procedureName;
            $scope.methodType = requestsCollection[$state.params.index].methodType;
            $scope.consumeType = requestsCollection[$state.params.index].consumeType;

            $scope.isJsonParameters = true;
            $scope.data = {};
            $scope.data.parametersJson = JSON.stringify(requestsCollection[$state.params.index].parameters);
        }else{
            $scope.parameters = [];
            $scope.adapterName = "";
            $scope.procedureName = "";
            $scope.methodType = "";
            $scope.consumeType = "";

            $scope.isJsonParameters = false;
            
            $scope.data = {};
            $scope.data.parametersJson = "";
            
            $scope.isParamsSelected = false;
        }
        
    };

    $scope.addParameter = function(){
        $scope.parameters.push({key:"",value:""});
        $scope.isParamsSelected = true;
    }

    $scope.addJsonParameter = function(){
        $scope.isJsonParameters = true;
    }

    $scope.save = function(){
        /*if($scope.parameters.length == 0){
            return;
        }*/
        var requestParameters = {
            "adapterName" : "",
            "procedureName" : "",
            "methodType" : "",
            "consumeType" : "",
            "parameters" : {}
        };

        if($scope.isJsonParameters){
            requestParameters.parameters = JSON.parse($scope.data.parametersJson);
        }else{
            for(var i=0;i<$scope.parameters.length;i++){
                if($scope.parameters[i].key != "")
                    requestParameters.parameters[$scope.parameters[i].key] = $scope.parameters[i].key == "password" ? compute($scope.parameters[i].value) : $scope.parameters[i].value;
            }
        }
        
        console.log(requestParameters);

        if(requestParameters.length == 0 || $scope.adapterName == "" || $scope.procedureName == "" || $scope.methodType == ""){
            return;
        }

        requestParameters.adapterName = $scope.adapterName;
        requestParameters.procedureName = $scope.procedureName;

        if($scope.methodType.toLowerCase() == "get"){
            requestParameters.methodType = WLResourceRequest.GET;
        }else if($scope.methodType.toLowerCase() == "post"){
            requestParameters.methodType = WLResourceRequest.POST;
        }else if($scope.methodType.toLowerCase() == "put"){
            requestParameters.methodType = WLResourceRequest.PUT;
        }else{
            requestParameters.methodType = WLResourceRequest.GET;
        }
        
        requestParameters.consumeType = $scope.consumeType;

        var requestsCollection = localStorage.getItem("requests") != null ? JSON.parse(localStorage.getItem("requests")) : [];
        if ($state.params.index) {
            requestsCollection.splice($state.params.index,1,requestParameters);
        }else{
            requestsCollection.push(requestParameters);
        }
        

        localStorage.setItem("requests",JSON.stringify(requestsCollection));

        alert($filter('translate')('requestAddedSuccessfully'));

        $state.go("requests");
    }
    
});