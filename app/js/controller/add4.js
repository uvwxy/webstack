'use strict';
/**
 * Almost the perfect way to implement the function: Use a custom service, see service/add.js
 */
angular.module(APP_NAME).controller('add4', function($scope,addService, TestServiceClient) {

    $scope.n1 = addService.x1;
    $scope.n2 = addService.x2;

    $scope.testObject = new TestObject();
    $scope.testObject.name = "Bruno";

    // We want to sync every change in our view to our service
    //noinspection JSUnusedLocalSymbols
    $scope.$watch('n1',function(newValue, oldValue){
        addService.x1 = newValue;
        $scope.testObject = TestServiceClient.getObject()
    });

    //noinspection JSUnusedLocalSymbols
    $scope.$watch('n2',function(newValue, oldValue){
        addService.x2 = newValue;
        $scope.testObject.name = 'n2=' + newValue;

        TestServiceClient.setObject($scope.testObject);
    });

   $scope.add = addService.add;

});
