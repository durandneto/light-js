import { UseEffect } from "./useEffect";

const User = () => {
  let name = 1;
  console.log("init 1");
  const Click = () => {
    console.log("const click");
  };
  const Click2 = () => `asdas`;

  function flick() {
    console.log("asdasd");
  }

  UseEffect(() => {
    name = 4;
    console.log("useEffect inside user", name);
  });

  UseEffect(() => {
    name = 5;
    console.log("useEffect inside user", name);
  });

  name = 3;
  // console.log(name);
  console.log("init before render");
  return `durand ${name}`;
};

const User2 = name => `durand ${name}`;

const User3 = (name: string = "34", email: number) => `durand ${name}`;

function User4() {
  return "asda";
}

function User5(asd) {
  return "asda";
}

export default User3;
