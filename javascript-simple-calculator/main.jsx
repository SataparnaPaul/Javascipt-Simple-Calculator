import './style.css'
import TextComponent  from './scripts/TextComponent';
import { addButtons } from './scripts/ButtonContainer';
let app = document.querySelector('#app');
let btnContainer = addButtons();
app.append(TextComponent)
app.append(btnContainer);

