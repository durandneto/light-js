import { UseEffect } from "./useEffect";

const User = () => {
  let name = 1;
  // console.log(name);

  // UseEffect(() => {
  //   name = 2;
  //   // console.log("useEffect inside user", name);
  // });
  // UseEffect(() => {
  //   name = 4;
  //   // console.log("useEffect inside user", name);
  // });

  name = 3;
  // console.log(name);
  return `durand ${name}`;
};

const User2 = name => `durand ${name}`;
const User3 = (name: string = "3", email: number) => `durand ${name}`;
function User4() {
  return "asda";
}
function User5(asd) {
  return "asda";
}
export default User3;
