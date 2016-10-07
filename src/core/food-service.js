import {autoinject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import $ from 'jquery';
import toastr from 'toastr';
import 'bootstrap-datepicker';

export class FoodService {
  static inject() { return [EventAggregator] };

  constructor(eventAggregator){
    this.eventAggregator = eventAggregator;
  }

  fetchAll(){
    var self = this;
    $.get("http://pew-nutrition.azurewebsites.net/v1/nutrition", function(document){
      self.eventAggregator.publish('fetch-done', document.data);
    });
  }

  fetchOne(id){
    var self = this;
    $.get(`http://pew-nutrition.azurewebsites.net/v1/nutrition/${id}`, function(document){
      self.eventAggregator.publish('fetch-one-done', document.data);
    });
  }
}