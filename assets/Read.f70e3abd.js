import{_ as b,s as A,A as M}from"./Loader.09ba0b77.js";import{r as w,R as S}from"./index.0e7159de.js";import{b as H,S as s,U as T}from"./utils.0c8c74b8.js";import{d as U,m,E as B,z as C,A as v,G as L,n as R,q as j,r as D,o as a,e as c,f as e,u as i,i as p,w as o,t as u,g as F,j as N}from"./vendor.b6bd7c7d.js";import{M as f}from"./Message.fd70e1d5.js";const V=e("hr",null,null,-1),$={class:"u-container u-container-h"},E={key:0,class:"u-flex py-10 min-h-[50vh]"},G={key:1},q=e("p",null,"404",-1),z=e("p",null," I know you could read, but this isn't the place for it. ",-1),I=N("\u{1F449} Go to articles"),P=e("p",null,"500",-1),J=e("p",null,"Unfortunately, couldn't fetch the article.",-1),K={key:1},O={class:"mb-3"},Q={class:"text-3xl font-bold mb-1"},W={class:"mb-1"},X={class:"text-sm mb-1 text-secondary-400"},Y={class:"text-xs text-primary-500"},Z=e("hr",{class:"mb-8"},null,-1),ee=["innerHTML"],ie=U({setup(te){const n=m("Loading..."),d=B([]);C({title:v(()=>H.getTitle(`${n.value} | Article`)),meta:d});const r=L(),l=m(s.processing),t=m(null),y=v(()=>l.value===s.failed&&n.value==="404"),h=async()=>{n.value="Loading...";const _=typeof r.params.slug=="string"?r.params.slug:Array.isArray(r.params.slug)&&r.params.slug.length===1?r.params.slug[0]:null;if(!_){l.value=s.failed,n.value="404";return}try{t.value=await M.getArticleFromSlug(_),l.value=s.done,n.value=t.value.meta.title,d.push({name:"description",content:t.value.meta.description},{name:"keywords",content:t.value.meta.tags.join(", ")})}catch{l.value=s.failed,n.value="500"}};return R(h),j(()=>{w(d)}),(_,g)=>{const x=D("router-link");return a(),c("div",null,[V,e("div",$,[l.value!==i(s).done||!t.value?(a(),c("div",E,[l.value===i(s).processing?(a(),p(b,{key:0})):(a(),c("div",G,[i(y)?(a(),p(f,{key:0},{header:o(()=>[q]),body:o(()=>[z]),footer:o(()=>[F(x,{class:"text-primary-500 hover:text-secondary-500",to:i(S).articles},{default:o(()=>[I]),_:1},8,["to"])]),_:1})):(a(),p(f,{key:1},{header:o(()=>[P]),body:o(()=>[J]),footer:o(()=>[e("button",{class:"text-primary-500 hover:text-secondary-500",onClick:h}," \u{1F504} Retry ")]),_:1}))]))])):(a(),c("div",K,[e("div",O,[e("p",Q,u(t.value.meta.title),1),e("p",W,u(t.value.meta.description),1),e("p",X,u(t.value.meta.tags.map(k=>`#${k}`).join(" ")),1),e("p",Y,u(i(A).Date.relative(new Date(t.value.meta.time))),1)]),Z,e("div",{class:"u-stylify",innerHTML:i(T).getSafeHtml(t.value.content)},null,8,ee)]))])])}}});export{ie as default};
