var LZMA=function(){function w(a){function b(){}g=b.prototype=a||new Za;return b}function H(a,b){postMessage({action:3,cbn:b,result:a})}function D(a,b){return X(a[0]+b[0],a[1]+b[1])}function qa(a,b){var c=~~Math.max(Math.min(a[1]/4294967296,2147483647),-2147483648)&~~Math.max(Math.min(b[1]/4294967296,2147483647),-2147483648),d=A(a)&A(b),e;e=d;0>d&&(e+=4294967296);return[e,4294967296*c]}function I(a,b){var c,d;if(a[0]==b[0]&&a[1]==b[1])return 0;c=0>a[1];d=0>b[1];return c&&!d?-1:!c&&d?1:0>X(a[0]-b[0],
a[1]-b[1])[1]?-1:1}function X(a,b){var c,d;b%=1.8446744073709552E19;a%=1.8446744073709552E19;c=b%4294967296;d=4294967296*Math.floor(a/4294967296);b=b-c+d;for(a=a-d+c;0>a;)a+=4294967296,b-=4294967296;for(;4294967295<a;)a-=4294967296,b+=4294967296;for(b%=1.8446744073709552E19;0x7fffffff00000000<b;)b-=1.8446744073709552E19;for(;-9223372036854775808>b;)b+=1.8446744073709552E19;return[a,b]}function ha(a,b){return a[0]==b[0]&&a[1]==b[1]}function F(a){var b,c;return-129<a&&128>a?(b=a+128,c=ra[b],null==c&&
(c=ra[b]=0<=a?[a,0]:[a+4294967296,-4294967296]),c):0<=a?[a,0]:[a+4294967296,-4294967296]}function A(a){return 2147483648<=a[0]?~~Math.max(Math.min(a[0]-4294967296,2147483647),-2147483648):~~Math.max(Math.min(a[0],2147483647),-2147483648)}function sa(a){var b;if(ha(a,ia))return ia;b=-a[1];a=-a[0];4294967295<a&&(a-=4294967296,b+=4294967296);0>a&&(a+=4294967296,b-=4294967296);return[a,b]}function Y(a){return 30>=a?1<<a:Y(30)*Y(a-30)}function ja(a,b){var c,d,e;b&=63;if(ha(a,ia))return 0==b?a:x;if(0>a[1])return sa(ja(sa(a),
b));c=Y(b);d=a[1]*c%1.8446744073709552E19;e=a[0]*c;c=e-e%4294967296;d+=c;0x7fffffffffffffff<=d&&(d-=1.8446744073709552E19);return[e-c,d]}function ta(a,b){var c;c=Y(b&63);return X(Math.floor(a[0]/c),a[1]/c)}function ua(a,b){a.buf=b;a.pos=0;a.count=b.length;return a}function J(a){return a.pos>=a.count?-1:a.buf[a.pos++]&255}function va(a){a.buf=Array(32);return a}function wa(a){var b=a.buf;b.length=a.count;return b}function ka(a,b,c,d,e){for(var f=0;f<e;++f)c[d+f]=a[b+f]}function $a(a,b,c){a.output=
va(new xa);var d=ua(new ya,b),e=a.output,f=F(b.length);if(0>I(f,Z))throw Error("invalid length "+f);a.length_0=f;b=new ab;var k;b._repDistances=[0,0,0,0];b._optimum=Array(4096);b._rangeEncoder=new bb;b._isMatch=Array(192);b._isRep=Array(12);b._isRepG0=Array(12);b._isRepG1=Array(12);b._isRepG2=Array(12);b._isRep0Long=Array(192);b._posSlotEncoder=[0,0,0,0];b._posEncoders=Array(114);b._posAlignEncoder=O(new P,4);b._lenEncoder=za(new Aa);b._repMatchLenEncoder=za(new Aa);b._literalEncoder=new cb;b._matchDistances=
Array(548);b._posSlotPrices=Array(256);b._distancesPrices=Array(512);b._alignPrices=Array(16);b.reps=[0,0,0,0];b.repLens=[0,0,0,0];b.processedInSize=[x];b.processedOutSize=[x];b.finished=[!1];b.properties=Array(5);b.tempPrices=Array(128);for(k=0;4096>k;++k)b._optimum[k]=new db;for(k=0;4>k;++k)b._posSlotEncoder[k]=O(new P,6);k=1<<c.ds;b._dictionarySize=k;for(var h=0;k>1<<h;++h);b._distTableSize=2*h;b._numFastBytes=c.fb;k=b._matchFinderType;b._matchFinderType=c.mf;b._matchFinder&&k!=b._matchFinderType&&
(b._dictionarySizePrev=-1,b._matchFinder=null);k=c.lc;h=c.pb;b._numLiteralPosStateBits=c.lp;b._numLiteralContextBits=k;b._posStateBits=h;b._posStateMask=(1<<b._posStateBits)-1;b._writeEndMark=!0;b.properties[0]=9*(5*b._posStateBits+b._numLiteralPosStateBits)+b._numLiteralContextBits<<24>>24;for(c=0;4>c;++c)b.properties[1+c]=b._dictionarySize>>8*c<<24>>24;ka(b.properties,0,e.buf,e.count,5);e.count+=5;for(c=0;64>c;c+=8)k=A(ta(f,c))&255,e.buf[e.count++]=k<<24>>24;b._needReleaseMFStream=!1;b._inStream=
d;b._finished=!1;b._matchFinder||(d=new eb,f=4,0==b._matchFinderType&&(f=2),d.HASH_ARRAY=2<f,d.HASH_ARRAY?(d.kNumHashDirectBytes=0,d.kMinMatchCheck=4,d.kFixHashSize=66560):(d.kNumHashDirectBytes=2,d.kMinMatchCheck=3,d.kFixHashSize=0),b._matchFinder=d);d=b._literalEncoder;f=b._numLiteralPosStateBits;c=b._numLiteralContextBits;if(null==d.m_Coders||d.m_NumPrevBits!=c||d.m_NumPosBits!=f)for(d.m_NumPosBits=f,d.m_PosMask=(1<<f)-1,d.m_NumPrevBits=c,c=1<<d.m_NumPrevBits+d.m_NumPosBits,d.m_Coders=Array(c),
f=0;f<c;++f){k=d.m_Coders;var h=f,l=new fb;l.m_Encoders=Array(768);k[h]=l}if(b._dictionarySize!=b._dictionarySizePrev||b._numFastBytesPrev!=b._numFastBytes){d=b._matchFinder;f=b._dictionarySize;c=b._numFastBytes;if(1073741567>f){d._cutValue=16+(c>>1);h=f+4096;k=c+274;d._keepSizeBefore=h;d._keepSizeAfter=k;h=h+k+(~~((f+4096+c+274)/2)+256);if(null==d._bufferBase||d._blockSize!=h)d._bufferBase=null,d._blockSize=h,d._bufferBase=Array(d._blockSize);d._pointerToLastSafePosition=d._blockSize-k;d._matchMaxLen=
c;c=f+1;d._cyclicBufferSize!=c&&(c=2*(d._cyclicBufferSize=c),d._son=Array(c));c=65536;d.HASH_ARRAY&&(c=f-1,c|=c>>1,c|=c>>2,c|=c>>4,c=(c|c>>8)>>1,c|=65535,16777216<c&&(c>>=1),d._hashMask=c,++c,c+=d.kFixHashSize);c!=d._hashSizeSum&&(f=d._hashSizeSum=c,d._hash=Array(f))}b._dictionarySizePrev=b._dictionarySize;b._numFastBytesPrev=b._numFastBytes}b._rangeEncoder.Stream=e;b._state=0;for(e=b._previousByte=0;4>e;++e)b._repDistances[e]=0;e=b._rangeEncoder;e._position=x;e.Low=x;e.Range=-1;e._cacheSize=1;e._cache=
0;v(b._isMatch);v(b._isRep0Long);v(b._isRep);v(b._isRepG0);v(b._isRepG1);v(b._isRepG2);v(b._posEncoders);e=b._literalEncoder;f=1<<e.m_NumPrevBits+e.m_NumPosBits;for(d=0;d<f;++d)v(e.m_Coders[d].m_Encoders);for(e=0;4>e;++e)v(b._posSlotEncoder[e].Models);Ba(b._lenEncoder,1<<b._posStateBits);Ba(b._repMatchLenEncoder,1<<b._posStateBits);v(b._posAlignEncoder.Models);b._longestMatchWasFound=!1;b._optimumEndIndex=0;b._optimumCurrentIndex=0;b._additionalOffset=0;Ca(b);Da(b);b._lenEncoder._tableSize=b._numFastBytes+
1-2;Ea(b._lenEncoder,1<<b._posStateBits);b._repMatchLenEncoder._tableSize=b._numFastBytes+1-2;Ea(b._repMatchLenEncoder,1<<b._posStateBits);b.nowPos64=x;void 0;e=new Fa;e.encoder=b;e.decoder=null;e.alive=!0;a.chunker=e;return a}function gb(a,b){a.output=va(new xa);var c=ua(new ya,b),d=a.output,e="",f,k=Array(5),h,l=k.length;for(f=0;f<l;++f){h=J(c);if(-1==h)throw Error("truncated input");k[f]=h<<24>>24}l=new hb;l.m_OutWindow=new ib;l.m_RangeDecoder=new jb;l.m_IsMatchDecoders=Array(192);l.m_IsRepDecoders=
Array(12);l.m_IsRepG0Decoders=Array(12);l.m_IsRepG1Decoders=Array(12);l.m_IsRepG2Decoders=Array(12);l.m_IsRep0LongDecoders=Array(192);l.m_PosSlotDecoder=[0,0,0,0];l.m_PosDecoders=Array(114);l.m_PosAlignDecoder=Q(new R,4);l.m_LenDecoder=Ga(new Ha);l.m_RepLenDecoder=Ga(new Ha);l.m_LiteralDecoder=new kb;for(f=0;4>f;++f)l.m_PosSlotDecoder[f]=Q(new R,6);var E,m,g;if(5>k.length)f=!1;else{f=k[0]&255;m=f%9;f=~~(f/9);g=f%5;h=~~(f/5);for(E=f=0;4>E;++E)f+=(k[1+E]&255)<<8*E;if(!(k=99999999<f)){if(8<m||4<g||4<
h)h=!1;else{k=l.m_LiteralDecoder;if(null==k.m_Coders||k.m_NumPrevBits!=m||k.m_NumPosBits!=g)for(k.m_NumPosBits=g,k.m_PosMask=(1<<g)-1,k.m_NumPrevBits=m,g=1<<k.m_NumPrevBits+k.m_NumPosBits,k.m_Coders=Array(g),m=0;m<g;++m){E=k.m_Coders;var n=m,u=new lb;u.m_Decoders=Array(768);E[n]=u}h=1<<h;Ia(l.m_LenDecoder,h);Ia(l.m_RepLenDecoder,h);l.m_PosStateMask=h-1;h=!0}k=!h}if(k)f=!1;else if(0>f)f=!1;else{if(l.m_DictionarySize!=f){l.m_DictionarySize=f;l.m_DictionarySizeCheck=Math.max(l.m_DictionarySize,1);f=
l.m_OutWindow;h=Math.max(l.m_DictionarySizeCheck,4096);if(null==f._buffer||f._windowSize!=h)f._buffer=Array(h);f._windowSize=h;f._pos=0;f._streamPos=0}f=!0}}if(!f)throw Error("corrupted input");for(f=0;64>f;f+=8){h=J(c);if(-1==h)throw Error("truncated input");h=h.toString(16);1==h.length&&(h="0"+h);e=h+""+e}/^0+$|^f+$/i.test(e)?a.length_0=Z:(e=parseInt(e,16),a.length_0=4294967295<e?Z:F(e));e=a.length_0;l.m_RangeDecoder.Stream=c;c=l.m_OutWindow;S(c);c._stream=null;l.m_OutWindow._stream=d;l.m_OutWindow._streamPos=
0;l.m_OutWindow._pos=0;v(l.m_IsMatchDecoders);v(l.m_IsRep0LongDecoders);v(l.m_IsRepDecoders);v(l.m_IsRepG0Decoders);v(l.m_IsRepG1Decoders);v(l.m_IsRepG2Decoders);v(l.m_PosDecoders);d=l.m_LiteralDecoder;f=1<<d.m_NumPrevBits+d.m_NumPosBits;for(c=0;c<f;++c)v(d.m_Coders[c].m_Decoders);for(d=0;4>d;++d)v(l.m_PosSlotDecoder[d].Models);Ja(l.m_LenDecoder);Ja(l.m_RepLenDecoder);v(l.m_PosAlignDecoder.Models);d=l.m_RangeDecoder;d.Code=0;d.Range=-1;for(c=0;5>c;++c)d.Code=d.Code<<8|J(d.Stream);l.state=0;l.rep0=
0;l.rep1=0;l.rep2=0;l.rep3=0;l.outSize=e;l.nowPos64=x;l.prevByte=0;d=new Fa;d.decoder=l;d.encoder=null;d.alive=!0;a.chunker=d;return a}function C(a,b){return a._bufferBase[a._bufferOffset+a._pos+b]}function K(a,b,c,d){var e;a._streamEndWasReached&&a._pos+b+d>a._streamPos&&(d=a._streamPos-(a._pos+b));++c;e=a._bufferOffset+a._pos+b;for(b=0;b<d&&a._bufferBase[e+b]==a._bufferBase[e+b-c];++b);return b}function T(a){return a._streamPos-a._pos}function Ka(a){var b,c;if(!a._streamEndWasReached)for(;;){c=
-a._bufferOffset+a._blockSize-a._streamPos;if(0==c)break;b=a._stream;var d=a._bufferBase,e=a._bufferOffset+a._streamPos;b.pos>=b.count?b=-1:(c=Math.min(c,b.count-b.pos),ka(b.buf,b.pos,d,e,c),b.pos+=c,b=c);if(-1==b){a._posLimit=a._streamPos;b=a._bufferOffset+a._posLimit;b>a._pointerToLastSafePosition&&(a._posLimit=a._pointerToLastSafePosition-a._bufferOffset);a._streamEndWasReached=1;break}a._streamPos+=b;a._streamPos>=a._pos+a._keepSizeAfter&&(a._posLimit=a._streamPos-a._keepSizeAfter)}}function La(a,
b){a._bufferOffset+=b;a._posLimit-=b;a._pos-=b;a._streamPos-=b}function aa(a){var b;++a._cyclicBufferPos>=a._cyclicBufferSize&&(a._cyclicBufferPos=0);++a._pos;if(a._pos>a._posLimit){b=a._bufferOffset+a._pos;if(b>a._pointerToLastSafePosition){var c,d;d=a._bufferOffset+a._pos-a._keepSizeBefore;0<d&&--d;c=a._bufferOffset+a._streamPos-d;for(b=0;b<c;++b)a._bufferBase[b]=a._bufferBase[d+b];a._bufferOffset-=d}Ka(a)}1073741823==a._pos&&(b=a._pos-a._cyclicBufferSize,Ma(a._son,2*a._cyclicBufferSize,b),Ma(a._hash,
a._hashSizeSum,b),La(a,b))}function Ma(a,b,c){var d,e;for(d=0;d<b;++d)e=a[d]||0,e=e<=c?0:e-c,a[d]=e}function Na(a,b){var c,d,e,f,k,h,l,E,m,g,n,u;do{if(a._pos+a._matchMaxLen<=a._streamPos)E=a._matchMaxLen;else if(E=a._streamPos-a._pos,E<a.kMinMatchCheck){aa(a);continue}m=a._pos>a._cyclicBufferSize?a._pos-a._cyclicBufferSize:0;d=a._bufferOffset+a._pos;a.HASH_ARRAY?(e=ba[a._bufferBase[d]&255]^a._bufferBase[d+1]&255,c=e&1023,a._hash[c]=a._pos,e^=(a._bufferBase[d+2]&255)<<8,c=e&65535,a._hash[1024+c]=a._pos,
c=(e^ba[a._bufferBase[d+3]&255]<<5)&a._hashMask):c=a._bufferBase[d]&255^(a._bufferBase[d+1]&255)<<8;e=a._hash[a.kFixHashSize+c];a._hash[a.kFixHashSize+c]=a._pos;n=(a._cyclicBufferPos<<1)+1;u=a._cyclicBufferPos<<1;h=l=a.kNumHashDirectBytes;for(c=a._cutValue;;){if(e<=m||0==c--){a._son[n]=a._son[u]=0;break}f=a._pos-e;f=(f<=a._cyclicBufferPos?a._cyclicBufferPos-f:a._cyclicBufferPos-f+a._cyclicBufferSize)<<1;g=a._bufferOffset+e;k=h<l?h:l;if(a._bufferBase[g+k]==a._bufferBase[d+k]){for(;++k!=E&&a._bufferBase[g+
k]==a._bufferBase[d+k];);if(k==E){a._son[u]=a._son[f];a._son[n]=a._son[f+1];break}}(a._bufferBase[g+k]&255)<(a._bufferBase[d+k]&255)?(a._son[u]=e,u=f+1,e=a._son[u],l=k):(a._son[n]=e,n=f,e=a._son[n],h=k)}aa(a)}while(0!=--b)}function S(a){var b;b=a._pos-a._streamPos;if(0!=b){var c=a._stream;ka(a._buffer,a._streamPos,c.buf,c.count,b);c.count+=b;a._pos>=a._windowSize&&(a._pos=0);a._streamPos=a._pos}}function Oa(a,b){var c;c=a._pos-b-1;0>c&&(c+=a._windowSize);return a._buffer[c]}function ca(a){a-=2;return 4>
a?a:3}function G(a){return 4>a?0:10>a?a-3:a-6}function Pa(a){if(!a.alive)throw Error("bad state");if(a.encoder){a:{var b=a.encoder,c=a.encoder.processedInSize,d=a.encoder.processedOutSize,e=a.encoder.finished,f,k,h,l,g,m,p,n;c[0]=x;d[0]=x;e[0]=!0;b._inStream&&(b._matchFinder._stream=b._inStream,n=b._matchFinder,n._bufferOffset=0,n._pos=0,n._streamPos=0,n._streamEndWasReached=0,Ka(n),n._cyclicBufferPos=0,La(n,-1),b._needReleaseMFStream=!0,b._inStream=null);if(!b._finished){b._finished=!0;n=b.nowPos64;
if(ha(b.nowPos64,x)){if(0==T(b._matchFinder)){la(b,A(b.nowPos64));break a}ma(b);p=A(b.nowPos64)&b._posStateMask;q(b._rangeEncoder,b._isMatch,(b._state<<4)+p,0);b._state=G(b._state);h=C(b._matchFinder,-b._additionalOffset);Qa(L(b._literalEncoder,A(b.nowPos64),b._previousByte),b._rangeEncoder,h);b._previousByte=h;--b._additionalOffset;b.nowPos64=D(b.nowPos64,Ra)}if(0==T(b._matchFinder))la(b,A(b.nowPos64));else for(;;){g=mb(b,A(b.nowPos64));h=b.backRes;p=A(b.nowPos64)&b._posStateMask;k=(b._state<<4)+
p;if(1==g&&-1==h){q(b._rangeEncoder,b._isMatch,k,0);h=C(b._matchFinder,-b._additionalOffset);k=L(b._literalEncoder,A(b.nowPos64),b._previousByte);if(7>b._state)Qa(k,b._rangeEncoder,h);else{f=C(b._matchFinder,-b._repDistances[0]-1-b._additionalOffset);p=b._rangeEncoder;l=h;for(var u=m=void 0,y=void 0,r=void 0,t=r=void 0,u=1,r=!0,y=7;0<=y;--y)m=l>>y&1,t=u,r&&(r=f>>y&1,t+=1+r<<8,r=r==m),q(p,k.m_Encoders,t,m),u=u<<1|m}b._previousByte=h;b._state=G(b._state)}else{q(b._rangeEncoder,b._isMatch,k,1);if(4>
h){if(q(b._rangeEncoder,b._isRep,b._state,1),0==h?(q(b._rangeEncoder,b._isRepG0,b._state,0),1==g?q(b._rangeEncoder,b._isRep0Long,k,0):q(b._rangeEncoder,b._isRep0Long,k,1)):(q(b._rangeEncoder,b._isRepG0,b._state,1),1==h?q(b._rangeEncoder,b._isRepG1,b._state,0):(q(b._rangeEncoder,b._isRepG1,b._state,1),q(b._rangeEncoder,b._isRepG2,b._state,h-2))),1==g?b._state=7>b._state?9:11:(na(b._repMatchLenEncoder,b._rangeEncoder,g-2,p),b._state=7>b._state?8:11),k=b._repDistances[h],0!=h){for(;1<=h;--h)b._repDistances[h]=
b._repDistances[h-1];b._repDistances[0]=k}}else{q(b._rangeEncoder,b._isRep,b._state,0);b._state=7>b._state?7:10;na(b._lenEncoder,b._rangeEncoder,g-2,p);h-=4;p=oa(h);k=ca(g);U(b._posSlotEncoder[k],b._rangeEncoder,p);if(4<=p)if(l=(p>>1)-1,f=(2|p&1)<<l,m=h-f,14>p)for(k=b._posEncoders,p=f-p-1,f=b._rangeEncoder,t=y=u=void 0,t=1,y=0;y<l;++y)u=m&1,q(f,k,p+t,u),t=t<<1|u,m>>=1;else Sa(b._rangeEncoder,m>>4,l-4),Ta(b._posAlignEncoder,b._rangeEncoder,m&15),++b._alignPriceCount;k=h;for(h=3;1<=h;--h)b._repDistances[h]=
b._repDistances[h-1];b._repDistances[0]=k;++b._matchPriceCount}b._previousByte=C(b._matchFinder,g-1-b._additionalOffset)}b._additionalOffset-=g;b.nowPos64=D(b.nowPos64,F(g));if(0==b._additionalOffset){128<=b._matchPriceCount&&Ca(b);16<=b._alignPriceCount&&Da(b);c[0]=b.nowPos64;g=b._rangeEncoder;g=D(D(F(g._cacheSize),g._position),[4,0]);d[0]=g;if(0==T(b._matchFinder)){la(b,A(b.nowPos64));break}g=b.nowPos64;g=X(g[0]-n[0],g[1]-n[1]);if(0<=I(g,[4096,0])){b._finished=!1;e[0]=!1;break}}}}}a.inBytesProcessed=
a.encoder.processedInSize[0];a.encoder.finished[0]&&(b=a.encoder,Ua(b),b._rangeEncoder.Stream=null,a.alive=!1)}else{a:{b=a.decoder;e=A(b.nowPos64)&b.m_PosStateMask;if(0==B(b.m_RangeDecoder,b.m_IsMatchDecoders,(b.state<<4)+e)){c=b.m_LiteralDecoder;d=A(b.nowPos64);c=c.m_Coders[((d&c.m_PosMask)<<c.m_NumPrevBits)+((b.prevByte&255)>>>8-c.m_NumPrevBits)];if(7>b.state){d=b.m_RangeDecoder;e=1;do e=e<<1|B(d,c.m_Decoders,e);while(256>e);b.prevByte=e<<24>>24}else{d=b.m_RangeDecoder;e=Oa(b.m_OutWindow,b.rep0);
h=1;do if(g=e>>7&1,e<<=1,n=B(d,c.m_Decoders,(1+g<<8)+h),h=h<<1|n,g!=n){for(;256>h;)h=h<<1|B(d,c.m_Decoders,h);break}while(256>h);b.prevByte=h<<24>>24}c=b.m_OutWindow;d=b.prevByte;c._buffer[c._pos++]=d;c._pos>=c._windowSize&&S(c);b.state=G(b.state);b.nowPos64=D(b.nowPos64,Ra)}else{if(1==B(b.m_RangeDecoder,b.m_IsRepDecoders,b.state))c=0,0==B(b.m_RangeDecoder,b.m_IsRepG0Decoders,b.state)?0==B(b.m_RangeDecoder,b.m_IsRep0LongDecoders,(b.state<<4)+e)&&(b.state=7>b.state?9:11,c=1):(0==B(b.m_RangeDecoder,
b.m_IsRepG1Decoders,b.state)?d=b.rep1:(0==B(b.m_RangeDecoder,b.m_IsRepG2Decoders,b.state)?d=b.rep2:(d=b.rep3,b.rep3=b.rep2),b.rep2=b.rep1),b.rep1=b.rep0,b.rep0=d),0==c&&(c=Va(b.m_RepLenDecoder,b.m_RangeDecoder,e)+2,b.state=7>b.state?8:11);else if(b.rep3=b.rep2,b.rep2=b.rep1,b.rep1=b.rep0,c=2+Va(b.m_LenDecoder,b.m_RangeDecoder,e),b.state=7>b.state?7:10,g=da(b.m_PosSlotDecoder[ca(c)],b.m_RangeDecoder),4<=g)if(d=(g>>1)-1,b.rep0=(2|g&1)<<d,14>g){e=b.rep0;n=b.m_PosDecoders;g=b.rep0-g-1;h=b.m_RangeDecoder;
f=1;for(p=l=0;p<d;++p)k=B(h,n,g+f),f<<=1,f+=k,l|=k<<p;b.rep0=e+l}else{e=b.rep0;n=b.m_RangeDecoder;g=0;for(d-=4;0!=d;--d)n.Range>>>=1,h=n.Code-n.Range>>>31,n.Code-=n.Range&h-1,g=g<<1|1-h,0==(n.Range&-16777216)&&(n.Code=n.Code<<8|J(n.Stream),n.Range<<=8);b.rep0=e+(g<<4);d=b.rep0;e=b.m_PosAlignDecoder;n=b.m_RangeDecoder;k=1;for(h=p=0;h<e.NumBitLevels;++h)g=B(n,e.Models,k),k<<=1,k+=g,p|=g<<h;b.rep0=d+p;if(0>b.rep0){b=-1==b.rep0?1:-1;break a}}else b.rep0=g;if(0<=I(F(b.rep0),b.nowPos64)||b.rep0>=b.m_DictionarySizeCheck){b=
-1;break a}d=b.m_OutWindow;e=c;n=d._pos-b.rep0-1;for(0>n&&(n+=d._windowSize);0!=e;--e)n>=d._windowSize&&(n=0),d._buffer[d._pos++]=d._buffer[n++],d._pos>=d._windowSize&&S(d);b.nowPos64=D(b.nowPos64,F(c));b.prevByte=Oa(b.m_OutWindow,0)}b=0}if(-1==b)throw Error("corrupted input");a.inBytesProcessed=Z;a.outBytesProcessed=a.decoder.nowPos64;if(1==b||0<=I(a.decoder.outSize,x)&&0<=I(a.decoder.nowPos64,a.decoder.outSize))S(a.decoder.m_OutWindow),b=a.decoder.m_OutWindow,S(b),b._stream=null,a.decoder.m_RangeDecoder.Stream=
null,a.alive=!1}return a.alive}function Ia(a,b){for(;a.m_NumPosStates<b;++a.m_NumPosStates)a.m_LowCoder[a.m_NumPosStates]=Q(new R,3),a.m_MidCoder[a.m_NumPosStates]=Q(new R,3)}function Va(a,b,c){var d;if(0==B(b,a.m_Choice,0))return da(a.m_LowCoder[c],b);d=8;return d=0==B(b,a.m_Choice,1)?d+da(a.m_MidCoder[c],b):d+(8+da(a.m_HighCoder,b))}function Ga(a){a.m_Choice=[0,0];a.m_LowCoder=Array(16);a.m_MidCoder=Array(16);a.m_HighCoder=Q(new R,8);return a}function Ja(a){var b;v(a.m_Choice);for(b=0;b<a.m_NumPosStates;++b)v(a.m_LowCoder[b].Models),
v(a.m_MidCoder[b].Models);v(a.m_HighCoder.Models)}function Wa(a,b){var c,d,e,f;a._optimumEndIndex=b;e=a._optimum[b].PosPrev;d=a._optimum[b].BackPrev;do a._optimum[b].Prev1IsChar&&(c=a._optimum[e],c.BackPrev=-1,c.Prev1IsChar=0,a._optimum[e].PosPrev=e-1,a._optimum[b].Prev2&&(a._optimum[e-1].Prev1IsChar=0,a._optimum[e-1].PosPrev=a._optimum[b].PosPrev2,a._optimum[e-1].BackPrev=a._optimum[b].BackPrev2)),f=e,c=d,d=a._optimum[f].BackPrev,e=a._optimum[f].PosPrev,a._optimum[f].BackPrev=c,a._optimum[f].PosPrev=
b,b=f;while(0<b);a.backRes=a._optimum[0].BackPrev;a._optimumCurrentIndex=a._optimum[0].PosPrev;return a._optimumCurrentIndex}function Da(a){var b;for(b=0;16>b;++b){for(var c=a._alignPrices,d=b,e=a._posAlignEncoder,f=b,k=void 0,h=void 0,l=void 0,g=void 0,g=0,l=1,h=e.NumBitLevels;0!=h;--h)k=f&1,f>>>=1,g+=V(e.Models[l],k),l=l<<1|k;c[d]=g}a._alignPriceCount=0}function Ca(a){var b,c,d,e;for(c=4;128>c;++c){e=oa(c);d=(e>>1)-1;b=(2|e&1)<<d;for(var f=a.tempPrices,k=c,h=c-b,l=void 0,g=void 0,m=void 0,p=void 0,
p=0,m=1,g=d;0!=g;--g)l=h&1,h>>>=1,p+=t[((a._posEncoders[b-e-1+m]-l^-l)&2047)>>>2],m=m<<1|l;f[k]=p}for(b=0;4>b;++b){c=a._posSlotEncoder[b];d=b<<6;for(e=0;e<a._distTableSize;++e)a._posSlotPrices[d+e]=ea(c,e);for(e=14;e<a._distTableSize;++e)a._posSlotPrices[d+e]+=(e>>1)-1-4<<6;e=128*b;for(c=0;4>c;++c)a._distancesPrices[e+c]=a._posSlotPrices[d+c];for(;128>c;++c)a._distancesPrices[e+c]=a._posSlotPrices[d+oa(c)]+a.tempPrices[c]}a._matchPriceCount=0}function la(a,b){Ua(a);var c=b&a._posStateMask;a._writeEndMark&&
(q(a._rangeEncoder,a._isMatch,(a._state<<4)+c,1),q(a._rangeEncoder,a._isRep,a._state,0),a._state=7>a._state?7:10,na(a._lenEncoder,a._rangeEncoder,0,c),c=ca(2),U(a._posSlotEncoder[c],a._rangeEncoder,63),Sa(a._rangeEncoder,67108863,26),Ta(a._posAlignEncoder,a._rangeEncoder,15));var c=a._rangeEncoder,d;for(d=0;5>d;++d)pa(c)}function mb(a,b){var c,d,e,f,k,h,l,g,m,p,n,u,y,r,v,z,w,q,x,A,B,D,F;if(a._optimumEndIndex!=a._optimumCurrentIndex)return g=a._optimum[a._optimumCurrentIndex].PosPrev-a._optimumCurrentIndex,
a.backRes=a._optimum[a._optimumCurrentIndex].BackPrev,a._optimumCurrentIndex=a._optimum[a._optimumCurrentIndex].PosPrev,g;a._optimumCurrentIndex=a._optimumEndIndex=0;a._longestMatchWasFound?(c=a._longestMatchLength,a._longestMatchWasFound=!1):c=ma(a);g=a._numDistancePairs;u=T(a._matchFinder)+1;if(2>u)return a.backRes=-1,1;for(h=l=0;4>h;++h)a.reps[h]=a._repDistances[h],a.repLens[h]=K(a._matchFinder,-1,a.reps[h],273),a.repLens[h]>a.repLens[l]&&(l=h);if(a.repLens[l]>=a._numFastBytes)return a.backRes=
l,g=a.repLens[l],x=g-1,0<x&&(Na(a._matchFinder,x),a._additionalOffset+=x),g;if(c>=a._numFastBytes)return a.backRes=a._matchDistances[g-1]+4,g=c-1,0<g&&(Na(a._matchFinder,g),a._additionalOffset+=g),c;k=C(a._matchFinder,-1);n=C(a._matchFinder,-a._repDistances[0]-1-1);if(2>c&&k!=n&&2>a.repLens[l])return a.backRes=-1,1;a._optimum[0].State=a._state;z=b&a._posStateMask;a._optimum[1].Price=t[a._isMatch[(a._state<<4)+z]>>>2]+fa(L(a._literalEncoder,b,a._previousByte),7<=a._state,n,k);f=a._optimum[1];f.BackPrev=
-1;f.Prev1IsChar=0;f=t[2048-a._isMatch[(a._state<<4)+z]>>>2];r=f+t[2048-a._isRep[a._state]>>>2];n==k&&(h=a._state,y=r+(t[a._isRepG0[h]>>>2]+t[a._isRep0Long[(h<<4)+z]>>>2]),y<a._optimum[1].Price&&(a._optimum[1].Price=y,h=a._optimum[1],h.BackPrev=0,h.Prev1IsChar=0));l=c>=a.repLens[l]?c:a.repLens[l];if(2>l)return a.backRes=a._optimum[1].BackPrev,1;a._optimum[1].PosPrev=0;a._optimum[0].Backs0=a.reps[0];a._optimum[0].Backs1=a.reps[1];a._optimum[0].Backs2=a.reps[2];a._optimum[0].Backs3=a.reps[3];h=l;do a._optimum[h--].Price=
268435455;while(2<=h);for(h=0;4>h;++h)if(y=a.repLens[h],!(2>y)){e=r+M(a,h,a._state,z);do d=e+a._repMatchLenEncoder._prices[272*z+(y-2)],m=a._optimum[y],d<m.Price&&(m.Price=d,m.PosPrev=0,m.BackPrev=h,m.Prev1IsChar=0);while(2<=--y)}f+=t[a._isRep[a._state]>>>2];h=2<=a.repLens[0]?a.repLens[0]+1:2;if(h<=c){for(r=0;h>a._matchDistances[r];)r+=2;for(;c=a._matchDistances[r+1],d=f+Xa(a,c,h,z),m=a._optimum[h],d<m.Price&&(m.Price=d,m.PosPrev=0,m.BackPrev=c+4,m.Prev1IsChar=0),h!=a._matchDistances[r]||(r+=2,r!=
g);++h);}for(c=0;;){++c;if(c==l)return Wa(a,c);e=ma(a);g=a._numDistancePairs;if(e>=a._numFastBytes)return a._longestMatchLength=e,a._longestMatchWasFound=!0,Wa(a,c);++b;f=a._optimum[c].PosPrev;a._optimum[c].Prev1IsChar?(--f,a._optimum[c].Prev2?(h=a._optimum[a._optimum[c].PosPrev2].State,h=4>a._optimum[c].BackPrev2?7>h?8:11:7>h?7:10):h=a._optimum[f].State,h=G(h)):h=a._optimum[f].State;f==c-1?h=0==a._optimum[c].BackPrev?7>h?9:11:G(h):(a._optimum[c].Prev1IsChar&&a._optimum[c].Prev2?(f=a._optimum[c].PosPrev2,
z=a._optimum[c].BackPrev2,h=7>h?8:11):(z=a._optimum[c].BackPrev,h=4>z?7>h?8:11:7>h?7:10),f=a._optimum[f],4>z?0==z?(a.reps[0]=f.Backs0,a.reps[1]=f.Backs1,a.reps[2]=f.Backs2,a.reps[3]=f.Backs3):1==z?(a.reps[0]=f.Backs1,a.reps[1]=f.Backs0,a.reps[2]=f.Backs2,a.reps[3]=f.Backs3):2==z?(a.reps[0]=f.Backs2,a.reps[1]=f.Backs0,a.reps[2]=f.Backs1,a.reps[3]=f.Backs3):(a.reps[0]=f.Backs3,a.reps[1]=f.Backs0,a.reps[2]=f.Backs1,a.reps[3]=f.Backs2):(a.reps[0]=z-4,a.reps[1]=f.Backs0,a.reps[2]=f.Backs1,a.reps[3]=f.Backs2));
a._optimum[c].State=h;a._optimum[c].Backs0=a.reps[0];a._optimum[c].Backs1=a.reps[1];a._optimum[c].Backs2=a.reps[2];a._optimum[c].Backs3=a.reps[3];f=a._optimum[c].Price;k=C(a._matchFinder,-1);n=C(a._matchFinder,-a.reps[0]-1-1);z=b&a._posStateMask;d=f+t[a._isMatch[(h<<4)+z]>>>2]+fa(L(a._literalEncoder,b,C(a._matchFinder,-2)),7<=h,n,k);u=a._optimum[c+1];m=!1;d<u.Price&&(u.Price=d,u.PosPrev=c,u.BackPrev=-1,u.Prev1IsChar=0,m=!0);f+=t[2048-a._isMatch[(h<<4)+z]>>>2];r=f+t[2048-a._isRep[h]>>>2];n!=k||u.PosPrev<
c&&0==u.BackPrev||(y=r+(t[a._isRepG0[h]>>>2]+t[a._isRep0Long[(h<<4)+z]>>>2]),y<=u.Price&&(u.Price=y,u.PosPrev=c,u.BackPrev=0,u.Prev1IsChar=0,m=!0));y=T(a._matchFinder)+1;u=y=4095-c<y?4095-c:y;if(!(2>u)){u>a._numFastBytes&&(u=a._numFastBytes);if(!m&&n!=k&&(m=Math.min(y-1,a._numFastBytes),m=K(a._matchFinder,0,a.reps[0],m),2<=m)){q=G(h);p=b+1&a._posStateMask;d=d+t[2048-a._isMatch[(q<<4)+p]>>>2]+t[2048-a._isRep[q]>>>2];for(v=c+1+m;l<v;)a._optimum[++l].Price=268435455;d+=(x=a._repMatchLenEncoder._prices[272*
p+(m-2)],x+M(a,0,q,p));m=a._optimum[v];d<m.Price&&(m.Price=d,m.PosPrev=c+1,m.BackPrev=0,m.Prev1IsChar=1,m.Prev2=0)}n=2;for(w=0;4>w;++w)if(k=K(a._matchFinder,-1,a.reps[w],u),!(2>k)){p=k;do{for(;l<c+k;)a._optimum[++l].Price=268435455;d=r+(A=a._repMatchLenEncoder._prices[272*z+(k-2)],A+M(a,w,h,z));m=a._optimum[c+k];d<m.Price&&(m.Price=d,m.PosPrev=c,m.BackPrev=w,m.Prev1IsChar=0)}while(2<=--k);k=p;0==w&&(n=k+1);if(k<y&&(m=Math.min(y-1-k,a._numFastBytes),m=K(a._matchFinder,k,a.reps[w],m),2<=m)){q=7>h?8:
11;p=b+k&a._posStateMask;d=r+(B=a._repMatchLenEncoder._prices[272*z+(k-2)],B+M(a,w,h,z))+t[a._isMatch[(q<<4)+p]>>>2]+fa(L(a._literalEncoder,b+k,C(a._matchFinder,k-1-1)),!0,C(a._matchFinder,k-1-(a.reps[w]+1)),C(a._matchFinder,k-1));q=G(q);p=b+k+1&a._posStateMask;d+=t[2048-a._isMatch[(q<<4)+p]>>>2];d+=t[2048-a._isRep[q]>>>2];for(v=k+1+m;l<c+v;)a._optimum[++l].Price=268435455;d+=(D=a._repMatchLenEncoder._prices[272*p+(m-2)],D+M(a,0,q,p));m=a._optimum[c+v];d<m.Price&&(m.Price=d,m.PosPrev=c+k+1,m.BackPrev=
0,m.Prev1IsChar=1,m.Prev2=1,m.PosPrev2=c,m.BackPrev2=w)}}if(e>u){e=u;for(g=0;e>a._matchDistances[g];g+=2);a._matchDistances[g]=e;g+=2}if(e>=n){for(f+=t[a._isRep[h]>>>2];l<c+e;)a._optimum[++l].Price=268435455;for(r=0;n>a._matchDistances[r];)r+=2;for(k=n;;++k)if(e=a._matchDistances[r+1],d=f+Xa(a,e,k,z),m=a._optimum[c+k],d<m.Price&&(m.Price=d,m.PosPrev=c,m.BackPrev=e+4,m.Prev1IsChar=0),k==a._matchDistances[r]){if(k<y&&(m=Math.min(y-1-k,a._numFastBytes),m=K(a._matchFinder,k,e,m),2<=m)){q=7>h?7:10;p=b+
k&a._posStateMask;d=d+t[a._isMatch[(q<<4)+p]>>>2]+fa(L(a._literalEncoder,b+k,C(a._matchFinder,k-1-1)),!0,C(a._matchFinder,k-(e+1)-1),C(a._matchFinder,k-1));q=G(q);p=b+k+1&a._posStateMask;d+=t[2048-a._isMatch[(q<<4)+p]>>>2];d+=t[2048-a._isRep[q]>>>2];for(v=k+1+m;l<c+v;)a._optimum[++l].Price=268435455;d+=(F=a._repMatchLenEncoder._prices[272*p+(m-2)],F+M(a,0,q,p));m=a._optimum[c+v];d<m.Price&&(m.Price=d,m.PosPrev=c+k+1,m.BackPrev=0,m.Prev1IsChar=1,m.Prev2=1,m.PosPrev2=c,m.BackPrev2=e+4)}r+=2;if(r==g)break}}}}}
function Xa(a,b,c,d){var e;e=ca(c);if(128>b)b=a._distancesPrices[128*e+b];else{var f=a._posSlotPrices,k;k=131072>b?N[b>>6]+12:134217728>b?N[b>>16]+32:N[b>>26]+52;b=f[(e<<6)+k]+a._alignPrices[b&15]}return b+a._lenEncoder._prices[272*d+(c-2)]}function M(a,b,c,d){var e;0==b?(e=t[a._isRepG0[c]>>>2],e+=t[2048-a._isRep0Long[(c<<4)+d]>>>2]):(e=t[2048-a._isRepG0[c]>>>2],1==b?e+=t[a._isRepG1[c]>>>2]:(e+=t[2048-a._isRepG1[c]>>>2],e+=V(a._isRepG2[c],b-2)));return e}function ma(a){var b;b=0;var c;a:{c=a._matchFinder;
var d=a._matchDistances,e,f,k,h,g,q,m,p,n,u,t,r,w,v,x;if(c._pos+c._matchMaxLen<=c._streamPos)n=c._matchMaxLen;else if(n=c._streamPos-c._pos,n<c.kMinMatchCheck){aa(c);c=0;break a}r=0;u=c._pos>c._cyclicBufferSize?c._pos-c._cyclicBufferSize:0;f=c._bufferOffset+c._pos;t=1;q=e=0;c.HASH_ARRAY?(k=ba[c._bufferBase[f]&255]^c._bufferBase[f+1]&255,e=k&1023,k^=(c._bufferBase[f+2]&255)<<8,q=k&65535,m=(k^ba[c._bufferBase[f+3]&255]<<5)&c._hashMask):m=c._bufferBase[f]&255^(c._bufferBase[f+1]&255)<<8;k=c._hash[c.kFixHashSize+
m]||0;c.HASH_ARRAY&&(h=c._hash[e]||0,g=c._hash[1024+q]||0,c._hash[e]=c._pos,c._hash[1024+q]=c._pos,h>u&&c._bufferBase[c._bufferOffset+h]==c._bufferBase[f]&&(d[r++]=t=2,d[r++]=c._pos-h-1),g>u&&c._bufferBase[c._bufferOffset+g]==c._bufferBase[f]&&(g==h&&(r-=2),d[r++]=t=3,d[r++]=c._pos-g-1,h=g),0!=r&&h==k&&(r-=2,t=1));c._hash[c.kFixHashSize+m]=c._pos;v=(c._cyclicBufferPos<<1)+1;x=c._cyclicBufferPos<<1;m=p=c.kNumHashDirectBytes;0!=c.kNumHashDirectBytes&&k>u&&c._bufferBase[c._bufferOffset+k+c.kNumHashDirectBytes]!=
c._bufferBase[f+c.kNumHashDirectBytes]&&(d[r++]=t=c.kNumHashDirectBytes,d[r++]=c._pos-k-1);for(e=c._cutValue;;){if(k<=u||0==e--){c._son[v]=c._son[x]=0;break}h=c._pos-k;q=(h<=c._cyclicBufferPos?c._cyclicBufferPos-h:c._cyclicBufferPos-h+c._cyclicBufferSize)<<1;w=c._bufferOffset+k;g=m<p?m:p;if(c._bufferBase[w+g]==c._bufferBase[f+g]){for(;++g!=n&&c._bufferBase[w+g]==c._bufferBase[f+g];);if(t<g&&(d[r++]=t=g,d[r++]=h-1,g==n)){c._son[x]=c._son[q];c._son[v]=c._son[q+1];break}}(c._bufferBase[w+g]&255)<(c._bufferBase[f+
g]&255)?(c._son[x]=k,x=q+1,k=c._son[x],p=g):(c._son[v]=k,v=q,k=c._son[v],m=g)}aa(c);c=r}a._numDistancePairs=c;0<a._numDistancePairs&&(b=a._matchDistances[a._numDistancePairs-2],b==a._numFastBytes&&(b+=K(a._matchFinder,b-1,a._matchDistances[a._numDistancePairs-1],273-b)));++a._additionalOffset;return b}function Ua(a){a._matchFinder&&a._needReleaseMFStream&&(a._matchFinder._stream=null,a._needReleaseMFStream=!1)}function oa(a){return 2048>a?N[a]:2097152>a?N[a>>10]+20:N[a>>20]+40}function Ba(a,b){var c;
v(a._choice);for(c=0;c<b;++c)v(a._lowCoder[c].Models),v(a._midCoder[c].Models);v(a._highCoder.Models)}function Ya(a,b,c,d,e){var f,g,h,l;f=t[a._choice[0]>>>2];g=t[2048-a._choice[0]>>>2];h=g+t[a._choice[1]>>>2];g+=t[2048-a._choice[1]>>>2];for(l=0;8>l;++l){if(l>=c)return;d[e+l]=f+ea(a._lowCoder[b],l)}for(;16>l;++l){if(l>=c)return;d[e+l]=h+ea(a._midCoder[b],l-8)}for(;l<c;++l)d[e+l]=g+ea(a._highCoder,l-8-8)}function na(a,b,c,d){8>c?(q(b,a._choice,0,0),U(a._lowCoder[d],b,c)):(c-=8,q(b,a._choice,0,1),8>
c?(q(b,a._choice,1,0),U(a._midCoder[d],b,c)):(q(b,a._choice,1,1),U(a._highCoder,b,c-8)));0==--a._counters[d]&&(Ya(a,d,a._tableSize,a._prices,272*d),a._counters[d]=a._tableSize)}function za(a){var b;a._choice=[0,0];a._lowCoder=Array(16);a._midCoder=Array(16);a._highCoder=O(new P,8);for(b=0;16>b;++b)a._lowCoder[b]=O(new P,3),a._midCoder[b]=O(new P,3);a._prices=Array(4352);a._counters=Array(16);return a}function Ea(a,b){var c;for(c=0;c<b;++c)Ya(a,c,a._tableSize,a._prices,272*c),a._counters[c]=a._tableSize}
function L(a,b,c){return a.m_Coders[((b&a.m_PosMask)<<a.m_NumPrevBits)+((c&255)>>>8-a.m_NumPrevBits)]}function Qa(a,b,c){var d,e,f;e=1;for(f=7;0<=f;--f)d=c>>f&1,q(b,a.m_Encoders,e,d),e=e<<1|d}function fa(a,b,c,d){var e,f,g,h;h=0;e=1;f=7;if(b)for(;0<=f;--f)if(g=c>>f&1,b=d>>f&1,h+=V(a.m_Encoders[(1+g<<8)+e],b),e=e<<1|b,g!=b){--f;break}for(;0<=f;--f)b=d>>f&1,h+=V(a.m_Encoders[e],b),e=e<<1|b;return h}function Q(a,b){a.NumBitLevels=b;a.Models=Array(1<<b);return a}function da(a,b){var c,d;d=1;for(c=a.NumBitLevels;0!=
c;--c)d=(d<<1)+B(b,a.Models,d);return d-(1<<a.NumBitLevels)}function O(a,b){a.NumBitLevels=b;a.Models=Array(1<<b);return a}function U(a,b,c){var d,e,f;f=1;for(e=a.NumBitLevels;0!=e;)--e,d=c>>>e&1,q(b,a.Models,f,d),f=f<<1|d}function ea(a,b){var c,d,e,f;f=0;e=1;for(d=a.NumBitLevels;0!=d;)--d,c=b>>>d&1,f+=V(a.Models[e],c),e=(e<<1)+c;return f}function Ta(a,b,c){var d,e,f;f=1;for(e=0;e<a.NumBitLevels;++e)d=c&1,q(b,a.Models,f,d),f=f<<1|d,c>>=1}function B(a,b,c){var d,e;e=b[c];d=(a.Range>>>11)*e;if((a.Code^
-2147483648)<(d^-2147483648))return a.Range=d,b[c]=e+(2048-e>>>5)<<16>>16,0==(a.Range&-16777216)&&(a.Code=a.Code<<8|J(a.Stream),a.Range<<=8),0;a.Range-=d;a.Code-=d;b[c]=e-(e>>>5)<<16>>16;0==(a.Range&-16777216)&&(a.Code=a.Code<<8|J(a.Stream),a.Range<<=8);return 1}function v(a){var b;for(b=a.length-1;0<=b;--b)a[b]=1024}function q(a,b,c,d){var e,f;f=b[c];e=(a.Range>>>11)*f;0==d?(a.Range=e,b[c]=f+(2048-f>>>5)<<16>>16):(a.Low=D(a.Low,qa(F(e),[4294967295,0])),a.Range-=e,b[c]=f-(f>>>5)<<16>>16);0==(a.Range&
-16777216)&&(a.Range<<=8,pa(a))}function Sa(a,b,c){for(--c;0<=c;--c)a.Range>>>=1,1==(b>>>c&1)&&(a.Low=D(a.Low,F(a.Range))),0==(a.Range&-16777216)&&(a.Range<<=8,pa(a))}function pa(a){var b,c;b=a.Low;var d;d=32;c=ta(b,d);0>b[1]&&(c=D(c,ja([2,0],63-d)));b=A(c);if(0!=b||0>I(a.Low,[4278190080,0])){a._position=D(a._position,F(a._cacheSize));c=a._cache;do d=a.Stream,c+=b,d.buf[d.count++]=c<<24>>24,c=255;while(0!=--a._cacheSize);a._cache=A(a.Low)>>>24}++a._cacheSize;a.Low=ja(qa(a.Low,[16777215,0]),8)}function V(a,
b){return t[((a-b^-b)&2047)>>>2]}function nb(a){var b="",c,d,e,f,g=a.length;for(c=0;c<g;++c)if(d=a[c]&255,0==(d&128)){if(0==d)return a;b+=String.fromCharCode(d&65535)}else if(192==(d&224)){if(c+1>=a.length)return a;e=a[++c]&255;if(128!=(e&192))return a;b+=String.fromCharCode((d&31)<<6&65535|e&63)}else if(224==(d&240)){if(c+2>=a.length)return a;e=a[++c]&255;if(128!=(e&192))return a;f=a[++c]&255;if(128!=(f&192))return a;b+=String.fromCharCode(((d&15)<<12|(e&63)<<6|f&63)&65535)}else return a;return b}
function ob(a){var b=[],c,d=0,e,f=a.length;if("object"==typeof a){if(a instanceof Array)b=a;else if(a.toJSON)b=a.toJSON();else for(e=0;e<f;e+=1)b[e]=a[e];return b}e=b;c=0;var g;for(g=0;g<f;++g)e[c++]=a.charCodeAt(g);for(e=0;e<f;++e)a=b[e],1<=a&&127>=a?++d:d=0==a||128<=a&&2047>=a?d+2:d+3;c=Array(d);for(e=d=0;e<f;++e)a=b[e],1<=a&&127>=a?c[d++]=a<<24>>24:(0==a||128<=a&&2047>=a?c[d++]=(192|a>>6&31)<<24>>24:(c[d++]=(224|a>>12&15)<<24>>24,c[d++]=(128|a>>6&63)<<24>>24),c[d++]=(128|a&63)<<24>>24);return c}
function W(a){return a[1]+a[0]}var ga="function"==typeof setImmediate?setImmediate:setTimeout,g,Z=[4294967295,-4294967296],ia=[0,-9223372036854775808],x=[0,0],Ra=[1,0],Za=w({}),ra=Array(256),pb=w(),ya=w(new pb);g.count=0;g.pos=0;var qb=w(),xa=w(new qb);g.count=0;var rb=w(),sb=w(new rb),tb=w();g.length_0=x;var ub=w(new tb),vb=w();g._blockSize=0;g._bufferOffset=0;g._keepSizeAfter=0;g._keepSizeBefore=0;g._pointerToLastSafePosition=0;g._pos=0;g._posLimit=0;g._streamPos=0;var ba=function(){var a,b,c,d=
Array(256);for(a=0;256>a;++a){c=a;for(b=0;8>b;++b)c=0!=(c&1)?c>>>1^-306674912:c>>>1;d[a]=c}return d}(),eb=w(new vb);g.HASH_ARRAY=!0;g._cutValue=255;g._cyclicBufferPos=0;g._cyclicBufferSize=0;g._hashSizeSum=0;g.kFixHashSize=66560;g.kMinMatchCheck=4;g.kNumHashDirectBytes=0;var ib=w();g._pos=0;g._streamPos=0;g._windowSize=0;var Fa=w(),hb=w();g.m_DictionarySize=-1;g.m_DictionarySizeCheck=-1;g.m_PosStateMask=0;g.nowPos64=x;g.outSize=x;g.prevByte=0;g.rep0=0;g.rep1=0;g.rep2=0;g.rep3=0;g.state=0;var Ha=w();
g.m_NumPosStates=0;var kb=w();g.m_NumPosBits=0;g.m_NumPrevBits=0;g.m_PosMask=0;var lb=w(),N=function(){var a,b,c,d,e=Array(2048);a=2;e[0]=0;e[1]=1;for(d=2;22>d;++d)for(c=1<<(d>>1)-1,b=0;b<c;++b,++a)e[a]=d<<24>>24;return e}(),ab=w();g._additionalOffset=0;g._alignPriceCount=0;g._dictionarySize=4194304;g._dictionarySizePrev=-1;g._distTableSize=44;g._longestMatchLength=0;g._matchFinderType=1;g._matchPriceCount=0;g._numDistancePairs=0;g._numFastBytes=32;g._numFastBytesPrev=-1;g._numLiteralContextBits=
3;g._numLiteralPosStateBits=0;g._optimumCurrentIndex=0;g._optimumEndIndex=0;g._posStateBits=2;g._posStateMask=3;g._previousByte=0;g._state=0;g.backRes=0;g.nowPos64=x;var wb=w(),Aa=w(new wb);g._tableSize=0;var cb=w();g.m_NumPosBits=0;g.m_NumPrevBits=0;g.m_PosMask=0;var fb=w(),db=w();g.BackPrev=0;g.BackPrev2=0;g.Backs0=0;g.Backs1=0;g.Backs2=0;g.Backs3=0;g.PosPrev=0;g.PosPrev2=0;g.Price=0;g.State=0;var R=w();g.NumBitLevels=0;var P=w();g.NumBitLevels=0;var jb=w();g.Code=0;g.Range=0;var t=function(){var a,
b,c,d=Array(512);for(b=8;0<=b;--b)for(c=1<<9-b-1,a=1<<9-b;c<a;++c)d[c]=(b<<6)+(a-c<<6>>>9-b-1);return d}(),bb=w();g.Low=x;g.Range=0;g._cache=0;g._cacheSize=0;g._position=x;var xb=function(){var a=[{ds:16,fb:64,mf:0,lc:3,lp:0,pb:2},{ds:20,fb:64,mf:0,lc:3,lp:0,pb:2},{ds:19,fb:64,mf:1,lc:3,lp:0,pb:2},{ds:20,fb:64,mf:1,lc:3,lp:0,pb:2},{ds:21,fb:128,mf:1,lc:3,lp:0,pb:2},{ds:22,fb:128,mf:1,lc:3,lp:0,pb:2},{ds:23,fb:128,mf:1,lc:3,lp:0,pb:2},{ds:24,fb:255,mf:1,lc:3,lp:0,pb:2},{ds:25,fb:255,mf:1,lc:3,lp:0,
pb:2}];return function(b){return a[b-1]||a[6]}}();"undefined"==typeof onmessage||"undefined"!=typeof window&&"undefined"!=typeof window.document||function(){onmessage=function(a){a&&a.data&&(2==a.data.action?LZMA.decompress(a.data.data,a.data.cbn):1==a.data.action&&LZMA.compress(a.data.data,a.data.mode,a.data.cbn))}}();return{compress:function(a,b,c,d){function e(){var a;for(a=(new Date).getTime();Pa(f.c.chunker);)if(g=W(f.c.chunker.inBytesProcessed)/W(f.c.length_0),200<(new Date).getTime()-a)return d?
d(g):"undefined"!=typeof h&&H(g,h),ga(e,0),!1;d?d(1):"undefined"!=typeof h&&H(1,h);a=wa(f.c.output);c?c(a):"undefined"!=typeof h&&postMessage({action:1,cbn:h,result:new Uint8Array(a)})}var f={},g,h;"function"!=typeof c&&(h=c,c=d=0);f.c=$a(new sb,ob(a),xb(b));d?d(0):"undefined"!=typeof h&&H(0,h);ga(e,0)},decompress:function(a,b,c){function d(){var a;a=0;for(var q=(new Date).getTime();Pa(e.d.chunker);)if(0==++a%1E3&&200<(new Date).getTime()-q)return h&&(f=W(e.d.chunker.decoder.nowPos64)/W(e.d.length_0),
c?c(f):"undefined"!=typeof g&&H(f,g)),ga(d,0),!1;h&&(c?c(1):"undefined"!=typeof g&&H(1,g));a=nb(wa(e.d.output));b?b(a):"undefined"!=typeof g&&postMessage({action:2,cbn:g,result:new Uint8Array(a)})}var e={},f,g,h;"function"!=typeof b&&(g=b,b=c=0);e.d=gb(new ub,a);h=-1<W(e.d.length_0);c?c(h?0:-1):"undefined"!=typeof g&&H(h?0:-1,g);ga(d,0)}}}();this.LZMA=this.LZMA_WORKER=LZMA;
