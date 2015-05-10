(function ($) {

    //var me - this;

    function SlideBoard(slides) {
        var _slideboard = this;
        var isVisible = false;
        var bodyContentCopy = undefined;
        var currentlyDisplayingSlide = -1;

        var dialog = jQuery('<div/>', {
            id: 'slideshow-dialog'
            //style: "margin: 10px"
            //style: "position: absolute;background-color: white;z-index: 1000;width: 100%;height: 100%;"
        });

        var header = jQuery('<div/>', {
            id: 'slideshow-header'
        });
        header.appendTo(dialog);

        var prev = jQuery('<a/>', {
            id: 'slideshow-prev',
            text: '<',
            click: function () {
                _slideboard.prevSlide();
            }
        });
        prev.appendTo(header);

        var title = jQuery('<span/>', {
            id: 'slideshow-title'
        });
        title.appendTo(header);


        var next = jQuery('<a/>', {
            id: 'slideshow-next',
            text: '>',
            click: function () {
                _slideboard.nextSlide();
            }
        });
        next.appendTo(header);

        var next = jQuery('<a/>', {
            id: 'slideshow-close',
            text: 'x',
            click: function () {
                _slideboard.close();
            }
        });
        next.appendTo(header);


        var content = jQuery('<div/>', {
            id: 'slideshow-content',
            class: 'markdown-body'
        });
        content.appendTo(dialog);


        this.show = function () {
            if (isVisible) {
                return;
            }
            var bodyContent = $('body > *');
            bodyContentCopy = bodyContent.clone();
            bodyContent.remove();

            dialog.prependTo('body');
            isVisible = true;
        };

        this.close = function () {
            if (!isVisible) {
                return;
            }
            var bodyContent = $('body > *');
            bodyContent.remove();
            bodyContentCopy.prependTo('body');
            isVisible = false;
            removeSlideshowHash();
        };

        var showSlide = function (slide) {
            content.empty();
            title.text(slide.header);
            $(slide.content).each(function (index, elem) {
                $(elem).clone().appendTo(content);
            });
            window.scrollTo(0, 0);


        };

        this.prevSlide = function () {
            var prevIndex = currentlyDisplayingSlide - 1;
            if (prevIndex >= 0) {
                this.displaySlide(prevIndex);
            }
        };

        this.nextSlide = function () {
            var nextIndex = currentlyDisplayingSlide + 1;
            if (nextIndex <= slides.length - 1) {
                this.displaySlide(nextIndex);
            }
        };

        this.displaySlide = function (slideIndex) {
            showSlide(slides[slideIndex]);
            currentlyDisplayingSlide = slideIndex;
            setSlideshowNumberToHash(slideIndex);
        };

        var bindKeys = function () {
            $(document).keydown(function (e) {
                switch (e.which) {
                    case 37: // left
                        _slideboard.prevSlide();
                        break;
                    case 39: // right
                        _slideboard.nextSlide();
                        break;
                    case 27: // right
                        _slideboard.close();
                        break;

                    default:
                        return; // exit this handler for other keys
                }
                e.preventDefault(); // prevent the default action (scroll / move caret)

            });
        };

        var setSlideshowNumberToHash = function (slide) {
            window.location.hash = '#_slide=' + slide;
        };

        var removeSlideshowHash = function () {
            window.location.hash = '';
        };

        bindKeys();
    }

    function SlidesHierarchy() {
        this.slides = [];
        this.addNewSlide = function (slide) {
            this.slides.push(slide);
        };
        this.addContentToCurrentSlide = function (newContent) {
            this.slides[this.slides.length - 1].addContent(newContent);
        };
    }

    function Slide(header, level) {
        this.header = header;
        this.level = level;
        this.content = [];
        this.addContent = function (elem) {
            this.content.push(elem);
        }

    }


    function buildTitleSlide(hierarchy) {
        hierarchy.addNewSlide(new Slide('', 1));
        var titleSlideContent = $('#page-title').text();

        hierarchy.addContentToCurrentSlide("<p class='slide-title'>" + titleSlideContent + "</p>");
    }

    function extractSlidesFromContent(mainArticle, hierarchy) {
        $(mainArticle).each(function (index, elem) {
            var headerTagExtraction = elem.tagName.match(/H(\d*)/);
            var isHeader = headerTagExtraction != null;
            if (isHeader) {
                var headerLevel = headerTagExtraction[1];
                hierarchy.addNewSlide(new Slide(elem.textContent, headerLevel));
            } else {
                hierarchy.addContentToCurrentSlide(elem);
            }
        });
    }

    function buildTOCSlide(hierarchy) {

        var mainArticle = $("#TOC > *");
        extractSlidesFromContent(mainArticle, hierarchy);
    }

    function buildSlidesFromMainArticle(hierarchy) {
        var mainArticle = $("#article-body > *");
        extractSlidesFromContent(mainArticle, hierarchy);
    }

    function buildHierarchy() {
        var hierarchy = new SlidesHierarchy();

        buildTitleSlide(hierarchy);
        buildTOCSlide(hierarchy);
        buildSlidesFromMainArticle(hierarchy);
        return hierarchy;
    }

    $.fn.slideshow = function (options) {
        var defaults = {
            slide: 0
        };
        var options = $.extend(defaults, options);

        var slideHierarchy = buildHierarchy();

        var slideshowBoard = new SlideBoard(slideHierarchy.slides);
        slideshowBoard.show();

        slideshowBoard.displaySlide(options.slide);

    };
})(jQuery);