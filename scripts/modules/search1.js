var restaurantSearch = angular.module('search1', []);

restaurantSearch.controller('search1Ctrl', function ($scope, $http) {
    $scope.enter = function ($event) {
        var keyCode = $event.which || $event.keyCode;
        if (keyCode === 13) {
            searchFunction()
        };
    };

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
                "item_type": 1
            },
        }).then(function (response) {
			if (response.data.hits<1){
				alert("Sorry, I couldn't find any results for this item. I may not have a record of it. Try switching to Products or Ingredients in the 'Search Options' menu.")}
			else{
				$scope.nutrition = response.data.hits};
        });
    };
});