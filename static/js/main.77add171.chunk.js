(this["webpackJsonptrading-tools"]=this["webpackJsonptrading-tools"]||[]).push([[0],{169:function(e,t,r){e.exports=r(314)},177:function(e,t,r){},313:function(e,t,r){},314:function(e,t,r){"use strict";r.r(t);var n=r(4),a=r.n(n),o=r(115),i=r.n(o),c=(r(174),r(175),r(176),r(177),r(315)),s=r(316),l=r(317),u=r(51),p=r(96),d=r(33),m=r(164),b=r(165),f=r(318),w=r(166),E=function e(){Object(w.a)(this,e)};E.Cash={calculatePositionSize:function(e,t,r){if(0===e)throw new Error("Risk cannot be 0.");if(0===t)throw new Error("Percent change cannot be 0.");if(0===r)throw new Error("Bank roll cannot be 0.");if(e<0)throw new Error("Risk cannot be negative.");if(t<0)throw new Error("Percent change cannot be negative.");if(r<0)throw new Error("Bank roll cannot be negative.");return 100*e/t*r}},E.calculatePercentChange=function(e,t){if(0===e||0===t)throw new Error("Value cannot be 0.");if(e<0||t<0)throw new Error("Value cannot be negative.");return t>e?(t-e)/t*100:(e-t)/e*100},E.calculateRiskReward=function(e,t,r){if(0===e)throw new Error("Entry pricr cannot be 0.");if(0===t)throw new Error("stop loss change cannot be 0.");if(0===r)throw new Error("target cannot be 0.");if(e<0)throw new Error("Entry price cannot be negative.");if(t<0)throw new Error("Stop loss cannot be negative.");if(r<0)throw new Error("target cannot be negative.");return(r-e)/(e-t)};r(313);var y={mode:"text",valueChangeEvent:"input",min:0},h=function(){var e=Object(n.useState)(),t=Object(p.a)(e,2),r=t[0],o=t[1],i=Object(n.useState)(""),c=Object(p.a)(i,2),s=c[0],l=c[1],w=Object(n.useState)({bankRoll:"",entryPrice:"",stopLoss:"",riskPercent:"",target:""}),h=Object(p.a)(w,1)[0];return a.a.createElement(a.a.Fragment,null,a.a.createElement(d.Form,{id:"position-size-form__form",formData:h},a.a.createElement(d.SimpleItem,{dataField:"bankRoll",editorType:"dxNumberBox",editorOptions:Object(u.a)({},y,{format:{type:"currency",currency:"BTC",precision:6},inputAttr:{"data-testid":"position-size-form__input-bankroll"}})},a.a.createElement(d.RequiredRule,{message:"Bank roll is required."})),a.a.createElement(d.SimpleItem,{dataField:"entryPrice",editorType:"dxNumberBox",editorOptions:Object(u.a)({},y,{format:{type:"currency",currency:"USD",precision:2},defaultValue:200,inputAttr:{"data-testid":"position-size-form__input-entry-price"}})},a.a.createElement(d.RequiredRule,{message:"Entry price is required."})),a.a.createElement(d.SimpleItem,{dataField:"stopLoss",editorType:"dxNumberBox",editorOptions:Object(u.a)({},y,{format:{type:"currency",currency:"USD",precision:2},inputAttr:{"data-testid":"position-size-form__input-stop-loss"}})},a.a.createElement(d.RequiredRule,{message:"Stop loss is required."})),a.a.createElement(d.SimpleItem,{dataField:"riskPercent",editorType:"dxNumberBox",editorOptions:Object(u.a)({},y,{format:{type:"percent",precision:2},min:.01,max:1,inputAttr:{"data-testid":"position-size-form__input-risk-percent"}})},a.a.createElement(d.RequiredRule,{message:"Risk percent is required."})),a.a.createElement(d.SimpleItem,{dataField:"target",editorType:"dxNumberBox",editorOptions:Object(u.a)({},y,{format:{type:"currency",currency:"USD",precision:2},inputAttr:{"data-testid":"position-size-form__input-target"}})}),a.a.createElement(d.ButtonItem,{buttonOptions:Object(u.a)({},y,{type:"success",text:"Calculate",onClick:function(e){var t=h.bankRoll,r=h.entryPrice,n=h.stopLoss,a=h.riskPercent,i=h.target;if(e.validationGroup.validate().isValid){var c=E.calculatePercentChange(parseInt(r),parseInt(n)),s=E.Cash.calculatePositionSize(parseFloat(a).toFixed(2),c,parseFloat(t));o(s);var u=E.calculateRiskReward(parseFloat(r),parseFloat(n),parseFloat(i));l("1:".concat(u.toFixed(2)))}},elementAttr:{"data-testid":"position-size-form__button-calculate"}})})),a.a.createElement(f.a,{"data-testid":"position-size-form__results-panel",id:"position-size-form__results",bg:"warning",text:"white"},a.a.createElement(f.a.Header,null,"Results"),a.a.createElement(f.a.Body,null,a.a.createElement("div",null,"Position Size:",a.a.createElement(m.NumberBox,{format:{type:"currency",currency:"BTC",precision:9},readOnly:!0,value:r,inputAttr:{"data-testid":"position-size-form__output-position-size"},style:{background:"transparent",display:"inline-block",border:"none",color:"white"}})),a.a.createElement("div",null,"Risk/Reward:",a.a.createElement(b.TextBox,{readOnly:!0,value:s,inputAttr:{"data-testid":"position-size-form__output-risk-reward"},style:{background:"transparent",display:"inline-block",border:"none",color:"white"}})))))},g=function(){return a.a.createElement(c.a,null,a.a.createElement(s.a,null,a.a.createElement(l.a,{xs:12},a.a.createElement(h,null))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[169,1,2]]]);
//# sourceMappingURL=main.77add171.chunk.js.map