import { MD_SR_ONLY } from "./index";
export const md_sr_only = `@media (min-width: 768px) {
position: absolute;
width: 1px;
height: 1px;
padding: 0;
margin: -1px;
overflow: hidden;
clip: rect(0, 0, 0, 0);
white-space: nowrap;
border-width: 0;
}` as MD_SR_ONLY;