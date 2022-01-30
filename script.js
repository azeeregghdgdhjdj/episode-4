<!--carosel roulante-->
 let activeIndex = 0
 let limit = 0
 let disabled = false
 let $stage
 let $controls
 let canvas = false
 
 const SPIN_FORWARD_CLASS = 'js-spin-fwd'
 const SPIN_BACKWARD_CLASS = 'js-spin-bwd'
 const DISABLE_TRANSITIONS_CLASS = 'js-transitions-disabled'
 const SPIN_DUR = 1000
 
 const appendControls = () => {
   for (let i = 0; i < limit; i++) {
     $('.carousel__control').append(`<a href="#" data-index="${i}"></a>`)
   }
   let height = $('.carousel__control').children().last().outerHeight()
   
   $('.carousel__control').css('height', (30 + (limit * height)))
   $controls = $('.carousel__control').children()
   $controls.eq(activeIndex).addClass('active')
 }
 
 const setIndexes = () => {
     $('.spinner').children().each((i, el) => {
         $(el).attr('data-index', i)
         limit++
     })


 }
 
 const duplicateSpinner = () => {
     const $el = $('.spinner').parent()
     const html = $('.spinner').parent().html()
     $el.append(html)
     $('.spinner').last().addClass('spinner--right')
     $('.spinner--right').removeClass('spinner--left')
 }
 
 const paintFaces = () => {
     $('.spinner__face').each((i, el) => {
         const $el = $(el)
         let color = $(el).attr('data-bg')
         $el.children().css('backgroundImage', `url(${getBase64PixelByColor(color)})`)
     })
 }
 
 const getBase64PixelByColor = (hex) => {
     if (!canvas) {
         canvas = document.createElement('canvas')
         canvas.height = 1
         canvas.width = 1
     }
     if (canvas.getContext) {
         const ctx = canvas.getContext('2d')
         ctx.fillStyle = hex
         ctx.fillRect (0, 0, 1, 1)
         return canvas.toDataURL()
     }
     return false
 }
 
 const prepareDom = () => {
     setIndexes()
     paintFaces()
     duplicateSpinner()
     appendControls()
 }
 
 const spin = (inc = 1) => {
     if (disabled) return
     if (!inc) return
     activeIndex += inc
     disabled = true
 
     if (activeIndex >= limit) {
         activeIndex = 0
     }
   
     if (activeIndex < 0) {
         activeIndex = (limit - 1)
     }
 
     const $activeEls = $('.spinner__face.js-active')
     const $nextEls = $(`.spinner__face[data-index=${activeIndex}]`)
     $nextEls.addClass('js-next')
   
     if (inc > 0) {
       $stage.addClass(SPIN_FORWARD_CLASS)
     } else {
       $stage.addClass(SPIN_BACKWARD_CLASS)
     }
     
     $controls.removeClass('active')
     $controls.eq(activeIndex).addClass('active')
   
     setTimeout(() => {
         spinCallback(inc)
     }, SPIN_DUR, inc)
 }
 
 const spinCallback = (inc) => {
     
     $('.js-active').removeClass('js-active')
     $('.js-next').removeClass('js-next').addClass('js-active')
     $stage
         .addClass(DISABLE_TRANSITIONS_CLASS)
         .removeClass(SPIN_FORWARD_CLASS)
         .removeClass(SPIN_BACKWARD_CLASS)
   
     $('.js-active').each((i, el) => {
         const $el = $(el)
         $el.prependTo($el.parent())
     })
     setTimeout(() => {
         $stage.removeClass(DISABLE_TRANSITIONS_CLASS)
         disabled = false
     }, 100)
 
 }
 
 const attachListeners = () => {
   
     document.onkeyup = (e) => {
         switch (e.keyCode) {
             case 38:
                 spin(-1)
                 break
             case 40:
                 spin(1)
                 break
             }
     }
  
     $controls.on('click', (e) => {
       e.preventDefault()
       if (disabled) return
       const $el = $(e.target)
       const toIndex = parseInt($el.attr('data-index'), 10)
       spin(toIndex - activeIndex)
       
     })
 }
 
 const assignEls = () => {
     $stage = $('.carousel__stage')
 }
 
 const init = () => {
     assignEls()
     prepareDom()
     attachListeners()
 }
 
 
 $(() => {
     init();
 });

 // 
 $( document ).ready(function() {
 
	bannerslideronclick();
  bannerslider();

});

