const mLayout = function () {
    let header;
    let horMenu;
    let horMenuOffcanvas;

    //== Header
    const initStickyHeader = function () {
        let tmp;
        const headerEl = mUtil.get('m_header');
        const options = {
            offset: {},
            minimize: {}
        };

        if (mUtil.attr(headerEl, 'm-minimize-mobile') === 'hide') {
            options.minimize.mobile = {};
            options.minimize.mobile.on = 'm-header--hide';
            options.minimize.mobile.off = 'm-header--show';
        } else {
            options.minimize.mobile = false;
        }

        if (mUtil.attr(headerEl, 'm-minimize') === 'hide') {
            options.minimize.desktop = {};
            options.minimize.desktop.on = 'm-header--hide';
            options.minimize.desktop.off = 'm-header--show';
        } else {
            options.minimize.desktop = false;
        }

        if ((tmp = mUtil.attr(headerEl, 'm-minimize-offset'))) {
            options.offset.desktop = tmp;
        }

        if ((tmp = mUtil.attr(headerEl, 'm-minimize-mobile-offset'))) {
            options.offset.mobile = tmp;
        }

        header = new mHeader('m_header', options);
    };

    //== Hor menu
    const initHorMenu = function () {
        // init aside left offcanvas
        horMenuOffcanvas = new mOffcanvas('m_header_menu', {
            overlay: true,
            baseClass: 'm-aside-header-menu-mobile',
            closeBy: 'm_aside_header_menu_mobile_close_btn',
            toggleBy: {
                target: 'm_aside_header_menu_mobile_toggle',
                state: 'm-brand__toggler--active'
            }
        });

        horMenu = new mMenu('m_header_menu', {
            submenu: {
                desktop: 'dropdown',
                tablet: 'accordion',
                mobile: 'accordion'
            },
            accordion: {
                slideSpeed: 200,  // accordion toggle slide speed in milliseconds
                autoScroll: true, // enable auto scrolling(focus) to the clicked menu item
                expandAll: false   // allow having multiple expanded accordions in the menu
            }
        });
    };

    //== Scrolltop
    const initScrollTop = function () {
        const scrollTop = new mScrollTop('m_scroll_top', {
            offset: 300,
            speed: 600
        });
    };

    return {
        init: function () {
            this.initHeader();
        },

        initHeader: function () {
            initStickyHeader();
            initHorMenu();
            initScrollTop();
        },

        closeMobileHorMenuOffcanvas: function () {
            if (mUtil.isMobileDevice()) {
                horMenuOffcanvas.hide();
            }
        }
    };
}();

$(document).ready(function() {
    if (mUtil.isAngularVersion() === false) {
        mLayout.init();
    }
});