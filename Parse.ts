const oppositeArray = {
  ")": "(",
  "}": "{",
  "]": "["
};

const Parse = functionBody => {
  console.log(functionBody);
  const arrayReference = {
    tracking: [],
    open: 0,
    closed: 0
  };
  const regexp = /\)|\(|\{|\}/gi;
  const arrTracking = [];
  let currentChar;
  let currentFunctionBody = "";
  let track = false;

  for (let i = 0; i < functionBody.length; i++) {
    currentChar = functionBody.charAt(i);
    if (currentChar.match(regexp)) {
      switch (currentChar) {
        case "(":
          arrayReference.tracking.push("(");
          arrayReference.open++;
          if (arrayReference.open === 1) {
            track = true;
          }
          console.log("open", i, arrayReference.open);
          break;
        case "{":
          arrayReference.tracking.push("{");
          arrayReference.open++;
          break;
        case ")":
        case "}":
          arrayReference.closed++;
          if (arrayReference.tracking.length) {
            if (
              arrayReference.tracking[arrayReference.tracking.length - 1] ===
              oppositeArray[currentChar]
            ) {
              arrayReference.closed--;
              arrayReference.open--;
              arrayReference.tracking.pop();
            }
          }
          break;

        default:
      }
      if (
        arrayReference.open === arrayReference.closed &&
        arrayReference.tracking.length === 0
      ) {
        currentFunctionBody += currentChar;
        // console.log("close", arrayReference, currentFunctionBody);
        track = false;
        arrTracking.push(currentFunctionBody);
        currentFunctionBody = "";
      }
    }

    if (track) {
      currentFunctionBody += currentChar;
      // console.log("track", currentFunctionBody);
    }
  }

  console.log(arrTracking);
};

export default Parse;
