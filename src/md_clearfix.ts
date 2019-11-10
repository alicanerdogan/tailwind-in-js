import { MD_CLEARFIX } from "./index";
export const md_clearfix = `&:after {
@media (min-width: 768px) {
content: "";
display: table;
clear: both;
}
}` as MD_CLEARFIX;