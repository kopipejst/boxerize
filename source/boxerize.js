/**
 * Transform DOM element to 3D box - works only in webkit browsers (Safari, Chrome ...)
 *
 * @version 1.0  (04/10/2011)
 * 
 * @author Ivan Lazarevic
 * @link http://workshop.rs
 * @requires jQuery 
 * @param speed 	- length of animation time in miliseconds
 * @param angle 	- final angle of rotation in degrees
 * @param colors 	- array of colors for cube sides [front, top, back, bottom]
 * @param scale 	- final size of box after rotation [1, 1.1, 1.2 ... 2, 2.1 ...]
 * @param floating	- since it's box element we can float [left, right]
 */

(function($) {

	var rotateIndex = 0;

	$.fn.boxerize = $.fn.Boxerize = function(customOptions) {

        var options = {},
            $el = {},
            height = 0,
            width = 0,
            defaults = {
                speed        : 700,
                angle        : 270,
                colors        : ['#F1F1F1', '#F6F6F6', '#F9F9F9', '#E3E3E3'],
                scale         : 1.2,
                floating    : 'left'
            };


        var init;
        init = function(el) {
            options = $.extend({}, defaults, customOptions);
            $el = $(el);
            $(el).css({
                'display': 'block',
                'position': 'absolute'
            });
            height = $el.outerHeight();
            width = $el.outerWidth();
            createHTML();
            rotateIndex++;
        };

        var createHTML = function() {
            var translate = height / 2;

            var top = $el.clone()
                .addClass('rt_top rt_side')
                .css({
                    "-webkit-transform" : "rotateX(90deg) translateZ(" + translate + "px)",
                    "background-color" : options.colors[1]
                });

            var bottom = $el.clone()
                .addClass('rt_bottom rt_side')
                .css({
                    "-webkit-transform" : "rotateX(-90deg) translateZ(" + translate + "px)",
                    "background-color" : options.colors[3]
                });

            var back = $el.clone()
                .addClass('rt_back rt_side')
                .css({
                    "-webkit-transform" : "rotateX(180deg) translateZ(" + translate + "px)",
                    "background-color" : options.colors[2]
                });

            $el.addClass('rt_front rt_side')
                .css({
                    "-webkit-transform" : "rotateY(0deg) translateZ(" + translate + "px)",
                    "background-color" : options.colors[0]
                })
                .wrap("<div class='rt_cube_" + rotateIndex + "' />");

            var prev = $el.parent();
            top.prependTo(prev);
            bottom.prependTo(prev);
            back.prependTo(prev);
            prev.wrap("<div class='rt_container_" + rotateIndex + "' />");

            $('.rt_container_' + rotateIndex).css({
                "height": height,
                "position" : 'relative'
            });
            $('.rt_side').css({ "position": "absolute", "display": "block" });
            $el.css({ "position": "absolute" });
            $('.rt_cube_' + rotateIndex).css({
                "-webkit-transform-style": "preserve-3d",
                "-webkit-transition-property": "all",
                "-webkit-transition-duration": options.speed + "ms",
                "height" : height,
                "width" : width,
                "float" : options.floating
            });

            $('.rt_cube_' + rotateIndex).mouseover(function(e) {
                $(this).css({
                    "-webkit-transform": "rotateX(" + options.angle + "deg) scale3d(" + options.scale + "," + options.scale + "," + options.scale + ")",
                    "position" : "relative"
                });
                $(this).parent().css('z-index', 99001);
            })
                .mouseout(function(e) {
                    $(this).css({
                        "-webkit-transform": "",
                        "position" : "relative"
                    });
                    $(this).parent().css('z-index', 99000);
                });

        };

        var has3d = function() {
            return ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix());
        };

        this.each(
            function() {
                if (has3d()) {
                    init(this);
                }
            }
        )


    }

})(jQuery);