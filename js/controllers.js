'use strict';

/* Controllers */

/**
 * Pizzas list screeen controller
 *
 * @param {Object} $scope
 * @param {Object} Pizza
 */
function PizzaListCtrl($scope, pizzaCatalog)
{
    //load pizzas catalog
    $scope.pizzas = pizzaCatalog.query();
    $scope.orderProp = 'price';
}

/**
 * Pizza details screeen controller
 *
 * @param {Object} $scope
 * @param {Object} Pizza
 */
function PizzaDetailCtrl($scope, $routeParams, pizzaCatalog, orderModel, $location)
{
    //Load pizza model to scope
    $scope.pizza = pizzaCatalog.get(
        {
            pizzaId: $routeParams.pizzaId
        },
        function(pizza)
        {
            $scope.pizza.full = pizza.price;
            $scope.order = pizza.price;
            $scope.quantity = 1;
        });

    //Represents current order structure for shopping cart
    var orderDesc = {
        quantity: 1,//pizzas count
        summ: 0,    //summ bill of order
        options: [],//selected options names
        pizza:{}    //base pizza referese
    };

    /**
     * Recalculates connected fields inside detail view
     *
     */
    $scope.recalc = function()
    {
        //base price
        var pizzaTotal = $scope.pizza.price;

        orderDesc.options = [];
        //check and add all selected options
        for (var i in $scope.pizza.options)
        {
            var option = $scope.pizza.options[i];

            if (option.value)
            {
                orderDesc.options.push(option.name)
                pizzaTotal += option.price;
            }
        }

        //validate and calculate quantity
        var quantity = parseInt($scope.quantity, 10);
        if(quantity < 0 ||quantity > 20)
        {
            quantity = 1;
        }
        orderDesc.quantity = quantity;

        
        orderDesc.summ = pizzaTotal * orderDesc.quantity;

        orderDesc.pizza = $scope.pizza;

        $scope.order = orderDesc.summ;
        $scope.pizza.full = pizzaTotal;
    }

    /**
     * Adds new order to shopping cart
     */
    $scope.add = function()
    {
        $scope.recalc();
        orderModel.add(orderDesc);
        $location.path('pizzas')
    }
}
/**
 * Shopping cart controller on top of the page
 * @param {Object} $scope
 * @param {Object} orderModel
 */
function ShoppingCartCtrl($scope, orderModel) {
    $scope.order = orderModel;
}

/**
 * Order checkout page
 * @param {Object} $scope
 * @param {Object} orderModel
 * @param {Object} $http
 */
function OrderCtrl($scope, orderModel, $http ) {
    $scope.order = orderModel;
    $scope.message = '';
    
    /**
     * Starts paymant process
     * by sending order information to the server.
     * and show result to the user
     */
    $scope.pay = function()
    {
        $http.get('payment/pay.json',
        {
            data: orderModel.orderList,
            responseType: "json"
        })
        .success(function(data){
            $scope.message = 'Your order will be delivered in '+data.hours+' hours';
            orderModel.clear();
        })
        .error(function(data){
            $scope.message = data || "Payment request failed";
        })
    }
}
