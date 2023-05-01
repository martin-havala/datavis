import{S as wt,i as St,s as Ct,a as C,k as M,J as Y,q as N,P as Yt,h,c as L,l as G,m as v,K as $,r as A,n as c,b as xt,G as r,H as ut,o as Nt,w as Mt}from"../chunks/index.b63d9627.js";import"../chunks/transform.f0a34255.js";import{m as Gt,b as Lt}from"../chunks/band.41fc2bb8.js";import{d as Dt,n as $t,e as At}from"../chunks/linear.2f9814ba.js";import{e as Ft}from"../chunks/extent.4cf1c809.js";import{c as Bt}from"../chunks/dsv.6b9e725e.js";import{s as at}from"../chunks/select.84cbef7e.js";import{a as Pt}from"../chunks/axis.a25b44c4.js";import{c as Ot}from"../chunks/colors.98f238a0.js";function Rt(t=Dt){if(t===Dt)return It;if(typeof t!="function")throw new TypeError("compare is not a function");return(s,e)=>{const a=t(s,e);return a||a===0?a:(t(e,e)===0)-(t(s,s)===0)}}function It(t,s){return(t==null||!(t>=t))-(s==null||!(s>=s))||(t<s?-1:t>s?1:0)}function Et(t,s){let e;if(s===void 0)for(const a of t)a!=null&&(e>a||e===void 0&&a>=a)&&(e=a);else{let a=-1;for(let i of t)(i=s(i,++a,t))!=null&&(e>i||e===void 0&&i>=i)&&(e=i)}return e}function Tt(t,s,e=0,a=1/0,i){if(s=Math.floor(s),e=Math.floor(Math.max(0,e)),a=Math.floor(Math.min(t.length-1,a)),!(e<=s&&s<=a))return t;for(i=i===void 0?It:Rt(i);a>e;){if(a-e>600){const m=a-e+1,d=s-e+1,D=Math.log(m),_=.5*Math.exp(2*D/3),F=.5*Math.sqrt(D*_*(m-_)/m)*(d-m/2<0?-1:1),b=Math.max(e,Math.floor(s-d*_/m+F)),T=Math.min(a,Math.floor(s+(m-d)*_/m+F));Tt(t,s,b,T,i)}const p=t[s];let u=e,l=a;for(Z(t,e,s),i(t[a],p)>0&&Z(t,e,a);u<l;){for(Z(t,u,l),++u,--l;i(t[u],p)<0;)++u;for(;i(t[l],p)>0;)--l}i(t[e],p)===0?Z(t,e,l):(++l,Z(t,l,a)),l<=s&&(e=l+1),s<=l&&(a=l-1)}return t}function Z(t,s,e){const a=t[s];t[s]=t[e],t[e]=a}function Vt(t,s,e){if(t=Float64Array.from($t(t,e)),!(!(a=t.length)||isNaN(s=+s))){if(s<=0||a<2)return Et(t);if(s>=1)return Gt(t);var a,i=(a-1)*s,p=Math.floor(i),u=Gt(Tt(t,p).subarray(0,p+1)),l=Et(t.subarray(p+1));return u+(l-u)*(i-p)}}function bt(t,s){return Vt(t,.5,s)}function Ht(t){for(var s in t){var e=t[s].trim(),a,i;if(!e)e=null;else if(e==="true")e=!0;else if(e==="false")e=!1;else if(e==="NaN")e=NaN;else if(!isNaN(a=+e))e=a;else if(i=e.match(/^([-+]\d{2})?\d{4}(-\d{2}(-\d{2})?)?(T\d{2}:\d{2}(:\d{2}(\.\d{3})?)?(Z|[-+]\d{2}:\d{2})?)?$/))kt&&i[4]&&!i[7]&&(e=e.replace(/-/g,"/").replace(/T/," ")),e=new Date(e);else continue;t[s]=e}return t}const kt=new Date("2019-01-01T00:00").getHours()||new Date("2019-07-01T00:00").getHours(),qt=Ot("4e79a7f28e2ce1575976b7b259a14fedc949af7aa1ff9da79c755fbab0ab"),Wt=""+new URL("../assets/e_gov.6dc5baeb.csv",import.meta.url).href;function Ut(t){let s,e,a,i,p,u,l,m,d,D,_,F,b,T,z,g,x,B,H,k,E,y,I,Q,n,o,f,K,w,q,S,R,nt,st,W,rt,V,it,ot,U;return{c(){s=C(),e=M("section"),a=M("div"),i=M("div"),p=C(),u=M("div"),l=M("div"),m=Y("svg"),d=Y("text"),D=N("Country"),_=Y("text"),F=N("GTMI"),b=C(),T=Y("svg"),z=C(),g=M("div"),x=M("h1"),B=N("Data Governance"),H=M("br"),k=N(" Maturity Indicators"),E=C(),y=M("i"),I=N("The State of GovTech Foundational Blocks in 198 economies"),Q=C(),n=M("br"),o=C(),f=M("div"),K=N(`Legend (order for typical scenario)
                    `),w=Y("svg"),q=Y("g"),S=Y("line"),R=Y("text"),nt=N("Digital Governance Maturity"),st=C(),W=M("div"),rt=N("Data source: "),V=M("a"),it=N("THE WORLD BANK"),ot=C(),U=Y("svg"),this.h()},l(P){Yt("svelte-126dile",document.head).forEach(h),s=L(P),e=G(P,"SECTION",{});var ht=v(e);a=G(ht,"DIV",{class:!0});var j=v(a);i=G(j,"DIV",{id:!0,class:!0}),v(i).forEach(h),p=L(j),u=G(j,"DIV",{class:!0});var X=v(u);l=G(X,"DIV",{class:!0});var tt=v(l);m=$(tt,"svg",{width:!0,height:!0,class:!0});var ct=v(m);d=$(ct,"text",{x:!0,y:!0});var mt=v(d);D=A(mt,"Country"),mt.forEach(h),_=$(ct,"text",{x:!0,y:!0});var gt=v(_);F=A(gt,"GTMI"),gt.forEach(h),ct.forEach(h),b=L(tt),T=$(tt,"svg",{}),v(T).forEach(h),tt.forEach(h),z=L(X),g=G(X,"DIV",{class:!0});var O=v(g);x=G(O,"H1",{});var et=v(x);B=A(et,"Data Governance"),H=G(et,"BR",{}),k=A(et," Maturity Indicators"),et.forEach(h),E=L(O),y=G(O,"I",{});var vt=v(y);I=A(vt,"The State of GovTech Foundational Blocks in 198 economies"),vt.forEach(h),Q=L(O),n=G(O,"BR",{}),o=L(O),f=G(O,"DIV",{class:!0});var J=v(f);K=A(J,`Legend (order for typical scenario)
                    `),w=$(J,"svg",{width:!0,height:!0,class:!0});var dt=v(w);q=$(dt,"g",{class:!0});var pt=v(q);S=$(pt,"line",{class:!0,x1:!0,x2:!0,y1:!0,y2:!0}),v(S).forEach(h),pt.forEach(h),R=$(dt,"text",{x:!0,y:!0});var _t=v(R);nt=A(_t,"Digital Governance Maturity"),_t.forEach(h),dt.forEach(h),st=L(J),W=G(J,"DIV",{});var ft=v(W);rt=A(ft,"Data source: "),V=G(ft,"A",{href:!0,target:!0});var yt=v(V);it=A(yt,"THE WORLD BANK"),yt.forEach(h),ft.forEach(h),J.forEach(h),O.forEach(h),ot=L(X),U=$(X,"svg",{class:!0}),v(U).forEach(h),X.forEach(h),j.forEach(h),ht.forEach(h),this.h()},h(){document.title="Data Governance Maturity Indicators",c(i,"id","tooltip"),c(i,"class","svelte-1nkrmog"),c(d,"x",t[2].left-10),c(d,"y",10),c(_,"x",t[3]+t[2].left+40),c(_,"y",10),c(m,"width","100%"),c(m,"height","15"),c(m,"class","topLegend svelte-1nkrmog"),c(l,"class","mainChartWrap svelte-1nkrmog"),c(S,"class","progress line"),c(S,"x1","10"),c(S,"x2","25"),c(S,"y1","185"),c(S,"y2","185"),c(q,"class","maturityGroupA"),c(R,"x","30"),c(R,"y","190"),c(w,"width","300"),c(w,"height","200"),c(w,"class","svelte-1nkrmog"),c(V,"href","https://datacatalog.worldbank.org/search/dataset/0050602/Data-Governance-Maturity-Indicators"),c(V,"target","_blank"),c(f,"class","svgLegend svelte-1nkrmog"),c(g,"class","description svelte-1nkrmog"),c(U,"class","svgX svelte-1nkrmog"),c(u,"class","chart svelte-1nkrmog"),c(a,"class","page svelte-1nkrmog")},m(P,lt){xt(P,s,lt),xt(P,e,lt),r(e,a),r(a,i),r(a,p),r(a,u),r(u,l),r(l,m),r(m,d),r(d,D),r(m,_),r(_,F),r(l,b),r(l,T),t[4](T),r(u,z),r(u,g),r(g,x),r(x,B),r(x,H),r(x,k),r(g,E),r(g,y),r(y,I),r(g,Q),r(g,n),r(g,o),r(g,f),r(f,K),r(f,w),r(w,q),r(q,S),r(w,R),r(R,nt),r(f,st),r(f,W),r(W,rt),r(W,V),r(V,it),r(u,ot),r(u,U),t[5](U)},p:ut,i:ut,o:ut,d(P){P&&h(s),P&&h(e),t[4](null),t[5](null)}}}function Xt(t,s,e){let a={top:10,right:60,bottom:0,left:50},i=1e3-a.left-a.right,p=2200-a.top-a.bottom,u,l,m,d=[];const D=["UN e-Gov Dev Index_DG Yr","GovTech_GT since","Financial Management Information System_Op Yr","Tax Administration_TMIS Yr","Customs Administration_CMIS Yr","e-Filing_eFil Yr","e-Payment_ePay Yr","Digital Signature_Dsign Yr"],_={"GovTech_GT since":"Establishing GovTech Institution","UN e-Gov Dev Index_DG Yr":"E-Gov strategy launch","Financial Management Information System_Op Yr":"Financial Management IS","Tax Administration_TMIS Yr":"Tax admin system","Customs Administration_CMIS Yr":"Customs administration","e-Filing_eFil Yr":"E-Filing","e-Payment_ePay Yr":"E-Payment","Digital Signature_Dsign Yr":"E-Payment"},F={A:"Optimized / Sustained",B:"Proactive / Operational",C:"Reactive / Discovery",D:"Basic / Nascent"},b=qt;Nt(()=>{Bt(Wt,Ht).then(g=>{d=g;const x=D.reduce((n,o)=>({...n,[o]:bt(d.map(f=>f[o]))}),{});x["DG Systems & Services_Code"]="World",x["GTMI > Expert opinion for weights_GTMI"]=bt(d.map(n=>n["GTMI > Expert opinion for weights_GTMI"])),x["Data Governance Maturity_Grp"]=d.map(n=>n["Data Governance Maturity_Grp"]).sort()[Math.floor(d.length/2)],x["Country Data_Level"]=d.map(n=>n["Country Data_Level"]).sort()[Math.floor(d.length/2)],d.push(x),d.forEach(n=>{[n.begin,n.end]=Ft(D.map(o=>n[o]).filter(Boolean))}),d.sort((n,o)=>n["DG Systems & Services_Code"]=="World"||n["GTMI > Expert opinion for weights_GTMI"]>o["GTMI > Expert opinion for weights_GTMI"]?-1:1),m=at(u).attr("width",i+a.left+a.right).attr("height",p+a.top+a.bottom).append("g").attr("transform","translate("+a.left+","+a.top+")");const B=At([1975,2020],[0,i]),H=at(".svgLegend svg").selectAll("legend").data(D.sort((n,o)=>d[0][n]>d[0][o]?1:-1)).join("g").attr("transform",(n,o)=>`translate(10,${20+o*20})`);H.append("circle").attr("cx",10).attr("cy",-4).attr("r",4).attr("fill",(n,o)=>b[o]).attr("stroke",(n,o)=>b[o]),H.append("text").attr("x",20).text(n=>`${_[n]} `),at(l).attr("width",i+a.left+a.right).attr("height",25).append("g").attr("transform","translate("+a.left+",5)").call(Pt(B).tickFormat(n=>`${n}`)).selectAll("text").style("text-anchor","middle");const k=Lt().domain(d.map(n=>n["DG Systems & Services_Code"])).range([0,p]).paddingOuter(0),E=k.bandwidth()/2;var y=at("#tooltip").style("position","absolute").style("visibility","hidden");const I=m.selectAll("country").data(d).join("g").attr("class",n=>`country ${n["DG Systems & Services_Code"]} ${n["Country Data_Level"]} maturityGroup${n["Data Governance Maturity_Grp"]}`).attr("transform",n=>`translate(0,${k(n["DG Systems & Services_Code"])})`).style("animation-duration",(n,o)=>`${o*10}ms`);I.append("rect").attr("class","line background").attr("x",-1-10).attr("width",i+30).attr("height",E*2).attr("fill-opacity",".01").attr("opacity",0),I.append("line").attr("class","label line").attr("x1",n=>0).attr("x2",n=>i+15).attr("y1",E).attr("y2",E).attr("stroke","#444").attr("stroke-width","1"),I.append("line").attr("class","progress line").attr("x1",n=>Math.max(0,B(n.begin))).attr("x2",n=>B(n.end)).attr("y1",E).attr("y2",E).attr("animation-delay",`${Math.random()*5}s`).attr("animation-duration",`${Math.random()*2}s`).on("mouseover",()=>y.style("visibility","visible")).on("mousemove",(n,o)=>{const f=o["Data Governance Maturity_Grp"];y.html(`Maturity level: <b>${f}</b> <br/>(${F[f]})`),y.style("top",n.pageY+20+"px").style("left",n.pageX+-30+"px")}).on("mouseout",()=>y.style("visibility","hidden")),D.forEach((n,o)=>{I.append("circle").filter(f=>!!f[n]&&!isNaN(f[n])).attr("cx",f=>B(f[n])+o*2-D.length).attr("cy",f=>E).attr("r",4).attr("fill",f=>b[o]).attr("stroke",f=>b[o]).on("mouseover",()=>y.style("visibility","visible")).on("mousemove",(f,K)=>{y.text(`${_[n]}: ${K[n]}`),y.style("top",f.pageY+20+"px").style("left",f.pageX+-30+"px")}).on("mouseout",()=>y.style("visibility","hidden"))}),I.append("g").attr("class","indices").attr("transform",`translate(${i+20},${E})`).append("text").text(n=>{var o;return(o=n["GTMI > Expert opinion for weights_GTMI"])==null?void 0:o.toFixed(3)}),I.append("text").attr("class","label").attr("x",-10).attr("y",E).text(n=>n["DG Systems & Services_Code"])})});function T(g){Mt[g?"unshift":"push"](()=>{u=g,e(0,u)})}function z(g){Mt[g?"unshift":"push"](()=>{l=g,e(1,l)})}return[u,l,a,i,T,z]}class ne extends wt{constructor(s){super(),St(this,s,Xt,Ut,Ct,{})}}export{ne as default};
