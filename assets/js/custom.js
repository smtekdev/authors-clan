/*--------------------- Copyright (c) 2020 -----------------------
[Master Javascript]
Project: Consulting html
-------------------------------------------------------------------*/
(function ($) {
	"use strict";
	var Consulting = {
		initialised: false,
		version: 1.0,
		mobile: false,
		init: function () {
			if (!this.initialised) {
				this.initialised = true;
			}
			else {
				return;
			}
			/*-------------- Consulting Functions Calling ---------------------------------------------------
			------------------------------------------------------------------------------------------------*/

			
			
			this.toggle_btn();
			this.testimonial_slider();
			this.team_slider();	
			this.formmodal();	
		},

		/*-------------- Consulting Functions Calling ---------------------------------------------------
		--------------------------------------------------------------------------------------------------*/


		// toggle start
		toggle_btn: function () {
			$(document).on("click", function (event) {
				var $trigger = $(".wh-toggle");
				if ($trigger !== event.target && !$trigger.has(event.target).length) {
					$("body").removeClass("toggle");
				}
			});
			$(" .wh-toggle").click(function () {
				$("body").toggleClass("toggle");
			});
		},
		// toggle end
		// testimonial-slider-start
		testimonial_slider: function () {
			var swiper = new Swiper(".wr-mySwiper", {
				cssMode: true,
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
				},
				pagination: {
					el: ".swiper-pagination",
					clickable: true,
				},
				mousewheel: true,
				keyboard: true,
			});
		},
		// testimonial-slider-end
		// team slider start
		team_slider: function () {

			var swiper = new Swiper('.Wr-expertise-section .Wr-expertise-swiper-container', {
				slidesPerView: 3,
				spaceBetween: 20,
				loop: true,
				speed: 1000,
				autoplay: {
					delay: 2500,
					disableOnInteraction: false,
				},
				breakpoints: {
					1199: {
						slidesPerView: 3,
						spaceBetween: 10,
					},
					992: {
						slidesPerView: 3,
						spaceBetween: 30,
					},
					768: {
						slidesPerView: 3,
						spaceBetween: 30,
					},
					575: {
						slidesPerView: 3,
						spaceBetween: 15,
					},
					425: {
						slidesPerView: 2,
						spaceBetween: 15,
					},
					320: {
						slidesPerView: 1,
						spaceBetween: 15,
					}
				},
				// team slider end				
			});


		},
		formmodal: function () {
		    $('#register').on( "click", function() {
                $('#loginModal').modal('hide');
                $('#exampleModalCenter').modal('show');  
        });
    	    $('#login').on( "click", function() {
               $('#exampleModalCenter').modal('hide');
               $('#loginModal').modal('show');
             
            });	
		},
	};
	Consulting.init();
}(jQuery));
function checkRequire(formId , targetResp){
    targetResp.html('');
    var email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    var url = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
    var image = /\.(jpe?g|gif|png|PNG|JPE?G)$/;
    var mobile = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
    var facebook = /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/;
    var twitter = /^(https?:\/\/)?(www\.)?twitter.com\/[a-zA-Z0-9(\.\?)?]/;
    var google_plus = /^(https?:\/\/)?(www\.)?plus.google.com\/[a-zA-Z0-9(\.\?)?]/;
    var check = 0;
    $('#er_msg').remove();
    var target = (typeof formId == 'object')? $(formId):$('#'+formId);
    target.find('input , textarea , select').each(function(){
        if($(this).hasClass('require')){
            if($(this).val().trim() == ''){
                check = 1;
                $(this).focus();
                $(this).parent('div').addClass('form_error');
                targetResp.html('You missed out some fields.');
                $(this).addClass('error');
                return false;
            }else{
                $(this).removeClass('error');
                $(this).parent('div').removeClass('form_error');
            }
        }
        if($(this).val().trim() != ''){
            var valid = $(this).attr('data-valid');
            if(typeof valid != 'undefined'){
                if(!eval(valid).test($(this).val().trim())){
                    $(this).addClass('error');
                    $(this).focus();
                    check = 1;
                    targetResp.html($(this).attr('data-error'));
                    return false;
                }else{
                    $(this).removeClass('error');
                }
            }
        }
    });
    return check;
}
$(".submitForm").on('click', function() {
    var _this = $(this);
    var targetForm = _this.closest('form');
    var errroTarget = targetForm.find('.response');
    var check = checkRequire(targetForm , errroTarget);
    
    if(check == 0){
       var formDetail = new FormData(targetForm[0]);
        formDetail.append('form_type' , _this.attr('form-type'));
        $.ajax({
            method : 'post',
            url : 'ajaxmail.php',
            data:formDetail,
            cache:false,
            contentType: false,
            processData: false
        }).done(function(resp){
            console.log(resp);
            if(resp == 1){
                targetForm.find('input').val('');
                targetForm.find('textarea').val('');
                errroTarget.html('<p style="color:green;">Mail has been sent successfully.</p>');
            }else{
                errroTarget.html('<p style="color:red;">Something went wrong please try again latter.</p>');
            }
        });
    }
});


