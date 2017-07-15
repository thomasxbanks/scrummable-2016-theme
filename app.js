function screen_size(){screen_width=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;screen_height=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;}function document_height(){var body=document.body,html=document.documentElement;document_height=Math.max(body.scrollHeight,body.offsetHeight,html.clientHeight,html.scrollHeight,html.offsetHeight);// console.log(document_height);
}// What are the browser dimensions?
let browser={width:window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,height:window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight};function is_at_top(){var panel_offset=$('#page__content_ajax').offset();var panel_left=panel_offset.top;if(panel_left==0){return true;}else{return false;}}function persistent_element_heights(){colophon_height=$('#colophon').height();masthead_height=$('#masthead').height();}
function debouncer(func,timeout){var timeoutID,timeout=timeout||200;return function(){var scope=this,args=arguments;clearTimeout(timeoutID);timeoutID=setTimeout(function(){func.apply(scope,Array.prototype.slice.call(args));},timeout);};}function return_to_top(){var distance=document_height/screen_height;var content_top=0+screen_height-$('#masthead').height();if(distance>5){var transition_speed=300;}else{var transition_speed=800;}$("html body").animate({scrollTop:content_top},transition_speed);return false;// TODO: fix nav bar hide on skip-link...
}function nudge(){$("html, body").animate({scrollTop:screen_height},transition_speed_slowest);return false;}function max_height(){$('.max-height').css('height',screen_height);}function detectIE(){var ua=window.navigator.userAgent;// Test values; Uncomment to check result …
// IE 10
// ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
// IE 11
// ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
// IE 12 / Spartan
// ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
// Edge (IE 12+)
// ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';
var msie=ua.indexOf('MSIE ');if(msie>0){// IE 10 or older => return version number
return parseInt(ua.substring(msie+5,ua.indexOf('.',msie)),10);}var trident=ua.indexOf('Trident/');if(trident>0){// IE 11 => return version number
var rv=ua.indexOf('rv:');return parseInt(ua.substring(rv+3,ua.indexOf('.',rv)),10);}var edge=ua.indexOf('Edge/');if(edge>0){// Edge (IE 12+) => return version number
return parseInt(ua.substring(edge+5,ua.indexOf('.',edge)),10);}// other browser
return false;}function progressive_media(){$(".hero-full").each(function(){var url=$(this).attr("src");var thumb=$(this).prev();if(detectIE()){var parent=$(this).parent();$(parent).css('background-image','url('+url+')');$('.hero-full').addClass('hide');}$(this).load(function(){$(thumb).addClass('hide');}).attr('src',url);});}function vaporise(){if($("body").length){$(window).scroll(function(){let vaporise=document.querySelector('.vaporise .hero__title');let parallax=document.querySelector('.vaporise .hero-full');let scroll=window.pageYOffset;let opacity=1-scroll/1000>0?1-scroll/1000:0;let scale=1+scroll/1000>1?1+scroll/1000:1;let blur=1+scroll/10>1?1+scroll/100:0;if(scroll<browser.height){parallax.style.marginTop=0+scroll/2+"px";vaporise.style.opacity=opacity;vaporise.style.transform=`scale(${scale})`;vaporise.style.filter=`blur(${blur}px)`;}// end Hero Parallax - Post
});}}function sidebar(variant){var this_sidebar="#sidebar--"+variant;var not_this_sidebar='.sidebar:not('+this_sidebar+')';$(not_this_sidebar).removeClass('open');$(this_sidebar).toggleClass('open');}function bsod(){$('#bsod').animate({'opacity':0},500,function(){$(this).remove();});}function global_functions(){screen_size();max_height();persistent_element_heights();if($(window).scrollTop()>0){$('#masthead.fade-in').addClass('open');}progressive_media();vaporise();};
// Functons on load
$(document).ready(function(){// onLoad operations
document_height();global_functions();// If Browser is Internet Explorer or Edge
if(detectIE()){var imgUrl=document.querySelectorAll('.hero-full')[0].getAttribute('src');//var imgUrl = $('#hero_image').find('img').prop('src');
document.querySelector('#hero_image').style.backgroundImage=`url(${imgUrl})`;// $('#hero_image').css('background-image', 'url("' + imgUrl + '")');
document.querySelector('#hero_image img').style.opacity=0;$('html').addClass('is-ie');}else{$('html').addClass('not-ie');}// Detect jQuery
$('html').toggleClass('no-jquery jquery');// Functions on Scroll
var CurrentScroll=0;$(window).on('scroll scrollstart',function(){var scroll=$(window).scrollTop();// log for debug
// console.log(screen_height, scroll);
// Show/hide Masthead
if(scroll>screen_height/2){$('.home #masthead.fade-in').addClass('open');}else{$('.home #masthead.fade-in').removeClass('open');}if(scroll>screen_height){document.querySelector('.scroll-up').setAttribute('data-state','shown');document.querySelector('.scroll-down').setAttribute('data-state','hidden');}else{document.querySelector('.scroll-up').setAttribute('data-state','hidden');document.querySelector('.scroll-down').setAttribute('data-state','shown');}//console.log("doc_height: "+document_height+". \nscreen_height: "+screen_height+". \ndoc - screen: "+(document_height - screen_height)+". scroll: "+scroll);
if(scroll>document_height-screen_height*2&&document_height>screen_height){$('button#return_to_top').addClass('slideout');}else{$('button#return_to_top').removeClass('slideout');}// Directional scroll
var NextScroll=$(this).scrollTop();if(NextScroll>CurrentScroll){// Scroll down the page
$('#masthead.considerate').addClass('slide-away');sidebar('all');// Scroll ended for 100ms
clearTimeout($.data(this,'scrollTimer'));$.data(this,'scrollTimer',setTimeout(function(){},100));// end Scroll ended for 100ms
}else{// Scroll up the page
$('#masthead.considerate').removeClass('slide-away');sidebar('all');}CurrentScroll=NextScroll;//Updates current scroll position
});// Mobile Nav Controls
$('.nav-icon button').on("click",function(){var variant=$(this).attr('data-sidebar');sidebar(variant);});// end Mobile Nav Controls
// 404 page overlay
$('#bsod').on("click",function(){$(this).animate({'opacity':0},500,function(){$(this).remove();});});setTimeout(bsod,3000);// end 404 page overlay
});// Functions on resize
$(window).resize(debouncer(function(e){// onResize operations
//document_height();
global_functions();}));
var transition_speed_fast=200;var transition_speed_slow=400;var tranition_speed_slower=600;var transition_speed_slowest=800;var transition_speed_minute=60000;
