const oppositeArray = {
  ")": "(",
  "}": "{",
  "]": "["
};

const checkSingleCaracter = (caracter, arrayReference) => {
  switch (caracter) {
    case "(":
      arrayReference.tracking.push("(");
      arrayReference.open++;
      break;
    case "{":
      arrayReference.tracking.push("{");
      arrayReference.open++;
      break;
    case "[":
      arrayReference.tracking.push("[");
      arrayReference.open++;
      break;
    case ")":
    case "}":
    case "]":
      arrayReference.closed++;
      if (arrayReference.tracking.length) {
        if (
          arrayReference.tracking[arrayReference.tracking.length - 1] ===
          oppositeArray[caracter]
        ) {
          arrayReference.closed--;
          arrayReference.open--;
          arrayReference.tracking.pop();
        }
      }
      break;

    default:
  }
};

export const checkValidFunction = srt => {
  const arr = srt.split("");
  const arrayReference = {
    tracking: [],
    open: 0,
    closed: 0
  };
  arr.map(str => checkSingleCaracter(str, arrayReference));

  return (
    arrayReference.open === arrayReference.closed &&
    arrayReference.tracking.length === 0
  );
};