var $slider=$('.carosel-wrap');
wbanner=$slider.css('width');
var $SlideContainer=$slider.find('.carosel-container');
var $Slides=$SlideContainer.find('.carosel');
var currentSlide= 0;
var click=true;

//function animate on clickrightarrow
function bannerslideronclick(){
 
 var $Slides=$SlideContainer.find('.carosel');
	$slideRight=$('.switch-button a');
	$slideRight.on('click',function(e){
  e.preventDefault();

  var active=$(this).index();
    console.log(parseInt(wbanner)*parseInt(active));
    //console.log(active);  
   
    $(this).addClass('active').siblings().removeClass('active');
		if(click){
			click=false;
      stopSlider();
      slidertime=6000;
      callstartslider();
			//currentSlide++;	
      currentSlide=$(this).index();
      console.log(currentSlide);
			//currentSlide%=$Slides.length;
		  //currentSlide%=$Slides.length;
			$SlideContainer.animate({'marginLeft':  '-'+(parseInt(wbanner)*(parseInt(active)))},1000, function(){
			  click=true;
       
			});

		}

	});
}





// function Banner animation with out click

var Interval;

function  bannerslider(){

$slider.on('mouseenter',stopSlider).on('mouseleave',startSlider);
startSlider();
  
}

var slidertime=6000;
function startSlider(){
		Interval=setInterval(function(){
		//leftbanclick=false;
	  click=false;
		currentSlide++;
    console.log(currentSlide);
    console.log( parseInt(wbanner)*parseInt(currentSlide) );
      
    if(currentSlide==$Slides.length){
      
      $slideRight.eq(0).addClass('active').siblings().removeClass('active');
      
      
    }
      else {
      $slideRight.eq(currentSlide).addClass('active').siblings().removeClass('active');
    }
    
      
      
		currentSlide%=$Slides.length;
		currentSlide%=$Slides.length;
   
		//console.log("slidertime:"+slidertime);
		$SlideContainer.animate({'marginLeft': '-'+(parseInt(wbanner)*(parseInt(currentSlide)))},1000, function(){
		
    click=true;
	});
		if(currentSlide==0 ){
      currentSlide=0;
			stopSlider();
			slidertime=6000;
			callstartslider();
		}else if(currentSlide!=0 && slidertime==6000){
			stopSlider();
			slidertime=6000;
			callstartslider();
      
		}

 
	},slidertime);


}
function callstartslider(){
	
		startSlider();

}
function stopSlider(){

	clearInterval(Interval);
	
}





function emailCheck() {
    if ($("#email").val() == "") {
      $("#email").addClass("is-invalid");
      return false;
    } else {
      var regMail = /^([_a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,3})$/;
      if (regMail.test($("#email").val()) == false) {
        $("#email").addClass("is-invalid");
        return false;
      } else {
        $("#email").removeClass("is-invalid");
        $("#next-form").collapse("show");
      }
    }
  }
  function validation() {
    if ($("#username, #phone, #password, #cpassword").val() == "") {
      $("#username, #phone, #password, #cpassword").addClass("is-invalid");
      return false;
    } else {
      $("#username, #phone, #password, #cpassword").removeClass("is-invalid");
    }
  
    if ($("#password").val() != $("#cpassword").val()) {
      $("#cpassword").addClass("is-invalid");
      $("#cp").html(
        '<span class="text-danger">Password and confirm password not matched!</span>'
      );
      return false;
    }
  }
  $(document).ready(function(e) {
    $("#username").on("keyup", function() {
      if ($("#username").val() == "") {
        $("#username").addClass("is-invalid");
        return false;
      } else {
        $("#username").removeClass("is-invalid");
      }
    });
    $("#phone").on("keyup", function() {
      if ($("#phone").val() == "") {
        $("#phone").addClass("is-invalid");
        return false;
      } else {
        $("#phone").removeClass("is-invalid");
      }
    });
    $("#password").on("keyup", function() {
      if ($("#password").val() == "") {
        $("#password").addClass("is-invalid");
        return false;
      } else {
        $("#password").removeClass("is-invalid");
      }
    });
    $("#cpassword").on("keyup", function() {
      if ($("#cpassword").val() == "") {
        $("#cpassword").addClass("is-invalid");
        return false;
      } else {
        $("#cpassword").removeClass("is-invalid");
      }
    });
    
    jQuery(function($) {
      var input = $("[type=tel]");
      input.mobilePhoneNumber({ allowPhoneWithoutPrefix: "+1" });
      input.bind("country.mobilePhoneNumber", function(e, country) {
        $(".country").text(country || "");
      });
    });
    
  });
  
  
  