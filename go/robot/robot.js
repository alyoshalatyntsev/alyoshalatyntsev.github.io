// Go robot worker: KataGo human SL net via TensorFlow.js. Engine code from Web KaTrain (MIT, github.com/Sir-Teo/web-katrain); built from D:Desktopgo-robot.
(()=>{var XM=Object.create;var gp=Object.defineProperty;var YM=Object.getOwnPropertyDescriptor;var ZM=Object.getOwnPropertyNames;var QM=Object.getPrototypeOf,JM=Object.prototype.hasOwnProperty;var tP=(r,t,e)=>t in r?gp(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var _e=(r,t)=>()=>(t||r((t={exports:{}}).exports,t),t.exports),mo=(r,t)=>{for(var e in t)gp(r,e,{get:t[e],enumerable:!0})},eP=(r,t,e,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of ZM(t))!JM.call(r,n)&&n!==e&&gp(r,n,{get:()=>t[n],enumerable:!(o=YM(t,n))||o.enumerable});return r};var $u=(r,t,e)=>(e=r!=null?XM(QM(r)):{},eP(t||!r||!r.__esModule?gp(e,"default",{value:r,enumerable:!0}):e,r));var _t=(r,t,e)=>tP(r,typeof t!="symbol"?t+"":t,e);var zI=_e((k5,WI)=>{WI.exports=ae;var Or=null;try{Or=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}function ae(r,t,e){this.low=r|0,this.high=t|0,this.unsigned=!!e}ae.prototype.__isLong__;Object.defineProperty(ae.prototype,"__isLong__",{value:!0});function fr(r){return(r&&r.__isLong__)===!0}ae.isLong=fr;var $I={},MI={};function Ya(r,t){var e,o,n;return t?(r>>>=0,(n=0<=r&&r<256)&&(o=MI[r],o)?o:(e=ie(r,(r|0)<0?-1:0,!0),n&&(MI[r]=e),e)):(r|=0,(n=-128<=r&&r<128)&&(o=$I[r],o)?o:(e=ie(r,r<0?-1:0,!1),n&&($I[r]=e),e))}ae.fromInt=Ya;function Br(r,t){if(isNaN(r))return t?Xa:Lr;if(t){if(r<0)return Xa;if(r>=LI)return VI}else{if(r<=-OI)return dr;if(r+1>=OI)return GI}return r<0?Br(-r,t).neg():ie(r%$l|0,r/$l|0,t)}ae.fromNumber=Br;function ie(r,t,e){return new ae(r,t,e)}ae.fromBits=ie;var Ap=Math.pow;function $x(r,t,e){if(r.length===0)throw Error("empty string");if(r==="NaN"||r==="Infinity"||r==="+Infinity"||r==="-Infinity")return Lr;if(typeof t=="number"?(e=t,t=!1):t=!!t,e=e||10,e<2||36<e)throw RangeError("radix");var o;if((o=r.indexOf("-"))>0)throw Error("interior hyphen");if(o===0)return $x(r.substring(1),t,e).neg();for(var n=Br(Ap(e,8)),s=Lr,i=0;i<r.length;i+=8){var l=Math.min(8,r.length-i),u=parseInt(r.substring(i,i+l),e);if(l<8){var a=Br(Ap(e,l));s=s.mul(a).add(Br(u))}else s=s.mul(n),s=s.add(Br(u))}return s.unsigned=t,s}ae.fromString=$x;function to(r,t){return typeof r=="number"?Br(r,t):typeof r=="string"?$x(r,t):ie(r.low,r.high,typeof t=="boolean"?t:r.unsigned)}ae.fromValue=to;var PI=65536,_P=1<<24,$l=PI*PI,LI=$l*$l,OI=LI/2,BI=Ya(_P),Lr=Ya(0);ae.ZERO=Lr;var Xa=Ya(0,!0);ae.UZERO=Xa;var Fl=Ya(1);ae.ONE=Fl;var UI=Ya(1,!0);ae.UONE=UI;var Fx=Ya(-1);ae.NEG_ONE=Fx;var GI=ie(-1,2147483647,!1);ae.MAX_VALUE=GI;var VI=ie(-1,-1,!0);ae.MAX_UNSIGNED_VALUE=VI;var dr=ie(0,-2147483648,!1);ae.MIN_VALUE=dr;var it=ae.prototype;it.toInt=function(){return this.unsigned?this.low>>>0:this.low};it.toNumber=function(){return this.unsigned?(this.high>>>0)*$l+(this.low>>>0):this.high*$l+(this.low>>>0)};it.toString=function(t){if(t=t||10,t<2||36<t)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(dr)){var e=Br(t),o=this.div(e),n=o.mul(e).sub(this);return o.toString(t)+n.toInt().toString(t)}else return"-"+this.neg().toString(t);for(var s=Br(Ap(t,6),this.unsigned),i=this,l="";;){var u=i.div(s),a=i.sub(u.mul(s)).toInt()>>>0,c=a.toString(t);if(i=u,i.isZero())return c+l;for(;c.length<6;)c="0"+c;l=""+c+l}};it.getHighBits=function(){return this.high};it.getHighBitsUnsigned=function(){return this.high>>>0};it.getLowBits=function(){return this.low};it.getLowBitsUnsigned=function(){return this.low>>>0};it.getNumBitsAbs=function(){if(this.isNegative())return this.eq(dr)?64:this.neg().getNumBitsAbs();for(var t=this.high!=0?this.high:this.low,e=31;e>0&&!(t&1<<e);e--);return this.high!=0?e+33:e+1};it.isZero=function(){return this.high===0&&this.low===0};it.eqz=it.isZero;it.isNegative=function(){return!this.unsigned&&this.high<0};it.isPositive=function(){return this.unsigned||this.high>=0};it.isOdd=function(){return(this.low&1)===1};it.isEven=function(){return(this.low&1)===0};it.equals=function(t){return fr(t)||(t=to(t)),this.unsigned!==t.unsigned&&this.high>>>31===1&&t.high>>>31===1?!1:this.high===t.high&&this.low===t.low};it.eq=it.equals;it.notEquals=function(t){return!this.eq(t)};it.neq=it.notEquals;it.ne=it.notEquals;it.lessThan=function(t){return this.comp(t)<0};it.lt=it.lessThan;it.lessThanOrEqual=function(t){return this.comp(t)<=0};it.lte=it.lessThanOrEqual;it.le=it.lessThanOrEqual;it.greaterThan=function(t){return this.comp(t)>0};it.gt=it.greaterThan;it.greaterThanOrEqual=function(t){return this.comp(t)>=0};it.gte=it.greaterThanOrEqual;it.ge=it.greaterThanOrEqual;it.compare=function(t){if(fr(t)||(t=to(t)),this.eq(t))return 0;var e=this.isNegative(),o=t.isNegative();return e&&!o?-1:!e&&o?1:this.unsigned?t.high>>>0>this.high>>>0||t.high===this.high&&t.low>>>0>this.low>>>0?-1:1:this.sub(t).isNegative()?-1:1};it.comp=it.compare;it.negate=function(){return!this.unsigned&&this.eq(dr)?dr:this.not().add(Fl)};it.neg=it.negate;it.add=function(t){fr(t)||(t=to(t));var e=this.high>>>16,o=this.high&65535,n=this.low>>>16,s=this.low&65535,i=t.high>>>16,l=t.high&65535,u=t.low>>>16,a=t.low&65535,c=0,p=0,m=0,d=0;return d+=s+a,m+=d>>>16,d&=65535,m+=n+u,p+=m>>>16,m&=65535,p+=o+l,c+=p>>>16,p&=65535,c+=e+i,c&=65535,ie(m<<16|d,c<<16|p,this.unsigned)};it.subtract=function(t){return fr(t)||(t=to(t)),this.add(t.neg())};it.sub=it.subtract;it.multiply=function(t){if(this.isZero())return Lr;if(fr(t)||(t=to(t)),Or){var e=Or.mul(this.low,this.high,t.low,t.high);return ie(e,Or.get_high(),this.unsigned)}if(t.isZero())return Lr;if(this.eq(dr))return t.isOdd()?dr:Lr;if(t.eq(dr))return this.isOdd()?dr:Lr;if(this.isNegative())return t.isNegative()?this.neg().mul(t.neg()):this.neg().mul(t).neg();if(t.isNegative())return this.mul(t.neg()).neg();if(this.lt(BI)&&t.lt(BI))return Br(this.toNumber()*t.toNumber(),this.unsigned);var o=this.high>>>16,n=this.high&65535,s=this.low>>>16,i=this.low&65535,l=t.high>>>16,u=t.high&65535,a=t.low>>>16,c=t.low&65535,p=0,m=0,d=0,f=0;return f+=i*c,d+=f>>>16,f&=65535,d+=s*c,m+=d>>>16,d&=65535,d+=i*a,m+=d>>>16,d&=65535,m+=n*c,p+=m>>>16,m&=65535,m+=s*a,p+=m>>>16,m&=65535,m+=i*u,p+=m>>>16,m&=65535,p+=o*c+n*a+s*u+i*l,p&=65535,ie(d<<16|f,p<<16|m,this.unsigned)};it.mul=it.multiply;it.divide=function(t){if(fr(t)||(t=to(t)),t.isZero())throw Error("division by zero");if(Or){if(!this.unsigned&&this.high===-2147483648&&t.low===-1&&t.high===-1)return this;var e=(this.unsigned?Or.div_u:Or.div_s)(this.low,this.high,t.low,t.high);return ie(e,Or.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?Xa:Lr;var o,n,s;if(this.unsigned){if(t.unsigned||(t=t.toUnsigned()),t.gt(this))return Xa;if(t.gt(this.shru(1)))return UI;s=Xa}else{if(this.eq(dr)){if(t.eq(Fl)||t.eq(Fx))return dr;if(t.eq(dr))return Fl;var i=this.shr(1);return o=i.div(t).shl(1),o.eq(Lr)?t.isNegative()?Fl:Fx:(n=this.sub(t.mul(o)),s=o.add(n.div(t)),s)}else if(t.eq(dr))return this.unsigned?Xa:Lr;if(this.isNegative())return t.isNegative()?this.neg().div(t.neg()):this.neg().div(t).neg();if(t.isNegative())return this.div(t.neg()).neg();s=Lr}for(n=this;n.gte(t);){o=Math.max(1,Math.floor(n.toNumber()/t.toNumber()));for(var l=Math.ceil(Math.log(o)/Math.LN2),u=l<=48?1:Ap(2,l-48),a=Br(o),c=a.mul(t);c.isNegative()||c.gt(n);)o-=u,a=Br(o,this.unsigned),c=a.mul(t);a.isZero()&&(a=Fl),s=s.add(a),n=n.sub(c)}return s};it.div=it.divide;it.modulo=function(t){if(fr(t)||(t=to(t)),Or){var e=(this.unsigned?Or.rem_u:Or.rem_s)(this.low,this.high,t.low,t.high);return ie(e,Or.get_high(),this.unsigned)}return this.sub(this.div(t).mul(t))};it.mod=it.modulo;it.rem=it.modulo;it.not=function(){return ie(~this.low,~this.high,this.unsigned)};it.and=function(t){return fr(t)||(t=to(t)),ie(this.low&t.low,this.high&t.high,this.unsigned)};it.or=function(t){return fr(t)||(t=to(t)),ie(this.low|t.low,this.high|t.high,this.unsigned)};it.xor=function(t){return fr(t)||(t=to(t)),ie(this.low^t.low,this.high^t.high,this.unsigned)};it.shiftLeft=function(t){return fr(t)&&(t=t.toInt()),(t&=63)===0?this:t<32?ie(this.low<<t,this.high<<t|this.low>>>32-t,this.unsigned):ie(0,this.low<<t-32,this.unsigned)};it.shl=it.shiftLeft;it.shiftRight=function(t){return fr(t)&&(t=t.toInt()),(t&=63)===0?this:t<32?ie(this.low>>>t|this.high<<32-t,this.high>>t,this.unsigned):ie(this.high>>t-32,this.high>=0?0:-1,this.unsigned)};it.shr=it.shiftRight;it.shiftRightUnsigned=function(t){if(fr(t)&&(t=t.toInt()),t&=63,t===0)return this;var e=this.high;if(t<32){var o=this.low;return ie(o>>>t|e<<32-t,e>>>t,this.unsigned)}else return t===32?ie(e,0,this.unsigned):ie(e>>>t-32,0,this.unsigned)};it.shru=it.shiftRightUnsigned;it.shr_u=it.shiftRightUnsigned;it.toSigned=function(){return this.unsigned?ie(this.low,this.high,!1):this};it.toUnsigned=function(){return this.unsigned?this:ie(this.low,this.high,!0)};it.toBytes=function(t){return t?this.toBytesLE():this.toBytesBE()};it.toBytesLE=function(){var t=this.high,e=this.low;return[e&255,e>>>8&255,e>>>16&255,e>>>24,t&255,t>>>8&255,t>>>16&255,t>>>24]};it.toBytesBE=function(){var t=this.high,e=this.low;return[t>>>24,t>>>16&255,t>>>8&255,t&255,e>>>24,e>>>16&255,e>>>8&255,e&255]};ae.fromBytes=function(t,e,o){return o?ae.fromBytesLE(t,e):ae.fromBytesBE(t,e)};ae.fromBytesLE=function(t,e){return new ae(t[0]|t[1]<<8|t[2]<<16|t[3]<<24,t[4]|t[5]<<8|t[6]<<16|t[7]<<24,e)};ae.fromBytesBE=function(t,e){return new ae(t[4]<<24|t[5]<<16|t[6]<<8|t[7],t[0]<<24|t[1]<<16|t[2]<<8|t[3],e)}});var Cw=_e(()=>{});var Iw=_e(()=>{});var pv=_e((cv,Nb)=>{(function(r,t,e){function o(l){var u=this,a=i();u.next=function(){var c=2091639*u.s0+u.c*23283064365386963e-26;return u.s0=u.s1,u.s1=u.s2,u.s2=c-(u.c=c|0)},u.c=1,u.s0=a(" "),u.s1=a(" "),u.s2=a(" "),u.s0-=a(l),u.s0<0&&(u.s0+=1),u.s1-=a(l),u.s1<0&&(u.s1+=1),u.s2-=a(l),u.s2<0&&(u.s2+=1),a=null}function n(l,u){return u.c=l.c,u.s0=l.s0,u.s1=l.s1,u.s2=l.s2,u}function s(l,u){var a=new o(l),c=u&&u.state,p=a.next;return p.int32=function(){return a.next()*4294967296|0},p.double=function(){return p()+(p()*2097152|0)*11102230246251565e-32},p.quick=p,c&&(typeof c=="object"&&n(c,a),p.state=function(){return n(a,{})}),p}function i(){var l=4022871197,u=function(a){a=String(a);for(var c=0;c<a.length;c++){l+=a.charCodeAt(c);var p=.02519603282416938*l;l=p>>>0,p-=l,p*=l,l=p>>>0,p-=l,l+=p*4294967296}return(l>>>0)*23283064365386963e-26};return u}t&&t.exports?t.exports=s:e&&e.amd?e(function(){return s}):this.alea=s})(cv,typeof Nb=="object"&&Nb,typeof define=="function"&&define)});var dv=_e((mv,Ab)=>{(function(r,t,e){function o(i){var l=this,u="";l.x=0,l.y=0,l.z=0,l.w=0,l.next=function(){var c=l.x^l.x<<11;return l.x=l.y,l.y=l.z,l.z=l.w,l.w^=l.w>>>19^c^c>>>8},i===(i|0)?l.x=i:u+=i;for(var a=0;a<u.length+64;a++)l.x^=u.charCodeAt(a)|0,l.next()}function n(i,l){return l.x=i.x,l.y=i.y,l.z=i.z,l.w=i.w,l}function s(i,l){var u=new o(i),a=l&&l.state,c=function(){return(u.next()>>>0)/4294967296};return c.double=function(){do var p=u.next()>>>11,m=(u.next()>>>0)/4294967296,d=(p+m)/(1<<21);while(d===0);return d},c.int32=u.next,c.quick=c,a&&(typeof a=="object"&&n(a,u),c.state=function(){return n(u,{})}),c}t&&t.exports?t.exports=s:e&&e.amd?e(function(){return s}):this.xor128=s})(mv,typeof Ab=="object"&&Ab,typeof define=="function"&&define)});var hv=_e((fv,Eb)=>{(function(r,t,e){function o(i){var l=this,u="";l.next=function(){var c=l.x^l.x>>>2;return l.x=l.y,l.y=l.z,l.z=l.w,l.w=l.v,(l.d=l.d+362437|0)+(l.v=l.v^l.v<<4^(c^c<<1))|0},l.x=0,l.y=0,l.z=0,l.w=0,l.v=0,i===(i|0)?l.x=i:u+=i;for(var a=0;a<u.length+64;a++)l.x^=u.charCodeAt(a)|0,a==u.length&&(l.d=l.x<<10^l.x>>>4),l.next()}function n(i,l){return l.x=i.x,l.y=i.y,l.z=i.z,l.w=i.w,l.v=i.v,l.d=i.d,l}function s(i,l){var u=new o(i),a=l&&l.state,c=function(){return(u.next()>>>0)/4294967296};return c.double=function(){do var p=u.next()>>>11,m=(u.next()>>>0)/4294967296,d=(p+m)/(1<<21);while(d===0);return d},c.int32=u.next,c.quick=c,a&&(typeof a=="object"&&n(a,u),c.state=function(){return n(u,{})}),c}t&&t.exports?t.exports=s:e&&e.amd?e(function(){return s}):this.xorwow=s})(fv,typeof Eb=="object"&&Eb,typeof define=="function"&&define)});var xv=_e((gv,Rb)=>{(function(r,t,e){function o(i){var l=this;l.next=function(){var a=l.x,c=l.i,p,m,d;return p=a[c],p^=p>>>7,m=p^p<<24,p=a[c+1&7],m^=p^p>>>10,p=a[c+3&7],m^=p^p>>>3,p=a[c+4&7],m^=p^p<<7,p=a[c+7&7],p=p^p<<13,m^=p^p<<9,a[c]=m,l.i=c+1&7,m};function u(a,c){var p,m,d=[];if(c===(c|0))m=d[0]=c;else for(c=""+c,p=0;p<c.length;++p)d[p&7]=d[p&7]<<15^c.charCodeAt(p)+d[p+1&7]<<13;for(;d.length<8;)d.push(0);for(p=0;p<8&&d[p]===0;++p);for(p==8?m=d[7]=-1:m=d[p],a.x=d,a.i=0,p=256;p>0;--p)a.next()}u(l,i)}function n(i,l){return l.x=i.x.slice(),l.i=i.i,l}function s(i,l){i==null&&(i=+new Date);var u=new o(i),a=l&&l.state,c=function(){return(u.next()>>>0)/4294967296};return c.double=function(){do var p=u.next()>>>11,m=(u.next()>>>0)/4294967296,d=(p+m)/(1<<21);while(d===0);return d},c.int32=u.next,c.quick=c,a&&(a.x&&n(a,u),c.state=function(){return n(u,{})}),c}t&&t.exports?t.exports=s:e&&e.amd?e(function(){return s}):this.xorshift7=s})(gv,typeof Rb=="object"&&Rb,typeof define=="function"&&define)});var yv=_e((bv,Db)=>{(function(r,t,e){function o(i){var l=this;l.next=function(){var a=l.w,c=l.X,p=l.i,m,d;return l.w=a=a+1640531527|0,d=c[p+34&127],m=c[p=p+1&127],d^=d<<13,m^=m<<17,d^=d>>>15,m^=m>>>12,d=c[p]=d^m,l.i=p,d+(a^a>>>16)|0};function u(a,c){var p,m,d,f,h,g=[],x=128;for(c===(c|0)?(m=c,c=null):(c=c+"\0",m=0,x=Math.max(x,c.length)),d=0,f=-32;f<x;++f)c&&(m^=c.charCodeAt((f+32)%c.length)),f===0&&(h=m),m^=m<<10,m^=m>>>15,m^=m<<4,m^=m>>>13,f>=0&&(h=h+1640531527|0,p=g[f&127]^=m+h,d=p==0?d+1:0);for(d>=128&&(g[(c&&c.length||0)&127]=-1),d=127,f=4*128;f>0;--f)m=g[d+34&127],p=g[d=d+1&127],m^=m<<13,p^=p<<17,m^=m>>>15,p^=p>>>12,g[d]=m^p;a.w=h,a.X=g,a.i=d}u(l,i)}function n(i,l){return l.i=i.i,l.w=i.w,l.X=i.X.slice(),l}function s(i,l){i==null&&(i=+new Date);var u=new o(i),a=l&&l.state,c=function(){return(u.next()>>>0)/4294967296};return c.double=function(){do var p=u.next()>>>11,m=(u.next()>>>0)/4294967296,d=(p+m)/(1<<21);while(d===0);return d},c.int32=u.next,c.quick=c,a&&(a.X&&n(a,u),c.state=function(){return n(u,{})}),c}t&&t.exports?t.exports=s:e&&e.amd?e(function(){return s}):this.xor4096=s})(bv,typeof Db=="object"&&Db,typeof define=="function"&&define)});var Iv=_e((Cv,Fb)=>{(function(r,t,e){function o(i){var l=this,u="";l.next=function(){var c=l.b,p=l.c,m=l.d,d=l.a;return c=c<<25^c>>>7^p,p=p-m|0,m=m<<24^m>>>8^d,d=d-c|0,l.b=c=c<<20^c>>>12^p,l.c=p=p-m|0,l.d=m<<16^p>>>16^d,l.a=d-c|0},l.a=0,l.b=0,l.c=-1640531527,l.d=1367130551,i===Math.floor(i)?(l.a=i/4294967296|0,l.b=i|0):u+=i;for(var a=0;a<u.length+20;a++)l.b^=u.charCodeAt(a)|0,l.next()}function n(i,l){return l.a=i.a,l.b=i.b,l.c=i.c,l.d=i.d,l}function s(i,l){var u=new o(i),a=l&&l.state,c=function(){return(u.next()>>>0)/4294967296};return c.double=function(){do var p=u.next()>>>11,m=(u.next()>>>0)/4294967296,d=(p+m)/(1<<21);while(d===0);return d},c.int32=u.next,c.quick=c,a&&(typeof a=="object"&&n(a,u),c.state=function(){return n(u,{})}),c}t&&t.exports?t.exports=s:e&&e.amd?e(function(){return s}):this.tychei=s})(Cv,typeof Fb=="object"&&Fb,typeof define=="function"&&define)});var wv=_e(()=>{});var Sv=_e((vv,im)=>{(function(r,t,e){var o=256,n=6,s=52,i="random",l=e.pow(o,n),u=e.pow(2,s),a=u*2,c=o-1,p;function m(C,I,v){var S=[];I=I==!0?{entropy:!0}:I||{};var k=g(h(I.entropy?[C,y(t)]:C??x(),3),S),A=new d(S),D=function(){for(var F=A.g(n),M=l,B=0;F<u;)F=(F+B)*o,M*=o,B=A.g(1);for(;F>=a;)F/=2,M/=2,B>>>=1;return(F+B)/M};return D.int32=function(){return A.g(4)|0},D.quick=function(){return A.g(4)/4294967296},D.double=D,g(y(A.S),t),(I.pass||v||function(F,M,B,U){return U&&(U.S&&f(U,A),F.state=function(){return f(A,{})}),B?(e[i]=F,M):F})(D,k,"global"in I?I.global:this==e,I.state)}function d(C){var I,v=C.length,S=this,k=0,A=S.i=S.j=0,D=S.S=[];for(v||(C=[v++]);k<o;)D[k]=k++;for(k=0;k<o;k++)D[k]=D[A=c&A+C[k%v]+(I=D[k])],D[A]=I;(S.g=function(F){for(var M,B=0,U=S.i,P=S.j,L=S.S;F--;)M=L[U=c&U+1],B=B*o+L[c&(L[U]=L[P=c&P+M])+(L[P]=M)];return S.i=U,S.j=P,B})(o)}function f(C,I){return I.i=C.i,I.j=C.j,I.S=C.S.slice(),I}function h(C,I){var v=[],S=typeof C,k;if(I&&S=="object")for(k in C)try{v.push(h(C[k],I-1))}catch{}return v.length?v:S=="string"?C:C+"\0"}function g(C,I){for(var v=C+"",S,k=0;k<v.length;)I[c&k]=c&(S^=I[c&k]*19)+v.charCodeAt(k++);return y(I)}function x(){try{var C;return p&&(C=p.randomBytes)?C=C(o):(C=new Uint8Array(o),(r.crypto||r.msCrypto).getRandomValues(C)),y(C)}catch{var I=r.navigator,v=I&&I.plugins;return[+new Date,r,v,r.screen,y(t)]}}function y(C){return String.fromCharCode.apply(0,C)}if(g(e.random(),t),typeof im=="object"&&im.exports){im.exports=m;try{p=wv()}catch{}}else typeof define=="function"&&define.amd?define(function(){return m}):e["seed"+i]=m})(typeof self<"u"?self:vv,[],Math)});var Tv=_e((bat,kv)=>{var pL=pv(),mL=dv(),dL=hv(),fL=xv(),hL=yv(),gL=Iv(),ui=Sv();ui.alea=pL;ui.xor128=mL;ui.xorwow=dL;ui.xorshift7=fL;ui.xor4096=hL;ui.tychei=gL;kv.exports=ui});var RC=_e(()=>{});var DC=_e(()=>{});var _$=_e(()=>{});var N$=_e(()=>{});var A$=_e(()=>{});var E$=_e((_f,$C)=>{var FC=(()=>{var r=typeof document<"u"&&document.currentScript?document.currentScript.src:void 0;return typeof __filename<"u"&&(r=r||__filename),function(t){t=t||{};function e(){return Q.buffer!=Tt&&ce(Q.buffer),Wt}function o(){return Q.buffer!=Tt&&ce(Q.buffer),Ut}function n(){return Q.buffer!=Tt&&ce(Q.buffer),Xt}function s(){return Q.buffer!=Tt&&ce(Q.buffer),cr}function i(){return Q.buffer!=Tt&&ce(Q.buffer),xe}function l(){return Q.buffer!=Tt&&ce(Q.buffer),kr}function u(){return Q.buffer!=Tt&&ce(Q.buffer),Me}var a=typeof t<"u"?t:{},c,p;a.ready=new Promise(function(R,G){c=R,p=G});var m;typeof process<"u"&&process.listeners&&(m={uncaughtException:process.listeners("uncaughtException"),unhandledRejection:process.listeners("unhandledRejection")});var d=Object.assign({},a),f=[],h="./this.program",g=(R,G)=>{throw G},x=typeof window=="object",y=typeof importScripts=="function",C=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string",I=a.ENVIRONMENT_IS_PTHREAD||!1,v="";function S(R){return a.locateFile?a.locateFile(R,v):v+R}var k,A,D,F;function M(R){if(R instanceof ga)return;V("exiting due to exception: "+R)}if(C){var B=RC(),U=DC();y?v=U.dirname(v)+"/":v=__dirname+"/",k=(G,nt)=>(G=Hi(G)?new URL(G):U.normalize(G),B.readFileSync(G,nt?void 0:"utf8")),D=G=>{var nt=k(G,!0);return nt.buffer||(nt=new Uint8Array(nt)),nt},A=(G,nt,St)=>{G=Hi(G)?new URL(G):U.normalize(G),B.readFile(G,function(Dt,At){Dt?St(Dt):nt(At.buffer)})},process.argv.length>1&&(h=process.argv[1].replace(/\\/g,"/")),f=process.argv.slice(2),process.on("uncaughtException",function(G){if(!(G instanceof ga))throw G}),process.on("unhandledRejection",function(G){throw G}),g=(G,nt)=>{if(jr())throw process.exitCode=G,nt;M(nt),process.exit(G)},a.inspect=function(){return"[Emscripten Module object]"};let R;try{R=_$()}catch(G){throw console.error('The "worker_threads" module is not supported in this node.js build - perhaps a newer version is needed?'),G}global.Worker=R.Worker}else(x||y)&&(y?v=self.location.href:typeof document<"u"&&document.currentScript&&(v=document.currentScript.src),typeof r<"u"&&r&&(v=r),v.indexOf("blob:")!==0?v=v.substr(0,v.replace(/[?#].*/,"").lastIndexOf("/")+1):v="",C||(k=R=>{var G=new XMLHttpRequest;return G.open("GET",R,!1),G.send(null),G.responseText},y&&(D=R=>{var G=new XMLHttpRequest;return G.open("GET",R,!1),G.responseType="arraybuffer",G.send(null),new Uint8Array(G.response)}),A=(R,G,nt)=>{var St=new XMLHttpRequest;St.open("GET",R,!0),St.responseType="arraybuffer",St.onload=()=>{if(St.status==200||St.status==0&&St.response){G(St.response);return}nt()},St.onerror=nt,St.send(null)}),F=R=>document.title=R);C&&typeof performance>"u"&&(global.performance=N$().performance);var P=console.log.bind(console),L=console.warn.bind(console);C&&(P=R=>B.writeSync(1,R+`
`),L=R=>B.writeSync(2,R+`
`));var z=a.print||P,V=a.printErr||L;Object.assign(a,d),d=null,a.arguments&&(f=a.arguments),a.thisProgram&&(h=a.thisProgram),a.quit&&(g=a.quit);var W=4,q=Atomics.load,X=Atomics.store,J=Atomics.compareExchange,tt;a.wasmBinary&&(tt=a.wasmBinary);var Y=a.noExitRuntime||!0;typeof WebAssembly!="object"&&ha("no native wasm support detected");var Q,ot,at=!1,st;function mt(R,G){R||ha(G)}var dt=typeof TextDecoder<"u"?new TextDecoder("utf8"):void 0;function It(R,G,nt){G>>>=0;for(var St=G+nt,Dt=G;R[Dt]&&!(Dt>=St);)++Dt;if(Dt-G>16&&R.buffer&&dt)return dt.decode(R.buffer instanceof SharedArrayBuffer?R.slice(G,Dt):R.subarray(G,Dt));for(var At="";G<Dt;){var ct=R[G++];if(!(ct&128)){At+=String.fromCharCode(ct);continue}var bt=R[G++]&63;if((ct&224)==192){At+=String.fromCharCode((ct&31)<<6|bt);continue}var he=R[G++]&63;if((ct&240)==224?ct=(ct&15)<<12|bt<<6|he:ct=(ct&7)<<18|bt<<12|he<<6|R[G++]&63,ct<65536)At+=String.fromCharCode(ct);else{var Ar=ct-65536;At+=String.fromCharCode(55296|Ar>>10,56320|Ar&1023)}}return At}function wt(R,G){return R>>>=0,R?It(o(),R,G):""}function Rt(R,G,nt,St){if(nt>>>=0,!(St>0))return 0;for(var Dt=nt,At=nt+St-1,ct=0;ct<R.length;++ct){var bt=R.charCodeAt(ct);if(bt>=55296&&bt<=57343){var he=R.charCodeAt(++ct);bt=65536+((bt&1023)<<10)|he&1023}if(bt<=127){if(nt>=At)break;G[nt++>>>0]=bt}else if(bt<=2047){if(nt+1>=At)break;G[nt++>>>0]=192|bt>>6,G[nt++>>>0]=128|bt&63}else if(bt<=65535){if(nt+2>=At)break;G[nt++>>>0]=224|bt>>12,G[nt++>>>0]=128|bt>>6&63,G[nt++>>>0]=128|bt&63}else{if(nt+3>=At)break;G[nt++>>>0]=240|bt>>18,G[nt++>>>0]=128|bt>>12&63,G[nt++>>>0]=128|bt>>6&63,G[nt++>>>0]=128|bt&63}}return G[nt>>>0]=0,nt-Dt}function Ot(R,G,nt){return Rt(R,o(),G,nt)}var Tt,Wt,Ut,Xt,Zt,cr,xe,kr,Me;I&&(Tt=a.buffer);function ce(R){Tt=R,a.HEAP8=Wt=new Int8Array(R),a.HEAP16=Xt=new Int16Array(R),a.HEAP32=cr=new Int32Array(R),a.HEAPU8=Ut=new Uint8Array(R),a.HEAPU16=Zt=new Uint16Array(R),a.HEAPU32=xe=new Uint32Array(R),a.HEAPF32=kr=new Float32Array(R),a.HEAPF64=Me=new Float64Array(R)}var Pe=a.INITIAL_MEMORY||16777216;if(I)Q=a.wasmMemory,Tt=a.buffer;else if(a.wasmMemory)Q=a.wasmMemory;else if(Q=new WebAssembly.Memory({initial:Pe/65536,maximum:65536,shared:!0}),!(Q.buffer instanceof SharedArrayBuffer))throw V("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"),C&&V("(on node you may need: --experimental-wasm-threads --experimental-wasm-bulk-memory and/or recent version)"),Error("bad memory");Q&&(Tt=Q.buffer),Pe=Tt.byteLength,ce(Tt);var Oe,Tr=[],_r=[],Ve=[],Ao=!1;function jr(){return Y}function po(){if(a.preRun)for(typeof a.preRun=="function"&&(a.preRun=[a.preRun]);a.preRun.length;)ku(a.preRun.shift());Nu(Tr)}function Ae(){Ao=!0,!I&&Nu(_r)}function Eo(){if(!I){if(a.postRun)for(typeof a.postRun=="function"&&(a.postRun=[a.postRun]);a.postRun.length;)pI(a.postRun.shift());Nu(Ve)}}function ku(R){Tr.unshift(R)}function Tu(R){_r.unshift(R)}function pI(R){Ve.unshift(R)}var _s=0,zi=null,Ro=null;function Hf(R){_s++,a.monitorRunDependencies&&a.monitorRunDependencies(_s)}function Wc(R){if(_s--,a.monitorRunDependencies&&a.monitorRunDependencies(_s),_s==0&&(zi!==null&&(clearInterval(zi),zi=null),Ro)){var G=Ro;Ro=null,G()}}function ha(R){a.onAbort&&a.onAbort(R),R="Aborted("+R+")",V(R),at=!0,st=1,R+=". Build with -sASSERTIONS for more info.";var G=new WebAssembly.RuntimeError(R);throw p(G),G}var Kf="data:application/octet-stream;base64,";function zc(R){return R.startsWith(Kf)}function Hi(R){return R.startsWith("file://")}var We;We="tfjs-backend-wasm-threaded-simd.wasm",zc(We)||(We=S(We));function Hc(R){try{if(R==We&&tt)return new Uint8Array(tt);if(D)return D(R);throw"both async and sync fetching of the wasm failed"}catch(G){ha(G)}}function qf(){if(!tt&&(x||y)){if(typeof fetch=="function"&&!Hi(We))return fetch(We,{credentials:"same-origin"}).then(function(R){if(!R.ok)throw"failed to load wasm binary file at '"+We+"'";return R.arrayBuffer()}).catch(function(){return Hc(We)});if(A)return new Promise(function(R,G){A(We,function(nt){R(new Uint8Array(nt))},G)})}return Promise.resolve().then(function(){return Hc(We)})}function jf(){var R={env:np,wasi_snapshot_preview1:np};function G(ct,bt){var he=ct.exports;if(a.asm=he,oh(a.asm._emscripten_tls_init),Oe=a.asm.__indirect_function_table,Tu(a.asm.__wasm_call_ctors),ot=bt,!I){var Ar=Nt.unusedWorkers.length;Nt.unusedWorkers.forEach(function(Fo){Nt.loadWasmModuleToWorker(Fo,function(){--Ar||Wc("wasm-instantiate")})})}}I||Hf("wasm-instantiate");function nt(ct){G(ct.instance,ct.module)}function St(ct){return qf().then(function(bt){return WebAssembly.instantiate(bt,R)}).then(function(bt){return bt}).then(ct,function(bt){V("failed to asynchronously prepare wasm: "+bt),ha(bt)})}function Dt(){return!tt&&typeof WebAssembly.instantiateStreaming=="function"&&!zc(We)&&!Hi(We)&&!C&&typeof fetch=="function"?fetch(We,{credentials:"same-origin"}).then(function(ct){var bt=WebAssembly.instantiateStreaming(ct,R);return bt.then(nt,function(he){return V("wasm streaming compile failed: "+he),V("falling back to ArrayBuffer instantiation"),St(nt)})}):St(nt)}if(a.instantiateWasm)try{var At=a.instantiateWasm(R,G);return At}catch(ct){V("Module.instantiateWasm callback failed with error: "+ct),p(ct)}return Dt().catch(p),{}}var mI,dI,Kc={};function ga(R){this.name="ExitStatus",this.message="Program terminated with exit("+R+")",this.status=R}function Xf(R){var G=Nt.pthreads[R];delete Nt.pthreads[R],G.terminate(),yx(R),Nt.runningWorkers.splice(Nt.runningWorkers.indexOf(G),1),G.pthread_ptr=0}function Yf(R){var G=Nt.pthreads[R];G.postMessage({cmd:"cancel"})}function _u(R){var G=Nt.pthreads[R];mt(G),Nt.returnWorkerToPool(G)}function Zf(R){var G=Nt.getNewWorker();if(!G)return 6;Nt.runningWorkers.push(G),Nt.pthreads[R.pthread_ptr]=G,G.pthread_ptr=R.pthread_ptr;var nt={cmd:"run",start_routine:R.startRoutine,arg:R.arg,pthread_ptr:R.pthread_ptr};return G.runPthread=()=>{C&&G.ref(),G.postMessage(nt,R.transferList),delete G.runPthread},G.loaded&&G.runPthread(),0}var qc={varargs:void 0,get:function(){qc.varargs+=4;var R=s()[qc.varargs-4>>>2];return R},getStr:function(R){var G=wt(R);return G}};function jc(R){if(I)return Ns(1,1,R);st=R,jr()||(Nt.terminateAllThreads(),a.onExit&&a.onExit(R),at=!0),g(R,new ga(R))}function Qf(R,G){if(st=R,!G&&I)throw Yc(R),"unwind";jc(R)}var Xc=Qf;function Jf(R){if(R instanceof ga||R=="unwind")return st;g(1,R)}var Nt={unusedWorkers:[],runningWorkers:[],tlsInitFunctions:[],pthreads:{},init:function(){I?Nt.initWorker():Nt.initMainThread()},initMainThread:function(){for(var R=8;R--;)Nt.allocateUnusedWorker()},initWorker:function(){Y=!1},setExitStatus:function(R){st=R},terminateAllThreads:function(){for(var R of Object.values(Nt.pthreads))Nt.returnWorkerToPool(R);for(var R of Nt.unusedWorkers)R.terminate();Nt.unusedWorkers=[]},returnWorkerToPool:function(R){var G=R.pthread_ptr;delete Nt.pthreads[G],Nt.unusedWorkers.push(R),Nt.runningWorkers.splice(Nt.runningWorkers.indexOf(R),1),R.pthread_ptr=0,C&&R.unref(),yx(G)},receiveObjectTransfer:function(R){},threadInitTLS:function(){Nt.tlsInitFunctions.forEach(R=>R())},loadWasmModuleToWorker:function(R,G){R.onmessage=At=>{var ct=At.data,bt=ct.cmd;if(R.pthread_ptr&&(Nt.currentProxiedOperationCallerThread=R.pthread_ptr),ct.targetThread&&ct.targetThread!=cp()){var he=Nt.pthreads[ct.targetThread];he?he.postMessage(ct,ct.transferList):V('Internal error! Worker sent a message "'+bt+'" to target pthread '+ct.targetThread+", but that thread no longer exists!"),Nt.currentProxiedOperationCallerThread=void 0;return}bt==="processProxyingQueue"?Au(ct.queue):bt==="spawnThread"?Zf(ct):bt==="cleanupThread"?_u(ct.thread):bt==="killThread"?Xf(ct.thread):bt==="cancelThread"?Yf(ct.thread):bt==="loaded"?(R.loaded=!0,C&&R.unref(),G&&G(R),R.runPthread&&R.runPthread()):bt==="print"?z("Thread "+ct.threadId+": "+ct.text):bt==="printErr"?V("Thread "+ct.threadId+": "+ct.text):bt==="alert"?alert("Thread "+ct.threadId+": "+ct.text):ct.target==="setimmediate"?R.postMessage(ct):bt==="callHandler"?a[ct.handler](...ct.args):bt&&V("worker sent an unknown command "+bt),Nt.currentProxiedOperationCallerThread=void 0},R.onerror=At=>{var ct="worker sent an error!";throw V(ct+" "+At.filename+":"+At.lineno+": "+At.message),At},C&&(R.on("message",function(At){R.onmessage({data:At})}),R.on("error",function(At){R.onerror(At)}),R.on("detachedExit",function(){}));var nt=[],St=["onExit","onAbort","print","printErr"];for(var Dt of St)a.hasOwnProperty(Dt)&&nt.push(Dt);R.postMessage({cmd:"load",handlers:nt,urlOrBlob:a.mainScriptUrlOrBlob||r,wasmMemory:Q,wasmModule:ot})},allocateUnusedWorker:function(){var R,G=S("tfjs-backend-wasm-threaded-simd.worker.js");R=new Worker(G),Nt.unusedWorkers.push(R)},getNewWorker:function(){return Nt.unusedWorkers.length==0&&(Nt.allocateUnusedWorker(),Nt.loadWasmModuleToWorker(Nt.unusedWorkers[0])),Nt.unusedWorkers.pop()}};a.PThread=Nt;function Nu(R){for(;R.length>0;)R.shift()(a)}function th(){var R=cp(),G=s()[R+52>>>2],nt=s()[R+56>>>2],St=G-nt;yI(G,St),pp(G)}a.establishStackSpace=th;function Yc(R){if(I)return Ns(2,0,R);try{Xc(R)}catch(G){Jf(G)}}var Ki=[];function eh(R){var G=Ki[R];return G||(R>=Ki.length&&(Ki.length=R+1),Ki[R]=G=Oe.get(R)),G}function rh(R,G){var nt=eh(R)(G);jr()?Nt.setExitStatus(nt):bI(nt)}a.invokeEntryPoint=rh;function oh(R){Nt.tlsInitFunctions.push(R)}function nh(R){hI(R,!y,1,!x),Nt.threadInitTLS()}function sh(R){I?postMessage({cmd:"cleanupThread",thread:R}):_u(R)}function Zc(R,G,nt,St){return I?Ns(3,1,R,G,nt,St):Qc(R,G,nt,St)}function Qc(R,G,nt,St){if(typeof SharedArrayBuffer>"u")return V("Current environment does not support SharedArrayBuffer, pthreads are not available!"),6;var Dt=[],At=0;if(I&&(Dt.length===0||At))return Zc(R,G,nt,St);if(At)return At;var ct={startRoutine:nt,pthread_ptr:R,arg:St,transferList:Dt};return I?(ct.cmd="spawnThread",postMessage(ct,Dt),0):Zf(ct)}function ah(){return 65536}var ih=!0;function lh(){return ih}function Au(R){Atomics.store(s(),R>>2,1),cp()&&xI(R),Atomics.compareExchange(s(),R>>2,1,0)}a.executeNotifiedProxyingQueue=Au;function uh(R,G,nt,St){if(R==G)setTimeout(()=>Au(St));else if(I)postMessage({targetThread:R,cmd:"processProxyingQueue",queue:St});else{var Dt=Nt.pthreads[R];if(!Dt)return;Dt.postMessage({cmd:"processProxyingQueue",queue:St})}return 1}function ch(R,G,nt){return-1}function ph(){ha("")}function xa(R){xa.shown||(xa.shown={}),xa.shown[R]||(xa.shown[R]=1,C&&(R="warning: "+R),V(R))}function mh(){C||y||xa("Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread")}function dh(){return Date.now()}function Jc(){return 4294901760}function fh(){return Jc()}var Eu;C?Eu=()=>{var R=process.hrtime();return R[0]*1e3+R[1]/1e6}:Eu=()=>performance.timeOrigin+performance.now();function hh(R,G,nt){o().copyWithin(R>>>0,G>>>0,G+nt>>>0)}function gh(){return C?A$().cpus().length:navigator.hardwareConcurrency}function xh(R){var G=Cx(),nt=R();return pp(G),nt}function Ns(R,G){var nt=arguments.length-2,St=arguments;return xh(()=>{for(var Dt=nt,At=mp(Dt*8),ct=At>>3,bt=0;bt<nt;bt++){var he=St[2+bt];u()[ct+bt>>>0]=he}return gI(R,Dt,At,G)})}var Ru=[];function bh(R,G,nt){Ru.length=G;for(var St=nt>>3,Dt=0;Dt<G;Dt++)Ru[Dt]=u()[St+Dt>>>0];var At=R<0,ct=At?Kc[-R-1]:_h[R];return ct.apply(null,Ru)}function yh(R){try{return Q.grow(R-Tt.byteLength+65535>>>16),ce(Q.buffer),1}catch{}}function Ch(R){var G=o().length;if(R=R>>>0,R<=G)return!1;var nt=Jc();if(R>nt)return!1;let St=(he,Ar)=>he+(Ar-he%Ar)%Ar;for(var Dt=1;Dt<=4;Dt*=2){var At=G*(1+.2/Dt);At=Math.min(At,R+100663296);var ct=Math.min(nt,St(Math.max(R,At),65536)),bt=yh(ct);if(bt)return!0}return!1}function Ih(){throw"unwind"}function tp(R){return I?Ns(4,1,R):52}function ep(R,G,nt,St,Dt){return I?Ns(5,1,R,G,nt,St,Dt):70}var wh=[null,[],[]];function vh(R,G){var nt=wh[R];G===0||G===10?((R===1?z:V)(It(nt,0)),nt.length=0):nt.push(G)}function rp(R,G,nt,St){if(I)return Ns(6,1,R,G,nt,St);for(var Dt=0,At=0;At<nt;At++){var ct=i()[G>>>2],bt=i()[G+4>>>2];G+=8;for(var he=0;he<bt;he++)vh(R,o()[ct+he>>>0]);Dt+=bt}return i()[St>>>2]=Dt,0}function op(R){var G=a["_"+R];return G}function Sh(R,G){e().set(R,G>>>0)}function kh(R,G,nt,St,Dt){var At={string:pr=>{var Yi=0;if(pr!=null&&pr!==0){var wI=(pr.length<<2)+1;Yi=mp(wI),Ot(pr,Yi,wI)}return Yi},array:pr=>{var Yi=mp(pr.length);return Sh(pr,Yi),Yi}};function ct(pr){return G==="string"?wt(pr):G==="boolean"?!!pr:pr}var bt=op(R),he=[],Ar=0;if(St)for(var Fo=0;Fo<St.length;Fo++){var II=At[nt[Fo]];II?(Ar===0&&(Ar=Cx()),he[Fo]=II(St[Fo])):he[Fo]=St[Fo]}var Ix=bt.apply(null,he);function jM(pr){return Ar!==0&&pp(Ar),ct(pr)}return Ix=jM(Ix),Ix}function Th(R,G,nt,St){nt=nt||[];var Dt=nt.every(ct=>ct==="number"||ct==="boolean"),At=G!=="string";return At&&Dt&&!St?op(R):function(){return kh(R,G,nt,arguments,St)}}Nt.init();var _h=[null,jc,Yc,Zc,tp,ep,rp],np={__emscripten_init_main_thread_js:nh,__emscripten_thread_cleanup:sh,__pthread_create_js:Qc,_emscripten_default_pthread_stack_size:ah,_emscripten_get_now_is_monotonic:lh,_emscripten_notify_task_queue:uh,_emscripten_set_offscreencanvas_size:ch,abort:ph,emscripten_check_blocking_allowed:mh,emscripten_date_now:dh,emscripten_get_heap_max:fh,emscripten_get_now:Eu,emscripten_memcpy_big:hh,emscripten_num_logical_cores:gh,emscripten_receive_on_main_thread_js:bh,emscripten_resize_heap:Ch,emscripten_unwind_to_js_event_loop:Ih,exit:Xc,fd_close:tp,fd_seek:ep,fd_write:rp,memory:Q||a.wasmMemory},fI=jf(),Nh=a.___wasm_call_ctors=function(){return(Nh=a.___wasm_call_ctors=a.asm.__wasm_call_ctors).apply(null,arguments)},Ah=a._init=function(){return(Ah=a._init=a.asm.init).apply(null,arguments)},Eh=a._init_with_threads_count=function(){return(Eh=a._init_with_threads_count=a.asm.init_with_threads_count).apply(null,arguments)},Rh=a._get_threads_count=function(){return(Rh=a._get_threads_count=a.asm.get_threads_count).apply(null,arguments)},Dh=a._register_tensor=function(){return(Dh=a._register_tensor=a.asm.register_tensor).apply(null,arguments)},Fh=a._dispose_data=function(){return(Fh=a._dispose_data=a.asm.dispose_data).apply(null,arguments)},$h=a._dispose=function(){return($h=a._dispose=a.asm.dispose).apply(null,arguments)},Mh=a._Abs=function(){return(Mh=a._Abs=a.asm.Abs).apply(null,arguments)},Ph=a._Acos=function(){return(Ph=a._Acos=a.asm.Acos).apply(null,arguments)},Oh=a._Acosh=function(){return(Oh=a._Acosh=a.asm.Acosh).apply(null,arguments)},Bh=a._Add=function(){return(Bh=a._Add=a.asm.Add).apply(null,arguments)},Lh=a._AddN=function(){return(Lh=a._AddN=a.asm.AddN).apply(null,arguments)},Uh=a._All=function(){return(Uh=a._All=a.asm.All).apply(null,arguments)},Gh=a._Any=function(){return(Gh=a._Any=a.asm.Any).apply(null,arguments)},Vh=a._ArgMax=function(){return(Vh=a._ArgMax=a.asm.ArgMax).apply(null,arguments)},Wh=a._ArgMin=function(){return(Wh=a._ArgMin=a.asm.ArgMin).apply(null,arguments)},zh=a._Asin=function(){return(zh=a._Asin=a.asm.Asin).apply(null,arguments)},Hh=a._Asinh=function(){return(Hh=a._Asinh=a.asm.Asinh).apply(null,arguments)},Kh=a._Atan=function(){return(Kh=a._Atan=a.asm.Atan).apply(null,arguments)},qh=a._Atan2=function(){return(qh=a._Atan2=a.asm.Atan2).apply(null,arguments)},jh=a._Atanh=function(){return(jh=a._Atanh=a.asm.Atanh).apply(null,arguments)},Xh=a._AvgPool=function(){return(Xh=a._AvgPool=a.asm.AvgPool).apply(null,arguments)},Yh=a._AvgPool3D=function(){return(Yh=a._AvgPool3D=a.asm.AvgPool3D).apply(null,arguments)},Zh=a._AvgPool3DGrad=function(){return(Zh=a._AvgPool3DGrad=a.asm.AvgPool3DGrad).apply(null,arguments)},Qh=a._AvgPoolGrad=function(){return(Qh=a._AvgPoolGrad=a.asm.AvgPoolGrad).apply(null,arguments)},Jh=a._BatchMatMul=function(){return(Jh=a._BatchMatMul=a.asm.BatchMatMul).apply(null,arguments)},tg=a._Bincount=function(){return(tg=a._Bincount=a.asm.Bincount).apply(null,arguments)},eg=a._BitwiseAnd=function(){return(eg=a._BitwiseAnd=a.asm.BitwiseAnd).apply(null,arguments)},rg=a._Ceil=function(){return(rg=a._Ceil=a.asm.Ceil).apply(null,arguments)},og=a._ClipByValue=function(){return(og=a._ClipByValue=a.asm.ClipByValue).apply(null,arguments)},ng=a._Conv2D=function(){return(ng=a._Conv2D=a.asm.Conv2D).apply(null,arguments)},sg=a._Conv2DBackpropInput=function(){return(sg=a._Conv2DBackpropInput=a.asm.Conv2DBackpropInput).apply(null,arguments)},ag=a._Conv3D=function(){return(ag=a._Conv3D=a.asm.Conv3D).apply(null,arguments)},ig=a._Conv3DBackpropFilterV2=function(){return(ig=a._Conv3DBackpropFilterV2=a.asm.Conv3DBackpropFilterV2).apply(null,arguments)},lg=a._Conv3DBackpropInputV2=function(){return(lg=a._Conv3DBackpropInputV2=a.asm.Conv3DBackpropInputV2).apply(null,arguments)},ug=a._Cos=function(){return(ug=a._Cos=a.asm.Cos).apply(null,arguments)},cg=a._Cosh=function(){return(cg=a._Cosh=a.asm.Cosh).apply(null,arguments)},pg=a._CropAndResize=function(){return(pg=a._CropAndResize=a.asm.CropAndResize).apply(null,arguments)},mg=a._Cumprod=function(){return(mg=a._Cumprod=a.asm.Cumprod).apply(null,arguments)},dg=a._Cumsum=function(){return(dg=a._Cumsum=a.asm.Cumsum).apply(null,arguments)},fg=a._DenseBincount=function(){return(fg=a._DenseBincount=a.asm.DenseBincount).apply(null,arguments)},hg=a._DepthToSpace=function(){return(hg=a._DepthToSpace=a.asm.DepthToSpace).apply(null,arguments)},gg=a._DepthwiseConv2dNative=function(){return(gg=a._DepthwiseConv2dNative=a.asm.DepthwiseConv2dNative).apply(null,arguments)},xg=a._Diag=function(){return(xg=a._Diag=a.asm.Diag).apply(null,arguments)},bg=a._Dilation2D=function(){return(bg=a._Dilation2D=a.asm.Dilation2D).apply(null,arguments)},yg=a._Dilation2DBackpropFilter=function(){return(yg=a._Dilation2DBackpropFilter=a.asm.Dilation2DBackpropFilter).apply(null,arguments)},Cg=a._Dilation2DBackpropInput=function(){return(Cg=a._Dilation2DBackpropInput=a.asm.Dilation2DBackpropInput).apply(null,arguments)},Ig=a._Elu=function(){return(Ig=a._Elu=a.asm.Elu).apply(null,arguments)},wg=a._EluGrad=function(){return(wg=a._EluGrad=a.asm.EluGrad).apply(null,arguments)},vg=a._Equal=function(){return(vg=a._Equal=a.asm.Equal).apply(null,arguments)},Sg=a._Erf=function(){return(Sg=a._Erf=a.asm.Erf).apply(null,arguments)},kg=a._Exp=function(){return(kg=a._Exp=a.asm.Exp).apply(null,arguments)},Tg=a._Expm1=function(){return(Tg=a._Expm1=a.asm.Expm1).apply(null,arguments)},_g=a._FlipLeftRight=function(){return(_g=a._FlipLeftRight=a.asm.FlipLeftRight).apply(null,arguments)},Ng=a._Floor=function(){return(Ng=a._Floor=a.asm.Floor).apply(null,arguments)},Ag=a._FloorDiv=function(){return(Ag=a._FloorDiv=a.asm.FloorDiv).apply(null,arguments)},Eg=a._FusedBatchNorm=function(){return(Eg=a._FusedBatchNorm=a.asm.FusedBatchNorm).apply(null,arguments)},Rg=a._FusedConv2D=function(){return(Rg=a._FusedConv2D=a.asm.FusedConv2D).apply(null,arguments)},Dg=a._FusedDepthwiseConv2D=function(){return(Dg=a._FusedDepthwiseConv2D=a.asm.FusedDepthwiseConv2D).apply(null,arguments)},Fg=a._Gather=function(){return(Fg=a._Gather=a.asm.Gather).apply(null,arguments)},$g=a._GatherNd=function(){return($g=a._GatherNd=a.asm.GatherNd).apply(null,arguments)},Mg=a._Greater=function(){return(Mg=a._Greater=a.asm.Greater).apply(null,arguments)},Pg=a._GreaterEqual=function(){return(Pg=a._GreaterEqual=a.asm.GreaterEqual).apply(null,arguments)},Og=a._IsFinite=function(){return(Og=a._IsFinite=a.asm.IsFinite).apply(null,arguments)},Bg=a._IsInf=function(){return(Bg=a._IsInf=a.asm.IsInf).apply(null,arguments)},Lg=a._IsNan=function(){return(Lg=a._IsNan=a.asm.IsNan).apply(null,arguments)},Ug=a._LRN=function(){return(Ug=a._LRN=a.asm.LRN).apply(null,arguments)},Gg=a._LRNGrad=function(){return(Gg=a._LRNGrad=a.asm.LRNGrad).apply(null,arguments)},Vg=a._LeakyRelu=function(){return(Vg=a._LeakyRelu=a.asm.LeakyRelu).apply(null,arguments)},Wg=a._Less=function(){return(Wg=a._Less=a.asm.Less).apply(null,arguments)},zg=a._LessEqual=function(){return(zg=a._LessEqual=a.asm.LessEqual).apply(null,arguments)},Hg=a._LinSpace=function(){return(Hg=a._LinSpace=a.asm.LinSpace).apply(null,arguments)},Kg=a._Log=function(){return(Kg=a._Log=a.asm.Log).apply(null,arguments)},qg=a._Log1p=function(){return(qg=a._Log1p=a.asm.Log1p).apply(null,arguments)},jg=a._LogicalAnd=function(){return(jg=a._LogicalAnd=a.asm.LogicalAnd).apply(null,arguments)},Xg=a._LogicalNot=function(){return(Xg=a._LogicalNot=a.asm.LogicalNot).apply(null,arguments)},Yg=a._LogicalOr=function(){return(Yg=a._LogicalOr=a.asm.LogicalOr).apply(null,arguments)},Zg=a._LogicalXor=function(){return(Zg=a._LogicalXor=a.asm.LogicalXor).apply(null,arguments)},Qg=a._Max=function(){return(Qg=a._Max=a.asm.Max).apply(null,arguments)},Jg=a._MaxPool=function(){return(Jg=a._MaxPool=a.asm.MaxPool).apply(null,arguments)},tx=a._MaxPool3D=function(){return(tx=a._MaxPool3D=a.asm.MaxPool3D).apply(null,arguments)},ex=a._MaxPool3DGrad=function(){return(ex=a._MaxPool3DGrad=a.asm.MaxPool3DGrad).apply(null,arguments)},rx=a._MaxPoolGrad=function(){return(rx=a._MaxPoolGrad=a.asm.MaxPoolGrad).apply(null,arguments)},ox=a._MaxPoolWithArgmax=function(){return(ox=a._MaxPoolWithArgmax=a.asm.MaxPoolWithArgmax).apply(null,arguments)},nx=a._Maximum=function(){return(nx=a._Maximum=a.asm.Maximum).apply(null,arguments)},sx=a._Mean=function(){return(sx=a._Mean=a.asm.Mean).apply(null,arguments)},ax=a._Min=function(){return(ax=a._Min=a.asm.Min).apply(null,arguments)},ix=a._Minimum=function(){return(ix=a._Minimum=a.asm.Minimum).apply(null,arguments)},lx=a._MirrorPad=function(){return(lx=a._MirrorPad=a.asm.MirrorPad).apply(null,arguments)},ux=a._Mod=function(){return(ux=a._Mod=a.asm.Mod).apply(null,arguments)},cx=a._Multinomial=function(){return(cx=a._Multinomial=a.asm.Multinomial).apply(null,arguments)},px=a._Multiply=function(){return(px=a._Multiply=a.asm.Multiply).apply(null,arguments)},mx=a._Neg=function(){return(mx=a._Neg=a.asm.Neg).apply(null,arguments)},dx=a._NonMaxSuppressionV3=function(){return(dx=a._NonMaxSuppressionV3=a.asm.NonMaxSuppressionV3).apply(null,arguments)},fx=a._NonMaxSuppressionV4=function(){return(fx=a._NonMaxSuppressionV4=a.asm.NonMaxSuppressionV4).apply(null,arguments)},sp=a._NonMaxSuppressionV5=function(){return(sp=a._NonMaxSuppressionV5=a.asm.NonMaxSuppressionV5).apply(null,arguments)},ap=a._NotEqual=function(){return(ap=a._NotEqual=a.asm.NotEqual).apply(null,arguments)},Du=a._OneHot=function(){return(Du=a._OneHot=a.asm.OneHot).apply(null,arguments)},hx=a._PadV2=function(){return(hx=a._PadV2=a.asm.PadV2).apply(null,arguments)},gx=a._Pow=function(){return(gx=a._Pow=a.asm.Pow).apply(null,arguments)},qi=a._Prelu=function(){return(qi=a._Prelu=a.asm.Prelu).apply(null,arguments)},ip=a._Prod=function(){return(ip=a._Prod=a.asm.Prod).apply(null,arguments)},ji=a._RealDiv=function(){return(ji=a._RealDiv=a.asm.RealDiv).apply(null,arguments)},Xi=a._Reciprocal=function(){return(Xi=a._Reciprocal=a.asm.Reciprocal).apply(null,arguments)},xx=a._Relu=function(){return(xx=a._Relu=a.asm.Relu).apply(null,arguments)},H=a._Relu6=function(){return(H=a._Relu6=a.asm.Relu6).apply(null,arguments)},et=a._ResizeBilinear=function(){return(et=a._ResizeBilinear=a.asm.ResizeBilinear).apply(null,arguments)},Ct=a._ResizeBilinearGrad=function(){return(Ct=a._ResizeBilinearGrad=a.asm.ResizeBilinearGrad).apply(null,arguments)},Kt=a._ResizeNearestNeighbor=function(){return(Kt=a._ResizeNearestNeighbor=a.asm.ResizeNearestNeighbor).apply(null,arguments)},pe=a._ResizeNearestNeighborGrad=function(){return(pe=a._ResizeNearestNeighborGrad=a.asm.ResizeNearestNeighborGrad).apply(null,arguments)},me=a._Reverse=function(){return(me=a._Reverse=a.asm.Reverse).apply(null,arguments)},Gt=a._RotateWithOffset=function(){return(Gt=a._RotateWithOffset=a.asm.RotateWithOffset).apply(null,arguments)},Bt=a._Round=function(){return(Bt=a._Round=a.asm.Round).apply(null,arguments)},ve=a._Rsqrt=function(){return(ve=a._Rsqrt=a.asm.Rsqrt).apply(null,arguments)},Nr=a._ScatterNd=function(){return(Nr=a._ScatterNd=a.asm.ScatterNd).apply(null,arguments)},Do=a._SearchSorted=function(){return(Do=a._SearchSorted=a.asm.SearchSorted).apply(null,arguments)},lp=a._SelectV2=function(){return(lp=a._SelectV2=a.asm.SelectV2).apply(null,arguments)},Fu=a._Selu=function(){return(Fu=a._Selu=a.asm.Selu).apply(null,arguments)},bx=a._Sigmoid=function(){return(bx=a._Sigmoid=a.asm.Sigmoid).apply(null,arguments)},Ke=a._Sign=function(){return(Ke=a._Sign=a.asm.Sign).apply(null,arguments)},As=a._Sin=function(){return(As=a._Sin=a.asm.Sin).apply(null,arguments)},up=a._Sinh=function(){return(up=a._Sinh=a.asm.Sinh).apply(null,arguments)},gM=a._Softmax=function(){return(gM=a._Softmax=a.asm.Softmax).apply(null,arguments)},xM=a._Softplus=function(){return(xM=a._Softplus=a.asm.Softplus).apply(null,arguments)},bM=a._SparseFillEmptyRows=function(){return(bM=a._SparseFillEmptyRows=a.asm.SparseFillEmptyRows).apply(null,arguments)},yM=a._SparseReshape=function(){return(yM=a._SparseReshape=a.asm.SparseReshape).apply(null,arguments)},CM=a._SparseSegmentReduction=function(){return(CM=a._SparseSegmentReduction=a.asm.SparseSegmentReduction).apply(null,arguments)},IM=a._SparseToDense=function(){return(IM=a._SparseToDense=a.asm.SparseToDense).apply(null,arguments)},wM=a._Sqrt=function(){return(wM=a._Sqrt=a.asm.Sqrt).apply(null,arguments)},vM=a._Square=function(){return(vM=a._Square=a.asm.Square).apply(null,arguments)},SM=a._SquaredDifference=function(){return(SM=a._SquaredDifference=a.asm.SquaredDifference).apply(null,arguments)},kM=a._Step=function(){return(kM=a._Step=a.asm.Step).apply(null,arguments)},TM=a._StridedSlice=function(){return(TM=a._StridedSlice=a.asm.StridedSlice).apply(null,arguments)},_M=a._Sub=function(){return(_M=a._Sub=a.asm.Sub).apply(null,arguments)},NM=a._Sum=function(){return(NM=a._Sum=a.asm.Sum).apply(null,arguments)},AM=a._Tan=function(){return(AM=a._Tan=a.asm.Tan).apply(null,arguments)},EM=a._Tanh=function(){return(EM=a._Tanh=a.asm.Tanh).apply(null,arguments)},RM=a._TensorScatterUpdate=function(){return(RM=a._TensorScatterUpdate=a.asm.TensorScatterUpdate).apply(null,arguments)},DM=a._Tile=function(){return(DM=a._Tile=a.asm.Tile).apply(null,arguments)},FM=a._TopK=function(){return(FM=a._TopK=a.asm.TopK).apply(null,arguments)},$M=a._Transform=function(){return($M=a._Transform=a.asm.Transform).apply(null,arguments)},MM=a._Transpose=function(){return(MM=a._Transpose=a.asm.Transpose).apply(null,arguments)},PM=a.__FusedMatMul=function(){return(PM=a.__FusedMatMul=a.asm._FusedMatMul).apply(null,arguments)},OM=a._malloc=function(){return(OM=a._malloc=a.asm.malloc).apply(null,arguments)},BM=a._free=function(){return(BM=a._free=a.asm.free).apply(null,arguments)},LM=a.__emscripten_tls_init=function(){return(LM=a.__emscripten_tls_init=a.asm._emscripten_tls_init).apply(null,arguments)},cp=a._pthread_self=function(){return(cp=a._pthread_self=a.asm.pthread_self).apply(null,arguments)},UM=a.___errno_location=function(){return(UM=a.___errno_location=a.asm.__errno_location).apply(null,arguments)},hI=a.__emscripten_thread_init=function(){return(hI=a.__emscripten_thread_init=a.asm._emscripten_thread_init).apply(null,arguments)},GM=a.__emscripten_thread_crashed=function(){return(GM=a.__emscripten_thread_crashed=a.asm._emscripten_thread_crashed).apply(null,arguments)},VM=a._emscripten_main_thread_process_queued_calls=function(){return(VM=a._emscripten_main_thread_process_queued_calls=a.asm.emscripten_main_thread_process_queued_calls).apply(null,arguments)},WM=a._emscripten_main_browser_thread_id=function(){return(WM=a._emscripten_main_browser_thread_id=a.asm.emscripten_main_browser_thread_id).apply(null,arguments)},gI=a._emscripten_run_in_main_runtime_thread_js=function(){return(gI=a._emscripten_run_in_main_runtime_thread_js=a.asm.emscripten_run_in_main_runtime_thread_js).apply(null,arguments)},zM=a._emscripten_dispatch_to_thread_=function(){return(zM=a._emscripten_dispatch_to_thread_=a.asm.emscripten_dispatch_to_thread_).apply(null,arguments)},xI=a.__emscripten_proxy_execute_task_queue=function(){return(xI=a.__emscripten_proxy_execute_task_queue=a.asm._emscripten_proxy_execute_task_queue).apply(null,arguments)},yx=a.__emscripten_thread_free_data=function(){return(yx=a.__emscripten_thread_free_data=a.asm._emscripten_thread_free_data).apply(null,arguments)},bI=a.__emscripten_thread_exit=function(){return(bI=a.__emscripten_thread_exit=a.asm._emscripten_thread_exit).apply(null,arguments)},yI=a._emscripten_stack_set_limits=function(){return(yI=a._emscripten_stack_set_limits=a.asm.emscripten_stack_set_limits).apply(null,arguments)},Cx=a.stackSave=function(){return(Cx=a.stackSave=a.asm.stackSave).apply(null,arguments)},pp=a.stackRestore=function(){return(pp=a.stackRestore=a.asm.stackRestore).apply(null,arguments)},mp=a.stackAlloc=function(){return(mp=a.stackAlloc=a.asm.stackAlloc).apply(null,arguments)},HM=a.dynCall_iijjiiii=function(){return(HM=a.dynCall_iijjiiii=a.asm.dynCall_iijjiiii).apply(null,arguments)},KM=a.dynCall_jiji=function(){return(KM=a.dynCall_jiji=a.asm.dynCall_jiji).apply(null,arguments)};a.keepRuntimeAlive=jr,a.wasmMemory=Q,a.cwrap=Th,a.ExitStatus=ga,a.PThread=Nt;var dp;Ro=function R(){dp||CI(),dp||(Ro=R)};function CI(R){if(R=R||f,_s>0)return;if(I){c(a),Ae(),startWorker(a);return}if(po(),_s>0)return;function G(){dp||(dp=!0,a.calledRun=!0,!at&&(Ae(),c(a),a.onRuntimeInitialized&&a.onRuntimeInitialized(),Eo()))}a.setStatus?(a.setStatus("Running..."),setTimeout(function(){setTimeout(function(){a.setStatus("")},1),G()},1)):G()}if(a.preInit)for(typeof a.preInit=="function"&&(a.preInit=[a.preInit]);a.preInit.length>0;)a.preInit.pop()();CI();var fp;m&&(fp={uncaughtException:process.listeners("uncaughtException").filter(function(R){return!m.uncaughtException.indexOf(R)>-1}),unhandledRejection:process.listeners("unhandledRejection").filter(function(R){return!m.unhandledRejection.indexOf(R)>-1})});var hp;if(typeof WasmBackendModule<"u")hp=WasmBackendModule;else if(typeof t<"u")hp=t;else throw new Error("Could not find wasm module in post.js");if(fp){var qM=hp._dispose;hp._dispose=function(){qM(),fp.uncaughtException.forEach(function(R){process.removeListener("uncaughtException",R)}),fp.unhandledRejection.forEach(function(R){process.removeListener("unhandledRejection",R)})}}return t.ready}})();typeof _f=="object"&&typeof $C=="object"?$C.exports=FC:typeof define=="function"&&define.amd?define([],function(){return FC}):typeof _f=="object"&&(_f.WasmBackendModuleThreadedSimd=FC)});var D$=_e((fue,R$)=>{R$.exports.wasmWorkerContents=`"use strict";var Module={};var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";if(ENVIRONMENT_IS_NODE){var nodeWorkerThreads=require("worker_threads");var parentPort=nodeWorkerThreads.parentPort;parentPort.on("message",data=>onmessage({data:data}));var fs=require("fs");Object.assign(global,{self:global,require:require,Module:Module,location:{href:__filename},Worker:nodeWorkerThreads.Worker,importScripts:function(f){(0,eval)(fs.readFileSync(f,"utf8")+"//# sourceURL="+f)},postMessage:function(msg){parentPort.postMessage(msg)},performance:global.performance||{now:function(){return Date.now()}}})}var initializedJS=false;var pendingNotifiedProxyingQueues=[];function threadPrintErr(){var text=Array.prototype.slice.call(arguments).join(" ");if(ENVIRONMENT_IS_NODE){fs.writeSync(2,text+"
");return}console.error(text)}function threadAlert(){var text=Array.prototype.slice.call(arguments).join(" ");postMessage({cmd:"alert",text:text,threadId:Module["_pthread_self"]()})}var err=threadPrintErr;self.alert=threadAlert;Module["instantiateWasm"]=(info,receiveInstance)=>{var instance=new WebAssembly.Instance(Module["wasmModule"],info);receiveInstance(instance);Module["wasmModule"]=null;return instance.exports};self.onunhandledrejection=e=>{throw e.reason??e};self.startWorker=instance=>{Module=instance;postMessage({"cmd":"loaded"})};self.onmessage=e=>{try{if(e.data.cmd==="load"){Module["wasmModule"]=e.data.wasmModule;for(const handler of e.data.handlers){Module[handler]=function(){postMessage({cmd:"callHandler",handler:handler,args:[...arguments]})}}Module["wasmMemory"]=e.data.wasmMemory;Module["buffer"]=Module["wasmMemory"].buffer;Module["ENVIRONMENT_IS_PTHREAD"]=true;if(typeof e.data.urlOrBlob=="string"){importScripts(e.data.urlOrBlob)}else{var objectUrl=URL.createObjectURL(e.data.urlOrBlob);importScripts(objectUrl);URL.revokeObjectURL(objectUrl)}WasmBackendModuleThreadedSimd(Module)}else if(e.data.cmd==="run"){Module["__emscripten_thread_init"](e.data.pthread_ptr,0,0,1);Module["establishStackSpace"]();Module["PThread"].receiveObjectTransfer(e.data);Module["PThread"].threadInitTLS();if(!initializedJS){pendingNotifiedProxyingQueues.forEach(queue=>{Module["executeNotifiedProxyingQueue"](queue)});pendingNotifiedProxyingQueues=[];initializedJS=true}try{Module["invokeEntryPoint"](e.data.start_routine,e.data.arg)}catch(ex){if(ex!="unwind"){if(ex instanceof Module["ExitStatus"]){if(Module["keepRuntimeAlive"]()){}else{Module["__emscripten_thread_exit"](ex.status)}}else{throw ex}}}}else if(e.data.cmd==="cancel"){if(Module["_pthread_self"]()){Module["__emscripten_thread_exit"](-1)}}else if(e.data.target==="setimmediate"){}else if(e.data.cmd==="processProxyingQueue"){if(initializedJS){Module["executeNotifiedProxyingQueue"](e.data.queue)}else{pendingNotifiedProxyingQueues.push(e.data.queue)}}else if(e.data.cmd){err("worker.js received unknown command "+e.data.cmd);err(e.data)}}catch(ex){if(Module["__emscripten_thread_crashed"]){Module["__emscripten_thread_crashed"]()}throw ex}};`});var F$=_e((Nf,PC)=>{var MC=(()=>{var r=typeof document<"u"&&document.currentScript?document.currentScript.src:void 0;return typeof __filename<"u"&&(r=r||__filename),function(t){t=t||{};var e=typeof t<"u"?t:{},o,n;e.ready=new Promise(function(H,et){o=H,n=et});var s;typeof process<"u"&&process.listeners&&(s={uncaughtException:process.listeners("uncaughtException"),unhandledRejection:process.listeners("unhandledRejection")});var i=Object.assign({},e),l=[],u="./this.program",a=(H,et)=>{throw et},c=typeof window=="object",p=typeof importScripts=="function",m=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string",d="";function f(H){return e.locateFile?e.locateFile(H,d):d+H}var h,g,x,y;function C(H){if(H instanceof zi)return;k("exiting due to exception: "+H)}if(m){var I=RC(),v=DC();p?d=v.dirname(d)+"/":d=__dirname+"/",h=(H,et)=>(H=po(H)?new URL(H):v.normalize(H),I.readFileSync(H,et?void 0:"utf8")),x=H=>{var et=h(H,!0);return et.buffer||(et=new Uint8Array(et)),et},g=(H,et,Ct)=>{H=po(H)?new URL(H):v.normalize(H),I.readFile(H,function(Kt,pe){Kt?Ct(Kt):et(pe.buffer)})},process.argv.length>1&&(u=process.argv[1].replace(/\\/g,"/")),l=process.argv.slice(2),process.on("uncaughtException",function(H){if(!(H instanceof zi))throw H}),process.on("unhandledRejection",function(H){throw H}),a=(H,et)=>{if(Ut())throw process.exitCode=H,et;C(et),process.exit(H)},e.inspect=function(){return"[Emscripten Module object]"}}else(c||p)&&(p?d=self.location.href:typeof document<"u"&&document.currentScript&&(d=document.currentScript.src),r&&(d=r),d.indexOf("blob:")!==0?d=d.substr(0,d.replace(/[?#].*/,"").lastIndexOf("/")+1):d="",h=H=>{var et=new XMLHttpRequest;return et.open("GET",H,!1),et.send(null),et.responseText},p&&(x=H=>{var et=new XMLHttpRequest;return et.open("GET",H,!1),et.responseType="arraybuffer",et.send(null),new Uint8Array(et.response)}),g=(H,et,Ct)=>{var Kt=new XMLHttpRequest;Kt.open("GET",H,!0),Kt.responseType="arraybuffer",Kt.onload=()=>{if(Kt.status==200||Kt.status==0&&Kt.response){et(Kt.response);return}Ct()},Kt.onerror=Ct,Kt.send(null)},y=H=>document.title=H);var S=e.print||console.log.bind(console),k=e.printErr||console.warn.bind(console);Object.assign(e,i),i=null,e.arguments&&(l=e.arguments),e.thisProgram&&(u=e.thisProgram),e.quit&&(a=e.quit);var A=4,D;e.wasmBinary&&(D=e.wasmBinary);var F=e.noExitRuntime||!0;typeof WebAssembly!="object"&&Ve("no native wasm support detected");var M,B=!1,U;function P(H,et){H||Ve(et)}var L=typeof TextDecoder<"u"?new TextDecoder("utf8"):void 0;function z(H,et,Ct){et>>>=0;for(var Kt=et+Ct,pe=et;H[pe]&&!(pe>=Kt);)++pe;if(pe-et>16&&H.buffer&&L)return L.decode(H.subarray(et,pe));for(var me="";et<pe;){var Gt=H[et++];if(!(Gt&128)){me+=String.fromCharCode(Gt);continue}var Bt=H[et++]&63;if((Gt&224)==192){me+=String.fromCharCode((Gt&31)<<6|Bt);continue}var ve=H[et++]&63;if((Gt&240)==224?Gt=(Gt&15)<<12|Bt<<6|ve:Gt=(Gt&7)<<18|Bt<<12|ve<<6|H[et++]&63,Gt<65536)me+=String.fromCharCode(Gt);else{var Nr=Gt-65536;me+=String.fromCharCode(55296|Nr>>10,56320|Nr&1023)}}return me}function V(H,et){return H>>>=0,H?z(tt,H,et):""}function W(H,et,Ct,Kt){if(Ct>>>=0,!(Kt>0))return 0;for(var pe=Ct,me=Ct+Kt-1,Gt=0;Gt<H.length;++Gt){var Bt=H.charCodeAt(Gt);if(Bt>=55296&&Bt<=57343){var ve=H.charCodeAt(++Gt);Bt=65536+((Bt&1023)<<10)|ve&1023}if(Bt<=127){if(Ct>=me)break;et[Ct++>>>0]=Bt}else if(Bt<=2047){if(Ct+1>=me)break;et[Ct++>>>0]=192|Bt>>6,et[Ct++>>>0]=128|Bt&63}else if(Bt<=65535){if(Ct+2>=me)break;et[Ct++>>>0]=224|Bt>>12,et[Ct++>>>0]=128|Bt>>6&63,et[Ct++>>>0]=128|Bt&63}else{if(Ct+3>=me)break;et[Ct++>>>0]=240|Bt>>18,et[Ct++>>>0]=128|Bt>>12&63,et[Ct++>>>0]=128|Bt>>6&63,et[Ct++>>>0]=128|Bt&63}}return et[Ct>>>0]=0,Ct-pe}function q(H,et,Ct){return W(H,tt,et,Ct)}var X,J,tt,Y,Q,ot,at,st,mt;function dt(H){X=H,e.HEAP8=J=new Int8Array(H),e.HEAP16=Y=new Int16Array(H),e.HEAP32=ot=new Int32Array(H),e.HEAPU8=tt=new Uint8Array(H),e.HEAPU16=Q=new Uint16Array(H),e.HEAPU32=at=new Uint32Array(H),e.HEAPF32=st=new Float32Array(H),e.HEAPF64=mt=new Float64Array(H)}var It=e.INITIAL_MEMORY||16777216,wt,Rt=[],Ot=[],Tt=[],Wt=!1;function Ut(){return F}function Xt(){if(e.preRun)for(typeof e.preRun=="function"&&(e.preRun=[e.preRun]);e.preRun.length;)xe(e.preRun.shift());Ro(Rt)}function Zt(){Wt=!0,Ro(Ot)}function cr(){if(e.postRun)for(typeof e.postRun=="function"&&(e.postRun=[e.postRun]);e.postRun.length;)Me(e.postRun.shift());Ro(Tt)}function xe(H){Rt.unshift(H)}function kr(H){Ot.unshift(H)}function Me(H){Tt.unshift(H)}var ce=0,Pe=null,Oe=null;function Tr(H){ce++,e.monitorRunDependencies&&e.monitorRunDependencies(ce)}function _r(H){if(ce--,e.monitorRunDependencies&&e.monitorRunDependencies(ce),ce==0&&(Pe!==null&&(clearInterval(Pe),Pe=null),Oe)){var et=Oe;Oe=null,et()}}function Ve(H){e.onAbort&&e.onAbort(H),H="Aborted("+H+")",k(H),B=!0,U=1,H+=". Build with -sASSERTIONS for more info.";var et=new WebAssembly.RuntimeError(H);throw n(et),et}var Ao="data:application/octet-stream;base64,";function jr(H){return H.startsWith(Ao)}function po(H){return H.startsWith("file://")}var Ae;Ae="tfjs-backend-wasm.wasm",jr(Ae)||(Ae=f(Ae));function Eo(H){try{if(H==Ae&&D)return new Uint8Array(D);if(x)return x(H);throw"both async and sync fetching of the wasm failed"}catch(et){Ve(et)}}function ku(){if(!D&&(c||p)){if(typeof fetch=="function"&&!po(Ae))return fetch(Ae,{credentials:"same-origin"}).then(function(H){if(!H.ok)throw"failed to load wasm binary file at '"+Ae+"'";return H.arrayBuffer()}).catch(function(){return Eo(Ae)});if(g)return new Promise(function(H,et){g(Ae,function(Ct){H(new Uint8Array(Ct))},et)})}return Promise.resolve().then(function(){return Eo(Ae)})}function Tu(){var H={env:_u,wasi_snapshot_preview1:_u};function et(Gt,Bt){var ve=Gt.exports;e.asm=ve,M=e.asm.memory,dt(M.buffer),wt=e.asm.__indirect_function_table,kr(e.asm.__wasm_call_ctors),_r("wasm-instantiate")}Tr("wasm-instantiate");function Ct(Gt){et(Gt.instance)}function Kt(Gt){return ku().then(function(Bt){return WebAssembly.instantiate(Bt,H)}).then(function(Bt){return Bt}).then(Gt,function(Bt){k("failed to asynchronously prepare wasm: "+Bt),Ve(Bt)})}function pe(){return!D&&typeof WebAssembly.instantiateStreaming=="function"&&!jr(Ae)&&!po(Ae)&&!m&&typeof fetch=="function"?fetch(Ae,{credentials:"same-origin"}).then(function(Gt){var Bt=WebAssembly.instantiateStreaming(Gt,H);return Bt.then(Ct,function(ve){return k("wasm streaming compile failed: "+ve),k("falling back to ArrayBuffer instantiation"),Kt(Ct)})}):Kt(Ct)}if(e.instantiateWasm)try{var me=e.instantiateWasm(H,et);return me}catch(Gt){k("Module.instantiateWasm callback failed with error: "+Gt),n(Gt)}return pe().catch(n),{}}var pI,_s;function zi(H){this.name="ExitStatus",this.message="Program terminated with exit("+H+")",this.status=H}function Ro(H){for(;H.length>0;)H.shift()(e)}function Hf(){Ve("")}function Wc(){return 4294901760}function ha(){return Wc()}function Kf(H,et,Ct){tt.copyWithin(H>>>0,et>>>0,et+Ct>>>0)}function zc(H){try{return M.grow(H-X.byteLength+65535>>>16),dt(M.buffer),1}catch{}}function Hi(H){var et=tt.length;H=H>>>0;var Ct=Wc();if(H>Ct)return!1;let Kt=(ve,Nr)=>ve+(Nr-ve%Nr)%Nr;for(var pe=1;pe<=4;pe*=2){var me=et*(1+.2/pe);me=Math.min(me,H+100663296);var Gt=Math.min(Ct,Kt(Math.max(H,me),65536)),Bt=zc(Gt);if(Bt)return!0}return!1}var We={varargs:void 0,get:function(){We.varargs+=4;var H=ot[We.varargs-4>>>2];return H},getStr:function(H){var et=V(H);return et}};function Hc(H){return 52}function qf(H,et,Ct,Kt,pe){return 70}var jf=[null,[],[]];function mI(H,et){var Ct=jf[H];et===0||et===10?((H===1?S:k)(z(Ct,0)),Ct.length=0):Ct.push(et)}function dI(H,et,Ct,Kt){for(var pe=0,me=0;me<Ct;me++){var Gt=at[et>>>2],Bt=at[et+4>>>2];et+=8;for(var ve=0;ve<Bt;ve++)mI(H,tt[Gt+ve>>>0]);pe+=Bt}return at[Kt>>>2]=pe,0}function Kc(H){var et=e["_"+H];return et}function ga(H,et){J.set(H,et>>>0)}function Xf(H,et,Ct,Kt,pe){var me={string:Ke=>{var As=0;if(Ke!=null&&Ke!==0){var up=(Ke.length<<2)+1;As=Du(up),q(Ke,As,up)}return As},array:Ke=>{var As=Du(Ke.length);return ga(Ke,As),As}};function Gt(Ke){return et==="string"?V(Ke):et==="boolean"?!!Ke:Ke}var Bt=Kc(H),ve=[],Nr=0;if(Kt)for(var Do=0;Do<Kt.length;Do++){var lp=me[Ct[Do]];lp?(Nr===0&&(Nr=sp()),ve[Do]=lp(Kt[Do])):ve[Do]=Kt[Do]}var Fu=Bt.apply(null,ve);function bx(Ke){return Nr!==0&&ap(Nr),Gt(Ke)}return Fu=bx(Fu),Fu}function Yf(H,et,Ct,Kt){Ct=Ct||[];var pe=Ct.every(Gt=>Gt==="number"||Gt==="boolean"),me=et!=="string";return me&&pe&&!Kt?Kc(H):function(){return Xf(H,et,Ct,arguments,Kt)}}var _u={abort:Hf,emscripten_get_heap_max:ha,emscripten_memcpy_big:Kf,emscripten_resize_heap:Hi,fd_close:Hc,fd_seek:qf,fd_write:dI},Zf=Tu(),qc=e.___wasm_call_ctors=function(){return(qc=e.___wasm_call_ctors=e.asm.__wasm_call_ctors).apply(null,arguments)},jc=e._init=function(){return(jc=e._init=e.asm.init).apply(null,arguments)},Qf=e._init_with_threads_count=function(){return(Qf=e._init_with_threads_count=e.asm.init_with_threads_count).apply(null,arguments)},Xc=e._get_threads_count=function(){return(Xc=e._get_threads_count=e.asm.get_threads_count).apply(null,arguments)},Jf=e._register_tensor=function(){return(Jf=e._register_tensor=e.asm.register_tensor).apply(null,arguments)},Nt=e._dispose_data=function(){return(Nt=e._dispose_data=e.asm.dispose_data).apply(null,arguments)},Nu=e._dispose=function(){return(Nu=e._dispose=e.asm.dispose).apply(null,arguments)},th=e._Abs=function(){return(th=e._Abs=e.asm.Abs).apply(null,arguments)},Yc=e._Acos=function(){return(Yc=e._Acos=e.asm.Acos).apply(null,arguments)},Ki=e._Acosh=function(){return(Ki=e._Acosh=e.asm.Acosh).apply(null,arguments)},eh=e._Add=function(){return(eh=e._Add=e.asm.Add).apply(null,arguments)},rh=e._AddN=function(){return(rh=e._AddN=e.asm.AddN).apply(null,arguments)},oh=e._All=function(){return(oh=e._All=e.asm.All).apply(null,arguments)},nh=e._Any=function(){return(nh=e._Any=e.asm.Any).apply(null,arguments)},sh=e._ArgMax=function(){return(sh=e._ArgMax=e.asm.ArgMax).apply(null,arguments)},Zc=e._ArgMin=function(){return(Zc=e._ArgMin=e.asm.ArgMin).apply(null,arguments)},Qc=e._Asin=function(){return(Qc=e._Asin=e.asm.Asin).apply(null,arguments)},ah=e._Asinh=function(){return(ah=e._Asinh=e.asm.Asinh).apply(null,arguments)},ih=e._Atan=function(){return(ih=e._Atan=e.asm.Atan).apply(null,arguments)},lh=e._Atan2=function(){return(lh=e._Atan2=e.asm.Atan2).apply(null,arguments)},Au=e._Atanh=function(){return(Au=e._Atanh=e.asm.Atanh).apply(null,arguments)},uh=e._AvgPool=function(){return(uh=e._AvgPool=e.asm.AvgPool).apply(null,arguments)},ch=e._AvgPool3D=function(){return(ch=e._AvgPool3D=e.asm.AvgPool3D).apply(null,arguments)},ph=e._AvgPool3DGrad=function(){return(ph=e._AvgPool3DGrad=e.asm.AvgPool3DGrad).apply(null,arguments)},xa=e._AvgPoolGrad=function(){return(xa=e._AvgPoolGrad=e.asm.AvgPoolGrad).apply(null,arguments)},mh=e._BatchMatMul=function(){return(mh=e._BatchMatMul=e.asm.BatchMatMul).apply(null,arguments)},dh=e._Bincount=function(){return(dh=e._Bincount=e.asm.Bincount).apply(null,arguments)},Jc=e._BitwiseAnd=function(){return(Jc=e._BitwiseAnd=e.asm.BitwiseAnd).apply(null,arguments)},fh=e._Ceil=function(){return(fh=e._Ceil=e.asm.Ceil).apply(null,arguments)},Eu=e._ClipByValue=function(){return(Eu=e._ClipByValue=e.asm.ClipByValue).apply(null,arguments)},hh=e._Conv2D=function(){return(hh=e._Conv2D=e.asm.Conv2D).apply(null,arguments)},gh=e._Conv2DBackpropInput=function(){return(gh=e._Conv2DBackpropInput=e.asm.Conv2DBackpropInput).apply(null,arguments)},xh=e._Conv3D=function(){return(xh=e._Conv3D=e.asm.Conv3D).apply(null,arguments)},Ns=e._Conv3DBackpropFilterV2=function(){return(Ns=e._Conv3DBackpropFilterV2=e.asm.Conv3DBackpropFilterV2).apply(null,arguments)},Ru=e._Conv3DBackpropInputV2=function(){return(Ru=e._Conv3DBackpropInputV2=e.asm.Conv3DBackpropInputV2).apply(null,arguments)},bh=e._Cos=function(){return(bh=e._Cos=e.asm.Cos).apply(null,arguments)},yh=e._Cosh=function(){return(yh=e._Cosh=e.asm.Cosh).apply(null,arguments)},Ch=e._CropAndResize=function(){return(Ch=e._CropAndResize=e.asm.CropAndResize).apply(null,arguments)},Ih=e._Cumprod=function(){return(Ih=e._Cumprod=e.asm.Cumprod).apply(null,arguments)},tp=e._Cumsum=function(){return(tp=e._Cumsum=e.asm.Cumsum).apply(null,arguments)},ep=e._DenseBincount=function(){return(ep=e._DenseBincount=e.asm.DenseBincount).apply(null,arguments)},wh=e._DepthToSpace=function(){return(wh=e._DepthToSpace=e.asm.DepthToSpace).apply(null,arguments)},vh=e._DepthwiseConv2dNative=function(){return(vh=e._DepthwiseConv2dNative=e.asm.DepthwiseConv2dNative).apply(null,arguments)},rp=e._Diag=function(){return(rp=e._Diag=e.asm.Diag).apply(null,arguments)},op=e._Dilation2D=function(){return(op=e._Dilation2D=e.asm.Dilation2D).apply(null,arguments)},Sh=e._Dilation2DBackpropFilter=function(){return(Sh=e._Dilation2DBackpropFilter=e.asm.Dilation2DBackpropFilter).apply(null,arguments)},kh=e._Dilation2DBackpropInput=function(){return(kh=e._Dilation2DBackpropInput=e.asm.Dilation2DBackpropInput).apply(null,arguments)},Th=e._Elu=function(){return(Th=e._Elu=e.asm.Elu).apply(null,arguments)},_h=e._EluGrad=function(){return(_h=e._EluGrad=e.asm.EluGrad).apply(null,arguments)},np=e._Equal=function(){return(np=e._Equal=e.asm.Equal).apply(null,arguments)},fI=e._Erf=function(){return(fI=e._Erf=e.asm.Erf).apply(null,arguments)},Nh=e._Exp=function(){return(Nh=e._Exp=e.asm.Exp).apply(null,arguments)},Ah=e._Expm1=function(){return(Ah=e._Expm1=e.asm.Expm1).apply(null,arguments)},Eh=e._FlipLeftRight=function(){return(Eh=e._FlipLeftRight=e.asm.FlipLeftRight).apply(null,arguments)},Rh=e._Floor=function(){return(Rh=e._Floor=e.asm.Floor).apply(null,arguments)},Dh=e._FloorDiv=function(){return(Dh=e._FloorDiv=e.asm.FloorDiv).apply(null,arguments)},Fh=e._FusedBatchNorm=function(){return(Fh=e._FusedBatchNorm=e.asm.FusedBatchNorm).apply(null,arguments)},$h=e._FusedConv2D=function(){return($h=e._FusedConv2D=e.asm.FusedConv2D).apply(null,arguments)},Mh=e._FusedDepthwiseConv2D=function(){return(Mh=e._FusedDepthwiseConv2D=e.asm.FusedDepthwiseConv2D).apply(null,arguments)},Ph=e._Gather=function(){return(Ph=e._Gather=e.asm.Gather).apply(null,arguments)},Oh=e._GatherNd=function(){return(Oh=e._GatherNd=e.asm.GatherNd).apply(null,arguments)},Bh=e._Greater=function(){return(Bh=e._Greater=e.asm.Greater).apply(null,arguments)},Lh=e._GreaterEqual=function(){return(Lh=e._GreaterEqual=e.asm.GreaterEqual).apply(null,arguments)},Uh=e._IsFinite=function(){return(Uh=e._IsFinite=e.asm.IsFinite).apply(null,arguments)},Gh=e._IsInf=function(){return(Gh=e._IsInf=e.asm.IsInf).apply(null,arguments)},Vh=e._IsNan=function(){return(Vh=e._IsNan=e.asm.IsNan).apply(null,arguments)},Wh=e._LRN=function(){return(Wh=e._LRN=e.asm.LRN).apply(null,arguments)},zh=e._LRNGrad=function(){return(zh=e._LRNGrad=e.asm.LRNGrad).apply(null,arguments)},Hh=e._LeakyRelu=function(){return(Hh=e._LeakyRelu=e.asm.LeakyRelu).apply(null,arguments)},Kh=e._Less=function(){return(Kh=e._Less=e.asm.Less).apply(null,arguments)},qh=e._LessEqual=function(){return(qh=e._LessEqual=e.asm.LessEqual).apply(null,arguments)},jh=e._LinSpace=function(){return(jh=e._LinSpace=e.asm.LinSpace).apply(null,arguments)},Xh=e._Log=function(){return(Xh=e._Log=e.asm.Log).apply(null,arguments)},Yh=e._Log1p=function(){return(Yh=e._Log1p=e.asm.Log1p).apply(null,arguments)},Zh=e._LogicalAnd=function(){return(Zh=e._LogicalAnd=e.asm.LogicalAnd).apply(null,arguments)},Qh=e._LogicalNot=function(){return(Qh=e._LogicalNot=e.asm.LogicalNot).apply(null,arguments)},Jh=e._LogicalOr=function(){return(Jh=e._LogicalOr=e.asm.LogicalOr).apply(null,arguments)},tg=e._LogicalXor=function(){return(tg=e._LogicalXor=e.asm.LogicalXor).apply(null,arguments)},eg=e._Max=function(){return(eg=e._Max=e.asm.Max).apply(null,arguments)},rg=e._MaxPool=function(){return(rg=e._MaxPool=e.asm.MaxPool).apply(null,arguments)},og=e._MaxPool3D=function(){return(og=e._MaxPool3D=e.asm.MaxPool3D).apply(null,arguments)},ng=e._MaxPool3DGrad=function(){return(ng=e._MaxPool3DGrad=e.asm.MaxPool3DGrad).apply(null,arguments)},sg=e._MaxPoolGrad=function(){return(sg=e._MaxPoolGrad=e.asm.MaxPoolGrad).apply(null,arguments)},ag=e._MaxPoolWithArgmax=function(){return(ag=e._MaxPoolWithArgmax=e.asm.MaxPoolWithArgmax).apply(null,arguments)},ig=e._Maximum=function(){return(ig=e._Maximum=e.asm.Maximum).apply(null,arguments)},lg=e._Mean=function(){return(lg=e._Mean=e.asm.Mean).apply(null,arguments)},ug=e._Min=function(){return(ug=e._Min=e.asm.Min).apply(null,arguments)},cg=e._Minimum=function(){return(cg=e._Minimum=e.asm.Minimum).apply(null,arguments)},pg=e._MirrorPad=function(){return(pg=e._MirrorPad=e.asm.MirrorPad).apply(null,arguments)},mg=e._Mod=function(){return(mg=e._Mod=e.asm.Mod).apply(null,arguments)},dg=e._Multinomial=function(){return(dg=e._Multinomial=e.asm.Multinomial).apply(null,arguments)},fg=e._Multiply=function(){return(fg=e._Multiply=e.asm.Multiply).apply(null,arguments)},hg=e._Neg=function(){return(hg=e._Neg=e.asm.Neg).apply(null,arguments)},gg=e._NonMaxSuppressionV3=function(){return(gg=e._NonMaxSuppressionV3=e.asm.NonMaxSuppressionV3).apply(null,arguments)},xg=e._NonMaxSuppressionV4=function(){return(xg=e._NonMaxSuppressionV4=e.asm.NonMaxSuppressionV4).apply(null,arguments)},bg=e._NonMaxSuppressionV5=function(){return(bg=e._NonMaxSuppressionV5=e.asm.NonMaxSuppressionV5).apply(null,arguments)},yg=e._NotEqual=function(){return(yg=e._NotEqual=e.asm.NotEqual).apply(null,arguments)},Cg=e._OneHot=function(){return(Cg=e._OneHot=e.asm.OneHot).apply(null,arguments)},Ig=e._PadV2=function(){return(Ig=e._PadV2=e.asm.PadV2).apply(null,arguments)},wg=e._Pow=function(){return(wg=e._Pow=e.asm.Pow).apply(null,arguments)},vg=e._Prelu=function(){return(vg=e._Prelu=e.asm.Prelu).apply(null,arguments)},Sg=e._Prod=function(){return(Sg=e._Prod=e.asm.Prod).apply(null,arguments)},kg=e._RealDiv=function(){return(kg=e._RealDiv=e.asm.RealDiv).apply(null,arguments)},Tg=e._Reciprocal=function(){return(Tg=e._Reciprocal=e.asm.Reciprocal).apply(null,arguments)},_g=e._Relu=function(){return(_g=e._Relu=e.asm.Relu).apply(null,arguments)},Ng=e._Relu6=function(){return(Ng=e._Relu6=e.asm.Relu6).apply(null,arguments)},Ag=e._ResizeBilinear=function(){return(Ag=e._ResizeBilinear=e.asm.ResizeBilinear).apply(null,arguments)},Eg=e._ResizeBilinearGrad=function(){return(Eg=e._ResizeBilinearGrad=e.asm.ResizeBilinearGrad).apply(null,arguments)},Rg=e._ResizeNearestNeighbor=function(){return(Rg=e._ResizeNearestNeighbor=e.asm.ResizeNearestNeighbor).apply(null,arguments)},Dg=e._ResizeNearestNeighborGrad=function(){return(Dg=e._ResizeNearestNeighborGrad=e.asm.ResizeNearestNeighborGrad).apply(null,arguments)},Fg=e._Reverse=function(){return(Fg=e._Reverse=e.asm.Reverse).apply(null,arguments)},$g=e._RotateWithOffset=function(){return($g=e._RotateWithOffset=e.asm.RotateWithOffset).apply(null,arguments)},Mg=e._Round=function(){return(Mg=e._Round=e.asm.Round).apply(null,arguments)},Pg=e._Rsqrt=function(){return(Pg=e._Rsqrt=e.asm.Rsqrt).apply(null,arguments)},Og=e._ScatterNd=function(){return(Og=e._ScatterNd=e.asm.ScatterNd).apply(null,arguments)},Bg=e._SearchSorted=function(){return(Bg=e._SearchSorted=e.asm.SearchSorted).apply(null,arguments)},Lg=e._SelectV2=function(){return(Lg=e._SelectV2=e.asm.SelectV2).apply(null,arguments)},Ug=e._Selu=function(){return(Ug=e._Selu=e.asm.Selu).apply(null,arguments)},Gg=e._Sigmoid=function(){return(Gg=e._Sigmoid=e.asm.Sigmoid).apply(null,arguments)},Vg=e._Sign=function(){return(Vg=e._Sign=e.asm.Sign).apply(null,arguments)},Wg=e._Sin=function(){return(Wg=e._Sin=e.asm.Sin).apply(null,arguments)},zg=e._Sinh=function(){return(zg=e._Sinh=e.asm.Sinh).apply(null,arguments)},Hg=e._Softmax=function(){return(Hg=e._Softmax=e.asm.Softmax).apply(null,arguments)},Kg=e._Softplus=function(){return(Kg=e._Softplus=e.asm.Softplus).apply(null,arguments)},qg=e._SparseFillEmptyRows=function(){return(qg=e._SparseFillEmptyRows=e.asm.SparseFillEmptyRows).apply(null,arguments)},jg=e._SparseReshape=function(){return(jg=e._SparseReshape=e.asm.SparseReshape).apply(null,arguments)},Xg=e._SparseSegmentReduction=function(){return(Xg=e._SparseSegmentReduction=e.asm.SparseSegmentReduction).apply(null,arguments)},Yg=e._SparseToDense=function(){return(Yg=e._SparseToDense=e.asm.SparseToDense).apply(null,arguments)},Zg=e._Sqrt=function(){return(Zg=e._Sqrt=e.asm.Sqrt).apply(null,arguments)},Qg=e._Square=function(){return(Qg=e._Square=e.asm.Square).apply(null,arguments)},Jg=e._SquaredDifference=function(){return(Jg=e._SquaredDifference=e.asm.SquaredDifference).apply(null,arguments)},tx=e._Step=function(){return(tx=e._Step=e.asm.Step).apply(null,arguments)},ex=e._StridedSlice=function(){return(ex=e._StridedSlice=e.asm.StridedSlice).apply(null,arguments)},rx=e._Sub=function(){return(rx=e._Sub=e.asm.Sub).apply(null,arguments)},ox=e._Sum=function(){return(ox=e._Sum=e.asm.Sum).apply(null,arguments)},nx=e._Tan=function(){return(nx=e._Tan=e.asm.Tan).apply(null,arguments)},sx=e._Tanh=function(){return(sx=e._Tanh=e.asm.Tanh).apply(null,arguments)},ax=e._TensorScatterUpdate=function(){return(ax=e._TensorScatterUpdate=e.asm.TensorScatterUpdate).apply(null,arguments)},ix=e._Tile=function(){return(ix=e._Tile=e.asm.Tile).apply(null,arguments)},lx=e._TopK=function(){return(lx=e._TopK=e.asm.TopK).apply(null,arguments)},ux=e._Transform=function(){return(ux=e._Transform=e.asm.Transform).apply(null,arguments)},cx=e._Transpose=function(){return(cx=e._Transpose=e.asm.Transpose).apply(null,arguments)},px=e.__FusedMatMul=function(){return(px=e.__FusedMatMul=e.asm._FusedMatMul).apply(null,arguments)},mx=e._malloc=function(){return(mx=e._malloc=e.asm.malloc).apply(null,arguments)},dx=e._free=function(){return(dx=e._free=e.asm.free).apply(null,arguments)},fx=e.___errno_location=function(){return(fx=e.___errno_location=e.asm.__errno_location).apply(null,arguments)},sp=e.stackSave=function(){return(sp=e.stackSave=e.asm.stackSave).apply(null,arguments)},ap=e.stackRestore=function(){return(ap=e.stackRestore=e.asm.stackRestore).apply(null,arguments)},Du=e.stackAlloc=function(){return(Du=e.stackAlloc=e.asm.stackAlloc).apply(null,arguments)},hx=e.dynCall_iijjiiii=function(){return(hx=e.dynCall_iijjiiii=e.asm.dynCall_iijjiiii).apply(null,arguments)},gx=e.dynCall_jiji=function(){return(gx=e.dynCall_jiji=e.asm.dynCall_jiji).apply(null,arguments)};e.cwrap=Yf;var qi;Oe=function H(){qi||ip(),qi||(Oe=H)};function ip(H){if(H=H||l,ce>0||(Xt(),ce>0))return;function et(){qi||(qi=!0,e.calledRun=!0,!B&&(Zt(),o(e),e.onRuntimeInitialized&&e.onRuntimeInitialized(),cr()))}e.setStatus?(e.setStatus("Running..."),setTimeout(function(){setTimeout(function(){e.setStatus("")},1),et()},1)):et()}if(e.preInit)for(typeof e.preInit=="function"&&(e.preInit=[e.preInit]);e.preInit.length>0;)e.preInit.pop()();ip();var ji;s&&(ji={uncaughtException:process.listeners("uncaughtException").filter(function(H){return!s.uncaughtException.indexOf(H)>-1}),unhandledRejection:process.listeners("unhandledRejection").filter(function(H){return!s.unhandledRejection.indexOf(H)>-1})});var Xi;if(typeof t<"u")Xi=t;else if(typeof WasmBackendModuleThreadedSimd<"u")Xi=WasmBackendModuleThreadedSimd;else throw new Error("Could not find wasm module in post.js");if(ji){var xx=Xi._dispose;Xi._dispose=function(){xx(),ji.uncaughtException.forEach(function(H){process.removeListener("uncaughtException",H)}),ji.unhandledRejection.forEach(function(H){process.removeListener("unhandledRejection",H)})}}return t.ready}})();typeof Nf=="object"&&typeof PC=="object"?PC.exports=MC:typeof define=="function"&&define.amd?define([],function(){return MC}):typeof Nf=="object"&&(Nf.WasmBackendModule=MC)});var $o=class{constructor(t,e){this.backend=t,this.dataMover=e,this.data=new WeakMap,this.dataIdsCount=0}get(t){return this.data.has(t)||this.dataMover.moveData(this.backend,t),this.data.get(t)}set(t,e){this.dataIdsCount++,this.data.set(t,e)}has(t){return this.data.has(t)}delete(t){return this.dataIdsCount--,this.data.delete(t)}numDataIds(){return this.dataIdsCount}},Xr=class{refCount(t){return mr("refCount")}incRef(t){return mr("incRef")}timerAvailable(){return!0}time(t){return mr("time")}read(t){return mr("read")}readSync(t){return mr("readSync")}readToGPU(t,e){return mr("readToGPU")}numDataIds(){return mr("numDataIds")}disposeData(t,e){return mr("disposeData")}write(t,e,o){return mr("write")}move(t,e,o,n,s){return mr("move")}createTensorFromGPUData(t,e,o){return mr("createTensorFromGPUData")}memory(){return mr("memory")}floatPrecision(){return mr("floatPrecision")}epsilon(){return this.floatPrecision()===32?1e-7:1e-4}dispose(){return mr("dispose")}};function mr(r){throw new Error(`'${r}' not yet implemented or not found in the registry. This kernel may not be supported by the tfjs backend you have chosen`)}function vI(r){let t=r.length,e=0;for(;t>0;)e=Math.random()*t|0,t--,xp(r,t,e)}function rP(r,t){if(r.length!==t.length)throw new Error(`Array sizes must match to be shuffled together First array length was ${r.length}Second array length was ${t.length}`);let e=r.length,o=0;for(;e>0;)o=Math.random()*e|0,e--,xp(r,e,o),xp(t,e,o)}function Zi(r,t,e){return Math.max(r,Math.min(t,e))}function oP(r){return r%2===0?r:r+1}function xp(r,t,e){let o=r[t];r[t]=r[e],r[e]=o}function nP(r){let t=0;for(let e=0;e<r.length;e++)t+=r[e];return t}function sP(r,t){let e=Math.random();return t*e+(1-e)*r}function aP(r,t){let e=0;for(let o=0;o<r.length;o++){let n=Number(r[o])-Number(t[o]);e+=n*n}return e}function O(r,t){if(!r)throw new Error(typeof t=="string"?t:t())}function bp(r,t,e=""){O(Qi(r,t),()=>e+` Shapes ${r} and ${t} must match`)}function Mu(r){O(r!=null,()=>"The input to the tensor constructor must be a non-null value.")}function ge(r){if(r.length===0)return 1;let t=r[0];for(let e=1;e<r.length;e++)t*=r[e];return t}function iP(r){return r.length===0}function lP(r,t){if(r===t)return!0;if(r==null||t==null||r.length!==t.length)return!1;for(let e=0;e<r.length;e++)if(r[e]!==null&&t[e]!==null&&r[e]!==t[e])return!1;return!0}function Qi(r,t){if(r===t)return!0;if(r==null||t==null||r.length!==t.length)return!1;for(let e=0;e<r.length;e++)if(r[e]!==t[e])return!1;return!0}function Mo(r){return r%1===0}function uP(r){if(Math.tanh!=null)return Math.tanh(r);if(r===1/0)return 1;if(r===-1/0)return-1;{let t=Math.exp(2*r);return(t-1)/(t+1)}}function cP(r){let t=Math.ceil(Math.sqrt(r));return[t,Math.ceil(r/t)]}function pP(r){let t=new Uint32Array(r);for(let e=0;e<r;++e)t[e]=e;return vI(t),t}function ya(r,t){return t<=r.length?r:r+" ".repeat(t-r.length)}function mP(r,t=n=>0,e,o){return new Promise((n,s)=>{let i=0,l=()=>{if(r()){n();return}i++;let u=t(i);if(e!=null&&i>=e){s();return}o!=null?o(l,u):setTimeout(l,u)};l()})}function dP(r,t){let e=1,o=-1;for(let s=0;s<r.length;++s)if(r[s]>=0)e*=r[s];else if(r[s]===-1){if(o!==-1)throw Error(`Shapes can only have 1 implicit size. Found -1 at dim ${o} and dim ${s}`);o=s}else if(r[s]<0)throw Error(`Shapes can not be < 0. Found ${r[s]} at dim ${s}`);if(o===-1){if(t>0&&t!==e)throw Error(`Size(${t}) must match the product of shape ${r}`);return r}if(e===0)throw Error(`Cannot infer the missing size in [${r}] when there are 0 elements`);if(t%e!==0)throw Error(`The implicit shape can't be a fractional number. Got ${t} / ${e}`);let n=r.slice();return n[o]=t/e,n}function Ji(r,t){let e=t.length;return r=r==null?t.map((o,n)=>n):[].concat(r),O(r.every(o=>o>=-e&&o<e),()=>`All values in axis param must be in range [-${e}, ${e}) but got axis ${r}`),O(r.every(o=>Mo(o)),()=>`All values in axis param must be integers but got axis ${r}`),r.map(o=>o<0?e+o:o)}function wx(r,t){let e=[],o=[],n=t!=null&&Array.isArray(t)&&t.length===0,s=t==null||n?null:Ji(t,r).sort(),i=0;for(let l=0;l<r.length;++l){if(s!=null){if(s[i]===l&&r[l]!==1)throw new Error(`Can't squeeze axis ${l} since its dim '${r[l]}' is not 1`);(s[i]==null||s[i]>l)&&r[l]===1&&(e.push(r[l]),o.push(l)),s[i]<=l&&i++}r[l]!==1&&(e.push(r[l]),o.push(l))}return{newShape:e,keptDims:o}}function fP(r,t){return yp(r,t)}function yp(r,t){let e=null;if(r==null||r==="float32")e=new Float32Array(t);else if(r==="int32")e=new Int32Array(t);else if(r==="bool")e=new Uint8Array(t);else if(r==="string")e=new Array(t);else throw new Error(`Unknown data type ${r}`);return e}function vx(r,t){for(let e=0;e<r.length;e++){let o=r[e];if(isNaN(o)||!isFinite(o))throw Error(`A tensor of type ${t} being uploaded contains ${o}.`)}}function Sx(r){return r==="bool"||r==="complex64"||r==="float32"||r==="int32"||r==="string"}function hP(r,t){return!(t==="complex64"||t==="float32"&&r!=="complex64"||t==="int32"&&r!=="float32"&&r!=="complex64"||t==="bool"&&r==="bool")}function tl(r){if(r==="float32"||r==="int32")return 4;if(r==="complex64")return 8;if(r==="bool")return 1;throw new Error(`Unknown dtype ${r}`)}function kx(r){if(r==null)return 0;let t=0;return r.forEach(e=>t+=e.length),t}function el(r){return typeof r=="string"||r instanceof String}function SI(r){return typeof r=="boolean"}function kI(r){return typeof r=="number"}function Es(r){return Array.isArray(r)?Es(r[0]):r instanceof Float32Array?"float32":r instanceof Int32Array||r instanceof Uint8Array||r instanceof Uint8ClampedArray?"int32":kI(r)?"float32":el(r)?"string":SI(r)?"bool":"float32"}function rl(r){return!!(r&&r.constructor&&r.call&&r.apply)}function ol(r,t){for(let e=t;e<r;++e)if(r%e===0)return e;return r}function fo(r){let t=r.length;if(t<2)return[];let e=new Array(t-1);e[t-2]=r[t-1];for(let o=t-3;o>=0;--o)e[o]=e[o+1]*r[o+1];return e}function TI(r,t,e,o=!1){let n=new Array;if(t.length===1){let s=t[0]*(o?2:1);for(let i=0;i<s;i++)n[i]=e[r+i]}else{let s=t[0],i=t.slice(1),l=i.reduce((u,a)=>u*a)*(o?2:1);for(let u=0;u<s;u++)n[u]=TI(r+u*l,i,e,o)}return n}function ba(r,t,e=!1){if(r.length===0)return t[0];let o=r.reduce((n,s)=>n*s)*(e?2:1);if(o===0)return[];if(o!==t.length)throw new Error(`[${r}] does not match the input size ${t.length}${e?" for a complex tensor":""}.`);return TI(0,r,t,e)}function gP(r,t){if(Array.isArray(r))return r;if(t==="float32")return r instanceof Float32Array?r:new Float32Array(r);if(t==="int32")return r instanceof Int32Array?r:new Int32Array(r);if(t==="bool"||t==="string")return Uint8Array.from(new Int32Array(r));throw new Error(`Unknown dtype ${t}`)}function Tx(r,t){let e=nl(r,t);for(let o=0;o<e.length;o++)e[o]=1;return e}function nl(r,t){if(t==null||t==="float32"||t==="complex64")return new Float32Array(r);if(t==="int32")return new Int32Array(r);if(t==="bool")return new Uint8Array(r);throw new Error(`Unknown data type ${t}`)}function xP(r,t){let e=r.reduce((o,n)=>o*n,1);if(t==null||t==="float32")return ba(r,new Float32Array(e));if(t==="int32")return ba(r,new Int32Array(e));if(t==="bool")return ba(r,new Uint8Array(e));throw new Error(`Unknown data type ${t}`)}function Yr(r){r.forEach(t=>{O(Number.isInteger(t)&&t>=0,()=>`Tensor must have a shape comprised of positive integers but got shape [${r}].`)})}function bP(r,t,e){if(t===0)return 0;if(t===1)return r[0];let o=r[r.length-1];for(let n=0;n<r.length-1;++n)o+=e[n]*r[n];return o}function yP(r,t,e){if(t===0)return[];if(t===1)return[r];let o=new Array(t);for(let n=0;n<o.length-1;++n)o[n]=Math.floor(r/e[n]),r-=o[n]*e[n];return o[o.length-1]=r,o}function Ca(r){return r&&r.then&&typeof r.then=="function"}var _I="tfjsflags",Pu=class{constructor(t){this.global=t,this.flags={},this.flagRegistry={},this.urlFlags={},this.getQueryParams=IP,this.populateURLFlags()}setPlatform(t,e){this.platform!=null&&($().getBool("IS_TEST")||$().getBool("PROD")||console.warn(`Platform ${this.platformName} has already been set. Overwriting the platform with ${t}.`)),this.platformName=t,this.platform=e}registerFlag(t,e,o){if(this.flagRegistry[t]={evaluationFn:e,setHook:o},this.urlFlags[t]!=null){let n=this.urlFlags[t];$().getBool("IS_TEST")||$().getBool("PROD")||console.warn(`Setting feature override from URL ${t}: ${n}.`),this.set(t,n)}}async getAsync(t){return t in this.flags?this.flags[t]:(this.flags[t]=await this.evaluateFlag(t),this.flags[t])}get(t){if(t in this.flags)return this.flags[t];let e=this.evaluateFlag(t);if(Ca(e))throw new Error(`Flag ${t} cannot be synchronously evaluated. Please use getAsync() instead.`);return this.flags[t]=e,this.flags[t]}getNumber(t){return this.get(t)}getBool(t){return this.get(t)}getString(t){return this.get(t)}getFlags(){return this.flags}get features(){return this.flags}set(t,e){if(this.flagRegistry[t]==null)throw new Error(`Cannot set flag ${t} as it has not been registered.`);this.flags[t]=e,this.flagRegistry[t].setHook!=null&&this.flagRegistry[t].setHook(e)}evaluateFlag(t){if(this.flagRegistry[t]==null)throw new Error(`Cannot evaluate flag '${t}': no evaluation function found.`);return this.flagRegistry[t].evaluationFn()}setFlags(t){this.flags=Object.assign({},t)}reset(){this.flags={},this.urlFlags={},this.populateURLFlags()}populateURLFlags(){if(typeof this.global>"u"||typeof this.global.location>"u"||typeof this.global.location.search>"u")return;let t=this.getQueryParams(this.global.location.search);_I in t&&t[_I].split(",").forEach(o=>{let[n,s]=o.split(":");this.urlFlags[n]=vP(n,s)})}};function IP(r){let t={};return r.replace(/[?&]([^=?&]+)(?:=([^&]*))?/g,(e,...o)=>(wP(t,o[0],o[1]),o.join("="))),t}function wP(r,t,e){r[decodeURIComponent(t)]=decodeURIComponent(e||"")}function vP(r,t){let e=t.toLowerCase();return e==="true"||e==="false"?e==="true":`${+e}`===e?+e:t}function $(){return _x}var _x=null;function NI(r){_x=r}var Nx;function Ax(){if(Nx==null){let r;if(typeof window<"u")r=window;else if(typeof global<"u")r=global;else if(typeof process<"u")r=process;else if(typeof self<"u")r=self;else throw new Error("Could not find a global object");Nx=r}return Nx}function SP(){let r=Ax();return r._tfGlobals==null&&(r._tfGlobals=new Map),r._tfGlobals}function Ou(r,t){let e=SP();if(e.has(r))return e.get(r);{let o=t();return e.set(r,o),e.get(r)}}var Rs="Abs",Po="Acos",Oo="Acosh",Zr="Add",Ia="AddN",Bo="All",Lo="Any",Ds="ArgMax",Fs="ArgMin",Uo="Asin",Go="Asinh",Vo="Atan",Wo="Atanh",zo="Atan2",Ho="AvgPool",sl="AvgPoolGrad",al="AvgPool3D",il="AvgPool3DGrad",Ko="BatchMatMul",$s="BatchToSpaceND",wa="Bincount",va="BitwiseAnd";var ll="BroadcastArgs",ho="Cast",qo="Ceil",go="ClipByValue",ul="Complex",cl="ComplexAbs",Ms="Concat",jo="Conv2D",Cp="Conv2DBackpropFilter",Xo="Conv2DBackpropInput",Sa="Conv3D",ka="Conv3DBackpropFilterV2",Ta="Conv3DBackpropInputV2",Yo="Cos",Zo="Cosh",Qo="Cumprod",Jo="Cumsum",_a="CropAndResize",pl="DenseBincount",tn="DepthToSpace",en="DepthwiseConv2dNative",Ip="DepthwiseConv2dNativeBackpropFilter",wp="DepthwiseConv2dNativeBackpropInput",ml="Diag",rn="Dilation2D",dl="Dilation2DBackpropInput",fl="Dilation2DBackpropFilter",AI="Draw",on="RealDiv",vp="Einsum",nn="Elu",Na="EluGrad",sn="Erf",an="Equal",ln="Exp",Ps="ExpandDims",un="Expm1",hl="FFT",Os="Fill",Aa="FlipLeftRight",cn="Floor",pn="FloorDiv",mn="FusedBatchNorm",Bs="GatherV2",Ea="GatherNd",dn="Greater",fn="GreaterEqual",xo="Identity",gl="IFFT",xl="Imag",hn="IsFinite",gn="IsInf",xn="IsNan",bn="LeakyRelu",yn="Less",Cn="LessEqual",Ra="LinSpace",In="Log",wn="Log1p",vn="LogicalAnd",Sn="LogicalNot",kn="LogicalOr",EI="LogicalXor";var Tn="LRN",Da="LRNGrad";var _n="Max",Nn="Maximum",An="MaxPool",bl="MaxPoolGrad",yl="MaxPool3D",Cl="MaxPool3DGrad",Il="MaxPoolWithArgmax",En="Mean",Rn="Min",Dn="Minimum",Fn="MirrorPad",$n="Mod",Fa="Multinomial",Mn="Multiply",Ls="Neg",Pn="NotEqual",$a="NonMaxSuppressionV3",Ma="NonMaxSuppressionV4",Pa="NonMaxSuppressionV5",Us="OnesLike",On="OneHot",Gs="Pack",Bn="PadV2";var Ln="Pow",Un="Prelu",Gn="Prod",Sp="RaggedGather",kp="RaggedRange",Tp="RaggedTensorToTensor",wl="Range",vl="Real",Vn="Reciprocal",Wn="Relu",Vs="Reshape",zn="ResizeNearestNeighbor",Oa="ResizeNearestNeighborGrad",Hn="ResizeBilinear",Ba="ResizeBilinearGrad",Kn="Relu6",qn="Reverse",jn="Round",Xn="Rsqrt",La="ScatterNd",Ua="TensorScatterUpdate",Ga="SearchSorted",Ws="Select",Yn="Selu",zs="Slice",Zn="Sin",Qn="Sinh",Jn="Sign",ts="Sigmoid",es="Softplus",rs="Sqrt",os="Sum",Hs="SpaceToBatchND",Ks="SplitV",ns="Softmax",Sl="SparseFillEmptyRows",Va="SparseReshape",kl="SparseSegmentMean",Tl="SparseSegmentSum",Wa="SparseToDense",ss="SquaredDifference",_l="Square",Bu="StaticRegexReplace",as="StridedSlice",Nl="StringNGrams",Al="StringSplit",El="StringToHashBucketFast",is="Sub",ls="Tan",us="Tanh",Qr="Tile",cs="TopK",za="Transform",Jr="Transpose",qs="Unique",js="Unpack",Rl="UnsortedSegmentSum";var Xs="ZerosLike",bo="Step",RI="FromPixels",Ha="RotateWithOffset",Ka="_FusedMatMul",qa="FusedConv2D",ja="FusedDepthwiseConv2D";function ps(...r){$().getBool("IS_TEST")||$().getBool("PROD")||console.warn(...r)}function kP(...r){$().getBool("IS_TEST")||$().getBool("PROD")||console.log(...r)}var _p=Ou("kernelRegistry",()=>new Map),TP=Ou("gradRegistry",()=>new Map);function Ex(r,t){let e=FI(r,t);return _p.get(e)}function Rx(r){return TP.get(r)}function Dx(r){let t=_p.entries(),e=[];for(;;){let{done:o,value:n}=t.next();if(o)break;let[s,i]=n,[l]=s.split("_");l===r&&e.push(i)}return e}function Dl(r){let{kernelName:t,backendName:e}=r,o=FI(t,e);_p.has(o)&&ps(`The kernel '${t}' for backend '${e}' is already registered`),_p.set(o,r)}function FI(r,t){return`${t}_${r}`}var b={};mo(b,{arraysEqual:()=>Qi,arraysEqualWithNull:()=>lP,assert:()=>O,assertNonNegativeIntegerDimensions:()=>Yr,assertNonNull:()=>Mu,assertShapesMatch:()=>bp,bytesFromStringArray:()=>kx,bytesPerElement:()=>tl,checkConversionForErrors:()=>vx,clamp:()=>Zi,computeStrides:()=>fo,convertBackendValuesAndArrayBuffer:()=>gP,createScalarValue:()=>FP,createShuffledIndices:()=>pP,decodeString:()=>Ol,distSquared:()=>aP,encodeString:()=>Pl,fetch:()=>MP,fingerPrint64:()=>DP,flatten:()=>Zs,getArrayFromDType:()=>yp,getTypedArrayFromDType:()=>fP,hasEncodingLoss:()=>hP,hexToLong:()=>Lu,indexToLoc:()=>yP,inferDtype:()=>Es,inferFromImplicitShape:()=>dP,isBoolean:()=>SI,isFunction:()=>rl,isInt:()=>Mo,isNumber:()=>kI,isPromise:()=>Ca,isScalarShape:()=>iP,isString:()=>el,isTypedArray:()=>ze,isValidDtype:()=>Sx,locToIndex:()=>bP,makeOnesTypedArray:()=>Tx,makeZerosNestedTypedArray:()=>xP,makeZerosTypedArray:()=>nl,nearestDivisor:()=>ol,nearestLargerEven:()=>oP,now:()=>Ja,parseAxisParam:()=>Ji,randUniform:()=>sP,repeatedTry:()=>mP,rightPad:()=>ya,shuffle:()=>vI,shuffleCombo:()=>rP,sizeFromShape:()=>ge,sizeToSquarishShape:()=>cP,squeezeShape:()=>wx,sum:()=>nP,swap:()=>xp,tanh:()=>uP,toNestedArray:()=>ba,toTypedArray:()=>Ml});function Np(r){return r instanceof Float32Array||r instanceof Int32Array||r instanceof Uint8Array||r instanceof Uint8ClampedArray}var Px=$u(zI());var Qa=Px.default||Px;function Lu(r){return Qa.fromString(r,!0,16)}var KI=Lu("c3a5c85c97cb3127"),Za=Lu("b492b66fbe98f273"),qe=Lu("9ae16a3b2f90404f");function Mx(r){return r.xor(r.shru(47))}function qI(r,t,e){let o=r.slice(t,t+e);return Qa.fromBytes(Array.from(o),!0,!0)}function ee(r,t){return qI(r,t,8)}function HI(r,t){return qI(r,t,4)}function Ee(r,t){return t===0?r:r.shru(t).or(r.shl(64-t))}function Ys(r,t,e=Lu("9ddfea08eb382d69")){let o=r.xor(t).mul(e);o=o.xor(o.shru(47));let n=t.xor(o).mul(e);return n=n.xor(n.shru(47)),n=n.mul(e),n}function NP(r,t,e,o,n,s){n=n.add(r),s=Ee(s.add(n).add(o),21);let i=n;return n=n.add(t),n=n.add(e),s=s.add(Ee(n,44)),[n.add(o),s.add(i)]}function Ep(r,t,e,o){return NP(ee(r,t),ee(r,t+8),ee(r,t+16),ee(r,t+24),e,o)}function AP(r,t=r.length){if(t>=8){let e=qe.add(t*2),o=ee(r,0).add(qe),n=ee(r,t-8),s=Ee(n,37).mul(e).add(o),i=Ee(o,25).add(n).mul(e);return Ys(s,i,e)}if(t>=4){let e=qe.add(t*2),o=HI(r,0);return Ys(o.shl(3).add(t),HI(r,t-4),e)}if(t>0){let e=r[0],o=r[t>>1],n=r[t-1],s=e+(o<<8),i=t+(n<<2);return Mx(qe.mul(s).xor(KI.mul(i))).mul(qe)}return qe}function EP(r,t=r.length){let e=qe.add(t*2),o=ee(r,0).mul(Za),n=ee(r,8),s=ee(r,t-8).mul(e),i=ee(r,t-16).mul(qe);return Ys(Ee(o.add(n),43).add(Ee(s,30)).add(i),o.add(Ee(n.add(qe),18)).add(s),e)}function RP(r,t=r.length){let e=qe.add(t*2),o=ee(r,0).mul(qe),n=ee(r,8),s=ee(r,t-8).mul(e),i=ee(r,t-16).mul(qe),l=Ee(o.add(n),43).add(Ee(s,30)).add(i),u=Ys(l,o.add(Ee(n.add(qe),18)).add(s),e),a=ee(r,16).mul(e),c=ee(r,24),p=l.add(ee(r,t-32)).mul(e),m=u.add(ee(r,t-24)).mul(e);return Ys(Ee(a.add(c),43).add(Ee(p,30)).add(m),a.add(Ee(c.add(o),18)).add(p),e)}function DP(r,t=r.length){let e=Qa.fromNumber(81,!0);if(t<=32)return t<=16?AP(r,t):EP(r,t);if(t<=64)return RP(r,t);let o=e,n=e.mul(Za).add(113),s=Mx(n.mul(qe).add(113)).mul(qe),i=[Qa.UZERO,Qa.UZERO],l=[Qa.UZERO,Qa.UZERO];o=o.mul(qe).add(ee(r,0));let u=0,a=(t-1>>6)*64,c=a+(t-1&63)-63;do o=Ee(o.add(n).add(i[0]).add(ee(r,u+8)),37).mul(Za),n=Ee(n.add(i[1]).add(ee(r,u+48)),42).mul(Za),o=o.xor(l[1]),n=n.add(i[0]).add(ee(r,u+40)),s=Ee(s.add(l[0]),33).mul(Za),i=Ep(r,u,i[1].mul(Za),o.add(l[0])),l=Ep(r,u+32,s.add(l[1]),n.add(ee(r,u+16))),[s,o]=[o,s],u+=64;while(u!==a);let p=Za.add(s.and(255).shl(1));return u=c,l[0]=l[0].add(t-1&63),i[0]=i[0].add(l[0]),l[0]=l[0].add(i[0]),o=Ee(o.add(n).add(i[0]).add(ee(r,u+8)),37).mul(p),n=Ee(n.add(i[1]).add(ee(r,u+48)),42).mul(p),o=o.xor(l[1].mul(9)),n=n.add(i[0].mul(9).add(ee(r,u+40))),s=Ee(s.add(l[0]),33).mul(p),i=Ep(r,u,i[1].mul(p),o.add(l[0])),l=Ep(r,u+32,s.add(l[1]),n.add(ee(r,u+16))),[s,o]=[o,s],Ys(Ys(i[0],l[0],p).add(Mx(n).mul(KI)).add(s),Ys(i[1],l[1],p).add(o),p)}function FP(r,t){return t==="string"?Pl(r):Ml([r],t)}function $P(r,t){return r instanceof Float32Array&&t==="float32"||r instanceof Int32Array&&t==="int32"||r instanceof Uint8Array&&t==="bool"}function Ml(r,t){if(t==="string")throw new Error("Cannot convert a string[] to a TypedArray");if(Array.isArray(r)&&(r=Zs(r)),$().getBool("DEBUG")&&vx(r,t),$P(r,t))return r;if(t==null||t==="float32"||t==="complex64")return new Float32Array(r);if(t==="int32")return new Int32Array(r);if(t==="bool"){let e=new Uint8Array(r.length);for(let o=0;o<e.length;++o)Math.round(r[o])!==0&&(e[o]=1);return e}else throw new Error(`Unknown data type ${t}`)}function Ja(){return $().platform.now()}function MP(r,t){return $().platform.fetch(r,t)}function Pl(r,t="utf-8"){return t=t||"utf-8",$().platform.encode(r,t)}function Ol(r,t="utf-8"){return t=t||"utf-8",$().platform.decode(r,t)}function ze(r){return $().platform.isTypedArray!=null?$().platform.isTypedArray(r):Np(r)}function Zs(r,t=[],e=!1){if(t==null&&(t=[]),typeof r=="boolean"||typeof r=="number"||typeof r=="string"||Ca(r)||r==null||ze(r)&&e)t.push(r);else if(Array.isArray(r)||ze(r))for(let o=0;o<r.length;++o)Zs(r[o],t,e);else{let o=-1;for(let n of Object.keys(r))/^([1-9]+[0-9]*|0)$/.test(n)&&(o=Math.max(o,Number(n)));for(let n=0;n<=o;n++)Zs(r[n],t,e)}return t}var Rp=class{constructor(t,e){this.backendTimer=t,this.logger=e,e==null&&(this.logger=new Ox)}profileKernel(t,e,o){let n,s=()=>{n=o()},i,l=Ja();if(this.backendTimer.timerAvailable())i=this.backendTimer.time(s);else{s();for(let a of n)a.dataSync();i=Promise.resolve({kernelMs:Ja()-l})}if($().getBool("CHECK_COMPUTATION_FOR_ERRORS"))for(let a=0;a<n.length;a++){let c=n[a];c.data().then(p=>{PP(p,c.dtype,t)})}return{kernelName:t,outputs:n,inputs:e,timeMs:i.then(a=>a.kernelMs),extraInfo:i.then(a=>a.getExtraProfileInfo!=null?a.getExtraProfileInfo():"")}}logKernelProfile(t){let{kernelName:e,outputs:o,timeMs:n,inputs:s,extraInfo:i}=t;o.forEach(l=>{Promise.all([l.data(),n,i]).then(u=>{this.logger.logKernelProfile(e,l,u[0],u[1],s,u[2])})})}};function PP(r,t,e){if(t!=="float32")return!1;for(let o=0;o<r.length;o++){let n=r[o];if(isNaN(n)||!isFinite(n))return console.warn(`Found ${n} in the result of '${e}'`),!0}return!1}var Ox=class{logKernelProfile(t,e,o,n,s,i){let l=typeof n=="number"?ya(`${n}ms`,9):n.error,u=ya(t,25),a=e.rank,c=e.size,p=ya(e.shape.toString(),14),m="";for(let d in s){let f=s[d];if(f!=null){let h=f.shape||e.shape,g=h.length;m+=`${d}: ${g}D ${g>0?h:""} `}}console.log(`%c${u}	%c${l}	%c${a}D ${p}	%c${c}	%c${m}	%c${i}`,"font-weight:bold","color:red","color:blue","color: orange","color: green","color: steelblue")}};function jI(r,t,e){let o={},n={};for(let u=0;u<t.length;u++)o[t[u].id]=!0;for(let u=0;u<r.length;u++){let a=r[u],c=a.inputs;for(let p in c){let m=c[p],d=!1;for(let f=0;f<t.length;f++)if(o[m.id]){a.outputs.forEach(h=>o[h.id]=!0),d=!0,n[a.id]=!0;break}if(d)break}}let s={};s[e.id]=!0;let i={};for(let u=r.length-1;u>=0;u--){let a=r[u],c=a.inputs;for(let p=0;p<a.outputs.length;p++)if(s[a.outputs[p].id]){for(let m in c)s[c[m].id]=!0,i[a.id]=!0;break}}let l=[];for(let u=0;u<r.length;u++){let a=r[u];if(n[a.id]&&i[a.id]){let c={};for(let m in a.inputs){let d=a.inputs[m];o[d.id]&&(c[m]=d)}let p=Object.assign({},a);p.inputs=c,p.outputs=a.outputs,l.push(p)}}return l}function XI(r,t,e,o){for(let n=t.length-1;n>=0;n--){let s=t[n],i=[];if(s.outputs.forEach(u=>{let a=r[u.id];a!=null?i.push(a):i.push(null)}),s.gradient==null)throw new Error(`Cannot compute gradient: gradient function not found for ${s.kernelName}.`);let l=s.gradient(i);for(let u in s.inputs){if(!(u in l))throw new Error(`Cannot backprop through input ${u}. Available gradients found: ${Object.keys(l)}.`);let a=e(()=>l[u]());if(a.dtype!=="float32")throw new Error(`Error in gradient for op ${s.kernelName}. The gradient of input ${u} must have 'float32' dtype, but has '${a.dtype}'`);let c=s.inputs[u];if(!Qi(a.shape,c.shape))throw new Error(`Error in gradient for op ${s.kernelName}. The gradient of input '${u}' has shape '${a.shape}', which does not match the shape of the input '${c.shape}'`);if(r[c.id]==null)r[c.id]=a;else{let p=r[c.id];r[c.id]=o(p,a),p.dispose()}}}}var YI=20,Uu=3,Bx=7;function ZI(r,t,e,o){let n=fo(t),s=OP(r,t,e,n),i=t.length,l=Dp(r,t,e,n,s),u=["Tensor"];return o&&(u.push(`  dtype: ${e}`),u.push(`  rank: ${i}`),u.push(`  shape: [${t}]`),u.push("  values:")),u.push(l.map(a=>"    "+a).join(`
`)),u.join(`
`)}function OP(r,t,e,o){let n=ge(t),s=o[o.length-1],i=new Array(s).fill(0),l=t.length,u=e==="complex64"?Vu(r):r;if(l>1)for(let a=0;a<n/s;a++){let c=a*s;for(let p=0;p<s;p++)i[p]=Math.max(i[p],Gu(u[c+p],0,e).length)}return i}function Gu(r,t,e){let o;return Array.isArray(r)?o=`${parseFloat(r[0].toFixed(Bx))} + ${parseFloat(r[1].toFixed(Bx))}j`:el(r)?o=`'${r}'`:e==="bool"?o=QI(r):o=parseFloat(r.toFixed(Bx)).toString(),ya(o,t)}function QI(r){return r===0?"false":"true"}function Dp(r,t,e,o,n,s=!0){let i=e==="complex64"?2:1,l=t[0],u=t.length;if(u===0){if(e==="complex64"){let h=Vu(r);return[Gu(h[0],0,e)]}return e==="bool"?[QI(r[0])]:[r[0].toString()]}if(u===1){if(l>YI){let g=Uu*i,x=Array.from(r.slice(0,g)),y=Array.from(r.slice((l-Uu)*i,l*i));return e==="complex64"&&(x=Vu(x),y=Vu(y)),["["+x.map((C,I)=>Gu(C,n[I],e)).join(", ")+", ..., "+y.map((C,I)=>Gu(C,n[l-Uu+I],e)).join(", ")+"]"]}return["["+(e==="complex64"?Vu(r):Array.from(r)).map((g,x)=>Gu(g,n[x],e)).join(", ")+"]"]}let a=t.slice(1),c=o.slice(1),p=o[0]*i,m=[];if(l>YI){for(let h=0;h<Uu;h++){let g=h*p,x=g+p;m.push(...Dp(r.slice(g,x),a,e,c,n,!1))}m.push("...");for(let h=l-Uu;h<l;h++){let g=h*p,x=g+p;m.push(...Dp(r.slice(g,x),a,e,c,n,h===l-1))}}else for(let h=0;h<l;h++){let g=h*p,x=g+p;m.push(...Dp(r.slice(g,x),a,e,c,n,h===l-1))}let d=u===2?",":"";m[0]="["+(l>0?m[0]+d:"");for(let h=1;h<m.length-1;h++)m[h]=" "+m[h]+d;let f=`,
`;for(let h=2;h<u;h++)f+=`
`;return m[m.length-1]=" "+m[m.length-1]+"]"+(s?"":f),m}function Vu(r){let t=[];for(let e=0;e<r.length;e+=2)t.push([r[e],r[e+1]]);return t}var qt=class{constructor(t,e,o){if(this.dtype=e,this.shape=t.slice(),this.size=ge(t),o!=null){let n=o.length;O(n===this.size,()=>`Length of values '${n}' does not match the size inferred by the shape '${this.size}'.`)}if(e==="complex64")throw new Error("complex64 dtype TensorBuffers are not supported. Please create a TensorBuffer for the real and imaginary parts separately and call tf.complex(real, imag).");this.values=o||yp(e,this.size),this.strides=fo(t)}set(t,...e){e.length===0&&(e=[0]),O(e.length===this.rank,()=>`The number of provided coordinates (${e.length}) must match the rank (${this.rank})`);let o=this.locToIndex(e);this.values[o]=t}get(...t){t.length===0&&(t=[0]);let e=0;for(let n of t){if(n<0||n>=this.shape[e]){let s=`Requested out of range element at ${t}.   Buffer shape=${this.shape}`;throw new Error(s)}e++}let o=t[t.length-1];for(let n=0;n<t.length-1;++n)o+=this.strides[n]*t[n];return this.values[o]}locToIndex(t){if(this.rank===0)return 0;if(this.rank===1)return t[0];let e=t[t.length-1];for(let o=0;o<t.length-1;++o)e+=this.strides[o]*t[o];return e}indexToLoc(t){if(this.rank===0)return[];if(this.rank===1)return[t];let e=new Array(this.shape.length);for(let o=0;o<e.length-1;++o)e[o]=Math.floor(t/this.strides[o]),t-=e[o]*this.strides[o];return e[e.length-1]=t,e}get rank(){return this.shape.length}toTensor(){return eo().makeTensor(this.values,this.shape,this.dtype)}},eo=null,Bl=null,BP=null;function JI(r){eo=r}function tw(r){Bl=r}function ew(r){BP=r}var Se=class{constructor(t,e,o,n){this.kept=!1,this.isDisposedInternal=!1,this.shape=t.slice(),this.dtype=e||"float32",this.size=ge(t),this.strides=fo(t),this.dataId=o,this.id=n,this.rankType=this.rank<5?this.rank.toString():"higher"}get rank(){return this.shape.length}async buffer(){let t=await this.data();return Bl.buffer(this.shape,this.dtype,t)}bufferSync(){return Bl.buffer(this.shape,this.dtype,this.dataSync())}async array(){let t=await this.data();return ba(this.shape,t,this.dtype==="complex64")}arraySync(){return ba(this.shape,this.dataSync(),this.dtype==="complex64")}async data(){this.throwIfDisposed();let t=eo().read(this.dataId);if(this.dtype==="string"){let e=await t;try{return e.map(o=>Ol(o))}catch{throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}}return t}dataToGPU(t){return this.throwIfDisposed(),eo().readToGPU(this.dataId,t)}dataSync(){this.throwIfDisposed();let t=eo().readSync(this.dataId);if(this.dtype==="string")try{return t.map(e=>Ol(e))}catch{throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}return t}async bytes(){this.throwIfDisposed();let t=await eo().read(this.dataId);return this.dtype==="string"?t:new Uint8Array(t.buffer)}dispose(){this.isDisposed||(this.kerasMask&&this.kerasMask.dispose(),eo().disposeTensor(this),this.isDisposedInternal=!0)}get isDisposed(){return this.isDisposedInternal}throwIfDisposed(){if(this.isDisposed)throw new Error("Tensor is disposed.")}print(t=!1){return Bl.print(this,t)}clone(){return this.throwIfDisposed(),Bl.clone(this)}toString(t=!1){let e=this.dataSync();return ZI(e,this.shape,this.dtype,t)}cast(t){return this.throwIfDisposed(),Bl.cast(this,t)}variable(t=!0,e,o){return this.throwIfDisposed(),eo().makeVariable(this,t,e,o)}};Object.defineProperty(Se,Symbol.hasInstance,{value:r=>!!r&&r.data!=null&&r.dataSync!=null&&r.throwIfDisposed!=null});function N(){return Ou("Tensor",()=>Se)}N();var ms=class extends Se{constructor(t,e,o,n){super(t.shape,t.dtype,t.dataId,n),this.trainable=e,this.name=o}assign(t){if(t.dtype!==this.dtype)throw new Error(`dtype of the new value (${t.dtype}) and previous value (${this.dtype}) must match`);if(!Qi(t.shape,this.shape))throw new Error(`shape of the new value (${t.shape}) and previous value (${this.shape}) must match`);eo().disposeTensor(this),this.dataId=t.dataId,eo().incRef(this,null)}dispose(){eo().disposeVariable(this),this.isDisposedInternal=!0}};Object.defineProperty(ms,Symbol.hasInstance,{value:r=>r instanceof Se&&r.assign!=null&&r.assign instanceof Function});var Lx;(function(r){r.R0="R0",r.R1="R1",r.R2="R2",r.R3="R3",r.R4="R4",r.R5="R5",r.R6="R6"})(Lx||(Lx={}));var Ux;(function(r){r.float32="float32",r.int32="int32",r.bool="int32",r.complex64="complex64"})(Ux||(Ux={}));var Gx;(function(r){r.float32="float32",r.int32="int32",r.bool="bool",r.complex64="complex64"})(Gx||(Gx={}));var Vx;(function(r){r.float32="float32",r.int32="float32",r.bool="float32",r.complex64="complex64"})(Vx||(Vx={}));var Wx;(function(r){r.float32="complex64",r.int32="complex64",r.bool="complex64",r.complex64="complex64"})(Wx||(Wx={}));var LP={float32:Vx,int32:Ux,bool:Gx,complex64:Wx};function be(r,t){if(r==="string"||t==="string"){if(r==="string"&&t==="string")return"string";throw new Error(`Can not upcast ${r} with ${t}`)}return LP[r][t]}function ti(r){return be(r,"int32")}function Fp(r){return r!=null&&typeof r=="object"&&"texture"in r&&r.texture instanceof WebGLTexture}function $p(r){return typeof GPUBuffer<"u"&&r!=null&&typeof r=="object"&&"buffer"in r&&r.buffer instanceof GPUBuffer}function Vt(r,t){if(r.dtype===t.dtype)return[r,t];let e=be(r.dtype,t.dtype);return[r.cast(e),t.cast(e)]}function Mp(r){let t=[];return rw(r,t,new Set),t}function rw(r,t,e){if(r==null)return;if(r instanceof Se){t.push(r);return}if(!UP(r))return;let o=r;for(let n in o){let s=o[n];e.has(s)||(e.add(s),rw(s,t,e))}}function UP(r){return Array.isArray(r)||typeof r=="object"}function zx(r){return r.kernelName!=null}var Pp=class{constructor(){this.registeredVariables={},this.nextTapeNodeId=0,this.numBytes=0,this.numTensors=0,this.numStringTensors=0,this.numDataBuffers=0,this.gradientDepth=0,this.kernelDepth=0,this.scopeStack=[],this.numDataMovesStack=[],this.nextScopeId=0,this.tensorInfo=new WeakMap,this.profiling=!1,this.activeProfile={newBytes:0,newTensors:0,peakBytes:0,kernels:[],result:null,get kernelNames(){return Array.from(new Set(this.kernels.map(t=>t.name)))}}}dispose(){for(let t in this.registeredVariables)this.registeredVariables[t].dispose()}},Wu=class r{constructor(t){this.ENV=t,this.registry={},this.registryFactory={},this.pendingBackendInitId=0,this.state=new Pp}async ready(){if(this.pendingBackendInit!=null)return this.pendingBackendInit.then(()=>{});if(this.backendInstance!=null)return;let t=this.getSortedBackends();for(let e=0;e<t.length;e++){let o=t[e];if(await this.initializeBackend(o).success){await this.setBackend(o);return}}throw new Error("Could not initialize any backends, all backend initializations failed.")}get backend(){if(this.pendingBackendInit!=null)throw new Error(`Backend '${this.backendName}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);if(this.backendInstance==null){let{name:t,asyncInit:e}=this.initializeBackendsAndReturnBest();if(e)throw new Error(`The highest priority backend '${t}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);this.setBackend(t)}return this.backendInstance}backendNames(){return Object.keys(this.registryFactory)}findBackend(t){if(!(t in this.registry))if(t in this.registryFactory){let{asyncInit:e}=this.initializeBackend(t);if(e)return null}else return null;return this.registry[t]}findBackendFactory(t){return t in this.registryFactory?this.registryFactory[t].factory:null}registerBackend(t,e,o=1){return t in this.registryFactory?(ps(`${t} backend was already registered. Reusing existing backend factory.`),!1):(this.registryFactory[t]={factory:e,priority:o},!0)}async setBackend(t){if(this.registryFactory[t]==null)throw new Error(`Backend name '${t}' not found in registry`);if(this.backendName=t,this.registry[t]==null){this.backendInstance=null;let{success:e,asyncInit:o}=this.initializeBackend(t);if(!(o?await e:e))return!1}return this.backendInstance=this.registry[t],this.setupRegisteredKernels(),this.profiler=new Rp(this.backendInstance),!0}setupRegisteredKernels(){Dx(this.backendName).forEach(e=>{e.setupFunc!=null&&e.setupFunc(this.backendInstance)})}disposeRegisteredKernels(t){Dx(t).forEach(o=>{o.disposeFunc!=null&&o.disposeFunc(this.registry[t])})}initializeBackend(t){let e=this.registryFactory[t];if(e==null)throw new Error(`Cannot initialize backend ${t}, no registration found.`);try{let o=e.factory();if(o&&!(o instanceof Xr)&&typeof o.then=="function"){let n=++this.pendingBackendInitId,s=o.then(i=>n<this.pendingBackendInitId?!1:(this.registry[t]=i,this.pendingBackendInit=null,!0)).catch(i=>(n<this.pendingBackendInitId||(this.pendingBackendInit=null,ps(`Initialization of backend ${t} failed`),ps(i.stack||i.message)),!1));return this.pendingBackendInit=s,{success:s,asyncInit:!0}}else return this.registry[t]=o,{success:!0,asyncInit:!1}}catch(o){return ps(`Initialization of backend ${t} failed`),ps(o.stack||o.message),{success:!1,asyncInit:!1}}}removeBackend(t){if(!(t in this.registryFactory))throw new Error(`${t} backend not found in registry`);this.backendName===t&&this.pendingBackendInit!=null&&this.pendingBackendInitId++,t in this.registry&&(this.disposeRegisteredKernels(t),this.registry[t].dispose(),delete this.registry[t]),delete this.registryFactory[t],this.backendName===t&&(this.pendingBackendInit=null,this.backendName=null,this.backendInstance=null)}getSortedBackends(){if(Object.keys(this.registryFactory).length===0)throw new Error("No backend found in registry.");return Object.keys(this.registryFactory).sort((t,e)=>this.registryFactory[e].priority-this.registryFactory[t].priority)}initializeBackendsAndReturnBest(){let t=this.getSortedBackends();for(let e=0;e<t.length;e++){let o=t[e],{success:n,asyncInit:s}=this.initializeBackend(o);if(s||n)return{name:o,asyncInit:s}}throw new Error("Could not initialize any backends, all backend initializations failed.")}moveData(t,e){let o=this.state.tensorInfo.get(e),n=o.backend,s=this.readSync(e),i=n.refCount(e);n.disposeData(e,!0),o.backend=t,t.move(e,s,o.shape,o.dtype,i),this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack[this.state.numDataMovesStack.length-1]++}tidy(t,e){let o=null;if(e==null){if(typeof t!="function")throw new Error("Please provide a function to tidy()");e=t}else{if(typeof t!="string"&&!(t instanceof String))throw new Error("When calling with two arguments, the first argument to tidy() must be a string");if(typeof e!="function")throw new Error("When calling with two arguments, the 2nd argument to tidy() must be a function");o=t}let n;return this.scopedRun(()=>this.startScope(o),()=>this.endScope(n),()=>(n=e(),n instanceof Promise&&console.error("Cannot return a Promise inside of tidy."),n))}scopedRun(t,e,o){t();try{let n=o();return e(),n}catch(n){throw e(),n}}nextTensorId(){return r.nextTensorId++}nextVariableId(){return r.nextVariableId++}clone(t){let e=_.runKernel(xo,{x:t}),o={x:t},n=i=>({x:()=>{let l="float32",u={x:i},a={dtype:l};return _.runKernel(ho,u,a)}}),s=[];return this.addTapeNode(this.state.activeScope.name,o,[e],n,s,{}),e}runKernel(t,e,o){if(this.backendName==null&&this.backend,!(Ex(t,this.backendName)!=null))throw new Error(`Kernel '${t}' not registered for backend '${this.backendName}'`);return this.runKernelFunc({kernelName:t,inputs:e,attrs:o})}shouldCheckForMemLeaks(){return this.ENV.getBool("IS_TEST")}checkKernelForMemLeak(t,e,o){let n=this.backend.numDataIds(),s=0;o.forEach(u=>{s+=u.dtype==="complex64"?3:1});let i=this.state.numDataMovesStack[this.state.numDataMovesStack.length-1],l=n-e-s-i;if(l>0)throw new Error(`Backend '${this.backendName}' has an internal memory leak (${l} data ids) after running '${t}'`)}runKernelFunc(t){let e,o=[],n=this.isTapeOn(),s=this.state.numBytes,i=this.state.numTensors;this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack.push(0);let l;this.backendName==null&&this.backend;let u,a=zx(t)?t.kernelName:this.state.activeScope!=null?this.state.activeScope.name:"";if(zx(t)){let{kernelName:f,inputs:h,attrs:g}=t;this.backendName==null&&this.backend;let x=Ex(f,this.backendName);O(x!=null,()=>`Cannot find registered kernel '${f}' for backend '${this.backendName}'`),l=()=>{let y=this.backend.numDataIds();u=x.kernelFunc({inputs:h,attrs:g,backend:this.backend});let C=Array.isArray(u)?u:[u];this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(f,y,C);let I=C.map(v=>v.rank!=null?v:this.makeTensorFromTensorInfo(v));if(n){let v=this.getTensorsForGradient(f,h,I);o=this.saveTensorsForBackwardMode(v)}return I}}else{let{forwardFunc:f}=t,h=g=>{n&&(o=g.map(x=>this.keep(this.clone(x))))};l=()=>{let g=this.backend.numDataIds();u=this.tidy(()=>f(this.backend,h));let x=Array.isArray(u)?u:[u];return this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(a,g,x),x}}let{inputs:c,attrs:p}=t,m=zx(t)?null:t.backwardsFunc,d;return this.scopedRun(()=>this.state.kernelDepth++,()=>this.state.kernelDepth--,()=>{!this.ENV.getBool("DEBUG")&&!this.state.profiling?e=l():(d=this.profiler.profileKernel(a,c,()=>l()),this.ENV.getBool("DEBUG")&&this.profiler.logKernelProfile(d),e=d.outputs)}),n&&this.addTapeNode(a,c,e,m,o,p),this.state.profiling&&this.state.activeProfile.kernels.push({name:a,bytesAdded:this.state.numBytes-s,totalBytesSnapshot:this.state.numBytes,tensorsAdded:this.state.numTensors-i,totalTensorsSnapshot:this.state.numTensors,inputShapes:Object.keys(c).map(f=>c[f]!=null?c[f].shape:null),outputShapes:e.map(f=>f.shape),kernelTimeMs:d.timeMs,extraInfo:d.extraInfo}),Array.isArray(u)?e:e[0]}saveTensorsForBackwardMode(t){return t.map(o=>this.keep(this.clone(o)))}getTensorsForGradient(t,e,o){let n=Rx(t);if(n!=null){let s=n.inputsToSave||[],i=n.outputsToSave||[],l;n.saveAllInputs?(O(Array.isArray(e),()=>"saveAllInputs is true, expected inputs to be an array."),l=Object.keys(e).map(a=>e[a])):l=s.map(a=>e[a]);let u=o.filter((a,c)=>i[c]);return l.concat(u)}return[]}makeTensor(t,e,o,n){if(t==null)throw new Error("Values passed to engine.makeTensor() are null");o=o||"float32",n=n||this.backend;let s=t;o==="string"&&el(t[0])&&(s=t.map(u=>Pl(u)));let i=n.write(s,e,o),l=new Se(e,o,i,this.nextTensorId());if(this.trackTensor(l,n),o==="string"){let u=this.state.tensorInfo.get(i),a=kx(s);this.state.numBytes+=a-u.bytes,u.bytes=a}return l}makeTensorFromDataId(t,e,o,n){o=o||"float32";let s={dataId:t,shape:e,dtype:o};return this.makeTensorFromTensorInfo(s,n)}makeTensorFromTensorInfo(t,e){let{dataId:o,shape:n,dtype:s}=t,i=new Se(n,s,o,this.nextTensorId());return this.trackTensor(i,e),i}makeVariable(t,e=!0,o,n){o=o||this.nextVariableId().toString(),n!=null&&n!==t.dtype&&(t=t.cast(n));let s=new ms(t,e,o,this.nextTensorId());if(this.state.registeredVariables[s.name]!=null)throw new Error(`Variable with name ${s.name} was already registered`);return this.state.registeredVariables[s.name]=s,this.incRef(s,this.backend),s}trackTensor(t,e){this.state.numTensors++,t.dtype==="string"&&this.state.numStringTensors++;let o=0;t.dtype!=="complex64"&&t.dtype!=="string"&&(o=t.size*tl(t.dtype)),this.state.numBytes+=o,this.state.tensorInfo.has(t.dataId)||(this.state.numDataBuffers++,this.state.tensorInfo.set(t.dataId,{backend:e||this.backend,dtype:t.dtype,shape:t.shape,bytes:o})),t instanceof ms||this.track(t)}incRef(t,e){this.trackTensor(t,e),this.backend.incRef(t.dataId)}removeDataId(t,e){this.state.tensorInfo.has(t)&&this.state.tensorInfo.get(t).backend===e&&(this.state.tensorInfo.delete(t),this.state.numDataBuffers--)}disposeTensor(t){if(!this.state.tensorInfo.has(t.dataId))return;let e=this.state.tensorInfo.get(t.dataId);if(this.state.numTensors--,t.dtype==="string"&&(this.state.numStringTensors--,this.state.numBytes-=e.bytes),t.dtype!=="complex64"&&t.dtype!=="string"){let o=t.size*tl(t.dtype);this.state.numBytes-=o}e.backend.disposeData(t.dataId)&&this.removeDataId(t.dataId,e.backend)}disposeVariables(){for(let t in this.state.registeredVariables){let e=this.state.registeredVariables[t];this.disposeVariable(e)}}disposeVariable(t){this.disposeTensor(t),this.state.registeredVariables[t.name]!=null&&delete this.state.registeredVariables[t.name]}memory(){let t=this.backend.memory();return t.numTensors=this.state.numTensors,t.numDataBuffers=this.state.numDataBuffers,t.numBytes=this.state.numBytes,this.state.numStringTensors>0&&(t.unreliable=!0,t.reasons==null&&(t.reasons=[]),t.reasons.push("Memory usage by string tensors is approximate (2 bytes per character)")),t}async profile(t){this.state.profiling=!0;let e=this.state.numBytes,o=this.state.numTensors;this.state.activeProfile.kernels=[],this.state.activeProfile.result=await t(),this.state.profiling=!1,this.state.activeProfile.peakBytes=Math.max(...this.state.activeProfile.kernels.map(n=>n.totalBytesSnapshot)),this.state.activeProfile.newBytes=this.state.numBytes-e,this.state.activeProfile.newTensors=this.state.numTensors-o;for(let n of this.state.activeProfile.kernels)n.kernelTimeMs=await n.kernelTimeMs,n.extraInfo=await n.extraInfo;return this.state.activeProfile}isTapeOn(){return this.state.gradientDepth>0&&this.state.kernelDepth===0}addTapeNode(t,e,o,n,s,i){let l={id:this.state.nextTapeNodeId++,kernelName:t,inputs:e,outputs:o,saved:s},u=Rx(t);u!=null&&(n=u.gradFunc),n!=null&&(l.gradient=a=>(a=a.map((c,p)=>{if(c==null){let m=o[p],d=nl(m.size,m.dtype);return this.makeTensor(d,m.shape,m.dtype)}return c}),n(a.length>1?a:a[0],s,i))),this.state.activeTape.push(l)}keep(t){return t.kept=!0,t}startTape(){this.state.gradientDepth===0&&(this.state.activeTape=[]),this.state.gradientDepth++}endTape(){this.state.gradientDepth--}startScope(t){let e={track:[],name:"unnamed scope",id:this.state.nextScopeId++};t&&(e.name=t),this.state.scopeStack.push(e),this.state.activeScope=e}endScope(t){let e=Mp(t),o=new Set(e.map(s=>s.id));for(let s=0;s<this.state.activeScope.track.length;s++){let i=this.state.activeScope.track[s];!i.kept&&!o.has(i.id)&&i.dispose()}let n=this.state.scopeStack.pop();this.state.activeScope=this.state.scopeStack.length===0?null:this.state.scopeStack[this.state.scopeStack.length-1],e.forEach(s=>{!s.kept&&s.scopeId===n.id&&this.track(s)})}gradients(t,e,o,n=!1){if(O(e.length>0,()=>"gradients() received an empty list of xs."),o!=null&&o.dtype!=="float32")throw new Error(`dy must have 'float32' dtype, but has '${o.dtype}'`);let s=this.scopedRun(()=>this.startTape(),()=>this.endTape(),()=>this.tidy("forward",t));O(s instanceof Se,()=>"The result y returned by f() must be a tensor.");let i=jI(this.state.activeTape,e,s);if(!n&&i.length===0&&e.length>0)throw new Error("Cannot compute gradient of y=f(x) with respect to x. Make sure that the f you passed encloses all operations that lead from x to y.");return this.tidy("backward",()=>{let l={};l[s.id]=o??GP(s.shape),XI(l,i,a=>this.tidy(a),VP);let u=e.map(a=>l[a.id]);return this.state.gradientDepth===0&&(this.state.activeTape.forEach(a=>{for(let c of a.saved)c.dispose()}),this.state.activeTape=null),{value:s,grads:u}})}customGrad(t){return O(rl(t),()=>"The f passed in customGrad(f) must be a function."),(...e)=>{O(e.every(l=>l instanceof Se),()=>"The args passed in customGrad(f)(x1, x2,...) must all be tensors");let o,n={};e.forEach((l,u)=>{n[u]=l});let s=(l,u)=>(o=t(...e,u),O(o.value instanceof Se,()=>"The function f passed in customGrad(f) must return an object where `obj.value` is a tensor"),O(rl(o.gradFunc),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function."),o.value),i=(l,u)=>{let a=o.gradFunc(l,u),c=Array.isArray(a)?a:[a];O(c.length===e.length,()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns the same number of tensors as inputs passed to f(...)."),O(c.every(m=>m instanceof Se),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns a list of only tensors.");let p={};return c.forEach((m,d)=>{p[d]=()=>m}),p};return this.runKernelFunc({forwardFunc:s,backwardsFunc:i,inputs:n})}}readSync(t){return this.state.tensorInfo.get(t).backend.readSync(t)}read(t){return this.state.tensorInfo.get(t).backend.read(t)}readToGPU(t,e){return this.state.tensorInfo.get(t).backend.readToGPU(t,e)}async time(t){let e=Ja(),o=await this.backend.time(t);return o.wallMs=Ja()-e,o}track(t){return this.state.activeScope!=null&&(t.scopeId=this.state.activeScope.id,this.state.activeScope.track.push(t)),t}get registeredVariables(){return this.state.registeredVariables}reset(){this.pendingBackendInitId++,this.state.dispose(),this.ENV.reset(),this.state=new Pp;for(let t in this.registry)this.disposeRegisteredKernels(t),this.registry[t].dispose(),delete this.registry[t];this.backendName=null,this.backendInstance=null,this.pendingBackendInit=null}};Wu.nextTensorId=0;Wu.nextVariableId=0;function GP(r){let t=Tx(ge(r),"float32");return _.makeTensor(t,r,"float32")}function Hx(){let r=Ax();if(r._tfengine==null){let t=new Pu(r);r._tfengine=new Wu(t)}return NI(r._tfengine.ENV),JI(()=>r._tfengine),r._tfengine}var _=Hx();function VP(r,t){let e={a:r,b:t};return _.runKernel(Zr,e)}var Qs={};mo(Qs,{isBrowser:()=>qx,isMobile:()=>HP,mockIsMobile:()=>zP});function WP(){return typeof navigator<"u"&&navigator!=null}var Kx;function zP(r){Kx=r}function HP(r){if(Kx!==void 0)return Kx;if(r||WP()){if(r||(r=navigator),r.product==="ReactNative")return!0;let t=r.userAgent||r.vendor||(typeof window<"u"?window.opera:"");if(!t){let e=r;return e.userAgentData&&e.userAgentData.mobile}return/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0,4))}return!1}function qx(){return typeof window<"u"&&window.document!=null||typeof WorkerGlobalScope<"u"}var er=$();er.registerFlag("DEBUG",()=>!1,r=>{r&&console.warn("Debugging mode is ON. The output of every math call will be downloaded to CPU and checked for NaNs. This significantly impacts performance.")});er.registerFlag("IS_BROWSER",()=>qx());er.registerFlag("IS_NODE",()=>typeof process<"u"&&typeof process.versions<"u"&&typeof process.versions.node<"u");er.registerFlag("IS_CHROME",()=>typeof navigator<"u"&&navigator!=null&&navigator.userAgent!=null&&/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor));er.registerFlag("IS_SAFARI",()=>typeof navigator<"u"&&navigator!=null&&navigator.userAgent!=null&&/Safari/.test(navigator.userAgent)&&/Apple/.test(navigator.vendor));er.registerFlag("PROD",()=>!1);er.registerFlag("TENSORLIKE_CHECK_SHAPE_CONSISTENCY",()=>er.getBool("DEBUG"));er.registerFlag("DEPRECATION_WARNINGS_ENABLED",()=>!0);er.registerFlag("IS_TEST",()=>!1);er.registerFlag("CHECK_COMPUTATION_FOR_ERRORS",()=>er.getBool("DEBUG"));er.registerFlag("WRAP_TO_IMAGEBITMAP",()=>!1);er.registerFlag("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU",()=>!1);er.registerFlag("USE_SETTIMEOUTCUSTOM",()=>!1);function ei(r,t){let e=r;if(ze(r))return t==="string"?[]:[r.length];if(Fp(r)){let n=r.channels||"RGBA";return[r.height,r.width*n.length]}else if($p(r))return[r.buffer.size/(t==null?4:tl(t))];if(!Array.isArray(r))return[];let o=[];for(;Array.isArray(e)||ze(e)&&t!=="string";)o.push(e.length),e=e[0];return Array.isArray(r)&&$().getBool("TENSORLIKE_CHECK_SHAPE_CONSISTENCY")&&nw(r,o,[]),o}function nw(r,t,e){if(e=e||[],!Array.isArray(r)&&!ze(r)){O(t.length===0,()=>`Element arr[${e.join("][")}] is a primitive, but should be an array/TypedArray of ${t[0]} elements`);return}O(t.length>0,()=>`Element arr[${e.join("][")}] should be a primitive, but is an array of ${r.length} elements`),O(r.length===t[0],()=>`Element arr[${e.join("][")}] should have ${t[0]} elements, but has ${r.length} elements`);let o=t.slice(1);for(let n=0;n<r.length;++n)nw(r[n],o,e.concat(n))}function ow(r,t,e,o){if(r!=="string_or_numeric"){if(r==null)throw new Error("Expected dtype cannot be null.");if(r!=="numeric"&&r!==t||r==="numeric"&&t==="string")throw new Error(`Argument '${e}' passed to '${o}' must be ${r} tensor, but got ${t} tensor`)}}function T(r,t,e,o="numeric"){if(r instanceof N())return ow(o,r.dtype,t,e),r;let n=Es(r);if(n!=="string"&&["bool","int32","float32"].indexOf(o)>=0&&(n=o),ow(o,n,t,e),r==null||!ze(r)&&!Array.isArray(r)&&typeof r!="number"&&typeof r!="boolean"&&typeof r!="string"){let u=r==null?"null":r.constructor.name;throw new Error(`Argument '${t}' passed to '${e}' must be a Tensor or TensorLike, but got '${u}'`)}let s=ei(r,n);!ze(r)&&!Array.isArray(r)&&(r=[r]);let l=n!=="string"?Ml(r,n):Zs(r,[],!0);return _.makeTensor(l,s,n)}function Op(r,t,e,o="numeric"){if(!Array.isArray(r))throw new Error(`Argument ${t} passed to ${e} must be a \`Tensor[]\` or \`TensorLike[]\``);return r.map((s,i)=>T(s,`${t}[${i}]`,e,o))}var KP="__op";function E(r){let t=Object.keys(r);if(t.length!==1)throw new Error(`Please provide an object with a single key (operation name) mapping to a function. Got an object with ${t.length} keys.`);let e=t[0],o=r[e];e.endsWith("_")&&(e=e.substring(0,e.length-1)),e=e+KP;let n=(...s)=>{_.startScope(e);try{let i=o(...s);return Ca(i)&&console.error("Cannot return a Promise inside of tidy."),_.endScope(i),i}catch(i){throw _.endScope(null),i}};return Object.defineProperty(n,"name",{value:e,configurable:!0}),n}function qP(r,t){let e=T(r,"real","complex"),o=T(t,"imag","complex");bp(e.shape,o.shape,`real and imag shapes, ${e.shape} and ${o.shape}, must match in call to tf.complex().`);let n={real:e,imag:o};return _.runKernel(ul,n)}var ds=E({complex_:qP});function Js(r,t,e,o){if(o==null)o=Es(r);else if(o==="complex64")throw new Error("Cannot construct a complex64 tensor directly. Please use tf.complex(real, imag).");if($p(r)||Fp(r)){if(o!=="float32"&&o!=="int32")throw new Error(`Creating tensor from GPU data only supports 'float32'|'int32' dtype, while the dtype is ${o}.`);return _.backend.createTensorFromGPUData(r,t||e,o)}if(!ze(r)&&!Array.isArray(r)&&typeof r!="number"&&typeof r!="boolean"&&typeof r!="string")throw new Error("values passed to tensor(values) must be a number/boolean/string or an array of numbers/booleans/strings, or a TypedArray");if(t!=null){Yr(t);let n=ge(t),s=ge(e);O(n===s,()=>`Based on the provided shape, [${t}], the tensor should have ${n} values but has ${s}`);for(let i=0;i<e.length;++i){let l=e[i],u=i===e.length-1?l!==ge(t.slice(i)):!0;O(e[i]===t[i]||!u,()=>`Error creating a new Tensor. Inferred shape (${e}) does not match the provided shape (${t}). `)}}return!ze(r)&&!Array.isArray(r)&&(r=[r]),t=t||e,r=o!=="string"?Ml(r,o):Zs(r,[],!0),_.makeTensor(r,t,o)}function jx(r,t,e){let o=ei(r,e);return Js(r,t,o,e)}var hr=class r{static join(t){return new r(t).slice()}constructor(t){if(this.shards=[],this.previousShardIndex=0,t==null||(t instanceof Array||(t=[t]),t=t.map(o=>ze(o)?o.buffer:o),t.length===0))return;this.bufferUniformSize=t[0].byteLength;let e=0;for(let o=0;o<t.length;o++){let n=t[o];o!==t.length-1&&n.byteLength!==this.bufferUniformSize&&(this.bufferUniformSize=void 0);let s=e+n.byteLength;this.shards.push({buffer:n,start:e,end:s}),e=s}this.shards.length===0&&(this.byteLength=0),this.byteLength=this.shards[this.shards.length-1].end}slice(t=0,e=this.byteLength){if(this.shards.length===0)return new ArrayBuffer(0);if(t=isNaN(Number(t))?0:t,e=isNaN(Number(e))?0:e,t=Math.max(0,t),e=Math.min(this.byteLength,e),e<=t)return new ArrayBuffer(0);let o=this.findShardForByte(t);if(o===-1)throw new Error(`Could not find start shard for byte ${t}`);let n=e-t,s=new ArrayBuffer(n),i=new Uint8Array(s),l=0;for(let u=o;u<this.shards.length;u++){let a=this.shards[u],p=t+l-a.start,m=l,f=Math.min(e,a.end)-a.start,h=new Uint8Array(a.buffer,p,f-p);if(i.set(h,m),l+=h.length,e<a.end)break}return s}findShardForByte(t){if(this.shards.length===0||t<0||t>=this.byteLength)return-1;if(this.bufferUniformSize!=null)return this.previousShardIndex=Math.floor(t/this.bufferUniformSize),this.previousShardIndex;function e(n){return t<n.start?-1:t>=n.end?1:0}if(e(this.shards[this.previousShardIndex])===0)return this.previousShardIndex;let o=jP(this.shards,e);return o===-1?-1:(this.previousShardIndex=o,this.previousShardIndex)}};function jP(r,t){let e=0,o=r.length;for(;e<=o;){let n=Math.floor((o-e)/2)+e,s=t(r[n]);if(s===0)return n;s<0?o=n:e=n+1}return-1}function sw(r){$().getBool("DEPRECATION_WARNINGS_ENABLED")&&console.warn(r+" You can disable deprecation warnings with tf.disableDeprecationWarnings().")}ew(sw);function gr(){return _}function zt(r,t){return _.tidy(r,t)}function Ce(r){Mp(r).forEach(e=>e.dispose())}function aw(r){return _.keep(r)}function iw(r){return _.setBackend(r)}function lw(){return _.ready()}function Ll(r,t,e=1){return _.registerBackend(r,t,e)}var Xx=typeof Buffer<"u"&&(typeof Blob>"u"||typeof atob>"u"||typeof btoa>"u");function uw(r){return Xx?Buffer.byteLength(r,"utf8"):new Blob([r]).size}function cw(r){if(Xx)return Buffer.from(r).toString("base64");let t=new Uint8Array(r),e="";for(let o=0,n=t.length;o<n;o++)e+=String.fromCharCode(t[o]);return btoa(e)}function pw(r){if(Xx){let o=Buffer.from(r,"base64");return o.buffer.slice(o.byteOffset,o.byteOffset+o.byteLength)}let t=atob(r),e=new Uint8Array(t.length);for(let o=0;o<t.length;++o)e.set([t.charCodeAt(o)],o);return e.buffer}function Bp(r,t){let e={modelTopology:r.modelTopology,format:r.format,generatedBy:r.generatedBy,convertedBy:r.convertedBy,weightsManifest:t};return r.signature!=null&&(e.signature=r.signature),r.userDefinedMetadata!=null&&(e.userDefinedMetadata=r.userDefinedMetadata),r.modelInitializer!=null&&(e.modelInitializer=r.modelInitializer),r.initializerSignature!=null&&(e.initializerSignature=r.initializerSignature),r.trainingConfig!=null&&(e.trainingConfig=r.trainingConfig),e}function mw(r,t,e){let o={modelTopology:r.modelTopology,format:r.format,generatedBy:r.generatedBy,convertedBy:r.convertedBy};if(r.trainingConfig!=null&&(o.trainingConfig=r.trainingConfig),r.weightsManifest!=null){if(!t)throw new Error("modelJSON has weightsManifest but weightSpecs is null");if(!e)throw new Error("modelJSON has weightsManifest but weightData is null");o.weightSpecs=t,o.weightData=e}return r.signature!=null&&(o.signature=r.signature),r.userDefinedMetadata!=null&&(o.userDefinedMetadata=r.userDefinedMetadata),r.modelInitializer!=null&&(o.modelInitializer=r.modelInitializer),r.initializerSignature!=null&&(o.initializerSignature=r.initializerSignature),o}async function Lp(r,t){let e,o;return r.weightsManifest!=null&&([e,o]=await t(r.weightsManifest)),mw(r,e,o)}function fs(r){if(r.modelTopology instanceof ArrayBuffer)throw new Error("Expected JSON model topology, received ArrayBuffer.");return{dateSaved:new Date,modelTopologyType:"JSON",modelTopologyBytes:r.modelTopology==null?0:uw(JSON.stringify(r.modelTopology)),weightSpecsBytes:r.weightSpecs==null?0:uw(JSON.stringify(r.weightSpecs)),weightDataBytes:r.weightData==null?0:new hr(r.weightData).byteLength}}function Up(r){let t=[];for(let e of r)t.push(...e.weights);return t}var xr=class r{constructor(){this.saveRouters=[],this.loadRouters=[]}static getInstance(){return r.instance==null&&(r.instance=new r),r.instance}static registerSaveRouter(t){r.getInstance().saveRouters.push(t)}static registerLoadRouter(t){r.getInstance().loadRouters.push(t)}static getSaveHandlers(t){return r.getHandlers(t,"save")}static getLoadHandlers(t,e){return r.getHandlers(t,"load",e)}static getHandlers(t,e,o){let n=[];return(e==="load"?r.getInstance().loadRouters:r.getInstance().saveRouters).forEach(i=>{let l=i(t,o);l!==null&&n.push(l)}),n}};var Yx="tensorflowjs",Zx=1,ri="models_store",ta="model_info_store";function dw(){if(!$().getBool("IS_BROWSER"))throw new Error("Failed to obtain IndexedDB factory because the current environmentis not a web browser.");let r=typeof window>"u"?self:window,t=r.indexedDB||r.mozIndexedDB||r.webkitIndexedDB||r.msIndexedDB||r.shimIndexedDB;if(t==null)throw new Error("The current browser does not appear to support IndexedDB.");return t}function Qx(r){let t=r.result;t.createObjectStore(ri,{keyPath:"modelPath"}),t.createObjectStore(ta,{keyPath:"modelPath"})}var yo=class{constructor(t){if(this.indexedDB=dw(),t==null||!t)throw new Error("For IndexedDB, modelPath must not be null, undefined or empty.");this.modelPath=t}async save(t){if(t.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");return this.databaseAction(this.modelPath,t)}async load(){return this.databaseAction(this.modelPath)}databaseAction(t,e){return new Promise((o,n)=>{let s=this.indexedDB.open(Yx,Zx);s.onupgradeneeded=()=>Qx(s),s.onsuccess=()=>{let i=s.result;if(e==null){let l=i.transaction(ri,"readonly"),a=l.objectStore(ri).get(this.modelPath);a.onsuccess=()=>{if(a.result==null)return i.close(),n(new Error(`Cannot find model with path '${this.modelPath}' in IndexedDB.`));o(a.result.modelArtifacts)},a.onerror=c=>(i.close(),n(a.error)),l.oncomplete=()=>i.close()}else{e.weightData=hr.join(e.weightData);let l=fs(e),u=i.transaction(ta,"readwrite"),a=u.objectStore(ta),c;try{c=a.put({modelPath:this.modelPath,modelArtifactsInfo:l})}catch(m){return n(m)}let p;c.onsuccess=()=>{p=i.transaction(ri,"readwrite");let m=p.objectStore(ri),d;try{d=m.put({modelPath:this.modelPath,modelArtifacts:e,modelArtifactsInfo:l})}catch(f){return n(f)}d.onsuccess=()=>o({modelArtifactsInfo:l}),d.onerror=f=>{a=u.objectStore(ta);let h=a.delete(this.modelPath);h.onsuccess=()=>(i.close(),n(d.error)),h.onerror=g=>(i.close(),n(d.error))}},c.onerror=m=>(i.close(),n(c.error)),u.oncomplete=()=>{p==null?i.close():p.oncomplete=()=>i.close()}}},s.onerror=i=>n(s.error)})}};yo.URL_SCHEME="indexeddb://";var fw=r=>$().getBool("IS_BROWSER")&&!Array.isArray(r)&&r.startsWith(yo.URL_SCHEME)?YP(r.slice(yo.URL_SCHEME.length)):null;xr.registerSaveRouter(fw);xr.registerLoadRouter(fw);function YP(r){return new yo(r)}function ZP(r){return r.startsWith(yo.URL_SCHEME)?r.slice(yo.URL_SCHEME.length):r}var Gp=class{constructor(){this.indexedDB=dw()}async listModels(){return new Promise((t,e)=>{let o=this.indexedDB.open(Yx,Zx);o.onupgradeneeded=()=>Qx(o),o.onsuccess=()=>{let n=o.result,s=n.transaction(ta,"readonly"),l=s.objectStore(ta).getAll();l.onsuccess=()=>{let u={};for(let a of l.result)u[a.modelPath]=a.modelArtifactsInfo;t(u)},l.onerror=u=>(n.close(),e(l.error)),s.oncomplete=()=>n.close()},o.onerror=n=>e(o.error)})}async removeModel(t){return t=ZP(t),new Promise((e,o)=>{let n=this.indexedDB.open(Yx,Zx);n.onupgradeneeded=()=>Qx(n),n.onsuccess=()=>{let s=n.result,i=s.transaction(ta,"readwrite"),l=i.objectStore(ta),u=l.get(t),a;u.onsuccess=()=>{if(u.result==null)return s.close(),o(new Error(`Cannot find model with path '${t}' in IndexedDB.`));{let c=l.delete(t),p=()=>{a=s.transaction(ri,"readwrite");let d=a.objectStore(ri).delete(t);d.onsuccess=()=>e(u.result.modelArtifactsInfo),d.onerror=f=>o(u.error)};c.onsuccess=p,c.onerror=m=>(p(),s.close(),o(u.error))}},u.onerror=c=>(s.close(),o(u.error)),i.oncomplete=()=>{a==null?s.close():a.oncomplete=()=>s.close()}},n.onerror=s=>o(n.error)})}};var hs="/",Ul="tensorflowjs_models",hw="info",QP="model_topology",JP="weight_specs",tO="weight_data",eO="model_metadata";function gw(r){return{info:[Ul,r,hw].join(hs),topology:[Ul,r,QP].join(hs),weightSpecs:[Ul,r,JP].join(hs),weightData:[Ul,r,tO].join(hs),modelMetadata:[Ul,r,eO].join(hs)}}function xw(r){for(let t of Object.values(r))window.localStorage.removeItem(t)}function rO(r){let t=r.split(hs);if(t.length<3)throw new Error(`Invalid key format: ${r}`);return t.slice(1,t.length-1).join(hs)}function oO(r){return r.startsWith(Co.URL_SCHEME)?r.slice(Co.URL_SCHEME.length):r}var Co=class{constructor(t){if(!$().getBool("IS_BROWSER")||typeof window>"u"||typeof window.localStorage>"u")throw new Error("The current environment does not support local storage.");if(this.LS=window.localStorage,t==null||!t)throw new Error("For local storage, modelPath must not be null, undefined or empty.");this.modelPath=t,this.keys=gw(this.modelPath)}async save(t){if(t.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");{let e=JSON.stringify(t.modelTopology),o=JSON.stringify(t.weightSpecs),n=fs(t),s=hr.join(t.weightData);try{this.LS.setItem(this.keys.info,JSON.stringify(n)),this.LS.setItem(this.keys.topology,e),this.LS.setItem(this.keys.weightSpecs,o),this.LS.setItem(this.keys.weightData,cw(s));let i={format:t.format,generatedBy:t.generatedBy,convertedBy:t.convertedBy,signature:t.signature!=null?t.signature:void 0,userDefinedMetadata:t.userDefinedMetadata!=null?t.userDefinedMetadata:void 0,modelInitializer:t.modelInitializer!=null?t.modelInitializer:void 0,initializerSignature:t.initializerSignature!=null?t.initializerSignature:void 0,trainingConfig:t.trainingConfig!=null?t.trainingConfig:void 0};return this.LS.setItem(this.keys.modelMetadata,JSON.stringify(i)),{modelArtifactsInfo:n}}catch{throw xw(this.keys),new Error(`Failed to save model '${this.modelPath}' to local storage: size quota being exceeded is a possible cause of this failure: modelTopologyBytes=${n.modelTopologyBytes}, weightSpecsBytes=${n.weightSpecsBytes}, weightDataBytes=${n.weightDataBytes}.`)}}}async load(){let t=JSON.parse(this.LS.getItem(this.keys.info));if(t==null)throw new Error(`In local storage, there is no model with name '${this.modelPath}'`);if(t.modelTopologyType!=="JSON")throw new Error("BrowserLocalStorage does not support loading non-JSON model topology yet.");let e={},o=JSON.parse(this.LS.getItem(this.keys.topology));if(o==null)throw new Error(`In local storage, the topology of model '${this.modelPath}' is missing.`);e.modelTopology=o;let n=JSON.parse(this.LS.getItem(this.keys.weightSpecs));if(n==null)throw new Error(`In local storage, the weight specs of model '${this.modelPath}' are missing.`);e.weightSpecs=n;let s=this.LS.getItem(this.keys.modelMetadata);if(s!=null){let l=JSON.parse(s);e.format=l.format,e.generatedBy=l.generatedBy,e.convertedBy=l.convertedBy,l.signature!=null&&(e.signature=l.signature),l.userDefinedMetadata!=null&&(e.userDefinedMetadata=l.userDefinedMetadata),l.modelInitializer!=null&&(e.modelInitializer=l.modelInitializer),l.initializerSignature!=null&&(e.initializerSignature=l.initializerSignature),l.trainingConfig!=null&&(e.trainingConfig=l.trainingConfig)}let i=this.LS.getItem(this.keys.weightData);if(i==null)throw new Error(`In local storage, the binary weight values of model '${this.modelPath}' are missing.`);return e.weightData=pw(i),e}};Co.URL_SCHEME="localstorage://";var bw=r=>$().getBool("IS_BROWSER")&&!Array.isArray(r)&&r.startsWith(Co.URL_SCHEME)?nO(r.slice(Co.URL_SCHEME.length)):null;xr.registerSaveRouter(bw);xr.registerLoadRouter(bw);function nO(r){return new Co(r)}var Vp=class{constructor(){O($().getBool("IS_BROWSER"),()=>"Current environment is not a web browser"),O(typeof window>"u"||typeof window.localStorage<"u",()=>"Current browser does not appear to support localStorage"),this.LS=window.localStorage}async listModels(){let t={},e=Ul+hs,o=hs+hw;for(let n=0;n<this.LS.length;++n){let s=this.LS.key(n);if(s.startsWith(e)&&s.endsWith(o)){let i=rO(s);t[i]=JSON.parse(this.LS.getItem(s))}}return t}async removeModel(t){t=oO(t);let e=gw(t);if(this.LS.getItem(e.info)==null)throw new Error(`Cannot find model at path '${t}'`);let o=JSON.parse(this.LS.getItem(e.info));return xw(e),o}};var yw="://",zu=class r{constructor(){this.managers={}}static getInstance(){return r.instance==null&&(r.instance=new r),r.instance}static registerManager(t,e){O(t!=null,()=>"scheme must not be undefined or null."),t.endsWith(yw)&&(t=t.slice(0,t.indexOf(yw))),O(t.length>0,()=>"scheme must not be an empty string.");let o=r.getInstance();O(o.managers[t]==null,()=>`A model store manager is already registered for scheme '${t}'.`),o.managers[t]=e}static getManager(t){let e=r.getInstance().managers[t];if(e==null)throw new Error(`Cannot find model manager for scheme '${t}'`);return e}static getSchemes(){return Object.keys(r.getInstance().managers)}};var Jx=class{constructor(){this.messageName="setTimeoutCustom",this.functionRefs=[],this.handledMessageCount=0,this.hasEventListener=!1}fetch(t,e){return fetch(t,e)}now(){return performance.now()}encode(t,e){if(e!=="utf-8"&&e!=="utf8")throw new Error(`Browser's encoder only supports utf-8, but got ${e}`);return this.textEncoder==null&&(this.textEncoder=new TextEncoder),this.textEncoder.encode(t)}decode(t,e){return new TextDecoder(e).decode(t)}setTimeoutCustom(t,e){if(typeof window>"u"||!$().getBool("USE_SETTIMEOUTCUSTOM")){setTimeout(t,e);return}this.functionRefs.push(t),setTimeout(()=>{window.postMessage({name:this.messageName,index:this.functionRefs.length-1},"*")},e),this.hasEventListener||(this.hasEventListener=!0,window.addEventListener("message",o=>{if(o.source===window&&o.data.name===this.messageName){o.stopPropagation();let n=this.functionRefs[o.data.index];n(),this.handledMessageCount++,this.handledMessageCount===this.functionRefs.length&&(this.functionRefs=[],this.handledMessageCount=0)}},!0))}isTypedArray(t){return Np(t)}};if($().get("IS_BROWSER")){$().setPlatform("browser",new Jx);try{zu.registerManager(Co.URL_SCHEME,new Vp)}catch{}try{zu.registerManager(yo.URL_SCHEME,new Gp)}catch{}}var sO={importFetch:()=>Cw()},tb;var eb=class{constructor(){this.util=Iw(),this.textEncoder=new this.util.TextEncoder}fetch(t,e){return $().global.fetch!=null?$().global.fetch(t,e):(tb==null&&(tb=sO.importFetch()),tb(t,e))}now(){let t=process.hrtime();return t[0]*1e3+t[1]/1e6}encode(t,e){if(e!=="utf-8"&&e!=="utf8")throw new Error(`Node built-in encoder only supports utf-8, but got ${e}`);return this.textEncoder.encode(t)}decode(t,e){return t.length===0?"":new this.util.TextDecoder(e).decode(t)}isTypedArray(t){return this.util.types.isFloat32Array(t)||this.util.types.isInt32Array(t)||this.util.types.isUint8Array(t)||this.util.types.isUint8ClampedArray(t)}};$().get("IS_NODE")&&!$().get("IS_BROWSER")&&$().setPlatform("node",new eb);function gt(r,t="float32",e){return t=t||"float32",Yr(r),new qt(r,t,e)}function aO(r,t){let e=T(r,"x","cast");if(!Sx(t))throw new Error(`Failed to cast to unknown dtype ${t}`);if(t==="string"&&e.dtype!=="string"||t!=="string"&&e.dtype==="string")throw new Error("Only strings can be casted to strings");let o={x:e},n={dtype:t};return _.runKernel(ho,o,n)}var Qt=E({cast_:aO});function iO(r){let e={x:T(r,"x","clone","string_or_numeric")};return _.runKernel(xo,e)}var Gl=E({clone_:iO});function ww(r,t=!1){console.log(r.toString(t))}Hx();var lO={buffer:gt,cast:Qt,clone:Gl,print:ww};tw(lO);function uO(r,t){let e=T(r,"a","add"),o=T(t,"b","add");[e,o]=Vt(e,o);let n={a:e,b:o};return _.runKernel(Zr,n)}var Mt=E({add_:uO});function cO(r,t){let e=T(r,"a","floorDiv"),o=T(t,"b","floorDiv");[e,o]=Vt(e,o);let n={a:e,b:o};return _.runKernel(pn,n)}var Wp=E({floorDiv_:cO});function pO(r,t){let e=T(r,"a","div"),o=T(t,"b","div");if([e,o]=Vt(e,o),e.dtype==="int32"&&o.dtype==="int32")return Wp(e,o);let n={a:e,b:o},s={};return _.runKernel(on,n,s)}var Re=E({div_:pO});function mO(r,t){let e=T(r,"a","mul"),o=T(t,"b","mul");[e,o]=Vt(e,o);let n={a:e,b:o};return _.runKernel(Mn,n)}var yt=E({mul_:mO});function dO(r){let t=T(r,"x","abs");if(t.dtype==="complex64"){let e={x:t};return _.runKernel(cl,e)}else{let e={x:t};return _.runKernel(Rs,e)}}var br=E({abs_:dO});function fO(r){let e={x:T(r,"x","acos")};return _.runKernel(Po,e)}var rb=E({acos_:fO});function hO(r){let e={x:T(r,"x","acosh")};return _.runKernel(Oo,e)}var ob=E({acosh_:hO});function gO(r,t=null,e=!1){let n={x:T(r,"x","all","bool")},s={axis:t,keepDims:e};return _.runKernel(Bo,n,s)}var vw=E({all_:gO});function xO(r,t=null,e=!1){let n={x:T(r,"x","any","bool")},s={axis:t,keepDims:e};return _.runKernel(Lo,n,s)}var Sw=E({any_:xO});function bO(r,t=0){let o={x:T(r,"x","argMax")},n={axis:t};return _.runKernel(Ds,o,n)}var kw=E({argMax_:bO});function yO(r,t=0){let o={x:T(r,"x","argMin")},n={axis:t};return _.runKernel(Fs,o,n)}var Tw=E({argMin_:yO});function CO(r){let e={x:T(r,"x","asin")};return _.runKernel(Uo,e)}var nb=E({asin_:CO});function IO(r){let e={x:T(r,"x","asinh")};return _.runKernel(Go,e)}var sb=E({asinh_:IO});function wO(r){let e={x:T(r,"x","atan")};return _.runKernel(Vo,e)}var ab=E({atan_:wO});function vO(r,t){let e=T(r,"a","atan2"),o=T(t,"b","atan2");[e,o]=Vt(e,o);let n={a:e,b:o};return _.runKernel(zo,n)}var _w=E({atan2_:vO});function SO(r){let e={x:T(r,"x","atanh")};return _.runKernel(Wo,e)}var ib=E({atanh_:SO});function kO(r,t,e,o,n="NHWC",s){let i=r[3],l=[...t,i],u=Aw(n);return pb(r,l,e,s,o,null,null,u)}function cb(r,t,e,o,n,s,i="channelsLast"){let[l,u]=Hu(t),a;if(i==="channelsLast")a=[l,u,r[3],r[3]];else if(i==="channelsFirst")a=[l,u,r[1],r[1]];else throw new Error(`Unknown dataFormat ${i}`);return pb(r,a,e,o,n,s,!1,i)}function TO(r,t,e,o,n,s,i="NDHWC"){let[l,u,a]=lb(t),c,p;if(i==="NDHWC")p="channelsLast",c=[l,u,a,r[4],r[4]];else if(i==="NCDHW")p="channelsFirst",c=[l,u,a,r[1],r[1]];else throw new Error(`Unknown dataFormat ${i}`);return Nw(r,c,e,o,n,!1,p,s)}function pb(r,t,e,o,n,s,i=!1,l="channelsLast"){let[u,a,c,p]=[-1,-1,-1,-1];if(l==="channelsLast")[u,a,c,p]=r;else if(l==="channelsFirst")[u,p,a,c]=r;else throw new Error(`Unknown dataFormat ${l}`);let[m,d,,f]=t,[h,g]=Hu(e),[x,y]=Hu(o),C=Vl(m,x),I=Vl(d,y),{padInfo:v,outHeight:S,outWidth:k}=AO(n,a,c,h,g,C,I,s,l),A=i?f*p:f,D;return l==="channelsFirst"?D=[u,A,S,k]:l==="channelsLast"&&(D=[u,S,k,A]),{batchSize:u,dataFormat:l,inHeight:a,inWidth:c,inChannels:p,outHeight:S,outWidth:k,outChannels:A,padInfo:v,strideHeight:h,strideWidth:g,filterHeight:m,filterWidth:d,effectiveFilterHeight:C,effectiveFilterWidth:I,dilationHeight:x,dilationWidth:y,inShape:r,outShape:D,filterShape:t}}function Nw(r,t,e,o,n,s=!1,i="channelsLast",l){let[u,a,c,p,m]=[-1,-1,-1,-1,-1];if(i==="channelsLast")[u,a,c,p,m]=r;else if(i==="channelsFirst")[u,m,a,c,p]=r;else throw new Error(`Unknown dataFormat ${i}`);let[d,f,h,,g]=t,[x,y,C]=lb(e),[I,v,S]=lb(o),k=Vl(d,I),A=Vl(f,v),D=Vl(h,S),{padInfo:F,outDepth:M,outHeight:B,outWidth:U}=EO(n,a,c,p,x,y,C,k,A,D,l),P=s?g*m:g,L;return i==="channelsFirst"?L=[u,P,M,B,U]:i==="channelsLast"&&(L=[u,M,B,U,P]),{batchSize:u,dataFormat:i,inDepth:a,inHeight:c,inWidth:p,inChannels:m,outDepth:M,outHeight:B,outWidth:U,outChannels:P,padInfo:F,strideDepth:x,strideHeight:y,strideWidth:C,filterDepth:d,filterHeight:f,filterWidth:h,effectiveFilterDepth:k,effectiveFilterHeight:A,effectiveFilterWidth:D,dilationDepth:I,dilationHeight:v,dilationWidth:S,inShape:r,outShape:L,filterShape:t}}function _O(r,t,e,o,n){o==null&&(o=mb(r,t,e));let s=r[0],i=r[1],l=Ku((s-t+2*o)/e+1,n),u=Ku((i-t+2*o)/e+1,n);return[l,u]}function NO(r,t,e,o,n,s){n==null&&(n=mb(r,t[0],o[0]));let i=[0,0,0,e];for(let l=0;l<3;l++)r[l]+2*n>=t[l]&&(i[l]=Ku((r[l]-t[l]+2*n)/o[l]+1,s));return i}function mb(r,t,e,o=1){let n=Vl(t,o);return Math.floor((r[0]*(e-1)-e+n)/2)}function Hu(r){return typeof r=="number"?[r,r,r]:r.length===2?[r[0],r[1],1]:r}function lb(r){return typeof r=="number"?[r,r,r]:r}function Vl(r,t){return t<=1?r:r+(r-1)*(t-1)}function AO(r,t,e,o,n,s,i,l,u){let a,c,p;if(typeof r=="number"){a={top:r,bottom:r,left:r,right:r,type:r===0?"VALID":"NUMBER"};let d=_O([t,e],s,o,r,l);c=d[0],p=d[1]}else if(r==="same"){c=Math.ceil(t/o),p=Math.ceil(e/n);let m=Math.max(0,(c-1)*o+s-t),d=Math.max(0,(p-1)*n+i-e),f=Math.floor(m/2),h=m-f,g=Math.floor(d/2),x=d-g;a={top:f,bottom:h,left:g,right:x,type:"SAME"}}else if(r==="valid")a={top:0,bottom:0,left:0,right:0,type:"VALID"},c=Math.ceil((t-s+1)/o),p=Math.ceil((e-i+1)/n);else if(typeof r=="object"){let m=u==="channelsLast"?r[1][0]:r[2][0],d=u==="channelsLast"?r[1][1]:r[2][1],f=u==="channelsLast"?r[2][0]:r[3][0],h=u==="channelsLast"?r[2][1]:r[3][1];a={top:m,bottom:d,left:f,right:h,type:m===0&&d===0&&f===0&&h===0?"VALID":"EXPLICIT"},c=Ku((t-s+m+d)/o+1,l),p=Ku((e-i+f+h)/n+1,l)}else throw Error(`Unknown padding parameter: ${r}`);return{padInfo:a,outHeight:c,outWidth:p}}function EO(r,t,e,o,n,s,i,l,u,a,c){let p,m,d,f;if(r==="valid"&&(r=0),typeof r=="number"){p={top:r,bottom:r,left:r,right:r,front:r,back:r,type:r===0?"VALID":"NUMBER"};let g=NO([t,e,o,1],[l,u,a],1,[n,s,i],r,c);m=g[0],d=g[1],f=g[2]}else if(r==="same"){m=Math.ceil(t/n),d=Math.ceil(e/s),f=Math.ceil(o/i);let h=(m-1)*n+l-t,g=(d-1)*s+u-e,x=(f-1)*i+a-o,y=Math.floor(h/2),C=h-y,I=Math.floor(g/2),v=g-I,S=Math.floor(x/2),k=x-S;p={top:I,bottom:v,left:S,right:k,front:y,back:C,type:"SAME"}}else throw Error(`Unknown padding parameter: ${r}`);return{padInfo:p,outDepth:m,outHeight:d,outWidth:f}}function Ku(r,t){if(!t)return Math.trunc(r);switch(t){case"round":return Math.round(r);case"ceil":return Math.ceil(r);case"floor":return Math.floor(r);default:throw new Error(`Unknown roundingMode ${t}`)}}function ub(r){let[t,e,o]=Hu(r);return t===1&&e===1&&o===1}function ro(r,t){return ub(r)||ub(t)}function oi(r){return Hu(r).every(t=>t>0)}function Aw(r){if(r==="NHWC")return"channelsLast";if(r==="NCHW")return"channelsFirst";throw new Error(`Unknown dataFormat ${r}`)}function Er(r,t,e){if(e!=null){if(typeof t=="string")throw Error(`Error in ${r}: pad must be an integer when using dimRoundingMode ${e} but got pad ${t}.`);if(typeof t=="number")O(Mo(t),()=>`Error in ${r}: pad must be an integer when using dimRoundingMode ${e} but got pad ${t}.`);else if(typeof t=="object")t.forEach(o=>{o.forEach(n=>{O(Mo(n),()=>`Error in ${r}: pad must be an integer when using dimRoundingMode ${e} but got pad ${n}.`)})});else throw Error(`Error in ${r}: Unknown padding parameter: ${t}`)}}function RO(r,t){let o={x:T(r,"x","reshape","string_or_numeric")},n={shape:t};return _.runKernel(Vs,o,n)}var rt=E({reshape_:RO});function DO(r,t,e,o,n){let s=T(r,"x","avgPool","float32"),i=1;O(ro(e,i),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${e} and dilations '${i}'`);let l=s,u=!1;s.rank===3&&(u=!0,l=rt(s,[1,s.shape[0],s.shape[1],s.shape[2]])),O(l.rank===4,()=>`Error in avgPool: x must be rank 4 but got rank ${l.rank}.`),Er("avgPool",o,n);let a={x:l},c={filterSize:t,strides:e,pad:o,dimRoundingMode:n},p=_.runKernel(Ho,a,c);return p=Qt(p,s.dtype),u?rt(p,[p.shape[1],p.shape[2],p.shape[3]]):p}var zp=E({avgPool_:DO});function FO(r,t=0){O(r.length>=1,()=>"Pass at least one tensor to concat");let e=Op(r,"tensors","concat","string_or_numeric");if(e[0].dtype==="complex64"&&e.forEach(s=>{if(s.dtype!=="complex64")throw new Error(`Cannot concatenate complex64 tensors with a tensor
          with dtype ${s.dtype}. `)}),e.length===1)return Gl(e[0]);let o=e,n={axis:t};return _.runKernel(Ms,o,n)}var oo=E({concat_:FO});function $O(r,t,e=!1,o=!1){let n=T(r,"a","matMul"),s=T(t,"b","matMul");[n,s]=Vt(n,s);let i={a:n,b:s},l={transposeA:e,transposeB:o};return _.runKernel(Ko,i,l)}var re=E({matMul_:$O});function MO(r){let e={x:T(r,"x","sigmoid","float32")};return _.runKernel(ts,e)}var si=E({sigmoid_:MO});function PO(r,t,e){let o=T(r,"x","slice","string_or_numeric");if(o.rank===0)throw new Error("Slicing scalar is not possible");let n={x:o},s={begin:t,size:e};return _.runKernel(zs,n,s)}var ea=E({slice_:PO});function OO(r){let e={x:T(r,"x","tanh","float32")};return _.runKernel(us,e)}var Wl=E({tanh_:OO});function BO(r,t,e){let o=T(r,"x","batchToSpaceND"),n=t.reduce((l,u)=>l*u);O(o.rank>=1+t.length,()=>`input rank is ${o.rank} but should be > than blockShape.length ${t.length}`),O(e.length===t.length,()=>`crops.length is ${e.length} but should be equal to blockShape.length  ${t.length}`),O(o.shape[0]%n===0,()=>`input tensor batch is ${o.shape[0]} but is not divisible by the product of the elements of blockShape ${t.join(" * ")} === ${n}`);let s={x:o},i={blockShape:t,crops:e};return _.runKernel($s,s,i)}var Hp=E({batchToSpaceND_:BO});function Ew(r){let t;return r.rank===0||r.rank===1?t=rt(r,[1,1,1,r.size]):r.rank===2?t=rt(r,[1,1,r.shape[0],r.shape[1]]):r.rank===3?t=rt(r,[1,r.shape[0],r.shape[1],r.shape[2]]):t=r,t}function LO(r,t,e,o,n,s){s==null&&(s=.001);let i=T(r,"x","batchNorm"),l=T(t,"mean","batchNorm"),u=T(e,"variance","batchNorm"),a;n!=null&&(a=T(n,"scale","batchNorm"));let c;o!=null&&(c=T(o,"offset","batchNorm")),O(l.rank===u.rank,()=>"Batch normalization gradient requires mean and variance to have equal ranks."),O(c==null||l.rank===c.rank,()=>"Batch normalization gradient requires mean and offset to have equal ranks."),O(a==null||l.rank===a.rank,()=>"Batch normalization gradient requires mean and scale to have equal ranks.");let m={x:Ew(i),scale:a,offset:c,mean:l,variance:u},d={varianceEpsilon:s},f=_.runKernel(mn,m,d);return rt(f,i.shape)}var Rw=E({batchNorm_:LO});function UO(r,t){let e=T(r,"broadcastTo","x"),o=e.shape;if(Yr(t),t.length<e.rank)throw new Error(`broadcastTo(): shape.length=${t.length} < input.rank=${e.rank}.`);if(t.length>e.rank){let a=e.shape.slice();for(;a.length<t.length;)a.unshift(1);e=rt(e,a)}let n=e.shape,s=Array.from(t);for(let a=t.length-1;a>=0;a--)if(n[a]===t[a])s[a]=1;else if(e.shape[a]!==1)throw new Error(`broadcastTo(): [${o}] cannot be broadcast to [${t}].`);if(s.map((a,c)=>a>1?c:-1).filter(a=>a>=0).length===0)return Gl(e);let l={x:e},u={reps:s};return _.runKernel(Qr,l,u)}var gs=E({broadcastTo_:UO});function GO(r){let e={x:T(r,"x","ceil","float32")};return _.runKernel(qo,e)}var db=E({ceil_:GO});function Kp(r,t,e){Yr(r),e=e||Es(t);let o={shape:r,value:t,dtype:e};return _.runKernel(Os,{},o)}function VO(r,t,e){let o=T(r,"x","clipByValue");if(O(t<=e,()=>`Error in clip: min (${t}) must be less than or equal to max (${e}).`),t===e)return Kp(o.shape,t,o.dtype);let n={x:o},s={clipValueMin:t,clipValueMax:e};return _.runKernel(go,n,s)}var fb=E({clipByValue_:VO});function WO(r,t,e,o,n="NHWC",s=[1,1],i){let l=T(r,"x","conv2d","float32"),u=T(t,"filter","conv2d","float32"),a=l,c=!1;l.rank===3&&(c=!0,a=rt(l,[1,l.shape[0],l.shape[1],l.shape[2]])),O(a.rank===4,()=>`Error in conv2d: input must be rank 4, but got rank ${a.rank}.`),O(u.rank===4,()=>`Error in conv2d: filter must be rank 4, but got rank ${u.rank}.`),Er("conv2d",o,i);let p=n==="NHWC"?a.shape[3]:a.shape[1];O(p===u.shape[2],()=>`Error in conv2d: depth of input (${p}) must match input depth for filter ${u.shape[2]}.`),O(ro(e,s),()=>`Error in conv2D: Either strides or dilations must be 1. Got strides ${e} and dilations '${s}'`),O(oi(s),()=>"Error in conv2D: Dilated rates should be larger than 0."),O(oi(e),()=>"Error in conv2D: Strides should be larger than 0.");let m={x:a,filter:u},d={strides:e,pad:o,dataFormat:n,dilations:s,dimRoundingMode:i},f=_.runKernel(jo,m,d);return c?rt(f,[f.shape[1],f.shape[2],f.shape[3]]):f}var xs=E({conv2d_:WO});function zO(r,t,e,o,n="NWC",s=1,i){let l=T(r,"x","conv1d"),u=T(t,"filter","conv1d"),a=l,c=!1;l.rank===2&&(c=!0,a=rt(l,[1,l.shape[0],l.shape[1]])),O(a.rank===3,()=>`Error in conv1d: input must be rank 3, but got rank ${a.rank}.`),O(u.rank===3,()=>`Error in conv1d: filter must be rank 3, but got rank ${u.rank}.`),Er("conv1d",o,i),O(a.shape[2]===u.shape[1],()=>`Error in conv1d: depth of input (${a.shape[2]}) must match input depth for filter ${u.shape[1]}.`),O(ro(e,s),()=>`Error in conv1D: Either stride or dilation must be 1. Got stride ${e} and dilation '${s}'`),O(oi(s),()=>"Error in conv1D: Dilated rates should be larger than 0."),O(oi(e),()=>"Error in conv1D: Stride should be larger than 0."),O(n==="NWC",()=>`Error in conv1d: got dataFormat of ${n} but only NWC is currently supported.`);let p=rt(u,[1,u.shape[0],u.shape[1],u.shape[2]]),m=rt(a,[a.shape[0],1,a.shape[1],a.shape[2]]),g=xs(m,p,[1,e],o,"NHWC",[1,s],i);return c?rt(g,[g.shape[2],g.shape[3]]):rt(g,[g.shape[0],g.shape[2],g.shape[3]])}var Dw=E({conv1d_:zO});function HO(r,t,e,o,n,s="NHWC",i){O(r.length===t.rank,()=>`Length of inShape (${r.length}) and rank of dy (${t.rank}) must match`);let l=r,u=t,a=!1;t.rank===3&&(a=!0,u=rt(t,[1,t.shape[0],t.shape[1],t.shape[2]]),l=[1,r[0],r[1],r[2]]),O(l.length===4,()=>`Error in conv2dDerInput: inShape must be length 4, but got length ${l.length}.`),O(u.rank===4,()=>`Error in conv2dDerInput: dy must be rank 4, but got rank ${u.rank}`),O(e.rank===4,()=>`Error in conv2dDerInput: filter must be rank 4, but got rank ${e.rank}`);let c=s==="NHWC"?l[3]:l[1],p=s==="NHWC"?u.shape[3]:u.shape[1];O(c===e.shape[2],()=>`Error in conv2dDerInput: depth of input (${c}) must match input depth for filter ${e.shape[2]}.`),O(p===e.shape[3],()=>`Error in conv2dDerInput: depth of output (${p}) must match output depth for filter ${e.shape[3]}.`),Er("conv2dDerInput",n,i);let m={dy:u,filter:e},d={strides:o,pad:n,dataFormat:s,dimRoundingMode:i,inputShape:l},f=_.runKernel(Xo,m,d);return a?rt(f,[f.shape[1],f.shape[2],f.shape[3]]):f}var Fw=E({conv2DBackpropInput_:HO});function KO(r,t,e,o,n,s){let i=T(r,"x","conv2dTranspose"),l=T(t,"filter","conv2dTranspose");return Fw(e,i,l,o,n,"NHWC",s)}var $w=E({conv2dTranspose_:KO});function qO(r){let e={x:T(r,"x","cos","float32")};return _.runKernel(Yo,e)}var hb=E({cos_:qO});function jO(r){let e={x:T(r,"x","cosh","float32")};return _.runKernel(Zo,e)}var gb=E({cosh_:jO});function XO(r,t=0,e=!1,o=!1){let s={x:T(r,"x","cumprod")},i={axis:t,exclusive:e,reverse:o};return _.runKernel(Qo,s,i)}var Mw=E({cumprod_:XO});function YO(r,t=0,e=!1,o=!1){let s={x:T(r,"x","cumsum")},i={axis:t,exclusive:e,reverse:o};return _.runKernel(Jo,s,i)}var Pw=E({cumsum_:YO});function ZO(r,t,e="NHWC"){let o=T(r,"x","depthToSpace","float32"),n=e==="NHWC"?o.shape[1]:o.shape[2],s=e==="NHWC"?o.shape[2]:o.shape[3],i=e==="NHWC"?o.shape[3]:o.shape[1];O(t>1,()=>`blockSize should be > 1 for depthToSpace, but was: ${t}`),O(n*t>=0,()=>`Negative dimension size caused by overflow when multiplying
    ${n} and ${t}  for depthToSpace with input shape
    ${o.shape}`),O(s*t>=0,()=>`Negative dimension size caused by overflow when multiplying
    ${s} and ${t} for depthToSpace with input shape
        ${o.shape}`),O(i%(t*t)===0,()=>`Dimension size must be evenly divisible by ${t*t} but is ${i} for depthToSpace with input shape ${o.shape}`);let l={x:o},u={blockSize:t,dataFormat:e};return _.runKernel(tn,l,u)}var Ow=E({depthToSpace_:ZO});function QO(r,t,e,o,n="NHWC",s=[1,1],i){let l=T(r,"x","depthwiseConv2d","float32"),u=T(t,"filter","depthwiseConv2d","float32"),a=l,c=!1;l.rank===3&&(c=!0,a=rt(l,[1,l.shape[0],l.shape[1],l.shape[2]])),O(a.rank===4,()=>`Error in depthwiseConv2d: input must be rank 4, but got rank ${a.rank}.`),O(u.rank===4,()=>`Error in depthwiseConv2d: filter must be rank 4, but got rank ${u.rank}.`);let p=n==="NHWC"?a.shape[3]:a.shape[1];O(p===u.shape[2],()=>`Error in depthwiseConv2d: number of input channels (${p}) must match the inChannels dimension in filter ${u.shape[2]}.`),Er("depthwiseConv2d",o,i);let m={x:a,filter:u},d={strides:e,pad:o,dataFormat:n,dilations:s,dimRoundingMode:i},f=_.runKernel(en,m,d);return c?rt(f,[f.shape[1],f.shape[2],f.shape[3]]):f}var qp=E({depthwiseConv2d_:QO});function JO(r,t,e,o,n=[1,1],s="NHWC"){let i=T(r,"x","dilation2d"),l=T(t,"filter","dilation2d");O(i.rank===3||i.rank===4,()=>`Error in dilation2d: input must be rank 3 or 4, but got rank ${i.rank}.`),O(l.rank===3,()=>`Error in dilation2d: filter must be rank 3, but got rank ${l.rank}.`),O(s==="NHWC",()=>`Error in dilation2d: Only NHWC is currently supported, but got dataFormat of ${s}`);let u=i,a=!1;i.rank===3&&(u=rt(i,[1,i.shape[0],i.shape[1],i.shape[2]]),a=!0),O(u.shape[3]===l.shape[2],()=>`Error in dilation2d:  input and filter must have the same depth: ${u.shape[3]} vs ${l.shape[2]}`);let c={x:u,filter:l},p={strides:e,pad:o,dilations:n},m=_.runKernel(rn,c,p);return a?rt(m,[m.shape[1],m.shape[2],m.shape[3]]):m}var Bw=E({dilation2d_:JO});var no={};mo(no,{assertAndGetBroadcastShape:()=>Jt,getBroadcastDims:()=>Lw,getReductionAxes:()=>jp});function Lw(r,t){let e=r.length,o=[];for(let n=0;n<e;n++){let s=e-1-n,i=r[s]||1;(t[t.length-1-n]||1)>1&&i===1&&o.unshift(s)}return o}function jp(r,t){let e=[];for(let o=0;o<t.length;o++){let n=r[r.length-o-1],s=t.length-o-1,i=t[s];(n==null||n===1&&i>1)&&e.unshift(s)}return e}function Jt(r,t){let e=Math.max(r.length,t.length),o=new Array(e);for(let n=0;n<e;n++){let s=r[r.length-n-1];s==null&&(s=1);let i=t[t.length-n-1];if(i==null&&(i=1),s===1)o[e-n-1]=i;else if(i===1)o[e-n-1]=s;else if(s!==i){let l=`Operands could not be broadcast together with shapes ${r} and ${t}.`;throw Error(l)}else o[e-n-1]=s}return o}function tB(r,t){let e=T(r,"a","equal","string_or_numeric"),o=T(t,"b","equal","string_or_numeric");[e,o]=Vt(e,o),Jt(e.shape,o.shape);let n={a:e,b:o};return _.runKernel(an,n)}var Xp=E({equal_:tB});function eB(r,t,e){let o=T(t,"a","where"),n=T(e,"b","where"),s=T(r,"condition","where","bool"),i=Jt(Jt(s.shape,o.shape),n.shape),l=gs(s,i),u=gs(o,i),a=gs(n,i),c={condition:l,t:u,e:a};return _.runKernel(Ws,c)}var Yp=E({where_:eB});function rB(r){let e={x:T(r,"x","zerosLike")};return _.runKernel(Xs,e)}var Ie=E({zerosLike_:rB});function oB(r,t){let e=T(r,"a","div"),o=T(t,"b","div");[e,o]=Vt(e,o);let n=Re(e,o),s=Ie(n),i=Xp(o,s);return Yp(i,s,n)}var Uw=E({divNoNan_:oB});function nB(r,t){let e=T(r,"t1","dot"),o=T(t,"t2","dot");O((e.rank===1||e.rank===2)&&(o.rank===1||o.rank===2),()=>`Error in dot: inputs must all be rank 1 or 2, but got ranks ${e.rank} and ${o.rank}.`);let n=e.rank===1?e.size:e.shape[1],s=o.rank===1?o.size:o.shape[0];if(O(n===s,()=>`Error in dot: inner dimensions of inputs must match, but got ${n} and ${s}.`),e.rank===1&&o.rank===1){let i=rt(e,[1,-1]),l=rt(o,[-1,1]),u=re(i,l);return rt(u,[])}else if(e.rank===1&&o.rank===2){let i=rt(e,[1,-1]),l=rt(o,[o.shape[0],o.shape[1]]),u=re(i,l);return rt(u,[u.size])}else if(e.rank===2&&o.rank===1){let i=rt(o,[-1,1]),l=re(e,i);return rt(l,[l.size])}else{let i=rt(o,[o.shape[0],o.shape[1]]);return re(e,i)}}var Gw=E({dot_:nB});function sB(r){let e={x:T(r,"x","elu","float32")};return _.runKernel(nn,e)}var Zp=E({elu_:sB});function aB(r){let t=T(r,"x","erf");O(t.dtype==="int32"||t.dtype==="float32",()=>"Input dtype must be `int32` or `float32`."),t.dtype==="int32"&&(t=Qt(t,"float32"));let e={x:t};return _.runKernel(sn,e)}var xb=E({erf_:aB});function bb(r,t){for(let e=0;e<r.length;++e)if(r[r.length-e-1]!==t-1-e)return!1;return!0}function Vw(r,t,e){let o=r.length+t.length,n=[],s=0,i=0;for(let l=0;l<o;l++)e.indexOf(l)===-1?n.push(r[s++]):n.push(t[i++]);return n}function iB(r,t){let e=[],o=r.length;for(let s=0;s<o;s++)t.indexOf(s)===-1&&e.push(r[s]);let n=t.map(s=>r[s]);return[e,n]}function qu(r,t){let e=t.map(o=>1);return Vw(r,e,t)}function lB(r,t,e){O(bb(t,e),()=>`${r} supports only inner-most axes for now. Got axes ${t} and rank-${e} input.`)}function uB(r,t){if(bb(r,t))return null;let e=[];for(let o=0;o<t;++o)r.indexOf(o)===-1&&e.push(o);return r.forEach(o=>e.push(o)),e}function cB(r){return r.map((t,e)=>[e,t]).sort((t,e)=>t[1]-e[1]).map(t=>t[0])}function pB(r,t){let e=[];for(let o=t-r;o<t;++o)e.push(o);return e}function dB(r,t=null,e=!1){let n={x:T(r,"x","max")},s={reductionIndices:t,keepDims:e};return _.runKernel(_n,n,s)}var Rr=E({max_:dB});function fB(r,t=null,e=!1){let n={x:T(r,"x","min")},s={axis:t,keepDims:e};return _.runKernel(Rn,n,s)}var ju=E({min_:fB});function hB(r,t){let e=T(r,"base","pow"),o=T(t,"exp","pow");[e,o]=Vt(e,o);let n={a:e,b:o};return _.runKernel(Ln,n)}var ai=E({pow_:hB});function De(r,t){if((ze(r)&&t!=="string"||Array.isArray(r))&&t!=="complex64")throw new Error("Error creating a new Scalar: value must be a primitive (number|boolean|string)");if(t==="string"&&ze(r)&&!(r instanceof Uint8Array))throw new Error("When making a scalar from encoded string, the value must be `Uint8Array`.");return Js(r,[],[],t)}function gB(r){let e={x:T(r,"x","sqrt","float32")};return _.runKernel(rs,e)}var je=E({sqrt_:gB});function xB(r){let t=T(r,"x","square"),e={};return _.runKernel("Square",{x:t},e)}var Xe=E({square_:xB});function bB(r,t=null,e=!1){let o=T(r,"x","sum");o.dtype==="bool"&&(o=Qt(o,"int32"));let n={x:o},s={axis:t,keepDims:e};return _.runKernel(os,n,s)}var Ye=E({sum_:bB});function yB(r,t="euclidean",e=null,o=!1){r=T(r,"x","norm");let n=Ww(r,t,e),s=n.shape;if(o){let i=Ji(e,r.shape);s=qu(n.shape,i)}return rt(n,s)}function Ww(r,t,e=null){if(r.rank===0)return br(r);if(r.rank!==1&&e===null)return Ww(rt(r,[-1]),t,e);if(r.rank===1||typeof e=="number"||Array.isArray(e)&&e.length===1){if(t===1)return Ye(br(r),e);if(t===1/0)return Rr(br(r),e);if(t===-1/0)return ju(br(r),e);if(t==="euclidean"||t===2)return je(Ye(ai(br(r),De(2,"int32")),e));throw new Error(`Error in norm: invalid ord value: ${t}`)}if(Array.isArray(e)&&e.length===2){if(t===1)return Rr(Ye(br(r),e[0]),e[1]-1);if(t===1/0)return Rr(Ye(br(r),e[1]),e[0]);if(t===-1/0)return ju(Ye(br(r),e[1]),e[0]);if(t==="fro"||t==="euclidean")return je(Ye(Xe(r),e));throw new Error(`Error in norm: invalid ord value: ${t}`)}throw new Error(`Error in norm: invalid axis: ${e}`)}var Qp=E({norm_:yB});function CB(r,t=null,e=!1){return Qp(r,"euclidean",t,e)}var zw=E({euclideanNorm_:CB});function IB(r){let e={x:T(r,"x","exp")};return _.runKernel(ln,e)}var ra=E({exp_:IB});function wB(r,t=0){let e=T(r,"x","expandDims","string_or_numeric");O(t<=e.rank,()=>"Axis must be <= rank of the tensor");let o={input:e},n={dim:t};return _.runKernel(Ps,o,n)}var Hw=E({expandDims_:wB});function vB(r){let e={x:T(r,"x","expm1")};return _.runKernel(un,e)}var yb=E({expm1_:vB});function SB(r,t){let e=T(r,"x","tile","string_or_numeric");O(e.rank===t.length,()=>`Error in transpose: rank of input ${e.rank} must match length of reps ${t}.`);let o={x:e},n={reps:t};return _.runKernel(Qr,o,n)}var Kw=E({tile_:SB});function kB(r){let e={x:T(r,"x","floor","float32")};return _.runKernel(cn,e)}var Cb=E({floor_:kB});function TB(r,t,e=0,o=0){let n=T(r,"x","gather"),s=T(t,"indices","gather","int32"),i={x:n,indices:s},l={axis:e,batchDims:o};return _.runKernel(Bs,i,l)}var qw=E({gather_:TB});function _B(r,t){let e=T(r,"a","greater","string_or_numeric"),o=T(t,"b","greater","string_or_numeric");[e,o]=Vt(e,o),Jt(e.shape,o.shape);let n={a:e,b:o};return _.runKernel(dn,n)}var jw=E({greater_:_B});function NB(r,t){let e=T(r,"a","greaterEqual","string_or_numeric"),o=T(t,"b","greaterEqual","string_or_numeric");[e,o]=Vt(e,o),Jt(e.shape,o.shape);let n={a:e,b:o};return _.runKernel(fn,n)}var Xw=E({greaterEqual_:NB});function AB(r){let e={input:T(r,"input","imag")};return _.runKernel(xl,e)}var zl=E({imag_:AB});function EB(r){let e={x:T(r,"x","isFinite")};return _.runKernel(hn,e)}var Ib=E({isFinite_:EB});function RB(r){let e={x:T(r,"x","isInf")};return _.runKernel(gn,e)}var wb=E({isInf_:RB});function DB(r){let e={x:T(r,"x","isNaN")};return _.runKernel(xn,e)}var vb=E({isNaN_:DB});function FB(r,t=.2){let o={x:T(r,"x","leakyRelu")},n={alpha:t};return _.runKernel(bn,o,n)}var Jp=E({leakyRelu_:FB});function $B(r,t){let e=T(r,"a","less","string_or_numeric"),o=T(t,"b","less","string_or_numeric");[e,o]=Vt(e,o),Jt(e.shape,o.shape);let n={a:e,b:o};return _.runKernel(yn,n)}var Yw=E({less_:$B});function MB(r,t){let e=T(r,"a","lessEqual","string_or_numeric"),o=T(t,"b","lessEqual","string_or_numeric");[e,o]=Vt(e,o),Jt(e.shape,o.shape);let n={a:e,b:o};return _.runKernel(Cn,n)}var Zw=E({lessEqual_:MB});function PB(r,t=5,e=1,o=1,n=.5){let s=T(r,"x","localResponseNormalization");O(s.rank===4||s.rank===3,()=>`Error in localResponseNormalization: x must be rank 3 or 4 but got
               rank ${s.rank}.`),O(Mo(t),()=>`Error in localResponseNormalization: depthRadius must be an integer but got depthRadius ${t}.`);let i=s,l=!1;s.rank===3&&(l=!0,i=rt(s,[1,s.shape[0],s.shape[1],s.shape[2]]));let u={x:i},a={depthRadius:t,bias:e,alpha:o,beta:n},c=_.runKernel(Tn,u,a);return l?rt(c,[c.shape[1],c.shape[2],c.shape[3]]):c}var Qw=E({localResponseNormalization_:PB});function OB(r){let e={x:T(r,"x","log","float32")};return _.runKernel(In,e)}var ii=E({log_:OB});function BB(r){let e={x:T(r,"x","log1p")};return _.runKernel(wn,e)}var Sb=E({log1p_:BB});function Jw(r,t){O(rl(r),()=>"The f passed in variableGrads(f) must be a function"),O(t==null||Array.isArray(t)&&t.every(a=>a instanceof ms),()=>"The varList passed in variableGrads(f, varList) must be an array of variables");let e=t!=null;if(!e){t=[];for(let a in _.registeredVariables)t.push(_.registeredVariables[a])}let o=e?t.filter(a=>!a.trainable):null,n=t.length;t=t.filter(a=>a.trainable),O(t.length>0,()=>`variableGrads() expects at least one of the input variables to be trainable, but none of the ${n} variables is trainable.`);let s=!0,{value:i,grads:l}=_.gradients(r,t,null,s);O(l.some(a=>a!=null),()=>"Cannot find a connection between any variable and the result of the loss function y=f(x). Please make sure the operations that use variables are inside the function f passed to minimize()."),O(i.rank===0,()=>`The f passed in variableGrads(f) must return a scalar, but it returned a rank-${i.rank} tensor`);let u={};return t.forEach((a,c)=>{l[c]!=null&&(u[a.name]=l[c])}),o?.forEach(a=>u[a.name]=null),{value:i,grads:u}}function tm(r){return _.customGrad(r)}function LB(r){let e={x:T(r,"x","neg")};return _.runKernel(Ls,e)}var bs=E({neg_:LB});function UB(r){let e={x:T(r,"x","softplus")};return _.runKernel(es,e)}var oa=E({softplus_:UB});function GB(r){let t=T(r,"x","logSigmoid");return tm(o=>({value:bs(oa(bs(o))),gradFunc:i=>yt(i,si(bs(o)))}))(t)}var kb=E({logSigmoid_:GB});function VB(r,t){let e=T(r,"a","sub"),o=T(t,"b","sub");[e,o]=Vt(e,o);let n={a:e,b:o};return _.runKernel(is,n)}var He=E({sub_:VB});function WB(r,t=-1){let e=T(r,"logits","logSoftmax");if(t===-1&&(t=e.rank-1),t!==e.rank-1)throw Error(`Log Softmax along a non-last dimension is not yet supported. Logits was rank ${e.rank} and axis was ${t}`);return tm((n,s)=>{let l=Rr(n,t,!0),u=He(n,l),a=He(Qt(u,"float32"),ii(Ye(ra(u),t,!0)));return s([a]),{value:a,gradFunc:(p,m)=>{let[d]=m,f=!0,h=ra(d);return He(p,yt(Ye(p,t,f),h))}}})(e)}var Tb=E({logSoftmax_:WB});function zB(r,t=null,e=!1){let o=T(r,"x","logSumExp"),n=Ji(t,o.shape),s=Rr(o,n,!0),i=He(o,s),l=ra(i),u=Ye(l,n),a=ii(u),c=Mt(rt(s,a.shape),a);if(e){let p=qu(c.shape,n);return rt(c,p)}return c}var tv=E({logSumExp_:zB});function HB(r,t){let e=T(r,"a","logicalAnd","bool"),o=T(t,"b","logicalAnd","bool");Jt(e.shape,o.shape);let n={a:e,b:o};return _.runKernel(vn,n)}var Xu=E({logicalAnd_:HB});function KB(r){let e={x:T(r,"x","logicalNot","bool")};return _.runKernel(Sn,e)}var em=E({logicalNot_:KB});function qB(r,t){let e=T(r,"a","logicalOr","bool"),o=T(t,"b","logicalOr","bool");Jt(e.shape,o.shape);let n={a:e,b:o};return _.runKernel(kn,n)}var rm=E({logicalOr_:qB});function jB(r,t){let e=T(r,"a","logicalXor","bool"),o=T(t,"b","logicalXor","bool");return Jt(e.shape,o.shape),Xu(rm(r,t),em(Xu(r,t)))}var ev=E({logicalXor_:jB});function XB(r,t,e,o,n){let s=T(r,"x","maxPool"),i=1,l=s,u=!1;s.rank===3&&(u=!0,l=rt(s,[1,s.shape[0],s.shape[1],s.shape[2]])),O(l.rank===4,()=>`Error in maxPool: input must be rank 4 but got rank ${l.rank}.`),O(ro(e,i),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${e} and dilations '${i}'`),Er("maxPool",o,n);let a={x:l},c={filterSize:t,strides:e,pad:o,dimRoundingMode:n},p=_.runKernel(An,a,c);return u?rt(p,[p.shape[1],p.shape[2],p.shape[3]]):p}var om=E({maxPool_:XB});function YB(r,t){let e=T(r,"a","maximum"),o=T(t,"b","maximum");[e,o]=Vt(e,o),e.dtype==="bool"&&(e=Qt(e,"int32"),o=Qt(o,"int32")),Jt(e.shape,o.shape);let n={a:e,b:o};return _.runKernel(Nn,n)}var nm=E({maximum_:YB});function ZB(r,t=null,e=!1){let n={x:T(r,"x","mean")},s={axis:t,keepDims:e};return _.runKernel(En,n,s)}var Hl=E({mean_:ZB});function li(r,t="float32"){if(Yr(r),t==="complex64"){let o=li(r,"float32"),n=li(r,"float32");return ds(o,n)}let e=nl(ge(r),t);return _.makeTensor(e,r,t)}function QB(r,t){let e=T(r,"a","minimum"),o=T(t,"b","minimum");[e,o]=Vt(e,o),e.dtype==="bool"&&(e=Qt(e,"int32"),o=Qt(o,"int32")),Jt(e.shape,o.shape);let n={a:e,b:o};return _.runKernel(Dn,n)}var rv=E({minimum_:QB});function JB(r,t,e){O(e==="reflect"||e==="symmetric",()=>`Invalid mode. Mode must be either reflect or symmetric. Got ${e}.`);let o=T(r,"x","mirrorPad");if(o.rank===0)throw new Error("mirrorPad(scalar) is not defined. Pass non-scalar to mirrorPad");O(t.length===o.rank,()=>`Padding doesn't match input. Must be ${o.rank}. Got ${t.length}.`);let n=e==="reflect"?1:0;for(let l=0;l<o.rank;l++)O(t[l].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),O(t[l][0]>=0&&t[l][0]<=o.shape[l]-n&&t[l][1]>=0&&t[l][1]<=o.shape[l]-n,()=>`Padding in dimension ${l} cannot be greater than or equal to ${o.shape[l]-n} or less than 0 for input of shape ${o.shape}`);let s={paddings:t,mode:e},i={x:o};return _.runKernel(Fn,i,s)}var ov=E({mirrorPad_:JB});function tL(r,t){let e=T(r,"a","mod"),o=T(t,"b","mod");[e,o]=Vt(e,o);let n={a:e,b:o};return _.runKernel($n,n)}var nv=E({mod_:tL});function eL(r,t){let e=T(r,"a","notEqual","string_or_numeric"),o=T(t,"b","notEqual","string_or_numeric");[e,o]=Vt(e,o),Jt(e.shape,o.shape);let n={a:e,b:o};return _.runKernel(Pn,n)}var sv=E({notEqual_:eL});function rL(r,t,e=1,o=0,n="int32"){if(t<2)throw new Error(`Error in oneHot: depth must be >=2, but it is ${t}`);let i={indices:T(r,"indices","oneHot","int32")},l={dtype:n,depth:t,onValue:e,offValue:o};return _.runKernel(On,i,l)}var av=E({oneHot_:rL});function oL(r){let e={x:T(r,"x","onesLike")};return _.runKernel(Us,e)}var _b=E({onesLike_:oL});function nL(r,t,e=0){let o=T(r,"x","pad");if(o.rank===0)throw new Error("pad(scalar) is not defined. Pass non-scalar to pad");let n={paddings:t,constantValue:e},s={x:o};return _.runKernel(Bn,s,n)}var iv=E({pad_:nL});function sL(r,t,e){let o=T(r,"x","spaceToBatchND");O(o.rank>=1+t.length,()=>`input rank ${o.rank} should be > than [blockShape] ${t.length}`),O(e.length===t.length,()=>`paddings.shape[0] ${e.length} must be equal to [blockShape] ${t.length}`),O(o.shape.reduce((i,l,u)=>u>0&&u<=t.length?i&&(l+e[u-1][0]+e[u-1][1])%t[u-1]===0:i,!0),()=>`input spatial dimensions ${o.shape.slice(1)} with paddings ${e.toString()} must be divisible by blockShapes ${t.toString()}`);let n={x:o},s={blockShape:t,paddings:e};return _.runKernel(Hs,n,s)}var sm=E({spaceToBatchND_:sL});function aL(r,t,e,o,n,s,i){n==null&&(n=[1,1]),s==null&&(s=1),o===0&&(o="valid");let l=T(r,"x","maxPool"),u=l,a=!1;l.rank===3&&(a=!0,u=rt(l,[1,l.shape[0],l.shape[1],l.shape[2]])),O(ro(s,n),()=>`Error in pool: Either strides or dilations must be 1. Got strides ${s} and dilations '${n}'`);let c=cb(u.shape,t,s,n,o),p=[c.dilationHeight,c.dilationWidth],m;o==="same"?m=lL([c.filterHeight,c.filterWidth],p):m=[[0,0],[0,0]];let d=p[0]===1&&p[1]===1,[f,h]=iL([c.inHeight,c.inWidth],p,m),g=d?o:"valid",x=d?u:sm(u,p,f),C=(e==="avg"?()=>zp(x,t,s,g,i):()=>om(x,t,s,g,i))(),I=d?C:Hp(C,p,h);return a?rt(I,[I.shape[1],I.shape[2],I.shape[3]]):I}function iL(r,t,e){let o=e.map(c=>c[0]),n=e.map(c=>c[1]),s=r.concat(o,n),i=t.map((c,p)=>(c-s[p]%c)%c),l=n.map((c,p)=>c+i[p]),u=t.map((c,p)=>[o[p],l[p]]),a=t.map((c,p)=>[0,i[p]]);return[u,a]}function lL(r,t){let o=r.map((i,l)=>i+(i-1)*(t[l]-1)).map(i=>i-1),n=o.map(i=>Math.floor(i/2)),s=o.map((i,l)=>i-n[l]);return o.map((i,l)=>[n[l],s[l]])}var lv=E({pool_:aL});function uL(r,t){let e=T(r,"x","prelu"),o=T(t,"alpha","prelu"),n={x:e,alpha:o};return _.runKernel(Un,n)}var am=E({prelu_:uL});function cL(r,t=null,e=!1){let o=T(r,"x","prod");o.dtype==="bool"&&(o=Qt(o,"int32"));let n={x:o},s={axis:t,keepDims:e};return _.runKernel(Gn,n,s)}var uv=E({prod_:cL});function xL(r){let e={input:T(r,"input","real")};return _.runKernel(vl,e)}var ci=E({real_:xL});function bL(r){let e={x:T(r,"x","reciprocal")};return _.runKernel(Vn,e)}var $b=E({reciprocal_:bL});function yL(r){let e={x:T(r,"x","relu")};return _.runKernel(Wn,e)}var na=E({relu_:yL});function CL(r){let e={x:T(r,"x","relu6")};return _.runKernel(Kn,e)}var lm=E({relu6_:CL});function IL(r,t){let o={x:T(r,"x","reverse")},n={dims:t};return _.runKernel(qn,o,n)}var Yu=E({reverse_:IL});function wL(r){let e={x:T(r,"x","round")};return _.runKernel(jn,e)}var Mb=E({round_:wL});function vL(r){let e={x:T(r,"x","rsqrt","float32")};return _.runKernel(Xn,e)}var Pb=E({rsqrt_:vL});function SL(r){let e={x:T(r,"x","selu")};return _.runKernel(Yn,e)}var _v=E({selu_:SL});function kL(r,t,e,o,n,s=[1,1],i="NHWC"){let l=T(r,"x","separableConv2d"),u=T(t,"depthwiseFilter","separableConv2d"),a=T(e,"pointwiseFilter","separableConv2d"),c=l,p=!1;if(l.rank===3&&(p=!0,c=rt(l,[1,l.shape[0],l.shape[1],l.shape[2]])),i==="NCHW")throw new Error("separableConv2d currently does not support dataFormat NCHW; only NHWC is supported");O(c.rank===4,()=>`Error in separableConv2d: input must be rank 4, but got rank ${c.rank}.`),O(u.rank===4,()=>`Error in separableConv2d: depthwise filter must be rank 4, but got rank ${u.rank}.`),O(a.rank===4,()=>`Error in separableConv2d: pointwise filter must be rank 4, but got rank ${u.rank}.`),O(a.shape[0]===1,()=>`Error in separableConv2d: the first dimension of pointwise filter  must be 1, but got ${a.shape[0]}.`),O(a.shape[1]===1,()=>`Error in separableConv2d: the second dimension of pointwise filter must be 1, but got ${a.shape[1]}.`);let m=u.shape[2],d=u.shape[3];O(a.shape[2]===m*d,()=>`Error in separableConv2d: the third dimension of pointwise filter must be ${m*d}, but got ${a.shape[2]}.`);let f=qp(c,u,o,n,i,s),g=xs(f,a,1,"valid",i);return p?rt(g,[g.shape[1],g.shape[2],g.shape[3]]):g}var Nv=E({separableConv2d_:kL});function TL(r){let e={x:T(r,"x","sign")};return _.runKernel(Jn,e)}var Ob=E({sign_:TL});function _L(r){let e={x:T(r,"x","sin","float32")};return _.runKernel(Zn,e)}var Bb=E({sin_:_L});function NL(r){let e={x:T(r,"x","sinh")};return _.runKernel(Qn,e)}var Lb=E({sinh_:NL});function AL(r,t=-1){let e=T(r,"logits","softmax","float32");if(t===-1&&(t=e.rank-1),t!==e.rank-1)throw Error(`Softmax along a non-last dimension is not yet supported. Logits was rank ${e.rank} and dim was ${t}`);let o={logits:e},n={dim:t};return _.runKernel(ns,o,n)}var Ub=E({softmax_:AL});function EL(r){O(r.dtype==="complex64",()=>`The dtype for tf.spectral.fft() must be complex64 but got ${r.dtype}.`);let t={input:r};return _.runKernel(hl,t)}var Zu=E({fft_:EL});function RL(r){O(r.dtype==="complex64",()=>`The dtype for tf.spectral.ifft() must be complex64 but got ${r.dtype}.`);let t={input:r};return _.runKernel(gl,t)}var Kl=E({ifft_:RL});function DL(r){let t=r.shape[r.shape.length-1],e=r.size/t,o;if(t<=2){let n=rt(r,[e,t]);o=Kl(n)}else{let n=[e,2*(t-1)],s=rt(ci(r),[e,t]),i=rt(zl(r),[e,t]),l=Yu(ea(s,[0,1],[e,t-2]),1),u=yt(Yu(ea(i,[0,1],[e,t-2]),1),De(-1)),a=oo([s,l],1),c=oo([i,u],1),p=rt(ds(a,c),[n[0],n[1]]);o=Kl(p)}if(o=ci(o),r.rank===3&&r.shape[0]!==0){let n=o,s=r.shape[0];o=rt(o,[s,o.shape[0]/s,o.shape[1]]),n.dispose()}return o}var Gb=E({irfft_:DL});function FL(r,t,e=0){let n={x:T(r,"x","split")},s={numOrSizeSplits:t,axis:e};return _.runKernel(Ks,n,s)}var Qu=E({split_:FL});function $L(r,t){O(r.dtype==="float32",()=>`The dtype for rfft() must be real value but got ${r.dtype}`);let e=r.shape[r.shape.length-1],o=r.size/e,n;if(t!=null&&t<e){let f=r.shape.map(g=>0),h=r.shape.map(g=>g);h[r.shape.length-1]=t,n=ea(r,f,h),e=t}else if(t!=null&&t>e){let f=r.shape.map(h=>h);f[r.shape.length-1]=t-e,n=oo([r,li(f)],r.shape.length-1),e=t}else n=r;let s=Ie(n),i=rt(ds(n,s),[o,e]),l=Zu(i),u=Math.floor(e/2)+1,a=ci(l),c=zl(l),p=Qu(a,[u,e-u],a.shape.length-1),m=Qu(c,[u,e-u],c.shape.length-1),d=n.shape.slice();return d[n.shape.length-1]=u,rt(ds(p[0],m[0]),d)}var Vb=E({rfft_:$L});function ML(r,t){let e=T(r,"a","squaredDifference"),o=T(t,"b","squaredDifference");[e,o]=Vt(e,o),Jt(e.shape,o.shape);let n={a:e,b:o},s={};return _.runKernel(ss,n,s)}var Av=E({squaredDifference_:ML});function PL(r,t){let e=T(r,"x","squeeze","string_or_numeric");return rt(e,wx(e.shape,t).newShape)}var Ev=E({squeeze_:PL});function OL(r,t=0){let e=Op(r,"tensors","stack","string_or_numeric");O(e.length>=1,()=>"Pass at least one tensor to tf.stack"),e.length>0&&O(t<=e[0].rank,()=>"Axis must be <= rank of the tensor");let o=e,n={axis:t};return _.runKernel(Gs,o,n)}var Rv=E({stack_:OL});function BL(r,t=0){let o={x:T(r,"x","step")},n={alpha:t};return _.runKernel(bo,o,n)}var Ju=E({step_:BL});function LL(r,t,e,o,n=0,s=0,i=0,l=0,u=0){let c={x:T(r,"x","stridedSlice","string_or_numeric")},p={begin:t,end:e,strides:o,beginMask:n,endMask:s,ellipsisMask:i,newAxisMask:l,shrinkAxisMask:u};return _.runKernel(as,c,p)}var Wb=E({stridedSlice_:LL});function UL(r){let e={x:T(r,"x","tan","float32")};return _.runKernel(ls,e)}var zb=E({tan_:UL});function pi(r,t,e){if(Mu(r),t!=null&&t.length!==2)throw new Error("tensor2d() requires shape to have two numbers");let o=ei(r,e);if(o.length!==2&&o.length!==1)throw new Error("tensor2d() requires values to be number[][] or flat/TypedArray");if(o.length===1&&t==null)throw new Error("tensor2d() requires shape to be provided when `values` are a flat/TypedArray");return Js(r,t,o,e)}function mi(r,t,e){if(Mu(r),t!=null&&t.length!==4)throw new Error("tensor4d() requires shape to have four numbers");let o=ei(r,e);if(o.length!==4&&o.length!==1)throw new Error("tensor4d() requires values to be number[][][][] or flat/TypedArray");if(o.length===1&&t==null)throw new Error("tensor4d() requires shape to be provided when `values` are a flat array");return Js(r,t,o,e)}var ql={};mo(ql,{calculateShapes:()=>Fv,validateInput:()=>Dv,validateUpdateShape:()=>Hb});function Hb(r,t,e){let o=t.rank>1?t.shape[t.rank-1]:1,n=t.rank>1?t.rank-1:1,s=`Must have updates.shape = indices.shape[:batchDim] + shape[sliceDim:], got updates.shape: ${e.shape}, indices.shape: ${t.shape}, shape: ${r}, sliceDim: ${o}, and batchDim: ${n}.`;if(e.rank<n)throw new Error(s+` update.rank < ${n}. `);if(r.length<o+(e.rank-n))throw new Error(s+` Output shape length < ${o+(e.rank-n)}`);if(e.rank!==n+r.length-o)throw new Error(s+` update.rank != ${n+r.length-o}`);for(let i=0;i<n;++i)if(e.shape[i]!==t.shape[i])throw new Error(s+` updates.shape[${i}] (${e.shape[i]}) != indices.shape[${i}] (${t.shape[i]}).`);for(let i=0;i<e.rank-n;++i)if(e.shape[i+n]!==r[i+o])throw new Error(s+` updates.shape[${i+n}] (${e.shape[i+n]}) != shape[${i+n}] (${r[i+n]})`)}function Dv(r,t,e){if(t.rank<1)throw new Error(`tf.scatterND() expects the indices to be rank 1 or higher, but the rank was ${t.rank}.`);if(r.rank<1)throw new Error(`tf.scatterND() expects the updates to be rank 1 or higher, but the rank was ${r.rank}.`);if(t.dtype!=="int32")throw new Error(`The dtype of 'indices' should be int32, but got dtype: ${t.dtype}`);if(e.length<1)throw new Error(`Output rank must be greater or equal to 1, but got shape: ${e}`);if(e.length===0){if(t.size===0)throw new Error(`Indices specified for empty output. indices shape: ${t.shape}`);if(r.size===0)throw new Error(`Updates specified for empty output. updates shape: ${r.shape}`)}Hb(e,t,r)}function Fv(r,t,e){let o=t.shape.length,n=o>1?t.shape[o-1]:1,s=e.length,i=1;for(let p=n;p<s;++p)i*=e[p];let l=n<1?1:n,u=ge(t.shape)/l,a=[...fo(e.slice(0,n)),1],c=ge(e);return{sliceRank:n,numUpdates:u,sliceSize:i,strides:a,outputSize:c}}function GL(r,t=1,e=!0){let o=T(r,"x","topk");if(o.rank===0)throw new Error("topk() expects the input to be of rank 1 or higher");let n=o.shape[o.shape.length-1];if(t<0)throw new Error(`'k' passed to topk() must be >= 0 but got ${t}`);if(t>n)throw new Error(`'k' passed to topk() must be <= the last dimension (${n}) but got ${t}`);let s={x:o},i={k:t,sorted:e},[l,u]=_.runKernel(cs,s,i);return{values:l,indices:u}}var $v=E({topk_:GL});function VL(r,t=0){let e=T(r,"x","unique","string_or_numeric");O(e.rank>0,()=>"The input tensor must be at least 1D");let o={x:e},n={axis:t},[s,i]=_.runKernel(qs,o,n);return{values:s,indices:i}}var Mv=E({unique_:VL});function WL(r,t,e){let o=T(r,"x","unsortedSegmentSum"),n=T(t,"segmentIds","unsortedSegmentSum","int32");O(Mo(e),()=>"numSegments must be of dtype int");let s={x:o,segmentIds:n},i={numSegments:e};return _.runKernel(Rl,s,i)}var Pv=E({unsortedSegmentSum_:WL});function zL(r,t=0){let e=T(r,"x","unstack","string_or_numeric");O(t>=-e.shape.length&&t<e.shape.length,()=>`Axis = ${t} is not in [-${e.shape.length}, ${e.shape.length})`);let o={value:e},n={axis:t};return _.runKernel(js,o,n)}var Ov=E({unstack_:zL});function Bv(r,t){let e=[];for(let s=0;s<t.length;s++)t[s]&&e.push(s);let o=gt(r,"int32"),n=gt([e.length,r.length],"int32");for(let s=0;s<e.length;s++){let i=o.indexToLoc(e[s]),l=s*r.length;n.values.set(i,l)}return n.toTensor()}function HL(r,t,e){let o=T(r,"x","transpose");if(t==null&&(t=o.shape.map((i,l)=>l).reverse()),O(o.rank===t.length,()=>`Error in transpose: rank of input ${o.rank} must match length of perm ${t}.`),t.forEach(i=>{O(i>=0&&i<o.rank,()=>`All entries in 'perm' must be between 0 and ${o.rank-1} but got ${t}`)}),o.rank<=1)return o.clone();let n={x:o},s={perm:t};return o.dtype==="complex64"?zt(()=>{let i=ci(o),l=zl(o);return i=_.runKernel(Jr,{x:i},s),l=_.runKernel(Jr,{x:l},s),e&&(l=bs(l)),ds(i,l)}):_.runKernel(Jr,n,s)}var Lv=E({transpose_:HL});function KL(r,t,e){if(e==null||e==="linear")return r;if(e==="relu")return yt(r,Ju(t));throw new Error(`Cannot compute gradient for fused activation ${e}.`)}function qL(r,t){let e=t,o=jp(r.shape,t.shape);return o.length>0&&(e=Ye(e,o)),rt(e,r.shape)}function jL(r,t,e,o){if(t==="linear")return r;if(t==="relu")return na(r);if(t==="elu")return Zp(r);if(t==="relu6")return lm(r);if(t==="prelu")return am(r,e);if(t==="leakyrelu")return Jp(r,o);if(t==="sigmoid")return si(r);throw new Error(`Unknown fused activation ${t}.`)}var XL=(r,t)=>!(r>0)||t==="linear";function Uv(r,t,e){let o=YL(r,t,e),n=o<0?-(o+1):o;r.splice(n,0,t)}function YL(r,t,e){return QL(r,t,e||ZL)}function ZL(r,t){return r>t?1:r<t?-1:0}function QL(r,t,e){let o=0,n=r.length,s=0,i=!1;for(;o<n;){s=o+(n-o>>>1);let l=e(t,r[s]);l>0?o=s+1:(n=s,i=!l)}return i?o:-o-1}function Vv(r,t,e,o,n){return Kb(r,t,e,o,n,0)}function Wv(r,t,e,o,n,s){return Kb(r,t,e,o,n,0,!1,s,!0)}function zv(r,t,e,o,n,s){return Kb(r,t,e,o,n,s,!0)}function Kb(r,t,e,o,n,s,i=!1,l=!1,u=!1){let a=[];for(let g=0;g<t.length;g++)t[g]>n&&a.push({score:t[g],boxIndex:g,suppressBeginIndex:0});a.sort(Gv);let c=s>0?-.5/s:0,p=[],m=[];for(;p.length<e&&a.length>0;){let g=a.pop(),{score:x,boxIndex:y,suppressBeginIndex:C}=g;if(x<n)break;let I=!1;for(let v=p.length-1;v>=C;--v){let S=JL(r,y,p[v]);if(S>=o){I=!0;break}if(g.score=g.score*t3(o,c,S),g.score<=n)break}g.suppressBeginIndex=p.length,I||(g.score===x?(p.push(y),m.push(g.score)):g.score>n&&Uv(a,g,Gv))}let d=p.length,f=e-d;l&&f>0&&(p.push(...new Array(f).fill(0)),m.push(...new Array(f).fill(0)));let h={selectedIndices:p};return i&&(h.selectedScores=m),u&&(h.validOutputs=d),h}function JL(r,t,e){let o=r.subarray(t*4,t*4+4),n=r.subarray(e*4,e*4+4),s=Math.min(o[0],o[2]),i=Math.min(o[1],o[3]),l=Math.max(o[0],o[2]),u=Math.max(o[1],o[3]),a=Math.min(n[0],n[2]),c=Math.min(n[1],n[3]),p=Math.max(n[0],n[2]),m=Math.max(n[1],n[3]),d=(l-s)*(u-i),f=(p-a)*(m-c);if(d<=0||f<=0)return 0;let h=Math.max(s,a),g=Math.max(i,c),x=Math.min(l,p),y=Math.min(u,m),C=Math.max(x-h,0)*Math.max(y-g,0);return C/(d+f-C)}function t3(r,t,e){let o=Math.exp(t*e*e);return e<=r?o:0}function Gv(r,t){return r.score-t.score||r.score===t.score&&t.boxIndex-r.boxIndex}function e3(r,t,e=!1,o=!1){let n=T(r,"images","resizeBilinear");O(n.rank===3||n.rank===4,()=>`Error in resizeBilinear: x must be rank 3 or 4, but got rank ${n.rank}.`),O(t.length===2,()=>`Error in resizeBilinear: new shape must 2D, but got shape ${t}.`),O(o===!1||e===!1,()=>"Error in resizeBilinear: If halfPixelCenters is true, alignCorners must be false.");let s=n,i=!1;n.rank===3&&(i=!0,s=rt(n,[1,n.shape[0],n.shape[1],n.shape[2]]));let[]=t,l={images:s},u={alignCorners:e,halfPixelCenters:o,size:t},a=_.runKernel(Hn,l,u);return i?rt(a,[a.shape[1],a.shape[2],a.shape[3]]):a}var Hv=E({resizeBilinear_:e3});function r3(r,t,e=!1,o=!1){let n=T(r,"images","resizeNearestNeighbor");O(n.rank===3||n.rank===4,()=>`Error in resizeNearestNeighbor: x must be rank 3 or 4, but got rank ${n.rank}.`),O(t.length===2,()=>`Error in resizeNearestNeighbor: new shape must 2D, but got shape ${t}.`),O(n.dtype==="float32"||n.dtype==="int32",()=>"`images` must have `int32` or `float32` as dtype"),O(o===!1||e===!1,()=>"Error in resizeNearestNeighbor: If halfPixelCenters is true, alignCorners must be false.");let s=n,i=!1;n.rank===3&&(i=!0,s=rt(n,[1,n.shape[0],n.shape[1],n.shape[2]]));let[]=t,l={images:s},u={alignCorners:e,halfPixelCenters:o,size:t},a=_.runKernel(zn,l,u);return i?rt(a,[a.shape[1],a.shape[2],a.shape[3]]):a}var Kv=E({resizeNearestNeighbor_:r3});var o3=new Map,n3=new Map,um=class{getClassName(){return this.constructor.className}static fromConfig(t,e){return new t(e)}},qb=class r{constructor(){this.classNameMap={}}static getMap(){return r.instance==null&&(r.instance=new r),r.instance}static register(t){r.getMap().classNameMap[t.className]=[t,t.fromConfig]}};function qv(r,t,e){O(r.className!=null,()=>"Class being registered does not have the static className property defined."),O(typeof r.className=="string",()=>"className is required to be a string, but got type "+typeof r.className),O(r.className.length>0,()=>"Class being registered has an empty-string as its className, which is disallowed."),typeof t>"u"&&(t="Custom"),typeof e>"u"&&(e=r.className);let o=e,n=t+">"+o;return qb.register(r),o3.set(n,r),n3.set(r,n),r}var rr=class extends um{minimize(t,e=!1,o){let{value:n,grads:s}=this.computeGradients(t,o);if(o!=null){let i=o.map(l=>({name:l.name,tensor:s[l.name]}));this.applyGradients(i)}else this.applyGradients(s);return Ce(s),e?n:(n.dispose(),null)}get iterations(){return this.iterations_==null&&(this.iterations_=0),this.iterations_}incrementIterations(){this.iterations_=this.iterations+1}computeGradients(t,e){return Jw(t,e)}dispose(){this.iterations_!=null&&Ce(this.iterations_)}async saveIterations(){return this.iterations_==null&&(this.iterations_=0),{name:"iter",tensor:De(this.iterations_,"int32")}}async getWeights(){throw new Error("getWeights() is not implemented for this optimizer yet.")}async setWeights(t){throw new Error(`setWeights() is not implemented for this optimizer class ${this.getClassName()}`)}async extractIterations(t){return this.iterations_=(await t[0].tensor.data())[0],t.slice(1)}};Object.defineProperty(rr,Symbol.hasInstance,{value:r=>r.minimize!=null&&r.computeGradients!=null&&r.applyGradients!=null});var cm=class extends rr{static get className(){return"Adadelta"}constructor(t,e,o=null){super(),this.learningRate=t,this.rho=e,this.epsilon=o,this.accumulatedGrads=[],this.accumulatedUpdates=[],o==null&&(this.epsilon=_.backend.epsilon())}applyGradients(t){(Array.isArray(t)?t.map(o=>o.name):Object.keys(t)).forEach((o,n)=>{let s=_.registeredVariables[o],i=!1;this.accumulatedGrads[n]==null&&(this.accumulatedGrads[n]={originalName:`${o}/accum_grad`,variable:zt(()=>Ie(s).variable(i))}),this.accumulatedUpdates[n]==null&&(this.accumulatedUpdates[n]={originalName:`${o}/accum_var`,variable:zt(()=>Ie(s).variable(i))});let l=Array.isArray(t)?t[n].tensor:t[o];if(l==null)return;let u=this.accumulatedGrads[n].variable,a=this.accumulatedUpdates[n].variable;zt(()=>{let c=Mt(yt(u,this.rho),yt(Xe(l),1-this.rho)),p=yt(Re(je(Mt(a,this.epsilon)),je(Mt(u,this.epsilon))),l),m=Mt(yt(a,this.rho),yt(Xe(p),1-this.rho));u.assign(c),a.assign(m);let d=Mt(yt(p,-this.learningRate),s);s.assign(d)})}),this.incrementIterations()}dispose(){this.accumulatedUpdates!=null&&(Ce(this.accumulatedGrads.map(t=>t.variable)),Ce(this.accumulatedUpdates.map(t=>t.variable)))}async getWeights(){let t=[...this.accumulatedGrads,...this.accumulatedUpdates];return[await this.saveIterations()].concat(t.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(t){t=await this.extractIterations(t);let e=t.length/2,o=!1;this.accumulatedGrads=t.slice(0,e).map(n=>({originalName:n.name,variable:n.tensor.variable(o)})),this.accumulatedUpdates=t.slice(e,e*2).map(n=>({originalName:n.name,variable:n.tensor.variable(o)}))}getConfig(){return{learningRate:this.learningRate,rho:this.rho,epsilon:this.epsilon}}static fromConfig(t,e){return new t(e.learningRate,e.rho,e.epsilon)}};var pm=class extends rr{static get className(){return"Adagrad"}constructor(t,e=.1){super(),this.learningRate=t,this.initialAccumulatorValue=e,this.accumulatedGrads=[]}applyGradients(t){(Array.isArray(t)?t.map(o=>o.name):Object.keys(t)).forEach((o,n)=>{let s=_.registeredVariables[o];this.accumulatedGrads[n]==null&&(this.accumulatedGrads[n]={originalName:`${o}/accumulator`,variable:zt(()=>Kp(s.shape,this.initialAccumulatorValue).variable(!1))});let i=Array.isArray(t)?t[n].tensor:t[o];if(i==null)return;let l=this.accumulatedGrads[n].variable;zt(()=>{let u=Mt(l,Xe(i));l.assign(u);let a=Mt(yt(Re(i,je(Mt(u,_.backend.epsilon()))),-this.learningRate),s);s.assign(a)})}),this.incrementIterations()}dispose(){this.accumulatedGrads!=null&&Ce(this.accumulatedGrads.map(t=>t.variable))}async getWeights(){return[await this.saveIterations()].concat(this.accumulatedGrads.map(t=>({name:t.originalName,tensor:t.variable})))}async setWeights(t){t=await this.extractIterations(t);let e=!1;this.accumulatedGrads=t.map(o=>({originalName:o.name,variable:o.tensor.variable(e)}))}getConfig(){return{learningRate:this.learningRate,initialAccumulatorValue:this.initialAccumulatorValue}}static fromConfig(t,e){return new t(e.learningRate,e.initialAccumulatorValue)}};var mm=class extends rr{static get className(){return"Adam"}constructor(t,e,o,n=null){super(),this.learningRate=t,this.beta1=e,this.beta2=o,this.epsilon=n,this.accumulatedFirstMoment=[],this.accumulatedSecondMoment=[],zt(()=>{this.accBeta1=De(e).variable(),this.accBeta2=De(o).variable()}),n==null&&(this.epsilon=_.backend.epsilon())}applyGradients(t){let e=Array.isArray(t)?t.map(o=>o.name):Object.keys(t);zt(()=>{let o=He(1,this.accBeta1),n=He(1,this.accBeta2);e.forEach((s,i)=>{let l=_.registeredVariables[s],u=!1;this.accumulatedFirstMoment[i]==null&&(this.accumulatedFirstMoment[i]={originalName:`${s}/m`,variable:zt(()=>Ie(l).variable(u))}),this.accumulatedSecondMoment[i]==null&&(this.accumulatedSecondMoment[i]={originalName:`${s}/v`,variable:zt(()=>Ie(l).variable(u))});let a=Array.isArray(t)?t[i].tensor:t[s];if(a==null)return;let c=this.accumulatedFirstMoment[i].variable,p=this.accumulatedSecondMoment[i].variable,m=Mt(yt(c,this.beta1),yt(a,1-this.beta1)),d=Mt(yt(p,this.beta2),yt(Xe(a),1-this.beta2)),f=Re(m,o),h=Re(d,n);c.assign(m),p.assign(d);let g=Mt(yt(Re(f,Mt(je(h),this.epsilon)),-this.learningRate),l);l.assign(g)}),this.accBeta1.assign(yt(this.accBeta1,this.beta1)),this.accBeta2.assign(yt(this.accBeta2,this.beta2))}),this.incrementIterations()}dispose(){this.accBeta1.dispose(),this.accBeta2.dispose(),this.accumulatedFirstMoment!=null&&Ce(this.accumulatedFirstMoment.map(t=>t.variable)),this.accumulatedSecondMoment!=null&&Ce(this.accumulatedSecondMoment.map(t=>t.variable))}async getWeights(){let t=[...this.accumulatedFirstMoment,...this.accumulatedSecondMoment];return[await this.saveIterations()].concat(t.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(t){t=await this.extractIterations(t),zt(()=>{this.accBeta1.assign(ai(this.beta1,this.iterations_+1)),this.accBeta2.assign(ai(this.beta2,this.iterations_+1))});let e=t.length/2,o=!1;this.accumulatedFirstMoment=t.slice(0,e).map(n=>({originalName:n.name,variable:n.tensor.variable(o)})),this.accumulatedSecondMoment=t.slice(e,e*2).map(n=>({originalName:n.name,variable:n.tensor.variable(o)}))}getConfig(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon}}static fromConfig(t,e){return new t(e.learningRate,e.beta1,e.beta2,e.epsilon)}};var dm=class extends rr{static get className(){return"Adamax"}constructor(t,e,o,n=null,s=0){super(),this.learningRate=t,this.beta1=e,this.beta2=o,this.epsilon=n,this.decay=s,this.accumulatedFirstMoment=[],this.accumulatedWeightedInfNorm=[],zt(()=>{this.iteration=De(0).variable(),this.accBeta1=De(e).variable()}),n==null&&(this.epsilon=_.backend.epsilon())}applyGradients(t){let e=Array.isArray(t)?t.map(o=>o.name):Object.keys(t);zt(()=>{let o=He(1,this.accBeta1),n=Re(-this.learningRate,Mt(yt(this.iteration,this.decay),1));e.forEach((s,i)=>{let l=_.registeredVariables[s],u=!1;this.accumulatedFirstMoment[i]==null&&(this.accumulatedFirstMoment[i]={originalName:`${s}/m`,variable:Ie(l).variable(u)}),this.accumulatedWeightedInfNorm[i]==null&&(this.accumulatedWeightedInfNorm[i]={originalName:`${s}/v`,variable:Ie(l).variable(u)});let a=Array.isArray(t)?t[i].tensor:t[s];if(a==null)return;let c=this.accumulatedFirstMoment[i].variable,p=this.accumulatedWeightedInfNorm[i].variable,m=Mt(yt(c,this.beta1),yt(a,1-this.beta1)),d=yt(p,this.beta2),f=br(a),h=nm(d,f);c.assign(m),p.assign(h);let g=Mt(yt(Re(n,o),Re(m,Mt(h,this.epsilon))),l);l.assign(g)}),this.iteration.assign(Mt(this.iteration,1)),this.accBeta1.assign(yt(this.accBeta1,this.beta1))}),this.incrementIterations()}dispose(){this.accBeta1.dispose(),this.iteration.dispose(),this.accumulatedFirstMoment!=null&&Ce(this.accumulatedFirstMoment.map(t=>t.variable)),this.accumulatedWeightedInfNorm!=null&&Ce(this.accumulatedWeightedInfNorm.map(t=>t.variable))}async getWeights(){throw new Error("getWeights() is not implemented for Adamax yet.")}async setWeights(t){throw new Error("setWeights() is not implemented for Adamax yet.")}getConfig(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon,decay:this.decay}}static fromConfig(t,e){return new t(e.learningRate,e.beta1,e.beta2,e.epsilon,e.decay)}};var jl=class extends rr{static get className(){return"SGD"}constructor(t){super(),this.learningRate=t,this.setLearningRate(t)}applyGradients(t){(Array.isArray(t)?t.map(o=>o.name):Object.keys(t)).forEach((o,n)=>{let s=Array.isArray(t)?t[n].tensor:t[o];if(s==null)return;let i=_.registeredVariables[o];zt(()=>{let l=Mt(yt(this.c,s),i);i.assign(l)})}),this.incrementIterations()}setLearningRate(t){this.learningRate=t,this.c!=null&&this.c.dispose(),this.c=aw(De(-t))}dispose(){this.c.dispose()}async getWeights(){return[await this.saveIterations()]}async setWeights(t){if(t=await this.extractIterations(t),t.length!==0)throw new Error("SGD optimizer does not have settable weights.")}getConfig(){return{learningRate:this.learningRate}}static fromConfig(t,e){return new t(e.learningRate)}};var fm=class extends jl{static get className(){return"Momentum"}constructor(t,e,o=!1){super(t),this.learningRate=t,this.momentum=e,this.useNesterov=o,this.accumulations=[],this.m=De(this.momentum)}applyGradients(t){(Array.isArray(t)?t.map(o=>o.name):Object.keys(t)).forEach((o,n)=>{let s=_.registeredVariables[o];this.accumulations[n]==null&&(this.accumulations[n]={originalName:`${o}/momentum`,variable:zt(()=>Ie(s).variable(!1))});let i=this.accumulations[n].variable,l=Array.isArray(t)?t[n].tensor:t[o];l!=null&&zt(()=>{let u,a=Mt(yt(this.m,i),l);this.useNesterov?u=Mt(yt(this.c,Mt(l,yt(a,this.m))),s):u=Mt(yt(this.c,a),s),i.assign(a),s.assign(u)})}),this.incrementIterations()}dispose(){this.m.dispose(),this.accumulations!=null&&Ce(this.accumulations.map(t=>t.variable))}setMomentum(t){this.momentum=t}async getWeights(){return[await this.saveIterations()].concat(this.accumulations.map(t=>({name:t.originalName,tensor:t.variable})))}async setWeights(t){t=await this.extractIterations(t);let e=!1;this.accumulations=t.map(o=>({originalName:o.name,variable:o.tensor.variable(e)}))}getConfig(){return{learningRate:this.learningRate,momentum:this.momentum,useNesterov:this.useNesterov}}static fromConfig(t,e){return new t(e.learningRate,e.momentum,e.useNesterov)}};var hm=class extends rr{static get className(){return"RMSProp"}constructor(t,e=.9,o=0,n=null,s=!1){if(super(),this.learningRate=t,this.decay=e,this.momentum=o,this.epsilon=n,this.accumulatedMeanSquares=[],this.accumulatedMoments=[],this.accumulatedMeanGrads=[],this.centered=s,n==null&&(this.epsilon=_.backend.epsilon()),t==null)throw new Error("learningRate for RMSPropOptimizer must be defined.")}applyGradients(t){(Array.isArray(t)?t.map(o=>o.name):Object.keys(t)).forEach((o,n)=>{let s=_.registeredVariables[o],i=!1;this.accumulatedMeanSquares[n]==null&&(this.accumulatedMeanSquares[n]={originalName:`${o}/rms`,variable:zt(()=>Ie(s).variable(i))}),this.accumulatedMoments[n]==null&&(this.accumulatedMoments[n]={originalName:`${o}/momentum`,variable:zt(()=>Ie(s).variable(i))}),this.accumulatedMeanGrads[n]==null&&this.centered&&(this.accumulatedMeanGrads[n]={originalName:`${o}/mg`,variable:zt(()=>Ie(s).variable(i))});let l=Array.isArray(t)?t[n].tensor:t[o];if(l==null)return;let u=this.accumulatedMeanSquares[n].variable,a=this.accumulatedMoments[n].variable;zt(()=>{let c=Mt(yt(u,this.decay),yt(Xe(l),1-this.decay));if(this.centered){let p=this.accumulatedMeanGrads[n].variable,m=Mt(yt(p,this.decay),yt(l,1-this.decay)),d=Re(yt(l,this.learningRate),je(He(c,Mt(Xe(m),this.epsilon)))),f=Mt(yt(a,this.momentum),d);u.assign(c),p.assign(m),a.assign(f);let h=He(s,f);s.assign(h)}else{let p=Mt(yt(u,this.decay),yt(Xe(l),1-this.decay)),m=Mt(yt(a,this.momentum),Re(yt(l,this.learningRate),je(Mt(p,this.epsilon))));u.assign(p),a.assign(m);let d=He(s,m);s.assign(d)}})}),this.incrementIterations()}dispose(){this.accumulatedMeanSquares!=null&&Ce(this.accumulatedMeanSquares.map(t=>t.variable)),this.accumulatedMeanGrads!=null&&this.centered&&Ce(this.accumulatedMeanGrads.map(t=>t.variable)),this.accumulatedMoments!=null&&Ce(this.accumulatedMoments.map(t=>t.variable))}async getWeights(){let t=[...this.accumulatedMeanSquares,...this.accumulatedMoments];return this.centered&&t.push(...this.accumulatedMeanGrads),[await this.saveIterations()].concat(t.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(t){t=await this.extractIterations(t);let e=this.centered?t.length/3:t.length/2,o=!1;this.accumulatedMeanSquares=t.slice(0,e).map(n=>({originalName:n.name,variable:n.tensor.variable(o)})),this.accumulatedMoments=t.slice(e,e*2).map(n=>({originalName:n.name,variable:n.tensor.variable(o)})),this.centered&&(this.accumulatedMeanGrads=t.slice(e*2,e*3).map(n=>({originalName:n.name,variable:n.tensor.variable(o)})))}getConfig(){return{learningRate:this.learningRate,decay:this.decay,momentum:this.momentum,epsilon:this.epsilon,centered:this.centered}}static fromConfig(t,e){return new t(e.learningRate,e.decay,e.momentum,e.epsilon,e.centered)}};var s3=[cm,pm,mm,dm,fm,hm,jl];function jv(){for(let r of s3)qv(r)}var a3="model",i3=".json",l3=".weights.bin";function Xv(r){return new Promise(t=>setTimeout(t)).then(r)}var Xl=class r{constructor(t){if(!$().getBool("IS_BROWSER"))throw new Error("browserDownloads() cannot proceed because the current environment is not a browser.");t.startsWith(r.URL_SCHEME)&&(t=t.slice(r.URL_SCHEME.length)),(t==null||t.length===0)&&(t=a3),this.modelJsonFileName=t+i3,this.weightDataFileName=t+l3}async save(t){if(typeof document>"u")throw new Error("Browser downloads are not supported in this environment since `document` is not present");let e=hr.join(t.weightData),o=window.URL.createObjectURL(new Blob([e],{type:"application/octet-stream"}));if(t.modelTopology instanceof ArrayBuffer)throw new Error("BrowserDownloads.save() does not support saving model topology in binary formats yet.");{let n=[{paths:["./"+this.weightDataFileName],weights:t.weightSpecs}],s=Bp(t,n),i=window.URL.createObjectURL(new Blob([JSON.stringify(s)],{type:"application/json"})),l=this.modelJsonAnchor==null?document.createElement("a"):this.modelJsonAnchor;if(l.download=this.modelJsonFileName,l.href=i,await Xv(()=>l.dispatchEvent(new MouseEvent("click"))),t.weightData!=null){let u=this.weightDataAnchor==null?document.createElement("a"):this.weightDataAnchor;u.download=this.weightDataFileName,u.href=o,await Xv(()=>u.dispatchEvent(new MouseEvent("click")))}return{modelArtifactsInfo:fs(t)}}}};Xl.URL_SCHEME="downloads://";var u3=r=>$().getBool("IS_BROWSER")&&!Array.isArray(r)&&r.startsWith(Xl.URL_SCHEME)?c3(r.slice(Xl.URL_SCHEME.length)):null;xr.registerSaveRouter(u3);function c3(r="model"){return new Xl(r)}function jb(r,t,e,o){i(r),e=e??0,o=o??1,l(e,o);let n=0,s=u=>(u.then(a=>{let c=e+ ++n/r.length*(o-e);return t(c),a}),u);function i(u){O(u!=null&&Array.isArray(u)&&u.length>0,()=>"promises must be a none empty array")}function l(u,a){O(u>=0&&u<=1,()=>`Progress fraction must be in range [0, 1], but got startFraction ${u}`),O(a>=0&&a<=1,()=>`Progress fraction must be in range [0, 1], but got endFraction ${a}`),O(a>=u,()=>`startFraction must be no more than endFraction, but got startFraction ${u} and endFraction ${a}`)}return Promise.all(r.map(s))}async function Yv(r,t){t==null&&(t={});let e=t.fetchFunc==null?$().platform.fetch:t.fetchFunc,o=r.map(p=>e(p,t.requestInit,{isBinary:!0})),l=(t.onProgress==null?await Promise.all(o):await jb(o,t.onProgress,0,.5)).map(p=>p.arrayBuffer());return t.onProgress==null?await Promise.all(l):await jb(l,t.onProgress,.5,1)}function Zv(r,t){var e;let o=t.fetchFunc==null?$().platform.fetch:t.fetchFunc,n=0,s;return(e=t.onProgress)===null||e===void 0||e.call(t,0),new ReadableStream({pull:async i=>{for(var l;n<r.length;){s||(s=(await o(r[n],t.requestInit,{isBinary:!0})).body.getReader());let{done:u,value:a}=await s.read();if(u){n++,s=void 0,(l=t.onProgress)===null||l===void 0||l.call(t,n/r.length);continue}i.enqueue(a);return}i.close()}})}var m3="application/octet-stream",d3="application/json",tc=class{constructor(t,e){if(this.DEFAULT_METHOD="POST",e==null&&(e={}),this.weightPathPrefix=e.weightPathPrefix,this.weightUrlConverter=e.weightUrlConverter,e.fetchFunc!=null?(O(typeof e.fetchFunc=="function",()=>"Must pass a function that matches the signature of `fetch` (see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)"),this.fetch=e.fetchFunc):this.fetch=$().platform.fetch,O(t!=null&&t.length>0,()=>"URL path for http must not be null, undefined or empty."),Array.isArray(t)&&O(t.length===2,()=>`URL paths for http must have a length of 2, (actual length is ${t.length}).`),this.path=t,e.requestInit!=null&&e.requestInit.body!=null)throw new Error("requestInit is expected to have no pre-existing body, but has one.");this.requestInit=e.requestInit||{},this.loadOptions=e}async save(t){if(t.modelTopology instanceof ArrayBuffer)throw new Error("BrowserHTTPRequest.save() does not support saving model topology in binary formats yet.");let e=Object.assign({method:this.DEFAULT_METHOD},this.requestInit);e.body=new FormData;let o=[{paths:["./model.weights.bin"],weights:t.weightSpecs}],n=Bp(t,o);if(e.body.append("model.json",new Blob([JSON.stringify(n)],{type:d3}),"model.json"),t.weightData!=null){let i=hr.join(t.weightData);e.body.append("model.weights.bin",new Blob([i],{type:m3}),"model.weights.bin")}let s=await this.fetch(this.path,e);if(s.ok)return{modelArtifactsInfo:fs(t),responses:[s]};throw new Error(`BrowserHTTPRequest.save() failed due to HTTP response status ${s.status}.`)}async loadModelJSON(){let t=await this.fetch(this.path,this.requestInit);if(!t.ok)throw new Error(`Request to ${this.path} failed with status code ${t.status}. Please verify this URL points to the model JSON of the model to load.`);let e;try{e=await t.json()}catch{let i=`Failed to parse model JSON of response from ${this.path}.`;throw this.path.endsWith(".pb")?i+=" Your path contains a .pb file extension. Support for .pb models have been removed in TensorFlow.js 1.0 in favor of .json models. You can re-convert your Python TensorFlow model using the TensorFlow.js 1.0 conversion scripts or you can convert your.pb models with the 'pb2json'NPM script in the tensorflow/tfjs-converter repository.":i+=" Please make sure the server is serving valid JSON for this request.",new Error(i)}let o=e.modelTopology,n=e.weightsManifest;if(o==null&&n==null)throw new Error(`The JSON from HTTP path ${this.path} contains neither model topology or manifest for weights.`);return e}async load(){if(this.loadOptions.streamWeights)return this.loadStream();let t=await this.loadModelJSON();return Lp(t,e=>this.loadWeights(e))}async loadStream(){let t=await this.loadModelJSON(),e=await this.getWeightUrls(t.weightsManifest),o=Up(t.weightsManifest),n=()=>Zv(e,this.loadOptions);return Object.assign(Object.assign({},t),{weightSpecs:o,getWeightStream:n})}async getWeightUrls(t){let e=Array.isArray(this.path)?this.path[1]:this.path,[o,n]=f3(e),s=this.weightPathPrefix||o,i=[],l=[];for(let u of t)for(let a of u.paths)this.weightUrlConverter!=null?l.push(this.weightUrlConverter(a)):i.push(s+a+n);return this.weightUrlConverter&&i.push(...await Promise.all(l)),i}async loadWeights(t){let e=await this.getWeightUrls(t),o=Up(t),n=await Yv(e,this.loadOptions);return[o,n]}};tc.URL_SCHEME_REGEX=/^https?:\/\//;function f3(r){let t=r.lastIndexOf("/"),e=r.lastIndexOf("?"),o=r.substring(0,t),n=e>t?r.substring(e):"";return[o+"/",n]}function Xb(r){return r.match(tc.URL_SCHEME_REGEX)!=null}var Qv=(r,t)=>{if(typeof fetch>"u"&&(t==null||t.fetchFunc==null))return null;{let e=!0;if(Array.isArray(r)?e=r.every(o=>Xb(o)):e=Xb(r),e)return Jv(r,t)}return null};xr.registerSaveRouter(Qv);xr.registerLoadRouter(Qv);function Jv(r,t){return new tc(r,t)}var gm={};mo(gm,{prepareAndValidate:()=>tS});function tS(r,t){let e=r.shape.length,o=t.shape.length;if(e<1)throw new Error(`tf.gatherND() expects the input to be rank 1 or higher, but the rank was ${e}.`);if(o<1)throw new Error(`tf.gatherND() expects the indices to be rank 1 or higher, but the rank was ${o}.`);if(t.dtype!=="int32")throw new Error(`tf.gatherND() expects the indices to be int32 type, but the dtype was ${t.dtype}.`);if(t.shape[o-1]>e)throw new Error(`index innermost dimension length must be <= tensor rank; saw: ${t.shape[o-1]} vs. ${e}`);if(ge(r.shape)===0)throw new Error(`Requested more than 0 entries, but input is empty. Input shape: ${r.shape}.`);let n=t.shape,s=n[n.length-1],i=1;for(let p=0;p<n.length-1;++p)i*=n[p];let l=r.shape,u=n.slice();u.pop();let a=1;for(let p=s;p<e;++p)a*=l[p],u.push(l[p]);let c=[...fo(r.shape).map(p=>p/a),1].slice(0,s);return[u,i,a,c]}var oe={};mo(oe,{assertParamsValid:()=>x3,computeFlatOffset:()=>w3,computeOutShape:()=>y3,getNormalizedAxes:()=>C3,isSliceContinous:()=>I3,maskToAxes:()=>b3,parseSliceParams:()=>v3,sliceInfo:()=>S3,startForAxis:()=>lS,startIndicesWithElidedDims:()=>sS,stopForAxis:()=>uS,stopIndicesWithElidedDims:()=>aS,stridesForAxis:()=>iS,stridesWithElidedDims:()=>rS});var Yb=-2,g3=-1;function x3(r,t,e){let o=r.shape.length;O(o===t.length,()=>`Error in slice${o}D: Length of begin ${t} must match the rank of the array (${o}).`),O(o===e.length,()=>`Error in slice${o}D: Length of size ${e} must match the rank of the array (${o}).`);for(let n=0;n<o;++n)O(t[n]+e[n]<=r.shape[n],()=>`Error in slice${o}D: begin[${n}] + size[${n}] (${t[n]+e[n]}) would overflow input.shape[${n}] (${r.shape[n]})`)}function b3(r){let t=[],e=0;for(;r>0;)r&1&&t.push(e),r/=2,e++;return t}function y3(r,t,e){let o=[];for(let n=0;n<r.length;n++)o[n]=Math.ceil((t[n]-r[n])/e[n]);return o}function rS(r,t,e,o){let n=[...r];for(let s=n.length;s<o.length;s++)n.push(1);for(let s=0;s<e;s++)s===0?n[t]=1:(n.splice(t,0,1),n.pop());return n}function oS(r,t,e){return e<=r?e:e-(t-1)}function nS(r,t){let e=[];for(let o=0;o<r;o++)e.push(t+o);return e}function C3(r,t,e,o,n,s,i,l,u){let a=r.length,c=new Array(a),p=new Array(a),m=new Array(a);if(t.length&&e>0){let d=t[0],f=e+1;c=sS(i,d,f,o,r),p=aS(l,d,f,n,r),m=rS(s,d,f,r)}else for(let d=0;d<a;d++)c[d]=lS(i,o,s,r,d,u),p[d]=uS(l,n,s,r,d,u),m[d]=iS(s,d,u);return{begin:c,end:p,strides:m}}function sS(r,t,e,o,n){let s=[...n],i=nS(e,t);for(let l=0;l<s.length;l++)if(i.indexOf(l)>-1)s[l]=0;else{let u=oS(t,e,l),a=o[u];r&1<<u&&(a=0),s[l]=a}return s}function aS(r,t,e,o,n){let s=[...n],i=nS(e,t);for(let l=0;l<s.length;l++)if(i.indexOf(l)>-1)s[l]=Number.MAX_SAFE_INTEGER;else{let u=oS(t,e,l),a=o[u];r&1<<u&&(a=Number.MAX_SAFE_INTEGER),s[l]=a}for(let l=0;l<s.length;l++){let u=n[l];s[l]<0&&(s[l]+=u),s[l]=Zi(0,s[l],n[l])}return s}function iS(r,t,e){let o=r[t];return(e&1<<t||o==null)&&(o=1),o}function lS(r,t,e,o,n,s){let i=t[n],l=e[n]||1;(r&1<<n||s&1<<n||i==null)&&(l>0?i=Number.MIN_SAFE_INTEGER:i=Number.MAX_SAFE_INTEGER);let u=o[n];return i<0&&(i+=u),i=Zi(0,i,u-1),i}function uS(r,t,e,o,n,s){let i=t[n],l=e[n]||1;(r&1<<n||s&1<<n||i==null)&&(l>0?i=Number.MAX_SAFE_INTEGER:i=Number.MIN_SAFE_INTEGER);let u=o[n];return i<0&&(i+=u),l>0?i=Zi(0,i,u):i=Zi(-1,i,u-1),i}function I3(r,t,e){let o=e.length;for(let n=0;n<e.length;n++)if(e[n]>1){o=n;break}for(let n=o+1;n<e.length;n++)if(t[n]>0||e[n]!==r[n])return!1;return!0}function w3(r,t){let e=r.length>0?r[r.length-1]:1;for(let o=0;o<r.length-1;o++)e+=r[o]*t[o];return e}function v3(r,t,e){let o,n=r.shape.length;typeof t=="number"?o=[t,...new Array(n-1).fill(0)]:t.length<n?o=t.concat(new Array(n-t.length).fill(0)):o=t.slice(),o.forEach(i=>{O(i!==-1,()=>"slice() does not support negative begin indexing.")});let s;return e==null?s=new Array(n).fill(-1):typeof e=="number"?s=[e,...new Array(n-1).fill(-1)]:e.length<n?s=e.concat(new Array(n-e.length).fill(-1)):s=e,s=s.map((i,l)=>i>=0?i:(O(i===-1,()=>`Negative size values should be exactly -1 but got ${i} for the slice() size at index ${l}.`),r.shape[l]-o[l])),[o,s]}function S3(r,t,e,o,n,s,i,l,u){let a;if(o==null?(a=new Array(t.length),a.fill(1)):a=o,i!=null&&i&i-1)throw new Error("Multiple ellipses in slice is not allowed.");let c=!1,p={dims:a.length,numAddAxisAfterEllipsis:0,begin:t.slice(),end:e.slice(),strides:a.slice(),beginMask:n,endMask:s,ellipsisMask:i,newAxisMask:l,shrinkAxisMask:u};for(let C=0;C<p.dims;C++)c&&1<<C&l&&p.numAddAxisAfterEllipsis++,1<<C&i&&(c=!0);c||(p.ellipsisMask|=1<<p.dims,p.dims++);let m={dims:r.length,beginMask:0,endMask:0,beginValid:!1,endValid:!1};k3(p,m);let d=!0,f=!0,h=!0,g=[],x=[];for(let C=0;C<r.length;++C){if(m.strides[C]===0)throw Error(`strides[${C}] must be non-zero`);let I=!!(m.shrinkAxisMask&1<<C),v=r[C];if(v===-1){g.push(I?1:-1);continue}let S=[m.beginMask&1<<C,m.endMask&1<<C],k=[m.strides[C]>0?0:-1,m.strides[C]>0?v:v-1];if(I&&m.strides[C]<=0)throw Error("only stride 1 allowed on non-range indexing.");h=h&&m.strides[C]===1;let A=!!(m.beginMask&1<<C&&m.endMask&1<<C);if(m.beginValid&&m.endValid){if(I){let B=m.begin[C]<0?v+m.begin[C]:m.begin[C];if(m.begin[C]=B,m.end[C]=m.begin[C]+1,B<0||B>=v)throw Error(`slice index ${m.begin[C]} of dimension ${C} out of bounds.`)}else m.begin[C]=eS(m.begin[C],0,m.strides[C],v,S,k),m.end[C]=eS(m.end[C],1,m.strides[C],v,S,k);let M=m.strides[C]===1&&m.begin[C]===0&&m.end[C]===v;d=d&&M,f=f&&(C===0&&m.strides[C]===1||M)}else d=d&&m.strides[C]===1&&A,f=f&&(C===0&&m.strides[C]===1||A);let D,F=!1;if(m.beginValid&&m.endValid?(D=m.end[C]-m.begin[C],F=!0):I?(D=1,F=!0):A&&v>=0&&(m.strides[C]<0?D=-v:D=v,F=!0),F){let M;D===0||D<0!=m.strides[C]<0?M=0:M=Math.trunc(D/m.strides[C])+(D%m.strides[C]!==0?1:0),g.push(M)}else g.push(-1)}for(let C=0;C<m.finalShapeGatherIndices.length;++C){let I=m.finalShapeGatherIndices[C];I>=0?x.push(g[I]):I===Yb&&x.push(1)}return{finalShapeSparse:x.filter((C,I)=>m.finalShapeGatherIndices[I]!==Yb),finalShape:x,isIdentity:d,sliceDim0:f,isSimpleSlice:h,begin:m.begin,end:m.end,strides:m.strides}}function k3(r,t){t.beginMask=0,t.endMask=0,t.shrinkAxisMask=0;let e=0;t.beginValid=r.begin!=null,t.endValid=r.end!=null,t.begin=new Array(t.dims),t.end=new Array(t.dims),t.strides=new Array(t.dims),t.finalShapeGatherIndices=[],t.finalShapeGatherIndicesSparse=[],t.inputShapeGatherIndicesSparse=new Array(t.dims);for(let o=0;o<r.dims;o++)if(1<<o&r.ellipsisMask){let n=Math.min(t.dims-(r.dims-o)+1+r.numAddAxisAfterEllipsis,t.dims);for(;e<n;e++)t.begin[e]=0,t.end[e]=0,t.strides[e]=1,t.beginMask|=1<<e,t.endMask|=1<<e,t.finalShapeGatherIndices.push(e),t.finalShapeGatherIndicesSparse.push(-1),t.inputShapeGatherIndicesSparse[e]=o}else if(1<<o&r.newAxisMask)t.finalShapeGatherIndices.push(Yb),t.finalShapeGatherIndicesSparse.push(-1);else{if(e===t.begin.length)throw Error(`Index out of range using input dim ${e}; input has only ${t.dims} dims, ${t.begin.length}.`);r.begin!=null&&(t.begin[e]=r.begin[o]),r.end!=null&&(t.end[e]=r.end[o]),t.strides[e]=r.strides[o],r.beginMask&1<<o&&(t.beginMask|=1<<e),r.endMask&1<<o&&(t.endMask|=1<<e),r.shrinkAxisMask&1<<o?(t.finalShapeGatherIndices.push(g3),t.finalShapeGatherIndicesSparse.push(-1),t.shrinkAxisMask|=1<<e):(t.finalShapeGatherIndices.push(e),t.finalShapeGatherIndicesSparse.push(o)),t.inputShapeGatherIndicesSparse[e]=o,e++}}function eS(r,t,e,o,n,s){if(n[t])return e>0?s[t]:s[t+1&1];{let i=r<0?o+r:r;return i<s[0]?s[0]:i>s[1]?s[1]:i}}var T3=typeof requestAnimationFrame<"u"?requestAnimationFrame:typeof setImmediate<"u"?setImmediate:r=>r();function Zb(){return new Promise(r=>T3(()=>r()))}var w={};mo(w,{ERF_A1:()=>W3,ERF_A2:()=>z3,ERF_A3:()=>H3,ERF_A4:()=>K3,ERF_A5:()=>q3,ERF_P:()=>V3,PARALLELIZE_THRESHOLD:()=>xm,RowPartitionType:()=>Io,SELU_SCALE:()=>G3,SELU_SCALEALPHA:()=>U3,applyActivation:()=>jL,assertAndGetBroadcastShape:()=>Jt,assertAxesAreInnerMostDims:()=>lB,assertParamsConsistent:()=>_3,assignToTypedArray:()=>J3,axesAreInnerMostDims:()=>bb,calculateShapes:()=>Fv,checkEinsumDimSizes:()=>sU,checkPadOnDimRoundingMode:()=>Er,combineLocations:()=>Vw,combineRaggedTensorToTensorShapes:()=>A3,complexWithEvenIndex:()=>Y3,complexWithOddIndex:()=>Z3,computeConv2DInfo:()=>pb,computeConv3DInfo:()=>Nw,computeDefaultPad:()=>mb,computeDilation2DInfo:()=>kO,computeOptimalWindowSize:()=>F3,computeOutAndReduceShapes:()=>iB,computeOutShape:()=>N3,computePool2DInfo:()=>cb,computePool3DInfo:()=>TO,convertConv2DDataFormat:()=>Aw,decodeEinsumEquation:()=>oU,eitherStridesOrDilationsAreOne:()=>ro,expandShapeToKeepDim:()=>qu,exponent:()=>eU,exponents:()=>tU,fromStringArrayToUint8:()=>TU,fromUint8ToStringArray:()=>kU,getAxesPermutation:()=>uB,getBroadcastDims:()=>Lw,getComplexWithIndex:()=>Q3,getEinsumComputePath:()=>aU,getEinsumPermutation:()=>nU,getFusedBiasGradient:()=>qL,getFusedDyActivation:()=>KL,getImageCenter:()=>$3,getInnerMostAxes:()=>pB,getPermuted:()=>P3,getRaggedRank:()=>R3,getReductionAxes:()=>jp,getReshaped:()=>M3,getReshapedPermuted:()=>O3,getRowPartitionTypesHelper:()=>E3,getSliceBeginCoords:()=>B3,getSliceSize:()=>L3,getSparseFillEmptyRowsIndicesDenseShapeMismatch:()=>cU,getSparseFillEmptyRowsNegativeIndexErrorMessage:()=>pU,getSparseFillEmptyRowsOutOfRangeIndexErrorMessage:()=>mU,getSparseReshapeEmptyTensorZeroOutputDimErrorMessage:()=>hU,getSparseReshapeInputOutputMismatchErrorMessage:()=>xU,getSparseReshapeInputOutputMultipleErrorMessage:()=>gU,getSparseReshapeMultipleNegativeOneOutputDimErrorMessage:()=>dU,getSparseReshapeNegativeOutputDimErrorMessage:()=>fU,getSparseSegmentReductionIndicesOutOfRangeErrorMessage:()=>IU,getSparseSegmentReductionNegativeSegmentIdsErrorMessage:()=>bU,getSparseSegmentReductionNonIncreasingSegmentIdsErrorMessage:()=>yU,getSparseSegmentReductionSegmentIdOutOfRangeErrorMessage:()=>CU,getUndoAxesPermutation:()=>cB,isIdentityPermutation:()=>iU,log:()=>kP,mergeRealAndImagArrays:()=>j3,prepareAndValidate:()=>tS,prepareSplitSize:()=>uU,segment_util:()=>Jb,shouldFuse:()=>XL,slice_util:()=>oe,splitRealAndImagArrays:()=>X3,stridesOrDilationsArePositive:()=>oi,tupleValuesAreOne:()=>ub,upcastType:()=>be,validateDefaultValueShape:()=>D3,validateInput:()=>Dv,validateUpdateShape:()=>Hb,warn:()=>ps});function _3(r,t){let e=r[0].length;r.forEach((n,s)=>{O(n.length===e,()=>`Error in concat${e}D: rank of tensors[${s}] must be the same as the rank of the rest (${e})`)}),O(t>=0&&t<e,()=>`Error in concat${e}D: axis must be between 0 and ${e-1}.`);let o=r[0];r.forEach((n,s)=>{for(let i=0;i<e;i++)O(i===t||n[i]===o[i],()=>`Error in concat${e}D: Shape of tensors[${s}] (${n}) does not match the shape of the rest (${o}) along the non-concatenated axis ${s}.`)})}function N3(r,t){let e=r[0].slice();for(let o=1;o<r.length;o++)e[t]+=r[o][t];return e}var Io;(function(r){r[r.FIRST_DIM_SIZE=0]="FIRST_DIM_SIZE",r[r.VALUE_ROWIDS=1]="VALUE_ROWIDS",r[r.ROW_LENGTHS=2]="ROW_LENGTHS",r[r.ROW_SPLITS=3]="ROW_SPLITS",r[r.ROW_LIMITS=4]="ROW_LIMITS",r[r.ROW_STARTS=5]="ROW_STARTS"})(Io||(Io={}));function A3(r,t,e){let o=new Array;if(e==null&&t==null)return o;if(t==null)for(;o.length<r+e.length;)o.push(-1);else o=t.slice();if(e==null)return o;if(r+e.length!==o.length)throw new Error(`rt input.shape and shape=${t} are incompatible: rt input.rank = ${r+e.length}, but shape.rank = ${o.length}`);for(let n=1;n<e.length;++n){let s=e[n],i=o[o.length-e.length+n],l=o[i];if(s>=0)if(l>=0){if(l!==s)throw new Error(`rt input.shape and shape=${t} are incompatible: rt input.shape[${n+r}] = ${s} but shape[${n+r}] = ${l}`)}else o[i]=s}return o}function E3(r){let t={FIRST_DIM_SIZE:Io.FIRST_DIM_SIZE,VALUE_ROWIDS:Io.VALUE_ROWIDS,ROW_LENGTHS:Io.ROW_LENGTHS,ROW_SPLITS:Io.ROW_SPLITS,ROW_LIMITS:Io.ROW_LIMITS,ROW_STARTS:Io.ROW_STARTS},e=[];for(let o of r)if(o in t)e.push(t[o]);else break;return e}function R3(r){return r.length===0?0:r[0]===Io.FIRST_DIM_SIZE?r.length-1:r.length}function D3(r,t){if(r==null||t==null)return;let e=r.length,o=t.length;if(e>=o)throw new Error(`defaultValue.shape=${r} and ragged tensor flatValues.shape=${t}, are incompatible: defaultValue.rank = ${e} must be less than ragged tensor input flatValues.rank = ${o})`);for(let n=0;n<Math.min(e,o-1);++n){let s=r[n],i=t[n+1];if(s>=0&&i>=0&&s!==1&&s!==i)throw new Error(`defaultValue.shape=${r}, and ragged tensor input flatValues.shape=${t} are incompatible: defaultValue.shape[${n-r.length}] = ${s} but ragged tensor input.flatValues.shape[${n-r.length}] = ${i}`)}}var xm=30;function F3(r){return r<=xm?r:ol(r,Math.floor(Math.sqrt(r)))}function $3(r,t,e){let o=e*(typeof r=="number"?r:r[0]),n=t*(typeof r=="number"?r:r[1]);return[o,n]}function M3(r,t,e,o=!0){let n=[];if(o)n=n.concat(t.slice(0)),n.push(r[0]/e),n=n.concat(r.slice(1));else{n=n.concat(r[0]);let s=t.length;for(let i=0;i<s;++i)n=n.concat([r[i+1]/t[i],t[i]]);n=n.concat(r.slice(s+1))}return n}function P3(r,t,e=!0){let o=[];if(e){o.push(t);for(let n=t+1;n<r;++n)n<=2*t?(o.push(n),o.push(n-(t+1))):o.push(n)}else{let n=[],s=[];for(let i=1;i<r;++i)i>=t*2+1||i%2===1?s.push(i):n.push(i);o.push(...n),o.push(0),o.push(...s)}return o}function O3(r,t,e,o=!0){let n=[];o?n.push(r[0]/e):n.push(r[0]*e);for(let s=1;s<r.length;++s)s<=t.length?o?n.push(t[s-1]*r[s]):n.push(r[s]/t[s-1]):n.push(r[s]);return n}function B3(r,t){let e=[0];for(let o=0;o<t;++o)e.push(r[o][0]);return e}function L3(r,t,e){let o=r.slice(0,1);for(let n=0;n<e;++n)o.push(r[n+1]-t[n][0]-t[n][1]);return o}var U3=1.7580993408473768,G3=1.0507009873554805;var V3=.3275911,W3=.254829592,z3=-.284496736,H3=1.421413741,K3=-1.453152027,q3=1.061405429;function j3(r,t){if(r.length!==t.length)throw new Error(`Cannot merge real and imag arrays of different lengths. real:${r.length}, imag: ${t.length}.`);let e=new Float32Array(r.length*2);for(let o=0;o<e.length;o+=2)e[o]=r[o/2],e[o+1]=t[o/2];return e}function X3(r){let t=new Float32Array(r.length/2),e=new Float32Array(r.length/2);for(let o=0;o<r.length;o+=2)t[o/2]=r[o],e[o/2]=r[o+1];return{real:t,imag:e}}function Y3(r){let t=Math.ceil(r.length/4),e=new Float32Array(t),o=new Float32Array(t);for(let n=0;n<r.length;n+=4)e[Math.floor(n/4)]=r[n],o[Math.floor(n/4)]=r[n+1];return{real:e,imag:o}}function Z3(r){let t=Math.floor(r.length/4),e=new Float32Array(t),o=new Float32Array(t);for(let n=2;n<r.length;n+=4)e[Math.floor(n/4)]=r[n],o[Math.floor(n/4)]=r[n+1];return{real:e,imag:o}}function Q3(r,t){let e=r[t*2],o=r[t*2+1];return{real:e,imag:o}}function J3(r,t,e,o){r[o*2]=t,r[o*2+1]=e}function tU(r,t){let e=new Float32Array(r/2),o=new Float32Array(r/2);for(let n=0;n<Math.ceil(r/2);n++){let s=(t?2:-2)*Math.PI*(n/r);e[n]=Math.cos(s),o[n]=Math.sin(s)}return{real:e,imag:o}}function eU(r,t,e){let o=(e?2:-2)*Math.PI*(r/t),n=Math.cos(o),s=Math.sin(o);return{real:n,imag:s}}var Qb="->",rU=/->/g,cS=",",pS="...";function oU(r,t){r=r.replace(/\s/g,"");let e=(r.length-r.replace(rU,"").length)/Qb.length;if(e<1)throw new Error("Equations without an arrow are not supported.");if(e>1)throw new Error(`Equation must contain exactly one arrow ("${Qb}").`);let[o,n]=r.split(Qb);O(o.indexOf(pS)===-1,()=>`The ellipsis notation ("${pS}") is not supported yet.`);let s=o.split(cS),i=s.length;if(t!==i)throw new Error(`Expected ${i} input tensors, received ${t}`);if(i>2)throw new Error("Support for more than 2 input tensors is not implemented yet.");let l=[];for(let m=0;m<n.length;++m){let d=n[m];if(!s.some(f=>f.indexOf(d)!==-1))throw new Error(`Output subscripts contain the label ${d} not present in the input subscripts.`);l.indexOf(d)===-1&&l.push(d)}for(let m=0;m<o.length;++m){let d=o[m];l.indexOf(d)===-1&&d!==cS&&l.push(d)}let u=new Array(s.length);for(let m=0;m<i;++m){if(new Set(s[m].split("")).size!==s[m].length)throw new Error(`Found duplicate axes in input component ${s[m]}. Support for duplicate axes in input is not implemented yet.`);u[m]=[];for(let d=0;d<s[m].length;++d)u[m].push(l.indexOf(s[m][d]))}let a=l.length,c=n.length,p=[];for(let m=c;m<a;++m)p.push(m);return{allDims:l,summedDims:p,idDims:u}}function nU(r,t){let e=new Array(r);e.fill(-1);for(let n=0;n<t.length;++n)e[t[n]]=n;let o=[];for(let n=0;n<r;++n)e[n]===-1&&o.push(n);return e=e.filter(n=>n!==-1),{permutationIndices:e,expandDims:o}}function sU(r,t,e){let o=new Array(r);for(let n=0;n<e.length;++n){let s=e[n].shape;for(let i=0;i<t[n].length;++i)o[t[n][i]]===void 0?o[t[n][i]]=s[i]:O(o[t[n][i]]===s[i],()=>`Expected dimension ${o[t[n][i]]} at axis ${i} of input shaped ${JSON.stringify(s)}, but got dimension ${s[i]}`)}}function aU(r,t){let e=r,o=[],n=0;r.length===0&&e.push(-1),n=r.length+1;for(let i=0;i<n;++i)o.push([]);let s=[];for(let i=0;i<e.length;++i){let l=e[i],u=lU(t,l);for(let a of u)s.indexOf(a)===-1&&(o[i].push(a),s.push(a))}return{path:e,steps:o}}function iU(r){return r.every((t,e)=>t===e)}function lU(r,t){let e=[];for(let o=0;o<r.length;++o)(r[o].length===0||r[o].indexOf(t)!==-1||t===-1)&&e.push(o);return e}function uU(r,t,e=0){let o=[];if(typeof t=="number")O(r.shape[e]%t===0,()=>"Number of splits must evenly divide the axis."),o=new Array(t).fill(r.shape[e]/t);else{let n=t.reduce((i,l)=>(l===-1&&(i+=1),i),0);O(n<=1,()=>"There should be only one negative value in split array.");let s=t.indexOf(-1);if(s!==-1){let i=t.reduce((l,u)=>u>0?l+u:l);t[s]=r.shape[e]-i}O(r.shape[e]===t.reduce((i,l)=>i+l),()=>"The sum of sizes must match the size of the axis dimension."),o=t}return o}function cU(r){return`Received SparseTensor with denseShape[0] = 0 but
  indices.shape[0] = ${r}`}function pU(r,t){return`indices(${r}, 0) is invalid: ${t} < 0`}function mU(r,t,e){return`indices(${r}, 0) is invalid: ${t} >= ${e}`}function dU(r,t){return`only one output dimension may be -1, not both ${r} and ${t}`}function fU(r,t){return`size ${r} must be non-negative, not ${t}`}function hU(){return"reshape cannot infer the missing input size for an empty tensor unless all specified input sizes are non-zero"}function gU(r,t){let e=ge(r),o=ge(t);return`Input to reshape is a SparseTensor with ${e}
  dense values, but the requested shape requires a multiple of ${o}. inputShape=${r} outputShape= ${t}`}function xU(r,t){let e=ge(r),o=ge(t);return`Input to reshape is a tensor with ${e} dense values, but the requested shape has ${o}. inputShape=${r} outputShape=${t}`}function bU(){return"segment ids must be >= 0"}function yU(){return"segment ids are not increasing"}function CU(r,t){return`Segment id ${r} out of range [0, ${t}), possibly because segmentIds input is not sorted.`}function IU(r,t,e){return`Bad: indices[${r}] == ${t} out of range [0, ${e})`}var Jb={};mo(Jb,{collectGatherOpShapeInfo:()=>SU,computeOutShape:()=>vU,segOpComputeOptimalWindowSize:()=>wU});function wU(r,t){let e=!1,o;for(r<=xm?(o=r,e=!0):o=ol(r,Math.floor(Math.sqrt(r)));!e;)o>t||o===r?e=!0:o=ol(r,o+1);return o}function vU(r,t,e){let o=[],n=r.length;for(let s=0;s<n;s++)s!==t?o.push(r[s]):o.push(e);return o}function SU(r,t,e,o){let n=t.shape.length,s=r.shape.length;if(o!==0&&(o<-n||o>n))throw new Error(`Expect batchDims in the range of [-${n}, ${n}], but got ${o}`);if(o<0&&(o+=n),o>s)throw new Error(`batchDims (${o}) must be less than rank(x) (
    ${s}).`);if(e<o)throw new Error(`batchDims (${o}) must be less than or equal to axis (${e}).`);for(let p=0;p<o;++p)if(r.shape[p]!==t.shape[p])throw new Error(`x.shape[${p}]: ${r.shape[p]} should be equal to indices.shape[${p}]: ${t.shape[p]}.`);let i=r.shape[e],l=[],u=1,a=1,c=1;for(let p=0;p<o;++p)l.push(r.shape[p]),u*=r.shape[p];for(let p=o;p<e;p++)l.push(r.shape[p]),a*=r.shape[p];for(let p=o;p<n;p++)l.push(t.shape[p]);for(let p=e+1;p<s;p++)l.push(r.shape[p]),c*=r.shape[p];return{batchSize:u,sliceSize:c,outerSize:a,dimSize:i,outputShape:l}}function kU(r){try{return r.map(t=>Ol(t))}catch(t){throw new Error(`Failed to decode encoded string bytes into utf-8, error: ${t}`)}}function TU(r){return r.map(t=>Pl(t))}var Be={};mo(Be,{nonMaxSuppressionV3Impl:()=>Vv,nonMaxSuppressionV4Impl:()=>Wv,nonMaxSuppressionV5Impl:()=>zv,whereImpl:()=>Bv});jv();N().prototype.abs=function(){return this.throwIfDisposed(),br(this)};N().prototype.acos=function(){return this.throwIfDisposed(),rb(this)};N().prototype.acosh=function(){return this.throwIfDisposed(),ob(this)};N().prototype.add=function(r){return this.throwIfDisposed(),Mt(this,r)};N().prototype.all=function(r,t){return this.throwIfDisposed(),vw(this,r,t)};N().prototype.any=function(r,t){return this.throwIfDisposed(),Sw(this,r,t)};N().prototype.argMax=function(r){return this.throwIfDisposed(),kw(this,r)};N().prototype.argMin=function(r){return this.throwIfDisposed(),Tw(this,r)};N().prototype.asScalar=function(){return this.throwIfDisposed(),O(this.size===1,()=>"The array must have only 1 element."),rt(this,[])};N().prototype.asType=function(r){return this.throwIfDisposed(),Qt(this,r)};N().prototype.as1D=function(){return this.throwIfDisposed(),rt(this,[this.size])};N().prototype.as2D=function(r,t){return this.throwIfDisposed(),rt(this,[r,t])};N().prototype.as3D=function(r,t,e){return this.throwIfDisposed(),rt(this,[r,t,e])};N().prototype.as4D=function(r,t,e,o){return this.throwIfDisposed(),rt(this,[r,t,e,o])};N().prototype.as5D=function(r,t,e,o,n){return this.throwIfDisposed(),rt(this,[r,t,e,o,n])};N().prototype.asin=function(){return this.throwIfDisposed(),nb(this)};N().prototype.asinh=function(){return this.throwIfDisposed(),sb(this)};N().prototype.atan=function(){return this.throwIfDisposed(),ab(this)};N().prototype.atan2=function(r){return this.throwIfDisposed(),_w(this,r)};N().prototype.atanh=function(){return this.throwIfDisposed(),ib(this)};N().prototype.avgPool=function(r,t,e,o){return this.throwIfDisposed(),zp(this,r,t,e,o)};N().prototype.batchToSpaceND=function(r,t){return this.throwIfDisposed(),Hp(this,r,t)};N().prototype.batchNorm=function(r,t,e,o,n){return this.throwIfDisposed(),Rw(this,r,t,e,o,n)};N().prototype.broadcastTo=function(r){return this.throwIfDisposed(),gs(this,r)};N().prototype.cast=function(r){return this.throwIfDisposed(),Qt(this,r)};N().prototype.ceil=function(){return this.throwIfDisposed(),db(this)};N().prototype.clipByValue=function(r,t){return this.throwIfDisposed(),fb(this,r,t)};N().prototype.concat=function(r,t){return this.throwIfDisposed(),r instanceof Se&&(r=[r]),oo([this,...r],t)};N().prototype.conv1d=function(r,t,e,o,n,s){return this.throwIfDisposed(),Dw(this,r,t,e,o,n,s)};N().prototype.conv2dTranspose=function(r,t,e,o,n){return this.throwIfDisposed(),$w(this,r,t,e,o,n)};N().prototype.conv2d=function(r,t,e,o,n,s){return this.throwIfDisposed(),xs(this,r,t,e,o,n,s)};N().prototype.cos=function(){return this.throwIfDisposed(),hb(this)};N().prototype.cosh=function(){return this.throwIfDisposed(),gb(this)};N().prototype.cumprod=function(r,t,e){return this.throwIfDisposed(),Mw(this,r,t,e)};N().prototype.cumsum=function(r,t,e){return this.throwIfDisposed(),Pw(this,r,t,e)};N().prototype.depthToSpace=function(r,t){return this.throwIfDisposed(),Ow(this,r,t)};N().prototype.depthwiseConv2d=function(r,t,e,o,n,s){return this.throwIfDisposed(),qp(this,r,t,e,o,n,s)};N().prototype.dilation2d=function(r,t,e,o,n){return this.throwIfDisposed(),Bw(this,r,t,e,o,n)};N().prototype.divNoNan=function(r){return this.throwIfDisposed(),Uw(this,r)};N().prototype.div=function(r){return this.throwIfDisposed(),Re(this,r)};N().prototype.dot=function(r){return this.throwIfDisposed(),Gw(this,r)};N().prototype.elu=function(){return this.throwIfDisposed(),Zp(this)};N().prototype.equal=function(r){return this.throwIfDisposed(),Xp(this,r)};N().prototype.erf=function(){return this.throwIfDisposed(),xb(this)};N().prototype.euclideanNorm=function(r,t){return this.throwIfDisposed(),zw(this,r,t)};N().prototype.exp=function(){return this.throwIfDisposed(),ra(this)};N().prototype.expandDims=function(r){return this.throwIfDisposed(),Hw(this,r)};N().prototype.expm1=function(){return this.throwIfDisposed(),yb(this)};N().prototype.fft=function(){return this.throwIfDisposed(),Zu(this)};N().prototype.flatten=function(){return this.throwIfDisposed(),rt(this,[this.size])};N().prototype.floor=function(){return this.throwIfDisposed(),Cb(this)};N().prototype.floorDiv=function(r){return this.throwIfDisposed(),Wp(this,r)};N().prototype.gather=function(r,t,e){return this.throwIfDisposed(),qw(this,r,t,e)};N().prototype.greaterEqual=function(r){return this.throwIfDisposed(),Xw(this,r)};N().prototype.greater=function(r){return this.throwIfDisposed(),jw(this,r)};N().prototype.ifft=function(){return this.throwIfDisposed(),Kl(this)};N().prototype.irfft=function(){return this.throwIfDisposed(),Gb(this)};N().prototype.isFinite=function(){return this.throwIfDisposed(),Ib(this)};N().prototype.isInf=function(){return this.throwIfDisposed(),wb(this)};N().prototype.isNaN=function(){return this.throwIfDisposed(),vb(this)};N().prototype.leakyRelu=function(r){return this.throwIfDisposed(),Jp(this,r)};N().prototype.lessEqual=function(r){return this.throwIfDisposed(),Zw(this,r)};N().prototype.less=function(r){return this.throwIfDisposed(),Yw(this,r)};N().prototype.localResponseNormalization=function(r,t,e,o){return this.throwIfDisposed(),Qw(this,r,t,e,o)};N().prototype.logSigmoid=function(){return this.throwIfDisposed(),kb(this)};N().prototype.logSoftmax=function(r){return this.throwIfDisposed(),Tb(this,r)};N().prototype.logSumExp=function(r,t){return this.throwIfDisposed(),tv(this,r,t)};N().prototype.log=function(){return this.throwIfDisposed(),ii(this)};N().prototype.log1p=function(){return this.throwIfDisposed(),Sb(this)};N().prototype.logicalAnd=function(r){return this.throwIfDisposed(),Xu(this,r)};N().prototype.logicalNot=function(){return this.throwIfDisposed(),em(this)};N().prototype.logicalOr=function(r){return this.throwIfDisposed(),rm(this,r)};N().prototype.logicalXor=function(r){return this.throwIfDisposed(),ev(this,r)};N().prototype.matMul=function(r,t,e){return this.throwIfDisposed(),re(this,r,t,e)};N().prototype.maxPool=function(r,t,e,o){return this.throwIfDisposed(),om(this,r,t,e,o)};N().prototype.max=function(r,t){return this.throwIfDisposed(),Rr(this,r,t)};N().prototype.maximum=function(r){return this.throwIfDisposed(),nm(this,r)};N().prototype.mean=function(r,t){return this.throwIfDisposed(),Hl(this,r,t)};N().prototype.min=function(r,t){return this.throwIfDisposed(),ju(this,r,t)};N().prototype.minimum=function(r){return this.throwIfDisposed(),rv(this,r)};N().prototype.mirrorPad=function(r,t){return this.throwIfDisposed(),ov(this,r,t)};N().prototype.mod=function(r){return this.throwIfDisposed(),nv(this,r)};N().prototype.mul=function(r){return this.throwIfDisposed(),yt(this,r)};N().prototype.neg=function(){return this.throwIfDisposed(),bs(this)};N().prototype.norm=function(r,t,e){return this.throwIfDisposed(),Qp(this,r,t,e)};N().prototype.notEqual=function(r){return this.throwIfDisposed(),sv(this,r)};N().prototype.oneHot=function(r,t=1,e=0){return this.throwIfDisposed(),av(this,r,t,e)};N().prototype.onesLike=function(){return this.throwIfDisposed(),_b(this)};N().prototype.pad=function(r,t){return this.throwIfDisposed(),iv(this,r,t)};N().prototype.pool=function(r,t,e,o,n,s){return this.throwIfDisposed(),lv(this,r,t,e,o,n,s)};N().prototype.pow=function(r){return this.throwIfDisposed(),ai(this,r)};N().prototype.prelu=function(r){return this.throwIfDisposed(),am(this,r)};N().prototype.prod=function(r,t){return this.throwIfDisposed(),uv(this,r,t)};N().prototype.reciprocal=function(){return this.throwIfDisposed(),$b(this)};N().prototype.relu=function(){return this.throwIfDisposed(),na(this)};N().prototype.relu6=function(){return this.throwIfDisposed(),lm(this)};N().prototype.reshapeAs=function(r){return this.throwIfDisposed(),rt(this,r.shape)};N().prototype.reshape=function(r){return this.throwIfDisposed(),rt(this,r)};N().prototype.resizeBilinear=function(r,t,e){return this.throwIfDisposed(),Hv(this,r,t,e)};N().prototype.resizeNearestNeighbor=function(r,t,e){return this.throwIfDisposed(),Kv(this,r,t,e)};N().prototype.reverse=function(r){return this.throwIfDisposed(),Yu(this,r)};N().prototype.rfft=function(){return this.throwIfDisposed(),Vb(this)};N().prototype.round=function(){return this.throwIfDisposed(),Mb(this)};N().prototype.rsqrt=function(){return this.throwIfDisposed(),Pb(this)};N().prototype.selu=function(){return this.throwIfDisposed(),_v(this)};N().prototype.separableConv2d=function(r,t,e,o,n,s){return this.throwIfDisposed(),Nv(this,r,t,e,o,n,s)};N().prototype.sigmoid=function(){return this.throwIfDisposed(),si(this)};N().prototype.sign=function(){return this.throwIfDisposed(),Ob(this)};N().prototype.sin=function(){return this.throwIfDisposed(),Bb(this)};N().prototype.sinh=function(){return this.throwIfDisposed(),Lb(this)};N().prototype.slice=function(r,t){return this.throwIfDisposed(),ea(this,r,t)};N().prototype.softmax=function(r){return this.throwIfDisposed(),Ub(this,r)};N().prototype.softplus=function(){return this.throwIfDisposed(),oa(this)};N().prototype.spaceToBatchND=function(r,t){return this.throwIfDisposed(),sm(this,r,t)};N().prototype.split=function(r,t){return this.throwIfDisposed(),Qu(this,r,t)};N().prototype.sqrt=function(){return this.throwIfDisposed(),je(this)};N().prototype.square=function(){return this.throwIfDisposed(),Xe(this)};N().prototype.squaredDifference=function(r){return this.throwIfDisposed(),Av(this,r)};N().prototype.squeeze=function(r){return this.throwIfDisposed(),Ev(this,r)};N().prototype.stack=function(r,t){this.throwIfDisposed();let e=r instanceof Se?[this,r]:[this,...r];return Rv(e,t)};N().prototype.step=function(r){return this.throwIfDisposed(),Ju(this,r)};N().prototype.stridedSlice=function(r,t,e,o,n,s,i,l){return this.throwIfDisposed(),Wb(this,r,t,e,o,n,s,i,l)};N().prototype.sub=function(r){return this.throwIfDisposed(),He(this,r)};N().prototype.sum=function(r,t){return this.throwIfDisposed(),Ye(this,r,t)};N().prototype.tan=function(){return this.throwIfDisposed(),zb(this)};N().prototype.tanh=function(){return this.throwIfDisposed(),Wl(this)};N().prototype.tile=function(r){return this.throwIfDisposed(),Kw(this,r)};N().prototype.toBool=function(){return this.throwIfDisposed(),Qt(this,"bool")};N().prototype.toFloat=function(){return this.throwIfDisposed(),Qt(this,"float32")};N().prototype.toInt=function(){return this.throwIfDisposed(),Qt(this,"int32")};N().prototype.topk=function(r,t){return this.throwIfDisposed(),$v(this,r,t)};N().prototype.transpose=function(r){return this.throwIfDisposed(),Lv(this,r)};N().prototype.unique=function(r){return this.throwIfDisposed(),Mv(this,r)};N().prototype.unsortedSegmentSum=function(r,t){return this.throwIfDisposed(),Pv(this,r,t)};N().prototype.unstack=function(r){return this.throwIfDisposed(),Ov(this,r)};N().prototype.where=function(r,t){return this.throwIfDisposed(),Yp(r,this,t)};N().prototype.zerosLike=function(){return this.throwIfDisposed(),Ie(this)};function K(r,t){Array.isArray(r)||(r=[r]),r.forEach(e=>{e!=null&&b.assert(e.dtype!=="complex64",()=>`${t} does not support complex64 tensors in the CPU backend.`)})}var _U=Be.whereImpl,ec=class r extends Xr{nextDataId(){return r.nextDataId++}constructor(){super(),this.blockSize=48,this.firstUse=!0,this.data=new $o(this,gr())}write(t,e,o){this.firstUse&&(this.firstUse=!1,$().get("IS_NODE")&&w.warn(`
============================
Hi, looks like you are running TensorFlow.js in Node.js. To speed things up dramatically, install our node backend, visit https://github.com/tensorflow/tfjs-node for more details. 
============================`));let n={id:this.nextDataId()};return this.data.set(n,{values:t,dtype:o,refCount:1}),n}makeTensorInfo(t,e,o){let n;if(e==="string"&&o!=null&&o.length>0&&b.isString(o[0])){let s=o.map(i=>b.encodeString(i));n=this.write(s,t,e)}else n=this.write(o,t,e);return{dataId:n,shape:t,dtype:e}}refCount(t){return this.data.has(t)?this.data.get(t).refCount:0}incRef(t){let e=this.data.get(t);e.refCount++}decRef(t){if(this.data.has(t)){let e=this.data.get(t);e.refCount--}}move(t,e,o,n,s){this.data.set(t,{values:e,dtype:n,refCount:s})}numDataIds(){return this.data.numDataIds()}async read(t){return this.readSync(t)}readSync(t){let{dtype:e,complexTensorInfos:o}=this.data.get(t);if(e==="complex64"){let n=this.readSync(o.real.dataId),s=this.readSync(o.imag.dataId);return w.mergeRealAndImagArrays(n,s)}return b.convertBackendValuesAndArrayBuffer(this.data.get(t).values,e)}bufferSync(t){let e=this.readSync(t.dataId);if(t.dtype==="string")try{let o=e.map(n=>b.decodeString(n));return gt(t.shape,t.dtype,o)}catch{throw new Error("Failed to decode encoded string bytes into utf-8")}return gt(t.shape,t.dtype,e)}makeOutput(t,e,o){return gr().makeTensorFromTensorInfo(this.makeTensorInfo(e,o,t),this)}disposeData(t,e=!1){if(this.data.has(t)){if(this.data.get(t).refCount--,!e&&this.data.get(t).refCount>0)return!1;let{complexTensorInfos:o}=this.data.get(t);o!=null&&(this.disposeData(o.real.dataId,!0),this.disposeData(o.imag.dataId,!0)),this.data.delete(t)}return!0}disposeIntermediateTensorInfo(t){this.disposeData(t.dataId)}async time(t){let e=b.now();return t(),{kernelMs:b.now()-e}}memory(){return{unreliable:!0,reasons:["The reported memory is an upper bound. Due to automatic garbage collection, the true allocated memory may be less."]}}where(t){K([t],"where");let e=this.readSync(t.dataId);return _U(t.shape,e)}dispose(){}floatPrecision(){return 32}epsilon(){return super.epsilon()}};ec.nextDataId=0;var Ey={};mo(Ey,{addImpl:()=>oy,bincountImpl:()=>Ql,bincountReduceImpl:()=>bm,bitwiseAndImpl:()=>ny,castImpl:()=>ry,ceilImpl:()=>sy,concatImpl:()=>di,equalImpl:()=>ay,expImpl:()=>ly,expm1Impl:()=>cy,floorDivImpl:()=>my,floorImpl:()=>py,gatherNdImpl:()=>ym,gatherV2Impl:()=>Cm,greaterEqualImpl:()=>fy,greaterImpl:()=>dy,lessEqualImpl:()=>gy,lessImpl:()=>hy,linSpaceImpl:()=>Im,logImpl:()=>xy,maxImpl:()=>wm,maximumImpl:()=>by,minimumImpl:()=>yy,multiplyImpl:()=>rc,negImpl:()=>Cy,notEqualImpl:()=>Iy,prodImpl:()=>wy,raggedGatherImpl:()=>vm,raggedRangeImpl:()=>Sm,raggedTensorToTensorImpl:()=>km,rangeImpl:()=>hi,rsqrtImpl:()=>Sy,scatterImpl:()=>so,sigmoidImpl:()=>VS,simpleAbsImpl:()=>ey,sliceImpl:()=>gi,sparseFillEmptyRowsImpl:()=>Tm,sparseReshapeImpl:()=>_m,sparseSegmentReductionImpl:()=>tu,sqrtImpl:()=>HS,squaredDifferenceImpl:()=>Ty,staticRegexReplaceImpl:()=>_y,stridedSliceImpl:()=>Nm,stringNGramsImpl:()=>xi,stringSplitImpl:()=>bi,stringToHashBucketFastImpl:()=>yi,subImpl:()=>Ay,tileImpl:()=>Am,topKImpl:()=>Em,transposeImpl:()=>Jl,uniqueImpl:()=>Ci});function ey(r){let t=new Float32Array(r.length);for(let e=0;e<r.length;++e)t[e]=Math.abs(r[e]);return t}var NU=r=>{let{x:t}=r.inputs,e=r.backend;K(t,"abs");let o=new Float32Array(b.sizeFromShape(t.shape)),n=e.data.get(t.dataId).values;return o=ey(n),e.makeOutput(o,t.shape,t.dtype)},mS={kernelName:Rs,backendName:"cpu",kernelFunc:NU};function Ft(r){return(t,e,o,n,s)=>{let i=w.assertAndGetBroadcastShape(t,e),l=i.length,u=b.computeStrides(i),a=b.sizeFromShape(i),c=b.getTypedArrayFromDType(s,a),p=t.length,m=e.length,d=b.computeStrides(t),f=b.computeStrides(e),h=w.getBroadcastDims(t,i),g=w.getBroadcastDims(e,i);if(h.length+g.length===0)for(let x=0;x<c.length;++x)c[x]=r(o[x%o.length],n[x%n.length]);else for(let x=0;x<c.length;++x){let y=b.indexToLoc(x,l,u),C=y.slice(-p);h.forEach(k=>C[k]=0);let I=b.locToIndex(C,p,d),v=y.slice(-m);g.forEach(k=>v[k]=0);let S=b.locToIndex(v,m,f);c[x]=r(o[I],n[S])}return[c,i]}}function ke(r){let{inputs:t,backend:e}=r,{real:o,imag:n}=t,s=e.data.get(o.dataId).values,i=e.data.get(n.dataId).values,l=e.makeTensorInfo(o.shape,"complex64"),u=e.data.get(l.dataId);return u.complexTensorInfos={real:e.makeTensorInfo(o.shape,"float32",s),imag:e.makeTensorInfo(n.shape,"float32",i)},l}var dS={kernelName:ul,backendName:"cpu",kernelFunc:ke};function Yl(r,t,e="float32"){if(e==="complex64"){let n=Yl(r,t,"float32"),s=Yl(r,t,"float32");return ke({inputs:{real:n,imag:s},backend:r})}let o=b.makeZerosTypedArray(b.sizeFromShape(t),e);return r.makeTensorInfo(t,e,o)}function Le(r){let{inputs:t,backend:e}=r,{x:o}=t;return e.incRef(o.dataId),{dataId:o.dataId,shape:o.shape,dtype:o.dtype}}var fS={kernelName:xo,backendName:"cpu",kernelFunc:Le};function Ur(r){let{inputs:t,backend:e}=r,{input:o}=t,n=e.data.get(o.dataId).complexTensorInfos.real,s=e.data.get(n.dataId).values;return e.makeTensorInfo(n.shape,n.dtype,s)}var hS={kernelName:vl,backendName:"cpu",kernelFunc:Ur};function ry(r,t,e,o){if(o==="int32"){let n=Int32Array.from(r);return[t,"int32",n]}if(o==="bool"){let n=b.toTypedArray([0],e),[s,i]=Ft((l,u)=>l!==u?1:0)(t,[],r,n,"bool");return[i,"bool",s]}throw new Error(`Error in Cast: failed to cast ${e} to ${o}`)}function Gr(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{dtype:s}=o;if(s==="complex64"){if(n.dtype==="complex64")return Le({inputs:{x:n},backend:e});let c=Yl(e,n.shape,n.dtype),p=Gr({inputs:{x:n},backend:e,attrs:{dtype:"float32"}}),m=ke({inputs:{real:p,imag:c},backend:e});return e.disposeIntermediateTensorInfo(c),e.disposeIntermediateTensorInfo(p),m}if(n.dtype==="complex64"){let c=Ur({inputs:{input:n},backend:e}),p=Gr({inputs:{x:c},backend:e,attrs:{dtype:s}});return e.disposeIntermediateTensorInfo(c),p}if(!b.hasEncodingLoss(n.dtype,s)){let c=Le({inputs:{x:n},backend:e});return{dataId:c.dataId,shape:c.shape,dtype:s}}let i=e.data.get(n.dataId).values,[l,u,a]=ry(i,n.shape,n.dtype,s);return e.makeTensorInfo(l,u,a)}var gS={kernelName:ho,backendName:"cpu",kernelFunc:Gr};function Lt(r,t,e,o){return e==null?({inputs:n,backend:s})=>{let{a:i,b:l}=n,u=s;K([i,l],r);let a=u.data.get(i.dataId).values,c=u.data.get(l.dataId).values,p=i.dtype==="string"?w.fromUint8ToStringArray(a):a,m=i.dtype==="string"?w.fromUint8ToStringArray(c):c,d=o||i.dtype,[f,h]=t(i.shape,l.shape,p,m,d);return u.makeTensorInfo(h,d,f)}:({inputs:n,backend:s})=>{let{a:i,b:l}=n,u=s;if(i.dtype==="complex64"||l.dtype==="complex64"){let a=Gr({inputs:{x:i},backend:u,attrs:{dtype:"complex64"}}),c=u.data.get(a.dataId),p=c.complexTensorInfos.real,m=c.complexTensorInfos.imag,d=u.data.get(p.dataId).values,f=u.data.get(m.dataId).values,h=Gr({inputs:{x:l},backend:u,attrs:{dtype:"complex64"}}),g=u.data.get(h.dataId),x=g.complexTensorInfos.real,y=g.complexTensorInfos.imag,C=u.data.get(x.dataId).values,I=u.data.get(y.dataId).values,[v,S,k]=e(i.shape,l.shape,d,f,C,I),A=u.makeTensorInfo(k,"float32",v),D=u.makeTensorInfo(k,"float32",S),F=ke({inputs:{real:A,imag:D},backend:u});return u.disposeIntermediateTensorInfo(a),u.disposeIntermediateTensorInfo(h),u.disposeIntermediateTensorInfo(A),u.disposeIntermediateTensorInfo(D),F}else{let a=u.data.get(i.dataId).values,c=u.data.get(l.dataId).values,p=o||i.dtype,[m,d]=t(i.shape,l.shape,a,c,p);return u.makeTensorInfo(d,p,m)}}}function Zl(r){return(t,e,o,n,s,i)=>{let l=w.assertAndGetBroadcastShape(t,e),u=b.sizeFromShape(l),a=l.length,c=b.computeStrides(l),p=b.getTypedArrayFromDType("float32",u),m=b.getTypedArrayFromDType("float32",u),d=w.getBroadcastDims(t,l),f=w.getBroadcastDims(e,l),h=w.mergeRealAndImagArrays(o,n),g=w.mergeRealAndImagArrays(s,i),x=t.length,y=b.computeStrides(t),C=e.length,I=b.computeStrides(e);if(d.length+f.length===0)for(let v=0;v<p.length;v++){let S=v%h.length,k=v%g.length,A=r(h[S*2],h[S*2+1],g[k*2],g[k*2+1]);p[v]=A.real,m[v]=A.imag}else for(let v=0;v<p.length;v++){let S=b.indexToLoc(v,a,c),k=S.slice(-x);d.forEach(B=>k[B]=0);let A=b.locToIndex(k,x,y),D=S.slice(-C);f.forEach(B=>D[B]=0);let F=b.locToIndex(D,C,I),M=r(h[A*2],h[A*2+1],g[F*2],g[F*2+1]);p[v]=M.real,m[v]=M.imag}return[p,m,l]}}var oy=Ft((r,t)=>r+t),AU=Zl((r,t,e,o)=>({real:r+e,imag:t+o})),wo=Lt(Zr,oy,AU),xS={kernelName:Zr,backendName:"cpu",kernelFunc:wo};function Ql(r,t,e,o,n){let s=b.sizeFromShape(o),i=b.makeZerosTypedArray(n,e);for(let l=0;l<r.length;l++){let u=r[l];if(u<0)throw new Error("Input x must be non-negative!");u>=n||(s>0?i[u]+=t[l]:i[u]+=1)}return i}function bm(r,t,e,o=!1){let n=r.shape[0],s=r.shape[1],i=gt([n,e],t.dtype);for(let l=0;l<n;l++)for(let u=0;u<s;u++){let a=r.get(l,u);if(a<0)throw new Error("Input x must be non-negative!");a>=e||(o?i.set(1,l,a):t.size>0?i.set(i.get(l,a)+t.get(l,u),l,a):i.set(i.get(l,a)+1,l,a))}return i}var ny=Ft((r,t)=>r&t),EU=Lt(va,ny),bS={kernelName:va,backendName:"cpu",kernelFunc:EU};function Ne(r){return(t,e,o)=>{let n=b.getArrayFromDType(e,t.length);for(let s=0;s<t.length;++s)n[s]=r(t[s],o);return n}}function xt(r,t,e){let o=Ne(t);return or(r,o,e)}function or(r,t,e){return({inputs:o,attrs:n,backend:s})=>{let{x:i}=o;K(i,r);let l=s,u=l.data.get(i.dataId).values,a;if(i.dtype==="string"){if(!Array.isArray(u))throw new Error("String tensor's value was not an instance of Array");a=w.fromUint8ToStringArray(u)}else a=u;let c=e||i.dtype,p=t(a,c,n);return l.makeTensorInfo(i.shape,c,p)}}var sy=Ne(r=>Math.ceil(r)),RU=or(qo,sy),yS={kernelName:qo,backendName:"cpu",kernelFunc:RU};function di(r,t,e,o){let n=b.getArrayFromDType(e,b.sizeFromShape(t));if(o&&e!=="string"){let s=0;r.forEach(i=>{let l=b.sizeFromShape(i.shape);n.set(i.vals,s),s+=l})}else{let s=0;r.forEach(i=>{let l=e==="string"?w.fromUint8ToStringArray(i.vals):i.vals,u=0;for(let a=0;a<i.shape[0];++a){let c=a*t[1]+s;for(let p=0;p<i.shape[1];++p)n[c+p]=l[u++]}s+=i.shape[1]})}return n}var ay=Ft((r,t)=>r===t?1:0),iy=Lt(an,ay,null,"bool"),CS={kernelName:an,backendName:"cpu",kernelFunc:iy};var ly=Ne(r=>Math.exp(r)),uy=or(ln,ly,"float32"),IS={kernelName:ln,backendName:"cpu",kernelFunc:uy};var cy=Ne(r=>Math.expm1(r)),DU=or(un,cy),wS={kernelName:un,backendName:"cpu",kernelFunc:DU};var py=Ne(r=>Math.floor(r)),FU=or(cn,py),vS={kernelName:cn,backendName:"cpu",kernelFunc:FU};var my=Ft((r,t)=>Math.floor(r/t)),$U=Lt(pn,my,null,"int32"),SS={kernelName:pn,backendName:"cpu",kernelFunc:$U};function ym(r,t,e,o,n,s,i,l,u){let a=gt([o,s],e);for(let c=0;c<o;c++){let p=[],m=0;for(let d=0;d<n;d++){let f=r[c*n+d];m+=f*i[d],p.push(f)}if(m<0||m>=u/s)throw new Error(`Invalid indices: ${p} does not index into ${l}`);for(let d=0;d<s;d++)a.values[c*s+d]=t.get(...t.indexToLoc(m*s+d))}return a}function Cm(r,t,e){let o=gt(e,r.dtype);for(let n=0;n<o.size;++n){let i=o.indexToLoc(n).slice(),l=i[0],u=i[2],a=t.locToIndex([l,u]);i[2]=t.values[a];let c=r.locToIndex(i);0<=c&&c<r.values.length&&(o.values[n]=r.values[c])}return o}var dy=Ft((r,t)=>r>t?1:0),MU=Lt(dn,dy,null,"bool"),kS={kernelName:dn,backendName:"cpu",kernelFunc:MU};var fy=Ft((r,t)=>r>=t?1:0),PU=Lt(fn,fy,null,"bool"),TS={kernelName:fn,backendName:"cpu",kernelFunc:PU};var hy=Ft((r,t)=>r<t?1:0),OU=Lt(yn,hy,null,"bool"),_S={kernelName:yn,backendName:"cpu",kernelFunc:OU};var gy=Ft((r,t)=>r<=t?1:0),BU=Lt(Cn,gy,null,"bool"),NS={kernelName:Cn,backendName:"cpu",kernelFunc:BU};function Im(r,t,e){let o=(t-r)/(e-1),n=b.makeZerosTypedArray(e,"float32");n[0]=r;for(let s=1;s<n.length;s++)n[s]=n[s-1]+o;return n}var xy=Ne(r=>Math.log(r)),LU=or(In,xy),AS={kernelName:In,backendName:"cpu",kernelFunc:LU};function wm(r,t,e,o){let n=b.getTypedArrayFromDType(o,b.sizeFromShape(e));for(let s=0;s<n.length;++s){let i=s*t,l=r[i];for(let u=0;u<t;++u){let a=r[i+u];(Number.isNaN(a)||a>l)&&(l=a)}n[s]=l}return n}var by=Ft((r,t)=>Math.max(r,t)),UU=Lt(Nn,by),ES={kernelName:Nn,backendName:"cpu",kernelFunc:UU};var yy=Ft((r,t)=>Math.min(r,t)),GU=Lt(Dn,yy),RS={kernelName:Dn,backendName:"cpu",kernelFunc:GU};var rc=Ft((r,t)=>r*t),VU=Zl((r,t,e,o)=>({real:r*e-t*o,imag:r*o+t*e})),fi=Lt(Mn,rc,VU),DS={kernelName:Mn,backendName:"cpu",kernelFunc:fi};function Cy(r,t,e){let o=b.createScalarValue(-1,e);return rc([],t,o,r,e)}function WU(r){let{inputs:t,backend:e}=r,{x:o}=t;K(o,"neg");let n=e.data.get(o.dataId).values,[s,i]=Cy(n,o.shape,o.dtype);return e.makeTensorInfo(i,o.dtype,s)}var FS={kernelName:Ls,backendName:"cpu",kernelFunc:WU};var Iy=Ft((r,t)=>r!==t?1:0),zU=Lt(Pn,Iy,null,"bool"),$S={kernelName:Pn,backendName:"cpu",kernelFunc:zU};function Jl(r,t,e,o,n){let s=t.length,i=b.sizeFromShape(t),l=b.computeStrides(t),u=b.computeStrides(n),a=b.getTypedArrayFromDType(e,b.sizeFromShape(n));for(let c=0;c<i;++c){let p=b.indexToLoc(c,s,l),m=new Array(p.length);for(let f=0;f<m.length;f++)m[f]=p[o[f]];let d=b.locToIndex(m,s,u);a[d]=r[c]}return a}function ne(r){let{inputs:t,attrs:e,backend:o}=r,{x:n}=t,{perm:s}=e;K(n,"transpose");let i=n.shape.length,l=new Array(i);for(let p=0;p<l.length;p++)l[p]=n.shape[s[p]];let u=o.data.get(n.dataId).values,a=Jl(u,n.shape,n.dtype,s,l);return{dataId:o.write(a,l,n.dtype),shape:l,dtype:n.dtype}}var MS={kernelName:Jr,backendName:"cpu",kernelFunc:ne};function wy(r,t,e,o){let[n,s]=w.computeOutAndReduceShapes(r,o),i=be(t,"int32"),l=b.makeZerosTypedArray(b.sizeFromShape(n),i),u=b.sizeFromShape(s);for(let a=0;a<l.length;++a){let c=a*u,p=1;for(let m=0;m<u;++m)p*=e[c+m];l[a]=p}return{outVals:l,outShape:n,outDtype:i}}function HU(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s,keepDims:i}=o;K(n,"prod");let l=n.shape.length,u=b.parseAxisParam(s,n.shape),a=w.getAxesPermutation(u,l),c=u,p=n,m=[];a!=null&&(p=ne({inputs:{x:n},backend:e,attrs:{perm:a}}),m.push(p),c=w.getInnerMostAxes(c.length,l));let d=e.data.get(p.dataId).values,{outVals:f,outShape:h,outDtype:g}=wy(p.shape,p.dtype,d,c),x=h;return i&&(x=w.expandShapeToKeepDim(h,u)),m.forEach(y=>e.disposeIntermediateTensorInfo(y)),e.makeTensorInfo(x,g,f)}var PS={kernelName:Gn,backendName:"cpu",kernelFunc:HU};function KU(r,t,e){r.forEach((o,n)=>{if(o<0||o>=e){let s=b.indexToLoc(n,t.length,b.computeStrides(t)).join(",");throw new Error(`indices[${s}] = ${o} is not in [0, ${e})`)}})}function qU(r,t){for(let e=0;e<r.length;++e){let o=r[e],n=e===r.length-1?t:r[e+1].length;if(o.length===0)throw new Error("Ragged splits may not be empty");if(o[0]<0)throw new Error("Ragged splits must be non-negative");if(o[o.length-1]>n)throw new Error("Ragged splits must not point past values");for(let s=1;s<o.length;++s)if(o[s-1]>o[s])throw new Error("Ragged splits must be sorted in ascending order")}}function jU(r,t,e,o){let n=[],s=0,i=t.length-1+e.length,l=new Array(i).fill(null).map(()=>[0]);qU(e,o);let u=1;for(let a=0;a<t.length-1;++a){u*=t[a];let c=t[a+1];for(let p=1;p<u+1;++p)l[a].push(p*c)}for(let a=0;a<r.length;++a){let c=r[a],p=r[a]+1;for(let m=0;m<e.length;++m){let d=e[m],f=m+t.length-1;if(f>=0){let h=l[f],g=h[h.length-1]-d[c];for(let x=c;x<p;++x)l[f].push(d[x+1]+g)}c=d[c],p=d[p]}p!==c&&(n.push([c,p]),s+=p-c)}return{outSplits:l,valueSlices:n,numValues:s}}function XU(r){let t=[];for(let e=0;e<r.length;++e){let o=r[e].length,n=b.getArrayFromDType("int32",o);t.push(n),r[e].forEach((s,i)=>n[i]=s)}return t}function OS(r,t){let e=r.slice(0,t);for(;e.length<t;)e.push(1);for(let o=t;o<r.length;o++)e[t-1]*=r[o];return e}function YU(r,t,e,o,n,s){let i=OS(t,2)[1],l=OS(s,2)[1],u=0;for(let a of e)for(let c=a[0];c<a[1];++c){for(let p=0;p<o;++p)n[u*l+p]=r[c*i+p];++u}}function ZU(r,t,e,o,n){let s=t.slice();s[0]=n;let i=b.getArrayFromDType(e,b.sizeFromShape(s)),l=r.length,u=l===0?0:l/t[0];return YU(r,t,o,u,i,s),[i,s]}function vm(r,t,e,o,n,s,i,l){if(r.length===0)throw new Error("paramsNestedSplits must be non empty");if(t[0].length===0)throw new Error("Split tensors must not be scalars");let u=t[0][0]-1;if(KU(s,i,u),o.length===0)throw new Error("params.rank must be nonzero");let a=o[0],{outSplits:c,valueSlices:p,numValues:m}=jU(s,i,r,a),d=XU(c),f=ZU(e,o,n,p,m);return[d,f[0],f[1]]}var BS=2147483647;function Sm(r,t,e,o,n,s,i){if(t.length>1)throw new Error("starts must be a scalar or vector");if(n.length>1)throw new Error("limits must be a scalar or vector");if(i.length>1)throw new Error("deltas must be a scalar or vector");let l=t.length===0,u=n.length===0,a=i.length===0,c=[];l||c.push(t[0]),u||c.push(n[0]),a||c.push(i[0]);for(let g=1;g<c.length;++g)if(c[g]!==c[g-1])throw new Error("starts, limits, and deltas must have the same shape");let p=c.length===0?1:c[0],m=b.getArrayFromDType("int32",p+1);m[0]=0;for(let g=0;g<p;++g){let x=l?r[0]:r[g],y=u?o[0]:o[g],C=a?s[0]:s[g];if(C===0)throw new Error("Requires delta != 0");let I;if(C>0&&y<x||C<0&&y>x)I=0;else if(I=Math.ceil(Math.abs((y-x)/C)),I>BS)throw new Error(`Requires ((limit - start) / delta) <= ${BS}`);m[g+1]=m[g]+I}let d=m[p],f=b.getArrayFromDType(e,d),h=0;for(let g=0;g<p;++g){let x=m[g+1]-m[g],y=l?r[0]:r[g],C=a?s[0]:s[g];for(let I=0;I<x;++I)f[h++]=y,y+=C}return[m,f]}var Vr=w.RowPartitionType,vy=class r{constructor(t,e,o,n,s,i,l,u,a,c){this.shape=t,this.shapeShape=e,this.values=o,this.valuesShape=n,this.valuesDType=s,this.defaultValue=i,this.defaultValueShape=l,this.rowPartitionValues=u,this.rowPartitionValuesShapes=a,this.rowPartitionTypes=w.getRowPartitionTypesHelper(c),this.raggedRank=w.getRaggedRank(this.rowPartitionTypes)}getRowPartitionTypeByDimension(t){return this.rowPartitionTypes[0]===Vr.FIRST_DIM_SIZE?this.rowPartitionTypes[t+1]:this.rowPartitionTypes[t]}getRowPartitionTensor(t){return this.rowPartitionTypes[0]===Vr.FIRST_DIM_SIZE?this.rowPartitionValues[t+1]:this.rowPartitionValues[t]}getMaxWidth(t){let e=this.getRowPartitionTensor(t-1);switch(this.getRowPartitionTypeByDimension(t-1)){case Vr.VALUE_ROWIDS:return r.getMaxWidthValueRowID(e);case Vr.ROW_SPLITS:return r.getMaxWidthRowSplit(e);default:throw new Error(`Cannot handle partition type ${Vr[this.getRowPartitionTypeByDimension(t-1)]}`)}}static getMaxWidthRowSplit(t){let e=t.length;if(e===0||e===1)return 0;let o=0;for(let n=0;n<e-1;++n){let s=t[n+1]-t[n];s>o&&(o=s)}return o}static getMaxWidthValueRowID(t){let e=t.length;if(e===0)return 0;let o=0,n=t[0],s=0;for(let i=1;i<e;++i){let l=t[i];l!==n&&(n=l,s=Math.max(i-o,s),o=i)}return Math.max(e-o,s)}tensorShapeFromTensor(t,e,o=!0){if(e.length===0){if(t[0]===-1)return[];throw new Error("The only valid scalar shape tensor is the fully unknown shape specified as -1.")}return US(t,o)}calculateOutputSize(t){let e=this.valuesShape,o=this.defaultValueShape;w.validateDefaultValueShape(o,e);let n=this.tensorShapeFromTensor(this.shape,this.shapeShape),i=w.combineRaggedTensorToTensorShapes(this.raggedRank,n,e);i[0]<0&&(i[0]=t);for(let l=1;l<=this.raggedRank;++l)i[l]<0&&(i[l]=this.getMaxWidth(l));return i}calculateFirstParentOutputIndex(t,e,o){let n=Math.min(t,o),s=[],i=0;for(let l=0;l<n;++l,i+=e)s.push(i);for(let l=n;l<t;++l)s.push(-1);return b.assert(s.length===t,()=>"Final length of result must be equal to firstDimension."),s}calculateOutputIndexRowSplit(t,e,o,n){let s=t.length,i=[];for(let l=0;l<s-1;++l){let u=t[l+1]-t[l],a=Math.min(n,u),c=e[l];c===-1&&(a=0);for(let p=0;p<a;++p)i.push(c),c+=o;for(let p=0;p<u-a;++p)i.push(-1)}if(s>0&&i.length!==t[s-1])throw new Error("Invalid row split size.");return i}calculateOutputIndexValueRowID(t,e,o,n){let s=t.length,i=[];if(s===0)return[];let l=0,u=t[0];if(u>=e.length)throw new Error(`Got currentValueRowId=${u}, which is not less than ${e.length}`);let a=e[u];i.push(a);for(let c=1;c<s;++c){let p=t[c];if(p===u)a>=0&&(++l,l<n?a+=o:a=-1);else{if(l=0,u=p,p>=e.length)throw new Error(`Got nextValueRowId=${p} which is not less than ${e.length}`);a=e[p]}i.push(a)}if(i.length!==t.length)throw new Error("Invalid row ids.");return i}calculateOutputIndex(t,e,o,n){let s=this.getRowPartitionTensor(t),i=this.getRowPartitionTypeByDimension(t);switch(i){case Vr.VALUE_ROWIDS:return this.calculateOutputIndexValueRowID(s,e,o,n);case Vr.ROW_SPLITS:if(s.length-1>e.length)throw new Error(`Row partition size is greater than output size: ${s.length-1} > ${e.length}`);return this.calculateOutputIndexRowSplit(s,e,o,n);default:throw new Error(`Unsupported partition type: ${Vr[i]}`)}}getFirstDimensionSize(){let t=this.rowPartitionValues[0];if(this.rowPartitionTypes.length===0)throw new Error("No row_partition_types given.");let e=this.rowPartitionTypes[0];switch(e){case Vr.FIRST_DIM_SIZE:return t[0];case Vr.VALUE_ROWIDS:throw new Error("Cannot handle VALUE_ROWIDS in first dimension.");case Vr.ROW_SPLITS:return this.rowPartitionValuesShapes[0][0]-1;default:throw new Error(`Cannot handle type ${Vr[e]}`)}}compute(){if(this.rowPartitionValues[0].length<=0)throw new Error("Invalid first partition input. Tensor requires at least one element.");let e=this.getFirstDimensionSize(),o=this.calculateOutputSize(e),n=new Array(this.raggedRank+1);n[n.length-1]=1;for(let u=n.length-2;u>=0;--u)n[u]=n[u+1]*o[u+1];let s=US(o,!1),i=b.getArrayFromDType(this.valuesDType,b.sizeFromShape(s));if(n[0]*o[0]>0){let u=this.calculateFirstParentOutputIndex(e,n[0],o[0]);for(let a=1;a<=this.raggedRank;++a)u=this.calculateOutputIndex(a-1,u,n[a],o[a]);this.setOutput(this.raggedRank,u,i,s)}return[s,i]}setOutput(t,e,o,n){if(o.length===0)return;let s=this.values,i=o,l=n.slice();l=l.slice(t+1);let u=b.sizeFromShape(l),a=e.length,c=this.defaultValue;if(c.length!==u&&c.length!==1){let f=this.defaultValueShape;zt(()=>{let h=rt(c,f);c=gs(h,l).dataSync()})}let p=0,m=0,d=0;for(let f=0;f<=a;++f){let h=f<a?e[f]:-1;if(h===d){++d;continue}if(m<d){let g=s.subarray(p*u),x=i.subarray(m*u),y=(d-m)*u;LS(x,g,y)}if(f>=a){let g=o.length;h=Math.floor(g/u)}if(h>d)if(this.defaultValue.length===1)i.subarray(d*u,h*u).fill(this.defaultValue[0]),d=h;else for(;h>d;){let g=i.slice(d*u);LS(g,c,u),++d}h<0?(p=f+1,m=d):(p=f,m=d,d=m+1)}}};function LS(r,t,e){for(let o=0;o<e;o++)r[o]=t[o]}function US(r,t){let e=[];for(let o of r){if(o<0){if(!t)throw new Error(`Dimension ${o} must be >= 0`);if(o<-1)throw new Error(`Dimension ${o} must be >= -1`);o=-1}e.push(o)}return e}function km(r,t,e,o,n,s,i,l,u,a){return new vy(r,t,e,o,n,s,i,l,u,a).compute()}function hi(r,t,e,o){let n=r===t,s=r<t&&e<0,i=t<r&&e>1;if(n||s||i)return b.makeZerosTypedArray(0,o);let l=Math.abs(Math.ceil((t-r)/e)),u=b.makeZerosTypedArray(l,o);t<r&&e===1&&(e=-1),u[0]=r;for(let a=1;a<u.length;a++)u[a]=u[a-1]+e;return u}var Sy=Ne(r=>1/Math.sqrt(r)),QU=or(Xn,Sy),GS={kernelName:Xn,backendName:"cpu",kernelFunc:QU};function so(r,t,e,o,n,s,i,l,u,a){let c=[o/n,n],p=r.values,m=t.values;if(o===0)return gt(e,t.dtype);let d=u instanceof qt?u:gt(c,t.dtype);typeof u=="string"||typeof u=="number"?d.values.fill(u):typeof u=="boolean"&&d.values.fill(+u);for(let f=0;f<s;f++){let h=[],g=0;for(let x=0;x<i;x++){let y=p[f*i+x];h.push(y),g+=y*l[x]}if(g<0||g>=o/n)throw new Error(`Invalid indices: ${h} does not index into ${e}`);for(let x=0;x<n;x++)a?d.values[g*n+x]+=m[f*n+x]:d.values[g*n+x]=t.rank===0?m[0]:m[f*n+x]}return d}var VS=Ne(r=>1/(1+Math.exp(-r))),ky=xt(ts,r=>1/(1+Math.exp(-r))),WS={kernelName:ts,backendName:"cpu",kernelFunc:ky};function gi(r,t,e,o,n){let s=oe.isSliceContinous(o,t,e),i=b.sizeFromShape(e),l=b.computeStrides(o);if(s){let p=oe.computeFlatOffset(t,l);return n==="string"?r.slice(p,p+i):r.subarray(p,p+i)}let u=n==="string"?w.fromUint8ToStringArray(r):r,a=gt(o,n,u),c=gt(e,n);for(let p=0;p<c.size;++p){let m=c.indexToLoc(p),d=m.map((f,h)=>f+t[h]);c.set(a.get(...d),...m)}return n==="string"?w.fromStringArrayToUint8(c.values):c.values}function Wr(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{begin:s,size:i}=o;K(n,"slice");let[l,u]=oe.parseSliceParams(n,s,i);oe.assertParamsValid(n,l,u);let a=e.data.get(n.dataId).values,c=gi(a,l,u,n.shape,n.dtype);return e.makeTensorInfo(u,n.dtype,c)}var zS={kernelName:zs,backendName:"cpu",kernelFunc:Wr};function Tm(r,t,e,o,n,s,i){let l=t[0],u=s[0],a=new Array(u),c=new Array(l),p=t[1];if(u===0){if(l!==0)throw new Error(w.getSparseFillEmptyRowsIndicesDenseShapeMismatch(l));let g=b.getArrayFromDType(e,0),x=b.getArrayFromDType(n,0);return[g,[0,p],x,a,c]}let m=!0,d=0,f=new Array(u).fill(0);for(let g=0;g<l;++g){let x=r[g*p];if(x<0)throw new Error(w.getSparseFillEmptyRowsNegativeIndexErrorMessage(g,x));if(x>=u)throw new Error(w.getSparseFillEmptyRowsOutOfRangeIndexErrorMessage(g,x,u));++f[x],m=m&&x>=d,d=x}let h=!0;for(let g=0;g<u;++g){let x=f[g]===0;a[g]=x,h=h&&!x,f[g]=Math.max(f[g],1),g>0&&(f[g]+=f[g-1])}if(h&&m){let g=r,x=o;for(let y=0;y<l;++y)c[y]=y;return[g,[l,p],x,a,c]}else{let g=f[u-1],x=b.getArrayFromDType(e,g*p),y=b.getArrayFromDType(n,g),C=new Array(u).fill(0);for(let I=0;I<l;++I){let v=r[I*p],S=C[v],k=(v===0?0:f[v-1])+S;C[v]++;for(let A=0;A<p;++A)x[k*p+A]=r[I*p+A];y[k]=o[I],c[I]=k}for(let I=0;I<u;++I)if(C[I]===0){let S=I===0?0:f[I-1];x[S*p+0]=I;for(let k=1;k<p;++k)x[S*p+k]=0;y[S]=i}return[x,[g,p],y,a,c]}}function _m(r,t,e,o,n){let s=b.sizeFromShape(o),i=t[0],l=n.length,u=[],a=1,c=-1;for(let g=0;g<l;++g){let x=n[g];if(x===-1){if(c!==-1)throw new Error(w.getSparseReshapeMultipleNegativeOneOutputDimErrorMessage(c,g));c=g,u.push(1)}else{if(x<0)throw new Error(w.getSparseReshapeNegativeOutputDimErrorMessage(g,x));a*=x,u.push(x)}}if(c!==-1){if(a<=0)throw new Error(w.getSparseReshapeEmptyTensorZeroOutputDimErrorMessage());let g=Math.trunc(s/a);if(a*g!==s)throw new Error(w.getSparseReshapeInputOutputMultipleErrorMessage(o,u));u[c]=g}if(b.sizeFromShape(u)!==s)throw new Error(w.getSparseReshapeInputOutputMismatchErrorMessage(o,u));let m=o.length,d=[];if(m>0){d[m-1]=1;for(let g=m-2;g>=0;--g)d[g]=d[g+1]*o[g+1]}let f=[];if(l>0){f[l-1]=1;for(let g=l-2;g>=0;--g)f[g]=f[g+1]*u[g+1]}let h=b.getArrayFromDType(e,i*l);for(let g=0;g<i;++g){let x=0;for(let y=0;y<m;++y)x+=r[g*m+y]*d[y];for(let y=0;y<l;++y)h[g*l+y]=Math.trunc(x/f[y]),x%=f[y]}return[h,[i,l],u]}function tu(r,t,e,o,n,s=!1,i=0){let l=o.length,u=[t[0],r.length/t[0]],a=u[1],p=l>0?n[l-1]+1:0;if(p<0)throw new Error(w.getSparseSegmentReductionNegativeSegmentIdsErrorMessage());let m=t.slice();m[0]=p;let d=m.reduce((C,I)=>C*I,1),f=b.getArrayFromDType(e,d);if(l===0)return p>0&&f.fill(i),[f,m];if(p<=0)throw new Error(w.getSparseSegmentReductionNegativeSegmentIdsErrorMessage());let h=0,g=1,x=0,y=n[h];for(;;){let C=0;if(g<l){if(C=n[g],y===C){++g;continue}if(y>=C)throw new Error(w.getSparseSegmentReductionNonIncreasingSegmentIdsErrorMessage())}if(y<0||y>=p)throw new Error(w.getSparseSegmentReductionSegmentIdOutOfRangeErrorMessage(y,p));y>x&&f.fill(i,x*a,y*a);for(let I=h;I<g;++I){let v=o[I];if(v<0||v>=u[0])throw new Error(w.getSparseSegmentReductionIndicesOutOfRangeErrorMessage(I,o[I],u[0]));for(let S=0;S<a;S++)f[y*a+S]+=r[v*a+S]}if(s)for(let I=0;I<a;I++)f[y*a+I]/=g-h;if(h=g,++g,x=y+1,y=C,g>l)break}return x<p&&f.fill(i,x*a,p*a),[f,m]}var HS=Ne(r=>Math.sqrt(r)),JU=xt(rs,r=>Math.sqrt(r)),KS={kernelName:rs,backendName:"cpu",kernelFunc:JU};var Ty=Ft((r,t)=>{let e=r-t;return e*e}),tG=Lt(ss,Ty),qS={kernelName:ss,backendName:"cpu",kernelFunc:tG};var _y=Ne((r,t)=>{let{pattern:e,replaceGlobal:o,rewrite:n}=t;return r.replace(new RegExp(e,o?"g":""),n)}),eG=or(Bu,_y),jS={kernelName:Bu,backendName:"cpu",kernelFunc:eG};function Nm(r,t,e,o){let n=gt(r,t.dtype);for(let s=0;s<n.size;s++){let i=n.indexToLoc(s),l=new Array(i.length);for(let u=0;u<l.length;u++)l[u]=i[u]*e[u]+o[u];n.set(t.get(...l),...i)}return n}var Ny=class{constructor(t,e,o,n,s,i){this.separator=b.encodeString(t),this.nGramWidths=e,this.leftPad=b.encodeString(o),this.rightPad=b.encodeString(n),this.padWidth=s,this.preserveShort=i}getPadWidth(t){return Math.min(this.padWidth<0?t-1:this.padWidth,t-1)}getNumNGrams(t,e){let o=this.getPadWidth(e);return Math.max(0,t+2*o-e+1)}createNGrams(t,e,o,n,s,i){for(let l=0;l<s;++l){let u=this.getPadWidth(i),a=Math.max(0,u-l),c=Math.max(0,u-(s-(l+1))),p=i-(a+c),m=e+(a>0?0:l-u),d=0;d+=a*this.leftPad.length;for(let y=0;y<p;++y)d+=t[m+y].length;d+=c*this.rightPad.length;let f=a+c+p-1;d+=f*this.separator.length,o[n+l]=new Uint8Array(d);let h=o[n+l],g=0,x=y=>y.forEach(C=>h[g++]=C);for(let y=0;y<a;++y)x(this.leftPad),x(this.separator);for(let y=0;y<p-1;++y)x(t[m+y]),x(this.separator);if(p>0){x(t[m+p-1]);for(let y=0;y<c;++y)x(this.separator),x(this.rightPad)}else{for(let y=0;y<c-1;++y)x(this.rightPad),x(this.separator);x(this.rightPad)}}}compute(t,e){let o=t.length,n=e.length;if(n>0){let u=e[0];if(u!==0)throw new Error(`First split value must be 0, got ${u}`);for(let a=1;a<n;++a){let c=e[a]>=u;if(c=c&&e[a]<=o,!c)throw new Error(`Invalid split value ${e[a]}, must be in [${u}, ${o}]`);u=e[a]}if(u!==o)throw new Error(`Last split value must be data size. Expected ${o}, got ${u}`)}let s=n-1,i=b.getArrayFromDType("int32",n);if(o===0||n===0){let u=new Array(o);for(let a=0;a<=s;++a)i[a]=0;return[u,i]}i[0]=0;for(let u=1;u<=s;++u){let a=e[u]-e[u-1],c=0;this.nGramWidths.forEach(p=>{c+=this.getNumNGrams(a,p)}),this.preserveShort&&a>0&&c===0&&(c=1),i[u]=i[u-1]+c}let l=new Array(i[s]);for(let u=0;u<s;++u){let a=e[u],c=i[u];if(this.nGramWidths.forEach(p=>{let m=e[u+1]-e[u],d=this.getNumNGrams(m,p);this.createNGrams(t,a,l,c,d,p),c+=d}),this.preserveShort&&c===i[u]){let p=e[u+1]-e[u];if(p===0)continue;let m=p+2*this.padWidth;this.createNGrams(t,a,l,c,1,m)}}return[l,i]}};function xi(r,t,e,o,n,s,i,l){return new Ny(e,o,n,s,i,l).compute(r,t)}function rG(r,t,e,o){if(!r.length)return;if(t.length===0){for(let s=0;s<r.length;++s)o.push(r.subarray(s,s+1));return}if(t.length===1){let s=t[0],i=r.indexOf(s);for(;i!==-1;){let l=r.subarray(0,i);(!e||l.length!==0)&&o.push(l),r=r.subarray(i+1),i=r.indexOf(s)}(!e||r.length!==0)&&o.push(r);return}let n=0;for(let s=0;s<r.length+1;s++)if(s===r.length||t.indexOf(r[s])!==-1){let i=r.subarray(n,s);(!e||i.length!==0)&&o.push(i),n=s+1}}function bi(r,t,e){let o=r.length,n=[],s=0,i=0,l=new Array(o);for(let m=0;m<o;++m){let d=n.length;rG(r[m],t,e,n);let f=n.length-d;l[m]=f,s+=f,i=Math.max(i,f)}let u=b.getArrayFromDType("int32",s*2),a=new Array(s),c=[o,i],p=0;for(let m=0;m<o;++m)for(let d=0;d<l[m];++d)u[p*2]=m,u[p*2+1]=d,a[p]=n[p],++p;return[u,a,c]}function yi(r,t){let e=b.getArrayFromDType("int32",r.length);for(let o=0;o<r.length;++o)e[o]=b.fingerPrint64(r[o]).modulo(t).getLowBitsUnsigned();return e}var Ay=Ft((r,t)=>r-t),oG=Zl((r,t,e,o)=>({real:r-e,imag:t-o})),oc=Lt(is,Ay,oG),XS={kernelName:is,backendName:"cpu",kernelFunc:oc};function Am(r,t){let e=new Array(r.rank);for(let n=0;n<e.length;n++)e[n]=r.shape[n]*t[n];let o=gt(e,r.dtype);for(let n=0;n<o.values.length;++n){let s=o.indexToLoc(n),i=new Array(r.rank);for(let u=0;u<i.length;u++)i[u]=s[u]%r.shape[u];let l=r.locToIndex(i);o.values[n]=r.values[l]}return o}var nc=(r,t)=>{let e=t.value-r.value;return e===0?r.index-t.index:e};function YS(r,t,e=0,o=r.length-1){for(;o>e;){if(o-e>600){let l=o-e+1,u=t-e+1,a=Math.log(l),c=.5*Math.exp(2*a/3),p=.5*Math.sqrt(a*c*(l-c)/l)*Math.sign(u-l/2),m=Math.max(e,Math.floor(t-u*c/l+p)),d=Math.min(o,Math.floor(t+(l-u)*c/l+p));YS(r,t,m,d)}let n=r[t],s=e,i=o;for(b.swap(r,e,t),nc(r[o],n)>0&&b.swap(r,e,o);s<i;){for(b.swap(r,s,i),s++,i--;nc(r[s],n)<0;)s=s+1;for(;nc(r[i],n)>0;)i=i-1}nc(r[e],n)===0?b.swap(r,e,i):(i=i+1,b.swap(r,i,o)),i<=t&&(e=i+1),t<=i&&(o=i-1)}}function Em(r,t,e,o,n){let s=t[t.length-1],[i,l]=[r.length/s,s],u=b.getTypedArrayFromDType(e,i*o),a=b.getTypedArrayFromDType("int32",i*o);for(let p=0;p<i;p++){let m=p*l,d=r.subarray(m,m+l),f=new Array(d.length);d.forEach((y,C)=>f[C]={value:y,index:C}),o<f.length&&(YS(f,o),f=f.slice(0,o)),n&&f.sort(nc);let h=p*o,g=u.subarray(h,h+o),x=a.subarray(h,h+o);for(let y=0;y<o;y++)g[y]=f[y].value,x[y]=f[y].index}let c=t.slice();return c[c.length-1]=o,[gt(c,e,u),gt(c,"int32",a)]}function Ci(r,t,e,o){let n=b.parseAxisParam(t,e)[0],s=[1,e[0],1];for(let f=0;f<n;f++)s[0]*=e[f];s[1]=e[n];for(let f=n+1;f<e.length;f++)s[2]*=e[f];let i=new Map,l=new Int32Array(e[n]),u=new qt(s,o,r),a=[],c=s[0]===1&&s[2]===1;for(let f=0;f<e[n];f++){let h;if(c)h=r[f].toString();else{let x=[];for(let y=0;y<s[0];y++)for(let C=0;C<s[2];C++)x.push(u.get(y,f,C));h=x.join(",")}let g=i.get(h);if(g!=null)l[f]=g;else{let x=i.size;i.set(h,x),l[f]=x,a.push(f)}}let p=s.slice();p[1]=i.size;let m=new qt(p,o);a.forEach((f,h)=>{for(let g=0;g<s[0];g++)for(let x=0;x<s[2];x++)m.set(u.get(g,f,x),g,h,x)});let d=e.slice();return d[n]=p[1],{outputValues:m.values,outputShape:d,indices:l}}Ll("cpu",()=>new ec,1);var Ry=xt(nn,r=>r>=0?r:Math.exp(r)-1),ZS={kernelName:nn,backendName:"cpu",kernelFunc:Ry};function Dy(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{alpha:s}=o;K([n],"leakyRelu");let i=b.sizeFromShape(n.shape),l=e.data.get(n.dataId).values,u=b.getTypedArrayFromDType("float32",i);for(let a=0;a<l.length;a++)u[a]=l[a]<0?s*l[a]:l[a];return e.makeTensorInfo(n.shape,"float32",u)}var QS={kernelName:bn,backendName:"cpu",kernelFunc:Dy};var nG=Ft((r,t)=>r<0?t*r:r);function Fy(r){let{inputs:t,backend:e}=r,{x:o,alpha:n}=t;K([o,n],"prelu");let s=e.data.get(o.dataId).values,i=e.data.get(n.dataId).values,[l,u]=nG(o.shape,n.shape,s,i,"float32");return e.makeTensorInfo(u,"float32",l)}var JS={kernelName:Un,backendName:"cpu",kernelFunc:Fy};var $y=xt(Wn,r=>Math.max(0,r)),t0={kernelName:Wn,backendName:"cpu",kernelFunc:$y};var My=xt(Kn,r=>Math.min(Math.max(0,r),6)),e0={kernelName:Kn,backendName:"cpu",kernelFunc:My};function Ii(r,t,e,o,n){if(e==="linear")return Le({inputs:{x:t},backend:r});if(e==="relu")return $y({inputs:{x:t},backend:r});if(e==="elu")return Ry({inputs:{x:t},backend:r});if(e==="relu6")return My({inputs:{x:t},backend:r});if(e==="prelu")return Fy({inputs:{x:t,alpha:o},backend:r});if(e==="leakyrelu")return Dy({inputs:{x:t},backend:r,attrs:{alpha:n}});if(e==="sigmoid")return ky({inputs:{x:t},backend:r});throw new Error(`Activation ${e} has not been implemented for the CPU backend.`)}function $t(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{shape:s}=o,i=b.sizeFromShape(n.shape),l=b.inferFromImplicitShape(s,i),u=b.sizeFromShape(l);b.assert(i===u,()=>`The new shape (${l}) has ${u} elements and the old shape (${n.shape}) has ${i} elements. The new shape and old shape must have the same number of elements.`),e.incRef(n.dataId);let a=e.data.get(n.dataId);if(a.complexTensorInfos!=null){let c=a.complexTensorInfos.real,p=a.complexTensorInfos.imag;c.shape=l,p.shape=l}return{dataId:n.dataId,shape:l,dtype:n.dtype}}var r0={kernelName:Vs,backendName:"cpu",kernelFunc:$t};function Py(r){let{inputs:t,backend:e,attrs:o}=r,{a:n,b:s}=t,{transposeA:i,transposeB:l}=o;K([n,s],"matMul");let u=n.shape.length,a=s.shape.length,c=i?n.shape[u-2]:n.shape[u-1],p=l?s.shape[a-1]:s.shape[a-2],m=i?n.shape[u-1]:n.shape[u-2],d=l?s.shape[a-2]:s.shape[a-1],f=n.shape.slice(0,-2),h=s.shape.slice(0,-2),g=b.sizeFromShape(f),x=b.sizeFromShape(h),C=no.assertAndGetBroadcastShape(n.shape.slice(0,-2),s.shape.slice(0,-2)).concat([m,d]);b.assert(c===p,()=>`Error in matMul: inner shapes (${c}) and (${p}) of Tensors with shapes ${n.shape} and ${s.shape} and transposeA=${i} and transposeB=${l} must match.`);let I=i?[g,c,m]:[g,m,c],v=l?[x,d,p]:[x,p,d],S=$t({inputs:{x:n},backend:e,attrs:{shape:I}}),k=$t({inputs:{x:s},backend:e,attrs:{shape:v}}),A=i?S.shape[1]:S.shape[2],D=i?S.shape[2]:S.shape[1],F=l?k.shape[1]:k.shape[2],M=Math.max(g,x),B=e.data.get(S.dataId).values,U=e.data.get(k.dataId).values,P=b.computeStrides(S.shape),L=b.computeStrides(k.shape),[z,V,W]=i?[P[0],1,P[1]]:[P[0],P[1],1],[q,X,J]=l?[1,L[1],L[0]]:[L[1],1,L[0]],tt=D*F,Y=gt([M,D,F],S.dtype),Q=Y.values,ot=e.blockSize;for(let at=0;at<M;at++){let st=at%g,mt=at%x;for(let dt=0;dt<D;dt+=ot){let It=Math.min(dt+ot,D);for(let wt=0;wt<F;wt+=ot){let Rt=Math.min(wt+ot,F);for(let Ot=0;Ot<A;Ot+=ot){let Tt=Math.min(Ot+ot,A);for(let Wt=dt;Wt<It;Wt++)for(let Ut=wt;Ut<Rt;Ut++){let Xt=0;for(let Zt=Ot;Zt<Tt;Zt++){let cr=B[st*z+Wt*V+Zt*W],xe=U[Zt*q+Ut*X+mt*J];Xt+=cr*xe}Q[at*tt+(Wt*F+Ut)]+=Xt}}}}}return e.disposeIntermediateTensorInfo(S),e.disposeIntermediateTensorInfo(k),e.makeTensorInfo(C,Y.dtype,Y.values)}var o0={kernelName:Ko,backendName:"cpu",kernelFunc:Py};function sG(r){let{inputs:t,backend:e,attrs:o}=r,{a:n,b:s,bias:i,preluActivationWeights:l}=t,{transposeA:u,transposeB:a,activation:c,leakyreluAlpha:p}=o,m,d,f,h=[];m=Py({inputs:{a:n,b:s},attrs:{transposeA:u,transposeB:a},backend:e}),i&&(d=wo({inputs:{a:m,b:i},backend:e}),h.push(m),m=d),c&&(f=Ii(e,m,c,l,p),h.push(m),m=f);for(let x of h)e.disposeIntermediateTensorInfo(x);return m}var n0={kernelName:Ka,backendName:"cpu",kernelFunc:sG};var aG=xt(Po,r=>Math.acos(r)),s0={kernelName:Po,backendName:"cpu",kernelFunc:aG};var iG=xt(Oo,r=>Math.acosh(r)),a0={kernelName:Oo,backendName:"cpu",kernelFunc:iG};function lG(r){let{inputs:t,backend:e}=r,o=t;K(t,"addN");let n=o.map(l=>e.data.get(l.dataId).values),s=gt(o[0].shape,o[0].dtype),i=s.values;for(let l=0;l<o.length;l++){let u=n[l];for(let a=0;a<i.length;a++)i[a]+=u[a]}return e.makeTensorInfo(s.shape,s.dtype,s.values)}var i0={kernelName:Ia,backendName:"cpu",kernelFunc:lG};function uG(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s,keepDims:i}=o;K(n,"all");let l=b.parseAxisParam(s,n.shape),u=l,a=w.getAxesPermutation(u,n.shape.length),c=n;a!=null&&(c=ne({inputs:{x:n},backend:e,attrs:{perm:a}}),u=w.getInnerMostAxes(u.length,n.shape.length)),w.assertAxesAreInnerMostDims("all",u,c.shape.length);let[p,m]=w.computeOutAndReduceShapes(c.shape,u),d=b.sizeFromShape(m),f=b.makeZerosTypedArray(b.sizeFromShape(p),c.dtype),h=e.data.get(c.dataId).values;for(let x=0;x<f.length;++x){let y=x*d,C=h[y];for(let I=0;I<d;++I){let v=h[y+I];C=C&&v}f[x]=C}a!=null&&e.disposeIntermediateTensorInfo(c);let g=e.makeTensorInfo(p,c.dtype,f);if(i){let x=w.expandShapeToKeepDim(p,l),y=$t({inputs:{x:g},backend:e,attrs:{shape:x}});return e.disposeIntermediateTensorInfo(g),y}return g}var l0={kernelName:Bo,backendName:"cpu",kernelFunc:uG};function cG(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s,keepDims:i}=o;K(n,"any");let l=b.parseAxisParam(s,n.shape),u=l,a=w.getAxesPermutation(u,n.shape.length),c=n;a!=null&&(c=ne({inputs:{x:n},backend:e,attrs:{perm:a}}),u=w.getInnerMostAxes(u.length,n.shape.length)),w.assertAxesAreInnerMostDims("any",u,c.shape.length);let[p,m]=w.computeOutAndReduceShapes(c.shape,u),d=b.sizeFromShape(m),f=b.makeZerosTypedArray(b.sizeFromShape(p),c.dtype),h=e.data.get(c.dataId).values;for(let x=0;x<f.length;++x){let y=x*d,C=h[y];for(let I=0;I<d;++I){let v=h[y+I];C=C||v}f[x]=C}a!=null&&e.disposeIntermediateTensorInfo(c);let g=e.makeTensorInfo(p,c.dtype,f);if(i){let x=w.expandShapeToKeepDim(p,l),y=$t({inputs:{x:g},backend:e,attrs:{shape:x}});return e.disposeIntermediateTensorInfo(g),y}return g}var u0={kernelName:Lo,backendName:"cpu",kernelFunc:cG};function pG(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s}=o;K(n,"argMax");let i=b.parseAxisParam(s,n.shape),l=w.getAxesPermutation(i,n.shape.length),u=n,a=[];l!=null&&(u=ne({inputs:{x:n},backend:e,attrs:{perm:l}}),a.push(u),i=w.getInnerMostAxes(i.length,u.shape.length)),i=[i[0]],w.assertAxesAreInnerMostDims("argMax",i,u.shape.length);let[c,p]=w.computeOutAndReduceShapes(u.shape,i),m=b.sizeFromShape(c),d=b.makeZerosTypedArray(m,"int32"),f=b.sizeFromShape(p),h=e.data.get(u.dataId).values;for(let g=0;g<d.length;++g){let x=g*f,y=h[x],C=0;for(let I=0;I<f;++I){let v=h[x+I];v>y&&(y=v,C=I)}d[g]=C}return a.forEach(g=>e.disposeIntermediateTensorInfo(g)),e.makeTensorInfo(c,"int32",d)}var c0={kernelName:Ds,backendName:"cpu",kernelFunc:pG};function mG(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s}=o;K(n,"argMin");let i=b.parseAxisParam(s,n.shape),l=w.getAxesPermutation(i,n.shape.length),u=n,a=[];l!=null&&(u=ne({inputs:{x:n},backend:e,attrs:{perm:l}}),a.push(u),i=w.getInnerMostAxes(i.length,u.shape.length)),i=[i[0]],w.assertAxesAreInnerMostDims("argMin",i,u.shape.length);let[c,p]=w.computeOutAndReduceShapes(u.shape,i),m=b.sizeFromShape(c),d=b.makeZerosTypedArray(m,"int32"),f=b.sizeFromShape(p),h=e.data.get(u.dataId).values;for(let g=0;g<d.length;++g){let x=g*f,y=h[x],C=0;for(let I=0;I<f;++I){let v=h[x+I];v<y&&(y=v,C=I)}d[g]=C}return a.forEach(g=>e.disposeIntermediateTensorInfo(g)),e.makeTensorInfo(c,"int32",d)}var p0={kernelName:Fs,backendName:"cpu",kernelFunc:mG};var dG=xt(Uo,r=>Math.asin(r)),m0={kernelName:Uo,backendName:"cpu",kernelFunc:dG};var fG=xt(Go,r=>Math.asinh(r)),d0={kernelName:Go,backendName:"cpu",kernelFunc:fG};var hG=xt(Vo,r=>Math.atan(r)),f0={kernelName:Vo,backendName:"cpu",kernelFunc:hG};var gG=Ft((r,t)=>Math.atan2(r,t)),xG=Lt(zo,gG),h0={kernelName:zo,backendName:"cpu",kernelFunc:xG};var bG=xt(Wo,r=>Math.atanh(r)),g0={kernelName:Wo,backendName:"cpu",kernelFunc:bG};function eu(r,t,e,o,n,s){let i=n.strideHeight,l=n.strideWidth,u=n.dilationHeight,a=n.dilationWidth,c=n.effectiveFilterHeight,p=n.effectiveFilterWidth,m=n.padInfo.top,d=n.padInfo.left,f=s==="max"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,h=gt(n.outShape,e),g=h.values,x=n.outShape[1]*n.outShape[2]*n.outShape[3],y=n.outShape[2]*n.outShape[3],C=n.outShape[3];for(let I=0;I<n.batchSize;++I){let v=I*x,S=I*o[0];for(let k=0;k<n.inChannels;++k)for(let A=0;A<n.outHeight;++A){let D=A*i-m,F=Math.max(0,D),M=Math.min(n.inHeight,c+D),B=v+A*y;for(let U=0;U<n.outWidth;++U){let P=U*l-d,L=Math.max(0,P),z=Math.min(n.inWidth,p+P),V=f,W=0,q=0;for(let J=F;J<M;J+=u){let tt=S+J*o[1];for(let Y=L;Y<z;Y+=a){let Q=tt+Y*o[2],ot=r[Q+k];s==="max"&&ot>V?V=ot:s==="avg"&&(W+=ot,q++)}if(isNaN(V))break}let X=B+U*C+k;g[X]=s==="avg"?W/q:V}}}return h}function Rm(r,t,e,o,n=!1,s=!1){let i=gt(o.outShape,"int32"),l=o.strideHeight,u=o.strideWidth,a=o.dilationHeight,c=o.dilationWidth,p=o.effectiveFilterHeight,m=o.effectiveFilterWidth,d=o.padInfo.top,f=o.padInfo.left,h=gt(t,e,r);for(let g=0;g<o.batchSize;++g)for(let x=0;x<o.inChannels;++x)for(let y=0;y<o.outHeight;++y){let C=y*l-d,I=C;for(;I<0;)I+=a;let v=Math.min(o.inHeight,p+C);for(let S=0;S<o.outWidth;++S){let k=S*u-f,A=k;for(;A<0;)A+=c;let D=Math.min(o.inWidth,m+k),F=Number.NEGATIVE_INFINITY,M=-1;for(let B=I;B<v;B+=a){let U=B-C;for(let P=A;P<D;P+=c){let L=P-k,z=h.get(g,B,P,x);z>F&&(F=z,n?M=s?((g*o.inHeight+B)*o.inWidth+P)*o.inChannels+x:(B*o.inWidth+P)*o.inChannels+x:M=U*m+L)}}i.set(M,g,y,S,x)}}return i}function Dm(r,t,e,o,n,s){let i=n.strideDepth,l=n.strideHeight,u=n.strideWidth,a=n.dilationDepth,c=n.dilationHeight,p=n.dilationWidth,m=n.effectiveFilterDepth,d=n.effectiveFilterHeight,f=n.effectiveFilterWidth,h=n.padInfo.front,g=n.padInfo.top,x=n.padInfo.left,y=s==="max"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,C=gt(n.outShape,e),I=C.values,v=n.outShape[1]*n.outShape[2]*n.outShape[3]*n.outShape[4],S=n.outShape[2]*n.outShape[3]*n.outShape[4],k=n.outShape[3]*n.outShape[4],A=n.outShape[4];for(let D=0;D<n.batchSize;++D){let F=D*v,M=D*o[0];for(let B=0;B<n.inChannels;++B)for(let U=0;U<n.outDepth;++U){let P=U*i-h,L=P;for(;L<0;)L+=a;let z=Math.min(n.inDepth,m+P),V=F+U*S;for(let W=0;W<n.outHeight;++W){let q=W*l-g,X=q;for(;X<0;)X+=c;let J=Math.min(n.inHeight,d+q),tt=V+W*k;for(let Y=0;Y<n.outWidth;++Y){let Q=Y*u-x,ot=Q;for(;ot<0;)ot+=p;let at=Math.min(n.inWidth,f+Q),st=tt+Y*A,mt=y,dt=0,It=0;for(let Rt=L;Rt<z;Rt+=a){let Ot=M+Rt*o[1];for(let Tt=X;Tt<J;Tt+=c){let Wt=Ot+Tt*o[2];for(let Ut=ot;Ut<at;Ut+=p){let Xt=Wt+Ut*o[3],Zt=r[Xt+B];if(s==="max"&&Zt>mt?mt=Zt:s==="avg"&&(dt+=Zt,It++),isNaN(mt))break}if(isNaN(mt))break}if(isNaN(mt))break}let wt=st+B;I[wt]=s==="avg"?dt/Math.max(It,1):mt}}}}return C}function x0(r,t){let e=gt(t.outShape,"int32"),o=t.strideDepth,n=t.strideHeight,s=t.strideWidth,i=t.dilationDepth,l=t.dilationHeight,u=t.dilationWidth,a=t.effectiveFilterDepth,c=t.effectiveFilterHeight,p=t.effectiveFilterWidth,m=t.padInfo.front,d=t.padInfo.top,f=t.padInfo.left;for(let h=0;h<t.batchSize;++h)for(let g=0;g<t.inChannels;++g)for(let x=0;x<t.outDepth;++x){let y=x*o-m,C=y;for(;C<0;)C+=i;let I=Math.min(t.inDepth,a+y);for(let v=0;v<t.outHeight;++v){let S=v*n-d,k=S;for(;k<0;)k+=l;let A=Math.min(t.inHeight,c+S);for(let D=0;D<t.outWidth;++D){let F=D*s-f,M=F;for(;M<0;)M+=u;let B=Math.min(t.inWidth,p+F),U=Number.NEGATIVE_INFINITY,P=-1;for(let L=C;L<I;L+=i){let z=L-y;for(let V=k;V<A;V+=l){let W=V-S;for(let q=M;q<B;q+=u){let X=q-F,J=r.get(h,L,V,q,g);J>=U&&(U=J,P=z*c*p+W*c+X)}}}e.set(P,h,x,v,D,g)}}}return e}function yG(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t;K(n,"avgPool");let{filterSize:s,strides:i,pad:l,dimRoundingMode:u}=o,a=1;b.assert(w.eitherStridesOrDilationsAreOne(i,a),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${i} and dilations '${a}'`);let c=w.computePool2DInfo(n.shape,s,i,a,l,u),p;if(c.filterWidth===1&&c.filterHeight===1&&b.arraysEqual(c.inShape,c.outShape))p=Le({inputs:{x:n},backend:e});else{let m=e.data.get(n.dataId).values,d=b.computeStrides(n.shape),f=eu(m,n.shape,n.dtype,d,c,"avg");p=e.makeTensorInfo(c.outShape,n.dtype,f.values)}return p}var b0={kernelName:Ho,backendName:"cpu",kernelFunc:yG};function CG(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{filterSize:s,strides:i,pad:l,dimRoundingMode:u,dataFormat:a}=o;K(n,"avgPool3d");let c=w.computePool3DInfo(n.shape,s,i,1,l,u,a),p=e.data.get(n.dataId).values,m=Dm(p,n.shape,n.dtype,b.computeStrides(n.shape),c,"avg");return e.makeTensorInfo(m.shape,"float32",m.values)}var y0={kernelName:al,backendName:"cpu",kernelFunc:CG};function IG(r){let{inputs:t,backend:e,attrs:o}=r,{dy:n,input:s}=t,{filterSize:i,strides:l,pad:u,dimRoundingMode:a}=o;K([n,s],"avgPool3DGrad");let c=w.computePool3DInfo(s.shape,i,l,1,u,a),p=c.strideDepth,m=c.strideHeight,d=c.strideWidth,f=c.filterDepth,h=c.filterHeight,g=c.filterWidth,x=c.dilationDepth,y=c.dilationHeight,C=c.dilationWidth,I=c.effectiveFilterDepth,v=c.effectiveFilterHeight,S=c.effectiveFilterWidth,k=I-1-c.padInfo.front,A=S-1-c.padInfo.left,D=v-1-c.padInfo.top,F=gt(s.shape,"float32"),M=1/(f*h*g),B=e.bufferSync(n);for(let U=0;U<c.batchSize;++U)for(let P=0;P<c.inChannels;++P)for(let L=0;L<c.inDepth;++L)for(let z=0;z<c.inHeight;++z)for(let V=0;V<c.inWidth;++V){let W=L-k,q=z-D,X=V-A,J=0;for(let tt=0;tt<I;tt+=x){let Y=(W+tt)/p;if(!(Y<0||Y>=c.outDepth||Math.floor(Y)!==Y))for(let Q=0;Q<v;Q+=y){let ot=(q+Q)/m;if(!(ot<0||ot>=c.outHeight||Math.floor(ot)!==ot))for(let at=0;at<S;at+=C){let st=(X+at)/d;if(st<0||st>=c.outWidth||Math.floor(st)!==st)continue;let mt=B.get(U,Y,ot,st,P);J+=mt}}}F.set(J*M,U,L,z,V,P)}return e.makeTensorInfo(F.shape,F.dtype,F.values)}var C0={kernelName:il,backendName:"cpu",kernelFunc:IG};function wG(r){let{inputs:t,backend:e,attrs:o}=r,{dy:n,input:s}=t,i=s;K([n,s],"avgPoolGrad");let{filterSize:l,strides:u,pad:a}=o,c=w.computePool2DInfo(i.shape,l,u,1,a),p=c.strideHeight,m=c.strideWidth,d=c.filterHeight,f=c.filterWidth,h=c.dilationHeight,g=c.dilationWidth,x=c.effectiveFilterHeight,y=c.effectiveFilterWidth,C=y-1-c.padInfo.left,I=x-1-c.padInfo.top,v=gt(i.shape,"float32"),S=1/(d*f),k=e.data.get(n.dataId).values,A=gt(n.shape,"float32",k);for(let D=0;D<c.batchSize;++D)for(let F=0;F<c.inChannels;++F)for(let M=0;M<c.inHeight;++M)for(let B=0;B<c.inWidth;++B){let U=M-I,P=B-C,L=0;for(let z=0;z<x;z+=h){let V=(U+z)/p;if(!(V<0||V>=c.outHeight||Math.floor(V)!==V))for(let W=0;W<y;W+=g){let q=(P+W)/m;if(q<0||q>=c.outWidth||Math.floor(q)!==q)continue;let X=A.get(D,V,q,F);L+=X}}v.set(L*S,D,M,B,F)}return e.makeTensorInfo(v.shape,v.dtype,v.values)}var I0={kernelName:sl,backendName:"cpu",kernelFunc:wG};function vG(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,scale:s,offset:i,mean:l,variance:u}=t;b.assert(l.shape.length===u.shape.length,()=>"Batch normalization gradient requires mean and variance to have equal ranks."),b.assert(i==null||l.shape.length===i.shape.length,()=>"Batch normalization gradient requires mean and offset to have equal ranks."),b.assert(s==null||l.shape.length===s.shape.length,()=>"Batch normalization gradient requires mean and scale to have equal ranks."),K([n,l,u,s,i],"batchNorm");let{varianceEpsilon:a}=o;a==null&&(a=.001);let c=e.data.get(n.dataId).values,p=e.data.get(l.dataId).values,m=e.data.get(u.dataId).values,d=s?e.data.get(s.dataId).values:new Float32Array([1]),f=i?e.data.get(i.dataId).values:new Float32Array([0]),h=new Float32Array(c.length),g=f.length,x=d.length,y=m.length,C=p.length,I=0,v=0,S=0,k=0;for(let A=0;A<c.length;++A)h[A]=f[I++]+(c[A]-p[v++])*d[S++]/Math.sqrt(m[k++]+a),I>=g&&(I=0),v>=C&&(v=0),S>=x&&(S=0),k>=y&&(k=0);return e.makeTensorInfo(n.shape,n.dtype,h)}var w0={kernelName:mn,backendName:"cpu",kernelFunc:vG};function SG(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{blockShape:s,crops:i}=o;K([n],"batchToSpaceND");let l=s.reduce((x,y)=>x*y),u=w.getReshaped(n.shape,s,l),a=w.getPermuted(u.length,s.length),c=w.getReshapedPermuted(n.shape,s,l),p=w.getSliceBeginCoords(i,s.length),m=w.getSliceSize(c,i,s.length),d=$t({inputs:{x:n},backend:e,attrs:{shape:u}}),f=ne({inputs:{x:d},backend:e,attrs:{perm:a}}),h=$t({inputs:{x:f},backend:e,attrs:{shape:c}}),g=Wr({inputs:{x:h},backend:e,attrs:{begin:p,size:m}});return e.disposeIntermediateTensorInfo(d),e.disposeIntermediateTensorInfo(f),e.disposeIntermediateTensorInfo(h),g}var v0={kernelName:$s,backendName:"cpu",kernelFunc:SG};function kG(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,weights:s}=t,{size:i}=o,l=e.data.get(n.dataId).values,u=e.data.get(s.dataId).values,a=Ql(l,u,s.dtype,s.shape,i);return e.makeTensorInfo([i],s.dtype,a)}var S0={kernelName:wa,backendName:"cpu",kernelFunc:kG};function TG(r){let{inputs:t,backend:e}=r,{s0:o,s1:n}=t,s=e.data.get(o.dataId).values,i=e.data.get(n.dataId).values,l=w.assertAndGetBroadcastShape(Array.from(s),Array.from(i));return e.makeTensorInfo([l.length],"int32",Int32Array.from(l))}var k0={kernelName:ll,backendName:"cpu",kernelFunc:TG};var _G=xt(go,(r,t)=>{let e=t;return r>e.clipValueMax?e.clipValueMax:r<e.clipValueMin?e.clipValueMin:r}),T0={kernelName:go,backendName:"cpu",kernelFunc:_G};var NG=r=>{let{x:t}=r.inputs,e=r.backend,o=new Float32Array(b.sizeFromShape(t.shape)),n=e.data.get(t.dataId),s=n.complexTensorInfos.real,i=n.complexTensorInfos.imag,l=e.data.get(s.dataId).values,u=e.data.get(i.dataId).values;for(let a=0;a<l.length;a++){let c=l[a],p=u[a];o[a]=Math.hypot(c,p)}return e.makeOutput(o,t.shape,"float32")},_0={kernelName:cl,backendName:"cpu",kernelFunc:NG};function vo(r){let{inputs:t,backend:e}=r,{input:o}=t,n=e.data.get(o.dataId).complexTensorInfos.imag,s=e.data.get(n.dataId).values;return e.makeTensorInfo(n.shape,n.dtype,s)}var N0={kernelName:xl,backendName:"cpu",kernelFunc:vo};function sa(r){let{inputs:t,backend:e,attrs:o}=r,{axis:n}=o,s=b.parseAxisParam(n,t[0].shape)[0],i=t.map(h=>h.shape);w.assertParamsConsistent(i,s);let l=w.computeOutShape(t.map(h=>h.shape),s);if(b.sizeFromShape(l)===0)return e.makeTensorInfo(l,t[0].dtype,[]);let u=t.filter(h=>b.sizeFromShape(h.shape)>0);if(u.length===1)return Le({inputs:{x:u[0]},backend:e});if(u[0].dtype==="complex64"){let h=u.map(I=>Ur({inputs:{input:I},backend:e})),g=u.map(I=>vo({inputs:{input:I},backend:e})),x=sa({inputs:h,backend:e,attrs:{axis:s}}),y=sa({inputs:g,backend:e,attrs:{axis:s}}),C=ke({inputs:{real:x,imag:y},backend:e});return h.forEach(I=>e.disposeIntermediateTensorInfo(I)),g.forEach(I=>e.disposeIntermediateTensorInfo(I)),e.disposeIntermediateTensorInfo(x),e.disposeIntermediateTensorInfo(y),C}let a=u.map(h=>{let x=[-1,b.sizeFromShape(h.shape.slice(s))];return $t({inputs:{x:h},backend:e,attrs:{shape:x}})}),c=a.map(h=>({vals:e.data.get(h.dataId).values,shape:h.shape}));l=w.computeOutShape(a.map(h=>h.shape),1);let p=a[0].shape[0]===1,m=di(c,l,t[0].dtype,p),d=w.computeOutShape(u.map(h=>h.shape),s),f=e.makeTensorInfo(d,t[0].dtype,m);return a.forEach(h=>e.disposeIntermediateTensorInfo(h)),f}var A0={kernelName:Ms,backendName:"cpu",kernelFunc:sa};function Oy(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,filter:s}=t,{strides:i,pad:l,dataFormat:u,dilations:a,dimRoundingMode:c}=o;K([n,s],"conv2d");let p=w.convertConv2DDataFormat(u),m=w.computeConv2DInfo(n.shape,s.shape,i,a,l,c,!1,p),d=m.filterHeight,f=m.filterWidth,h=m.dilationHeight,g=m.dilationWidth,x=m.padInfo.left,y=m.padInfo.top,C=m.dataFormat==="channelsLast",I=new qt(m.outShape,n.dtype),v=b.computeStrides(n.shape),S=b.computeStrides(s.shape),k=v[0],A=C?v[1]:v[2],D=C?v[2]:1,F=C?1:v[1],M=I.strides[0],B=C?I.strides[1]:I.strides[2],U=C?I.strides[2]:1,P=C?1:I.strides[1],L=e.data.get(n.dataId).values,z=e.data.get(s.dataId).values,V=I.values;for(let W=0;W<m.batchSize;++W){let q=W*k,X=W*M;for(let J=0;J<m.outHeight;++J){let tt=X+J*B,Y=J*m.strideHeight-y;for(let Q=0;Q<d;++Q){let ot=Y+Q*h;if(ot<0||ot>=m.inHeight)continue;let at=Q*S[0],st=q+ot*A;for(let mt=0;mt<m.outWidth;++mt){let dt=tt+mt*U,It=mt*m.strideWidth-x;for(let wt=0;wt<f;++wt){let Rt=It+wt*g;if(Rt<0||Rt>=m.inWidth)continue;let Ot=at+wt*S[1],Tt=st+Rt*D,Wt=Ot;for(let Ut=0;Ut<m.inChannels;++Ut){let Xt=L[Tt+Ut*F];for(let Zt=0;Zt<m.outChannels;++Zt)V[dt+Zt*P]+=Xt*z[Wt+Zt];Wt+=m.outChannels}}}}}}return e.makeTensorInfo(I.shape,I.dtype,V)}var E0={kernelName:jo,backendName:"cpu",kernelFunc:Oy};function AG(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,dy:s}=t,{strides:i,pad:l,dataFormat:u,dimRoundingMode:a,filterShape:c}=o;K([n,s],"conv2dBackpropFilter");let p=w.convertConv2DDataFormat(u),m=w.computeConv2DInfo(n.shape,c,i,1,l,a,!1,p),{strideHeight:d,strideWidth:f,filterHeight:h,filterWidth:g}=m,x=m.dataFormat==="channelsLast",y=new qt(m.filterShape,"float32"),C=m.padInfo.left,I=m.padInfo.top,v=e.data.get(n.dataId).values,S=e.data.get(s.dataId).values,k=new qt(n.shape,n.dtype,v),A=new qt(s.shape,s.dtype,S);for(let D=0;D<h;++D){let F=Math.max(0,Math.ceil((I-D)/d)),M=Math.min(m.outHeight,(m.inHeight+I-D)/d);for(let B=0;B<g;++B){let U=Math.max(0,Math.ceil((C-B)/f)),P=Math.min(m.outWidth,(m.inWidth+C-B)/f);for(let L=0;L<m.inChannels;++L)for(let z=0;z<m.outChannels;++z){let V=0;for(let W=0;W<m.batchSize;++W)for(let q=F;q<M;++q){let X=D+q*d-I;for(let J=U;J<P;++J){let tt=B+J*f-C;x?V+=k.get(W,X,tt,L)*A.get(W,q,J,z):V+=k.get(W,L,X,tt)*A.get(W,z,q,J)}}y.set(V,D,B,L,z)}}}return e.makeTensorInfo(y.shape,y.dtype,y.values)}var R0={kernelName:Cp,backendName:"cpu",kernelFunc:AG};function EG(r){let{inputs:t,backend:e,attrs:o}=r,{dy:n,filter:s}=t,{inputShape:i,strides:l,pad:u,dataFormat:a,dimRoundingMode:c}=o;K([n,s],"conv2dBackpropInput");let p=b.computeStrides(s.shape),m=b.computeStrides(n.shape),d=w.convertConv2DDataFormat(a),f=w.computeConv2DInfo(i,s.shape,l,1,u,c,!1,d),h=new qt(f.inShape,"float32"),g=h.values,x=e.data.get(n.dataId).values,y=e.data.get(s.dataId).values,[C,I,v]=p,{batchSize:S,filterHeight:k,filterWidth:A,inChannels:D,inHeight:F,inWidth:M,outChannels:B,outHeight:U,outWidth:P,strideHeight:L,strideWidth:z}=f;d=f.dataFormat;let V=k-1-f.padInfo.top,W=A-1-f.padInfo.left,q=d==="channelsLast",X=h.strides[0],J=q?h.strides[1]:h.strides[2],tt=q?h.strides[2]:1,Y=q?1:h.strides[1],Q=m[0],ot=q?m[1]:m[2],at=q?m[2]:1,st=q?1:m[1];for(let mt=0;mt<S;++mt)for(let dt=0;dt<D;++dt)for(let It=0;It<F;++It){let wt=It-V,Rt=Math.max(0,Math.ceil(wt/L)),Ot=Math.min(U,(k+wt)/L);for(let Tt=0;Tt<M;++Tt){let Wt=Tt-W,Ut=Math.max(0,Math.ceil(Wt/z)),Xt=Math.min(P,(A+Wt)/z),Zt=0;for(let xe=Rt;xe<Ot;++xe){let kr=xe*L-wt;for(let Me=Ut;Me<Xt;++Me){let ce=Me*z-Wt,Pe=Q*mt+ot*xe+at*Me,Oe=C*(k-1-kr)+I*(A-1-ce)+v*dt;for(let Tr=0;Tr<B;++Tr){let _r=x[Pe+st*Tr],Ve=y[Oe+Tr];Zt+=_r*Ve}}}let cr=X*mt+J*It+tt*Tt+Y*dt;g[cr]=Zt}}return e.makeTensorInfo(h.shape,h.dtype,h.values)}var D0={kernelName:Xo,backendName:"cpu",kernelFunc:EG};function RG(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,filter:s}=t,{strides:i,pad:l,dilations:u}=o;K([n,s],"conv3d");let a=w.computeConv3DInfo(n.shape,s.shape,i,u,l),{filterDepth:c,filterHeight:p,filterWidth:m,dilationDepth:d,dilationHeight:f,dilationWidth:h,padInfo:g}=a,x=g.front,y=g.left,C=g.top,I=new qt(a.outShape,n.dtype),v=e.data.get(n.dataId).values,S=e.data.get(s.dataId).values,k=I.values,A=b.computeStrides(n.shape),D=b.computeStrides(s.shape);for(let F=0;F<a.batchSize;++F){let M=F*A[0],B=F*I.strides[0];for(let U=0;U<a.outDepth;++U){let P=B+U*I.strides[1],L=U*a.strideDepth-x;for(let z=0;z<c;++z){let V=L+z*d;if(V<0||V>=a.inDepth)continue;let W=z*D[0],q=M+V*A[1];for(let X=0;X<a.outHeight;++X){let J=P+X*I.strides[2],tt=X*a.strideHeight-C;for(let Y=0;Y<p;++Y){let Q=tt+Y*f;if(Q<0||Q>=a.inHeight)continue;let ot=W+Y*D[1],at=q+Q*A[2];for(let st=0;st<a.outWidth;++st){let mt=J+st*a.outChannels,dt=st*a.strideWidth-y;for(let It=0;It<m;++It){let wt=dt+It*h;if(wt<0||wt>=a.inWidth)continue;let Rt=ot+It*D[2],Ot=at+wt*a.inChannels,Tt=Rt;for(let Wt=0;Wt<a.inChannels;++Wt){let Ut=v[Ot+Wt];for(let Xt=0;Xt<a.outChannels;++Xt)k[mt+Xt]+=Ut*S[Tt+Xt];Tt+=a.outChannels}}}}}}}}return e.makeTensorInfo(I.shape,I.dtype,I.values)}var F0={kernelName:Sa,backendName:"cpu",kernelFunc:RG};function DG(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,dy:s}=t,{strides:i,pad:l,filterShape:u}=o;K([n,s],"conv3dBackpropFilterV2");let a=b.computeStrides(n.shape),c=b.computeStrides(s.shape),p=w.computeConv3DInfo(n.shape,u,i,1,l),m=p.strideDepth,d=p.strideHeight,f=p.strideWidth,h=p.filterDepth,g=p.filterHeight,x=p.filterWidth,y=new qt(p.filterShape,"float32"),C=y.values,[I,v,S,k]=y.strides,A=e.data.get(s.dataId).values,[D,F,M,B]=c,U=e.data.get(n.dataId).values,[P,L,z,V]=a,W=p.padInfo.front,q=p.padInfo.left,X=p.padInfo.top;for(let J=0;J<h;++J){let tt=Math.max(0,Math.ceil((W-J)/m)),Y=Math.min(p.outDepth,(p.inDepth+W-J)/m),Q=J*I;for(let ot=0;ot<g;++ot){let at=Math.max(0,Math.ceil((X-ot)/d)),st=Math.min(p.outHeight,(p.inHeight+X-ot)/d),mt=ot*v+Q;for(let dt=0;dt<x;++dt){let It=Math.max(0,Math.ceil((q-dt)/f)),wt=Math.min(p.outWidth,(p.inWidth+q-dt)/f),Rt=dt*S+mt;for(let Ot=0;Ot<p.inChannels;++Ot){let Tt=Ot*k+Rt;for(let Wt=0;Wt<p.outChannels;++Wt){let Ut=0;for(let Xt=0;Xt<p.batchSize;++Xt){let Zt=Xt*P,cr=Xt*D;for(let xe=tt;xe<Y;++xe){let Me=(J+xe*m-W)*L+Zt,ce=xe*F+cr;for(let Pe=at;Pe<st;++Pe){let Tr=(ot+Pe*d-X)*z+Me,_r=Pe*M+ce;for(let Ve=It;Ve<wt;++Ve){let jr=(dt+Ve*f-q)*V+Tr,po=Ve*B+_r;Ut+=U[jr+Ot]*A[po+Wt]}}}}C[Tt+Wt]=Ut}}}}}return e.makeTensorInfo(y.shape,y.dtype,y.values)}var $0={kernelName:ka,backendName:"cpu",kernelFunc:DG};function FG(r){let{inputs:t,backend:e,attrs:o}=r,{dy:n,filter:s}=t,{pad:i,strides:l,inputShape:u}=o;K([n],"conv3dBackpropInputV2");let a=b.computeStrides(n.shape),c=b.computeStrides(s.shape),p=w.computeConv3DInfo(u,s.shape,l,1,i),m=new qt(p.inShape,"float32"),d=m.values,[f,h,g,x]=m.strides,y=e.data.get(n.dataId).values,[C,I,v,S]=a,k=e.data.get(s.dataId).values,[A,D,F,M]=c,{batchSize:B,filterDepth:U,filterHeight:P,filterWidth:L,inChannels:z,inDepth:V,inHeight:W,inWidth:q,outChannels:X,outDepth:J,outHeight:tt,outWidth:Y,strideDepth:Q,strideHeight:ot,strideWidth:at}=p,st=U-1-p.padInfo.front,mt=P-1-p.padInfo.top,dt=L-1-p.padInfo.left;for(let It=0;It<B;++It)for(let wt=0;wt<z;++wt)for(let Rt=0;Rt<V;++Rt){let Ot=Rt-st,Tt=Math.max(0,Math.ceil(Ot/Q)),Wt=Math.min(J,(U+Ot)/Q);for(let Ut=0;Ut<W;++Ut){let Xt=Ut-mt,Zt=Math.max(0,Math.ceil(Xt/ot)),cr=Math.min(tt,(P+Xt)/ot);for(let xe=0;xe<q;++xe){let kr=xe-dt,Me=Math.max(0,Math.ceil(kr/at)),ce=Math.min(Y,(L+kr)/at),Pe=0;for(let Oe=Tt;Oe<Wt;++Oe){let Tr=Oe*Q-Ot;for(let _r=Zt;_r<cr;++_r){let Ve=_r*ot-Xt;for(let Ao=Me;Ao<ce;++Ao){let jr=Ao*at-kr,po=C*It+I*Oe+v*_r+S*Ao,Ae=A*(U-1-Tr)+D*(P-1-Ve)+F*(L-1-jr)+M*wt;for(let Eo=0;Eo<X;++Eo){let ku=y[po+Eo],Tu=k[Ae+Eo];Pe+=ku*Tu}}}}d[f*It+h*Rt+g*Ut+x*xe+wt]=Pe}}}return e.makeTensorInfo(m.shape,m.dtype,m.values)}var M0={kernelName:Ta,backendName:"cpu",kernelFunc:FG};var $G=xt(Yo,r=>Math.cos(r)),P0={kernelName:Yo,backendName:"cpu",kernelFunc:$G};var MG=xt(Zo,r=>Math.cosh(r)),O0={kernelName:Zo,backendName:"cpu",kernelFunc:MG};function PG(r){let{inputs:t,backend:e,attrs:o}=r,{image:n,boxes:s,boxInd:i}=t,{cropSize:l,method:u,extrapolationValue:a}=o,[c,p,m,d]=n.shape,f=s.shape[0],[h,g]=l,x=gt([f,h,g,d],"float32"),y=e.data.get(s.dataId).values,C=e.data.get(i.dataId).values,I=e.data.get(n.dataId).values,v=b.computeStrides(n.shape),S=b.computeStrides(x.shape);for(let k=0;k<f;k++){let A=k*4,D=y[A],F=y[A+1],M=y[A+2],B=y[A+3],U=C[k];if(U>=c)continue;let P=h>1?(M-D)*(p-1)/(h-1):0,L=g>1?(B-F)*(m-1)/(g-1):0;for(let z=0;z<h;z++){let V=h>1?D*(p-1)+z*P:.5*(D+M)*(p-1);if(V<0||V>p-1){for(let W=0;W<g;W++)for(let q=0;q<d;q++){let X=q+W*S[2]+z*S[1]+k*S[0];x.values[X]=a}continue}if(u==="bilinear"){let W=Math.floor(V),q=Math.ceil(V),X=V-W;for(let J=0;J<g;J++){let tt=g>1?F*(m-1)+J*L:.5*(F+B)*(m-1);if(tt<0||tt>m-1){for(let at=0;at<d;at++){let st=at+J*S[2]+z*S[1]+k*S[0];x.values[st]=a}continue}let Y=Math.floor(tt),Q=Math.ceil(tt),ot=tt-Y;for(let at=0;at<d;at++){let st=at+Y*v[2]+W*v[1]+U*v[0],mt=I[st];st=at+Q*v[2]+W*v[1]+U*v[0];let dt=I[st];st=at+Y*v[2]+q*v[1]+U*v[0];let It=I[st];st=at+Q*v[2]+q*v[1]+U*v[0];let wt=I[st],Rt=mt+(dt-mt)*ot,Ot=It+(wt-It)*ot;st=at+J*S[2]+z*S[1]+k*S[0],x.values[st]=Rt+(Ot-Rt)*X}}}else for(let W=0;W<g;++W){let q=g>1?F*(m-1)+W*L:.5*(F+B)*(m-1);if(q<0||q>m-1){for(let tt=0;tt<d;tt++){let Y=tt+W*S[2]+z*S[1]+k*S[0];x.values[Y]=a}continue}let X=Math.round(q),J=Math.round(V);for(let tt=0;tt<d;tt++){let Y=tt+X*v[2]+J*v[1]+U*v[0],Q=tt+W*S[2]+z*S[1]+k*S[0];x.values[Q]=I[Y]}}}}return e.makeTensorInfo(x.shape,x.dtype,x.values)}var B0={kernelName:_a,backendName:"cpu",kernelFunc:PG};function OG(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s,exclusive:i,reverse:l}=o;K(n,"cumprod");let u=w.getAxesPermutation([s],n.shape.length),a=n;u!=null&&(a=ne({inputs:{x:n},backend:e,attrs:{perm:u}}));let c=w.getInnerMostAxes(1,n.shape.length)[0];if(c!==a.shape.length-1)throw new Error(`backend.cumprod in CPU expects an inner-most axis=${a.shape.length-1} but got axis=${c}`);let p=be(a.dtype,"int32"),m=b.makeOnesTypedArray(b.sizeFromShape(a.shape),p),d=e.data.get(a.dataId).values,f=a.shape[a.shape.length-1],h=l?(x,y)=>x+f-y-1:(x,y)=>x+y;for(let x=0;x<d.length;x+=f)for(let y=0;y<f;y++){let C=h(x,y);if(y===0)m[C]=i?1:d[C];else{let I=h(x,y-1);m[C]=i?d[I]*m[I]:d[C]*m[I]}}let g=e.makeTensorInfo(a.shape,p,m);if(u!=null){let x=w.getUndoAxesPermutation(u),y=ne({inputs:{x:g},backend:e,attrs:{perm:x}});return e.disposeIntermediateTensorInfo(g),e.disposeIntermediateTensorInfo(a),y}return g}var L0={kernelName:Qo,backendName:"cpu",kernelFunc:OG};function BG(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s,exclusive:i,reverse:l}=o;K(n,"cumsum");let u=w.getAxesPermutation([s],n.shape.length),a=n;u!=null&&(a=ne({inputs:{x:n},backend:e,attrs:{perm:u}}));let c=w.getInnerMostAxes(1,n.shape.length)[0];if(c!==a.shape.length-1)throw new Error(`backend.cumsum in CPU expects an inner-most axis=${a.shape.length-1} but got axis=${c}`);let p=be(a.dtype,"int32"),m=b.makeZerosTypedArray(b.sizeFromShape(a.shape),p),d=e.data.get(a.dataId).values,f=a.shape[a.shape.length-1],h=l?(x,y)=>x+f-y-1:(x,y)=>x+y;for(let x=0;x<d.length;x+=f)for(let y=0;y<f;y++){let C=h(x,y);if(y===0)m[C]=i?0:d[C];else{let I=h(x,y-1);m[C]=i?d[I]+m[I]:d[C]+m[I]}}let g=e.makeTensorInfo(a.shape,p,m);if(u!=null){let x=w.getUndoAxesPermutation(u),y=ne({inputs:{x:g},backend:e,attrs:{perm:x}});return e.disposeIntermediateTensorInfo(g),e.disposeIntermediateTensorInfo(a),y}return g}var U0={kernelName:Jo,backendName:"cpu",kernelFunc:BG};function LG(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,weights:s}=t,{size:i,binaryOutput:l}=o;if(n.shape.length===1){let u=e.data.get(n.dataId).values,a=e.data.get(s.dataId).values,c=Ql(u,a,s.dtype,s.shape,i);return e.makeTensorInfo([i],s.dtype,c)}else if(n.shape.length===2){let u=e.bufferSync(n),a=e.bufferSync(s),c=bm(u,a,i,l);return e.makeTensorInfo(c.shape,s.dtype,c.values)}throw new Error(`Error in denseBincount: input must be at most rank 2, but got rank${n.shape.length}.`)}var G0={kernelName:pl,backendName:"cpu",kernelFunc:LG};function UG(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{blockSize:s,dataFormat:i}=o;b.assert(i==="NHWC",()=>`Only NHWC dataFormat supported on CPU for depthToSpace. Got ${i}`);let l=n.shape[0],u=n.shape[1],a=n.shape[2],c=n.shape[3],p=u*s,m=a*s,d=c/(s*s),f=e.data.get(n.dataId).values,h=new Float32Array(l*p*m*d),g=0;for(let x=0;x<l;++x)for(let y=0;y<p;++y){let C=Math.floor(y/s),I=y%s;for(let v=0;v<m;++v){let S=Math.floor(v/s),k=v%s,A=(I*s+k)*d;for(let D=0;D<d;++D){let M=D+A+c*(S+a*(C+u*x));h[g++]=f[M]}}}return e.makeTensorInfo([l,p,m,d],n.dtype,h)}var V0={kernelName:tn,backendName:"cpu",kernelFunc:UG};function By(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,filter:s}=t,{strides:i,pad:l,dilations:u,dimRoundingMode:a}=o;K([n,s],"depthwiseConv2DNative");let c=b.computeStrides(n.shape),p=b.computeStrides(s.shape),m=u;m==null&&(m=[1,1]),b.assert(w.eitherStridesOrDilationsAreOne(i,m),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${i} and dilations '${m}'`);let d=w.computeConv2DInfo(n.shape,s.shape,i,m,l,a,!0),{filterHeight:f,filterWidth:h,dilationHeight:g,dilationWidth:x,padInfo:y}=d,C=y.left,I=y.top,v=d.outChannels/d.inChannels,S=new qt(d.outShape,n.dtype),k=e.data.get(n.dataId).values,A=e.data.get(s.dataId).values,D=S.values;for(let F=0;F<d.batchSize;++F){let M=F*c[0],B=F*S.strides[0];for(let U=0;U<d.outHeight;++U){let P=B+U*S.strides[1],L=U*d.strideHeight-I;for(let z=0;z<f;++z){let V=L+z*g;if(V<0||V>=d.inHeight)continue;let W=z*p[0],q=M+V*c[1];for(let X=0;X<d.outWidth;++X){let J=P+X*S.strides[2],tt=X*d.strideWidth-C;for(let Y=0;Y<h;++Y){let Q=tt+Y*x;if(Q<0||Q>=d.inWidth)continue;let ot=W+Y*p[1],at=q+Q*d.inChannels,st=J,mt=ot;for(let dt=0;dt<d.inChannels;++dt){let It=k[at+dt];for(let wt=0;wt<v;++wt)D[st+wt]+=It*A[mt+wt];st+=v,mt+=v}}}}}}return e.makeTensorInfo(S.shape,S.dtype,S.values)}var W0={kernelName:en,backendName:"cpu",kernelFunc:By};function GG(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,dy:s}=t,{strides:i,dilations:l,pad:u,dimRoundingMode:a,filterShape:c}=o;K([n,s],"depthwiseConv2dNativeBackpropFilter");let p=w.computeConv2DInfo(n.shape,c,i,l,u,a,!0),{strideHeight:m,strideWidth:d,filterHeight:f,filterWidth:h}=p,g=new qt(p.filterShape,"float32"),x=p.padInfo.left,y=p.padInfo.top,C=p.outChannels/p.inChannels,I=e.data.get(n.dataId).values,v=new qt(n.shape,n.dtype,I),S=e.data.get(s.dataId).values,k=new qt(s.shape,s.dtype,S);for(let A=0;A<f;++A){let D=Math.max(0,Math.ceil((y-A)/m)),F=Math.min(p.outHeight,(p.inHeight+y-A)/m);for(let M=0;M<h;++M){let B=Math.max(0,Math.ceil((x-M)/d)),U=Math.min(p.outWidth,(p.inWidth+x-M)/d);for(let P=0;P<p.outChannels;++P){let L=Math.trunc(P/C),z=P%C,V=0;for(let W=0;W<p.batchSize;++W)for(let q=D;q<F;++q){let X=A+q*m-y;for(let J=B;J<U;++J){let tt=M+J*d-x;V+=v.get(W,X,tt,L)*k.get(W,q,J,P)}}g.set(V,A,M,L,z)}}}return e.makeTensorInfo(g.shape,g.dtype,g.values)}var z0={kernelName:Ip,backendName:"cpu",kernelFunc:GG};function VG(r){let{inputs:t,backend:e,attrs:o}=r,{dy:n,filter:s}=t,{strides:i,dilations:l,pad:u,dimRoundingMode:a,inputShape:c}=o;K([n,s],"depthwiseConv2DNativeBackpropInput");let p=b.computeStrides(n.shape),m=b.computeStrides(s.shape),d=w.computeConv2DInfo(c,s.shape,i,l,u,a,!0),f=new qt(d.inShape,"float32"),h=f.values,[g,x,y]=f.strides,C=e.data.get(n.dataId).values,[I,v,S]=p,k=e.data.get(s.dataId).values,[A,D,F]=m,{batchSize:M,filterHeight:B,filterWidth:U,inChannels:P,inHeight:L,inWidth:z,outChannels:V,outHeight:W,outWidth:q,strideHeight:X,strideWidth:J}=d,tt=B-1-d.padInfo.top,Y=U-1-d.padInfo.left,Q=V/P;for(let ot=0;ot<M;++ot)for(let at=0;at<P;++at)for(let st=0;st<L;++st){let mt=st-tt,dt=Math.max(0,Math.ceil(mt/X)),It=Math.min(W,(B+mt)/X);for(let wt=0;wt<z;++wt){let Rt=wt-Y,Ot=Math.max(0,Math.ceil(Rt/J)),Tt=Math.min(q,(U+Rt)/J),Wt=0;for(let Ut=dt;Ut<It;++Ut){let Xt=Ut*X-mt;for(let Zt=Ot;Zt<Tt;++Zt){let cr=Zt*J-Rt,xe=I*ot+v*Ut+S*Zt,kr=A*(B-1-Xt)+D*(U-1-cr)+F*at;for(let Me=0;Me<Q;++Me){let ce=at*Q+Me,Pe=C[xe+ce],Oe=k[kr+Me];Wt+=Pe*Oe}}}h[g*ot+x*st+y*wt+at]=Wt}}return e.makeTensorInfo(f.shape,f.dtype,f.values)}var H0={kernelName:wp,backendName:"cpu",kernelFunc:VG};function WG(r){let{inputs:t,backend:e}=r,{x:o}=t,n=b.sizeFromShape(o.shape),s=e.data.get(o.dataId).values,i=gt([n,n],o.dtype),l=i.values;for(let a=0;a<s.length;a++)l[a*n+a]=s[a];let u=[...o.shape,...o.shape];return e.makeTensorInfo(u,i.dtype,i.values)}var K0={kernelName:ml,backendName:"cpu",kernelFunc:WG};var q0={kernelName:rn,backendName:"cpu",kernelFunc:({inputs:r,backend:t,attrs:e})=>{let{x:o,filter:n}=r,{strides:s,pad:i,dilations:l}=e,u=t,a=u.data.get(o.dataId).values,c=o.shape.length,p=u.data.get(n.dataId).values,m=n.shape.length,{batchSize:d,inHeight:f,inWidth:h,inChannels:g,outHeight:x,outWidth:y,padInfo:C,strideHeight:I,strideWidth:v,filterHeight:S,filterWidth:k,dilationHeight:A,dilationWidth:D,outShape:F}=w.computeDilation2DInfo(o.shape,n.shape,s,i,"NHWC",l),M=b.sizeFromShape(F),B=F.length,U=b.getArrayFromDType(o.dtype,M);for(let L=0;L<d;++L)for(let z=0;z<x;++z){let V=z*I-C.top;for(let W=0;W<y;++W){let q=W*v-C.left;for(let X=0;X<g;++X){let J=Number.MIN_SAFE_INTEGER;for(let Y=0;Y<S;++Y){let Q=V+Y*A;if(Q>=0&&Q<f)for(let ot=0;ot<k;++ot){let at=q+ot*D;if(at>=0&&at<h){let st=b.locToIndex([L,Q,at,X],c,b.computeStrides(o.shape)),mt=b.locToIndex([Y,ot,X],m,b.computeStrides(n.shape)),dt=a[st]+p[mt];dt>J&&(J=dt)}}}let tt=b.locToIndex([L,z,W,X],B,b.computeStrides(F));U[tt]=J}}}return{dataId:u.write(b.toTypedArray(U,o.dtype),F,o.dtype),shape:F,dtype:o.dtype}}};var j0={kernelName:fl,backendName:"cpu",kernelFunc:({inputs:r,backend:t,attrs:e})=>{let{x:o,filter:n,dy:s}=r,{strides:i,pad:l,dilations:u}=e,a=t,c=b.toNestedArray(o.shape,a.data.get(o.dataId).values),p=b.toNestedArray(n.shape,a.data.get(n.dataId).values),{batchSize:m,inHeight:d,inWidth:f,inChannels:h,outHeight:g,outWidth:x,padInfo:y,strideHeight:C,strideWidth:I,filterHeight:v,filterWidth:S,dilationHeight:k,dilationWidth:A,outShape:D}=w.computeDilation2DInfo(o.shape,n.shape,i,l,"NHWC",u);b.assert(s.rank===D.length,()=>`Error in ${fl}, dy must have the same rank as output ${D.length}, but got ${s.rank}`);let F=b.toNestedArray(D,a.data.get(s.dataId).values),M=b.makeZerosNestedTypedArray(n.shape,n.dtype);for(let U=0;U<m;++U)for(let P=0;P<g;++P){let L=P*C-y.top;for(let z=0;z<x;++z){let V=z*I-y.left;for(let W=0;W<h;++W){let q=Number.MIN_SAFE_INTEGER,X=0,J=0;for(let tt=0;tt<v;++tt){let Y=L+tt*k;if(Y>=0&&Y<d)for(let Q=0;Q<S;++Q){let ot=V+Q*A;if(ot>=0&&ot<f){let at=c[U][Y][ot][W]+p[tt][Q][W];at>q&&(q=at,X=tt,J=Q)}}}M[X][J][W]+=F[U][P][z][W]}}}return{dataId:a.write(b.toTypedArray(M,o.dtype),n.shape,n.dtype),shape:n.shape,dtype:n.dtype}}};var X0={kernelName:dl,backendName:"cpu",kernelFunc:({inputs:r,backend:t,attrs:e})=>{let{x:o,filter:n,dy:s}=r,{strides:i,pad:l,dilations:u}=e,a=t,c=b.toNestedArray(o.shape,a.data.get(o.dataId).values),p=b.toNestedArray(n.shape,a.data.get(n.dataId).values),{batchSize:m,inHeight:d,inWidth:f,inChannels:h,outHeight:g,outWidth:x,padInfo:y,strideHeight:C,strideWidth:I,filterHeight:v,filterWidth:S,dilationHeight:k,dilationWidth:A,outShape:D}=w.computeDilation2DInfo(o.shape,n.shape,i,l,"NHWC",u);b.assert(s.rank===D.length,()=>`Error in ${dl}, dy must have the same rank as output ${D.length}, but got ${s.rank}`);let F=b.toNestedArray(D,a.data.get(s.dataId).values),M=b.makeZerosNestedTypedArray(o.shape,o.dtype);for(let U=0;U<m;++U)for(let P=0;P<g;++P){let L=P*C-y.top;for(let z=0;z<x;++z){let V=z*I-y.left;for(let W=0;W<h;++W){let q=Number.MIN_SAFE_INTEGER,X=L<0?0:L,J=V<0?0:V;for(let tt=0;tt<v;++tt){let Y=L+tt*k;if(Y>=0&&Y<d)for(let Q=0;Q<S;++Q){let ot=V+Q*A;if(ot>=0&&ot<f){let at=c[U][Y][ot][W]+p[tt][Q][W];at>q&&(q=at,X=Y,J=ot)}}}M[U][X][J][W]+=F[U][P][z][W]}}}return{dataId:a.write(b.toTypedArray(M,o.dtype),o.shape,o.dtype),shape:o.shape,dtype:o.dtype}}};function zG(r){let{inputs:t,backend:e,attrs:o}=r,{image:n}=t,{canvas:s,options:i}=o,{contextOptions:l,imageOptions:u}=i||{},a=u?.alpha||1,c=l?.contextType||"2d";if(c!=="2d")throw new Error(`Context type ${l.contextType} is not supported by the CPU backend.`);let p=s.getContext(c,l?.contextAttributes||{});if(p==null)throw new Error(`Could not get the context with ${c} type.`);let[m,d]=n.shape.slice(0,2),f=n.shape.length===2?1:n.shape[2],h=e.data.get(n.dataId).values,g=n.dtype==="float32"?255:1,x=new Uint8ClampedArray(d*m*4);for(let C=0;C<m*d;++C){let I=[0,0,0,255*a];for(let S=0;S<f;S++){let k=h[C*f+S];if(n.dtype==="float32"){if(k<0||k>1)throw new Error(`Tensor values for a float32 Tensor must be in the range [0 - 1] but encountered ${k}.`)}else if(n.dtype==="int32"&&(k<0||k>255))throw new Error(`Tensor values for a int32 Tensor must be in the range [0 - 255] but encountered ${k}.`);f===1?(I[0]=k*g,I[1]=k*g,I[2]=k*g):I[S]=k*g}let v=C*4;x[v+0]=Math.round(I[0]),x[v+1]=Math.round(I[1]),x[v+2]=Math.round(I[2]),x[v+3]=Math.round(I[3])}s.width=d,s.height=m;let y=new ImageData(x,d,m);return p.putImageData(y,0,0),n}var Y0={kernelName:AI,backendName:"cpu",kernelFunc:zG};function ys(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s,keepDims:i}=o;K(n,"sum");let l;n.dtype==="bool"?l=Gr({inputs:{x:n},backend:e,attrs:{dtype:"int32"}}):l=Le({inputs:{x:n},backend:e});let u=l.shape.length,a=b.parseAxisParam(s,l.shape),c=w.getAxesPermutation(a,u),p=a,m=l;c!=null&&(m=ne({inputs:{x:l},backend:e,attrs:{perm:c}}),p=w.getInnerMostAxes(p.length,u)),w.assertAxesAreInnerMostDims("sum",p,m.shape.length);let[d,f]=w.computeOutAndReduceShapes(m.shape,p),h=w.upcastType(m.dtype,"int32"),g=Yl(e,d,h),x=b.sizeFromShape(f),y=e.data.get(g.dataId).values,C=e.data.get(m.dataId).values;for(let I=0;I<y.length;++I){let v=I*x,S=0;for(let k=0;k<x;++k)S+=C[v+k];y[I]=S}if(i){let I=w.expandShapeToKeepDim(g.shape,a),v=g;g=$t({inputs:{x:g},backend:e,attrs:{shape:I}}),e.disposeIntermediateTensorInfo(v)}return e.disposeIntermediateTensorInfo(l),c!=null&&e.disposeIntermediateTensorInfo(m),g}var Z0={kernelName:os,backendName:"cpu",kernelFunc:ys};function HG(r){let{inputs:t,backend:e,attrs:o}=r,{equation:n}=o,s=t,{allDims:i,summedDims:l,idDims:u}=w.decodeEinsumEquation(n,s.length);w.checkEinsumDimSizes(i.length,u,s);let{path:a,steps:c}=w.getEinsumComputePath(l,u),p=c.length,m=null,d=i.length,f=[];for(let h=0;h<p;++h){for(let g of c[h]){let{permutationIndices:x,expandDims:y}=w.getEinsumPermutation(d,u[g]),C;w.isIdentityPermutation(x)?C=s[g]:(C=ne({inputs:{x:s[g]},backend:e,attrs:{perm:x}}),f.push(C));let I=C.shape.slice();for(let v=0;v<y.length;++v)I.splice(y[v],0,1);b.arraysEqual(C.shape,I)||(C=$t({inputs:{x:C},backend:e,attrs:{shape:I}}),f.push(C)),m===null?m=C:(m=fi({inputs:{a:C,b:m},backend:e}),f.push(m))}h<p-1&&(a[h]>=0&&(m=ys({inputs:{x:m},backend:e,attrs:{axis:a[h]-(i.length-d),keepDims:!1}}),f.push(m)),d--)}for(let h of f)h!==m&&e.disposeIntermediateTensorInfo(h);return m}var Q0={kernelName:vp,backendName:"cpu",kernelFunc:HG};function KG(r){let{inputs:t,backend:e}=r,{dy:o,y:n}=t;K([o,n],"eluGrad");let s=new Float32Array(b.sizeFromShape(n.shape)),i=e.data.get(n.dataId).values,l=e.data.get(o.dataId).values;for(let u=0;u<i.length;++u){let a=i[u];a>=0?s[u]=l[u]:s[u]=l[u]*(a+1)}return e.makeTensorInfo(n.shape,"float32",s)}var J0={kernelName:Na,backendName:"cpu",kernelFunc:KG};var qG=w.ERF_P,jG=w.ERF_A1,XG=w.ERF_A2,YG=w.ERF_A3,ZG=w.ERF_A4,QG=w.ERF_A5,JG=xt(sn,r=>{let t=Math.sign(r),e=Math.abs(r),o=1/(1+qG*e);return t*(1-((((QG*o+ZG)*o+YG)*o+XG)*o+jG)*o*Math.exp(-e*e))}),tk={kernelName:sn,backendName:"cpu",kernelFunc:JG};function ru(r){let{inputs:t,backend:e,attrs:o}=r,{input:n}=t,{dim:s}=o,i=n.shape.length,l=n.shape.slice(),u=s;return s<0&&(b.assert(-(i+1)<=s,()=>`Axis must be in the interval [${-(i+1)}, ${i}]`),u=i+s+1),l.splice(u,0,1),$t({inputs:{x:n},backend:e,attrs:{shape:l}})}var ek={kernelName:Ps,backendName:"cpu",kernelFunc:ru};var tV=Ft((r,t)=>r/t),sc=Lt(on,tV),ac={kernelName:on,backendName:"cpu",kernelFunc:sc};function Fm(r,t,e){let o=r.shape,n=o[0],s=o[1],i=e.data.get(r.dataId),l=i.complexTensorInfos.real,u=i.complexTensorInfos.imag,a=[n,s],c=b.sizeFromShape(a),p=b.getTypedArrayFromDType("float32",c),m=b.getTypedArrayFromDType("float32",c);for(let g=0;g<n;g++){let x=Wr({inputs:{x:l},backend:e,attrs:{begin:[g,0],size:[1,s]}}),y=Wr({inputs:{x:u},backend:e,attrs:{begin:[g,0],size:[1,s]}}),C=ke({inputs:{real:x,imag:y},backend:e}),{real:I,imag:v}=eV(C,t,e),S=w.mergeRealAndImagArrays(I,v);for(let k=0;k<s;k++){let A=w.getComplexWithIndex(S,k);p[g*s+k]=A.real,m[g*s+k]=A.imag}e.disposeIntermediateTensorInfo(x),e.disposeIntermediateTensorInfo(y),e.disposeIntermediateTensorInfo(C)}let d=e.makeTensorInfo(a,"float32",p),f=e.makeTensorInfo(a,"float32",m),h=ke({inputs:{real:d,imag:f},backend:e});return e.disposeIntermediateTensorInfo(d),e.disposeIntermediateTensorInfo(f),h}function eV(r,t,e){let o=b.sizeFromShape(r.shape),n=e.data.get(r.dataId),s=e.data.get(n.complexTensorInfos.real.dataId).values,i=e.data.get(n.complexTensorInfos.imag.dataId).values;if(rV(o)){let l=Ly(s,i,o,t,e),u=[r.shape[0],r.shape[1]];if(t){let a=e.makeTensorInfo(u,"float32",l.real),c=e.makeTensorInfo(u,"float32",l.imag),p=e.makeTensorInfo([],"float32",b.createScalarValue(o,"float32")),m=Le({inputs:{x:p},backend:e}),d=ac.kernelFunc({inputs:{a,b:p},backend:e}),f=ac.kernelFunc({inputs:{a:c,b:m},backend:e}),h=e.data.get(d.dataId).values,g=e.data.get(f.dataId).values;return e.disposeIntermediateTensorInfo(a),e.disposeIntermediateTensorInfo(c),e.disposeIntermediateTensorInfo(p),e.disposeIntermediateTensorInfo(m),e.disposeIntermediateTensorInfo(d),e.disposeIntermediateTensorInfo(f),{real:h,imag:g}}return l}else{let l=w.mergeRealAndImagArrays(s,i),u=oV(l,o,t);return w.splitRealAndImagArrays(u)}}function rV(r){return(r&r-1)===0}function Ly(r,t,e,o,n){if(e===1)return{real:r,imag:t};let s=w.mergeRealAndImagArrays(r,t),i=e/2,l=w.complexWithEvenIndex(s),u=l.real,a=l.imag,c=[u.length],p=n.makeTensorInfo(c,"float32",u),m=n.makeTensorInfo(c,"float32",a),d=ke({inputs:{real:p,imag:m},backend:n}),f=w.complexWithOddIndex(s),h=f.real,g=f.imag,x=[h.length],y=n.makeTensorInfo(x,"float32",h),C=n.makeTensorInfo(x,"float32",g),I=ke({inputs:{real:y,imag:C},backend:n}),v=Ly(u,a,i,o,n),S=v.real,k=v.imag,A=[S.length],D=n.makeTensorInfo(A,"float32",S),F=n.makeTensorInfo(A,"float32",k),M=ke({inputs:{real:D,imag:F},backend:n}),B=Ly(h,g,i,o,n),U=B.real,P=B.imag,L=[U.length],z=n.makeTensorInfo(L,"float32",U),V=n.makeTensorInfo(L,"float32",P),W=ke({inputs:{real:z,imag:V},backend:n}),q=w.exponents(e,o),X=[q.real.length],J=n.makeTensorInfo(X,"float32",q.real),tt=n.makeTensorInfo(X,"float32",q.imag),Y=ke({inputs:{real:J,imag:tt},backend:n}),Q=fi({inputs:{a:Y,b:W},backend:n}),ot=wo({inputs:{a:M,b:Q},backend:n}),at=oc({inputs:{a:M,b:Q},backend:n}),st=Ur({inputs:{input:ot},backend:n}),mt=Ur({inputs:{input:at},backend:n}),dt=vo({inputs:{input:ot},backend:n}),It=vo({inputs:{input:at},backend:n}),wt=sa({inputs:[st,mt],backend:n,attrs:{axis:0}}),Rt=sa({inputs:[dt,It],backend:n,attrs:{axis:0}}),Ot=n.data.get(wt.dataId).values,Tt=n.data.get(Rt.dataId).values;return n.disposeIntermediateTensorInfo(p),n.disposeIntermediateTensorInfo(m),n.disposeIntermediateTensorInfo(d),n.disposeIntermediateTensorInfo(y),n.disposeIntermediateTensorInfo(C),n.disposeIntermediateTensorInfo(I),n.disposeIntermediateTensorInfo(D),n.disposeIntermediateTensorInfo(F),n.disposeIntermediateTensorInfo(M),n.disposeIntermediateTensorInfo(z),n.disposeIntermediateTensorInfo(V),n.disposeIntermediateTensorInfo(W),n.disposeIntermediateTensorInfo(J),n.disposeIntermediateTensorInfo(tt),n.disposeIntermediateTensorInfo(Y),n.disposeIntermediateTensorInfo(Q),n.disposeIntermediateTensorInfo(ot),n.disposeIntermediateTensorInfo(at),n.disposeIntermediateTensorInfo(st),n.disposeIntermediateTensorInfo(dt),n.disposeIntermediateTensorInfo(mt),n.disposeIntermediateTensorInfo(It),n.disposeIntermediateTensorInfo(wt),n.disposeIntermediateTensorInfo(Rt),{real:Ot,imag:Tt}}function oV(r,t,e){let o=new Float32Array(t*2);for(let n=0;n<t;n++){let s=0,i=0;for(let l=0;l<t;l++){let u=w.exponent(n*l,t,e),a=w.getComplexWithIndex(r,l);s+=a.real*u.real-a.imag*u.imag,i+=a.real*u.imag+a.imag*u.real}e&&(s/=t,i/=t),w.assignToTypedArray(o,s,i,n)}return o}function nV(r){let{inputs:t,backend:e}=r,{input:o}=t,n=b.sizeFromShape(o.shape),s=o.shape[o.shape.length-1],i=n/s,l=$t({inputs:{x:o},backend:e,attrs:{shape:[i,s]}}),u=Fm(l,!1,e),a=$t({inputs:{x:u},backend:e,attrs:{shape:o.shape}});return e.disposeIntermediateTensorInfo(l),e.disposeIntermediateTensorInfo(u),a}var rk={kernelName:hl,backendName:"cpu",kernelFunc:nV};function ic(r){let{backend:t,attrs:e}=r,{shape:o,value:n,dtype:s}=e,i=s||b.inferDtype(n),l=b.getArrayFromDType(i,b.sizeFromShape(o));return sV(l,n,i),t.makeTensorInfo(o,i,l)}var ok={kernelName:Os,backendName:"cpu",kernelFunc:ic};function sV(r,t,e){r.fill(t)}var nk={kernelName:Aa,backendName:"cpu",kernelFunc:({inputs:r,attrs:t,backend:e})=>{let{image:o}=r,n=e,s=b.getTypedArrayFromDType(o.dtype,b.sizeFromShape(o.shape)),[i,l,u,a]=o.shape,c=n.data.get(o.dataId).values;for(let m=0;m<i;m++){let d=m*u*l*a;for(let f=0;f<l;f++){let h=f*(u*a);for(let g=0;g<u;g++){let x=g*a;for(let y=0;y<a;y++){let C=Math.round(u-g-1),I=d+h+x+y,v=c[I];if(C>=0&&C<u){let S=C*a,k=d+h+S+y;v=c[k]}s[I]=v}}}}return{dataId:n.write(s,o.shape,o.dtype),shape:o.shape,dtype:o.dtype}}};function aV(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,filter:s,bias:i,preluActivationWeights:l}=t,{strides:u,pad:a,dataFormat:c,dilations:p,dimRoundingMode:m,activation:d,leakyreluAlpha:f}=o,h=Oy({inputs:{x:n,filter:s},backend:e,attrs:{strides:u,pad:a,dataFormat:c,dilations:p,dimRoundingMode:m}});if(i){let g=h;if(c==="NCHW"&&i.shape.length===1&&i.shape[0]!==1){let x=$t({inputs:{x:i},backend:e,attrs:{shape:[i.shape[0],1,1]}});h=wo({inputs:{a:h,b:x},backend:e}),e.disposeIntermediateTensorInfo(x)}else h=wo({inputs:{a:h,b:i},backend:e});e.disposeIntermediateTensorInfo(g)}if(d){let g=h;if(c==="NCHW"&&d==="prelu"&&l.shape.length===1&&l.shape[0]!==1){let x=$t({inputs:{x:l},backend:e,attrs:{shape:[l.shape[0],1,1]}});h=Ii(e,h,d,x,f),e.disposeIntermediateTensorInfo(x)}else h=Ii(e,h,d,l,f);e.disposeIntermediateTensorInfo(g)}return h}var sk={kernelName:qa,backendName:"cpu",kernelFunc:aV};function iV(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,filter:s,bias:i,preluActivationWeights:l}=t,{strides:u,pad:a,dataFormat:c,dilations:p,dimRoundingMode:m,activation:d,leakyreluAlpha:f}=o,h=By({inputs:{x:n,filter:s},backend:e,attrs:{strides:u,pad:a,dataFormat:c,dilations:p,dimRoundingMode:m}});if(i){let g=h;h=wo({inputs:{a:h,b:i},backend:e}),e.disposeIntermediateTensorInfo(g)}if(d){let g=h;h=Ii(e,h,d,l,f),e.disposeIntermediateTensorInfo(g)}return h}var ak={kernelName:ja,backendName:"cpu",kernelFunc:iV};function lV(r){let{inputs:t,backend:e}=r,{params:o,indices:n}=t,s=b.sizeFromShape(o.shape),i=n.shape,l=i[i.length-1],[u,a,c,p]=w.prepareAndValidate(o,n);if(a===0)return e.makeTensorInfo(u,o.dtype,[]);let m=e.data.get(n.dataId).values,d=e.bufferSync(o),f=ym(m,d,o.dtype,a,l,c,p,o.shape,s);return e.makeTensorInfo(u,o.dtype,f.values)}var ik={kernelName:Ea,backendName:"cpu",kernelFunc:lV};function uV(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,indices:s}=t,{axis:i,batchDims:l}=o;K([n,s],"gatherV2");let u=b.parseAxisParam(i,n.shape)[0],a=e.data.get(s.dataId).values,c=n.shape[u];for(let I=0;I<a.length;++I){let v=a[I];b.assert(v<=c-1&&v>=0,()=>`GatherV2: the index value ${v} is not in [0, ${c-1}]`)}let p=l;l==null&&(p=0);let m=b.sizeFromShape(s.shape),d=w.segment_util.collectGatherOpShapeInfo(n,s,u,p),f=$t({inputs:{x:n},backend:e,attrs:{shape:[d.batchSize,d.outerSize,d.dimSize,d.sliceSize]}}),h=$t({inputs:{x:s},backend:e,attrs:{shape:[d.batchSize,m/d.batchSize]}}),g=[d.batchSize,d.outerSize,m/d.batchSize,d.sliceSize],x=e.bufferSync(h),y=e.bufferSync(f),C=Cm(y,x,g);return e.disposeIntermediateTensorInfo(f),e.disposeIntermediateTensorInfo(h),e.makeTensorInfo(d.outputShape,C.dtype,C.values)}var lk={kernelName:Bs,backendName:"cpu",kernelFunc:uV};function cV(r){let{inputs:t,backend:e}=r,{input:o}=t,n=b.sizeFromShape(o.shape),s=o.shape[o.shape.length-1],i=n/s,l=$t({inputs:{x:o},backend:e,attrs:{shape:[i,s]}}),u=Fm(l,!0,e),a=$t({inputs:{x:u},backend:e,attrs:{shape:o.shape}});return e.disposeIntermediateTensorInfo(l),e.disposeIntermediateTensorInfo(u),a}var uk={kernelName:gl,backendName:"cpu",kernelFunc:cV};var pV=xt(hn,r=>Number.isFinite(r)?1:0,"bool"),ck={kernelName:hn,backendName:"cpu",kernelFunc:pV};var mV=xt(gn,r=>Math.abs(r)===1/0?1:0,"bool"),pk={kernelName:gn,backendName:"cpu",kernelFunc:mV};var dV=xt(xn,r=>Number.isNaN(r)?1:0,"bool"),mk={kernelName:xn,backendName:"cpu",kernelFunc:dV};function fV(r){let{backend:t,attrs:e}=r,{start:o,stop:n,num:s}=e,i=Im(o,n,s);return t.makeTensorInfo([i.length],"float32",i)}var dk={kernelName:Ra,backendName:"cpu",kernelFunc:fV};var hV=xt(wn,r=>Math.log1p(r)),fk={kernelName:wn,backendName:"cpu",kernelFunc:hV};var gV=Ft((r,t)=>r&&t),xV=Lt(vn,gV,null,"bool"),hk={kernelName:vn,backendName:"cpu",kernelFunc:xV};var bV=xt(Sn,r=>r?0:1,"bool"),gk={kernelName:Sn,backendName:"cpu",kernelFunc:bV};var yV=Ft((r,t)=>r||t),CV=Lt(kn,yV,null,"bool"),xk={kernelName:kn,backendName:"cpu",kernelFunc:CV};function IV(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{depthRadius:s,bias:i,alpha:l,beta:u}=o;K(n,"LRN");let a=n.shape[3],c=a-1,p=e.data.get(n.dataId).values,m=b.sizeFromShape(n.shape),d=new Float32Array(m);function f(h){let g=h%a,x=h-g+Math.max(0,g-s),y=h-g+Math.min(g+s,c),C=0;for(;x<=y;x++){let I=p[x];C+=I*I}return C}for(let h=0;h<m;h++){let g=f(h),x=p[h]*Math.pow(i+l*g,-u);d[h]=x}return e.makeTensorInfo(n.shape,n.dtype,d)}var bk={kernelName:Tn,backendName:"cpu",kernelFunc:IV};function wV(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,y:s,dy:i}=t,{depthRadius:l,bias:u,alpha:a,beta:c}=o;K(i,"LRNGrad");let p=b.sizeFromShape(i.shape),m=i.shape[3],d=e.data.get(i.dataId).values,f=e.data.get(n.dataId).values,h=e.data.get(s.dataId).values,g=new Float32Array(p),x=p;for(let y=0;y<x;y++){let C=y%m,I=y-C+Math.max(0,C-l),v=y-C+Math.min(m,C+l+1),S=0;for(let k=I;k<v;k++)S+=Math.pow(f[k],2);S=a*S+u;for(let k=I;k<v;k++){let A=-2*a*c*f[k]*h[y]/S;y===k&&(A+=Math.pow(S,-c)),A*=d[y],g[k]+=A}}return e.makeTensorInfo(i.shape,n.dtype,g)}var yk={kernelName:Da,backendName:"cpu",kernelFunc:wV};function Uy(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{reductionIndices:s,keepDims:i}=o,l=e,u=n.shape,a=u.length,c=b.parseAxisParam(s,u),p=c,m=w.getAxesPermutation(p,a),d=l.data.get(n.dataId).values;if(m!=null){let I=new Array(a);for(let v=0;v<I.length;v++)I[v]=u[m[v]];d=Jl(d,u,n.dtype,m,I),p=w.getInnerMostAxes(p.length,a),u=I}K(n,"max"),w.assertAxesAreInnerMostDims("max",p,a);let[f,h]=w.computeOutAndReduceShapes(u,p),g=b.sizeFromShape(h),x=wm(d,g,f,n.dtype),y=l.write(x,f,n.dtype),C=f;return i&&(C=w.expandShapeToKeepDim(f,c)),{dataId:y,shape:C,dtype:n.dtype}}var Ck={kernelName:_n,backendName:"cpu",kernelFunc:Uy};function vV(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t;K(n,"maxPool");let{filterSize:s,strides:i,pad:l,dimRoundingMode:u}=o,a=1;b.assert(w.eitherStridesOrDilationsAreOne(i,a),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${i} and dilations '${a}'`);let c=w.computePool2DInfo(n.shape,s,i,a,l,u),p;if(c.filterWidth===1&&c.filterHeight===1&&b.arraysEqual(c.inShape,c.outShape))p=Le({inputs:{x:n},backend:e});else{let m=e.data.get(n.dataId).values,d=b.computeStrides(n.shape),f=eu(m,n.shape,n.dtype,d,c,"max");p=e.makeTensorInfo(c.outShape,n.dtype,f.values)}return p}var Ik={kernelName:An,backendName:"cpu",kernelFunc:vV};function SV(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{filterSize:s,strides:i,pad:l,dimRoundingMode:u,dataFormat:a}=o;K(n,"maxPool3d");let c=w.computePool3DInfo(n.shape,s,i,1,l,u,a),p=e.data.get(n.dataId).values,m=Dm(p,n.shape,n.dtype,b.computeStrides(n.shape),c,"max");return e.makeTensorInfo(m.shape,"float32",m.values)}var wk={kernelName:yl,backendName:"cpu",kernelFunc:SV};function kV(r){let{inputs:t,backend:e,attrs:o}=r,{dy:n,input:s}=t,{filterSize:i,strides:l,pad:u,dimRoundingMode:a}=o;K([n,s],"maxPool3DGrad");let c=w.computePool3DInfo(s.shape,i,l,1,u,a),p=e.bufferSync(s),m=x0(p,c),d=c.strideDepth,f=c.strideHeight,h=c.strideWidth,g=c.dilationDepth,x=c.dilationHeight,y=c.dilationWidth,C=c.effectiveFilterDepth,I=c.effectiveFilterHeight,v=c.effectiveFilterWidth,S=C-1-c.padInfo.front,k=v-1-c.padInfo.left,A=I-1-c.padInfo.top,D=gt(s.shape,"float32"),F=e.bufferSync(n);for(let M=0;M<c.batchSize;++M)for(let B=0;B<c.inChannels;++B)for(let U=0;U<c.inDepth;++U)for(let P=0;P<c.inHeight;++P)for(let L=0;L<c.inWidth;++L){let z=U-S,V=P-A,W=L-k,q=0;for(let X=0;X<C;X+=g){let J=(z+X)/d;if(!(J<0||J>=c.outDepth||Math.floor(J)!==J))for(let tt=0;tt<I;tt+=x){let Y=(V+tt)/f;if(!(Y<0||Y>=c.outHeight||Math.floor(Y)!==Y))for(let Q=0;Q<v;Q+=y){let ot=(W+Q)/h;if(ot<0||ot>=c.outWidth||Math.floor(ot)!==ot)continue;let at=C*I*v-1-m.get(M,J,Y,ot,B),st=X*I*v+tt*v+Q,mt=at===st?1:0;if(mt===0)continue;let dt=F.get(M,J,Y,ot,B);q+=dt*mt}}}D.set(q,M,U,P,L,B)}return e.makeTensorInfo(D.shape,D.dtype,D.values)}var vk={kernelName:Cl,backendName:"cpu",kernelFunc:kV};function TV(r){let{inputs:t,backend:e,attrs:o}=r,{dy:n,input:s,output:i}=t,l=s;K([s,i],"maxPoolGrad");let{filterSize:u,strides:a,pad:c,dimRoundingMode:p}=o,m=w.computePool2DInfo(l.shape,u,a,1,c,p),d=e.data.get(l.dataId).values,f=gt(m.outShape,l.dtype,Rm(d,l.shape,l.dtype,m).values),h=m.strideHeight,g=m.strideWidth,x=m.dilationHeight,y=m.dilationWidth,C=m.effectiveFilterHeight,I=m.effectiveFilterWidth,v=I-1-m.padInfo.left,S=C-1-m.padInfo.top,k=gt(l.shape,"float32"),A=e.data.get(n.dataId).values,D=gt(n.shape,"float32",A);for(let F=0;F<m.batchSize;++F)for(let M=0;M<m.inChannels;++M)for(let B=0;B<m.inHeight;++B)for(let U=0;U<m.inWidth;++U){let P=B-S,L=U-v,z=0;for(let V=0;V<C;V+=x){let W=(P+V)/h;if(!(W<0||W>=m.outHeight||Math.floor(W)!==W))for(let q=0;q<I;q+=y){let X=(L+q)/g;if(X<0||X>=m.outWidth||Math.floor(X)!==X)continue;let J=C*I-1-f.get(F,W,X,M),tt=V*I+q,Y=J===tt?1:0;if(Y===0)continue;let Q=D.get(F,W,X,M);z+=Q*Y}}k.set(z,F,B,U,M)}return e.makeTensorInfo(k.shape,k.dtype,k.values)}var Sk={kernelName:bl,backendName:"cpu",kernelFunc:TV};function kk(r,t,e,o,n){let s=b.computeStrides(t),i=eu(r,t,e,s,n,"max"),l=Rm(r,t,e,n,!0,o);return[i.values,l.values]}var Tk={kernelName:Il,backendName:"cpu",kernelFunc:({inputs:r,attrs:t,backend:e})=>{let{x:o}=r,{filterSize:n,strides:s,pad:i,includeBatchInIndex:l}=t,u=e;K(o,"MaxPoolWithArgmax");let a=u.data.get(o.dataId).values,c=w.computePool2DInfo(o.shape,n,s,[1,1],i),[p,m]=kk(a,o.shape,o.dtype,l,c),d=u.write(p,c.outShape,o.dtype),f=u.write(m,c.outShape,o.dtype);return[{dataId:d,shape:c.outShape,dtype:o.dtype},{dataId:f,shape:c.outShape,dtype:"int32"}]}};function _V(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s,keepDims:i}=o,l=b.parseAxisParam(s,n.shape),a=w.computeOutAndReduceShapes(n.shape,l)[1],c=b.sizeFromShape(a),p=[],m=e.makeTensorInfo([],"float32",new Float32Array([c]));p.push(m);let d=Gr({inputs:{x:n},backend:e,attrs:{dtype:"float32"}});p.push(d);let f=sc({inputs:{a:d,b:m},backend:e});p.push(f);let h=ys({inputs:{x:f},backend:e,attrs:{axis:s,keepDims:i}});return p.forEach(g=>e.disposeIntermediateTensorInfo(g)),h}var _k={kernelName:En,backendName:"cpu",kernelFunc:_V};function NV(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s,keepDims:i}=o;K(n,"min");let l=b.parseAxisParam(s,n.shape),u=l,a=w.getAxesPermutation(u,n.shape.length),c=n;a!=null&&(c=ne({inputs:{x:n},backend:e,attrs:{perm:a}}),u=w.getInnerMostAxes(u.length,n.shape.length)),w.assertAxesAreInnerMostDims("min",u,c.shape.length);let[p,m]=w.computeOutAndReduceShapes(c.shape,u),d=b.sizeFromShape(m),f=b.makeZerosTypedArray(b.sizeFromShape(p),c.dtype),h=e.data.get(c.dataId).values;for(let x=0;x<f.length;++x){let y=x*d,C=h[y];for(let I=0;I<d;++I){let v=h[y+I];(Number.isNaN(v)||v<C)&&(C=v)}f[x]=C}a!=null&&e.disposeIntermediateTensorInfo(c);let g=e.makeTensorInfo(p,c.dtype,f);if(i){let x=w.expandShapeToKeepDim(p,l),y=$t({inputs:{x:g},backend:e,attrs:{shape:x}});return e.disposeIntermediateTensorInfo(g),y}return g}var Nk={kernelName:Rn,backendName:"cpu",kernelFunc:NV};function AV(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{paddings:s,mode:i}=o;K(n,"mirrorPad");let l=s.map((C,I)=>C[0]+n.shape[I]+C[1]),u=s.map(C=>C[0]),a=s.map((C,I)=>C[0]+n.shape[I]),c=i==="reflect"?0:1,p=e.data.get(n.dataId).values,m=n.shape.length,d=b.computeStrides(n.shape),f=b.sizeFromShape(l),h=l.length,g=b.computeStrides(l),x=b.getTypedArrayFromDType(n.dtype,f);for(let C=0;C<f;C++){let I=b.indexToLoc(C,h,g);for(let S=0;S<h;S++)I[S]<u[S]?I[S]=u[S]*2-I[S]-c:I[S]>=a[S]&&(I[S]=(a[S]-1)*2-I[S]+c);I=I.map((S,k)=>S-u[k]);let v=b.locToIndex(I,m,d);x[C]=p[v]}return{dataId:e.write(x,l,n.dtype),shape:l,dtype:n.dtype}}var Ak={kernelName:Fn,backendName:"cpu",kernelFunc:AV};var EV=Ft((r,t)=>{let e=r%t;return r<0&&t<0||r>=0&&t>=0?e:(e+t)%t}),RV=Lt($n,EV),Ek={kernelName:$n,backendName:"cpu",kernelFunc:RV};var Dk=$u(Tv());function Gy(r){let{inputs:t,backend:e,attrs:o}=r,{logits:n}=t,{dim:s}=o,i=n.shape.length,l=s;if(l===-1&&(l=i-1),l!==i-1)throw Error(`Softmax along a non-last dimension is not yet supported. Logits was rank ${i} and dim was ${l}`);let u=b.parseAxisParam([l],n.shape),a=Uy({inputs:{x:n},backend:e,attrs:{reductionIndices:u,keepDims:!1}}),c=w.expandShapeToKeepDim(a.shape,u),p=$t({inputs:{x:a},backend:e,attrs:{shape:c}}),m=oc({inputs:{a:n,b:p},backend:e}),d=uy({inputs:{x:m},backend:e}),f=ys({inputs:{x:d},backend:e,attrs:{axis:u,keepDims:!1}}),h=$t({inputs:{x:f},backend:e,attrs:{shape:c}}),g=sc({inputs:{a:d,b:h},backend:e});return e.disposeIntermediateTensorInfo(a),e.disposeIntermediateTensorInfo(p),e.disposeIntermediateTensorInfo(m),e.disposeIntermediateTensorInfo(d),e.disposeIntermediateTensorInfo(f),e.disposeIntermediateTensorInfo(h),g}var Rk={kernelName:ns,backendName:"cpu",kernelFunc:Gy};function DV(r){let{inputs:t,backend:e,attrs:o}=r,{logits:n}=t,{numSamples:s,seed:i,normalized:l}=o;K(n,"multinomial");let u=l?n:Gy({inputs:{logits:n},backend:e,attrs:{dim:-1}}),a=u.shape[0],c=u.shape[1],p=e.data.get(u.dataId).values,m=[a,s],d=b.makeZerosTypedArray(b.sizeFromShape(m),"int32");for(let f=0;f<a;++f){let h=f*c,g=new Float32Array(c-1);g[0]=p[h];for(let C=1;C<g.length;++C)g[C]=g[C-1]+p[h+C];let x=Dk.alea(i.toString()),y=f*s;for(let C=0;C<s;++C){let I=x();d[y+C]=g.length;for(let v=0;v<g.length;v++)if(I<g[v]){d[y+C]=v;break}}}return l||e.disposeIntermediateTensorInfo(u),e.makeTensorInfo(m,"int32",d)}var Fk={kernelName:Fa,backendName:"cpu",kernelFunc:DV};var FV=Be.nonMaxSuppressionV3Impl;function $V(r){let{inputs:t,backend:e,attrs:o}=r,{boxes:n,scores:s}=t,{maxOutputSize:i,iouThreshold:l,scoreThreshold:u}=o;K(n,"NonMaxSuppression");let a=e.data.get(n.dataId).values,c=e.data.get(s.dataId).values,{selectedIndices:p}=FV(a,c,i,l,u);return e.makeTensorInfo([p.length],"int32",new Int32Array(p))}var $k={kernelName:$a,backendName:"cpu",kernelFunc:$V};var MV=Be.nonMaxSuppressionV4Impl;function PV(r){let{inputs:t,backend:e,attrs:o}=r,{boxes:n,scores:s}=t,{maxOutputSize:i,iouThreshold:l,scoreThreshold:u,padToMaxOutputSize:a}=o;K(n,"NonMaxSuppressionPadded");let c=e.data.get(n.dataId).values,p=e.data.get(s.dataId).values,{selectedIndices:m,validOutputs:d}=MV(c,p,i,l,u,a);return[e.makeTensorInfo([m.length],"int32",new Int32Array(m)),e.makeTensorInfo([],"int32",new Int32Array([d]))]}var Mk={kernelName:Ma,backendName:"cpu",kernelFunc:PV};var OV=Be.nonMaxSuppressionV5Impl;function BV(r){let{inputs:t,backend:e,attrs:o}=r,{boxes:n,scores:s}=t,{maxOutputSize:i,iouThreshold:l,scoreThreshold:u,softNmsSigma:a}=o;K(n,"NonMaxSuppressionWithScore");let c=e.data.get(n.dataId).values,p=e.data.get(s.dataId).values,m=i,d=l,f=u,h=a,{selectedIndices:g,selectedScores:x}=OV(c,p,m,d,f,h);return[e.makeTensorInfo([g.length],"int32",new Int32Array(g)),e.makeTensorInfo([x.length],"float32",new Float32Array(x))]}var Pk={kernelName:Pa,backendName:"cpu",kernelFunc:BV};function LV(r){let{inputs:t,backend:e,attrs:o}=r,{indices:n}=t,{dtype:s,depth:i,onValue:l,offValue:u}=o;K(n,"oneHot");let a=b.sizeFromShape(n.shape),c=new Float32Array(a*i);c.fill(u);let p=e.data.get(n.dataId).values;for(let m=0;m<a;++m)p[m]>=0&&p[m]<i&&(c[m*i+p[m]]=l);return e.makeTensorInfo([...n.shape,i],s,c)}var Ok={kernelName:On,backendName:"cpu",kernelFunc:LV};function lc(r){let{inputs:t,backend:e}=r,{x:o}=t;if(o.dtype==="string")throw new Error("zerosLike is not supported for string tensors");if(o.dtype==="complex64"){let n=Ur({inputs:{input:o},backend:e}),s=lc({inputs:{x:n},backend:e}),i=vo({inputs:{input:o},backend:e}),l=lc({inputs:{x:i},backend:e}),u=ke({inputs:{real:s,imag:l},backend:e});return e.disposeIntermediateTensorInfo(n),e.disposeIntermediateTensorInfo(s),e.disposeIntermediateTensorInfo(i),e.disposeIntermediateTensorInfo(l),u}else return ic({backend:e,attrs:{shape:o.shape,value:0,dtype:o.dtype}})}var Bk={kernelName:Xs,backendName:"cpu",kernelFunc:lc};function Lk(r){let{inputs:t,backend:e}=r,{x:o}=t;if(o.dtype==="string")throw new Error("onesLike is not supported for string tensors");if(o.dtype==="complex64"){let n=Ur({inputs:{input:o},backend:e}),s=Lk({inputs:{x:n},backend:e}),i=vo({inputs:{input:o},backend:e}),l=lc({inputs:{x:i},backend:e}),u=ke({inputs:{real:s,imag:l},backend:e});return e.disposeIntermediateTensorInfo(n),e.disposeIntermediateTensorInfo(s),e.disposeIntermediateTensorInfo(i),e.disposeIntermediateTensorInfo(l),u}else return ic({backend:e,attrs:{shape:o.shape,value:1,dtype:o.dtype}})}var Uk={kernelName:Us,backendName:"cpu",kernelFunc:Lk};function Vy(r){let{inputs:t,backend:e,attrs:o}=r,{axis:n}=o;if(t.length===1)return ru({inputs:{input:t[0]},backend:e,attrs:{dim:n}});let s=t[0].shape,i=t[0].dtype;t.forEach(c=>{b.assertShapesMatch(s,c.shape,"All tensors passed to stack must have matching shapes"),b.assert(i===c.dtype,()=>"All tensors passed to stack must have matching dtypes")});let l=[],u=t.map(c=>{let p=ru({inputs:{input:c},backend:e,attrs:{dim:n}});return l.push(p),p}),a=sa({inputs:u,backend:e,attrs:{axis:n}});return l.forEach(c=>e.disposeIntermediateTensorInfo(c)),a}var Gk={kernelName:Gs,backendName:"cpu",kernelFunc:Vy};function UV(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{paddings:s,constantValue:i}=o;K(n,"pad");let l=s.map((y,C)=>y[0]+n.shape[C]+y[1]),u=s.map(y=>y[0]),a=e.data.get(n.dataId).values,c=b.sizeFromShape(n.shape),p=n.shape.length,m=b.computeStrides(n.shape),d=b.sizeFromShape(l),f=l.length,h=b.computeStrides(l),g=b.getTypedArrayFromDType(n.dtype,d);i!==0&&g.fill(i);for(let y=0;y<c;y++){let I=b.indexToLoc(y,p,m).map((S,k)=>S+u[k]),v=b.locToIndex(I,f,h);g[v]=a[y]}return{dataId:e.write(g,l,n.dtype),shape:l,dtype:n.dtype}}var $m={kernelName:Bn,backendName:"cpu",kernelFunc:UV};var GV=Ft((r,t)=>Math.pow(r,t)),VV=Lt(Ln,GV),Vk={kernelName:Ln,backendName:"cpu",kernelFunc:VV};function WV(r){let{inputs:t,backend:e,attrs:o}=r,{paramsNestedSplits:n,paramsDenseValues:s,indices:i}=t,{outputRaggedRank:l}=o,u=n.map(x=>e.data.get(x.dataId).values),a=n.map(x=>x.shape),c=e.data.get(s.dataId).values,p=e.data.get(i.dataId).values,[m,d,f]=vm(u,a,c,s.shape,s.dtype,p,i.shape,l),h=m.map(x=>e.makeTensorInfo([x.length],"int32",x)),g=e.makeTensorInfo(f,s.dtype,d);return h.concat([g])}var Wk={kernelName:Sp,backendName:"cpu",kernelFunc:WV};function zV(r){let{inputs:t,backend:e}=r,{starts:o,limits:n,deltas:s}=t,i=e.data.get(o.dataId).values,l=e.data.get(n.dataId).values,u=e.data.get(s.dataId).values,[a,c]=Sm(i,o.shape,o.dtype,l,n.shape,u,s.shape),p=e.makeTensorInfo([a.length],"int32",a),m=e.makeTensorInfo([c.length],o.dtype,c);return[p,m]}var zk={kernelName:kp,backendName:"cpu",kernelFunc:zV};function HV(r){let{inputs:t,backend:e,attrs:o}=r,{shape:n,values:s,defaultValue:i,rowPartitionTensors:l}=t,{rowPartitionTypes:u}=o,a=e.data.get(n.dataId).values,c=e.data.get(s.dataId).values,p=e.data.get(i.dataId).values,m=l.map(g=>e.data.get(g.dataId).values),d=l.map(g=>g.shape),[f,h]=km(a,n.shape,c,s.shape,s.dtype,p,i.shape,m,d,u);return e.makeTensorInfo(f,s.dtype,h)}var Hk={kernelName:Tp,backendName:"cpu",kernelFunc:HV};function KV(r){let{backend:t,attrs:e}=r,{start:o,stop:n,dtype:s,step:i}=e,l=hi(o,n,i,s);return t.makeTensorInfo([l.length],s,l)}var Kk={kernelName:wl,backendName:"cpu",kernelFunc:KV};var qV=xt(Vn,r=>1/r),qk={kernelName:Vn,backendName:"cpu",kernelFunc:qV};function jV(r){let{inputs:t,backend:e,attrs:o}=r,{images:n}=t,{alignCorners:s,halfPixelCenters:i,size:l}=o;K(n,"resizeBilinear");let u=b.computeStrides(n.shape),[a,c]=l,[p,m,d,f]=n.shape,h=e.data.get(n.dataId).values,g=new Float32Array(b.sizeFromShape([p,a,c,f])),x=[s&&a>1?m-1:m,s&&c>1?d-1:d],y=[s&&a>1?a-1:a,s&&c>1?c-1:c],C=0,I=x[0]/y[0],v=x[1]/y[1];for(let S=0;S<p;S++)for(let k=0;k<a;k++){let A;i?A=I*(k+.5)-.5:A=I*k;let D=Math.max(0,Math.floor(A)),F=A-D,M=Math.min(m-1,Math.ceil(A)),B=S*u[0]+D*u[1],U=S*u[0]+M*u[1];for(let P=0;P<c;P++){let L;i?L=v*(P+.5)-.5:L=v*P;let z=Math.max(0,Math.floor(L)),V=L-z,W=Math.min(d-1,Math.ceil(L)),q=B+z*u[2],X=U+z*u[2],J=B+W*u[2],tt=U+W*u[2];for(let Y=0;Y<f;Y++){let Q=h[q+Y],ot=h[X+Y],at=h[J+Y],st=h[tt+Y],mt=Q+(at-Q)*V,dt=ot+(st-ot)*V,It=mt+(dt-mt)*F;g[C++]=It}}}return e.makeTensorInfo([p,a,c,f],"float32",g)}var jk={kernelName:Hn,backendName:"cpu",kernelFunc:jV};function XV(r){let{inputs:t,backend:e,attrs:o}=r,{images:n,dy:s}=t,{alignCorners:i}=o;K([s,n],"resizeBilinearGrad");let l=b.computeStrides(n.shape),[u,a,c,p]=n.shape,[,m,d]=s.shape,f=new Float32Array(u*a*c*p),h=[i&&m>1?a-1:a,i&&d>1?c-1:c],g=[i&&m>1?m-1:m,i&&d>1?d-1:d],x=h[0]/g[0],y=h[1]/g[1],C=e.data.get(s.dataId).values,I=0;for(let v=0;v<u;v++){let S=v*l[0];for(let k=0;k<m;k++){let A=k*x,D=Math.floor(A),F=Math.min(Math.ceil(A),a-1),M=S+D*l[1],B=S+F*l[1],U=A-D,P=1-U;for(let L=0;L<d;L++){let z=L*y,V=Math.floor(z),W=Math.min(Math.ceil(z),c-1),q=z-V,X=1-q,J=M+V*l[2],tt=M+W*l[2],Y=B+V*l[2],Q=B+W*l[2],ot=P*X,at=P*q,st=U*X,mt=U*q;for(let dt=0;dt<p;dt++){let It=C[I++];f[J+dt]+=It*ot,f[tt+dt]+=It*at,f[Y+dt]+=It*st,f[Q+dt]+=It*mt}}}}return e.makeTensorInfo([u,c,a,p],"float32",f)}var Xk={kernelName:Ba,backendName:"cpu",kernelFunc:XV};function YV(r){let{inputs:t,backend:e,attrs:o}=r,{images:n}=t,{alignCorners:s,halfPixelCenters:i,size:l}=o;K(n,"resizeNearestNeighbor");let u=b.computeStrides(n.shape),[a,c]=l,[p,m,d,f]=n.shape,h=e.data.get(n.dataId).values,g=new Float32Array(p*a*c*f),x=[s&&a>1?m-1:m,s&&c>1?d-1:d],y=[s&&a>1?a-1:a,s&&c>1?c-1:c],C=x[0]/y[0],I=x[1]/y[1],v=0;for(let S=0;S<p;S++){let k=S*u[0];for(let A=0;A<a;A++){let D=i?C*(A+.5):C*A,F=Math.min(m-1,s?Math.round(D):Math.floor(D));i&&(F=Math.max(0,F));let M=k+F*u[1];for(let B=0;B<c;B++){let U=i?I*(B+.5):I*B,P=Math.min(d-1,s?Math.round(U):Math.floor(U));i&&(P=Math.max(0,P));let L=M+P*u[2];for(let z=0;z<f;z++){let V=h[L+z];g[v++]=V}}}}return e.makeTensorInfo([p,a,c,f],n.dtype,g)}var Yk={kernelName:zn,backendName:"cpu",kernelFunc:YV};function ZV(r){let{inputs:t,backend:e,attrs:o}=r,{images:n,dy:s}=t,{alignCorners:i}=o;K([s,n],"resizeNearestNeighborGrad");let l=b.computeStrides(n.shape),u=b.computeStrides(s.shape),[a,c,p,m]=n.shape,[,d,f]=s.shape,h=new Float32Array(a*c*p*m),g=e.data.get(s.dataId).values,x=[i&&d>1?c-1:c,i&&f>1?p-1:p],y=[i&&d>1?d-1:d,i&&f>1?f-1:f],C=x[0]/y[0],I=x[1]/y[1],v=1/C,S=1/I,k=Math.ceil(v)*2+2,A=Math.ceil(S)*2+2;for(let D=0;D<a;D++){let F=D*l[0];for(let M=0;M<c;M++){let B=F+M*l[1],U=Math.floor(M*v),P=Math.floor(U-k/2);for(let L=0;L<p;L++){let z=B+L*l[2],V=Math.floor(L*S),W=Math.floor(V-A/2);for(let q=0;q<m;q++){let X=0;for(let J=0;J<k;J++){let tt=J+P;if(tt<0||tt>=d)continue;let Y=F+tt*u[1],Q=tt*C,ot=Math.min(c-1,i?Math.round(Q):Math.floor(Q));if(M===ot)for(let at=0;at<A;at++){let st=at+W;if(st<0||st>=f)continue;let mt=Y+st*u[2],dt=st*I,It=Math.min(p-1,i?Math.round(dt):Math.floor(dt));L===It&&(X+=g[mt+q])}}h[z+q]=X}}}}return e.makeTensorInfo(n.shape,n.dtype,h)}var Zk={kernelName:Oa,backendName:"cpu",kernelFunc:ZV};function QV(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{dims:s}=o;K(n,"reverse");let i=n.shape.length,l=b.parseAxisParam(s,n.shape);if(i===0)return Le({inputs:{x:n},backend:e});let u=new qt(n.shape,n.dtype),a=e.bufferSync(n);for(let c=0;c<u.size;c++){let p=u.indexToLoc(c),m=p.slice();l.forEach(d=>m[d]=n.shape[d]-1-m[d]),u.set(a.get(...m),...p)}return e.makeTensorInfo(u.shape,u.dtype,u.values)}var Qk={kernelName:qn,backendName:"cpu",kernelFunc:QV};var Jk={kernelName:Ha,backendName:"cpu",kernelFunc:({inputs:r,attrs:t,backend:e})=>{let{image:o}=r,{radians:n,fillValue:s,center:i}=t,l=e,u=b.getTypedArrayFromDType(o.dtype,b.sizeFromShape(o.shape)),[a,c,p,m]=o.shape,[d,f]=w.getImageCenter(i,c,p),h=255,g=Math.sin(n),x=Math.cos(n),y=l.data.get(o.dataId).values;for(let I=0;I<a;I++){let v=I*p*c*m;for(let S=0;S<c;S++){let k=S*(p*m);for(let A=0;A<p;A++){let D=A*m;for(let F=0;F<m;F++){let M=[a,S,A,F],B=M[2],U=M[1],P=(B-d)*x-(U-f)*g,L=(B-d)*g+(U-f)*x;P=Math.round(P+d),L=Math.round(L+f);let z=s;if(typeof s!="number"&&(F===3?z=h:z=s[F]),P>=0&&P<p&&L>=0&&L<c){let W=L*(p*m),q=P*m,X=v+W+q+F;z=y[X]}let V=v+k+D+F;u[V]=z}}}}return{dataId:l.write(u,o.shape,o.dtype),shape:o.shape,dtype:o.dtype}}};var JV=xt(jn,r=>{let t=Math.floor(r);return r-t<.5?Math.floor(r):r-t>.5?Math.ceil(r):t%2===0?t:t+1}),t1={kernelName:jn,backendName:"cpu",kernelFunc:JV};function tW(r){let{inputs:t,backend:e,attrs:o}=r,{indices:n,updates:s}=t,{shape:i}=o,{sliceRank:l,numUpdates:u,sliceSize:a,strides:c,outputSize:p}=w.calculateShapes(s,n,i),m=!0,d=e.bufferSync(n),f=e.bufferSync(s),h=so(d,f,i,p,a,u,l,c,0,m);return e.makeTensorInfo(i,h.dtype,h.values)}var e1={kernelName:La,backendName:"cpu",kernelFunc:tW};function eW(r,t){let e=0,o=r.length,n=0;for(;e<o;)n=Math.floor((e+o)/2),r[n]<t?e=n+1:o=n;return o}function rW(r,t){let e=0,o=r.length,n=0;for(;e<o;)n=Math.floor((e+o)/2),r[n]<=t?e=n+1:o=n;return o}function r1(r,t,e,o,n,s){let i=b.getArrayFromDType("int32",e*n);for(let l=0;l<e;++l){let u=r.slice(l*o,(l+1)*o),a=l*n;for(let c=0;c<n;++c)i[a+c]=s==="left"?eW(u,t[c+a]):rW(u,t[c+a])}return i}function oW(r){let{inputs:t,backend:e,attrs:o}=r,{sortedSequence:n,values:s}=t,{side:i}=o,l=e.data.get(n.dataId).values,u=e.data.get(s.dataId).values,a=r1(l,u,n.shape[0],n.shape[1],s.shape[1],i);return e.makeTensorInfo(s.shape,"int32",a)}var o1={kernelName:Ga,backendName:"cpu",kernelFunc:oW};function nW(r){let{inputs:t,backend:e}=r,{condition:o,t:n,e:s}=t;K([o,n,s],"select");let i=o.shape.length,l=e.data.get(o.dataId).values,u=e.data.get(n.dataId).values,a=e.data.get(s.dataId).values,c=be(n.dtype,s.dtype),p=b.makeZerosTypedArray(b.sizeFromShape(n.shape),c),m=0,d=i===0||i>1||n.shape.length===1?1:b.sizeFromShape(n.shape.slice(1));for(let f=0;f<l.length;f++)for(let h=0;h<d;h++)l[f]===1?p[m++]=u[f]:p[m++]=a[f];return e.makeTensorInfo(n.shape,c,p)}var n1={kernelName:Ws,backendName:"cpu",kernelFunc:nW};var sW=w.SELU_SCALEALPHA,aW=w.SELU_SCALE,iW=xt(Yn,r=>r>=0?aW*r:sW*(Math.exp(r)-1)),s1={kernelName:Yn,backendName:"cpu",kernelFunc:iW};var lW=xt(Jn,r=>r<0?-1:r>0?1:0),a1={kernelName:Jn,backendName:"cpu",kernelFunc:lW};var uW=xt(Zn,r=>Math.sin(r)),i1={kernelName:Zn,backendName:"cpu",kernelFunc:uW};var cW=xt(Qn,r=>Math.sinh(r)),l1={kernelName:Qn,backendName:"cpu",kernelFunc:cW};var pW=11920928955078125e-23,u1=Math.log(pW)+2,mW=xt(es,r=>{let t=r>-u1,e=r<u1,o=Math.exp(r),n;return e?n=o:t?n=r:n=Math.log(1+o),n}),c1={kernelName:es,backendName:"cpu",kernelFunc:mW};function dW(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{blockShape:s,paddings:i}=o;K([n],"spaceToBatchND");let l=b.sizeFromShape(s),u=[[0,0]];u.push(...i);for(let S=1+s.length;S<n.shape.length;++S)u.push([0,0]);let a=$m.kernelFunc({inputs:{x:n},backend:e,attrs:{paddings:u,constantValue:0}}),c=w.getReshaped(a.shape,s,l,!1),p=w.getPermuted(c.length,s.length,!1),m=w.getReshapedPermuted(a.shape,s,l,!1),h=$t({inputs:{x:a},backend:e,attrs:{shape:c}}),y=ne({inputs:{x:h},backend:e,attrs:{perm:p}}),v=$t({inputs:{x:y},backend:e,attrs:{shape:m}});return e.disposeIntermediateTensorInfo(a),e.disposeIntermediateTensorInfo(h),e.disposeIntermediateTensorInfo(y),v}var p1={kernelName:Hs,backendName:"cpu",kernelFunc:dW};function fW(r){let{inputs:t,backend:e}=r,{indices:o,values:n,denseShape:s,defaultValue:i}=t;if(s.shape.length!==1)throw new Error(`Dense shape must be a vector, saw:
        ${s.shape}`);if(o.shape.length!==2)throw new Error(`Indices must be a matrix, saw:
        ${o.shape}`);if(n.shape.length!==1)throw new Error(`Values must be a vector, saw:
        ${n.shape}`);if(i.shape.length!==0)throw new Error(`Default value must be a scalar, saw:
        ${i.shape}`);let l=e.data.get(o.dataId).values,u=e.data.get(n.dataId).values,a=e.data.get(s.dataId).values,c=e.data.get(i.dataId).values[0],[p,m,d,f,h]=Tm(l,o.shape,o.dtype,u,n.dtype,a,c);return[e.makeTensorInfo(m,o.dtype,p),e.makeTensorInfo([m[0]],n.dtype,d),e.makeTensorInfo([f.length],"bool",new Uint8Array(f.map(g=>Number(g)))),e.makeTensorInfo([h.length],o.dtype,new Int32Array(h))]}var m1={kernelName:Sl,backendName:"cpu",kernelFunc:fW};function hW(r){let{inputs:t,backend:e}=r,{inputIndices:o,inputShape:n,newShape:s}=t;if(o.shape.length!==2)throw new Error(`Input indices should be a matrix but received shape
        ${o.shape}`);if(n.shape.length!==1)throw new Error(`Input shape should be a vector but received shape
        ${n.shape}`);if(s.shape.length!==1)throw new Error(`Target shape should be a vector but received shape ${s.shape}`);let i=Array.from(e.data.get(n.dataId).values),l=e.data.get(o.dataId).values,u=Array.from(e.data.get(s.dataId).values),[a,c,p]=_m(l,o.shape,o.dtype,i,u);return[e.makeTensorInfo(c,o.dtype,a),e.makeTensorInfo([p.length],s.dtype,new Int32Array(p))]}var d1={kernelName:Va,backendName:"cpu",kernelFunc:hW};function gW(r){let{inputs:t,backend:e}=r,{data:o,indices:n,segmentIds:s}=t;if(o.shape.length<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(n.shape.length!==1)throw new Error(`Indices should be a vector but received shape
          ${n.shape}`);if(s.shape.length!==1)throw new Error(`Segment ids should be a vector but received shape
          ${s.shape}`);if(n.shape[0]!==s.shape[0])throw new Error("segmentIds and indices should have same size.");let i=e.data.get(o.dataId).values,l=e.data.get(n.dataId).values,u=e.data.get(s.dataId).values,[a,c]=tu(i,o.shape,o.dtype,l,u,!0);return e.makeTensorInfo(c,o.dtype,a)}var f1={kernelName:kl,backendName:"cpu",kernelFunc:gW};function xW(r){let{inputs:t,backend:e}=r,{data:o,indices:n,segmentIds:s}=t;if(o.shape.length<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(n.shape.length!==1)throw new Error(`Indices should be a vector but received shape
         ${n.shape}`);if(s.shape.length!==1)throw new Error(`Segment ids should be a vector but received shape
         ${s.shape}`);if(n.shape[0]!==s.shape[0])throw new Error("segmentIds and indices should have same size.");let i=e.data.get(o.dataId).values,l=e.data.get(n.dataId).values,u=e.data.get(s.dataId).values,[a,c]=tu(i,o.shape,o.dtype,l,u);return e.makeTensorInfo(c,o.dtype,a)}var h1={kernelName:Tl,backendName:"cpu",kernelFunc:xW};function bW(r){let{inputs:t,backend:e,attrs:o}=r,{sparseIndices:n,sparseValues:s,defaultValue:i}=t,{outputShape:l}=o,{sliceRank:u,numUpdates:a,sliceSize:c,strides:p,outputSize:m}=w.calculateShapes(s,n,l),d=!1,f=e.bufferSync(n),h;switch(s.dtype){case"bool":{let g=e.bufferSync(s),x=!!e.data.get(i.dataId).values[0];h=so(f,g,l,m,c,a,u,p,x,d);break}case"float32":{let g=e.bufferSync(s),x=e.data.get(i.dataId).values[0];h=so(f,g,l,m,c,a,u,p,x,d);break}case"int32":{let g=e.bufferSync(s),x=e.data.get(i.dataId).values[0];h=so(f,g,l,m,c,a,u,p,x,d);break}case"string":{let g=e.bufferSync(s),x=b.decodeString(e.data.get(i.dataId).values[0]);h=so(f,g,l,m,c,a,u,p,x,d);break}default:throw new Error(`Unsupported type ${s.dtype}`)}return e.makeTensorInfo(l,h.dtype,h.values)}var g1={kernelName:Wa,backendName:"cpu",kernelFunc:bW};function yW(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{numOrSizeSplits:s,axis:i}=o,l=b.parseAxisParam(i,n.shape)[0],u=w.prepareSplitSize(n,s,l),a=new Array(n.shape.length).fill(0),c=n.shape.slice();return u.map(p=>{let m=[...c];m[l]=p;let d=Wr({inputs:{x:n},backend:e,attrs:{begin:a,size:m}});return a[l]+=p,d})}var x1={kernelName:Ks,backendName:"cpu",kernelFunc:yW};var b1={kernelName:_l,backendName:"cpu",kernelFunc:({inputs:r,backend:t})=>{let{x:e}=r,o=t;K(e,"square");let n=o.data.get(e.dataId).values,s=new Float32Array(n.length);for(let l=0;l<n.length;++l){let u=n[l];s[l]=u*u}return{dataId:o.write(s,e.shape,e.dtype),shape:e.shape,dtype:e.dtype}}};var CW=xt(bo,(r,t)=>{let e=t;return isNaN(r)?NaN:r>0?1:e.alpha}),y1={kernelName:bo,backendName:"cpu",kernelFunc:CW};function IW(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{begin:s,end:i,strides:l,beginMask:u,endMask:a,ellipsisMask:c,newAxisMask:p,shrinkAxisMask:m}=o;K(n,"stridedSlice");let{finalShapeSparse:d,finalShape:f,isIdentity:h,sliceDim0:g,isSimpleSlice:x,begin:y,end:C,strides:I}=oe.sliceInfo(n.shape,s,i,l,u,a,c,p,m),v;if(h)v=$t({inputs:{x:n},backend:e,attrs:{shape:f}});else if(g||x){b.assert(n.shape.length>=1,()=>`Input must have rank at least 1, got: ${n.shape.length}`);let S=oe.computeOutShape(y,C,I),k=Wr({inputs:{x:n},backend:e,attrs:{begin:y,size:S}});v=$t({inputs:{x:k},backend:e,attrs:{shape:f}}),e.disposeIntermediateTensorInfo(k)}else{let S=e.bufferSync(n),k=Nm(d,S,I,y);v=e.makeTensorInfo(f,k.dtype,k.values)}return v}var C1={kernelName:as,backendName:"cpu",kernelFunc:IW};function wW(r){let{inputs:t,backend:e,attrs:o}=r,{separator:n,nGramWidths:s,leftPad:i,rightPad:l,padWidth:u,preserveShortSequences:a}=o,{data:c,dataSplits:p}=t,m=e.data.get(c.dataId).values,d=e.data.get(p.dataId).values,[f,h]=xi(m,d,n,s,i,l,u,a);return[e.makeTensorInfo([f.length],"string",f),e.makeTensorInfo(p.shape,"int32",h)]}var I1={kernelName:Nl,backendName:"cpu",kernelFunc:wW};function vW(r){let{inputs:t,backend:e,attrs:o}=r,{skipEmpty:n}=o,{input:s,delimiter:i}=t;if(s.dtype!=="string")throw new Error("Input must be of datatype string");if(s.shape.length!==1)throw new Error(`Input must be a vector, got shape: ${s.shape}`);if(i.shape.length!==0)throw new Error(`Delimiter must be a scalar, got shape: ${i.shape}`);let l=e.data.get(s.dataId).values,u=e.data.get(i.dataId).values[0],[a,c,p]=bi(l,u,n),m=c.length;return[e.makeTensorInfo([m,2],"int32",a),e.makeTensorInfo([m],"string",c),e.makeTensorInfo([2],"int32",new Int32Array(p))]}var w1={kernelName:Al,backendName:"cpu",kernelFunc:vW};function SW(r){let{inputs:t,backend:e,attrs:o}=r,{numBuckets:n}=o,{input:s}=t;if(s.dtype!=="string")throw new Error("Input must be of datatype string");if(n<=0)throw new Error("Number of buckets must be at least 1");let i=e.data.get(s.dataId).values,l=yi(i,n);return e.makeTensorInfo(s.shape,"int32",l)}var v1={kernelName:El,backendName:"cpu",kernelFunc:SW};var kW=xt(ls,r=>Math.tan(r)),S1={kernelName:ls,backendName:"cpu",kernelFunc:kW};var TW=xt(us,r=>Math.tanh(r)),k1={kernelName:us,backendName:"cpu",kernelFunc:TW};function _W(r){let{inputs:t,backend:e}=r,{tensor:o,indices:n,updates:s}=t,{sliceRank:i,numUpdates:l,sliceSize:u,strides:a,outputSize:c}=w.calculateShapes(s,n,o.shape),p=!1,m=e.bufferSync(n),d=e.bufferSync(s),f=e.bufferSync(o),h=so(m,d,o.shape,c,u,l,i,a,f,p);return e.makeTensorInfo(o.shape,h.dtype,h.values)}var T1={kernelName:Ua,backendName:"cpu",kernelFunc:_W};function NW(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{reps:s}=o;K(n,"tile");let i=Am(e.bufferSync(n),s);return e.makeTensorInfo(i.shape,i.dtype,i.values)}var _1={kernelName:Qr,backendName:"cpu",kernelFunc:NW};function AW(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{k:s,sorted:i}=o;K(n,"topk");let l=e.data.get(n.dataId).values,[u,a]=Em(l,n.shape,n.dtype,s,i);return[e.makeTensorInfo(u.shape,u.dtype,u.values),e.makeTensorInfo(a.shape,a.dtype,a.values)]}var N1={kernelName:cs,backendName:"cpu",kernelFunc:AW};function EW(r){let{inputs:t,attrs:e,backend:o}=r,{image:n,transforms:s}=t,{interpolation:i,fillMode:l,fillValue:u,outputShape:a}=e,[c,p,m,d]=n.shape,[f,h]=a??[p,m],g=[c,f,h,d],x=b.computeStrides(n.shape),y=x[0],C=x[1],I=x[2],v=b.computeStrides(g),S=v[0],k=v[1],A=v[2],D=b.getTypedArrayFromDType(n.dtype,b.sizeFromShape(g));D.fill(u);let F=o.data.get(n.dataId).values,M=o.data.get(s.dataId).values;for(let U=0;U<c;++U){let P=s.shape[0]===1?M:M.subarray(U*8,U*8+8);for(let L=0;L<f;++L)for(let z=0;z<h;++z)for(let V=0;V<d;++V){let W,q=P[6]*z+P[7]*L+1;if(q===0)continue;let X=(P[0]*z+P[1]*L+P[2])/q,J=(P[3]*z+P[4]*L+P[5])/q,tt=A1(X,m,l),Y=A1(J,p,l);switch(i){case"nearest":W=MW(F,p,m,y,C,I,U,Y,tt,V,u);break;case"bilinear":W=PW(F,p,m,y,C,I,U,Y,tt,V,u);break;default:throw new Error(`Error in Transform: Expect 'nearest' or 'bilinear', but got ${i}`)}let Q=U*S+L*k+z*A+V;D[Q]=W}return o.makeTensorInfo(g,n.dtype,D)}return{dataId:o.write(D,g,n.dtype),shape:n.shape,dtype:n.dtype}}var E1={kernelName:za,backendName:"cpu",kernelFunc:EW};function A1(r,t,e){switch(e){case"reflect":return RW(r,t);case"wrap":return DW(r,t);case"nearest":return $W(r,t);case"constant":default:return FW(r,t)}}function RW(r,t){let e=r;if(e<0)if(t<=1)e=0;else{let o=2*t;e<o&&(e=o*Math.trunc(-e/o)+e),e=e<-t?e+o:-e-1}else if(e>t-1)if(t<=1)e=0;else{let o=2*t;e-=o*Math.trunc(e/o),e>=t&&(e=o-e-1)}return b.clamp(0,e,t-1)}function DW(r,t){let e=r;if(e<0)if(t<=1)e=0;else{let o=t-1;e+=t*(Math.trunc(-e/o)+1)}else if(e>t-1)if(t<=1)e=0;else{let o=t-1;e-=t*Math.trunc(e/o)}return b.clamp(0,e,t-1)}function FW(r,t){return r}function $W(r,t){return b.clamp(0,r,t-1)}function uc(r,t,e,o,n,s,i,l,u,a,c){let p=i*o+l*n+u*s+a;return 0<=l&&l<t&&0<=u&&u<e?r[p]:c}function MW(r,t,e,o,n,s,i,l,u,a,c){let p=Math.round(l),m=Math.round(u);return uc(r,t,e,o,n,s,i,p,m,a,c)}function PW(r,t,e,o,n,s,i,l,u,a,c){let p=Math.floor(l),m=Math.floor(u),d=p+1,f=m+1,h=(f-u)*uc(r,t,e,o,n,s,i,p,m,a,c)+(u-m)*uc(r,t,e,o,n,s,i,p,f,a,c),g=(f-u)*uc(r,t,e,o,n,s,i,d,m,a,c)+(u-m)*uc(r,t,e,o,n,s,i,d,f,a,c);return(d-l)*h+(l-p)*g}function OW(r){let{inputs:t,attrs:e,backend:o}=r,{axis:n}=e,{x:s}=t;K(s,"unique");let i=o.data.get(s.dataId).values,{outputValues:l,outputShape:u,indices:a}=Ci(i,n,s.shape,s.dtype);return[o.makeTensorInfo(u,s.dtype,l),o.makeTensorInfo([a.length],"int32",a)]}var R1={kernelName:qs,backendName:"cpu",kernelFunc:OW};function BW(r){let{inputs:t,backend:e,attrs:o}=r,{value:n}=t,{axis:s}=o;s<0&&(s+=n.shape.length);let i=n.shape.length,l=n.shape[s],u=new Array(i-1),a=0;for(let d=0;d<i;d++)d!==s&&(u[a++]=n.shape[d]);let c=new Array(i).fill(0),p=n.shape.slice();p[s]=1;let m=new Array(l);for(let d=0;d<m.length;d++){c[s]=d;let f=Wr({inputs:{x:n},backend:e,attrs:{begin:c,size:p}});m[d]=$t({inputs:{x:f},backend:e,attrs:{shape:u}}),e.disposeIntermediateTensorInfo(f)}return m}var D1={kernelName:js,backendName:"cpu",kernelFunc:BW};function LW(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,segmentIds:s}=t,{numSegments:i}=o;K(n,"unsortedSegmentSum");let l=n.shape.length,u=s.shape.length,a=[],c=[],p=l-u,m=s;for(let f=0;f<p;++f){let h=ru({inputs:{input:m},backend:e,attrs:{dim:f+1}});m=h,c.push(h)}for(let f=0;f<i;++f){let h=b.createScalarValue(f,"int32"),g=e.makeTensorInfo([],"int32",h),x=iy({inputs:{a:g,b:m},backend:e}),y=Gr({inputs:{x},backend:e,attrs:{dtype:"float32"}}),C=fi({inputs:{a:y,b:n},backend:e}),I=ys({inputs:{x:C},backend:e,attrs:{axis:0,keepDims:!1}});a.push(I),c.push(g),c.push(x),c.push(y),c.push(C),c.push(I)}let d=Vy({inputs:a,backend:e,attrs:{axis:0}});return c.forEach(f=>e.disposeIntermediateTensorInfo(f)),d}var F1={kernelName:Rl,backendName:"cpu",kernelFunc:LW};var UW=[n0,mS,s0,a0,xS,i0,l0,u0,c0,p0,m0,d0,f0,h0,g0,b0,y0,C0,I0,o0,w0,v0,S0,bS,k0,gS,yS,T0,dS,_0,A0,E0,R0,D0,F0,$0,M0,P0,O0,B0,L0,U0,G0,V0,W0,z0,H0,K0,q0,j0,X0,Y0,Q0,ZS,J0,CS,tk,IS,ek,wS,rk,ok,nk,vS,SS,sk,ak,ik,lk,kS,TS,fS,uk,N0,ck,pk,mk,QS,_S,NS,dk,AS,fk,hk,gk,xk,bk,yk,Ck,ES,Ik,wk,vk,Sk,Tk,_k,Nk,RS,Ak,Ek,Fk,DS,FS,$k,Mk,Pk,$S,Ok,Uk,Gk,$m,Vk,JS,PS,Wk,zk,Hk,Kk,hS,ac,qk,t0,e0,r0,jk,Xk,Yk,Zk,Qk,Jk,t1,GS,e1,o1,n1,s1,WS,a1,i1,l1,zS,Rk,c1,p1,m1,d1,f1,h1,g1,x1,KS,b1,qS,jS,y1,C1,I1,w1,v1,XS,Z0,S1,k1,T1,_1,N1,E1,MS,R1,D1,F1,Bk];for(let r of UW)Dl(r);var wi={},Mm={alpha:!1,antialias:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!1,depth:!1,stencil:!1,failIfMajorPerformanceCaveat:!0};function $1(r,t){wi[r]=t}function yr(r,t){if(!(r in wi)||t!=null){let o=VW(r,t);if(o!==null)wi[r]=o;else return console.log("Could not get context for WebGL version",r),null}let e=wi[r];return e==null||e.isContextLost()?(delete wi[r],yr(r)):(e.disable(e.DEPTH_TEST),e.disable(e.STENCIL_TEST),e.disable(e.BLEND),e.disable(e.DITHER),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SAMPLE_COVERAGE),e.enable(e.SCISSOR_TEST),e.enable(e.CULL_FACE),e.cullFace(e.BACK),wi[r])}function GW(r){if(!$().getBool("IS_SAFARI")&&typeof OffscreenCanvas<"u"&&r===2)return new OffscreenCanvas(300,150);if(typeof document<"u")return document.createElement("canvas");throw new Error("Cannot create a canvas in this context")}function VW(r,t){if(r!==1&&r!==2)throw new Error("Cannot get WebGL rendering context, WebGL is disabled.");let e=t??GW(r);return e.addEventListener("webglcontextlost",o=>{o.preventDefault(),delete wi[r]},!1),$().getBool("SOFTWARE_WEBGL_ENABLED")&&(Mm.failIfMajorPerformanceCaveat=!1),r===1?e.getContext("webgl",Mm)||e.getContext("experimental-webgl",Mm):e.getContext("webgl2",Mm)}var aa;(function(r){r[r.DENSE=0]="DENSE",r[r.SHARED_BATCH=1]="SHARED_BATCH"})(aa||(aa={}));var Ue;(function(r){r[r.RENDER=0]="RENDER",r[r.UPLOAD=1]="UPLOAD",r[r.PIXELS=2]="PIXELS",r[r.DOWNLOAD=3]="DOWNLOAD"})(Ue||(Ue={}));var Fe;(function(r){r[r.UNPACKED_FLOAT16=0]="UNPACKED_FLOAT16",r[r.UNPACKED_FLOAT32=1]="UNPACKED_FLOAT32",r[r.PACKED_4X1_UNSIGNED_BYTE=2]="PACKED_4X1_UNSIGNED_BYTE",r[r.PACKED_2X2_FLOAT32=3]="PACKED_2X2_FLOAT32",r[r.PACKED_2X2_FLOAT16=4]="PACKED_2X2_FLOAT16"})(Fe||(Fe={}));function vi(r,t){return[t,r]}function M1(r,t){return r*t}function cc(r){let t=b.sizeFromShape(r),e=Math.ceil(t/4);return b.sizeToSquarishShape(e)}function So(r,t){return[Math.max(1,Math.ceil(t/2)),Math.max(1,Math.ceil(r/2))]}function P1(r,t){let[e,o]=So(r,t);return e*o*4}function pc(r,t){let e=r,o,n,s,i,l,u,a,c,p,m;return $().getNumber("WEBGL_VERSION")===2?(o=e.R32F,n=e.R16F,s=e.RGBA16F,i=e.RGBA32F,l=e.RED,a=4,c=1,p=e.HALF_FLOAT,m=e.FLOAT,u=e.RGBA8):(o=r.RGBA,n=r.RGBA,s=r.RGBA,i=e.RGBA,l=r.RGBA,a=4,c=4,p=t!=null?t.HALF_FLOAT_OES:null,m=r.FLOAT,u=r.RGBA),{internalFormatFloat:o,internalFormatHalfFloat:n,internalFormatPackedHalfFloat:s,internalFormatPackedFloat:i,textureFormatFloat:l,downloadTextureFormat:u,downloadUnpackNumChannels:a,defaultNumChannels:c,textureTypeHalfFloat:p,textureTypeFloat:m}}function lt(r,t){let e=t();return $().getBool("DEBUG")&&WW(r),e}function WW(r){let t=r.getError();if(t!==r.NO_ERROR)throw new Error("WebGL Error: "+KW(r,t))}var zW=596e-10,HW=65504;function O1(r){return!!($().getBool("WEBGL_RENDER_FLOAT32_ENABLED")||r===0||zW<Math.abs(r)&&Math.abs(r)<HW)}function KW(r,t){switch(t){case r.NO_ERROR:return"NO_ERROR";case r.INVALID_ENUM:return"INVALID_ENUM";case r.INVALID_VALUE:return"INVALID_VALUE";case r.INVALID_OPERATION:return"INVALID_OPERATION";case r.INVALID_FRAMEBUFFER_OPERATION:return"INVALID_FRAMEBUFFER_OPERATION";case r.OUT_OF_MEMORY:return"OUT_OF_MEMORY";case r.CONTEXT_LOST_WEBGL:return"CONTEXT_LOST_WEBGL";default:return`Unknown error code ${t}`}}function mc(r,t){return Cs(r,()=>r.getExtension(t),'Extension "'+t+'" not supported on this browser.')}function B1(r,t){let e=Cs(r,()=>r.createShader(r.VERTEX_SHADER),"Unable to create vertex WebGLShader.");if(lt(r,()=>r.shaderSource(e,t)),lt(r,()=>r.compileShader(e)),r.getShaderParameter(e,r.COMPILE_STATUS)===!1)throw console.log(r.getShaderInfoLog(e)),new Error("Failed to compile vertex shader.");return e}function L1(r,t){let e=Cs(r,()=>r.createShader(r.FRAGMENT_SHADER),"Unable to create fragment WebGLShader.");if(lt(r,()=>r.shaderSource(e,t)),lt(r,()=>r.compileShader(e)),$().get("ENGINE_COMPILE_ONLY"))return e;if(r.getShaderParameter(e,r.COMPILE_STATUS)===!1)throw qy(t,r.getShaderInfoLog(e)),new Error("Failed to compile fragment shader.");return e}var qW=/ERROR: [0-9]+:([0-9]+):/g;function qy(r,t){let e=qW.exec(t);if(e==null){console.log(`Couldn't parse line number in error: ${t}`),console.log(r);return}let o=+e[1],n=r.split(`
`),s=n.length.toString().length+2,i=n.map((p,m)=>b.rightPad((m+1).toString(),s)+p),l=0;for(let p=0;p<i.length;p++)l=Math.max(i[p].length,l);let u=i.slice(0,o-1),a=i.slice(o-1,o),c=i.slice(o);console.log(u.join(`
`)),console.log(t.split(`
`)[0]),console.log(`%c ${b.rightPad(a[0],l)}`,"border:1px solid red; background-color:#e3d2d2; color:#a61717"),console.log(c.join(`
`))}function U1(r){return Cs(r,()=>r.createProgram(),"Unable to create WebGLProgram.")}function G1(r,t){if(lt(r,()=>r.linkProgram(t)),!$().get("ENGINE_COMPILE_ONLY")&&r.getProgramParameter(t,r.LINK_STATUS)===!1)throw console.log(r.getProgramInfoLog(t)),new Error("Failed to link vertex and fragment shaders.")}function Om(r,t){if(lt(r,()=>r.validateProgram(t)),r.getProgramParameter(t,r.VALIDATE_STATUS)===!1)throw console.log(r.getProgramInfoLog(t)),new Error("Shader program validation failed.")}function V1(r,t){let e=Cs(r,()=>r.createBuffer(),"Unable to create WebGLBuffer");return lt(r,()=>r.bindBuffer(r.ARRAY_BUFFER,e)),lt(r,()=>r.bufferData(r.ARRAY_BUFFER,t,r.STATIC_DRAW)),e}function W1(r,t){let e=Cs(r,()=>r.createBuffer(),"Unable to create WebGLBuffer");return lt(r,()=>r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e)),lt(r,()=>r.bufferData(r.ELEMENT_ARRAY_BUFFER,t,r.STATIC_DRAW)),e}function z1(r){return Cs(r,()=>r.createTexture(),"Unable to create WebGLTexture.")}function H1(r,t){let e=$().getNumber("WEBGL_MAX_TEXTURE_SIZE");if(r<=0||t<=0){let o=`[${r}x${t}]`;throw new Error("Requested texture size "+o+" is invalid.")}if(r>e||t>e){let o=`[${r}x${t}]`,n=`[${e}x${e}]`;throw new Error("Requested texture size "+o+" greater than WebGL maximum on this browser / GPU "+n+".")}}function K1(r){return Cs(r,()=>r.createFramebuffer(),"Unable to create WebGLFramebuffer.")}function jy(r,t,e,o,n,s,i){let l=r.getAttribLocation(t,e);return l===-1?!1:(lt(r,()=>r.bindBuffer(r.ARRAY_BUFFER,o)),lt(r,()=>r.vertexAttribPointer(l,n,r.FLOAT,!1,s,i)),lt(r,()=>r.enableVertexAttribArray(l)),!0)}function jW(r,t,e){YW(r,e),lt(r,()=>r.activeTexture(r.TEXTURE0+e)),lt(r,()=>r.bindTexture(r.TEXTURE_2D,t))}function q1(r,t,e){return Cs(r,()=>r.getUniformLocation(t,e),'uniform "'+e+'" not present in program.')}function j1(r,t,e){return r.getUniformLocation(t,e)}function X1(r,t,e,o){lt(r,()=>jW(r,t,o)),lt(r,()=>r.uniform1i(e,o))}function Bm(r,t,e){lt(r,()=>r.bindFramebuffer(r.FRAMEBUFFER,e)),lt(r,()=>r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,t,0))}function Xy(r,t){lt(r,()=>r.bindFramebuffer(r.FRAMEBUFFER,t)),lt(r,()=>r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,null,0))}function dc(r){let t=r.checkFramebufferStatus(r.FRAMEBUFFER);if(t!==r.FRAMEBUFFER_COMPLETE)throw new Error("Error binding framebuffer: "+XW(r,t))}function XW(r,t){switch(t){case r.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:return"FRAMEBUFFER_INCOMPLETE_ATTACHMENT";case r.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:return"FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT";case r.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:return"FRAMEBUFFER_INCOMPLETE_DIMENSIONS";case r.FRAMEBUFFER_UNSUPPORTED:return"FRAMEBUFFER_UNSUPPORTED";default:return`unknown error ${t}`}}function Cs(r,t,e){let o=lt(r,()=>t());if(o==null)throw new Error(e);return o}function YW(r,t){let e=r.MAX_COMBINED_TEXTURE_IMAGE_UNITS-1,o=t+r.TEXTURE0;if(o<r.TEXTURE0||o>e){let n=`[gl.TEXTURE0, gl.TEXTURE${e}]`;throw new Error(`textureUnit must be in ${n}.`)}}function ia(r,t=2){return b.sizeFromShape(r.slice(0,r.length-t))}function la(r){if(r.length===0)throw Error("Cannot get rows and columns of an empty shape array.");return[r.length>1?r[r.length-2]:1,r[r.length-1]]}function fc(r){let t=[1,1,1];return r.length===0||r.length===1&&r[0]===1||(t=[ia(r),...la(r)]),t}function Y1(r,t=!1){let e=$().getNumber("WEBGL_MAX_TEXTURE_SIZE"),o=$().getNumber("WEBGL_MAX_SIZE_FOR_NARROW_TEXTURE");o===1/0&&$().getBool("WEBGL_AUTO_SQUARIFY_NARROW_TEXTURE_SHAPE")&&(o=e/2),t&&(e=e*2,o=o*2,r=r.map((l,u)=>u>=r.length-2?b.nearestLargerEven(r[u]):r[u]),r.length===1&&(r=[2,r[0]])),r.length!==2&&(r=b.squeezeShape(r).newShape);let n=b.sizeFromShape(r),s=null;r.length<=1&&n<=e?s=[1,n]:r.length===2&&r[0]<=e&&r[1]<=e?s=r:r.length===3&&r[0]*r[1]<=e&&r[2]<=e?s=[r[0]*r[1],r[2]]:r.length===3&&r[0]<=e&&r[1]*r[2]<=e?s=[r[0],r[1]*r[2]]:r.length===4&&r[0]*r[1]*r[2]<=e&&r[3]<=e?s=[r[0]*r[1]*r[2],r[3]]:r.length===4&&r[0]<=e&&r[1]*r[2]*r[3]<=e&&(s=[r[0],r[1]*r[2]*r[3]]);let i=s!=null&&Math.max(...s)>o&&Math.min(...s)<=(t?2:1)&&Math.min(...s)>0;if(s==null||i)if(t){let l=ia(r),u=2,a=2;r.length&&([u,a]=la(r)),n=l*(u/2)*(a/2),s=b.sizeToSquarishShape(n).map(c=>c*2)}else s=b.sizeToSquarishShape(n);return s}function Pm(r){return r%2===0}function Si(r,t){if(r=r.slice(-2),t=t.slice(-2),b.arraysEqual(r,t)||!r.length||!t.length||r[0]===0||r[1]===0||t[0]===0||t[1]===0)return!0;if(r.length!==t.length){let e=r[r.length-1],o=t[t.length-1];if(e===o||Pm(e)&&Pm(o)&&(r[0]===1||t[0]===1))return!0}return r[1]===t[1]&&Pm(r[0])&&Pm(t[0])}var zy,Hy;function Z1(r){if(zy==null){let t=yr(r);zy=t.getParameter(t.MAX_TEXTURE_SIZE)}return zy}function Q1(r){if(Hy==null){let t=yr(r);Hy=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS)}return Math.min(16,Hy)}function J1(r){if(r===0)return 0;let t,e=yr(r);return Dr(e,"EXT_disjoint_timer_query_webgl2")&&r===2?t=2:Dr(e,"EXT_disjoint_timer_query")?t=1:t=0,t}function Dr(r,t){return r.getExtension(t)!=null}function Yy(r){try{if(yr(r)!=null)return!0}catch(t){return console.log("Error when getting WebGL context: ",t),!1}return!1}function tT(r){if(r===0)return!1;let t=yr(r);if(r===1){if(!Dr(t,"OES_texture_float"))return!1}else if(!Dr(t,"EXT_color_buffer_float"))return!1;return Ky(t)}function eT(r){if(r===0)return!1;let t=yr(r);if(r===1){if(!Dr(t,"OES_texture_float")||!Dr(t,"WEBGL_color_buffer_float"))return!1}else{if(Dr(t,"EXT_color_buffer_float"))return Ky(t);let o="EXT_color_buffer_half_float";if(Dr(t,o)){let n=t.getExtension(o);return ZW(t,n)}return!1}return Ky(t)}function Ky(r){let t=pc(r),e=r.createTexture();r.bindTexture(r.TEXTURE_2D,e),r.texImage2D(r.TEXTURE_2D,0,t.internalFormatFloat,1,1,0,t.textureFormatFloat,t.textureTypeFloat,null);let s=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,s),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,e,0);let i=r.checkFramebufferStatus(r.FRAMEBUFFER)===r.FRAMEBUFFER_COMPLETE;return r.bindTexture(r.TEXTURE_2D,null),r.bindFramebuffer(r.FRAMEBUFFER,null),r.deleteTexture(e),r.deleteFramebuffer(s),i}function ZW(r,t){let e=pc(r,t),o=r.createTexture();r.bindTexture(r.TEXTURE_2D,o),r.texImage2D(r.TEXTURE_2D,0,e.internalFormatHalfFloat,1,1,0,e.textureFormatFloat,e.textureTypeHalfFloat,null);let i=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,i),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,o,0);let l=r.checkFramebufferStatus(r.FRAMEBUFFER)===r.FRAMEBUFFER_COMPLETE;return r.bindTexture(r.TEXTURE_2D,null),r.bindFramebuffer(r.FRAMEBUFFER,null),r.deleteTexture(o),r.deleteFramebuffer(i),l}function rT(r){return r!==2?!1:yr(r).fenceSync!=null}function ko(r,t){Array.isArray(r)||(r=[r]),r.forEach(e=>{e!=null&&b.assert(e.dtype!=="complex64",()=>`${t} does not support complex64 tensors in the WebGL backend.`)})}var ht=$();ht.registerFlag("HAS_WEBGL",()=>ht.getNumber("WEBGL_VERSION")>0);ht.registerFlag("WEBGL_VERSION",()=>Yy(2)?2:Yy(1)?1:0);ht.registerFlag("WEBGL_CHECK_NUMERICAL_PROBLEMS",()=>!1);ht.registerFlag("WEBGL_BUFFER_SUPPORTED",()=>ht.get("WEBGL_VERSION")===2);ht.registerFlag("WEBGL_CPU_FORWARD",()=>!0);ht.registerFlag("WEBGL_FORCE_F16_TEXTURES",()=>!1);ht.registerFlag("WEBGL_PACK",()=>ht.getBool("HAS_WEBGL"));ht.registerFlag("WEBGL_PACK_NORMALIZATION",()=>ht.getBool("WEBGL_PACK"));ht.registerFlag("WEBGL_PACK_CLIP",()=>ht.getBool("WEBGL_PACK"));ht.registerFlag("WEBGL_PACK_DEPTHWISECONV",()=>ht.getBool("WEBGL_PACK"));ht.registerFlag("WEBGL_PACK_BINARY_OPERATIONS",()=>ht.getBool("WEBGL_PACK"));ht.registerFlag("WEBGL_PACK_UNARY_OPERATIONS",()=>ht.getBool("WEBGL_PACK"));ht.registerFlag("WEBGL_PACK_ARRAY_OPERATIONS",()=>ht.getBool("WEBGL_PACK"));ht.registerFlag("WEBGL_PACK_IMAGE_OPERATIONS",()=>ht.getBool("WEBGL_PACK"));ht.registerFlag("WEBGL_PACK_REDUCE",()=>ht.getBool("WEBGL_PACK"));ht.registerFlag("WEBGL_LAZILY_UNPACK",()=>ht.getBool("WEBGL_PACK"));ht.registerFlag("WEBGL_CONV_IM2COL",()=>ht.getBool("WEBGL_PACK"));ht.registerFlag("WEBGL_PACK_CONV2DTRANSPOSE",()=>ht.getBool("WEBGL_PACK"));ht.registerFlag("WEBGL_MAX_TEXTURE_SIZE",()=>Z1(ht.getNumber("WEBGL_VERSION")));ht.registerFlag("WEBGL_MAX_TEXTURES_IN_SHADER",()=>Q1(ht.getNumber("WEBGL_VERSION")));ht.registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION",()=>{let r=ht.getNumber("WEBGL_VERSION");return r===0?0:J1(r)});ht.registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE",()=>ht.getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0&&!Qs.isMobile());ht.registerFlag("WEBGL_RENDER_FLOAT32_CAPABLE",()=>tT(ht.getNumber("WEBGL_VERSION")));ht.registerFlag("WEBGL_RENDER_FLOAT32_ENABLED",()=>ht.getBool("WEBGL_FORCE_F16_TEXTURES")?!1:ht.getBool("WEBGL_RENDER_FLOAT32_CAPABLE"));ht.registerFlag("WEBGL_DOWNLOAD_FLOAT_ENABLED",()=>eT(ht.getNumber("WEBGL_VERSION")));ht.registerFlag("WEBGL_FENCE_API_ENABLED",()=>rT(ht.getNumber("WEBGL_VERSION")));ht.registerFlag("WEBGL_SIZE_UPLOAD_UNIFORM",()=>ht.getBool("WEBGL_RENDER_FLOAT32_ENABLED")?4:0);ht.registerFlag("WEBGL_DELETE_TEXTURE_THRESHOLD",()=>-1,r=>{if(typeof r!="number")throw new Error(`WEBGL_DELETE_TEXTURE_THRESHOLD must be a number but got ${r}.`);if(r<0&&r!==-1)throw new Error(`WEBGL_DELETE_TEXTURE_THRESHOLD must be -1 (indicating never delete) or at least 0, but got ${r}.`)});ht.registerFlag("WEBGL_FLUSH_THRESHOLD",()=>Qs.isMobile()?1:-1,r=>{if(typeof r!="number")throw new Error(`WEBGL_FLUSH_THRESHOLD must be a number but got ${r}.`);if(r<0&&r!==-1)throw new Error(`WEBGL_FLUSH_THRESHOLD must be -1 (indicating never manual flush) or at least 0, but got ${r}.`)});ht.registerFlag("CPU_HANDOFF_SIZE_THRESHOLD",()=>128);ht.registerFlag("WEBGL_USE_SHAPES_UNIFORMS",()=>!1);ht.registerFlag("TOPK_LAST_DIM_CPU_HANDOFF_SIZE_THRESHOLD",()=>1e5);ht.registerFlag("TOPK_K_CPU_HANDOFF_THRESHOLD",()=>128);ht.registerFlag("WEBGL_EXP_CONV",()=>!1);ht.registerFlag("SOFTWARE_WEBGL_ENABLED",()=>ht.getBool("IS_TEST"));ht.registerFlag("WEBGL_MAX_SIZE_FOR_NARROW_TEXTURE",()=>1/0);ht.registerFlag("WEBGL_AUTO_SQUARIFY_NARROW_TEXTURE_SHAPE",()=>!1);ht.registerFlag("WEBGL2_ISNAN_CUSTOM",()=>!1);ht.registerFlag("ENGINE_COMPILE_ONLY",()=>!1);function se(){let r,t,e,o,n,s,i,l,u,a;return $().getNumber("WEBGL_VERSION")===2?(r="#version 300 es",t="in",e="out",o="in",n="texture",s="outputColor",i="out vec4 outputColor;",l=$().getBool("WEBGL2_ISNAN_CUSTOM")?`
      bool isnan_custom(float val) {
        uint floatToUint = floatBitsToUint(val);
        return (floatToUint & 0x7fffffffu) > 0x7f800000u;
      }

      bvec4 isnan_custom(vec4 val) {
        return bvec4(isnan_custom(val.x),
          isnan_custom(val.y), isnan_custom(val.z), isnan_custom(val.w));
      }

      #define isnan(value) isnan_custom(value)
    `:"",u="",a=`
      #define round(value) newRound(value)
      int newRound(float value) {
        return int(floor(value + 0.5));
      }

      ivec4 newRound(vec4 value) {
        return ivec4(floor(value + vec4(0.5)));
      }
    `):(r="",t="attribute",e="varying",o="varying",n="texture2D",s="gl_FragColor",i="",l=`
      #define isnan(value) isnan_custom(value)
      bool isnan_custom(float val) {
        return (val > 0. || val < 1. || val == 0.) ? false : true;
      }
      bvec4 isnan_custom(vec4 val) {
        return bvec4(isnan(val.x), isnan(val.y), isnan(val.z), isnan(val.w));
      }
    `,u=`
      uniform float INFINITY;

      bool isinf(float val) {
        return abs(val) == INFINITY;
      }
      bvec4 isinf(vec4 val) {
        return equal(abs(val), vec4(INFINITY));
      }
    `,a=`
      int round(float value) {
        return int(floor(value + 0.5));
      }

      ivec4 round(vec4 value) {
        return ivec4(floor(value + vec4(0.5)));
      }
    `),{version:r,attribute:t,varyingVs:e,varyingFs:o,texture2D:n,output:s,defineOutput:i,defineSpecialNaN:l,defineSpecialInf:u,defineRound:a}}function ao(r,t,e="index"){let o=b.computeStrides(t);return o.map((n,s)=>{let i=`int ${r[s]} = ${e} / ${n}`,l=s===o.length-1?`int ${r[s+1]} = ${e} - ${r[s]} * ${n}`:`index -= ${r[s]} * ${n}`;return`${i}; ${l};`}).join("")}function ki(r,t,e="index"){let o=b.computeStrides(t);return o.map((n,s)=>{let i=`int ${r[s]} = ${e} / outShapeStrides[${s}]`,l=s===o.length-1?`int ${r[s+1]} = ${e} - ${r[s]} * outShapeStrides[${s}]`:`index -= ${r[s]} * outShapeStrides[${s}]`;return`${i}; ${l};`}).join("")}function QW(r,t){let e=r.length,o=r.map(s=>`${t}[${s}]`),n=new Array(e-1);n[e-2]=o[e-1];for(let s=e-3;s>=0;--s)n[s]=`(${n[s+1]} * ${o[s+1]})`;return n}function oT(r,t,e="index"){let o=r.map((s,i)=>i),n=QW(o,t);return n.map((s,i)=>{let l=`int ${r[i]} = ${e} / ${n[i]}`,u=i===n.length-1?`int ${r[i+1]} = ${e} - ${r[i]} * ${n[i]}`:`index -= ${r[i]} * ${n[i]}`;return`${l}; ${u};`}).join("")}function ou(r){let t=b.computeStrides(r).map(e=>e.toString());return`
  int getFlatIndex(ivec3 coords) {
    return coords.x * ${t[0]} + coords.y * ${t[1]} + coords.z;
  }
`}function nu(){return`
  int getFlatIndex(ivec3 coords) {
    return coords.x * outShapeStrides[0] + coords.y * outShapeStrides[1] + coords.z;
  }
`}var Um=`
  const float FLOAT_MAX = 1.70141184e38;
  const float FLOAT_MIN = 1.17549435e-38;

  lowp vec4 encode_float(highp float v) {
    if (isnan(v)) {
      return vec4(255, 255, 255, 255);
    }

    highp float av = abs(v);

    if(av < FLOAT_MIN) {
      return vec4(0.0, 0.0, 0.0, 0.0);
    } else if(v > FLOAT_MAX) {
      return vec4(0.0, 0.0, 128.0, 127.0) / 255.0;
    } else if(v < -FLOAT_MAX) {
      return vec4(0.0, 0.0,  128.0, 255.0) / 255.0;
    }

    highp vec4 c = vec4(0,0,0,0);

    highp float e = floor(log2(av));
    highp float m = exp2(fract(log2(av))) - 1.0;

    c[2] = floor(128.0 * m);
    m -= c[2] / 128.0;
    c[1] = floor(32768.0 * m);
    m -= c[1] / 32768.0;
    c[0] = floor(8388608.0 * m);

    highp float ebias = e + 127.0;
    c[3] = floor(ebias / 2.0);
    ebias -= c[3] * 2.0;
    c[2] += floor(ebias) * 128.0;

    c[3] += 128.0 * step(0.0, -v);

    return c / 255.0;
  }
`;var{getBroadcastDims:nT}=w;function sT(r,t,e){let o=[];if(r.forEach(d=>{let f=b.sizeFromShape(d.shapeInfo.logicalShape);if(d.shapeInfo.isUniform?o.push(`uniform float ${d.name}${f>1?`[${f}]`:""};`):(o.push(`uniform sampler2D ${d.name};`),o.push(`uniform int offset${d.name};`)),e.enableShapeUniforms){let{uniformShape:h}=Gm(e.packedInputs,d.shapeInfo.logicalShape,d.shapeInfo.texShape);switch(h.length){case 1:o.push(`uniform int ${d.name}Shape;`);break;case 2:o.push(`uniform ivec2 ${d.name}Shape;`);break;case 3:o.push(`uniform ivec3 ${d.name}Shape;`);break;case 4:o.push(`uniform ivec4 ${d.name}Shape;`);break;default:break}o.push(`uniform ivec2 ${d.name}TexShape;`)}}),e.enableShapeUniforms){switch(t.logicalShape.length){case 1:o.push("uniform int outShape;");break;case 2:o.push("uniform ivec2 outShape;"),o.push("uniform int outShapeStrides;");break;case 3:o.push("uniform ivec3 outShape;"),o.push("uniform ivec2 outShapeStrides;");break;case 4:o.push("uniform ivec4 outShape;"),o.push("uniform ivec3 outShapeStrides;");break;default:break}o.push("uniform ivec2 outTexShape;")}e.customUniforms&&e.customUniforms.forEach(d=>{o.push(`uniform ${d.type} ${d.name}${d.arrayIndex?`[${d.arrayIndex}]`:""};`)});let n=o.join(`
`),s=r.map(d=>JW(d,t,e.packedInputs,e.enableShapeUniforms)).join(`
`),i=t.texShape,l=se(),u=rz(l),a,c,p=sz(l);return t.isPacked?(a=tz(t.logicalShape,i,e.enableShapeUniforms),c=nz(l)):(a=ez(t.logicalShape,i,e.enableShapeUniforms),c=oz(l)),e.packedInputs&&(p+=uz),[p,u,c,n,a,s,e.userCode].join(`
`)}function au(r,t=!1){let e=r.shapeInfo.logicalShape;switch(e.length){case 0:return Iz(r,t);case 1:return vz(r,t);case 2:return kz(r,t);case 3:return _z(r,t);case 4:return Az(r,t);case 5:return Ez(r);case 6:return Rz(r);default:throw new Error(`${e.length}-D input sampling is not yet supported`)}}function aT(r,t){switch(r.shapeInfo.logicalShape.length){case 0:return Cz(r);case 1:return wz(r,t);case 2:return Sz(r,t);case 3:return Tz(r,t);default:return Nz(r,t)}}function JW(r,t,e=!1,o){let n="";e?n+=aT(r,o):n+=au(r,o);let s=r.shapeInfo.logicalShape,i=t.logicalShape;return s.length<=i.length&&(e?n+=Dz(r,t):n+=Fz(r,t)),n}function tz(r,t,e){switch(r.length){case 0:return iT();case 1:return cz(r,t,e);case 2:return bz(r,t,e);case 3:return mz(r,t,e);default:return fz(r,t,e)}}function ez(r,t,e){switch(r.length){case 0:return iT();case 1:return pz(r,t,e);case 2:return yz(r,t,e);case 3:return dz(r,t,e);case 4:return hz(r,t,e);case 5:return gz(r,t);case 6:return xz(r,t);default:throw new Error(`${r.length}-D output sampling is not yet supported`)}}function rz(r){return`
    float sampleTexture(sampler2D textureSampler, vec2 uv) {
      return ${r.texture2D}(textureSampler, uv).r;
    }
  `}function oz(r){return`
    void setOutput(float val) {
      ${r.output} = vec4(val, 0, 0, 0);
    }
  `}function nz(r){return`
    void setOutput(vec4 val) {
      ${r.output} = val;
    }
  `}function sz(r){return`${r.version}
    precision highp float;
    precision highp int;
    precision highp sampler2D;
    ${r.varyingFs} vec2 resultUV;
    ${r.defineOutput}
    const vec2 halfCR = vec2(0.5, 0.5);

    struct ivec5
    {
      int x;
      int y;
      int z;
      int w;
      int u;
    };

    struct ivec6
    {
      int x;
      int y;
      int z;
      int w;
      int u;
      int v;
    };

    uniform float NAN;
    ${r.defineSpecialNaN}
    ${r.defineSpecialInf}
    ${r.defineRound}

    int imod(int x, int y) {
      return x - y * (x / y);
    }

    int idiv(int a, int b, float sign) {
      int res = a / b;
      int mod = imod(a, b);
      if (sign < 0. && mod != 0) {
        res -= 1;
      }
      return res;
    }

    //Based on the work of Dave Hoskins
    //https://www.shadertoy.com/view/4djSRW
    #define HASHSCALE1 443.8975
    float random(float seed){
      vec2 p = resultUV * seed;
      vec3 p3  = fract(vec3(p.xyx) * HASHSCALE1);
      p3 += dot(p3, p3.yzx + 19.19);
      return fract((p3.x + p3.y) * p3.z);
    }

    ${az}
    ${iz}
    ${lz}
  `}var az=`
vec2 uvFromFlat(int texNumR, int texNumC, int index) {
  int texR = index / texNumC;
  int texC = index - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
  int texelIndex = index / 2;
  int texR = texelIndex / texNumC;
  int texC = texelIndex - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,iz=`
vec2 packedUVfrom2D(int texelsInLogicalRow, int texNumR,
  int texNumC, int row, int col) {
  int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
  int texR = texelIndex / texNumC;
  int texC = texelIndex - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,lz=`
vec2 packedUVfrom3D(int texNumR, int texNumC,
    int texelsInBatch, int texelsInLogicalRow, int b,
    int row, int col) {
  int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
  int texR = index / texNumC;
  int texC = index - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,uz=`
  float getChannel(vec4 frag, vec2 innerDims) {
    vec2 modCoord = mod(innerDims, 2.);
    return modCoord.x == 0. ?
      (modCoord.y == 0. ? frag.r : frag.g) :
      (modCoord.y == 0. ? frag.b : frag.a);
  }
  float getChannel(vec4 frag, int dim) {
    float modCoord = mod(float(dim), 2.);
    return modCoord == 0. ? frag.r : frag.g;
  }
`;function iT(){return`
    int getOutputCoords() {
      return 0;
    }
  `}function cz(r,t,e){let o=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)];return o[0]===1?e?`
      int getOutputCoords() {
        return 2 * int(resultUV.x * ceil(float(outTexShape[1]) / 2.0));
      }
    `:`
      int getOutputCoords() {
        return 2 * int(resultUV.x * ${o[1]}.0);
      }
    `:o[1]===1?e?`
      int getOutputCoords() {
        return 2 * int(resultUV.y * ceil(float(outTexShape[0]) / 2.0));
      }
    `:`
      int getOutputCoords() {
        return 2 * int(resultUV.y * ${o[0]}.0);
      }
    `:e?`
    int getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));
      return 2 * (resTexRC.x * packedTexShape[1] + resTexRC.y);
    }
  `:`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${o[0]}, ${o[1]}));
      return 2 * (resTexRC.x * ${o[1]} + resTexRC.y);
    }
  `}function pz(r,t,e){return t[0]===1?e?`
      int getOutputCoords() {
        return int(resultUV.x * float(outTexShape[1]));
      }
    `:`
      int getOutputCoords() {
        return int(resultUV.x * ${t[1]}.0);
      }
    `:t[1]===1?e?`
      int getOutputCoords() {
        return int(resultUV.y * float(outTexShape[0]));
      }
    `:`
      int getOutputCoords() {
        return int(resultUV.y * ${t[0]}.0);
      }
    `:e?`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(outTexShape[0], outTexShape[1]));
      return resTexRC.x * outTexShape[1] + resTexRC.y;
    }
  `:`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${t[0]}, ${t[1]}));
      return resTexRC.x * ${t[1]} + resTexRC.y;
    }
  `}function mz(r,t,e){if(e)return`
    ivec3 getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      int texelsInLogicalRow = int(ceil(float(outShape[2]) / 2.0));
      int texelsInBatch = texelsInLogicalRow * int(ceil(float(outShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));
      int index = resTexRC.x * packedTexShape[1] + resTexRC.y;

      int b = index / texelsInBatch;
      index -= b * texelsInBatch;

      int r = 2 * (index / texelsInLogicalRow);
      int c = imod(index, texelsInLogicalRow) * 2;

      return ivec3(b, r, c);
    }
  `;let o=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)],n=Math.ceil(r[2]/2),s=n*Math.ceil(r[1]/2);return`
    ivec3 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${o[0]}, ${o[1]}));
      int index = resTexRC.x * ${o[1]} + resTexRC.y;

      int b = index / ${s};
      index -= b * ${s};

      int r = 2 * (index / ${n});
      int c = imod(index, ${n}) * 2;

      return ivec3(b, r, c);
    }
  `}function dz(r,t,e){if(e)return`
  ivec3 getOutputCoords() {
    ivec2 resTexRC = ivec2(resultUV.yx *
                           vec2(outTexShape[0], outTexShape[1]));
    int index = resTexRC.x * outTexShape[1] + resTexRC.y;
    ${ki(["r","c","d"],r)}
    return ivec3(r, c, d);
  }
`;let o=ao(["r","c","d"],r);return`
    ivec3 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${t[0]}, ${t[1]}));
      int index = resTexRC.x * ${t[1]} + resTexRC.y;
      ${o}
      return ivec3(r, c, d);
    }
  `}function fz(r,t,e){if(e)return`
    ivec4 getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));
      int index = resTexRC.x * packedTexShape[1] + resTexRC.y;

      int texelsInLogicalRow = int(ceil(float(outShape[3]) / 2.0));
      int texelsInBatch = texelsInLogicalRow * int(ceil(float(outShape[2]) / 2.0));
      int texelsInBatchN = texelsInBatch * outShape[1];

      int b2 = index / texelsInBatchN;
      index -= b2 * texelsInBatchN;

      int b = index / texelsInBatch;
      index -= b * texelsInBatch;

      int r = 2 * (index / texelsInLogicalRow);
      int c = imod(index, texelsInLogicalRow) * 2;

      return ivec4(b2, b, r, c);
    }
  `;let o=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)],n=Math.ceil(r[r.length-1]/2),s=n*Math.ceil(r[r.length-2]/2),i=s,l="",u="b, r, c";for(let a=2;a<r.length-1;a++)i*=r[r.length-a-1],l=`
      int b${a} = index / ${i};
      index -= b${a} * ${i};
    `+l,u=`b${a}, `+u;return`
    ivec${r.length} getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${o[0]}, ${o[1]}));
      int index = resTexRC.x * ${o[1]} + resTexRC.y;

      ${l}

      int b = index / ${s};
      index -= b * ${s};

      int r = 2 * (index / ${n});
      int c = imod(index, ${n}) * 2;

      return ivec${r.length}(${u});
    }
  `}function hz(r,t,e){if(e)return`
    ivec4 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(outTexShape[0], outTexShape[1]));
      int index = resTexRC.x * outTexShape[1] + resTexRC.y;
      ${ki(["r","c","d","d2"],r)}
      return ivec4(r, c, d, d2);
    }
  `;let o=ao(["r","c","d","d2"],r);return`
    ivec4 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(${t[0]}, ${t[1]}));
      int index = resTexRC.x * ${t[1]} + resTexRC.y;
      ${o}
      return ivec4(r, c, d, d2);
    }
  `}function gz(r,t){let e=ao(["r","c","d","d2","d3"],r);return`
    ivec5 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx * vec2(${t[0]},
                             ${t[1]}));

      int index = resTexRC.x * ${t[1]} + resTexRC.y;

      ${e}

      ivec5 outShape = ivec5(r, c, d, d2, d3);
      return outShape;
    }
  `}function xz(r,t){let e=ao(["r","c","d","d2","d3","d4"],r);return`
    ivec6 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(${t[0]}, ${t[1]}));
      int index = resTexRC.x * ${t[1]} + resTexRC.y;

      ${e}

      ivec6 result = ivec6(r, c, d, d2, d3, d4);
      return result;
    }
  `}function bz(r,t,e){let o=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)];if(b.arraysEqual(r,t))return e?`
      ivec2 getOutputCoords() {
        ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
        return 2 * ivec2(resultUV.yx * vec2(packedTexShape[0], packedTexShape[1]));
      }
    `:`
      ivec2 getOutputCoords() {
        return 2 * ivec2(resultUV.yx * vec2(${o[0]}, ${o[1]}));
      }
    `;let n=Math.ceil(r[1]/2);return e?`
    ivec2 getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      int texelsInLogicalRow = int(ceil(float(outShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));

      int index = resTexRC.x * packedTexShape[1] + resTexRC.y;
      int r = 2 * (index / texelsInLogicalRow);
      int c = imod(index, texelsInLogicalRow) * 2;

      return ivec2(r, c);
    }
  `:`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${o[0]}, ${o[1]}));

      int index = resTexRC.x * ${o[1]} + resTexRC.y;
      int r = 2 * (index / ${n});
      int c = imod(index, ${n}) * 2;

      return ivec2(r, c);
    }
  `}function yz(r,t,e){return b.arraysEqual(r,t)?e?`
      ivec2 getOutputCoords() {
        return ivec2(resultUV.yx * vec2(outTexShape[0], outTexShape[1]));
      }
    `:`
      ivec2 getOutputCoords() {
        return ivec2(resultUV.yx * vec2(${t[0]}, ${t[1]}));
      }
    `:r[1]===1?e?`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(outTexShape[0], outTexShape[1]));
        int index = resTexRC.x * outTexShape[1] + resTexRC.y;
        return ivec2(index, 0);
      }
    `:`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(${t[0]}, ${t[1]}));
        int index = resTexRC.x * ${t[1]} + resTexRC.y;
        return ivec2(index, 0);
      }
    `:r[0]===1?e?`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(outTexShape[0], outTexShape[1]));
        int index = resTexRC.x * outTexShape[1] + resTexRC.y;
        return ivec2(0, index);
      }
    `:`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(${t[0]}, ${t[1]}));
        int index = resTexRC.x * ${t[1]} + resTexRC.y;
        return ivec2(0, index);
      }
    `:e?`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(outTexShape[0], outTexShape[1]));
      int index = resTexRC.x * outTexShape[1] + resTexRC.y;
      int r = index / outShape[1];
      int c = index - r * outShape[1];
      return ivec2(r, c);
    }
  `:`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${t[0]}, ${t[1]}));
      int index = resTexRC.x * ${t[1]} + resTexRC.y;
      int r = index / ${r[1]};
      int c = index - r * ${r[1]};
      return ivec2(r, c);
    }
  `}function Ti(r){return`offset${r}`}function Cz(r){let t=r.name,e="get"+t.charAt(0).toUpperCase()+t.slice(1),o=se();return`
    vec4 ${e}() {
      return ${o.texture2D}(${t}, halfCR);
    }
  `}function Iz(r,t){let e=r.name,o="get"+e.charAt(0).toUpperCase()+e.slice(1);if(r.shapeInfo.isUniform)return`float ${o}() {return ${e};}`;let[n,s]=r.shapeInfo.texShape;if(n===1&&s===1)return`
      float ${o}() {
        return sampleTexture(${e}, halfCR);
      }
    `;let i=Ti(e);if(t)return`
    float ${o}() {
      vec2 uv = uvFromFlat(${e}TexShape[0], ${e}TexShape[1], ${i});
      return sampleTexture(${e}, uv);
    }
  `;let[l,u]=r.shapeInfo.texShape;return`
    float ${o}() {
      vec2 uv = uvFromFlat(${l}, ${u}, ${i});
      return sampleTexture(${e}, uv);
    }
  `}function wz(r,t){let e=r.name,o="get"+e.charAt(0).toUpperCase()+e.slice(1),n=r.shapeInfo.texShape,s=se();if(t)return`
    vec4 ${o}(int index) {
      ivec2 packedTexShape = ivec2(ceil(float(${e}TexShape[0]) / 2.0), ceil(float(${e}TexShape[1]) / 2.0));
      vec2 uv = packedUVfrom1D(
        packedTexShape[0], packedTexShape[1], index);
      return ${s.texture2D}(${e}, uv);
    }
  `;let i=[Math.ceil(n[0]/2),Math.ceil(n[1]/2)];return`
    vec4 ${o}(int index) {
      vec2 uv = packedUVfrom1D(
        ${i[0]}, ${i[1]}, index);
      return ${s.texture2D}(${e}, uv);
    }
  `}function vz(r,t){let e=r.name,o="get"+e.charAt(0).toUpperCase()+e.slice(1);if(r.shapeInfo.isUniform)return`
      float ${o}(int index) {
        ${iu(r)}
      }
    `;let n=r.shapeInfo.texShape,s=n[0],i=n[1];if(i===1&&s===1)return`
      float ${o}(int index) {
        return sampleTexture(${e}, halfCR);
      }
    `;let l=Ti(e);return i===1?t?`
      float ${o}(int index) {
        vec2 uv = vec2(0.5, (float(index + ${l}) + 0.5) / float(${e}TexShape[0]));
        return sampleTexture(${e}, uv);
      }
    `:`
      float ${o}(int index) {
        vec2 uv = vec2(0.5, (float(index + ${l}) + 0.5) / ${s}.0);
        return sampleTexture(${e}, uv);
      }
    `:s===1?t?`
      float ${o}(int index) {
        vec2 uv = vec2((float(index + ${l}) + 0.5) / float(${e}TexShape[1]), 0.5);
        return sampleTexture(${e}, uv);
      }
    `:`
      float ${o}(int index) {
        vec2 uv = vec2((float(index + ${l}) + 0.5) / ${i}.0, 0.5);
        return sampleTexture(${e}, uv);
      }
    `:t?`
    float ${o}(int index) {
      vec2 uv = uvFromFlat(${e}TexShape[0], ${e}TexShape[1], index + ${l});
      return sampleTexture(${e}, uv);
    }
  `:`
    float ${o}(int index) {
      vec2 uv = uvFromFlat(${s}, ${i}, index + ${l});
      return sampleTexture(${e}, uv);
    }
  `}function Sz(r,t){let e=r.shapeInfo.logicalShape,o=r.name,n="get"+o.charAt(0).toUpperCase()+o.slice(1),s=r.shapeInfo.texShape,i=s[0],l=s[1],u=se();if(s!=null&&b.arraysEqual(e,s))return t?`
      vec4 ${n}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${o}TexShape[1], ${o}TexShape[0]);

        return ${u.texture2D}(${o}, uv);
      }
    `:`
      vec4 ${n}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${l}.0, ${i}.0);

        return ${u.texture2D}(${o}, uv);
      }
    `;if(t)return`
    vec4 ${n}(int row, int col) {
      ivec2 packedTexShape = ivec2(ceil(float(${o}TexShape[0]) / 2.0), ceil(float(${o}TexShape[1]) / 2.0));
      int valuesPerRow = int(ceil(float(${o}Shape[1]) / 2.0));
      vec2 uv = packedUVfrom2D(valuesPerRow, packedTexShape[0], packedTexShape[1], row, col);
      return ${u.texture2D}(${o}, uv);
    }
  `;let a=[Math.ceil(s[0]/2),Math.ceil(s[1]/2)],c=Math.ceil(e[1]/2);return`
    vec4 ${n}(int row, int col) {
      vec2 uv = packedUVfrom2D(${c}, ${a[0]}, ${a[1]}, row, col);
      return ${u.texture2D}(${o}, uv);
    }
  `}function kz(r,t){let e=r.shapeInfo.logicalShape,o=r.name,n="get"+o.charAt(0).toUpperCase()+o.slice(1),s=r.shapeInfo.texShape;if(s!=null&&b.arraysEqual(e,s)){if(t)return`
      float ${n}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${o}TexShape[1], ${o}TexShape[0]);
        return sampleTexture(${o}, uv);
      }
    `;let m=s[0],d=s[1];return`
    float ${n}(int row, int col) {
      vec2 uv = (vec2(col, row) + halfCR) / vec2(${d}.0, ${m}.0);
      return sampleTexture(${o}, uv);
    }
  `}let{newShape:i,keptDims:l}=b.squeezeShape(e),u=i;if(u.length<e.length){let m=lu(r,u),d=["row","col"];return`
      ${au(m,t)}
      float ${n}(int row, int col) {
        return ${n}(${uu(d,l)});
      }
    `}if(r.shapeInfo.isUniform)return`
      float ${n}(int row, int col) {
        int index = round(dot(vec2(row, col), vec2(${e[1]}, 1)));
        ${iu(r)}
      }
    `;let a=s[0],c=s[1],p=Ti(o);return c===1?t?`
      float ${n}(int row, int col) {
        float index = dot(vec3(row, col, ${p}), vec3(${o}Shape[1], 1, 1));
        vec2 uv = vec2(0.5, (index + 0.5) / float(${o}TexShape[0]));
        return sampleTexture(${o}, uv);
      }
    `:`
    float ${n}(int row, int col) {
      float index = dot(vec3(row, col, ${p}), vec3(${e[1]}, 1, 1));
      vec2 uv = vec2(0.5, (index + 0.5) / ${a}.0);
      return sampleTexture(${o}, uv);
    }
  `:a===1?t?`
      float ${n}(int row, int col) {
        float index = dot(vec3(row, col, ${p}), vec3(${o}Shape[1], 1, 1));
        vec2 uv = vec2((index + 0.5) / float(${o}TexShape[1]), 0.5);
        return sampleTexture(${o}, uv);
      }
    `:`
    float ${n}(int row, int col) {
      float index = dot(vec3(row, col, ${p}), vec3(${e[1]}, 1, 1));
      vec2 uv = vec2((index + 0.5) / ${c}.0, 0.5);
      return sampleTexture(${o}, uv);
    }
  `:t?`
      float ${n}(int row, int col) {
        // Explicitly use integer operations as dot() only works on floats.
        int index = row * ${o}Shape[1] + col + ${p};
        vec2 uv = uvFromFlat(${o}TexShape[0], ${o}TexShape[1], index);
        return sampleTexture(${o}, uv);
      }
    `:`
  float ${n}(int row, int col) {
    // Explicitly use integer operations as dot() only works on floats.
    int index = row * ${e[1]} + col + ${p};
    vec2 uv = uvFromFlat(${a}, ${c}, index);
    return sampleTexture(${o}, uv);
  }
`}function Tz(r,t){let e=r.shapeInfo.logicalShape,o=r.name,n="get"+o.charAt(0).toUpperCase()+o.slice(1),s=r.shapeInfo.texShape,i=[Math.ceil(s[0]/2),Math.ceil(s[1]/2)];if(e[0]===1){let m=e.slice(1),d=[1,2],f=lu(r,m),h=["b","row","col"];return`
        ${aT(f,t)}
        vec4 ${n}(int b, int row, int col) {
          return ${n}(${uu(h,d)});
        }
      `}let l=se();if(t)return`
    vec4 ${n}(int b, int row, int col) {
      ivec2 packedTexShape = ivec2(ceil(float(${o}TexShape[0]) / 2.0), ceil(float(${o}TexShape[1]) / 2.0));
      int valuesPerRow = int(ceil(float(${o}Shape[2]) / 2.0));
      int texelsInBatch = valuesPerRow * int(ceil(float(${o}Shape[1]) / 2.0));
      vec2 uv = packedUVfrom3D(
        packedTexShape[0], packedTexShape[1], texelsInBatch, valuesPerRow, b, row, col);
      return ${l.texture2D}(${o}, uv);
    }
  `;let u=i[0],a=i[1],c=Math.ceil(e[2]/2),p=c*Math.ceil(e[1]/2);return`
    vec4 ${n}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${u}, ${a}, ${p}, ${c}, b, row, col);
      return ${l.texture2D}(${o}, uv);
    }
  `}function _z(r,t){let e=r.shapeInfo.logicalShape,o=r.name,n="get"+o.charAt(0).toUpperCase()+o.slice(1),s=e[1]*e[2],i=e[2],{newShape:l,keptDims:u}=b.squeezeShape(e),a=l;if(a.length<e.length){let h=lu(r,a),g=["row","col","depth"];return`
        ${au(h,t)}
        float ${n}(int row, int col, int depth) {
          return ${n}(${uu(g,u)});
        }
      `}if(r.shapeInfo.isUniform)return`
      float ${n}(int row, int col, int depth) {
        int index = round(dot(vec3(row, col, depth),
                          vec3(${s}, ${i}, 1)));
        ${iu(r)}
      }
    `;let c=r.shapeInfo.texShape,p=c[0],m=c[1],d=r.shapeInfo.flatOffset;if(m===s&&d==null)return t?`
      float ${n}(int row, int col, int depth) {
        int stride1 = ${o}Shape[2];
        float texR = float(row);
        float texC = dot(vec2(col, depth), vec2(stride1, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${o}TexShape[1], ${o}TexShape[0]);
        return sampleTexture(${o}, uv);
      }
    `:`
        float ${n}(int row, int col, int depth) {
          float texR = float(row);
          float texC = dot(vec2(col, depth), vec2(${i}, 1));
          vec2 uv = (vec2(texC, texR) + halfCR) /
                     vec2(${m}.0, ${p}.0);
          return sampleTexture(${o}, uv);
        }
      `;if(m===i&&d==null)return t?`
      float ${n}(int row, int col, int depth) {
        float texR = dot(vec2(row, col), vec2(${o}Shape[1], 1));
        float texC = float(depth);
        vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${o}TexShape[1], ${o}TexShape[0]);
        return sampleTexture(${o}, uv);
      }
    `:`
    float ${n}(int row, int col, int depth) {
      float texR = dot(vec2(row, col), vec2(${e[1]}, 1));
      float texC = float(depth);
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${m}.0, ${p}.0);
      return sampleTexture(${o}, uv);
    }
  `;let f=Ti(o);return t?`
    float ${n}(int row, int col, int depth) {
      // Explicitly use integer operations as dot() only works on floats.
      int stride0 = ${o}Shape[1] * ${o}Shape[2];
      int stride1 = ${o}Shape[2];
      int index = row * stride0 + col * stride1 + depth + ${f};
      vec2 uv = uvFromFlat(${o}TexShape[0], ${o}TexShape[1], index);
      return sampleTexture(${o}, uv);
    }
    `:`
      float ${n}(int row, int col, int depth) {
        // Explicitly use integer operations as dot() only works on floats.
        int index = row * ${s} + col * ${i} + depth + ${f};
        vec2 uv = uvFromFlat(${p}, ${m}, index);
        return sampleTexture(${o}, uv);
      }
  `}function Nz(r,t){let e=r.name,o="get"+e.charAt(0).toUpperCase()+e.slice(1),n=se();if(t)return`
    vec4 ${o}(int b2, int b, int row, int col) {
      int valuesPerRow = int(ceil(float(${e}Shape[3]) / 2.0));
      int texelsInBatch = valuesPerRow * int(ceil(float(${e}Shape[2]) / 2.0));
      int index = b * texelsInBatch + (row / 2) * valuesPerRow + (col / 2);
      texelsInBatch *= ${e}Shape[1];
      index = b2 * texelsInBatch + index;
      ivec2 packedTexShape = ivec2(ceil(float(${e}TexShape[0]) / 2.0), ceil(float(${e}TexShape[1]) / 2.0));
      int texR = index / packedTexShape[1];
      int texC = index - texR * packedTexShape[1];
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(packedTexShape[1], packedTexShape[0]); return ${n.texture2D}(${e}, uv);
    }
  `;let s=r.shapeInfo.logicalShape,i=s.length,l=r.shapeInfo.texShape,u=[Math.ceil(l[0]/2),Math.ceil(l[1]/2)],a=u[0],c=u[1],p=Math.ceil(s[i-1]/2),m=p*Math.ceil(s[i-2]/2),d="int b, int row, int col",f=`b * ${m} + (row / 2) * ${p} + (col / 2)`;for(let h=2;h<i-1;h++)d=`int b${h}, `+d,m*=s[i-h-1],f=`b${h} * ${m} + `+f;return`
    vec4 ${o}(${d}) {
      int index = ${f};
      int texR = index / ${c};
      int texC = index - texR * ${c};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${c}, ${a});
      return ${n.texture2D}(${e}, uv);
    }
  `}function Az(r,t){let e=r.shapeInfo.logicalShape,o=r.name,n="get"+o.charAt(0).toUpperCase()+o.slice(1),s=e[3],i=e[2]*s,l=e[1]*i,{newShape:u,keptDims:a}=b.squeezeShape(e);if(u.length<e.length){let y=lu(r,u),C=["row","col","depth","depth2"];return`
      ${au(y,t)}
      float ${n}(int row, int col, int depth, int depth2) {
        return ${n}(${uu(C,a)});
      }
    `}if(r.shapeInfo.isUniform)return`
      float ${n}(int row, int col, int depth, int depth2) {
        int index = round(dot(vec4(row, col, depth, depth2),
                          vec4(${l}, ${i}, ${s}, 1)));
        ${iu(r)}
      }
    `;let c=r.shapeInfo.flatOffset,p=r.shapeInfo.texShape,m=p[0],d=p[1],f=`int stride2 = ${o}Shape[3];`,h=`int stride1 = ${o}Shape[2] * stride2;`,g=`int stride0 = ${o}Shape[1] * stride1;`;if(d===l&&c==null)return t?`
      float ${n}(int row, int col, int depth, int depth2) {
        ${f}
        ${h}
        float texR = float(row);
        float texC =
            dot(vec3(col, depth, depth2),
                vec3(stride1, stride2, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${o}TexShape[1], ${o}TexShape[0]);
        return sampleTexture(${o}, uv);
      }
    `:`
      float ${n}(int row, int col, int depth, int depth2) {
        float texR = float(row);
        float texC =
            dot(vec3(col, depth, depth2),
                vec3(${i}, ${s}, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${d}.0, ${m}.0);
        return sampleTexture(${o}, uv);
      }
    `;if(d===s&&c==null)return t?`
      float ${n}(int row, int col, int depth, int depth2) {
        float texR = dot(vec3(row, col, depth),
                         vec3(${o}Shape[1] * ${o}Shape[2], ${o}Shape[2], 1));
        float texC = float(depth2);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${o}TexShape[1], ${o}TexShape[0]);
        return sampleTexture(${o}, uv);
      }
    `:`
      float ${n}(int row, int col, int depth, int depth2) {
        float texR = dot(vec3(row, col, depth),
                         vec3(${e[1]*e[2]}, ${e[2]}, 1));
        float texC = float(depth2);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${d}.0, ${m}.0);
        return sampleTexture(${o}, uv);
      }
    `;let x=Ti(o);return t?`
    float ${n}(int row, int col, int depth, int depth2) {
      // Explicitly use integer operations as dot() only works on floats.
      ${f}
      ${h}
      ${g}
      int index = row * stride0 + col * stride1 +
          depth * stride2 + depth2;
      vec2 uv = uvFromFlat(${o}TexShape[0], ${o}TexShape[1], index + ${x});
      return sampleTexture(${o}, uv);
    }
  `:`
    float ${n}(int row, int col, int depth, int depth2) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * ${l} + col * ${i} +
          depth * ${s} + depth2;
      vec2 uv = uvFromFlat(${m}, ${d}, index + ${x});
      return sampleTexture(${o}, uv);
    }
  `}function Ez(r){let t=r.shapeInfo.logicalShape,e=r.name,o="get"+e.charAt(0).toUpperCase()+e.slice(1),n=t[4],s=t[3]*n,i=t[2]*s,l=t[1]*i,{newShape:u,keptDims:a}=b.squeezeShape(t);if(u.length<t.length){let h=lu(r,u),g=["row","col","depth","depth2","depth3"];return`
      ${au(h)}
      float ${o}(int row, int col, int depth, int depth2, int depth3) {
        return ${o}(${uu(g,a)});
      }
    `}if(r.shapeInfo.isUniform)return`
      float ${o}(int row, int col, int depth, int depth2, int depth3) {
        float index = dot(
          vec4(row, col, depth, depth2),
          vec4(${l}, ${i}, ${s}, ${n})) +
          depth3;
        ${iu(r)}
      }
    `;let c=r.shapeInfo.flatOffset,p=r.shapeInfo.texShape,m=p[0],d=p[1];if(d===l&&c==null)return`
      float ${o}(int row, int col, int depth, int depth2, int depth3) {
        int texR = row;
        float texC = dot(vec4(col, depth, depth2, depth3),
                         vec4(${i}, ${s}, ${n}, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${d}.0, ${m}.0);
        return sampleTexture(${e}, uv);
      }
    `;if(d===n&&c==null)return`
      float ${o}(int row, int col, int depth, int depth2, int depth3) {
        float texR = dot(
          vec4(row, col, depth, depth2),
          vec4(${t[1]*t[2]*t[3]},
               ${t[2]*t[3]}, ${t[3]}, 1));
        int texC = depth3;
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${d}.0, ${m}.0);
        return sampleTexture(${e}, uv);
      }
    `;let f=Ti(e);return`
    float ${o}(int row, int col, int depth, int depth2, int depth3) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * ${l} + col * ${i} + depth * ${s} +
          depth2 * ${n} + depth3 + ${f};
      vec2 uv = uvFromFlat(${m}, ${d}, index);
      return sampleTexture(${e}, uv);
    }
  `}function Rz(r){let t=r.shapeInfo.logicalShape,e=r.name,o="get"+e.charAt(0).toUpperCase()+e.slice(1),{newShape:n,keptDims:s}=b.squeezeShape(t);if(n.length<t.length){let g=lu(r,n),x=["row","col","depth","depth2","depth3","depth4"];return`
      ${au(g)}
      float ${o}(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        return ${o}(${uu(x,s)});
      }
    `}let i=t[5],l=t[4]*i,u=t[3]*l,a=t[2]*u,c=t[1]*a;if(r.shapeInfo.isUniform)return`
      float ${o}(int row, int col, int depth,
                  int depth2, int depth3, int depth4) {
        int index = round(dot(
          vec4(row, col, depth, depth2),
          vec4(${c}, ${a}, ${u}, ${l})) +
          dot(
            vec2(depth3, depth4),
            vec2(${i}, 1)));
        ${iu(r)}
      }
    `;let p=r.shapeInfo.flatOffset,m=r.shapeInfo.texShape,d=m[0],f=m[1];if(f===c&&p==null)return`
      float ${o}(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        int texR = row;
        float texC = dot(vec4(col, depth, depth2, depth3),
          vec4(${a}, ${u}, ${l}, ${i})) +
               float(depth4);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${f}.0, ${d}.0);
        return sampleTexture(${e}, uv);
      }
    `;if(f===i&&p==null)return`
      float ${o}(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        float texR = dot(vec4(row, col, depth, depth2),
          vec4(${t[1]*t[2]*t[3]*t[4]},
               ${t[2]*t[3]*t[4]},
               ${t[3]*t[4]},
               ${t[4]})) + float(depth3);
        int texC = depth4;
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${f}.0, ${d}.0);
        return sampleTexture(${e}, uv);
      }
    `;let h=Ti(e);return`
    float ${o}(int row, int col, int depth,
                  int depth2, int depth3, int depth4) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * ${c} + col * ${a} + depth * ${u} +
          depth2 * ${l} + depth3 * ${i} + depth4 + ${h};
      vec2 uv = uvFromFlat(${d}, ${f}, index);
      return sampleTexture(${e}, uv);
    }
  `}function iu(r){let t=r.name,e=b.sizeFromShape(r.shapeInfo.logicalShape);return e<2?`return ${t};`:`
    for (int i = 0; i < ${e}; i++) {
      if (i == index) {
        return ${t}[i];
      }
    }
  `}function Dz(r,t){let e=r.name,o=e.charAt(0).toUpperCase()+e.slice(1),n="get"+o+"AtOutCoords",s=r.shapeInfo.logicalShape.length,i=t.logicalShape.length,l=nT(r.shapeInfo.logicalShape,t.logicalShape),u=kt(i),a=i-s,c,p=["x","y","z","w","u","v"];s===0?c="":i<2&&l.length>=1?c="coords = 0;":c=l.map(y=>`coords.${p[y+a]} = 0;`).join(`
`);let m="";i<2&&s>0?m="coords":m=r.shapeInfo.logicalShape.map((y,C)=>`coords.${p[C+a]}`).join(", ");let d="return outputValue;",h=b.sizeFromShape(r.shapeInfo.logicalShape)===1,x=b.sizeFromShape(t.logicalShape)===1;if(s===1&&!h&&!x)d=`
      return vec4(outputValue.xy, outputValue.xy);
    `;else if(h&&!x)i===1?d=`
        return vec4(outputValue.x, outputValue.x, 0., 0.);
      `:d=`
        return vec4(outputValue.x);
      `;else if(l.length){let y=s-2,C=s-1;l.indexOf(y)>-1&&l.indexOf(C)>-1?d="return vec4(outputValue.x);":l.indexOf(y)>-1?d="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":l.indexOf(C)>-1&&(d="return vec4(outputValue.xx, outputValue.zz);")}return`
    vec4 ${n}() {
      ${u} coords = getOutputCoords();
      ${c}
      vec4 outputValue = get${o}(${m});
      ${d}
    }
  `}function Fz(r,t){let e=r.name,o=e.charAt(0).toUpperCase()+e.slice(1),n="get"+o+"AtOutCoords",s=t.texShape,i=r.shapeInfo.texShape,l=r.shapeInfo.logicalShape.length,u=t.logicalShape.length;if(!r.shapeInfo.isUniform&&l===u&&r.shapeInfo.flatOffset==null&&b.arraysEqual(i,s))return`
      float ${n}() {
        return sampleTexture(${e}, resultUV);
      }
    `;let a=kt(u),c=nT(r.shapeInfo.logicalShape,t.logicalShape),p=u-l,m,d=["x","y","z","w","u","v"];l===0?m="":u<2&&c.length>=1?m="coords = 0;":m=c.map(h=>`coords.${d[h+p]} = 0;`).join(`
`);let f="";return u<2&&l>0?f="coords":f=r.shapeInfo.logicalShape.map((h,g)=>`coords.${d[g+p]}`).join(", "),`
    float ${n}() {
      ${a} coords = getOutputCoords();
      ${m}
      return get${o}(${f});
    }
  `}function kt(r){if(r<=1)return"int";if(r===2)return"ivec2";if(r===3)return"ivec3";if(r===4)return"ivec4";if(r===5)return"ivec5";if(r===6)return"ivec6";throw Error(`GPU for rank ${r} is not yet supported`)}function Gm(r,t,e){let{newShape:o,keptDims:n}=b.squeezeShape(t),s=t.length,i=r&&s===3&&t[0]===1,l=i?t.slice(1):o,u=!r&&s>1&&!b.arraysEqual(t,e)&&o.length<s||i;return{useSqueezeShape:u,uniformShape:u?l:t,keptDims:n}}function lu(r,t){let e=JSON.parse(JSON.stringify(r));return e.shapeInfo.logicalShape=t,e}function uu(r,t){return t.map(e=>r[e]).join(", ")}function uT(r,t,e,o){let n=e.map((c,p)=>{let m={logicalShape:c.shape,texShape:c.isUniform?null:c.texData.texShape,isUniform:c.isUniform,isPacked:c.isUniform?!1:c.texData.isPacked,flatOffset:null};return c.texData!=null&&c.texData.slice!=null&&c.texData.slice.flatOffset>0&&(m.flatOffset=c.texData.slice.flatOffset),{name:t.variableNames[p],shapeInfo:m}}),s=n.map(c=>c.shapeInfo),i={logicalShape:o.shape,texShape:o.texData.texShape,isUniform:!1,isPacked:o.texData.isPacked,flatOffset:null},l=sT(n,i,t),u=L1(r.gl,l),a=r.createProgram(u);return $().get("ENGINE_COMPILE_ONLY")?{program:t,fragmentShader:u,source:l,webGLProgram:a,inShapeInfos:s,outShapeInfo:i,variablesLocations:null,customUniformLocations:null,infLoc:null,nanLoc:null,outShapeLocation:null,outShapeStridesLocation:null,outTexShapeLocation:null}:(r.buildVao(a),Object.assign({program:t,fragmentShader:u,source:l,webGLProgram:a,inShapeInfos:s,outShapeInfo:i},Zy(r,t,a)))}function Zy(r,t,e){let o=[],n=[],s,i,l,u=null,a=null;a=r.getUniformLocation(e,"NAN",!1),$().getNumber("WEBGL_VERSION")===1&&(u=r.getUniformLocation(e,"INFINITY",!1));let c=!1;for(let p of t.variableNames){let m={name:p,uniform:r.getUniformLocation(e,p,c),offset:r.getUniformLocation(e,`offset${p}`,c)};t.enableShapeUniforms&&(m.shape=r.getUniformLocation(e,`${p}Shape`,c),m.texShape=r.getUniformLocation(e,`${p}TexShape`,c)),o.push(m)}if(t.enableShapeUniforms&&(s=r.getUniformLocation(e,"outShape",c),l=r.getUniformLocation(e,"outShapeStrides",c),i=r.getUniformLocation(e,"outTexShape",c)),t.customUniforms)for(let p of t.customUniforms)n.push(r.getUniformLocation(e,p.name,c));return{variablesLocations:o,customUniformLocations:n,infLoc:u,nanLoc:a,outShapeLocation:s,outShapeStridesLocation:l,outTexShapeLocation:i}}function lT(r,t){if(r.length!==t.length)throw Error(`Binary was compiled with ${r.length} inputs, but was executed with ${t.length} inputs`);r.forEach((e,o)=>{let n=e.logicalShape,s=t[o],i=s.shape;if(!b.arraysEqual(n,i))throw Error(`Binary was compiled with different shapes than the current args. Shapes ${n} and ${i} must match`);if(e.isUniform&&s.isUniform)return;let l=e.texShape,u=s.isUniform?null:s.texData.texShape;if(!b.arraysEqual(l,u))throw Error(`Binary was compiled with different texture shapes than the current args. Shape ${l} and ${u} must match`)})}function cT(r,t,e,o,n){t.program.enableShapeUniforms||(lT(t.inShapeInfos,e),lT([t.outShapeInfo],[o]));let s=o.texData.texture,i=o.texData.texShape;o.texData.isPacked?r.setOutputPackedMatrixTexture(s.texture,i[0],i[1]):r.setOutputMatrixTexture(s.texture,i[0],i[1]),r.setProgram(t.webGLProgram),r.bindVertexArray(t.webGLProgram.vao),$().getNumber("WEBGL_VERSION")===1&&t.infLoc!==null&&r.gl.uniform1f(t.infLoc,1/0),t.nanLoc!==null&&r.gl.uniform1f(t.nanLoc,NaN);for(let u=0;u<e.length;++u){let a=e[u],{uniform:c,offset:p,shape:m,texShape:d}=t.variablesLocations[u];if(m){let{uniformShape:f}=Gm(t.program.packedInputs,a.shape,a.texData.texShape);switch(f.length){case 1:r.gl.uniform1iv(m,new Int32Array(f));break;case 2:r.gl.uniform2iv(m,new Int32Array(f));break;case 3:r.gl.uniform3iv(m,new Int32Array(f));break;case 4:r.gl.uniform4iv(m,new Int32Array(f));break;default:break}}if(d&&r.gl.uniform2i(d,a.texData.texShape[0],a.texData.texShape[1]),c!=null){if(a.isUniform){if(b.sizeFromShape(a.shape)<2)r.gl.uniform1f(c,a.uniformValues[0]);else{let f=a.uniformValues;f instanceof Float32Array||(f=new Float32Array(f)),r.gl.uniform1fv(c,f)}continue}a.texData.slice!=null&&p!=null&&r.gl.uniform1i(p,a.texData.slice.flatOffset),r.setInputMatrixTexture(a.texData.texture.texture,c,u)}}let l=t.outShapeLocation;if(l)switch(o.shape.length){case 1:r.gl.uniform1iv(l,new Int32Array(o.shape));break;case 2:r.gl.uniform2iv(l,new Int32Array(o.shape));break;case 3:r.gl.uniform3iv(l,new Int32Array(o.shape));break;case 4:r.gl.uniform4iv(l,new Int32Array(o.shape));break;default:break}if(t.outShapeStridesLocation){let u=b.computeStrides(o.shape);switch(o.shape.length){case 2:r.gl.uniform1iv(t.outShapeStridesLocation,new Int32Array(u));break;case 3:r.gl.uniform2iv(t.outShapeStridesLocation,new Int32Array(u));break;case 4:r.gl.uniform3iv(t.outShapeStridesLocation,new Int32Array(u));break;default:break}}if(t.outTexShapeLocation&&r.gl.uniform2i(t.outTexShapeLocation,o.texData.texShape[0],o.texData.texShape[1]),t.program.customUniforms&&n)for(let u=0;u<t.program.customUniforms.length;++u){let a=t.program.customUniforms[u],c=t.customUniformLocations[u],p=n[u];if(a.type==="float")r.gl.uniform1fv(c,p);else if(a.type==="vec2")r.gl.uniform2fv(c,p);else if(a.type==="vec3")r.gl.uniform3fv(c,p);else if(a.type==="vec4")r.gl.uniform4fv(c,p);else if(a.type==="int")r.gl.uniform1iv(c,p);else if(a.type==="ivec2")r.gl.uniform2iv(c,p);else if(a.type==="ivec3")r.gl.uniform3iv(c,p);else if(a.type==="ivec4")r.gl.uniform4iv(c,p);else throw Error(`uniform type ${a.type} is not supported yet.`)}r.executeProgram()}function pT(r,t,e){let o="";t.concat(e).forEach(i=>{let l=i.texData!=null&&i.texData.slice!=null&&i.texData.slice.flatOffset>0;if(r.enableShapeUniforms&&!i.isUniform){let u=i.texData.texShape,{useSqueezeShape:a,uniformShape:c,keptDims:p}=Gm(r.packedInputs,i.shape,u),m="",d="",f="";if(c.length===1&&r.packedInputs){let v=[Math.ceil(u[0]/2),Math.ceil(u[1]/2)];m=`${v[0]>1}_${v[1]>1}`}else if(c.length===2&&!r.packedInputs)d=`${c[0]>1}_${c[1]>1}`;else if(c.length>2&&!r.packedInputs){let v=b.computeStrides(c);f=`${v[0]===u[1]}_${v[v.length-1]===u[1]}`}let h=i.shape.length,g=c.length===2&&b.arraysEqual(i.shape,u),x=b.sizeFromShape(i.shape)===1,y=w.getBroadcastDims(i.shape,e.shape),C=!r.packedInputs&&h===e.shape.length&&b.arraysEqual(u,e.texData.texShape),I=r.packedInputs||c.length>2?"":`${u[0]>1}_${u[1]>1}`;o+=`${h}_${C}_${a?p:""}_${c.length}_${x}_${y}_${g}_${m}_${d}_${f}_${I}_${l}`}else{let u=i.isUniform?"uniform":i.texData.texShape;o+=`${i.shape}_${u}_${l}`}});let n=r.userCode,s=r.constructor.name;return s+="_"+o+"_"+n+`${$().getNumber("WEBGL_VERSION")}`,s}function jt(r){return $().getBool("WEBGL_USE_SHAPES_UNIFORMS")&&r<=4}var Vm=class{constructor(t){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.outPackingScheme=aa.DENSE,this.customUniforms=[{name:"texShape",type:"ivec2"}];let e=se();this.outputShape=t,this.enableShapeUniforms=jt(this.outputShape.length),this.userCode=`
      ivec3 outCoordsFromFlatIndex(int index) {
        ${this.enableShapeUniforms?ki(["r","c","d"],t):ao(["r","c","d"],t)}
        return ivec3(r, c, d);
      }

      void main() {
        ivec2 resTexRC = ivec2(resultUV.yx * vec2(texShape[0], texShape[1]));
        int index = 4 * (resTexRC.x * texShape[1] + resTexRC.y);

        vec4 result = vec4(0.);

        for (int i=0; i<4; i++) {
          int flatIndex = index + i;
          ivec3 rc = outCoordsFromFlatIndex(flatIndex);
          result[i] = getA(rc.x, rc.y, rc.z);
        }

        ${e.output} = result;
      }
    `}};var Wm=class{constructor(t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outPackingScheme=aa.DENSE,this.customUniforms=[{name:"texShape",type:"ivec2"}];let e=se();this.outputShape=t,this.enableShapeUniforms=jt(this.outputShape.length),this.userCode=`
      ivec3 outCoordsFromFlatIndex(int index) {
        ${this.enableShapeUniforms?ki(["r","c","d"],t):ao(["r","c","d"],t)}
        return ivec3(r, c, d);
      }

      void main() {
        ivec2 resTexRC = ivec2(resultUV.yx * vec2(texShape[0], texShape[1]));
        int index = 4 * (resTexRC.x * texShape[1] + resTexRC.y);

        vec4 result = vec4(0.);

        for (int i=0; i<4; i++) {
          int flatIndex = index + i;
          ivec3 rc = outCoordsFromFlatIndex(flatIndex);
          result[i] = getChannel(getA(rc.x, rc.y, rc.z), vec2(rc.y, rc.z));
        }

        ${e.output} = result;
      }
    `}};var zm=class{constructor(t){this.variableNames=["A"],this.outTexUsage=Ue.DOWNLOAD;let e=se();this.outputShape=t,this.userCode=`
      ${Um}

      void main() {
        float x = getAAtOutCoords();
        ${e.output} = encode_float(x);
      }
    `}};var Hm=class{constructor(t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!1,this.outTexUsage=Ue.DOWNLOAD;let e=se();this.outputShape=t,this.userCode=`
      ${Um}

      void main() {
        ivec3 coords = getOutputCoords();
        float x = getChannel(getAAtOutCoords(), vec2(coords.y, coords.z));
        ${e.output} = encode_float(x);
      }
    `}};var Pz={R:0,G:1,B:2,A:3},hc=class{constructor(t,e=!1,o="RGBA"){this.variableNames=["A"],this.customUniforms=[{name:"texShape",type:"ivec2"}];let n=se();this.outputShape=t,this.enableShapeUniforms=jt(this.outputShape.length);let s="result";e&&(s="floor(result * 255. + 0.5)");let i="";for(let l=0;l<o.length;l++){let u=o[l];i+=`
          if(offset == ${l}) {
            result = values[${Pz[u]}];
          }`}this.userCode=`
      ${this.enableShapeUniforms?nu():ou(t)}

      void main() {
        ivec3 coords = getOutputCoords();
        int flatIndex = getFlatIndex(coords);
        float result = 0.;
        int offset = imod(flatIndex, ${o.length});

        flatIndex = idiv(flatIndex, ${o.length}, 1.);

        int r = flatIndex / texShape[1];
        if (r < texShape[0]) {
          int c = imod(flatIndex, texShape[1]);
          vec2 uv = (vec2(c, r) + halfCR) / vec2(texShape[1], texShape[0]);
          vec4 values = ${n.texture2D}(A, uv);
          ${i}
        }
        ${n.output} = vec4(${s}, 0., 0., 0.);
      }
    `}};var Km=class{constructor(t,e=!1){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.customUniforms=[{name:"texShape",type:"ivec2"}];let o=se();this.outputShape=t,this.enableShapeUniforms=jt(this.outputShape.length);let n="",s="result";e&&(s="floor(result * 255. + 0.5)");for(let i=0;i<=1;i++)for(let l=0;l<=1;l++){let u=i*2+l;n+=`
          localCoords = coords;
          if(localCoords[2] + ${l} < ${this.enableShapeUniforms?"outShape[2]":`${t[2]}`}) {
          localCoords[2] += ${l};
          if (localCoords[1] + ${i} < ${this.enableShapeUniforms?"outShape[1]":`${t[1]}`}) {
            localCoords[1] += ${i};

            flatIndex = getFlatIndex(localCoords);
            offset = imod(flatIndex, 4);

            flatIndex = idiv(flatIndex, 4, 1.);

            int r = flatIndex / texShape[1];
            int c = imod(flatIndex, texShape[1]);
            vec2 uv = (vec2(c, r) + halfCR) / vec2(texShape[1], texShape[0]);
            values = ${o.texture2D}(A, uv);

            if (offset == 0) {
              result[${u}] = values[0];
            } else if (offset == 1) {
              result[${u}] = values[1];
            } else if (offset == 2) {
              result[${u}] = values[2];
            } else {
              result[${u}] = values[3];
            }
          }
        }
        `}this.userCode=`
        ${this.enableShapeUniforms?nu():ou(t)}

        void main() {
          ivec3 coords = getOutputCoords();

          vec4 result = vec4(0.);
          int flatIndex, r, c, offset;
          ivec3 localCoords;
          vec2 uv;
          vec4 values;

          ${n}

          ${o.output} = ${s};
        }
    `}};function mT(r){let t=se(),e=`${t.version}
    precision highp float;
    ${t.attribute} vec3 clipSpacePos;
    ${t.attribute} vec2 uv;
    ${t.varyingVs} vec2 resultUV;

    void main() {
      gl_Position = vec4(clipSpacePos, 1);
      resultUV = uv;
    }`;return B1(r,e)}function dT(r){let t=new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0]);return V1(r,t)}function fT(r){let t=new Uint16Array([0,1,2,2,1,3]);return W1(r,t)}function gc(r,t,e,o,n,s){H1(t,e);let i=z1(r),l=r.TEXTURE_2D;return lt(r,()=>r.bindTexture(l,i)),lt(r,()=>r.texParameteri(l,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE)),lt(r,()=>r.texParameteri(l,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)),lt(r,()=>r.texParameteri(l,r.TEXTURE_MIN_FILTER,r.NEAREST)),lt(r,()=>r.texParameteri(l,r.TEXTURE_MAG_FILTER,r.NEAREST)),$().getNumber("WEBGL_VERSION")===1?lt(r,()=>r.texImage2D(l,0,o,t,e,0,n,s,null)):lt(r,()=>r.texStorage2D(l,1,o,t,e)),lt(r,()=>r.bindTexture(r.TEXTURE_2D,null)),{texture:i,texShape:[e,t]}}function Qy(r){return r.internalFormatFloat}function hT(r,t,e,o){let[n,s]=vi(t,e);return gc(r,n,s,Qy(o),o.textureFormatFloat,r.FLOAT)}function Jy(r){return r.internalFormatHalfFloat}function gT(r,t,e,o){let[n,s]=vi(t,e);return gc(r,n,s,Jy(o),o.textureFormatFloat,o.textureTypeHalfFloat)}function tC(r){return r.downloadTextureFormat}function xT(r,t,e,o){let[n,s]=vi(t,e);return gc(r,n,s,tC(o),r.RGBA,r.UNSIGNED_BYTE)}function eC(r){return r.internalFormatPackedFloat}function bT(r,t,e,o){let[n,s]=So(t,e);return gc(r,n,s,eC(o),r.RGBA,r.FLOAT)}function rC(r){return r.internalFormatPackedHalfFloat}function yT(r,t,e,o){let[n,s]=So(t,e);return gc(r,n,s,rC(o),r.RGBA,o.textureTypeHalfFloat)}function CT(r,t,e){return lt(r,()=>r.bindBuffer(r.ARRAY_BUFFER,e)),jy(r,t,"clipSpacePos",e,3,20,0)&&jy(r,t,"uv",e,2,20,12)}function IT(r,t,e,o,n,s){lt(r,()=>r.bindTexture(r.TEXTURE_2D,t));let i,l,u;n instanceof Uint8Array?(i=new Uint8Array(e*o*4),l=r.UNSIGNED_BYTE,u=r.RGBA):(i=new Float32Array(e*o*4),l=r.FLOAT,u=s.internalFormatPackedFloat),i.set(n),$().getNumber("WEBGL_VERSION")===2?lt(r,()=>r.texSubImage2D(r.TEXTURE_2D,0,0,0,e,o,r.RGBA,l,i)):lt(r,()=>r.texImage2D(r.TEXTURE_2D,0,u,e,o,0,r.RGBA,l,i)),lt(r,()=>r.bindTexture(r.TEXTURE_2D,null))}function wT(r,t,e){lt(r,()=>r.bindTexture(r.TEXTURE_2D,t)),e.data instanceof Uint8Array?$().getNumber("WEBGL_VERSION")===2?lt(r,()=>r.texSubImage2D(r.TEXTURE_2D,0,0,0,e.width,e.height,r.RGBA,r.UNSIGNED_BYTE,e.data)):lt(r,()=>r.texImage2D(r.TEXTURE_2D,0,r.RGBA,e.width,e.height,0,r.RGBA,r.UNSIGNED_BYTE,e.data)):$().getNumber("WEBGL_VERSION")===2?lt(r,()=>r.texSubImage2D(r.TEXTURE_2D,0,0,0,r.RGBA,r.UNSIGNED_BYTE,e)):lt(r,()=>r.texImage2D(r.TEXTURE_2D,0,r.RGBA,r.RGBA,r.UNSIGNED_BYTE,e)),lt(r,()=>r.bindTexture(r.TEXTURE_2D,null))}function vT(r,t,e,o){let n=r.createBuffer();lt(r,()=>r.bindBuffer(r.PIXEL_PACK_BUFFER,n));let l=4*4*t*e;return lt(r,()=>r.bufferData(r.PIXEL_PACK_BUFFER,l,r.STREAM_READ)),lt(r,()=>r.readPixels(0,0,e,t,r.RGBA,r.FLOAT,0)),lt(r,()=>r.bindBuffer(r.PIXEL_PACK_BUFFER,null)),n}function ST(r,t,e){let o=r,n=new Float32Array(e);return o.bindBuffer(o.PIXEL_PACK_BUFFER,t),o.getBufferSubData(o.PIXEL_PACK_BUFFER,0,n),o.bindBuffer(o.PIXEL_PACK_BUFFER,null),n}function kT(r,t,e,o){let[n,s]=vi(t,e),i=4,l=new Uint8Array(M1(t*e,i));return lt(r,()=>r.readPixels(0,0,n,s,o.downloadTextureFormat,r.UNSIGNED_BYTE,l)),new Float32Array(l.buffer)}function TT(r,t,e,o,n,s,i,l){let u=r,a=new Float32Array(P1(s,i));return u.bindBuffer(u.PIXEL_PACK_BUFFER,t),u.getBufferSubData(u.PIXEL_PACK_BUFFER,0,a),u.bindBuffer(u.PIXEL_PACK_BUFFER,null),a}function _T(r,t,e){let o=new Float32Array(t*e*4);return lt(r,()=>r.readPixels(0,0,e,t,r.RGBA,r.FLOAT,o)),o}var cu=class{constructor(t){this.outputTexture=null,this.program=null,this.disposed=!1,this.itemsToPoll=[];let e=$().getNumber("WEBGL_VERSION");if(t!=null?(this.gl=t,$1(e,t)):this.gl=yr(e),t=this.gl,$().getNumber("WEBGL_VERSION")===2){let s=t;this.createVertexArray=()=>lt(s,()=>s.createVertexArray()),this.bindVertexArray=i=>lt(s,()=>s.bindVertexArray(i)),this.deleteVertexArray=i=>lt(s,()=>s.deleteVertexArray(i)),this.getVertexArray=()=>lt(s,()=>s.getParameter(s.VERTEX_ARRAY_BINDING))}else if(t!=null){let s=t.getExtension("OES_vertex_array_object");if(s==null)throw new Error("All WebGL1 implementations are expected to offer OES_vertex_array_object.");this.createVertexArray=()=>lt(t,()=>s.createVertexArrayOES()),this.bindVertexArray=i=>lt(t,()=>s.bindVertexArrayOES(i)),this.deleteVertexArray=i=>lt(t,()=>s.deleteVertexArrayOES(i)),this.getVertexArray=()=>lt(t,()=>t.getParameter(s.VERTEX_ARRAY_BINDING_OES))}let o="WEBGL_color_buffer_float",n="EXT_color_buffer_half_float";if(this.parallelCompilationExtension=this.gl.getExtension("KHR_parallel_shader_compile"),$().getNumber("WEBGL_VERSION")===1){let s="OES_texture_float",i="OES_texture_half_float";if(this.textureFloatExtension=mc(this.gl,s),Dr(this.gl,i))this.textureHalfFloatExtension=mc(this.gl,i);else if($().get("WEBGL_FORCE_F16_TEXTURES"))throw new Error("GL context does not support half float textures, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.");if(this.colorBufferFloatExtension=this.gl.getExtension(o),Dr(this.gl,n))this.colorBufferHalfFloatExtension=mc(this.gl,n);else if($().get("WEBGL_FORCE_F16_TEXTURES"))throw new Error("GL context does not support color renderable half floats, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.")}else if(o="EXT_color_buffer_float",Dr(this.gl,o))this.colorBufferFloatExtension=this.gl.getExtension(o);else if(Dr(this.gl,n))this.colorBufferHalfFloatExtension=this.gl.getExtension(n);else throw new Error("GL context does not support color renderable floats");this.vertexBuffer=dT(this.gl),this.indexBuffer=fT(this.gl),this.framebuffer=K1(this.gl),this.textureConfig=pc(this.gl,this.textureHalfFloatExtension)}get debug(){return $().getBool("DEBUG")}dispose(){if(this.disposed)return;this.program!=null&&console.warn("Disposing a GPGPUContext that still has a bound WebGLProgram. This is probably a resource leak, delete the program with GPGPUContext.deleteProgram before disposing."),this.outputTexture!=null&&console.warn("Disposing a GPGPUContext that still has a bound output matrix texture.  This is probably a resource leak, delete the output matrix texture with GPGPUContext.deleteMatrixTexture before disposing.");let t=this.gl;lt(t,()=>t.finish()),lt(t,()=>t.bindFramebuffer(t.FRAMEBUFFER,null)),lt(t,()=>t.deleteFramebuffer(this.framebuffer)),lt(t,()=>t.bindBuffer(t.ARRAY_BUFFER,null)),lt(t,()=>t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,null)),lt(t,()=>t.deleteBuffer(this.indexBuffer)),this.disposed=!0}createFloat32MatrixTexture(t,e){return this.throwIfDisposed(),hT(this.gl,t,e,this.textureConfig)}createFloat16MatrixTexture(t,e){return this.throwIfDisposed(),gT(this.gl,t,e,this.textureConfig)}createUnsignedBytesMatrixTexture(t,e){return this.throwIfDisposed(),xT(this.gl,t,e,this.textureConfig)}uploadPixelDataToTexture(t,e){this.throwIfDisposed(),wT(this.gl,t,e)}uploadDenseMatrixToTexture(t,e,o,n){this.throwIfDisposed(),IT(this.gl,t,e,o,n,this.textureConfig)}createFloat16PackedMatrixTexture(t,e){return this.throwIfDisposed(),yT(this.gl,t,e,this.textureConfig)}createPackedMatrixTexture(t,e){return this.throwIfDisposed(),bT(this.gl,t,e,this.textureConfig)}deleteMatrixTexture(t){this.throwIfDisposed(),this.outputTexture===t&&(Xy(this.gl,this.framebuffer),this.outputTexture=null),lt(this.gl,()=>this.gl.deleteTexture(t))}downloadByteEncodedFloatMatrixFromOutputTexture(t,e,o){return this.downloadMatrixDriver(t,()=>kT(this.gl,e,o,this.textureConfig))}downloadPackedMatrixFromBuffer(t,e,o,n,s,i){return TT(this.gl,t,e,o,n,s,i,this.textureConfig)}downloadFloat32MatrixFromBuffer(t,e){return ST(this.gl,t,e)}createBufferFromTexture(t,e,o){this.bindTextureToFrameBuffer(t);let n=vT(this.gl,e,o,this.textureConfig);return this.unbindTextureToFrameBuffer(),n}createAndWaitForFence(){let t=this.createFence(this.gl);return this.pollFence(t)}createFence(t){let e,o;if($().getBool("WEBGL_FENCE_API_ENABLED")){let n=t,s=n.fenceSync(n.SYNC_GPU_COMMANDS_COMPLETE,0);t.flush(),o=()=>{let i=n.clientWaitSync(s,0,0);return i===n.ALREADY_SIGNALED||i===n.CONDITION_SATISFIED},e=s}else $().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0?(e=this.beginQuery(),this.endQuery(),o=()=>this.isQueryAvailable(e,$().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))):o=()=>!0;return{query:e,isFencePassed:o}}downloadMatrixFromPackedTexture(t,e,o){return this.downloadMatrixDriver(t,()=>_T(this.gl,e,o))}createProgram(t){this.throwIfDisposed();let e=this.gl;this.vertexShader==null&&(this.vertexShader=mT(e));let o=U1(e);lt(e,()=>e.attachShader(o,this.vertexShader)),lt(e,()=>e.attachShader(o,t)),G1(e,o);let n=Object.assign(o,{vao:this.createVertexArray()});return this.debug&&Om(e,n),n}buildVao(t){this.setProgram(t),this.bindVertexArray(t.vao);let e=this.gl;lt(e,()=>e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,this.indexBuffer)),CT(e,t,this.vertexBuffer)}deleteProgram(t){this.throwIfDisposed(),t===this.program&&(this.program=null),t!=null&&(lt(this.gl,()=>this.gl.deleteProgram(t)),this.deleteVertexArray(t.vao))}setProgram(t){this.throwIfDisposed(),this.program=t,this.program!=null&&this.debug&&Om(this.gl,this.program),lt(this.gl,()=>this.gl.useProgram(t))}getUniformLocation(t,e,o=!0){return this.throwIfDisposed(),o?q1(this.gl,t,e):j1(this.gl,t,e)}getAttributeLocation(t,e){return this.throwIfDisposed(),lt(this.gl,()=>this.gl.getAttribLocation(t,e))}getUniformLocationNoThrow(t,e){return this.throwIfDisposed(),this.gl.getUniformLocation(t,e)}setInputMatrixTexture(t,e,o){this.throwIfDisposed(),this.throwIfNoProgram(),X1(this.gl,t,e,o)}setOutputMatrixTexture(t,e,o){this.setOutputMatrixTextureDriver(t,o,e)}setOutputPackedMatrixTexture(t,e,o){this.throwIfDisposed();let[n,s]=So(e,o);this.setOutputMatrixTextureDriver(t,n,s)}setOutputMatrixWriteRegion(t,e,o,n){this.setOutputMatrixWriteRegionDriver(o,t,n,e)}setOutputPackedMatrixWriteRegion(t,e,o,n){throw new Error("setOutputPackedMatrixWriteRegion not implemented.")}debugValidate(){this.program!=null&&Om(this.gl,this.program),dc(this.gl)}executeProgram(){this.throwIfDisposed(),this.throwIfNoProgram();let t=this.gl;if(this.debug){let e=this.getVertexArray();console.assert(e===this.program.vao,"VAO changed between setProgram and executeProgram!"),this.debugValidate()}lt(t,()=>t.drawElements(t.TRIANGLES,6,t.UNSIGNED_SHORT,0))}blockUntilAllProgramsCompleted(){this.throwIfDisposed(),lt(this.gl,()=>this.gl.finish())}getQueryTimerExtension(){return this.disjointQueryTimerExtension==null&&(this.disjointQueryTimerExtension=mc(this.gl,$().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")===2?"EXT_disjoint_timer_query_webgl2":"EXT_disjoint_timer_query")),this.disjointQueryTimerExtension}getQueryTimerExtensionWebGL2(){return this.getQueryTimerExtension()}getQueryTimerExtensionWebGL1(){return this.getQueryTimerExtension()}beginQuery(){if($().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")===2){let o=this.gl,n=this.getQueryTimerExtensionWebGL2(),s=o.createQuery();return o.beginQuery(n.TIME_ELAPSED_EXT,s),s}let t=this.getQueryTimerExtensionWebGL1(),e=t.createQueryEXT();return t.beginQueryEXT(t.TIME_ELAPSED_EXT,e),e}endQuery(){if($().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")===2){let e=this.gl,o=this.getQueryTimerExtensionWebGL2();e.endQuery(o.TIME_ELAPSED_EXT);return}let t=this.getQueryTimerExtensionWebGL1();t.endQueryEXT(t.TIME_ELAPSED_EXT)}async waitForQueryAndGetTime(t){return await b.repeatedTry(()=>this.disposed||this.isQueryAvailable(t,$().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))),this.getQueryTime(t,$().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))}getQueryTime(t,e){if(e===0)return null;if(e===2){let o=this.gl;return o.getQueryParameter(t,o.QUERY_RESULT)/1e6}else{let o=this.getQueryTimerExtensionWebGL1();return o.getQueryObjectEXT(t,o.QUERY_RESULT_EXT)/1e6}}isQueryAvailable(t,e){if(e===0)return!0;if(e===2){let o=this.gl,n=this.getQueryTimerExtensionWebGL2(),s=o.getQueryParameter(t,o.QUERY_RESULT_AVAILABLE);return this.disjoint==null&&(this.disjoint=this.gl.getParameter(n.GPU_DISJOINT_EXT)),s&&!this.disjoint}else{let o=this.getQueryTimerExtensionWebGL1(),n=o.getQueryObjectEXT(t,o.QUERY_RESULT_AVAILABLE_EXT);return this.disjoint==null&&(this.disjoint=this.gl.getParameter(o.GPU_DISJOINT_EXT)),n&&!this.disjoint}}pollFence(t){return new Promise(e=>{this.addItemToPoll(()=>t.isFencePassed(),()=>e())})}pollItems(){let t=Bz(this.itemsToPoll.map(e=>e.isDoneFn));for(let e=0;e<=t;++e){let{resolveFn:o}=this.itemsToPoll[e];o()}this.itemsToPoll=this.itemsToPoll.slice(t+1)}addItemToPoll(t,e){if(this.itemsToPoll.push({isDoneFn:t,resolveFn:e}),this.itemsToPoll.length>1)return;let o;"setTimeoutCustom"in $().platform&&(o=$().platform.setTimeoutCustom.bind($().platform)),b.repeatedTry(()=>(this.pollItems(),this.itemsToPoll.length===0),()=>0,null,o)}bindTextureToFrameBuffer(t){this.throwIfDisposed(),Bm(this.gl,t,this.framebuffer),this.debug&&dc(this.gl)}unbindTextureToFrameBuffer(){this.outputTexture!=null?(Bm(this.gl,this.outputTexture,this.framebuffer),this.debug&&dc(this.gl)):Xy(this.gl,this.framebuffer)}downloadMatrixDriver(t,e){this.bindTextureToFrameBuffer(t);let o=e();return this.unbindTextureToFrameBuffer(),o}setOutputMatrixTextureDriver(t,e,o){this.throwIfDisposed();let n=this.gl;Bm(n,t,this.framebuffer),this.debug&&dc(n),this.outputTexture=t,lt(n,()=>n.viewport(0,0,e,o)),lt(n,()=>n.scissor(0,0,e,o))}setOutputMatrixWriteRegionDriver(t,e,o,n){this.throwIfDisposed(),lt(this.gl,()=>this.gl.scissor(t,e,o,n))}throwIfDisposed(){if(this.disposed)throw new Error("Attempted to use disposed GPGPUContext.")}throwIfNoProgram(){if(this.program==null)throw new Error("No GPU program is currently set.")}};function Bz(r){let t=0;for(;t<r.length&&r[t]();++t);return t-1}var{addImpl:NT,bincountImpl:qm,bincountReduceImpl:AT,bitwiseAndImpl:ET,castImpl:RT,ceilImpl:DT,concatImpl:FT,equalImpl:$T,expImpl:MT,expm1Impl:PT,floorImpl:OT,gatherNdImpl:BT,gatherV2Impl:LT,greaterImpl:UT,greaterEqualImpl:GT,lessImpl:VT,lessEqualImpl:WT,linSpaceImpl:zT,logImpl:HT,maxImpl:KT,maximumImpl:qT,minimumImpl:jT,multiplyImpl:XT,negImpl:YT,notEqualImpl:ZT,prodImpl:QT,raggedGatherImpl:JT,raggedRangeImpl:t_,raggedTensorToTensorImpl:e_,rangeImpl:r_,rsqrtImpl:o_,scatterImpl:n_,sigmoidImpl:s_,simpleAbsImpl:jm,sliceImpl:a_,sparseFillEmptyRowsImpl:i_,sparseReshapeImpl:l_,sparseSegmentReductionImpl:Xm,sqrtImpl:u_,staticRegexReplaceImpl:c_,stridedSliceImpl:p_,stringNGramsImpl:m_,stringSplitImpl:d_,stringToHashBucketFastImpl:f_,subImpl:h_,tileImpl:g_,topKImpl:x_,transposeImpl:_i,uniqueImpl:b_}=Ey;function oC(r,t){return["x","y","z","w","u","v"].slice(0,t).map(e=>`${r}.${e}`)}function de(r,t){return t===1?[r]:oC(r,t)}function y_(r,t){if(r===1)return"rc";let e="";for(let o=0;o<r;o++)e+=t[o],o<r-1&&(e+=",");return e}var Ym=class{constructor(t){if(this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.outputShape=t,this.rank=t.length,this.enableShapeUniforms=jt(this.outputShape.length),this.rank===0)this.userCode=`
        void main() {
          setOutput(vec4(getA(), 0., 0., 0.));
        }
      `;else{let e=de("rc",this.rank),o=kt(this.rank),n=this.getOutOfBoundsCondition(e),s=this.getSetup(e),i=this.getOutput(e);this.userCode=`
        void main() {
          ${o} rc = getOutputCoords();

          if(${n}) {
            setOutput(vec4(0));
          } else {
            ${s}

            setOutput(vec4(${i}));
          }
        }
      `}}getSourceCoordsArr(t){let e=[];for(let o=0;o<=1;o++)for(let n=0;n<=1;n++){let s=`${o===0?"r":"rp1"}, ${n===0?"c":"cp1"}`;for(let i=2;i<this.rank;i++)s=`${t[t.length-1-i]},`+s;e.push(s)}return e}getOutOfBoundsCondition(t){if(this.rank===1)return`rc > ${this.enableShapeUniforms?"outShape":this.outputShape[0]}`;let e="";for(let o=this.rank-2;o<this.rank;o++)e+=`${t[o]} >= ${this.enableShapeUniforms?`outShape[${o}]`:this.outputShape[o]}`,o<this.rank-1&&(e+="||");return e}getSetup(t){if(this.rank===1)return"";let e=t.slice(-2),o=this.enableShapeUniforms?`outShape[${this.rank} - 1]`:this.outputShape[this.rank-1],n=this.enableShapeUniforms?`outShape[${this.rank} - 2]`:this.outputShape[this.rank-2];return`
      int r = ${e[0]};
      int c = ${e[1]};
      int rp1 = r + 1;
      int cp1 = c + 1;

      bool cEdge = cp1 >= ${o};
      bool rEdge = rp1 >= ${n};
    `}getOutput(t){let e=this.getSourceCoordsArr(t);return this.rank===1?`getA(rc), (rc + 1 >= ${this.enableShapeUniforms?"outShape":this.outputShape[0]} ? 0. : getA(rc + 1)), 0, 0`:`getA(${e[0]}),
            cEdge ? 0. : getA(${e[1]}),
            rEdge ? 0. : getA(${e[2]}),
            rEdge || cEdge ? 0. : getA(${e[3]})`}};var pu=class{constructor(t,e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"inputShape",type:"ivec3"}],this.outputShape=t,this.enableShapeUniforms=jt(this.outputShape.length);let o="";for(let n=0;n<4;n++){let s="thisRC = rc;";n%2===1&&(s+="thisRC.z += 1;"),n>1&&(s+="thisRC.y += 1;"),o+=`
        ${s}
        ${n>0?"if(thisRC.y < rows && thisRC.z < cols){":""}
          int flatIndex = getFlatIndex(thisRC);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flatIndex);
          vec2 inputRCInnerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${n}] =
            getChannel(getA(inputRC.x, inputRC.y, inputRC.z), inputRCInnerDims);
        ${n>0?"}":""}
      `}this.userCode=`
      ${Lz(e,this.enableShapeUniforms)}
      ${this.enableShapeUniforms?nu():ou(t)}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.);

        ivec3 thisRC;
        int rows = ${this.enableShapeUniforms?"outShape[1]":t[1]};
        int cols = ${this.enableShapeUniforms?"outShape[2]":t[2]};

        ${o}

        setOutput(result);
      }
    `}};function Lz(r,t){return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${t?oT(["r","c","d"],"inputShape"):ao(["r","c","d"],r)}
      return ivec3(r, c, d);
    }
  `}var Zm=class{constructor(t){this.gpgpu=t,this.numUsedTextures=0,this.numFreeTextures=0,this._numBytesAllocated=0,this._numBytesFree=0,this.freeTextures={},this.usedTextures={},this.logEnabled=!1}acquireTexture(t,e,o){let n=I_(e,o),s=w_(t,n,o);s in this.freeTextures||(this.freeTextures[s]=[]),s in this.usedTextures||(this.usedTextures[s]=[]);let i=C_(t,n,this.gpgpu.gl,this.gpgpu.textureConfig,o);if(this.freeTextures[s].length>0){this.numFreeTextures--,this.numUsedTextures++,this._numBytesFree-=i,this.log();let u=this.freeTextures[s].pop();return this.usedTextures[s].push(u),u}let l;return n===Fe.PACKED_2X2_FLOAT32?l=this.gpgpu.createPackedMatrixTexture(t[0],t[1]):n===Fe.PACKED_2X2_FLOAT16?l=this.gpgpu.createFloat16PackedMatrixTexture(t[0],t[1]):n===Fe.UNPACKED_FLOAT32?l=this.gpgpu.createFloat32MatrixTexture(t[0],t[1]):n===Fe.UNPACKED_FLOAT16?l=this.gpgpu.createFloat16MatrixTexture(t[0],t[1]):n===Fe.PACKED_4X1_UNSIGNED_BYTE&&(l=this.gpgpu.createUnsignedBytesMatrixTexture(t[0],t[1])),this.usedTextures[s].push(l),this.numUsedTextures++,this._numBytesAllocated+=i,this.log(),l}releaseTexture(t,e,o,n){if(this.freeTextures==null)return;let s=I_(o,n),i=w_(e,s,n);i in this.freeTextures||(this.freeTextures[i]=[]);let l=C_(e,s,this.gpgpu.gl,this.gpgpu.textureConfig,n),u=$().getNumber("WEBGL_DELETE_TEXTURE_THRESHOLD");u!==-1&&this._numBytesAllocated>u?(this.gpgpu.deleteMatrixTexture(t.texture),this._numBytesAllocated-=l):(this.freeTextures[i].push(t),this.numFreeTextures++,this._numBytesFree+=l),this.numUsedTextures--;let a=this.usedTextures[i],c=a&&a.indexOf(t);if(c==null||c<0)throw new Error("Cannot release a texture that was never provided by this texture manager");a[c]=a[a.length-1],a.pop(),this.log()}log(){if(!this.logEnabled)return;let t=this.numFreeTextures+this.numUsedTextures;console.log("Free/Used",`${this.numFreeTextures} / ${this.numUsedTextures}`,`(${t})`);let e=this._numBytesFree/this._numBytesAllocated;console.log(`Bytes allocated: ${this._numBytesAllocated}`),console.log(`Bytes unused: ${this._numBytesFree} (${Math.round(100*e)}%)`)}get numBytesAllocated(){return this._numBytesAllocated}get numBytesFree(){return this._numBytesFree}getNumUsedTextures(){return this.numUsedTextures}getNumFreeTextures(){return this.numFreeTextures}dispose(){if(this.freeTextures!=null){for(let t in this.freeTextures)this.freeTextures[t].forEach(e=>{this.gpgpu.deleteMatrixTexture(e.texture)});for(let t in this.usedTextures)this.usedTextures[t].forEach(e=>{this.gpgpu.deleteMatrixTexture(e.texture)});this.freeTextures=null,this.usedTextures=null,this.numUsedTextures=0,this.numFreeTextures=0,this._numBytesAllocated=0,this._numBytesFree=0}}};function Uz(r,t){let e=r;if(t===e.R32F)return 4;if(t===e.R16F)return 2;if(t===e.RGBA32F)return 16;if(t===r.RGBA)return 16;if(t===e.RGBA16F)return 8;if(t===e.RGBA8)return 4;throw new Error(`Unknown internal format ${t}`)}function C_(r,t,e,o,n){let s=Gz(t,o),i;if(n){let[u,a]=So(r[0],r[1]);i=u*a}else{let[u,a]=vi(r[0],r[1]);i=u*a}let l=Uz(e,s);return i*l}function Gz(r,t){switch(r){case Fe.PACKED_2X2_FLOAT32:return eC(t);case Fe.PACKED_2X2_FLOAT16:return rC(t);case Fe.UNPACKED_FLOAT32:return Qy(t);case Fe.UNPACKED_FLOAT16:return Jy(t);case Fe.PACKED_4X1_UNSIGNED_BYTE:return tC(t);default:throw new Error(`Unknown physical texture type ${r}`)}}function Vz(r){return $().getBool("WEBGL_RENDER_FLOAT32_ENABLED")?r?Fe.PACKED_2X2_FLOAT32:Fe.UNPACKED_FLOAT32:r?Fe.PACKED_2X2_FLOAT16:Fe.UNPACKED_FLOAT16}function I_(r,t){if(r===Ue.UPLOAD)return Fe.PACKED_2X2_FLOAT32;if(r===Ue.RENDER||r==null)return Vz(t);if(r===Ue.DOWNLOAD||r===Ue.PIXELS)return Fe.PACKED_4X1_UNSIGNED_BYTE;throw new Error(`Unknown logical texture type ${r}`)}function w_(r,t,e){return`${r[0]}_${r[1]}_${t}_${e}`}var $e=class{constructor(t,e){this.variableNames=["A"],this.outputShape=t,this.enableShapeUniforms=jt(this.outputShape.length),this.userCode=`
      float unaryOperation(float x) {
        ${e}
      }

      void main() {
        float x = getAAtOutCoords();
        float y = unaryOperation(x);

        setOutput(y);
      }
    `}},we="if (isnan(x)) return x;",v_="return x;",nC="return abs(x);";var S_="return (x >= 0.0) ? x : (exp(x) - 1.0);",k_=we+`
  return (x < 0.0) ? 0.0 : x;
`,T_=we+`
  return (x < 0.0) ? 0.0 : min(6.0, x);
`,To="return x;",__="return 1.0 / (1.0 + exp(-1.0 * x));";var A_="return x;",E_=`
  vec4 result;

  result.r = (x.r >= 0.0) ? x.r : (exp(x.r) - 1.0);
  result.g = (x.g >= 0.0) ? x.g : (exp(x.g) - 1.0);
  result.b = (x.b >= 0.0) ? x.b : (exp(x.b) - 1.0);
  result.a = (x.a >= 0.0) ? x.a : (exp(x.a) - 1.0);

  return result;
`,R_=`
  vec4 result = x * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,D_=`
  vec4 result = min(x, vec4(6.)) * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,F_="return 1.0 / (1.0 + exp(-1.0 * x));",nr=class{constructor(t,e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t,this.enableShapeUniforms=jt(this.outputShape.length),this.userCode=`
      vec4 unaryOperation(vec4 x) {
        ${e}
      }

      void main() {
        vec4 x = getAAtOutCoords();
        vec4 y = unaryOperation(x);

        setOutput(y);
      }
    `}};var Qm=class{constructor(t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!1,this.outputShape=t,this.enableShapeUniforms=jt(this.outputShape.length);let e=t.length,o=de("rc",e),n=kt(e),s=y_(e,o),i=o.slice(-2),l=e<=1?"rc":`vec2(${i.join(",")})`;this.userCode=`
      void main() {
        ${n} rc = getOutputCoords();
        vec4 packedInput = getA(${s});

        setOutput(getChannel(packedInput, ${l}));
      }
    `}};var zz=Be.whereImpl,Hz=1e-7,Kz=1e-4,Jm={};function qz(r){return r in Jm||(Jm[r]={}),Jm[r]}var jz=$().getNumber("CPU_HANDOFF_SIZE_THRESHOLD"),Xz=600;function Yz(){return $().global.screen==null?1024:$().global.screen.height*$().global.screen.width*window.devicePixelRatio*Xz/1024/1024}var xc=class r extends Xr{nextDataId(){return r.nextDataId++}constructor(t){if(super(),this.pendingRead=new WeakMap,this.pendingDisposal=new WeakSet,this.dataRefCount=new WeakMap,this.numBytesInGPU=0,this.uploadWaitMs=0,this.downloadWaitMs=0,this.lastGlFlushTime=0,this.warnedAboutMemory=!1,this.pendingDeletes=0,this.disposed=!1,!$().getBool("HAS_WEBGL"))throw new Error("WebGL is not supported on this device");let e;if(t!=null){if(t instanceof cu)e=t;else{let o=yr($().getNumber("WEBGL_VERSION"),t);e=new cu(o)}this.binaryCache={},this.gpgpuCreatedLocally=!1}else{let o=yr($().getNumber("WEBGL_VERSION"));e=new cu(o),this.binaryCache=qz($().getNumber("WEBGL_VERSION")),this.gpgpuCreatedLocally=!0}this.gpgpu=e,this.canvas=this.gpgpu.gl.canvas,this.textureManager=new Zm(this.gpgpu),this.numMBBeforeWarning=Yz(),this.texData=new $o(this,gr())}numDataIds(){return this.texData.numDataIds()-this.pendingDeletes}writeTexture(t,e,o,n,s,i){let l=this.makeTensorInfo(e,o),u=this.texData.get(l.dataId);u.isPacked=!1,u.texture={texture:t,texShape:[n,s]},u.texShape=[n,s];let a=fc(e),c=new hc(a,!1,i),p=this.runWebGLProgram(c,[l],o,[[n,s]]);return p.shape=e,u.texture=null,this.disposeIntermediateTensorInfo(l),p.dataId}write(t,e,o){if(($().getBool("WEBGL_CHECK_NUMERICAL_PROBLEMS")||$().getBool("DEBUG"))&&this.checkNumericalProblems(t),o==="complex64"&&t!=null)throw new Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");let n={id:this.nextDataId()};return this.texData.set(n,{shape:e,dtype:o,values:t,usage:Ue.UPLOAD,refCount:1}),n}refCount(t){return this.texData.has(t)?this.texData.get(t).refCount:0}incRef(t){let e=this.texData.get(t);e.refCount++}decRef(t){if(this.texData.has(t)){let e=this.texData.get(t);e.refCount--}}move(t,e,o,n,s){if($().getBool("DEBUG")&&this.checkNumericalProblems(e),n==="complex64")throw new Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");this.texData.set(t,{shape:o,dtype:n,values:e,usage:Ue.UPLOAD,refCount:s})}disposeIntermediateTensorInfo(t){this.disposeData(t.dataId)}readSync(t){let e=this.texData.get(t),{values:o,dtype:n,complexTensorInfos:s,slice:i,shape:l,isPacked:u}=e;if(i!=null){let m;u?m=new nr(l,To):m=new $e(l,To);let d=this.runWebGLProgram(m,[{dataId:t,shape:l,dtype:n}],n),f=this.readSync(d.dataId);return this.disposeIntermediateTensorInfo(d),f}if(o!=null)return this.convertAndCacheOnCPU(t);if(n==="string")return o;let a=this.activeTimers!=null,c;a&&(c=b.now());let p;if(n==="complex64"){let m=this.readSync(s.real.dataId),d=this.readSync(s.imag.dataId);p=w.mergeRealAndImagArrays(m,d)}else p=this.getValuesFromTexture(t);return a&&(this.downloadWaitMs+=b.now()-c),this.convertAndCacheOnCPU(t,p)}async read(t){if(this.pendingRead.has(t)){let f=this.pendingRead.get(t);return new Promise(h=>f.push(h))}let e=this.texData.get(t),{values:o,shape:n,slice:s,dtype:i,complexTensorInfos:l,isPacked:u}=e;if(s!=null){let f;u?f=new nr(n,To):f=new $e(n,To);let h=this.runWebGLProgram(f,[{dataId:t,shape:n,dtype:i}],i),g=this.read(h.dataId);return this.disposeIntermediateTensorInfo(h),g}if(o!=null)return this.convertAndCacheOnCPU(t);if($().getBool("DEBUG")&&!$().getBool("WEBGL_DOWNLOAD_FLOAT_ENABLED")&&$().getNumber("WEBGL_VERSION")===2)throw new Error("tensor.data() with WEBGL_DOWNLOAD_FLOAT_ENABLED=false and WEBGL_VERSION=2 not yet supported.");let a=null,c;if(i!=="complex64"&&$().get("WEBGL_BUFFER_SUPPORTED")){c=this.decode(t);let f=this.texData.get(c.dataId);a=this.gpgpu.createBufferFromTexture(f.texture.texture,...cc(n))}this.pendingRead.set(t,[]),i!=="complex64"&&await this.gpgpu.createAndWaitForFence();let p;if(i==="complex64"){let f=await Promise.all([this.read(l.real.dataId),this.read(l.imag.dataId)]),h=f[0],g=f[1];p=w.mergeRealAndImagArrays(h,g)}else if(a==null)p=this.getValuesFromTexture(t);else{let f=b.sizeFromShape(n);p=this.gpgpu.downloadFloat32MatrixFromBuffer(a,f)}if(c!=null&&this.disposeIntermediateTensorInfo(c),a!=null){let f=this.gpgpu.gl;lt(f,()=>f.deleteBuffer(a))}let m=this.convertAndCacheOnCPU(t,p),d=this.pendingRead.get(t);return this.pendingRead.delete(t),d.forEach(f=>f(m)),this.pendingDisposal.has(t)&&(this.pendingDisposal.delete(t),this.disposeData(t)&&gr().removeDataId(t,this),this.pendingDeletes--),m}readToGPU(t,e={}){let o=this.texData.get(t),{values:n,shape:s,slice:i,dtype:l,isPacked:u,texture:a}=o;if(l==="complex64")throw new Error("Does not support reading texture for complex64 dtype.");if(i!=null){let d;u?d=new nr(s,To):d=new $e(s,To);let f=this.runWebGLProgram(d,[{dataId:t,shape:s,dtype:l}],l),h=this.readToGPU(f,e);return this.disposeIntermediateTensorInfo(f),h}if(a==null)throw n!=null?new Error("Data is not on GPU but on CPU."):new Error("There is no data on GPU or CPU.");let c=this.decode(t,e.customTexShape),p=gr().makeTensorFromTensorInfo(c),m=this.texData.get(c.dataId);return Object.assign({tensorRef:p},m.texture)}bufferSync(t){let e=this.readSync(t.dataId);if(t.dtype==="string")try{let o=e.map(n=>b.decodeString(n));return gt(t.shape,t.dtype,o)}catch{throw new Error("Failed to decode encoded string bytes into utf-8")}return gt(t.shape,t.dtype,e)}checkNumericalProblems(t){if(t!=null)for(let e=0;e<t.length;e++){let o=t[e];if(!O1(o))throw $().getBool("WEBGL_RENDER_FLOAT32_CAPABLE")?Error(`The value ${o} cannot be represented with your current settings. Consider enabling float32 rendering: 'tf.env().set('WEBGL_RENDER_FLOAT32_ENABLED', true);'`):Error(`The value ${o} cannot be represented on this device.`)}}getValuesFromTexture(t){let{shape:e,dtype:o,isPacked:n}=this.texData.get(t),s=b.sizeFromShape(e);if($().getBool("WEBGL_DOWNLOAD_FLOAT_ENABLED")){let m=this.decode(t),d=this.texData.get(m.dataId),f=this.gpgpu.downloadMatrixFromPackedTexture(d.texture.texture,...cc(e)).subarray(0,s);return this.disposeIntermediateTensorInfo(m),f}let i=$().getBool("WEBGL_PACK")&&n===!0,l=i?fc(e):e,u=i?new Hm(l):new zm(l),a=this.runWebGLProgram(u,[{shape:l,dtype:o,dataId:t}],"float32"),c=this.texData.get(a.dataId),p=this.gpgpu.downloadByteEncodedFloatMatrixFromOutputTexture(c.texture.texture,c.texShape[0],c.texShape[1]).subarray(0,s);return this.disposeIntermediateTensorInfo(a),p}timerAvailable(){return $().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0}time(t){let e=this.activeTimers,o=[],n=!1;this.programTimersStack==null?(this.programTimersStack=o,n=!0):this.activeTimers.push(o),this.activeTimers=o,t();let s=b.flatten(this.activeTimers.map(u=>u.query)).filter(u=>u!=null),i=b.flatten(this.activeTimers.map(u=>u.name)).filter(u=>u!=null);this.activeTimers=e,n&&(this.programTimersStack=null);let l={uploadWaitMs:this.uploadWaitMs,downloadWaitMs:this.downloadWaitMs,kernelMs:null,wallMs:null};return(async()=>{if($().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0){let u=await Promise.all(s);l.kernelMs=b.sum(u),l.getExtraProfileInfo=()=>u.map((a,c)=>({name:i[c],ms:a})).map(a=>`${a.name}: ${a.ms}`).join(", ")}else l.kernelMs={error:"WebGL query timers are not supported in this environment."};return this.uploadWaitMs=0,this.downloadWaitMs=0,l})()}memory(){return{unreliable:!1,numBytesInGPU:this.numBytesInGPU,numBytesInGPUAllocated:this.textureManager.numBytesAllocated,numBytesInGPUFree:this.textureManager.numBytesFree}}startTimer(){return $().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?this.gpgpu.beginQuery():{startMs:b.now(),endMs:null}}endTimer(t){return $().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?(this.gpgpu.endQuery(),t):(t.endMs=b.now(),t)}async getQueryTime(t){if($().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0)return this.gpgpu.waitForQueryAndGetTime(t);let e=t;return e.endMs-e.startMs}disposeData(t,e=!1){if(this.pendingDisposal.has(t))return!1;if(!this.texData.has(t))return!0;if(e?this.texData.get(t).refCount=0:this.texData.get(t).refCount--,!e&&this.texData.get(t).refCount>0)return!1;if(this.pendingRead.has(t))return this.pendingDisposal.add(t),this.pendingDeletes++,!1;this.releaseGPUData(t);let{complexTensorInfos:o}=this.texData.get(t);return o!=null&&(this.disposeData(o.real.dataId,e),this.disposeData(o.imag.dataId,e)),this.texData.delete(t),!0}releaseGPUData(t){let{texture:e,dtype:o,texShape:n,usage:s,isPacked:i,slice:l}=this.texData.get(t),u=l&&l.origDataId||t,a=this.dataRefCount.get(u);a>1?this.dataRefCount.set(u,a-1):(this.dataRefCount.delete(u),e!=null&&(this.numBytesInGPU-=this.computeBytes(n,o),this.textureManager.releaseTexture(e,n,s,i)));let c=this.texData.get(t);c.texture=null,c.texShape=null,c.isPacked=!1,c.slice=null}getTexture(t){return this.uploadToGPU(t),this.texData.get(t).texture.texture}getDataInfo(t){return this.texData.get(t)}shouldExecuteOnCPU(t,e=jz){return $().getBool("WEBGL_CPU_FORWARD")&&t.every(o=>this.texData.get(o.dataId).texture==null&&b.sizeFromShape(o.shape)<e)}getGPGPUContext(){return this.gpgpu}where(t){w.warn("tf.where() in webgl locks the UI thread. Call tf.whereAsync() instead");let e=t.dataSync();return zz(t.shape,e)}packedUnaryOp(t,e,o){let n=new nr(t.shape,e),s=this.compileAndRun(n,[t],o);return gr().makeTensorFromTensorInfo(s)}abs(t){if(this.shouldExecuteOnCPU([t])&&t.dtype!=="complex64"){let n=jm(this.texData.get(t.dataId).values);return this.makeOutput(t.shape,t.dtype,n)}if($().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(t,nC,t.dtype);let e=new $e(t.shape,nC),o=this.compileAndRun(e,[t]);return gr().makeTensorFromTensorInfo(o)}makeTensorInfo(t,e,o){let n;if(e==="string"&&o!=null&&o.length>0&&b.isString(o[0])){let s=o.map(i=>b.encodeString(i));n=this.write(s,t,e)}else n=this.write(o,t,e);return this.texData.get(n).usage=null,{dataId:n,shape:t,dtype:e}}makeOutput(t,e,o){return gr().makeTensorFromTensorInfo(this.makeTensorInfo(t,e,o),this)}unpackTensor(t){let e=new Qm(t.shape);return this.runWebGLProgram(e,[t],t.dtype)}packTensor(t){let e=new Ym(t.shape);return this.runWebGLProgram(e,[t],t.dtype,null,!0)}packedReshape(t,e){let o=[ia(t.shape),...la(t.shape)],n={dtype:t.dtype,shape:o,dataId:t.dataId},s=[ia(e),...la(e)],i=new pu(s,o),l=!0,u=[o],a=this.runWebGLProgram(i,[n],t.dtype,u,l);return{dataId:a.dataId,shape:e,dtype:a.dtype}}decode(t,e){let o=this.texData.get(t),{isPacked:n,shape:s,dtype:i}=o;if(e!=null){let m=b.sizeFromShape(s),d=e[0]*e[1]*4;b.assert(m<=d,()=>"customTexShape is too small. Row * Column * 4 should be equal or larger than the size of the tensor data.")}let l=fc(s),u;n?u=new Wm(l):u=new Vm(l);let a=!0,c=[e??cc(l)],p=this.runWebGLProgram(u,[{shape:l,dtype:i,dataId:t}],i,c,a,e);return{dtype:i,shape:s,dataId:p.dataId}}runWebGLProgram(t,e,o,n,s=!1,i){let l=this.makeTensorInfo(t.outputShape,o),u=this.texData.get(l.dataId);if(t.packedOutput&&(u.isPacked=!0),t.outPackingScheme===aa.DENSE){let x=i??cc(t.outputShape);u.texShape=x.map(y=>y*2)}if(t.outTexUsage!=null&&(u.usage=t.outTexUsage),b.sizeFromShape(l.shape)===0)return u.values=b.getTypedArrayFromDType(l.dtype,0),l;let a=[],c=e.map(x=>{if(x.dtype==="complex64")throw new Error("GPGPUProgram does not support complex64 input. For complex64 dtypes, please separate the program into real and imaginary parts.");let y=this.texData.get(x.dataId);if(y.texture==null){if(!t.packedInputs&&b.sizeFromShape(x.shape)<=$().getNumber("WEBGL_SIZE_UPLOAD_UNIFORM"))return{shape:x.shape,texData:null,isUniform:!0,uniformValues:y.values};t.packedInputs&&(y.isPacked=!0,y.shape=x.shape)}if(this.uploadToGPU(x.dataId),!!y.isPacked!=!!t.packedInputs)x=y.isPacked?this.unpackTensor(x):this.packTensor(x),a.push(x),y=this.texData.get(x.dataId);else if(y.isPacked&&!Si(y.shape,x.shape)){let C=x,I=x.shape;x.shape=y.shape,x=this.packedReshape(x,I),a.push(x),y=this.texData.get(x.dataId),C.shape=I}return{shape:x.shape,texData:y,isUniform:!1}});this.uploadToGPU(l.dataId);let p={shape:l.shape,texData:u,isUniform:!1},m=pT(t,c,p),d=this.getAndSaveBinary(m,()=>uT(this.gpgpu,t,c,p)),f=this.activeTimers!=null,h;f&&(h=this.startTimer()),$().get("ENGINE_COMPILE_ONLY")||cT(this.gpgpu,d,c,p,n),a.forEach(x=>this.disposeIntermediateTensorInfo(x)),f&&(h=this.endTimer(h),this.activeTimers.push({name:t.constructor.name,query:this.getQueryTime(h)}));let g=$().getNumber("WEBGL_FLUSH_THRESHOLD");if(g>0){let x=b.now();x-this.lastGlFlushTime>g&&(this.gpgpu.gl.flush(),this.lastGlFlushTime=x)}if(!$().getBool("WEBGL_LAZILY_UNPACK")&&u.isPacked&&s===!1){let x=this.unpackTensor(l);return this.disposeIntermediateTensorInfo(l),x}return l}compileAndRun(t,e,o,n,s=!1){return o=o||e[0].dtype,this.runWebGLProgram(t,e,o,n,s)}getAndSaveBinary(t,e){return t in this.binaryCache||(this.binaryCache[t]=e()),this.binaryCache[t]}getTextureManager(){return this.textureManager}dispose(){this.disposed||($().getBool("IS_TEST")||Object.keys(this.binaryCache).forEach(e=>{this.gpgpu.deleteProgram(this.binaryCache[e].webGLProgram),delete this.binaryCache[e]}),this.textureManager.dispose(),this.canvas!=null&&typeof HTMLCanvasElement<"u"&&this.canvas instanceof HTMLCanvasElement?this.canvas.remove():this.canvas=null,this.gpgpuCreatedLocally&&(this.gpgpu.program=null,this.gpgpu.dispose()),this.disposed=!0)}floatPrecision(){return this.floatPrecisionValue==null&&(this.floatPrecisionValue=zt(()=>{if(!$().get("WEBGL_RENDER_FLOAT32_ENABLED")){let t=$().getBool("DEBUG");$().set("DEBUG",!1);let e=this.abs(De(1e-8)).dataSync()[0];if($().set("DEBUG",t),e>0)return 32}return 16})),this.floatPrecisionValue}epsilon(){return this.floatPrecision()===32?Hz:Kz}uploadToGPU(t){let e=this.texData.get(t),{shape:o,dtype:n,values:s,texture:i,usage:l,isPacked:u}=e;if(i!=null)return;let a=this.activeTimers!=null,c;a&&(c=b.now());let p=e.texShape;if(p==null&&(p=Y1(o,u),e.texShape=p),s!=null){let m=fc(o),d,f=p[1],h=p[0],g=s instanceof Uint8Array||s instanceof Uint8ClampedArray;(u||!g)&&([f,h]=So(p[0],p[1])),u?d=new Km(m,g):d=new hc(m,g);let x=g?[h,f]:p,y=this.makeTensorInfo(x,n),C=this.texData.get(y.dataId);g?C.usage=Ue.PIXELS:C.usage=Ue.UPLOAD,C.texShape=x,this.gpgpu.uploadDenseMatrixToTexture(this.getTexture(y.dataId),f,h,s);let I=[[h,f]],S=this.runWebGLProgram(d,[y],n,I,!0),k=this.texData.get(S.dataId);e.texShape=k.texShape,e.isPacked=k.isPacked,e.usage=k.usage,$().get("ENGINE_COMPILE_ONLY")?this.disposeData(S.dataId):(e.texture=k.texture,e.values=null,this.texData.delete(S.dataId)),this.disposeIntermediateTensorInfo(y),a&&(this.uploadWaitMs+=b.now()-c)}else{let m=this.acquireTexture(p,l,n,u);e.texture=m}}convertAndCacheOnCPU(t,e){let o=this.texData.get(t),{dtype:n}=o;return e!=null&&(o.values=Zz(e,n)),o.values}acquireTexture(t,e,o,n){if(this.numBytesInGPU+=this.computeBytes(t,o),!this.warnedAboutMemory&&this.numBytesInGPU>this.numMBBeforeWarning*1024*1024){let s=(this.numBytesInGPU/1024/1024).toFixed(2);this.warnedAboutMemory=!0,console.warn(`High memory usage in GPU: ${s} MB, most likely due to a memory leak`)}return this.textureManager.acquireTexture(t,e,n)}computeBytes(t,e){return t[0]*t[1]*b.bytesPerElement(e)}checkCompileCompletion(){for(let[,t]of Object.entries(this.binaryCache))this.checkCompletion_(t)}async checkCompileCompletionAsync(){let t=[];if(this.gpgpu.parallelCompilationExtension){for(let[,e]of Object.entries(this.binaryCache))t.push(this.checkCompletionAsync_(e));return Promise.all(t)}else{for(let[,e]of Object.entries(this.binaryCache)){let o=new Promise(n=>{try{this.checkCompletion_(e),n(!0)}catch(s){throw s}});t.push(o)}return Promise.all(t)}}async checkCompletionAsync_(t){return this.gpgpu.gl.getProgramParameter(t.webGLProgram,this.gpgpu.parallelCompilationExtension.COMPLETION_STATUS_KHR)?this.checkCompletion_(t):(await Zb(),this.checkCompletionAsync_(t))}checkCompletion_(t){if(this.gpgpu.gl.getProgramParameter(t.webGLProgram,this.gpgpu.gl.LINK_STATUS)===!1)throw console.log(this.gpgpu.gl.getProgramInfoLog(t.webGLProgram)),this.gpgpu.gl.getShaderParameter(t.fragmentShader,this.gpgpu.gl.COMPILE_STATUS)===!1?(qy(t.source,this.gpgpu.gl.getShaderInfoLog(t.fragmentShader)),new Error("Failed to compile fragment shader.")):new Error("Failed to link vertex and fragment shaders.");return!0}getUniformLocations(){for(let t of Object.values(this.binaryCache)){this.gpgpu.buildVao(t.webGLProgram);let{variablesLocations:e,customUniformLocations:o,infLoc:n,nanLoc:s,outShapeLocation:i,outShapeStridesLocation:l,outTexShapeLocation:u}=Zy(this.gpgpu,t.program,t.webGLProgram);t.variablesLocations=e,t.customUniformLocations=o,t.infLoc=n,t.nanLoc=s,t.outShapeLocation=i,t.outShapeStridesLocation=l,t.outTexShapeLocation=u}}createTensorFromGPUData(t,e,o){t.channels=t.channels||"RGBA";let{texture:n,height:s,width:i,channels:l}=t,u=gr().backend;if(!u.gpgpu.gl.isTexture(n))throw new Error("The texture is invalid. Also, please make sure the texture and the TFJS WebGL backend are using the same canvas. If you want to use your own custom canvas, you have to create and use the custom TFJS WebGL backend created from the canvas through 'new tf.MathBackendWebGL(customCanvas)'.");let a=u.writeTexture(n,e,o,s,i,l);return gr().makeTensorFromDataId(a,e,o,u)}};xc.nextDataId=0;function Zz(r,t){if(t==="float32"||t==="complex64")return r;if(t==="int32"||t==="bool"){let e=t==="int32"?new Int32Array(r.length):new Uint8Array(r.length);for(let o=0;o<e.length;++o)e[o]=Math.round(r[o]);return e}else throw new Error(`Unknown dtype ${t}`)}Qs.isBrowser()&&Ll("webgl",()=>new xc,2);var mu=`
  if (isnan(a)) return a;
  if (isnan(b)) return b;
`;var sr=class{constructor(t,e,o){this.variableNames=["A","B"],this.outputShape=w.assertAndGetBroadcastShape(e,o),this.enableShapeUniforms=jt(this.outputShape.length),this.userCode=`
      float binaryOperation(float a, float b) {
        ${t}
      }

      void main() {
        float a = getAAtOutCoords();
        float b = getBAtOutCoords();
        setOutput(binaryOperation(a, b));
      }
    `}};var Ir=`
  result.r = isNaN.r ? NAN : result.r;
  result.g = isNaN.g ? NAN : result.g;
  result.b = isNaN.b ? NAN : result.b;
  result.a = isNaN.a ? NAN : result.a;
`;var Cr=class{constructor(t,e,o,n=!1){this.variableNames=["A","B"],this.supportsBroadcasting=!0,this.packedInputs=!0,this.packedOutput=!0,this.outputShape=w.assertAndGetBroadcastShape(e,o);let s=this.outputShape.length;this.enableShapeUniforms=jt(s);let i="";if(n)if(s===0||b.sizeFromShape(this.outputShape)===1)i=`
          result.y = 0.;
          result.z = 0.;
          result.w = 0.;
        `;else if(i=`
          ${kt(s)} coords = getOutputCoords();
        `,s===1)this.enableShapeUniforms?i+=`
            result.y = (coords + 1) >= outShape ? 0. : result.y;
            result.z = 0.;
            result.w = 0.;
          `:i+=`
            result.y = (coords + 1) >= ${this.outputShape[0]} ? 0. : result.y;
            result.z = 0.;
            result.w = 0.;
          `;else{let u=de("coords",s);this.enableShapeUniforms?i+=`
            bool nextRowOutOfBounds =
              (${u[s-2]} + 1) >= outShape[${s} - 2];
            bool nextColOutOfBounds =
              (${u[s-1]} + 1) >= outShape[${s} - 1];
            result.y = nextColOutOfBounds ? 0. : result.y;
            result.z = nextRowOutOfBounds ? 0. : result.z;
            result.w = nextColOutOfBounds || nextRowOutOfBounds ? 0. : result.w;
          `:i+=`
            bool nextRowOutOfBounds =
              (${u[s-2]} + 1) >= ${this.outputShape[s-2]};
            bool nextColOutOfBounds =
              (${u[s-1]} + 1) >= ${this.outputShape[s-1]};
            result.y = nextColOutOfBounds ? 0. : result.y;
            result.z = nextRowOutOfBounds ? 0. : result.z;
            result.w = nextColOutOfBounds || nextRowOutOfBounds ? 0. : result.w;
          `}this.userCode=`
      vec4 binaryOperation(vec4 a, vec4 b) {
        ${t}
      }

      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();

        vec4 result = binaryOperation(a, b);
        ${i}

        setOutput(result);
      }
    `}};function fe(r){let{inputs:t,backend:e}=r,{x:o}=t;return e.incRef(o.dataId),{dataId:o.dataId,shape:o.shape,dtype:o.dtype}}var $_={kernelName:xo,backendName:"webgl",kernelFunc:fe};function ar(r){let{inputs:t,backend:e}=r,{real:o,imag:n}=t,s=e.makeTensorInfo(o.shape,"complex64"),i=e.texData.get(s.dataId),l=fe({inputs:{x:o},backend:e}),u=fe({inputs:{x:n},backend:e});return i.complexTensorInfos={real:l,imag:u},s}var M_={kernelName:ul,backendName:"webgl",kernelFunc:ar};var sC="return (a < 0.) ? b * a : a;",aC=`
  vec4 aLessThanZero = vec4(lessThan(a, vec4(0.)));
  return (aLessThanZero * (b * a)) + ((vec4(1.0) - aLessThanZero) * a);
`;function Qz(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{alpha:s}=o,i=e.makeTensorInfo([],"float32",b.createScalarValue(s,"float32")),l=$().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new Cr(aC,n.shape,i.shape):new sr(sC,n.shape,i.shape),u=e.runWebGLProgram(l,[n,i],"float32");return e.disposeIntermediateTensorInfo(i),u}var P_={kernelName:bn,backendName:"webgl",kernelFunc:Qz};var iC="return (a < 0.) ? b * a : a;",lC=`
  vec4 aLessThanZero = vec4(lessThan(a, vec4(0.)));
  return (aLessThanZero * (b * a)) + ((vec4(1.0) - aLessThanZero) * a);
`;function Jz(r){let{inputs:t,backend:e}=r,{x:o,alpha:n}=t,s=$().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new Cr(lC,o.shape,n.shape):new sr(iC,o.shape,n.shape);return e.runWebGLProgram(s,[o,n],"float32")}var O_={kernelName:Un,backendName:"webgl",kernelFunc:Jz};var zr="if (isnan(x)) return x;";function pt({opSnippet:r,packedOpSnippet:t,cpuKernelImpl:e,dtype:o}){return({inputs:n,backend:s})=>{let{x:i}=n,l=s,u=o||i.dtype;if(l.shouldExecuteOnCPU([i])&&e!=null){let p=l.texData.get(i.dataId),m=e(p.values,u);return l.makeTensorInfo(i.shape,u,m)}let a=$().getBool("WEBGL_PACK_UNARY_OPERATIONS")&&t!=null,c;return a?c=new nr(i.shape,t):c=new $e(i.shape,r),l.runWebGLProgram(c,[i],u)}}function Ht({opSnippet:r,packedOpSnippet:t,checkOutOfBounds:e=!1,supportsComplex:o=!1,cpuKernelImpl:n,dtype:s}){return({inputs:i,backend:l})=>{let{a:u,b:a}=i,c=l;if(o&&u.dtype==="complex64"){let f=c.texData.get(u.dataId),h=c.texData.get(a.dataId),[g,x]=[[f.complexTensorInfos.real,h.complexTensorInfos.real],[f.complexTensorInfos.imag,h.complexTensorInfos.imag]].map(C=>{let[I,v]=C,S={dataId:I.dataId,dtype:I.dtype,shape:u.shape},k={dataId:v.dataId,dtype:v.dtype,shape:a.shape},A=new sr(r,u.shape,a.shape);return c.runWebGLProgram(A,[S,k],be(I.dtype,v.dtype))}),y=ar({inputs:{real:g,imag:x},backend:c});return c.disposeIntermediateTensorInfo(g),c.disposeIntermediateTensorInfo(x),y}let p=s||be(u.dtype,a.dtype);if((u.dtype==="string"||a.dtype==="string"||c.shouldExecuteOnCPU([u,a]))&&n!=null){let f=c.texData.get(u.dataId).values,h=c.texData.get(a.dataId).values,g=u.dtype==="string"?w.fromUint8ToStringArray(f):f,x=u.dtype==="string"?w.fromUint8ToStringArray(h):h,[y,C]=n(u.shape,a.shape,g,x,p),I=c.makeTensorInfo(C,p),v=c.texData.get(I.dataId);return v.values=y,I}let m=$().getBool("WEBGL_PACK_BINARY_OPERATIONS")&&t!=null,d;return m?d=new Cr(t,u.shape,a.shape,e):d=new sr(r,u.shape,a.shape),c.runWebGLProgram(d,[u,a],p)}}function Is(r,t=!1){if(r==="linear")return t?A_:v_;if(r==="relu")return t?R_:k_;if(r==="elu")return t?E_:S_;if(r==="relu6")return t?D_:T_;if(r==="prelu")return t?lC:iC;if(r==="leakyrelu")return t?aC:sC;if(r==="sigmoid")return t?F_:__;throw new Error(`Activation ${r} has not been implemented for the WebGL backend.`)}var du=class{constructor(t,e,o,n=!1,s=!1,i=!1,l=null,u=!1,a=!1){this.variableNames=["matrixA","matrixB"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=o,this.enableShapeUniforms=jt(this.outputShape.length);let c=n?t[1]:t[2],p=Math.ceil(c/2),m=n?"i * 2, rc.y":"rc.y, i * 2",d=s?"rc.z, i * 2":"i * 2, rc.z",f=n?["a.xxyy","a.zzww"]:["a.xxzz","a.yyww"],h=s?["b.xzxz","b.ywyw"]:["b.xyxy","b.zwzw"],g="",x="";l&&(u?g=`vec4 activation(vec4 a) {
          vec4 b = getPreluActivationWeightsAtOutCoords();
          ${l}
        }`:a?g=`vec4 activation(vec4 a) {
          vec4 b = getLeakyreluAlphaAtOutCoords();
          ${l}
        }`:g=`vec4 activation(vec4 x) {
          ${l}
        }`,x="result = activation(result);");let y=i?"result += getBiasAtOutCoords();":"";i&&this.variableNames.push("bias"),u&&this.variableNames.push("preluActivationWeights"),a&&this.variableNames.push("leakyreluAlpha");let C="rc.x",I="rc.x";t[0]<e[0]?C=`imod(rc.x, ${t[0]})`:e[0]<t[0]&&(I=`imod(rc.x, ${e[0]})`),this.userCode=`
      ${g}
      // Don't use uniform for sharedDimensionPacked for performance.
      const float sharedDimension = ${p}.0;

      vec4 dot2x2ARowBCol(ivec3 rc) {
        vec4 result = vec4(0);
        int batchA = ${C};
        int batchB = ${I};
        for (int i = 0; i < ${p}; i++) {
          vec4 a = getMatrixA(batchA, ${m});
          vec4 b = getMatrixB(batchB, ${d});

          // These swizzled products need to be separately added.
          // See: https://github.com/tensorflow/tfjs/issues/1735
          result += (${f[0]} * ${h[0]});
          result += (${f[1]} * ${h[1]});
        }
        return result;
      }

      void main() {
        ivec3 rc = getOutputCoords();
        vec4 result = dot2x2ARowBCol(rc);

        ${y}

        ${x}

        setOutput(result);
      }
    `}};var uC={REAL:"return areal * breal - aimag * bimag;",IMAG:"return areal * bimag + aimag * breal;"},bc=class{constructor(t,e,o){this.variableNames=["AReal","AImag","BReal","BImag"],this.outputShape=w.assertAndGetBroadcastShape(e,o),this.userCode=`
      float binaryOpComplex(
          float areal, float aimag, float breal, float bimag) {
        ${t}
      }

      void main() {
        float areal = getARealAtOutCoords();
        float aimag = getAImagAtOutCoords();
        float breal = getBRealAtOutCoords();
        float bimag = getBImagAtOutCoords();
        setOutput(binaryOpComplex(areal, aimag, breal, bimag));
      }
    `}};var B_="return a * b;";function yc(r){let{inputs:t,backend:e}=r,{a:o,b:n}=t,s=w.upcastType(o.dtype,n.dtype);if(o.dtype==="complex64"){let l=e.texData.get(o.dataId),u=e.texData.get(n.dataId),a=new bc(uC.REAL,o.shape,n.shape),c=new bc(uC.IMAG,o.shape,n.shape),p=[{dataId:l.complexTensorInfos.real.dataId,dtype:l.complexTensorInfos.real.dtype,shape:o.shape},{dataId:l.complexTensorInfos.imag.dataId,dtype:l.complexTensorInfos.imag.dtype,shape:o.shape},{dataId:u.complexTensorInfos.real.dataId,dtype:u.complexTensorInfos.real.dtype,shape:n.shape},{dataId:u.complexTensorInfos.imag.dataId,dtype:u.complexTensorInfos.imag.dtype,shape:n.shape}],m=e.runWebGLProgram(a,p,"float32"),d=e.runWebGLProgram(c,p,"float32"),f=ar({inputs:{real:m,imag:d},backend:e});return e.disposeIntermediateTensorInfo(m),e.disposeIntermediateTensorInfo(d),f}if(e.shouldExecuteOnCPU([o,n])){let l=e.texData.get(o.dataId),u=e.texData.get(n.dataId),[a,c]=XT(o.shape,n.shape,l.values,u.values,s),p=e.makeTensorInfo(c,s),m=e.texData.get(p.dataId);return m.values=a,p}let i;return $().getBool("WEBGL_PACK_BINARY_OPERATIONS")?i=new Cr(B_,o.shape,n.shape):i=new sr(B_,o.shape,n.shape),e.runWebGLProgram(i,[o,n],s)}var L_={kernelName:Mn,backendName:"webgl",kernelFunc:yc};function U_(r,t,e){let o=[ia(r.shape),...la(r.shape)],n={dtype:r.dtype,shape:o,dataId:r.dataId},s=[ia(t),...la(t)],i=new pu(s,o),l=!0,u=[o],a=e.runWebGLProgram(i,[n],r.dtype,u,l);return{dataId:a.dataId,shape:t,dtype:a.dtype}}function Z(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{shape:s}=o,i=e,l=b.sizeFromShape(n.shape),u=b.inferFromImplicitShape(s,l),a=b.sizeFromShape(u);b.assert(l===a,()=>`The new shape (${u}) has ${a} elements and the old shape (${n.shape}) has ${l} elements. The new shape and old shape must have the same number of elements.`);let c=i.texData.get(n.dataId);return c.isPacked&&!Si(n.shape,u)&&!(c.texture!==null&&Si(c.shape,u))?U_(n,u,i):(i.incRef(n.dataId),{dataId:n.dataId,shape:u,dtype:n.dtype})}var G_={kernelName:Vs,backendName:"webgl",kernelFunc:Z};var Cc=class{constructor(t,e){this.variableNames=["x"];let{windowSize:o,batchSize:n,inSize:s,outSize:i}=t;this.outputShape=[n,i];let l=Math.floor(o/4)*4,u=o%4,a="sumValue += dot(values, ones);";if(e!=null){let p=1/e;a=`sumValue += dot(values * ${b.isInt(p)?p.toPrecision(2):p}, ones);`}let c="";s%o>0&&(c=`
        if (inIdx < 0 || inIdx >= ${s}) {
          return 0.0;
        }
      `),this.userCode=`
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float getValue(int batch, int inIdx) {
        ${c}
        return getX(batch, inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * ${o};

        float sumValue = 0.0;

        for (int i = 0; i < ${l}; i += 4) {
          int inIdx = inOffset + i;
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          ${a}
        }

        int inIdx = inOffset + ${l};
        if (${u===1}) {
          vec4 values = vec4(getValue(batch, inIdx), 0.0, 0.0, 0.0);

          ${a}
        } else if (${u===2}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1), 0.0, 0.0);

          ${a}
        } else if (${u===3}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2), 0.0);

          ${a}
        }
        setOutput(sumValue);
      }
    `}};var td=class{constructor(t,e){this.variableNames=["x"];let{windowSize:o,batchSize:n,inSize:s,outSize:i}=t;this.outputShape=[n,i];let l="0.0",u="";e==="prod"?l="1.0":e==="min"?(l="1.0 / 1e-20",u="min"):e==="max"&&(l="-1.0 / 1e-20",u="max");let a=`${e}(${e}(${e}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;e==="sum"?a="sumValue":e==="prod"?a="prodValue":e==="all"?a="allValue":e==="any"&&(a="anyValue");let c=Math.floor(o/4)*4,p=o%4,m=`
      if (${e==="sum"}) {
        sumValue += dot(values, ones);
      } else if (${e==="prod"}) {
        vec2 tmp = vec2(values[0], values[1]) * vec2(values[2], values[3]);
        prodValue *= tmp[0] * tmp[1];
      } else {
        minMaxValue = ${u}(values, minMaxValue);
        if (${e==="min"} || ${e==="max"}) {
          minMaxValue = ${u}(values, minMaxValue);
          bvec4 isNaN = isnan(values);
          if (isNaN.r || isNaN.g || isNaN.b || isNaN.a) {
            minMaxValue = vec4(NAN);
          }
        }
      }
    `,d="vec4";e==="all"?(l="1.0",m=`
        bool reducedAllValue = all(values);
        float floatedReducedAllValue = float(reducedAllValue);
        allValue = float(allValue >= 1.0 && floatedReducedAllValue >= 1.0);
      `,d="bvec4"):e==="any"&&(l="0.0",m=`
        bool reducedAnyValue = any(values);
        float floatedReducedAnyValue = float(reducedAnyValue);
        anyValue = float(anyValue >= 1.0 || floatedReducedAnyValue >= 1.0);
      `,d="bvec4");let f="";s%o>0&&(f=`
        if (inIdx < 0 || inIdx >= ${s}) {
          return initializationValue;
        }
      `),this.userCode=`
      const float initializationValue = ${l};
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float getValue(int batch, int inIdx) {
        ${f}
        return getX(batch, inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * ${o};

        vec4 minMaxValue = vec4(${l});
        float prodValue = 1.0;
        float sumValue = 0.0;
        float allValue = 1.0;
        float anyValue = 0.0;

        for (int i = 0; i < ${c}; i += 4) {
          int inIdx = inOffset + i;
          ${d} values = ${d}(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          ${m}
        }

        int inIdx = inOffset + ${c};
        if (${p===1}) {
          ${d} values = ${d}(
            getValue(batch, inIdx),
            initializationValue,
            initializationValue,
            initializationValue
          );

          ${m}
        } else if (${p===2}) {
          ${d} values = ${d}(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            initializationValue,
            initializationValue
          );

          ${m}
        } else if (${p===3}) {
          ${d} values = ${d}(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            initializationValue
          );

          ${m}
        }
        setOutput(${a});
      }
    `}};function e4(r){let t=[];for(;t.length===0||t[t.length-1].outSize!==1;){let e=t.length?t[t.length-1].outSize:r[1],o=w.computeOptimalWindowSize(e);t.push({inSize:e,windowSize:o,outSize:Math.ceil(e/o)})}return t}function wr(r,t,e,o){let n=e4(r.shape),s=r;for(let i=0;i<n.length;i++){let{inSize:l,windowSize:u,outSize:a}=n[i],c,p;e==="mean"?c=i===0?new Cc({windowSize:u,inSize:l,batchSize:r.shape[0],outSize:a},l):new Cc({windowSize:u,inSize:l,batchSize:r.shape[0],outSize:a}):c=new td({windowSize:u,inSize:l,batchSize:r.shape[0],outSize:a},e),p=s,s=o.runWebGLProgram(c,[s],t),p.dataId!==r.dataId&&o.disposeIntermediateTensorInfo(p)}return s}var ed=class{constructor(t,e){this.variableNames=["A"];let o=new Array(t.length);for(let i=0;i<o.length;i++)o[i]=t[e[i]];this.outputShape=o,this.rank=o.length;let n=kt(this.rank),s=r4(e);this.userCode=`
    void main() {
      ${n} resRC = getOutputCoords();
      setOutput(getA(${s}));
    }
    `}};function r4(r){let t=r.length;if(t>6)throw Error(`Transpose for rank ${t} is not yet supported`);let e=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u","resRC.v"],o=new Array(t);for(let n=0;n<r.length;n++)o[r[n]]=e[n];return o.join()}var rd=class{constructor(t,e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0;let o=new Array(t.length);for(let c=0;c<o.length;c++)o[c]=t[e[c]];if(this.outputShape=o,this.rank=o.length,this.rank>6)throw Error(`Packed transpose for rank ${this.rank} is not yet supported.`);let n=kt(this.rank),s=oC("rc",this.rank),i=new Array(this.rank);for(let c=0;c<e.length;c++)i[e[c]]=s[c];let l=`vec2(${i.slice(-2).join()})`,u=`++${s[this.rank-1]} < ${o[this.rank-1]}`,a=`getChannel(getA(${i.join()}), ${l})`;this.userCode=`
    void main() {
      ${n} rc = getOutputCoords();
      vec4 result = vec4(0.);
      result[0] = ${a};
      if(${u}) {
        result[1] = ${a};
      }
      --${s[this.rank-1]};
      if(++${s[this.rank-2]} < ${o[this.rank-2]}) {
        result[2] = ${a};
        if(${u}) {
          result[3] = ${a};
        }
      }
      setOutput(result);
    }
    `}};function ua(r,t,e){let o=$().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new rd(r.shape,t):new ed(r.shape,t);return e.runWebGLProgram(o,[r],r.dtype)}function V_(r,t,e,o){let n=t,s=r.shape.length,i=b.parseAxisParam(n,r.shape),l=i,u=w.getAxesPermutation(l,s),a=u!=null,c=r;a&&(c=ua(r,u,o),l=w.getInnerMostAxes(l.length,s)),w.assertAxesAreInnerMostDims("sum",l,s);let[p,m]=w.computeOutAndReduceShapes(c.shape,l),d=p;e&&(d=w.expandShapeToKeepDim(p,i));let f=b.sizeFromShape(m),g=b.sizeFromShape(r.shape)/f,x=Z({inputs:{x:c},attrs:{shape:[g,f]},backend:o}),y=ti(r.dtype),C=wr(x,y,"sum",o),I=Z({inputs:{x:C},attrs:{shape:d},backend:o});return o.disposeIntermediateTensorInfo(x),o.disposeIntermediateTensorInfo(C),a&&o.disposeIntermediateTensorInfo(c),I}function Ni(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s,keepDims:i}=o;return V_(n,s,i,e)}var W_={kernelName:os,backendName:"webgl",kernelFunc:Ni};function te(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{perm:s}=o,i=e,l=n.shape.length,u=new Array(l);for(let c=0;c<u.length;c++)u[c]=n.shape[s[c]];let a;if(i.shouldExecuteOnCPU([n])){let p=i.texData.get(n.dataId).values,m=_i(p,n.shape,n.dtype,s,u);a=i.makeTensorInfo(u,n.dtype);let d=i.texData.get(a.dataId);d.values=m}else a=ua(n,s,i);return a}var z_={kernelName:Jr,backendName:"webgl",kernelFunc:te};var cC=1e3;function Ai({a:r,b:t,transposeA:e,transposeB:o,backend:n,bias:s=null,preluActivationWeights:i=null,leakyreluAlpha:l=0,activation:u=null}){let a=r.shape.length,c=t.shape.length,p=e?r.shape[a-2]:r.shape[a-1],m=o?t.shape[c-1]:t.shape[c-2],d=e?r.shape[a-1]:r.shape[a-2],f=o?t.shape[c-2]:t.shape[c-1],h=r.shape.slice(0,-2),g=t.shape.slice(0,-2),x=b.sizeFromShape(h),y=b.sizeFromShape(g),I=no.assertAndGetBroadcastShape(r.shape.slice(0,-2),t.shape.slice(0,-2)).concat([d,f]);b.assert(p===m,()=>`Error in matMul: inner shapes (${p}) and (${m}) of Tensors with shapes ${r.shape} and ${t.shape} and transposeA=${e} and transposeB=${o} must match.`);let v=e?[x,p,d]:[x,d,p],S=o?[y,f,m]:[y,m,f],k=Z({inputs:{x:r},backend:n,attrs:{shape:v}}),A=Z({inputs:{x:t},backend:n,attrs:{shape:S}}),D=[k,A],F=Math.max(x,y),M=e?k.shape[1]:k.shape[2],B=s!=null,U=i!=null,P=u==="leakyrelu",L=u!=null?Is(u,!0):null,z=B||U||P||L!=null,V;if((d===1||f===1)&&M>cC&&z===!1){let q=k,X=A;e&&(q=te({inputs:{x:k},backend:n,attrs:{perm:[0,2,1]}}),D.push(q)),o&&(X=te({inputs:{x:A},backend:n,attrs:{perm:[0,2,1]}}),D.push(X));let J=f!==1,tt=f===1,Y=q;J&&(Y=Z({inputs:{x:q},backend:n,attrs:{shape:[F,M,1]}}),D.push(Y));let Q=f===1?2:1,ot=X;tt&&(ot=Z({inputs:{x:X},backend:n,attrs:{shape:[F,1,M]}}),D.push(ot));let at=yc({inputs:{a:Y,b:ot},backend:n});V=Ni({inputs:{x:at},backend:n,attrs:{axis:Q,keepDims:!0}}),D.push(at)}else{let q=be(r.dtype,t.dtype),X=new du(v,S,[F,d,f],e,o,B,L,U,P),J=[k,A];if(s!=null&&J.push(s),U&&J.push(i),P){let tt=n.makeTensorInfo([],"float32",b.createScalarValue(l,"float32"));J.push(tt),D.push(tt)}V=n.runWebGLProgram(X,J,q)}let W=Z({inputs:{x:V},backend:n,attrs:{shape:I}});D.push(V);for(let q of D)n.disposeIntermediateTensorInfo(q);return W}function o4(r){let{inputs:t,backend:e,attrs:o}=r,{a:n,b:s,bias:i,preluActivationWeights:l}=t,{transposeA:u,transposeB:a,activation:c,leakyreluAlpha:p}=o;return Ai({a:n,b:s,transposeA:u,transposeB:a,backend:e,bias:i,preluActivationWeights:l,leakyreluAlpha:p,activation:c})}var H_={kernelName:Ka,backendName:"webgl",kernelFunc:o4};var K_="return abs(x);";function n4(r){let{inputs:t,backend:e}=r,{x:o}=t;if(e.shouldExecuteOnCPU([o])&&o.dtype!=="complex64"){let s=e.texData.get(o.dataId),i=jm(s.values);return e.makeTensorInfo(o.shape,o.dtype,i)}let n;return $().getBool("WEBGL_PACK_UNARY_OPERATIONS")?n=new nr(o.shape,K_):n=new $e(o.shape,K_),e.runWebGLProgram(n,[o],o.dtype)}var q_={kernelName:Rs,backendName:"webgl",kernelFunc:n4};var s4=we+`
  if (abs(x) > 1.) {
    return NAN;
  }
  return acos(x);
`,a4=pt({opSnippet:s4}),j_={kernelName:Po,backendName:"webgl",kernelFunc:a4};var i4=we+`
  if (x < 1.0) return NAN;
return log(x + sqrt(x * x - 1.0));`,l4=pt({opSnippet:i4}),X_={kernelName:Oo,backendName:"webgl",kernelFunc:l4};var Y_="return a + b;",u4=Ht({opSnippet:Y_,packedOpSnippet:Y_,supportsComplex:!0,cpuKernelImpl:NT}),Z_={kernelName:Zr,backendName:"webgl",kernelFunc:u4};var od=class{constructor(t,e){this.outputShape=[],this.outputShape=t,this.variableNames=e.map((s,i)=>`T${i}`);let o=[];this.variableNames.forEach(s=>{o.push(`float v${s} = get${s}AtOutCoords();`)});let n=this.variableNames.map(s=>`v${s}`).join(" + ");this.userCode=`
      void main() {
        ${o.join(`
        `)}

        float result = ${n};
        setOutput(result);
      }
    `}};var nd=class{constructor(t,e){this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t,this.variableNames=e.map((s,i)=>`T${i}`);let o=[];this.variableNames.forEach(s=>{o.push(`vec4 v${s} = get${s}AtOutCoords();`)});let n=this.variableNames.map(s=>`v${s}`).join(" + ");this.userCode=`
      void main() {
        ${o.join(`
        `)}

        vec4 result = ${n};
        setOutput(result);
      }
    `}};function sd(r){let{inputs:t,backend:e}=r,o=t;if(o.length===1)return fe({inputs:{x:o[0]},backend:e});if(o.length>$().getNumber("WEBGL_MAX_TEXTURES_IN_SHADER")){let u=Math.floor(o.length/2),a=sd({inputs:o.slice(0,u),backend:e}),c=sd({inputs:o.slice(u),backend:e});return sd({inputs:[a,c],backend:e})}let n=o.map(u=>u.dtype).reduce((u,a)=>be(u,a)),s=o.map(u=>u.shape),l=$().getBool("WEBGL_PACK")?new nd(o[0].shape,s):new od(o[0].shape,s);return e.runWebGLProgram(l,o,n)}var Q_={kernelName:Ia,backendName:"webgl",kernelFunc:sd};function c4(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s,keepDims:i}=o,l=n.shape.length,u=b.parseAxisParam(s,n.shape),a=u,c=w.getAxesPermutation(a,l),p=n;c!=null&&(p=te({inputs:{x:n},backend:e,attrs:{perm:c}}),a=w.getInnerMostAxes(a.length,l)),w.assertAxesAreInnerMostDims("all",a,l);let[m,d]=w.computeOutAndReduceShapes(p.shape,a),f=b.sizeFromShape(d),h=Z({inputs:{x:p},backend:e,attrs:{shape:[-1,f]}}),g=wr(h,h.dtype,"all",e),x;if(i){let y=w.expandShapeToKeepDim(m,u);x=Z({inputs:{x:g},backend:e,attrs:{shape:y}})}else x=Z({inputs:{x:g},backend:e,attrs:{shape:m}});return e.disposeIntermediateTensorInfo(h),e.disposeIntermediateTensorInfo(g),c!=null&&e.disposeIntermediateTensorInfo(p),x}var J_={kernelName:Bo,backendName:"webgl",kernelFunc:c4};function p4(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s,keepDims:i}=o,l=n.shape.length,u=b.parseAxisParam(s,n.shape),a=u,c=w.getAxesPermutation(a,l),p=n;c!=null&&(p=te({inputs:{x:n},backend:e,attrs:{perm:c}}),a=w.getInnerMostAxes(a.length,l)),w.assertAxesAreInnerMostDims("any",a,l);let[m,d]=w.computeOutAndReduceShapes(p.shape,a),f=b.sizeFromShape(d),h=Z({inputs:{x:p},backend:e,attrs:{shape:[-1,f]}}),g=wr(h,h.dtype,"any",e),x;if(i){let y=w.expandShapeToKeepDim(m,u);x=Z({inputs:{x:g},backend:e,attrs:{shape:y}})}else x=Z({inputs:{x:g},backend:e,attrs:{shape:m}});return e.disposeIntermediateTensorInfo(h),e.disposeIntermediateTensorInfo(g),c!=null&&e.disposeIntermediateTensorInfo(p),x}var tN={kernelName:Lo,backendName:"webgl",kernelFunc:p4};var ad=class{constructor(t,e,o){this.variableNames=["A"];let{windowSize:n,batchSize:s,outSize:i}=t;o||this.variableNames.push("bestIndicesA"),this.outputShape=[s,i];let l=e==="max"?">":"<",u=o?"inOffset + i;":"round(getBestIndicesA(batch, inOffset + i));";this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * ${n};

        int bestIndex = inOffset;
        float bestValue = getA(batch, bestIndex);

        for (int i = 0; i < ${n}; i++) {
          int inIdx = ${u};
          float candidate = getA(batch, inIdx);
          if (candidate ${l} bestValue) {
            bestValue = candidate;
            bestIndex = inIdx;
          }
        }
        setOutput(float(bestIndex));
      }
    `}};var id=class{constructor(t,e,o,n){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,b.assert(t.length>2,()=>`Packed arg${o.charAt(0).toUpperCase()+o.slice(1)} supports only inputs with rank above 2.`);let s=t[t.length-1],i=Math.ceil(s/e);this.outputShape=t.slice(0,-1),i>1&&this.outputShape.push(i),n||this.variableNames.push("bestIndicesA");let l=this.outputShape,u=l.length,a=kt(u),c=de("coords",u),p,m;if(i===1){m=u+1;let A=kt(m);p=`
        ${A} sourceLocR = ${A}(${c.join()}, 0);
        ++${c[u-1]};
        ${A} sourceLocG = ${A}(${c.join()}, 0);
        ++${c[u-2]};
        ${A} sourceLocA = ${A}(${c.join()}, 0);
        --${c[u-1]};
        ${A} sourceLocB = ${A}(${c.join()}, 0);
        --${c[u-2]};`}else m=u,p=`
        ${a} sourceLocR = coords;
        ++${c[u-1]};
        ${a} sourceLocG = coords;
        ++${c[u-2]};
        ${a} sourceLocA = coords;
        --${c[u-1]};
        ${a} sourceLocB = coords;
        --${c[u-2]};`;let d=["x","y","z","w","u","v"].slice(0,m),f="."+d[m-1],h=d.map(A=>"int "+A),g=de("sourceLocR",m-1).concat("inIdx.r"),x=de("sourceLocG",m-1).concat("inIdx.g"),y=de("sourceLocB",m-1).concat("inIdx.b"),C=de("sourceLocA",m-1).concat("inIdx.a"),I=o==="max"?"greaterThan":"lessThan",v=n?"":`
          inIdx = round(vec4(getBestIndicesAChannel(${g.join()}),
                             getBestIndicesAChannel(${x.join()}),
                             getBestIndicesAChannel(${y.join()}),
                             getBestIndicesAChannel(${C.join()})));`,S=`vec4(
            getAChannel(${g.join()}),
            hasNextCol ? getAChannel(${x.join()}) : 0.,
            hasNextRow ? getAChannel(${y.join()}) : 0.,
            hasNextRow && hasNextCol ? getAChannel(${C.join()}) : 0.)`,k=n?"":`
      float getBestIndicesAChannel(${h.join()}) {
        return getChannel(getBestIndicesA(${d.join()}),
                                          vec2(${d.slice(-2).join()}));
      }`;this.userCode=`
      float getAChannel(${h.join()}) {
        return getChannel(getA(${d.join()}),
                               vec2(${d.slice(-2).join()}));
      }
      ${k}
      void main() {
        ${a} coords = getOutputCoords();
        bool hasNextCol = ${c[u-1]} < ${l[u-1]-1};
        bool hasNextRow = ${c[u-2]} < ${l[u-2]-1};
        ${p}
        ivec4 srcIdx = ivec4(sourceLocR${f}, sourceLocG${f},
          sourceLocB${f}, sourceLocA${f}) * ${e};
        ivec4 inIdx = srcIdx;
        vec4 bestIndex = vec4(inIdx);
        vec4 bestValue = ${S};

        for (int i = 0; i < ${e}; i++) {
          inIdx = srcIdx;
          ${v}
          vec4 candidate = ${S};
          bvec4 nan = isnan(candidate);
          bvec4 replace = bvec4(
            vec4(${I}(candidate, bestValue)) * (vec4(1.0) - vec4(nan)));

          bestValue = vec4(replace.x  ? candidate.x : bestValue.x,
                           replace.y  ? candidate.y : bestValue.y,
                           replace.z  ? candidate.z : bestValue.z,
                           replace.w  ? candidate.w : bestValue.w);
          bestIndex = mix(bestIndex, vec4(inIdx), vec4(replace));
          srcIdx++;
        }
        setOutput(bestIndex);
      }
    `}};function eN(r,t,e,o=null){let n=t.shape[0],s=t.shape[1];o!=null&&(n=o.shape[0],s=o.shape[1]);let i=w.computeOptimalWindowSize(s),l={windowSize:i,inSize:s,batchSize:n,outSize:Math.ceil(s/i)},u=new ad(l,e,o==null),a=[t];o!=null&&a.push(o);let c=r.runWebGLProgram(u,a,"int32");if(c.shape[1]===1)return c;let p=eN(r,t,e,c);return r.disposeIntermediateTensorInfo(c),p}function rN(r,t,e,o=null){let n=o!=null?o.shape:t.shape,s=n[n.length-1],i=w.computeOptimalWindowSize(s),l=new id(n,i,e,o==null),u=o==null?[t]:[t,o],a=r.runWebGLProgram(l,u,"int32");if(a.shape.length===t.shape.length){let c=rN(r,t,e,a);return r.disposeIntermediateTensorInfo(a),c}return a}function ld(r,t,e,o){let n=[e];if(w.assertAxesAreInnerMostDims("arg"+o.charAt(0).toUpperCase()+o.slice(1),n,t.shape.length),!$().getBool("WEBGL_PACK_REDUCE")||t.shape.length<=2){let s=[],i=r.texData.get(t.dataId),l=i!==null&&i.isPacked,u=t;l&&(u=r.unpackTensor(t),s.push(u));let[a,c]=w.computeOutAndReduceShapes(u.shape,n),p=b.sizeFromShape(c),m=Z({inputs:{x:u},backend:r,attrs:{shape:[-1,p]}});s.push(m);let d=eN(r,m,o);s.push(d);let f=Z({inputs:{x:d},backend:r,attrs:{shape:a}});return s.forEach(h=>r.disposeIntermediateTensorInfo(h)),f}return rN(r,t,o)}function m4(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s}=o,i=b.parseAxisParam(s,n.shape),l=w.getAxesPermutation(i,n.shape.length),u=n,a=[];l!=null&&(u=te({inputs:{x:n},backend:e,attrs:{perm:l}}),a.push(u),i=w.getInnerMostAxes(i.length,u.shape.length)),w.assertAxesAreInnerMostDims("argMax",[i[0]],u.shape.length);let c=ld(e,u,i[0],"max");return a.forEach(p=>e.disposeIntermediateTensorInfo(p)),c}var oN={kernelName:Ds,backendName:"webgl",kernelFunc:m4};function d4(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s}=o,i=b.parseAxisParam(s,n.shape),l=w.getAxesPermutation(i,n.shape.length),u=n,a=[];l!=null&&(u=te({inputs:{x:n},backend:e,attrs:{perm:l}}),a.push(u),i=w.getInnerMostAxes(i.length,u.shape.length)),w.assertAxesAreInnerMostDims("argMin",[i[0]],u.shape.length);let c=ld(e,u,i[0],"min");return a.forEach(p=>e.disposeIntermediateTensorInfo(p)),c}var nN={kernelName:Fs,backendName:"webgl",kernelFunc:d4};var f4=we+`
  if (abs(x) > 1.) {
    return NAN;
  }
  return asin(x);
`,h4=pt({opSnippet:f4}),sN={kernelName:Uo,backendName:"webgl",kernelFunc:h4};var g4=we+"return log(x + sqrt(x * x + 1.0));",x4=pt({opSnippet:g4}),aN={kernelName:Go,backendName:"webgl",kernelFunc:x4};var b4=we+`
  return atan(x);
`,y4=pt({opSnippet:b4}),iN={kernelName:Vo,backendName:"webgl",kernelFunc:y4};var C4=mu+`
  return atan(a, b);
`,I4=`
  vec4 result = atan(a, b);
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+Ir+`
  return result;
`,w4=Ht({opSnippet:C4,packedOpSnippet:I4}),lN={kernelName:zo,backendName:"webgl",kernelFunc:w4};var v4=we+`
  if ((x < -1.0) || (x > 1.0)) return NAN;
return (log(1.0 + x) - log(1.0 - x)) / 2.0;`,S4=pt({opSnippet:v4}),uN={kernelName:Wo,backendName:"webgl",kernelFunc:S4};var io=class{constructor(t,e,o,n=!1,s=!1){if(this.variableNames=["x"],e==="avg"&&o)throw new Error("Cannot compute positions for average pool.");let i=t.filterWidth,l=t.strideHeight,u=t.strideWidth,a=t.dilationHeight,c=t.dilationWidth,p=t.effectiveFilterHeight,m=t.effectiveFilterWidth,d=t.padInfo.top,f=t.padInfo.left;this.outputShape=t.outShape;let h=e==="avg",g=`((batch  * ${t.inHeight} + xR) * ${t.inWidth} + xC) * ${t.inChannels} + d`,x=`(xR * ${t.inWidth} + xC) * ${t.inChannels} + d`,y="0.0";if(h||(y="-1.0 / 1e-20"),o){let A=">=";this.userCode=`
        const ivec2 strides = ivec2(${l}, ${u});
        const ivec2 pads = ivec2(${d}, ${f});

        void main() {
          ivec4 coords = getOutputCoords();
          int batch = coords[0];
          int d = coords[3];

          ivec2 xRCCorner = coords.yz * strides - pads;
          int xRCorner = xRCCorner.x;
          int xCCorner = xRCCorner.y;

          // max/min x(?, ?, d) to get y(yR, yC, d).
          // ? = to be determined
          float minMaxValue = 0.0;
          float minMaxValueFound = 0.0;
          int minMaxPosition = 0;
          float avgValue = 0.0;

          for (int wR = 0; wR < ${p};
              wR += ${a}) {
            int xR = xRCorner + wR;

            if (xR < 0 || xR >= ${t.inHeight}) {
              continue;
            }

            for (int wC = 0; wC < ${m};
                wC += ${c}) {
              int xC = xCCorner + wC;

              if (xC < 0 || xC >= ${t.inWidth}) {
                continue;
              }

              float value = getX(batch, xR, xC, d);

              // If a min / max value has already been found, use it. If not,
              // use the current value.
              float currMinMaxValue = mix(
                  value, minMaxValue, minMaxValueFound);
              if (value ${A} currMinMaxValue) {
                minMaxValue = value;
                minMaxValueFound = 1.0;
                minMaxPosition = ${n?s?g:x:`wR * ${m} + wC`};
              }
            }
          }
          setOutput(float(minMaxPosition));
        }
      `;return}let C="max",I=`${e}(${e}(${e}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;e==="avg"&&(I="avgValue / max(count, 1.0)");let v=Math.floor(i/4)*4,S=i%4,k=`
      if (${h}) {
        avgValue += dot(values, ones);
      } else {
        minMaxValue = ${C}(values, minMaxValue);
      }
    `;this.userCode=`
      const ivec2 strides = ivec2(${l}, ${u});
      const ivec2 pads = ivec2(${d}, ${f});
      const float initializationValue = ${y};
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float count = 0.0;

      float getValue(int batch, int xR, int xC, int d) {
        if (xC < 0 || xC >= ${t.inWidth}) {
          return initializationValue;
        }
        count += 1.0;
        return getX(batch, xR, xC, d);
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d = coords[3];

        ivec2 xRCCorner = coords.yz * strides - pads;
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // max/min x(?, ?, d) to get y(yR, yC, d).
        // ? = to be determined
        vec4 minMaxValue = vec4(${y});
        float avgValue = 0.0;
        count = 0.0;

        for (int wR = 0; wR < ${p};
            wR += ${a}) {
          int xR = xRCorner + wR;

          if (xR < 0 || xR >= ${t.inHeight}) {
            continue;
          }

          for (int wC = 0; wC < ${v}; wC += 4) {
            int xC = xCCorner + wC * ${c};

            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + ${c}, d),
              getValue(batch, xR, xC + 2 * ${c}, d),
              getValue(batch, xR, xC + 3 * ${c}, d)
            );

            ${k}
          }

          int xC = xCCorner + ${v};
          if (${S===1}) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              initializationValue,
              initializationValue,
              initializationValue
            );

            ${k}
          } else if (${S===2}) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + ${c}, d),
              initializationValue,
              initializationValue
            );

            ${k}
          } else if (${S===3}) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + ${c}, d),
              getValue(batch, xR, xC + 2 * ${c}, d),
              initializationValue
            );

            ${k}
          }
        }
        setOutput(${I});
      }
    `}},ca=class{constructor(t,e,o,n=!1,s=!1){if(this.variableNames=["x"],e==="avg"&&o)throw new Error("Cannot compute positions for average pool.");let i=t.filterWidth,l=t.strideDepth,u=t.strideHeight,a=t.strideWidth,c=t.dilationDepth,p=t.dilationHeight,m=t.dilationWidth,d=t.effectiveFilterDepth,f=t.effectiveFilterHeight,h=t.effectiveFilterWidth,g=t.padInfo.front,x=t.padInfo.top,y=t.padInfo.left;this.outputShape=t.outShape;let C=e==="avg",I="0.0";if(C||(I="-1.0 / 1e-20"),o){let F=">=";this.userCode=`
        const ivec3 strides =
            ivec3(${l}, ${u}, ${a});
        const ivec3 pads = ivec3(${g}, ${x}, ${y});

        void main() {
          ivec5 coords = getOutputCoords();
          int batch = coords.x;
          int ch = coords.u;

          ivec3 xCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
          int xDCorner = xCorner.x;
          int xRCorner = xCorner.y;
          int xCCorner = xCorner.z;

          // max/min x(?, ?, ?, ch) to get y(yD, yR, yC, ch).
          // ? = to be determined
          float minMaxValue = 0.0;
          float minMaxValueFound = 0.0;
          int minMaxPosition = 0;

          for (int wD = 0; wD < ${d};
              wD += ${c}) {
            int xD = xDCorner + wD;

            if (xD < 0 || xD >= ${t.inDepth}) {
              continue;
            }

            for (int wR = 0; wR < ${f};
                wR += ${p}) {
              int xR = xRCorner + wR;

              if (xR < 0 || xR >= ${t.inHeight}) {
                continue;
              }

              for (int wC = 0; wC < ${h};
                  wC += ${m}) {
                int xC = xCCorner + wC;

                if (xC < 0 || xC >= ${t.inWidth}) {
                  continue;
                }

                float value = getX(batch, xD, xR, xC, ch);

                // If a min / max value has already been found, use it. If not,
                // use the current value.
                float currMinMaxValue = mix(
                    value, minMaxValue, minMaxValueFound);
                if (value ${F} currMinMaxValue) {
                  minMaxValue = value;
                  minMaxValueFound = 1.0;
                  minMaxPosition = ${n?s?`(((batch * ${t.inDepth} + xD) * ${t.inHeight} + xR) * ${t.inWidth} + xC) * ${t.inChannels} + ch`:`((xD * ${t.inHeight} + xR) * ${t.inWidth} + xC) * ${t.inChannels} + ch`:`wD * ${f} * ${h} +
                      wR * ${h} + wC`};
                }
              }
            }
          }
          setOutput(float(minMaxPosition));
        }
      `;return}let v="max",S=`${e}(${e}(${e}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;e==="avg"&&(S="avgValue / max(count, 1.0)");let k=Math.floor(i/4)*4,A=i%4,D=`
      if (${C}) {
        avgValue += dot(values, ones);
      } else {
        minMaxValue = ${v}(values, minMaxValue);
      }
    `;this.userCode=`
      const ivec3 strides =
        ivec3(${l}, ${u}, ${a});
      const ivec3 pads = ivec3(${g}, ${x}, ${y});
      const float initializationValue = ${I};
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float count = 0.0;

      float getValue(int batch, int xD, int xR, int xC, int ch) {
        if (xC < 0 || xC >= ${t.inWidth}) {
          return initializationValue;
        }
        count += 1.0;
        return getX(batch, xD, xR, xC, ch);
      }

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 xCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
        int xDCorner = xCorner.x;
        int xRCorner = xCorner.y;
        int xCCorner = xCorner.z;

        // max/min x(?, ?, ?, d) to get y(yD, yR, yC, ch).
        // ? = to be determined
        vec4 minMaxValue = vec4(${I});
        float avgValue = 0.0;
        count = 0.0;

        for (int wD = 0; wD < ${d};
            wD += ${c}) {
          int xD = xDCorner + wD;

          if (xD < 0 || xD >= ${t.inDepth}) {
            continue;
          }

          for (int wR = 0; wR < ${f};
            wR += ${p}) {
            int xR = xRCorner + wR;

            if (xR < 0 || xR >= ${t.inHeight}) {
              continue;
            }

            for (int wC = 0; wC < ${k}; wC += 4) {
              int xC = xCCorner + wC * ${m};

              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + ${m}, ch),
                getValue(batch, xD, xR, xC + 2 * ${m}, ch),
                getValue(batch, xD, xR, xC + 3 * ${m}, ch)
              );

              ${D}
            }

            int xC = xCCorner + ${k};
            if (${A===1}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                initializationValue,
                initializationValue,
                initializationValue
              );

              ${D}
            } else if (${A===2}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + ${m}, ch),
                initializationValue,
                initializationValue
              );

              ${D}
            } else if (${A===3}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + ${m}, ch),
                getValue(batch, xD, xR, xC + 2 * ${m}, ch),
                initializationValue
              );

              ${D}
            }
          }
        }
        setOutput(${S});
      }
    `}};function k4(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t;ko(n,"avgPool");let{filterSize:s,strides:i,pad:l,dimRoundingMode:u}=o,a=1;b.assert(w.eitherStridesOrDilationsAreOne(i,a),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${i} and dilations '${a}'`);let c=w.computePool2DInfo(n.shape,s,i,a,l,u);if(c.filterWidth===1&&c.filterHeight===1&&b.arraysEqual(c.inShape,c.outShape))return fe({inputs:{x:n},backend:e});let p=new io(c,"avg",!1);return e.runWebGLProgram(p,[n],"float32")}var cN={kernelName:Ho,backendName:"webgl",kernelFunc:k4};function T4(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{filterSize:s,strides:i,pad:l,dimRoundingMode:u,dataFormat:a}=o,c=[1,1,1],p=w.computePool3DInfo(n.shape,s,i,c,l,u,a),m=new ca(p,"avg",!1);return e.runWebGLProgram(m,[n],"float32")}var pN={kernelName:al,backendName:"webgl",kernelFunc:T4};var ud=class{constructor(t){this.variableNames=["dy"],this.outputShape=t.inShape;let e=t.filterHeight,o=t.filterWidth,n=t.strideHeight,s=t.strideWidth,i=t.dilationHeight,l=t.dilationWidth,u=t.effectiveFilterHeight,a=t.effectiveFilterWidth,c=u-1-t.padInfo.top,p=a-1-t.padInfo.left,m=1/(e*o);this.userCode=`
      const ivec2 pads = ivec2(${c}, ${p});
      const float avgMultiplier = float(${m});

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];

        ivec2 dyRCCorner = coords.yz - pads;
        int dyRCorner = dyRCCorner.x;
        int dyCCorner = dyRCCorner.y;

        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${u};
            wR += ${i}) {
          float dyR = float(dyRCorner + wR) / ${n}.0;

          if (dyR < 0.0 || dyR >= ${t.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          for (int wC = 0; wC < ${a};
            wC+= ${l}) {
            float dyC = float(dyCCorner + wC) / ${s}.0;

            if (dyC < 0.0 || dyC >= ${t.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            float dyValue = getDy(b, idyR, idyC, d);

            dotProd += dyValue * avgMultiplier;
          }
        }
        setOutput(dotProd);
      }
    `}},cd=class{constructor(t){this.variableNames=["dy"],this.outputShape=t.inShape;let e=t.filterDepth,o=t.filterHeight,n=t.filterWidth,s=t.strideDepth,i=t.strideHeight,l=t.strideWidth,u=t.dilationDepth,a=t.dilationHeight,c=t.dilationWidth,p=t.effectiveFilterDepth,m=t.effectiveFilterHeight,d=t.effectiveFilterWidth,f=p-1-t.padInfo.front,h=m-1-t.padInfo.top,g=d-1-t.padInfo.left,x=1/(e*o*n);this.userCode=`
      const ivec3 pads = ivec3(${f}, ${h}, ${g});
      const float avgMultiplier = float(${x});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyDCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        // Convolve dy(?, ?, ?, d) with pos mask(:, :, :, ch) to get
        // dx(xD, xR, xC, ch).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int wD = 0; wD < ${p};
            wD += ${u}) {
          float dyD = float(dyDCorner + wD) / ${s}.0;

          if (dyD < 0.0 || dyD >= ${t.outDepth}.0 || fract(dyD) > 0.0) {
            continue;
          }
          int idyD = int(dyD);

          for (int wR = 0; wR < ${m};
              wR += ${a}) {
            float dyR = float(dyRCorner + wR) / ${i}.0;

            if (dyR < 0.0 || dyR >= ${t.outHeight}.0 ||
                fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            for (int wC = 0; wC < ${d};
                wC += ${c}) {
              float dyC = float(dyCCorner + wC) / ${l}.0;

              if (dyC < 0.0 || dyC >= ${t.outWidth}.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              float dyValue = getDy(batch, idyD, idyR, idyC, ch);

              dotProd += dyValue * avgMultiplier;
            }
          }
        }
        setOutput(dotProd);
      }
    `}};function _4(r){let{inputs:t,backend:e,attrs:o}=r,{dy:n,input:s}=t,i=s,{filterSize:l,strides:u,pad:a,dimRoundingMode:c}=o,p=[1,1,1],m=w.computePool3DInfo(i.shape,l,u,p,a,c),d=new cd(m);return e.runWebGLProgram(d,[n],i.dtype)}var mN={kernelName:il,backendName:"webgl",kernelFunc:_4};function N4(r){let{inputs:t,backend:e,attrs:o}=r,{dy:n,input:s}=t,i=s;ko([n,s],"avgPoolGrad");let{filterSize:l,strides:u,pad:a}=o,c=w.computePool2DInfo(i.shape,l,u,1,a),p=new ud(c);return e.runWebGLProgram(p,[n],i.dtype)}var dN={kernelName:sl,backendName:"webgl",kernelFunc:N4};function A4(r){let{inputs:t,backend:e,attrs:o}=r,{a:n,b:s}=t,{transposeA:i,transposeB:l}=o;return Ai({a:n,b:s,transposeA:i,transposeB:l,backend:e})}var fN={kernelName:Ko,backendName:"webgl",kernelFunc:A4};var pd=class{constructor(t,e,o,n,s,i){this.outputShape=[],this.variableNames=["x","mean","variance"],w.assertAndGetBroadcastShape(t,e),w.assertAndGetBroadcastShape(t,o);let l="0.0";n!=null&&(w.assertAndGetBroadcastShape(t,n),this.variableNames.push("offset"),l="getOffsetAtOutCoords()");let u="1.0";s!=null&&(w.assertAndGetBroadcastShape(t,s),this.variableNames.push("scale"),u="getScaleAtOutCoords()"),this.outputShape=t,this.userCode=`
      void main() {
        float x = getXAtOutCoords();
        float mean = getMeanAtOutCoords();
        float variance = getVarianceAtOutCoords();
        float offset = ${l};
        float scale = ${u};
        float inv = scale * inversesqrt(variance + float(${i}));
        setOutput(dot(vec3(x, -mean, offset), vec3(inv, inv, 1)));
      }
    `}};var md=class{constructor(t,e,o,n,s,i){this.packedInputs=!0,this.packedOutput=!0,this.variableNames=["x","mean","variance"],w.assertAndGetBroadcastShape(t,e),w.assertAndGetBroadcastShape(t,o);let l="vec4(0.0)";n!=null&&(w.assertAndGetBroadcastShape(t,n),this.variableNames.push("offset"),l="getOffsetAtOutCoords()");let u="vec4(1.0)";s!=null&&(w.assertAndGetBroadcastShape(t,s),this.variableNames.push("scale"),u="getScaleAtOutCoords()"),this.outputShape=t,this.userCode=`
      void main() {
        vec4 offset = ${l};
        vec4 scale = ${u};

        vec4 x = getXAtOutCoords();
        vec4 mean = getMeanAtOutCoords();
        vec4 variance = getVarianceAtOutCoords();

        vec4 inv = scale * inversesqrt(variance + vec4(${i}));

        setOutput((x - mean) * inv + offset);
      }
    `}};var E4=({inputs:r,backend:t,attrs:e})=>{let{x:o,mean:n,variance:s,offset:i,scale:l}=r;b.assert(n.shape.length===s.shape.length,()=>"Batch normalization gradient requires mean and variance to have equal ranks."),b.assert(i==null||n.shape.length===i.shape.length,()=>"Batch normalization gradient requires mean and offset to have equal ranks."),b.assert(l==null||n.shape.length===l.shape.length,()=>"Batch normalization gradient requires mean and scale to have equal ranks.");let{varianceEpsilon:u}=e;u==null&&(u=.001);let a=[o,n,s],c=null;i!=null&&(c=i.shape,a.push(i));let p=null;l!=null&&(p=l.shape,a.push(l));let m=$().getBool("WEBGL_PACK_NORMALIZATION")?new md(o.shape,n.shape,s.shape,c,p,u):new pd(o.shape,n.shape,s.shape,c,p,u);return t.runWebGLProgram(m,a,a[0].dtype)},hN={kernelName:mn,backendName:"webgl",kernelFunc:E4};var dd=class{constructor(t){this.variableNames=["source"],this.outputShape=t,this.rank=t.length;let e=kt(this.rank);this.customUniforms=[{name:"start",arrayIndex:this.rank,type:"int"}];let o=R4(this.rank),n,s=t.map((i,l)=>`sourceLoc.${pC[l]} = start[${l}] + coords.${pC[l]};`);n=`
        ${e} sourceLoc;
        ${e} coords = getOutputCoords();
        ${s.join(`
`)}
      `,this.userCode=`
      void main() {
        ${n}
        setOutput(getSource(${o}));
      }
    `}},pC=["x","y","z","w","u","v"];function R4(r){if(r===1)return"sourceLoc";if(r<=6)return pC.slice(0,r).map(t=>"sourceLoc."+t).join(",");throw Error(`Slicing for rank ${r} is not yet supported`)}var fd=class{constructor(t){this.variableNames=["source"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t,this.rank=t.length,this.customUniforms=[{name:"start",arrayIndex:this.rank,type:"int"}];let e=kt(this.rank),o=de("coords",this.rank),n=de("sourceLoc",this.rank),s=this.rank===1?"sourceLoc":`vec2(${n.slice(-2).join()})`,i=`getChannel(getSource(${n.join()}), ${s})`,l=`
      result.x = ${i};
      if (++${o[this.rank-1]} < ${t[this.rank-1]}) {
        ++${n[this.rank-1]};
        result.y = ${i};
        --${n[this.rank-1]};
      }
    `,u=this.rank===1?"":`
      --${o[this.rank-1]};
      if (++${o[this.rank-2]} < ${t[this.rank-2]}) {
        ++${n[this.rank-2]};
        result.z = ${i};
        if (++${o[this.rank-1]} < ${t[this.rank-1]}) {
          ++${n[this.rank-1]};
          result.w = ${i};
        }
      }
    `,a=this.rank<=4?`sourceLoc = coords +
            ${e}(${t.map((c,p)=>`start[${p}]`).join()});`:t.map((c,p)=>`${n[p]} = ${o[p]} + start[${p}];`).join(`
`);this.userCode=`
      void main() {
        ${e} coords = getOutputCoords();
        ${e} sourceLoc;
        ${a}
        vec4 result = vec4(0.);
        ${l}
        ${u}
        setOutput(result);
      }
    `}};function D4(r,t,e,o){let n=o.texData.get(r.dataId),s=o.makeTensorInfo(e,r.dtype),i=o.texData.get(s.dataId);Object.assign(i,n),i.refCount=1,i.shape=e,i.dtype=r.dtype;let l=oe.computeFlatOffset(t,b.computeStrides(r.shape));n.slice&&(l+=n.slice.flatOffset),i.slice={flatOffset:l,origDataId:n.slice&&n.slice.origDataId||r.dataId};let u=o.dataRefCount.get(i.slice.origDataId)||1;return o.dataRefCount.set(i.slice.origDataId,u+1),s}function lo(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{begin:s,size:i}=o,[l,u]=oe.parseSliceParams(n,s,i);if(oe.assertParamsValid(n,l,u),b.sizeFromShape(u)===0)return e.makeTensorInfo(u,n.dtype,[]);if(e.shouldExecuteOnCPU([n])||n.dtype==="string"){let p=e.texData.get(n.dataId),m=a_(p.values,l,u,n.shape,n.dtype);return e.makeTensorInfo(u,n.dtype,m)}let{isPacked:a}=e.texData.get(n.dataId),c=oe.isSliceContinous(n.shape,l,u);if(a||!c){let p=$().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new fd(u):new dd(u),m=[l];return e.runWebGLProgram(p,[n],n.dtype,m)}return e.uploadToGPU(n.dataId),D4(n,l,u,e)}var gN={kernelName:zs,backendName:"webgl",kernelFunc:lo};var F4=r=>{let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{blockShape:s,crops:i}=o;b.assert(n.shape.length<=4,()=>"batchToSpaceND for rank > 4 with a WebGL backend not implemented yet");let l=s.reduce((y,C)=>y*C),u=w.getReshaped(n.shape,s,l),a=w.getPermuted(u.length,s.length),c=w.getReshapedPermuted(n.shape,s,l),p=w.getSliceBeginCoords(i,s.length),m=w.getSliceSize(c,i,s.length),d=[],f=Z({inputs:{x:n},backend:e,attrs:{shape:u}}),h=te({inputs:{x:f},backend:e,attrs:{perm:a}}),g=Z({inputs:{x:h},backend:e,attrs:{shape:c}}),x=lo({inputs:{x:g},backend:e,attrs:{begin:p,size:m}});return d.push(f),d.push(h),d.push(g),d.forEach(y=>e.disposeIntermediateTensorInfo(y)),x},xN={kernelName:$s,backendName:"webgl",kernelFunc:F4};function $4(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,weights:s}=t,{size:i}=o,l=e.readSync(n.dataId),u=e.readSync(s.dataId),a=qm(l,u,s.dtype,s.shape,i);return e.makeTensorInfo([i],s.dtype,a)}var bN={kernelName:wa,backendName:"webgl",kernelFunc:$4};var M4=`
  int r = int(a.r) & int(b.r);
  int g = int(a.g) & int(b.g);
  int rb = int(a.b) & int(b.b);
  int ra = int(a.a) & int(b.a);
  return vec4(r, g, rb, ra);
`,P4=`
  return float(int(a.r) & int(b.r));
`;function O4(r){let{inputs:t,backend:e}=r,{a:o,b:n}=t,s=$().getBool("WEBGL_PACK_BINARY_OPERATIONS"),i=$().getNumber("WEBGL_VERSION");if(e.shouldExecuteOnCPU([o,n])||i===1){let u=e.texData.get(o.dataId).values,a=e.texData.get(n.dataId).values,[c,p]=ET(o.shape,n.shape,u,a,o.dtype),m=e.makeTensorInfo(p,o.dtype),d=e.texData.get(m.dataId);return d.values=c,m}let l;return s?l=new Cr(M4,o.shape,n.shape,!1):l=new sr(P4,o.shape,n.shape),e.runWebGLProgram(l,[o,n],o.dtype)}var yN={kernelName:va,backendName:"webgl",kernelFunc:O4};function B4(r){let{inputs:t,backend:e}=r,{s0:o,s1:n}=t,s=e.readSync(o.dataId),i=e.readSync(n.dataId),l=w.assertAndGetBroadcastShape(Array.from(s),Array.from(i));return e.makeTensorInfo([l.length],"int32",Int32Array.from(l))}var CN={kernelName:ll,backendName:"webgl",kernelFunc:B4};var L4="return float(a != b);",mC=Ht({opSnippet:L4,cpuKernelImpl:ZT,dtype:"bool"}),IN={kernelName:Pn,backendName:"webgl",kernelFunc:mC};function ws(r){let{inputs:t,backend:e}=r,{input:o}=t,n=e.texData.get(o.dataId);return fe({inputs:{x:n.complexTensorInfos.real},backend:e})}var wN={kernelName:vl,backendName:"webgl",kernelFunc:ws};var U4="return float(int(x));";function vN(r,t){let e=new $e(r.shape,U4),o=t.runWebGLProgram(e,[r],"int32");return{dataId:o.dataId,shape:o.shape,dtype:o.dtype}}function dC(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{dtype:s}=o;if(s==="complex64"){if(n.dtype==="complex64")return fe({inputs:{x:n},backend:e});let i=li(n.shape),l=dC({inputs:{x:n},backend:e,attrs:{dtype:"float32"}}),u=ar({inputs:{real:l,imag:i},backend:e});return i.dispose(),e.disposeIntermediateTensorInfo(l),u}if(n.dtype==="complex64"){let i=ws({inputs:{input:n},backend:e}),l=dC({inputs:{x:i},backend:e,attrs:{dtype:s}});return e.disposeIntermediateTensorInfo(i),l}if(!b.hasEncodingLoss(n.dtype,s)){let i=fe({inputs:{x:n},backend:e});return{dataId:i.dataId,shape:i.shape,dtype:s}}if(e.shouldExecuteOnCPU([n])){let i=e.texData.get(n.dataId).values,[l,u,a]=RT(i,n.shape,n.dtype,s);return e.makeTensorInfo(l,u,a)}if(s==="int32")return vN(n,e);if(s==="bool"){let i=e.makeTensorInfo([],"bool",b.getTypedArrayFromDType("bool",1)),u=mC({inputs:{a:n,b:i},backend:e});return e.disposeIntermediateTensorInfo(i),u}throw new Error(`Error in Cast: failed to cast ${n.dtype} to ${s}`)}var SN={kernelName:ho,backendName:"webgl",kernelFunc:dC};var kN="return ceil(x);",G4=pt({opSnippet:kN,packedOpSnippet:kN,cpuKernelImpl:DT}),TN={kernelName:qo,backendName:"webgl",kernelFunc:G4};var hd=class{constructor(t){this.variableNames=["A"],this.customUniforms=[{name:"minVal",type:"float"},{name:"maxVal",type:"float"}],this.outputShape=t,this.userCode=`

      void main() {
        float value = getAAtOutCoords();
        if (isnan(value)) {
          setOutput(value);
          return;
        }

        setOutput(clamp(value, minVal, maxVal));
      }
    `}};var gd=class{constructor(t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"minVal",type:"float"},{name:"maxVal",type:"float"}],this.outputShape=t,this.userCode=`
      void main() {
        vec4 value = getAAtOutCoords();

        if (any(isnan(value))) {
          setOutput(value);
          return;
        }

        setOutput(clamp(value, vec4(minVal), vec4(maxVal)));
      }
    `}};function V4(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{clipValueMin:s,clipValueMax:i}=o,l;$().getBool("WEBGL_PACK_CLIP")?l=new gd(n.shape):l=new hd(n.shape);let u=[[s],[i]];return e.runWebGLProgram(l,[n],n.dtype,u)}var _N={kernelName:go,backendName:"webgl",kernelFunc:V4};var xd=class{constructor(t){this.variableNames=["real","imag"],this.outputShape=t,this.userCode=`
      void main() {
        float re = abs(getRealAtOutCoords());
        float im = abs(getImagAtOutCoords());
        float mx = max(re, im);

        // sadly the length function in glsl is not underflow-safe
        // (at least not on Intel GPUs). So the safe solution is
        // to ensure underflow-safety in all cases.
        setOutput(
          mx == 0.0 ? 0.0 : mx * length(vec2(1, min(re, im)/mx))
        );
      }
    `}};function NN(r,t){return{dataId:t.dataId,dtype:t.dtype,shape:r.shape}}function W4(r){let{inputs:t,backend:e}=r,{x:o}=t,n=e.texData.get(o.dataId),s=new xd(o.shape),i=[NN(o,n.complexTensorInfos.real),NN(o,n.complexTensorInfos.imag)];return e.runWebGLProgram(s,i,i[0].dtype)}var AN={kernelName:cl,backendName:"webgl",kernelFunc:W4};var bd=class{constructor(t){this.outputShape=[],this.outputShape=w.computeOutShape(t,1),this.variableNames=t.map((i,l)=>`T${l}`);let e=new Array(t.length-1);e[0]=t[0][1];for(let i=1;i<e.length;i++)e[i]=e[i-1]+t[i][1];let o=[`if (yC < ${e[0]}) setOutput(getT0(yR, yC));`];for(let i=1;i<e.length;i++){let l=e[i-1];o.push(`else if (yC < ${e[i]}) setOutput(getT${i}(yR, yC-${l}));`)}let n=e.length,s=e[e.length-1];o.push(`else setOutput(getT${n}(yR, yC-${s}));`),this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int yR = coords.x;
        int yC = coords.y;

        ${o.join(`
        `)}
      }
    `}};var Cd=class{constructor(t,e){this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[],this.outputShape=w.computeOutShape(t,e);let o=this.outputShape,n=o.length,s=kt(n),i=de("coords",n),l=["x","y","z","w","u","v"].slice(0,n);this.variableNames=t.map((h,g)=>`T${g}`);let u=new Array(t.length-1);u[0]=t[0][e];for(let h=1;h<u.length;h++)u[h]=u[h-1]+t[h][e];let a=l[e],c=l.slice(-2),p=l.join(),m=`if (${a} < ${u[0]}) {
        return getChannel(
            getT0(${p}), vec2(${c.join()}));
        }`;for(let h=1;h<u.length;h++){let g=u[h-1];m+=`
        if (${a} < ${u[h]}  && ${a} >= ${u[h-1]}) {
          return getChannel(
            getT${h}(${yd(l,a,g)}),
            vec2(${yd(c,a,g)}));
        }`}let d=u.length,f=u[u.length-1];m+=`
        return getChannel(
          getT${d}(${yd(l,a,f)}),
          vec2(${yd(c,a,f)}));`,this.userCode=`
      float getValue(${l.map(h=>"int "+h)}) {
        ${m}
      }

      void main() {
        ${s} coords = getOutputCoords();
        vec4 result = vec4(getValue(${i}), 0., 0., 0.);

        ${i[n-1]} = ${i[n-1]} + 1;
        if (${i[n-1]} < ${o[n-1]}) {
          result.g = getValue(${i});
        }

        ${i[n-2]} = ${i[n-2]} + 1;
        if (${i[n-2]} < ${o[n-2]}) {
          result.a = getValue(${i});
        }

        ${i[n-1]} = ${i[n-1]} - 1;
        if (${i[n-2]} < ${o[n-2]} &&
            ${i[n-1]} < ${o[n-1]}) {
          result.b = getValue(${i});
        }
        setOutput(result);
      }
    `}};function yd(r,t,e){let o=r.indexOf(t);return r.map((s,i)=>i===o?`${s} - ${e}`:s).join()}function Ei(r){let{inputs:t,backend:e}=r,{input:o}=t,n=e.texData.get(o.dataId);return fe({inputs:{x:n.complexTensorInfos.imag},backend:e})}var EN={kernelName:xl,backendName:"webgl",kernelFunc:Ei};function fu(r,t,e){let o=r[0].dtype;if(o==="complex64"){let d=r.map(y=>ws({inputs:{input:y},backend:e})),f=r.map(y=>Ei({inputs:{input:y},backend:e})),h=fu(d,t,e),g=fu(f,t,e),x=ar({inputs:{real:h,imag:g},backend:e});return d.forEach(y=>e.disposeIntermediateTensorInfo(y)),f.forEach(y=>e.disposeIntermediateTensorInfo(y)),e.disposeIntermediateTensorInfo(h),e.disposeIntermediateTensorInfo(g),x}let n=e.shouldExecuteOnCPU(r);if(o==="string"&&(n=!0),n){let d=r.map(I=>{let S=[-1,b.sizeFromShape(I.shape.slice(t))];return Z({inputs:{x:I},backend:e,attrs:{shape:S}})}),f=d.map(I=>({vals:e.readSync(I.dataId),shape:I.shape})),h=w.computeOutShape(d.map(I=>I.shape),1),g=d[0].shape[0]===1,x=FT(f,h,o,g),y=w.computeOutShape(r.map(I=>I.shape),t),C=e.makeTensorInfo(y,o,x);return d.forEach(I=>e.disposeIntermediateTensorInfo(I)),C}let s=r.filter(d=>b.sizeFromShape(d.shape)>0),i=$().getBool("WEBGL_PACK_ARRAY_OPERATIONS")&&s[0].shape.length>1;if(s.length===1){let d=i?new $e(r[0].shape,To):new nr(r[0].shape,To);return e.runWebGLProgram(d,r,o)}let l=$().getNumber("WEBGL_MAX_TEXTURES_IN_SHADER");if(s.length>l){let d=[];for(let h=0;h<s.length;h+=l){let g=s.slice(h,h+l);d.push(fu(g,t,e))}let f=fu(d,t,e);for(let h of d)e.disposeIntermediateTensorInfo(h);return f}if(i){let d=new Cd(s.map(f=>f.shape),t);return e.runWebGLProgram(d,s,o)}let{tensors2D:u,outShape:a}=z4(s,t,e),c=new bd(u.map(d=>d.shape)),p=e.runWebGLProgram(c,u,o);u.forEach(d=>e.disposeIntermediateTensorInfo(d));let m=Z({inputs:{x:p},attrs:{shape:a},backend:e});return e.disposeIntermediateTensorInfo(p),m}function z4(r,t,e){let o=w.computeOutShape(r.map(s=>s.shape),t);return{tensors2D:r.map(s=>Z({inputs:{x:s},attrs:{shape:[-1,b.sizeFromShape(s.shape.slice(t))]},backend:e})),outShape:o}}function fC(r){let{inputs:t,backend:e,attrs:o}=r,{axis:n}=o,s=b.parseAxisParam(n,t[0].shape)[0],i=t.map(a=>a.shape);w.assertParamsConsistent(i,s);let l=w.computeOutShape(t.map(a=>a.shape),s);if(b.sizeFromShape(l)===0)return e.makeTensorInfo(l,t[0].dtype,[]);let u=t.filter(a=>b.sizeFromShape(a.shape)>0);return u.length===1?fe({inputs:{x:u[0]},backend:e}):fu(u,s,e)}var RN={kernelName:Ms,backendName:"webgl",kernelFunc:fC};var hu=class{constructor(t,e=!1,o=null,n=!1,s=!1){this.variableNames=["x","W"],this.outputShape=t.outShape;let i=t.padInfo.top,l=t.padInfo.left,u=t.strideHeight,a=t.strideWidth,c=t.dilationHeight,p=t.dilationWidth,m=t.filterHeight,d=t.filterWidth,f=Math.floor(t.inChannels/4)*4,h=t.inChannels%4,g=t.dataFormat==="channelsLast",x=g?1:2,y=g?2:3,C=g?3:1,I="",v="";o&&(n?I=`float activation(float a) {
          float b = getPreluActivationWeightsAtOutCoords();
          ${o}
        }`:s?I=`float activation(float a) {
          float b = getLeakyreluAlphaAtOutCoords();
          ${o}
        }`:I=`
          float activation(float x) {
            ${o}
          }
        `,v="result = activation(result);");let S=e?"result += getBiasAtOutCoords();":"";e&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights"),s&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
      ${I}

      const ivec2 strides = ivec2(${u}, ${a});
      const ivec2 pads = ivec2(${i}, ${l});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d2 = coords[${C}];

        ivec2 xRCCorner =
            ivec2(coords[${x}], coords[${y}]) * strides - pads;
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // Convolve x(?, ?, d1) with w(:, :, d1, d2) to get y(yR, yC, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${m}; wR++) {
          int xR = xRCorner + wR * ${c};

          if (xR < 0 || xR >= ${t.inHeight}) {
            continue;
          }

          for (int wC = 0; wC < ${d}; wC++) {
            int xC = xCCorner + wC * ${p};

            if (xC < 0 || xC >= ${t.inWidth}) {
              continue;
            }

            for (int d1 = 0; d1 < ${f}; d1 += 4) {
              vec4 wValues = vec4(
                getW(wR, wC, d1, d2),
                getW(wR, wC, d1 + 1, d2),
                getW(wR, wC, d1 + 2, d2),
                getW(wR, wC, d1 + 3, d2)
              );

              if (${g}) {
                vec4 xValues = vec4(
                  getX(batch, xR, xC, d1),
                  getX(batch, xR, xC, d1 + 1),
                  getX(batch, xR, xC, d1 + 2),
                  getX(batch, xR, xC, d1 + 3)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec4 xValues = vec4(
                  getX(batch, d1, xR, xC),
                  getX(batch, d1 + 1, xR, xC),
                  getX(batch, d1 + 2, xR, xC),
                  getX(batch, d1 + 3, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }
            }

            if (${h===1}) {

              if (${g}) {
                dotProd +=
                    getX(batch, xR, xC, ${f}) *
                    getW(wR, wC, ${f}, d2);
              } else {
                dotProd +=
                    getX(batch, ${f}, xR, xC) *
                    getW(wR, wC, ${f}, d2);
              }

            } else if (${h===2}) {
              vec2 wValues = vec2(
                getW(wR, wC, ${f}, d2),
                getW(wR, wC, ${f} + 1, d2)
              );

              if (${g}) {
                vec2 xValues = vec2(
                  getX(batch, xR, xC, ${f}),
                  getX(batch, xR, xC, ${f} + 1)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec2 xValues = vec2(
                  getX(batch, ${f}, xR, xC),
                  getX(batch, ${f} + 1, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }

            } else if (${h===3}) {
              vec3 wValues = vec3(
                getW(wR, wC, ${f}, d2),
                getW(wR, wC, ${f} + 1, d2),
                getW(wR, wC, ${f} + 2, d2)
              );

              if (${g}) {
                vec3 xValues = vec3(
                  getX(batch, xR, xC, ${f}),
                  getX(batch, xR, xC, ${f} + 1),
                  getX(batch, xR, xC, ${f} + 2)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec3 xValues = vec3(
                  getX(batch, ${f}, xR, xC),
                  getX(batch, ${f} + 1, xR, xC),
                  getX(batch, ${f} + 2, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }

            }
          }
        }

        float result = dotProd;
        ${S}
        ${v}
        setOutput(result);
      }
    `}},Id=class{constructor(t){this.variableNames=["x","W"],this.outputShape=t.outShape;let e=t.padInfo.front,o=t.padInfo.top,n=t.padInfo.left,s=t.strideDepth,i=t.strideHeight,l=t.strideWidth,u=t.dilationDepth,a=t.dilationHeight,c=t.dilationWidth,p=t.filterDepth,m=t.filterHeight,d=t.filterWidth,f=Math.floor(t.inChannels/4)*4,h=t.inChannels%4;this.userCode=`
      const ivec3 strides = ivec3(${s}, ${i}, ${l});
      const ivec3 pads = ivec3(${e}, ${o}, ${n});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int d2 = coords.u;

        ivec3 xFRCCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
        int xFCorner = xFRCCorner.x;
        int xRCorner = xFRCCorner.y;
        int xCCorner = xFRCCorner.z;

        // Convolve x(?, ?, ?, d1) with w(:, :, :, d1, d2) to get
        // y(yF, yR, yC, d2). ? = to be determined. : = across all
        // values in that axis.
        float dotProd = 0.0;
        for (int wF = 0; wF < ${p}; wF++) {
          int xF = xFCorner + wF * ${u};

          if (xF < 0 || xF >= ${t.inDepth}) {
            continue;
          }

          for (int wR = 0; wR < ${m}; wR++) {
            int xR = xRCorner + wR * ${a};

            if (xR < 0 || xR >= ${t.inHeight}) {
              continue;
            }

            for (int wC = 0; wC < ${d}; wC++) {
              int xC = xCCorner + wC * ${c};

              if (xC < 0 || xC >= ${t.inWidth}) {
                continue;
              }

              for (int d1 = 0; d1 < ${f}; d1 += 4) {
                vec4 xValues = vec4(
                  getX(batch, xF, xR, xC, d1),
                  getX(batch, xF, xR, xC, d1 + 1),
                  getX(batch, xF, xR, xC, d1 + 2),
                  getX(batch, xF, xR, xC, d1 + 3)
                );
                vec4 wValues = vec4(
                  getW(wF, wR, wC, d1, d2),
                  getW(wF, wR, wC, d1 + 1, d2),
                  getW(wF, wR, wC, d1 + 2, d2),
                  getW(wF, wR, wC, d1 + 3, d2)
                );

                dotProd += dot(xValues, wValues);
              }

              if (${h===1}) {
                dotProd +=
                  getX(batch, xF, xR, xC, ${f}) *
                  getW(wF, wR, wC, ${f}, d2);
              } else if (${h===2}) {
                vec2 xValues = vec2(
                  getX(batch, xF, xR, xC, ${f}),
                  getX(batch, xF, xR, xC, ${f} + 1)
                );
                vec2 wValues = vec2(
                  getW(wF, wR, wC, ${f}, d2),
                  getW(wF, wR, wC, ${f} + 1, d2)
                );
                dotProd += dot(xValues, wValues);
              } else if (${h===3}) {
                vec3 xValues = vec3(
                  getX(batch, xF, xR, xC, ${f}),
                  getX(batch, xF, xR, xC, ${f} + 1),
                  getX(batch, xF, xR, xC, ${f} + 2)
                );
                vec3 wValues = vec3(
                  getW(wF, wR, wC, ${f}, d2),
                  getW(wF, wR, wC, ${f} + 1, d2),
                  getW(wF, wR, wC, ${f} + 2, d2)
                );
                dotProd += dot(xValues, wValues);
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `}};var gu=class{constructor(t,e=!1,o=null,n=!1,s=!1){this.variableNames=["x","W"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"pads",type:"ivec2"},{name:"strides",type:"ivec2"},{name:"dilations",type:"ivec2"},{name:"inDims",type:"ivec2"}],this.outputShape=t.outShape,this.enableShapeUniforms=jt(this.outputShape.length);let i=t.padInfo.left,l=t.strideWidth,u=t.dilationWidth,a=t.filterHeight,c=t.filterWidth,p=c,m=`
       int xR; int xC; int xCOffset;
       vec4 wTexel; vec4 previous; vec4 final;`;for(let g=0;g<c;g++)m+=`
           vec4 xTexelC${g*2};
           int xTexelC${g*2}Ready;
           vec4 xTexelC${g*2+1};
           int xTexelC${g*2+1}Ready;
           vec4 xC${g};`;m+=`
     for (int r = 0; r < ${a}; r++) {
      for (int d1 = 0; d1 < ${t.inChannels}; d1 += 2) {
       `;for(let g=0;g<c;g++)m+=`
           xTexelC${g*2} = vec4(0.0);
           xTexelC${g*2}Ready = 0;
           xTexelC${g*2+1} = vec4(0.0);
           xTexelC${g*2+1}Ready = 0;
           xC${g} = vec4(0.0);`;m+=`
         xR = xRCorner + r * dilations[0];
         if (xR >=0 && xR < inDims[0]) {
       `;for(let g=0;g<(p+1)/2;g++){let x=g*2;if(m+=`
           xC = xCCorner + ${x*u};
           `,l===1){if(x<c&&(i%2===1?(m+=`
                 xCOffset = xC + 1;
                 if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${x}Ready == 0) {
                   xTexelC${x} = getX(batch, xR, xCOffset, d1);

                   // Need to manually clear unused channels in case
                   // we're reading from recycled texture.
                   if (xCOffset + 1 >= inDims[1]) {
                     xTexelC${x}.zw = vec2(0.0);
                   }
                   xTexelC${x}Ready = 1;
                 }
               `,u===1&&x>0?m+=`
                 xC${x} = vec4(xTexelC${x-2}.zw, xTexelC${x}.xy);
                 `:m+=`
                   xCOffset = xC + 1 - 2;

                   if (xCOffset >= 0 && xCOffset < inDims[1]) {
                     previous = getX(batch, xR, xCOffset, d1);

                     // Need to manually clear unused channels in case
                     // we're reading from recycled texture.
                     if (xCOffset + 1 >= inDims[1]) {
                       previous.zw = vec2(0.0);
                     }

                     xC${x} = vec4(previous.zw, xTexelC${x}.xy);
                   } else {
                     xC${x} = vec4(0.0, 0.0, xTexelC${x}.xy);
                   }
                   `):m+=`
                 if (xC >= 0 && xC < inDims[1] && xTexelC${x}Ready == 0) {
                   xTexelC${x} = getX(batch, xR, xC, d1);
                   if (xC + 1 >= inDims[1]) {
                     xTexelC${x}.zw = vec2(0.0);
                   }
                   xTexelC${x}Ready = 1;
                 }

                 xC${x} = xTexelC${x};
                 `,x+1<c)){let y=i%2===0?b.nearestLargerEven(u):u;u%2===0&&i%2===1||u%2!==0&&i%2!==1?(m+=`
                   xCOffset = xC + imod(pads[1], 2) + ${y};

                   if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${x+1}Ready == 0) {
                     xTexelC${x+1} = getX(batch, xR, xCOffset, d1);

                     // Need to manually clear unused channels in case
                     // we're reading from recycled texture.
                     if (xCOffset + 1 >= inDims[1]) {
                       xTexelC${x+1}.zw = vec2(0.0);
                     }
                     xTexelC${x+1}Ready = 1;
                   }
                   `,u>1?m+=`
                     xCOffset -= 2;
                     if (xCOffset >= 0 && xCOffset < inDims[1]) {
                      previous = getX(batch, xR, xCOffset, d1);
                      xC${x+1} = vec4(previous.zw, xTexelC${x+1}.xy);
                     } else {
                      xC${x+1} = vec4(0.0, 0.0, xTexelC${x+1}.xy);
                     }
                     `:m+=`
                     xC${x+1} = vec4(xTexelC${x}.zw, xTexelC${x+1}.xy);
                     `):y===1?m+=`
                     xC${x+1} = xTexelC${x};
                     `:m+=`
                     xCOffset = xC + ${y};

                     if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${x+1}Ready == 0) {
                       xTexelC${x+1} = getX(batch, xR, xCOffset, d1);
                       if (xCOffset + 1 >= inDims[1]) {
                         xTexelC${x+1}.zw = vec2(0.0);
                       }
                       xTexelC${x+1}Ready = 1;
                     }

                     xC${x+1} = xTexelC${x+1};
                     `}}else x<c&&(i%2===1?(m+=`
                 xCOffset = xC + 1 - strides[1];
                 if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${x}Ready == 0) {
                   xTexelC${x} = getX(batch, xR, xCOffset, d1);
                   // Need to manually clear unused channels in case
                   // we're reading from recycled texture.
                   if (xCOffset + 1 >= inDims[1]) {
                     xTexelC${x}.zw = vec2(0.0);
                   }
                   xTexelC${x}Ready = 1;
                 }

                 if(xC + 1 >= 0 && xC + 1 < inDims[1] && xTexelC${x+1}Ready == 0) {
                   xTexelC${x+1} = getX(batch, xR, xC + 1, d1);
                   // Need to manually clear unused channels in case
                   // we're reading from recycled texture.
                   if (xC + 2 >= inDims[1]) {
                     xTexelC${x+1}.zw = vec2(0.0);
                   }
                   xTexelC${x+1}Ready = 1;
                 }

                 xC${x} = vec4(xTexelC${x}.zw, xTexelC${x+1}.zw);
               `,x+1<c&&(m+=`
                   final = vec4(0.0);
                   xCOffset = xC + 1 + strides[1];
                   if(xCOffset >= 0 && xCOffset < inDims[1]) {
                     final = getX(batch, xR, xCOffset, d1);
                   }
                   xC${x+1} = vec4(xTexelC${x+1}.xy, final.xy);
                 `)):(m+=`
                 if(xC >= 0 && xC < inDims[1] && xTexelC${x}Ready == 0) {
                   xTexelC${x} = getX(batch, xR, xC, d1);
                   if (xC + 1 >= inDims[1]) {
                     xTexelC${x}.zw = vec2(0.0);
                   }
                   xTexelC${x}Ready = 1;
                 }

                 xCOffset = xC + strides[1];
                 if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${x+1}Ready == 0) {
                   xTexelC${x+1} = getX(batch, xR, xCOffset, d1);
                   if (xCOffset + 1 >= inDims[1]) {
                     xTexelC${x+1}.zw = vec2(0.);
                   }
                   xTexelC${x+1}Ready = 1;
                 }

                 xC${x} = vec4(
                   xTexelC${x}.xy, xTexelC${x+1}.xy);
               `,x+1<c&&(m+=`
                   xC${x+1} = vec4(xTexelC${x}.zw, xTexelC${x+1}.zw);
                 `)));x<c&&(m+=`
             wTexel = getW(r, ${x}, d1, d2);
             dotProd += xC${x}.xxzz * vec4(wTexel.xy, wTexel.xy);
             if(d1 + 1 < ${t.inChannels}) {
               dotProd += xC${x}.yyww * vec4(wTexel.zw, wTexel.zw);
             }
           `,x+1<c&&(m+=`
               wTexel = getW(r, ${x+1}, d1, d2);
               dotProd += xC${x+1}.xxzz * vec4(wTexel.xy, wTexel.xy);
               if(d1 + 1 < ${t.inChannels}) {
                 dotProd += xC${x+1}.yyww * vec4(wTexel.zw, wTexel.zw);
               }
             `))}m+=`
     }
   `,m+=`
     }
   `,m+=`
     }
   `;let d="",f="";o&&(n?d=`vec4 activation(vec4 a) {
           vec4 b = getPreluActivationWeightsAtOutCoords();
           ${o}
         }`:s?d=`vec4 activation(vec4 a) {
           vec4 b = getLeakyreluAlphaAtOutCoords();
           ${o}
         }`:d=`vec4 activation(vec4 x) {
           ${o}
         }`,f="result = activation(result);");let h=e?"result += getBiasAtOutCoords();":"";e&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights"),s&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
       ${d}

       void main() {
         ivec4 coords = getOutputCoords();
         int batch = coords.x;
         ivec2 xRCCorner = coords.yz * strides - pads;
         int d2 = coords.w;
         int xRCorner = xRCCorner.x;
         int xCCorner = xRCCorner.y;

         //intialize dotProd with a small epsilon seems to reduce GPU accuracy loss.
         vec4 dotProd = vec4(0.000000000000001);

         ${m}

         vec4 result = dotProd - vec4(0.000000000000001);
         ${h}
         ${f}
         setOutput(result);
       }
     `}};var wd=class{constructor(t,e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"inputShape",type:"ivec4"},{name:"pad",type:"ivec2"},{name:"stride",type:"ivec2"},{name:"dilation",type:"ivec2"},{name:"inChannels",type:"int"},{name:"itemsPerBlockRow",type:"int"},{name:"outWidth",type:"int"}],this.outputShape=t,this.enableShapeUniforms=jt(this.outputShape.length);let{dataFormat:o}=e,n=se(),s=o==="channelsLast",i=s?1:2,l=s?2:3,u=this.enableShapeUniforms?"if(blockIndex < outShape[2] && pos < outShape[1]) {":`if(blockIndex < ${t[2]} && pos < ${t[1]}) {`,a="";for(let c=0;c<=1;c++)for(let p=0;p<=1;p++)a+=`
          blockIndex = rc.z + ${p};
          pos = rc.y + ${c};

          ${u}
            offsetY = int(blockIndex / outWidth) * stride[0] - pad[0];
            d0 = offsetY + dilation[0] * (pos / itemsPerBlockRow);

            if(d0 < inputShape[${i}] && d0 >= 0) {
              // Use custom imod instead mod. On Intel GPU, mod may generate
              // unexpected value.
              // https://github.com/tensorflow/tfjs/issues/5447
              offsetX = imod(blockIndex, outWidth) * stride[1] - pad[1];
              d1 = offsetX + dilation[1] * (imod(pos, itemsPerBlockRow) /
                  inChannels);

              if(d1 < inputShape[${l}] && d1 >= 0) {

                ch = imod(pos, inChannels);

                if (${s}) {
                  innerDims = vec2(d1, ch);
                  result[${c*2+p}] = getChannel(
                    getA(rc.x, d0, int(innerDims.x),
                    int(innerDims.y)), innerDims);
                } else {
                  innerDims = vec2(d0, d1);
                  result[${c*2+p}] = getChannel(
                    getA(rc.x, ch, int(innerDims.x),
                    int(innerDims.y)), innerDims);
                }
              }
            }
          }
        `;this.userCode=`
      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0);

        int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
        vec2 innerDims;

        ${a}

        ${n.output} = result;
      }
    `}};function vd(r,t){let e=r.length;return e>=3?t?[...r.slice(0,-3),r[e-3]*r[e-2],r[e-1]]:[...r.slice(0,-3),r[e-3],r[e-2]*r[e-1]]:!t&&e===1&&r[0]>1?[r[0],1]:null}function Sd({x:r,filter:t,convInfo:e,backend:o,bias:n=null,preluActivationWeights:s=null,leakyreluAlpha:i=0,activation:l=null}){let u=r.shape,a=o.texData.get(r.dataId),c=e.inChannels,p=u[0]*u[1]*u[2],m=e.outChannels,d=e.dataFormat==="channelsLast",f=!1,h=!1,g,x=[];if(s!=null){let I=vd(s.shape,d);I!=null&&(s=Z({inputs:{x:s},backend:o,attrs:{shape:I}}),x.push(s))}if(n!=null){let I=vd(n.shape,d);I!=null&&(n=Z({inputs:{x:n},backend:o,attrs:{shape:I}}),x.push(n))}if(!((p===1||m===1)&&c>cC)&&a.isPacked&&d&&a.texture!=null&&u[2]%2!==0&&b.arraysEqual(a.shape.slice(-3),u.slice(-3))){let I=u[0]*u[1]*(u[2]+1),v={dataId:r.dataId,shape:[1,I,e.inChannels],dtype:r.dtype},S=a.shape;a.shape=a.shape.slice(),a.shape[a.shape.length-2]++,b.assert(Si(a.shape,v.shape),()=>`packed reshape ${a.shape} to ${v.shape} isn't free`);let k=Z({inputs:{x:t},backend:o,attrs:{shape:[1,e.inChannels,e.outChannels]}});x.push(k);let A=Ai({a:v,b:k,backend:o,transposeA:f,transposeB:h,bias:n,activation:l,preluActivationWeights:s,leakyreluAlpha:i}),D=o.texData.get(A.dataId);b.assert(D.isPacked,()=>"batchMatMul result is expected to be packed"),a.shape=S,D.shape=e.outShape,g=fe({inputs:{x:A},backend:o}),g.shape=e.outShape,x.push(A)}else{let I=e.outHeight*e.outWidth,v=Z({inputs:{x:r},backend:o,attrs:{shape:d?[e.batchSize,I,e.inChannels]:[e.batchSize,e.inChannels,I]}}),S=Z({inputs:{x:t},backend:o,attrs:{shape:[1,e.inChannels,e.outChannels]}}),k=Ai({a:d?v:S,b:d?S:v,transposeA:!d,transposeB:h,backend:o,bias:n,activation:l,preluActivationWeights:s,leakyreluAlpha:i});g=Z({inputs:{x:k},backend:o,attrs:{shape:e.outShape}}),x.push(v),x.push(S),x.push(k)}for(let I of x)o.disposeIntermediateTensorInfo(I);return g}function kd({x:r,filter:t,convInfo:e,backend:o,bias:n=null,preluActivationWeights:s=null,leakyreluAlpha:i=0,activation:l=null}){let{filterWidth:u,filterHeight:a,inChannels:c,outWidth:p,outHeight:m,dataFormat:d}=e,f=d==="channelsLast",h=u*a*c,g=m*p,x=[e.batchSize,h,g],y=!0,C=!1,I=[];if(s!=null){let W=vd(s.shape,f);W!=null&&(s=Z({inputs:{x:s},backend:o,attrs:{shape:W}}),I.push(s))}if(n!=null){let W=vd(n.shape,f);W!=null&&(n=Z({inputs:{x:n},backend:o,attrs:{shape:W}}),I.push(n))}let v=Z({inputs:{x:t},backend:o,attrs:{shape:[1,h,b.sizeFromShape(t.shape)/h]}});I.push(v);let S=new wd(x,e),k=[r.shape,[e.padInfo.top,e.padInfo.left],[e.strideHeight,e.strideWidth],[e.dilationHeight,e.dilationWidth],[e.inChannels],[e.filterWidth*e.inChannels],[e.outWidth]],A=o.runWebGLProgram(S,[r],"float32",k),D=Z({inputs:{x:A},backend:o,attrs:{shape:x}});I.push(A),I.push(D);let F=n!=null,M=s!=null,B=l==="leakyrelu",U=l?Is(l,!0):null,P=new du(f?D.shape:v.shape,f?v.shape:D.shape,f?[e.batchSize,g,e.outChannels]:[e.batchSize,e.outChannels,g],y,C,F,U,M,B),L=f?[D,v]:[v,D];if(n&&L.push(n),M&&L.push(s),B){let W=o.makeTensorInfo([],"float32",b.createScalarValue(i,"float32"));L.push(W),I.push(W)}let z=o.runWebGLProgram(P,L,"float32"),V=Z({inputs:{x:z},backend:o,attrs:{shape:e.outShape}});I.push(z);for(let W of I)o.disposeIntermediateTensorInfo(W);return V}function H4(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,filter:s}=t,{strides:i,pad:l,dataFormat:u,dilations:a,dimRoundingMode:c}=o,p=w.convertConv2DDataFormat(u),m=w.computeConv2DInfo(n.shape,s.shape,i,a,l,c,!1,p),d;if(m.filterHeight===1&&m.filterWidth===1&&m.dilationHeight===1&&m.dilationWidth===1&&m.strideHeight===1&&m.strideWidth===1&&(m.padInfo.type==="SAME"||m.padInfo.type==="VALID"))d=Sd({x:n,filter:s,convInfo:m,backend:e});else if(m.strideWidth<=2&&p==="channelsLast"&&$().getBool("WEBGL_EXP_CONV")){let h=new gu(m),g=[[m.padInfo.top,m.padInfo.left],[m.strideHeight,m.strideWidth],[m.dilationHeight,m.dilationWidth],[m.inHeight,m.inWidth]];d=e.runWebGLProgram(h,[n,s],"float32",g)}else if($().getBool("WEBGL_CONV_IM2COL"))d=kd({x:n,filter:s,convInfo:m,backend:e});else{let h=new hu(m);d=e.runWebGLProgram(h,[n,s],"float32")}let f=Z({inputs:{x:d},backend:e,attrs:{shape:m.outShape}});return e.disposeIntermediateTensorInfo(d),f}var DN={kernelName:jo,backendName:"webgl",kernelFunc:H4};var Td=class{constructor(t){this.variableNames=["x","dy"],this.outputShape=t.filterShape;let e=t.strideHeight,o=t.strideWidth,n=t.padInfo.top,s=t.padInfo.left,i=t.dataFormat==="channelsLast";this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int wR = coords.x;
        int wC = coords.y;
        int d1 = coords.z;
        int d2 = coords.w;

        // Convolve x(?, ?, d1) with dy(:, :, d2) to get dw(wR, wC, d1, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int b = 0; b < ${t.batchSize}; b++) {
          for (int yR = 0; yR < ${t.outHeight}; yR++) {
            int xR = wR + yR * ${e} - ${n};

            if (xR < 0 || xR >= ${t.inHeight}) {
              continue;
            }

            for (int yC = 0; yC < ${t.outWidth}; yC++) {
              int xC = wC + yC * ${o} - ${s};

              if (xC < 0 || xC >= ${t.inWidth}) {
                continue;
              }

              ${i?`float dyValue = getDy(b, yR, yC, d2);
              float xValue = getX(b, xR, xC, d1);
              dotProd += (xValue * dyValue);`:`float dyValue = getDy(b, d2, yR, yC);
              float xValue = getX(b, d1, xR, xC);
              dotProd += (xValue * dyValue);`}
            }
          }
        }
        setOutput(dotProd);
      }
    `}},_d=class{constructor(t){this.variableNames=["dy","W"],this.outputShape=t.inShape;let e=t.filterHeight,o=t.filterWidth,n=t.strideHeight,s=t.strideWidth,i=t.dataFormat==="channelsLast",l=e-1-t.padInfo.top,u=o-1-t.padInfo.left,a=i?1:2,c=i?2:3,p=i?3:1;this.userCode=`
      const ivec2 pads = ivec2(${l}, ${u});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[${p}];

        ivec2 dyCorner = ivec2(coords[${a}], coords[${c}]) - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${e}; wR++) {
          float dyR = float(dyRCorner + wR) / ${n}.0;

          if (dyR < 0.0 || dyR >= ${t.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          int wRPerm = ${e} - 1 - wR;

          for (int wC = 0; wC < ${o}; wC++) {
            float dyC = float(dyCCorner + wC) / ${s}.0;

            if (dyC < 0.0 || dyC >= ${t.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            int wCPerm = ${o} - 1 - wC;

            for (int d2 = 0; d2 < ${t.outChannels}; d2++) {

              if (${i}) {
                float xValue = getDy(batch, idyR, idyC, d2);
                float wValue = getW(wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              } else {
                float xValue = getDy(batch, d2, idyR, idyC);
                float wValue = getW(wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              }

            }
          }
        }
        setOutput(dotProd);
      }
    `}},Nd=class{constructor(t){this.variableNames=["x","dy"],this.outputShape=t.filterShape;let e=t.strideDepth,o=t.strideHeight,n=t.strideWidth,s=t.padInfo.front,i=t.padInfo.top,l=t.padInfo.left;this.userCode=`
      void main() {
        ivec5 coords = getOutputCoords();
        int wF = coords.x;
        int wR = coords.y;
        int wC = coords.z;
        int d1 = coords.w;
        int d2 = coords.u;

        float dotProd = 0.0;

        for (int b = 0; b < ${t.batchSize}; b++) {
          for (int yF = 0; yF < ${t.outDepth}; yF++) {
            int xF = wF + yF * ${e} - ${s};

            if (xF < 0 || xF >= ${t.inDepth}) {
              continue;
            }

            for (int yR = 0; yR < ${t.outHeight}; yR++) {
              int xR = wR + yR * ${o} - ${i};

              if (xR < 0 || xR >= ${t.inHeight}) {
                continue;
              }

              for (int yC = 0; yC < ${t.outWidth}; yC++) {
                int xC = wC + yC * ${n} - ${l};

                if (xC < 0 || xC >= ${t.inWidth}) {
                  continue;
                }

                float dyValue = getDy(b, yF, yR, yC, d2);
                float xValue = getX(b, xF, xR, xC, d1);
                dotProd += (xValue * dyValue);
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `}},Ad=class{constructor(t){this.variableNames=["dy","W"],this.outputShape=t.inShape;let e=t.filterDepth,o=t.filterHeight,n=t.filterWidth,s=t.strideDepth,i=t.strideHeight,l=t.strideWidth,u=e-1-t.padInfo.front,a=o-1-t.padInfo.top,c=n-1-t.padInfo.left;this.userCode=`
      const ivec3 pads = ivec3(${u}, ${a}, ${c});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int d1 = coords.u;


        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyFCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        float dotProd = 0.0;
        for (int wF = 0; wF < ${e}; wF++) {
          float dyF = float(dyFCorner + wF) / ${s}.0;

          if (dyF < 0.0 || dyF >= ${t.outDepth}.0 || fract(dyF) > 0.0) {
            continue;
          }
          int idyF = int(dyF);

          int wFPerm = ${e} - 1 - wF;

          for (int wR = 0; wR < ${o}; wR++) {
            float dyR = float(dyRCorner + wR) / ${i}.0;

            if (dyR < 0.0 || dyR >= ${t.outHeight}.0 ||
              fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            int wRPerm = ${o} - 1 - wR;

            for (int wC = 0; wC < ${n}; wC++) {
              float dyC = float(dyCCorner + wC) / ${l}.0;

              if (dyC < 0.0 || dyC >= ${t.outWidth}.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              int wCPerm = ${n} - 1 - wC;

              for (int d2 = 0; d2 < ${t.outChannels}; d2++) {
                float xValue = getDy(batch, idyF, idyR, idyC, d2);
                float wValue = getW(wFPerm, wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `}};function K4(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,dy:s}=t,{strides:i,pad:l,dataFormat:u,dimRoundingMode:a,filterShape:c}=o,p=w.convertConv2DDataFormat(u),m=w.computeConv2DInfo(n.shape,c,i,1,l,a,!1,p),d=new Td(m);return e.runWebGLProgram(d,[n,s],"float32")}var FN={kernelName:Cp,backendName:"webgl",kernelFunc:K4};var Ed=class{constructor(t){this.variableNames=["dy","W"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"strides",type:"vec2"}],this.outputShape=t.inShape,this.enableShapeUniforms=jt(this.outputShape.length);let e=t.filterHeight,o=t.filterWidth,n=e-1-t.padInfo.top,s=o-1-t.padInfo.left;this.userCode=`
      const ivec2 pads = ivec2(${n}, ${s});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[3];

        ivec2 dyCorner = ivec2(coords[1], coords[2]) - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        vec4 result = vec4(0.);
        for (int wR = 0; wR < ${e}; wR++) {
          float dyR = float(dyRCorner + wR) / strides[0];
          if (dyR < 0.0 || dyR >= ${t.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);
          int wRPerm = ${e} - 1 - wR;

          for (int wC = 0; wC < ${o}; wC++) {
            int wCPerm = ${o} - 1 - wC;

            float dyC = float(dyCCorner + wC) / strides[1];
            bool idyCVal = (dyC >= 0.0) && (dyC < ${t.outWidth}.0)
              && (fract(dyC) == 0.0);
            int idyC = int(dyC);

            float dyC2 = float(dyCCorner + wC + 1) / strides[1];
            bool idyCVal2 = (dyC2 >= 0.0) && (dyC2 < ${t.outWidth}.0)
              && (fract(dyC2) == 0.0);
            int idyC2 = int(dyC2);

            if (idyCVal && idyCVal2) {
              for (int d2 = 0; d2 < ${t.outChannels}; d2 += 2) {
                vec4 wValue = getW(wRPerm, wCPerm, d1, d2);
                vec4 dySample = getDy(batch, idyR, idyC, d2);
                vec4 dySample2 = (idyC / 2 == idyC2 / 2) ?
                  dySample : getDy(batch, idyR, idyC2, d2);

                vec2 dyValue = mod(float(idyC), 2.) == 0. ?
                  dySample.xy : dySample.zw;
                result.xy += vec2(dot(dyValue, wValue.xy),
                  dot(dyValue, wValue.zw));

                dyValue = mod(float(idyC2), 2.) == 0. ?
                  dySample2.xy : dySample2.zw;
                result.zw += vec2(dot(dyValue, wValue.xy),
                  dot(dyValue, wValue.zw));
              }
            } else if (idyCVal) {
              for (int d2 = 0; d2 < ${t.outChannels}; d2 += 2) {
                vec4 wValue = getW(wRPerm, wCPerm, d1, d2);
                vec4 dySample = getDy(batch, idyR, idyC, d2);
                vec2 dyValue = mod(float(idyC), 2.) == 0. ?
                  dySample.xy : dySample.zw;
                result.xy += vec2(dot(dyValue, wValue.xy),
                  dot(dyValue, wValue.zw));
              }
            } else if (idyCVal2) {
              for (int d2 = 0; d2 < ${t.outChannels}; d2 += 2) {
                vec4 wValue = getW(wRPerm, wCPerm, d1, d2);
                vec4 dySample = getDy(batch, idyR, idyC2, d2);
                vec2 dyValue = mod(float(idyC2), 2.) == 0. ?
                  dySample.xy : dySample.zw;
                result.zw += vec2(dot(dyValue, wValue.xy),
                  dot(dyValue, wValue.zw));
              }
            }
          }
        }
        setOutput(result);
      }
    `}};function q4(r){let{inputs:t,backend:e,attrs:o}=r,{dy:n,filter:s}=t,{inputShape:i,strides:l,pad:u,dataFormat:a,dimRoundingMode:c}=o,p=w.convertConv2DDataFormat(a),m=w.computeConv2DInfo(i,s.shape,l,1,u,c,!1,p);if($().getBool("WEBGL_PACK_CONV2DTRANSPOSE")&&p==="channelsLast"){let d=[[m.strideHeight,m.strideWidth]],f=new Ed(m);return e.runWebGLProgram(f,[n,s],"float32",d)}else{let d=new _d(m);return e.runWebGLProgram(d,[n,s],"float32")}}var $N={kernelName:Xo,backendName:"webgl",kernelFunc:q4};function j4(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,filter:s}=t,{strides:i,pad:l,dilations:u}=o,a=w.computeConv3DInfo(n.shape,s.shape,i,u,l),c=new Id(a);return e.runWebGLProgram(c,[n,s],"float32")}var MN={kernelName:Sa,backendName:"webgl",kernelFunc:j4};function X4(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,dy:s}=t,{strides:i,pad:l,filterShape:u}=o,a=w.computeConv3DInfo(n.shape,u,i,1,l),c=new Nd(a);return e.runWebGLProgram(c,[n,s],"float32")}var PN={kernelName:ka,backendName:"webgl",kernelFunc:X4};function Y4(r){let{inputs:t,backend:e,attrs:o}=r,{dy:n,filter:s}=t,{pad:i,strides:l,inputShape:u}=o,a=w.computeConv3DInfo(u,s.shape,l,1,i),c=new Ad(a);return e.runWebGLProgram(c,[n,s],"float32")}var ON={kernelName:Ta,backendName:"webgl",kernelFunc:Y4};var Z4=zr+`
  return cos(x);
`,Q4=`
  vec4 result = cos(x);
  bvec4 isNaN = isnan(x);
  ${Ir}
  return result;
`,J4=pt({opSnippet:Z4,packedOpSnippet:Q4}),BN={kernelName:Yo,backendName:"webgl",kernelFunc:J4};var tH=`
  float e2x = exp(-x);
  return (e2x + 1.0 / e2x) / 2.0;
`,eH=pt({opSnippet:tH}),LN={kernelName:Zo,backendName:"webgl",kernelFunc:eH};var Rd=class{constructor(t,e,o,n,s){this.variableNames=["Image","Boxes","BoxInd"],this.outputShape=[];let[i,l,u,a]=t,[c]=e,[p,m]=o;this.outputShape=[c,p,m,a];let d=n==="bilinear"?1:0,[f,h]=[`${l-1}.0`,`${u-1}.0`],[g,x,y]=p>1?[`${(l-1)/(p-1)}`,"(y2-y1) * height_ratio",`y1*${f} + float(y)*(height_scale)`]:["0.0","0.0",`0.5 * (y1+y2) * ${f}`],[C,I,v]=m>1?[`${(u-1)/(m-1)}`,"(x2-x1) * width_ratio",`x1*${h} + float(x)*(width_scale)`]:["0.0","0.0",`0.5 * (x1+x2) * ${h}`];this.userCode=`
      const float height_ratio = float(${g});
      const float width_ratio = float(${C});
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int y = coords[1];
        int x = coords[2];
        int d = coords[3];

        // get box vals
        float y1 = getBoxes(b,0);
        float x1 = getBoxes(b,1);
        float y2 = getBoxes(b,2);
        float x2 = getBoxes(b,3);

        // get image in batch index
        int bInd = round(getBoxInd(b));
        if(bInd < 0 || bInd >= ${i}) {
          return;
        }

        float height_scale = ${x};
        float width_scale = ${I};

        float in_y = ${y};
        if( in_y < 0.0 || in_y > ${f} ) {
          setOutput(float(${s}));
          return;
        }
        float in_x = ${v};
        if( in_x < 0.0 || in_x > ${h} ) {
          setOutput(float(${s}));
          return;
        }

        vec2 sourceFracIndexCR = vec2(in_x,in_y);
        if(${d} == 1) {
          // Compute the four integer indices.
          ivec2 sourceFloorCR = ivec2(sourceFracIndexCR);
          ivec2 sourceCeilCR = ivec2(ceil(sourceFracIndexCR));

          float topLeft = getImage(b, sourceFloorCR.y, sourceFloorCR.x, d);
          float bottomLeft = getImage(b, sourceCeilCR.y, sourceFloorCR.x, d);
          float topRight = getImage(b, sourceFloorCR.y, sourceCeilCR.x, d);
          float bottomRight = getImage(b, sourceCeilCR.y, sourceCeilCR.x, d);

          vec2 fracCR = sourceFracIndexCR - vec2(sourceFloorCR);

          float top = topLeft + (topRight - topLeft) * fracCR.x;
          float bottom = bottomLeft + (bottomRight - bottomLeft) * fracCR.x;
          float newValue = top + (bottom - top) * fracCR.y;
          setOutput(newValue);
        } else {
          // Compute the coordinators of nearest neighbor point.
          ivec2 sourceNearestCR = ivec2(floor(
            sourceFracIndexCR + vec2(0.5,0.5)));
          float newValue = getImage(b, sourceNearestCR.y, sourceNearestCR.x, d);
          setOutput(newValue);
        }
      }
    `}};var rH=r=>{let{inputs:t,backend:e,attrs:o}=r,{image:n,boxes:s,boxInd:i}=t,{cropSize:l,method:u,extrapolationValue:a}=o,c=new Rd(n.shape,s.shape,l,u,a);return e.runWebGLProgram(c,[n,s,i],"float32")},UN={kernelName:_a,backendName:"webgl",kernelFunc:rH};var Ri;(function(r){r.Prod="*",r.Sum="+"})(Ri||(Ri={}));var Ic=class{constructor(t,e,o,n){this.op=t,this.outputShape=e,this.variableNames=["x"],this.customUniforms=[{name:"index",type:"float"}];let s=this.outputShape.length,i=this.op===Ri.Prod?"1.0":"0.0",l=o?i:`getX(${GN(s,"coords",this.op)})`,u=this.outputShape[this.outputShape.length-1],a="",c="";o?(a=n?`end != ${u-1}`:"end != 0",c=n?"end + 1":"end - 1"):(a=n?`end + pow2 < ${u}`:"end >= pow2",c=n?"end + pow2":"end - pow2"),this.userCode=`
      void main() {
        ${kt(s)} coords = getOutputCoords();
        int end = ${VN(s,"coords",this.op)};
        float val = ${l};
        int pow2 = int(pow(2.0, index));
        if (${a}) {
          int idx = ${c};
          ${VN(s,"coords",this.op)} = idx;
          val ${this.op}= getX(${GN(s,"coords",this.op)});
        }
        setOutput(val);
      }
    `}};function GN(r,t,e){if(r===1)return`${t}`;if(r===2)return`${t}.x, ${t}.y`;if(r===3)return`${t}.x, ${t}.y, ${t}.z`;if(r===4)return`${t}.x, ${t}.y, ${t}.z, ${t}.w`;throw new Error(`Cumulative ${e} for rank ${r} is not yet supported`)}function VN(r,t,e){if(r===1)return`${t}`;if(r===2)return`${t}.y`;if(r===3)return`${t}.z`;if(r===4)return`${t}.w`;throw new Error(`Cumulative ${e} for rank ${r} is not yet supported`)}function Dd(r,t,e,o,n,s){let i=t.shape.length,l=w.getAxesPermutation([o],i),u=t;l!=null&&(u=te({inputs:{x:t},backend:e,attrs:{perm:l}}));let a=w.getInnerMostAxes(1,i)[0];if(a!==i-1)throw new Error(`WebGL cumprod shader expects an inner-most axis=${t.shape.length-1} but got axis=${o}`);let c=u.shape[a],p=fe({inputs:{x:u},backend:e});for(let m=0;m<=Math.ceil(Math.log2(c))-1;m++){let d=new Ic(r,u.shape,!1,s),f=[[m]],h=p;p=e.runWebGLProgram(d,[p],p.dtype,f),e.disposeIntermediateTensorInfo(h)}if(n){let m=new Ic(r,u.shape,n,s),d=p;p=e.runWebGLProgram(m,[p],p.dtype),e.disposeIntermediateTensorInfo(d)}if(l!=null){let m=w.getUndoAxesPermutation(l),d=te({inputs:{x:p},backend:e,attrs:{perm:m}});return e.disposeIntermediateTensorInfo(p),e.disposeIntermediateTensorInfo(u),d}return p}function oH(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s,exclusive:i,reverse:l}=o;return Dd(Ri.Prod,n,e,s,i,l)}var WN={kernelName:Qo,backendName:"webgl",kernelFunc:oH};function nH(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s,exclusive:i,reverse:l}=o;return Dd(Ri.Sum,n,e,s,i,l)}var zN={kernelName:Jo,backendName:"webgl",kernelFunc:nH};function sH(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,weights:s}=t,{size:i,binaryOutput:l}=o;if(n.shape.length===1){let u=e.readSync(n.dataId),a=e.readSync(s.dataId),c=qm(u,a,s.dtype,s.shape,i);return e.makeTensorInfo([i],s.dtype,c)}else if(n.shape.length===2){let u=e.bufferSync(n),a=e.bufferSync(s),c=AT(u,a,i,l);return e.makeTensorInfo(c.shape,s.dtype,c.values)}throw new Error(`Error in denseBincount: input must be at most rank 2, but got rank${n.shape.length}.`)}var HN={kernelName:pl,backendName:"webgl",kernelFunc:sH};var Fd=class{constructor(t,e,o){this.variableNames=["x"],this.outputShape=[],this.outputShape=t,this.blockSize=e,this.dataFormat=o,this.userCode=`
    void main() {
      ivec4 coords = getOutputCoords();
      int b = coords[0];
      int h = ${this.getHeightCoordString()};
      int w = ${this.getWidthCoordString()};
      int d = ${this.getDepthCoordString()};

      int in_h = h / ${e};
      int offset_h = imod(h, ${e});
      int in_w = w / ${e};
      int offset_w = imod(w, ${e});
      int offset_d = (offset_h * ${e} + offset_w) *
        ${this.getOutputDepthSize()};
      int in_d = d + offset_d;

      float result = ${this.getInputSamplingString()};
      setOutput(result);
    }
  `}getHeightCoordString(){return this.dataFormat==="NHWC"?"coords[1]":"coords[2]"}getWidthCoordString(){return this.dataFormat==="NHWC"?"coords[2]":"coords[3]"}getDepthCoordString(){return this.dataFormat==="NHWC"?"coords[3]":"coords[1]"}getOutputDepthSize(){return this.dataFormat==="NHWC"?this.outputShape[3]:this.outputShape[1]}getInputSamplingString(){return this.dataFormat==="NHWC"?"getX(b, in_h, in_w, in_d)":"getX(b, in_d, in_h, in_w)"}};function aH(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{blockSize:s,dataFormat:i}=o,l=n.shape[0],u=i==="NHWC"?n.shape[1]:n.shape[2],a=i==="NHWC"?n.shape[2]:n.shape[3],c=i==="NHWC"?n.shape[3]:n.shape[1],p=u*s,m=a*s,d=c/(s*s),f=i==="NHWC"?[l,p,m,d]:[l,d,p,m],h=new Fd(f,s,i);return e.runWebGLProgram(h,[n],n.dtype)}var KN={kernelName:tn,backendName:"webgl",kernelFunc:aH};var xu=class{constructor(t,e=!1,o=null,n=!1,s=!1){this.variableNames=["x","W"],this.customUniforms=[{name:"pads",type:"ivec2"},{name:"strides",type:"ivec2"},{name:"dilations",type:"ivec2"},{name:"inDims",type:"ivec2"}],this.outputShape=t.outShape,this.enableShapeUniforms=jt(this.outputShape.length);let i=t.filterHeight,l=t.filterWidth,u=t.outChannels/t.inChannels,a="",c="";o&&(n?a=`float activation(float a) {
          float b = getPreluActivationWeightsAtOutCoords();
          ${o}
        }`:s?a=`float activation(float a) {
          float b = getLeakyreluAlphaAtOutCoords();
          ${o}
        }`:a=`
          float activation(float x) {
            ${o}
          }
        `,c="result = activation(result);");let p=e?"result += getBiasAtOutCoords();":"";e&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights"),s&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
      ${a}

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        ivec2 xRCCorner = coords.yz * strides - pads;
        int d2 = coords.w;
        int d1 = d2 / ${u};
        int q = d2 - d1 * ${u};

        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // Convolve x(?, ?, d1) with w(:, :, d1, q) to get y(yR, yC, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        // TO DO(dsmilkov): Flatten the two for loops and vec4 the operations.
        for (int wR = 0; wR < ${i}; wR++) {
          int xR = xRCorner + wR * dilations[0];

          if (xR < 0 || xR >= inDims[0]) {
            continue;
          }

          for (int wC = 0; wC < ${l}; wC++) {
            int xC = xCCorner + wC * dilations[1];

            if (xC < 0 || xC >= inDims[1]) {
              continue;
            }

            float xVal = getX(batch, xR, xC, d1);
            float wVal = getW(wR, wC, d1, q);
            dotProd += xVal * wVal;
          }
        }

        float result = dotProd;
        ${p}
        ${c}
        setOutput(result);
      }
    `}};var bu=class{constructor(t,e=!1,o=null,n=!1,s=!1){this.variableNames=["x","W"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"pads",type:"ivec2"},{name:"strides",type:"ivec2"},{name:"dilations",type:"ivec2"},{name:"inDims",type:"ivec2"}],this.outputShape=t.outShape,this.enableShapeUniforms=jt(this.outputShape.length);let i=t.outChannels/t.inChannels,l=t.padInfo.left,u=t.strideWidth,a=t.dilationWidth,c=t.filterHeight,p=t.filterWidth,m=p,d=`
      int xR; int xC; int xCOffset;
      vec4 wTexel; vec4 previous; vec4 final;`;for(let x=0;x<p;x++)d+=`
          vec4 xTexelC${x*2};
          int xTexelC${x*2}Ready;
          vec4 xTexelC${x*2+1};
          int xTexelC${x*2+1}Ready;
          vec4 xC${x};`;d+=`
    for (int r = 0; r < ${c}; r++) {
      `;for(let x=0;x<p;x++)d+=`
          xTexelC${x*2} = vec4(0.0);
          xTexelC${x*2}Ready = 0;
          xTexelC${x*2+1} = vec4(0.0);
          xTexelC${x*2+1}Ready = 0;
          xC${x} = vec4(0.0);`;d+=`
        xR = xRCorner + r * dilations[0];
        if (xR >=0 && xR < inDims[0]) {
      `;for(let x=0;x<(m+1)/2;x++){let y=x*2;if(d+=`
          xC = xCCorner + ${y*a};
          `,u===1){if(y<p&&(l%2===1?(d+=`
                xCOffset = xC + 1;
                if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${y}Ready == 0) {
                  xTexelC${y} = getX(batch, xR, xCOffset, d1);

                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if (xCOffset + 1 >= inDims[1]) {
                    xTexelC${y}.zw = vec2(0.0);
                  }
                  xTexelC${y}Ready = 1;
                }
              `,a===1&&y>0?d+=`
                xC${y} = vec4(xTexelC${y-2}.zw, xTexelC${y}.xy);
                `:d+=`
                  xCOffset = xC + 1 - 2;

                  if (xCOffset >= 0 && xCOffset < inDims[1]) {
                    previous = getX(batch, xR, xCOffset, d1);

                    // Need to manually clear unused channels in case
                    // we're reading from recycled texture.
                    if (xCOffset + 1 >= inDims[1]) {
                      previous.zw = vec2(0.0);
                    }

                    xC${y} = vec4(previous.zw, xTexelC${y}.xy);
                  } else {
                    xC${y} = vec4(0.0, 0.0, xTexelC${y}.xy);
                  }
                  `):d+=`
                if (xC >= 0 && xC < inDims[1] && xTexelC${y}Ready == 0) {
                  xTexelC${y} = getX(batch, xR, xC, d1);
                  if (xC + 1 >= inDims[1]) {
                    xTexelC${y}.zw = vec2(0.0);
                  }
                  xTexelC${y}Ready = 1;
                }

                xC${y} = xTexelC${y};
                `,y+1<p)){let C=l%2===0?b.nearestLargerEven(a):a;a%2===0&&l%2===1||a%2!==0&&l%2!==1?(d+=`
                  xCOffset = xC + imod(pads[1], 2) + ${C};

                  if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${y+1}Ready == 0) {
                    xTexelC${y+1} = getX(batch, xR, xCOffset, d1);

                    // Need to manually clear unused channels in case
                    // we're reading from recycled texture.
                    if (xCOffset + 1 >= inDims[1]) {
                      xTexelC${y+1}.zw = vec2(0.0);
                    }
                    xTexelC${y+1}Ready = 1;
                  }
                  `,a>1?d+=`
                    xCOffset -= 2;
                    if (xCOffset >= 0 && xCOffset < inDims[1]) {
                     previous = getX(batch, xR, xCOffset, d1);
                     xC${y+1} = vec4(previous.zw, xTexelC${y+1}.xy);
                    } else {
                     xC${y+1} = vec4(0.0, 0.0, xTexelC${y+1}.xy);
                    }
                    `:d+=`
                    xC${y+1} = vec4(xTexelC${y}.zw, xTexelC${y+1}.xy);
                    `):C===1?d+=`
                    xC${y+1} = xTexelC${y};
                    `:d+=`
                    xCOffset = xC + ${C};

                    if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${y+1}Ready == 0) {
                      xTexelC${y+1} = getX(batch, xR, xCOffset, d1);
                      if (xCOffset + 1 >= inDims[1]) {
                        xTexelC${y+1}.zw = vec2(0.0);
                      }
                      xTexelC${y+1}Ready = 1;
                    }

                    xC${y+1} = xTexelC${y+1};
                    `}}else y<p&&(l%2===1?(d+=`
                xCOffset = xC + 1 - strides[1];
                if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${y}Ready == 0) {
                  xTexelC${y} = getX(batch, xR, xCOffset, d1);
                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if (xCOffset + 1 >= inDims[1]) {
                    xTexelC${y}.zw = vec2(0.0);
                  }
                  xTexelC${y}Ready = 1;
                }

                if(xC + 1 >= 0 && xC + 1 < inDims[1] && xTexelC${y+1}Ready == 0) {
                  xTexelC${y+1} = getX(batch, xR, xC + 1, d1);
                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if (xC + 2 >= inDims[1]) {
                    xTexelC${y+1}.zw = vec2(0.0);
                  }
                  xTexelC${y+1}Ready = 1;
                }

                xC${y} = vec4(xTexelC${y}.zw, xTexelC${y+1}.zw);
              `,y+1<p&&(d+=`
                  final = vec4(0.0);
                  xCOffset = xC + 1 + strides[1];
                  if(xCOffset >= 0 && xCOffset < inDims[1]) {
                    final = getX(batch, xR, xCOffset, d1);
                  }
                  xC${y+1} = vec4(xTexelC${y+1}.xy, final.xy);
                `)):(d+=`
                if(xC >= 0 && xC < inDims[1] && xTexelC${y}Ready == 0) {
                  xTexelC${y} = getX(batch, xR, xC, d1);
                  if (xC + 1 >= inDims[1]) {
                    xTexelC${y}.zw = vec2(0.0);
                  }
                  xTexelC${y}Ready = 1;
                }

                xCOffset = xC + strides[1];
                if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${y+1}Ready == 0) {
                  xTexelC${y+1} = getX(batch, xR, xCOffset, d1);
                  if (xCOffset + 1 >= inDims[1]) {
                    xTexelC${y+1}.zw = vec2(0.);
                  }
                  xTexelC${y+1}Ready = 1;
                }

                xC${y} = vec4(
                  xTexelC${y}.xy, xTexelC${y+1}.xy);
              `,y+1<p&&(d+=`
                  xC${y+1} = vec4(xTexelC${y}.zw, xTexelC${y+1}.zw);
                `)));y<p&&(d+=`
            wTexel = getW(r, ${y}, d1, q);
            dotProd += xC${y} * vec4(wTexel.xz, wTexel.xz);
          `,y+1<p&&(d+=`
              wTexel = getW(r, ${y+1}, d1, q);
              dotProd += xC${y+1} * vec4(wTexel.xz, wTexel.xz);
            `))}d+=`
    }
  `,d+=`
      }
    `;let f="",h="";o&&(n?f=`vec4 activation(vec4 a) {
          vec4 b = getPreluActivationWeightsAtOutCoords();
          ${o}
        }`:s?f=`vec4 activation(vec4 a) {
          vec4 b = getLeakyreluAlphaAtOutCoords();
          ${o}
        }`:f=`vec4 activation(vec4 x) {
          ${o}
        }`,h="result = activation(result);");let g=e?"result += getBiasAtOutCoords();":"";e&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights"),s&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
      ${f}

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        ivec2 xRCCorner = coords.yz * strides - pads;
        int d2 = coords.w;
        int d1 = d2 / ${i};
        int q = d2 - d1 * ${i};
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        //intialize dotProd with a small epsilon seems to reduce GPU accuracy loss.
        vec4 dotProd = vec4(0.000000000000001);

        ${d}

        vec4 result = dotProd - vec4(0.000000000000001);
        ${g}
        ${h}
        setOutput(result);
      }
    `}};function iH(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,filter:s}=t,{strides:i,pad:l,dilations:u,dimRoundingMode:a}=o,c=u;c==null&&(c=[1,1]),b.assert(w.eitherStridesOrDilationsAreOne(i,c),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${i} and dilations '${c}'`);let p=w.computeConv2DInfo(n.shape,s.shape,i,c,l,a,!0),m;$().getBool("WEBGL_PACK_DEPTHWISECONV")&&p.strideWidth<=2&&p.outChannels/p.inChannels===1?m=new bu(p):m=new xu(p);let d=[[p.padInfo.top,p.padInfo.left],[p.strideHeight,p.strideWidth],[p.dilationHeight,p.dilationWidth],[p.inHeight,p.inWidth]];return e.runWebGLProgram(m,[n,s],"float32",d)}var qN={kernelName:en,backendName:"webgl",kernelFunc:iH};var $d=class{constructor(t){this.variableNames=["x","dy"],this.outputShape=t.filterShape;let e=t.strideHeight,o=t.strideWidth,n=t.padInfo.top,s=t.padInfo.left,i=t.outChannels/t.inChannels;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int wR = coords.x;
        int wC = coords.y;
        int d1 = coords.z;
        int dm = coords.w;
        int d2 = d1 * ${i} + dm;

        float dotProd = 0.0;

        // TO DO: Vec4 over the batch size
        for (int b = 0; b < ${t.batchSize}; b++) {
          for (int yR = 0; yR < ${t.outHeight}; yR++) {
            int xR = wR + yR * ${e} - ${n};

            if (xR < 0 || xR >= ${t.inHeight}) {
              continue;
            }

            for (int yC = 0; yC < ${t.outWidth}; yC++) {
              int xC = wC + yC * ${o} - ${s};

              if (xC < 0 || xC >= ${t.inWidth}) {
                continue;
              }

              float dyValue = getDy(b, yR, yC, d2);
              float xValue = getX(b, xR, xC, d1);
              dotProd += (xValue * dyValue);
            }
          }
        }
        setOutput(dotProd);
      }
    `}},Md=class{constructor(t){this.variableNames=["dy","W"],this.outputShape=t.inShape;let e=t.filterHeight,o=t.filterWidth,n=t.strideHeight,s=t.strideWidth,i=e-1-t.padInfo.top,l=o-1-t.padInfo.left,u=t.outChannels/t.inChannels;this.userCode=`
      const ivec2 pads = ivec2(${i}, ${l});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[3];
        ivec2 dyCorner = coords.yz - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        float dotProd = 0.0;

        for (int wR = 0; wR < ${e}; wR++) {
          float dyR = float(dyRCorner + wR) / ${n}.0;

          if (dyR < 0.0 || dyR >= ${t.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          int wRPerm = ${e} - 1 - wR;

          for (int wC = 0; wC < ${o}; wC++) {
            float dyC = float(dyCCorner + wC) / ${s}.0;

            if (dyC < 0.0 || dyC >= ${t.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            int wCPerm = ${o} - 1 - wC;

            // TO DO: Vec4 over the channelMul
            for (int dm = 0; dm < ${u}; dm++) {
              int d2 = d1 * ${u} + dm;
              float xValue = getDy(batch, idyR, idyC, d2);
              float wValue = getW(wRPerm, wCPerm, d1, dm);
              dotProd += xValue * wValue;
            }
          }
        }
        setOutput(dotProd);
      }
    `}};function lH(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,dy:s}=t,{strides:i,dilations:l,pad:u,dimRoundingMode:a,filterShape:c}=o,p=w.computeConv2DInfo(n.shape,c,i,l,u,a,!0),m=new $d(p);return e.runWebGLProgram(m,[n,s],"float32")}var jN={kernelName:Ip,backendName:"webgl",kernelFunc:lH};function uH(r){let{inputs:t,backend:e,attrs:o}=r,{dy:n,filter:s}=t,{strides:i,dilations:l,pad:u,dimRoundingMode:a,inputShape:c}=o,p=w.computeConv2DInfo(c,s.shape,i,l,u,a,!0),m=new Md(p);return e.runWebGLProgram(m,[n,s],"float32")}var XN={kernelName:wp,backendName:"webgl",kernelFunc:uH};var Pd=class{constructor(t){this.variableNames=["X"],this.outputShape=[t,t],this.userCode=`
      void main() {
          ivec2 coords = getOutputCoords();
          float val = coords[0] == coords[1] ? getX(coords[0]) : 0.0;
          setOutput(val);
      }
    `}};function cH(r){let{inputs:t,backend:e}=r,{x:o}=t,n=[...o.shape,...o.shape],s=b.sizeFromShape(o.shape),i=Z({inputs:{x:o},backend:e,attrs:{shape:[s]}}),l=new Pd(s),u=e.runWebGLProgram(l,[i],i.dtype),a=Z({inputs:{x:u},backend:e,attrs:{shape:n}});return e.disposeIntermediateTensorInfo(i),e.disposeIntermediateTensorInfo(u),a}var YN={kernelName:ml,backendName:"webgl",kernelFunc:cH};var Od=class{constructor(t){this.variableNames=["x","W"],this.outputShape=t.outShape;let{inHeight:e,inWidth:o,padInfo:n,strideHeight:s,strideWidth:i,filterHeight:l,filterWidth:u,dilationHeight:a,dilationWidth:c}=t,{top:p,left:m}=n;this.userCode=`
      const ivec2 strides = ivec2(${s}, ${i});
      const ivec2 pads = ivec2(${p}, ${m});
      const float neg_infinity = -3.4e38;

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        int d1 = coords.w;
        ivec2 outTopLeftCorner =
            coords.yz * strides - pads;
        int hBeg = outTopLeftCorner.x;
        int wBeg = outTopLeftCorner.y;

        float curVal = neg_infinity;
        for (int h = 0; h < ${l}; h++) {
          int hIn = hBeg + h * ${a};

          if (hIn >= 0 && hIn < ${e}) {
            for (int w = 0; w < ${u}; w++) {
              int wIn = wBeg + w * ${c};

              if (wIn >= 0 && wIn < ${o}) {
                float xVal = getX(batch, hIn, wIn, d1);
                float wVal = getW(h, w, d1);

                float val = xVal + wVal;
                if (val > curVal) {
                  curVal = val;
                }
              }
            }
          }
        }

        float result = curVal;
        setOutput(result);
      }
    `}};function pH(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,filter:s}=t,{strides:i,pad:l,dilations:u}=o,a=w.computeDilation2DInfo(n.shape,s.shape,i,l,"NHWC",u),c,p=new Od(a);c=e.runWebGLProgram(p,[n,s],"float32");let m=Z({inputs:{x:c},backend:e,attrs:{shape:a.outShape}});return e.disposeIntermediateTensorInfo(c),m}var ZN={kernelName:rn,backendName:"webgl",kernelFunc:pH};function mH(r){let{inputs:t,backend:e,attrs:o}=r,{equation:n}=o,s=t,{allDims:i,summedDims:l,idDims:u}=w.decodeEinsumEquation(n,s.length);w.checkEinsumDimSizes(i.length,u,s);let{path:a,steps:c}=w.getEinsumComputePath(l,u),p=c.length,m=null,d=i.length,f=[];for(let h=0;h<p;++h){for(let g of c[h]){let{permutationIndices:x,expandDims:y}=w.getEinsumPermutation(d,u[g]),C;w.isIdentityPermutation(x)?C=s[g]:(C=te({inputs:{x:s[g]},backend:e,attrs:{perm:x}}),f.push(C));let I=C.shape.slice();for(let v=0;v<y.length;++v)I.splice(y[v],0,1);b.arraysEqual(C.shape,I)||(C=Z({inputs:{x:C},backend:e,attrs:{shape:I}}),f.push(C)),m===null?m=C:(m=yc({inputs:{a:C,b:m},backend:e}),f.push(m))}h<p-1&&(a[h]>=0&&(m=Ni({inputs:{x:m},backend:e,attrs:{axis:a[h]-(i.length-d),keepDims:!1}}),f.push(m)),d--)}for(let h of f)h!==m&&e.disposeIntermediateTensorInfo(h);return m}var QN={kernelName:vp,backendName:"webgl",kernelFunc:mH};var dH="return (x >= 0.0) ? x : (exp(x) - 1.0);",fH=`
  vec4 result;

  result.r = (x.r >= 0.0) ? x.r : (exp(x.r) - 1.0);
  result.g = (x.g >= 0.0) ? x.g : (exp(x.g) - 1.0);
  result.b = (x.b >= 0.0) ? x.b : (exp(x.b) - 1.0);
  result.a = (x.a >= 0.0) ? x.a : (exp(x.a) - 1.0);

  return result;
`,hH=pt({opSnippet:dH,packedOpSnippet:fH}),JN={kernelName:nn,backendName:"webgl",kernelFunc:hH};var gH="return (b >= 0.0) ? a : a * (b + 1.0);",xH=`
  vec4 bGTEZero = vec4(greaterThanEqual(b, vec4(0.)));
  return (bGTEZero * a) + ((vec4(1.0) - bGTEZero) * (a * (b + vec4(1.0))));
`,bH=r=>{let{inputs:t,backend:e}=r,{dy:o,y:n}=t,s=$().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new Cr(xH,o.shape,n.shape):new sr(gH,o.shape,n.shape);return e.runWebGLProgram(s,[o,n],o.dtype)},t2={kernelName:Na,backendName:"webgl",kernelFunc:bH};var yH=`
  return vec4(equal(a, b));
`,CH="return float(a == b);",IH=Ht({opSnippet:CH,packedOpSnippet:yH,dtype:"bool",cpuKernelImpl:$T}),e2={kernelName:an,backendName:"webgl",kernelFunc:IH};var wH=`
  // Error function is calculated approximately with elementary function.
  // See "Handbook of Mathematical Functions with Formulas,
  // Graphs, and Mathematical Tables", Abramowitz and Stegun.
  float p = ${w.ERF_P};
  float a1 = ${w.ERF_A1};
  float a2 = ${w.ERF_A2};
  float a3 = ${w.ERF_A3};
  float a4 = ${w.ERF_A4};
  float a5 = ${w.ERF_A5};

  float sign = sign(x);
  x = abs(x);
  float t = 1.0 / (1.0 + p * x);
  return sign * (1.0 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*exp(-x*x));
`,vH=pt({opSnippet:wH}),r2={kernelName:sn,backendName:"webgl",kernelFunc:vH};var SH=zr+`
  return exp(x);
`,kH=`
  vec4 result = exp(x);
  bvec4 isNaN = isnan(x);
  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,hC=pt({opSnippet:SH,packedOpSnippet:kH,cpuKernelImpl:MT,dtype:"float32"}),o2={kernelName:ln,backendName:"webgl",kernelFunc:hC};function Bd(r){let{inputs:t,attrs:e,backend:o}=r,{dim:n}=e,{input:s}=t,i=s.shape.length,l=s.shape.slice(),u=n;return n<0&&(b.assert(-(i+1)<=n,()=>`Axis must be in the interval [${-(i+1)}, ${i}]`),u=i+n+1),l.splice(u,0,1),Z({inputs:{x:s},backend:o,attrs:{shape:l}})}var n2={kernelName:Ps,backendName:"webgl",kernelFunc:Bd};var s2="return exp(x) - 1.0;",TH=pt({opSnippet:s2,packedOpSnippet:s2,cpuKernelImpl:PT}),a2={kernelName:un,backendName:"webgl",kernelFunc:TH};var wc=class{constructor(t,e,o){this.variableNames=["real","imag"];let n=e[1];this.outputShape=e;let s=o?`2.0 * ${Math.PI}`:`-2.0 * ${Math.PI}`,i=o?`${n}.0`:"1.0",l;if(t==="real")l="return real * expR - imag * expI;";else if(t==="imag")l="return real * expI + imag * expR;";else throw new Error(`FFT component must be either "real" or "imag", got ${t}.`);this.userCode=`
      const float exponentMultiplier = ${s};

      float unaryOpComplex(float real, float expR, float imag, float expI) {
        ${l}
      }

      float mulMatDFT(int batch, int index) {
        float indexRatio = float(index) / float(${n});
        float exponentMultiplierTimesIndexRatio =
            exponentMultiplier * indexRatio;

        float result = 0.0;

        for (int i = 0; i < ${n}; i++) {
          // x = (-2|2 * PI / N) * index * i;
          float x = exponentMultiplierTimesIndexRatio * float(i);
          float expR = cos(x);
          float expI = sin(x);
          float real = getReal(batch, i);
          float imag = getImag(batch, i);

          result +=
              unaryOpComplex(real, expR, imag, expI) / ${i};
        }

        return result;
      }

      void main() {
        ivec2 coords = getOutputCoords();
        setOutput(mulMatDFT(coords[0], coords[1]));
      }
    `}};function Ld(r,t,e){let o=e.texData.get(r.dataId),n=b.sizeFromShape(r.shape),s=r.shape[r.shape.length-1],i=n/s,l=Z({inputs:{x:r},backend:e,attrs:{shape:[i,s]}}),u=l.shape,a=new wc("real",u,t),c=new wc("imag",u,t),p=[{dataId:o.complexTensorInfos.real.dataId,dtype:o.complexTensorInfos.real.dtype,shape:u},{dataId:o.complexTensorInfos.imag.dataId,dtype:o.complexTensorInfos.imag.dtype,shape:u}],m=e.runWebGLProgram(a,p,"float32"),d=e.runWebGLProgram(c,p,"float32"),f=ar({inputs:{real:m,imag:d},backend:e});e.disposeIntermediateTensorInfo(m),e.disposeIntermediateTensorInfo(d);let h=Z({inputs:{x:f},backend:e,attrs:{shape:r.shape}});return e.disposeIntermediateTensorInfo(l),e.disposeIntermediateTensorInfo(f),h}function _H(r){let{inputs:t,backend:e}=r,{input:o}=t;return Ld(o,!1,e)}var i2={kernelName:hl,backendName:"webgl",kernelFunc:_H};var Ud=class{constructor(t,e){this.outputShape=[],this.customUniforms=[{name:"value",type:"float"}],this.variableNames=["x"],this.outputShape=t,this.userCode=`
      void main() {
        // Input can be obtained from uniform value.
        setOutput(value);
      }
    `}};function vs(r){let{backend:t,attrs:e}=r,{shape:o,value:n}=e,{dtype:s}=e;if(s=s||b.inferDtype(n),s==="string"){let i=b.getArrayFromDType(s,b.sizeFromShape(o));return i.fill(n),t.makeTensorInfo(o,s,i)}else{let i=new Ud(o,n),l=[[n]];return t.runWebGLProgram(i,[],s,l)}}var l2={kernelName:Os,backendName:"webgl",kernelFunc:vs};var Gd=class{constructor(t){this.variableNames=["Image"],this.outputShape=[];let e=t[2];this.outputShape=t,this.userCode=`
        void main() {
          ivec4 coords = getOutputCoords();
          int x = coords[2];

          int coordX = ${e} - x - 1;
          float outputValue;
          if(coordX >= 0 && coordX < ${e}) {
            outputValue = getImage(coords[0], coords[1], coordX, coords[3]);
          } else {
            outputValue = getImage(coords[0], coords[1], coords[2], coords[3]);
          }
          setOutput(outputValue);
        }
    `}};var u2={kernelName:Aa,backendName:"webgl",kernelFunc:({inputs:r,backend:t})=>{let{image:e}=r,o=t,n=new Gd(e.shape);return o.runWebGLProgram(n,[e],e.dtype)}};var c2="return floor(x);",NH=pt({opSnippet:c2,packedOpSnippet:c2,cpuKernelImpl:OT}),p2={kernelName:cn,backendName:"webgl",kernelFunc:NH};var AH=`
  float s = sign(a) * sign(b);
  int ia = round(a);
  int ib = round(b);
  if (ib != 0) {
    // Windows (D3D) wants guaranteed non-zero int division at compile-time.
    return float(idiv(ia, ib, s));
  } else {
    return NAN;
  }
`,EH=`
  ivec4 ia = round(a);
  ivec4 ib = round(b);
  bvec4 cond = notEqual(ib, ivec4(0));
  ivec4 result = ivec4(0);
  vec4 s = sign(a) * sign(b);

  // Windows (D3D) wants guaranteed non-zero int division at compile-time.
  if (cond[0]) {
    result[0] = idiv(ia[0], ib[0], s[0]);
  }
  if (cond[1]) {
    result[1] = idiv(ia[1], ib[1], s[1]);
  }
  if (cond[2]) {
    result[2] = idiv(ia[2], ib[2], s[2]);
  }
  if (cond[3]) {
    result[3] = idiv(ia[3], ib[3], s[3]);
  }
  return vec4(result);
`,RH=Ht({opSnippet:AH,packedOpSnippet:EH,dtype:"int32"}),m2={kernelName:pn,backendName:"webgl",kernelFunc:RH};var Vd=class{constructor(t){this.variableNames=["A"];let e=se(),[o,n]=t;this.outputShape=t,this.userCode=`
      void main() {
        ivec3 coords = getOutputCoords();
        int texR = coords[0];
        int texC = coords[1];
        int depth = coords[2];
        vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${n}.0, ${o}.0);

        vec4 values = ${e.texture2D}(A, uv);
        float value;
        if (depth == 0) {
          value = values.r;
        } else if (depth == 1) {
          value = values.g;
        } else if (depth == 2) {
          value = values.b;
        } else if (depth == 3) {
          value = values.a;
        }

        setOutput(floor(value * 255.0 + 0.5));
      }
    `}};var Wd=class{constructor(t){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0;let e=se(),[o,n]=t;this.outputShape=t,this.userCode=`
      void main() {
        ivec3 coords = getOutputCoords();
        int texR = coords[0];
        int texC = coords[1];
        int depth = coords[2];

        vec4 result = vec4(0.);

        for(int row=0; row<=1; row++) {
          for(int col=0; col<=1; col++) {
            texC = coords[1] + row;
            depth = coords[2] + col;

            vec2 uv = (vec2(texC, texR) + halfCR) /
                       vec2(${n}.0, ${o}.0);
            vec4 values = ${e.texture2D}(A, uv);
            float value;
            if (depth == 0) {
              value = values.r;
            } else if (depth == 1) {
              value = values.g;
            } else if (depth == 2) {
              value = values.b;
            } else if (depth == 3) {
              value = values.a;
            }

            result[row * 2 + col] = floor(value * 255.0 + 0.5);
          }
        }

        ${e.output} = result;
      }
    `}};var d2={kernelName:RI,backendName:"webgl",kernelFunc:DH},yu,gC=$().getBool("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU");function DH(r){let{inputs:t,backend:e,attrs:o}=r,{pixels:n}=t,{numChannels:s}=o,i=typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement,l=typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement,[u,a]=i?[n.videoWidth,n.videoHeight]:[n.width,n.height],c=[a,u],p=[a,u,s];if(l||i){let h=$().getBool("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU");(yu==null||h!==gC)&&(gC=h,yu=document.createElement("canvas").getContext("2d",{willReadFrequently:gC})),yu.canvas.width=u,yu.canvas.height=a,yu.drawImage(n,0,0,u,a),n=yu.canvas}let m=e.makeTensorInfo(c,"int32");e.texData.get(m.dataId).usage=Ue.PIXELS,e.gpgpu.uploadPixelDataToTexture(e.getTexture(m.dataId),n);let d=$().getBool("WEBGL_PACK")?new Wd(p):new Vd(p),f=e.runWebGLProgram(d,[m],"int32");return e.disposeData(m.dataId),f}function FH(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,filter:s,bias:i,preluActivationWeights:l}=t,{strides:u,pad:a,dataFormat:c,dilations:p,dimRoundingMode:m,activation:d,leakyreluAlpha:f}=o,h=w.convertConv2DDataFormat(c),g=w.computeConv2DInfo(n.shape,s.shape,u,p,a,m,!1,h),x,y=[],C=i!=null,I=l!=null,v=d==="leakyrelu",S=()=>{let A=[n,s],D=(F,M)=>{if(M==="NCHW"&&F.shape.length===1&&F.shape[0]!==1){let B=Z({inputs:{x:F},backend:e,attrs:{shape:[F.shape[0],1,1]}});return y.push(B),B}return F};if(C&&A.push(D(i,c)),I&&A.push(D(l,c)),v){let F=e.makeTensorInfo([],"float32",b.createScalarValue(f,"float32"));A.push(F),y.push(F)}return A};if(g.filterHeight===1&&g.filterWidth===1&&g.dilationHeight===1&&g.dilationWidth===1&&g.strideHeight===1&&g.strideWidth===1&&(g.padInfo.type==="SAME"||g.padInfo.type==="VALID"))x=Sd({x:n,filter:s,convInfo:g,backend:e,bias:i,activation:d,preluActivationWeights:l,leakyreluAlpha:f});else if(g.strideWidth<=2&&h==="channelsLast"&&$().getBool("WEBGL_EXP_CONV")){let A=d?Is(d,!0):null,D=new gu(g,C,A,I,v),F=[[g.padInfo.top,g.padInfo.left],[g.strideHeight,g.strideWidth],[g.dilationHeight,g.dilationWidth],[g.inHeight,g.inWidth]],M=S();x=e.runWebGLProgram(D,M,"float32",F)}else if($().getBool("WEBGL_CONV_IM2COL"))x=kd({x:n,filter:s,convInfo:g,backend:e,bias:i,activation:d,preluActivationWeights:l,leakyreluAlpha:f});else{let A=d?Is(d,!1):null,D=new hu(g,C,A,I,v),F=S();x=e.runWebGLProgram(D,F,"float32")}let k=Z({inputs:{x},backend:e,attrs:{shape:g.outShape}});return y.push(x),y.forEach(A=>e.disposeIntermediateTensorInfo(A)),k}var f2={kernelName:qa,backendName:"webgl",kernelFunc:FH};function $H(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,filter:s,bias:i,preluActivationWeights:l}=t,{strides:u,pad:a,dilations:c,dimRoundingMode:p,activation:m,leakyreluAlpha:d}=o,f=[],h=c;h==null&&(h=[1,1]),b.assert(w.eitherStridesOrDilationsAreOne(u,h),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${u} and dilations '${h}'`);let g=w.computeConv2DInfo(n.shape,s.shape,u,h,a,p,!0),x=$().getBool("WEBGL_PACK_DEPTHWISECONV")&&g.strideWidth<=2&&g.outChannels/g.inChannels===1,y=m?Is(m,x):null,C=[n,s],I=i!=null,v=l!=null,S=m==="leakyrelu";if(I&&C.push(i),v&&C.push(l),S){let F=e.makeTensorInfo([],"float32",b.createScalarValue(d,"float32"));C.push(F),f.push(F)}let k;x?k=new bu(g,I,y,v,S):k=new xu(g,I,y,v,S);let A=[[g.padInfo.top,g.padInfo.left],[g.strideHeight,g.strideWidth],[g.dilationHeight,g.dilationWidth],[g.inHeight,g.inWidth]],D=e.runWebGLProgram(k,C,"float32",A);return f.forEach(F=>e.disposeIntermediateTensorInfo(F)),D}var h2={kernelName:ja,backendName:"webgl",kernelFunc:$H};var zd=class{constructor(t,e,o,n){this.sliceDim=t,this.strides=e,this.paramsShape=n,this.variableNames=["x","indices"],this.outputShape=o;let s=kt(o.length),i=`
    int index;`;for(let l=0;l<this.sliceDim;l++)i+=`
          index = round(getIndices(coords[0], ${l}));
          out_of_bounds = out_of_bounds || index < 0;
          out_of_bounds = out_of_bounds || index >= ${this.paramsShape[l]};
          flattenIndex += index * ${this.strides[l]};`;this.userCode=`
         void main() {
          ${s} coords = getOutputCoords();
          int flattenIndex = 0;
          bool out_of_bounds = false;

          ${i}

          setOutput(out_of_bounds ? 0.0 : getX(flattenIndex, coords[1]));
        }
      `}};function MH(r){let{inputs:t,backend:e}=r,{params:o,indices:n}=t,s=n.shape,i=s[s.length-1],l=b.sizeFromShape(o.shape),[u,a,c,p]=w.prepareAndValidate(o,n),m=Z({inputs:{x:n},backend:e,attrs:{shape:[a,i]}}),d=Z({inputs:{x:o},backend:e,attrs:{shape:[b.sizeFromShape(o.shape)/c,c]}});if(e.shouldExecuteOnCPU([o,n])||o.dtype==="string"){let x=e.readSync(n.dataId),y=e.bufferSync(o),C=BT(x,y,o.dtype,a,i,c,p,o.shape,l);return e.makeTensorInfo(u,o.dtype,C.values)}let f=new zd(i,p,[a,c],o.shape),h=e.runWebGLProgram(f,[d,m],d.dtype),g=Z({inputs:{x:h},backend:e,attrs:{shape:u}});return e.disposeIntermediateTensorInfo(m),e.disposeIntermediateTensorInfo(d),e.disposeIntermediateTensorInfo(h),g}var g2={kernelName:Ea,backendName:"webgl",kernelFunc:MH};var Hd=class{constructor(t,e){this.variableNames=["A","indices"],this.outputShape=e,this.rank=e.length;let o=kt(this.rank),n=PH(t,2);this.userCode=`
      void main() {
        ${o} resRC = getOutputCoords();
        int index = int(getIndices(resRC.x, resRC.z));
        float inBounds = (index >= 0) && (index < ${t[2]}) ? 1.0 : 0.0;
        setOutput(inBounds * getA(${n}));
      }
    `}};function PH(r,t){let e=["resRC.x","resRC.y","resRC.z","resRC.w"],o=[];for(let n=0;n<r.length;n++)n===2?o.push("index"):o.push(`${e[n]}`);return o.join()}function xC(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,indices:s}=t,{axis:i,batchDims:l}=o,u=b.parseAxisParam(i,n.shape)[0];if($().get("DEBUG")){let y=e.readSync(s.dataId),C=n.shape[u];for(let I=0;I<y.length;++I){let v=y[I];b.assert(v<=C-1&&v>=0,()=>`GatherV2: the index value ${v} is not in [0, ${C-1}]`)}}let a=w.segment_util.collectGatherOpShapeInfo(n,s,u,l),c=b.sizeFromShape(s.shape),p=[],m=Z({inputs:{x:n},backend:e,attrs:{shape:[a.batchSize,a.outerSize,a.dimSize,a.sliceSize]}}),d=Z({inputs:{x:s},backend:e,attrs:{shape:[a.batchSize,c/a.batchSize]}});p.push(m),p.push(d);let f=[a.batchSize,a.outerSize,c/a.batchSize,a.sliceSize];if(e.shouldExecuteOnCPU([n,s])||n.dtype==="string"){let y=e.bufferSync(d),C=e.bufferSync(m),I=LT(C,y,f);return p.forEach(v=>e.disposeIntermediateTensorInfo(v)),e.makeTensorInfo(a.outputShape,I.dtype,I.values)}let h=new Hd(m.shape,f),g=e.runWebGLProgram(h,[m,d],m.dtype);p.push(g);let x=Z({inputs:{x:g},backend:e,attrs:{shape:a.outputShape}});return p.forEach(y=>e.disposeIntermediateTensorInfo(y)),x}var x2={kernelName:Bs,backendName:"webgl",kernelFunc:xC};var OH="return float(a > b);",BH=`
  return vec4(greaterThan(a, b));
`,LH=Ht({opSnippet:OH,packedOpSnippet:BH,cpuKernelImpl:UT,dtype:"bool"}),b2={kernelName:dn,backendName:"webgl",kernelFunc:LH};var UH="return float(a >= b);",GH=`
  return vec4(greaterThanEqual(a, b));
`,VH=Ht({opSnippet:UH,packedOpSnippet:GH,dtype:"bool",cpuKernelImpl:GT}),y2={kernelName:fn,backendName:"webgl",kernelFunc:VH};function WH(r){let{inputs:t,backend:e}=r,{input:o}=t;return Ld(o,!0,e)}var C2={kernelName:gl,backendName:"webgl",kernelFunc:WH};var zH="return float(!isnan(x) && !isinf(x));",HH=pt({opSnippet:zH,dtype:"bool"}),I2={kernelName:hn,backendName:"webgl",kernelFunc:HH};var KH="return float(isinf(x));",qH=pt({opSnippet:KH,dtype:"bool"}),w2={kernelName:gn,backendName:"webgl",kernelFunc:qH};var jH="return float(isnan(x));",XH=pt({opSnippet:jH,dtype:"bool"}),v2={kernelName:xn,backendName:"webgl",kernelFunc:XH};var YH="return float(a < b);",ZH=`
  return vec4(lessThan(a, b));
`,QH=Ht({opSnippet:YH,packedOpSnippet:ZH,cpuKernelImpl:VT,dtype:"bool"}),S2={kernelName:yn,backendName:"webgl",kernelFunc:QH};var JH="return float(a <= b);",tK=`
  return vec4(lessThanEqual(a, b));
`,eK=Ht({opSnippet:JH,packedOpSnippet:tK,cpuKernelImpl:WT,dtype:"bool"}),k2={kernelName:Cn,backendName:"webgl",kernelFunc:eK};function rK(r){let{backend:t,attrs:e}=r,{start:o,stop:n,num:s}=e,i=zT(o,n,s);return t.makeTensorInfo([i.length],"float32",i)}var T2={kernelName:Ra,backendName:"webgl",kernelFunc:rK};var oK=zr+`
  return x < 0.0 ? 0./0. : log(x);
`,nK=`
  vec4 result = log(x);
  bvec4 isNaN = isnan(x);
  result.r = isNaN.r ? x.r : (x.r < 0.0 ? 0./0. : result.r);
  result.g = isNaN.g ? x.g : (x.g < 0.0 ? 0./0. : result.g);
  result.b = isNaN.b ? x.b : (x.b < 0.0 ? 0./0. : result.b);
  result.a = isNaN.a ? x.a : (x.a < 0.0 ? 0./0. : result.a);
  return result;
`,sK=pt({opSnippet:oK,packedOpSnippet:nK,cpuKernelImpl:HT}),_2={kernelName:In,backendName:"webgl",kernelFunc:sK};var aK=zr+`
  return log(1.0 + x);
`,iK=pt({opSnippet:aK}),N2={kernelName:wn,backendName:"webgl",kernelFunc:iK};var lK="return float(a >= 1.0 && b >= 1.0);",uK=`
  return vec4(
    vec4(greaterThanEqual(a, vec4(1.0))) *
    vec4(greaterThanEqual(b, vec4(1.0))));
`,cK=Ht({opSnippet:lK,packedOpSnippet:uK,dtype:"bool"}),A2={kernelName:vn,backendName:"webgl",kernelFunc:cK};var pK="return float(!(x >= 1.0));",mK=pt({opSnippet:pK}),E2={kernelName:Sn,backendName:"webgl",kernelFunc:mK};var dK="return float(a >= 1.0 || b >= 1.0);",fK=`
  return min(
    vec4(greaterThanEqual(a, vec4(1.0))) +
    vec4(greaterThanEqual(b, vec4(1.0))),
    vec4(1.0));
`,hK=Ht({opSnippet:dK,packedOpSnippet:fK,dtype:"bool"}),R2={kernelName:kn,backendName:"webgl",kernelFunc:hK};var Kd=class{constructor(t,e,o,n,s){this.variableNames=["x"],this.outputShape=[];let i=e,l=t[3]-1;this.outputShape=t;let u,a=`float(${o}) + float(${n}) * sum`;s===.5?u=`inversesqrt(${a})`:s===1?u=`1.0/(${a})`:u=`exp(log(${a}) * float(-${s}));`,this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int r = coords[1];
        int c = coords[2];
        int d = coords[3];
        float x = getX(b, r, c, d);
        float sum = 0.0;
        for (int j = -${i}; j <= ${i}; j++) {
          int idx = d + j;
          if (idx >= 0 && idx <=  ${l}) {
            float z = getX(b, r, c, idx);
            sum += z * z;
          }
        }
        float val = x * ${u};
        setOutput(val);
      }
    `}};var qd=class{constructor(t,e,o,n,s){this.variableNames=["x"],this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0;let i=e,l=t[3]-1;this.outputShape=t;let u,a=`float(${o}) + float(${n}) * sum`;s===.5?u=`inversesqrt(${a})`:s===1?u=`1.0/(${a})`:u=`exp(log(${a}) * float(-${s}));`,this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords.x;
        int r = coords.y;
        int c = coords.z;
        int d = coords.w;

        bool hasNextCol = d < ${this.outputShape[3]};
        bool hasNextRow = c < ${this.outputShape[2]};

        vec4 sum = vec4(0.);
        vec4 xFragAtOutputCoords = getX(b, r, c, d);

        vec4 xAtOutputCoords = vec4(
          getChannel(xFragAtOutputCoords, vec2(c, d)),
          hasNextCol ?
            getChannel(xFragAtOutputCoords, vec2(c, d + 1)) : 0.0,
          hasNextRow ?
            getChannel(xFragAtOutputCoords , vec2(c + 1, d)) : 0.0,
          (hasNextRow && hasNextCol) ?
            getChannel(xFragAtOutputCoords, vec2(c + 1, d + 1)) : 0.0
        );

        int firstChannel = d - ${i};
        vec2 cache = vec2(0.);
        if(firstChannel >= 0){
          vec4 firstChannelFrag = getX(b, r, c, firstChannel);
          cache.x = getChannel(firstChannelFrag, vec2(c, firstChannel));
            if(hasNextRow){
              cache.y = getChannel(firstChannelFrag, vec2(c + 1, firstChannel));
            }
        }

        ivec2 depth = ivec2(d, d + 1);
        for (int j = - ${i}; j <= ${i}; j++) {
          ivec2 idx = depth + j;
          bvec2 aboveLowerBound = greaterThanEqual(idx, ivec2(0));
          bvec2 belowUpperBound = lessThanEqual(idx, ivec2(${l}));

          bool depthInRange = aboveLowerBound.x && belowUpperBound.x;
          bool depthPlusOneInRange = aboveLowerBound.y && belowUpperBound.y;

          if(depthInRange || depthPlusOneInRange){
            vec4 z = vec4(0.);
            vec4 xFragAtCurrentDepth;
            z.xz = cache.xy;
            if(depthPlusOneInRange && hasNextCol){
              xFragAtCurrentDepth = idx.y != d ?
                getX(b, r, c, idx.y) : xFragAtOutputCoords;
              z.y = getChannel(xFragAtCurrentDepth, vec2(c, idx.y));
              if(hasNextRow){
                z.w = getChannel(xFragAtCurrentDepth, vec2(c + 1, idx.y));
              }
            }
            cache.xy = z.yw;
            sum += z * z;
          }
        }
        vec4 result = xAtOutputCoords * ${u};
        setOutput(result);
      }
    `}};var gK=r=>{let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{depthRadius:s,bias:i,alpha:l,beta:u}=o,a=$().getBool("WEBGL_PACK_NORMALIZATION")?new qd(n.shape,s,i,l,u):new Kd(n.shape,s,i,l,u);return e.runWebGLProgram(a,[n],n.dtype)},D2={kernelName:Tn,backendName:"webgl",kernelFunc:gK};var jd=class{constructor(t,e,o,n,s){this.variableNames=["inputImage","outputImage","dy"],this.outputShape=[],this.outputShape=t,this.depth=t[3],this.depthRadius=e,this.bias=o,this.alpha=n,this.beta=s,this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int r = coords[1];
        int c = coords[2];

        float result = 0.0;
        for (int d = 0; d < ${this.depth}; ++d) {
          int depthBegin = int(max(0.0, float(d - ${e})));
          int depthEnd = int(min(float(${this.depth}),
              float(d + ${e} + 1)));

          const int MIN_DEPTH_BEGIN = 0;
          const int MAX_DEPTH_END = ${this.depth};

          float norm = 0.0;
          for (int k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; ++k) {
            if (k < depthBegin){
              continue;
            }
            else if (k >= depthBegin && k < depthEnd) {
              norm += getInputImage(b, r, c, k) * getInputImage(b, r, c, k);
            }
            else {
              break;
            }
          }

          norm = float(${n}) * norm + float(${o});

          for(int k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; ++k){
            if (k < depthBegin){
              continue;
            }
            else if (k >= depthBegin && k < depthEnd){
              float dyi = -2.0 * float(${n})
                * float(${s})
                * getInputImage(b, r, c, k) * getOutputImage(b, r, c, d)
                / norm;
              if (k == d) {
                dyi += pow(norm, -1.0 * ${s});
              }
              if (k == coords[3]) {
                dyi *= getDy(b, r, c, d);
                result += dyi;
              }
            }
            else {
              break;
            }
          }
      }
      setOutput(result);
      }
    `}};var xK=r=>{let{inputs:t,backend:e,attrs:o}=r,{x:n,y:s,dy:i}=t,{depthRadius:l,bias:u,alpha:a,beta:c}=o,p=new jd(n.shape,l,u,a,c);return e.runWebGLProgram(p,[n,s,i],n.dtype)},F2={kernelName:Da,backendName:"webgl",kernelFunc:xK};function $2(r,t,e,o){let n=b.sizeFromShape(t),i=b.sizeFromShape(r.shape)/n,l=Z({inputs:{x:r},attrs:{shape:[i,n]},backend:o}),u=wr(l,r.dtype,"max",o),a=Z({inputs:{x:u},attrs:{shape:e},backend:o});return o.disposeIntermediateTensorInfo(l),o.disposeIntermediateTensorInfo(u),a}function bC(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{reductionIndices:s,keepDims:i}=o,l=n.shape.length,u=b.parseAxisParam(s,n.shape),a=u,c=w.getAxesPermutation(a,l),p=c!=null,m=e.shouldExecuteOnCPU([n]),d=n;if(p){if(m){let C=e.texData.get(d.dataId).values,I=new Array(l);for(let k=0;k<I.length;k++)I[k]=n.shape[c[k]];let v=_i(C,n.shape,n.dtype,c,I);d=e.makeTensorInfo(I,n.dtype);let S=e.texData.get(d.dataId);S.values=v}else d=ua(n,c,e);a=w.getInnerMostAxes(a.length,l)}w.assertAxesAreInnerMostDims("max",a,l);let[f,h]=w.computeOutAndReduceShapes(d.shape,a),g=f;i&&(g=w.expandShapeToKeepDim(f,u));let x;if(m){let C=e.texData.get(d.dataId).values,I=KT(C,b.sizeFromShape(h),g,n.dtype);x=e.makeTensorInfo(g,n.dtype);let v=e.texData.get(x.dataId);v.values=I}else x=$2(d,h,g,e);return p&&e.disposeIntermediateTensorInfo(d),x}var M2={kernelName:_n,backendName:"webgl",kernelFunc:bC};var bK=mu+`
  return max(a, b);
`,yK=`
  vec4 result = vec4(max(a, b));
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+Ir+`
  return result;
`,CK=Ht({opSnippet:bK,packedOpSnippet:yK,cpuKernelImpl:qT}),P2={kernelName:Nn,backendName:"webgl",kernelFunc:CK};function IK(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t;ko(n,"maxPool");let{filterSize:s,strides:i,pad:l,dimRoundingMode:u}=o,a=1;b.assert(w.eitherStridesOrDilationsAreOne(i,a),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${i} and dilations '${a}'`);let c=w.computePool2DInfo(n.shape,s,i,a,l,u);if(c.filterWidth===1&&c.filterHeight===1&&b.arraysEqual(c.inShape,c.outShape))return fe({inputs:{x:n},backend:e});let p=new io(c,"max",!1);return e.runWebGLProgram(p,[n],n.dtype)}var O2={kernelName:An,backendName:"webgl",kernelFunc:IK};function wK(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{filterSize:s,strides:i,pad:l,dataFormat:u,dimRoundingMode:a}=o,c=[1,1,1],p=w.computePool3DInfo(n.shape,s,i,c,l,a,u),m=new ca(p,"max",!1);return e.runWebGLProgram(m,[n],n.dtype)}var B2={kernelName:yl,backendName:"webgl",kernelFunc:wK};var Xd=class{constructor(t){this.variableNames=["dy","maxPos"],this.outputShape=t.inShape;let e=t.strideHeight,o=t.strideWidth,n=t.dilationHeight,s=t.effectiveFilterHeight,i=t.effectiveFilterWidth,l=s-1-t.padInfo.top,u=i-1-t.padInfo.left,a=s*i-1;this.userCode=`
      const ivec2 pads = ivec2(${l}, ${u});

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];

        ivec2 dyRCCorner = coords.yz - pads;
        int dyRCorner = dyRCCorner.x;
        int dyCCorner = dyRCCorner.y;

        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${s};
          wR += ${n}) {
          float dyR = float(dyRCorner + wR) / ${e}.0;

          if (dyR < 0.0 || dyR >= ${t.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          for (int wC = 0; wC < ${i}; wC++) {
            float dyC = float(dyCCorner + wC) / ${o}.0;

            if (dyC < 0.0 || dyC >= ${t.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            float dyValue = getDy(b, idyR, idyC, d);
            int maxPosValue = ${a} - int(getMaxPos(b, idyR, idyC, d));

            // Get the current value, check it against the value from the
            // position matrix.
            int curPosValue = wR * ${i} + wC;
            float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);

            dotProd += dyValue * mask;
          }
        }
        setOutput(dotProd);
      }
    `}},Yd=class{constructor(t){this.variableNames=["dy","maxPos"],this.outputShape=t.inShape;let e=t.strideDepth,o=t.strideHeight,n=t.strideWidth,s=t.dilationDepth,i=t.dilationHeight,l=t.dilationWidth,u=t.effectiveFilterDepth,a=t.effectiveFilterHeight,c=t.effectiveFilterWidth,p=u-1-t.padInfo.front,m=a-1-t.padInfo.top,d=c-1-t.padInfo.left,f=u*a*c-1;this.userCode=`
      const ivec3 pads = ivec3(${p}, ${m}, ${d});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyDCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        // Convolve dy(?, ?, ?, ch) with pos mask(:, :, :, d) to get
        // dx(xD, xR, xC, ch).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int wD = 0; wD < ${u};
           wD += ${s}) {
          float dyD = float(dyDCorner + wD) / ${e}.0;

          if (dyD < 0.0 || dyD >= ${t.outDepth}.0 || fract(dyD) > 0.0) {
            continue;
          }
          int idyD = int(dyD);

          for (int wR = 0; wR < ${a};
              wR += ${i}) {
            float dyR = float(dyRCorner + wR) / ${o}.0;

            if (dyR < 0.0 || dyR >= ${t.outHeight}.0 ||
                fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            for (int wC = 0; wC < ${c};
                wC += ${l}) {
              float dyC = float(dyCCorner + wC) / ${n}.0;

              if (dyC < 0.0 || dyC >= ${t.outWidth}.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              float dyValue = getDy(batch, idyD, idyR, idyC, ch);
              int maxPosValue = ${f} -
                  int(getMaxPos(batch, idyD, idyR, idyC, ch));

              // Get the current value, check it against the value from the
              // position matrix.
              int curPosValue =
                  wD * ${a} * ${c} +
                  wR * ${c} + wC;
              float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);

              dotProd += dyValue * mask;
            }
          }
        }
        setOutput(dotProd);
      }
    `}};function vK(r){let{inputs:t,backend:e,attrs:o}=r,{dy:n,input:s}=t,i=s,{filterSize:l,strides:u,pad:a,dimRoundingMode:c}=o,p=[1,1,1],m=w.computePool3DInfo(i.shape,l,u,p,a,c),d=new ca(m,"max",!0),f=e.runWebGLProgram(d,[i],i.dtype),h=new Yd(m),g=e.runWebGLProgram(h,[n,f],i.dtype);return e.disposeIntermediateTensorInfo(f),g}var L2={kernelName:Cl,backendName:"webgl",kernelFunc:vK};function SK(r){let{inputs:t,backend:e,attrs:o}=r,{dy:n,input:s,output:i}=t,l=s;ko([s,i],"maxPoolGrad");let{filterSize:u,strides:a,pad:c,dimRoundingMode:p}=o,m=w.computePool2DInfo(l.shape,u,a,1,c,p),d=!0,f=new io(m,"max",d),h=e.runWebGLProgram(f,[l],l.dtype),g=new Xd(m),x=e.runWebGLProgram(g,[n,h],l.dtype);return e.disposeIntermediateTensorInfo(h),x}var U2={kernelName:bl,backendName:"webgl",kernelFunc:SK};function G2(r,t,e,o){let n=new io(e,"max",!1),s=o.runWebGLProgram(n,[r],"float32");n=new io(e,"max",!0,!0,t);let i=o.runWebGLProgram(n,[r],"float32");return[s,i]}var V2={kernelName:Il,backendName:"webgl",kernelFunc:({inputs:r,attrs:t,backend:e})=>{let{x:o}=r,{filterSize:n,strides:s,pad:i,includeBatchInIndex:l}=t,u=e;b.assert(o.shape.length===4,()=>`Error in maxPool: input must be rank 4 but got rank ${o.shape.length}.`);let a=[1,1];b.assert(w.eitherStridesOrDilationsAreOne(s,a),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${s} and dilations '${a}'`);let c=w.computePool2DInfo(o.shape,n,s,a,i),[p,m]=G2(o,l,c,u);return[p,m]}};function W2(r,t,e,o){let n=b.sizeFromShape(t),i=b.sizeFromShape(r.shape)/n,l=Z({inputs:{x:r},attrs:{shape:[i,n]},backend:o}),u=wr(l,"float32","mean",o),a=Z({inputs:{x:u},attrs:{shape:e},backend:o});return o.disposeIntermediateTensorInfo(l),o.disposeIntermediateTensorInfo(u),a}var z2={kernelName:En,backendName:"webgl",kernelFunc:({inputs:r,attrs:t,backend:e})=>{let{x:o}=r,{keepDims:n,axis:s}=t,i=e,l=o.shape.length,u=b.parseAxisParam(s,o.shape),a=u,c=w.getAxesPermutation(a,l),p=c!=null,m=i.shouldExecuteOnCPU([o]),d=[],f=o;if(p){if(m){let I=i.texData.get(f.dataId).values,v=new Array(l);for(let A=0;A<v.length;A++)v[A]=o.shape[c[A]];let S=_i(I,o.shape,o.dtype,c,v);f=i.makeTensorInfo(v,o.dtype);let k=i.texData.get(f.dataId);k.values=S}else f=ua(o,c,i);d.push(f),a=w.getInnerMostAxes(a.length,l)}w.assertAxesAreInnerMostDims("sum",a,l);let[h,g]=w.computeOutAndReduceShapes(f.shape,a),x=h;n&&(x=w.expandShapeToKeepDim(h,u));let y=W2(f,g,x,i);for(let C of d)i.disposeIntermediateTensorInfo(C);return y}};function kK(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s,keepDims:i}=o,l=n.shape.length,u=b.parseAxisParam(s,n.shape),a=u,c=w.getAxesPermutation(a,l),p=n;c!=null&&(p=te({inputs:{x:n},backend:e,attrs:{perm:c}}),a=w.getInnerMostAxes(a.length,n.shape.length)),w.assertAxesAreInnerMostDims("min",a,l);let[m,d]=w.computeOutAndReduceShapes(p.shape,a),f=b.sizeFromShape(d),h=Z({inputs:{x:p},backend:e,attrs:{shape:[-1,f]}}),g=wr(h,h.dtype,"min",e),x;if(i){let y=w.expandShapeToKeepDim(m,u);x=Z({inputs:{x:g},backend:e,attrs:{shape:y}})}else x=Z({inputs:{x:g},backend:e,attrs:{shape:m}});return e.disposeIntermediateTensorInfo(h),e.disposeIntermediateTensorInfo(g),c!=null&&e.disposeIntermediateTensorInfo(p),x}var H2={kernelName:Rn,backendName:"webgl",kernelFunc:kK};var TK=mu+`
  return min(a, b);
`,_K=`
  vec4 result = vec4(min(a, b));
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+Ir+`
  return result;
`,NK=Ht({opSnippet:TK,packedOpSnippet:_K,cpuKernelImpl:jT}),K2={kernelName:Dn,backendName:"webgl",kernelFunc:NK};var Zd=class{constructor(t,e,o){this.variableNames=["x"],this.outputShape=e.map((c,p)=>c[0]+t[p]+c[1]);let n=t.length,s=kt(n),i=e.map(c=>c[0]).join(","),l=e.map((c,p)=>c[0]+t[p]).join(","),u=["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,n),a=o==="reflect"?0:1;if(n===1){this.userCode=`
        int start = ${i};
        int end = ${l};

        void main() {
          int outC = getOutputCoords();
          if (outC < start) {
            outC = start * 2 - outC - ${a};
          } else if(outC >= end) {
            outC = (end - 1) * 2 - outC + ${a};
          }
          setOutput(getX(outC - start));
        }
      `;return}this.userCode=`
      ${s} start = ${s}(${i});
      ${s} end = ${s}(${l});

      void main() {
        ${s} outC = getOutputCoords();
        for (int i = 0; i < ${n}; i++) {
          if (outC[i] < start[i]) {
            outC[i] = start[i] * 2 - outC[i] - ${a};
          } else if(outC[i] >= end[i]) {
            outC[i] = (end[i] - 1) * 2 - outC[i] + ${a};
          }
        }
        ${s} coords = outC - start;
        setOutput(getX(${u}));
      }
    `}};var Qd=class{constructor(t,e,o){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e.map((f,h)=>f[0]+t[h]+f[1]);let n=t.length,s=kt(n),i=e.map(f=>f[0]).join(","),l=e.map((f,h)=>f[0]+t[h]).join(","),u=de("rc",n),a=de("source",n),c=`${u[n-1]} < ${this.outputShape[n-1]}`,p=n===1?"source":`vec2(${a.slice(-2).join()})`,m=o==="reflect"?0:1,d="";if(n===1){let f=`
        ${s} source = rc;
        if (source < start) {
          source = start * 2 - source - ${m};
        } else if (source >= end) {
          source = (end - 1) * 2 - source + ${m};
        }
        source -= start;
      `;d=`
        ${s} rc = outputLoc;
        ${f}
        result[0] = getChannel(getX(${a.join()}), ${p});
        ${u[n-1]} += 1;
        if(${c}) {
          ${f}
          result[1] = getChannel(getX(${a.join()}), ${p});
        }
      `}else{let f=`
        ${s} source = rc;
        ${s} lt = ${s}(lessThan(source, start));
        ${s} gte = ${s}(greaterThanEqual(source, end));
        ${s} orig = 1 - (lt + gte);
        source = orig * source +
                lt * (start * 2 - source - ${m}) +
                gte * ((end - 1) * 2 - source + ${m});
        source -= start;
      `;d=`
        ${s} rc = outputLoc;
        ${f}
        result[0] = getChannel(getX(${a.join()}), ${p});
        ${u[n-1]} += 1;
        if(${c}) {
          ${f}
          result[1] = getChannel(getX(${a.join()}), ${p});
        }
        rc = outputLoc;
        ${u[n-2]} += 1;
        if(${u[n-2]} < ${this.outputShape[n-2]}) {
          ${f}
          result[2] = getChannel(getX(${a.join()}), ${p});
          ${u[n-1]} += 1;
          if(${c}) {
            ${f}
            result[3] = getChannel(getX(${a.join()}), ${p});
          }
        }
      `}this.userCode=`
      const ${s} start = ${s}(${i});
      const ${s} end = ${s}(${l});

      void main() {
        ${s} outputLoc = getOutputCoords();
        vec4 result = vec4(0.);
        ${d}
        setOutput(result);
      }
    `}};var AK=({inputs:r,backend:t,attrs:e})=>{let{x:o}=r,{paddings:n,mode:s}=e,i=$().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new Qd(o.shape,n,s):new Zd(o.shape,n,s);return t.runWebGLProgram(i,[o],o.dtype)},q2={kernelName:Fn,backendName:"webgl",kernelFunc:AK};var EK=`if (b == 0.0) return NAN;
  return mod(a, b);`,RK=`
  vec4 result = mod(a, b);
  bvec4 isNaN = equal(b, vec4(0.0));
  `+Ir+`
  return result;
`,DK=Ht({opSnippet:EK,packedOpSnippet:RK}),j2={kernelName:$n,backendName:"webgl",kernelFunc:DK};var Jd=class{constructor(t,e,o){this.variableNames=["probs"],this.customUniforms=[{name:"seed",type:"float"}],this.outputShape=[t,o],this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];

        float r = random(seed);
        float cdf = 0.0;

        for (int i = 0; i < ${e-1}; i++) {
          cdf += getProbs(batch, i);

          if (r < cdf) {
            setOutput(float(i));
            return;
          }
        }

        // If no other event happened, last event happened.
        setOutput(float(${e-1}));
      }
    `}};var FK=`
if (a == b) {
  return 1.0;
};
return a / b;`,$K=`
  // vec4 one = vec4(equal(a, b));
  // return one + (vec4(1.0) - one) * a / b;
  vec4 result = a / b;
  if(a.x == b.x) {
    result.x = 1.;
  }
  if(a.y == b.y) {
    result.y = 1.;
  }
  if(a.z == b.z) {
    result.z = 1.;
  }
  if(a.w == b.w) {
    result.w = 1.;
  }

  return result;
`,yC=Ht({opSnippet:FK,packedOpSnippet:$K,checkOutOfBounds:!0}),X2={kernelName:on,backendName:"webgl",kernelFunc:yC};var Y2="return a - b;",CC=Ht({opSnippet:Y2,packedOpSnippet:Y2,supportsComplex:!0,cpuKernelImpl:h_}),Z2={kernelName:is,backendName:"webgl",kernelFunc:CC};function IC(r){let{inputs:t,backend:e,attrs:o}=r,{logits:n}=t,{dim:s}=o,i=b.parseAxisParam([s],n.shape),l=bC({inputs:{x:n},backend:e,attrs:{reductionIndices:i,keepDims:!1}}),u=w.expandShapeToKeepDim(l.shape,i),a=Z({inputs:{x:l},backend:e,attrs:{shape:u}}),c=CC({inputs:{a:n,b:a},backend:e}),p=hC({inputs:{x:c},backend:e}),m=Ni({inputs:{x:p},backend:e,attrs:{axis:i,keepDims:!1}}),d=Z({inputs:{x:m},backend:e,attrs:{shape:u}}),f=yC({inputs:{a:p,b:d},backend:e});return e.disposeIntermediateTensorInfo(l),e.disposeIntermediateTensorInfo(a),e.disposeIntermediateTensorInfo(c),e.disposeIntermediateTensorInfo(p),e.disposeIntermediateTensorInfo(m),e.disposeIntermediateTensorInfo(d),f}var Q2={kernelName:ns,backendName:"webgl",kernelFunc:IC};function MK(r){let{inputs:t,backend:e,attrs:o}=r,{logits:n}=t,{numSamples:s,seed:i,normalized:l}=o,u=l?n:IC({inputs:{logits:n},backend:e,attrs:{dim:n.shape.length-1}}),a=u.shape[0],c=u.shape[1],p=new Jd(a,c,s),m=[[i]],d=e.runWebGLProgram(p,[u],"int32",m);return l||e.disposeIntermediateTensorInfo(u),d}var J2={kernelName:Fa,backendName:"webgl",kernelFunc:MK};var PK=we+`
  return -x;
`,OK=`
  vec4 result = -x;
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`;function BK(r){let{inputs:t,backend:e}=r,{x:o}=t;if(e.shouldExecuteOnCPU([o])){let s=e.texData.get(o.dataId),[i,l]=YT(s.values,o.shape,o.dtype);return e.makeTensorInfo(l,o.dtype,i)}let n;return $().getBool("WEBGL_PACK_UNARY_OPERATIONS")?n=new nr(o.shape,OK):n=new $e(o.shape,PK),e.runWebGLProgram(n,[o],o.dtype)}var tA={kernelName:Ls,backendName:"webgl",kernelFunc:BK};var LK=Be.nonMaxSuppressionV3Impl;function UK(r){w.warn("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");let{inputs:t,backend:e,attrs:o}=r,{boxes:n,scores:s}=t,{maxOutputSize:i,iouThreshold:l,scoreThreshold:u}=o,a=e.readSync(n.dataId),c=e.readSync(s.dataId),{selectedIndices:p}=LK(a,c,i,l,u);return e.makeTensorInfo([p.length],"int32",new Int32Array(p))}var eA={kernelName:$a,backendName:"webgl",kernelFunc:UK};var GK=Be.nonMaxSuppressionV4Impl;function VK(r){w.warn("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");let{inputs:t,backend:e,attrs:o}=r,{boxes:n,scores:s}=t,{maxOutputSize:i,iouThreshold:l,scoreThreshold:u,padToMaxOutputSize:a}=o,c=e.readSync(n.dataId),p=e.readSync(s.dataId),{selectedIndices:m,validOutputs:d}=GK(c,p,i,l,u,a);return[e.makeTensorInfo([m.length],"int32",new Int32Array(m)),e.makeTensorInfo([],"int32",new Int32Array([d]))]}var rA={kernelName:Ma,backendName:"webgl",kernelFunc:VK};var WK=Be.nonMaxSuppressionV5Impl;function zK(r){w.warn("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");let{inputs:t,backend:e,attrs:o}=r,{boxes:n,scores:s}=t,{maxOutputSize:i,iouThreshold:l,scoreThreshold:u,softNmsSigma:a}=o,c=e.readSync(n.dataId),p=e.readSync(s.dataId),m=i,d=l,f=u,h=a,{selectedIndices:g,selectedScores:x}=WK(c,p,m,d,f,h);return[e.makeTensorInfo([g.length],"int32",new Int32Array(g)),e.makeTensorInfo([x.length],"float32",new Float32Array(x))]}var oA={kernelName:Pa,backendName:"webgl",kernelFunc:zK};var tf=class{constructor(t,e,o,n){this.variableNames=["indices"],this.outputShape=[t,e],this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int index = round(getIndices(coords.x));
        setOutput(mix(float(${n}), float(${o}),
                      float(index == coords.y)));
      }
    `}};var HK=r=>{let{inputs:t,backend:e,attrs:o}=r,{indices:n}=t,{dtype:s,depth:i,onValue:l,offValue:u}=o,a=b.sizeFromShape(n.shape),c=new tf(a,i,l,u),p=Z({inputs:{x:n},backend:e,attrs:{shape:[a]}}),m=e.runWebGLProgram(c,[p],s);e.disposeIntermediateTensorInfo(p);let d=[...n.shape,i],f=Z({inputs:{x:m},backend:e,attrs:{shape:d}});return e.disposeIntermediateTensorInfo(m),f},nA={kernelName:On,backendName:"webgl",kernelFunc:HK};function vc(r){let{inputs:t,backend:e}=r,{x:o}=t;if(o.dtype==="complex64"){let n=ws({inputs:{input:o},backend:e}),s=vc({inputs:{x:n},backend:e}),i=Ei({inputs:{input:o},backend:e}),l=vc({inputs:{x:i},backend:e}),u=ar({inputs:{real:s,imag:l},backend:e});return e.disposeIntermediateTensorInfo(n),e.disposeIntermediateTensorInfo(s),e.disposeIntermediateTensorInfo(i),e.disposeIntermediateTensorInfo(l),u}else return vs({attrs:{shape:o.shape,dtype:o.dtype,value:o.dtype==="string"?"":0},backend:e})}var sA={kernelName:Xs,backendName:"webgl",kernelFunc:vc};function aA(r){let{inputs:t,backend:e}=r,{x:o}=t;if(o.dtype==="string")throw new Error("onesLike is not supported under string dtype");if(o.dtype==="complex64"){let n=ws({inputs:{input:o},backend:e}),s=aA({inputs:{x:n},backend:e}),i=Ei({inputs:{input:o},backend:e}),l=vc({inputs:{x:i},backend:e}),u=ar({inputs:{real:s,imag:l},backend:e});return e.disposeIntermediateTensorInfo(n),e.disposeIntermediateTensorInfo(s),e.disposeIntermediateTensorInfo(i),e.disposeIntermediateTensorInfo(l),u}else return vs({attrs:{shape:o.shape,dtype:o.dtype,value:1},backend:e})}var iA={kernelName:Us,backendName:"webgl",kernelFunc:aA};function KK(r){let{inputs:t,backend:e,attrs:o}=r,{axis:n}=o;if(t.length===1)return Bd({inputs:{input:t[0]},backend:e,attrs:{dim:n}});let s=t[0].shape,i=t[0].dtype;t.forEach(c=>{b.assertShapesMatch(s,c.shape,"All tensors passed to stack must have matching shapes"),b.assert(i===c.dtype,()=>"All tensors passed to stack must have matching dtypes")});let l=[],u=t.map(c=>{let p=Bd({inputs:{input:c},backend:e,attrs:{dim:n}});return l.push(p),p}),a=fC({inputs:u,backend:e,attrs:{axis:n}});return l.forEach(c=>e.disposeIntermediateTensorInfo(c)),a}var lA={kernelName:Gs,backendName:"webgl",kernelFunc:KK};var ef=class{constructor(t,e,o){this.variableNames=["x"],this.customUniforms=[{name:"value",type:"float"}],this.outputShape=e.map((a,c)=>a[0]+t[c]+a[1]);let n=t.length,s=kt(n),i=e.map(a=>a[0]).join(","),l=e.map((a,c)=>a[0]+t[c]).join(","),u=["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,n);if(n===1){this.userCode=`
        int start = ${i};
        int end = ${l};

        void main() {
          int outC = getOutputCoords();
          if (outC < start || outC >= end) {
            setOutput(value);
          } else {
            setOutput(getX(outC - start));
          }
        }
      `;return}this.userCode=`
      ${s} start = ${s}(${i});
      ${s} end = ${s}(${l});

      void main() {
        ${s} outC = getOutputCoords();
        if (any(lessThan(outC, start)) || any(greaterThanEqual(outC, end))) {
          setOutput(value);
        } else {
          ${s} coords = outC - start;
          setOutput(getX(${u}));
        }
      }
    `}};var rf=class{constructor(t,e,o){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"value",type:"float"}],this.outputShape=e.map((h,g)=>h[0]+t[g]+h[1]);let n=t.length,s=kt(n),i=e.map(h=>h[0]).join(","),l=e.map((h,g)=>h[0]+t[g]).join(","),u=de("rc",n),a=de("source",n),c=`${u[n-1]} < ${this.outputShape[n-1]}`,p=n===1?"source":`vec2(${a.slice(-2).join()})`,m=[`${s} rc = outputLoc;`,`${u[n-1]} += 1;
       if(${c}) {
      `,n===1?"":`}
       rc = outputLoc;
       ${u[n-2]} += 1;
       if(${u[n-2]} < ${this.outputShape[n-2]}) {`,n===1?"":`  ${u[n-1]} += 1;
         if(${c}) {`],d=n===1?"rc < start || rc >= end":"any(lessThan(rc, start)) || any(greaterThanEqual(rc, end))",f="";for(let h=0,g=n===1?2:4;h<g;h++)f+=`
        ${m[h]}
        if (${d}) {
          result[${h}] = float(value);
        } else {
          ${s} source = rc - start;
          result[${h}] = getChannel(getX(${a.join()}), ${p});
        }
      `;f+=n===1?"} ":"}}",this.userCode=`
      const ${s} start = ${s}(${i});
      const ${s} end = ${s}(${l});

      void main() {
        ${s} outputLoc = getOutputCoords();
        vec4 result = vec4(0.);
        ${f}
        setOutput(result);
      }
    `}};var wC=r=>{let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{paddings:s,constantValue:i}=o;if(b.sizeFromShape(n.shape)===0){let a=s.map((c,p)=>c[0]+n.shape[p]+c[1]);return vs({backend:e,attrs:{shape:a,value:i,dtype:n.dtype}})}let l=$().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new rf(n.shape,s,i):new ef(n.shape,s,i),u=[[i]];return e.runWebGLProgram(l,[n],n.dtype,u)},uA={kernelName:Bn,backendName:"webgl",kernelFunc:wC};var qK=`
  if(a < 0.0 && floor(b) < b){
    return NAN;
  }
  if (b == 0.0) {
    return 1.0;
  }
  return (round(mod(b, 2.0)) != 1) ?
      pow(abs(a), b) : sign(a) * pow(abs(a), b);
`,jK=`
  // isModRound1 has 1 for components with round(mod(b, 2.0)) == 1, 0 otherwise.
  vec4 isModRound1 = vec4(equal(round(mod(b, 2.0)), ivec4(1)));
  vec4 multiplier = sign(a) * isModRound1 + (vec4(1.0) - isModRound1);
  vec4 result = multiplier * pow(abs(a), b);

  // Ensure that a^0 = 1, including 0^0 = 1 as this correspond to TF and JS
  bvec4 isExpZero = equal(b, vec4(0.0));
  result.r = isExpZero.r ? 1.0 : result.r;
  result.g = isExpZero.g ? 1.0 : result.g;
  result.b = isExpZero.b ? 1.0 : result.b;
  result.a = isExpZero.a ? 1.0 : result.a;

  bvec4 isNaN1 = lessThan(a, vec4(0.0));
  bvec4 isNaN2 = lessThan(floor(b), b);
  bvec4 isNaN = bvec4(isNaN1.x && isNaN2.x, isNaN1.y && isNaN2.y, isNaN1.z && isNaN2.z, isNaN1.w && isNaN2.w);
  `+Ir+`
  return result;
`,XK=Ht({opSnippet:qK,packedOpSnippet:jK}),cA={kernelName:Ln,backendName:"webgl",kernelFunc:XK};function YK(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s,keepDims:i}=o,l=n.shape.length,u=[],a=b.parseAxisParam(s,n.shape),c=a,p=w.getAxesPermutation(c,l),m=n;p!=null&&(m=te({inputs:{x:n},backend:e,attrs:{perm:p}}),c=w.getInnerMostAxes(c.length,l),u.push(m)),w.assertAxesAreInnerMostDims("prod",c,l);let d;if(e.shouldExecuteOnCPU([m])){let f=e.texData.get(m.dataId).values,{outVals:h,outShape:g,outDtype:x}=QT(m.shape,m.dtype,f,c);d=e.makeTensorInfo(g,x,h)}else{let[f,h]=w.computeOutAndReduceShapes(m.shape,c),g=b.sizeFromShape(h),x=Z({inputs:{x:m},backend:e,attrs:{shape:[-1,g]}}),y=ti(n.dtype),C=wr(x,y,"prod",e);d=Z({inputs:{x:C},backend:e,attrs:{shape:f}}),u.push(x),u.push(C)}if(i){u.push(d);let f=w.expandShapeToKeepDim(d.shape,a);d=Z({inputs:{x:d},backend:e,attrs:{shape:f}})}return u.forEach(f=>e.disposeIntermediateTensorInfo(f)),d}var pA={kernelName:Gn,backendName:"webgl",kernelFunc:YK};function ZK(r){let{inputs:t,backend:e,attrs:o}=r,{paramsNestedSplits:n,paramsDenseValues:s,indices:i}=t,{outputRaggedRank:l}=o,u=n.map(x=>e.readSync(x.dataId)),a=n.map(x=>x.shape),c=e.readSync(s.dataId),p=e.readSync(i.dataId),[m,d,f]=JT(u,a,c,s.shape,s.dtype,p,i.shape,l),h=m.map(x=>e.makeTensorInfo([x.length],"int32",x)),g=e.makeTensorInfo(f,s.dtype,d);return h.concat([g])}var mA={kernelName:Sp,backendName:"webgl",kernelFunc:ZK};function QK(r){let{inputs:t,backend:e}=r,{starts:o,limits:n,deltas:s}=t,i=e.readSync(o.dataId),l=e.readSync(n.dataId),u=e.readSync(s.dataId),[a,c]=t_(i,o.shape,o.dtype,l,n.shape,u,s.shape),p=e.makeTensorInfo([a.length],"int32",a),m=e.makeTensorInfo([c.length],o.dtype,c);return[p,m]}var dA={kernelName:kp,backendName:"webgl",kernelFunc:QK};function JK(r){let{inputs:t,backend:e,attrs:o}=r,{shape:n,values:s,defaultValue:i,rowPartitionTensors:l}=t,{rowPartitionTypes:u}=o,a=e.readSync(n.dataId),c=e.readSync(s.dataId),p=e.readSync(i.dataId),m=l.map(g=>e.readSync(g.dataId)),d=l.map(g=>g.shape),[f,h]=e_(a,n.shape,c,s.shape,s.dtype,p,i.shape,m,d,u);return e.makeTensorInfo(f,s.dtype,h)}var fA={kernelName:Tp,backendName:"webgl",kernelFunc:JK};var vC=r=>{let{backend:t,attrs:e}=r,{start:o,stop:n,step:s,dtype:i}=e,l=r_(o,n,s,i);return t.makeTensorInfo([l.length],i,l)},hA={kernelName:wl,backendName:"webgl",kernelFunc:vC};var tq="return 1.0 / x;",eq=pt({opSnippet:tq}),gA={kernelName:Vn,backendName:"webgl",kernelFunc:eq};var rq=we+`
  return (x < 0.0) ? 0.0 : x;
`,oq=`
  vec4 result = x * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,nq=pt({opSnippet:rq,packedOpSnippet:oq}),xA={kernelName:Wn,backendName:"webgl",kernelFunc:nq};var sq=we+`
  return (x < 0.0) ? 0.0 : min(6.0, x);
`,aq=`
  vec4 result = min(x, vec4(6.)) * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,iq=pt({opSnippet:sq,packedOpSnippet:aq}),bA={kernelName:Kn,backendName:"webgl",kernelFunc:iq};var of=class{constructor(t,e,o,n,s){this.variableNames=["A"],this.outputShape=[];let[i,l,u,a]=t;this.outputShape=[i,e,o,a];let c=[n&&e>1?l-1:l,n&&o>1?u-1:u],p=[n&&e>1?e-1:e,n&&o>1?o-1:o],m;s?m="(vec2(yRC) + vec2(0.5)) * effectiveInputOverOutputRatioRC - vec2(0.5)":m="vec2(yRC) * effectiveInputOverOutputRatioRC",this.userCode=`
      const vec2 effectiveInputOverOutputRatioRC = vec2(
          ${c[0]/p[0]},
          ${c[1]/p[1]});
      const vec2 inputShapeRC = vec2(${l}.0, ${u}.0);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        ivec2 yRC = coords.yz;

        // Fractional source index.
        vec2 sourceFracIndexRC = ${m};

        // Compute the four integer indices.
        ivec2 sourceFloorRC = ivec2(max(sourceFracIndexRC, vec2(0.0)));
        ivec2 sourceCeilRC = ivec2(
          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));

        float topLeft = getA(b, sourceFloorRC.x, sourceFloorRC.y, d);
        float bottomLeft = getA(b, sourceCeilRC.x, sourceFloorRC.y, d);
        float topRight = getA(b, sourceFloorRC.x, sourceCeilRC.y, d);
        float bottomRight = getA(b, sourceCeilRC.x, sourceCeilRC.y, d);

        vec2 fracRC = sourceFracIndexRC - vec2(sourceFloorRC);

        float top = topLeft + (topRight - topLeft) * fracRC.y;
        float bottom = bottomLeft + (bottomRight - bottomLeft) * fracRC.y;
        float newValue = top + (bottom - top) * fracRC.x;

        setOutput(newValue);
      }
    `}};var nf=class{constructor(t,e,o,n,s){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[];let[i,l,u,a]=t;this.outputShape=[i,e,o,a];let c=[n&&e>1?l-1:l,n&&o>1?u-1:u],p=[n&&e>1?e-1:e,n&&o>1?o-1:o],m;s?m="(vec3(yRC) + vec3(0.5)) * effectiveInputOverOutputRatioRC - vec3(0.5)":m="vec3(yRC) * effectiveInputOverOutputRatioRC",this.userCode=`
      const vec3 effectiveInputOverOutputRatioRC = vec3(
          ${c[0]/p[0]},
          ${c[1]/p[1]},
          ${c[1]/p[1]});
      const vec3 inputShapeRC = vec3(${l}.0, ${u}.0,
                                     ${u}.0);

      float getAValue(int b, int r, int c, int d) {
        return getChannel(getA(b, r, c, d), vec2(c, d));
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        // Calculate values for next column in yRC.z.
        ivec3 yRC = coords.yzz + ivec3(0, 0, 1);

        // Fractional source index.
        vec3 sourceFracIndexRC = ${m};

        // Compute the four integer indices.
        ivec3 sourceFloorRC = ivec3(max(sourceFracIndexRC, vec3(0.0)));
        ivec3 sourceCeilRC = ivec3(
          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));

        // Should we calculate next column and row elements in 2x2 packed cell.
        bool hasNextCol = d < ${a-1};
        bool hasNextRow = coords.z < ${o-1};

        // In parallel, construct four corners for all four components in
        // packed 2x2 cell.
        vec4 topLeft = vec4(
          getAValue(b, sourceFloorRC.x, sourceFloorRC.y, d),
          hasNextCol ? getAValue(b, sourceFloorRC.x, sourceFloorRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceFloorRC.x, sourceFloorRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceFloorRC.x, sourceFloorRC.z, d + 1) : 0.0);

        vec4 bottomLeft = vec4(
          getAValue(b, sourceCeilRC.x, sourceFloorRC.y, d),
          hasNextCol ? getAValue(b, sourceCeilRC.x, sourceFloorRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceCeilRC.x, sourceFloorRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceCeilRC.x, sourceFloorRC.z, d + 1) : 0.0);

        vec4 topRight = vec4(
          getAValue(b, sourceFloorRC.x, sourceCeilRC.y, d),
          hasNextCol ? getAValue(b, sourceFloorRC.x, sourceCeilRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceFloorRC.x, sourceCeilRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceFloorRC.x, sourceCeilRC.z, d + 1) : 0.0);

        vec4 bottomRight = vec4(
          getAValue(b, sourceCeilRC.x, sourceCeilRC.y, d),
          hasNextCol ? getAValue(b, sourceCeilRC.x, sourceCeilRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceCeilRC.x, sourceCeilRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceCeilRC.x, sourceCeilRC.z, d + 1) : 0.0);

        vec3 fracRC = sourceFracIndexRC - vec3(sourceFloorRC);

        vec4 top = mix(topLeft, topRight, fracRC.yyzz);
        vec4 bottom = mix(bottomLeft, bottomRight, fracRC.yyzz);
        vec4 newValue = mix(top, bottom, fracRC.x);

        setOutput(newValue);
      }
    `}};function lq(r){let{inputs:t,backend:e,attrs:o}=r,{images:n}=t,{alignCorners:s,halfPixelCenters:i,size:l}=o,[u,a]=l,c=$().getBool("WEBGL_PACK_IMAGE_OPERATIONS")?new nf(n.shape,u,a,s,i):new of(n.shape,u,a,s,i);return e.runWebGLProgram(c,[n],"float32")}var yA={kernelName:Hn,backendName:"webgl",kernelFunc:lq};var sf=class{constructor(t,e,o){this.variableNames=["dy"],this.outputShape=[],this.outputShape=e;let[,n,s]=e,[,i,l]=t,u=[o&&i>1?n-1:n,o&&l>1?s-1:s],a=[o&&i>1?i-1:i,o&&l>1?l-1:l],c=u[0]/a[0],p=u[1]/a[1],m=1/c,d=1/p,f=Math.ceil(m)*2+2,h=Math.ceil(d)*2+2;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        int r = coords[1];
        int c = coords[2];

        float accumulator = 0.0;

        const float heightScale = float(${c});
        const float widthScale = float(${p});

        const float invHeightScale = float(${m});
        const float invWidthScale = float(${d});

        const int winHeight = int(${f});
        const int winWidth = int(${h});

        // Compute bounds for where in dy we will look
        float startRLerp = floor(float(r) * invHeightScale);
        int startDyR = int(startRLerp - float(winHeight / 2));

        float startCLerp = floor(float(c) * invWidthScale);
        int startDyC = int(startCLerp - float(winWidth / 2));

        // Loop over dy
        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {
          int dyR = dyROffset + startDyR;

          // Guard against the window exceeding the bounds of dy
          if (dyR < 0 || dyR >= ${i}) {
            continue;
          }

          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {
            int dyC = dyCOffset + startDyC;

            // Guard against the window exceeding the bounds of dy
            if (dyC < 0 || dyC >= ${l}) {
              continue;
            }

            float dxR = float(dyR) * heightScale;
            int topDxRIndex = int(floor(dxR));
            int bottomDxRIndex = int(min(ceil(dxR), ${n-1}.0));
            float dxRLerp = dxR - float(topDxRIndex);
            float inverseDxRLerp = 1.0 - dxRLerp;

            float dxC = float(dyC) * widthScale;
            int leftDxCIndex = int(floor(dxC));
            int rightDxCIndex = int(min(ceil(dxC), ${s-1}.0));
            float dxCLerp = dxC - float(leftDxCIndex);
            float inverseDxCLerp = 1.0 - dxCLerp;

            if (r == topDxRIndex && c == leftDxCIndex) {
              // topLeft
              accumulator +=
                getDy(b, dyR, dyC, d) * inverseDxRLerp * inverseDxCLerp;
            }

            if (r == topDxRIndex && c == rightDxCIndex) {
              // topRight
              accumulator += getDy(b, dyR, dyC, d) * inverseDxRLerp * dxCLerp;
            }

            if (r == bottomDxRIndex && c == leftDxCIndex) {
              // bottomLeft
              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * inverseDxCLerp;
            }

            if (r == bottomDxRIndex && c == rightDxCIndex) {
              // bottomRight
              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * dxCLerp;
            }
          }
        }
        // End loop over dy

        setOutput(accumulator);
      }
    `}};function uq(r){let{inputs:t,backend:e,attrs:o}=r,{images:n,dy:s}=t,{alignCorners:i}=o,l=new sf(s.shape,n.shape,i);return e.runWebGLProgram(l,[s],s.dtype)}var CA={kernelName:Ba,backendName:"webgl",kernelFunc:uq};var af=class{constructor(t,e,o,n,s){this.variableNames=["A"],this.outputShape=[];let[i,l,u,a]=t;this.outputShape=[i,e,o,a];let c=[n&&e>1?l-1:l,n&&o>1?u-1:u],p=[n&&e>1?e-1:e,n&&o>1?o-1:o],m=n?"0.5":"0.0",d;s?d="max((vec2(yRC) + vec2(0.5)) * effectiveInputOverOutputRatioRC, vec2(0.0))":d="vec2(yRC) * effectiveInputOverOutputRatioRC",this.userCode=`
      const vec2 effectiveInputOverOutputRatioRC = vec2(
          ${c[0]/p[0]},
          ${c[1]/p[1]});
      const vec2 inputShapeRC = vec2(${l}.0, ${u}.0);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        ivec2 yRC = coords.yz;

        // Fractional source index.
        vec2 sourceFracIndexRC = ${d};

        // Compute the coordinators of nearest neighbor point.
        ivec2 sourceNearestRC = ivec2(
          min(inputShapeRC - 1.0, floor(sourceFracIndexRC + ${m})));
        float newValue = getA(b, sourceNearestRC.x, sourceNearestRC.y, d);

        setOutput(newValue);
      }
    `}};var lf=class{constructor(t,e,o,n,s){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[];let[i,l,u,a]=t;this.outputShape=[i,e,o,a];let c=[n&&e>1?l-1:l,n&&o>1?u-1:u],p=[n&&e>1?e-1:e,n&&o>1?o-1:o],m=n?"0.5":"0.0",d;s?d="max((vec3(yRC) + vec3(0.5)) * effectiveInputOverOutputRatioRC, vec3(0.0))":d="vec3(yRC) * effectiveInputOverOutputRatioRC",this.userCode=`
      const vec3 effectiveInputOverOutputRatioRC = vec3(
          ${c[0]/p[0]},
          ${c[1]/p[1]},
          ${c[1]/p[1]});
      const vec3 inputShapeRC = vec3(${l}.0, ${u}.0,
                                     ${u}.0);

      float getAValue(int b, int r, int c, int d) {
        return getChannel(getA(b, r, c, d), vec2(c, d));
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        // Calculate values for next column in yRC.z.
        ivec3 yRC = coords.yzz + ivec3(0, 0, 1);

        // Fractional source index.
        vec3 sourceFracIndexRC = ${d};

        // Compute the coordinators of nearest neighbor point.
        ivec3 sourceNearestRC = ivec3(
          min(inputShapeRC - 1.0, floor(sourceFracIndexRC + ${m})));

        // Should we calculate next column and row elements in 2x2 packed cell.
        bool hasNextCol = d < ${a-1};
        bool hasNextRow = coords.z < ${o-1};

        vec4 newValue = vec4(
          getAValue(b, sourceNearestRC.x, sourceNearestRC.y, d),
          hasNextCol ? getAValue(b, sourceNearestRC.x, sourceNearestRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceNearestRC.x, sourceNearestRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceNearestRC.x, sourceNearestRC.z, d + 1) : 0.0);

        setOutput(newValue);
      }
    `}};function cq(r){let{inputs:t,backend:e,attrs:o}=r,{images:n}=t,{alignCorners:s,halfPixelCenters:i,size:l}=o,[u,a]=l,c=$().getBool("WEBGL_PACK_IMAGE_OPERATIONS")?new lf(n.shape,u,a,s,i):new af(n.shape,u,a,s,i);return e.runWebGLProgram(c,[n],n.dtype)}var IA={kernelName:zn,backendName:"webgl",kernelFunc:cq};var uf=class{constructor(t,e,o){this.variableNames=["dy"],this.outputShape=[],this.outputShape=e;let[,n,s]=e,[,i,l]=t,u=[o&&i>1?n-1:n,o&&l>1?s-1:s],a=[o&&i>1?i-1:i,o&&l>1?l-1:l],c=u[0]/a[0],p=u[1]/a[1],m=1/c,d=1/p,f=Math.ceil(m)*2+2,h=Math.ceil(d)*2+2;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        int r = coords[1];
        int c = coords[2];

        float accumulator = 0.0;

        const float heightScale = float(${c});
        const float widthScale = float(${p});

        const float invHeightScale = float(${m});
        const float invWidthScale = float(${d});

        const int winHeight = int(${f});
        const int winWidth = int(${h});

        // Compute bounds for where in dy we will look
        float startRLerp = floor(float(r) * invHeightScale);
        int startDyR = int(floor(startRLerp - float(winHeight / 2)));

        float startCLerp = floor(float(c) * invWidthScale);
        int startDyC = int(floor(startCLerp - float(winWidth / 2)));

        // Loop over dy
        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {
          int dyR = dyROffset + startDyR;

          // Guard against the window exceeding the bounds of dy
          if (dyR < 0 || dyR >= ${i}) {
            continue;
          }

          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {
            int dyC = dyCOffset + startDyC;

            // Guard against the window exceeding the bounds of dy
            if (dyC < 0 || dyC >= ${l}) {
              continue;
            }

            float sourceFracRow =
              float(${u[0]}) *
                (float(dyR) / float(${a[0]}));

            float sourceFracCol =
                float(${u[1]}) *
                  (float(dyC) / float(${a[1]}));

            int sourceNearestRow = int(min(
                float(int(${n}) - 1),
                ${o} ? float(round(sourceFracRow)) :
                                  float(floor(sourceFracRow))));

            int sourceNearestCol = int(min(
                float(int(${s}) - 1),
                ${o} ? float(round(sourceFracCol)) :
                                  float(floor(sourceFracCol))));

            if (r == sourceNearestRow && c == sourceNearestCol) {
              accumulator += getDy(b, dyR, dyC, d);
            }
          }
        }
        // End loop over dy

        setOutput(accumulator);
      }
    `}};function pq(r){let{inputs:t,backend:e,attrs:o}=r,{images:n,dy:s}=t,{alignCorners:i}=o,l=new uf(s.shape,n.shape,i);return e.runWebGLProgram(l,[s],s.dtype)}var wA={kernelName:Oa,backendName:"webgl",kernelFunc:pq};var cf=class{constructor(t,e){this.variableNames=["x"];let o=t.length;if(o>4)throw new Error(`WebGL backend: Reverse of rank-${o} tensor is not yet supported`);if(this.outputShape=t,o===1){this.userCode=`
        void main() {
          int coord = getOutputCoords();
          setOutput(getX(${t[0]} - coord - 1));
        }
      `;return}let n=l=>e.indexOf(l)!==-1&&t[l]!==1?`${t[l]} - coords[${l}] - 1`:`coords[${l}]`,s=t.map((l,u)=>n(u)).join(","),i=kt(o);this.userCode=`
      void main() {
        ${i} coords = getOutputCoords();
        setOutput(getX(${s}));
      }
    `}};var pf=class{constructor(t,e){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0;let o=t.length;if(o>4)throw new Error(`WebGL backend: Reverse of rank-${o} tensor is not yet supported`);this.outputShape=t;let n=de("rc",o),s=`${n[o-1]} + 1 < ${this.outputShape[o-1]}`,i=`${n[o-2]} + 1 < ${this.outputShape[o-2]}`,l=kt(o);o===1?this.userCode=`
        void main(){
          int rc = getOutputCoords();
          vec4 result = vec4(0.);
          result.r = getChannel(getX(${t[0]} - rc - 1),
            ${t[0]} - rc - 1);
          if(${s}){
              result.g = getChannel(getX(${t[0]} - (rc  + 1) - 1),
                ${t[0]} - (rc  + 1) - 1);
          }
          setOutput(result);
        }
      `:this.userCode=`
        void main() {
          ${l} rc = getOutputCoords();
          vec4 result = vec4(0.);
          result.r = ${u(n.slice())};
          if(${s}){
            result.g = ${a(n.slice())};
          }
          if(${i}) {
            result.b = ${c(n.slice())};
            if(${s}) {
              result.a = ${p(n.slice())};
            }
          }
          setOutput(result);
        }
    `;function u(f){return m(f)}function a(f){return f[o-1]="("+f[o-1]+" + 1)",m(f)}function c(f){return f[o-2]="("+f[o-2]+" + 1)",m(f)}function p(f){return f[o-1]="("+f[o-1]+" + 1)",f[o-2]="("+f[o-2]+" + 1)",m(f)}function m(f){let h=t.map((y,C)=>d(C,f)),g=h.join(","),x=h.slice(-2).join(",");return`getChannel(getX(${g}), vec2(${x}))`}function d(f,h){return e.indexOf(f)!==-1&&t[f]!==1?`${t[f]} - ${h[f]} - 1`:`${h[f]}`}}};function mq(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{dims:s}=o,i=n.shape.length,l=b.parseAxisParam(s,n.shape);if(i===0)return fe({inputs:{x:n},backend:e});let u=$().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new pf(n.shape,l):new cf(n.shape,l);return e.runWebGLProgram(u,[n],n.dtype)}var vA={kernelName:qn,backendName:"webgl",kernelFunc:mq};var mf=class{constructor(t,e){this.variableNames=["Image"],this.outputShape=[],this.customUniforms=[{name:"params",type:"vec4"}];let o=t[1],n=t[2];this.outputShape=t;let s="";typeof e=="number"?s=`float outputValue = ${e.toFixed(2)};`:s=`
        vec3 fill = vec3(${e.join(",")});
        float outputValue = fill[coords[3]];`,this.userCode=`
        void main() {
          ivec4 coords = getOutputCoords();
          int x = coords[2];
          int y = coords[1];
          float coordXFloat = (float(x) - params[0]) * params[3] -
            (float(y) - params[1]) * params[2];
          float coordYFloat = (float(x) - params[0]) * params[2] +
            (float(y) - params[1]) * params[3];
          int coordX = int(round(coordXFloat + params[0]));
          int coordY = int(round(coordYFloat + params[1]));
          ${s}
          if(coordX >= 0 && coordX < ${n} && coordY >= 0 && coordY < ${o}) {
            outputValue = getImage(coords[0], coordY, coordX, coords[3]);
          }
          setOutput(outputValue);
        }
    `}};var SA={kernelName:Ha,backendName:"webgl",kernelFunc:({inputs:r,attrs:t,backend:e})=>{let{image:o}=r,{radians:n,fillValue:s,center:i}=t,l=e,u=new mf(o.shape,s),[a,c]=w.getImageCenter(i,o.shape[1],o.shape[2]),p=[[a,c,Math.sin(n),Math.cos(n)]];return l.runWebGLProgram(u,[o],o.dtype,p)}};var dq=`
  // OpenGL ES does not support round function.
  // The algorithm is based on banker's rounding.
  float base = floor(x);
  if ((x - base) < 0.5) {
    return floor(x);
  } else if ((x - base) > 0.5) {
    return ceil(x);
  } else {
    if (mod(base, 2.0) == 0.0) {
      return base;
    } else {
      return base + 1.0;
    }
  }
`,fq=pt({opSnippet:dq}),kA={kernelName:jn,backendName:"webgl",kernelFunc:fq};var hq="return inversesqrt(x);",gq=pt({opSnippet:hq,cpuKernelImpl:o_}),TA={kernelName:Xn,backendName:"webgl",kernelFunc:gq};var pa=class{constructor(t,e,o,n,s,i,l=!0,u=!1){this.variableNames=["updates","indices","defaultValue"],this.outputShape=i;let a=kt(s.length),c=kt(i.length),p="";o===1?p="i":o===2&&(p="i, j");let m=`getIndices(${p})`,d="";n===1?d="i":n===2&&(d="i, coords[1]");let f=`getUpdates(${d})`,h="";u&&(h="coords[0], coords[1]");let g=`getDefaultValue(${h})`,x=e>1?"strides[j]":"strides";this.userCode=`
        ${a} strides = ${a}(${s});

        void main() {
          ${c} coords = getOutputCoords();
          float sum = 0.0;
          bool found = false;
          for (int i = 0; i < ${t}; i++) {
            int flattenedIndex = 0;
            for (int j = 0; j < ${e}; j++) {
              int index = round(${m});
              flattenedIndex += index * ${x};
            }
            if (flattenedIndex == coords[0]) {
              sum += ${f};
              found = true;
            }
          }
          setOutput(mix(${g}, sum, float(found)));
        }
      `}};var df=class{constructor(t,e,o,n,s,i,l=!0,u=!1){this.variableNames=["updates","indices","defaultValue"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=i;let a=kt(s.length),c=kt(i.length),p="";o===1?p="i":o===2&&(p="i, j");let m=`getIndices(${p})`,d="";n===1?d="i":n===2&&(d="i, coords[1]");let f=`getUpdates(${d})`,h="";u&&(h="coords[0], coords[1]");let g=`getDefaultValue(${h})`,x=e>1?"strides[j]":"strides",y=e>1?"strides[j + 1]":"strides";this.userCode=`
        ${a} strides = ${a}(${s});

        void main() {
          ${c} coords = getOutputCoords();
          vec4 sum = vec4(0.);
          vec4 found = vec4(0.);
          for (int i = 0; i < ${t}; i+=2) {
            ivec2 flattenedIndex = ivec2(0);
            for (int j = 0; j < ${e}; j+=2) {
              ivec4 index = round(${m});
              flattenedIndex += index.xz * ${x};
              if (j + 1 < ${e}) {
                flattenedIndex += index.yw * ${y};
              }
            }
            if (flattenedIndex[0] == coords[0] || flattenedIndex[1] == coords[0] ||
                flattenedIndex[0] == coords[0] + 1 || flattenedIndex[1] == coords[0] + 1) {
              vec4 updVals = ${f};
              if (flattenedIndex[0] == coords[0]) {
                sum.xy += updVals.xy;
                found.xy = vec2(1.);
              } else if (flattenedIndex[0] == coords[0] + 1) {
                sum.zw += updVals.xy;
                found.zw = vec2(1.);
              }
              if (flattenedIndex[1] == coords[0]) {
                sum.xy += updVals.zw;
                found.xy = vec2(1.);
              } else if (flattenedIndex[1] == coords[0] + 1) {
                sum.zw += updVals.zw;
                found.zw = vec2(1.);
              }
            }
          }
          setOutput(mix(${g}, sum, found));
        }
      `}};function xq(r){let{inputs:t,backend:e,attrs:o}=r,{indices:n,updates:s}=t,{shape:i}=o,{sliceRank:l,numUpdates:u,sliceSize:a,strides:c,outputSize:p}=w.calculateShapes(s,n,i),m=[p/a,a];if(p===0)return e.makeTensorInfo(i,n.dtype);let d=Z({inputs:{x:n},backend:e,attrs:{shape:[u,l]}}),f=Z({inputs:{x:s},backend:e,attrs:{shape:[u,a]}}),h=e.makeTensorInfo([],"float32",new Float32Array([0])),g;$().getBool("WEBGL_PACK")?g=new df(u,l,d.shape.length,f.shape.length,c,m):g=new pa(u,l,d.shape.length,f.shape.length,c,m);let x=e.runWebGLProgram(g,[f,d,h],f.dtype),y=Z({inputs:{x},backend:e,attrs:{shape:i}});return e.disposeIntermediateTensorInfo(d),e.disposeIntermediateTensorInfo(f),e.disposeIntermediateTensorInfo(x),e.disposeIntermediateTensorInfo(h),y}var _A={kernelName:La,backendName:"webgl",kernelFunc:xq};var ff=class{constructor(t,e,o,n){this.variableNames=["sortedSequence","values"],this.customUniforms=[{name:"numInputs",type:"int"}],this.outputShape=[t,o];let s="while (left < right) {",i=`for (int i = 0; i < ${Math.ceil(Math.log2(e+1))}; ++i) { if (left >= right) break;`,l=$().getNumber("WEBGL_VERSION")===2?s:i,u=n==="left"?"<":"<=";this.userCode=`
       int findBound(int batch, float value) {
         int left = 0;
         int right = numInputs;
         int mid;
         ${l}
           mid = (left + right) / 2;
           if (getSortedSequence(batch, mid) ${u} value) {
             left = mid + 1;
           } else {
             right = mid;
           }
         }
         return right;
       }

       void main() {
         ivec2 coords = getOutputCoords();
         int batch = coords[0];
         int valueIndex = coords[1];

         float value = getValues(batch, valueIndex);

         setOutput(float(findBound(batch, value)));
       }
     `}};function bq(r){let{inputs:t,backend:e,attrs:o}=r,{sortedSequence:n,values:s}=t,{side:i}=o,l=new ff(n.shape[0],n.shape[1],s.shape[1],i),u=[[n.shape[1]]];return e.runWebGLProgram(l,[n,s],"int32",u)}var NA={kernelName:Ga,backendName:"webgl",kernelFunc:bq};var hf=class{constructor(t,e,o){this.variableNames=["c","a","b"],this.outputShape=e;let n,s;if(o>4)throw Error(`Where for rank ${o} is not yet supported`);if(o===1)s="resRC",n="resRC";else{let l=["resRC.x","resRC.y","resRC.z","resRC.w"],u=[],a=[];for(let c=0;c<e.length;c++)a.push(`${l[c]}`),c<t&&u.push(`${l[c]}`);n=u.join(),s=a.join()}let i=kt(o);this.userCode=`
      void main() {
        ${i} resRC = getOutputCoords();
        float cVal = getC(${n});
        if (cVal >= 1.0) {
          setOutput(getA(${s}));
        } else {
          setOutput(getB(${s}));
        }
      }
    `}};function yq(r){let{inputs:t,backend:e}=r,{condition:o,t:n,e:s}=t,i=new hf(o.shape.length,n.shape,n.shape.length);return e.runWebGLProgram(i,[o,n,s],be(n.dtype,s.dtype))}var AA={kernelName:Ws,backendName:"webgl",kernelFunc:yq};var Cq=`
  // Stable and Attracting Fixed Point (0, 1) for Normalized Weights.
  // see: https://arxiv.org/abs/1706.02515
  float scaleAlpha = ${w.SELU_SCALEALPHA};
  float scale = ${w.SELU_SCALE};
  return (x >= 0.0) ? scale * x : scaleAlpha * (exp(x) - 1.0);
`,Iq=pt({opSnippet:Cq}),EA={kernelName:Yn,backendName:"webgl",kernelFunc:Iq};var wq=zr+`
  return 1.0 / (1.0 + exp(-1.0 * x));
`,vq=`
  vec4 result = 1.0 / (1.0 + exp(-1.0 * x));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,Sq=pt({opSnippet:wq,packedOpSnippet:vq,cpuKernelImpl:s_}),RA={kernelName:ts,backendName:"webgl",kernelFunc:Sq};var kq=`
  if (isnan(x)) { return 0.0; }
  return sign(x);
`,Tq=pt({opSnippet:kq}),DA={kernelName:Jn,backendName:"webgl",kernelFunc:Tq};var _q=zr+`
  return sin(x);
`,Nq=`
  vec4 result = sin(x);
  bvec4 isNaN = isnan(x);
  ${Ir}
  return result;
`,Aq=pt({opSnippet:_q,packedOpSnippet:Nq}),FA={kernelName:Zn,backendName:"webgl",kernelFunc:Aq};var Eq=`
  float e2x = exp(x);
  return (e2x - 1.0 / e2x) / 2.0;
`,Rq=pt({opSnippet:Eq}),$A={kernelName:Qn,backendName:"webgl",kernelFunc:Rq};var Dq=`
  float epsilon = 1.1920928955078125e-7;
  float threshold = log(epsilon) + 2.0;

  bool too_large = x > -threshold;
  bool too_small = x < threshold;

  float result;
  float exp_x = exp(x);

  if (too_large){
    result = x;
  }
  else if (too_small){
    result = exp_x;
  }
  else{
    result = log(exp_x + 1.0);
  }
  return result;
`,Fq=pt({opSnippet:Dq}),MA={kernelName:es,backendName:"webgl",kernelFunc:Fq};var $q=r=>{let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{blockShape:s,paddings:i}=o;b.assert(n.shape.length<=4,()=>"spaceToBatchND for rank > 4 with a WebGL backend not implemented yet");let l=s.reduce((x,y)=>x*y),u=[[0,0]];u.push(...i);for(let x=1+s.length;x<n.shape.length;++x)u.push([0,0]);let a=[],c=wC({inputs:{x:n},backend:e,attrs:{paddings:u,constantValue:0}}),p=w.getReshaped(c.shape,s,l,!1),m=w.getPermuted(p.length,s.length,!1),d=w.getReshapedPermuted(c.shape,s,l,!1),f=Z({inputs:{x:c},backend:e,attrs:{shape:p}}),h=te({inputs:{x:f},backend:e,attrs:{perm:m}}),g=Z({inputs:{x:h},backend:e,attrs:{shape:d}});return a.push(c),a.push(f),a.push(h),a.forEach(x=>e.disposeIntermediateTensorInfo(x)),g},PA={kernelName:Hs,backendName:"webgl",kernelFunc:$q};function Mq(r){let{inputs:t,backend:e}=r,{indices:o,values:n,denseShape:s,defaultValue:i}=t;if(s.shape.length!==1)throw new Error(`Dense shape must be a vector, saw:
         ${s.shape}`);if(o.shape.length!==2)throw new Error(`Indices must be a matrix, saw:
         ${o.shape}`);if(n.shape.length!==1)throw new Error(`Values must be a vector, saw:
         ${n.shape}`);if(i.shape.length!==0)throw new Error(`Default value must be a scalar, saw:
        ${i.shape}`);let l=e.readSync(o.dataId),u=e.readSync(n.dataId),a=e.readSync(s.dataId),c=e.readSync(i.dataId)[0],[p,m,d,f,h]=i_(l,o.shape,o.dtype,u,n.dtype,a,c);return[e.makeTensorInfo(m,o.dtype,p),e.makeTensorInfo([m[0]],n.dtype,d),e.makeTensorInfo([f.length],"bool",new Uint8Array(f.map(g=>Number(g)))),e.makeTensorInfo([h.length],o.dtype,new Int32Array(h))]}var OA={kernelName:Sl,backendName:"webgl",kernelFunc:Mq};function Pq(r){let{inputs:t,backend:e}=r,{inputIndices:o,inputShape:n,newShape:s}=t;if(o.shape.length!==2)throw new Error(`Input indices should be a matrix but received shape ${o.shape}`);if(n.shape.length!==1)throw new Error(`Input shape should be a vector but received shape ${n.shape}`);if(s.shape.length!==1)throw new Error(`Target shape should be a vector but received shape ${s.shape}`);let i=Array.from(e.readSync(n.dataId)),l=e.readSync(o.dataId),u=Array.from(e.readSync(s.dataId)),[a,c,p]=l_(l,o.shape,o.dtype,i,u);return[e.makeTensorInfo(c,o.dtype,a),e.makeTensorInfo([p.length],s.dtype,new Int32Array(p))]}var BA={kernelName:Va,backendName:"webgl",kernelFunc:Pq};function Oq(r){let{inputs:t,backend:e}=r,{data:o,indices:n,segmentIds:s}=t;if(o.shape.length<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(n.shape.length!==1)throw new Error(`Indices should be a vector but received shape
              ${n.shape}`);if(s.shape.length!==1)throw new Error(`Segment ids should be a vector but received shape
              ${s.shape}`);let i=e.readSync(o.dataId),l=e.readSync(n.dataId),u=e.readSync(s.dataId),[a,c]=Xm(i,o.shape,o.dtype,l,u,!0);return e.makeTensorInfo(c,o.dtype,a)}var LA={kernelName:kl,backendName:"webgl",kernelFunc:Oq};function Bq(r){let{inputs:t,backend:e}=r,{data:o,indices:n,segmentIds:s}=t;if(o.shape.length<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(n.shape.length!==1)throw new Error(`Indices should be a vector but received shape
             ${n.shape}`);if(s.shape.length!==1)throw new Error(`Segment ids should be a vector but received shape
             ${s.shape}`);let i=e.readSync(o.dataId),l=e.readSync(n.dataId),u=e.readSync(s.dataId),[a,c]=Xm(i,o.shape,o.dtype,l,u);return e.makeTensorInfo(c,o.dtype,a)}var UA={kernelName:Tl,backendName:"webgl",kernelFunc:Bq};function Lq(r){let{inputs:t,backend:e,attrs:o}=r,{sparseIndices:n,sparseValues:s,defaultValue:i}=t,{outputShape:l}=o,{sliceRank:u,numUpdates:a,sliceSize:c,strides:p,outputSize:m}=w.calculateShapes(s,n,l),d=!1;if(s.dtype==="string"){let x=e.bufferSync(n),y=e.bufferSync(s),C=b.decodeString(e.readSync(i.dataId)[0]),I=n_(x,y,l,m,c,a,u,p,C,d);return e.makeTensorInfo(l,I.dtype,I.values)}let f=new pa(a,u,n.shape.length,s.shape.length,p,[m,1],d),h=e.runWebGLProgram(f,[s,n,i],s.dtype),g=Z({inputs:{x:h},backend:e,attrs:{shape:l}});return e.disposeIntermediateTensorInfo(h),g}var GA={kernelName:Wa,backendName:"webgl",kernelFunc:Lq};function Uq(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{numOrSizeSplits:s,axis:i}=o,l=b.parseAxisParam(i,n.shape)[0],u=w.prepareSplitSize(n,s,l),a=n.shape.length,c=new Array(a).fill(0),p=n.shape.slice();return u.map(m=>{let d=[...p];d[l]=m;let f=lo({inputs:{x:n},backend:e,attrs:{begin:c,size:d}});return c[l]+=m,f})}var VA={kernelName:Ks,backendName:"webgl",kernelFunc:Uq};var WA="return sqrt(x);",Gq=pt({opSnippet:WA,packedOpSnippet:WA,cpuKernelImpl:u_}),zA={kernelName:rs,backendName:"webgl",kernelFunc:Gq};var Vq="return x * x;",Wq=pt({opSnippet:Vq}),HA={kernelName:_l,backendName:"webgl",kernelFunc:Wq};var KA="return (a - b) * (a - b);",zq=Ht({opSnippet:KA,packedOpSnippet:KA}),qA={kernelName:ss,backendName:"webgl",kernelFunc:zq};function Hq(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t;if(n.dtype!=="string")throw new Error("Input must be of datatype string");let s=e.readSync(n.dataId),i=w.fromUint8ToStringArray(s),l=c_(i,"string",o);return e.makeTensorInfo(n.shape,"string",l)}var jA={kernelName:Bu,backendName:"webgl",kernelFunc:Hq};function Kq({inputs:r,attrs:t,backend:e}){let{x:o}=r,n=we+`
    return x > 0.0 ? 1.0 : float(${t.alpha});
  `,s=new $e(o.shape,n);return e.runWebGLProgram(s,[o],o.dtype)}var XA={kernelName:bo,backendName:"webgl",kernelFunc:Kq};var gf=class{constructor(t,e,o){this.variableNames=["x"],this.outputShape=o;let n=o.length,s=kt(o.length),i=kt(o.length),l="";if(n===1)l="coords * strides + begin";else{let u=0;l=o.map((a,c)=>(u++,o.length===1?`coords * strides[${c}] + begin[${c}]`:`coords[${u-1}] * strides[${c}] + begin[${c}]`)).join(",")}this.userCode=`
      ${s} begin = ${s}(${t});
      ${s} strides = ${s}(${e});

      void main() {
        ${i} coords = getOutputCoords();
        setOutput(getX(${l}));
      }
    `}};function qq(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{begin:s,end:i,strides:l,beginMask:u,endMask:a,ellipsisMask:c,newAxisMask:p,shrinkAxisMask:m}=o,{finalShapeSparse:d,finalShape:f,isIdentity:h,sliceDim0:g,isSimpleSlice:x,begin:y,end:C,strides:I}=oe.sliceInfo(n.shape,s,i,l,u,a,c,p,m),v;if(h)v=Z({inputs:{x:n},backend:e,attrs:{shape:f}});else if(g||x){b.assert(n.shape.length>=1,()=>`Input must have rank at least 1, got: ${n.shape.length}`);let k=oe.computeOutShape(y,C,I),A=lo({inputs:{x:n},backend:e,attrs:{begin:y,size:k}});v=Z({inputs:{x:A},backend:e,attrs:{shape:f}}),e.disposeIntermediateTensorInfo(A)}else if(e.shouldExecuteOnCPU([n])){let A=e.readSync(n.dataId),D=gt(n.shape,n.dtype,A),F=p_(d,D,I,y);v=e.makeTensorInfo(f,n.dtype,F.values)}else{let A=new gf(y,I,d);v=e.runWebGLProgram(A,[n],n.dtype)}let S=Z({inputs:{x:v},backend:e,attrs:{shape:f}});return e.disposeIntermediateTensorInfo(v),S}var YA={kernelName:as,backendName:"webgl",kernelFunc:qq};function jq(r){let{inputs:t,backend:e,attrs:o}=r,{separator:n,nGramWidths:s,leftPad:i,rightPad:l,padWidth:u,preserveShortSequences:a}=o,{data:c,dataSplits:p}=t,m=e.readSync(c.dataId),d=e.readSync(p.dataId),[f,h]=m_(m,d,n,s,i,l,u,a);return[e.makeTensorInfo([f.length],"string",f),e.makeTensorInfo(p.shape,"int32",h)]}var ZA={kernelName:Nl,backendName:"webgl",kernelFunc:jq};function Xq(r){let{inputs:t,backend:e,attrs:o}=r,{skipEmpty:n}=o,{input:s,delimiter:i}=t;if(s.dtype!=="string")throw new Error("Input must be of datatype string");if(s.shape.length!==1)throw new Error(`Input must be a vector, got shape: ${s.shape}`);if(i.shape.length!==0)throw new Error(`Delimiter must be a scalar, got shape: ${i.shape}`);let l=e.readSync(s.dataId),u=e.readSync(i.dataId)[0],[a,c,p]=d_(l,u,n),m=c.length;return[e.makeTensorInfo([m,2],"int32",a),e.makeTensorInfo([m],"string",c),e.makeTensorInfo([2],"int32",new Int32Array(p))]}var QA={kernelName:Al,backendName:"webgl",kernelFunc:Xq};function Yq(r){let{inputs:t,backend:e,attrs:o}=r,{numBuckets:n}=o,{input:s}=t;if(s.dtype!=="string")throw new Error("Input must be of datatype string");if(n<=0)throw new Error("Number of buckets must be at least 1");let i=e.readSync(s.dataId),l=f_(i,n);return e.makeTensorInfo(s.shape,"int32",l)}var JA={kernelName:El,backendName:"webgl",kernelFunc:Yq};var Zq="return tan(x);",Qq=pt({opSnippet:Zq}),tE={kernelName:ls,backendName:"webgl",kernelFunc:Qq};var Jq=`
  float e2x = exp(-2.0 * abs(x));
  return sign(x) * (1.0 - e2x) / (1.0 + e2x);
`,t6=pt({opSnippet:Jq}),eE={kernelName:us,backendName:"webgl",kernelFunc:t6};function e6(r){let{inputs:t,backend:e,attrs:o}=r,{tensor:n,indices:s,updates:i}=t,{}=o,{sliceRank:l,numUpdates:u,sliceSize:a,strides:c,outputSize:p}=w.calculateShapes(i,s,n.shape),m=[p/a,a];if(p===0)return e.makeTensorInfo(n.shape,s.dtype);let d=Z({inputs:{x:s},backend:e,attrs:{shape:[u,l]}}),f=Z({inputs:{x:i},backend:e,attrs:{shape:[u,a]}}),h=Z({inputs:{x:n},backend:e,attrs:{shape:m}}),g=new pa(u,l,d.shape.length,f.shape.length,c,m,!1,!0),x=e.runWebGLProgram(g,[f,d,h],h.dtype),y=Z({inputs:{x},backend:e,attrs:{shape:n.shape}});return e.disposeIntermediateTensorInfo(d),e.disposeIntermediateTensorInfo(f),e.disposeIntermediateTensorInfo(h),e.disposeIntermediateTensorInfo(x),y}var rE={kernelName:Ua,backendName:"webgl",kernelFunc:e6};var xf=class{constructor(t,e){this.variableNames=["A"];let o=new Array(t.length);for(let i=0;i<o.length;i++)o[i]=t[i]*e[i];this.outputShape=o,this.rank=o.length;let n=kt(this.rank),s=r6(t);this.userCode=`
      void main() {
        ${n} resRC = getOutputCoords();
        setOutput(getA(${s}));
      }
    `}};function r6(r){let t=r.length;if(t>5)throw Error(`Tile for rank ${t} is not yet supported`);if(t===1)return`imod(resRC, ${r[0]})`;let e=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u"],o=[];for(let n=0;n<r.length;n++)o.push(`imod(${e[n]}, ${r[n]})`);return o.join()}function SC(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{reps:s}=o;if(n.dtype==="string"||n.shape.length>5){let u=e.readSync(n.dataId),a=n.dtype==="string"?u.map(m=>b.decodeString(m)):u,c=gt(n.shape,n.dtype,a),p=g_(c,s);return e.makeTensorInfo(p.shape,p.dtype,p.values)}let i=new xf(n.shape,s);return e.runWebGLProgram(i,[n],n.dtype)}var oE={kernelName:Qr,backendName:"webgl",kernelFunc:SC};var bf=class{constructor(t){this.variableNames=["x","indices"],this.customUniforms=[{name:"n",type:"int"},{name:"firstPass",type:"int"},{name:"negativeInf",type:"float"},{name:"dir",type:"int"},{name:"inc",type:"int"}],this.outputShape=t,this.userCode=`
       void main() {
         ivec2 coords = getOutputCoords();
         int batch = coords[0];
         int elemIdx = coords[1];

         // We compare elements pair-wise within a group of size 2 * inc.
         // The comparing rule for each group alternates between ascending
         // and descending. Within each group, we compare each pair at
         // positions i and i+inc. To decide whether an element at position i
         // is x0 or x1, we mod it by 2 * inc, if the result is smaller than
         // inc, it is in the first half of the group, we denote it as x0,
         // otherwise we denote it as x1.
         // For example, as shown in the Bitonic top K paper referenced above,
         // Figure5(a) shows that element[1] is in the
         // second half of the group when group size is 2, but it is in the
         // first half of the group when group size is 4.

         bool isFirstInPair = imod(elemIdx, 2 * inc) < inc;
         int i = isFirstInPair ? elemIdx : elemIdx - inc;

         int i0 = firstPass == 1 ? i : int(getIndices(batch, i));
         int i1 = firstPass == 1 ? i + inc : int(getIndices(batch, i + inc));
         float x0 = i0 < n ? getX(batch, i0) : negativeInf;
         float x1 = i1 < n ? getX(batch, i1) : negativeInf;

         // Denotes which direction indices are in (ascending or descending).
         bool reverse = imod(elemIdx, 2 * dir) >= dir;
         bool isGreater = x0 > x1 || (x0 == x1 && i1 > i0);
         if (reverse == isGreater) { // Elements in opposite order of direction
           int iTemp = i0;
           i0 = i1;
           i1 = iTemp;
         }
         if (isFirstInPair) {
            setOutput(float(i0));
         } else {
            setOutput(float(i1));
         }
       }
     `}},yf=class{constructor(t){this.variableNames=["x","indices"],this.customUniforms=[{name:"n",type:"int"},{name:"firstPass",type:"int"},{name:"k",type:"int"}],this.outputShape=t,this.userCode=`
    void main() {
         // Takes max of indices (0, k), (1, k + 1), (2, k + 2) ...
         ivec2 coords = getOutputCoords();
         int batch = coords[0];
         int elemIdx = coords[1];

         // The output size is half of the previous size.
         // If the previous sequence is | | | | _ _ _ _  | | | |  _ _ _ _ (k=4),
         // we only need to output the indices at positions |, the indices at
         // positions _ can be thrown away, see Figure5(b) After Phase 2
         // (Merge phase) in the Bitonic Top K paper referenced above.
         // For example, the paper shows we only need to output the orange bars.
         // The output sequence should look like this | | | | | | | |.
         // Because the sequence is halved, to map the output index back
         // to the previous sequence to find the corresponding value,
         // we need to double the index. When we double the index,
         // we basically interpolate a position, so 2i looks like
         // | _ | _ | _ | _ | _ | _ | _. We move the | to the first k position
         // of each 2k positions by - elemIdx % k. E.g. for output at
         // index 4,5,6,7, we want to get the corresponding element at
         // original index 8,9,10,11, for output at index 8,9,10,11,
         // we want to get the corresponding element at original index
         // 16,17,18,19, so on and so forth.

         int i = elemIdx < k ? elemIdx : (elemIdx * 2 - imod(elemIdx, k));
         int i0 = firstPass == 1 ? i : int(getIndices(batch, i));
         int i1 = firstPass == 1 ? i + k : int(getIndices(batch, i + k));

         float x0 = getX(batch, i0);
         float x1 = i1 < n ? getX(batch, i1) : x0;

         setOutput(x0 >= x1 ? float(i0) : float(i1));
       }
     `}};function Di(r,t){t!==null&&r.disposeIntermediateTensorInfo(t)}function nE(r){let t=1;for(;t<r;)t*=2;return t}function o6(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{k:s,sorted:i}=o,l=$().getNumber("TOPK_LAST_DIM_CPU_HANDOFF_SIZE_THRESHOLD"),u=$().getNumber("TOPK_K_CPU_HANDOFF_THRESHOLD"),a=n.shape,c=a[a.length-1];if(e.shouldExecuteOnCPU([n])||c<l||s>u){let F=e.readSync(n.dataId),[M,B]=x_(F,a,n.dtype,s,i);return[e.makeTensorInfo(M.shape,M.dtype,M.values),e.makeTensorInfo(B.shape,B.dtype,B.values)]}if(s===0)return a[a.length-1]=0,[e.makeTensorInfo(a,n.dtype,[]),e.makeTensorInfo(a,"int32",[])];if(c===1)return[n,vs({attrs:{shape:a,dtype:"int32",value:0},backend:e})];let p=e.texData.get(n.dataId),m=p!==null&&p.isPacked,d=m?e.unpackTensor(n):n,h=b.sizeFromShape(a)/c,g=Z({inputs:{x:d},attrs:{shape:[h,c]},backend:e});m&&Di(e,d);let x=nE(s),y=nE(c),C=null,I=()=>C===null?[g,g]:[g,C],v=(F,M,B)=>{let U=I(),P=new bf(B),z=[[c],[C===null?1:0],[Number.NEGATIVE_INFINITY],[F],[M]],V=C;C=e.runWebGLProgram(P,U,"int32",z),Di(e,V)};for(let F=1;F<x;F*=2){let M=F*2;for(let B=F;B>=1;B/=2)v(M,B,[h,y])}for(let F=y;F>x;F/=2){let M=I(),B=new yf([h,F/2]),P=[[c],[C===null?1:0],[x]],L=C;C=e.runWebGLProgram(B,M,"int32",P),Di(e,L);let z=x/2,V=z*2;for(let W=z;W>=1;W/=2)v(V,W,C.shape)}let S=C;C=lo({inputs:{x:C},backend:e,attrs:{begin:0,size:[h,s]}}),Di(e,S);let k=xC({inputs:{x:g,indices:C},backend:e,attrs:{axis:1,batchDims:1}});Di(e,g);let A=a.slice(0,-1);A.push(s),S=C,C=Z({inputs:{x:C},attrs:{shape:A},backend:e}),Di(e,S);let D=k;return k=Z({inputs:{x:k},attrs:{shape:A},backend:e}),Di(e,D),[k,C]}var sE={kernelName:cs,backendName:"webgl",kernelFunc:o6};var Cf=class{constructor(t,e,o,n,s,i){this.variableNames=["Image","Transforms"],this.outputShape=i;let l=o==="nearest"?1:2,u;switch(n){case"constant":u=1;break;case"reflect":u=2;break;case"wrap":u=3;break;case"nearest":u=4;break;default:u=1;break}this.userCode=`
            float mapCoord(float outCoord, float len) {
              float inCoord = outCoord;
              if(${u} == 2) {
                if (inCoord < 0.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz2 = 2.0 * len;
                    if (inCoord < sz2) {
                      inCoord = sz2 * float(int(float(-inCoord / sz2))) +
                      inCoord;
                    }
                    inCoord = inCoord < -len ? inCoord + sz2 : -inCoord - 1.0;
                  }
                } else if (inCoord > len - 1.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz2 = 2.0 * len;
                    inCoord -= sz2 * float(int(float(inCoord / sz2)));
                    if (inCoord >= len) {
                      inCoord = sz2 - inCoord - 1.0;
                    }
                  }
                }
                return clamp(inCoord, 0.0, len - 1.0);
              } else if (${u} == 3) {
                if (inCoord < 0.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz = len - 1.0;
                    inCoord += len * (float(int(float(-inCoord / sz))) + 1.0);
                  }
                } else if (inCoord > len - 1.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz = len - 1.0;
                    inCoord -= len * float(int(float(inCoord / sz)));
                  }
                }
                return clamp(inCoord, 0.0, len - 1.0);
              } else if (${u} == 4) {
                return clamp(outCoord, 0.0, len - 1.0);
              } else {
                return outCoord;
              }
            }

            float readWithFillValue(int batch, int coordY, int coordX,
              int channel) {
              float outputValue;
              if (0 <= coordY && coordY < ${t} && 0 <= coordX && coordX < ${e}) {
                  outputValue = getImage(batch, coordY, coordX, channel);
              } else {
                outputValue = float(${s});
              }
              return outputValue;
            }

            void main() {
              ivec4 coords = getOutputCoords();
              float outputValue;
              int batch = coords[0];
              int x = coords[2];
              int y = coords[1];
              int channel = coords[3];
              float xf = float(x);
              float yf = float(y);
              float a1 = getTransforms(batch, 0);
              float a2 = getTransforms(batch, 1);
              float a3 = getTransforms(batch, 2);
              float b1 = getTransforms(batch, 3);
              float b2 = getTransforms(batch, 4);
              float b3 = getTransforms(batch, 5);
              float c1 = getTransforms(batch, 6);
              float c2 = getTransforms(batch, 7);
              float projection = c1 * xf + c2 * yf + 1.0;
              if (projection == 0.0) {
                outputValue = float(${s});
              } else {
                float inX = (a1 * xf + a2 * yf + a3) / projection;
                float inY = (b1 * xf + b2 * yf + b3) / projection;
                float mapX = mapCoord(inX, float(${e}));
                float mapY = mapCoord(inY, float(${t}));

                if (${l} == 1) {
                  int coordY = int(round(mapY));
                  int coordX = int(round(mapX));
                  outputValue = readWithFillValue(batch, coordY, coordX,
                    channel);
                } else {
                  float yFloor = floor(mapY);
                  float xFloor = floor(mapX);
                  float yCeil = yFloor + 1.0;
                  float xCeil = xFloor + 1.0;
                  float valueYFloor = (xCeil - mapX) *
                  readWithFillValue(batch, int(yFloor), int(xFloor), channel) +
                  (mapX - xFloor) *
                  readWithFillValue(batch, int(yFloor), int(xCeil), channel);
                  float valueYCeil = (xCeil - mapX) *
                  readWithFillValue(batch, int(yCeil), int(xFloor), channel) +
                  (mapX - xFloor) *
                  readWithFillValue(batch, int(yCeil), int(xCeil), channel);
                  outputValue = (yCeil - mapY) * valueYFloor +
                  (mapY - yFloor) * valueYCeil;
                }
              }
              setOutput(outputValue);
            }
        `}};function n6(r){let{inputs:t,backend:e,attrs:o}=r,{image:n,transforms:s}=t,{interpolation:i,fillMode:l,fillValue:u,outputShape:a}=o,[c,p,m,d]=n.shape,[f,h]=a??[p,m],g=[c,f,h,d],x=new Cf(p,m,i,l,u,g);return e.runWebGLProgram(x,[n,s],"float32")}var aE={kernelName:za,backendName:"webgl",kernelFunc:n6};function s6(r){let{inputs:t,attrs:e,backend:o}=r,{axis:n}=e,{x:s}=t;ko(s,"unique"),console.warn("WARNING: ","UI might be locked temporarily as data is being downloaded");let i=o.readSync(s.dataId),{outputValues:l,outputShape:u,indices:a}=b_(i,n,s.shape,s.dtype);return[o.makeTensorInfo(u,s.dtype,l),o.makeTensorInfo([a.length],"int32",a)]}var iE={kernelName:qs,backendName:"webgl",kernelFunc:s6};function a6(r){let{inputs:t,backend:e,attrs:o}=r,{value:n}=t,{axis:s}=o;s<0&&(s+=n.shape.length);let i=n,l=i.shape.length,u=n.shape[s],a=new Array(l-1),c=0;for(let h=0;h<l;h++)h!==s&&(a[c++]=i.shape[h]);let p=[],m=new Array(l).fill(0),d=i.shape.slice();d[s]=1;let f=new Array(u);for(let h=0;h<f.length;h++){m[s]=h;let g=lo({inputs:{x:i},backend:e,attrs:{begin:m,size:d}}),x=Z({inputs:{x:g},backend:e,attrs:{shape:a}});f[h]=x,p.push(g)}return p.forEach(h=>e.disposeIntermediateTensorInfo(h)),f}var lE={kernelName:js,backendName:"webgl",kernelFunc:a6};var If=class{constructor(t,e){this.variableNames=["x","segmentIds"];let o=t.windowSize,n=t.batchSize,s=t.inSize,i=t.numSegments,l=i*Math.ceil(s/o);this.outputShape=[n,l];let u="0.0",a="sumValue",c=Math.floor(o/4)*4,p=o%4,m=`
        sumValue += dot(values, segFilter);
    `,d="";s%o>0&&(d=`
        if (inIdx < 0 || inIdx >= ${s}) {
          return initializationValue;
        }
      `);let f="";s%o>0&&(f=`
        if (inIdx < 0 || inIdx >= ${s}) {
          return -1.0;
        }
      `),this.userCode=`
      const float initializationValue = ${u};

      float getValue(int batch, int inIdx) {
        ${d}
        return getX(batch, inIdx);
      }

      float getSegmentIdAtIndex(int inIdx) {
        ${f}
        return getSegmentIds(inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = int(floor(float(outIdx) / float(
          ${i})) * float(${o}));
        int currentSeg = int(mod(float(outIdx), float(${i})));

        float sumValue = 0.0;

        for (int i = 0; i < ${c}; i += 4) {
          int inIdx = inOffset + i;
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 2)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 3)) == currentSeg ? 1 : 0
          );

          ${m}
        }

        int inIdx = inOffset + ${c};
        if (${p===1}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            initializationValue,
            initializationValue,
            initializationValue
          );

          int inIdxSeg = int(getSegmentIdAtIndex(inIdx));

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            0,
            0,
            0
          );

          ${m}
        } else if (${p===2}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            initializationValue,
            initializationValue
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
              0,
              0
          );

          ${m}
        } else if (${p===3}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            initializationValue
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 2)) == currentSeg ? 1 : 0,
            0
          );

          ${m}
        }
        setOutput(${a});
      }
    `}};function i6(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,segmentIds:s}=t,{numSegments:i}=o,l=n.shape.length,u=[],a=0,c=w.getAxesPermutation([a],l),p=n;c!=null&&(p=te({inputs:{x:n},backend:e,attrs:{perm:c}}),u.push(p),a=w.getInnerMostAxes(1,l)[0]);let m=w.segment_util.computeOutShape(p.shape,a,i),d=b.sizeFromShape([p.shape[a]]),f=Z({inputs:{x:p},backend:e,attrs:{shape:[-1,d]}});u.push(f);let h=ti(n.dtype),g=(I,v,S,k,A)=>{let D=I.shape[0],F=I.shape[1],M=w.segment_util.segOpComputeOptimalWindowSize(F,A),B={windowSize:M,inSize:F,batchSize:D,numSegments:A},U=new If(B,v),P=e.compileAndRun(U,[I,S],k);if(u.push(P),P.shape[1]===A)return P;let L=vC({backend:e,attrs:{start:0,stop:A,step:1,dtype:"float32"}}),z=SC({inputs:{x:L},backend:e,attrs:{reps:[F/M]}});return u.push(L),u.push(z),g(P,v,z,k,A)},x=g(f,"unsortedSegmentSum",s,h,i),y=Z({inputs:{x},backend:e,attrs:{shape:m}}),C=y;if(c!=null){u.push(y);let I=w.getUndoAxesPermutation(c);C=te({inputs:{x:C},backend:e,attrs:{perm:I}})}return u.forEach(I=>e.disposeIntermediateTensorInfo(I)),C}var uE={kernelName:Rl,backendName:"webgl",kernelFunc:i6};var l6=[H_,q_,j_,X_,Z_,Q_,J_,tN,oN,nN,sN,aN,iN,lN,uN,cN,pN,mN,dN,fN,hN,xN,bN,yN,CN,SN,TN,_N,M_,AN,RN,DN,FN,$N,MN,PN,ON,BN,LN,UN,WN,zN,HN,KN,qN,jN,XN,YN,ZN,QN,JN,t2,e2,r2,o2,n2,a2,i2,l2,u2,p2,m2,d2,f2,h2,g2,x2,b2,y2,$_,C2,EN,I2,w2,v2,P_,S2,k2,T2,_2,N2,A2,E2,R2,D2,F2,M2,P2,O2,B2,L2,U2,V2,z2,H2,K2,q2,j2,J2,L_,tA,eA,rA,oA,IN,nA,iA,lA,uA,cA,O_,pA,mA,dA,fA,hA,wN,X2,gA,xA,bA,G_,yA,CA,IA,wA,vA,SA,kA,TA,_A,NA,AA,EA,RA,DA,FA,$A,gN,Q2,MA,PA,OA,BA,LA,UA,GA,VA,zA,HA,qA,jA,XA,YA,ZA,QA,JA,Z2,W_,tE,eE,rE,oE,sE,aE,z_,iE,lE,uE,sA];for(let r of l6)Dl(r);var ft;(function(r){r[r.float32=0]="float32",r[r.int32=1]="int32",r[r.bool=2]="bool",r[r.string=3]="string",r[r.complex64=4]="complex64"})(ft||(ft={}));var ma;(function(r){r[r.linear=0]="linear",r[r.relu=1]="relu",r[r.relu6=2]="relu6",r[r.prelu=3]="prelu",r[r.leakyrelu=4]="leakyrelu",r[r.sigmoid=5]="sigmoid",r[r.elu=6]="elu"})(ma||(ma={}));var cE;function u6(r){cE=r.wasm.cwrap(Ka,null,["number","array","number","number","array","number","number","number","number","number","number","number","number"])}function c6(r){let{inputs:t,backend:e,attrs:o}=r,{a:n,b:s,bias:i,preluActivationWeights:l}=t;if(n.dtype!=="float32"||s.dtype!=="float32")throw new Error("_FusedMatMul for non non-float32 tensors not yet supported.");let{transposeA:u,transposeB:a,activation:c,leakyreluAlpha:p}=o,m=e.dataIdMap.get(n.dataId).id,d=e.dataIdMap.get(s.dataId).id,f=0;if(i!=null){let A=e.dataIdMap.get(i.dataId);if(A.shape.length!==1)throw new Error(`_FusedMatMul only supports rank-1 bias but got rank ${A.shape.length}.`);f=A.id}let h=l==null?0:e.dataIdMap.get(l.dataId).id,g=ma[c];if(g==null)throw new Error(`${c} activation not yet supported for FusedConv2D in the wasm backend.`);let x=u?n.shape[2]:n.shape[1],y=a?s.shape[1]:s.shape[2],C=no.assertAndGetBroadcastShape(n.shape.slice(0,-2),s.shape.slice(0,-2)),I=e.makeOutput([...C,x,y],n.dtype),v=e.dataIdMap.get(I.dataId).id,S=new Uint8Array(new Int32Array(n.shape).buffer),k=new Uint8Array(new Int32Array(s.shape).buffer);return cE(m,S,n.shape.length,d,k,s.shape.length,u,a,g,f,h,p||0,v),I}var pE={kernelName:Ka,backendName:"wasm",setupFunc:u6,kernelFunc:c6};function ut(r,t){let e;function o(s){e=s.wasm.cwrap(r,null,["number","number","number"])}function n(s){let{backend:i,inputs:{x:l}}=s,u=i.dataIdMap.get(l.dataId).id,a=i.makeOutput(l.shape,t||l.dtype),c=i.dataIdMap.get(a.dataId).id;return b.sizeFromShape(a.shape)===0||e(u,ft[l.dtype],c),a}return{kernelName:r,backendName:"wasm",setupFunc:o,kernelFunc:n}}var mE=ut(Rs);var dE=ut(Po);var fE=ut(Oo);function Pt(r,t,e){let o;function n(i){o=i.wasm.cwrap(r,null,["number","array","number","number","array","number","number","number"])}function s(i){let{backend:l,inputs:u}=i,{a,b:c}=u,p=l.dataIdMap.get(a.dataId).id,m=l.dataIdMap.get(c.dataId).id,d=e??a.dtype,f=w.assertAndGetBroadcastShape(a.shape,c.shape),h=l.makeOutput(f,d);if(b.sizeFromShape(f)===0)return h;let g=new Uint8Array(new Int32Array(a.shape).buffer),x=new Uint8Array(new Int32Array(c.shape).buffer),y=l.dataIdMap.get(h.dataId).id;return o(p,g,a.shape.length,m,x,c.shape.length,ft[a.dtype],y),h}return{kernelName:r,backendName:"wasm",setupFunc:n,kernelFunc:s}}var p6=!0,hE=Pt(Zr,p6);var gE;function m6(r){gE=r.wasm.cwrap(Ia,null,["array","number","number","number"])}function d6(r){let{inputs:t,backend:e}=r,o=e.makeOutput(t[0].shape,t[0].dtype);if(b.sizeFromShape(o.shape)===0)return o;let n=t.map(l=>e.dataIdMap.get(l.dataId).id),s=new Uint8Array(new Int32Array(n).buffer),i=e.dataIdMap.get(o.dataId).id;return gE(s,n.length,ft[o.dtype],i),o}var xE={kernelName:Ia,backendName:"wasm",setupFunc:m6,kernelFunc:d6};function Fi(r){let{inputs:{x:t},backend:e}=r;if(t.dtype==="string")return jx(e.readSync(t.dataId),t.shape,t.dtype);let o=e.makeOutput(t.shape,t.dtype),n=e.typedArrayFromHeap(t);return e.typedArrayFromHeap(o).set(n),o}var bE={kernelName:xo,backendName:"wasm",kernelFunc:Fi};var yE;function f6(r){yE=r.wasm.cwrap(Jr,null,["number","array","number","number","number","array","number"])}function Fr(r){let{inputs:t,backend:e,attrs:o}=r,[n,s]=g6(t.x.shape,o.perm),i=!0;for(let f=0;f<s.length;f++)s[f]!==f&&(i=!1);let l=h6(t.x.shape,o.perm),u={dataId:t.x.dataId,shape:n,dtype:t.x.dtype};if(i){let f=Fi({inputs:t,backend:e});return f.shape=l,f}let a=e.makeOutput(l,u.dtype),c=e.dataIdMap.get(u.dataId).id,p=e.dataIdMap.get(a.dataId).id,m=new Uint8Array(new Int32Array(s).buffer),d=new Uint8Array(new Int32Array(u.shape).buffer);return yE(c,d,u.shape.length,ft[u.dtype],p,m,s.length),a}function h6(r,t){let e=new Array(r.length);for(let o=0;o<e.length;o++)e[o]=r[t[o]];return e}function g6(r,t){let e=[],o=[];for(let n=0;n<r.length;++n)r[n]!==1&&e.push(r[n]),r[t[n]]!==1&&o.push(t[n]);for(let n=0;n<o.length;++n){let s=-1;for(let i=0;i<o.length;++i)o[i]>=n&&(s===-1||o[s]>o[i])&&(s=i);o[s]=n}return[e,o]}var CE={kernelName:Jr,backendName:"wasm",kernelFunc:Fr,setupFunc:f6};function Ze(r,t,e){let o=r.shape,n=r.shape.length,s=b.parseAxisParam(t,o),i=s,l=w.getAxesPermutation(i,n),u=null,a=!1;if(l!=null){let c=new Array(n);for(let d=0;d<c.length;d++)c[d]=o[l[d]];i=w.getInnerMostAxes(i.length,n),u=Fr({inputs:{x:r},attrs:{perm:l},backend:e});let p=e.dataIdMap.get(r.dataId).id;e.dataIdMap.get(u.dataId).id!==p&&(a=!0)}return{transposed:u,originalAxes:s,axes:i,inputWasTransposed:a}}var IE;function x6(r){IE=r.wasm.cwrap(Bo,null,["number, number, number"])}function b6(r){let{backend:t,inputs:e,attrs:o}=r,{axis:n,keepDims:s}=o,{x:i}=e,u=t.dataIdMap.get(i.dataId).id,a=i,{transposed:c,axes:p,originalAxes:m,inputWasTransposed:d}=Ze(i,n,t);if(d){let C=t.dataIdMap.get(c.dataId).id;a=c,u=C}let f=a.shape.length;w.assertAxesAreInnerMostDims("all",p,f);let[h,g]=w.computeOutAndReduceShapes(a.shape,p),x=b.sizeFromShape(g),y=t.makeOutput(h,i.dtype);if(b.sizeFromShape(a.shape)!==0){let C=t.dataIdMap.get(y.dataId).id;IE(u,x,C)}if(d&&t.disposeData(c.dataId),s){let C=w.expandShapeToKeepDim(y.shape,m);y.shape=C}return y}var wE={kernelName:Bo,backendName:"wasm",setupFunc:x6,kernelFunc:b6};var vE;function y6(r){vE=r.wasm.cwrap(Lo,null,["number, number, number"])}function C6(r){let{backend:t,inputs:e,attrs:o}=r,{axis:n,keepDims:s}=o,{x:i}=e,u=t.dataIdMap.get(i.dataId).id,a=i,{transposed:c,axes:p,originalAxes:m,inputWasTransposed:d}=Ze(i,n,t);if(d){let C=t.dataIdMap.get(c.dataId).id;a=c,u=C}let f=a.shape.length;w.assertAxesAreInnerMostDims("any",p,f);let[h,g]=w.computeOutAndReduceShapes(a.shape,p),x=b.sizeFromShape(g),y=t.makeOutput(h,i.dtype);if(b.sizeFromShape(a.shape)!==0){let C=t.dataIdMap.get(y.dataId).id;vE(u,x,C)}if(d&&t.disposeData(c.dataId),s){let C=w.expandShapeToKeepDim(y.shape,m);y.shape=C}return y}var SE={kernelName:Lo,backendName:"wasm",setupFunc:y6,kernelFunc:C6};function wf(r){let t;function e(n){t=n.wasm.cwrap(r,null,["number","number","number","number","number"])}function o(n){let{backend:s,inputs:i,attrs:l}=n,{axis:u}=l,{x:a}=i,c=s.dataIdMap.get(a.dataId).id,p=c,m=a,{transposed:d,axes:f,inputWasTransposed:h}=Ze(a,u,s);if(h){let v=s.dataIdMap.get(d.dataId).id;v!==c&&(m=d,p=v)}let g=m.shape.slice(0,-1),x=s.makeOutput(g,"int32"),y=s.dataIdMap.get(x.dataId).id,C=b.sizeFromShape(x.shape),I=m.shape[f[0]];return t(p,ft[m.dtype],C,I,y),h&&s.disposeData(d.dataId),x}return{kernelName:r,backendName:"wasm",setupFunc:e,kernelFunc:o}}var kE=wf(Ds);var TE=wf(Fs);var _E=ut(Uo);var NE=ut(Go);var AE=ut(Vo);var EE=Pt(zo,!1);var RE=ut(Wo);var DE;function I6(r){DE=r.wasm.cwrap(Ho,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function w6(r){let{inputs:t,attrs:e,backend:o}=r,n=t.x,s=o.dataIdMap.get(n.dataId).id,{filterSize:i,strides:l,pad:u,dimRoundingMode:a}=e,c=w.computePool2DInfo(n.shape,i,l,1,u,a),p=c.filterHeight,m=c.filterWidth,d=c.padInfo.top,f=c.padInfo.right,h=c.padInfo.bottom,g=c.padInfo.left,x=c.strideHeight,y=c.strideWidth,C=c.inChannels;if(c.dataFormat!=="channelsLast")throw new Error(`wasm backend does not support dataFormat:'${c.dataFormat}'. Please use 'channelsLast'.`);if(c.dilationWidth!==1||c.dilationHeight!==1)throw new Error(`was backend only supports average pooling with dilation = [1, 1], got [${c.dilationHeight}, ${c.dilationWidth}].`);let I=o.makeOutput(c.outShape,"float32"),v=o.dataIdMap.get(I.dataId).id;return DE(s,n.shape[0],n.shape[1],n.shape[2],p,m,d,f,h,g,x,y,C,v),I}var FE={kernelName:Ho,backendName:"wasm",setupFunc:I6,kernelFunc:w6};var $E;function v6(r){$E=r.wasm.cwrap("AvgPool3D",null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function S6(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{filterSize:s,strides:i,pad:l,dimRoundingMode:u,dataFormat:a}=o,c=w.computePool3DInfo(n.shape,s,i,1,l,u,a),p=e.makeOutput(c.outShape,n.dtype);return $E(e.dataIdMap.get(n.dataId).id,e.dataIdMap.get(p.dataId).id,c.batchSize,c.inChannels,c.inDepth,c.inHeight,c.inWidth,c.outDepth,c.outHeight,c.outWidth,c.strideDepth,c.strideHeight,c.strideWidth,c.dilationDepth,c.dilationHeight,c.dilationWidth,c.effectiveFilterDepth,c.effectiveFilterHeight,c.effectiveFilterWidth,c.padInfo.front,c.padInfo.top,c.padInfo.left),p}var ME={kernelName:al,backendName:"wasm",setupFunc:v6,kernelFunc:S6};var PE;function k6(r){PE=r.wasm.cwrap("AvgPool3DGrad",null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function T6(r){let{inputs:t,backend:e,attrs:o}=r,{dy:n,input:s}=t,{filterSize:i,strides:l,pad:u,dimRoundingMode:a}=o,c=w.computePool3DInfo(s.shape,i,l,1,u,a),p=e.makeOutput(s.shape,s.dtype);return PE(e.dataIdMap.get(n.dataId).id,e.dataIdMap.get(p.dataId).id,c.batchSize,c.inChannels,c.inDepth,c.inHeight,c.inWidth,c.outDepth,c.outHeight,c.outWidth,c.strideDepth,c.strideHeight,c.strideWidth,c.dilationDepth,c.dilationHeight,c.dilationWidth,c.effectiveFilterDepth,c.effectiveFilterHeight,c.effectiveFilterWidth,c.padInfo.front,c.padInfo.top,c.padInfo.left,c.filterDepth,c.filterHeight,c.filterWidth),p}var OE={kernelName:il,backendName:"wasm",setupFunc:k6,kernelFunc:T6};var BE;function _6(r){BE=r.wasm.cwrap("AvgPoolGrad",null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function N6(r){let{inputs:t,backend:e,attrs:o}=r,{dy:n,input:s}=t,{filterSize:i,strides:l,pad:u}=o,a=w.computePool2DInfo(s.shape,i,l,1,u),c=e.makeOutput(s.shape,s.dtype);return BE(e.dataIdMap.get(n.dataId).id,e.dataIdMap.get(c.dataId).id,a.batchSize,a.inChannels,a.inHeight,a.inWidth,a.outHeight,a.outWidth,a.strideHeight,a.strideWidth,a.dilationHeight,a.dilationWidth,a.effectiveFilterHeight,a.effectiveFilterWidth,a.padInfo.top,a.padInfo.left,a.filterHeight,a.filterWidth),c}var LE={kernelName:sl,backendName:"wasm",setupFunc:_6,kernelFunc:N6};function ye(r){let{inputs:t,attrs:e}=r,{x:o}=t,{shape:n}=e,s=b.sizeFromShape(o.shape),i=b.inferFromImplicitShape(n,s);return b.assert(s===b.sizeFromShape(i),()=>`new shape: ${i}, old shape: ${o.shape}. New shape and old shape must have the same number of elements.`),r.backend.incRef(o.dataId),{dataId:o.dataId,shape:i,dtype:o.dtype}}var UE={kernelName:Vs,backendName:"wasm",kernelFunc:ye};var GE;function A6(r){GE=r.wasm.cwrap(Ko,null,["number","array","number","number","array","number","number","number","number"])}function E6(r){let{inputs:t,backend:e,attrs:o}=r,{a:n,b:s}=t,{transposeA:i,transposeB:l}=o;if(n.dtype!=="float32"||s.dtype!=="float32")throw new Error("BatchMatMul for non non-float32 tensors not yet supported.");let u=n.shape.length,a=s.shape.length,c=i?n.shape[u-2]:n.shape[u-1],p=l?s.shape[a-1]:s.shape[a-2],m=i?n.shape[u-1]:n.shape[u-2],d=l?s.shape[a-2]:s.shape[a-1],f=n.shape.slice(0,-2),h=s.shape.slice(0,-2),g=b.sizeFromShape(f),x=b.sizeFromShape(h),C=no.assertAndGetBroadcastShape(n.shape.slice(0,-2),s.shape.slice(0,-2)).concat([m,d]);b.assert(c===p,()=>`Error in matMul: inner shapes (${c}) and (${p}) of Tensors with shapes ${n.shape} and ${s.shape} and transposeA=${i} and transposeB=${l} must match.`);let I=i?[g,c,m]:[g,m,c],v=l?[x,d,p]:[x,p,d],S=ye({inputs:{x:n},backend:e,attrs:{shape:I}}),k=ye({inputs:{x:s},backend:e,attrs:{shape:v}}),A=e.dataIdMap.get(S.dataId).id,D=e.dataIdMap.get(k.dataId).id,F=i?S.shape[2]:S.shape[1],M=l?k.shape[1]:k.shape[2],B=Math.max(g,x),U=e.makeOutput([B,F,M],S.dtype),P=e.dataIdMap.get(U.dataId).id,L=new Uint8Array(new Int32Array(S.shape).buffer),z=new Uint8Array(new Int32Array(k.shape).buffer);return GE(A,L,S.shape.length,D,z,k.shape.length,i,l,P),e.disposeData(S.dataId),e.disposeData(k.dataId),U.shape=C,U}var VE={kernelName:Ko,backendName:"wasm",setupFunc:A6,kernelFunc:E6};function Hr(r){let{inputs:{x:t},attrs:{begin:e,size:o},backend:n}=r,[s,i]=oe.parseSliceParams(t,e,o),l=oe.isSliceContinous(t.shape,s,i),u=n.readSync(t.dataId),a=n.makeOutput(i,t.dtype),c=b.computeStrides(t.shape),p=n.dataIdMap.get(a.dataId);if(l){let f=oe.computeFlatOffset(s,c);return t.dtype==="string"?p.stringBytes=u.slice(f,f+b.sizeFromShape(i)):n.typedArrayFromHeap(a).set(u.subarray(f,f+b.sizeFromShape(i))),a}if(t.dtype==="string"){let f=gi(u,s,i,t.shape,t.dtype);return p.stringBytes=f,a}let m=n.typedArrayFromHeap(a),d=t.shape.length;if(d===2)R6(u,c[0],m,s,i);else if(d===3)D6(u,c[0],c[1],m,s,i);else if(d===4)F6(u,c[0],c[1],c[2],m,s,i);else{let f=gi(u,s,i,t.shape,t.dtype);m.set(f)}return a}function R6(r,t,e,o,n){let s=0,i=o[0],l=o[1],u=i+n[0];for(let a=i;a<u;a++){let c=a*t+l;e.set(r.subarray(c,c+n[1]),s),s+=n[1]}}function D6(r,t,e,o,n,s){let i=0,l=n[0],u=n[1],a=n[2],c=l+s[0],p=u+s[1];for(let m=l;m<c;m++)for(let d=u;d<p;d++){let f=m*t+d*e+a;o.set(r.subarray(f,f+s[2]),i),i+=s[2]}}function F6(r,t,e,o,n,s,i){let l=0,u=s[0],a=s[1],c=s[2],p=u+i[0],m=a+i[1],d=c+i[2],f=s[3];for(let h=u;h<p;h++)for(let g=a;g<m;g++)for(let x=c;x<d;x++){let y=h*t+g*e+x*o+f;n.set(r.subarray(y,y+i[3]),l),l+=i[3]}}var WE={kernelName:zs,backendName:"wasm",kernelFunc:Hr};function $6(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{blockShape:s,crops:i}=o,l=s.reduce((x,y)=>x*y),u=w.getReshaped(n.shape,s,l),a=w.getPermuted(u.length,s.length),c=w.getReshapedPermuted(n.shape,s,l),p=w.getSliceBeginCoords(i,s.length),m=w.getSliceSize(c,i,s.length),d=ye({inputs:{x:n},backend:e,attrs:{shape:u}}),f=Fr({inputs:{x:d},backend:e,attrs:{perm:a}}),h=ye({inputs:{x:f},backend:e,attrs:{shape:c}}),g=Hr({inputs:{x:h},backend:e,attrs:{begin:p,size:m}});return e.disposeData(d.dataId),e.disposeData(f.dataId),e.disposeData(h.dataId),g}var zE={kernelName:$s,backendName:"wasm",kernelFunc:$6};var HE;function M6(r){HE=r.wasm.cwrap(wa,null,["number","number","boolean","number","number","number"])}function P6(r){let{backend:t,inputs:e,attrs:o}=r,{x:n,weights:s}=e,{size:i}=o,l=s.shape.reduce((p,m)=>p*m,1)!==0,u=n.shape.length===1?[i]:[n.shape[0],i],a=t.makeOutput(u,s.dtype);function c(p){return t.dataIdMap.get(p.dataId).id}return HE(c(n),i,l,c(s),ft[s.dtype],c(a)),a}var KE={kernelName:wa,backendName:"wasm",setupFunc:M6,kernelFunc:P6};var O6=!0,qE=Pt(va,O6);function B6(r){let{inputs:t,backend:e}=r,{s0:o,s1:n}=t,s=e.typedArrayFromHeap(o),i=e.typedArrayFromHeap(n),l=w.assertAndGetBroadcastShape(Array.from(s),Array.from(i));return e.makeOutput([l.length],"int32",void 0,new Int32Array(l))}var jE={kernelName:ll,backendName:"wasm",kernelFunc:B6};function ir(r){let{inputs:{x:t},attrs:{dtype:e},backend:o}=r,n=o.makeOutput(t.shape,e),s=o.typedArrayFromHeap(t);return o.typedArrayFromHeap(n).set(s),n}var XE={kernelName:ho,backendName:"wasm",kernelFunc:ir};var YE=ut(qo);var ZE;function L6(r){ZE=r.wasm.cwrap(go,null,["number","number","number","number"])}function U6(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{clipValueMin:s,clipValueMax:i}=o,l=e.dataIdMap.get(n.dataId).id,u=e.makeOutput(n.shape,n.dtype),a=e.dataIdMap.get(u.dataId).id;return ZE(l,s,i,a),u}var QE={kernelName:go,backendName:"wasm",setupFunc:L6,kernelFunc:U6};function kC(r){let{inputs:t,backend:e}=r,o=b.parseAxisParam(r.attrs.axis,t[0].shape)[0],n=t.map(d=>d.shape);w.assertParamsConsistent(n,o);let s=w.computeOutShape(t.map(d=>d.shape),o),i=t.filter(d=>b.sizeFromShape(d.shape)>0);if(i.length===1)return Fi({inputs:{x:i[0]},backend:e});let l=e.makeOutput(s,t[0].dtype);if(b.sizeFromShape(s)===0)return l;if(i[0].dtype==="string"){let d=i.map(C=>{let v=[-1,b.sizeFromShape(C.shape.slice(o))];return ye({inputs:{x:C},backend:e,attrs:{shape:v}})}),f=d.map(C=>({vals:e.readSync(C.dataId),shape:C.shape}));s=w.computeOutShape(d.map(C=>C.shape),1);let h=d[0].shape[0]===1,g=di(f,s,t[0].dtype,h),x=w.computeOutShape(i.map(C=>C.shape),o);l.shape=x;let y=e.dataIdMap.get(l.dataId);return y.stringBytes=w.fromStringArrayToUint8(g),d.forEach(C=>e.disposeData(C.dataId)),l}let u=b.sizeFromShape(i[0].shape.slice(0,o)),a=0,c=i.map(d=>{let f=b.sizeFromShape(d.shape.slice(o));return a+=f,f}),p=i.map(d=>e.typedArrayFromHeap(d)),m=e.typedArrayFromHeap(l);for(let d=0;d<u;d++){let f=d*a;for(let h=0;h<p.length;h++){let g=c[h],x=d*g,y=p[h].subarray(x,x+g);m.set(y,f),f+=g}}return l}var JE={kernelName:Ms,backendName:"wasm",kernelFunc:kC};var tR;function G6(r){tR=r.wasm.cwrap(jo,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function V6(r){let{inputs:t,attrs:e,backend:o}=r,{x:n,filter:s}=t,i=o.dataIdMap.get(n.dataId).id,l=o.dataIdMap.get(s.dataId).id,{strides:u,dilations:a,pad:c,dimRoundingMode:p,dataFormat:m}=e,d=w.convertConv2DDataFormat(m),f=w.computeConv2DInfo(n.shape,s.shape,u,a,c,p,!1,d),h=f.filterHeight,g=f.filterWidth,x=f.padInfo.top,y=f.padInfo.right,C=f.padInfo.bottom,I=f.padInfo.left,v=f.dilationHeight,S=f.dilationWidth,k=f.strideHeight,A=f.strideWidth,D=f.inChannels,F=f.outChannels,M=f.padInfo.type==="SAME"?1:0;if(f.dataFormat!=="channelsLast")throw new Error(`wasm backend Conv2D does not support dataFormat:'${f.dataFormat}'. Please use 'channelsLast'.`);let B=o.makeOutput(f.outShape,"float32"),U=o.dataIdMap.get(B.dataId).id;return tR(i,n.shape[0],n.shape[1],n.shape[2],l,h,g,x,y,C,I,M,v,S,k,A,D,F,U),B}var eR={kernelName:jo,backendName:"wasm",setupFunc:G6,kernelFunc:V6};var rR;function W6(r){rR=r.wasm.cwrap(Xo,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function z6(r){let{backend:t,inputs:e,attrs:o}=r,{dy:n,filter:s}=e,{strides:i,pad:l,dataFormat:u,dimRoundingMode:a,inputShape:c}=o,p=1,m=w.convertConv2DDataFormat(u),d=w.computeConv2DInfo(c,s.shape,i,p,l,a,!1,m),{batchSize:f,filterHeight:h,filterWidth:g,inChannels:x,inHeight:y,inWidth:C,outChannels:I,outHeight:v,outWidth:S,strideHeight:k,strideWidth:A}=d,D=h-1-d.padInfo.top,F=g-1-d.padInfo.left,M=d.dataFormat==="channelsLast",B=b.computeStrides(d.inShape),U=b.computeStrides(n.shape),[P,L,z]=b.computeStrides(s.shape),V=B[0],W=M?B[1]:B[2],q=M?B[2]:1,X=M?1:B[1],J=U[0],tt=M?U[1]:U[2],Y=M?U[2]:1,Q=M?1:U[1],ot=t.makeOutput(d.inShape,"float32"),at=t.dataIdMap.get(ot.dataId).id,st=t.dataIdMap.get(n.dataId).id,mt=t.dataIdMap.get(s.dataId).id;return rR(st,mt,f,h,g,y,C,x,v,S,I,k,A,D,F,P,L,z,V,W,q,X,J,tt,Y,Q,at),ot}var oR={kernelName:Xo,backendName:"wasm",setupFunc:W6,kernelFunc:z6};var nR;function H6(r){nR=r.wasm.cwrap(Sa,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function K6(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,filter:s}=t,{strides:i,pad:l,dilations:u}=o;if(n.dtype!=="float32")throw new Error(`Tensor x must have dtype float32, got ${n.dtype}`);if(s.dtype!=="float32")throw new Error(`Tensor filter must have dtype float32, got ${s.dtype}`);let a=w.computeConv3DInfo(n.shape,s.shape,i,u,l),c=e.makeOutput(a.outShape,n.dtype);return nR(e.dataIdMap.get(n.dataId).id,e.dataIdMap.get(s.dataId).id,e.dataIdMap.get(c.dataId).id,a.batchSize,a.inDepth,a.inHeight,a.inWidth,a.inChannels,a.outDepth,a.outHeight,a.outWidth,a.outChannels,a.strideDepth,a.strideHeight,a.strideWidth,a.dilationDepth,a.dilationHeight,a.dilationWidth,a.filterDepth,a.filterHeight,a.filterWidth,a.padInfo.front,a.padInfo.top,a.padInfo.left),c}var sR={kernelName:Sa,backendName:"wasm",setupFunc:H6,kernelFunc:K6};var aR;function q6(r){aR=r.wasm.cwrap(ka,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function j6(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,dy:s}=t,{strides:i,pad:l,filterShape:u}=o;if(n.dtype!=="float32")throw new Error(`Tensor dy must have dtype float32, got ${n.dtype}`);if(s.dtype!=="float32")throw new Error(`Tensor filter must have dtype float32, got ${s.dtype}`);let a=w.computeConv3DInfo(n.shape,u,i,1,l),c=e.makeOutput(a.filterShape,s.dtype);return aR(e.dataIdMap.get(n.dataId).id,e.dataIdMap.get(s.dataId).id,e.dataIdMap.get(c.dataId).id,a.batchSize,a.inDepth,a.inHeight,a.inWidth,a.inChannels,a.outDepth,a.outHeight,a.outWidth,a.outChannels,a.strideDepth,a.strideHeight,a.strideWidth,a.dilationDepth,a.dilationHeight,a.dilationWidth,a.filterDepth,a.filterHeight,a.filterWidth,a.padInfo.front,a.padInfo.top,a.padInfo.left),c}var iR={kernelName:ka,backendName:"wasm",setupFunc:q6,kernelFunc:j6};var lR;function X6(r){lR=r.wasm.cwrap(Ta,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function Y6(r){let{inputs:t,backend:e,attrs:o}=r,{dy:n,filter:s}=t,{pad:i,strides:l,inputShape:u}=o;if(n.dtype!=="float32")throw new Error(`Tensor dy must have dtype float32, got ${n.dtype}`);if(s.dtype!=="float32")throw new Error(`Tensor filter must have dtype float32, got ${s.dtype}`);let a=w.computeConv3DInfo(u,s.shape,l,1,i),c=e.makeOutput(a.inShape,n.dtype);return lR(e.dataIdMap.get(s.dataId).id,e.dataIdMap.get(n.dataId).id,e.dataIdMap.get(c.dataId).id,a.batchSize,a.inDepth,a.inHeight,a.inWidth,a.inChannels,a.outDepth,a.outHeight,a.outWidth,a.outChannels,a.strideDepth,a.strideHeight,a.strideWidth,a.dilationDepth,a.dilationHeight,a.dilationWidth,a.filterDepth,a.filterHeight,a.filterWidth,a.padInfo.front,a.padInfo.top,a.padInfo.left),c}var uR={kernelName:Ta,backendName:"wasm",setupFunc:X6,kernelFunc:Y6};var cR=ut(Yo);var pR=ut(Zo);var TC;(function(r){r[r.bilinear=0]="bilinear",r[r.nearest=1]="nearest"})(TC||(TC={}));var mR;function Z6(r){mR=r.wasm.cwrap(_a,null,["number","number","number","number","array","number","number","number","number","number"])}function Q6(r){let{backend:t,inputs:e,attrs:o}=r,{method:n,extrapolationValue:s,cropSize:i}=o,{image:l,boxes:u,boxInd:a}=e,c=u.shape[0],[p,m]=i,d=[c,p,m,l.shape[3]],f=t.dataIdMap.get(l.dataId),h;l.dtype!=="float32"&&(h=ir({backend:t,inputs:{x:l},attrs:{dtype:"float32"}}),f=t.dataIdMap.get(h.dataId));let g=f.id,x=t.dataIdMap.get(u.dataId).id,y=t.dataIdMap.get(a.dataId).id,C=t.makeOutput(d,"float32"),I=t.dataIdMap.get(C.dataId).id,v=new Uint8Array(new Int32Array(l.shape).buffer);return mR(g,x,y,c,v,p,m,TC[n],s,I),h!=null&&t.disposeData(h.dataId),C}var dR={kernelName:_a,backendName:"wasm",setupFunc:Z6,kernelFunc:Q6};var fR;function J6(r){fR=r.wasm.cwrap(Qo,null,["number","number","number","number","number","number"])}function t8(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s,exclusive:i,reverse:l}=o,u=n.shape.length;b.assert(n.dtype==="float32"||n.dtype==="int32",()=>`cumprod does not support ${n.dtype} tensors in the WASM backend`);let a=w.getAxesPermutation([s],u),c=n;a!==null&&(c=Fr({inputs:{x:n},attrs:{perm:a},backend:e}));let p=w.getInnerMostAxes(1,u)[0];w.assertAxesAreInnerMostDims("cumprod",[p],u);let m=e.makeOutput(c.shape,c.dtype),d=c.shape[p],f=e.dataIdMap.get(c.dataId).id,h=e.dataIdMap.get(m.dataId).id;fR(f,i?1:0,l?1:0,d,h,ft[n.dtype]);let g=m;if(a!==null){let x=w.getUndoAxesPermutation(a);g=Fr({inputs:{x:m},attrs:{perm:x},backend:e}),e.disposeData(c.dataId),e.disposeData(m.dataId)}return g}var hR={kernelName:Qo,backendName:"wasm",setupFunc:J6,kernelFunc:t8};var gR;function e8(r){gR=r.wasm.cwrap(Jo,null,["number","number","number","number","number","number"])}function r8(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s,exclusive:i,reverse:l}=o,u=n.shape.length;b.assert(n.dtype==="float32"||n.dtype==="int32",()=>`cumsum does not support ${n.dtype} tensors in the WASM backend`);let a=w.getAxesPermutation([s],u),c=n;a!==null&&(c=Fr({inputs:{x:n},attrs:{perm:a},backend:e}));let p=w.getInnerMostAxes(1,u)[0];w.assertAxesAreInnerMostDims("cumsum",[p],u);let m=e.makeOutput(c.shape,c.dtype),d=c.shape[p],f=e.dataIdMap.get(c.dataId).id,h=e.dataIdMap.get(m.dataId).id;gR(f,i?1:0,l?1:0,d,h,ft[n.dtype]);let g=m;if(a!==null){let x=w.getUndoAxesPermutation(a);g=Fr({inputs:{x:m},attrs:{perm:x},backend:e}),e.disposeData(c.dataId),e.disposeData(m.dataId)}return g}var xR={kernelName:Jo,backendName:"wasm",setupFunc:e8,kernelFunc:r8};var bR;function o8(r){bR=r.wasm.cwrap("DenseBincount",null,["number","array","number","number","boolean","number","number","boolean","number"])}function n8(r){let{backend:t,inputs:e,attrs:o}=r,{x:n,weights:s}=e,{size:i,binaryOutput:l}=o,u=s.shape.reduce((m,d)=>m*d,1)!==0,a=n.shape.length===1?[i]:[n.shape[0],i],c=t.makeOutput(a,s.dtype);function p(m){return t.dataIdMap.get(m.dataId).id}return bR(p(n),new Uint8Array(new Int32Array(n.shape).buffer),n.shape.length,i,u,p(s),ft[s.dtype],l,p(c)),c}var yR={kernelName:pl,backendName:"wasm",setupFunc:o8,kernelFunc:n8};var CR;function s8(r){CR=r.wasm.cwrap(tn,null,["number","number","number","array","number","array","array","number","number"])}function a8(r){let{backend:t,inputs:e,attrs:o}=r,{x:n}=e,{blockSize:s,dataFormat:i}=o,l=n.shape[0],u=i==="NHWC"?n.shape[1]:n.shape[2],a=i==="NHWC"?n.shape[2]:n.shape[3],c=i==="NHWC"?n.shape[3]:n.shape[1],p=u*s,m=a*s,d=c/(s*s),f=i==="NHWC"?[l,p,m,d]:[l,d,p,m],h=t.makeOutput(f,"float32"),x=t.dataIdMap.get(n.dataId).id,y=new Uint8Array(new Int32Array(b.computeStrides(n.shape)).buffer),C=new Uint8Array(new Int32Array(f).buffer),I=new Uint8Array(new Int32Array(b.computeStrides(f)).buffer),v=t.dataIdMap.get(h.dataId).id;return CR(x,s,i==="NHWC"?1:0,y,n.shape.length-1,C,I,f.length,v),h}var IR={kernelName:tn,backendName:"wasm",setupFunc:s8,kernelFunc:a8};var wR;function i8(r){wR=r.wasm.cwrap(en,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function l8(r){let{inputs:t,attrs:e,backend:o}=r,{x:n,filter:s}=t,i=o.dataIdMap.get(n.dataId).id,l=o.dataIdMap.get(s.dataId).id,{strides:u,dilations:a,pad:c,dimRoundingMode:p}=e,m=a??[1,1],d=w.computeConv2DInfo(n.shape,s.shape,u,m,c,p,!0),f=d.filterHeight,h=d.filterWidth,g=d.padInfo.top,x=d.padInfo.right,y=d.padInfo.bottom,C=d.padInfo.left,I=d.dilationHeight,v=d.dilationWidth,S=d.strideHeight,k=d.strideWidth,A=d.inChannels,D=d.outChannels,F=d.padInfo.type==="SAME"?1:0;if(d.dataFormat!=="channelsLast")throw new Error(`wasm backend DepthwiseConv2dNative does not support dataFormat:'${d.dataFormat}'. Please use 'channelsLast'.`);let M=o.makeOutput(d.outShape,"float32"),B=o.dataIdMap.get(M.dataId).id;return wR(i,n.shape[0],n.shape[1],n.shape[2],l,f,h,g,x,y,C,F,I,v,S,k,A,D,B),M}var vR={kernelName:en,backendName:"wasm",setupFunc:i8,kernelFunc:l8};var SR;function u8(r){SR=r.wasm.cwrap("Diag",null,["number","number","number","number"])}function c8(r){let{inputs:t,backend:e}=r,{x:o}=t,n=b.sizeFromShape(o.shape),s=e.makeOutput([...o.shape,...o.shape],o.dtype);return SR(e.dataIdMap.get(o.dataId).id,ft[o.dtype],n,e.dataIdMap.get(s.dataId).id),s}var kR={kernelName:ml,backendName:"wasm",setupFunc:u8,kernelFunc:c8};var TR;function p8(r){TR=r.wasm.cwrap(rn,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function m8(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,filter:s}=t,{strides:i,pad:l,dilations:u}=o;if(n.dtype!==s.dtype)throw new Error(`Dilation2D error: x must have the same dtype as filter. Got ${n.dtype} and ${s.dtype}`);let a=w.computeDilation2DInfo(n.shape,s.shape,i,l,"NHWC",u),c=e.makeOutput(a.outShape,n.dtype);return TR(e.dataIdMap.get(n.dataId).id,e.dataIdMap.get(s.dataId).id,e.dataIdMap.get(c.dataId).id,ft[n.dtype],a.batchSize,a.inChannels,a.inHeight,a.inWidth,a.outHeight,a.outWidth,a.strideHeight,a.strideWidth,a.dilationHeight,a.dilationWidth,a.filterHeight,a.filterWidth,a.padInfo.top,a.padInfo.left),c}var _R={kernelName:rn,backendName:"wasm",setupFunc:p8,kernelFunc:m8};var NR;function d8(r){NR=r.wasm.cwrap(fl,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function f8(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,filter:s,dy:i}=t,{strides:l,pad:u,dilations:a}=o;if(n.dtype!==s.dtype||n.dtype!==i.dtype)throw new Error(`Dilation2DBackpropFilter error: x must have the same dtype as filter and dy. Got ${n.dtype}, ${s.dtype}, and ${i.dtype}`);let c=w.computeDilation2DInfo(n.shape,s.shape,l,u,"NHWC",a),p=e.makeOutput(s.shape,s.dtype);return NR(e.dataIdMap.get(n.dataId).id,e.dataIdMap.get(s.dataId).id,e.dataIdMap.get(i.dataId).id,e.dataIdMap.get(p.dataId).id,ft[n.dtype],c.batchSize,c.inChannels,c.inHeight,c.inWidth,c.outHeight,c.outWidth,c.strideHeight,c.strideWidth,c.dilationHeight,c.dilationWidth,c.filterHeight,c.filterWidth,c.padInfo.top,c.padInfo.left),p}var AR={kernelName:fl,backendName:"wasm",setupFunc:d8,kernelFunc:f8};var ER;function h8(r){ER=r.wasm.cwrap(dl,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function g8(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,filter:s,dy:i}=t,{strides:l,pad:u,dilations:a}=o;if(n.dtype!==s.dtype||n.dtype!==i.dtype)throw new Error(`Dilation2DBackpropInput error: x must have the same dtype as filter and dy. Got ${n.dtype}, ${s.dtype}, and ${i.dtype}`);let c=w.computeDilation2DInfo(n.shape,s.shape,l,u,"NHWC",a),p=e.makeOutput(n.shape,n.dtype);return ER(e.dataIdMap.get(n.dataId).id,e.dataIdMap.get(s.dataId).id,e.dataIdMap.get(i.dataId).id,e.dataIdMap.get(p.dataId).id,ft[n.dtype],c.batchSize,c.inChannels,c.inHeight,c.inWidth,c.outHeight,c.outWidth,c.strideHeight,c.strideWidth,c.dilationHeight,c.dilationWidth,c.filterHeight,c.filterWidth,c.padInfo.top,c.padInfo.left),p}var RR={kernelName:dl,backendName:"wasm",setupFunc:h8,kernelFunc:g8};var DR=ut(nn);var FR;function x8(r){FR=r.wasm.cwrap(Na,null,["number","number","number"])}function b8(r){let{inputs:t,backend:e}=r,{dy:o,y:n}=t,s=e.makeOutput(n.shape,"float32"),i=l=>e.dataIdMap.get(l.dataId).id;return FR(i(n),i(o),i(s)),s}var $R={kernelName:Na,backendName:"wasm",setupFunc:x8,kernelFunc:b8};var y8=!1,MR=Pt(an,y8,"bool");var PR=ut(sn);var OR=ut(ln,"float32");function vf(r){let{inputs:t,attrs:e,backend:o}=r,{input:n}=t,{dim:s}=e,i=n.shape.length,l=n.shape.slice(),u=s;return s<0&&(b.assert(-(i+1)<=s,()=>`Axis must be in the interval [${-(i+1)}, ${i}]`),u=i+s+1),l.splice(u,0,1),ye({inputs:{x:n},backend:o,attrs:{shape:l}})}var BR={kernelName:Ps,backendName:"wasm",kernelFunc:vf};var LR=ut(un,"float32");function _C(r){let{attrs:{shape:t,value:e},backend:o}=r,{attrs:{dtype:n}}=r;n=n||b.inferDtype(e);let s=o.makeOutput(t,n);return o.typedArrayFromHeap(s).fill(e),s}var UR={kernelName:Os,backendName:"wasm",kernelFunc:_C};var GR;function C8(r){GR=r.wasm.cwrap(Aa,null,["number","number","number","number","number","number"])}function I8(r){let{inputs:t,backend:e}=r,{image:o}=t,n=e.makeOutput(o.shape,o.dtype),s=e.dataIdMap.get(o.dataId).id,i=e.dataIdMap.get(n.dataId).id,[l,u,a,c]=o.shape;return GR(s,l,u,a,c,i),n}var VR={kernelName:Aa,backendName:"wasm",kernelFunc:I8,setupFunc:C8};var WR=ut(cn);var w8=!1,zR=Pt(pn,w8);var HR;function v8(r){HR=r.wasm.cwrap(mn,null,["number","number","number","number","number","number","number"])}function S8(r){let{backend:t,inputs:e,attrs:o}=r,{varianceEpsilon:n}=o,{x:s,mean:i,variance:l,offset:u,scale:a}=e,c=t.dataIdMap.get(s.dataId).id,p=t.dataIdMap.get(i.dataId).id,m=t.dataIdMap.get(l.dataId).id,d=u!=null?t.dataIdMap.get(u.dataId).id:0,f=a!=null?t.dataIdMap.get(a.dataId).id:0,h=t.makeOutput(s.shape,s.dtype);if(b.sizeFromShape(s.shape)===0)return h;let g=t.dataIdMap.get(h.dataId).id;return HR(c,p,m,d,f,n,g),h}var KR={kernelName:mn,backendName:"wasm",setupFunc:v8,kernelFunc:S8};var qR;function k8(r){qR=r.wasm.cwrap(qa,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function T8(r){let{inputs:t,attrs:e,backend:o}=r,{x:n,filter:s,bias:i,preluActivationWeights:l}=t,{strides:u,pad:a,dilations:c,dataFormat:p,dimRoundingMode:m,activation:d,leakyreluAlpha:f}=e,h=w.computeConv2DInfo(n.shape,s.shape,u,c,a,m),g=ma[d];if(g==null)throw new Error(`${d} activation not yet supported for FusedConv2D in the wasm backend.`);let x=o.dataIdMap.get(n.dataId).id,y=o.dataIdMap.get(s.dataId).id,C=h.outChannels,I=0;if(i!=null){let Y=o.dataIdMap.get(i.dataId);if(Y.shape.length!==1)throw new Error(`FusedConv2D only supports rank-1 bias but got rank ${Y.shape.length}.`);if(Y.shape[0]!==C)throw new Error(`FusedConv2D bias shape (${Y.shape}) does not match the number of output channels (${C})`);I=Y.id}let v=h.filterHeight,S=h.filterWidth,k=h.padInfo.top,A=h.padInfo.right,D=h.padInfo.bottom,F=h.padInfo.left,M=h.dilationHeight,B=h.dilationWidth,U=h.strideHeight,P=h.strideWidth,L=h.inChannels,z=h.padInfo.type==="SAME"?1:0,V=h.batchSize,W=h.inHeight,q=h.inWidth;if(p!=="NHWC")throw new Error(`wasm backend FusedConv2D does not support dataFormat:'${p}'. Please use 'NHWC'.`);let X=o.makeOutput(h.outShape,"float32"),J=o.dataIdMap.get(X.dataId).id,tt=l==null?0:o.dataIdMap.get(l.dataId).id;return qR(x,V,W,q,y,v,S,I,k,A,D,F,z,M,B,U,P,L,C,g,tt,f||0,J),X}var jR={kernelName:qa,backendName:"wasm",setupFunc:k8,kernelFunc:T8};var XR;function _8(r){XR=r.wasm.cwrap(ja,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function N8(r){let{inputs:t,attrs:e,backend:o}=r,{x:n,filter:s,bias:i,preluActivationWeights:l}=t,{strides:u,pad:a,dilations:c,dataFormat:p,dimRoundingMode:m,activation:d,leakyreluAlpha:f}=e,h=w.computeConv2DInfo(n.shape,s.shape,u,c,a,m,!0),g=ma[d];if(g==null)throw new Error(`${d} activation not yet supported for FusedDepthwiseConv2D in the wasm backend.`);let x=o.dataIdMap.get(n.dataId).id,y=o.dataIdMap.get(s.dataId).id,C=h.outChannels,I=0;if(i!=null){let Y=o.dataIdMap.get(i.dataId);if(Y.shape.length!==1)throw new Error(`FusedDepthwiseConv2D only supports rank-1 bias but got rank ${Y.shape.length}.`);if(Y.shape[0]!==C)throw new Error(`FusedDepthwiseConv2D bias shape (${Y.shape}) does not match the number of output channels (${C})`);I=Y.id}let v=h.filterHeight,S=h.filterWidth,k=h.padInfo.top,A=h.padInfo.right,D=h.padInfo.bottom,F=h.padInfo.left,M=h.dilationHeight,B=h.dilationWidth,U=h.strideHeight,P=h.strideWidth,L=h.inChannels,z=h.padInfo.type==="SAME"?1:0,V=h.batchSize,W=h.inHeight,q=h.inWidth;if(p!=="NHWC")throw new Error(`wasm backend FusedDepthwiseConv2D does not support dataFormat:'${p}'. Please use 'NHWC'.`);let X=o.makeOutput(h.outShape,"float32"),J=o.dataIdMap.get(X.dataId).id,tt=l==null?0:o.dataIdMap.get(l.dataId).id;return XR(x,V,W,q,y,v,S,I,k,A,D,F,z,M,B,U,P,L,C,g,tt,f||0,J),X}var YR={kernelName:ja,backendName:"wasm",setupFunc:_8,kernelFunc:N8};var ZR;function A8(r){ZR=r.wasm.cwrap(Ea,null,["number","number","number","number","number","number","array","number"])}function E8(r){let{backend:t,inputs:e}=r,{params:o,indices:n}=e,[s,i,l,u]=gm.prepareAndValidate(o,n),a=t.makeOutput(s,o.dtype);if(i===0)return a;let c=n.shape,p=c[c.length-1],d=t.dataIdMap.get(o.dataId).id,h=t.dataIdMap.get(n.dataId).id,g=new Uint8Array(new Int32Array(u).buffer),x=t.dataIdMap.get(a.dataId).id;return ZR(d,ft[o.dtype],h,i,p,l,g,x),a}var QR={kernelName:Ea,backendName:"wasm",setupFunc:A8,kernelFunc:E8};var JR;function R8(r){JR=r.wasm.cwrap("Gather",null,["number","number","array","number","number","number","array","number"])}function D8(r){let{backend:t,inputs:e,attrs:o}=r,{x:n,indices:s}=e,{axis:i,batchDims:l}=o,u=b.parseAxisParam(i,n.shape)[0],a=t.readSync(s.dataId),c=n.shape[u];for(let D=0;D<a.length;++D){let F=a[D];b.assert(F<=c-1&&F>=0,()=>`GatherV2: the index value ${F} is not in [0, ${c-1}]`)}let p=w.segment_util.collectGatherOpShapeInfo(n,s,u,l),m=ye({inputs:{x:n},attrs:{shape:[p.batchSize,p.outerSize,p.dimSize,p.sliceSize]},backend:t}),d=b.sizeFromShape(s.shape),f=ye({inputs:{x:s},attrs:{shape:[p.batchSize,d/p.batchSize]},backend:t}),h=[p.batchSize,p.outerSize,d/p.batchSize,p.sliceSize],g=t.makeOutput(h,n.dtype);if(b.sizeFromShape(n.shape)===0)return g;let x=m.shape.length-1,C=t.dataIdMap.get(m.dataId).id,v=t.dataIdMap.get(f.dataId).id,S=t.dataIdMap.get(g.dataId).id,k=new Uint8Array(new Int32Array(b.computeStrides(m.shape)).buffer),A=new Uint8Array(new Int32Array(b.computeStrides(h)).buffer);return JR(C,ft[n.dtype],k,x,v,p.batchSize,A,S),t.disposeData(m.dataId),t.disposeData(f.dataId),g.shape=p.outputShape,g}var tD={kernelName:Bs,backendName:"wasm",setupFunc:R8,kernelFunc:D8};var F8=!1,eD=Pt(dn,F8,"bool");var $8=!1,rD=Pt(fn,$8,"bool");var oD=ut(hn,"bool");var nD=ut(gn,"bool");var sD=ut(xn,"bool");var aD;function M8(r){aD=r.wasm.cwrap(bn,null,["number","number","number","number"])}function P8(r){let{inputs:{x:t},attrs:{alpha:e},backend:o}=r,n=o.dataIdMap.get(t.dataId).id,s=o.makeOutput(t.shape,"float32");if(b.sizeFromShape(t.shape)!==0){let i=o.dataIdMap.get(s.dataId).id;aD(n,ft[t.dtype],e,i)}return s}var iD={kernelName:bn,backendName:"wasm",setupFunc:M8,kernelFunc:P8};var O8=!1,lD=Pt(yn,O8,"bool");var B8=!1,uD=Pt(Cn,B8,"bool");var cD;function L8(r){cD=r.wasm.cwrap(Ra,null,["number","number","number","number"])}function U8(r){let{attrs:t,backend:e}=r,{start:o,stop:n,num:s}=t,i=Math.floor(s),l=e.makeOutput([i],"float32");return cD(e.dataIdMap.get(l.dataId).id,o,n,i),l}var pD={kernelName:Ra,backendName:"wasm",setupFunc:L8,kernelFunc:U8};var mD=ut(In);var dD=ut(wn);var G8=!1,fD=Pt(vn,G8,"bool");var hD=ut(Sn);var V8=!1,gD=Pt(kn,V8,"bool");var W8=!1,xD=Pt(EI,W8,"bool");var bD;function z8(r){bD=r.wasm.cwrap(Tn,null,["number","number","number","number","number","number","number"])}function H8(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{depthRadius:s,bias:i,alpha:l,beta:u}=o;if(n.dtype!=="float32")throw new Error("LRN error: x must have dtype float32");let a=e.makeOutput(n.shape,n.dtype);return bD(e.dataIdMap.get(n.dataId).id,e.dataIdMap.get(a.dataId).id,n.shape[3],s,i,l,u),a}var yD={kernelName:Tn,backendName:"wasm",setupFunc:z8,kernelFunc:H8};var CD;function K8(r){CD=r.wasm.cwrap(Da,null,["number","number","number","number","number","number","number","number","number"])}function q8(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,y:s,dy:i}=t,{depthRadius:l,bias:u,alpha:a,beta:c}=o;if(n.dtype!=="float32"||s.dtype!=="float32"||i.dtype!=="float32")throw new Error("LRNGrad error: x, y, and dy must have dtype float32");let p=e.makeOutput(n.shape,n.dtype);return CD(e.dataIdMap.get(n.dataId).id,e.dataIdMap.get(s.dataId).id,e.dataIdMap.get(i.dataId).id,e.dataIdMap.get(p.dataId).id,i.shape[3],l,u,a,c),p}var ID={kernelName:Da,backendName:"wasm",setupFunc:K8,kernelFunc:q8};var wD;function j8(r){wD=r.wasm.cwrap(_n,null,["number","number","number","number"])}function X8(r){let{backend:t,inputs:e,attrs:o}=r,{reductionIndices:n,keepDims:s}=o,{x:i}=e,u=t.dataIdMap.get(i.dataId).id,a=i,{transposed:c,axes:p,originalAxes:m,inputWasTransposed:d}=Ze(i,n,t);if(d){let C=t.dataIdMap.get(c.dataId).id;a=c,u=C}let f=a.shape.length;w.assertAxesAreInnerMostDims("max",p,f);let[h,g]=w.computeOutAndReduceShapes(a.shape,p),x=b.sizeFromShape(g),y=t.makeOutput(h,i.dtype);if(b.sizeFromShape(a.shape)!==0){let C=t.dataIdMap.get(y.dataId).id;wD(u,ft[i.dtype],x,C)}if(d&&t.disposeData(c.dataId),s){let C=w.expandShapeToKeepDim(y.shape,m);y.shape=C}return y}var vD={kernelName:_n,backendName:"wasm",setupFunc:j8,kernelFunc:X8};var Y8=!1,SD=Pt(Nn,Y8);var kD;function Z8(r){kD=r.wasm.cwrap(An,null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function Q8(r){let{inputs:t,attrs:e,backend:o}=r,n=t.x,s=o.dataIdMap.get(n.dataId).id;b.assert(n.dtype==="float32",()=>`Error in MaxPool: only float32 input is supported. Got ${n.dtype}.`);let{filterSize:i,strides:l,pad:u,dimRoundingMode:a}=e,c=w.computePool2DInfo(n.shape,i,l,1,u,a),p=c.filterHeight,m=c.filterWidth,d=c.padInfo.top,f=c.padInfo.right,h=c.padInfo.bottom,g=c.padInfo.left,x=c.dilationHeight,y=c.dilationWidth,C=c.strideHeight,I=c.strideWidth,v=c.inChannels,S=c.outChannels;if(c.dataFormat!=="channelsLast")throw new Error(`wasm backend does not support dataFormat:'${c.dataFormat}'. Please use 'channelsLast'.`);let k=o.makeOutput(c.outShape,"float32"),A=o.dataIdMap.get(k.dataId).id;return kD(s,n.shape[0],n.shape[1],n.shape[2],p,m,d,f,h,g,x,y,C,I,v,S,A),k}var TD={kernelName:An,backendName:"wasm",setupFunc:Z8,kernelFunc:Q8};var _D;function J8(r){_D=r.wasm.cwrap("MaxPool3D",null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function tj(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{filterSize:s,strides:i,pad:l,dimRoundingMode:u,dataFormat:a}=o,c=w.computePool3DInfo(n.shape,s,i,1,l,u,a),p=e.makeOutput(c.outShape,n.dtype);return _D(e.dataIdMap.get(n.dataId).id,e.dataIdMap.get(p.dataId).id,c.batchSize,c.inChannels,c.inDepth,c.inHeight,c.inWidth,c.outDepth,c.outHeight,c.outWidth,c.strideDepth,c.strideHeight,c.strideWidth,c.dilationDepth,c.dilationHeight,c.dilationWidth,c.effectiveFilterDepth,c.effectiveFilterHeight,c.effectiveFilterWidth,c.padInfo.front,c.padInfo.top,c.padInfo.left),p}var ND={kernelName:yl,backendName:"wasm",setupFunc:J8,kernelFunc:tj};var AD;function ej(r){AD=r.wasm.cwrap("MaxPool3DGrad",null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function rj(r){let{inputs:t,backend:e,attrs:o}=r,{dy:n,input:s}=t,{filterSize:i,strides:l,pad:u,dimRoundingMode:a}=o,c=w.computePool3DInfo(s.shape,i,l,1,u,a),p=e.makeOutput(s.shape,s.dtype);return AD(e.dataIdMap.get(s.dataId).id,e.dataIdMap.get(n.dataId).id,e.dataIdMap.get(p.dataId).id,c.batchSize,c.inChannels,c.inDepth,c.inHeight,c.inWidth,c.outDepth,c.outHeight,c.outWidth,c.strideDepth,c.strideHeight,c.strideWidth,c.dilationDepth,c.dilationHeight,c.dilationWidth,c.effectiveFilterDepth,c.effectiveFilterHeight,c.effectiveFilterWidth,c.padInfo.front,c.padInfo.top,c.padInfo.left),p}var ED={kernelName:Cl,backendName:"wasm",setupFunc:ej,kernelFunc:rj};var RD;function oj(r){RD=r.wasm.cwrap("MaxPoolGrad",null,["number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function nj(r){let{inputs:t,backend:e,attrs:o}=r,{dy:n,input:s}=t,{filterSize:i,strides:l,pad:u,dimRoundingMode:a}=o,c=w.computePool2DInfo(s.shape,i,l,1,u,a),p=e.makeOutput(s.shape,s.dtype);return RD(e.dataIdMap.get(s.dataId).id,e.dataIdMap.get(n.dataId).id,e.dataIdMap.get(p.dataId).id,c.batchSize,c.inChannels,c.inHeight,c.inWidth,c.outHeight,c.outWidth,c.strideHeight,c.strideWidth,c.dilationHeight,c.dilationWidth,c.effectiveFilterHeight,c.effectiveFilterWidth,c.padInfo.top,c.padInfo.left),p}var DD={kernelName:bl,backendName:"wasm",setupFunc:oj,kernelFunc:nj};var FD;function sj(r){FD=r.wasm.cwrap("MaxPoolWithArgmax",null,["number","number","number","number","boolean","number","number","number","number","number","number","number","number","number","number","number","number","number","number"])}function aj(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{filterSize:s,strides:i,pad:l,includeBatchInIndex:u}=o;b.assert(n.shape.length===4,()=>`Error in maxPool: input must be rank 4 but got rank ${n.shape.length}.`);let a=[1,1];b.assert(w.eitherStridesOrDilationsAreOne(i,a),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${i} and dilations '${a}'`);let c=w.computePool2DInfo(n.shape,s,i,[1,1],l),p=e.makeOutput(c.outShape,n.dtype),m=e.makeOutput(c.outShape,"int32");return FD(e.dataIdMap.get(n.dataId).id,e.dataIdMap.get(p.dataId).id,e.dataIdMap.get(m.dataId).id,ft[n.dtype],u,c.batchSize,c.inChannels,c.inHeight,c.inWidth,c.outHeight,c.outWidth,c.strideHeight,c.strideWidth,c.dilationHeight,c.dilationWidth,c.effectiveFilterHeight,c.effectiveFilterWidth,c.padInfo.top,c.padInfo.left),[p,m]}var $D={kernelName:Il,backendName:"wasm",setupFunc:sj,kernelFunc:aj};var MD;function ij(r){MD=r.wasm.cwrap(En,null,["number, number, number"])}function lj(r){let{backend:t,inputs:e,attrs:o}=r,{axis:n,keepDims:s}=o,{x:i}=e,l=t.dataIdMap.get(i.dataId).id,u=l,a=i,{transposed:c,axes:p,originalAxes:m,inputWasTransposed:d}=Ze(i,n,t),f=p;if(d){let I=t.dataIdMap.get(c.dataId).id;I!==l&&(a=c,u=I,f=w.getInnerMostAxes(f.length,a.shape.length))}w.assertAxesAreInnerMostDims("mean",f,a.shape.length);let[h,g]=w.computeOutAndReduceShapes(a.shape,f),x=b.sizeFromShape(g),y=a;a.dtype!=="float32"&&(y=ir({backend:t,inputs:{x:a},attrs:{dtype:"float32"}}),u=t.dataIdMap.get(y.dataId).id);let C=t.makeOutput(h,"float32");if(b.sizeFromShape(a.shape)!==0){let I=t.dataIdMap.get(C.dataId).id;MD(u,x,I)}if(d&&t.disposeData(c.dataId),s){let I=w.expandShapeToKeepDim(C.shape,m);C.shape=I}return a.dtype!=="float32"&&t.disposeData(y.dataId),C}var PD={kernelName:En,backendName:"wasm",setupFunc:ij,kernelFunc:lj};var OD;function uj(r){OD=r.wasm.cwrap(Rn,null,["number","number","number","number"])}function cj(r){let{backend:t,inputs:e,attrs:o}=r,{axis:n,keepDims:s}=o,{x:i}=e,l=t.dataIdMap.get(i.dataId).id,u=l,a=i,{transposed:c,axes:p,originalAxes:m,inputWasTransposed:d}=Ze(i,n,t);if(d){let C=t.dataIdMap.get(c.dataId).id;C!==l&&(a=c,u=C)}let f=a.shape.length;w.assertAxesAreInnerMostDims("min",p,f);let[h,g]=w.computeOutAndReduceShapes(a.shape,p),x=b.sizeFromShape(g),y=t.makeOutput(h,a.dtype);if(b.sizeFromShape(a.shape)!==0){let C=t.dataIdMap.get(y.dataId).id;OD(u,ft[i.dtype],x,C)}if(d&&t.disposeData(c.dataId),s){let C=w.expandShapeToKeepDim(y.shape,m);y.shape=C}return y}var BD={kernelName:Rn,backendName:"wasm",setupFunc:uj,kernelFunc:cj};var pj=!1,LD=Pt(Dn,pj);var NC;(function(r){r[r.reflect=0]="reflect",r[r.symmetric=1]="symmetric"})(NC||(NC={}));var UD;function mj(r){UD=r.wasm.cwrap(Fn,null,["number","array","number","number","array","array","number","number"])}function dj(r){let{inputs:{x:t},backend:e,attrs:{paddings:o,mode:n}}=r,s=o.map((f,h)=>f[0]+t.shape[h]+f[1]),i=e.dataIdMap.get(t.dataId).id,l=e.makeOutput(s,t.dtype),u=e.dataIdMap.get(l.dataId).id,a=new Uint8Array(new Int32Array(t.shape).buffer),c=o.map(f=>f[0]),p=o.map(f=>f[1]),m=new Uint8Array(new Int32Array(c).buffer),d=new Uint8Array(new Int32Array(p).buffer);return UD(i,a,t.shape.length,ft[t.dtype],m,d,NC[n],u),l}var GD={kernelName:Fn,backendName:"wasm",kernelFunc:dj,setupFunc:mj};var VD;function fj(r){VD=r.wasm.cwrap(ns,null,["number","number","number","number"])}function AC(r){let{backend:t,inputs:{logits:e},attrs:{dim:o}}=r,n=t.dataIdMap.get(e.dataId).id,s=t.makeOutput(e.shape,e.dtype),i=t.dataIdMap.get(s.dataId).id,l=e.shape[o],u=b.sizeFromShape(e.shape)/l;return b.sizeFromShape(s.shape)===0||VD(n,i,l,u),s}var WD={kernelName:ns,backendName:"wasm",setupFunc:fj,kernelFunc:AC};var zD;function hj(r){zD=r.wasm.cwrap(Fa,null,["number","number","number","number","number","number"])}function gj(r){let{inputs:t,backend:e,attrs:o}=r,{logits:n}=t,{numSamples:s,seed:i,normalized:l}=o;if(n.dtype!=="float32")throw new Error(`Tensor logits must have dtype float32, got ${n.dtype}`);let u=l?n:AC({inputs:{logits:n},backend:e,attrs:{dim:n.shape.length-1}}),[a,c]=u.shape,p=e.makeOutput([a,s],"int32");return zD(e.dataIdMap.get(u.dataId).id,a,c,s,i,e.dataIdMap.get(p.dataId).id),l||e.disposeData(u.dataId),p}var HD={kernelName:Fa,backendName:"wasm",setupFunc:hj,kernelFunc:gj};var KD=Pt($n,!0);var xj=!0,qD=Pt(Mn,xj);var jD=ut(Ls);function Cu(r,t){let e=new Int32Array(r.wasm.HEAPU8.buffer,t,4),o=e[0],n=e[1],s=e[2],i=e[3];return r.wasm._free(t),{pSelectedIndices:o,selectedSize:n,pSelectedScores:s,pValidOutputs:i}}var XD;function bj(r){XD=r.wasm.cwrap($a,"number",["number","number","number","number","number"])}function yj(r){let{backend:t,inputs:e,attrs:o}=r,{iouThreshold:n,maxOutputSize:s,scoreThreshold:i}=o,{boxes:l,scores:u}=e,a=t.dataIdMap.get(l.dataId).id,c=t.dataIdMap.get(u.dataId).id,p=XD(a,c,s,n,i),{pSelectedIndices:m,selectedSize:d,pSelectedScores:f,pValidOutputs:h}=Cu(t,p);return t.wasm._free(f),t.wasm._free(h),t.makeOutput([d],"int32",m)}var YD={kernelName:$a,backendName:"wasm",setupFunc:bj,kernelFunc:yj};var ZD;function Cj(r){ZD=r.wasm.cwrap(Ma,"number",["number","number","number","number","number","bool"])}function Ij(r){let{backend:t,inputs:e,attrs:o}=r,{iouThreshold:n,maxOutputSize:s,scoreThreshold:i,padToMaxOutputSize:l}=o,{boxes:u,scores:a}=e,c=t.dataIdMap.get(u.dataId).id,p=t.dataIdMap.get(a.dataId).id,m=ZD(c,p,s,n,i,l),{pSelectedIndices:d,selectedSize:f,pSelectedScores:h,pValidOutputs:g}=Cu(t,m);t.wasm._free(h);let x=t.makeOutput([f],"int32",d),y=t.makeOutput([],"int32",g);return[x,y]}var QD={kernelName:Ma,backendName:"wasm",setupFunc:Cj,kernelFunc:Ij};var JD;function wj(r){JD=r.wasm.cwrap(Pa,"number",["number","number","number","number","number","number"])}function vj(r){let{backend:t,inputs:e,attrs:o}=r,{iouThreshold:n,maxOutputSize:s,scoreThreshold:i,softNmsSigma:l}=o,{boxes:u,scores:a}=e,c=t.dataIdMap.get(u.dataId).id,p=t.dataIdMap.get(a.dataId).id,m=JD(c,p,s,n,i,l),{pSelectedIndices:d,selectedSize:f,pSelectedScores:h,pValidOutputs:g}=Cu(t,m);t.wasm._free(g);let x=t.makeOutput([f],"int32",d),y=t.makeOutput([f],"float32",h);return[x,y]}var tF={kernelName:Pa,backendName:"wasm",setupFunc:wj,kernelFunc:vj};var Sj=!1,eF=Pt(Pn,Sj,"bool");var rF;function kj(r){rF=r.wasm.cwrap(On,null,["number","number","number","number","number"])}function Tj(r){let{inputs:t,backend:e,attrs:o}=r,{indices:n}=t,{dtype:s,depth:i,onValue:l,offValue:u}=o,a=e.makeOutput([...n.shape,i],s),c=e.dataIdMap.get(a.dataId).id,m=e.dataIdMap.get(n.dataId).id;return rF(m,i,l,u,c),a}var oF={kernelName:On,backendName:"wasm",setupFunc:kj,kernelFunc:Tj};function _j(r){let{inputs:{x:t},backend:e}=r,o=e.makeOutput(t.shape,t.dtype);return e.typedArrayFromHeap(o).fill(1),o}var nF={kernelName:Us,backendName:"wasm",kernelFunc:_j};function Nj(r){let{inputs:t,backend:e,attrs:o}=r,{axis:n}=o;if(t.length===1)return vf({inputs:{input:t[0]},backend:e,attrs:{dim:n}});let s=t[0].shape,i=t[0].dtype;t.forEach(c=>{b.assertShapesMatch(s,c.shape,"All tensors passed to stack must have matching shapes"),b.assert(i===c.dtype,()=>"All tensors passed to stack must have matching dtypes")});let l=[],u=t.map(c=>{let p=vf({inputs:{input:c},backend:e,attrs:{dim:n}});return l.push(p),p}),a=kC({inputs:u,backend:e,attrs:{axis:n}});return l.forEach(c=>e.disposeData(c.dataId)),a}var sF={kernelName:Gs,backendName:"wasm",kernelFunc:Nj};var aF;function Aj(r){aF=r.wasm.cwrap(Bn,null,["number","array","number","number","array","array","number","number"])}function Ej(r){let{inputs:{x:t},backend:e,attrs:{paddings:o,constantValue:n}}=r,s=o.map((h,g)=>h[0]+t.shape[g]+h[1]);if(b.sizeFromShape(t.shape)===0)return _C({backend:e,attrs:{shape:s,value:n,dtype:t.dtype}});let i=e.dataIdMap.get(t.dataId).id,l=e.makeOutput(s,t.dtype),a=e.dataIdMap.get(l.dataId).id,c=new Uint8Array(new Int32Array(t.shape).buffer),p=o.map(h=>h[0]),m=o.map(h=>h[1]),d=new Uint8Array(new Int32Array(p).buffer),f=new Uint8Array(new Int32Array(m).buffer);return aF(i,c,t.shape.length,ft[t.dtype],d,f,n,a),l}var Sf={kernelName:Bn,backendName:"wasm",kernelFunc:Ej,setupFunc:Aj};var Rj=!1,iF=Pt(Ln,Rj);var lF;function Dj(r){lF=r.wasm.cwrap(Un,null,["number","number","number"])}function Fj(r){let{inputs:t,backend:e}=r,{x:o,alpha:n}=t,s=e.dataIdMap.get(o.dataId).id,i=e.dataIdMap.get(n.dataId).id,l=s,u=o,a=u;u.dtype!=="float32"&&(a=ir({backend:e,inputs:{x:o},attrs:{dtype:"float32"}}),l=e.dataIdMap.get(a.dataId).id);let c=e.makeOutput(o.shape,"float32"),p=e.dataIdMap.get(c.dataId).id;return lF(l,i,p),u.dtype!=="float32"&&e.disposeData(a.dataId),c}var uF={kernelName:Un,backendName:"wasm",setupFunc:Dj,kernelFunc:Fj};var cF;function $j(r){cF=r.wasm.cwrap(Gn,null,["number","number","number","number"])}function Mj(r){let{backend:t,inputs:e,attrs:o}=r,{axis:n,keepDims:s}=o,{x:i}=e,l=t.dataIdMap.get(i.dataId).id,u=l,a=i,{transposed:c,axes:p,originalAxes:m,inputWasTransposed:d}=Ze(i,n,t),f=p;if(d){let C=t.dataIdMap.get(c.dataId).id;C!==l&&(a=c,u=C,f=w.getInnerMostAxes(f.length,a.shape.length))}w.assertAxesAreInnerMostDims("prod",f,a.shape.length);let[h,g]=w.computeOutAndReduceShapes(a.shape,f),x=b.sizeFromShape(g),y=t.makeOutput(h,a.dtype);if(b.sizeFromShape(a.shape)!==0){let C=t.dataIdMap.get(y.dataId).id;cF(u,x,ft[y.dtype],C)}if(d&&t.disposeData(c.dataId),s){let C=w.expandShapeToKeepDim(y.shape,m);y.shape=C}return y}var pF={kernelName:Gn,backendName:"wasm",setupFunc:$j,kernelFunc:Mj};var Pj=r=>{let{backend:t,attrs:e}=r,{start:o,stop:n,step:s,dtype:i}=e,l=hi(o,n,s,i),u=t.makeOutput([l.length],i);return t.typedArrayFromHeap(u).set(l),u},mF={kernelName:wl,backendName:"wasm",kernelFunc:Pj};var Oj=!0,dF=Pt(on,Oj);var fF=ut(Vn);var hF=ut(Wn);var gF=ut(Kn);var xF;function Bj(r){xF=r.wasm.cwrap(Hn,null,["number","number","number","number","number","number","number","number","number","number"])}function Lj(r){let{backend:t,inputs:e,attrs:o}=r,{images:n}=e,{alignCorners:s,halfPixelCenters:i,size:l}=o,[u,a]=l,[c,p,m,d]=n.shape,f=[c,u,a,d],h=t.dataIdMap.get(n.dataId),g;h.dtype!=="float32"&&(g=ir({backend:t,inputs:{x:n},attrs:{dtype:"float32"}}),h=t.dataIdMap.get(g.dataId));let x=h.id,y=t.makeOutput(f,"float32");if(b.sizeFromShape(n.shape)===0)return y;let C=t.dataIdMap.get(y.dataId).id;return xF(x,c,p,m,d,u,a,s?1:0,i?1:0,C),g!=null&&t.disposeData(g.dataId),y}var bF={kernelName:Hn,backendName:"wasm",setupFunc:Bj,kernelFunc:Lj};var yF;function Uj(r){yF=r.wasm.cwrap(Ba,null,["number","number","number","array","array","boolean"])}function Gj(r){let{inputs:t,backend:e,attrs:o}=r,{images:n,dy:s}=t,{alignCorners:i}=o,l=e.makeOutput(n.shape,"float32"),u=e.dataIdMap.get(n.dataId),a;return u.dtype!=="float32"&&(a=ir({backend:e,inputs:{x:n},attrs:{dtype:"float32"}}),u=e.dataIdMap.get(a.dataId)),yF(e.dataIdMap.get(n.dataId).id,e.dataIdMap.get(s.dataId).id,e.dataIdMap.get(l.dataId).id,new Uint8Array(new Int32Array(n.shape).buffer),new Uint8Array(new Int32Array(s.shape).buffer),i),a!=null&&e.disposeData(a.dataId),l}var CF={kernelName:Ba,backendName:"wasm",setupFunc:Uj,kernelFunc:Gj};var IF;function Vj(r){IF=r.wasm.cwrap(zn,null,["number","number","number","number","number","number","number","number","number","number"])}function Wj(r){let{backend:t,inputs:e,attrs:o}=r,{images:n}=e,{alignCorners:s,halfPixelCenters:i,size:l}=o,[u,a]=l,[c,p,m,d]=n.shape,f=[c,u,a,d],h=t.makeOutput(f,"float32");if(b.sizeFromShape(n.shape)===0)return h;let g=t.dataIdMap.get(n.dataId),x;g.dtype!=="float32"&&(x=ir({backend:t,inputs:{x:n},attrs:{dtype:"float32"}}),g=t.dataIdMap.get(x.dataId));let y=g.id,C=t.dataIdMap.get(h.dataId).id;return IF(y,c,p,m,d,u,a,s?1:0,i?1:0,C),x!=null&&t.disposeData(x.dataId),h}var wF={kernelName:zn,backendName:"wasm",setupFunc:Vj,kernelFunc:Wj};var vF;function zj(r){vF=r.wasm.cwrap(Oa,null,["number","number","number","array","array","boolean"])}function Hj(r){let{inputs:t,backend:e,attrs:o}=r,{images:n,dy:s}=t,{alignCorners:i}=o,l=e.makeOutput(n.shape,"float32"),u=e.dataIdMap.get(n.dataId),a;return u.dtype!=="float32"&&(a=ir({backend:e,inputs:{x:n},attrs:{dtype:"float32"}}),u=e.dataIdMap.get(a.dataId)),vF(e.dataIdMap.get(n.dataId).id,e.dataIdMap.get(s.dataId).id,e.dataIdMap.get(l.dataId).id,new Uint8Array(new Int32Array(n.shape).buffer),new Uint8Array(new Int32Array(s.shape).buffer),i),a!=null&&e.disposeData(a.dataId),l}var SF={kernelName:Oa,backendName:"wasm",setupFunc:zj,kernelFunc:Hj};var kF;function Kj(r){kF=r.wasm.cwrap(qn,null,["number","array","number","array","number","number"])}function qj(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{dims:s}=o,i=b.parseAxisParam(s,n.shape);if(n.shape.length===0)return Fi({inputs:{x:n},backend:e});let l=e.makeOutput(n.shape,n.dtype),u=e.dataIdMap.get(n.dataId).id,a=e.dataIdMap.get(l.dataId).id,c=new Uint8Array(new Int32Array(i).buffer),p=new Uint8Array(new Int32Array(n.shape).buffer);kF(u,c,i.length,p,n.shape.length,a);let m=ye({inputs:{x:l},attrs:{shape:n.shape},backend:e});return e.disposeData(l.dataId),m}var TF={kernelName:qn,backendName:"wasm",kernelFunc:qj,setupFunc:Kj};var _F;function jj(r){_F=r.wasm.cwrap(Ha,null,["number","number","number","number","number","number","number","number","array","number","number"])}function Xj(r){let{inputs:t,backend:e,attrs:o}=r,{image:n}=t,{radians:s,fillValue:i,center:l}=o,u=e.makeOutput(n.shape,n.dtype),a=e.dataIdMap.get(n.dataId).id,c=e.dataIdMap.get(u.dataId).id,[p,m,d,f]=n.shape,[h,g]=w.getImageCenter(l,m,d),x=i===0,y=255,C=typeof i=="number"?[i,i,i,x?0:y]:[...i,y],I=new Uint8Array(new Int32Array(C).buffer);return _F(a,p,m,d,f,s,h,g,I,C.length,c),u}var NF={kernelName:Ha,backendName:"wasm",kernelFunc:Xj,setupFunc:jj};var AF=ut(jn);var EF=ut(Xn);var RF;function Yj(r){RF=r.wasm.cwrap(La,null,["number","number","number","number","number","number","array","number","number"])}function Zj(r){let{backend:t,inputs:e,attrs:o}=r,{indices:n,updates:s}=e,{shape:i}=o,l=t.makeOutput(i,s.dtype);if(b.sizeFromShape(i)===0)return l;let{sliceRank:u,numUpdates:a,sliceSize:c,strides:p,outputSize:m}=ql.calculateShapes(s,n,i),f=t.dataIdMap.get(n.dataId).id,g=t.dataIdMap.get(s.dataId).id,x=new Uint8Array(new Int32Array(p).buffer),y=t.dataIdMap.get(l.dataId).id;return RF(f,g,ft[s.dtype],u,a,c,x,m,y),l}var DF={kernelName:La,backendName:"wasm",setupFunc:Yj,kernelFunc:Zj};var FF;function Qj(r){FF=r.wasm.cwrap(Ga,null,["number","number","number","number","number","number","bool","number"])}function Jj(r){let{inputs:t,backend:e,attrs:o}=r,{sortedSequence:n,values:s}=t,{side:i}=o;if(n.dtype!==s.dtype)throw new Error(`SearchSorted error: sorted_sequence must have the same dtype as values. Got ${n.dtype} and ${s.dtype}`);let l=e.makeOutput(s.shape,"int32");function u(a){return e.dataIdMap.get(a.dataId).id}return FF(u(n),u(s),n.shape[0],n.shape[1],s.shape[1],ft[n.dtype],i==="left",u(l)),l}var $F={kernelName:Ga,backendName:"wasm",setupFunc:Qj,kernelFunc:Jj};var MF;function tX(r){MF=r.wasm.cwrap("SelectV2",null,["number","number","number","number","number"])}function eX(r){let{inputs:t,backend:e}=r,{condition:o,t:n,e:s}=t,i=e.dataIdMap.get(o.dataId).id,l=e.dataIdMap.get(n.dataId).id,u=e.dataIdMap.get(s.dataId).id,a=e.makeOutput(n.shape,n.dtype),c=e.dataIdMap.get(a.dataId).id,p=o.shape.length,m=n.shape.length,d=p===0||p>1||m===1?1:b.sizeFromShape(n.shape.slice(1));return MF(i,l,u,d,c),a}var PF={kernelName:Ws,backendName:"wasm",kernelFunc:eX,setupFunc:tX};var OF=ut(Yn);var BF;function rX(r){BF=r.wasm.cwrap(ts,null,["number","number"])}function oX(r){let{backend:t,inputs:{x:e}}=r,o=t.dataIdMap.get(e.dataId).id,n=t.makeOutput(e.shape,e.dtype),s=t.dataIdMap.get(n.dataId).id;return b.sizeFromShape(n.shape)===0||BF(o,s),n}var LF={kernelName:"Sigmoid",backendName:"wasm",setupFunc:rX,kernelFunc:oX};var UF=ut(Jn);var GF=ut(Zn);var VF=ut(Qn);var WF=ut(es);function nX(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{blockShape:s,paddings:i}=o,l=b.sizeFromShape(s),u=[[0,0]];u.push(...i);for(let S=1+s.length;S<n.shape.length;++S)u.push([0,0]);let a=Sf.kernelFunc({inputs:{x:n},backend:e,attrs:{paddings:u,constantValue:0}}),c=w.getReshaped(a.shape,s,l,!1),p=w.getPermuted(c.length,s.length,!1),m=w.getReshapedPermuted(a.shape,s,l,!1),h=ye({inputs:{x:a},backend:e,attrs:{shape:c}}),y=Fr({inputs:{x:h},backend:e,attrs:{perm:p}}),v=ye({inputs:{x:y},backend:e,attrs:{shape:m}});return e.disposeData(a.dataId),e.disposeData(h.dataId),e.disposeData(y.dataId),v}var zF={kernelName:Hs,backendName:"wasm",kernelFunc:nX};var HF;function sX(r){HF=r.wasm.cwrap("SparseFillEmptyRows","number",["number","number","number","number","number","number","number","number","number","number","number","number"])}function aX(r){let{backend:t,inputs:e}=r,{indices:o,values:n,denseShape:s,defaultValue:i}=e,l=o.shape[0],u=o.shape[1],a=t.readSync(s.dataId)[0],c=[l+a,u],p=t.dataIdMap.get(o.dataId).id,m=t.dataIdMap.get(n.dataId).id,d=t.dataIdMap.get(i.dataId).id,f=t.makeOutput(c,o.dtype),h=t.dataIdMap.get(f.dataId).id,g=t.makeOutput(c.slice(0,1),n.dtype),x=t.dataIdMap.get(g.dataId).id,y=t.makeOutput([a],"bool"),C=t.dataIdMap.get(y.dataId).id,I=t.makeOutput([l],o.dtype),v=t.dataIdMap.get(I.dataId).id,S=t.makeOutput([4],"int32"),k=t.dataIdMap.get(S.dataId).id,A=HF(p,m,ft[n.dtype],l,a,u,d,h,x,C,v,k),D=t.readSync(S.dataId),F;switch(D[0]){case 1:{F=w.getSparseFillEmptyRowsIndicesDenseShapeMismatch(D[1]);break}case 2:{F=w.getSparseFillEmptyRowsNegativeIndexErrorMessage(D[1],D[2]);break}case 3:F=w.getSparseFillEmptyRowsOutOfRangeIndexErrorMessage(D[1],D[2],D[3]);break;default:F=""}if(t.disposeData(S.dataId),F)throw t.disposeData(f.dataId),t.disposeData(g.dataId),t.disposeData(y.dataId),t.disposeData(I.dataId),new Error(F);let M=f,B=g;return A!==c[0]&&(M=Hr({inputs:{x:f},attrs:{begin:0,size:[A,u]},backend:t}),B=Hr({inputs:{x:g},attrs:{begin:0,size:A},backend:t}),t.disposeData(f.dataId),t.disposeData(g.dataId)),[M,B,y,I]}var KF={kernelName:Sl,backendName:"wasm",setupFunc:sX,kernelFunc:aX};var qF;function iX(r){qF=r.wasm.cwrap(Va,null,["number","number","number","number","number","number","number"])}function lX(r){let{backend:t,inputs:e}=r,{inputIndices:o,inputShape:n,newShape:s}=e;if(o.shape.length!==2)throw new Error(`Input indices should be a matrix but received shape
        ${o.shape}`);if(n.shape.length!==1)throw new Error(`Input shape should be a vector but received shape
        ${n.shape}`);if(s.shape.length!==1)throw new Error(`Target shape should be a vector but received shape ${s.shape}`);let i=t.dataIdMap.get(o.dataId).id,l=t.dataIdMap.get(n.dataId).id,u=t.dataIdMap.get(s.dataId).id,a=o.shape[0],c=b.sizeFromShape(s.shape),p=t.makeOutput([a,c],o.dtype),m=t.dataIdMap.get(p.dataId).id,d=t.makeOutput([c],s.dtype),f=t.dataIdMap.get(d.dataId).id,h=t.makeOutput([3],"int32"),g=t.dataIdMap.get(h.dataId).id;qF(i,l,u,a,m,f,g);let x=t.readSync(h.dataId),y;switch(x[0]){case 0:{y=w.getSparseReshapeMultipleNegativeOneOutputDimErrorMessage(x[1],x[2]);break}case 1:{y=w.getSparseReshapeNegativeOutputDimErrorMessage(x[1],x[2]);break}case 2:y=w.getSparseReshapeEmptyTensorZeroOutputDimErrorMessage();break;case 3:{let C=Array.from(t.readSync(n.dataId)),I=Array.from(t.readSync(d.dataId));y=w.getSparseReshapeInputOutputMultipleErrorMessage(C,I);break}case 4:{let C=Array.from(t.readSync(n.dataId)),I=Array.from(t.readSync(d.dataId));y=w.getSparseReshapeInputOutputMismatchErrorMessage(C,I);break}default:y=""}if(t.disposeData(h.dataId),y)throw t.disposeData(p.dataId),t.disposeData(d.dataId),new Error(y);return[p,d]}var jF={kernelName:Va,backendName:"wasm",setupFunc:iX,kernelFunc:lX};var XF;function kf(r){XF=r.wasm.cwrap("SparseSegmentReduction",null,["number","number","number","number","number","number","number","number","number"])}function Tf(r,t){let{backend:e,inputs:o}=r,{data:n,indices:s,segmentIds:i}=o,l=s.shape[0],u=e.readSync(i.dataId,l-1,l)[0],c=l>0?u+1:0;if(c<0)throw new Error(w.getSparseSegmentReductionNegativeSegmentIdsErrorMessage());let p=n.shape.slice();p[0]=c;let m=e.dataIdMap.get(n.dataId).id,d=e.dataIdMap.get(s.dataId).id,f=e.dataIdMap.get(i.dataId).id,h=e.makeOutput(p,n.dtype),g=e.dataIdMap.get(h.dataId).id,x=e.makeOutput([4],"int32"),y=e.dataIdMap.get(x.dataId).id;XF(m,ft[n.dtype],n.shape[0],d,f,g,y,t,0);let C=e.readSync(x.dataId),I;switch(C[0]){case 0:{I=w.getSparseSegmentReductionNegativeSegmentIdsErrorMessage();break}case 1:{I=w.getSparseSegmentReductionNonIncreasingSegmentIdsErrorMessage();break}case 2:I=w.getSparseSegmentReductionSegmentIdOutOfRangeErrorMessage(C[1],C[2]);break;case 3:I=w.getSparseSegmentReductionIndicesOutOfRangeErrorMessage(C[1],C[2],C[3]);break;default:I=""}if(e.disposeData(x.dataId),I)throw e.disposeData(h.dataId),new Error(I);return h}function uX(r){return Tf(r,!0)}var YF={kernelName:kl,backendName:"wasm",setupFunc:kf,kernelFunc:uX};function cX(r){return Tf(r,!1)}var ZF={kernelName:Tl,backendName:"wasm",setupFunc:kf,kernelFunc:cX};var QF;function pX(r){QF=r.wasm.cwrap(Wa,null,["number","number","number","number","number","number","number","number","array","number","number"])}function mX(r){let{backend:t,inputs:e,attrs:o}=r,{sparseIndices:n,sparseValues:s,defaultValue:i}=e,{outputShape:l}=o,u=t.makeOutput(l,i.dtype);if(b.sizeFromShape(l)===0)return u;let{sliceRank:a,numUpdates:c,sliceSize:p,strides:m,outputSize:d}=w.calculateShapes(s,n,l),f=t.dataIdMap.get(n.dataId).id,h=t.dataIdMap.get(s.dataId).id,g=t.dataIdMap.get(i.dataId).id,x=new Uint8Array(new Int32Array(m).buffer),y=t.dataIdMap.get(u.dataId).id;return QF(f,h,s.shape.length,g,ft[i.dtype],a,c,p,x,d,y),u}var JF={kernelName:Wa,backendName:"wasm",setupFunc:pX,kernelFunc:mX};function dX(r){let{inputs:t,attrs:e,backend:o}=r,{x:n}=t,{numOrSizeSplits:s,axis:i}=e,l=b.parseAxisParam(i,n.shape)[0],u=w.prepareSplitSize(n,s,l),a=new Array(n.shape.length).fill(0),c=n.shape.slice();return u.map(p=>{let m=[...c];m[l]=p;let d=Hr({inputs:{x:n},attrs:{begin:a,size:m},backend:o});return a[l]+=p,d})}var t$={kernelName:Ks,backendName:"wasm",kernelFunc:dX};var e$=ut(rs);var r$=ut(_l);var fX=!0,o$=Pt(ss,fX);var n$;function hX(r){n$=r.wasm.cwrap(bo,null,["number","number","number","number"])}function gX(r){let{backend:t,inputs:e,attrs:o}=r,{alpha:n}=o,{x:s}=e,i=t.dataIdMap.get(s.dataId).id,l=t.makeOutput(s.shape,s.dtype),u=t.dataIdMap.get(l.dataId).id;return n$(i,n,ft[s.dtype],u),l}var s$={kernelName:bo,backendName:"wasm",setupFunc:hX,kernelFunc:gX};var a$;function xX(r){a$=r.wasm.cwrap(as,null,["number","array","number","array","array","array","array","array","number","number"])}function bX(r){let{backend:t,inputs:e,attrs:o}=r,{x:n}=e,{begin:s,end:i,strides:l,beginMask:u,endMask:a,ellipsisMask:c,newAxisMask:p,shrinkAxisMask:m}=o,{finalShapeSparse:d,finalShape:f,isIdentity:h,sliceDim0:g,isSimpleSlice:x,begin:y,end:C,strides:I}=oe.sliceInfo(n.shape,s,i,l,u,a,c,p,m),v;if(h)v=ye({inputs:{x:n},backend:t,attrs:{shape:f}});else if(g||x){b.assert(n.shape.length>=1,()=>`Input must have rank at least 1, got: ${n.shape.length}`);let S=oe.computeOutShape(y,C,I),k=Hr({inputs:{x:n},backend:t,attrs:{begin:y,size:S}});v=ye({inputs:{x:k},backend:t,attrs:{shape:f}}),t.disposeData(k.dataId)}else{let S=t.makeOutput(d,"float32"),k=t.dataIdMap.get(n.dataId).id,A=new Uint8Array(new Int32Array(b.computeStrides(n.shape)).buffer),D=new Uint8Array(new Int32Array(y).buffer),F=new Uint8Array(new Int32Array(C).buffer),M=new Uint8Array(new Int32Array(I).buffer),B=new Uint8Array(new Int32Array(d).buffer),U=new Uint8Array(new Int32Array(b.computeStrides(d)).buffer),P=t.dataIdMap.get(S.dataId).id;a$(k,A,n.shape.length,D,F,M,B,U,d.length,P),v=ye({inputs:{x:S},backend:t,attrs:{shape:f}}),t.disposeData(S.dataId)}return v}var i$={kernelName:as,backendName:"wasm",setupFunc:xX,kernelFunc:bX};function yX(r){let{backend:t,inputs:e,attrs:o}=r,{data:n,dataSplits:s}=e,{separator:i,nGramWidths:l,leftPad:u,rightPad:a,padWidth:c,preserveShortSequences:p}=o,m=t.readSync(n.dataId),d=t.readSync(s.dataId),[f,h]=xi(m,d,i,l,u,a,c,p),g=t.makeOutput([f.length],"string"),x=t.dataIdMap.get(g.dataId);x.stringBytes=f;let y=t.makeOutput(s.shape,"int32");return t.typedArrayFromHeap(y).set(h),[g,y]}var l$={kernelName:Nl,backendName:"wasm",kernelFunc:yX};function CX(r){let{backend:t,inputs:e,attrs:o}=r,{input:n,delimiter:s}=e,{skipEmpty:i}=o,l=t.readSync(n.dataId),u=t.readSync(s.dataId),[a,c,p]=bi(l,u[0],i),m=c.length,d=t.makeOutput([m,2],"int32");t.typedArrayFromHeap(d).set(a);let h=t.makeOutput([m],"string"),g=t.dataIdMap.get(h.dataId);g.stringBytes=c;let x=t.makeOutput([2],"int32");return t.typedArrayFromHeap(x).set(p),[d,h,x]}var u$={kernelName:Al,backendName:"wasm",kernelFunc:CX};function IX(r){let{backend:t,inputs:e,attrs:o}=r,{input:n}=e,{numBuckets:s}=o,i=t.readSync(n.dataId),l=yi(i,s),u=t.makeOutput(n.shape,"int32");return t.typedArrayFromHeap(u).set(l),u}var c$={kernelName:El,backendName:"wasm",kernelFunc:IX};var wX=!0,p$=Pt(is,wX);var m$;function vX(r){m$=r.wasm.cwrap(os,null,["number","number","number","number"])}function SX(r){let{backend:t,inputs:e,attrs:o}=r,{axis:n,keepDims:s}=o,{x:i}=e,l=t.dataIdMap.get(i.dataId).id,u=l,a=i,{transposed:c,axes:p,originalAxes:m,inputWasTransposed:d}=Ze(i,n,t),f=p;if(d){let C=t.dataIdMap.get(c.dataId).id;C!==l&&(a=c,u=C,f=w.getInnerMostAxes(f.length,a.shape.length))}w.assertAxesAreInnerMostDims("sum",f,a.shape.length);let[h,g]=w.computeOutAndReduceShapes(a.shape,f),x=b.sizeFromShape(g),y=t.makeOutput(h,a.dtype);if(b.sizeFromShape(a.shape)!==0){let C=t.dataIdMap.get(y.dataId).id;m$(u,x,ft[y.dtype],C)}if(d&&t.disposeData(c.dataId),s){let C=w.expandShapeToKeepDim(y.shape,m);y.shape=C}return y}var d$={kernelName:os,backendName:"wasm",setupFunc:vX,kernelFunc:SX};var f$=ut(ls);var h$=ut(us);var g$;function kX(r){g$=r.wasm.cwrap(Ua,null,["number","number","number","number","number","number","array","number","number","number"])}function TX(r){let{backend:t,inputs:e,attrs:o}=r,{tensor:n,indices:s,updates:i}=e,{}=o,l=t.makeOutput(n.shape,n.dtype);if(b.sizeFromShape(n.shape)===0)return l;let{sliceRank:u,numUpdates:a,sliceSize:c,strides:p,outputSize:m}=ql.calculateShapes(i,s,n.shape),f=t.dataIdMap.get(s.dataId).id,g=t.dataIdMap.get(i.dataId).id,y=t.dataIdMap.get(n.dataId).id,C=new Uint8Array(new Int32Array(p).buffer),I=t.dataIdMap.get(l.dataId).id;return g$(f,g,ft[i.dtype],u,a,c,C,m,I,y),l}var x$={kernelName:Ua,backendName:"wasm",setupFunc:kX,kernelFunc:TX};var b$;function _X(r){b$=r.wasm.cwrap(Qr,null,["number","array","number","array","number","number"])}function NX(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,s=e.dataIdMap.get(n.dataId).id,{reps:i}=o,l=new Array(n.shape.length);for(let m=0;m<l.length;m++)l[m]=n.shape[m]*i[m];let u=new Uint8Array(new Int32Array(n.shape).buffer),a=new Uint8Array(new Int32Array(l).buffer),c=e.makeOutput(l,n.dtype),p=e.dataIdMap.get(c.dataId).id;return b$(s,u,n.shape.length,a,l.length,ft[c.dtype],p),c}var y$={kernelName:Qr,backendName:"wasm",setupFunc:_X,kernelFunc:NX};var C$;function AX(r){C$=r.wasm.cwrap(cs,null,["number","array","number","number","number","bool","number","number"])}var EX=({inputs:r,backend:t,attrs:e})=>{let{x:o}=r,{k:n,sorted:s}=e,i=t.dataIdMap.get(o.dataId).id,l=new Uint8Array(new Int32Array(o.shape).buffer),u=o.shape.slice();u[u.length-1]=n;let a=t.makeOutput(u,o.dtype),c=t.dataIdMap.get(a.dataId).id,p=t.makeOutput(u,"int32"),m=t.dataIdMap.get(p.dataId).id;return C$(i,l,o.shape.length,ft[o.dtype],n,s,c,m),[a,p]},I$={kernelName:cs,backendName:"wasm",setupFunc:AX,kernelFunc:EX};var w$;function RX(r){w$=r.wasm.cwrap(za,null,["number","number","bool","number","number","number","number","number","number","array","number","array","number","number","number","number","number"])}function DX(r){let{backend:t,inputs:e,attrs:o}=r,{image:n,transforms:s}=e,{interpolation:i,fillMode:l,fillValue:u,outputShape:a}=o,[c,p,m,d]=n.shape,[f,h]=a??[p,m],g=[c,f,h,d],x=new Uint8Array(new Int32Array(b.computeStrides(n.shape)).buffer),y=new Uint8Array(new Int32Array(b.computeStrides(g)).buffer),C=t.makeOutput(g,n.dtype),I=t.dataIdMap.get(C.dataId).id,S=t.dataIdMap.get(n.dataId).id,A=t.dataIdMap.get(s.dataId).id,D=i==="nearest"?1:2,F;switch(l){case"constant":F=1;break;case"reflect":F=2;break;case"wrap":F=3;break;case"nearest":F=4;break;default:F=1;break}return w$(S,A,s.shape[0]>1,c,f,h,d,m,p,x,n.shape.length-1,y,g.length-1,D,F,u,I),C}var v$={kernelName:za,backendName:"wasm",setupFunc:RX,kernelFunc:DX};function FX(r){let{inputs:t,attrs:e,backend:o}=r,{axis:n}=e,{x:s}=t,{outputValues:i,outputShape:l,indices:u}=Ci(o.readSync(s.dataId),n,s.shape,s.dtype);return[o.makeOutput(l,s.dtype,void 0,i),o.makeOutput([u.length],"int32",void 0,u)]}var S$={kernelName:qs,backendName:"wasm",kernelFunc:FX};function $X(r){let{inputs:t,backend:e,attrs:o}=r,{value:n}=t,{axis:s}=o;s<0&&(s+=n.shape.length);let i=n.shape[s],l=n.shape.length,u=new Array(l-1),a=0;for(let d=0;d<l;d++)d!==s&&(u[a++]=n.shape[d]);let c=new Array(i),p=new Array(l).fill(0),m=n.shape.slice();m[s]=1;for(let d=0;d<c.length;d++)p[s]=d,c[d]=Hr({inputs:{x:n},attrs:{begin:p,size:m},backend:e});return c.map(({dataId:d,dtype:f})=>({dataId:d,dtype:f,shape:u}))}var k$={kernelName:js,backendName:"wasm",kernelFunc:$X};function MX(r){let{inputs:{x:t},backend:e}=r,o=e.makeOutput(t.shape,t.dtype);return e.typedArrayFromHeap(o).fill(0),o}var T$={kernelName:Xs,backendName:"wasm",kernelFunc:MX};var PX=[pE,mE,dE,fE,hE,xE,wE,SE,kE,TE,_E,NE,AE,EE,RE,FE,LE,ME,OE,VE,zE,KE,qE,jE,XE,YE,QE,JE,eR,oR,sR,iR,uR,cR,pR,dR,hR,xR,yR,IR,vR,kR,_R,AR,RR,DR,$R,MR,PR,OR,BR,LR,UR,VR,WR,zR,KR,jR,YR,QR,tD,eD,rD,bE,oD,nD,sD,iD,lD,uD,pD,dD,mD,fD,hD,gD,xD,yD,ID,vD,SD,TD,ND,ED,DD,$D,PD,BD,LD,GD,HD,KD,qD,jD,YD,QD,tF,eF,oF,nF,sF,Sf,iF,uF,pF,mF,dF,fF,hF,gF,UE,bF,CF,wF,SF,TF,NF,AF,EF,DF,$F,PF,OF,LF,UF,GF,VF,WE,WD,WF,zF,KF,jF,YF,ZF,JF,t$,e$,r$,o$,s$,i$,l$,u$,c$,p$,d$,f$,h$,x$,y$,I$,v$,CE,S$,k$,T$];for(let r of PX)Dl(r);var EC=$();EC.registerFlag("WASM_HAS_SIMD_SUPPORT",async()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,9,1,7,0,65,0,253,15,26,11]))}catch{return!1}});EC.registerFlag("WASM_HAS_MULTITHREAD_SUPPORT",async()=>{if(EC.get("IS_NODE"))return!1;try{return new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}});var BC=$u(E$()),P$=$u(D$()),LC=$u(F$());var $$=BC.default||BC,OX=LC.default||LC,Tc=class extends Xr{constructor(t){super(),this.wasm=t,this.dataIdNextNumber=1,this.wasm.tfjs.initWithThreadsCount(GX),VX=this.wasm.tfjs.getThreadsCount(),this.dataIdMap=new $o(this,gr())}write(t,e,o){let n={id:this.dataIdNextNumber++};return this.move(n,t,e,o,1),n}numDataIds(){return this.dataIdMap.numDataIds()}async time(t){let e=b.now();return t(),{kernelMs:b.now()-e}}move(t,e,o,n,s){let i=this.dataIdNextNumber++;if(n==="string"){let c=e;this.dataIdMap.set(t,{id:i,stringBytes:c,shape:o,dtype:n,memoryOffset:null,refCount:s});return}let l=b.sizeFromShape(o),u=l*b.bytesPerElement(n),a=this.wasm._malloc(u)>>>0;this.dataIdMap.set(t,{id:i,memoryOffset:a,shape:o,dtype:n,refCount:s}),this.wasm.tfjs.registerTensor(i,l,a),e!=null&&this.wasm.HEAPU8.set(new Uint8Array(e.buffer,e.byteOffset,u),a)}async read(t){return this.readSync(t)}readSync(t,e,o){let{memoryOffset:n,dtype:s,shape:i,stringBytes:l}=this.dataIdMap.get(t);if(s==="string")return(e==null||e===0)&&(o==null||o>=l.length)?l:l.slice(e,o);e=e||0,o=o||b.sizeFromShape(i);let u=b.bytesPerElement(s),a=this.wasm.HEAPU8.slice(n+e*u,n+o*u);return LX(a.buffer,s)}disposeData(t,e=!1){if(this.dataIdMap.has(t)){let o=this.dataIdMap.get(t);if(o.refCount--,!e&&o.refCount>0)return!1;this.wasm._free(o.memoryOffset),this.wasm.tfjs.disposeData(o.id),this.dataIdMap.delete(t)}return!0}refCount(t){return this.dataIdMap.has(t)?this.dataIdMap.get(t).refCount:0}incRef(t){let e=this.dataIdMap.get(t);e!=null&&e.refCount++}floatPrecision(){return 32}getMemoryOffset(t){return this.dataIdMap.get(t).memoryOffset}dispose(){this.wasm.tfjs.dispose(),"PThread"in this.wasm&&this.wasm.PThread.terminateAllThreads(),this.wasm=null}memory(){return{unreliable:!1}}makeOutput(t,e,o,n){let s;if(o==null)s=this.write(n??null,t,e);else{let i=this.dataIdNextNumber++;s={id:i},this.dataIdMap.set(s,{id:i,memoryOffset:o,shape:t,dtype:e,refCount:1});let l=b.sizeFromShape(t);this.wasm.tfjs.registerTensor(i,l,o)}return{dataId:s,shape:t,dtype:e}}typedArrayFromHeap({shape:t,dtype:e,dataId:o}){let n=this.wasm.HEAPU8.buffer,{memoryOffset:s}=this.dataIdMap.get(o),i=b.sizeFromShape(t);switch(e){case"float32":return new Float32Array(n,s,i);case"int32":return new Int32Array(n,s,i);case"bool":return new Uint8Array(n,s,i);default:throw new Error(`Unknown dtype ${e}`)}}};function BX(r){return(t,e)=>(b.fetch(r,{credentials:"same-origin"}).then(o=>{o.ok||t.env.a(`failed to load wasm binary file at '${r}'`),o.arrayBuffer().then(n=>{WebAssembly.instantiate(n,t).then(s=>{e(s.instance,s.module)})})}),{})}function M$(r,t,e){if(OC!=null)return OC;let o="tfjs-backend-wasm.wasm";return r&&t?o="tfjs-backend-wasm-threaded-simd.wasm":r&&(o="tfjs-backend-wasm-simd.wasm"),kc!=null&&kc[o]!=null?kc[o]:e+o}async function O$(){let[r,t]=await Promise.all([$().getAsync("WASM_HAS_SIMD_SUPPORT"),$().getAsync("WASM_HAS_MULTITHREAD_SUPPORT")]);return new Promise((e,o)=>{let n={};n.locateFile=(l,u)=>{if(l.endsWith(".worker.js")){let a=P$.wasmWorkerContents.replace(/\n/g,"\\n"),c=new Blob([a],{type:"application/javascript"});return URL.createObjectURL(c)}return l.endsWith(".wasm")?M$(r,t,Sc??u):u+l},B$&&(n.instantiateWasm=BX(M$(r,t,Sc??"")));let s=!1;n.onAbort=()=>{if(s||Af)return;Af=!0,o({message:"Make sure the server can serve the `.wasm` file relative to the bundled js file. For more details see https://github.com/tensorflow/tfjs/blob/master/tfjs-backend-wasm/README.md#using-bundlers"})};let i;t&&r&&OC==null?(n.mainScriptUrlOrBlob=new Blob(["var WasmBackendModuleThreadedSimd = "+$$.toString()],{type:"text/javascript"}),i=$$(n)):i=OX(n),i.then(l=>{s=!0,Af=!1;let u=null;l.tfjs={init:l.cwrap("init",null,[]),initWithThreadsCount:l.cwrap("init_with_threads_count",null,["number"]),getThreadsCount:l.cwrap("get_threads_count","number",[]),registerTensor:l.cwrap("register_tensor",null,["number","number","number"]),disposeData:l.cwrap("dispose_data",u,["number"]),dispose:l.cwrap("dispose",u,[])},e({wasm:l})}).catch(o)})}function LX(r,t){switch(t){case"float32":return new Float32Array(r);case"int32":return new Int32Array(r);case"bool":return new Uint8Array(r);default:throw new Error(`Unknown dtype ${t}`)}}var UX=["tfjs-backend-wasm.wasm","tfjs-backend-wasm-simd.wasm","tfjs-backend-wasm-threaded-simd.wasm"],OC=null,Sc=null,kc={},Af=!1,B$=!1;function UC(r,t=!1){if(Af)throw new Error("The WASM backend was already initialized. Make sure you call `setWasmPaths()` before you call `tf.setBackend()` or `tf.ready()`");if(typeof r=="string")Sc=r;else{kc=r;let e=UX.filter(o=>kc[o]==null);if(e.length>0)throw new Error(`There were no entries found for the following binaries: ${e.join(",")}. Please either call setWasmPaths with a map providing a path for each binary, or with a string indicating the directory where all the binaries can be found.`)}B$=t}var GX=-1,VX=-1;var WX=2;Ll("wasm",async()=>{let{wasm:r}=await O$();return new Tc(r)},WX);var $i=class{constructor(t){_t(this,"data");_t(this,"idx",0);_t(this,"decoder",new TextDecoder("utf-8"));this.data=t}skipWhitespace(){for(;this.idx<this.data.length;){let t=this.data[this.idx];if(t===32||t===10||t===13||t===9){this.idx++;continue}break}}readToken(){this.skipWhitespace();let t=this.idx;for(;this.idx<this.data.length;){let e=this.data[this.idx];if(e===32||e===10||e===13||e===9)break;this.idx++}if(this.idx<=t)throw new Error("Unexpected EOF while reading token");return this.decoder.decode(this.data.subarray(t,this.idx))}readInt(){let t=this.readToken(),e=Number.parseInt(t,10);if(!Number.isFinite(e))throw new Error(`Invalid int token: ${t}`);return e}readFloatAscii(){let t=this.readToken(),e=Number.parseFloat(t);if(!Number.isFinite(e))throw new Error(`Invalid float token: ${t}`);return e}readBinaryFloats(t){this.skipWhitespace();let e=this.data.subarray(this.idx,this.idx+5);if(e.length!==5||e[0]!==64||e[1]!==66||e[2]!==73||e[3]!==78||e[4]!==64)throw new Error("Expected @BIN@ marker");this.idx+=5;let o=t*4,n=this.data.byteOffset+this.idx,s=n+o;if(s>this.data.buffer.byteLength)throw new Error("Unexpected EOF while reading binary floats");let i=this.data.buffer.slice(n,s);return this.idx+=o,this.skipWhitespace(),new Float32Array(i)}};function Kr(r){r.readToken();let t=r.readInt(),e=r.readFloatAscii(),o=r.readInt()!==0,n=r.readInt()!==0,s=r.readBinaryFloats(t),i=r.readBinaryFloats(t),l=o?r.readBinaryFloats(t):new Float32Array(t).fill(1),u=n?r.readBinaryFloats(t):new Float32Array(t).fill(0),a=new Float32Array(t),c=new Float32Array(t);for(let p=0;p<t;p++){let m=l[p]/Math.sqrt(i[p]+e);a[p]=m,c[p]=u[p]-m*s[p]}return{channels:t,mergedScale:a,mergedBias:c}}function Qe(r,t){if(r.readToken(),t<11)return"relu";let e=r.readToken();if(e==="ACTIVATION_IDENTITY")return"identity";if(e==="ACTIVATION_RELU")return"relu";if(e==="ACTIVATION_MISH")return"mish";throw new Error(`Unsupported activation kind token: ${e}`)}function vr(r){let t=r.readToken(),e=r.readInt(),o=r.readInt(),n=r.readInt(),s=r.readInt(),i=r.readInt(),l=r.readInt(),u=r.readBinaryFloats(e*o*n*s);return{name:t,kernelY:e,kernelX:o,inChannels:n,outChannels:s,dilationY:i,dilationX:l,weights:u}}function qr(r){let t=r.readToken(),e=r.readInt(),o=r.readInt(),n=r.readBinaryFloats(e*o);return{name:t,inChannels:e,outChannels:o,weights:n}}function Mi(r){let t=r.readToken(),e=r.readInt(),o=r.readBinaryFloats(e);return{name:t,channels:e,weights:o}}var GC=192;function L$(r){let t=new $i(r),e=t.readToken(),o=t.readInt();if(o<8||o>16)throw new Error(`Unsupported modelVersion ${o}, supported 8..16`);let n=t.readInt(),s=t.readInt(),i=o>=13?{tdScoreMultiplier:t.readFloatAscii(),scoreMeanMultiplier:t.readFloatAscii(),scoreStdevMultiplier:t.readFloatAscii(),leadMultiplier:t.readFloatAscii(),varianceTimeMultiplier:t.readFloatAscii(),shorttermValueErrorMultiplier:t.readFloatAscii(),shorttermScoreErrorMultiplier:t.readFloatAscii(),outputScaleMultiplier:1}:{tdScoreMultiplier:20,scoreMeanMultiplier:20,scoreStdevMultiplier:20,leadMultiplier:20,varianceTimeMultiplier:40,shorttermValueErrorMultiplier:.25,shorttermScoreErrorMultiplier:30,outputScaleMultiplier:1},l=o>=15?t.readInt():0;if(o>=15)for(let st=0;st<7;st++)t.readInt();if(l!==0&&l!==1)throw new Error(`Unsupported metaEncoderVersion ${l}`);t.readToken();let u=t.readInt(),a=t.readInt(),c=t.readInt(),p=t.readInt();t.readInt();let m=t.readInt();if(o>=15){let st=t.readInt();if(st!==0)throw new Error(`Unsupported trunk norm kind ${st}`);for(let mt=0;mt<5;mt++)t.readInt()}let d=vr(t),f=qr(t),h;if(l>0){t.readToken();let st=t.readInt();if(st!==GC)throw new Error(`Unexpected numInputMetaChannels ${st}`);let mt=qr(t),dt=Mi(t),It=Qe(t,o),wt=qr(t),Rt=Mi(t),Ot=Qe(t,o),Tt=qr(t);if(Tt.outChannels!==a)throw new Error(`Meta encoder output ${Tt.outChannels} does not match trunk channels ${a}`);h={numInputMetaChannels:st,mul1:mt,bias1:dt,act1:It,mul2:wt,bias2:Rt,act2:Ot,mul3:Tt}}function g(){let st=t.readToken();if(st==="ordinary_block"){t.readToken();let mt=Kr(t),dt=Qe(t,o),It=vr(t),wt=Kr(t),Rt=Qe(t,o),Ot=vr(t);return{kind:"ordinary",preBN:mt,preActivation:dt,w1:It,midBN:wt,midActivation:Rt,w2:Ot}}if(st==="gpool_block"){t.readToken();let mt=Kr(t),dt=Qe(t,o),It=vr(t),wt=vr(t),Rt=Kr(t),Ot=Qe(t,o),Tt=qr(t),Wt=Kr(t),Ut=Qe(t,o),Xt=vr(t);return{kind:"gpool",preBN:mt,preActivation:dt,w1a:It,w1b:wt,gpoolBN:Rt,gpoolActivation:Ot,w1r:Tt,midBN:Wt,midActivation:Ut,w2:Xt}}if(st==="nested_bottleneck_block"){t.readToken();let mt=t.readInt(),dt=Kr(t),It=Qe(t,o),wt=vr(t),Rt=[];for(let Ut=0;Ut<mt;Ut++)Rt.push(g());let Ot=Kr(t),Tt=Qe(t,o),Wt=vr(t);return{kind:"nested_bottleneck",numBlocks:mt,preBN:dt,preActivation:It,preConv:wt,blocks:Rt,postBN:Ot,postActivation:Tt,postConv:Wt}}throw new Error(`Unsupported trunk block kind ${st}`)}let x=[];for(let st=0;st<u;st++)x.push(g());let y=Kr(t),C=Qe(t,o);t.readToken();let I=vr(t),v=vr(t),S=Kr(t),k=Qe(t,o),A=qr(t),D=Kr(t),F=Qe(t,o),M=vr(t),B=qr(t),U=o>=15?Mi(t):void 0,P=o>=15?Qe(t,o):void 0,L=o>=15?qr(t):void 0;t.readToken();let z=vr(t),V=Kr(t),W=Qe(t,o),q=qr(t),X=Mi(t),J=Qe(t,o),tt=qr(t),Y=Mi(t),Q=qr(t),ot=Mi(t),at=vr(t);return{modelName:e,modelVersion:o,numInputChannels:n,numInputGlobalChannels:s,metaEncoderVersion:l,metaEncoder:h,postProcessParams:i,policyOutChannels:M.outChannels,scoreValueChannels:Q.outChannels,trunk:{numBlocks:u,trunkNumChannels:a,midNumChannels:c,regularNumChannels:p,gpoolNumChannels:m,conv1:d,ginput:f,blocks:x,tipBN:y,tipActivation:C},policy:{p1:I,g1:v,g1BN:S,g1Activation:k,gpoolToBias:A,p1BN:D,p1Activation:F,p2:M,passMul:B,passBias:U,passActivation:P,passMul2:L},value:{v1:z,v1BN:V,v1Activation:W,v2:q,v2Bias:X,v2Activation:J,v3:tt,v3Bias:Y,sv3:Q,sv3Bias:ot,ownership:at}}}function uo(r){let t=mi(r.mergedScale,[1,1,1,r.channels]),e=mi(r.mergedBias,[1,1,1,r.channels]);return{scale:t,bias:e}}function $r(r){let t=mi(r.weights,[r.kernelY,r.kernelX,r.inChannels,r.outChannels]);return{kernelY:r.kernelY,kernelX:r.kernelX,inChannels:r.inChannels,outChannels:r.outChannels,dilationY:r.dilationY,dilationX:r.dilationX,filter:t}}function co(r){let t=pi(r.weights,[r.inChannels,r.outChannels]);return{inChannels:r.inChannels,outChannels:r.outChannels,w:t}}function Iu(r){let t=pi(r.weights,[1,r.channels]);return{channels:r.channels,b:t}}function zX(r,t){return t==="identity"?r:t==="relu"?na(r):yt(r,Wl(oa(r)))}function wu(r,t){return t==="identity"?r:t==="relu"?na(r):yt(r,Wl(oa(r)))}function lr(r,t,e){let o=Mt(yt(r,t.scale),t.bias);return zX(o,e)}function Ge(r,t){return xs(r,t.filter,1,"same","NHWC",[t.dilationY,t.dilationX])}function VC(r){let e=((r.shape[1]??19)-14)*.1,o=Hl(r,[1,2]),n=Rr(r,[1,2]);return oo([o,o.mul(e),n],1)}function WC(r){let e=(r.shape[1]??19)-14,o=e*.1,n=e*e*.01-.1,s=Hl(r,[1,2]);return oo([s,s.mul(o),s.mul(n)],1)}var Ef=class{constructor(t){_t(this,"modelName");_t(this,"modelVersion");_t(this,"postProcessParams");_t(this,"policyOutChannels");_t(this,"scoreValueChannels");_t(this,"metaEncoderVersion");_t(this,"metaEncoder");_t(this,"trunkConv1");_t(this,"trunkGInput");_t(this,"trunkBlocks");_t(this,"trunkTipBN");_t(this,"trunkTipActivation");_t(this,"p1");_t(this,"g1");_t(this,"g1BN");_t(this,"g1Activation");_t(this,"gpoolToBias");_t(this,"p1BN");_t(this,"p1Activation");_t(this,"p2");_t(this,"passMul");_t(this,"passBias");_t(this,"passActivation");_t(this,"passMul2");_t(this,"v1");_t(this,"v1BN");_t(this,"v1Activation");_t(this,"v2");_t(this,"v2Bias");_t(this,"v2Activation");_t(this,"v3");_t(this,"v3Bias");_t(this,"sv3");_t(this,"sv3Bias");_t(this,"ownership");this.modelName=t.modelName,this.modelVersion=t.modelVersion,this.postProcessParams=t.postProcessParams,this.policyOutChannels=t.policyOutChannels,this.scoreValueChannels=t.scoreValueChannels,this.metaEncoderVersion=t.metaEncoderVersion,t.metaEncoder&&(this.metaEncoder={mul1:co(t.metaEncoder.mul1),bias1:Iu(t.metaEncoder.bias1),act1:t.metaEncoder.act1,mul2:co(t.metaEncoder.mul2),bias2:Iu(t.metaEncoder.bias2),act2:t.metaEncoder.act2,mul3:co(t.metaEncoder.mul3)}),this.trunkConv1=$r(t.trunk.conv1),this.trunkGInput=co(t.trunk.ginput);let e=o=>o.kind==="ordinary"?{kind:"ordinary",preBN:uo(o.preBN),preActivation:o.preActivation,w1:$r(o.w1),midBN:uo(o.midBN),midActivation:o.midActivation,w2:$r(o.w2)}:o.kind==="gpool"?{kind:"gpool",preBN:uo(o.preBN),preActivation:o.preActivation,w1a:$r(o.w1a),w1b:$r(o.w1b),gpoolBN:uo(o.gpoolBN),gpoolActivation:o.gpoolActivation,w1r:co(o.w1r),midBN:uo(o.midBN),midActivation:o.midActivation,w2:$r(o.w2)}:{kind:"nested_bottleneck",numBlocks:o.numBlocks,preBN:uo(o.preBN),preActivation:o.preActivation,preConv:$r(o.preConv),blocks:o.blocks.map(e),postBN:uo(o.postBN),postActivation:o.postActivation,postConv:$r(o.postConv)};this.trunkBlocks=t.trunk.blocks.map(e),this.trunkTipBN=uo(t.trunk.tipBN),this.trunkTipActivation=t.trunk.tipActivation,this.p1=$r(t.policy.p1),this.g1=$r(t.policy.g1),this.g1BN=uo(t.policy.g1BN),this.g1Activation=t.policy.g1Activation,this.gpoolToBias=co(t.policy.gpoolToBias),this.p1BN=uo(t.policy.p1BN),this.p1Activation=t.policy.p1Activation,this.p2=$r(t.policy.p2),this.passMul=co(t.policy.passMul),this.passBias=t.policy.passBias?Iu(t.policy.passBias):void 0,this.passActivation=t.policy.passActivation,this.passMul2=t.policy.passMul2?co(t.policy.passMul2):void 0,this.v1=$r(t.value.v1),this.v1BN=uo(t.value.v1BN),this.v1Activation=t.value.v1Activation,this.v2=co(t.value.v2),this.v2Bias=Iu(t.value.v2Bias),this.v2Activation=t.value.v2Activation,this.v3=co(t.value.v3),this.v3Bias=Iu(t.value.v3Bias),this.sv3=co(t.value.sv3),this.sv3Bias=Iu(t.value.sv3Bias),this.ownership=$r(t.value.ownership)}forward(t,e,o){return zt(()=>{let n=this.forwardTrunk(t,e,o),s=Ge(n,this.p1),i=Ge(n,this.g1),l=lr(i,this.g1BN,this.g1Activation),u=VC(l),a=re(u,this.gpoolToBias.w);s=s.add(a.reshape([a.shape[0],1,1,a.shape[1]]));let c=lr(s,this.p1BN,this.p1Activation),p=Ge(c,this.p2),m=this.forwardPolicyPass(u),d=Ge(n,this.v1),f=lr(d,this.v1BN,this.v1Activation),h=WC(f),g=re(h,this.v2.w);g=g.add(this.v2Bias.b),g=wu(g,this.v2Activation);let x=re(g,this.v3.w);x=x.add(this.v3Bias.b);let y=re(g,this.sv3.w);y=y.add(this.sv3Bias.b);let C=Ge(f,this.ownership);return{policy:p,policyPass:m,value:x,scoreValue:y,ownership:C}})}forwardPolicyValue(t,e,o){return zt(()=>{let n=this.forwardTrunk(t,e,o),s=Ge(n,this.p1),i=Ge(n,this.g1),l=lr(i,this.g1BN,this.g1Activation),u=VC(l),a=re(u,this.gpoolToBias.w);s=s.add(a.reshape([a.shape[0],1,1,a.shape[1]]));let c=lr(s,this.p1BN,this.p1Activation),p=Ge(c,this.p2),m=this.forwardPolicyPass(u),d=Ge(n,this.v1),f=lr(d,this.v1BN,this.v1Activation),h=WC(f),g=re(h,this.v2.w);g=g.add(this.v2Bias.b),g=wu(g,this.v2Activation);let x=re(g,this.v3.w);x=x.add(this.v3Bias.b);let y=re(g,this.sv3.w);return y=y.add(this.sv3Bias.b),{policy:p,policyPass:m,value:x,scoreValue:y}})}forwardValueOnly(t,e,o){return zt(()=>{let n=this.forwardTrunk(t,e,o),s=Ge(n,this.v1),i=lr(s,this.v1BN,this.v1Activation),l=WC(i),u=re(l,this.v2.w);u=u.add(this.v2Bias.b),u=wu(u,this.v2Activation);let a=re(u,this.v3.w);a=a.add(this.v3Bias.b);let c=re(u,this.sv3.w);return c=c.add(this.sv3Bias.b),{value:a,scoreValue:c}})}forwardTrunk(t,e,o){let n=Ge(t,this.trunkConv1),s=re(e,this.trunkGInput.w);if(n=n.add(s.reshape([s.shape[0],1,1,s.shape[1]])),this.metaEncoder){if(!o)throw new Error("This model needs SGF metadata input");let i=this.forwardMetaEncoder(o);n=n.add(i.reshape([i.shape[0],1,1,i.shape[1]]))}return n=this.applyBlockStack(n,this.trunkBlocks),lr(n,this.trunkTipBN,this.trunkTipActivation)}forwardMetaEncoder(t){let e=this.metaEncoder,o=re(t,e.mul1.w);return o=o.add(e.bias1.b),o=wu(o,e.act1),o=re(o,e.mul2.w),o=o.add(e.bias2.b),o=wu(o,e.act2),re(o,e.mul3.w)}forwardPolicyPass(t){let e=re(t,this.passMul.w);return this.passBias&&this.passActivation&&this.passMul2&&(e=e.add(this.passBias.b),e=wu(e,this.passActivation),e=re(e,this.passMul2.w)),e}applyBlockStack(t,e){for(let o of e){if(o.kind==="ordinary"){let u=lr(t,o.preBN,o.preActivation),a=Ge(u,o.w1),c=lr(a,o.midBN,o.midActivation),p=Ge(c,o.w2);t=t.add(p);continue}if(o.kind==="gpool"){let u=lr(t,o.preBN,o.preActivation),a=Ge(u,o.w1a),c=Ge(u,o.w1b),p=lr(c,o.gpoolBN,o.gpoolActivation),m=VC(p),d=re(m,o.w1r.w);a=a.add(d.reshape([d.shape[0],1,1,d.shape[1]]));let f=lr(a,o.midBN,o.midActivation),h=Ge(f,o.w2);t=t.add(h);continue}let n=lr(t,o.preBN,o.preActivation),s=Ge(n,o.preConv);s=this.applyBlockStack(s,o.blocks);let i=lr(s,o.postBN,o.postActivation),l=Ge(i,o.postConv);t=t.add(l)}return t}dispose(){let t=[this.trunkConv1.filter,this.trunkGInput.w,this.trunkTipBN.scale,this.trunkTipBN.bias,this.p1.filter,this.g1.filter,this.g1BN.scale,this.g1BN.bias,this.gpoolToBias.w,this.p1BN.scale,this.p1BN.bias,this.p2.filter,this.passMul.w,...this.passBias?[this.passBias.b]:[],...this.passMul2?[this.passMul2.w]:[],this.v1.filter,this.v1BN.scale,this.v1BN.bias,this.v2.w,this.v2Bias.b,this.v3.w,this.v3Bias.b,this.sv3.w,this.sv3Bias.b,this.ownership.filter],e=o=>{if(t.push(o.preBN.scale,o.preBN.bias),o.kind==="ordinary"){t.push(o.w1.filter,o.midBN.scale,o.midBN.bias,o.w2.filter);return}if(o.kind==="gpool"){t.push(o.w1a.filter,o.w1b.filter,o.gpoolBN.scale,o.gpoolBN.bias,o.w1r.w,o.midBN.scale,o.midBN.bias,o.w2.filter);return}t.push(o.preConv.filter);for(let n of o.blocks)e(n);t.push(o.postBN.scale,o.postBN.bias,o.postConv.filter)};for(let o of this.trunkBlocks)e(o);Ce(t)}};var vt=19,j=vt*vt,Sr=j,Et=0,No=1,ks=2;function ur(r){return 3-r}var le=new Int16Array(j),ue=new Int8Array(j),Yt=new Int16Array(j*4),tI=le,eI=ue,rI=Yt,Li=new Int32Array(j),Rc=new Int32Array(j),Dc=0,Te=new Int16Array(j),_o=new Int16Array(j);function tr(r,t,e,o){Dc++;let n=Dc,s=0,i=0,l=0;for(Li[t]=n,_o[i++]=t;i>0;){let u=_o[--i];Te[s++]=u;let a=le[u],c=ue[u];for(let p=0;p<c;p++){let m=Yt[a+p],d=r[m];d===Et?l<o&&Rc[m]!==n&&(Rc[m]=n,l++):d===e&&Li[m]!==n&&(Li[m]=n,_o[i++]=m)}}return{groupLen:s,liberties:l}}var Fc=new Int32Array(j),$c=0,HC=new Int32Array(j),KC=0,Pi=new Int16Array(j),_c=new Int16Array(j),vu=new Uint8Array(j),da=new Int16Array(j),oI=new Uint8Array(j),$f=new Int16Array(j),Mf=new Int16Array(j),Pf=new Int16Array(j),Mr=(j+1)/2+1|0,Rf=new Int16Array(Mr),Nc=new Uint16Array(Mr),Ss=new Uint8Array(Mr),Su=new Uint8Array(Mr),Ac=new Uint8Array(Mr),Oi=new Int16Array(Mr*4),Df=new Int16Array(j),Ff=new Int16Array(j),Ec=new Uint8Array(j),Bi=new Int16Array(j),K$=r=>{vt=r,j=vt*vt,Sr=j,le=new Int16Array(j),ue=new Int8Array(j),Yt=new Int16Array(j*4);let t=0;for(let e=0;e<vt;e++)for(let o=0;o<vt;o++){let n=e*vt+o;le[n]=t;let s=0;o>0&&(Yt[t++]=n-1,s++),o+1<vt&&(Yt[t++]=n+1,s++),e>0&&(Yt[t++]=n-vt,s++),e+1<vt&&(Yt[t++]=n+vt,s++),ue[n]=s}tI=le,eI=ue,rI=Yt,Li=new Int32Array(j),Rc=new Int32Array(j),Te=new Int16Array(j),_o=new Int16Array(j),Fc=new Int32Array(j),HC=new Int32Array(j),Dc=0,$c=0,KC=0,Pi=new Int16Array(j),_c=new Int16Array(j),vu=new Uint8Array(j),da=new Int16Array(j),oI=new Uint8Array(j),$f=new Int16Array(j),Mf=new Int16Array(j),Pf=new Int16Array(j),Mr=(j+1)/2+1|0,Rf=new Int16Array(Mr),Nc=new Uint16Array(Mr),Ss=new Uint8Array(Mr),Su=new Uint8Array(Mr),Ac=new Uint8Array(Mr),Oi=new Int16Array(Mr*4),Df=new Int16Array(j),Ff=new Int16Array(j),Ec=new Uint8Array(j),Bi=new Int16Array(j),Je=j*3/2+2|0,Ui={bufMoves:new Int16Array(Z$),moveListStarts:new Int32Array(Je),moveListLens:new Int32Array(Je),moveListCur:new Int32Array(Je),recordMoves:new Int16Array(Je),recordPlayers:new Uint8Array(Je),recordKoPointBefore:new Int16Array(Je),recordCaptureStart:new Int32Array(Je),tmpKoPointBefore:new Int16Array(1),tmpCaptureStart:new Int32Array(1),captureStack:[]},Mc=new Int32Array(j),qC=new Int32Array(j),Oc=new Int16Array(j),XC=new Int32Array(j),ZC=new Int32Array(j),Pc=0,jC=0,YC=0,QC=0,Gi={copyPos:{stones:new Uint8Array(j),koPoint:-1},groupStones:new Int16Array(j),workingMoves:[]}};function q$(r){let t=Math.max(2,Math.floor(r));t!==vt&&K$(t)}function Lf(r,t,e,o,n=!1){let s=r.koPoint,i=o.length;if(t===Sr)return r.koPoint=-1,{koPointBefore:s,captureStart:i};if(t<0||t>=j)throw new Error(`Invalid move index ${t}`);if(r.stones[t]!==Et)throw new Error("Move on occupied point");if(r.koPoint===t)throw new Error("Move violates simple ko");let l=ur(e);r.stones[t]=e;let u=0,a=-1;$c++;let c=$c,p=le[t],m=ue[t];for(let f=0;f<m;f++){let h=Yt[p+f];if(r.stones[h]!==l||Fc[h]===c)continue;let{groupLen:g,liberties:x}=tr(r.stones,h,l,1);for(let y=0;y<g;y++)Fc[Te[y]]=c;if(x===0){for(let y=0;y<g;y++){let C=Te[y];r.stones[C]=Et,o.push(C)}u+=g,u===1&&g===1&&(a=Te[0]),u>1&&(a=-1)}}let d=tr(r.stones,t,e,2);if(d.liberties===0){if(n&&d.groupLen>1){for(let f=0;f<d.groupLen;f++){let h=Te[f];r.stones[h]=Et,o.push(h)}return r.koPoint=-1,{koPointBefore:s,captureStart:i,selfCapture:!0}}r.stones[t]=Et;for(let f=o.length-1;f>=i;f--)r.stones[o[f]]=l;throw o.length=i,new Error("Illegal suicide move")}return u===1&&a>=0&&d.groupLen===1&&d.liberties===1?r.koPoint=a:r.koPoint=-1,{koPointBefore:s,captureStart:i}}function j$(r,t,e,o,n){let s=n.length,i=o.selfCapture?e:ur(e);for(let l=o.captureStart;l<s;l++){let u=n[l];r.stones[u]=i}t!==Sr&&(r.stones[t]=Et),n.length=o.captureStart,r.koPoint=o.koPointBefore}function nI(r,t){if(t.length!==j)throw new Error(`computeLibertyMapInto: expected out length ${j}, got ${t.length}`);t.fill(0),KC++;let e=KC;for(let o=0;o<j;o++){let n=r[o];if(n===Et||HC[o]===e)continue;let{groupLen:s,liberties:i}=tr(r,o,n,4),l=i>=4?4:i;for(let u=0;u<s;u++){let a=Te[u];t[a]=l,HC[a]=e}}return t}function Uf(r){return nI(r,new Uint8Array(j))}function HX(r){da.fill(-1);let t=0,e=0;for(let o=0;o<j;o++){let n=r[o];if(n===Et||da[o]!==-1)continue;let s=t++;oI[s]=n,$f[s]=e;let i=0;_o[i++]=o,da[o]=s;let l=0;for(;i>0;){let u=_o[--i];Pf[e++]=u,l++;let a=le[u],c=ue[u];for(let p=0;p<c;p++){let m=Yt[a+p];r[m]===n&&da[m]===-1&&(da[m]=s,_o[i++]=m)}}Mf[s]=l}return t}function KX(r,t,e){let o=le[t],n=ue[t];for(let s=0;s<n;s++){let i=Yt[o+s];if(r[i]===e)return!0}return!1}function qX(r,t,e,o){let n=le[t],s=ue[t];for(let i=0;i<s;i++){let l=Yt[n+i];if(r[l]===e&&da[l]===o)return!0}return!1}function U$(r){let{stones:t,numGroups:e,plaColor:o,safeBigTerritories:n,unsafeBigTerritories:s,isMultiStoneSuicideLegal:i,result:l}=r,u=ur(o);Pi.fill(-1),vu.fill(0);let a=0,c=0,p=!1,m=(f,h)=>{let g=f,x=0,y=1;Df[0]=f,Pi[f]=h;let C=Ss[h]>0;for(;x!==y;){let I=Df[x++];if(C&&(i||t[I]===Et)){let k=Nc[h],A=Ss[h],D=0;for(let F=0;F<A;F++){let M=Oi[k+F];qX(t,I,o,M)&&(Oi[k+D]=M,D++)}Ss[h]=D,C=D>0}Su[h]<2&&!KX(t,I,o)&&(Su[h]=Su[h]+1),t[I]===u&&(Ac[h]=1),_c[I]=g,g=I;let v=le[I],S=ue[I];for(let k=0;k<S;k++){let A=Yt[v+k],D=t[A];D!==Et&&D!==u||Pi[A]===-1&&(Pi[A]=h,Df[y++]=A)}}return g};for(let f=0;f<j;f++){if(Pi[f]!==-1)continue;let h=t[f];if(h!==Et){h===o&&(p=!0);continue}let g=a++;Rf[g]=f,Nc[g]=c,Ss[g]=0,Su[g]=0,Ac[g]=0;let x=0;{let C=le[f],I=ue[f];for(let v=0;v<I;v++){let S=Yt[C+v];if(t[S]!==o)continue;let k=da[S],A=!1;for(let D=0;D<x;D++)if(Oi[c+D]===k){A=!0;break}if(!A&&(Oi[c+x]=k,x++,x>=4))break}}Ss[g]=x;let y=m(f,g);_c[f]=y,c+=Ss[g]}let d=0;for(let f=0;f<e;f++)oI[f]===o&&(Ff[d++]=f,Ec[f]=0,Bi[f]=0);for(let f=0;f<a;f++){let h=Nc[f],g=Ss[f];for(let x=0;x<g;x++){let y=Oi[h+x];Bi[y]=Bi[y]+1}}for(;;){let f=!1;for(let h=0;h<d;h++){let g=Ff[h];if(Ec[g]||Bi[g]>=2)continue;Ec[g]=1,f=!0;let x=$f[g],y=Mf[g];for(let C=0;C<y;C++){let I=Pf[x+C],v=le[I],S=ue[I];for(let k=0;k<S;k++){let A=Yt[v+k],D=Pi[A];if(D<0)continue;let F=Rf[D];if(vu[F])continue;let M=t[A];if(M!==Et&&M!==u)continue;vu[F]=1;let B=Nc[D],U=Ss[D];for(let P=0;P<U;P++){let L=Oi[B+P];Bi[L]=Bi[L]-1}}}}if(!f)break}for(let f=0;f<d;f++){let h=Ff[f];if(Ec[h])continue;let g=$f[h],x=Mf[h];for(let y=0;y<x;y++)l[Pf[g+y]]=o}for(let f=0;f<a;f++){let h=Rf[f],g=Su[f]<=1&&!vu[h]&&p;if(g=g||n&&!Ac[f]&&!vu[h]&&p,g){let x=h;do l[x]=o,x=_c[x];while(x!==h)}else if(s&&!Ac[f]&&p){let y=h;do l[y]===Et&&(l[y]=o),y=_c[y];while(y!==h)}}}function X$(r,t=!1){return Gf(r,new Uint8Array(j),t)}function Gf(r,t,e=!1){if(t.length!==j)throw new Error(`computeAreaMapV7KataGoInto: expected out length ${j}, got ${t.length}`);t.fill(Et);let o=HX(r);U$({stones:r,numGroups:o,plaColor:No,safeBigTerritories:!0,unsafeBigTerritories:!0,isMultiStoneSuicideLegal:e,result:t}),U$({stones:r,numGroups:o,plaColor:ks,safeBigTerritories:!0,unsafeBigTerritories:!0,isMultiStoneSuicideLegal:e,result:t});for(let n=0;n<j;n++)t[n]===Et&&(t[n]=r[n]);return t}function G$(r,t){let e=r[t];return e===Et?0:tr(r,t,e,2).liberties}var jX=new Uint8Array(j),XX=new Int16Array(j),zC=new Uint8Array(j);function sI(r,t,e={}){if(t.length!==j)throw new Error(`computeIndependentLifeAreaInto: expected out length ${j}, got ${t.length}`);zC.length!==j&&(zC=new Uint8Array(j));let o=zC;Gf(r,o,e.isMultiStoneSuicideLegal??!1),t.fill(Et);let n=jX.subarray(0,j);n.fill(0);let s=XX;for(let l=0;l<j;l++){let u=o[l];if(u===Et||n[l])continue;let a=!1;if(r[l]===u&&G$(r,l)===1&&(a=!0),!a){let m=le[l],d=ue[l];for(let f=0;f<d;f++){let h=Yt[m+f];if(r[h]===Et&&o[h]===Et){a=!0;break}}}if(!a)continue;let c=0,p=0;for(n[l]=1,s[p++]=l;c!==p;){let m=s[c++],d=le[m],f=ue[m];for(let h=0;h<f;h++){let g=Yt[d+h];o[g]===u&&!n[g]&&(n[g]=1,s[p++]=g)}}}let i=0;for(let l=0;l<j;l++){let u=o[l];if(u===Et||n[l]||t[l]===u)continue;i+=u===ks?1:-1,t[l]=u;let a=0,c=0;for(s[c++]=l;a!==c;){let p=s[a++],m=le[p],d=ue[p];for(let f=0;f<d;f++){let h=Yt[m+f];o[h]===u&&t[h]!==u&&(t[h]=u,s[c++]=h)}}}if(e.keepTerritories)for(let l=0;l<j;l++){let u=o[l];if(u===Et||u===r[l])continue;let a=!1;if(e.excludeTerritoryAdjacentToAtari&&r[l]===Et){let c=le[l],p=ue[l];for(let m=0;m<p;m++){let d=Yt[c+m];if(r[d]===u&&G$(r,d)===1){a=!0;break}}}a||(t[l]=u)}if(e.keepStones)for(let l=0;l<j;l++){let u=o[l];u!==Et&&u===r[l]&&(t[l]=u)}return{whiteMinusBlackIndependentLifeRegionCount:i}}function Y$(r,t={}){let e=new Uint8Array(j),{whiteMinusBlackIndependentLifeRegionCount:o}=sI(r,e,t);return{area:e,whiteMinusBlackIndependentLifeRegionCount:o}}var Je=j*3/2+2|0,Z$=8192,YX=25e3,Ui={bufMoves:new Int16Array(Z$),moveListStarts:new Int32Array(Je),moveListLens:new Int32Array(Je),moveListCur:new Int32Array(Je),recordMoves:new Int16Array(Je),recordPlayers:new Uint8Array(Je),recordKoPointBefore:new Int16Array(Je),recordCaptureStart:new Int32Array(Je),tmpKoPointBefore:new Int16Array(1),tmpCaptureStart:new Int32Array(1),captureStack:[]},Mc=new Int32Array(j),Pc=0,qC=new Int32Array(j),jC=0,Oc=new Int16Array(j),XC=new Int32Array(j),YC=0,ZC=new Int32Array(j),QC=0;function ZX(r,t){if(r===t)return!1;let e=r-t;return e===1||e===-1?(r/vt|0)===(t/vt|0):e===vt||e===-vt}function V$(r,t){let e=0,o=le[t],n=ue[t];for(let s=0;s<n;s++){let i=Yt[o+s];r[i]===Et&&e++}return e}function Of(r,t,e,o,n,s){Dc++;let i=Dc,l=0,u=0,a=0;for(Li[t]=i,_o[l++]=t;l>0;){let c=_o[--l];Te[u++]=c;let p=le[c],m=ue[c];for(let d=0;d<m;d++){let f=Yt[p+d],h=r[f];h===Et?a<s&&Rc[f]!==i&&(Rc[f]=i,o[n+a]=f,a++):h===e&&Li[f]!==i&&(Li[f]=i,_o[l++]=f)}}return a}function Vi(r,t,e){let o=r[t];return o===Et?0:tr(r,t,o,e).liberties}function W$(r,t,e){if(r[t]!==Et)return!1;let o=ur(e),n=-1,s=le[t],i=ue[t];i<4;for(let u=0;u<i;u++){let a=Yt[s+u];if(r[a]!==o)return!1;if(Vi(r,a,2)===1){if(n!==-1)return!1;n=a}}if(n===-1)return!1;let l=tr(r,n,o,2);return l.liberties!==1?!1:l.groupLen===1}function QX(r,t){let e=r[t];if(e===Et)return!1;let o=ur(e),n=tr(r,t,e,2);for(let s=0;s<n.groupLen;s++)Oc[s]=Te[s];for(let s=0;s<n.groupLen;s++){let i=Oc[s],l=le[i],u=ue[i];for(let a=0;a<u;a++){let c=Yt[l+a];if(r[c]===o&&Vi(r,c,2)===1)return!0}}return!1}function z$(r,t,e){let o=0,n=le[t],s=ue[t];for(let i=0;i<s;i++){let l=Yt[n+i];if(r[l]!==e)continue;let u=Vi(r,l,20);u>1&&(o+=u*2-3)}return o}function JX(r,t,e){let o=ur(e),n=0,s=0,i=0,l=0,u=0,a=le[t],c=ue[t];for(let d=0;d<c;d++){let f=Yt[a+d],h=r[f];if(h===Et)n++;else if(h===o){let g=tr(r,f,o,2);g.liberties===1&&(s++,i+=g.groupLen)}else if(h===e){let x=Vi(r,f,20)-1;l+=x,x>u&&(u=x)}}let p=s+(u>n?u:n),m=n+i+l;return{lowerBound:p,upperBound:m}}function H$(r,t,e,o){if(r[t]!==Et)return 0;let n=ur(e);QC++;let s=QC,i=new Int16Array(16),l=0,u=d=>{for(let f=0;f<l;f++)if(i[f]===d)return!1;return i[l++]=d,!0},a=le[t],c=ue[t];for(let d=0;d<c;d++){let f=Yt[a+d],h=r[f];if(h===Et){if(u(f),l>=o)return o}else if(h===n){let g=tr(r,f,n,2);if(g.liberties===1){if(u(f),l>=o)return o;for(let x=0;x<g.groupLen;x++)ZC[Te[x]]=s}}}YC++;let p=YC,m=d=>{let f=r[d];return f===Et?!0:f===n&&ZC[d]===s};for(let d=0;d<c;d++){let f=Yt[a+d];if(r[f]!==e||XC[f]===p)continue;let h=tr(r,f,e,o);for(let g=0;g<h.groupLen;g++)XC[Te[g]]=p;for(let g=0;g<h.groupLen;g++){let x=Te[g],y=le[x],C=ue[x];for(let I=0;I<C;I++){let v=Yt[y+I];if(v!==t&&m(v)&&(u(v),l>=o))return o}}}return l}function t5(r,t,e,o){let n=r[t];if(n===Et)return 0;let s=ur(n);jC++;let i=jC,l=tr(r,t,n,2);for(let a=0;a<l.groupLen;a++)Oc[a]=Te[a];let u=0;for(let a=0;a<l.groupLen;a++){let c=Oc[a],p=le[c],m=ue[c];for(let d=0;d<m;d++){let f=Yt[p+d];if(r[f]!==s||qC[f]===i)continue;let h=Of(r,f,s,e,o+u,2),g=tr(r,f,s,2).groupLen;for(let x=0;x<g;x++)qC[Te[x]]=i;if(h===1&&(u+=1,o+u>=e.length))return u}}return u}function Bc(r,t,e,o,n,s){let i=s.length,l=ur(e);t!==Sr&&(r.stones[t]=Et);for(let u=n;u<i;u++){let a=s[u];r.stones[a]=l}s.length=n,r.koPoint=o}function JC(r,t,e,o,n,s,i){let l=r.koPoint,u=o.length;if(n[i]=l,s[i]=u,t===Sr)return r.koPoint=-1,!0;if(t<0||t>=j||r.stones[t]!==Et||r.koPoint===t)return!1;let a=ur(e);r.stones[t]=e;let c=0,p=-1;$c++;let m=$c,d=le[t],f=ue[t];for(let g=0;g<f;g++){let x=Yt[d+g];if(r.stones[x]!==a||Fc[x]===m)continue;let{groupLen:y,liberties:C}=tr(r.stones,x,a,1);for(let I=0;I<y;I++)Fc[Te[I]]=m;if(C===0){for(let I=0;I<y;I++){let v=Te[I];r.stones[v]=Et,o.push(v)}c+=y,c===1&&y===1&&(p=Te[0]),c>1&&(p=-1)}}let h=tr(r.stones,t,e,2);return h.liberties===0?(Bc(r,t,e,l,u,o),!1):(c===1&&p>=0&&h.groupLen===1&&h.liberties===1?r.koPoint=p:r.koPoint=-1,!0)}function Bf(r,t,e,o){if(t<0||t>=j)return!1;let n=r.stones[t];if(n!==No&&n!==ks)return!1;let s=Vi(r.stones,t,3);if(s>2||e&&s>1)return!1;let i=n,l=ur(i),u=r.koPoint;e&&(r.koPoint=-1);let{bufMoves:a,moveListStarts:c,moveListLens:p,moveListCur:m,recordMoves:d,recordPlayers:f,recordKoPointBefore:h,recordCaptureStart:g,captureStack:x}=o,y=Je,C=0,I=0;m[0]=-1,c[0]=0,p[0]=0;let v=!1,S=!1;for(;;){if(C<=-1)return r.koPoint=u,v;if(C>=y-1){v=!0,S=!0,C--;continue}if(I>=YX){for(let F=C-1;F>=0;F--)Bc(r,d[F],f[F],h[F],g[F],x);return r.koPoint=u,!1}let k=e&&C%2===0||!e&&C%2===1;if(m[C]===-1){let F=Vi(r.stones,t,3);if(!k&&F<=1){v=!0,S=!0,C--;continue}if(!k&&F>=3){v=!1,S=!0,C--;continue}if(k&&F>=2){v=!1,S=!0,C--;continue}if(k&&r.koPoint!==-1){v=!1,S=!0,C--;continue}let M=c[C],B=0;if(k){if(B=t5(r.stones,t,a,M),B+=Of(r.stones,t,i,a,M+B,1),B<=0){v=!0,S=!0,C--;continue}let U=a[M+B-1],P=JX(r.stones,U,i);if(P.lowerBound>=3){v=!1,S=!0,C--;continue}if(B===1&&P.upperBound<=1){v=!0,S=!0,C--;continue}}else{if(B+=Of(r.stones,t,i,a,M,2),B!==2){v=!1,S=!0,C--;continue}let U=V$(r.stones,a[M]),P=V$(r.stones,a[M+1]);if(U===0&&P===0&&W$(r.stones,a[M],l)&&W$(r.stones,a[M+1],l)&&H$(r.stones,a[M],i,3)<=2&&H$(r.stones,a[M+1],i,3)<=2&&!QX(r.stones,t)){v=!0,S=!0,C--;continue}if(!ZX(a[M],a[M+1]))if(U>=3&&P>=3){v=!1,S=!0,C--;continue}else U>=3?B=1:P>=3&&(a[M]=a[M+1],B=1);if(B>1&&(U=U*2+z$(r.stones,a[M],i),P=P*2+z$(r.stones,a[M+1],i),P>U)){let L=a[M];a[M]=a[M+1],a[M+1]=L}}p[C]=B,m[C]=0}else{if(S&&Bc(r,d[C],f[C],h[C],g[C],x),k&&!v){S=!0,C--;continue}if(!k&&v){S=!0,C--;continue}m[C]=m[C]+1|0}if(m[C]>=p[C]){v=k,S=!0,C--;continue}let A=a[c[C]+m[C]],D=k?i:l;if(d[C]=A,f[C]=D,!JC(r,A,D,x,h,g,C)){v=k,S=!1;continue}I++,C++,m[C]=-1,c[C]=c[C-1]+p[C-1],p[C]=0}}function Q$(r,t,e,o){if(t<0||t>=j)return!1;let n=r.stones[t];if(n!==No&&n!==ks||Vi(r.stones,t,3)!==2)return!1;let s=n,i=ur(s),l=new Int16Array(2);if(Of(r.stones,t,s,l,0,2)!==2)return!1;let a=l[0],c=l[1],p=!1,m=!1;return o.length=0,e.captureStack.length=0,JC(r,a,i,e.captureStack,e.tmpKoPointBefore,e.tmpCaptureStart,0)&&(p=Bf(r,t,!0,e),Bc(r,a,i,e.tmpKoPointBefore[0],e.tmpCaptureStart[0],e.captureStack)),JC(r,c,i,e.captureStack,e.tmpKoPointBefore,e.tmpCaptureStart,0)&&(m=Bf(r,t,!0,e),Bc(r,c,i,e.tmpKoPointBefore[0],e.tmpCaptureStart[0],e.captureStack)),p||m?(p&&o.push(a),m&&o.push(c),!0):!1}var Gi={copyPos:{stones:new Uint8Array(j),koPoint:-1},groupStones:new Int16Array(j),workingMoves:[]};function J$(r){let{stones:t,koPoint:e,currentPlayer:o,outLadderedStones:n,outLadderWorkingMoves:s}=r;n.fill(0),s.fill(0);let i=ur(o);Pc++;let l=Pc,u=Gi.copyPos,a=Gi.groupStones,c=Gi.workingMoves;for(let p=0;p<j;p++){let m=t[p];if(m===Et||Mc[p]===l)continue;let d=tr(t,p,m,3);for(let h=0;h<d.groupLen;h++)Mc[Te[h]]=l;if(d.liberties!==1&&d.liberties!==2)continue;a.set(Te.subarray(0,d.groupLen)),u.stones.set(t),u.koPoint=e,Ui.captureStack.length=0;let f=!1;if(c.length=0,d.liberties===1?f=Bf(u,p,!0,Ui):f=Q$(u,p,Ui,c),!!f){for(let h=0;h<d.groupLen;h++)n[a[h]]=1;if(d.liberties===2&&m===i&&c.length>0)for(let h=0;h<c.length;h++)s[c[h]]=1}}}function aI(r){let{stones:t,koPoint:e,outLadderedStones:o}=r;o.fill(0),Pc++;let n=Pc,s=Gi.copyPos,i=Gi.groupStones,l=Gi.workingMoves;for(let u=0;u<j;u++){let a=t[u];if(a===Et||Mc[u]===n)continue;let c=tr(t,u,a,3);for(let m=0;m<c.groupLen;m++)Mc[Te[m]]=n;if(c.liberties!==1&&c.liberties!==2)continue;i.set(Te.subarray(0,c.groupLen)),s.stones.set(t),s.koPoint=e,Ui.captureStack.length=0,l.length=0;let p=!1;if(c.liberties===1?p=Bf(s,u,!0,Ui):p=Q$(s,u,Ui,l),!!p)for(let m=0;m<c.groupLen;m++)o[i[m]]=1}}K$(vt);var Ts={japanese:{id:"japanese",label:"Japanese",summary:"Territory scoring, seki tax, simple ko.",scoring:"territory",ko:"simple",tax:"seki",multiStoneSuicideLegal:!1,hasButton:!1,friendlyPassOk:!1,handicapBonus:"zero",defaultKomi:6.5,sgf:"Japanese"},korean:{id:"korean",label:"Korean",summary:"Same as Japanese: territory scoring, seki tax, simple ko.",scoring:"territory",ko:"simple",tax:"seki",multiStoneSuicideLegal:!1,hasButton:!1,friendlyPassOk:!1,handicapBonus:"zero",defaultKomi:6.5,sgf:"Korean"},chinese:{id:"chinese",label:"Chinese",summary:"Area scoring, simple ko, White gets a point per handicap stone.",scoring:"area",ko:"simple",tax:"none",multiStoneSuicideLegal:!1,hasButton:!1,friendlyPassOk:!0,handicapBonus:"n",defaultKomi:7.5,sgf:"Chinese"},aga:{id:"aga",label:"AGA",summary:"Area scoring, situational superko, White gets N\u22121 for handicap.",scoring:"area",ko:"situational",tax:"none",multiStoneSuicideLegal:!1,hasButton:!1,friendlyPassOk:!0,handicapBonus:"n-minus-one",defaultKomi:7.5,sgf:"AGA"},"new-zealand":{id:"new-zealand",label:"New Zealand",summary:"Area scoring, situational superko, suicide is legal.",scoring:"area",ko:"situational",tax:"none",multiStoneSuicideLegal:!0,hasButton:!1,friendlyPassOk:!0,handicapBonus:"zero",defaultKomi:7,sgf:"New Zealand"},"stone-scoring":{id:"stone-scoring",label:"Ancient Chinese",summary:"Area scoring with a two-point tax per living group (stone scoring).",scoring:"area",ko:"simple",tax:"all",multiStoneSuicideLegal:!1,hasButton:!1,friendlyPassOk:!0,handicapBonus:"zero",defaultKomi:7.5,sgf:"Stone Scoring"},"tromp-taylor":{id:"tromp-taylor",label:"Tromp-Taylor",summary:"Area scoring, positional superko, suicide is legal.",scoring:"area",ko:"positional",tax:"none",multiStoneSuicideLegal:!0,hasButton:!1,friendlyPassOk:!1,handicapBonus:"zero",defaultKomi:7.5,sgf:"Tromp-Taylor"}},Lue=[Ts.japanese,Ts.chinese,Ts.korean,Ts.aga,Ts["new-zealand"],Ts["tromp-taylor"],Ts["stone-scoring"]];var fa=r=>Ts[r]??Ts.japanese;var Wi=r=>fa(r).multiStoneSuicideLegal;var Vf=r=>{let t=fa(r);return t.scoring!=="area"?"none":t.tax==="none"?"pass-alive":"independent-life"};function Wf(r){let{recentMoves:t,currentPlayer:e}=r,o=fa(r.rules),n=t.length-1,s=t[n]?.move===Sr,i=s&&t[n-1]?.move===Sr,l=o.scoring==="area"&&s,u=!1;if(l&&r.enablePassingHacks&&r.areaMap){let d=e==="black"?1:2,f=3-d,h=r.selfKomi??0;for(let g of r.areaMap)h+=g===d?1:g===f?-1:0;u=h<=0}if(l&&(r.conservativePassAndIsRoot===!0||o.friendlyPassOk&&!i||u))return{turnsIncluded:0,passWouldEndPhase:!1};let c=Math.max(0,Math.min(5,r.maxHistory??5));for(let d=0;d<c&&n-d>0;d++)if(t[n-d].move===Sr&&t[n-d-1].move===Sr){c=Math.min(c,d+1);break}let p=0,m=e==="black"?"white":"black";for(let d=0;d<c;d++){let f=t[n-d];if(!f||f.player!==m)break;p++,m=m==="black"?"white":"black"}return{turnsIncluded:p,passWouldEndPhase:s}}var e5=r=>{let t=`${r.length}:`,e=0,o=0;for(let n of r)for(let s of n)e=e*3+(s==="black"?1:s==="white"?2:0),++o===3&&(t+=String.fromCharCode(65+e),e=0,o=0);return o>0&&(t+=String.fromCharCode(65+e*3**(3-o))),t},tM=(r,t)=>`${t[0]}|${e5(r)}`;function Lc(r,t){let e=`${t===No?"b":"w"}|${vt}:`;for(let o=0;o<j;o+=3)e+=String.fromCharCode(65+r[o]*9+(r[o+1]??0)*3+(r[o+2]??0));return e}function eM(r){let t=2166136261,e=2654435769;for(let o=0;o<r.length;o++){let n=r.charCodeAt(o);t=Math.imul(t^n,16777619),e=Math.imul(e^n,2246822507)}return[t,e]}var iI=class r{constructor(t,e){_t(this,"ko");_t(this,"base");_t(this,"path",new Set);_t(this,"baseOccupied",new Uint8Array(j));_t(this,"occupied",new Uint8Array(j));_t(this,"baseHash",[0,0]);_t(this,"hash0",0);_t(this,"hash1",0);this.ko=t,this.base=new Set(e.map(o=>this.normalize(o)));for(let o of this.base){let[n,s]=eM(o);this.baseHash[0]^=n,this.baseHash[1]^=s;let i=t==="situational"?o.slice(2):o,l=`${vt}:`;if(!i.startsWith(l)||i.length!==l.length+Math.ceil(j/3))throw new Error("Repetition history has the wrong board size");for(let u=0;u<j;u++){let a=i.charCodeAt(l.length+Math.floor(u/3))-65;if(a<0||a>26)throw new Error("Invalid repetition history encoding");Math.floor(a/3**(2-u%3))%3!==0&&(this.baseOccupied[u]=1)}}this.reset()}normalize(t){if(!/^[bw]\|/.test(t))throw new Error("Repetition history is missing its player");return this.ko==="situational"?t:t.slice(2)}reset(){this.path.clear(),this.occupied.set(this.baseOccupied),[this.hash0,this.hash1]=this.baseHash}withPosition(t,e){let o=[...this.base].map(n=>this.ko==="situational"?n:`b|${n}`);return o.push(Lc(t,e)),new r(this.ko,o)}isSymmetryInvariant(t){let e=new Uint8Array(j);for(let o of this.base){let n=this.ko==="situational"?o.slice(2):o,s=n.indexOf(":")+1;for(let l=0;l<j;l++){let u=n.charCodeAt(s+Math.floor(l/3))-65;e[t[l]]=Math.floor(u/3**(2-l%3))%3}let i=this.ko==="situational"&&o[0]==="w"?2:1;if(!this.base.has(this.normalize(Lc(e,i))))return!1}return!0}push(t,e){let o=this.normalize(Lc(t,e));if(!this.base.has(o)&&!this.path.has(o)){this.path.add(o);let[n,s]=eM(o);this.hash0^=n,this.hash1^=s}for(let n=0;n<j;n++)t[n]!==Et&&(this.occupied[n]=1)}isContinuation(t,e,o){if(this.ko!==t.ko)return!1;let n=new Set(this.base);return n.add(this.normalize(Lc(e,o))),n.size===t.base.size&&[...n].every(s=>t.base.has(s))}bannedMoves(t,e,o,n){let s=new Uint8Array(j),i=n??Uf(t.stones),l=[],u=ur(e);for(let a=0;a<j;a++){if(t.stones[a]!==Et||a===t.koPoint)continue;let c=!1,p=!1;for(let f=0;f<eI[a];f++){let h=rI[tI[a]+f],g=t.stones[h];(g===Et||g===u&&i[h]===1||g===e&&i[h]>1)&&(c=!0),g===e&&(p=!0)}let m=!c;if(m&&!(o&&p)||!this.occupied[a]&&!m)continue;let d=Lf(t,a,e,l,o);try{let f=this.normalize(Lc(t.stones,u));(this.base.has(f)||this.path.has(f))&&(s[a]=1)}finally{j$(t,a,e,d,l)}}return s}};function r5(r){let t=fa(r.rules).ko;return t==="simple"?null:new iI(t,[...r.repetitionHistory??[],tM(r.board,r.currentPlayer)])}function rM(r,t,e){return r5(r)?.bannedMoves(t,r.currentPlayer==="black"?1:2,Wi(r.rules),e)}var oM=r=>r==="black"?"white":"black";var lI=22,o5=20;var Pr=(r,t,e)=>(t*vt+r)*lI+e;function nM(r){return r==="black"?No:ks}function sM(r){let{stones:t,koPoint:e,currentPlayer:o,recentMoves:n,komi:s}=r,i=r.rules??"japanese",l=r.playoutDoublingAdvantage??0,u=o,a=oM(u),c=nM(u),p=nM(a),m=r.outSpatial,d=r.outGlobal;m.fill(0),d.fill(0);for(let P=0;P<vt*vt;P++)m[P*lI+0]=1;if(e>=0&&e<vt*vt){let P=e%vt,L=e/vt|0;m[Pr(P,L,6)]=1}if(r.superkoBanned)for(let P=0;P<vt*vt;P++)r.superkoBanned[P]&&(m[P*lI+6]=1);let f=r.libertyMap??Uf(t);for(let P=0;P<vt;P++)for(let L=0;L<vt;L++){let z=P*vt+L,V=t[z];if(V===Et)continue;V===c?m[Pr(L,P,1)]=1:V===p&&(m[Pr(L,P,2)]=1);let W=f[z];W===1?m[Pr(L,P,3)]=1:W===2?m[Pr(L,P,4)]=1:W===3&&(m[Pr(L,P,5)]=1)}if(r.ladderedStones||r.prevLadderedStones||r.prevPrevLadderedStones||r.ladderWorkingMoves){let P=r.ladderedStones,L=r.prevLadderedStones,z=r.prevPrevLadderedStones,V=r.ladderWorkingMoves;for(let W=0;W<vt;W++)for(let q=0;q<vt;q++){let X=W*vt+q;P&&P[X]&&(m[Pr(q,W,14)]=1),L&&L[X]&&(m[Pr(q,W,15)]=1),z&&z[X]&&(m[Pr(q,W,16)]=1),V&&V[X]&&(m[Pr(q,W,17)]=1)}}let h=r.drawEquivalentWinsForWhite??.5,x=Math.trunc(s)===s?h-.5:0,y=s+x,C=u==="white"?y:-y,I=Vf(i),v=I!=="none",S;if(v){S=r.areaMap??(I==="independent-life"?Y$(t,{keepStones:!0,isMultiStoneSuicideLegal:Wi(i)}).area:X$(t,Wi(i)));for(let P=0;P<vt;P++)for(let L=0;L<vt;L++){let z=P*vt+L,V=S[z];V===c?m[Pr(L,P,18)]=1:V===p&&(m[Pr(L,P,19)]=1)}}let k=r.historyFeatures??Wf({recentMoves:n,currentPlayer:o,rules:i,selfKomi:C,areaMap:S,conservativePassAndIsRoot:r.conservativePassAndIsRoot,enablePassingHacks:r.enablePassingHacks,maxHistory:r.maxHistory}),A=[9,10,11,12,13],D=[0,1,2,3,4],F=[a,u,a,u,a];for(let P=0;P<k.turnsIncluded;P++){let L=n[n.length-1-P];if(!L||L.player!==F[P])break;if(L.move===Sr)d[D[P]]=1;else{let z=L.move%vt,V=L.move/vt|0;m[Pr(z,V,A[P])]=1}}let M=vt*vt+o5,B=Math.max(-M,Math.min(M,C));d[5]=B/20;let U=fa(i);if(U.ko==="positional"?(d[6]=1,d[7]=.5):U.ko==="situational"&&(d[6]=1,d[7]=-.5),U.multiStoneSuicideLegal&&(d[8]=1),U.scoring==="territory"&&(d[9]=1),U.tax==="seki"?d[10]=1:U.tax==="all"&&(d[10]=1,d[11]=1),U.hasButton&&(d[17]=1),d[14]=k.passWouldEndPhase?1:0,l!==0&&(d[15]=1,d[16]=.5*l),U.scoring==="area"){let L=vt*vt%2===0,z;L?z=Math.floor(B/2)*2:z=Math.floor((B-1)/2)*2+1;let V=B-z;V<0&&(V=0),V>2&&(V=2);let W;V<.5?W=V:V<1.5?W=1-V:W=V-2,d[18]=W}}var Uc=null;function iM(){if(Uc&&Uc.area===j)return Uc;let r=new Uint8Array(j);return Uc={area:j,stones:new Uint8Array(j),prevStones:new Uint8Array(j),prevPrevStones:new Uint8Array(j),koSimStones:r,koSimPos:{stones:r,koPoint:-1},koCaptureStack:[],libertyMap:new Uint8Array(j),areaMap:new Uint8Array(j),ladderedStones:new Uint8Array(j),ladderWorkingMoves:new Uint8Array(j),prevLadderedStones:new Uint8Array(j),prevPrevLadderedStones:new Uint8Array(j)},Uc}function lM(r){return r==="black"?No:ks}function uI(r,t){t.fill(0);for(let e=0;e<vt;e++){let o=r[e];for(let n=0;n<vt;n++){let s=o?.[n]??null;s&&(t[e*vt+n]=s==="black"?No:ks)}}}function n5(r){let t=new Array(r.length);for(let e=0;e<r.length;e++){let o=r[e];t[e]={move:o.x<0||o.y<0?Sr:o.y*vt+o.x,player:o.player}}return t}function aM(r,t){if(!t||t.x<0||t.y<0)return-1;let e=iM();e.koSimStones.set(r),e.koSimPos.koPoint=-1,e.koCaptureStack.length=0;try{return Lf(e.koSimPos,t.y*vt+t.x,lM(t.player),e.koCaptureStack),e.koSimPos.koPoint}catch{return-1}}function uM(r){let t=iM();uI(r.board,t.stones),r.previousBoard?uI(r.previousBoard,t.prevStones):t.prevStones.set(t.stones),r.previousPreviousBoard?uI(r.previousPreviousBoard,t.prevPrevStones):t.prevPrevStones.set(t.prevStones);let e=r.moveHistory.length>0?r.moveHistory[r.moveHistory.length-1]:null,o=r.moveHistory.length>=2?r.moveHistory[r.moveHistory.length-2]:null,n=r.previousBoard?aM(t.prevStones,e):-1,s=r.previousPreviousBoard?aM(t.prevPrevStones,o):-1,i=-1,l=n5(r.moveHistory),u=Wf({recentMoves:l,currentPlayer:r.currentPlayer,rules:r.rules,conservativePassAndIsRoot:r.conservativePassAndIsRoot}),a=u.turnsIncluded,c=a<1?t.stones:t.prevStones,p=a<1?n:s,m=a<2?c:t.prevPrevStones,d=a<2?p:i;nI(t.stones,t.libertyMap);let f=Vf(r.rules),h=f!=="none",g=Wi(r.rules);f==="pass-alive"?Gf(t.stones,t.areaMap,g):f==="independent-life"&&sI(t.stones,t.areaMap,{keepStones:!0,isMultiStoneSuicideLegal:g}),J$({stones:t.stones,koPoint:n,currentPlayer:lM(r.currentPlayer),outLadderedStones:t.ladderedStones,outLadderWorkingMoves:t.ladderWorkingMoves}),aI({stones:c,koPoint:p,outLadderedStones:t.prevLadderedStones}),aI({stones:m,koPoint:d,outLadderedStones:t.prevPrevLadderedStones}),sM({superkoBanned:rM(r,{stones:t.stones,koPoint:n},t.libertyMap),stones:t.stones,koPoint:n,currentPlayer:r.currentPlayer,recentMoves:l,historyFeatures:u,komi:r.komi,rules:r.rules,conservativePassAndIsRoot:r.conservativePassAndIsRoot,playoutDoublingAdvantage:r.playoutDoublingAdvantage,libertyMap:t.libertyMap,areaMap:h?t.areaMap:void 0,ladderedStones:t.ladderedStones,prevLadderedStones:t.prevLadderedStones,prevPrevLadderedStones:t.prevPrevLadderedStones,ladderWorkingMoves:t.ladderWorkingMoves,outSpatial:r.outSpatial,outGlobal:r.outGlobal})}var s5=2,a5=5,i5=6,l5=["9d","8d","7d","6d","5d","4d","3d","2d","1d","1k","2k","3k","4k","5k","6k","7k","8k","9k","10k","11k","12k","13k","14k","15k","16k","17k","18k","19k","20k"];function cI(r){let t=l5.indexOf(r);return t<0?-1:t+1}var mM=()=>({inverseBRank:0,inverseWRank:0,bIsHuman:!1,wIsHuman:!1,bIsUnranked:!1,wIsUnranked:!1,bRankIsUnknown:!1,wRankIsUnknown:!1,gameIsUnrated:!1,gameRatednessIsUnknown:!1,tcIsUnknown:!1,tcIsNone:!1,tcIsAbsolute:!1,tcIsSimple:!1,tcIsByoYomi:!1,tcIsCanadian:!1,tcIsFischer:!1,mainTimeSeconds:0,periodTimeSeconds:0,byoYomiPeriods:0,canadianMoves:0,gameDate:{year:2020,month:3,day:1},source:0});function cM(r,t,e){let o=mM();return o.inverseBRank=r,o.inverseWRank=t,o.bIsHuman=!0,o.wIsHuman=!0,o.gameRatednessIsUnknown=!0,o.tcIsByoYomi=!0,o.mainTimeSeconds=1200,o.periodTimeSeconds=30,o.byoYomiPeriods=5,o.gameDate=e?{year:2016,month:9,day:1}:{year:2020,month:3,day:1},o.source=s5,o}function pM(r,t){let e=mM();return e.inverseBRank=1,e.inverseWRank=1,e.bIsHuman=!0,e.wIsHuman=!0,e.tcIsUnknown=!0,e.gameDate={year:r,month:6,day:1},e.source=t?i5:a5,e}function u5(r){if(r===""||r==="_")return null;if(r.startsWith("proyear_")){let s=Number.parseInt(r.slice(8),10);return Number.isFinite(s)?s>=1800&&s<=2020?pM(s,!1):s>=2021&&s<=2023?pM(s,!0):null:null}let t=r.startsWith("preaz_");if(!t&&!r.startsWith("rank_"))return null;let e=r.slice(t?6:5),o=cI(e);if(o!==-1)return cM(o,o,t);let n=e.split("_");if(n.length===2){let s=cI(n[0]),i=cI(n[1]);if(s!==-1&&i!==-1)return cM(s,i,t)}return null}function c5(r){let t=Date.UTC(r.year,r.month-1,r.day)-Date.UTC(1970,0,1);return Math.round(t/864e5)}function p5(r){let t=r.out??new Float32Array(GC);t.fill(0);let e=r.meta,o=r.nextPlayer==="white";t[0]=(o?e.wIsHuman:e.bIsHuman)?1:0,t[1]=(o?e.bIsHuman:e.wIsHuman)?1:0;let n=o?e.wIsUnranked:e.bIsUnranked,s=o?e.bIsUnranked:e.wIsUnranked;t[2]=n?1:0,t[3]=s?1:0,t[4]=(o?e.wRankIsUnknown:e.bRankIsUnknown)?1:0,t[5]=(o?e.bRankIsUnknown:e.wRankIsUnknown)?1:0;let i=6,l=34,u=o?e.inverseWRank:e.inverseBRank,a=o?e.inverseBRank:e.inverseWRank;if(!n)for(let I=0;I<Math.min(u,l);I++)t[i+I]=1;if(!s)for(let I=0;I<Math.min(a,l);I++)t[i+l+I]=1;t[74]=e.gameRatednessIsUnknown?.5:e.gameIsUnrated?1:0,t[75]=e.tcIsUnknown?1:0,t[76]=e.tcIsNone?1:0,t[77]=e.tcIsAbsolute?1:0,t[78]=e.tcIsSimple?1:0,t[79]=e.tcIsByoYomi?1:0,t[80]=e.tcIsCanadian?1:0,t[81]=e.tcIsFischer?1:0;let c=Math.min(Math.max(e.mainTimeSeconds,0),3*86400),p=Math.min(Math.max(e.periodTimeSeconds,0),1*86400);t[82]=.4*(Math.log(c+60)-6.5),t[83]=.3*(Math.log(p+1)-3);let m=Math.min(Math.max(e.byoYomiPeriods,0),50),d=Math.min(Math.max(e.canadianMoves,0),50);t[84]=.5*(Math.log(m+2)-1.5),t[85]=.25*(Math.log(d+2)-1.5),t[86]=.5*Math.log(r.boardArea/361);let f=87,h=32,g=c5(e.gameDate),x=7,y=Math.pow(8e4,1/(h-1)),C=2*Math.PI;for(let I=0;I<h;I++){let v=g/x;t[f+I*2+0]=Math.cos(v*C),t[f+I*2+1]=Math.sin(v*C),x*=y}if(e.source<0||e.source>=16)throw new Error(`Invalid SGF metadata source ${e.source}`);return t[151+e.source]=1,t}function dM(r){let t=u5(r.profile);return t?p5({meta:t,nextPlayer:r.nextPlayer,boardArea:r.boardArea,out:r.out}):null}UC("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@4.22.0/dist/");var fM=new Float32Array(65536);for(let r=0;r<65536;r++){let t=r&32768?-1:1,e=r>>10&31,o=r&1023;fM[r]=e===0?t*o*2**-24:e===31?o?NaN:t*(1/0):t*(1+o/1024)*2**(e-15)}var m5=$i.prototype.readBinaryFloats;$i.prototype.readBinaryFloats=function(r){let t=this.data;for(;t[this.idx]===32||t[this.idx]===10||t[this.idx]===13||t[this.idx]===9;)this.idx++;if(t[this.idx]!==64||t[this.idx+1]!==66||t[this.idx+2]!==49||t[this.idx+3]!==54||t[this.idx+4]!==64)return m5.call(this,r);let e=this.idx+5,o=new Float32Array(r);for(let n=0;n<r;n++)o[n]=fM[t[e+2*n]|t[e+2*n+1]<<8];return this.idx=e+2*r,o};var zf=null,Gc=null,Vc=r=>self.postMessage(r);async function d5(r){let t=null;try{t=await caches.open("go-robot")}catch{}let e=t?await t.match(r):void 0,o=!e;if(!e&&(e=await fetch(r),!e.ok))throw new Error(`Could not download the robot (${e.status})`);let n=Number(e.headers.get("content-length"))||0,s=[],i=0,l=-1,u=e.body.getReader();for(;;){let{done:p,value:m}=await u.read();if(p)break;s.push(m),i+=m.length;let d=n?Math.floor(i/n*100):-1;o&&d!==l&&(l=d,Vc({type:"progress",pct:d}))}let a=new Blob(s);o&&t&&t.put(r,new Response(a,{headers:{"content-length":String(a.size)}})).catch(()=>{});let c=new Uint8Array(await a.slice(0,2).arrayBuffer());return c[0]!==31||c[1]!==139?new Uint8Array(await a.arrayBuffer()):new Uint8Array(await new Response(a.stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer())}async function f5(r,t){let e=await d5(r);Vc({type:"progress",pct:100,stage:"starting"});let o=L$(e),n=[],s=new URLSearchParams(self.location.search).get("backend");for(let i of s?[s]:["webgl","wasm","cpu"])try{if(!await iw(i))continue;await lw(),zf=new Ef(o),await hM({size:t,board:new Array(t*t).fill(0),history:[],toPlay:"b",rank:"6k"}),Vc({type:"ready",backend:i});return}catch(l){zf=null,n.push(i+": "+(l instanceof Error?l.message:String(l)))}throw new Error("This browser could not run the robot ("+n.join("; ")+")")}async function hM(r){q$(r.size);let t=vt,e=j,o=d=>d==="b"?"black":"white",n=d=>{let f=[];for(let h=0;h<t;h++){let g=[];for(let x=0;x<t;x++){let y=d[h*t+x];g.push(y===1?"black":y===2?"white":null)}f.push(g)}return f},s=r.history.map(d=>({x:d.p<0?-1:d.p%t,y:d.p<0?-1:Math.floor(d.p/t),player:o(d.c)})),i=new Float32Array(e*22),l=new Float32Array(19);uM({board:n(r.board),previousBoard:r.prev?n(r.prev):void 0,previousPreviousBoard:r.prev2?n(r.prev2):void 0,currentPlayer:o(r.toPlay),moveHistory:s,komi:7.5,rules:"chinese",conservativePassAndIsRoot:!1,outSpatial:i,outGlobal:l});let u=dM({profile:"rank_"+r.rank,nextPlayer:o(r.toPlay),boardArea:e});if(!u)throw new Error("Unknown rank "+r.rank);let a=mi(i,[1,t,t,22]),c=pi(l,[1,19]),p=pi(u,[1,u.length]),m=zf.forward(a,c,p);try{let[d,f,h]=await Promise.all([m.policy.data(),m.policyPass.data(),m.ownership.data()]),g=zf.policyOutChannels,x=new Float32Array(e+1),y=new Float32Array(e);for(let C=0;C<e;C++)x[C]=d[C*g],y[C]=Math.tanh(h[C]);return x[e]=f[0],{logits:x,ownership:y}}finally{for(let d of[a,c,p,m.policy,m.policyPass,m.value,m.scoreValue,m.ownership])d.dispose()}}self.onmessage=async r=>{let t=r.data;try{if(t.type==="load")Gc=Gc||f5(t.url,t.size||19),await Gc;else if(t.type==="move"){await Gc;let e=performance.now(),o=await hM(t.ask);Vc({type:"move",id:t.id,logits:o.logits,ownership:o.ownership,ms:Math.round(performance.now()-e)})}}catch(e){t.type==="load"&&(Gc=null),Vc({type:"error",id:t.id,message:e instanceof Error?e.message:String(e)})}};})();
