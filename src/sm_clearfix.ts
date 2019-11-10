import { SM_CLEARFIX } from "./index";
export const sm_clearfix = `&:after {
@media (min-width: 640px) {
content: "";
display: table;
clear: both;
}
}` as SM_CLEARFIX;