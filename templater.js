(function() {
    var templates = function(templateName) {
        if (templates.prototype.cache[templateName]) {
            return templates.prototype.cache[templateName];
        }
        var template = $('#' + templateName + '-template').tmpl();
        templates.prototype.cache[templateName] = template;
        return template;
    },
        getData = function (data, prop) {
            var propSplit = prop.prop.split('.');
            var temp = data;

            for (var i = 0, len = propSplit.length; i < len; i++) {
                if (temp.hasOwnProperty(propSplit[i])) {
                    temp = temp[propSplit[i]];
                } else {
                    return '';
                }
            }

            return typeof temp === 'undefined' || temp === null ? '' : temp.toString();
        },
        isDuplicate = function (arr, val) {
            var i, len;
            for (i = 0, len = arr.length; i < len; i++) {
                if (arr[i].prop === val) {
                    return true;
                }
            }
            return false;
        };
    
    templates.prototype.cache = {};

    $.fn.extend({
        tmpl: function() {
            var templateText = this.html();

            if (typeof templateText === 'undefined') {
                return function () {
                    return $();
                };
            }

            var matches = templateText.match(/{[\w\d.]+}/g),
                props = [], i, len, prop,
                ret = function(data) {
                    var returnText = templateText;
                    for (i = 0, len = props.length; i < len; i++) {
                        prop = props[i];
                        returnText = returnText.replace(prop.regex, getData(data, prop), 'g');
                    }
                    returnText = returnText.replace('\r', '').replace('\n', '');
                    returnText = $.trim(returnText);
                    return $(returnText);
                };
            
            if (matches && matches.length > 0) {
                for (i = 0, len = matches.length; i < len; i++) {
                    prop = matches[i].replace('{', '').replace('}', '');
                    if (!isDuplicate(props, prop)) {
                        props.push({ prop: prop, regex: new RegExp(matches[i], 'g') });
                    }
                }
            }

            return ret;
        }
    });

    $.templates = templates;
})();
