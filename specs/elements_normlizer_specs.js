import chai from 'chai';
import normlize from '../src/elements_normalizer.js'
import StickyElement from '../src/stikcy_element.js'
import $ from 'jquery'
import {sandbox, createElement} from './specs_helper.js'

chai.expect();
const expect = chai.expect;

function createElement100(id){
  let element = createElement({height: '100px', width: '100px'});
  element.id = `e${id}`

  return element;
}

describe('elements_normlizer.js', () => {
  let e1, e2, e3

  beforeEach(() => {
    e1 = createElement100(1);
    e2 = createElement100(2);
    e3 = createElement100(3);
  })

  describe('normlize', () => {

    it('adds each elment its level', () => {
      let expected = [new StickyElement(e1, 0), new StickyElement(e2, 1)];

      let result = normlize([e1, e2])

      expect(result).to.deep.equal(expected)
    })

    it('orders elements by their appearance on the page', () => {
      let expected = [
        new StickyElement(e1, 1),
        new StickyElement(e2, 0),
      ]
      let result = normlize([e2, e1])
      expect(result).to.deep.equal(expected)
    })


    it('gives same level to all elements in an sub array', () => {
      let expected = [
        new StickyElement(e1, 0),
        new StickyElement(e2, 0),
        new StickyElement(e3, 1),
      ]
      let result = normlize([[e1, e2], e3])
      expect(result).to.deep.equal(expected)
    })

    it('gives same level to all elements in an jquery object', () => {
      let expected = [
        new StickyElement(e1, 0),
        new StickyElement(e2, 0),
        new StickyElement(e3, 1),
      ]

      let level0 = $(sandbox).find($('#e1, #e2'))
      let result = normlize([level0, e3])
      expect(result).to.deep.equal(expected)
    })

    it('gives same level to all elements in an css selector', () => {
      let expected = [
        new StickyElement(e1, 0),
        new StickyElement(e2, 0),
        new StickyElement(e3, 1),
      ]
      let result = normlize(['#e1, #e2', e3])
      expect(result).to.deep.equal(expected)
    })

    it('sorts different elements from same selector according to their place in page', () => {
      let expected = [
        new StickyElement(e1, 0),
        new StickyElement(e2, 1),
        new StickyElement(e3, 0),
      ]
      let result = normlize(['#e1, #e3', e2])
      expect(result).to.deep.equal(expected)
    })
  })
})

