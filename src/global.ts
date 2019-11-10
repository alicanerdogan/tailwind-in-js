export function getGlobalStyles() {
return `html {
line-height: 1.15;
-webkit-text-size-adjust: 100%;
box-sizing: border-box;
font-family: sans-serif;
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
line-height: 1.5;}
body {
margin: 0;}
main {
display: block;}
h1 {
font-size: 2em;
margin: 0.67em 0;
margin: 0;
font-size: inherit;
font-weight: inherit;}
hr {
box-sizing: content-box;
height: 0;
overflow: visible;
margin: 0;
border-top-width: 1px;}
pre {
font-family: monospace, monospace;
font-size: 1em;
margin: 0;
font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
    monospace;}
a {
background-color: transparent;
color: inherit;
text-decoration: inherit;}
abbr[title] {
border-bottom: none;
text-decoration: underline;
-webkit-text-decoration: underline dotted;
text-decoration: underline dotted;}
b {
font-weight: bolder;}
strong {
font-weight: bolder;}
code {
font-family: monospace, monospace;
font-size: 1em;
font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
    monospace;}
kbd {
font-family: monospace, monospace;
font-size: 1em;
font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
    monospace;}
samp {
font-family: monospace, monospace;
font-size: 1em;
font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
    monospace;}
small {
font-size: 80%;}
sub {
font-size: 75%;
line-height: 0;
position: relative;
vertical-align: baseline;
bottom: -0.25em;}
sup {
font-size: 75%;
line-height: 0;
position: relative;
vertical-align: baseline;
top: -0.5em;}
img {
border-style: none;
border-style: solid;
display: block;
vertical-align: middle;
max-width: 100%;
height: auto;}
button {
font-family: inherit;
font-size: 100%;
line-height: 1.15;
margin: 0;
overflow: visible;
text-transform: none;
-webkit-appearance: button;
background: 0 0;
padding: 0;
cursor: pointer;
padding: 0;
line-height: inherit;
color: inherit;}
input {
font-family: inherit;
font-size: 100%;
line-height: 1.15;
margin: 0;
overflow: visible;
padding: 0;
line-height: inherit;
color: inherit;}
optgroup {
font-family: inherit;
font-size: 100%;
line-height: 1.15;
margin: 0;
padding: 0;
line-height: inherit;
color: inherit;}
select {
font-family: inherit;
font-size: 100%;
line-height: 1.15;
margin: 0;
text-transform: none;
padding: 0;
line-height: inherit;
color: inherit;}
textarea {
font-family: inherit;
font-size: 100%;
line-height: 1.15;
margin: 0;
overflow: auto;
resize: vertical;
padding: 0;
line-height: inherit;
color: inherit;}
[type="button"] {
-webkit-appearance: button;}
[type="reset"] {
-webkit-appearance: button;}
[type="submit"] {
-webkit-appearance: button;}
[type="button"]::-moz-focus-inner {
border-style: none;
padding: 0;}
[type="reset"]::-moz-focus-inner {
border-style: none;
padding: 0;}
[type="submit"]::-moz-focus-inner {
border-style: none;
padding: 0;}
button::-moz-focus-inner {
border-style: none;
padding: 0;}
[type="button"]:-moz-focusring {
outline: 1px dotted ButtonText;}
[type="reset"]:-moz-focusring {
outline: 1px dotted ButtonText;}
[type="submit"]:-moz-focusring {
outline: 1px dotted ButtonText;}
button:-moz-focusring {
outline: 1px dotted ButtonText;}
fieldset {
padding: 0.35em 0.75em 0.625em;
margin: 0;
padding: 0;}
legend {
box-sizing: border-box;
color: inherit;
display: table;
max-width: 100%;
padding: 0;
white-space: normal;}
progress {
vertical-align: baseline;}
[type="checkbox"] {
box-sizing: border-box;
padding: 0;}
[type="radio"] {
box-sizing: border-box;
padding: 0;}
[type="number"]::-webkit-inner-spin-button {
height: auto;}
[type="number"]::-webkit-outer-spin-button {
height: auto;}
[type="search"] {
-webkit-appearance: textfield;
outline-offset: -2px;}
[type="search"]::-webkit-search-decoration {
-webkit-appearance: none;}
::-webkit-file-upload-button {
-webkit-appearance: button;
font: inherit;}
details {
display: block;}
summary {
display: list-item;}
template {
display: none;}
[hidden] {
display: none;}
* {
box-sizing: inherit;
border-width: 0;
border-style: solid;
border-color: #e2e8f0;}
::after {
box-sizing: inherit;
border-width: 0;
border-style: solid;
border-color: #e2e8f0;}
::before {
box-sizing: inherit;
border-width: 0;
border-style: solid;
border-color: #e2e8f0;}
blockquote {
margin: 0;}
dd {
margin: 0;}
dl {
margin: 0;}
figure {
margin: 0;}
h2 {
margin: 0;
font-size: inherit;
font-weight: inherit;}
h3 {
margin: 0;
font-size: inherit;
font-weight: inherit;}
h4 {
margin: 0;
font-size: inherit;
font-weight: inherit;}
h5 {
margin: 0;
font-size: inherit;
font-weight: inherit;}
h6 {
margin: 0;
font-size: inherit;
font-weight: inherit;}
p {
margin: 0;}
button:focus {
outline: 1px dotted;
outline: 5px auto -webkit-focus-ring-color;}
ol {
list-style: none;
margin: 0;
padding: 0;}
ul {
list-style: none;
margin: 0;
padding: 0;}
input::placeholder {
color: #a0aec0;}
textarea::placeholder {
color: #a0aec0;}
[role="button"] {
cursor: pointer;}
table {
border-collapse: collapse;}
audio {
display: block;
vertical-align: middle;}
canvas {
display: block;
vertical-align: middle;}
embed {
display: block;
vertical-align: middle;}
iframe {
display: block;
vertical-align: middle;}
object {
display: block;
vertical-align: middle;}
svg {
display: block;
vertical-align: middle;}
video {
display: block;
vertical-align: middle;
max-width: 100%;
height: auto;}`;
}
