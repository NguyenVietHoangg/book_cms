export const encodeQueryData = (data, encode = true) => {
  const ret = [];
  if (encode) {
    for (let d in data)
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  } else {
    for (let d in data)
      ret.push(d + '=' + data[d]);
  }
  return ret.join('&');
}

export const makeId = (length = 5) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
 }
 return result;
}


export const rebuildSelectedParentTree = (element, nodeSelected) => {
  if (element.id && element.id == nodeSelected.id) {
    return nodeSelected;
  } else if (element.children && element.children != null) {
      var i;
      var result = null;
      for(i=0; result == null && i < element.children.length; i++){
        result = rebuildSelectedParentTree(element.children[i], nodeSelected);
      }
      return result;
  }
  return null;
};
