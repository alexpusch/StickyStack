(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("StickyStack", [], factory);
	else if(typeof exports === 'object')
		exports["StickyStack"] = factory();
	else
		root["StickyStack"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _noframeworkWaypoints = __webpack_require__(1);

	var _noframeworkWaypoints2 = _interopRequireDefault(_noframeworkWaypoints);

	var _sticky_tree = __webpack_require__(2);

	var _sticky_tree2 = _interopRequireDefault(_sticky_tree);

	var _elements_normalizer = __webpack_require__(5);

	var _elements_normalizer2 = _interopRequireDefault(_elements_normalizer);

	var _dom_helper = __webpack_require__(4);

	var _helpers = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DEFAULT_OPTIONS = {
	  stuckClass: 'sticky-stack-stuck',
	  offset: 0
	};

	var StickyStack = function () {
	  function StickyStack(elementRepresentations) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    _classCallCheck(this, StickyStack);

	    (0, _helpers.applyDefaults)(options, DEFAULT_OPTIONS);
	    this.options = options;

	    this.elements = (0, _elements_normalizer2.default)(elementRepresentations, options);

	    this._wrapElements(this.elements);

	    var tree = this._createStickyTree(this.elements);
	    this.waypoints = this._createWaypoints(this.elements, tree);
	  }

	  _createClass(StickyStack, [{
	    key: 'refresh',
	    value: function refresh() {
	      var tree = this._createStickyTree(this.elements);
	      this._destroyWaypoints(this.waypoints);
	      this._createWaypoints(this.elements, tree);

	      var stickyElements = this.elements.filter(function (element) {
	        return element.isSticky();
	      });
	      var transitioningElements = this.elements.filter(function (element) {
	        return element.isTransitioned();
	      });

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = stickyElements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var element = _step.value;

	          var offset = tree.getOffset(element);
	          element.updateOffset(offset);
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = transitioningElements[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var _element = _step2.value;

	          var transitionOffset = (0, _dom_helper.getOffset)(_element.wrapper).top - tree.getSubtreeHeight(_element);
	          _element.updateOffset(transitionOffset);
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this._destroyWaypoints(this.waypoints);
	      this._destroyElements(this.elements);
	    }
	  }, {
	    key: '_wrapElements',
	    value: function _wrapElements(elements) {
	      elements.forEach(function (element) {
	        element.wrap();
	      });
	    }
	  }, {
	    key: '_createStickyTree',
	    value: function _createStickyTree(elements) {
	      var tree = new _sticky_tree2.default();

	      elements.forEach(function (element) {
	        tree.add(element);
	      });

	      return tree;
	    }
	  }, {
	    key: '_createWaypoints',
	    value: function _createWaypoints(elements, tree) {
	      var _this = this;

	      var waypoints = [];
	      elements.forEach(function (element) {
	        var stickyWaypoint = _this._createStickyWaypoint(element, tree);
	        var transitionWaypoint = _this._createTransitionWaypoint(element, tree);

	        waypoints.push(stickyWaypoint);
	        waypoints.push(transitionWaypoint);
	      });

	      return waypoints;
	    }
	  }, {
	    key: '_createStickyWaypoint',
	    value: function _createStickyWaypoint(element, tree) {
	      var _this2 = this;

	      var wrapper = element.wrapper;
	      var offset = tree.getOffset(element);

	      var waypoint = new _noframeworkWaypoints2.default({
	        element: wrapper,
	        offset: offset,
	        handler: function handler(direction) {
	          _this2._handleElementReachStickyWaypoint(direction, element, tree);
	        }
	      });

	      return waypoint;
	    }
	  }, {
	    key: '_handleElementReachStickyWaypoint',
	    value: function _handleElementReachStickyWaypoint(direction, element, tree) {
	      var shouldBeStuck = direction == 'down';

	      if (shouldBeStuck) {
	        var offset = tree.getOffset(element);
	        element.makeSticky(offset);
	      } else {
	        element.makeStatic();
	      }
	    }

	    /*
	    * The transition point is the point where the predecessors of the element starts
	    * moving up, together with the current element
	    */

	  }, {
	    key: '_createTransitionWaypoint',
	    value: function _createTransitionWaypoint(element, tree) {
	      var _this3 = this;

	      var wrapper = element.wrapper;

	      var transitionOffset = tree.getTransitionOffset(element);

	      var waypoint = new _noframeworkWaypoints2.default({
	        element: wrapper,
	        offset: transitionOffset,
	        handler: function handler(direction) {
	          _this3._handleElementReachTransitionPoint(direction, element, tree);
	        }
	      });

	      return waypoint;
	    }
	  }, {
	    key: '_handleElementReachTransitionPoint',
	    value: function _handleElementReachTransitionPoint(direction, element, tree) {
	      var wrapper = element.wrapper;
	      var transitionedElements = tree.getTransitionedElements(element);
	      var isTransitioningIn = direction === 'down';

	      transitionedElements.forEach(function (transitionedElement) {
	        if (isTransitioningIn) {
	          var transitionOffset = (0, _dom_helper.getOffset)(wrapper).top - tree.getSubtreeHeight(transitionedElement);
	          transitionedElement.makeTransitioned(transitionOffset);
	        } else {
	          var offset = tree.getOffset(transitionedElement);
	          transitionedElement.makeSticky(offset);
	        }
	      });
	    }
	  }, {
	    key: '_destroyElements',
	    value: function _destroyElements(elements) {
	      var _iteratorNormalCompletion3 = true;
	      var _didIteratorError3 = false;
	      var _iteratorError3 = undefined;

	      try {
	        for (var _iterator3 = elements[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	          var element = _step3.value;

	          element.destroy();
	        }
	      } catch (err) {
	        _didIteratorError3 = true;
	        _iteratorError3 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion3 && _iterator3.return) {
	            _iterator3.return();
	          }
	        } finally {
	          if (_didIteratorError3) {
	            throw _iteratorError3;
	          }
	        }
	      }
	    }
	  }, {
	    key: '_destroyWaypoints',
	    value: function _destroyWaypoints(waypoints) {
	      var _iteratorNormalCompletion4 = true;
	      var _didIteratorError4 = false;
	      var _iteratorError4 = undefined;

	      try {
	        for (var _iterator4 = waypoints[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	          var waypoint = _step4.value;

	          waypoint.destroy();
	        }
	      } catch (err) {
	        _didIteratorError4 = true;
	        _iteratorError4 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion4 && _iterator4.return) {
	            _iterator4.return();
	          }
	        } finally {
	          if (_didIteratorError4) {
	            throw _iteratorError4;
	          }
	        }
	      }
	    }
	  }]);

	  return StickyStack;
	}();

	exports.default = StickyStack;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	/*!
	Waypoints - 4.0.0
	Copyright © 2011-2015 Caleb Troughton
	Licensed under the MIT license.
	https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
	*/
	(function() {
	  'use strict'

	  var keyCounter = 0
	  var allWaypoints = {}

	  /* http://imakewebthings.com/waypoints/api/waypoint */
	  function Waypoint(options) {
	    if (!options) {
	      throw new Error('No options passed to Waypoint constructor')
	    }
	    if (!options.element) {
	      throw new Error('No element option passed to Waypoint constructor')
	    }
	    if (!options.handler) {
	      throw new Error('No handler option passed to Waypoint constructor')
	    }

	    this.key = 'waypoint-' + keyCounter
	    this.options = Waypoint.Adapter.extend({}, Waypoint.defaults, options)
	    this.element = this.options.element
	    this.adapter = new Waypoint.Adapter(this.element)
	    this.callback = options.handler
	    this.axis = this.options.horizontal ? 'horizontal' : 'vertical'
	    this.enabled = this.options.enabled
	    this.triggerPoint = null
	    this.group = Waypoint.Group.findOrCreate({
	      name: this.options.group,
	      axis: this.axis
	    })
	    this.context = Waypoint.Context.findOrCreateByElement(this.options.context)

	    if (Waypoint.offsetAliases[this.options.offset]) {
	      this.options.offset = Waypoint.offsetAliases[this.options.offset]
	    }
	    this.group.add(this)
	    this.context.add(this)
	    allWaypoints[this.key] = this
	    keyCounter += 1
	  }

	  /* Private */
	  Waypoint.prototype.queueTrigger = function(direction) {
	    this.group.queueTrigger(this, direction)
	  }

	  /* Private */
	  Waypoint.prototype.trigger = function(args) {
	    if (!this.enabled) {
	      return
	    }
	    if (this.callback) {
	      this.callback.apply(this, args)
	    }
	  }

	  /* Public */
	  /* http://imakewebthings.com/waypoints/api/destroy */
	  Waypoint.prototype.destroy = function() {
	    this.context.remove(this)
	    this.group.remove(this)
	    delete allWaypoints[this.key]
	  }

	  /* Public */
	  /* http://imakewebthings.com/waypoints/api/disable */
	  Waypoint.prototype.disable = function() {
	    this.enabled = false
	    return this
	  }

	  /* Public */
	  /* http://imakewebthings.com/waypoints/api/enable */
	  Waypoint.prototype.enable = function() {
	    this.context.refresh()
	    this.enabled = true
	    return this
	  }

	  /* Public */
	  /* http://imakewebthings.com/waypoints/api/next */
	  Waypoint.prototype.next = function() {
	    return this.group.next(this)
	  }

	  /* Public */
	  /* http://imakewebthings.com/waypoints/api/previous */
	  Waypoint.prototype.previous = function() {
	    return this.group.previous(this)
	  }

	  /* Private */
	  Waypoint.invokeAll = function(method) {
	    var allWaypointsArray = []
	    for (var waypointKey in allWaypoints) {
	      allWaypointsArray.push(allWaypoints[waypointKey])
	    }
	    for (var i = 0, end = allWaypointsArray.length; i < end; i++) {
	      allWaypointsArray[i][method]()
	    }
	  }

	  /* Public */
	  /* http://imakewebthings.com/waypoints/api/destroy-all */
	  Waypoint.destroyAll = function() {
	    Waypoint.invokeAll('destroy')
	  }

	  /* Public */
	  /* http://imakewebthings.com/waypoints/api/disable-all */
	  Waypoint.disableAll = function() {
	    Waypoint.invokeAll('disable')
	  }

	  /* Public */
	  /* http://imakewebthings.com/waypoints/api/enable-all */
	  Waypoint.enableAll = function() {
	    Waypoint.invokeAll('enable')
	  }

	  /* Public */
	  /* http://imakewebthings.com/waypoints/api/refresh-all */
	  Waypoint.refreshAll = function() {
	    Waypoint.Context.refreshAll()
	  }

	  /* Public */
	  /* http://imakewebthings.com/waypoints/api/viewport-height */
	  Waypoint.viewportHeight = function() {
	    return window.innerHeight || document.documentElement.clientHeight
	  }

	  /* Public */
	  /* http://imakewebthings.com/waypoints/api/viewport-width */
	  Waypoint.viewportWidth = function() {
	    return document.documentElement.clientWidth
	  }

	  Waypoint.adapters = []

	  Waypoint.defaults = {
	    context: window,
	    continuous: true,
	    enabled: true,
	    group: 'default',
	    horizontal: false,
	    offset: 0
	  }

	  Waypoint.offsetAliases = {
	    'bottom-in-view': function() {
	      return this.context.innerHeight() - this.adapter.outerHeight()
	    },
	    'right-in-view': function() {
	      return this.context.innerWidth() - this.adapter.outerWidth()
	    }
	  }

	  window.Waypoint = Waypoint
	}())
	;(function() {
	  'use strict'

	  function requestAnimationFrameShim(callback) {
	    window.setTimeout(callback, 1000 / 60)
	  }

	  var keyCounter = 0
	  var contexts = {}
	  var Waypoint = window.Waypoint
	  var oldWindowLoad = window.onload

	  /* http://imakewebthings.com/waypoints/api/context */
	  function Context(element) {
	    this.element = element
	    this.Adapter = Waypoint.Adapter
	    this.adapter = new this.Adapter(element)
	    this.key = 'waypoint-context-' + keyCounter
	    this.didScroll = false
	    this.didResize = false
	    this.oldScroll = {
	      x: this.adapter.scrollLeft(),
	      y: this.adapter.scrollTop()
	    }
	    this.waypoints = {
	      vertical: {},
	      horizontal: {}
	    }

	    element.waypointContextKey = this.key
	    contexts[element.waypointContextKey] = this
	    keyCounter += 1

	    this.createThrottledScrollHandler()
	    this.createThrottledResizeHandler()
	  }

	  /* Private */
	  Context.prototype.add = function(waypoint) {
	    var axis = waypoint.options.horizontal ? 'horizontal' : 'vertical'
	    this.waypoints[axis][waypoint.key] = waypoint
	    this.refresh()
	  }

	  /* Private */
	  Context.prototype.checkEmpty = function() {
	    var horizontalEmpty = this.Adapter.isEmptyObject(this.waypoints.horizontal)
	    var verticalEmpty = this.Adapter.isEmptyObject(this.waypoints.vertical)
	    if (horizontalEmpty && verticalEmpty) {
	      this.adapter.off('.waypoints')
	      delete contexts[this.key]
	    }
	  }

	  /* Private */
	  Context.prototype.createThrottledResizeHandler = function() {
	    var self = this

	    function resizeHandler() {
	      self.handleResize()
	      self.didResize = false
	    }

	    this.adapter.on('resize.waypoints', function() {
	      if (!self.didResize) {
	        self.didResize = true
	        Waypoint.requestAnimationFrame(resizeHandler)
	      }
	    })
	  }

	  /* Private */
	  Context.prototype.createThrottledScrollHandler = function() {
	    var self = this
	    function scrollHandler() {
	      self.handleScroll()
	      self.didScroll = false
	    }

	    this.adapter.on('scroll.waypoints', function() {
	      if (!self.didScroll || Waypoint.isTouch) {
	        self.didScroll = true
	        Waypoint.requestAnimationFrame(scrollHandler)
	      }
	    })
	  }

	  /* Private */
	  Context.prototype.handleResize = function() {
	    Waypoint.Context.refreshAll()
	  }

	  /* Private */
	  Context.prototype.handleScroll = function() {
	    var triggeredGroups = {}
	    var axes = {
	      horizontal: {
	        newScroll: this.adapter.scrollLeft(),
	        oldScroll: this.oldScroll.x,
	        forward: 'right',
	        backward: 'left'
	      },
	      vertical: {
	        newScroll: this.adapter.scrollTop(),
	        oldScroll: this.oldScroll.y,
	        forward: 'down',
	        backward: 'up'
	      }
	    }

	    for (var axisKey in axes) {
	      var axis = axes[axisKey]
	      var isForward = axis.newScroll > axis.oldScroll
	      var direction = isForward ? axis.forward : axis.backward

	      for (var waypointKey in this.waypoints[axisKey]) {
	        var waypoint = this.waypoints[axisKey][waypointKey]
	        var wasBeforeTriggerPoint = axis.oldScroll < waypoint.triggerPoint
	        var nowAfterTriggerPoint = axis.newScroll >= waypoint.triggerPoint
	        var crossedForward = wasBeforeTriggerPoint && nowAfterTriggerPoint
	        var crossedBackward = !wasBeforeTriggerPoint && !nowAfterTriggerPoint
	        if (crossedForward || crossedBackward) {
	          waypoint.queueTrigger(direction)
	          triggeredGroups[waypoint.group.id] = waypoint.group
	        }
	      }
	    }

	    for (var groupKey in triggeredGroups) {
	      triggeredGroups[groupKey].flushTriggers()
	    }

	    this.oldScroll = {
	      x: axes.horizontal.newScroll,
	      y: axes.vertical.newScroll
	    }
	  }

	  /* Private */
	  Context.prototype.innerHeight = function() {
	    /*eslint-disable eqeqeq */
	    if (this.element == this.element.window) {
	      return Waypoint.viewportHeight()
	    }
	    /*eslint-enable eqeqeq */
	    return this.adapter.innerHeight()
	  }

	  /* Private */
	  Context.prototype.remove = function(waypoint) {
	    delete this.waypoints[waypoint.axis][waypoint.key]
	    this.checkEmpty()
	  }

	  /* Private */
	  Context.prototype.innerWidth = function() {
	    /*eslint-disable eqeqeq */
	    if (this.element == this.element.window) {
	      return Waypoint.viewportWidth()
	    }
	    /*eslint-enable eqeqeq */
	    return this.adapter.innerWidth()
	  }

	  /* Public */
	  /* http://imakewebthings.com/waypoints/api/context-destroy */
	  Context.prototype.destroy = function() {
	    var allWaypoints = []
	    for (var axis in this.waypoints) {
	      for (var waypointKey in this.waypoints[axis]) {
	        allWaypoints.push(this.waypoints[axis][waypointKey])
	      }
	    }
	    for (var i = 0, end = allWaypoints.length; i < end; i++) {
	      allWaypoints[i].destroy()
	    }
	  }

	  /* Public */
	  /* http://imakewebthings.com/waypoints/api/context-refresh */
	  Context.prototype.refresh = function() {
	    /*eslint-disable eqeqeq */
	    var isWindow = this.element == this.element.window
	    /*eslint-enable eqeqeq */
	    var contextOffset = isWindow ? undefined : this.adapter.offset()
	    var triggeredGroups = {}
	    var axes

	    this.handleScroll()
	    axes = {
	      horizontal: {
	        contextOffset: isWindow ? 0 : contextOffset.left,
	        contextScroll: isWindow ? 0 : this.oldScroll.x,
	        contextDimension: this.innerWidth(),
	        oldScroll: this.oldScroll.x,
	        forward: 'right',
	        backward: 'left',
	        offsetProp: 'left'
	      },
	      vertical: {
	        contextOffset: isWindow ? 0 : contextOffset.top,
	        contextScroll: isWindow ? 0 : this.oldScroll.y,
	        contextDimension: this.innerHeight(),
	        oldScroll: this.oldScroll.y,
	        forward: 'down',
	        backward: 'up',
	        offsetProp: 'top'
	      }
	    }

	    for (var axisKey in axes) {
	      var axis = axes[axisKey]
	      for (var waypointKey in this.waypoints[axisKey]) {
	        var waypoint = this.waypoints[axisKey][waypointKey]
	        var adjustment = waypoint.options.offset
	        var oldTriggerPoint = waypoint.triggerPoint
	        var elementOffset = 0
	        var freshWaypoint = oldTriggerPoint == null
	        var contextModifier, wasBeforeScroll, nowAfterScroll
	        var triggeredBackward, triggeredForward

	        if (waypoint.element !== waypoint.element.window) {
	          elementOffset = waypoint.adapter.offset()[axis.offsetProp]
	        }

	        if (typeof adjustment === 'function') {
	          adjustment = adjustment.apply(waypoint)
	        }
	        else if (typeof adjustment === 'string') {
	          adjustment = parseFloat(adjustment)
	          if (waypoint.options.offset.indexOf('%') > - 1) {
	            adjustment = Math.ceil(axis.contextDimension * adjustment / 100)
	          }
	        }

	        contextModifier = axis.contextScroll - axis.contextOffset
	        waypoint.triggerPoint = elementOffset + contextModifier - adjustment
	        wasBeforeScroll = oldTriggerPoint < axis.oldScroll
	        nowAfterScroll = waypoint.triggerPoint >= axis.oldScroll
	        triggeredBackward = wasBeforeScroll && nowAfterScroll
	        triggeredForward = !wasBeforeScroll && !nowAfterScroll

	        if (!freshWaypoint && triggeredBackward) {
	          waypoint.queueTrigger(axis.backward)
	          triggeredGroups[waypoint.group.id] = waypoint.group
	        }
	        else if (!freshWaypoint && triggeredForward) {
	          waypoint.queueTrigger(axis.forward)
	          triggeredGroups[waypoint.group.id] = waypoint.group
	        }
	        else if (freshWaypoint && axis.oldScroll >= waypoint.triggerPoint) {
	          waypoint.queueTrigger(axis.forward)
	          triggeredGroups[waypoint.group.id] = waypoint.group
	        }
	      }
	    }

	    Waypoint.requestAnimationFrame(function() {
	      for (var groupKey in triggeredGroups) {
	        triggeredGroups[groupKey].flushTriggers()
	      }
	    })

	    return this
	  }

	  /* Private */
	  Context.findOrCreateByElement = function(element) {
	    return Context.findByElement(element) || new Context(element)
	  }

	  /* Private */
	  Context.refreshAll = function() {
	    for (var contextId in contexts) {
	      contexts[contextId].refresh()
	    }
	  }

	  /* Public */
	  /* http://imakewebthings.com/waypoints/api/context-find-by-element */
	  Context.findByElement = function(element) {
	    return contexts[element.waypointContextKey]
	  }

	  window.onload = function() {
	    if (oldWindowLoad) {
	      oldWindowLoad()
	    }
	    Context.refreshAll()
	  }

	  Waypoint.requestAnimationFrame = function(callback) {
	    var requestFn = window.requestAnimationFrame ||
	      window.mozRequestAnimationFrame ||
	      window.webkitRequestAnimationFrame ||
	      requestAnimationFrameShim
	    requestFn.call(window, callback)
	  }
	  Waypoint.Context = Context
	}())
	;(function() {
	  'use strict'

	  function byTriggerPoint(a, b) {
	    return a.triggerPoint - b.triggerPoint
	  }

	  function byReverseTriggerPoint(a, b) {
	    return b.triggerPoint - a.triggerPoint
	  }

	  var groups = {
	    vertical: {},
	    horizontal: {}
	  }
	  var Waypoint = window.Waypoint

	  /* http://imakewebthings.com/waypoints/api/group */
	  function Group(options) {
	    this.name = options.name
	    this.axis = options.axis
	    this.id = this.name + '-' + this.axis
	    this.waypoints = []
	    this.clearTriggerQueues()
	    groups[this.axis][this.name] = this
	  }

	  /* Private */
	  Group.prototype.add = function(waypoint) {
	    this.waypoints.push(waypoint)
	  }

	  /* Private */
	  Group.prototype.clearTriggerQueues = function() {
	    this.triggerQueues = {
	      up: [],
	      down: [],
	      left: [],
	      right: []
	    }
	  }

	  /* Private */
	  Group.prototype.flushTriggers = function() {
	    for (var direction in this.triggerQueues) {
	      var waypoints = this.triggerQueues[direction]
	      var reverse = direction === 'up' || direction === 'left'
	      waypoints.sort(reverse ? byReverseTriggerPoint : byTriggerPoint)
	      for (var i = 0, end = waypoints.length; i < end; i += 1) {
	        var waypoint = waypoints[i]
	        if (waypoint.options.continuous || i === waypoints.length - 1) {
	          waypoint.trigger([direction])
	        }
	      }
	    }
	    this.clearTriggerQueues()
	  }

	  /* Private */
	  Group.prototype.next = function(waypoint) {
	    this.waypoints.sort(byTriggerPoint)
	    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
	    var isLast = index === this.waypoints.length - 1
	    return isLast ? null : this.waypoints[index + 1]
	  }

	  /* Private */
	  Group.prototype.previous = function(waypoint) {
	    this.waypoints.sort(byTriggerPoint)
	    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
	    return index ? this.waypoints[index - 1] : null
	  }

	  /* Private */
	  Group.prototype.queueTrigger = function(waypoint, direction) {
	    this.triggerQueues[direction].push(waypoint)
	  }

	  /* Private */
	  Group.prototype.remove = function(waypoint) {
	    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
	    if (index > -1) {
	      this.waypoints.splice(index, 1)
	    }
	  }

	  /* Public */
	  /* http://imakewebthings.com/waypoints/api/first */
	  Group.prototype.first = function() {
	    return this.waypoints[0]
	  }

	  /* Public */
	  /* http://imakewebthings.com/waypoints/api/last */
	  Group.prototype.last = function() {
	    return this.waypoints[this.waypoints.length - 1]
	  }

	  /* Private */
	  Group.findOrCreate = function(options) {
	    return groups[options.axis][options.name] || new Group(options)
	  }

	  Waypoint.Group = Group
	}())
	;(function() {
	  'use strict'

	  var Waypoint = window.Waypoint

	  function isWindow(element) {
	    return element === element.window
	  }

	  function getWindow(element) {
	    if (isWindow(element)) {
	      return element
	    }
	    return element.defaultView
	  }

	  function NoFrameworkAdapter(element) {
	    this.element = element
	    this.handlers = {}
	  }

	  NoFrameworkAdapter.prototype.innerHeight = function() {
	    var isWin = isWindow(this.element)
	    return isWin ? this.element.innerHeight : this.element.clientHeight
	  }

	  NoFrameworkAdapter.prototype.innerWidth = function() {
	    var isWin = isWindow(this.element)
	    return isWin ? this.element.innerWidth : this.element.clientWidth
	  }

	  NoFrameworkAdapter.prototype.off = function(event, handler) {
	    function removeListeners(element, listeners, handler) {
	      for (var i = 0, end = listeners.length - 1; i < end; i++) {
	        var listener = listeners[i]
	        if (!handler || handler === listener) {
	          element.removeEventListener(listener)
	        }
	      }
	    }

	    var eventParts = event.split('.')
	    var eventType = eventParts[0]
	    var namespace = eventParts[1]
	    var element = this.element

	    if (namespace && this.handlers[namespace] && eventType) {
	      removeListeners(element, this.handlers[namespace][eventType], handler)
	      this.handlers[namespace][eventType] = []
	    }
	    else if (eventType) {
	      for (var ns in this.handlers) {
	        removeListeners(element, this.handlers[ns][eventType] || [], handler)
	        this.handlers[ns][eventType] = []
	      }
	    }
	    else if (namespace && this.handlers[namespace]) {
	      for (var type in this.handlers[namespace]) {
	        removeListeners(element, this.handlers[namespace][type], handler)
	      }
	      this.handlers[namespace] = {}
	    }
	  }

	  /* Adapted from jQuery 1.x offset() */
	  NoFrameworkAdapter.prototype.offset = function() {
	    if (!this.element.ownerDocument) {
	      return null
	    }

	    var documentElement = this.element.ownerDocument.documentElement
	    var win = getWindow(this.element.ownerDocument)
	    var rect = {
	      top: 0,
	      left: 0
	    }

	    if (this.element.getBoundingClientRect) {
	      rect = this.element.getBoundingClientRect()
	    }

	    return {
	      top: rect.top + win.pageYOffset - documentElement.clientTop,
	      left: rect.left + win.pageXOffset - documentElement.clientLeft
	    }
	  }

	  NoFrameworkAdapter.prototype.on = function(event, handler) {
	    var eventParts = event.split('.')
	    var eventType = eventParts[0]
	    var namespace = eventParts[1] || '__default'
	    var nsHandlers = this.handlers[namespace] = this.handlers[namespace] || {}
	    var nsTypeList = nsHandlers[eventType] = nsHandlers[eventType] || []

	    nsTypeList.push(handler)
	    this.element.addEventListener(eventType, handler)
	  }

	  NoFrameworkAdapter.prototype.outerHeight = function(includeMargin) {
	    var height = this.innerHeight()
	    var computedStyle

	    if (includeMargin && !isWindow(this.element)) {
	      computedStyle = window.getComputedStyle(this.element)
	      height += parseInt(computedStyle.marginTop, 10)
	      height += parseInt(computedStyle.marginBottom, 10)
	    }

	    return height
	  }

	  NoFrameworkAdapter.prototype.outerWidth = function(includeMargin) {
	    var width = this.innerWidth()
	    var computedStyle

	    if (includeMargin && !isWindow(this.element)) {
	      computedStyle = window.getComputedStyle(this.element)
	      width += parseInt(computedStyle.marginLeft, 10)
	      width += parseInt(computedStyle.marginRight, 10)
	    }

	    return width
	  }

	  NoFrameworkAdapter.prototype.scrollLeft = function() {
	    var win = getWindow(this.element)
	    return win ? win.pageXOffset : this.element.scrollLeft
	  }

	  NoFrameworkAdapter.prototype.scrollTop = function() {
	    var win = getWindow(this.element)
	    return win ? win.pageYOffset : this.element.scrollTop
	  }

	  NoFrameworkAdapter.extend = function() {
	    var args = Array.prototype.slice.call(arguments)

	    function merge(target, obj) {
	      if (typeof target === 'object' && typeof obj === 'object') {
	        for (var key in obj) {
	          if (obj.hasOwnProperty(key)) {
	            target[key] = obj[key]
	          }
	        }
	      }

	      return target
	    }

	    for (var i = 1, end = args.length; i < end; i++) {
	      merge(args[0], args[i])
	    }
	    return args[0]
	  }

	  NoFrameworkAdapter.inArray = function(element, array, i) {
	    return array == null ? -1 : array.indexOf(element, i)
	  }

	  NoFrameworkAdapter.isEmptyObject = function(obj) {
	    /* eslint no-unused-vars: 0 */
	    for (var name in obj) {
	      return false
	    }
	    return true
	  }

	  Waypoint.adapters.push({
	    name: 'noframework',
	    Adapter: NoFrameworkAdapter
	  })
	  Waypoint.Adapter = NoFrameworkAdapter
	}())
	;

	/*** EXPORTS FROM exports-loader ***/
	module.exports = Waypoint;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _tree_node = __webpack_require__(3);

	var _tree_node2 = _interopRequireDefault(_tree_node);

	var _dom_helper = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var StickyTree = function () {
	  function StickyTree() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    _classCallCheck(this, StickyTree);

	    this.initialOffset = options.offset || 0;
	    this.elementsTree = new _tree_node2.default();
	  }

	  _createClass(StickyTree, [{
	    key: 'add',
	    value: function add(element) {
	      var node = this.elementsTree;

	      var found = false;

	      while (!node.isLeaf() && !found) {
	        if (node.lastChild().data.level == element.level) {
	          node.addChild(element);
	          found = true;
	        } else {
	          node = node.lastChild();
	        }
	      }

	      if (!found) {
	        node.addChild(element);
	      }
	    }

	    /*
	    * Distance from top of viewport, where an element should stick
	    */

	  }, {
	    key: 'getOffset',
	    value: function getOffset(element) {
	      var node = this.elementsTree.findNode(element);
	      var ancestors = node.getAncestors();

	      var offset = this._sumHeight(ancestors);

	      return offset + this.initialOffset;
	    }

	    /*
	    * Distance from top of viewport of which the elements above the given elements should
	    * start rising up
	    */

	  }, {
	    key: 'getTransitionOffset',
	    value: function getTransitionOffset(element) {
	      var node = this.elementsTree.findNode(element);
	      var previousSibling = node.getPreviousSiblingNode();

	      if (previousSibling === undefined) {
	        return this.initialOffset;
	      }

	      var previousSubtree = previousSibling.getLastChildSubtree();

	      var offset = this._sumHeight(previousSubtree);

	      return offset + this.getOffset(previousSibling.data);
	    }

	    /*
	    * All elements that will be transitioned when given element becomes sticky
	    */

	  }, {
	    key: 'getTransitionedElements',
	    value: function getTransitionedElements(element) {
	      var node = this.elementsTree.findNode(element);
	      var previousSibling = node.getPreviousSiblingNode();

	      if (previousSibling === undefined) {
	        return [];
	      }

	      return previousSibling.getLastChildSubtree();
	    }
	  }, {
	    key: 'getSubtreeHeight',
	    value: function getSubtreeHeight(element) {
	      var node = this.elementsTree.findNode(element);
	      var lastChildSubtree = node.getLastChildSubtree();

	      var subtreeHieght = this._sumHeight(lastChildSubtree);

	      return subtreeHieght;
	    }
	  }, {
	    key: '_sumHeight',
	    value: function _sumHeight(elements) {
	      var height = elements.reduce(function (result, element) {
	        return result + (0, _dom_helper.getOuterHeight)(element.domElement);
	      }, 0);

	      return height;
	    }
	  }]);

	  return StickyTree;
	}();

	exports.default = StickyTree;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TreeNode = function () {
	  function TreeNode(parent, data) {
	    _classCallCheck(this, TreeNode);

	    this.parent = parent;
	    this.isRoot = parent === undefined;
	    this.data = data;
	    this.children = [];
	  }

	  _createClass(TreeNode, [{
	    key: "addChild",
	    value: function addChild(data) {
	      var child = new TreeNode(this, data);
	      this.children.push(child);

	      return child;
	    }
	  }, {
	    key: "isLeaf",
	    value: function isLeaf() {
	      return this.children.length == 0;
	    }
	  }, {
	    key: "lastChild",
	    value: function lastChild() {
	      return this.children[this.children.length - 1];
	    }
	  }, {
	    key: "findNode",
	    value: function findNode(data) {
	      if (this.data && this.data === data) {
	        return this;
	      } else {
	        for (var i in this.children) {
	          var child = this.children[i];
	          var result = child.findNode(data);
	          if (result !== undefined) {
	            return result;
	          }
	        }
	      }
	    }
	  }, {
	    key: "findNodeByAttribute",
	    value: function findNodeByAttribute(attribute, value) {
	      if (this.data && this.data[attribute] === value) {
	        return this;
	      } else {
	        for (var i in this.children) {
	          var child = this.children[i];
	          var result = child.findNode(attribute, value);
	          if (result !== undefined) {
	            return result;
	          }
	        }
	      }
	    }
	  }, {
	    key: "getAncestors",
	    value: function getAncestors() {
	      var result = [];

	      var node = this;
	      while (node.parent.isRoot === false) {
	        result.unshift(node.parent.data);
	        node = node.parent;
	      }

	      return result;
	    }
	  }, {
	    key: "getLastChildSubtree",
	    value: function getLastChildSubtree() {
	      var result = [];
	      var node = this;

	      while (node !== undefined) {
	        result.push(node.data);
	        node = node.lastChild();
	      }

	      return result;
	    }
	  }, {
	    key: "getPreviousSiblingNode",
	    value: function getPreviousSiblingNode() {
	      var indexInParant = this.parent.children.indexOf(this);
	      if (indexInParant > 0) {
	        return this.parent.children[indexInParant - 1];
	      }
	    }
	  }]);

	  return TreeNode;
	}();

	exports.default = TreeNode;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.wrap = wrap;
	exports.unwrap = unwrap;
	exports.getOffset = getOffset;
	exports.getOuterHeight = getOuterHeight;
	exports.toggleClass = toggleClass;
	function wrap(wrappingHtml, wrappedElement) {
	  var div = document.createElement('div');
	  div.innerHTML = wrappingHtml;
	  var wrapper = div.childNodes[0];

	  wrappedElement.parentNode.insertBefore(wrapper, wrappedElement);
	  wrappedElement.parentNode.removeChild(wrappedElement);

	  wrapper.appendChild(wrappedElement);
	}

	function unwrap(element) {
	  var wrapper = element.parentNode;
	  var wrapperParent = wrapper.parentNode;
	  wrapperParent.insertBefore(element, wrapper);
	  wrapperParent.removeChild(wrapper);
	}

	function getOffset(el) {
	  var box = el.getBoundingClientRect();

	  return {
	    top: box.top + window.pageYOffset - document.documentElement.clientTop,
	    left: box.left + window.pageXOffset - document.documentElement.clientLeft
	  };
	}

	function getOuterHeight(el) {
	  var height = el.offsetHeight;
	  var style = getComputedStyle(el);

	  height += parseInt(style.marginTop) + parseInt(style.marginBottom);
	  return height;
	}

	function toggleClass(el, className, isOn) {
	  if (el.classList) {
	    el.classList.toggle(className, isOn);
	  } else {
	    var classes = el.className.split(' ');
	    var existingIndex = classes.indexOf(className);

	    if (isOn) {
	      classes.splice(existingIndex, 1);
	    } else {
	      classes.push(className);
	    }

	    el.className = classes.join(' ');
	  }
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = normlize;

	var _dom_helper = __webpack_require__(4);

	var _stikcy_element = __webpack_require__(6);

	var _stikcy_element2 = _interopRequireDefault(_stikcy_element);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	/*
	* Normalize an array of elements representations as css selectors, array of elements,
	* single elements into the form:
	* [{domElement: DomElement, level: number}, ...]
	*/
	function normlize(elementRepresentations, options) {
	  var normlizeElements = [];
	  var flattenedElements = flattenElements(elementRepresentations, options);

	  normlizeElements = flattenedElements.sort(function (element1, element2) {
	    return (0, _dom_helper.getOffset)(element1.domElement).top - (0, _dom_helper.getOffset)(element2.domElement).top;
	  });

	  return normlizeElements;
	}

	function flattenElements(elementRepresentations, options) {
	  var result = [];
	  var i = 0;

	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = elementRepresentations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var elementRepresentation = _step.value;

	      var domElements = getDomElements(elementRepresentation);

	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = domElements[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var domElement = _step2.value;

	          result.push(new _stikcy_element2.default(domElement, i, options));
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }

	      i++;
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }

	  return result;
	}

	function getDomElements(elementRepresentation) {
	  if (typeof elementRepresentation === "string") {
	    // querySelectorAll returns NodeList which is not an Array. This trick
	    // converts it into an array
	    return [].concat(_toConsumableArray(document.querySelectorAll(elementRepresentation)));
	  }

	  if (elementRepresentation.length !== undefined) {
	    return elementRepresentation;
	  }

	  return [elementRepresentation];
	}
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _dom_helper = __webpack_require__(4);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MAX_LEVEL = 100;

	var StickyElement = function () {
	  function StickyElement(domElement, level, options) {
	    _classCallCheck(this, StickyElement);

	    this.options = options;
	    this.domElement = domElement;
	    this.level = level;

	    this.state = 'static';
	  }

	  _createClass(StickyElement, [{
	    key: 'wrap',
	    value: function wrap() {
	      (0, _dom_helper.wrap)('<div class="sticky-stack-wrapper" />', this.domElement);
	    }
	  }, {
	    key: 'makeSticky',
	    value: function makeSticky(offset) {
	      var wrapperHeight = (0, _dom_helper.getOuterHeight)(this.domElement);
	      this.wrapper.style.height = wrapperHeight + 'px';

	      this._addStuckClass();

	      this._css('position', 'fixed');
	      this._css('top', offset + 'px');
	      this._css('z-index', this._getZIndex());

	      this.state = 'sticky';
	    }
	  }, {
	    key: 'makeTransitioned',
	    value: function makeTransitioned(offset) {
	      this._css('position', 'absolute');
	      this._css('top', offset + 'px');
	      this._css('z-index', this._getZIndex());

	      this.state = 'transitioned';
	    }
	  }, {
	    key: 'makeStatic',
	    value: function makeStatic() {
	      this.cleanStyle();
	      this._removeStuckClass();

	      this.state = 'static';
	    }
	  }, {
	    key: 'isSticky',
	    value: function isSticky() {
	      return this.state === 'sticky';
	    }
	  }, {
	    key: 'isTransitioned',
	    value: function isTransitioned() {
	      return this.state === 'transitioned';
	    }
	  }, {
	    key: 'updateOffset',
	    value: function updateOffset(offset) {
	      this._css('position', offset);
	    }
	  }, {
	    key: 'cleanStyle',
	    value: function cleanStyle() {
	      this._css('position', undefined);
	      this._css('top', undefined);
	      this._css('z-index', undefined);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.cleanStyle();
	      (0, _dom_helper.unwrap)(this.domElement);
	      this._removeStuckClass();
	    }
	  }, {
	    key: '_getZIndex',
	    value: function _getZIndex() {
	      return 1000 + (MAX_LEVEL - this.level) * 10;
	    }
	  }, {
	    key: '_addStuckClass',
	    value: function _addStuckClass() {
	      this._toggleStuckClass(true);
	    }
	  }, {
	    key: '_removeStuckClass',
	    value: function _removeStuckClass() {
	      this._toggleStuckClass(false);
	    }
	  }, {
	    key: '_toggleStuckClass',
	    value: function _toggleStuckClass(isSet) {
	      (0, _dom_helper.toggleClass)(this.domElement, this.options.stuckClass, isSet);
	    }
	  }, {
	    key: '_css',
	    value: function _css(attribute, value) {
	      if (value === undefined) {
	        this.domElement.style.removeProperty(attribute);
	      } else {
	        this.domElement.style[attribute] = value;
	      }
	    }
	  }, {
	    key: 'wrapper',
	    get: function get() {
	      return this.domElement.parentNode;
	    }
	  }]);

	  return StickyElement;
	}();

	exports.default = StickyElement;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.removeFromArray = removeFromArray;
	exports.applyDefaults = applyDefaults;
	function removeFromArray(array, item) {
	  var i = void 0;

	  if ((i = array.indexOf(item)) > -1) {
	    array.splice(i, 1);
	  }
	}

	function applyDefaults(target, defaults) {
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = Object.keys(defaults)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var key = _step.value;

	      if (target[key] === undefined) {
	        target[key] = defaults[key];
	      }
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	}

/***/ }
/******/ ])
});
;