import chai from 'chai';

import TreeNode from '../src/tree_node.js'

chai.expect();

const expect = chai.expect;

describe('TreeNode', () => {
  let tree, data1, data2, data3;

  beforeEach( () => {
    data1 = {id: 1};
    data2 = {id: 2};
    data3 = {id: 3};

    tree = new TreeNode();
  })

  describe('addNode', () => {
    it('returns the created Node', () => {
      let result = tree.addChild(data1);

      expect(result).to.instanceof(TreeNode);
      expect(result.data).to.equal(data1);
    })

    it('sets the parent of the new node', () => {
      let node = tree.addChild();
      let result = node.parent;
      expect(result).to.equal(tree);
    })
  })

  describe('getAncestors', () => {
    it('returns all of the nodes ancestors', () => {
      let tree = new TreeNode();
      let n2 = tree
        .addChild(data1)
          .addChild(data2);

      let result = n2.getAncestors();
      let expected = [data1];
      expect(result).to.deep.equal(expected);
    })

    it('returns all of the nodes ancestors of several levels', () => {
      let tree = new TreeNode();
      let n3 = tree
        .addChild(data1)
          .addChild(data2)
            .addChild(data3);

      let result = n3.getAncestors();
      let expected = [data1, data2];
      expect(result).to.deep.equal(expected);
    })
  })

  describe('isLeaf', () => {
    it('returns true is the node has no children', () => {
      expect(tree.isLeaf()).to.equal(true);
    })
  })

  describe('lastChild', () => {
    it('returns the last child of a node', () => {
      let n3 = tree
        .addChild(data1).parent
        .addChild(data2).parent
        .addChild(data3)

      expect(tree.lastChild()).to.equal(n3);
    })
  })

  describe('findNode', () => {
    it('finds node by its data', () => {
      let n3 = tree
          .addChild(data1)
            .addChild(data2).parent
          .addChild(data3)

      let result = tree.findNode(data3);
      expect(result).to.equal(n3);
    })
  })

  describe('getLastChildSubtree', () => {
    it('returns all the nodes in the recursive last child node', () => {
      tree.addChild(data1)
            .addChild(data2).parent
            .addChild(data3)
              .addChild({id: 4}).parent

      let n1 = tree.findNode(data1);
      expect(n1.getLastChildSubtree()).to.deep.equal([{id:1}, data3, {id: 4}])
    })
  })

  describe('getPreviousSiblingNode', () => {
    it('returns the previouse sibling of the node', () => {
      tree.addChild(data1)
            .addChild(data2).parent
            .addChild(data3)
              .addChild({id: 4}).parent

      let n2 = tree.findNode(data2);
      let n3 = tree.findNode(data3);

      expect(n3.getPreviousSiblingNode()).to.equal(n2);
    })
  })
})
