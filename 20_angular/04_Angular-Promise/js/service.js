angular.module("MyService", [])
    .factory('githubService', ["$q", "$http", function($q, $http) {
        var getPullRequests = function() {
            // 通过$q实例化defer对象
            var deferred = $q.defer();
            // 获取deferred对象的promise属性
            var promise = deferred.promise;
            var progress;
            $http.get("https://api.github.com/repos/angular/angular.js/pulls")
                .success(function(data) {
                    var result = [];
                    for (var i = 0; i < data.length; i++) {
                        result.push(data[i].user);
                        progress = (i + 1) / data.length * 100;
                        // 处理进度
                        deferred.notify(progress);
                    }
                    // 成功获取到结果
                    deferred.resolve(result);
                })
                .error(function(error) {
                    // 失败
                    deferred.reject(error);
                });
            // 返回promise
            return promise;
        }

        return {
            getPullRequests: getPullRequests
        };
    }]);
