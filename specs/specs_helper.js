export let sandbox;

beforeEach(() => {
  sandbox = document.createElement('div');
  document.body.appendChild(sandbox);
})

afterEach(() => {
  document.body.removeChild(sandbox);
})

export function createElement(styleAttributes){
  let element = document.createElement('div');

  for(let attribute of Object.keys(styleAttributes)){
    let value = styleAttributes[attribute];
    element.style.setProperty(attribute, value);
  }

  sandbox.appendChild(element);
  return element;
}
