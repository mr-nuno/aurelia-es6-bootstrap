import {autoinject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import $ from 'jquery';
import toastr from 'toastr';
import 'bootstrap-datepicker';
import 'chartist';
import {FoodService} from '../core/food-service';

export class FoodDetails {
  static inject() { return [EventAggregator, FoodService] };

  constructor(eventAggregator, foodService){
    this.eventAggregator = eventAggregator;
    this.foodService = foodService;
  }

  attached(){
    this.subscribe();
  }

  activate(params, routeConfig) {
    this.foodService.fetchOne(params.id);
  }

  drawChart(){
    var data = {
      // A labels array that can contain any sort of values
      labels: ['Carbs', 'Fat', 'Fibre', 'Protein', 'Kcal'],
      // Our series array that contains series objects or in this case series data arrays
      series: [
        [this.food.Carbs, this.food.Fat, this.food.Fibre, this.food.Protein, this.food.Kcal]
      ]
    };

    // Create a new line chart object where as first parameter we pass in a selector
    // that is resolving to our chart container element. The Second parameter
    // is the actual data object.
    new Chartist.Bar('.ct-chart', data);
  }

  subscribe(){
    this.eventAggregator.subscribe('fetch-one-done', food => {
      this.food = food;
      this.drawChart();
    });
  }
}