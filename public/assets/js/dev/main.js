/* global $, window, document, scrollReveal */
$.extend({
    hook: function(hookName, parentHookName) {
        var selector;
        if(!hookName || hookName === '*') {
            // select all data-hooks
            selector = '[data-hook]';
        } else {
            // select specific data-hook
            selector = '[data-hook~="' + hookName + '"]';
        }
        if (parentHookName) {
            selector = '[data-hook~="' + parentHookName + '"] ' + selector;
        }

        return $(selector);
    },
    documentHook: function(hookName, eventType, eventFunction, parentHookName) {
        var selector;
        if(!hookName || hookName === '*') {
            // select all data-hooks
            selector = '[data-hook]';
        } else {
            // select specific data-hook
            selector = '[data-hook~="' + hookName + '"]';
        }
        if (parentHookName) {
            selector = '[data-hook~="' + parentHookName + '"] ' + selector;
        }

        $(document).on(eventType, selector, eventFunction);
    }
});

var App = {
    ScrollTo: function(target) {
        if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000);
        }
    }
};

$(function() {
    $.hook('works-button').click(function() {
        App.ScrollTo($.hook('project1'));
    });
    
    window.sr = new scrollReveal({
        reset: false,
        mobile: true,
        vFactor: 0.1
    });
    
    $('.Pinned').scrollToFixed();
    
    $('img[data-src]').unveil(500);
});