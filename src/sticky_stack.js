import Waypoint from 'exports?Waypoint!waypoints/lib/noframework.waypoints.js'

import StickyTree from './sticky_tree.js'
import normlize from './elements_normalizer.js'
import {wrap, unwrap, getOffset, getOuterHeight, toggleClass} from './dom_helper.js'
import {removeFromArray, applyDefaults} from './helpers.js'

const DEFAULT_OPTIONS = {
  stuckClass: 'sticky-stack-stuck',
  offset: 0
}

export default class StickyStack{
  constructor(elementRepresentations, options = {}){
    applyDefaults(options, DEFAULT_OPTIONS);
    this.options = options;

    this.elements = normlize(elementRepresentations, options);

    this._wrapElements(this.elements)

    let tree = this._createStickyTree(this.elements);
    this.waypoints = this._createWaypoints(this.elements, tree);
  }

  refresh(){
    let tree = this._createStickyTree(this.elements);
    this._destroyWaypoints(this.waypoints);
    this._createWaypoints(this.elements, tree)

    let stickyElements = this.elements.filter( element => element.isSticky());
    let transitioningElements = this.elements.filter( element => element.isTransitioned());

    for(let element of stickyElements){
      let offset = tree.getOffset(element)
      element.updateOffset(offset);
    }

    for(let element of transitioningElements){
      let transitionOffset = getOffset(element.wrapper).top - tree.getSubtreeHeight(element);
      element.updateOffset(transitionOffset);
    }
  }

  destroy(){
    this._destroyWaypoints(this.waypoints);
    this._destroyElements(this.elements);
  }

  _wrapElements(elements){
    elements.forEach((element) => {
      element.wrap();
    });
  }

  _createStickyTree(elements){
    let tree = new StickyTree();

    elements.forEach((element) => {
      tree.add(element)
    })

    return tree;
  }

  _createWaypoints(elements, tree){
    let waypoints = [];
    elements.forEach((element) => {
      let stickyWaypoint = this._createStickyWaypoint(element, tree);
      let transitionWaypoint = this._createTransitionWaypoint(element, tree);

      waypoints.push(stickyWaypoint);
      waypoints.push(transitionWaypoint);
    })

    return waypoints;
  }

  _createStickyWaypoint(element, tree){
    let wrapper = element.wrapper;
    let offset = tree.getOffset(element);

    let waypoint = new Waypoint({
      element: wrapper,
      offset: offset,
      handler: (direction) => {
        this._handleElementReachStickyWaypoint(direction, element, tree)
      }
    })

    return waypoint;
  }

  _handleElementReachStickyWaypoint(direction, element, tree){
    let shouldBeStuck = direction == 'down'

    if(shouldBeStuck){
      let offset = tree.getOffset(element)
      element.makeSticky(offset);
    } else{
      element.makeStatic();
    }
  }

  /*
  * The transition point is the point where the predecessors of the element starts
  * moving up, together with the current element
  */
  _createTransitionWaypoint(element, tree){
    let wrapper = element.wrapper;

    let transitionOffset = tree.getTransitionOffset(element);

    let waypoint = new Waypoint({
      element: wrapper,
      offset: transitionOffset,
      handler: (direction) => {
        this._handleElementReachTransitionPoint(direction, element, tree);
      }
    })

    return waypoint;
  }

  _handleElementReachTransitionPoint(direction, element, tree){
    let wrapper = element.wrapper;
    let transitionedElements = tree.getTransitionedElements(element);
    let isTransitioningIn = direction === 'down';

    transitionedElements.forEach((transitionedElement) => {
      if(isTransitioningIn){
        let transitionOffset = getOffset(wrapper).top - tree.getSubtreeHeight(transitionedElement);
        transitionedElement.makeTransitioned(transitionOffset);
      } else {
        let offset = tree.getOffset(transitionedElement);
        transitionedElement.makeSticky(offset);
      }
    });
  }

  _destroyElements(elements){
    for(let element of elements){
      element.destroy();
    }
  }

  _destroyWaypoints(waypoints){
    for(let waypoint of waypoints){
      waypoint.destroy();
    }
  }
}
