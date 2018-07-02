angular.module('cait_rocks_app', []);

// I am honestly not sure where to put this; it's needed on multiple pages, and just a random jquery execution
// I am also not sure about unit testing this yet, so for now I'm ignoring it
/* istanbul ignore next */
$('.fixed-header-scroll-parent').on('scroll', function () {
    $('thead', this).css('transform', 'translateY(' + this.scrollTop + 'px)');
});
