import chai from 'chai';

import {createElement} from './specs_helper.js'

import StickyTree from '../src/sticky_tree.js'

chai.expect();
const expect = chai.expect;

describe('StickyTree', () => {
  let div1, div2, div3;

  beforeEach( ()=> {
    div1 = createElement({height: '100px'});
    div2 = createElement({height: '200px'});
    div3 = createElement({height: '300px'});
  })

  describe('add', () => {
    it('puts two elements from the same level into the same tree level', () => {
      let stickyTree = new StickyTree();
      let div1 = createElement({height: '100px'});
      let div2 = createElement({height: '100px'})
      stickyTree.add({
        domElement: div1,
        level: 1
      })

      stickyTree.add({
        domElement: div2,
        level: 1
      })

      expect(stickyTree.elementsTree.children[0].data.domElement).to.equal(div1)
      expect(stickyTree.elementsTree.children[1].data.domElement).to.equal(div2)
    })

    it('puts element with bigger level as children of elements with smaller level', () => {
      let stickyTree = new StickyTree();
      let div1 = createElement({height: '100px'});
      let div2 = createElement({height: '100px'})
      stickyTree.add({
        domElement: div1,
        level: 1
      })

      stickyTree.add({
        domElement: div2,
        level: 2
      })

      expect(stickyTree.elementsTree.children[0].data.domElement).to.equal(div1)
      expect(stickyTree.elementsTree.children[0].children[0].data.domElement).to.equal(div2)
    })
  })

  describe('getOffset', () => {
    it('returns the initial offset for the first element', () => {
      let stickyTree = new StickyTree({
        offset: 50
      })

      let element = {domElement: div1, level: 1}

      stickyTree.add(element)

      let result = stickyTree.getOffset(element);
      expect(result).to.equal(50)
    })

    it('returns the offset based on previous, higher level elements', () => {
      let stickyTree = new StickyTree()

      let element2 = {domElement: div2, level: 2}
      stickyTree.add({
        domElement: div1,
        level: 1
      })

      stickyTree.add(element2);

      let result = stickyTree.getOffset(element2);
      expect(result).to.equal(100)
    })

    it('does not take into account elements from same level', () => {
      let stickyTree = new StickyTree()

      stickyTree.add({
        domElement: div1,
        level: 1
      })

      stickyTree.add({
        domElement: div2,
        level: 2
      })

      let element3 = {domElement: div3, level: 2}
      stickyTree.add(element3)

      let result = stickyTree.getOffset(element3);
      expect(result).to.equal(100)
    })


    it('does not take into account later elements', () => {
      let stickyTree = new StickyTree()

      stickyTree.add({
        domElement: div1,
        level: 1
      })

      let element2 = {domElement: div2, level: 2};
      stickyTree.add(element2);

      stickyTree.add({
        domElement: div3,
        level: 2
      })

      let result = stickyTree.getOffset(element2);
      expect(result).to.equal(100)
    })
  })

  describe('getTransitionOffset', () => {
    it('returns the sum of the offsets of an element previous sibling + offset of previous element', () => {
      let stickyTree = new StickyTree()

      stickyTree.add({
        domElement: div1,
        level: 1
      })

      stickyTree.add({
        domElement: div2,
        level: 2
      })

      let element3 = {domElement: div3, level: 2};
      stickyTree.add(element3);

      let result = stickyTree.getTransitionOffset(element3);
      expect(result).to.equal(300)
    })

    it('returns the initial offset for the first element', () => {
      let stickyTree = new StickyTree({offset: 50})

      let element = {domElement: div1, level: 1};
      stickyTree.add(element)

      let result = stickyTree.getTransitionOffset(element);
      expect(result).to.equal(50)
    })

    it('add initial offset to result', () => {
      let stickyTree = new StickyTree({offset: 50})

      stickyTree.add({
        domElement: div1,
        level: 1
      })

      let element = {domElement: div2, level: 1};
      stickyTree.add(element)

      let result = stickyTree.getTransitionOffset(element);
      expect(result).to.equal(150)
    })
  })

  describe('getSubtreeHeight', () => {
    it('returns the sum of all last child subtree elements height', () => {
      let stickyTree = new StickyTree({offset: 50})

      let element = {domElement: div1, level: 1};
      stickyTree.add(element)

      stickyTree.add({
        domElement: div2,
        level: 2
      })

      stickyTree.add({
        domElement: div3,
        level: 1
      })

      let result = stickyTree.getSubtreeHeight(element);
      expect(result).to.equal(300)
    })
  })
})
