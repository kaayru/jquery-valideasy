/* ------------------------------------------------------------------------
	Class: validateForm
	Use: Checks wether a submitted form is valid.
	Author: Vincent Ballut
	Version: 1.0
	Dependency: jQuery 1.9.1
------------------------------------------------------------------------- */

(function($) {

    validationMethods = ["required", "grouprequired", "integer", "number", "email", "url", "zip", "phone", "lowerthan", "greaterthan"];

    patterns = {
        integer:/^\d+$/,
        date:/^((0?\d)|(1[012]))[\/-]([012]?\d|30|31)[\/-]\d{1,4}$/, 
        email:/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
        usd:/^\$?((\d{1,3}(,\d{3})*)|\d+)(\.(\d{2})?)?$/,            
        url:/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
        number:/^(?=.*\d)(?:[\d \.,]+)$/,
        zip:/^\d{5}(-\d{4})?$/,
        phone:/^((0[0-9]{1})([\-\. ]?))((([0-9]{2})\3){3}([0-9]{2}))$/,
        guid:/^(\{?([0-9a-fA-F]){8}-(([0-9a-fA-F]){4}-){3}([0-9a-fA-F]){12}\}?)$/,
        time12:/^((0?\d)|(1[012])):[0-5]\d?\s?[aApP]\.?[mM]\.?$/,
        time24:/^(20|21|22|23|[01]\d|\d)(([:][0-5]\d){1,2})$/,
        nonHtml:/^[^<>]*$/
    };

    messages = {
        required: "The field {field} is required.",
        grouprequired: "At least one field required.",
        integer: "The field {field} must be numeric.",
        number: "The field {field} must be numeric.",
        email: "Invalid email adress.",
        url: "Invalid URL.",
        phone: "Invalid phone number.",
        lowerthan: "{field1} must be lower than {field2}.",
        greaterthan: "{field1} must be greater than {field2}.",
        zip: "Invalid postcode."
    }

    $.fn.validateForm = function(params) { 
        params = $.extend( {
            // Display mode : single | unified
            // - Single : Each error message will be displayed next to their field.
            // - Unified : Each error message will be displayed at the same place (specified by errorElementId)
            // Defaults to : single
            mode: "single",
            // ID of the element(s) containing the error message
            // Defaults to : "errors"
            errorElementId: "errors",
            // Disable styling of error fields ?
            // Defaults to : false
            disableFieldStyle: false,
            // Stop at first error met ?
            // Defaults to : false
            stepByStep: false,
            // If form has errors, scroll to the first error section ?
            // Defaults to : false
            scrollToFirstError: false
        }, params);

        formElement = $(this);
        formHasError = false;
        activeErrorElements = new Array();
        
        formElement.find("input, select, textarea").each(function() {
            element = $(this);
            defaultValue = element.attr('title');

            errorElement = getErrorElement(params.mode, element, params.errorElementId);
            
            value = element.val();

            for(var i in validationMethods) {
                method = validationMethods[i];

                if(element.hasClass(method)) {
                    
                    if(method == 'required') { 
                    	
                        check = (element.val() == '' || element.val() == defaultValue || element.find('option:selected').text() == defaultValue);
                    
                    } else if(method == 'lowerthan' || method == 'greaterthan') {

                        relatedElement = $('#' + element.attr('data-error-' + method));
                        relatedValue = parseInt(cleanNumber(relatedElement.val()));
                        value = parseInt(cleanNumber(value));
                    	
                        if(relatedElement && relatedElement && patterns['number'].test(relatedValue+value)) {
                            if(method == 'lowerthan') {
                                check = ((value > relatedValue) && value != defaultValue);
                            } else {
                                check = ((value < relatedValue) && value != defaultValue);
                            }
                        }
                    } else if(method == "grouprequired") {
                        elementsRequired = $('[data-error-grouprequired="' + element.attr('data-error-grouprequired') + '"]');
                    	
                        check = true;
                        elementsRequired.each(function() {
                            if(!($(this).val() == '' || $(this).val() == $(this).attr('title') == true)) {
                                check = false;
                                return;
                            }
                    		
                        });
                    } else {
                    	
                        pattern = patterns[method];
                        
                        check = (!pattern.test(value) && value != defaultValue);
                    }

                    if(check) {
                    	
                        if(jQuery.inArray(errorElement, activeErrorElements) <= -1) {
                            setError(params.mode, errorElement, element, method, params.disableFieldStyle);
                            activeErrorElements.push(errorElement.attr('id'));
                        }
                    	
                        formHasError = true;            	
                        
                        if(params.stepByStep) {
                            return false;
                        }
                        break;
                        
                    } else {
                        if(jQuery.inArray(errorElement.attr('id'), activeErrorElements) <= -1)
                            unsetError(params.mode, errorElement, element, params.disableFieldStyle);
                    	
                    }
                }
            }
        });
        
        if(formHasError && params.scrollToFirstError) {            
            $('html,body').animate({
                scrollTop: $('.error-wrapper:visible').first().parents().first().offset().top
            }, 'slow');
        }
        
        return !formHasError;
    };

    /**
     * Add error classes to the field and displays the message.
     */
    function setError(mode, errorElement, element, method, disableFieldStyle) {
        displayErrorMessage(mode, errorElement, element, method);
        if(!disableFieldStyle) {
            element.addClass('error');
        }
        element.bind('focus', function() {
            unsetError(mode, errorElement, element, disableFieldStyle);
        });
    }

    /**
     * Remove error classes and hide messages
     */
    function unsetError(mode, errorElement, element, disableFieldStyle) {
        relatedFields = errorElement.attr('data-error-relatedfields');
    	
        if(relatedFields) {
            relatedFields = relatedFields.replace(' ' + element.attr('id'), '');
            errorElement.attr('data-error-relatedfields', relatedFields);
        }
    	
        if(!relatedFields || relatedFields == '') {
            errorElement.fadeOut();
            errorElement.html('');
        }
    	
        if(!disableFieldStyle) {
            element.removeClass('error');
        }
    }

    function getErrorElement(mode, element, errorElementId) {
        if(element.attr('data-error-fieldid')) {
            errorElement = $('#'+element.attr('data-error-fieldid'));
        } else {
            if(mode == 'single') {
                errorElementId = element.attr('id')+"_"+errorElementId;
            }
            errorElement = $('#'+errorElementId);
        }
        return errorElement;
    }

    function displayErrorMessage(mode, errorElement, element, messageType) {
    	
        if(element.attr('data-error-fieldname')) {
            elementName = element.attr('data-error-fieldname');
        } else {
            elementName = element.attr('title');
        }

        if(element.attr('data-error-message-'+messageType)) {
            message = element.attr('data-error-message-'+messageType);
        } else {
            message = messages[messageType];
            
            if(messageType == 'lowerthan'  || messageType == 'greaterthan') {
                targetElement = $('#' + element.attr('data-error-'+messageType));
                message = message.replace('{field1}', "<span class='fieldname'>"+elementName+"</span>");
                message = message.replace('{field2}', "<span class='fieldname'>"+targetElement.attr('title')+"</span>");
            } else {
                message = message.replace('{field}', "<span class='fieldname'>"+elementName+"</span>");
            }
        }
        
        relatedFields = (errorElement.attr('data-error-relatedfields') != undefined ? errorElement.attr('data-error-relatedfields') : '');
        errorElement.attr('data-error-relatedfields', relatedFields + ' ' + element.attr('id'));
        
        if(errorElement.html() != message) {
            errorElement.fadeIn();
            errorElement.html(message);
        }
    }
    
    function cleanNumber(string) {
        if(string) {
            string.replace('.', '');
            string.replace(',', '');
            string.replace(' ', '');
        }
        return string;
    }

})(jQuery);