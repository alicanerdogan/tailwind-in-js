import { XL_CLEARFIX } from "./index";
export const xl_clearfix = `&:after {
@media (min-width: 1280px) {
content: "";
display: table;
clear: both;
}
}` as XL_CLEARFIX;