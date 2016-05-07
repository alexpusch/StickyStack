import {getOffset} from './dom_helper.js'
import StickyElement from './stikcy_element.js'

/*
* Normalize an array of elements representations as css selectors, array of elements,
* single elements into the form:
* [{domElement: DomElement, level: number}, ...]
*/
export default function normlize(elementRepresentations, options){
  let normlizeElements = [];
  let flattenedElements = flattenElements(elementRepresentations, options);

  normlizeElements = flattenedElements.sort((element1, element2) => {
    return getOffset(element1.domElement).top - getOffset(element2.domElement).top;
  })

  return normlizeElements;
}

function flattenElements(elementRepresentations, options) {
  let result = [];
  let i = 0;

  for(let elementRepresentation of elementRepresentations){
    let domElements = getDomElements(elementRepresentation)

    for(let domElement of domElements){
      result.push(new StickyElement(domElement, i, options));
    }

    i++;
  }

  return result;
}

function getDomElements(elementRepresentation){
  if(typeof elementRepresentation === "string"){
    // querySelectorAll returns NodeList which is not an Array. This trick
    // converts it into an array
    return [...document.querySelectorAll(elementRepresentation)]
  }

  if(elementRepresentation.length !== undefined){
    return elementRepresentation;
  }

  return [elementRepresentation];
}
