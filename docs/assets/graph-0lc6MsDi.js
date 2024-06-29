import{b0 as M,b1 as R,b2 as o,b3 as G,b4 as S,b5 as N,b6 as T,b7 as I,b8 as V,b9 as k,ba as H,bb as E,bc as j,bd as U,be as Y,bf as q,bg as z,bh as B,bi as p,bj as w,bk as g,bl as D}from"./index-CGe7L76g.js";function K(){}function Z(s){return s!==s}function J(s,e,t){for(var i=t-1,r=s.length;++i<r;)if(s[i]===e)return i;return-1}function Q(s,e,t){return e===e?J(s,e,t):M(s,Z,t)}function W(s,e){var t=s==null?0:s.length;return!!t&&Q(s,e,0)>-1}function X(s,e,t,i){var r=-1,n=s==null?0:s.length;for(i&&n&&(t=s[++r]);++r<n;)t=e(t,s[r],r,s);return t}function $(s,e){return s&&R(s,e,o)}function ee(s,e){return function(t,i){if(t==null)return t;if(!G(t))return s(t,i);for(var r=t.length,n=-1,h=Object(t);++n<r&&i(h[n],n,h)!==!1;);return t}}var L=ee($);function te(s){return typeof s=="function"?s:S}function f(s,e){var t=N(s)?T:L;return t(s,te(e))}function se(s,e){var t=[];return L(s,function(i,r,n){e(i,r,n)&&t.push(i)}),t}function m(s,e){var t=N(s)?V:se;return t(s,I(e))}var ie=Object.prototype,re=ie.hasOwnProperty;function ne(s,e){return s!=null&&re.call(s,e)}function d(s,e){return s!=null&&k(s,e,ne)}function he(s,e){return H(e,function(t){return s[t]})}function v(s){return s==null?[]:he(s,o(s))}function ue(s,e,t,i,r){return r(s,function(n,h,u){t=i?(i=!1,n):e(t,n,h,u)}),t}function ae(s,e,t){var i=N(s)?X:ue,r=arguments.length<3;return i(s,I(e),t,r,L)}var de=1/0,oe=E&&1/j(new E([,-0]))[1]==de?function(s){return new E(s)}:K,fe=200;function _e(s,e,t){var i=-1,r=W,n=s.length,h=!0,u=[],a=u;if(n>=fe){var O=oe(s);if(O)return j(O);h=!1,r=Y,a=new U}else a=u;e:for(;++i<n;){var l=s[i],c=l;if(l=l!==0?l:0,h&&c===c){for(var F=a.length;F--;)if(a[F]===c)continue e;u.push(l)}else r(a,c,t)||(a!==u&&a.push(c),u.push(l))}return u}var le=q(function(s){return _e(z(s,1,B,!0))}),ge="\0",_="\0",y="";class x{constructor(e={}){this._isDirected=d(e,"directed")?e.directed:!0,this._isMultigraph=d(e,"multigraph")?e.multigraph:!1,this._isCompound=d(e,"compound")?e.compound:!1,this._label=void 0,this._defaultNodeLabelFn=p(void 0),this._defaultEdgeLabelFn=p(void 0),this._nodes={},this._isCompound&&(this._parent={},this._children={},this._children[_]={}),this._in={},this._preds={},this._out={},this._sucs={},this._edgeObjs={},this._edgeLabels={}}isDirected(){return this._isDirected}isMultigraph(){return this._isMultigraph}isCompound(){return this._isCompound}setGraph(e){return this._label=e,this}graph(){return this._label}setDefaultNodeLabel(e){return w(e)||(e=p(e)),this._defaultNodeLabelFn=e,this}nodeCount(){return this._nodeCount}nodes(){return o(this._nodes)}sources(){var e=this;return m(this.nodes(),function(t){return D(e._in[t])})}sinks(){var e=this;return m(this.nodes(),function(t){return D(e._out[t])})}setNodes(e,t){var i=arguments,r=this;return f(e,function(n){i.length>1?r.setNode(n,t):r.setNode(n)}),this}setNode(e,t){return d(this._nodes,e)?(arguments.length>1&&(this._nodes[e]=t),this):(this._nodes[e]=arguments.length>1?t:this._defaultNodeLabelFn(e),this._isCompound&&(this._parent[e]=_,this._children[e]={},this._children[_][e]=!0),this._in[e]={},this._preds[e]={},this._out[e]={},this._sucs[e]={},++this._nodeCount,this)}node(e){return this._nodes[e]}hasNode(e){return d(this._nodes,e)}removeNode(e){var t=this;if(d(this._nodes,e)){var i=function(r){t.removeEdge(t._edgeObjs[r])};delete this._nodes[e],this._isCompound&&(this._removeFromParentsChildList(e),delete this._parent[e],f(this.children(e),function(r){t.setParent(r)}),delete this._children[e]),f(o(this._in[e]),i),delete this._in[e],delete this._preds[e],f(o(this._out[e]),i),delete this._out[e],delete this._sucs[e],--this._nodeCount}return this}setParent(e,t){if(!this._isCompound)throw new Error("Cannot set parent in a non-compound graph");if(g(t))t=_;else{t+="";for(var i=t;!g(i);i=this.parent(i))if(i===e)throw new Error("Setting "+t+" as parent of "+e+" would create a cycle");this.setNode(t)}return this.setNode(e),this._removeFromParentsChildList(e),this._parent[e]=t,this._children[t][e]=!0,this}_removeFromParentsChildList(e){delete this._children[this._parent[e]][e]}parent(e){if(this._isCompound){var t=this._parent[e];if(t!==_)return t}}children(e){if(g(e)&&(e=_),this._isCompound){var t=this._children[e];if(t)return o(t)}else{if(e===_)return this.nodes();if(this.hasNode(e))return[]}}predecessors(e){var t=this._preds[e];if(t)return o(t)}successors(e){var t=this._sucs[e];if(t)return o(t)}neighbors(e){var t=this.predecessors(e);if(t)return le(t,this.successors(e))}isLeaf(e){var t;return this.isDirected()?t=this.successors(e):t=this.neighbors(e),t.length===0}filterNodes(e){var t=new this.constructor({directed:this._isDirected,multigraph:this._isMultigraph,compound:this._isCompound});t.setGraph(this.graph());var i=this;f(this._nodes,function(h,u){e(u)&&t.setNode(u,h)}),f(this._edgeObjs,function(h){t.hasNode(h.v)&&t.hasNode(h.w)&&t.setEdge(h,i.edge(h))});var r={};function n(h){var u=i.parent(h);return u===void 0||t.hasNode(u)?(r[h]=u,u):u in r?r[u]:n(u)}return this._isCompound&&f(t.nodes(),function(h){t.setParent(h,n(h))}),t}setDefaultEdgeLabel(e){return w(e)||(e=p(e)),this._defaultEdgeLabelFn=e,this}edgeCount(){return this._edgeCount}edges(){return v(this._edgeObjs)}setPath(e,t){var i=this,r=arguments;return ae(e,function(n,h){return r.length>1?i.setEdge(n,h,t):i.setEdge(n,h),h}),this}setEdge(){var e,t,i,r,n=!1,h=arguments[0];typeof h=="object"&&h!==null&&"v"in h?(e=h.v,t=h.w,i=h.name,arguments.length===2&&(r=arguments[1],n=!0)):(e=h,t=arguments[1],i=arguments[3],arguments.length>2&&(r=arguments[2],n=!0)),e=""+e,t=""+t,g(i)||(i=""+i);var u=b(this._isDirected,e,t,i);if(d(this._edgeLabels,u))return n&&(this._edgeLabels[u]=r),this;if(!g(i)&&!this._isMultigraph)throw new Error("Cannot set a named edge when isMultigraph = false");this.setNode(e),this.setNode(t),this._edgeLabels[u]=n?r:this._defaultEdgeLabelFn(e,t,i);var a=ce(this._isDirected,e,t,i);return e=a.v,t=a.w,Object.freeze(a),this._edgeObjs[u]=a,P(this._preds[t],e),P(this._sucs[e],t),this._in[t][u]=a,this._out[e][u]=a,this._edgeCount++,this}edge(e,t,i){var r=arguments.length===1?C(this._isDirected,arguments[0]):b(this._isDirected,e,t,i);return this._edgeLabels[r]}hasEdge(e,t,i){var r=arguments.length===1?C(this._isDirected,arguments[0]):b(this._isDirected,e,t,i);return d(this._edgeLabels,r)}removeEdge(e,t,i){var r=arguments.length===1?C(this._isDirected,arguments[0]):b(this._isDirected,e,t,i),n=this._edgeObjs[r];return n&&(e=n.v,t=n.w,delete this._edgeLabels[r],delete this._edgeObjs[r],A(this._preds[t],e),A(this._sucs[e],t),delete this._in[t][r],delete this._out[e][r],this._edgeCount--),this}inEdges(e,t){var i=this._in[e];if(i){var r=v(i);return t?m(r,function(n){return n.v===t}):r}}outEdges(e,t){var i=this._out[e];if(i){var r=v(i);return t?m(r,function(n){return n.w===t}):r}}nodeEdges(e,t){var i=this.inEdges(e,t);if(i)return i.concat(this.outEdges(e,t))}}x.prototype._nodeCount=0;x.prototype._edgeCount=0;function P(s,e){s[e]?s[e]++:s[e]=1}function A(s,e){--s[e]||delete s[e]}function b(s,e,t,i){var r=""+e,n=""+t;if(!s&&r>n){var h=r;r=n,n=h}return r+y+n+y+(g(i)?ge:i)}function ce(s,e,t,i){var r=""+e,n=""+t;if(!s&&r>n){var h=r;r=n,n=h}var u={v:r,w:n};return i&&(u.name=i),u}function C(s,e){return b(s,e.v,e.w,e.name)}export{x as G,$ as a,L as b,te as c,m as d,f,d as h,ae as r,v};
