/* ------------------------------------------------------------------------
    Class: autoClear
    Use: Clears input fields when clicked
    Author: Vincent Ballut
    Version: 1.1
    Dependency: jQuery 1.9.1
------------------------------------------------------------------------- */

(function($) {
    $.fn.autoClear = function() { 
        var elements = $(this);
        elements.each(function() {
            var element = $(this);
            var defaultValue = element.attr('title');

            element.on('focus', function() {
                var value = $(this).val();
                if(defaultValue == value) {
                    $(this).val('');
                }
                $(this).addClass('focus_input');
            });

            element.on('blur', function() {
                var value = $(this).val();
                if(value == '' || value == defaultValue) {
                    $(this).val(defaultValue);
                    $(this).removeClass('modified_input');
                } else {
                    $(this).addClass('modified_input');
                }
                $(this).removeClass('focus_input');
            });
        });
    };
})(jQuery);