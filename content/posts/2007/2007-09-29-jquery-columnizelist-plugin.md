---
date: "2007-09-29T13:40:00+00:00"
draft: false
tags: ["development", "colophon", "javascript"]
title: "JQuery columnizeList Plugin"
---
I've spent a rainy german saturday hacking away on my dusty ol'
website. Because of the current layout without sidebars, I had to
find an unobtrusive place for meta-information like tags or
archive-links. Those chunks of information can grow quite large, so
i decided to expand into length rather than height and go
multi-column for longer lists. Before I fully understood the stony
way that lay before me, I've found an
[article](http://www.alistapart.com/articles/multicolumnlists) on
"A List Apart"-magazine outlining different ways to tackle this
problem. Because of lacking support for
[true multi-columns](http://www.w3.org/TR/css3-multicol/) we have
to resort to some slightly hacky CSS, either floating or applying
negative margins.

My solution works with negative margins, but automatically applied
through a [JQuery](http://www.jquery.com)-plugin (see
[example](#demolist-example) below). It seems to be rather stable
across browsers, but has the usual quirks of using CSS for
something its not intended to perform - make sure to
[read about the CSS-limitations](http://www.alistapart.com/articles/multicolumnlists)
of this method over at "A List Apart". By the way, you can see this
plugin in action through the "archive"-area at the top of this
website

#### Features

-   Styling of ordered/unordered lists
-   Configurable column-count and width
-   Resize-friendly em-based sizing
-   Easy restoring to "non-column" layout
-   Automatic adjustment on DOM-modification of the list (Firefox
    only)
-   Requirements: JQuery 1.2
    ([download](http://docs.jquery.com/Downloading_jQuery))
-   Browser-Compatibility: Firefox 1.5+, IE6+, Safari 2

#### Usage

Just apply to any group of DOM-elements gathered by the amazing
JQuery-selectors. The provided arguments are optional (these are
the default values).

    $('#demolist').columnizeList({cols:3,width:13,unit:'em'});

#### Example

-   [float](#) / [unfloat](#) (Lame! List-ordering is messed up)
-   [columnizeList()](#) / [uncolumnizeList()](#) (The real deal)

1.  harold (3550)
2.  horatio (1320)
3.  hitler (1120)
4.  henry (784)
5.  hector (358)
6.  haploid (315)
7.  hopping (50)
8.  herbert mulroney (44)
9.  hopscotching (29)
10. hominibus (19)
11. honkey (19)
12. hermoine (18)
13. hieronymus (13)
14. halliburton (12)
15. hummer (10)
16. harlod (10)
17. heironymious (9)
18. hemorrhoids (7)
19. hammersack (6)

Just in case you're wondering: The demo-list consists of the most
common fillers for the phrase
["Jesus H Christ"](http://tenser.typepad.com/tenser_said_the_tensor/2007/01/what_does_the_h.html)
;-)

#### Sourcecode

    /**
     * Copyright (c) 2007 Ingo Schommer (www.chillu.com)
     * Licensed under the MIT License:
     * http://www.opensource.org/licenses/mit-license.php
     * 
     * Splits a /-list into equal-sized columns.
     * 
     * Requirements: 
     * 
     * All list-elements need to have the same height.
     * List has to be blocklevel
     * 
     * 
     * Caution: margin-top/margin-left on  are overridden.
     * Doesn't react to changes to the DOM, you need to call the function
     * manually afterwards.
     * 
     * @see http://www.alistapart.com/articles/multicolumnlists
     */
    jQuery.fn.columnizeList = function(settings){
        settings = jQuery.extend({
            cols: 3,
            width: '13',
            unit: 'em'
        }, settings);
        
        var prevColNum = 0;
        var size = $('li',this).size();
        var computedColHeight = 0;
        var baseFontSize = parseFloat($(this).css('font-size'));
        $('li',this).each(function(i) {
            var currentColNum = Math.floor(((i)/size) * settings.cols);
            $(this).css('margin-left',(currentColNum*settings.width)+''+settings.unit);
            if(prevColNum != currentColNum) {
                $(this).css('margin-top','-'+(computedColHeight/baseFontSize)+'em');
                computedColHeight = $(this).height();
            } else {
                $(this).css('margin-top','0');
                computedColHeight += $(this).height();
            }
            prevColNum = currentColNum;
        });
    
        this.css('height',(size/settings.cols)*(parseFloat($('li:first',this).height())/baseFontSize)+'em');
        this.after('');
        
        var onchange = function(e) {
            if(!e.originalTarget || e.originalTarget.tagName != 'LI') return true;
            var scope = this; // caution: closure
            setTimeout(function() {$(scope).columnizeList(settings);}, 50);
        };
        
        this.one('DOMNodeInserted',onchange);
        this.one('DOMNodeRemoved',onchange);
        
        return this;
    };
    
    jQuery.fn.uncolumnizeList = function(){
        $('li',this).each(function(i) {
            if(!$(this).attr('style')) return;
            $(this).attr('style', 
                $(this).attr('style')
                .replace(/margin\-left[^,]*/g,'')
                .replace(/margin\-top[^,]*/g,'')
            );
        });
        $('ul',this).each(function(i) {
            if(!$(this).attr('style')) return;
            $(this).attr('style', 
                $(this).attr('style')
                .replace(/[^-]height[^,]*/g,'')
            );
        });
        $(this).height('auto');
        this.unbind('DOMNodeInserted');
        this.unbind('DOMNodeRemoved');
        
        return this;
    }



