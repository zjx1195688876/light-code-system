const setBooleanToString = val => {
  let newVal;
  if (val === true) {
    newVal = 'true';
  } else if (val === false) {
    newVal = 'false';
  } else {
    newVal = val;
  }
  return newVal;
}

export default setBooleanToString;
