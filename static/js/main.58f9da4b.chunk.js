(this.webpackJsonpleto=this.webpackJsonpleto||[]).push([[0],{21:function(e,t,n){},22:function(e,t,n){},24:function(e,t,n){},26:function(e,t,n){},27:function(e,t,n){},28:function(e,t,n){},31:function(e,t,n){},32:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),i=n(15),s=n.n(i),l=(n(21),n(22),n(6)),r=n(7),o=n(8),u=n.n(o),d=n(10),f=n(16),b=/\s\s+/g,j={id:null,value:null,label:"",done:!1,flag:""},v={date:null,id:null,tasks:Object(f.a)(new Array(1).keys()).map((function(e){return Object(l.a)(Object(l.a)({},j),{},{id:e})})),timeStatus:null,additionalInfo:{label:""}},O=1400,m=1100,h=900,g=650,p=(n(24),n(1)),S=function(e){var t=e.data,n=e.onFieldChange,c=e.handleKeyNavigation,i=e.blankId,s=e.active,l=Object(a.useState)(t.label),o=Object(r.a)(l,2),u=o[0],d=o[1],f=Object(a.useState)(t.done),j=Object(r.a)(f,2),v=j[0],O=j[1],m=Object(a.useState)(s),h=Object(r.a)(m,2),g=h[0],S=h[1],x="".concat(v?"done":""," ").concat(s?"active":"inactive"),k=!v&&u.length>0,N=v&&u.length>0;return Object(p.jsxs)("div",{className:"input-field ".concat(x),onClick:function(){u&&(O(!v),n({name:"done",value:!v}))},children:[Object(p.jsx)("input",{className:"todo",name:"taskField",value:u,onChange:function(e){var t=e.target.value.replace(b," ");t?n({name:"label",value:t}):(O(!1),n({name:"done",value:!1}),n({name:"label",value:""})),c(e,t),d(t)},onKeyDown:c,title:u,onClick:function(e){var t;e.stopPropagation(),e.target.selectionStart=null===(t=e.target.value)||void 0===t?void 0:t.length},disabled:g,id:"input".concat(i).concat(t.id),onBlur:function(){s&&S(!0)},onFocus:function(){S(!1)}}),k&&Object(p.jsx)("label",{htmlFor:"input".concat(i).concat(t.id),className:"todo-btn edit-btn",onClick:function(e){e.stopPropagation(),S(!1)},children:"\u270e"}),N&&Object(p.jsx)("label",{htmlFor:"input".concat(i).concat(t.id),className:"todo-btn delete-btn",onClick:function(e){e.stopPropagation(),console.log("delete")},children:"\u2716"})]})},x=(n(26),function(e){var t=e.onFieldChange,n=e.data,a=e.handleKeyNavigation,c=e.listCounter,i=e.blankId,s=e.active,r="".concat(s?"active":"inactive","  ");return Object(p.jsxs)("div",{className:"task-field ".concat(r),children:[Object(p.jsxs)("span",{className:"list-counter",children:[c+1,"."]}),Object(p.jsx)(S,{data:n,onFieldChange:function(e){var a=Object(l.a)(Object(l.a)({},n),{},Object(d.a)({},e.name,e.value));t({name:"tasks",value:a})},handleKeyNavigation:a,listCounter:c,blankId:i,active:s},n.id)]})}),k=function(e,t){var n=Object(a.useRef)(!1);Object(a.useEffect)((function(){if(n.current){var e=setTimeout((function(){t()}),500);return function(){clearTimeout(e)}}n.current=!0}),[e])},N=(n(27),function(e){var t=e.data,n=e.onFieldChange,c=Object(a.useState)(t.additionalInfo.label),i=Object(r.a)(c,2),s=i[0],l=i[1],o=Object(a.useState)(!1),u=Object(r.a)(o,2),d=u[0],f=u[1],j=Object(a.useRef)(null),v=function(){f(!d)};return Object(a.useEffect)((function(){var e=j.current;e&&d&&(e.focus(),e.selectionStart=e.value.length)}),[j,d]),Object(p.jsxs)("div",{className:"additional ".concat(d?"active":""),children:[Object(p.jsx)("span",{className:"additional-btn ".concat(s.length>3?"active ":""),onClick:v,children:"..."}),Object(p.jsxs)("div",{className:"additional-info",onMouseLeave:v,children:[Object(p.jsx)("h2",{children:"Additional Info"}),Object(p.jsx)("div",{className:"content",children:Object(p.jsx)("textarea",{name:"additionalInfo",id:"textarea-blank".concat(t.id),value:s,onChange:function(e){var t=e.target.value.replace(b," ");l(t),n({name:e.target.name,value:{label:t}})},placeholder:"Reminder...",ref:j})})]})]})}),w=40,y=38,C=37,E=13,I=8,F=(n(28),function(e){var t=e.data,n=e.onSave,c=Object(a.useState)({tasks:t.tasks,id:t.id,date:t.date,timeStatus:t.timeStatus,additionalInfo:t.additionalInfo}),i=Object(r.a)(c,2),s=i[0],o=i[1],f=u()(s.date).format("dddd"),b=Object(a.useRef)(null),v=Object(a.useState)({index:null}),O=Object(r.a)(v,2),m=O[0],h=O[1],g=function(e){if("tasks"===e.name){var t=s.tasks.map((function(t){return t.id===e.value.id?e.value:t}));o((function(e){return function(e){var t=e.tasks.length;if(t>=1){var n=e.tasks.reduce((function(e,t){return t.label?e+1:e}),0);if(n===t){var a=e.tasks,c=a[a.length-1].id;return a.push(Object(l.a)(Object(l.a)({},j),{},{id:c+1})),Object(l.a)(Object(l.a)({},e),{},{tasks:a})}if(n<t-1){var i=e.tasks.filter((function(e,n){return e.label||n===t-1}));return Object(l.a)(Object(l.a)({},e),{},{tasks:i})}return e}}(Object(l.a)(Object(l.a)({},e),{},{tasks:t}))}))}else o((function(t){return Object(l.a)(Object(l.a)({},t),{},Object(d.a)({},e.name,e.value))}))},S=function(e,t){var n=b.current;if(n){var a=e.currentTarget.selectionStart,c=Array.prototype.indexOf.call(n,e.target),i=n.elements[c-1],s=n.elements[c+1],l=n.elements[c];""===t&&h({index:c});var r=function(e){e.selectionEnd=e.selectionStart=a};switch(e.keyCode===E||e.keyCode===y||e.keyCode===C||e.keyCode,e.keyCode){case E:e.preventDefault(),s&&(r(s),s.focus());break;case I:0===l.value.length&&i&&(e.preventDefault(),i.disabled=!1,function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=e,a=n.value;n.value=t;var c=new Event("input",{bubbles:!0}),i=n._valueTracker;console.log(i),i&&i.setValue(a),n.dispatchEvent(c)}(l),i.focus());break;case y:i&&(e.preventDefault(),i.disabled=!1,r(i),i.focus());break;case w:s&&(e.preventDefault(),s.disabled=!1,r(s),s.focus());break;case C:0===a&&i&&(e.preventDefault(),i.disabled=!1,i.selectionStart=i.value.length,i.focus())}}};return Object(a.useEffect)((function(){null!==m.index&&b.current.elements[m.index].focus()}),[m]),Object(a.useEffect)((function(){!function(){if("present"===s.timeStatus&&b){var e=b.current,t=e.elements[0],n=e.elements[e.elements.length-1];t.value?n.focus():t.focus()}}()}),[s.timeStatus]),k(s,(function(){return n(s)})),Object(p.jsxs)("div",{className:"blank ".concat(s.timeStatus),children:[Object(p.jsx)("h2",{className:"week-day",children:f}),Object(p.jsx)("p",{className:"date",children:s.date}),Object(p.jsx)(N,{data:s,onFieldChange:g}),Object(p.jsx)("form",{className:"fields-list scroll",ref:b,children:s.tasks.map((function(e,t){return Object(p.jsx)(x,{data:e,listCounter:t,blankId:s.id,onFieldChange:g,handleKeyNavigation:S,active:t!==s.tasks.length-1},t)}))})]})}),D=n(37),L=n(35),P=n(36),A=n(34),T=function(){var e=window;return{width:e.innerWidth,height:e.innerHeight}},J=function(){var e=Object(a.useState)(T()),t=Object(r.a)(e,2),n=t[0],c=t[1];return Object(a.useEffect)((function(){var e=function(){c(T())};return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[]),n},K={slidesPerView:5},R={slidesPerView:1.3,centeredSlides:!0,spaceBetween:30},V="btnNextSlide",B="btnPrevSlide";n(29),n(30);P.a.use([A.a]);var z=function(e){var t=e.todaySlideIndex,n=J().width,c=n<g?R:K,i=Object(a.useState)(c),s=Object(r.a)(i,2),o=s[0],u=s[1];return Object(a.useEffect)((function(){u(n<g?R:n<h?{slidesPerView:2.5,centeredSlides:!0}:n<m||n<O?{slidesPerView:4}:K)}),[n]),Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)("span",{className:"swiper-button-prev ".concat(B)}),Object(p.jsx)(D.a,Object(l.a)(Object(l.a)({},o),{},{onSwiper:function(e){var a=n<g?t:t-1;e.slideTo(a,0)},pagination:!0,navigation:{nextEl:".".concat(V),prevEl:".".concat(B)},onReachEnd:function(){e.onSlideEnded()},children:e.data.map((function(t,n){return Object(p.jsx)(L.a,{virtualIndex:n,children:Object(p.jsx)(F,{data:t,onSave:e.onSave},n)},n)}))})),Object(p.jsx)("span",{className:"swiper-button-next ".concat(V)})]})},M="letoAppData",H="letoLastUpdateDate",U=function(e){localStorage.setItem(M,JSON.stringify(e))},W=u()().format("L"),_=localStorage.getItem(M),q=(n(31),function(){var e=Object(a.useState)(JSON.parse(_)||[]),t=Object(r.a)(e,2),n=t[0],c=t[1],i=function(e,t){var n=u()(t).isBefore(W),a=u()(t).isAfter(W),c=u()(t).isSame(W);return n?e.timeStatus="past":a?e.timeStatus="future":c&&(e.timeStatus="present"),e},s=function(e,t){for(var a=[],c=!t?-1:1;c<=e;c++){var i=u()(t).add(c,"days").format("L"),s=n.length-1+c;a.push(o(i,s))}return a},o=function(e,t){var n=Object(l.a)(Object(l.a)({},v),{},{date:e,id:t});return i(n,e)},d=function(e){var t=[];Array.isArray(e)?t=n.concat(e):t.push(e),c(t),U(t)},f=n.findIndex((function(e){return u()(e.date).isSame(W)}));Object(a.useEffect)((function(){n.length<7&&d(s(7)),function(e){var t=localStorage.getItem(H),n=JSON.parse(t);if(!u()(n).isSame(W)){var a=e.map((function(e){return i(e,e.date)}));U(a),localStorage.setItem(H,JSON.stringify(W))}}(n)}),[]);return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)("h1",{className:"head-title",children:"LETO"}),Object(p.jsx)("div",{className:"board",children:Object(p.jsx)(z,{data:n,onSave:function(e){var t=n.map((function(t){return t.id===e.id?e:t}));c(t),U(t)},onSlideEnded:function(){var e=n[n.length-1].date;d(s(7,e))},slidesCount:n.length,todaySlideIndex:f})})]})});var G=function(){return Object(p.jsx)("div",{className:"LETO",children:Object(p.jsx)("div",{className:"container",children:Object(p.jsx)(q,{})})})};s.a.render(Object(p.jsx)(c.a.StrictMode,{children:Object(p.jsx)(G,{})}),document.getElementById("root"))}},[[32,1,2]]]);
//# sourceMappingURL=main.58f9da4b.chunk.js.map