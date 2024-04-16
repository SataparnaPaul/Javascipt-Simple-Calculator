// export default class ButtonComponent  {
//     constructor () {
//     let btn = document.createElement("button");
//    <button onclick={btn}></button>
//     }
// }
import {} from'./utility/CalculatorLogic';
import {numberBtns, operationButtons, symbolButtons} from './utility/Constants/constants';
export default function addButtons(){
    let btnContainer= document.createElement("div");
    btnContainer.setAttribute("class","btn-container");
    buttonGenerator(numberBtns ,"btn-number").map((btn) =>  btnContainer.appendChild(btn));
    buttonGenerator(operationButtons ,"btn-operations").map((btn) =>  btnContainer.appendChild(btn));
    buttonGenerator(symbolButtons ,"btn-operations").map((btn) =>  btnContainer.appendChild(btn));
    return btnContainer;
}
export default function buttonGenerator (list ,style) {
let btns = [];
list.forEach(btn => {
    let btnComponent = createElement("div");
    btnComponent.setAttribute("class",`btn $style`);
    btnComponent.innerText = btn;
    btnComponent.addEventListener( 'click', () => onBtnClick(btn));
    btns.push(btnComponent);
    
});
return btns;
}