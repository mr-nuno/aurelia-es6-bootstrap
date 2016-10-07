define('app',['exports', 'aurelia-router', 'aurelia-event-aggregator', 'toastr'], function (exports, _aureliaRouter, _aureliaEventAggregator, _toastr) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  var _toastr2 = _interopRequireDefault(_toastr);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    App.inject = function inject() {
      return [_aureliaRouter.RouterConfiguration, _aureliaRouter.Router, _aureliaEventAggregator.EventAggregator];
    };

    function App(config, router, eventAggregator) {
      _classCallCheck(this, App);

      this.eventAggregator = eventAggregator;
    }

    App.prototype.subscribe = function subscribe() {
      var _this = this;

      this.eventAggregator.subscribe('login', function (payload) {
        _toastr2.default.success("logging in " + payload);
        _this.session.isLoggedIn = true;
      });
    };

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{ route: '', moduleId: './pages/food-list', title: 'Lista' }, { route: 'details/:id', moduleId: './pages/food-details', title: 'Detaljer', name: 'details' }]);

      this.router = router;
      this.subscribe();
    };

    return App;
  }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment', 'aurelia-event-aggregator'], function (exports, _environment, _aureliaEventAggregator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().eventAggregator().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('components/drawing-pad',['exports', 'aurelia-event-aggregator', 'signature-pad'], function (exports, _aureliaEventAggregator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DrawingPad = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var DrawingPad = exports.DrawingPad = function () {
    DrawingPad.inject = function inject() {
      return [_aureliaEventAggregator.EventAggregator];
    };

    function DrawingPad(eventAggregator) {
      _classCallCheck(this, DrawingPad);

      this.eventAggregator = eventAggregator;
    }

    DrawingPad.prototype.attached = function attached() {
      var _this = this;

      this.pad = new SignaturePad(this.canvas);
      this.pad.onEnd = function () {
        _this.drawDone();
      };
    };

    DrawingPad.prototype.clear = function clear() {
      this.pad.clear();
    };

    DrawingPad.prototype.drawDone = function drawDone() {
      this.eventAggregator.publish('drawing-done', this.pad.toDataURL());
    };

    return DrawingPad;
  }();
});
define('core/food-service',['exports', 'aurelia-framework', 'aurelia-event-aggregator', 'jquery', 'toastr', 'bootstrap-datepicker'], function (exports, _aureliaFramework, _aureliaEventAggregator, _jquery, _toastr) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.FoodService = undefined;

  var _jquery2 = _interopRequireDefault(_jquery);

  var _toastr2 = _interopRequireDefault(_toastr);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var FoodService = exports.FoodService = function () {
    FoodService.inject = function inject() {
      return [_aureliaEventAggregator.EventAggregator];
    };

    function FoodService(eventAggregator) {
      _classCallCheck(this, FoodService);

      this.eventAggregator = eventAggregator;
    }

    FoodService.prototype.fetchAll = function fetchAll() {
      var self = this;
      _jquery2.default.get("http://pew-nutrition.azurewebsites.net/v1/nutrition", function (document) {
        self.eventAggregator.publish('fetch-done', document.data);
      });
    };

    FoodService.prototype.fetchOne = function fetchOne(id) {
      var self = this;
      _jquery2.default.get('http://pew-nutrition.azurewebsites.net/v1/nutrition/' + id, function (document) {
        self.eventAggregator.publish('fetch-one-done', document.data);
      });
    };

    return FoodService;
  }();
});
define('pages/dashboard',['exports', 'aurelia-framework', 'aurelia-event-aggregator', 'dragula', 'jquery', 'toastr', 'bootstrap-datepicker'], function (exports, _aureliaFramework, _aureliaEventAggregator, _dragula, _jquery, _toastr) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Dashboard = undefined;

  var _dragula2 = _interopRequireDefault(_dragula);

  var _jquery2 = _interopRequireDefault(_jquery);

  var _toastr2 = _interopRequireDefault(_toastr);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Dashboard = exports.Dashboard = function () {
    Dashboard.inject = function inject() {
      return [_aureliaEventAggregator.EventAggregator];
    };

    function Dashboard(eventAggregator) {
      _classCallCheck(this, Dashboard);

      this.eventAggregator = eventAggregator;
    }

    Dashboard.prototype.attached = function attached() {
      (0, _dragula2.default)([this.left, this.right]);
      (0, _jquery2.default)("input.datepicker").datepicker();
      this.subscribe();
    };

    Dashboard.prototype.subscribe = function subscribe() {
      var _this = this;

      this.eventAggregator.subscribe('drawing-done', function (image) {
        _toastr2.default.success("drawing done " + image);
        _this.image = image;
      });
    };

    Dashboard.prototype.login = function login() {

      var payload = {
        "username": this.username,
        "password": this.password
      };

      this.eventAggregator.publish('login', payload);
    };

    return Dashboard;
  }();
});
define('pages/food-details',['exports', 'aurelia-framework', 'aurelia-event-aggregator', 'jquery', 'toastr', '../core/food-service', 'bootstrap-datepicker', 'chartist'], function (exports, _aureliaFramework, _aureliaEventAggregator, _jquery, _toastr, _foodService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.FoodDetails = undefined;

  var _jquery2 = _interopRequireDefault(_jquery);

  var _toastr2 = _interopRequireDefault(_toastr);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var FoodDetails = exports.FoodDetails = function () {
    FoodDetails.inject = function inject() {
      return [_aureliaEventAggregator.EventAggregator, _foodService.FoodService];
    };

    function FoodDetails(eventAggregator, foodService) {
      _classCallCheck(this, FoodDetails);

      this.eventAggregator = eventAggregator;
      this.foodService = foodService;
    }

    FoodDetails.prototype.attached = function attached() {
      this.subscribe();
    };

    FoodDetails.prototype.activate = function activate(params, routeConfig) {
      this.foodService.fetchOne(params.id);
    };

    FoodDetails.prototype.drawChart = function drawChart() {
      var data = {
        labels: ['Carbs', 'Fat', 'Fibre', 'Protein', 'Kcal'],

        series: [[this.food.Carbs, this.food.Fat, this.food.Fibre, this.food.Protein, this.food.Kcal]]
      };

      new Chartist.Bar('.ct-chart', data);
    };

    FoodDetails.prototype.subscribe = function subscribe() {
      var _this = this;

      this.eventAggregator.subscribe('fetch-one-done', function (food) {
        _this.food = food;
        _this.drawChart();
      });
    };

    return FoodDetails;
  }();
});
define('pages/food-list',['exports', 'aurelia-framework', 'aurelia-event-aggregator', 'jquery', 'toastr', '../core/food-service'], function (exports, _aureliaFramework, _aureliaEventAggregator, _jquery, _toastr, _foodService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.FoodList = undefined;

  var _jquery2 = _interopRequireDefault(_jquery);

  var _toastr2 = _interopRequireDefault(_toastr);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var FoodList = exports.FoodList = function () {
    FoodList.inject = function inject() {
      return [_aureliaEventAggregator.EventAggregator, _foodService.FoodService];
    };

    function FoodList(eventAggregator, foodService) {
      _classCallCheck(this, FoodList);

      this.eventAggregator = eventAggregator;
      this.foodService = foodService;
    }

    FoodList.prototype.attached = function attached() {
      this.subscribe();
      this.foodService.fetchAll();
    };

    FoodList.prototype.subscribe = function subscribe() {
      var _this = this;

      this.eventAggregator.subscribe('fetch-done', function (list) {
        _toastr2.default.success("Food list retrieved");
        _this.foods = list;
      });
    };

    return FoodList;
  }();
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"bootstrap/css/bootstrap.css\"></require>\n  <require from=\"toastr/build/toastr.css\"></require>\n  <require from=\"./styles/styles.css\"></require>\n\n  <nav class=\"navbar navbar-inverse navbar-fixed-top\">\n    <div class=\"container\">\n      <div class=\"navbar-header\">\n        <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\n          <span class=\"sr-only\">Toggle navigation</span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n        </button>\n        <a class=\"navbar-brand\" href=\"#\">Nutrition v1.0 - Aurelia</a>\n      </div>\n      <form class=\"navbar-form navbar-right\">\n        <div class=\"form-group\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"Sök\">\n        </div>\n      </form>\n    </div>\n  </nav>\n\n    <div class=\"container\">\n      <div class=\"row\">\n        <router-view class=\"col-md-8\"></router-view>\n      </div>\n    </div><!-- /.container -->\n</template>"; });
define('text!components/drawing-pad.html', ['module'], function(module) { module.exports = "<template>\n  <canvas ref=\"canvas\" style=\"border:2px black solid;\" width=\"500\" height=\"250\"></canvas>\n</template>"; });
define('text!styles/styles.css', ['module'], function(module) { module.exports = "body {\n  padding-top: 70px; }\n\nsection {\n  margin: 0 20px; }\n\na:focus {\n  outline: none; }\n\n.navbar-nav li.loader {\n  margin: 12px 24px 0 6px; }\n\n.no-selection {\n  margin: 20px; }\n\n.contact-list {\n  overflow-y: auto;\n  border: 1px solid #ddd;\n  padding: 10px; }\n\n.panel {\n  margin: 20px; }\n\n.button-bar {\n  right: 0;\n  left: 0;\n  bottom: 0;\n  border-top: 1px solid #ddd;\n  background: white; }\n\n.button-bar > button {\n  float: right;\n  margin: 20px; }\n\nli.list-group-item {\n  list-style: none; }\n\nli.list-group-item > a {\n  text-decoration: none; }\n\nli.list-group-item.active > a {\n  color: white; }\n"; });
define('text!pages/dashboard.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"dragula/dragula.min.css\"></require>\n  <require from=\"bootstrap-datepicker/css/bootstrap-datepicker.min.css\"></require>\n  <require from=\"../components/drawing-pad\"></require>\n  \n  <h2>Output</h2>\n  <img src.bind=\"image\" alt=\"Signature\" />\n\n  <h2>Dashboard</h2>\n  <drawing-pad></drawing-pad>\n  <drawing-pad></drawing-pad>\n  \n  <h2>Logga in</h2>\n  <form>\n    <div class=\"form-group\">\n      <label for=\"username\">Datum</label>\n      <input type=\"text\" class=\"form-control datepicker\" value.bind=\"date\" placeholder=\"Välj ett datum\">\n    </div>\n    <div class=\"form-group\">\n      <label for=\"username\">Email address</label>\n      <input type=\"email\" class=\"form-control\" value.bind=\"username\" placeholder=\"Användarnamn\">\n    </div>\n    <div class=\"form-group\">\n      <label for=\"password\">Password</label>\n      <input type=\"password\" class=\"form-control\" value.bind=\"password\" placeholder=\"Password\">\n    </div>\n    <button type=\"button\" class=\"btn btn-primary\" click.trigger=\"login()\">Logga in</button>\n  </form>\n  </div>\n  <div class=\"row\">\n    <div ref=\"left\" class=\"col-md-6 col-sm-6\">\n      <div class=\"alert alert-success\" role=\"alert\">&nbsp;</div>\n      <div class=\"alert alert-success\" role=\"alert\">&nbsp;</div>\n      <div class=\"alert alert-success\" role=\"alert\">&nbsp;</div>\n      <div class=\"alert alert-success\" role=\"alert\">&nbsp;</div>\n      <div class=\"alert alert-success\" role=\"alert\">&nbsp;</div>\n    </div>\n    <div ref=\"right\" class=\"col-md-6 col-sm-6\">\n      <div class=\"alert alert-info\" role=\"alert\">&nbsp;</div>\n      <div class=\"alert alert-info\" role=\"alert\">&nbsp;</div>\n      <div class=\"alert alert-info\" role=\"alert\">&nbsp;</div>\n      <div class=\"alert alert-info\" role=\"alert\">&nbsp;</div>\n      <div class=\"alert alert-info\" role=\"alert\">&nbsp;</div>\n    </div>\n  </div>\n</template>"; });
define('text!pages/food-details.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"chartist/chartist.css\"></require>\n\n  <h1>${food.Name}</h1>\n  <div class=\"ct-chart ct-perfect-fourth\"></div>\n</template>"; });
define('text!pages/food-list.html', ['module'], function(module) { module.exports = "<template>\n  <table class=\"table table-striped\">\n    <tbody>\n        <tr repeat.for=\"food of foods\">\n          <td>${food.Id}</td>\n          <td>\n            \n            <a route-href=\"route: details; params.bind: {id:food.Id}\" click.delegate=\"$parent.select(food)\">\n              ${food.Name}\n            </a>\n            \n          </td>\n        </tr>\n    </tbody>    \n  </table>\n</template>"; });
//# sourceMappingURL=app-bundle.js.map