angular.module("MyController", [])
    .controller("IndexController", ["$scope", "githubService", function($scope, githubService) {
        $scope.name = "angular repos";
        $scope.show = true;
        //then(successFunc, errorFunc, notifyFunc)
        githubService.getPullRequests().then(function(result) {
            $scope.data = result;
        }, function(error) {
            $scope.data = "error!";
        }, function(progress) {
            // 进度
            $scope.progress = progress;
            $scope.show = false;
        });
    }]);
