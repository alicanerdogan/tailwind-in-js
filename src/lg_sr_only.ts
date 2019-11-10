import { LG_SR_ONLY } from "./index";
export const lg_sr_only = `@media (min-width: 1024px) {
position: absolute;
width: 1px;
height: 1px;
padding: 0;
margin: -1px;
overflow: hidden;
clip: rect(0, 0, 0, 0);
white-space: nowrap;
border-width: 0;
}` as LG_SR_ONLY;