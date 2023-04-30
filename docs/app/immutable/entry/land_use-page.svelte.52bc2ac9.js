import{S as Ht,i as Ut,s as Ot,J as l,K as s,m as a,h as r,b as vt,H as U,o as pe,w as Xt,q,r as A,n as t,p as E,G as e,a as xt,c as mt,L as Ne,k as B,y as Kt,P as Je,l as G,z as Rt,A as Nt,g as Jt,d as Wt,B as Qt}from"../chunks/index.b63d9627.js";import"../chunks/transform.f0a34255.js";import{c as he}from"../chunks/dsv.6b9e725e.js";import{a as ce,b as $t}from"../chunks/axis.a25b44c4.js";import{s as Vt}from"../chunks/select.84cbef7e.js";import{d as Zt}from"../chunks/linear.7225fd06.js";import{l as je}from"../chunks/line.16a03edc.js";import{v as We}from"../chunks/viridis.ba9a4a08.js";const de=""+new URL("../assets/land_use.d88e485e.csv",import.meta.url).href,Ke=["population","built","builtPC","cropland","croplandPC","grazing","grazingPC","arableLand","populationDensity","fertilizer","fertilizerPC"],ue={year:"Year",population:"World Population",built:"Built-up Area (HYDE (2017))",builtPC:"Build-up area per Capita",cropland:"Cropland (HYDE (2017))",croplandPC:"Cropland per Capita",grazing:"Grazing (HYDE (2017))",grazingPC:"Grazing per Capita",arableLand:"able land needed to produce a fixed quantity of crops",populationDensity:"Humans Density/km2",fertilizer:"All fertilizers used",fertilizerPA:"All fertilizers use per area of cropland",fertilizerPC:"Fertilizer used per Capita[t]"},Re={year:"Year",population:"count",built:"km²",builtPC:"km²",cropland:"km²",croplandPC:"km²",grazing:"km²",grazingPC:"km²",arableLand:"km²",populationDensity:"people / km²",fertilizer:"ton",fertilizerPA:"ton",fertilizerPC:"ton"};function Qe(P){let i;return{c(){i=l("g")},l(_){i=s(_,"g",{}),a(i).forEach(r)},m(_,n){vt(_,i,n),P[1](i)},p:U,i:U,o:U,d(_){_&&r(i),P[1](null)}}}function Xe(P,i,_){let n={top:0,right:0,bottom:10,left:25},u=540-n.left-n.right,x=380-n.top-n.bottom,m,v,d,f,o,g;const c=()=>{v=Vt(m).attr("width",u+n.left+n.right).attr("height",x+n.top+n.bottom).append("g").attr("transform","translate("+n.left+","+n.top+")"),o=Zt().range([0,u]),d=v.append("g").attr("transform","translate(0,"+x+")").call(ce(o).tickFormat(h=>`${h}`)),g=Zt().domain([0,100]).range([x,0]),f=v.append("g").call($t(g).tickFormat(h=>`${h}%`)).attr("class","yScale"),f.append("g").call($t(g).tickSize(-u).tickFormat(h=>"")).style("opacity",".1")},y=h=>je().x(p=>o(p[0])).y(p=>g(100*p[1]/h)),k=(h,p)=>{const b=Zt().domain([0,p.max]).range([x,0]).nice(2),w=h.append("g").call($t(b)).attr("class",`yScale ${p.key}`).style("opacity","0"),C=h.append("g").selectAll(".line").data([p.values]).join("g");w.append("text").text(Re[p.key]).attr("text-anchor","end").attr("x",0).attr("y",-15),w.append("g").call($t(b).tickSize(-u).tickFormat(S=>"")).style("opacity",".1"),C.append("path").attr("d",y(p.today)).attr("id",p.key).attr("class",`plotline ${p.key}`);const $=C.append("path").attr("d",y(p.today)).attr("class",`plotline selector ${p.key}`).style("opacity","0").style("stroke-width","10px").on("mouseover",()=>{w.style("opacity","1"),f.style("opacity","0"),$.style("opacity",".2")}).on("mouseout",()=>{w.style("opacity","0"),f.style("opacity","1"),$.style("opacity","0")})},L=h=>{Object.keys(h).filter(p=>!p.includes("PC")&&p!="populationDensity").forEach(p=>{k(v,h[p])})};pe(()=>{he(de).then(h=>{var b,w;const p={};h.forEach(C=>{Ke.forEach($=>{var Y;const S=ue[$],z=!!C[S]&&parseFloat(C[S]),F=+((C==null?void 0:C.Year)??0);z&&(p[$]?((Y=p[$].values)==null||Y.push([F,z]),p[$].max=Math.max(z,p[$].max),p[$].today=z):p[$]={key:$,values:[[F,z]],max:z,today:z})})}),c(),o.domain([+(((b=h[0])==null?void 0:b.Year)??0),+(((w=h[h.length-1])==null?void 0:w.Year)??0)]),d.call(ce(o).tickFormat(C=>`${C}`)),L(p)})});function M(h){Xt[h?"unshift":"push"](()=>{m=h,_(0,m)})}return[m,M]}class tr extends Ht{constructor(i){super(),Ut(this,i,Xe,Qe,Ot,{})}}function er(P){let i;return{c(){i=l("g")},l(_){i=s(_,"g",{}),a(i).forEach(r)},m(_,n){vt(_,i,n),P[1](i)},p:U,i:U,o:U,d(_){_&&r(i),P[1](null)}}}function rr(P,i,_){let n={top:0,right:0,bottom:10,left:25},u=540-n.left-n.right,x=380-n.top-n.bottom,m,v,d,f,o,g;const c=()=>{v=Vt(m).attr("width",u+n.left+n.right).attr("height",x+n.top+n.bottom).append("g").attr("transform","translate("+n.left+","+n.top+")"),o=Zt().range([0,u]),d=v.append("g").attr("transform","translate(0,"+x+")").call(ce(o).tickFormat(h=>`${h}`)),g=Zt().domain([0,280]).range([x,0]),f=v.append("g").call($t(g).tickFormat(h=>`${h}%`)).attr("class","yScale"),f.append("g").call($t(g).tickSize(-u).tickFormat(h=>"")).style("opacity",".1")},y=h=>je().x(p=>o(p[0])).y(p=>g(100*p[1]/h)),k=(h,p)=>{const b=Zt().domain([0,p.max]).range([x,0]).nice(2),w=h.append("g").call($t(b)).attr("class",`yScale ${p.key}`).style("opacity","0"),C=h.append("g").selectAll(".line").data([p.values]).join("g");w.append("text").text(Re[p.key]).attr("text-anchor","end").attr("x",0).attr("y",-15),w.append("g").call($t(b).tickSize(-u).tickFormat(S=>"")).style("opacity",".1"),C.append("path").attr("d",y(p.today)).attr("id",p.key).attr("class",`plotline ${p.key}`);const $=C.append("path").attr("d",y(p.today)).attr("class",`plotline selector ${p.key}`).style("opacity","0").style("stroke-width","10px").on("mouseover",()=>{w.style("opacity","1"),f.style("opacity","0"),$.style("opacity",".2")}).on("mouseout",()=>{w.style("opacity","0"),f.style("opacity","1"),$.style("opacity","0")})},L=h=>{Object.keys(h).filter(p=>p.includes("PC")&&p!="populationDensity").forEach(p=>{k(v,h[p])})};pe(()=>{he(de).then(h=>{var b,w;const p={};h.forEach(C=>{Ke.forEach($=>{var Y;const S=ue[$],z=!!C[S]&&parseFloat(C[S]),F=+((C==null?void 0:C.Year)??0);z&&(p[$]?((Y=p[$].values)==null||Y.push([F,z]),p[$].max=Math.max(z,p[$].max),p[$].today=z):p[$]={key:$,values:[[F,z]],max:z,today:z})})}),c(),o.domain([+(((b=h[0])==null?void 0:b.Year)??0),+(((w=h[h.length-1])==null?void 0:w.Year)??0)]),d.call(ce(o).tickFormat(C=>`${C}`)),L(p)})});function M(h){Xt[h?"unshift":"push"](()=>{m=h,_(0,m)})}return[m,M]}class ar extends Ht{constructor(i){super(),Ut(this,i,rr,er,Ot,{})}}function lr(P){let i,_,n,u,x,m,v,d,f,o,g,c,y,k,L,M,h,p,b,w,C,$,S,z,F,Y,V,it,D,T,R,N,bt,yt,J,tt,ct,I,W,rt,pt,O,j,Mt,nt,Z,et,qt,K,at,Q,At,Et,lt,X,ht,Ft,dt,H,st,ut,Yt,_t,Lt,ft,ot,Dt,zt,fe,ge,kt,It,Pt,Bt,Ct,xe,Gt,wt,me;return{c(){i=l("g"),_=l("g"),n=l("g"),u=l("g"),x=l("path"),m=l("text"),v=q("Cropland (km²)"),d=l("path"),f=l("g"),o=l("path"),g=l("text"),c=q("Grazing land (km²)"),y=l("g"),k=l("path"),L=l("text"),M=q("Build-up area (km²)"),h=l("path"),p=l("g"),b=l("path"),w=l("text"),C=q("Fertilizer used (t)"),$=l("path"),S=l("g"),z=l("g"),F=l("text"),Y=q("T"),V=l("tspan"),it=q("od"),D=q("ay"),T=l("text"),R=q("(per"),N=l("tspan"),bt=q("c"),yt=q("apita)"),J=l("g"),tt=l("path"),ct=l("path"),I=l("g"),W=l("path"),rt=l("g"),pt=l("path"),O=l("path"),j=l("text"),Mt=q("Fertilizer used (t)"),nt=l("g"),Z=l("path"),et=l("text"),qt=q("Build-up area (km²)"),K=l("g"),at=l("path"),Q=l("text"),At=q("Population"),Et=l("path"),lt=l("g"),X=l("path"),ht=l("text"),Ft=q("Cropland (km²)"),dt=l("path"),H=l("g"),st=l("path"),ut=l("text"),Yt=q("Grazing land (km²)"),_t=l("path"),Lt=l("path"),ft=l("g"),ot=l("text"),Dt=q("T"),zt=l("tspan"),fe=q("od"),ge=q("ay"),kt=l("path"),It=l("path"),Pt=l("g"),Bt=l("g"),Ct=l("text"),xe=q(`Altough global population and land usage is rising - it's not that closely tied to population size
                anymore.`),Gt=l("g"),wt=l("text"),me=q("There is currently cca 50 people per square kilometer of land."),this.h()},l(jt){i=s(jt,"g",{});var Tt=a(i);_=s(Tt,"g",{id:!0});var $e=a(_);n=s($e,"g",{});var St=a(n);u=s(St,"g",{});var te=a(u);x=s(te,"path",{d:!0,style:!0,class:!0}),a(x).forEach(r),m=s(te,"text",{x:!0,y:!0});var be=a(m);v=A(be,"Cropland (km²)"),be.forEach(r),d=s(te,"path",{d:!0,class:!0}),a(d).forEach(r),te.forEach(r),f=s(St,"g",{});var ve=a(f);o=s(ve,"path",{d:!0,style:!0,class:!0}),a(o).forEach(r),g=s(ve,"text",{x:!0,y:!0});var Me=a(g);c=A(Me,"Grazing land (km²)"),Me.forEach(r),ve.forEach(r),y=s(St,"g",{});var ye=a(y);k=s(ye,"path",{d:!0,style:!0,class:!0}),a(k).forEach(r),L=s(ye,"text",{x:!0,y:!0});var ze=a(L);M=A(ze,"Build-up area (km²)"),ze.forEach(r),ye.forEach(r),h=s(St,"path",{d:!0,class:!0}),a(h).forEach(r),p=s(St,"g",{transform:!0});var ee=a(p);b=s(ee,"path",{d:!0,style:!0,class:!0}),a(b).forEach(r),w=s(ee,"text",{x:!0,y:!0});var Pe=a(w);C=A(Pe,"Fertilizer used (t)"),Pe.forEach(r),$=s(ee,"path",{d:!0,class:!0}),a($).forEach(r),ee.forEach(r),S=s(St,"g",{});var Ee=a(S);z=s(Ee,"g",{transform:!0});var _e=a(z);F=s(_e,"text",{x:!0,y:!0});var re=a(F);Y=A(re,"T"),V=s(re,"tspan",{x:!0,y:!0});var Se=a(V);it=A(Se,"od"),Se.forEach(r),D=A(re,"ay"),re.forEach(r),T=s(_e,"text",{x:!0,y:!0});var ae=a(T);R=A(ae,"(per"),N=s(ae,"tspan",{x:!0,y:!0});var Ze=a(N);bt=A(Ze,"c"),Ze.forEach(r),yt=A(ae,"apita)"),ae.forEach(r),_e.forEach(r),J=s(Ee,"g",{});var Le=a(J);tt=s(Le,"path",{d:!0,style:!0,class:!0}),a(tt).forEach(r),ct=s(Le,"path",{d:!0,class:!0}),a(ct).forEach(r),Le.forEach(r),Ee.forEach(r),St.forEach(r),$e.forEach(r),I=s(Tt,"g",{id:!0});var gt=a(I);W=s(gt,"path",{d:!0,class:!0}),a(W).forEach(r),rt=s(gt,"g",{transform:!0});var le=a(rt);pt=s(le,"path",{d:!0,class:!0}),a(pt).forEach(r),O=s(le,"path",{d:!0,style:!0,class:!0}),a(O).forEach(r),j=s(le,"text",{x:!0,y:!0});var qe=a(j);Mt=A(qe,"Fertilizer used (t)"),qe.forEach(r),le.forEach(r),nt=s(gt,"g",{});var ke=a(nt);Z=s(ke,"path",{d:!0,style:!0,class:!0}),a(Z).forEach(r),et=s(ke,"text",{x:!0,y:!0});var Ae=a(et);qt=A(Ae,"Build-up area (km²)"),Ae.forEach(r),ke.forEach(r),K=s(gt,"g",{});var Ce=a(K);at=s(Ce,"path",{d:!0,style:!0,class:!0}),a(at).forEach(r),Q=s(Ce,"text",{x:!0,y:!0});var Fe=a(Q);At=A(Fe,"Population"),Fe.forEach(r),Ce.forEach(r),Et=s(gt,"path",{d:!0,class:!0}),a(Et).forEach(r),lt=s(gt,"g",{});var se=a(lt);X=s(se,"path",{d:!0,style:!0,class:!0}),a(X).forEach(r),ht=s(se,"text",{x:!0,y:!0});var Ye=a(ht);Ft=A(Ye,"Cropland (km²)"),Ye.forEach(r),dt=s(se,"path",{d:!0,class:!0}),a(dt).forEach(r),se.forEach(r),H=s(gt,"g",{transform:!0});var oe=a(H);st=s(oe,"path",{d:!0,style:!0,class:!0}),a(st).forEach(r),ut=s(oe,"text",{x:!0,y:!0});var De=a(ut);Yt=A(De,"Grazing land (km²)"),De.forEach(r),_t=s(oe,"path",{d:!0,class:!0}),a(_t).forEach(r),oe.forEach(r),Lt=s(gt,"path",{d:!0,class:!0}),a(Lt).forEach(r),ft=s(gt,"g",{});var ne=a(ft);ot=s(ne,"text",{x:!0,y:!0});var ie=a(ot);Dt=A(ie,"T"),zt=s(ie,"tspan",{x:!0,y:!0});var Ie=a(zt);fe=A(Ie,"od"),Ie.forEach(r),ge=A(ie,"ay"),ie.forEach(r),kt=s(ne,"path",{d:!0,style:!0,class:!0}),a(kt).forEach(r),It=s(ne,"path",{d:!0,class:!0}),a(It).forEach(r),ne.forEach(r),gt.forEach(r),Pt=s(Tt,"g",{transform:!0});var we=a(Pt);Bt=s(we,"g",{transform:!0});var Be=a(Bt);Ct=s(Be,"text",{x:!0,y:!0,style:!0});var Ge=a(Ct);xe=A(Ge,`Altough global population and land usage is rising - it's not that closely tied to population size
                anymore.`),Ge.forEach(r),Be.forEach(r),Gt=s(we,"g",{transform:!0});var Te=a(Gt);wt=s(Te,"text",{x:!0,y:!0,style:!0});var Ve=a(wt);me=A(Ve,"There is currently cca 50 people per square kilometer of land."),Ve.forEach(r),Te.forEach(r),we.forEach(r),Tt.forEach(r),this.h()},h(){t(x,"d","M964.758,191.093C964.758,188.877 962.959,187.078 960.743,187.078L889.061,187.078C886.845,187.078 885.046,188.877 885.046,191.093L885.046,199.123C885.046,201.339 886.845,203.138 889.061,203.138L960.743,203.138C962.959,203.138 964.758,201.339 964.758,199.123L964.758,191.093Z"),E(x,"fill","none"),E(x,"stroke","black"),E(x,"stroke-width","1px"),t(x,"class","svelte-1fxlv99"),t(m,"x","887.88px"),t(m,"y","198.435px"),t(d,"d","M916.526,184.753L933.279,184.753L925.391,175.93L916.526,184.753Z"),t(d,"class","svelte-1fxlv99"),t(o,"d","M1073.07,126.434C1073.07,124.218 1071.27,122.419 1069.05,122.419L977.852,122.419C975.636,122.419 973.837,124.218 973.837,126.434L973.837,134.464C973.837,136.68 975.636,138.479 977.852,138.479L1069.05,138.479C1071.27,138.479 1073.07,136.68 1073.07,134.464L1073.07,126.434Z"),E(o,"fill","none"),E(o,"stroke","black"),E(o,"stroke-width","1px"),t(o,"class","svelte-1fxlv99"),t(g,"x","977.605px"),t(g,"y","133.776px"),t(k,"d","M905.246,408.967C905.246,406.751 903.447,404.952 901.231,404.952L806.645,404.952C804.429,404.952 802.63,406.751 802.63,408.967L802.63,416.997C802.63,419.213 804.429,421.012 806.645,421.012L901.231,421.012C903.447,421.012 905.246,419.213 905.246,416.997L905.246,408.967Z"),E(k,"fill","none"),E(k,"stroke","black"),E(k,"stroke-width","1px"),t(k,"class","svelte-1fxlv99"),t(L,"x","806.542px"),t(L,"y","416.285px"),t(h,"d","M861.778,423.344L845.025,423.344L852.913,432.167L861.778,423.344Z"),t(h,"class","svelte-1fxlv99"),t(b,"d","M1267.52,395.817C1267.52,393.601 1265.72,391.802 1263.51,391.802L1180.8,391.802C1178.58,391.802 1176.78,393.601 1176.78,395.817L1176.78,403.847C1176.78,406.063 1178.58,407.862 1180.8,407.862L1263.51,407.862C1265.72,407.862 1267.52,406.063 1267.52,403.847L1267.52,395.817Z"),E(b,"fill","none"),E(b,"stroke","black"),E(b,"stroke-width","1px"),t(b,"class","svelte-1fxlv99"),t(w,"x","1180.9px"),t(w,"y","403.135px"),t($,"d","M1184.67,386.116L1201.42,386.116L1193.53,377.293L1184.67,386.116Z"),t($,"class","svelte-1fxlv99"),t(p,"transform","translate(-7,20)"),t(V,"x","177.227px 183.227px "),t(V,"y","64.434px 64.434px "),t(F,"x","170.325px"),t(F,"y","64.434px"),t(N,"x","177.503px 180.503px "),t(N,"y","76.944px 76.944px "),t(T,"x","156.397px"),t(T,"y","76.944px"),t(z,"transform","matrix(1,0,0,1,1077.36,239.205)"),t(tt,"d","M1260.83,321.22C1262.51,334.623 1251.13,338.083 1244.73,338.11"),E(tt,"fill","none"),E(tt,"stroke","black"),E(tt,"stroke-width","1px"),t(tt,"class","svelte-1fxlv99"),t(ct,"d","M1246.09,335.66L1242.42,338.284L1246.62,340.26L1246.09,335.66Z"),t(ct,"class","svelte-1fxlv99"),t(_,"id","chart2_labels"),t(W,"d","M977.164,146.416L965.318,134.57L964.656,146.387L977.164,146.416Z"),t(W,"class","svelte-1fxlv99"),t(pt,"d","M585.398,347.073L602.151,347.073L594.263,338.249L585.398,347.073Z"),t(pt,"class","svelte-1fxlv99"),t(O,"d","M668.255,356.774C668.255,354.558 666.456,352.759 664.24,352.759L581.53,352.759C579.314,352.759 577.515,354.558 577.515,356.774L577.515,364.804C577.515,367.02 579.314,368.819 581.53,368.819L664.24,368.819C666.456,368.819 668.255,367.02 668.255,364.804L668.255,356.774Z"),E(O,"fill","none"),E(O,"stroke","black"),E(O,"stroke-width","1px"),t(O,"class","svelte-1fxlv99"),t(j,"x","581.633px"),t(j,"y","364.092px"),t(rt,"transform","translate(-9,45)"),t(Z,"d","M628.025,435.078C628.025,432.862 626.225,431.063 624.01,431.063L529.423,431.063C527.207,431.063 525.408,432.862 525.408,435.078L525.408,443.108C525.408,445.324 527.207,447.123 529.423,447.123L624.01,447.123C626.225,447.123 628.025,445.324 628.025,443.108L628.025,435.078Z"),E(Z,"fill","none"),E(Z,"stroke","black"),E(Z,"stroke-width","1px"),t(Z,"class","svelte-1fxlv99"),t(et,"x","529.32px"),t(et,"y","442.396px"),t(at,"d","M490.648,377.231C490.648,375.015 488.848,373.216 486.633,373.216L433.873,373.216C431.658,373.216 429.858,375.015 429.858,377.231L429.858,385.261C429.858,387.477 431.658,389.276 433.873,389.276L486.633,389.276C488.848,389.276 490.648,387.477 490.648,385.261L490.648,377.231Z"),E(at,"fill","none"),E(at,"stroke","black"),E(at,"stroke-width","1px"),t(at,"class","svelte-1fxlv99"),t(Q,"x","433.576px"),t(Q,"y","384.573px"),t(Et,"d","M497.818,384.039L485.972,395.885L497.788,396.547L497.818,384.039Z"),t(Et,"class","svelte-1fxlv99"),t(X,"d","M358.649,420.556C358.649,418.34 356.85,416.541 354.634,416.541L282.952,416.541C280.736,416.541 278.937,418.34 278.937,420.556L278.937,428.586C278.937,430.802 280.736,432.601 282.952,432.601L354.634,432.601C356.85,432.601 358.649,430.802 358.649,428.586L358.649,420.556Z"),E(X,"fill","none"),E(X,"stroke","black"),E(X,"stroke-width","1px"),t(X,"class","svelte-1fxlv99"),t(ht,"x","281.77px"),t(ht,"y","427.898px"),t(dt,"d","M310.416,414.217L327.169,414.217L319.281,405.393L310.416,414.217Z"),t(dt,"class","svelte-1fxlv99"),t(st,"d","M502.328,266.161C502.328,263.945 500.529,262.146 498.313,262.146L407.115,262.146C404.899,262.146 403.1,263.945 403.1,266.161L403.1,274.191C403.1,276.407 404.899,278.206 407.115,278.206L498.313,278.206C500.529,278.206 502.328,276.407 502.328,274.191L502.328,266.161Z"),E(st,"fill","none"),E(st,"stroke","black"),E(st,"stroke-width","1px"),t(st,"class","svelte-1fxlv99"),t(ut,"x","406.867px"),t(ut,"y","273.504px"),t(_t,"d","M509.61,271.626L499.245,284.787L511.057,284.049L509.61,271.626Z"),t(_t,"class","svelte-1fxlv99"),t(H,"transform","translate(50,-120)"),t(Lt,"d","M517.423,434.768L529.269,422.922L517.452,422.261L517.423,434.768Z"),t(Lt,"class","svelte-1fxlv99"),t(zt,"x","602.098px 608.098px "),t(zt,"y","72.323px 72.323px "),t(ot,"x","595.196px"),t(ot,"y","72.323px"),t(kt,"d","M631,72.487C644.116,75.717 643.267,87.582 640.997,93.57"),E(kt,"fill","none"),E(kt,"stroke","black"),E(kt,"stroke-width","1px"),t(kt,"class","svelte-1fxlv99"),t(It,"d","M639.198,91.42L640.331,95.789L643.681,92.576L639.198,91.42Z"),t(It,"class","svelte-1fxlv99"),t(I,"id","chart1_labels"),t(Ct,"x","268.709px"),t(Ct,"y","534.924px"),E(Ct,"font-size","20px"),t(Bt,"transform","matrix(1,0,0,1,-709.044,-66.7806)"),t(wt,"x","268.709px"),t(wt,"y","534.924px"),E(wt,"font-size","14px"),t(Gt,"transform","matrix(1,0,0,1,-839.381,359.253)"),t(Pt,"transform","matrix(1,0,0,1,700,100)")},m(jt,Tt){vt(jt,i,Tt),e(i,_),e(_,n),e(n,u),e(u,x),e(u,m),e(m,v),e(u,d),e(n,f),e(f,o),e(f,g),e(g,c),e(n,y),e(y,k),e(y,L),e(L,M),e(n,h),e(n,p),e(p,b),e(p,w),e(w,C),e(p,$),e(n,S),e(S,z),e(z,F),e(F,Y),e(F,V),e(V,it),e(F,D),e(z,T),e(T,R),e(T,N),e(N,bt),e(T,yt),e(S,J),e(J,tt),e(J,ct),e(i,I),e(I,W),e(I,rt),e(rt,pt),e(rt,O),e(rt,j),e(j,Mt),e(I,nt),e(nt,Z),e(nt,et),e(et,qt),e(I,K),e(K,at),e(K,Q),e(Q,At),e(I,Et),e(I,lt),e(lt,X),e(lt,ht),e(ht,Ft),e(lt,dt),e(I,H),e(H,st),e(H,ut),e(ut,Yt),e(H,_t),e(I,Lt),e(I,ft),e(ft,ot),e(ot,Dt),e(ot,zt),e(zt,fe),e(ot,ge),e(ft,kt),e(ft,It),e(i,Pt),e(Pt,Bt),e(Bt,Ct),e(Ct,xe),e(Pt,Gt),e(Gt,wt),e(wt,me)},p:U,i:U,o:U,d(jt){jt&&r(i)}}}class sr extends Ht{constructor(i){super(),Ut(this,i,null,lr,Ot,{})}}const He=[[-220.39,-318.815],[-263.63,-308.381],[-310.9,-334.597],[-363.672,-317.223],[-410.689,-330.437],[-458.891,-310.129],[-588.116,-326.327],[-504.811,-334.126],[-544.859,-293.012],[-234.164,-253.848],[-293.866,-247.837],[-339.26,-261.881],[-387.494,-246.375],[-429.9,-267.94],[-485.597,-248.551],[-535.958,-219.956],[-580.27,-240.155],[-594.15,-182.228],[-492.744,-168.292],[-447.945,-189.168],[-366.053,-188.958],[-309.734,-174.147],[-219.867,-198.875],[-249.592,-170.739],[-264.86,-124.148],[-340.175,-128.888],[-407.204,-150.484],[-454.757,-107.777],[-557.772,-132.741],[-513.022,-109.747],[-379.625,-106.015],[-423.373,-69.131],[-480.604,-57.5193],[-552.18,-77.7603],[-595.873,-75.3104],[-227.761,-71.4658],[-308.711,-76.3514],[-349.641,-48.362],[-266.139,-30.3813],[-395.301,-22.7139],[-454.71,-7.89217],[-523.139,-23.8884],[-302.399,40.9856],[-351.608,16.2743],[-499.166,23.559],[-566.853,-14.5713],[-574.042,34.3913],[-238.427,26.2216],[-423.023,41.9737]];function Ue(P,i,_){const n=P.slice();return n[2]=i[_],n[4]=_,n}function Oe(P){let i,_,n,u,x,m,v,d,f,o,g,c,y,k;return{c(){i=l("g"),_=l("g"),n=l("path"),u=l("g"),x=l("circle"),m=l("g"),v=l("path"),d=l("g"),f=l("g"),o=l("path"),g=l("g"),c=l("text"),y=l("g"),k=l("path"),this.h()},l(L){i=s(L,"g",{class:!0,id:!0,transform:!0,style:!0});var M=a(i);_=s(M,"g",{transform:!0});var h=a(_);n=s(h,"path",{d:!0,style:!0,class:!0}),a(n).forEach(r),h.forEach(r),u=s(M,"g",{transform:!0});var p=a(u);x=s(p,"circle",{cx:!0,cy:!0,r:!0,style:!0}),a(x).forEach(r),p.forEach(r),m=s(M,"g",{transform:!0});var b=a(m);v=s(b,"path",{d:!0,class:!0}),a(v).forEach(r),b.forEach(r),d=s(M,"g",{class:!0,transform:!0});var w=a(d);f=s(w,"g",{transform:!0});var C=a(f);o=s(C,"path",{d:!0,style:!0,class:!0}),a(o).forEach(r),C.forEach(r),g=s(w,"g",{transform:!0});var $=a(g);c=s($,"text",{x:!0,y:!0,class:!0}),a(c).forEach(r),$.forEach(r),y=s(w,"g",{transform:!0});var S=a(y);k=s(S,"path",{d:!0,style:!0,class:!0}),a(k).forEach(r),S.forEach(r),w.forEach(r),M.forEach(r),this.h()},h(){t(n,"d","M762.235,927.928C763.847,916.819 761.793,900.683 745.369,898.328C728.055,900.254 722.953,913.964 725.127,927.928C728.418,921.447 729.947,915.231 733.828,913.062C726.277,926.35 729.408,948.415 733.828,961.543C737.352,941.769 751.703,941.631 754.308,961.543C757.723,954.028 761.079,922.867 754.308,913.062C758.01,915.925 760.097,920.265 762.235,927.928Z"),E(n,"fill","var(--color)"),E(n,"stroke","black"),E(n,"stroke-width","1.27px"),t(n,"class","svelte-2yna1b"),t(_,"transform","matrix(1,0,0,1,-700,-102)"),t(x,"cx","746.833"),t(x,"cy","882.924"),t(x,"r","12.431"),E(x,"fill","white"),E(x,"stroke","black"),E(x,"stroke-width","1.27px"),t(u,"transform","matrix(1,0,0,1,-701.464,-91.0269)"),t(v,"d","M283.273,944.544L288.286,949.557M283.273,940.544L288.286,945.557M283.273,936.544L288.286,941.557M283.273,948.544L288.286,953.557M283.273,952.544L288.286,957.557M280.089,954.359L287.089,961.359M276.089,954.359L280.089,958.359M274.089,956.359L276.61,958.88M272.089,958.359L274.089,960.359M271.089,961.359L272.55,962.821M270.089,964.359L271.089,965.359"),t(v,"class","svelte-2yna1b"),t(m,"transform","matrix(1.26777,0,0,1.26777,-309.49,-372.125)"),t(o,"d","M560.92,870.008C560.92,866.14 558.6,863 555.743,863L430.676,863C427.819,863 425.499,866.14 425.499,870.008L425.499,884.024C425.499,887.891 427.819,891.032 430.676,891.032L555.743,891.032C558.6,891.032 560.92,887.891 560.92,884.024L560.92,870.008Z"),E(o,"stroke","var(--color)"),t(o,"class","svelte-2yna1b"),t(f,"transform","matrix(1.35369,0,0,1,-138.17,-0.605946)"),t(c,"x","449.584px"),t(c,"y","880.046px"),t(c,"class","svelte-2yna1b"),t(g,"transform","matrix(1,0,0,1,80,0.542017)"),t(k,"d","M285.55,311.03L302.302,311.03L294.414,302.206L285.55,311.03Z"),E(k,"fill","var(--color)"),t(k,"class","svelte-2yna1b"),t(y,"transform","matrix(-0.707107,-0.707107,0.707107,-0.707107,425.999,1319.47)"),t(d,"class","tooltip svelte-2yna1b"),t(d,"transform","matrix(1.26777,0,0,1.26777,-491.55,-360.373)"),t(i,"class","person svelte-2yna1b"),t(i,"id","p"+P[4]),t(i,"transform","matrix(1,0,0,1,"+P[2][0]+","+P[2][1]+")"),E(i,"animation-delay","$")},m(L,M){vt(L,i,M),e(i,_),e(_,n),e(i,u),e(u,x),e(i,m),e(m,v),e(i,d),e(d,f),e(f,o),e(d,g),e(g,c),e(d,y),e(y,k)},p:U,d(L){L&&r(i)}}}function or(P){let i,_,n,u,x,m,v,d=He,f=[];for(let o=0;o<d.length;o+=1)f[o]=Oe(Ue(P,d,o));return{c(){i=l("g"),_=xt(),n=l("g"),u=l("g"),x=l("text"),m=q("km²"),v=l("rect");for(let o=0;o<f.length;o+=1)f[o].c();this.h()},l(o){i=s(o,"g",{transform:!0}),a(i).forEach(r),_=mt(o),n=s(o,"g",{transform:!0,class:!0});var g=a(n);u=s(g,"g",{transform:!0});var c=a(u);x=s(c,"text",{x:!0,y:!0});var y=a(x);m=A(y,"km²"),y.forEach(r),v=s(c,"rect",{x:!0,y:!0,width:!0,height:!0,style:!0}),a(v).forEach(r),c.forEach(r);for(let k=0;k<f.length;k+=1)f[k].l(g);g.forEach(r),this.h()},h(){t(i,"transform","translate(181,641)"),t(x,"x","470"),t(x,"y","1250"),t(v,"x","171.197"),t(v,"y","923.712"),t(v,"width","330"),t(v,"height","330"),E(v,"fill","none"),E(v,"stroke","black"),E(v,"stroke-width","0.99px"),t(u,"transform","matrix(1.27825,0,0,1.27825,-789.54,-693.315)"),t(n,"transform","matrix(0.788788,0,0,0.788788,577.797,260.419)"),t(n,"class","people")},m(o,g){vt(o,i,g),P[1](i),vt(o,_,g),vt(o,n,g),e(n,u),e(u,x),e(x,m),e(u,v);for(let c=0;c<f.length;c+=1)f[c]&&f[c].m(n,null)},p(o,[g]){if(g&0){d=He;let c;for(c=0;c<d.length;c+=1){const y=Ue(o,d,c);f[c]?f[c].p(y,g):(f[c]=Oe(y),f[c].c(),f[c].m(n,null))}for(;c<f.length;c+=1)f[c].d(1);f.length=d.length}},i:U,o:U,d(o){o&&r(i),P[1](null),o&&r(_),o&&r(n),Ne(f,o)}}}function nr(P,i,_){let n;pe(()=>{he(de).then(x=>{let m={key:"any",values:[],max:0,today:0};x.forEach(c=>{["populationDensity"].forEach(y=>{var h;const k=ue[y],L=Math.floor(!!c[k]&&parseFloat(c[k])),M=+((c==null?void 0:c.Year)??0);L?((h=m.values)==null||h.push([M,L]),m.max=Math.max(L,m.max),m.today=L):m={key:y,values:[[M,L]],max:L,today:L}})});const v=c=>We(1-c/(m.values[m.values.length-1][1]-m.values[0][1])),d=Array(50).fill(1).map((c,y)=>y),f=Vt(n),o=Zt().range([0,330]).domain([m.values[m.values.length-1][0],m.values[0][0]]);let g=0;m.values.forEach((c,y)=>{Array(c[1]-g).fill(1).map((L,M)=>d[M+g]).forEach(L=>{const M=c[0]==1500?"I live here since ":"I've moved here in ";document.querySelectorAll(`#p${L}`).forEach(h=>{h.style.setProperty("--color",v(c[1])),Vt(`#p${L} text`).text(`${M}${c[0]}.`)})}),g=c[1];const k=f.append("g");k.attr("transform",`translate(300,${330-o(c[0])})`).append("rect").style("fill",v(c[1])).attr("width",c[1]).attr("height",o(c[0])),(y==0||y==m.values.length-1)&&k.append("text").attr("x",c[1]+10).text(c[0]).attr("dominant-baseline","middle")})})});function u(x){Xt[x?"unshift":"push"](()=>{n=x,_(0,n)})}return[n,u]}class ir extends Ht{constructor(i){super(),Ut(this,i,nr,or,Ot,{})}}function cr(P){let i,_,n,u,x,m,v,d,f,o,g,c,y,k,L,M,h,p,b,w,C;return{c(){i=l("g"),_=l("defs"),n=l("rect"),u=l("pattern"),x=l("rect"),m=l("path"),v=l("pattern"),d=l("rect"),f=l("path"),o=l("g"),g=l("g"),c=l("g"),y=l("text"),k=q(`Land area used to feed single person has actually shrunk.
        `),L=l("g"),M=l("g"),h=l("path"),p=l("g"),b=l("path"),w=l("g"),C=l("circle"),this.h()},l($){i=s($,"g",{id:!0});var S=a(i);_=s(S,"defs",{});var z=a(_);n=s(z,"rect",{id:!0,x:!0,y:!0,width:!0,height:!0}),a(n).forEach(r),u=s(z,"pattern",{id:!0,patternUnits:!0,width:!0,height:!0});var F=a(u);x=s(F,"rect",{x:!0,y:!0,width:!0,height:!0,fill:!0,opacity:!0}),a(x).forEach(r),m=s(F,"path",{d:!0,"stroke-linejoin":!0,"stroke-linecap":!0,"stroke-width":!0,stroke:!0,fill:!0}),a(m).forEach(r),F.forEach(r),v=s(z,"pattern",{id:!0,patternUnits:!0,width:!0,height:!0,patternTransform:!0});var Y=a(v);d=s(Y,"rect",{x:!0,y:!0,width:!0,height:!0,fill:!0,opacity:!0}),a(d).forEach(r),f=s(Y,"path",{d:!0,"stroke-width":!0,stroke:!0}),a(f).forEach(r),Y.forEach(r),z.forEach(r),o=s(S,"g",{transform:!0,class:!0}),a(o).forEach(r),g=s(S,"g",{transform:!0,class:!0}),a(g).forEach(r),c=s(S,"g",{transform:!0});var V=a(c);y=s(V,"text",{x:!0,y:!0,style:!0});var it=a(y);k=A(it,`Land area used to feed single person has actually shrunk.
        `),it.forEach(r),V.forEach(r),L=s(S,"g",{transform:!0,class:!0});var D=a(L);M=s(D,"g",{transform:!0});var T=a(M);h=s(T,"path",{d:!0,style:!0}),a(h).forEach(r),T.forEach(r),p=s(D,"g",{transform:!0});var R=a(p);b=s(R,"path",{d:!0,style:!0}),a(b).forEach(r),R.forEach(r),w=s(D,"g",{transform:!0});var N=a(w);C=s(N,"circle",{cx:!0,cy:!0,r:!0,style:!0}),a(C).forEach(r),N.forEach(r),D.forEach(r),S.forEach(r),this.h()},h(){t(n,"id","rect"),t(n,"x","776.029"),t(n,"y","644.891"),t(n,"width","330"),t(n,"height","330"),t(x,"x","0"),t(x,"y","0"),t(x,"width","100%"),t(x,"height","100%"),t(x,"fill","goldenrod"),t(x,"opacity","1"),t(m,"d","m7.97 2.5-8 4.64-8-4.64m16-4.5v33m-8-33v9.08m24 9.67-8 4.64-8-4.64m16-9.72-8 4.64v9.66m-8-14.3 8 4.64m24-9.17-8 4.64-8-4.64m0-4.5v33m8-33v9.08m-24 14.2-8 4.64V31m-8-9.72 8 4.64m40-4.64-8 4.64V31m-8-9.72 8 4.64"),t(m,"stroke-linejoin","round"),t(m,"stroke-linecap","round"),t(m,"stroke-width","1.5"),t(m,"stroke","white"),t(m,"fill","transparent"),t(u,"id","a"),t(u,"patternUnits","userSpaceOnUse"),t(u,"width","31.94"),t(u,"height","28.5"),t(d,"x","0"),t(d,"y","0"),t(d,"width","100%"),t(d,"height","100%"),t(d,"fill","olivedrab"),t(d,"opacity","1"),t(f,"d","M0 40h40m-10-5.578v11.156M10 34.422v11.156M30-5.578V5.578M10-5.578V5.578M0 14.987v11.156m40-11.156v11.156M20 14.422v11.156M0 20h40M0 0h40"),t(f,"stroke-width","1"),t(f,"stroke","white"),t(v,"id","b"),t(v,"patternUnits","userSpaceOnUse"),t(v,"width","40"),t(v,"height","40"),t(v,"patternTransform","scale(.75) rotate(0)"),t(o,"transform","matrix(1,0,0,1,245.888,0)"),t(o,"class","cropland"),t(g,"transform","matrix(-1,0,0,1,1793.42,0)"),t(g,"class","grazing"),t(y,"x","268.709px"),t(y,"y","534.924px"),E(y,"font-size","14px"),t(c,"transform","matrix(1,0,0,1,424.291,459.253)"),t(h,"d","M762.235,927.928C763.847,916.819 761.793,900.683 745.369,898.328C728.055,900.254 722.953,913.964 725.127,927.928C728.418,921.447 729.947,915.231 733.828,913.062C726.277,926.35 729.408,948.415 733.828,961.543C737.352,941.769 751.703,941.631 754.308,961.543C757.723,954.028 761.079,922.867 754.308,913.062C758.01,915.925 760.097,920.265 762.235,927.928Z"),E(h,"fill","#1e9d89"),E(h,"stroke","black"),E(h,"stroke-width","1px"),t(M,"transform","matrix(1,0,0,1,-700,-102)"),t(b,"d","M283.273,944.544L288.286,949.557M283.273,940.544L288.286,945.557M283.273,936.544L288.286,941.557M283.273,948.544L288.286,953.557M283.273,952.544L288.286,957.557M280.089,954.359L287.089,961.359M276.089,954.359L280.089,958.359M274.089,956.359L276.61,958.88M272.089,958.359L274.089,960.359M271.089,961.359L272.55,962.821M270.089,964.359L271.089,965.359"),E(b,"fill","none"),E(b,"stroke","black"),E(b,"stroke-width","0.79px"),t(p,"transform","matrix(1.26777,0,0,1.26777,-309.49,-372.125)"),t(C,"cx","746.833"),t(C,"cy","882.924"),t(C,"r","12.431"),E(C,"fill","white"),E(C,"stroke","black"),E(C,"stroke-width","1px"),t(w,"transform","matrix(1,0,0,1,-701.464,-91.0269)"),t(L,"transform","matrix(1,0,0,1,974.099,104.978)"),t(L,"class","person"),t(i,"id","land")},m($,S){vt($,i,S),e(i,_),e(_,n),e(_,u),e(u,x),e(u,m),e(_,v),e(v,d),e(v,f),e(i,o),P[2](o),e(i,g),P[3](g),e(i,c),e(c,y),e(y,k),e(i,L),e(L,M),e(M,h),e(L,p),e(p,b),e(L,w),e(w,C)},p:U,i:U,o:U,d($){$&&r(i),P[2](null),P[3](null)}}}function pr(P,i,_){let n,u;pe(()=>{he(de).then(v=>{let d={};v.forEach(o=>{["grazingPC","croplandPC"].forEach(g=>{var L;const c=ue[g],y=!!o[c]&&parseFloat(o[c]),k=+((o==null?void 0:o.Year)??0);y&&(d[g]?((L=d[g].values)==null||L.push([k,y]),d[g].max=Math.max(y,d[g].max),d[g].today=y):d[g]={key:g,values:[[k,y]],max:y,today:y})})});const f=Math.max(d.grazingPC.max,d.croplandPC.max);Math.sqrt(d.croplandPC.max/f),Math.sqrt(d.grazingPC.max/f),d.grazingPC.values.forEach(o=>{Vt(n).insert("use").attr("href","#rect").attr("class","dataRect").attr("transform",`scale(${Math.sqrt(o[1]/f)})`).attr("transform-origin","776.029 974.891").style("fill",o[0]==2016?'url("#b")':"var(--color)").style("fill-opacity",o[0]==2016?.6:.02).style("--hover-opacity",o[0]==2016?.8:.2).style("--fill","var(--color").append("title").text(`Grazing area size per person in ${o[0]} was ${o[1].toPrecision(3)} km²`)}),d.croplandPC.values.forEach(o=>{Vt(u).insert("use").attr("href","#rect").attr("class","dataRect").attr("transform",`scale(${Math.sqrt(o[1]/f)})`).attr("transform-origin","776.029 974.891").style("fill",o[0]==2016?'url("#a")':"var(--color)").style("fill-opacity",o[0]==2016?.6:.02).style("--hover-opacity",o[0]==2016?.8:.2).style("--fill","var(--color").append("title").text(`Cropland size per person in ${o[0]} was ${o[1].toPrecision(3)} km²`)})})});function x(v){Xt[v?"unshift":"push"](()=>{u=v,_(1,u)})}function m(v){Xt[v?"unshift":"push"](()=>{n=v,_(0,n)})}return[n,u,x,m]}class hr extends Ht{constructor(i){super(),Ut(this,i,pr,cr,Ot,{})}}function dr(P){let i,_,n,u,x,m,v,d,f,o,g,c,y,k,L,M,h,p,b,w,C,$,S,z,F,Y,V,it,D,T,R,N,bt,yt,J,tt,ct,I,W,rt,pt,O,j,Mt,nt;return o=new tr({}),c=new ar({}),y=new sr({}),k=new ir({}),L=new hr({}),{c(){i=B("meta"),_=xt(),n=B("section"),u=B("div"),x=B("h1"),m=q("Land use and population"),v=xt(),d=l("svg"),f=l("g"),Kt(o.$$.fragment),g=l("g"),Kt(c.$$.fragment),Kt(y.$$.fragment),Kt(k.$$.fragment),Kt(L.$$.fragment),M=xt(),h=B("hr"),p=xt(),b=B("div"),w=B("div"),C=B("h1"),$=q("Land use & population"),S=xt(),z=B("div"),F=xt(),Y=B("div"),V=B("div"),it=q(`data sources:
                    `),D=B("ul"),T=B("li"),R=B("a"),N=q("Land use: https://ourworldindata.org/land-use"),bt=xt(),yt=B("li"),J=B("a"),tt=q("Population: https://www.worldometers.info/world-population/world-population-by-year"),ct=xt(),I=B("li"),W=B("a"),rt=q("Fertilizers: https://ourworldindata.org/fertilizers"),pt=xt(),O=B("li"),j=B("a"),Mt=q(`Arable land size for a fixed size crop:
                                https://ourworldindata.org/grapher/arable-land-pin`),this.h()},l(Z){const et=Je("svelte-1ycf8r8",document.head);i=G(et,"META",{name:!0,content:!0}),et.forEach(r),_=mt(Z),n=G(Z,"SECTION",{});var qt=a(n);u=G(qt,"DIV",{class:!0});var K=a(u);x=G(K,"H1",{});var at=a(x);m=A(at,"Land use and population"),at.forEach(r),v=mt(K),d=s(K,"svg",{viewBox:!0,class:!0,xmlns:!0,version:!0});var Q=a(d);f=s(Q,"g",{transform:!0});var At=a(f);Rt(o.$$.fragment,At),At.forEach(r),g=s(Q,"g",{transform:!0});var Et=a(g);Rt(c.$$.fragment,Et),Et.forEach(r),Rt(y.$$.fragment,Q),Rt(k.$$.fragment,Q),Rt(L.$$.fragment,Q),Q.forEach(r),M=mt(K),h=G(K,"HR",{style:!0}),p=mt(K),b=G(K,"DIV",{class:!0});var lt=a(b);w=G(lt,"DIV",{});var X=a(w);C=G(X,"H1",{});var ht=a(C);$=A(ht,"Land use & population"),ht.forEach(r),S=mt(X),z=G(X,"DIV",{}),a(z).forEach(r),X.forEach(r),F=mt(lt),Y=G(lt,"DIV",{class:!0});var Ft=a(Y);V=G(Ft,"DIV",{});var dt=a(V);it=A(dt,`data sources:
                    `),D=G(dt,"UL",{});var H=a(D);T=G(H,"LI",{});var st=a(T);R=G(st,"A",{href:!0,class:!0});var ut=a(R);N=A(ut,"Land use: https://ourworldindata.org/land-use"),ut.forEach(r),st.forEach(r),bt=mt(H),yt=G(H,"LI",{});var Yt=a(yt);J=G(Yt,"A",{href:!0,class:!0});var _t=a(J);tt=A(_t,"Population: https://www.worldometers.info/world-population/world-population-by-year"),_t.forEach(r),Yt.forEach(r),ct=mt(H),I=G(H,"LI",{});var Lt=a(I);W=G(Lt,"A",{href:!0,class:!0});var ft=a(W);rt=A(ft,"Fertilizers: https://ourworldindata.org/fertilizers"),ft.forEach(r),Lt.forEach(r),pt=mt(H),O=G(H,"LI",{});var ot=a(O);j=G(ot,"A",{href:!0,class:!0});var Dt=a(j);Mt=A(Dt,`Arable land size for a fixed size crop:
                                https://ourworldindata.org/grapher/arable-land-pin`),Dt.forEach(r),ot.forEach(r),H.forEach(r),dt.forEach(r),Ft.forEach(r),lt.forEach(r),K.forEach(r),qt.forEach(r),this.h()},h(){document.title="Land use and population",t(i,"name","description"),t(i,"content","Svelte demo app"),t(f,"transform","translate(100,100)"),t(g,"transform","translate(700,100)"),t(d,"viewBox","0 0 1400 1000"),t(d,"class","svg svelte-10ruq4q"),t(d,"xmlns","http://www.w3.org/2000/svg"),t(d,"version","1.1"),E(h,"margin-top","10em"),t(R,"href","https://ourworldindata.org/land-use"),t(R,"class","svelte-10ruq4q"),t(J,"href","https://www.worldometers.info/world-population/world-population-by-year"),t(J,"class","svelte-10ruq4q"),t(W,"href","https://ourworldindata.org/fertilizers"),t(W,"class","svelte-10ruq4q"),t(j,"href","https://ourworldindata.org/grapher/arable-land-pin"),t(j,"class","svelte-10ruq4q"),t(Y,"class","comments"),t(b,"class","notes"),t(u,"class","page svelte-10ruq4q")},m(Z,et){e(document.head,i),vt(Z,_,et),vt(Z,n,et),e(n,u),e(u,x),e(x,m),e(u,v),e(u,d),e(d,f),Nt(o,f,null),e(d,g),Nt(c,g,null),Nt(y,d,null),Nt(k,d,null),Nt(L,d,null),e(u,M),e(u,h),e(u,p),e(u,b),e(b,w),e(w,C),e(C,$),e(w,S),e(w,z),e(b,F),e(b,Y),e(Y,V),e(V,it),e(V,D),e(D,T),e(T,R),e(R,N),e(D,bt),e(D,yt),e(yt,J),e(J,tt),e(D,ct),e(D,I),e(I,W),e(W,rt),e(D,pt),e(D,O),e(O,j),e(j,Mt),nt=!0},p:U,i(Z){nt||(Jt(o.$$.fragment,Z),Jt(c.$$.fragment,Z),Jt(y.$$.fragment,Z),Jt(k.$$.fragment,Z),Jt(L.$$.fragment,Z),nt=!0)},o(Z){Wt(o.$$.fragment,Z),Wt(c.$$.fragment,Z),Wt(y.$$.fragment,Z),Wt(k.$$.fragment,Z),Wt(L.$$.fragment,Z),nt=!1},d(Z){r(i),Z&&r(_),Z&&r(n),Qt(o),Qt(c),Qt(y),Qt(k),Qt(L)}}}class _r extends Ht{constructor(i){super(),Ut(this,i,null,dr,Ot,{})}}export{_r as default};
