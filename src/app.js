import {Router, RouterConfiguration} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import toastr from 'toastr';

export class App {
  
  static inject() { return [RouterConfiguration, Router, EventAggregator] };

  constructor(config, router, eventAggregator){
    this.eventAggregator = eventAggregator;
  }

  subscribe() {
    this.eventAggregator.subscribe('login', payload => {
      toastr.success("logging in " + payload);
      this.session.isLoggedIn = true;
    });
  }

  configureRouter(config, router){
    config.map([
      { route: '',              moduleId: './pages/food-list',   title: 'Lista'},
      { route: 'details/:id',              moduleId: './pages/food-details',   title: 'Detaljer', name: 'details'}
    ]);

    this.router = router;
    this.subscribe();
  }
}