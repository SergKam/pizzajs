'use strict';

/* Services */

angular.module('pizzaServices', ['ngResource'])
    /**
     * Implements REST client api for the pizzas catalog
     * server 
     * @param {Object} $resource
     * @returns {Object} pizzaCatalog
     */
    .factory('pizzaCatalog', function($resource) {

                    return $resource(
                        'pizzas/:pizzaId.json',
                        {},
                        {
                            query: {
                                method: 'GET',
                                params: {
                                    pizzaId: 'pizzas'
                                },
                                isArray: true
                            }
                        });
    })
    
    /**
     * Implements shoppting cart model
     * it holds all user orders
     */
    .service("orderModel", [function() {
        
        /**
         * Add new order to shopping cart
         * @param {Object} order
         */
        this.add = function(order)
        {
            this.orderList.push(order);
            this.count += order.quantity;
            this.total += order.summ;
        }
        
        /**
         * Init or clear all orders from 
         * the shopping cart model
         */
        this.clear = function()
        {
            //this.orderList.splice(index, 1);
            this.count = 0;
            this.total = 0;
            this.orderList = [];
        }
        
        //init for the first time 
        this.clear();
}]);
