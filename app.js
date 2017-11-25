'use strict';var body=document.body,html=document.documentElement;var document_height=function document_height(){return Math.max(body.scrollHeight,body.offsetHeight,html.clientHeight,html.scrollHeight,html.offsetHeight);};var browser={width:window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,height:window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight};var elementSize={colophon:{height:document.querySelector('#colophon').clientHeight},masthead:{height:document.querySelector('#masthead').clientHeight}};function debouncer(func,timeout){var timeoutID,timeout=timeout||200;return function(){var scope=this,args=arguments;clearTimeout(timeoutID);timeoutID=setTimeout(function(){func.apply(scope,Array.prototype.slice.call(args));},timeout);};}var numberizePixels=function numberizePixels(element){var elementHeight=window.getComputedStyle(element).getPropertyValue('height');return~~elementHeight.substr(0,elementHeight.length-2);};var return_to_top=function return_to_top(){scrollIt(numberizePixels(document.querySelector('.hero-full')));};var max_height=function max_height(){var maxHeightElements=document.querySelectorAll('.max-height');for(var i=0;i<maxHeightElements.length;i++){maxHeightElements[i].style.height=browser.height;}};var detectIE=function detectIE(){var ua=window.navigator.userAgent;var msie=ua.indexOf('MSIE ');if(msie>0){return parseInt(ua.substring(msie+5,ua.indexOf('.',msie)),10);}var trident=ua.indexOf('Trident/');if(trident>0){var rv=ua.indexOf('rv:');return parseInt(ua.substring(rv+3,ua.indexOf('.',rv)),10);}var edge=ua.indexOf('Edge/');if(edge>0){return parseInt(ua.substring(edge+5,ua.indexOf('.',edge)),10);}return false;};function vaporise(scroll){if(document.querySelector('.vaporise')){if(scroll<browser.height){var _vaporise=document.querySelector('.vaporise .hero__title');var parallax=document.querySelector('.vaporise .hero-full');var opacity=1-scroll/1000>0?1-scroll/1000:0;var scale=1+scroll/1000>1?1+scroll/1000:1;var blur=1+scroll/10>1?1+scroll/100:0;parallax.style.transform='translate3d(0, '+(0+scroll/2)+'px, 0)';_vaporise.style.opacity=opacity;_vaporise.style.transform='scale('+scale+')';_vaporise.style.filter='blur('+blur+'px)';}}}function sidebar(variant){var otherSidebars=document.querySelectorAll('.sidebar:not([id="sidebar--'+variant+'"])');for(var i=0;i<otherSidebars.length;i++){otherSidebars[i].setAttribute('data-state','closed');}document.querySelector('#sidebar--'+variant).setAttribute('data-state','open');}function bsod(){if(document.querySelector('.error404')){document.querySelector('#bsod').style.transition='opacity ease-in 500ms';setTimeout(function(){document.querySelector('#bsod').style.opacity=0;setTimeout(function(){document.querySelector('#bsod').outerHTML='';},1000);},2000);}}function global_functions(){document_height();max_height();if(window.pageYOffset>0){document.querySelector('#masthead').classList.add('fade-in');document.querySelector('#masthead').classList.add('open');}}window.onload=function(){global_functions();var heroImages=document.querySelectorAll('.hero-full');var _loop=function _loop(){var src=heroImages[i].getAttribute('data-src');var thumb=heroImages[i].previousElementSibling;if(detectIE()){heroImages[i].parentElement.style.backgroundImage='url("'+src+'")';thumb.classList.add('hide');}else{heroImages[i].setAttribute('src',src);heroImages[i].onload=function(){thumb.classList.add('hide');};}};for(var i=0;i<heroImages.length;i++){_loop();}};if(detectIE()){document.querySelector('html').classList.add('is-ie');}else{document.querySelector('html').classList.add('not-ie');}var CurrentScroll=0;window.onscroll=function(){var scroll=window.pageYOffset;if(scroll>browser.height/2){document.querySelector('#masthead').classList.add('open');}else{document.querySelector('#masthead').classList.remove('open');}if(scroll>browser.height){document.querySelector('.scroll-up').setAttribute('data-state','shown');document.querySelector('.scroll-down').setAttribute('data-state','hidden');}else{document.querySelector('.scroll-up').setAttribute('data-state','hidden');document.querySelector('.scroll-down').setAttribute('data-state','shown');}if(scroll>document_height-browser.height*2){document.querySelector('button#return_to_top').setAttribute('data-state','is-shown');}else{document.querySelector('button#return_to_top').setAttribute('data-state','not-shown');}var sidebars=document.querySelectorAll('.sidebar');for(var i=0;i<sidebars.length;i++){if(sidebars[i].getAttribute('data-state')==='open'){sidebar('all');}}vaporise(scroll);if(scroll>CurrentScroll){document.querySelector('#masthead').classList.add('slide-away');}else{document.querySelector('#masthead').classList.remove('slide-away');}CurrentScroll=scroll;};var navButtons=document.querySelectorAll('.nav-icon button');for(var i=0;i<navButtons.length;i++){navButtons[i].addEventListener('click',function(e){var variant=e.currentTarget.getAttribute('data-sidebar');var currentState=document.querySelector('#sidebar--'+variant).getAttribute('data-state');if(currentState==='open'){sidebar('all');}else{sidebar(variant);}});}bsod();window.onresize=function(e){global_functions();};var anchors=document.querySelectorAll('a[href^="#"]');anchors.forEach(function(anchor){anchor.addEventListener('click',function(e){scrollIt(document.querySelector(e.currentTarget.getAttribute('href').split('#')[1]),300,'easeOutQuad',function(){return console.log('Just finished scrolling to '+window.pageYOffset+'px');});});});
'use strict';function scrollIt(destination){var duration=arguments.length>1&&arguments[1]!==undefined?arguments[1]:200;var easing=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'linear';var callback=arguments[3];var easings={linear:function linear(t){return t;},easeInQuad:function easeInQuad(t){return t*t;},easeOutQuad:function easeOutQuad(t){return t*(2-t);},easeInOutQuad:function easeInOutQuad(t){return t<0.5?2*t*t:-1+(4-2*t)*t;},easeInCubic:function easeInCubic(t){return t*t*t;},easeOutCubic:function easeOutCubic(t){return--t*t*t+1;},easeInOutCubic:function easeInOutCubic(t){return t<0.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1;},easeInQuart:function easeInQuart(t){return t*t*t*t;},easeOutQuart:function easeOutQuart(t){return 1- --t*t*t*t;},easeInOutQuart:function easeInOutQuart(t){return t<0.5?8*t*t*t*t:1-8*--t*t*t*t;},easeInQuint:function easeInQuint(t){return t*t*t*t*t;},easeOutQuint:function easeOutQuint(t){return 1+--t*t*t*t*t;},easeInOutQuint:function easeInOutQuint(t){return t<0.5?16*t*t*t*t*t:1+16*--t*t*t*t*t;}};var start=window.pageYOffset;var startTime='now'in window.performance?performance.now():new Date().getTime();var documentHeight=Math.max(document.body.scrollHeight,document.body.offsetHeight,document.documentElement.clientHeight,document.documentElement.scrollHeight,document.documentElement.offsetHeight);var windowHeight=window.innerHeight||document.documentElement.clientHeight||document.getElementsByTagName('body')[0].clientHeight;var destinationOffset=typeof destination==='number'?destination:destination.offsetTop;var destinationOffsetToScroll=Math.round(documentHeight-destinationOffset<windowHeight?documentHeight-windowHeight:destinationOffset);if('requestAnimationFrame'in window===false){window.scroll(0,destinationOffsetToScroll);if(callback){callback();}return;}function scroll(){var now='now'in window.performance?performance.now():new Date().getTime();var time=Math.min(1,(now-startTime)/duration);var timeFunction=easings[easing](time);window.scroll(0,Math.ceil(timeFunction*(destinationOffsetToScroll-start)+start));if(window.pageYOffset===destinationOffsetToScroll){if(callback){callback();}return;}requestAnimationFrame(scroll);}scroll();}
