import{S as $t,i as Bt,s as Ot,k as Ft,J as C,q as B,l as Wt,m as z,K as L,h as A,r as O,n as x,p as $,b as Dt,H as k,C as ct,o as Ht,w as St}from"../chunks/index.0cb42cb9.js";import"../chunks/transform.f0a34255.js";import{c as Ut}from"../chunks/csv.41e40aac.js";import{s as Vt}from"../chunks/select.84cbef7e.js";import{e as Xt}from"../chunks/extent.4cf1c809.js";import{b as Yt,a as jt}from"../chunks/ticks.39a2651d.js";import{m as bt}from"../chunks/max.adfc8a60.js";import{l as At}from"../chunks/line.16a03edc.js";import{e as Nt}from"../chunks/math.562eee72.js";const qt=Jt(Kt);function Jt(t){return function(e,a,i=a){if(!((a=+a)>=0))throw new RangeError("invalid rx");if(!((i=+i)>=0))throw new RangeError("invalid ry");let{data:n,width:l,height:h}=e;if(!((l=Math.floor(l))>=0))throw new RangeError("invalid width");if(!((h=Math.floor(h!==void 0?h:n.length/l))>=0))throw new RangeError("invalid height");if(!l||!h||!a&&!i)return e;const p=a&&t(a),g=i&&t(i),s=n.slice();return p&&g?(q(p,s,n,l,h),q(p,n,s,l,h),q(p,s,n,l,h),J(g,n,s,l,h),J(g,s,n,l,h),J(g,n,s,l,h)):p?(q(p,n,s,l,h),q(p,s,n,l,h),q(p,n,s,l,h)):g&&(J(g,n,s,l,h),J(g,s,n,l,h),J(g,n,s,l,h)),e}}function q(t,e,a,i,n){for(let l=0,h=i*n;l<h;)t(e,a,l,l+=i,1)}function J(t,e,a,i,n){for(let l=0,h=i*n;l<i;++l)t(e,a,l,l+h,i)}function Kt(t){const e=Math.floor(t);if(e===t)return Gt(t);const a=t-e,i=2*t+1;return(n,l,h,p,g)=>{if(!((p-=g)>=h))return;let s=e*l[h];const c=g*e,m=c+g;for(let _=h,v=h+c;_<v;_+=g)s+=l[Math.min(p,_)];for(let _=h,v=p;_<=v;_+=g)s+=l[Math.min(p,_+c)],n[_]=(s+a*(l[Math.max(h,_-m)]+l[Math.min(p,_+m)]))/i,s-=l[Math.max(h,_-c)]}}function Gt(t){const e=2*t+1;return(a,i,n,l,h)=>{if(!((l-=h)>=n))return;let p=t*i[n];const g=h*t;for(let s=n,c=n+g;s<c;s+=h)p+=i[Math.min(l,s)];for(let s=n,c=l;s<=c;s+=h)p+=i[Math.min(l,s+g)],a[s]=p/e,p-=i[Math.max(n,s-g)]}}function Qt(t,e){let a=0;if(e===void 0)for(let i of t)i!=null&&(i=+i)>=i&&++a;else{let i=-1;for(let n of t)(n=e(n,++i,t))!=null&&(n=+n)>=n&&++a}return a}function Zt(t,e,a){let i;for(;;){const n=Yt(t,e,a);if(n===i||n===0||!isFinite(n))return[t,e];n>0?(t=Math.floor(t/n)*n,e=Math.ceil(e/n)*n):n<0&&(t=Math.ceil(t*n)/n,e=Math.floor(e*n)/n),i=n}}function te(t){return Math.max(1,Math.ceil(Math.log(Qt(t))/Math.LN2)+1)}function zt(t,e){let a=0,i=0;if(e===void 0)for(let n of t)n!=null&&(n=+n)>=n&&(++a,i+=n);else{let n=-1;for(let l of t)(l=e(l,++n,t))!=null&&(l=+l)>=l&&(++a,i+=l)}if(a)return i/a}var ee=Array.prototype,It=ee.slice;function ne(t,e){return t-e}function re(t){for(var e=0,a=t.length,i=t[a-1][1]*t[0][0]-t[a-1][0]*t[0][1];++e<a;)i+=t[e-1][1]*t[e][0]-t[e-1][0]*t[e][1];return i}const H=t=>()=>t;function ae(t,e){for(var a=-1,i=e.length,n;++a<i;)if(n=ie(t,e[a]))return n;return 0}function ie(t,e){for(var a=e[0],i=e[1],n=-1,l=0,h=t.length,p=h-1;l<h;p=l++){var g=t[l],s=g[0],c=g[1],m=t[p],_=m[0],v=m[1];if(oe(g,m,e))return 0;c>i!=v>i&&a<(_-s)*(i-c)/(v-c)+s&&(n=-n)}return n}function oe(t,e,a){var i;return se(t,e,a)&&le(t[i=+(t[0]===e[0])],a[i],e[i])}function se(t,e,a){return(e[0]-t[0])*(a[1]-t[1])===(a[0]-t[0])*(e[1]-t[1])}function le(t,e,a){return t<=e&&e<=a||a<=e&&e<=t}function ce(){}var F=[[],[[[1,1.5],[.5,1]]],[[[1.5,1],[1,1.5]]],[[[1.5,1],[.5,1]]],[[[1,.5],[1.5,1]]],[[[1,1.5],[.5,1]],[[1,.5],[1.5,1]]],[[[1,.5],[1,1.5]]],[[[1,.5],[.5,1]]],[[[.5,1],[1,.5]]],[[[1,1.5],[1,.5]]],[[[.5,1],[1,.5]],[[1.5,1],[1,1.5]]],[[[1.5,1],[1,.5]]],[[[.5,1],[1.5,1]]],[[[1,1.5],[1.5,1]]],[[[.5,1],[1,1.5]]],[]];function Rt(){var t=1,e=1,a=te,i=g;function n(s){var c=a(s);if(Array.isArray(c))c=c.slice().sort(ne);else{const m=Xt(s,fe);for(c=jt(...Zt(m[0],m[1],c),c);c[c.length-1]>=m[1];)c.pop();for(;c[1]<m[0];)c.shift()}return c.map(m=>l(s,m))}function l(s,c){const m=c==null?NaN:+c;if(isNaN(m))throw new Error(`invalid value: ${c}`);var _=[],v=[];return h(s,m,function(f){i(f,s,m),re(f)>0?_.push([f]):v.push(f)}),v.forEach(function(f){for(var d=0,E=_.length,y;d<E;++d)if(ae((y=_[d])[0],f)!==-1){y.push(f);return}}),{type:"MultiPolygon",value:c,coordinates:_}}function h(s,c,m){var _=new Array,v=new Array,f,d,E,y,o,M;for(f=d=-1,y=S(s[0],c),F[y<<1].forEach(w);++f<t-1;)E=y,y=S(s[f+1],c),F[E|y<<1].forEach(w);for(F[y<<0].forEach(w);++d<e-1;){for(f=-1,y=S(s[d*t+t],c),o=S(s[d*t],c),F[y<<1|o<<2].forEach(w);++f<t-1;)E=y,y=S(s[d*t+t+f+1],c),M=o,o=S(s[d*t+f+1],c),F[E|y<<1|o<<2|M<<3].forEach(w);F[y|o<<3].forEach(w)}for(f=-1,o=s[d*t]>=c,F[o<<2].forEach(w);++f<t-1;)M=o,o=S(s[d*t+f+1],c),F[o<<2|M<<3].forEach(w);F[o<<3].forEach(w);function w(j){var R=[j[0][0]+f,j[0][1]+d],b=[j[1][0]+f,j[1][1]+d],N=p(R),r=p(b),u,P;(u=v[N])?(P=_[r])?(delete v[u.end],delete _[P.start],u===P?(u.ring.push(b),m(u.ring)):_[u.start]=v[P.end]={start:u.start,end:P.end,ring:u.ring.concat(P.ring)}):(delete v[u.end],u.ring.push(b),v[u.end=r]=u):(u=_[r])?(P=v[N])?(delete _[u.start],delete v[P.end],u===P?(u.ring.push(b),m(u.ring)):_[P.start]=v[u.end]={start:P.start,end:u.end,ring:P.ring.concat(u.ring)}):(delete _[u.start],u.ring.unshift(R),_[u.start=N]=u):_[N]=v[r]={start:N,end:r,ring:[R,b]}}}function p(s){return s[0]*2+s[1]*(t+1)*4}function g(s,c,m){s.forEach(function(_){var v=_[0],f=_[1],d=v|0,E=f|0,y=ft(c[E*t+d]);v>0&&v<t&&d===v&&(_[0]=Pt(v,ft(c[E*t+d-1]),y,m)),f>0&&f<e&&E===f&&(_[1]=Pt(f,ft(c[(E-1)*t+d]),y,m))})}return n.contour=l,n.size=function(s){if(!arguments.length)return[t,e];var c=Math.floor(s[0]),m=Math.floor(s[1]);if(!(c>=0&&m>=0))throw new Error("invalid size");return t=c,e=m,n},n.thresholds=function(s){return arguments.length?(a=typeof s=="function"?s:Array.isArray(s)?H(It.call(s)):H(s),n):a},n.smooth=function(s){return arguments.length?(i=s?g:ce,n):i===g},n}function fe(t){return isFinite(t)?t:NaN}function S(t,e){return t==null?!1:+t>=e}function ft(t){return t==null||isNaN(t=+t)?-1/0:t}function Pt(t,e,a,i){const n=i-e,l=a-e,h=isFinite(n)||isFinite(l)?n/l:Math.sign(n)/Math.sign(l);return isNaN(h)?t:t+h-.5}function he(t){return t[0]}function ue(t){return t[1]}function _e(){return 1}function de(){var t=he,e=ue,a=_e,i=960,n=500,l=20,h=2,p=l*3,g=i+p*2>>h,s=n+p*2>>h,c=H(20);function m(o){var M=new Float32Array(g*s),w=Math.pow(2,-h),j=-1;for(const T of o){var R=(t(T,++j,o)+p)*w,b=(e(T,j,o)+p)*w,N=+a(T,j,o);if(N&&R>=0&&R<g&&b>=0&&b<s){var r=Math.floor(R),u=Math.floor(b),P=R-r-.5,I=b-u-.5;M[r+u*g]+=(1-P)*(1-I)*N,M[r+1+u*g]+=P*(1-I)*N,M[r+1+(u+1)*g]+=P*I*N,M[r+(u+1)*g]+=(1-P)*I*N}}return qt({data:M,width:g,height:s},l*w),M}function _(o){var M=m(o),w=c(M),j=Math.pow(2,2*h);return Array.isArray(w)||(w=jt(Number.MIN_VALUE,bt(M)/j,w)),Rt().size([g,s]).thresholds(w.map(R=>R*j))(M).map((R,b)=>(R.value=+w[b],v(R)))}_.contours=function(o){var M=m(o),w=Rt().size([g,s]),j=Math.pow(2,2*h),R=b=>{b=+b;var N=v(w.contour(M,b*j));return N.value=b,N};return Object.defineProperty(R,"max",{get:()=>bt(M)/j}),R};function v(o){return o.coordinates.forEach(f),o}function f(o){o.forEach(d)}function d(o){o.forEach(E)}function E(o){o[0]=o[0]*Math.pow(2,h)-p,o[1]=o[1]*Math.pow(2,h)-p}function y(){return p=l*3,g=i+p*2>>h,s=n+p*2>>h,_}return _.x=function(o){return arguments.length?(t=typeof o=="function"?o:H(+o),_):t},_.y=function(o){return arguments.length?(e=typeof o=="function"?o:H(+o),_):e},_.weight=function(o){return arguments.length?(a=typeof o=="function"?o:H(+o),_):a},_.size=function(o){if(!arguments.length)return[i,n];var M=+o[0],w=+o[1];if(!(M>=0&&w>=0))throw new Error("invalid size");return i=M,n=w,y()},_.cellSize=function(o){if(!arguments.length)return 1<<h;if(!((o=+o)>=1))throw new Error("invalid cell size");return h=Math.floor(Math.log(o)/Math.LN2),y()},_.thresholds=function(o){return arguments.length?(c=typeof o=="function"?o:Array.isArray(o)?H(It.call(o)):H(o),_):c},_.bandwidth=function(o){if(!arguments.length)return Math.sqrt(l*(l+1));if(!((o=+o)>=0))throw new Error("invalid bandwidth");return l=(Math.sqrt(4*o*o+1)-1)/2,y()},_}function Ct(t,e,a){t._context.bezierCurveTo(t._x1+t._k*(t._x2-t._x0),t._y1+t._k*(t._y2-t._y0),t._x2+t._k*(t._x1-e),t._y2+t._k*(t._y1-a),t._x2,t._y2)}function ht(t,e){this._context=t,this._k=(1-e)/6}ht.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:Ct(this,this._x1,this._y1);break}(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break;case 1:this._point=2,this._x1=t,this._y1=e;break;case 2:this._point=3;default:Ct(this,t,e);break}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=e}};(function t(e){function a(i){return new ht(i,e)}return a.tension=function(i){return t(+i)},a})(0);function ge(t,e,a){var i=t._x1,n=t._y1,l=t._x2,h=t._y2;if(t._l01_a>Nt){var p=2*t._l01_2a+3*t._l01_a*t._l12_a+t._l12_2a,g=3*t._l01_a*(t._l01_a+t._l12_a);i=(i*p-t._x0*t._l12_2a+t._x2*t._l01_2a)/g,n=(n*p-t._y0*t._l12_2a+t._y2*t._l01_2a)/g}if(t._l23_a>Nt){var s=2*t._l23_2a+3*t._l23_a*t._l12_a+t._l12_2a,c=3*t._l23_a*(t._l23_a+t._l12_a);l=(l*s+t._x1*t._l23_2a-e*t._l12_2a)/c,h=(h*s+t._y1*t._l23_2a-a*t._l12_2a)/c}t._context.bezierCurveTo(i,n,l,h,t._x2,t._y2)}function Tt(t,e){this._context=t,this._alpha=e}Tt.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:this.point(this._x2,this._y2);break}(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){if(t=+t,e=+e,this._point){var a=this._x2-t,i=this._y2-e;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(a*a+i*i,this._alpha))}switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break;case 1:this._point=2;break;case 2:this._point=3;default:ge(this,t,e);break}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=e}};const pe=function t(e){function a(i){return e?new Tt(i,e):new ht(i,0)}return a.alpha=function(i){return t(+i)},a}(.5);function me(t){let e,a,i,n,l,h,p,g,s,c,m,_,v,f,d,E,y,o,M,w,j,R,b,N,r,u,P,I,T,U,W,V,K,nt,D,X,G,rt;return{c(){e=Ft("section"),a=C("svg"),i=C("defs"),n=C("marker"),l=C("path"),h=C("g"),p=C("text"),g=C("textPath"),s=B("alive people by rank"),c=C("g"),m=C("text"),_=B("Oldest living people"),v=C("text"),f=B("Verified list of the oldest people"),d=C("text"),E=C("a"),y=B("datasource: wikipedia"),o=C("g"),M=C("g"),w=C("path"),j=C("text"),R=B("male"),b=C("g"),N=C("path"),r=C("text"),u=B("female "),P=C("g"),I=C("path"),T=C("text"),U=B("alive"),W=C("g"),V=C("path"),K=C("text"),nt=B("deceased"),D=C("g"),X=C("path"),G=C("text"),rt=B("world average"),this.h()},l(Q){e=Wt(Q,"SECTION",{});var et=z(e);a=L(et,"svg",{viewBox:!0,"xmlns:xlink":!0,class:!0});var Z=z(a);i=L(Z,"defs",{});var ut=z(i);n=L(ut,"marker",{id:!0,viewBox:!0,refX:!0,refY:!0,markerUnits:!0,markerWidth:!0,markerHeight:!0,orient:!0});var _t=z(n);l=L(_t,"path",{d:!0,style:!0}),z(l).forEach(A),_t.forEach(A),ut.forEach(A),h=L(Z,"g",{}),z(h).forEach(A),p=L(Z,"text",{style:!0});var dt=z(p);g=L(dt,"textPath",{href:!0,startOffset:!0,"text-anchor":!0});var gt=z(g);s=O(gt,"alive people by rank"),gt.forEach(A),dt.forEach(A),c=L(Z,"g",{class:!0,transform:!0});var tt=z(c);m=L(tt,"text",{x:!0,y:!0,style:!0});var pt=z(m);_=O(pt,"Oldest living people"),pt.forEach(A),v=L(tt,"text",{x:!0,y:!0,style:!0});var mt=z(v);f=O(mt,"Verified list of the oldest people"),mt.forEach(A),d=L(tt,"text",{x:!0,y:!0,style:!0});var xt=z(d);E=L(xt,"a",{href:!0});var vt=z(E);y=O(vt,"datasource: wikipedia"),vt.forEach(A),xt.forEach(A),o=L(tt,"g",{transform:!0});var Y=z(o);M=L(Y,"g",{class:!0,transform:!0});var at=z(M);w=L(at,"path",{d:!0,class:!0}),z(w).forEach(A),j=L(at,"text",{});var yt=z(j);R=O(yt,"male"),yt.forEach(A),at.forEach(A),b=L(Y,"g",{class:!0,transform:!0});var it=z(b);N=L(it,"path",{d:!0,class:!0}),z(N).forEach(A),r=L(it,"text",{});var wt=z(r);u=O(wt,"female "),wt.forEach(A),it.forEach(A),P=L(Y,"g",{class:!0,transform:!0});var ot=z(P);I=L(ot,"path",{d:!0,class:!0}),z(I).forEach(A),T=L(ot,"text",{});var kt=z(T);U=O(kt,"alive"),kt.forEach(A),ot.forEach(A),W=L(Y,"g",{class:!0,transform:!0});var st=z(W);V=L(st,"path",{d:!0,class:!0}),z(V).forEach(A),K=L(st,"text",{});var Et=z(K);nt=O(Et,"deceased"),Et.forEach(A),st.forEach(A),D=L(Y,"g",{class:!0,transform:!0});var lt=z(D);X=L(lt,"path",{d:!0,class:!0}),z(X).forEach(A),G=L(lt,"text",{});var Mt=z(G);rt=O(Mt,"world average"),Mt.forEach(A),lt.forEach(A),Y.forEach(A),tt.forEach(A),Z.forEach(A),et.forEach(A),this.h()},h(){x(l,"d","M 0 0 L 10 5 L 0 10 z"),$(l,"fill","currentColor"),$(l,"fill-opacity","0.5"),x(n,"id","triangleMarker"),x(n,"viewBox","0 0 10 10"),x(n,"refX","1"),x(n,"refY","5"),x(n,"markerUnits","strokeWidth"),x(n,"markerWidth","10"),x(n,"markerHeight","10"),x(n,"orient","auto"),x(g,"href","#people_contours_rank2"),x(g,"startOffset","50%"),x(g,"text-anchor","middle"),$(p,"font-size","0.7em"),$(p,"opacity","0.5"),x(m,"x","70"),x(m,"y","0"),$(m,"font-size","3em"),$(m,"text-anchor","end"),x(v,"x","70"),x(v,"y","50"),$(v,"font-size",".9em"),$(v,"text-anchor","end"),x(E,"href","https://en.wikipedia.org/wiki/List_of_verified_oldest_people"),x(d,"x","70"),x(d,"y","100"),$(d,"font-size",".8em"),$(d,"text-anchor","end"),x(w,"d","M0,0 h27"),x(w,"class","person_contour alive"),x(M,"class","male alive"),x(M,"transform","translate(0, 120)"),x(N,"d","M0,0 h27"),x(N,"class","person_contour alive"),x(b,"class","female alive"),x(b,"transform","translate(0, 140)"),x(I,"d","M0,0 h27"),x(I,"class","person_contour alive"),x(P,"class","alive"),x(P,"transform","translate(0, 180)"),x(V,"d","M0,0 h27"),x(V,"class","person_contour deceased"),x(W,"class",""),x(W,"transform","translate(0, 200)"),x(X,"d","M0,0 h27"),x(X,"class","average"),x(D,"class","avg_contour"),x(D,"transform","translate(0, 240)"),x(o,"transform","translate(-10, 20)"),x(c,"class","side_legend"),x(c,"transform","translate(680, 50)"),x(a,"viewBox","0 0 800 800"),x(a,"xmlns:xlink","http://www.w3.org/1999/xlink"),x(a,"class","svelte-r8noo6")},m(Q,et){Dt(Q,e,et),k(e,a),k(a,i),k(i,n),k(n,l),k(a,h),t[2](h),k(a,p),k(p,g),k(g,s),k(a,c),k(c,m),k(m,_),k(c,v),k(v,f),k(c,d),k(d,E),k(E,y),k(c,o),k(o,M),k(M,w),k(M,j),k(j,R),k(o,b),k(b,N),k(b,r),k(r,u),k(o,P),k(P,I),k(P,T),k(T,U),k(o,W),k(W,V),k(W,K),k(K,nt),k(o,D),k(D,X),k(D,G),k(G,rt)},p:ct,i:ct,o:ct,d(Q){Q&&A(e),t[2](null)}}}function Lt(t,e,a=7){t.append("text").attr("class","label").attr("transform",`translate(${a},0)`).text(e),t.append("circle").attr("r",2),a>15&&t.append("path").attr("class","label__line").attr("d",`M0,0 h${a-5}`)}function xe(t,e,a){let{data:i}=e;const n=Ut(i.centenarians).map(f=>({...f,age:Math.floor(f.age)})),l=n.reduce((f,d)=>f.find(E=>E.age==d.age&&E.gender==d.gender&&E.still_alive==d.still_alive)?f:[...f,d],[]),h=(f,d)=>{const E=2*Math.PI*Math.random(),y=250-10*d,o=700-f*Math.sin(E);return{x:y,y:o}},p=(f,d)=>{const E=d*(Math.PI/180),y=f[0]+5e3*Math.cos(E),o=f[1]-5e3*Math.sin(E);return[f,[y,o]]},g=[{gender:"male",age:70,label:"average"},{gender:"female",age:75,label:"average"}],s=Array(44).fill(1).map((f,d)=>h(12*d-1,d));let c,m;const _=([[f,d],[E,y]],[[o,M],[w,j]])=>{let R,b,N;return R=(E-f)*(j-M)-(w-o)*(y-d),R===0?null:(N=((j-M)*(w-f)+(o-w)*(j-d))/R,b=((d-y)*(w-f)+(E-f)*(j-d))/R,0<N&&N<1&&0<b&&b<1?[f+(E-f)*N,d+(y-d)*N]:null)};Ht(()=>{m=Vt(c);{const r={male:1,female:1,abs:1};n.forEach(u=>{u.still_alive==="alive"&&(u.aliveRank=r[u.gender]++,u.aliveRankAbs=r.abs++)})}const f=de().size([800,800]).cellSize(30).bandwidth(240).thresholds(150).x(({x:r})=>r).y(({y:r})=>r)(s).reverse().map(r=>r.coordinates).flat(2).slice(0,160).map(r=>[...r]),d=At().curve(pe).x(r=>r[0]).y(r=>r[1]);m.append("g").attr("class","contours").selectAll("g").data(f.filter((r,u)=>u%5==0&&u<121)).join("path").attr("class","contour").attr("d",d);const E=[zt(f[0].map(r=>r[0])),zt(f[0].map(r=>r[1]))],y=(r,u=0)=>{const P=p(E,u);for(let I=0;I<r.length-1;I++){const T=[r[I],r[I+1]],U=_(P,T);if(U)return U}return null},o=l.map(r=>({centenarian:r,path:f[Math.floor(r.age)]}));m.append("g").attr("class","person_contours").selectAll("g").data(o).join("g").attr("class",r=>`person_contour ${r.centenarian.still_alive} ${r.centenarian.gender} ${r.centenarian.aliveRank==1?"oldest":""}`).append("path").attr("d",r=>d(r.path));const w=g.map(r=>({grp:r,path:f[Math.floor(r.age)]}));m.selectAll("g.avg_contours").data(w).join("g").attr("class",r=>`avg_contour ${r.grp.gender}`).append("path").attr("d",r=>d(r.path)),Lt(m.append("g").attr("class","people_contours_labels").selectAll("g").data(n.filter(r=>!!r.aliveRank)).join("g").attr("class",r=>r.gender).attr("transform",r=>{var u;return`translate(${(u=y(f[r.age],70-5*(r.aliveRankAbs??0)))==null?void 0:u.join()})`}),r=>r.aliveRank?`${r.name}`:"",12);const R=At().x(r=>r[0]).y(r=>r[1]);m.selectAll("path#people_contours_rank").data([n.filter(r=>!!r.aliveRank)]).join("path").attr("id","people_contours_rank").style("marker-end","url(#triangleMarker)").attr("stroke","red").attr("d",r=>R(r.map(u=>y(f[130+1],55-(u.aliveRankAbs??0))))),m.selectAll("defs").data([n.filter(r=>!!r.aliveRank)]).join("path").attr("id","people_contours_rank2").attr("display","none").attr("d",r=>R(r.map(u=>y(f[131+1],55-(u.aliveRankAbs??0)))));const b=f.filter((r,u)=>u%10==0&&u<130).map((r,u)=>y(r,80)),N=m.append("g").attr("class","legend").selectAll("g").data(b).join("g").attr("transform",r=>`translate(${r==null?void 0:r.join()})`).style("display",(r,u)=>u?"visible":"none");Lt(N,(r,u)=>u*10)});function v(f){St[f?"unshift":"push"](()=>{c=f,a(0,c)})}return t.$$set=f=>{"data"in f&&a(1,i=f.data)},[c,i,v]}class ze extends $t{constructor(e){super(),Bt(this,e,xe,me,Ot,{data:1})}}export{ze as default};
