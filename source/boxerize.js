/**
 * Transform DOM element to 3D box - works only in webkit browsers (Safari, Chrome ...)
 *
 * @version 1.0  (04/10/2011)
 *
 * @author Ivan Lazarevic
 * @link http://workshop.rs
 * @requires jQuery
 * @param speed     - length of animation time in miliseconds
 * @param angle     - final angle of rotation in degrees
 * @param colors    - array of colors for cube sides [front, bottom, back, top]
 * @param scale     - final size of box after rotation [1, 1.1, 1.2 ... 2, 2.1 ...]
 * @param floating  - since it's box element we can float [left, right]
 */

(function($) {

	var rotateIndex = 0;

	$.fn.boxerize = $.fn.Boxerize = function(customOptions) {

        var options = {},
            $el = {},
            height = 0,
            width = 0,
            defaults = {
                speed       : 700,
                angle       : 270,
                colors      : ['#000000', '#0099FF'],
                scale       : 1.2,
                floating    : 'left'
            };


        /**
         * Inititalize boxerize
         * @param el
         */
        var init = function(el) {

            options = $.extend({}, defaults, customOptions);

            if(options.colors.length == 2){
                gradient();
            }

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

        /**
         * Create other sides of cube from initial element and wrapper around it
         */
        var createHTML = function() {
            var translate = height / 2;

            var top = $el.clone()
                .addClass('rt_top rt_side')
                .css({
                    "-webkit-transform" : "rotateX(90deg) translateZ(" + translate + "px)",
                    "transform" : "rotateX(90deg) translateZ(" + translate + "px)",
                    "background-color" : options.colors[3]
                });

            var bottom = $el.clone()
                .addClass('rt_bottom rt_side')
                .css({
                    "-webkit-transform" : "rotateX(-90deg) translateZ(" + translate + "px)",
                    "transform" : "rotateX(-90deg) translateZ(" + translate + "px)",
                    "background-color" : options.colors[1]
                });

            var back = $el.clone()
                .addClass('rt_back rt_side')
                .css({
                    "-webkit-transform" : "rotateX(180deg) translateZ(" + translate + "px)",
                    "transform" : "rotateX(180deg) translateZ(" + translate + "px)",
                    "background-color" : options.colors[2]
                });

            $el.addClass('rt_front rt_side')
                .css({
                    "-webkit-transform" : "rotateY(0deg) translateZ(" + translate + "px)",
                    "transform" : "rotateY(0deg) translateZ(" + translate + "px)",
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
                "transform-style": "preserve-3d",
                "-webkit-transition-property": "all",
                "transition-property": "all",
                "-webkit-transition-duration": options.speed + "ms",
                "transition-duration": options.speed + "ms",
                "height" : height,
                "width" : width,
                "float" : options.floating
            });

            $('.rt_cube_' + rotateIndex).mouseover(function(e) {
                $(this).parent().css('z-index', 99001);
                $(this).css({
                    "-webkit-transform": "rotateX(" + options.angle + "deg) scale3d(" + options.scale + "," + options.scale + "," + options.scale + ")",
                    "transform": "rotateX(" + options.angle + "deg) scale3d(" + options.scale + "," + options.scale + "," + options.scale + ")",
                    "position" : "relative"
                });
                
            })
                .mouseout(function(e) {
                    $(this).css({
                        "-webkit-transform": "",
                        "transform": "",
                        "position" : "relative"
                    });
                    $(this).parent().css('z-index', 99000);
                });

        };

        /**
         * Create gradient colors for each side based on start and end color
         */
        var gradient = function(){
            var r = 0,
                g = 0,
                b = 0,
                sr = 0,
                sg = 0,
                sb = 0,
                er = 0,
                eg = 0,
                eb = 0,
                sc = options.colors[0].replace('#',''),
                ec = options.colors[1].replace('#',''),
                colors = [];

		        r = sr = parseInt(sc.substring(0,2),16);
		        g = sg = parseInt(sc.substring(2,4),16);
		        b = sb = parseInt(sc.substring(4,6),16);

		        er = parseInt(ec.substring(0,2),16);
		        eg = parseInt(ec.substring(2,4),16);
		        eb = parseInt(ec.substring(4,6),16);

                colors[0] = 'rgb('+r+','+g+','+b+')';
                for(var i=1; i<4; i++){
			        r -= parseInt((sr - er) / 3);
			        g -= parseInt((sg - eg) / 3);
			        b -= parseInt((sb - eb) / 3);
                    colors[i] = 'rgb('+r+','+g+','+b+')';
                }

            options.colors = colors;
            
        };


        /**
         * If browser supports 3d transform apply boxerize
         */
        this.each(
            function() {
                init(this);
            }
        );


    };

})(jQuery);
