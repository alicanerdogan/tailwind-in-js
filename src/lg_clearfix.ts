import { LG_CLEARFIX } from "./index";
export const lg_clearfix = `&:after {
@media (min-width: 1024px) {
content: "";
display: table;
clear: both;
}
}` as LG_CLEARFIX;