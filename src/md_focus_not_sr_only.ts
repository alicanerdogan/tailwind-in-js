import { MD_FOCUS_NOT_SR_ONLY } from "./index";
export const md_focus_not_sr_only = `&:focus {
@media (min-width: 768px) {
position: static;
width: auto;
height: auto;
padding: 0;
margin: 0;
overflow: visible;
clip: auto;
white-space: normal;
}
}` as MD_FOCUS_NOT_SR_ONLY;