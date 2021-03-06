/**
 * Galleria United Theme 2013-08-06  Jason Howard
 
 */

(function($) {

/*global jQuery, Galleria */

Galleria.addTheme({
    name: 'United',
    author: 'pergle and jason',
    css: 'galleria.united.css',
    defaults: {
        transition: 'slide',
        //thumbCrop:  'width',
        _my_color: '#eeeee',

        // set this to false if you want to show the caption all the time:
        _toggleInfo: false,
        
        // prevent images from stretching. set to undefined to allow scaling
       // max_scale_ratio: 1 ,
        
        //keep arrows on 
        //idleMode: false,
        
        //
       
       
    },
           
    
    init: function(options) {

        Galleria.requires(1.28, 'This version of United theme requires Galleria 1.2.8 or later');
        
        // set the container's background to the theme-specific _my_color option:
        //this.$('container').css('background-color', options._my_color);

        // add some elements
        this.addElement('info-link','info-close');
        this.append({
            'info' : ['info-link','info-close']
        });

        // cache some stuff
        var info = this.$('info-link,info-close,info-text'),
            touch = Galleria.TOUCH,
            click = touch ? 'touchstart' : 'click';

        // show loader & counter with opacity
        this.$('loader,counter').show().css('opacity', 0.4);

        // some stuff for non-touch browsers
        if (! touch ) {
            this.addIdleState( this.get('image-nav-left'), { left:-50 });
            this.addIdleState( this.get('image-nav-right'), { right:-50 });
            this.addIdleState( this.get('counter'), { opacity:0 });
        }

        // toggle info
        if ( options._toggleInfo === true ) {
            info.bind( click, function() {
                info.toggle();
            });
        } else {
            info.show();
            this.$('info-link, info-close').hide();
        }

        // bind some stuff
        this.bind('thumbnail', function(e) {

            if (! touch ) {
                // fade thumbnails
                $(e.thumbTarget).css('opacity', 0.6).parent().hover(function() {
                    $(this).not('.active').children().stop().fadeTo(100, 1);
                }, function() {
                    $(this).not('.active').children().stop().fadeTo(400, 0.6);
                });

                if ( e.index === this.getIndex() ) {
                    $(e.thumbTarget).css('opacity',1);
                }
            } else {
                $(e.thumbTarget).css('opacity', this.getIndex() ? 1 : 0.6);
            }
        });

        this.bind('loadstart', function(e) {
            if (!e.cached) {
                this.$('loader').show().fadeTo(200, 0.4);
            }

            this.$('info').toggle( this.hasInfo() );

            $(e.thumbTarget).css('opacity',1).parent().siblings().children().css('opacity', 0.6);
        });

        this.bind('loadfinish', function(e) {
            this.$('loader').fadeOut(200);
        });
    }
    
    
});





}(jQuery));