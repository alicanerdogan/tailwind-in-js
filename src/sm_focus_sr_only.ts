import { SM_FOCUS_SR_ONLY } from "./index";
export const sm_focus_sr_only = `&:focus {
@media (min-width: 640px) {
position: absolute;
width: 1px;
height: 1px;
padding: 0;
margin: -1px;
overflow: hidden;
clip: rect(0, 0, 0, 0);
white-space: nowrap;
border-width: 0;
}
}` as SM_FOCUS_SR_ONLY;