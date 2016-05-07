import TreeNode from './tree_node.js'
import {getOuterHeight} from './dom_helper.js'

export default class StickyTree{
  constructor(options = {}){
    this.initialOffset = options.offset || 0;
    this.elementsTree = new TreeNode();
  }

  add(element){
    let node = this.elementsTree;

    let found = false;

    while(!node.isLeaf() && !found){
      if(node.lastChild().data.level == element.level){
        node.addChild(element);
        found = true;
      } else {
        node = node.lastChild();
      }
    }

    if(!found){
      node.addChild(element);
    }
  }

  /*
  * Distance from top of viewport, where an element should stick
  */
  getOffset(element){
    let node = this.elementsTree.findNode(element);
    let ancestors = node.getAncestors();

    let offset = this._sumHeight(ancestors)

    return offset + this.initialOffset;
  }

  /*
  * Distance from top of viewport of which the elements above the given elements should
  * start rising up
  */
  getTransitionOffset(element){
    let node = this.elementsTree.findNode(element);
    let previousSibling = node.getPreviousSiblingNode();

    if(previousSibling === undefined){
      return this.initialOffset;
    }

    let previousSubtree = previousSibling.getLastChildSubtree()

    let offset = this._sumHeight(previousSubtree);

    return offset + this.getOffset(previousSibling.data);
  }

  /*
  * All elements that will be transitioned when given element becomes sticky
  */
  getTransitionedElements(element){
    let node = this.elementsTree.findNode(element);
    let previousSibling = node.getPreviousSiblingNode();

    if(previousSibling === undefined){
      return [];
    }

    return previousSibling.getLastChildSubtree();
  }

  getSubtreeHeight(element){
    let node = this.elementsTree.findNode(element);
    let lastChildSubtree = node.getLastChildSubtree();

    let subtreeHieght = this._sumHeight(lastChildSubtree);

    return subtreeHieght;
  }

  _sumHeight(elements){
    let height = elements.reduce((result, element) => {
      return result + getOuterHeight(element.domElement);
    }, 0);

    return height;
  }
}
