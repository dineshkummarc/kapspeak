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
        var subject, values, form=event.target;
        // XXX: Does form.foo to access named input elements
        // work portably?
        values = {
            position: jQuery("input[name='position']:checked").val(),
            topic: jQuery(form.topic).val(),
            zip: jQuery(form.zip).val()
        };
        subject = KAPSPEAK.speaksubject(values);
        jQuery("#kapspeak_subject").val(subject);
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
            jQuery("#position_container").hide();
        } else {
            jQuery("#pos_req").prop("checked", false);
            jQuery("#position_container").show();
        }
    }
};

