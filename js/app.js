!function(e){var t={};function o(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,o),s.l=!0,s.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)o.d(n,s,function(t){return e[t]}.bind(null,s));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/js/",o(o.s=0)}([function(e,t,o){"use strict";o.r(t);const n=[{tree:"4,7|5,7|6,7|7,7|8,7|9,7|10,7|4,6|10,6|4,5|10,5|4,4|10,4|4,3|5,3|6,3|7,3|8,3|9,3|10,3",box:"8,6|6,5|8,5|6,4",goal:"5,6|9,6|5,4|9,4",boy:"7,5"},{tree:"3,2|4,2|5,2|6,2|7,2|8,2|9,2|10,2|3,3|7,3|10,3|3,4|10,4|3,5|7,5|10,5|3,6|4,6|5,6|6,6|7,6|8,6|9,6|10,6",box:"7,4",goal:"9,4",boy:"8,4"},{tree:"6,2|7,2|8,2|9,2|4,3|5,3|6,3|9,3|4,4|9,4|10,4|4,5|10,5|4,6|6,6|10,6|4,7|5,7|6,7|7,7|8,7|9,7|10,7",box:"6,4|6,5",goal:"8,4|7,6",boy:"5,6"},{tree:"5,1|6,1|7,1|8,1|9,1|10,1|4,2|5,2|10,2|4,3|8,3|10,3|4,4|10,4|4,5|7,5|9,5|10,5|4,6|5,6|9,6|5,7|6,7|7,7|8,7|9,7",box:"6,3|7,4|8,5",goal:"8,2|6,3|6,4",boy:"7,6"},{tree:"4,1|5,1|6,1|7,1|8,1|9,1|10,1|4,2|10,2|4,3|6,3|8,3|10,3|4,4|10,4|4,5|9,5|10,5|4,6|7,6|8,6|9,6|4,7|5,7|6,7|7,7",box:"8,4|6,5|7,5",goal:"7,2|7,3|5,5",boy:"8,2"}];const s=15,a=10;const r=document.getElementById("previous-level"),i=document.getElementById("current-level"),l=document.getElementById("next-level"),c=document.getElementById("reset"),d=new class{constructor({_level:e,container:t,onload:o}){this.container=t,this.onload=o,this._MAX_LEVEL=5,this._ITEM_WIDTH=32,this._level=e}clear(){this.container.innerHTML=""}wait(e){return new Promise(t=>{setTimeout(t,e)})}init(e=this.level){console.log(e),this.clear();const{trees:t,boxes:o,goals:s,player:a}=function(e){const{tree:t,box:o,goal:s,boy:a}=n[e-1],r=a.split(",").map(Number),[i,l,c]=[t,o,s].map(e=>e.split("|").map(e=>e.split(",").map(Number)));return{trees:i,boxes:l,goals:c,player:r}}(e);t.forEach(e=>{this.addItem("tree",e[0],e[1])}),o.forEach(e=>{this.addItem("box",e[0],e[1])}),s.forEach(e=>{this.addItem("goal",e[0],e[1])}),this.addItem("player",...a)}get player(){return this.container.querySelector(".player")}get level(){return this._level}addItem(e,t,o){const n=document.createElement("i");n.className=e,"player"===e&&(n.className+=" down"),this.moveTo(n,t,o),this.container.appendChild(n)}getItem(e,t){const o=this.container.children;for(const n of o)if(Number(n.dataset.x)===e&&Number(n.dataset.y)===t&&"goal"!==n.className)return n;return null}moveTo(e,t,o){e.dataset.x=t,e.dataset.y=o,e.style.left=`${t*this._ITEM_WIDTH}px`,e.style.top=`${o*this._ITEM_WIDTH}px`}move(e){const t=this.player,o=Number(t.dataset.x),n=Number(t.dataset.y);let s=null,a=null,r=null;switch(e){case"left":s=this.getItem(o-1,n),a=o-1,r=n;break;case"right":s=this.getItem(o+1,n),a=o+1,r=n;break;case"up":s=this.getItem(o,n-1),a=o,r=n-1;break;case"down":s=this.getItem(o,n+1),a=o,r=n+1;break;default:console.log("not possible")}t.className=`player ${e}`,s?"box"===s.className&&("left"===e&&this.isEmpty(o-2,n)?(this.moveTo(t,o-1,n),this.moveTo(s,o-2,n)):"right"===e&&this.isEmpty(o+2,n)?(this.moveTo(t,o+1,n),this.moveTo(s,o+2,n)):"up"===e&&this.isEmpty(o,n-2)?(this.moveTo(t,o,n-1),this.moveTo(s,o,n-2)):"down"===e&&this.isEmpty(o,n+2)&&(this.moveTo(t,o,n+1),this.moveTo(s,o,n+2))):this.moveTo(t,a,r)}withinRange(e,t){return e>=0&&t>=0&&e<s&&t<a}isEmpty(e,t){return this.withinRange(e,t)&&!this.getItem(e,t)}async onwin(e){const t=document.getElementById("result");t.innerText="You Win!",t.className="show",await this.wait(1300),t.innerText="",t.className="",await this.wait(200),this.load(e+1)}polling(){return new Promise(e=>{this._command&&window.removeEventListener("keydown",this._command),this._command=t=>{switch(t.keyCode){case 37:case 65:e("left");break;case 38:case 87:e("up");break;case 39:case 68:e("right");break;case 40:case 83:e("down");break;default:e(null)}},window.addEventListener("keydown",this._command,{once:!0})})}isIn(e){const t=this.container.querySelectorAll(".goal");for(let o of t)if(e.dataset.x===o.dataset.x&&e.dataset.y===o.dataset.y)return!0;return!1}isWin(){const e=this.container.querySelectorAll(".box");return Array.from(e).every(e=>this.isIn(e))}async load(e){(Number.isNaN(e)||e<=0||e>this._MAX_LEVEL)&&(e=1),this._level=e,this.init(e),this.onload(e);do{const e=await this.polling();e&&this.move(e)}while(!this.isWin());await this.onwin(e)}}({_level:1,container:document.getElementById("map"),onload(e){i.value=e}});d.load(1),i.addEventListener("change",({target:e})=>{console.log(e.value),d.load(Number(e.value))}),r.addEventListener("click",()=>{console.log("previous-level"),d.load(d.level-1)}),l.addEventListener("click",()=>{console.log("next-level"),d.load(d.level+1)}),c.addEventListener("click",()=>{console.log("reset"),d.load(d.level)}),window.app=d}]);