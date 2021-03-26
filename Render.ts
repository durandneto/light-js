import { EventTargetListener } from "./EventTarget";
import { checkCaracter } from "./checkCaracter";
let id = 0;
function DClass(f, element) {
  this.f = f;
  this.renderValue = f();
  this.element = element;
  this.id = ++id;

  EventTargetListener.addEventListener("render" + this.id, () => this.render());
  EventTargetListener.addEventListener("load" + this.id, () => this.didMount());

  this.render = () => {
    // element.innerHTML = component();
    // console.log("Render ::: ", this.renderValue);
    this.element.innerHTML = this.renderValue;
  };

  this.didMount = () => {
    // console.log("didMount ::: ");
  };
}
function DOMRender() {
  this.render = function(f, element) {
    let fNewConstr2 = new DClass(f, element);
    // console.log("===", parseFunction(f.toString()));
    const [params, body] = parseFunction(f.toString());
    console.log({ params }, { body });
    // checkCaracter(f.toString());
    EventTargetListener.dispatchEvent({ type: "render" + fNewConstr2.id });
    EventTargetListener.dispatchEvent({ type: "didMount" + fNewConstr2.id });
  };
}

function parseFunction(str) {
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
export default new DOMRender();
