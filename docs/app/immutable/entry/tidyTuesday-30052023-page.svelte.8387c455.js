import{S as Mt,i as _t,s as yt,k as kt,J as P,q as F,l as At,m as L,K as I,h as C,r as O,n as _,p as K,b as bt,H as A,C as rt,o as zt,w as Nt}from"../chunks/index.0cb42cb9.js";import"../chunks/transform.f0a34255.js";import{c as Rt}from"../chunks/csv.41e40aac.js";import{s as Ct}from"../chunks/select.84cbef7e.js";import{e as Lt}from"../chunks/extent.4cf1c809.js";import{b as Pt,a as wt}from"../chunks/ticks.39a2651d.js";import{m as gt}from"../chunks/max.adfc8a60.js";import{l as It}from"../chunks/line.16a03edc.js";const jt=$t(Bt);function $t(t){return function(n,f,i=f){if(!((f=+f)>=0))throw new RangeError("invalid rx");if(!((i=+i)>=0))throw new RangeError("invalid ry");let{data:e,width:s,height:h}=n;if(!((s=Math.floor(s))>=0))throw new RangeError("invalid width");if(!((h=Math.floor(h!==void 0?h:e.length/s))>=0))throw new RangeError("invalid height");if(!s||!h||!f&&!i)return n;const g=f&&t(f),m=i&&t(i),r=e.slice();return g&&m?(T(g,r,e,s,h),T(g,e,r,s,h),T(g,r,e,s,h),U(m,e,r,s,h),U(m,r,e,s,h),U(m,e,r,s,h)):g?(T(g,e,r,s,h),T(g,r,e,s,h),T(g,e,r,s,h)):m&&(U(m,e,r,s,h),U(m,r,e,s,h),U(m,e,r,s,h)),n}}function T(t,n,f,i,e){for(let s=0,h=i*e;s<h;)t(n,f,s,s+=i,1)}function U(t,n,f,i,e){for(let s=0,h=i*e;s<i;++s)t(n,f,s,s+h,i)}function Bt(t){const n=Math.floor(t);if(n===t)return Ft(t);const f=t-n,i=2*t+1;return(e,s,h,g,m)=>{if(!((g-=m)>=h))return;let r=n*s[h];const c=m*n,v=c+m;for(let u=h,x=h+c;u<x;u+=m)r+=s[Math.min(g,u)];for(let u=h,x=g;u<=x;u+=m)r+=s[Math.min(g,u+c)],e[u]=(r+f*(s[Math.max(h,u-v)]+s[Math.min(g,u+v)]))/i,r-=s[Math.max(h,u-c)]}}function Ft(t){const n=2*t+1;return(f,i,e,s,h)=>{if(!((s-=h)>=e))return;let g=t*i[e];const m=h*t;for(let r=e,c=e+m;r<c;r+=h)g+=i[Math.min(s,r)];for(let r=e,c=s;r<=c;r+=h)g+=i[Math.min(s,r+m)],f[r]=g/n,g-=i[Math.max(e,r-m)]}}function Ot(t,n){let f=0;if(n===void 0)for(let i of t)i!=null&&(i=+i)>=i&&++f;else{let i=-1;for(let e of t)(e=n(e,++i,t))!=null&&(e=+e)>=e&&++f}return f}function Dt(t,n,f){let i;for(;;){const e=Pt(t,n,f);if(e===i||e===0||!isFinite(e))return[t,n];e>0?(t=Math.floor(t/e)*e,n=Math.ceil(n/e)*e):e<0&&(t=Math.ceil(t*e)/e,n=Math.floor(n*e)/e),i=e}}function Vt(t){return Math.max(1,Math.ceil(Math.log(Ot(t))/Math.LN2)+1)}function mt(t,n){let f=0,i=0;if(n===void 0)for(let e of t)e!=null&&(e=+e)>=e&&(++f,i+=e);else{let e=-1;for(let s of t)(s=n(s,++e,t))!=null&&(s=+s)>=s&&(++f,i+=s)}if(f)return i/f}var Ht=Array.prototype,Et=Ht.slice;function Jt(t,n){return t-n}function Kt(t){for(var n=0,f=t.length,i=t[f-1][1]*t[0][0]-t[f-1][0]*t[0][1];++n<f;)i+=t[n-1][1]*t[n][0]-t[n-1][0]*t[n][1];return i}const D=t=>()=>t;function Tt(t,n){for(var f=-1,i=n.length,e;++f<i;)if(e=Ut(t,n[f]))return e;return 0}function Ut(t,n){for(var f=n[0],i=n[1],e=-1,s=0,h=t.length,g=h-1;s<h;g=s++){var m=t[s],r=m[0],c=m[1],v=t[g],u=v[0],x=v[1];if(Wt(m,v,n))return 0;c>i!=x>i&&f<(u-r)*(i-c)/(x-c)+r&&(e=-e)}return e}function Wt(t,n,f){var i;return Xt(t,n,f)&&Yt(t[i=+(t[0]===n[0])],f[i],n[i])}function Xt(t,n,f){return(n[0]-t[0])*(f[1]-t[1])===(f[0]-t[0])*(n[1]-t[1])}function Yt(t,n,f){return t<=n&&n<=f||f<=n&&n<=t}function qt(){}var B=[[],[[[1,1.5],[.5,1]]],[[[1.5,1],[1,1.5]]],[[[1.5,1],[.5,1]]],[[[1,.5],[1.5,1]]],[[[1,1.5],[.5,1]],[[1,.5],[1.5,1]]],[[[1,.5],[1,1.5]]],[[[1,.5],[.5,1]]],[[[.5,1],[1,.5]]],[[[1,1.5],[1,.5]]],[[[.5,1],[1,.5]],[[1.5,1],[1,1.5]]],[[[1.5,1],[1,.5]]],[[[.5,1],[1.5,1]]],[[[1,1.5],[1.5,1]]],[[[.5,1],[1,1.5]]],[]];function pt(){var t=1,n=1,f=Vt,i=m;function e(r){var c=f(r);if(Array.isArray(c))c=c.slice().sort(Jt);else{const v=Lt(r,Gt);for(c=wt(...Dt(v[0],v[1],c),c);c[c.length-1]>=v[1];)c.pop();for(;c[1]<v[0];)c.shift()}return c.map(v=>s(r,v))}function s(r,c){const v=c==null?NaN:+c;if(isNaN(v))throw new Error(`invalid value: ${c}`);var u=[],x=[];return h(r,v,function(l){i(l,r,v),Kt(l)>0?u.push([l]):x.push(l)}),x.forEach(function(l){for(var d=0,y=u.length,p;d<y;++d)if(Tt((p=u[d])[0],l)!==-1){p.push(l);return}}),{type:"MultiPolygon",value:c,coordinates:u}}function h(r,c,v){var u=new Array,x=new Array,l,d,y,p,a,k;for(l=d=-1,p=V(r[0],c),B[p<<1].forEach(M);++l<t-1;)y=p,p=V(r[l+1],c),B[y|p<<1].forEach(M);for(B[p<<0].forEach(M);++d<n-1;){for(l=-1,p=V(r[d*t+t],c),a=V(r[d*t],c),B[p<<1|a<<2].forEach(M);++l<t-1;)y=p,p=V(r[d*t+t+l+1],c),k=a,a=V(r[d*t+l+1],c),B[y|p<<1|a<<2|k<<3].forEach(M);B[p|a<<3].forEach(M)}for(l=-1,a=r[d*t]>=c,B[a<<2].forEach(M);++l<t-1;)k=a,a=V(r[d*t+l+1],c),B[a<<2|k<<3].forEach(M);B[a<<3].forEach(M);function M(z){var b=[z[0][0]+l,z[0][1]+d],N=[z[1][0]+l,z[1][1]+d],o=g(b),w=g(N),E,R;(E=x[o])?(R=u[w])?(delete x[E.end],delete u[R.start],E===R?(E.ring.push(N),v(E.ring)):u[E.start]=x[R.end]={start:E.start,end:R.end,ring:E.ring.concat(R.ring)}):(delete x[E.end],E.ring.push(N),x[E.end=w]=E):(E=u[w])?(R=x[o])?(delete u[E.start],delete x[R.end],E===R?(E.ring.push(N),v(E.ring)):u[R.start]=x[E.end]={start:R.start,end:E.end,ring:R.ring.concat(E.ring)}):(delete u[E.start],E.ring.unshift(b),u[E.start=o]=E):u[o]=x[w]={start:o,end:w,ring:[b,N]}}}function g(r){return r[0]*2+r[1]*(t+1)*4}function m(r,c,v){r.forEach(function(u){var x=u[0],l=u[1],d=x|0,y=l|0,p=at(c[y*t+d]);x>0&&x<t&&d===x&&(u[0]=vt(x,at(c[y*t+d-1]),p,v)),l>0&&l<n&&y===l&&(u[1]=vt(l,at(c[(y-1)*t+d]),p,v))})}return e.contour=s,e.size=function(r){if(!arguments.length)return[t,n];var c=Math.floor(r[0]),v=Math.floor(r[1]);if(!(c>=0&&v>=0))throw new Error("invalid size");return t=c,n=v,e},e.thresholds=function(r){return arguments.length?(f=typeof r=="function"?r:Array.isArray(r)?D(Et.call(r)):D(r),e):f},e.smooth=function(r){return arguments.length?(i=r?m:qt,e):i===m},e}function Gt(t){return isFinite(t)?t:NaN}function V(t,n){return t==null?!1:+t>=n}function at(t){return t==null||isNaN(t=+t)?-1/0:t}function vt(t,n,f,i){const e=i-n,s=f-n,h=isFinite(e)||isFinite(s)?e/s:Math.sign(e)/Math.sign(s);return isNaN(h)?t:t+h-.5}function Qt(t){return t[0]}function Zt(t){return t[1]}function St(){return 1}function te(){var t=Qt,n=Zt,f=St,i=960,e=500,s=20,h=2,g=s*3,m=i+g*2>>h,r=e+g*2>>h,c=D(20);function v(a){var k=new Float32Array(m*r),M=Math.pow(2,-h),z=-1;for(const j of a){var b=(t(j,++z,a)+g)*M,N=(n(j,z,a)+g)*M,o=+f(j,z,a);if(o&&b>=0&&b<m&&N>=0&&N<r){var w=Math.floor(b),E=Math.floor(N),R=b-w-.5,$=N-E-.5;k[w+E*m]+=(1-R)*(1-$)*o,k[w+1+E*m]+=R*(1-$)*o,k[w+1+(E+1)*m]+=R*$*o,k[w+(E+1)*m]+=(1-R)*$*o}}return jt({data:k,width:m,height:r},s*M),k}function u(a){var k=v(a),M=c(k),z=Math.pow(2,2*h);return Array.isArray(M)||(M=wt(Number.MIN_VALUE,gt(k)/z,M)),pt().size([m,r]).thresholds(M.map(b=>b*z))(k).map((b,N)=>(b.value=+M[N],x(b)))}u.contours=function(a){var k=v(a),M=pt().size([m,r]),z=Math.pow(2,2*h),b=N=>{N=+N;var o=x(M.contour(k,N*z));return o.value=N,o};return Object.defineProperty(b,"max",{get:()=>gt(k)/z}),b};function x(a){return a.coordinates.forEach(l),a}function l(a){a.forEach(d)}function d(a){a.forEach(y)}function y(a){a[0]=a[0]*Math.pow(2,h)-g,a[1]=a[1]*Math.pow(2,h)-g}function p(){return g=s*3,m=i+g*2>>h,r=e+g*2>>h,u}return u.x=function(a){return arguments.length?(t=typeof a=="function"?a:D(+a),u):t},u.y=function(a){return arguments.length?(n=typeof a=="function"?a:D(+a),u):n},u.weight=function(a){return arguments.length?(f=typeof a=="function"?a:D(+a),u):f},u.size=function(a){if(!arguments.length)return[i,e];var k=+a[0],M=+a[1];if(!(k>=0&&M>=0))throw new Error("invalid size");return i=k,e=M,p()},u.cellSize=function(a){if(!arguments.length)return 1<<h;if(!((a=+a)>=1))throw new Error("invalid cell size");return h=Math.floor(Math.log(a)/Math.LN2),p()},u.thresholds=function(a){return arguments.length?(c=typeof a=="function"?a:Array.isArray(a)?D(Et.call(a)):D(a),u):c},u.bandwidth=function(a){if(!arguments.length)return Math.sqrt(s*(s+1));if(!((a=+a)>=0))throw new Error("invalid bandwidth");return s=(Math.sqrt(4*a*a+1)-1)/2,p()},u}function ee(t){let n,f,i,e,s,h,g,m,r,c,v,u,x,l,d,y,p,a,k,M,z,b,N,o,w,E,R,$,j,H,W,G;return{c(){n=kt("section"),f=P("svg"),i=P("g"),e=P("g"),s=P("text"),h=F("Oldest living people"),g=P("text"),m=F("Verified list of the oldest people"),r=P("text"),c=P("a"),v=F("datasource: wiki"),u=P("g"),x=P("g"),l=P("path"),d=P("text"),y=F("male"),p=P("g"),a=P("path"),k=P("text"),M=F("female "),z=P("g"),b=P("path"),N=P("text"),o=F("alive"),w=P("g"),E=P("path"),R=P("text"),$=F("deceased"),j=P("g"),H=P("path"),W=P("text"),G=F("world average"),this.h()},l(X){n=At(X,"SECTION",{});var q=L(n);f=I(q,"svg",{viewBox:!0,"xmlns:xlink":!0,class:!0});var Q=L(f);i=I(Q,"g",{}),L(i).forEach(C),e=I(Q,"g",{class:!0,transform:!0});var Y=L(e);s=I(Y,"text",{x:!0,y:!0,style:!0});var ot=L(s);h=O(ot,"Oldest living people"),ot.forEach(C),g=I(Y,"text",{x:!0,y:!0,style:!0});var st=L(g);m=O(st,"Verified list of the oldest people"),st.forEach(C),r=I(Y,"text",{x:!0,y:!0,style:!0});var lt=L(r);c=I(lt,"a",{href:!0});var it=L(c);v=O(it,"datasource: wiki"),it.forEach(C),lt.forEach(C),u=I(Y,"g",{transform:!0});var J=L(u);x=I(J,"g",{class:!0,transform:!0});var Z=L(x);l=I(Z,"path",{d:!0,class:!0}),L(l).forEach(C),d=I(Z,"text",{});var ft=L(d);y=O(ft,"male"),ft.forEach(C),Z.forEach(C),p=I(J,"g",{class:!0,transform:!0});var S=L(p);a=I(S,"path",{d:!0,class:!0}),L(a).forEach(C),k=I(S,"text",{});var ct=L(k);M=O(ct,"female "),ct.forEach(C),S.forEach(C),z=I(J,"g",{class:!0,transform:!0});var tt=L(z);b=I(tt,"path",{d:!0,class:!0}),L(b).forEach(C),N=I(tt,"text",{});var ut=L(N);o=O(ut,"alive"),ut.forEach(C),tt.forEach(C),w=I(J,"g",{class:!0,transform:!0});var et=L(w);E=I(et,"path",{d:!0,class:!0}),L(E).forEach(C),R=I(et,"text",{});var ht=L(R);$=O(ht,"deceased"),ht.forEach(C),et.forEach(C),j=I(J,"g",{class:!0,transform:!0});var nt=L(j);H=I(nt,"path",{d:!0,class:!0}),L(H).forEach(C),W=I(nt,"text",{});var dt=L(W);G=O(dt,"world average"),dt.forEach(C),nt.forEach(C),J.forEach(C),Y.forEach(C),Q.forEach(C),q.forEach(C),this.h()},h(){_(s,"x","70"),_(s,"y","0"),K(s,"font-size","3em"),K(s,"text-anchor","end"),_(g,"x","70"),_(g,"y","50"),K(g,"font-size",".9em"),K(g,"text-anchor","end"),_(c,"href","https://en.wikipedia.org/wiki/List_of_verified_oldest_people"),_(r,"x","70"),_(r,"y","110"),K(r,"font-size",".8em"),K(r,"text-anchor","end"),_(l,"d","M0,0 h20"),_(l,"class","person_contour alive"),_(x,"class","male alive"),_(x,"transform","translate(0, 120)"),_(a,"d","M0,0 h20"),_(a,"class","person_contour alive"),_(p,"class","female alive"),_(p,"transform","translate(0, 140)"),_(b,"d","M0,0 h20"),_(b,"class","person_contour alive"),_(z,"class","alive"),_(z,"transform","translate(0, 180)"),_(E,"d","M0,0 h20"),_(E,"class","person_contour deceased"),_(w,"class",""),_(w,"transform","translate(0, 200)"),_(H,"d","M0,0 h20"),_(H,"class","average"),_(j,"class","avg_contour"),_(j,"transform","translate(0, 240)"),_(u,"transform","translate(0, 40)"),_(e,"class","side_legend"),_(e,"transform","translate(700, 50)"),_(f,"viewBox","0 0 800 800"),_(f,"xmlns:xlink","http://www.w3.org/1999/xlink"),_(f,"class","svelte-11xa386")},m(X,q){bt(X,n,q),A(n,f),A(f,i),t[2](i),A(f,e),A(e,s),A(s,h),A(e,g),A(g,m),A(e,r),A(r,c),A(c,v),A(e,u),A(u,x),A(x,l),A(x,d),A(d,y),A(u,p),A(p,a),A(p,k),A(k,M),A(u,z),A(z,b),A(z,N),A(N,o),A(u,w),A(w,E),A(w,R),A(R,$),A(u,j),A(j,H),A(j,W),A(W,G)},p:rt,i:rt,o:rt,d(X){X&&C(n),t[2](null)}}}function xt(t,n){n&&(t.append("text").text(n),t.append("circle").attr("r",2))}function ne(t,n,f){let{data:i}=n;const e=Rt(i.centenarians).map(l=>({...l,age:Math.floor(l.age)})),s=e.reduce((l,d)=>l.find(y=>y.age==d.age&&y.gender==d.gender&&y.still_alive==d.still_alive)?l:[...l,d],[]),h=(l,d)=>{const y=2*Math.PI*Math.random(),p=300-10*d,a=700-l*Math.sin(y);return{x:p,y:a}},g=(l,d)=>{const y=d*(Math.PI/180),p=l[0]+5e3*Math.cos(y),a=l[1]-5e3*Math.sin(y);return[l,[p,a]]},m=[{gender:"male",age:70,label:"average"},{gender:"female",age:75,label:"average"}],r=Array(44).fill(1).map((l,d)=>h(12*d-1,d));let c,v;const u=([[l,d],[y,p]],[[a,k],[M,z]])=>{let b,N,o;return b=(y-l)*(z-k)-(M-a)*(p-d),b===0?null:(o=((z-k)*(M-l)+(a-M)*(z-d))/b,N=((d-p)*(M-l)+(y-l)*(z-d))/b,0<o&&o<1&&0<N&&N<1?[l+(y-l)*o,d+(p-d)*o]:null)};zt(()=>{v=Ct(c);{const o={male:1,female:1,abs:1};e.forEach(w=>{w.still_alive==="alive"&&(w.aliveRank=o[w.gender]++,w.aliveRankAbs=o.abs++)})}const l=te().size([800,800]).cellSize(30).bandwidth(240).thresholds(150).x(({x:o})=>o).y(({y:o})=>o)(r).reverse().map(o=>o.coordinates).flat(2).slice(0,125),d=It().x(o=>o[0]).y(o=>o[1]);v.append("g").attr("class","contours").selectAll("g").data(l.filter((o,w)=>w%5==0)).join("path").attr("class","contour").attr("d",d);const y=[mt(l[0].map(o=>o[0])),mt(l[0].map(o=>o[1]))],p=(o,w=0)=>{const E=g(y,w);for(let R=0;R<o.length-1;R++){const $=[o[R],o[R+1]],j=u(E,$);if(j)return j}return null},a=s.map(o=>({centenarian:o,path:l[Math.floor(o.age)]}));v.append("g").attr("class","person_contours").selectAll("g").data(a).join("g").attr("class",o=>`person_contour ${o.centenarian.still_alive} ${o.centenarian.gender} ${o.centenarian.aliveRank==1?"oldest":""}`).append("path").attr("d",o=>d(o.path));const M=m.map(o=>({grp:o,path:l[Math.floor(o.age)]}));v.selectAll("g.avg_contours").data(M).join("g").attr("class",o=>`avg_contour ${o.grp.gender}`).append("path").attr("d",o=>d(o.path)),xt(v.append("g").attr("class","people_contours_labels").selectAll("g").data(e.filter(o=>!!o.aliveRank)).join("g").attr("transform",o=>{var w;return`translate(${(w=p(l[o.age],70-5*(o.aliveRankAbs??0)))==null?void 0:w.join()})`}),o=>o.aliveRank?`${o.name}`:"");const b=l.filter((o,w)=>w%10==0).map((o,w)=>p(o,80)),N=v.append("g").attr("class","legend").selectAll("g").data(b).join("g").attr("transform",o=>`translate(${o==null?void 0:o.join()})`).style("display",(o,w)=>w?"visible":"none");xt(N,(o,w)=>w*10)});function x(l){Nt[l?"unshift":"push"](()=>{c=l,f(0,c)})}return t.$$set=l=>{"data"in l&&f(1,i=l.data)},[c,i,x]}class ue extends Mt{constructor(n){super(),_t(this,n,ne,ee,yt,{data:1})}}export{ue as default};