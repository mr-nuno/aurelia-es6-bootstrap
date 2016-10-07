import {autoinject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import $ from 'jquery';
import toastr from 'toastr';
import {FoodService} from '../core/food-service';

export class FoodList {
  static inject() { return [EventAggregator, FoodService] };

  constructor(eventAggregator, foodService){
    this.eventAggregator = eventAggregator;
    this.foodService = foodService;
  }

  attached(){
    this.subscribe();
    this.foodService.fetchAll();
  }

  subscribe(){
    this.eventAggregator.subscribe('fetch-done', list => {
      toastr.success("Food list retrieved");
      this.foods = list;
    });
  }
}