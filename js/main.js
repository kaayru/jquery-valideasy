$(function() {
	$('.autoclear').autoClear();
	$('#topnav a').smoothScroll();

	$('form').submit(function(){
        if($(this).attr('id') == 'hooksexample') {
            $(this).valideasy({
                'onValidateAfter': function(form, options, isValid) {
                    if(isValid) {
                        form.find('.alert-success').fadeIn();
                    } else {
                        form.find('.alert-success').fadeOut();
                    }
                }
            });
        } else {
            var formIsValid = $(this).valideasy();

            if(formIsValid) {
                $(this).find('.alert-success').fadeIn();
            } else {
                $(this).find('.alert-success').fadeOut();
            }
        }
    	

    	
    	return false;
	});
})
