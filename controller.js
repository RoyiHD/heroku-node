var mApp = angular.module('mApp', ['ui.bootstrap']);

mApp.controller('AppCtrl', function($scope, $uibModal){
    
    $scope.animationsEnabled = true;
    
    $scope.open = function(){
        console.log("open");
    
        var modalInstance = $uibModal.open({
        
            animation: $scope.animationsEnabled,
            templateUrl: 'chat-template.html',
            controller: 'ModalInstanceCtrl',

        });
    
        $scope.toggleAnimation = function(){
            $scope.animationsEnabled = !$scope.animationsEnabled;
        }
    };
});

mApp.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, $http, $timeout) {
    
    $scope.messages = [];
    var message = {
        msg: "Hi my name is Tbot, I am Target's official Chatbot. What is your name?",
        sender: 'bot'
    }
    
    $scope.messages.push(message);
    $scope.msgText = "";
    
    $scope.sendMessage = function(){
        
        var newMsg = {
            msg: $scope.msgText,
            sender: 'user' 
        };
        
        $scope.messages.push(newMsg);
        
        //console.log('new msg: ' + $scope.msgText);
        $http.post('/aiml', newMsg).success(function(response){
            console.log("RECEIVED RESPONSE  " + response);
            
            $timeout(function(){
                $scope.messages.push({
                    msg: response,
                    sender: 'bot'
                });
            }, 1250);
          
             
        }).error(function(err){
            console.log("ERR RESPONSE : " + err);
        });
       
    }

    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $http.get('test.aiml.xml').then(function(response){
            //var name = xmlresponse.data.getElementsByTagName('clientName');
            //console.log("CLIENT NAME: " + name);
        })
        $uibModalInstance.dismiss('cancel');
    };
    
});
/*
mApp.factory('getAiml', function($http){
    console.log("FACTORY CALLED");
    var text = ""
      $http.get('aiml').success(function(data){
        console.log("RECEIVED RESPONSE FROM AIML: " + data);
          text = data;
    }).error(function(err){
        console.log("ERR RESPONSE FROM AIML: ");
    });
    
    return text;
    
});
*/

mApp.directive('scrollToBottom', function($timeout){
    return {
        scope:{
            scrollToBottom: "="
        },
        link: function(scope, element){
            scope.$watchCollection('scrollToBottom', function(newValue){
                if (newValue){
                  $timeout(function(){
                      console.log("MSSGS SCROLL TO BOTTOM: " + $(element)[0].scrollHeight);
                    $(element).scrollTop($(element)[0].scrollHeight);
                  }, 100);
                }
            });
        }
    }
});

