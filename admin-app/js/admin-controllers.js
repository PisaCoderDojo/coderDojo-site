/* Controllers */
"use strict";
angular.module('AdminControllers', [])
.controller('adminNewsCtrl', ['$scope', 'news', '$location', '$cookies',
  function($scope, news, $location, $cookies){
    $scope.news = news.data;

    $scope.modify = function(id){
      $location.path('news/edit/' + id);
    };

    $scope.showDelModal = function(id,key){
      $scope.delNews = {key:key,
                        id:id,
                        title:$scope.news[key].title
                        };
                        //console.log($scope.delNews);
      $('#deleteModal').modal('show');
    };

    $scope.logout = function(){
      delete $cookies['token'];
      $location.path('/');
    };

    $scope.delete = function(item){
      $('#deleteModal').modal('hide');
      newsService.delNews(item.id).success(function(data){
        //console.log(data);
        if(data=='success')
          $scope.itemList.splice(item.key,1);
      });
    };
}])
.controller('adminResourceCtrl', ['$scope', 'category', 'resource', 'resourceService', '$location', '$cookies',
  function($scope, category, resource, resourceService, $location, $cookies){
    if (resource)
      $scope.resource = resource.data;
    $scope.category = category.data;

    $scope.modify = function(id){
      $location.path('resource/edit/' + id);
    };

    $scope.showDelModal = function(id,key){
      $scope.delNews = {key:key,
                        id:id,
                        title:$scope.resource[key].title
                        };
                        //console.log($scope.delNews);
      $('#deleteModal').modal('show');
    };

    $scope.logout = function(){
      delete $cookies['token'];
      $location.path('/');
    };

    $scope.delete = function(item){
      $('#deleteModal').modal('hide');
      resourceService.delResource(item.id).success(function(data){
        //console.log(data);
        if(data=='success')
          $scope.resource.splice(item.key,1);
      });
    };
}])
.controller('modNewsCtrl', ['$scope','news','newsService','$location','tagHelper','tags',
  function($scope,news,newsService,$location,tagHelper,tags){
    news=news.data[0];
    if (news===undefined)
      $location.path('/admin');
    else{
      console.log(news);
      var id = news.id;
      $scope.title=news.title;
      $scope.user=news.author;
      $scope.text=news.body;
      $scope.tags=tagHelper.fromArray(news.tags);
    }
    $scope.submit = function(){
      var data = {id:id,
                  title:$scope.title,
                  user:$scope.user,
                  text:$scope.text,
                  tags:tagHelper.toArray($scope.tags)
                  };
      newsService.modNews(data).success(function(data){
        if(data=='success'){
          $location.path('/admin');
        }
      });
    };
    $scope.loadTags = function(query) {
      console.log(tags.data);
      return tags.data;
    };
}])
.controller('loginCtrl', ['$scope', '$location', 'loginService','tokenService',
  function($scope,$location,loginService,tokenService){
    $scope.error = false;
    $scope.remember = tokenService.remember;
    $scope.login = function(){
      loginService.login($scope.pass).success(function(data){
        console.log(data);
        if(data != 'error'){
          tokenService.remember = $scope.remember;
          $scope.error = false;
          tokenService.set(data);
          $location.path('/admin');
        }else{
          $scope.error = true;
        }
      });
    };
}])
.controller('addNewsCtrl', ['$scope', 'newsService', '$location', 'tagHelper','tags',
  function($scope, newsService, $location, tagHelper,tags){
    $scope.submit = function(){
      if ($scope.title!=='' && $scope.text!=='' && $scope.user!==''){
        console.log(tagHelper.fromObj($scope.tags));
        newsService.addNews({
          title: $scope.title,
          text: $scope.text,
          user: $scope.user,
          tags: tagHelper.fromObj($scope.tags)
        }).success(function(data){
          if(data=='success')
            $location.path('/admin');
        });
      }
    };
    $scope.loadTags = function(query) {
      return tags.data;
    };
}])
.controller('addResourceCtrl', ['$scope', 'category',
  function($scope, category){

}])
.controller('modResourceCtrl', ['$scope', 'category','resource',
  function($scope, category,resource){

}])
.controller('updateImageModal', ['$scope', '$modalInstance', 'imageService',
  function($scope,$modalInstance,imageService){
    $scope.ok = function (img) {
      imageService.upload(img).success(function(result) {
         console.log(result);
         $modalInstance.close(result);
      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
}]);
