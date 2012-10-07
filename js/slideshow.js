var Slideshow = new function() {
		var timer = null,
			index = 0,
			wrapper = $('#slideshow-wrapper', '#slideshow'),
			slides = $('div.slide', wrapper),
			thumbs = $('a', '#slideshow-thumbs'),
			previous = $('#previous', '#slideshow'),
			next = $('#next', '#slideshow'),
			cursor = $('#slideshow-cursor', '#slideshow-thumbs');
		var getZindex = function() {
				var zIndex = 11;
				slides.each(function() {
					zIndex--;
					$(this).css('zIndex', zIndex);
				});
			};
		var prepare = function() {
				cursor.css('opacity', 0.8);
				$('div.notice', 'div.slide').not(':first').find('h4, p').hide();
				$('img', 'div.slide-right').css('position', 'absolute');
				getZindex();
				slides.not(':first').hide();
			};
		var reset = function() {
				$('div.notice', 'div.slide').find('h4, p').hide();
				$('div.slide-right').find('img').css({
					top: 0,
					left: 0
				});
				$('div.slide-left').find('img').css('top', 40).show();
				slides.hide();
			};
		var animateSlide = function(slide, dir) {
				$('h4', slide).fadeIn(1000);
				$('p', slide).fadeIn(1000);
				if (dir == 'left') {
					$('img', slide).eq(0).animate({
						top: 20
					}, 1000, function() {
						$(this).fadeOut(1000);
					});
					$('img', slide).eq(1).animate({
						top: 430,
						left: 790
					}, 1000);
				} else {
					$('img', slide).eq(1).animate({
						top: 430,
						left: 790
					}, 1000);
					$('img', slide).eq(0).animate({
						top: 20
					}, 1000, function() {
						$(this).fadeOut(1000);
					});
				}
			};
		var positionCursor = function(element) {
				cursor.css('display', 'block').animate({
					left: element.position().left + 3
				}, 1000);
			};
		var autoSlide = function() {
				timer = setInterval(function() {
					index++;
					if (index == slides.length) {
						index = 0;
						reset();
					}
					slides.eq(index + 1).hide();
					slides.eq(index).show().siblings().hide();
					positionCursor(thumbs.eq(index));
					animateSlide(slides.eq(index), 'left');
					slides.eq(index + 1).show();
				}, 2000);
			};
		var handleThumbLinks = function() {
				thumbs.each(function() {
					var $a = $(this);
					var imgId = $('#' + $a.attr('rel'));
					$a.click(function(event) {
						clearInterval(timer);
						positionCursor($a);
						reset();
						index = $a.index();
						var dir = (index % 2 == 0) ? 'right' : 'left';
						slides.eq(index).show().siblings().hide();
						animateSlide(slides.eq(index), dir);
						if (dir = 'right') {
							slides.eq(index + 1).show();
						} else {
							slides.eq(index - 1).show();
						}
						event.preventDefault();
					});
				});
			};
		var handlePrevNextButtons = function() {
				previous.click(function(event) {
					clearInterval(timer);
					index--;
					if (index == 0) {
						index = 0;
					}
					positionCursor(thumbs.eq(index));
					reset();
					slides.eq(index).show().siblings().hide();
					animateSlide(slides.eq(index), 'left');
					slides.eq(index - 1).show();
					event.preventDefault();
				});
				next.click(function(event) {
					clearInterval(timer);
					index++;
					if (index == slides.length) {
						index = 0;
					}
					positionCursor(thumbs.eq(index));
					reset();
					slides.eq(index).show().siblings().hide();
					animateSlide(slides.eq(index), 'right');
					slides.eq(index + 1).show();
					event.preventDefault();
				});
			};
		this.init = function() {
			prepare();
			autoSlide();
			handleThumbLinks();
			handlePrevNextButtons();
		};
	}();
$(function() {
	Slideshow.init();
});