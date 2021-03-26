const oppositeArray = {
  ")": "(",
  "}": "{",
  "]": "["
};

export const checkSingleCaracter = (caracter, arrayReference) => {
  switch (caracter) {
    case "(":
      console.log("open (");
      // arrayReference.tracking.push("(");
      // arrayReference.open++;
      break;
    case "{":
      console.log("open {");
      arrayReference.tracking.push("{");
      arrayReference.open++;
      break;
    case "[":
      console.log("open [");
      // arrayReference.tracking.push("[");
      // arrayReference.open++;
      break;
    case ")":
    case "}":
    case "]":
      console.log("close", caracter);
      // arrayReference.closed++;
      // if (arrayReference.tracking.length) {
      //   if (
      //     arrayReference.tracking[arrayReference.tracking.length - 1] ===
      //     oppositeArray[caracter]
      //   ) {
      //     arrayReference.closed--;
      //     arrayReference.open--;
      // arrayReference.tracking.pop();
      //   }
      // }
      break;

    default:
  }
};

export const checkCaracter2 = srt => {
  srt = `use.useEffect(() => {
      console.log("add")
    })`;
  let str = "";
  let identifyer = "";
  let currentChar = srt.charAt(0);
  let previousChar = "";
  const regexp = /\)|\(|\{|\}|;/gi;
  let arrayReference = {
    tracking: [],
    params: 0,
    func: 0
  };
  let currentTracking = [];

  const arrTracking = [];

  for (let i = 0; i < srt.length; i++) {
    currentChar = srt.charAt(i);
    if (currentChar.match(regexp)) {
      // console.log("match", previousChar, currentChar);
      switch (currentChar) {
        // case ";":
        // arrTracking.push(arrayReference);
        // arrayReference.tracking = [];
        // arrayReference.params = 0;
        // arrayReference.func = 0;
        // currentTracking = [];
        // break;
        case "(":
          arrayReference.func++;
          // console.log("open (");
          if (arrayReference.params === 0) {
            currentTracking.push(i);
            console.log("start params");
            arrayReference.params++;
            str = "(";
          }
          break;
        case ")":
          arrayReference.func--;
          if (arrayReference.params === 0) {
            currentTracking.push(i);
            arrayReference.tracking.push(currentTracking);
            currentTracking = [];
            console.log("finishing params");
            arrayReference.params++;
            str = "()";
          }
          break;
        case "{":
          arrayReference.func++;
          if (str === "()") {
            console.log("start body");
            currentTracking.push(i);
          }
          // console.log("open {");
          break;
        case "}":
          // console.log("close }");
          arrayReference.func--;
          if (arrayReference.func === 0) {
            console.log("finishing body");
            currentTracking.push(i);
            arrayReference.tracking.push(currentTracking);
            arrTracking.push(arrayReference);
            // console.log(`
            //    function${srt.substring(
            //      ...arrayReference.tracking[0]
            //    )} ${srt.substring(...arrayReference.tracking[1])}

            // `);
            arrayReference = {
              tracking: [],
              params: 0,
              func: 0
            };
            currentTracking = [];
            str = "";
          }

          break;

        default:
      }
    }
  }
  if (arrayReference.func === 0) {
    console.log(arrTracking);
    arrTracking.map(f => {
      console.log(`
         params:${srt.substring(...f.tracking[0])}, body: ${srt.substring(
        ...f.tracking[1]
      )}
      `);
    });
  }
  return srt;
  // const arr = srt.split("");
  // const arrayReference = {
  //   tracking: [],
  //   open: 0,
  //   closed: 0
  // };
  // console.log(srt);
  // arr.map((str, index) => {
  //   checkSingleCaracter(str, arrayReference);
  // });

  // return (
  //   arrayReference.open === arrayReference.closed &&
  //   arrayReference.tracking.length === 0
  // );
};

export const checkCaracter = srt => {
  console.log(srt);
  // srt = `useEffect_1.UseEffect((function) =>{asdasd});`;
  let str = "";
  let currentChar = srt.charAt(0);
  let previousChar = "";
  const regexp = /\)|\(|\{|\}/gi;

  let arrayReference = {
    parse: 0,
    main: {
      initParam: 0,
      finishParam: 0,
      initBody: 0,
      finishBody: 0
    },
    internals: []
  };

  let currentTracking = [];

  const arrTracking = [];

  for (let i = 0; i < srt.length; i++) {
    currentChar = srt.charAt(i);
    if (currentChar.match(regexp)) {
      // console.log(previousChar, currentChar);
      switch (true) {
        case currentChar === "(":
          arrayReference.parse++;
          if (arrayReference.parse === 1) {
            arrayReference.main.initParam = i + 1;
          } else {
            currentTracking.push(i + 1);
          }
          console.log(
            "start params",
            arrayReference.parse,
            // previousChar,
            currentChar
          );

          break;
        case currentChar === ")":
          console.log(
            "finishing params",
            arrayReference.parse,
            // previousChar,
            currentChar
          );
          if (arrayReference.parse === 1) {
            arrayReference.main.finishParam = i;
          } else {
            currentTracking.push(i);
          }
          // arrayReference.parse++;
          break;
        case currentChar === "{":
          // if (previousChar === ")") {
          //   arrayReference.parse--;
          // }
          console.log(
            "start body",
            arrayReference.parse,
            // previousChar,
            currentChar
          );
          if (arrayReference.parse === 1) {
            arrayReference.main.initBody = i + 1;
          } else {
            currentTracking.push(i + 1);
          }
          // arrayReference.parse++;

          break;
        case currentChar === "}":
          if (previousChar === ")") {
            arrayReference.parse--;
          }
          arrayReference.parse--;
          console.log(
            "finishing body",
            arrayReference.parse,
            // previousChar,
            currentChar
          );

          if (arrayReference.parse === 1) {
            arrayReference.main.finishBody = i;
          } else {
            currentTracking.push(i);
            arrayReference.internals.push(currentTracking);
            currentTracking = [];
          }

          break;

        default:
      }
      previousChar = currentChar;
    }
  }

  console.log(arrayReference);
  // const [initParam, finishParam, initBody, finishBody] = arrayReference.main;
  console.log(
    srt.substring(
      arrayReference.main.initParam,
      arrayReference.main.finishParam
    )
  );
  // const [
  //   initParam2,
  //   finishParam2,
  //   initBody2,
  //   finishBody2
  // ] = arrayReference.internals[0];

  // if (initBody2 && finishBody2)
  //   console.log(`
  //        params:${srt.substring(
  //          initParam2,
  //          finishParam2
  //        )} |  body: ${srt.substring(initBody2, finishBody2)}
  //     `);

  return srt;
  // const arr = srt.split("");
  // const arrayReference = {
  //   tracking: [],
  //   open: 0,
  //   closed: 0
  // };
  // console.log(srt);
  // arr.map((str, index) => {
  //   checkSingleCaracter(str, arrayReference);
  // });

  // return (
  //   arrayReference.open === arrayReference.closed &&
  //   arrayReference.tracking.length === 0
  // );
};
