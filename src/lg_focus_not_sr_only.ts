import { LG_FOCUS_NOT_SR_ONLY } from "./index";
export const lg_focus_not_sr_only = `&:focus {
@media (min-width: 1024px) {
position: static;
width: auto;
height: auto;
padding: 0;
margin: 0;
overflow: visible;
clip: auto;
white-space: normal;
}
}` as LG_FOCUS_NOT_SR_ONLY;