export function containsObject(list, obj) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i].id === obj.id) {
      return true;
    }
  }
  return false;
}

export function removeObject(list, obj) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i].id === obj.id) {
      break;
    }
  }
  let newList = list.slice(0, i).concat(list.slice(i + 1, list.length));
  return newList;
}
