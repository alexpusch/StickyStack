export default class TreeNode{
  constructor(parent, data){
    this.parent = parent;
    this.isRoot = parent === undefined;
    this.data = data;
    this.children = [];
  }

  addChild(data){
    let child = new TreeNode(this, data);
    this.children.push(child);

    return child;
  }

  isLeaf(){
    return this.children.length == 0;
  }

  lastChild(){
    return this.children[this.children.length - 1];
  }

  findNode(data){
    if (this.data && this.data === data){
      return this;
    } else{
      for(let i in this.children){
        let child = this.children[i];
        let result = child.findNode(data)
        if(result !== undefined){
          return result;
        }
      }
    }
  }

  findNodeByAttribute(attribute, value){
    if (this.data && this.data[attribute] === value){
      return this;
    } else{
      for(let i in this.children){
        let child = this.children[i];
        let result = child.findNode(attribute, value)
        if(result !== undefined){
          return result;
        }
      }
    }
  }

  getAncestors(){
    let result = [];

    let node = this;
    while(node.parent.isRoot === false){
      result.unshift(node.parent.data);
      node = node.parent;
    }

    return result;
  }

  getLastChildSubtree(){
    let result = [];
    let node = this;

    while(node !== undefined){
      result.push(node.data);
      node = node.lastChild();
    }

    return result;
  }

  getPreviousSiblingNode(){
    let indexInParant = this.parent.children.indexOf(this);
    if (indexInParant > 0){
      return this.parent.children[indexInParant - 1];
    }
  }
}
