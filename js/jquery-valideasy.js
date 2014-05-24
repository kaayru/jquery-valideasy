/* ------------------------------------------------------------------------
    Class: valideasy
    Use: Checks wether a submitted form is valid.
    Author: Vincent Ballut
    Version: 2.2.2
    Dependency: jQuery 1.9.1
------------------------------------------------------------------------- */

(function ($, doc, win) {
    var name = 'valideasy';

    var validationMethods = ["required", "grouprequired", "integer", "number", "email", "url", "zip", "phone", "lowerthan", "greaterthan", "passwordcheck"];

    var patterns = {
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

    var messages = {
        required: "The field {field} is required.",
        grouprequired: "At least one field required.",
        integer: "The field {field} must be numeric.",
        number: "The field {field} must be numeric.",
        email: "Invalid email adress",
        url: "Invalid URL.",
        phone: "Invalid phone number.",
        lowerthan: "{field1} must be lower than {field2}.",
        greaterthan: "{field1} must be greater than {field2}.",
        zip: "Invalid postcode.",
        passwordcheck: "Passwords must be identical."
    }

    function Valideasy(form, opts) {
        this.$form = $(form);

        this.defaults = {
            // Display mode : single | unified
            // - Single : Each error message will be displayed next to their field.
            // - Unified : Each error message will be displayed at the same place (specified by errorElementId)
            // Defaults to : single
            mode: 'single',

            // ID of the element(s) containing the error message
            // Defaults to : "errors"
            errorElementId: 'errors',

            // Disable styling of error fields?
            // Defaults to : false
            disableFieldStyle: false,

            // Stop at first error met?
            // Defaults to : false
            stepByStep: false,

            // Only perform validation checking on one field, instead of on the entire form
            // For this to work, Valideasy must be called on a field element
            singleFieldValidation: false,

            // If form has errors, scroll to the first error section?
            // Defaults to : false
            scrollToFirstError: false,

            // Event triggered before validation
            onValidateBefore: function(form, options) {
                return;
            },

            // Event triggered after validation
            onValidateAfter: function(form, options, isValid) {
                return;
            }
        };

        this.opts = $.extend(this.defaults, opts);
        this.$form.data(name, this);
        this.formHasError = false;
        this.activeErrorElements = new Array();
    };

    Valideasy.prototype.init = function () {
        this.setParams();
        var self = this;

        this.opts.onValidateBefore(this.$form, this.opts);

        if(this.opts.singleFieldValidation == false) {

            this.$form.find("input:not([type=submit]), select, textarea").each(function() {
                var element = new elementBeingValidated($(this), self);

                if(!(self.opts.stepByStep && self.formHasError)) {
                    if(!element.validate()) {
                        self.formHasError = true;
                    }
                }

            });


        } else {
            var element = new elementBeingValidated(self.$form, self);

            if(!element.validate()) {
                self.formHasError = true;
            }
        }

        this.opts.onValidateAfter(this.$form, this.opts, !this.formHasError);

        if(this.formHasError && this.opts.scrollToFirstError) {
            $('html,body').animate({
                scrollTop: this.$form.find('.error-wrapper:visible').first().parents().first().offset().top
            }, 'slow');
        }
        return this;
    };

    Valideasy.prototype.setParams = function() {
        if(this.$form.attr('data-valideasy-mode')) {
            this.opts.mode = this.$form.attr('data-valideasy-mode');
        }

        if(this.$form.attr('data-valideasy-errorelementid')) {
            this.opts.errorElementId = this.$form.attr('data-valideasy-errorelementid');
        }

        if(this.$form.attr('data-valideasy-disablefieldstyle')) {
            this.opts.disableFieldStyle = this.$form.attr('data-valideasy-disablefieldstyle');
        }

        if(this.$form.attr('data-valideasy-stepbystep')) {
            this.opts.stepByStep = this.$form.attr('data-valideasy-stepbystep');
        }

        if(this.$form.attr('data-valideasy-scrolltofirsterror')) {
            this.opts.scrollToFirstError = this.$form.attr('data-valideasy-scrolltofirsterror');
        }

        if(this.$form.attr('data-valideasy-singlefieldvalidation')) {
            this.opts.singleFieldValidation = this.$form.attr('data-valideasy-singlefieldvalidation');
        }

        return this;
    };

    Valideasy.prototype.isValid = function() {
        return !this.formHasError;
    }


    function elementBeingValidated(element, valideasy) {

        this.$el = element;
        this.valideasy = valideasy;
        this.$form = valideasy.$form;
        this.opts = valideasy.opts;

        this.defaultValue = this.$el.attr('title');
        this.value = this.$el.val();
        this.errorElement = this.getErrorElement();
        this.method = '';
    }

    elementBeingValidated.prototype.getErrorElement = function () {
        if(this.$el.attr('data-error-fieldid')) {
            errorElement = $('#' + this.$el.attr('data-error-fieldid'));
        } else {
            if(this.opts.mode == 'single') {
                errorElement = $('#' + this.$el.attr('id')+"_"+this.opts.errorElementId);
            } else {
                errorElement = $('#' + this.opts.errorElementId);
            }
        }

        return errorElement;
    };

    elementBeingValidated.prototype.validate = function() {

        var check = true;

        for(var i in validationMethods) {
            this.method = validationMethods[i];

            if(this.$el.hasClass(this.method)) {

                if(this.method == 'required') {

                    check = (this.$el.val() == '' || this.$el.val() == this.defaultValue || this.$el.find('option:selected').text() == this.defaultValue || (this.$el.attr('type') == 'checkbox' && !this.$el.is(':checked')));

                } else if(this.method == 'lowerthan' || this.method == 'greaterthan') {

                    var relatedElement = $('#' + this.$el.attr('data-error-' + this.method));
                    var relatedValue = parseInt(cleanNumber(relatedElement.val()));
                    this.value = parseInt(cleanNumber(this.value));

                    if(relatedElement && patterns['number'].test(relatedValue+this.value) && this.value != this.defaultValue) {
                        if(this.method == 'lowerthan') {
                            check = (this.value > relatedValue);
                        } else {
                            check = (this.value < relatedValue);
                        }
                    } else {
                        check = false;
                    }
                } else if(this.method == 'passwordcheck') {

                    var relatedElement = $('#' + this.$el.attr('data-error-' + this.method));
                    var relatedValue = relatedElement.val();


                    if(relatedElement && this.value != this.defaultValue) {
                        check = !(this.value == relatedValue);
                    } else {
                        check = false;
                    }

                } else if(this.method == "grouprequired") {
                    var elementsRequired = $('[data-error-grouprequired="' + this.$el.attr('data-error-grouprequired') + '"]');

                    elementsRequired.each(function() {
                        if(!($(this).val() == '' || $(this).val() == $(this).attr('title') == true)) {
                            check = false;
                            return;
                        }

                    });
                } else {

                    pattern = patterns[this.method];
                    check = (!pattern.test(this.value) && this.value != this.defaultValue && this.value != '');
                }

                if(check) {

                    if(jQuery.inArray(this.errorElement, this.valideasy.activeErrorElements) <= -1) {
                        this.setError();
                        this.valideasy.activeErrorElements.push(this.errorElement.attr('id'));
                    }

                    return false;

                } else {

                    if(jQuery.inArray(this.errorElement.attr('id'), this.valideasy.activeErrorElements) <= -1) {
                        this.unsetError();
                    }

                }
            }

        }

        return true;
    }

    /**
     * Add error classes to the field and displays the message.
     */
    elementBeingValidated.prototype.setError = function() {
        var self = this;
        this.displayErrorMessage();
        if(!this.opts.disableFieldStyle) {
            this.$el.addClass('error');
        }
        this.$el.bind('focus change', function() {
            self.unsetError();
        });
    }

    /**
     * Remove error classes and hide messages
     */
    elementBeingValidated.prototype.unsetError = function() {
        var relatedFields = this.errorElement.attr('data-error-relatedfields');

        if(relatedFields) {
            relatedFields = relatedFields.replace(' ' + this.$el.attr('id'), '');
            this.errorElement.attr('data-error-relatedfields', relatedFields);
        }

        if(!relatedFields || relatedFields == '') {
            this.errorElement.fadeOut();
            this.errorElement.html('');
        }

        if(!this.opts.disableFieldStyle) {
            this.$el.removeClass('error');
        }
    }

    elementBeingValidated.prototype.displayErrorMessage = function() {

        if(this.$el.attr('data-error-fieldname')) {
            elementName = this.$el.attr('data-error-fieldname');
        } else {
            elementName = this.$el.attr('title');
        }

        if(this.$el.attr('data-error-message-'+this.method)) {
            message = this.$el.attr('data-error-message-'+this.method);
        } else {
            message = messages[this.method];

            if(this.method == 'lowerthan'  || this.method == 'greaterthan') {
                targetElement = $('#' + this.$el.attr('data-error-'+this.method));
                message = message.replace('{field1}', "<span class='fieldname'>"+elementName+"</span>");
                message = message.replace('{field2}', "<span class='fieldname'>"+targetElement.attr('title')+"</span>");
            } else {
                message = message.replace('{field}', "<span class='fieldname'>"+elementName+"</span>");
            }
        }

        relatedFields = (this.errorElement.attr('data-error-relatedfields') != undefined ? this.errorElement.attr('data-error-relatedfields') : '');
        this.errorElement.attr('data-error-relatedfields', relatedFields + ' ' + this.$el.attr('id'));

        if(this.errorElement.html() == '') {
            this.errorElement.fadeIn();
            this.errorElement.html(message);
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

    $.fn.valideasy = function (opts) {
        var valideasy = new Valideasy(this, opts);
        valideasy.init();

        return valideasy.isValid();
    }

})(jQuery, document, window);