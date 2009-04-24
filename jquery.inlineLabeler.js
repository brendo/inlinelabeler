/*  -------------------------------------------------------------------
**  inlineLabeler
**  -------------------------------------------------------------------
**  @ver            0.1
**  @author       Brendan Abbott (brendan@bloodbone.ws)
**  -------------------------------------------------------------------
**  Inserts a chosen selector as the default value of an input
**  element. The value hides on focus and if no text is entered,
**  reappears on blur. By default the value is pulled from the
**  corresponding input label using the for attribute. The label
**  is then hidden.
**  -------------------------------------------------------------------
**  Example Use
**  -------------------------------------------------------------------
**  $('input.name).inlineLabeler();
**
**  $('input.name).inlineLabeler({
**      hideLabel: false,
**      labelSelector: 'legend'
**   });
**  -------------------------------------------------------------------
**  Settings
**  -------------------------------------------------------------------
**  hideLabel
**  @default    true
**  @param      bool
**
**  labelSelector
**  @default    $(this).parent()
**                            .find('label[for=' + $(this).attr('id') + ']')
**  @param      selector
**  -------------------------------------------------------------------
*/

(function($) {
    $.fn.inlineLabeler = function(options) {

            var defaults = {
                hideLabel : true,
                dimInlineLabel : false,
                labelSelector : $(this).parent()
                                              .find('label[for=' + $(this).attr('id') + ']')
            };

            var settings = $.extend({}, defaults, options);

            return this.each(function() {

                var self = {};
                var obj = $(this);

                self.getLabel = function() {
                    return settings.labelSelector;
                }

                self.insert = function() {
                    obj.val(self.getLabel().text());
                }

                self.hide = function() {
                    self.getLabel().hide();
                }

                self.focus = obj.focus(function() {
                    obj.val('');
                });

                self.blur = obj.blur(function() {
                    if(obj.val() == '') {
                        self.insert();
                    }
                });

                self.insert();

                if(settings.hideLabel) {
                    self.hide();
                }

            });
    };
})(jQuery);