/**
 * 
 */
Login.controller('loginController',function($scope,$state,$ionicLoading,loginUtility,$rootScope,CONSTANTS,GENERIC_UTILITIES){
    $scope.init = function(){
       $scope.parameters = [];
       $scope.securityCheckName = "";
    };

    $scope.addParameter = function(){
        $scope.parameters.push({key:"",value:""});
    }

    $scope.login = function(){
        if($scope.parameters.length == 0){
            return;
        }
        var loginParameters = {};
        for(var i=0;i<$scope.parameters.length;i++){
            if($scope.parameters[i].key != "")
                loginParameters[$scope.parameters[i].key] = $scope.parameters[i].key == "password" ? compute($scope.parameters[i].value) : $scope.parameters[i].value;
        }
        console.log(loginParameters);
        console.log($scope.securityCheckName);

        if(loginParameters.length == 0){
            return;
        }

        if($scope.securityCheckName != ""){
            window.userLoginChallengeHandler = UserLoginChallengeHandler($scope.securityCheckName);
        }

        $ionicLoading.show({
            template: 'Loading...'
        });

        loginUtility.signIn($scope.securityCheckName,loginParameters,function(response){
            $ionicLoading.hide();
            $state.go("requests");
        },function(){
            $ionicLoading.hide();
        });
    }
    
});