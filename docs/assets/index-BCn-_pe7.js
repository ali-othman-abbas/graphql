(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`token`;function t(t){localStorage.setItem(e,t)}function n(){return localStorage.getItem(e)}function r(){localStorage.removeItem(e)}function i(e){if(e==null)throw Error(`object is null or undefined`);return e}function a(e){let t=document.createElement(`template`);return t.innerHTML=e.trim(),t.content.firstElementChild}async function o(e){try{return[await e,null]}catch(e){return[null,e]}}async function s(e){let t=n();if(!t)return $(`/login`),[{},null];console.log({exists:!!t,type:typeof t,parts:t?.split(`.`).length,prefix:t?.slice(0,10)});let[i,a]=await o(fetch(`https://learn.reboot01.com/api/graphql-engine/v1/graphql`,{method:`POST`,headers:{"Content-Type":`application/json`,Authorization:`Bearer ${t}`},body:JSON.stringify({query:e})}));if(a)return[null,a];let s=await i.json();switch(i.status){case 401:case 403:return r(),$(`/login`),[s,null];case 200:return console.log(s),[s.data,null];default:throw Error(JSON.stringify(s))}}function c(e){return e*Math.PI/180}function l(e,t,n,r){return{x:e+n*Math.cos(r),y:t+n*Math.sin(r)}}var u=`error`,d=`login-error-message`,f=`password-error-message`,p=`form-submit-error`,m=1e3,h=a(`
  <div class="login-page">
    <div class="login-card">
      <h1 class="login-heading">Log into your reboot01 account</h1>
      <div id="${p}" class="form-error" hidden></div>
      <form>
          <div class="error-group">
            <label for="login-username">Username or email:</label>
            <input id="login-username" type="text" maxLength="${m}" autocomplete="off"/>
            <div id="${d}" class="error-message" hidden></div>
          </div>
          <div class="error-group">
            <label for="login-password">Password:</label>
            <input id="login-password" type="password" maxLength="${m}" autocomplete="off"/>
            <div id="${f}" class="error-message" hidden></div>
          </div>
          <button type="submit" disabled>Submit</button>
      </form>
    </div>
  </div>
`);function g(e){e.replaceChildren(h)}var _=i(h.querySelector(`form`)),v=i(h.querySelector(`input[type="text"]`)),y=i(h.querySelector(`#login-error-message`)),b=i(h.querySelector(`input[type="password"]`)),x=i(h.querySelector(`#password-error-message`)),S=i(h.querySelector(`button`)),C=i(h.querySelector(`#form-submit-error`));v.addEventListener(`input`,()=>{let e=w(v);D(v,e),T(y,e,`login`),E()}),b.addEventListener(`input`,()=>{let e=w(b);D(b,e),T(x,e,`password`),E()}),_.addEventListener(`submit`,async e=>{e.preventDefault();let n=w(v),r=w(b);if(n!==``||r!==``)return;let i=v.value,a=b.value,s=new TextEncoder().encode(`${i}:${a}`).toBase64(),[c,l]=await o(fetch(`https://learn.reboot01.com/api/auth/signin`,{method:`POST`,headers:{Authorization:`Basic ${s}`}}));if(l){ee(C,`failed to send login information`);return}if(!c.ok){te(C,await c.json());return}v.value=``,b.value=``,ne(C),t(await c.json()),$(`/`)});function w(e){return e.value.length===0?`empty`:e.value.length>m?`too long`:``}function T(e,t,n){switch(t){case`empty`:e.hidden=!1,e.textContent=`${n} can't be empty`;break;case`too long`:e.hidden=!1,e.textContent=`${n} can't be longer than ${m}`;break;case``:e.hidden=!0,e.textContent=``}}function E(){let e=w(v),t=w(b);if(e===``&&t===``){S.disabled=!1;return}S.disabled=!0}function D(e,t){if(t===``){e.classList.remove(u);return}e.classList.add(u)}function ee(e,t){e.hidden=!1,e.textContent=`Network Error: ${t}`}function te(e,t){e.hidden=!1,e.textContent=t.error}function ne(e){e.hidden=!0}var O=i(document.querySelector(`#app`)),k=`http://www.w3.org/2000/svg`,A=`#7ec4ff`,j=`system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`;function M({up:e,down:t,upColor:n,downColor:r}){let i={height:100,width:100,center:{x:0,y:0},r:0};i.center={x:i.height/2,y:i.height/2},i.r=40;let a=P();if(t===0&&e===0)return a.replaceChildren(F({cx:i.center.x,cy:i.center.y,fill:`gray`,r:i.r})),a;if(t===0)return a.replaceChildren(F({cx:i.center.x,cy:i.center.y,fill:n,r:i.r})),a;let o=e/(e+t)*360,s=270+o,u=l(i.center.x,i.center.y,i.r,c(270)),d=l(i.center.x,i.center.y,i.r,c(s)),f=o>180?`large`:`small`;return a.append(F({cx:i.center.x,cy:i.center.y,r:i.r,fill:r})),a.append(re({cx:i.center.x,cy:i.center.y,r:i.r,p1:u,p2:d,arcSize:f,sweep:`clockwise`,fill:n})),a}function N({passes:e,fails:t,passesColor:n,failsColor:r}){let i=P(),a=i.viewBox.baseVal.height,o=i.viewBox.baseVal.width,s={yAxisTextXi:2,tickCount:6,yi:10,yf:a-10,xi:10,barWidth:10,floorHeight:.5,pillerWidth:.5,tickWidth:3,tickHeight:.5,xAxisTextYi:5,textFontSize:3},c=e+t,l=(s.yf-s.yi)*(e/c),u=s.xi+o/2/2,d=s.xi+o/2+o/2/2,f={x:u-s.barWidth/2,y:s.yf-l,height:l,width:s.barWidth,fill:n},p=(s.yf-s.yi)*(t/c),m={x:d-s.barWidth/2,y:s.yf-p,height:p,width:s.barWidth,fill:r},h={x:s.xi,y:s.yf,height:s.floorHeight,width:o,fill:`gray`},g=s.yf-s.yi,_={x:s.xi,y:s.yi,height:g,width:s.pillerWidth,fill:`gray`},v=[],y=g/s.tickCount;for(let e=1;e<s.tickCount;e++)v.push(s.yf-y*e);v.push(s.yi);let b=v.map(e=>I({fill:`gray`,x:s.xi-s.tickWidth+s.pillerWidth,y:e-s.tickHeight/2,height:s.tickHeight,width:s.tickWidth})),x=[],S=c/s.tickCount;for(let e=1;e<s.tickCount;e++)x.push((S*e).toFixed(1));x.push(`${c}`);let C=x.map((e,t)=>L({text:e,x:s.yAxisTextXi,y:v[t],yAlign:`central`,fontSize:s.textFontSize,fontFamily:j,fill:A}));return i.append(I(h)),i.append(I(f)),i.append(I(m)),i.append(I(_)),b.forEach(e=>{i.append(e)}),C.forEach(e=>i.append(e)),i.append(L({text:`pass`,x:u,y:o-s.xAxisTextYi,xAlign:`middle`,yAlign:`central`,fontSize:s.textFontSize,fontFamily:j,fill:A})),i.append(L({text:`fails`,x:d,y:o-s.xAxisTextYi,xAlign:`middle`,yAlign:`central`,fontSize:s.textFontSize,fontFamily:j,fill:A})),i}function P(){let e=document.createElementNS(k,`svg`);return e.setAttribute(`viewBox`,`0 0 100 100`),e}function re({cx:e,cy:t,r:n,p1:r,p2:i,arcSize:a,sweep:o,fill:s}){let c=[`M ${e} ${t}`,`L ${r.x} ${r.y}`,`A ${n} ${n} 0 ${+(a===`large`)} ${+(o===`clockwise`)} ${i.x} ${i.y}`,`Z`].join(` `),l=document.createElementNS(k,`path`);return l.setAttribute(`d`,c),l.setAttribute(`fill`,s),l}function F({cx:e,cy:t,r:n,fill:r}){let i=document.createElementNS(k,`circle`);return i.setAttribute(`cx`,`${e}`),i.setAttribute(`cy`,`${t}`),i.setAttribute(`r`,`${n}`),i.setAttribute(`fill`,`${r}`),i}function I({x:e,y:t,width:n,height:r,fill:i}){let a=document.createElementNS(k,`rect`);return a.setAttribute(`x`,`${e}`),a.setAttribute(`y`,`${t}`),a.setAttribute(`width`,`${n}`),a.setAttribute(`height`,`${r}`),a.setAttribute(`fill`,`${i}`),a}function L({text:e,x:t,y:n,xAlign:r,yAlign:i,fontFamily:a,fontSize:o,fill:s}){let c=document.createElementNS(k,`text`);return c.textContent=e,c.setAttribute(`x`,`${t}`),c.setAttribute(`y`,`${n}`),r&&c.setAttribute(`text-anchor`,`${r}`),i&&c.setAttribute(`dominant-baseline`,`${i}`),a&&c.setAttribute(`font-family`,`${a}`),o&&c.setAttribute(`font-size`,`${o}`),s&&c.setAttribute(`fill`,`${s}`),c}var R=`
  {
    progress_aggregate(
    	where:{
        _and:[
          {path:{_ilike:"%/bh-module/%"}}
          {_not:{path:{_ilike:"%/checkpoint%"}}}
          {_not:{path:{_ilike:"%/piscine%"}}}
          {grade:{_gte:1}}
          {isDone:{_eq:true}}
        ]
      }
    ){
      aggregate{
        count
      }
    }
  }
`,z=`
  {
    user {
      login
      attrs
    }
  }
`,B=`
  {
    transaction_aggregate(
      where: {
        _and:[
          {type:{_eq:"xp"}}
          {path:{_ilike:"%/bh-module/%"}} 	
          {_not:{path:{_ilike:"%/piscine%/%"}}}
        ]
      }
      order_by:{createdAt:desc}
    ) {
      aggregate{
        sum{amount}
      }
    }
  }
`,V=`
  {
    user{
      groups(
        where: {
          _and:[
            {group:{status:{_eq: finished}}}
            {path:{_ilike:"%/bh-module/%"}} 	
            {_not:{path:{_ilike:"%/piscine%/%"}}}
          ]
        }
        order_by:{createdAt:desc}
        limit:1
      ){
        group{
          object{
            name
          }
          members{
            userLogin
          }
        }
      }
    }
  }
`,H=`
  {
    transaction(
      where: {
        _and:[
          {type:{_eq:"level"}}
          {path:{_ilike:"%/bh-module/%"}} 	
          {_not:{path:{_ilike:"%/piscine%/%"}}}
        ]
      }
      order_by:{
        amount:desc
        createdAt:desc
      }
      limit:1
    ) {
      user {
        login
      }
      path
      amount
    	type
    }
  }
`,U=`
  {
    transaction_aggregate(
      where: {type:{_eq:"up"}}
      order_by:{createdAt:desc}
    ) {
    	aggregate {
      	sum {
        	amount
      	}
    	}
    }
  }
`,W=`
  {
    transaction_aggregate(
      where: {type:{_eq:"down"}}
      order_by:{createdAt:desc}
    ) {
    	aggregate {
      	sum {
        	amount
      	}
    	}
    }
  }
`,G=`
  {
    progress_aggregate(
    	where:{
        _and:[
          {path:{_ilike:"%/bh-module/%"}}
          {_not:{path:{_ilike:"%/checkpoint%"}}}
          {_not:{path:{_ilike:"%/piscine%"}}}
          {grade:{_eq:0}}
          {isDone:{_eq:true}}
        ]
      }
    ){
      aggregate{
        count
      }
    }
  }
`,K=`username`,q=`email`,J=`gender`,Y=`projects-completed`,X=`xp`,ie=`level`,ae=`project-name`,oe=`group-member-list`,se=`audit-ratio`,ce=`audit-ratio-graph`,le=`passes-vs-fails-graph`,ue=`passes`,de=`fails`;function fe(e){return a(`
      <div class='group-member'>
        ${e}
      </div>
    `)}var Z=a(`
  <div>
      <div id="user-info">
          <div id="username-section">
              <div>username:</div>
              <div id="${K}"></div>
          </div>
          <div id="email-section">
              <div>email:</div>
              <div id="${q}"></div>
          </div>
          <div id="year-section">
              <div>Gender:</div>
              <div id="${J}"></div>
          </div>
          <button id="logout">Logout</button>
      </div>
      <div id="stats">
          <div id="projects-completed-stat">
              <div>Projects Completed:</div>
              <div id="${Y}"></div>
          </div>
          <div id="xp-stat">
              <div>Total XP:</div>
              <div id="${X}"></div>
          </div>
          <div id="level-stat">
              <div>Level:</div>
              <div id="${ie}"></div>
          </div>
          <div id="last-project-completed-stat">
            <div class="last-project-header">Last Completed Project:</div>
              <div class="project-name-group">
                <div id="${ae}"></div>
              </div>
              <div class="project-members-group">
                <div>members:</div>
                <div id="${oe}">
                    
                </div>
              </div>
          </div>
          <div id="audit-ratio-graph-stat">
              <div>Audit Ratio</div>
              <div id="${se}"></div>
              <div id="${ce}">
              </div>
              <div class="audit-ratio-legend">
                <div class="color-group">
                    <div class="green-box color-box"></div>
                    <div class="center-text-vertically">up</div>
                </div>
                <div class="color-group">
                    <div class="red-box color-box"></div>
                    <div class="center-text-vertically">down</div>
                </div>
              </div>
          </div>
          <div id="passes-vs-fails-stat">
            <div>Pass vs Fails</div>
            <div class="passes-group">
                <div>Passes:</div>
                <div id="${ue}"></div>
            </div>
            <div class="fails-group">
                <div>fails:</div>
                <div id="${de}"></div>
            </div>
            <div id="${le}"></div>
      </div>
  </div>
`);i(Z.querySelector(`#logout`)).addEventListener(`click`,()=>{r(),$(`/login`)});var pe=i(Z.querySelector(`#username`)),me=i(Z.querySelector(`#email`)),he=i(Z.querySelector(`#gender`)),ge=i(Z.querySelector(`#projects-completed`)),_e=i(Z.querySelector(`#xp`)),ve=i(Z.querySelector(`#level`)),ye=i(Z.querySelector(`#project-name`)),be=i(Z.querySelector(`#group-member-list`)),xe=i(Z.querySelector(`#audit-ratio`)),Se=i(Z.querySelector(`#audit-ratio-graph`)),Ce=i(Z.querySelector(`#passes-vs-fails-graph`)),we=i(Z.querySelector(`#passes`)),Te=i(Z.querySelector(`#fails`));function Ee(e){e.replaceChildren(Z),De()}function De(){Oe(pe,me,he),Q(ge),ke(_e),Ae(ve),je(ye,be),Me(xe,Se),Ne(we,Te,Ce)}async function Oe(e,t,n){let[r,i]=await s(z);if(i!==null){console.error(i);return}console.log(r);let a=r.user[0];e.textContent=a.login,t.textContent=a.attrs.email,n.textContent=a.attrs.genders}async function Q(e){let[t,n]=await s(R);if(n!==null){console.error(n);return}e.textContent=`${t.progress_aggregate.aggregate.count}`}async function ke(e){let[t,n]=await s(B);if(n!==null){console.error(n);return}let r=t.transaction_aggregate.aggregate.sum.amount,i=[`B`,`KB`,`MB`,`GB`,`TB`],a=0;for(;r>1e3;)r/=1e3,a++;let o=0,c=100;for(;r<c&&c>1;)c/=10,o++;e.textContent=`${r.toFixed(o)} ${i[a]}`}async function Ae(e){let[t,n]=await s(H);if(n!==null){console.error(n);return}e.textContent=`${t.transaction[0].amount}`}async function je(e,t){let[n,r]=await s(V);if(r!==null){console.error(r);return}n.user[0].groups[0].group.members;let i=n.user[0].groups[0].group;e.textContent=`${i.object.name}`,t.replaceChildren(...i.members.map(e=>fe(e.userLogin)))}async function Me(e,t){let n=s(U),r=s(W),[[i,a],[o,c]]=await Promise.all([n,r]);if(a!==null){console.error(a);return}if(c!==null){console.error(c);return}let l=i.transaction_aggregate.aggregate.sum.amount,u=o.transaction_aggregate.aggregate.sum.amount;e.textContent=l===0&&u===0?`GO DO AUDITS`:u===0?`INFINITE`:`${(l/u).toFixed(1)}`;let d=M({up:l,down:u,upColor:`#3ddc84`,downColor:`#ff5c5c`});t.replaceChildren(d)}async function Ne(e,t,n){let[[r,i],[a,o]]=await Promise.all([s(R),s(G)]);if(i!==null){console.error(i);return}if(o!==null){console.error(o);return}let c=r.progress_aggregate.aggregate.count,l=a.progress_aggregate.aggregate.count;e.textContent=`${c}`,t.textContent=`${l}`;let u=N({passes:c,fails:l,passesColor:`#3ddc84`,failsColor:`#ff5c5c`});n.replaceChildren(u)}function $(e){history.pushState(null,``,e),Pe()}function Pe(){let e=window.location.pathname,t=n();if(e===`/login`&&!t){g(O);return}if(!t){$(`/login`);return}if(e===`/`){Ee(O);return}$(`/`)}$(`/`);