(this.webpackJsonpleto=this.webpackJsonpleto||[]).push([[0],{21:function(e,t,n){},22:function(e,t,n){},24:function(e,t,n){},25:function(e,t,n){},27:function(e,t,n){},28:function(e,t,n){},29:function(e,t,n){},32:function(e,t,n){},33:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),i=n(15),s=n.n(i),r=(n(21),n(22),n(6)),l=n(7),o=n(8),u=n.n(o),d=n(10),f=n(16),b=/\s\s+/g,j={id:null,value:null,label:"",done:!1,flag:""},v={date:null,id:null,tasks:Object(f.a)(new Array(1).keys()).map((function(e){return Object(r.a)(Object(r.a)({},j),{},{id:e})})),timeStatus:null,additionalInfo:{label:""}},O=1400,h=1100,m=900,x=650,p=(n(24),n(25),n(1)),g=function(e){var t=e.data,n=e.onFieldChange,c=e.listCounter,i=e.handleKeyNavigation,s=e.blankId,r=Object(a.useState)(t.label),o=Object(l.a)(r,2),u=o[0],d=o[1],f=Object(a.useState)(t.done),j=Object(l.a)(f,2),v=j[0],O=j[1],h=" ".concat(v?"done":""," ").concat(e.active?"active":"inactive");return Object(p.jsxs)("div",{className:"input-field ".concat(h),children:[Object(p.jsxs)("span",{className:"list-counter",children:[c+1,"."]}),Object(p.jsx)("input",{className:"text",name:"taskField",value:u,onChange:function(e){var t=e.target.value.replace(b," ");t?n({name:"label",value:t}):(O(!1),n({name:"done",value:!1}),n({name:"label",value:""})),i(e,t),d(t)},onKeyDown:i,title:u}),Object(p.jsxs)("div",{className:"custom-checkbox",children:[Object(p.jsx)("input",{id:"checkboxId".concat(s).concat(t.id),type:"checkbox",onChange:function(){u&&(O(!v),n({name:"done",value:!v}))},checked:v}),Object(p.jsx)("label",{htmlFor:"checkboxId".concat(s).concat(t.id),children:Object(p.jsx)("span",{})})]})]})},S=(n(27),function(e){var t=e.onFieldChange,n=e.data,a=e.handleKeyNavigation,c=e.listCounter,i=e.blankId,s=e.active;return Object(p.jsx)("div",{className:"task-field ".concat(s?"active":"inactive"),children:Object(p.jsx)(g,{data:n,onFieldChange:function(e){var a=Object(r.a)(Object(r.a)({},n),{},Object(d.a)({},e.name,e.value));t({name:"tasks",value:a})},handleKeyNavigation:a,listCounter:c,blankId:i,active:s},n.id)})}),k=function(e,t){var n=Object(a.useRef)(!1);Object(a.useEffect)((function(){if(console.log("callback",n.current),n.current){var e=setTimeout((function(){t()}),500);return function(){clearTimeout(e)}}n.current=!0}),[e])},N=(n(28),function(e){var t=e.data,n=e.onFieldChange,c=Object(a.useState)(t.additionalInfo.label),i=Object(l.a)(c,2),s=i[0],r=i[1],o=Object(a.useState)(!1),u=Object(l.a)(o,2),d=u[0],f=u[1],j=Object(a.useRef)(null),v=function(){f(!d)};return Object(a.useEffect)((function(){var e=j.current;e&&d&&(e.focus(),e.selectionStart=e.value.length)}),[j,d]),Object(p.jsxs)("div",{className:"additional ".concat(d?"active":""),children:[Object(p.jsx)("span",{className:"additional-btn ".concat(s.length>3?"active ":""),onClick:v,children:"..."}),Object(p.jsxs)("div",{className:"additional-info",onMouseLeave:v,children:[Object(p.jsx)("h2",{children:"Additional Info"}),Object(p.jsx)("div",{className:"content",children:Object(p.jsx)("textarea",{name:"additionalInfo",id:"textarea-blank".concat(t.id),value:s,onChange:function(e){var t=e.target.value.replace(b," ");r(t),n({name:e.target.name,value:{label:t}})},placeholder:"Reminder...",ref:j})})]})]})}),w=40,y=38,I=37,E=13,C=8,F=(n(29),function(e){var t=e.data,n=e.onSave,c=Object(a.useState)({tasks:t.tasks,id:t.id,date:t.date,timeStatus:t.timeStatus,additionalInfo:t.additionalInfo}),i=Object(l.a)(c,2),s=i[0],o=i[1],f=u()(s.date).format("dddd"),b=Object(a.useRef)(null),v=Object(a.useState)({index:null}),O=Object(l.a)(v,2),h=O[0],m=O[1],x=function(e){if("tasks"===e.name){var t=s.tasks.map((function(t){return t.id===e.value.id?e.value:t}));o((function(e){return function(e){var t=e.tasks.length;if(t>=1){var n=e.tasks.reduce((function(e,t){return t.label?e+1:e}),0);if(n===t){var a=e.tasks,c=a[a.length-1].id;return a.push(Object(r.a)(Object(r.a)({},j),{},{id:c+1})),Object(r.a)(Object(r.a)({},e),{},{tasks:a})}if(n<t-1){var i=e.tasks.filter((function(e,n){return e.label||n===t-1}));return Object(r.a)(Object(r.a)({},e),{},{tasks:i})}return e}}(Object(r.a)(Object(r.a)({},e),{},{tasks:t}))}))}else o((function(t){return Object(r.a)(Object(r.a)({},t),{},Object(d.a)({},e.name,e.value))}))},g=function(e,t){var n=b.current;if(n){var a=e.currentTarget.selectionStart,c=Array.prototype.indexOf.call(n,e.target),i=n.elements[c-2],s=n.elements[c+2],r=n.elements[c];""===t&&m({index:c});var l=function(e){e.selectionEnd=e.selectionStart=a};switch(e.keyCode){case E:e.preventDefault(),s&&(l(s),s.focus());break;case C:0===r.value.length&&i&&(e.preventDefault(),function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=e,a=n.value;n.value=t;var c=new Event("input",{bubbles:!0}),i=n._valueTracker;console.log(i),i&&i.setValue(a),n.dispatchEvent(c)}(r),i.focus());break;case y:i&&(e.preventDefault(),l(i),i.focus());break;case w:s&&(e.preventDefault(),l(s),s.focus());break;case I:0===a&&i&&(e.preventDefault(),i.selectionStart=i.value.length,i.focus())}}};return Object(a.useEffect)((function(){null!==h.index&&b.current.elements[h.index].focus()}),[h]),Object(a.useEffect)((function(){!function(){var e=b.current.elements[0];b&&"present"===s.timeStatus&&!e.value&&e.focus()}()}),[s.timeStatus]),k(s,(function(){return n(s)})),Object(p.jsxs)("div",{className:"blank ".concat(s.timeStatus),children:[Object(p.jsx)("h2",{className:"week-day",children:f}),Object(p.jsx)("p",{className:"date",children:s.date}),Object(p.jsx)(N,{data:s,onFieldChange:x}),Object(p.jsx)("form",{className:"fields-list scroll",ref:b,children:s.tasks.map((function(e,t){return Object(p.jsx)(S,{data:e,listCounter:t,blankId:s.id,onFieldChange:x,handleKeyNavigation:g,active:t!==s.tasks.length-1},t)}))})]})}),D=n(38),L=n(36),A=n(37),T=n(35),J=function(){var e=window;return{width:e.innerWidth,height:e.innerHeight}},K=function(){var e=Object(a.useState)(J()),t=Object(l.a)(e,2),n=t[0],c=t[1];return Object(a.useEffect)((function(){var e=function(){c(J())};return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[]),n},P={slidesPerView:5},R={slidesPerView:1.3,centeredSlides:!0,spaceBetween:30},V="btnNextSlide",B="btnPrevSlide";n(30),n(31);A.a.use([T.a]);var z=function(e){var t=e.todaySlideIndex,n=K().width,c=n<x?R:P,i=Object(a.useState)(c),s=Object(l.a)(i,2),o=s[0],u=s[1];return Object(a.useEffect)((function(){u(n<x?R:n<m?{slidesPerView:2.5,centeredSlides:!0}:n<h||n<O?{slidesPerView:4}:P)}),[n]),Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)("span",{className:"swiper-button-prev ".concat(B)}),Object(p.jsx)(D.a,Object(r.a)(Object(r.a)({},o),{},{onSwiper:function(e){var a=n<x?t:t-1;e.slideTo(a,0)},pagination:!0,navigation:{nextEl:".".concat(V),prevEl:".".concat(B)},onReachEnd:function(){e.onSlideEnded()},children:e.data.map((function(t,n){return Object(p.jsx)(L.a,{virtualIndex:n,children:Object(p.jsx)(F,{data:t,onSave:e.onSave},n)},n)}))})),Object(p.jsx)("span",{className:"swiper-button-next ".concat(V)})]})},M="letoAppData",H="letoLastUpdateDate",U=function(e){localStorage.setItem(M,JSON.stringify(e))},W=u()().format("L"),_=localStorage.getItem(M),q=(n(32),function(){var e=Object(a.useState)(JSON.parse(_)||[]),t=Object(l.a)(e,2),n=t[0],c=t[1],i=function(e,t){var n=u()(t).isBefore(W),a=u()(t).isAfter(W);return e.timeStatus=n?"past":a?"future":"present",e},s=function(e,t){for(var a=[],c=!t?-1:1;c<=e;c++){var i=u()(t).add(c,"days").format("L"),s=n.length-1+c;a.push(o(i,s))}return a},o=function(e,t){var n=Object(r.a)(Object(r.a)({},v),{},{date:e,id:t});return i(n,e)},d=function(e){var t=[];Array.isArray(e)?t=n.concat(e):t.push(e),c(t),U(t)},f=n.findIndex((function(e){return u()(e.date).isSame(W)}));Object(a.useEffect)((function(){n.length<7&&d(s(7)),function(e){var t=localStorage.getItem(H),n=JSON.parse(t);if(!u()(n).isSame(W)){var a=e.map((function(e){return i(e,e.date)}));U(a),localStorage.setItem(H,JSON.stringify(W))}}(n)}),[]);return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)("h1",{className:"head-title",children:"LETO"}),Object(p.jsx)("div",{className:"board",children:Object(p.jsx)(z,{data:n,onSave:function(e){var t=n.map((function(t){return t.id===e.id?e:t}));c(t),U(t)},onSlideEnded:function(){var e=n[n.length-1].date;d(s(7,e))},slidesCount:n.length,todaySlideIndex:f,handleKeyNavigation:function(){}})})]})});var G=function(){return Object(p.jsx)("div",{className:"LETO",children:Object(p.jsx)("div",{className:"container",children:Object(p.jsx)(q,{})})})};s.a.render(Object(p.jsx)(c.a.StrictMode,{children:Object(p.jsx)(G,{})}),document.getElementById("root"))}},[[33,1,2]]]);
//# sourceMappingURL=main.cf8c2bf5.chunk.js.map