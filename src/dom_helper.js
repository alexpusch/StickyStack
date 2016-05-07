export function wrap(wrappingHtml, wrappedElement){
  let div = document.createElement('div');
  div.innerHTML = wrappingHtml;
  let wrapper = div.childNodes[0];

  wrappedElement.parentNode.insertBefore(wrapper, wrappedElement);
  wrappedElement.parentNode.removeChild(wrappedElement);

  wrapper.appendChild(wrappedElement);
}

export function unwrap(element){
  let wrapper = element.parentNode;
  let wrapperParent = wrapper.parentNode;
  wrapperParent.insertBefore(element, wrapper);
  wrapperParent.removeChild(wrapper);
}

export function getOffset (el) {
  const box = el.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset - document.documentElement.clientTop,
    left: box.left + window.pageXOffset - document.documentElement.clientLeft
  };
}

export function getOuterHeight(el) {
  let height = el.offsetHeight;
  let style = getComputedStyle(el);

  height += parseInt(style.marginTop) + parseInt(style.marginBottom);
  return height;
}

export function toggleClass(el, className, isOn) {
  if (el.classList) {
    el.classList.toggle(className, isOn);
  } else {
    let classes = el.className.split(' ');
    let existingIndex = classes.indexOf(className);

    if (isOn) {
      classes.splice(existingIndex, 1);
    } else {
      classes.push(className);
    }

    el.className = classes.join(' ');
  }
}
