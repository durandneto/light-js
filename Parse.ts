import { checkValidFunction } from "./checkValidFunction";

const oppositeArray = {
  ")": "(",
  "}": "{",
  "]": "["
};

export function parseFunction(str) {
  var fn_body_split_idx = str.indexOf("=>");
  var fn_param = "";
  if (fn_body_split_idx > 0) {
    var fn_body_split_idx_start = str.indexOf("=");
    fn_param = str.substring(0, fn_body_split_idx);
    var fn_body = str.substring(fn_body_split_idx + 2, str.length).trim();
    var fn_body_idx = fn_body.indexOf("{");
    if (fn_body_idx === 0) {
      fn_body = fn_body.substring(fn_body_idx + 1, fn_body.length - 1);
    }
  } else {
    var fn_body = str.substring(str.indexOf("{") + 1, str.lastIndexOf("}"));
    fn_param = str.substring(
      str.indexOf("("),
      str.indexOf(")", str.indexOf("("))
    );
  }

  return [fn_param.replace(/\(|\)/g, "").trim(), fn_body];
}

const Parse = functionBody => {
  // console.log(functionBody);
  const arrayReference = {
    tracking: [],
    open: 0,
    closed: 0
  };
  const regexp = /\)|\(|\{|\|}|c|f|u/gi;
  const UseEffectTracking = [];
  const FunctionTracking = [];
  let currentChar;

  let nextIndex;
  let nextIndex2;
  let nextIndex3;
  let startIndex;
  let currentIndex;
  let currentFunction;
  let newFunctionBody = "";

  for (let i = 0; i < functionBody.length; i++) {
    currentChar = functionBody.charAt(i);

    if (currentChar.match(regexp)) {
      switch (true) {
        case functionBody.substring(i, i + 5) === "const":
          nextIndex = functionBody.indexOf("=>", i);
          startIndex = i;
          currentIndex = nextIndex + 1;
          if (nextIndex) {
            nextIndex2 = functionBody.indexOf("{", i);
            nextIndex3 = functionBody.indexOf("`", i);
            if (nextIndex2 > nextIndex3) {
              startIndex = i;
              currentIndex = nextIndex3 + 1;
              currentFunction = functionBody.substring(
                nextIndex3,
                currentIndex
              );
              while (!checkValidFunction(currentFunction)) {
                currentFunction = functionBody.substring(
                  nextIndex3,
                  currentIndex++
                );
              }
              // console.log(
              //   functionBody.substring(startIndex, currentIndex),
              //   startIndex,
              //   currentIndex
              // );
              FunctionTracking.push([startIndex, currentIndex]);
              i = currentIndex++;
            } else if (nextIndex2 < nextIndex3) {
              startIndex = i;
              currentIndex = nextIndex2 + 1;
              currentFunction = functionBody.substring(
                startIndex,
                currentIndex
              );

              while (!checkValidFunction(currentFunction)) {
                currentFunction = functionBody.substring(
                  startIndex,
                  currentIndex++
                );
              }
              // console.log(currentFunction, startIndex, currentIndex);
              FunctionTracking.push([startIndex, currentIndex]);
              i = currentIndex++;
            }
          }
          break;
        case functionBody.substring(i, i + 8) === "function":
          // console.log("found function");
          nextIndex = functionBody.indexOf("{", i);
          startIndex = i;
          currentIndex = nextIndex + 1;
          currentFunction = functionBody.substring(startIndex, currentIndex);

          while (!checkValidFunction(currentFunction)) {
            currentFunction = functionBody.substring(
              startIndex,
              currentIndex++
            );
          }
          // console.log(currentFunction, startIndex, currentIndex);
          FunctionTracking.push([startIndex, currentIndex]);
          i = currentIndex++;
          break;
        case functionBody.substring(i, i + 10) === "useEffect_":
          i = functionBody.indexOf("U", i + 10);
          console.log("-------");
          console.log("-------");
          console.log(i);
          functionBody.substring(i, i + 9);
          console.log("-------");
          break;
        case functionBody.substring(i, i + 9) === "UseEffect":
          // console.log("found UseEffect");
          nextIndex = functionBody.indexOf("(", i);
          startIndex = i;
          currentIndex = nextIndex + 1;
          currentFunction = functionBody.substring(startIndex, currentIndex);

          while (!checkValidFunction(currentFunction)) {
            currentFunction = functionBody.substring(
              startIndex,
              currentIndex++
            );
          }
          // console.log(currentFunction, startIndex, currentIndex);
          UseEffectTracking.push([startIndex, currentIndex]);
          i = currentIndex++;
          break;
        default:
      }
    }
    newFunctionBody += functionBody.charAt(i);
  }
  // console.log({ UseEffectTracking }, { FunctionTracking });
  console.log(newFunctionBody);
  return [newFunctionBody, UseEffectTracking, FunctionTracking];
};

const Parse2 = functionBody => {
  // console.log(functionBody);
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
          // console.log("open", i, arrayReference.open);
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

  // console.log(arrTracking);
};

export default Parse;
