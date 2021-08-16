//Random Hover Direction

$.hoverPath = function (options, element) {
    this.$el = $(element);
    this._init(options);
};
$.hoverPath.defaults = {
    hoverDelay: 0,
    reverse: false
};
$.hoverPath.prototype = {
    _init: function (options) {
        this.options = $.extend(true, {}, $.hoverPath.defaults, options);
        this._loadEvents();
    },
    _loadEvents: function () {
        var _self = this;
        this.$el.on('mouseenter.hoverPath, mouseleave.hoverPath', function (event) {
            var $el = $(this),
                evType = event.type,
                $hoverElem = $el.find('div'),
                direction = _self._getDir($el, {
                    x: event.pageX,
                    y: event.pageY
                }),
                hoverClasses = _self._getClasses(direction);
            $hoverElem.removeClass();
            if (evType === 'mouseenter') {
                $hoverElem.hide().addClass(hoverClasses.from);
                clearTimeout(_self.tmhover);
                _self.tmhover = setTimeout(function () {
                    $hoverElem.show(0, function () {
                        $(this).addClass('random_info').addClass(hoverClasses.to);
                    });
                }, _self.options.hoverDelay);
            } else {
                $hoverElem.addClass('random_info');
                clearTimeout(_self.tmhover);
                $hoverElem.addClass(hoverClasses.from);
            }
        });
    },
    _getDir: function ($el, coordinates) {
        var w = $el.width(),
            h = $el.height(),
            x = (coordinates.x - $el.offset().left - (w / 2)) * (w > h ? (h / w) : 1),
            y = (coordinates.y - $el.offset().top - (h / 2)) * (h > w ? (w / h) : 1),
            direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
        return direction;
    },
    _getClasses: function (direction) {
        var fromClass, toClass;
        switch (direction) {
        case 0:
            (!this.options.reverse) ? fromClass = 'slideFromTop' : fromClass = 'slideFromBottom';
            toClass = 'slideTop';
            break;
        case 1:
            (!this.options.reverse) ? fromClass = 'slideFromRight' : fromClass = 'slideFromLeft';
            toClass = 'slideLeft';
            break;
        case 2:
            (!this.options.reverse) ? fromClass = 'slideFromBottom' : fromClass = 'slideFromTop';
            toClass = 'slideTop';
            break;
        case 3:
            (!this.options.reverse) ? fromClass = 'slideFromLeft' : fromClass = 'slideFromRight';
            toClass = 'slideLeft';
            break;
        };
        return {
            from: fromClass,
            to: toClass
        };
    }
};
var logError = function (message) {
    if (this.console) {
        console.error(message);
    }
};
$.fn.hoverPath = function (options) {
    if (typeof options === 'string') {
        var args = Array.prototype.slice.call(arguments, 1);
        this.each(function () {
            var instance = $.data(this, 'hoverPath');
            if (!instance) {
                logError("cannot call methods on hoverPath prior to initialization; " +
                    "attempted to call method '" + options + "'");
                return;
            }
            if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
                logError("no such method '" + options + "' for hoverPath instance");
                return;
            }
            instance[options].apply(instance, args);
        });
    } else {
        this.each(function () {
            var instance = $.data(this, 'hoverPath');
            if (!instance) {
                $.data(this, 'hoverPath', new $.hoverPath(options, this));
            }
        });
    }
    return this;
};