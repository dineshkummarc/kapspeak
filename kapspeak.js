/**
 * Created at Random Hacks of Kindness 2011 in Portland, Oregon.
 * Date: 12/3/11
 */

"use strict";

var KAPSPEAK = {
    // DEBUG: true,
    bind: function (form_selector) {
        jQuery(form_selector).submit(KAPSPEAK.onSubmit);
    },
    speaksubject: function (values) {
        return [values.topic, values.position, values.zip].join('-');
    },
    onSubmit: function (event) {
        var subject, values, form=event.target;
        values = {
            position: jQuery(form.position).val(),
            topic: jQuery(form.topic).val(),
            zip: jQuery(form.zip).val()
        };
        subject = KAPSPEAK.speaksubject(values);
        console.log("subject is:" + subject);
        jQuery("#kapspeak_subject").val(subject);
        if (KAPSPEAK.DEBUG) {
            event.preventDefault();
        }
    }
};

