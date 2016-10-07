import {autoinject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import dragula from 'dragula';
import $ from 'jquery';
import toastr from 'toastr';
import 'bootstrap-datepicker';

export class Dashboard {

  static inject() { return [EventAggregator] };

  constructor(eventAggregator){
    this.eventAggregator = eventAggregator;
  }

  attached(){
    dragula([this.left, this.right]);
    $("input.datepicker").datepicker();
    this.subscribe();
  }

  subscribe(){
    this.eventAggregator.subscribe('drawing-done', image => {
      toastr.success("drawing done " + image);
      this.image = image;
    });
  }

  login(){
  
    var payload = { 
      "username" : this.username,
      "password" : this.password 
    };

    this.eventAggregator.publish('login', payload);
  }
}