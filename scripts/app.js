var app = angular.module('myApp', ['ngAnimate', 'ngRoute', 'search1', 'search3']);

app.controller('myController', function ($scope, $http) {
    $scope.enter = function ($event) {
        var keyCode = $event.which || $event.keyCode;
        if (keyCode === 13) {
            searchFunction()
        };
    }
	
	$scope.showDetail = function(event) {
		console.log($(event.target).attr("data-id"));
	}
	
    $scope.searchFunction = function () {
        $http.post("https://api.nutritionix.com/v1_1/search", {
            "appId": "f4ba6075",
            "appKey": "82ea3540c0cd81efe84c090999363701",
            "query": ($scope.userInput),
            "fields": ["item_name",
					   "brand_name",
					   "nf_serving_size_qty",
					   "nf_dietary_fiber",
					   "nf_serving_size_unit",
					   "nf_total_carbohydrate",
					   "nf_sugars",
					   "nf_calories"],
			"limit": 100,
            "filters": { 
                "item_type": 2
            },
        }).then(function (response) {
			if (response.data.hits<1){
				alert("Sorry, I couldn't find any results for this item. Maybe try switching the search to Restaurants or Ingredients in the 'Search Options' menu.")}
			else{
				$scope.nutrition = response.data.hits};
        });
    };
});

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when("/", {
        templateUrl: "templates/main.html"
    }).when("/glycemic-index", {
        templateUrl: "templates/glycemic-index.html"
    }).when("/sugar-and-health", {
        templateUrl: "templates/sugar-and-health.html",
    }).when("/search1", {
        templateUrl: "templates/search1.html",
    }).when("/search3", {
        templateUrl: "templates/search3.html",
        controller: function () {}
    });
}]);

app.directive("navBar", function () {
    return {
        restrict: "E",
        templateUrl: "templates/nav-bar.html"
    }
});

app.directive("tableResults", function () {
    return {
        restrict: "E",
        templateUrl: "templates/table-results.html"
    }
});






































































