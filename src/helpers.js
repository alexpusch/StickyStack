export function removeFromArray(array, item){
  let i;

  if((i = array.indexOf(item)) > -1){
    array.splice(i, 1);
  }
}

export function applyDefaults(target, defaults){
  for(let key of Object.keys(defaults)){
    if(target[key] === undefined){
      target[key] = defaults[key];
    }
  }
}
