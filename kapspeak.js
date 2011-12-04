/**
 * Created at Random Hacks of Kindness 2011 in Portland, Oregon.
 * http://www.rhok.org/problems/kapspeak
 * Date: 12/3/11
 */

"use strict";

var KAPSPEAK = {
    DEBUG: false,
    bind: function (form_selector) {
        jQuery(form_selector).submit(KAPSPEAK.onSubmit);
        jQuery("input[name='category']").click(KAPSPEAK.onCategoryChange);
    },
    speaksubject: function (values) {
        return [values.topic, values.position, values.zip].join('-');
    },

    // compose KAPSpeak subject before submitting
    onSubmit: function (event) {
        var message, subject, values, form=event.target;
        // XXX: Does form.foo to access named input elements
        // work portably?
        values = {
            position: jQuery("input[name='position']:checked").val(),
            topic: jQuery(form.topic).val(),
            zip: jQuery(form.zip).val()
        };
        subject = KAPSPEAK.speaksubject(values);
        jQuery("#kapspeak_subject").val(subject);

        // Requests for service are marked as such in the message
        // body.
        if (KAPSPEAK._isRequestForService()) {
            message = jQuery("#message").val();
            message = "This is a request for services:\n\n" + message;
            jQuery("#message").val(message);
        }

        if (KAPSPEAK.DEBUG) {
            event.preventDefault();
        }
    },

    // Hide/show position chooser based on category.
    onCategoryChange: function (event) {
        var value = jQuery(event.target).val();
        if (value === "req") {
            // requests have a special "position"
            jQuery("#pos_req").prop("checked", true);
            jQuery("#issue_container").hide();
            jQuery("#topic_input").val("RFS:gov");
        } else {
            jQuery("#pos_req").prop("checked", false);
            jQuery("#issue_container").show();
            jQuery("#topic_input").val("");
        }
    },

    _isRequestForService: function () {
        return jQuery("#cat_req").prop("checked");
    }
};

