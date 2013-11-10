$(function() {
	$('.autoclear').autoClear();
	$('#topnav a').smoothScroll();

	$('form').submit(function(){
    	var formIsValid = $(this).valideasy();

    	if(formIsValid) {
    		$(this).find('.alert-success').fadeIn();
    	} else {
    		$(this).find('.alert-success').fadeOut();
    	}
    	return false;
	});
})
