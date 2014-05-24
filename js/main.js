$(function() {
	$('.autoclear').autoClear();
	$('#topnav a').smoothScroll();

	$('form.basic-example').submit(function(){

        var formIsValid = $(this).valideasy();

        if(formIsValid) {
            $(this).find('.alert-success').fadeIn();
        } else {
            $(this).find('.alert-success').fadeOut();
        }

    	return false;
	});

    $('form#hooksexample').submit(function(){
        $(this).valideasy({
            'onValidateAfter': function(form, options, isValid) {
                console.log(form, options, isValid);
                if(isValid) {
                    form.find('.alert-success').fadeIn();
                } else {
                    form.find('.alert-success').fadeOut();
                }
            }
        });

        return false;
    });

    $('form#singlefieldvalidationexample input[type="text"]').on('blur', function() {
            var fieldIsValid =  $(this).valideasy({
                'singleFieldValidation': true
            });
    });

});
