import {wrap, unwrap, getOffset, getOuterHeight, toggleClass} from './dom_helper.js'

const MAX_LEVEL = 100;

export default class StickyElement{
  constructor(domElement, level, options){
    this.options = options;
    this.domElement = domElement;
    this.level = level;

    this.state = 'static';
  }

  wrap(){
    wrap('<div class="sticky-stack-wrapper" />', this.domElement)
  }

  get wrapper(){
    return this.domElement.parentNode;
  }

  makeSticky(offset){
    let wrapperHeight = getOuterHeight(this.domElement);
    this.wrapper.style.height = `${wrapperHeight}px`;

    this._addStuckClass();

    this._css('position', 'fixed');
    this._css('top', `${offset}px`);
    this._css('z-index', this._getZIndex())

    this.state = 'sticky';
  }

  makeTransitioned(offset){
    this._css('position', 'absolute');
    this._css('top', `${offset}px`);
    this._css('z-index', this._getZIndex())

    this.state = 'transitioned';
  }

  makeStatic(){
    this.cleanStyle();
    this._removeStuckClass();

    this.state = 'static';
  }

  isSticky(){
    return this.state === 'sticky';
  }

  isTransitioned(){
    return this.state === 'transitioned';
  }

  updateOffset(offset){
    this._css('position', offset);
  }

  cleanStyle(){
    this._css('position', undefined);
    this._css('top', undefined);
    this._css('z-index', undefined);
  }

  destroy(){
    this.cleanStyle();
    unwrap(this.domElement);
    this._removeStuckClass();
  }

  _getZIndex(){
    return 1000 + (MAX_LEVEL - this.level) * 10
  }

  _addStuckClass(){
    this._toggleStuckClass(true);
  }

  _removeStuckClass(){
    this._toggleStuckClass(false);
  }

  _toggleStuckClass(isSet){
    toggleClass(this.domElement, this.options.stuckClass, isSet);
  }

  _css(attribute, value){
    if(value === undefined){
      this.domElement.style.removeProperty(attribute);
    } else{
      this.domElement.style[attribute] = value;
    }
  }
}
