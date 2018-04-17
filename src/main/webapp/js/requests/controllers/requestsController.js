/**
 * 
 */
Requests.controller('requestsController',function($scope,$state,$ionicLoading,$ionicPopover,requestsUtility,exportUtility,$rootScope,CONSTANTS,GENERIC_UTILITIES){
    $scope.init = function(){
       $scope.requests = localStorage.getItem("requests") != null ? JSON.parse(localStorage.getItem("requests")) : [];

       self.determinateValue = 0;
       $scope.isRundone = false;

       if($scope.requests.length == 0){
            $scope.isRequestsEmpty = true;
       }else{
            exportUtility.export(JSON.stringify($scope.requests), 'exportCollection.json', 'application/json','exportCol');
       }

       $ionicPopover.fromTemplateUrl('js/requests/templates/requestsProgressLoading.html', {
        scope: $scope
      }).then(function(popover) {
        $scope.popover = popover;
      });
    };

    $scope.addRequest = function(){
        $state.go("addRequest");
    }
    
    $scope.edit = function(index){
        $state.go("addRequest",{index:index});
    }

    $scope.delete = function(index){
        $scope.requests.splice(index,1);
        localStorage.setItem("requests",JSON.stringify($scope.requests));
    }

    $scope.run = function(index){
        $ionicLoading.show({
            template: 'Loading...'
        });
        requestsUtility.runAPI($scope.requests[index],function(res){
            $ionicLoading.hide();
            console.log(res);
        },function(error){
            $ionicLoading.hide();
            console.log(error);
        });
        
    }

    $scope.runAll = function(){
        $scope.exportRequests = $scope.requests.slice();
        $scope.determinateValue = 0;

        var step = Math.round((100/$scope.exportRequests.length)*1000) / 1000;

        $ionicLoading.show({
            templateUrl : 'js/requests/templates/requestsProgressLoading.html',
            scope : $scope
        });

        // $scope.popover.show();

        var counter = 0;
        for(var i = 0;i < $scope.exportRequests.length;i++){
            requestsUtility.runAPI($scope.exportRequests[i],function(res,index){
                console.log(res);
                $scope.exportRequests[index]["response"] = JSON.stringify(res);
                $scope.exportRequests[index]["parameters"] = JSON.stringify($scope.exportRequests[index]["parameters"]);
                $scope.determinateValue += step;
                setTimeout(function(){
                    $scope.$apply();
                },10);
                counter++;
                if($scope.determinateValue >= 100 || counter >= $scope.exportRequests.length){

                    setTimeout(function(){
                        $ionicLoading.hide();
                    },300);
                    
                    $scope.isRundone = true;
                    
                    //Export
                    var columns = {
                        "adapterName": "String",
                        "procedureName": "String",
                        "methodType": "String",
                        "consumeType": "String",
                        "parameters": "String",
                        "response" : "String"
                    }
                    exportUtility.export($scope.exportRequests, 'exportData.xls', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','export',columns);
   
                    
                }
            },function(error,index){
                console.log(error);

                $scope.exportRequests[index]["response"] = JSON.stringify(error);
                $scope.exportRequests[index]["parameters"] = JSON.stringify($scope.exportRequests[index]["parameters"]);
                $scope.determinateValue += step;
                setTimeout(function(){
                    $scope.$apply();
                },10);
                counter++;
                if($scope.determinateValue >= 100 || counter >= $scope.exportRequests.length){
                    
                    setTimeout(function(){
                        $ionicLoading.hide();
                    },300);
                    $scope.isRundone = true;
                    
                    //Export
                    var columns = {
                        "adapterName": "String",
                        "procedureName": "String",
                        "methodType": "String",
                        "consumeType": "String",
                        "parameters": "String",
                        "response" : "String"
                    }
                    exportUtility.export($scope.exportRequests, 'exportData.xls', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','export',columns);
   
                    
                }
            },i);
        }
    }

    // $scope.export = function(){

    //     //Export
    //     var columns = {
    //         "adapterName": "String",
    //         "procedureName": "String",
    //         "methodType": "String",
    //         "consumeType": "String",
    //         "parameters": "String",
    //         "response" : "String"
    //     }
    //     exportUtility.export($scope.exportRequests, 'exportData.xls', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',columns);
    // }
});