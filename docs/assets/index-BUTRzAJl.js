import{U as k,a as n,o as u,c as i,w as m,V as r,r as s,e as C,b as e,u as d,d as b,S as g}from"./index-CogI4yWM.js";import{m as h}from"./mdi-WPjaOhOD.js";const V={__name:"BoldButton",setup(_){const o=k("getContext")();function t(){o.editor.command("bold")}return(p,v)=>{const l=n("v-btn");return u(),i(l,{onClick:t},{default:m(()=>[r("Bold")]),_:1})}}},y=V,M={__name:"index",setup(_){const a=s(""),o=s(null);let t=null;C(()=>{t=o.value.getContext()});const f=["undo","redo","divider",e(n("v-btn"),{onClick:()=>{t.editor.insertOrReplace(`Hello World
`)}},{default:()=>[r("Hello World")]}),()=>e(n("v-btn"),{onClick:()=>{t.editor.insertOrReplace(`lucky!
`)}},{default:()=>[r("lucky")]}),{name:"avatar",icon:h,tip:"avatar",exec(){t.editor.command("image",{url:"/img/avatar.png",title:"avatar"})}},y];return(w,c)=>{const x=n("v-divider");return u(),i(d(g),{modelValue:a.value,"onUpdate:modelValue":c[0]||(c[0]=B=>a.value=B),ref_key:"sm",ref:o},{toolbar:m(()=>[e(d(b),{color:"white",items:f}),e(x)]),_:1},8,["modelValue"])}}};export{M as default};
