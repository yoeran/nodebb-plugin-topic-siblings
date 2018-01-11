"use strict";

var Categories = module.parent.require('./categories'),
    Plugin = {};

Plugin.onTopicGet = function(data, callback) {
    var config = {
        cid: data.topic.cid,
        uid: data.uid,
        set: 'cid:' + data.topic.cid + ':tids',
        reverse: false,
        start: 0,
        stop: Math.max(0, data.topic.category.topic_count)
    }

    Categories.getCategoryTopics(config, function(err, result) {
        var siblings = result ? result.topics : [];
        data.topic.siblings = siblings.map(function(sibling) {
            if (sibling.tid === data.topic.tid) {
                sibling.is_active = true;
            }

            return sibling;
        });

        callback(err, data);
    });
};

module.exports = Plugin;
