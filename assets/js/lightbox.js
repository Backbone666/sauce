function lightbox(trigger) {
    var onThumbnailsClick = function (e) {
        e.preventDefault();

        var items = [];
        var index = 0;

        var currentCard = e.target.closest('.kg-card');
        if (!currentCard) return;
        var cards = [];
        var prevSibling = currentCard.previousElementSibling;

        while (prevSibling && (prevSibling.classList.contains('kg-image-card') || prevSibling.classList.contains('kg-gallery-card'))) {
            cards.push(prevSibling);
            prevSibling = prevSibling.previousElementSibling;
        }

        cards.reverse();
        cards.push(currentCard);

        var nextSibling = currentCard.nextElementSibling;

        while (nextSibling && (nextSibling.classList.contains('kg-image-card') || nextSibling.classList.contains('kg-gallery-card'))) {
            cards.push(nextSibling);
            nextSibling = nextSibling.nextElementSibling;
        }

        cards.forEach(function (card) {
            var imgs = card.getElementsByTagName('img');

            for (var i = 0; i < imgs.length; i++) {
                items.push({
                    src: imgs[i].getAttribute('src'),
                    msrc: imgs[i].getAttribute('src'),
                    w: imgs[i].getAttribute('width'),
                    h: imgs[i].getAttribute('height'),
                    el: imgs[i],
                });

                if (imgs[i] === e.target) {
                    index = items.length - 1;
                }
            }
        });

        var pswpElement = document.querySelectorAll('.pswp')[0];

        var options = {
            bgOpacity: 0.9,
            closeOnScroll: true,
            fullscreenEl: false,
            history: false,
            index: index,
            shareEl: false,
            zoomEl: false,
            getThumbBoundsFn: function(index) {
                var thumbnail = items[index].el,
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            }
        }

        var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();

        return false;
    };

    var triggers = document.querySelectorAll(trigger);
    triggers.forEach(function (trig) {
        trig.addEventListener('click', function (e) {
            onThumbnailsClick(e);
        });
    });
}
