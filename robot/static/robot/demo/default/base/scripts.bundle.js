this.Element && function (t) {
    t.matches = t.matches || t.matchesSelector || t.webkitMatchesSelector || t.msMatchesSelector || function (t) {
        for (var e = (this.parentNode || this.document).querySelectorAll(t), a = -1; e[++a] && e[a] !== this;) ;
        return !!e[a]
    }
}(Element.prototype), this.Element && function (t) {
    t.closest = t.closest || function (t) {
        for (var e = this; e.matches && !e.matches(t);) e = e.parentNode;
        return e.matches ? e : null
    }
}(Element.prototype), this.Element && function (t) {
    t.matches = t.matches || t.matchesSelector || t.webkitMatchesSelector || t.msMatchesSelector || function (t) {
        for (var e = (this.parentNode || this.document).querySelectorAll(t), a = -1; e[++a] && e[a] !== this;) ;
        return !!e[a]
    }
}(Element.prototype), function () {
    for (var t = 0, e = ["webkit", "moz"], a = 0; a < e.length && !window.requestAnimationFrame; ++a) window.requestAnimationFrame = window[e[a] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[a] + "CancelAnimationFrame"] || window[e[a] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function (e) {
        var a = (new Date).getTime(), n = Math.max(0, 16 - (a - t)), o = window.setTimeout(function () {
            e(a + n)
        }, n);
        return t = a + n, o
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (t) {
        clearTimeout(t)
    })
}(), [Element.prototype, Document.prototype, DocumentFragment.prototype].forEach(function (t) {
    t.hasOwnProperty("prepend") || Object.defineProperty(t, "prepend", {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        value: function () {
            var t = Array.prototype.slice.call(arguments), e = document.createDocumentFragment();
            t.forEach(function (t) {
                var a = t instanceof Node;
                e.appendChild(a ? t : document.createTextNode(String(t)))
            }), this.insertBefore(e, this.firstChild)
        }
    })
}), window.mUtilElementDataStore = {}, window.mUtilElementDataStoreID = 0, window.mUtilDelegatedEventHandlers = {}, window.noZensmooth = !0;
var mUtil = function () {
    var t = [], e = {sm: 544, md: 768, lg: 1024, xl: 1200}, a = function () {
        var e = !1;
        window.addEventListener("resize", function () {
            clearTimeout(e), e = setTimeout(function () {
                !function () {
                    for (var e = 0; e < t.length; e++) t[e].call()
                }()
            }, 250)
        })
    };
    return {
        init: function (t) {
            t && t.breakpoints && (e = t.breakpoints), a()
        }, addResizeHandler: function (e) {
            t.push(e)
        }, runResizeHandlers: function () {
            _runResizeHandlers()
        }, getURLParam: function (t) {
            var e, a, n = window.location.search.substring(1).split("&");
            for (e = 0; e < n.length; e++) if ((a = n[e].split("="))[0] === t) return unescape(a[1]);
            return null
        }, isMobileDevice: function () {
            return this.getViewPort().width < this.getBreakpoint("lg")
        }, isDesktopDevice: function () {
            return !mUtil.isMobileDevice()
        }, getViewPort: function () {
            var t = window, e = "inner";
            return "innerWidth" in window || (e = "client", t = document.documentElement || document.body), {
                width: t[e + "Width"],
                height: t[e + "Height"]
            }
        }, isInResponsiveRange: function (t) {
            var e = this.getViewPort().width;
            return "general" === t || ("desktop" === t && e >= this.getBreakpoint("lg") + 1 || ("tablet" === t && e >= this.getBreakpoint("md") + 1 && e < this.getBreakpoint("lg") || ("mobile" === t && e <= this.getBreakpoint("md") || ("desktop-and-tablet" === t && e >= this.getBreakpoint("md") + 1 || ("tablet-and-mobile" === t && e <= this.getBreakpoint("lg") || "minimal-desktop-and-below" === t && e <= this.getBreakpoint("xl"))))))
        }, getUniqueID: function (t) {
            return t + Math.floor(Math.random() * (new Date).getTime())
        }, getBreakpoint: function (t) {
            return e[t]
        }, isset: function (t, e) {
            var a;
            if (-1 !== (e = e || "").indexOf("[")) throw new Error("Unsupported object path notation.");
            e = e.split(".");
            do {
                if (void 0 === t) return !1;
                if (a = e.shift(), !t.hasOwnProperty(a)) return !1;
                t = t[a]
            } while (e.length);
            return !0
        }, getHighestZindex: function (t) {
            for (var e, a, n = mUtil.get(t); n && n !== document;) {
                if (("absolute" === (e = mUtil.css(n, "position")) || "relative" === e || "fixed" === e) && (a = parseInt(mUtil.css(n, "z-index")), !isNaN(a) && 0 !== a)) return a;
                n = n.parentNode
            }
            return null
        }, hasFixedPositionedParent: function (t) {
            for (; t && t !== document;) {
                if (position = mUtil.css(t, "position"), "fixed" === position) return !0;
                t = t.parentNode
            }
            return !1
        }, sleep: function (t) {
            for (var e = (new Date).getTime(), a = 0; a < 1e7 && !((new Date).getTime() - e > t); a++) ;
        }, getRandomInt: function (t, e) {
            return Math.floor(Math.random() * (e - t + 1)) + t
        }, isAngularVersion: function () {
            return void 0 !== window.Zone
        }, deepExtend: function (t) {
            t = t || {};
            for (var e = 1; e < arguments.length; e++) {
                var a = arguments[e];
                if (a) for (var n in a) a.hasOwnProperty(n) && ("object" == typeof a[n] ? t[n] = mUtil.deepExtend(t[n], a[n]) : t[n] = a[n])
            }
            return t
        }, extend: function (t) {
            t = t || {};
            for (var e = 1; e < arguments.length; e++) if (arguments[e]) for (var a in arguments[e]) arguments[e].hasOwnProperty(a) && (t[a] = arguments[e][a]);
            return t
        }, get: function (t) {
            var e;
            return t === document ? document : t && 1 === t.nodeType ? t : (e = document.getElementById(t)) ? e : (e = document.getElementsByTagName(t)) ? e[0] : (e = document.getElementsByClassName(t)) ? e[0] : null
        }, hasClasses: function (t, e) {
            if (t) {
                for (var a = e.split(" "), n = 0; n < a.length; n++) if (0 === mUtil.hasClass(t, mUtil.trim(a[n]))) return !1;
                return !0
            }
        }, hasClass: function (t, e) {
            if (t) return t.classList ? t.classList.contains(e) : new RegExp("\\b" + e + "\\b").test(t.className)
        }, addClass: function (t, e) {
            if (t && void 0 !== e) {
                var a = e.split(" ");
                if (t.classList) for (var n = 0; n < a.length; n++) a[n] && a[n].length > 0 && t.classList.add(mUtil.trim(a[n])); else if (!mUtil.hasClass(t, e)) for (n = 0; n < a.length; n++) t.className += " " + mUtil.trim(a[n])
            }
        }, removeClass: function (t, e) {
            if (t) {
                var a = e.split(" ");
                if (t.classList) for (var n = 0; n < a.length; n++) t.classList.remove(mUtil.trim(a[n])); else if (mUtil.hasClass(t, e)) for (n = 0; n < a.length; n++) t.className = t.className.replace(new RegExp("\\b" + mUtil.trim(a[n]) + "\\b", "g"), "")
            }
        }, triggerCustomEvent: function (t, e, a) {
            if (window.CustomEvent) var n = new CustomEvent(e, {detail: a}); else (n = document.createEvent("CustomEvent")).initCustomEvent(e, !0, !0, a);
            t.dispatchEvent(n)
        }, trim: function (t) {
            return t.trim()
        }, eventTriggered: function (t) {
            return !!t.currentTarget.dataset.triggered || (t.currentTarget.dataset.triggered = !0, !1)
        }, remove: function (t) {
            t && t.parentNode && t.parentNode.removeChild(t)
        }, find: function (t, e) {
            return t.querySelector(e)
        }, findAll: function (t, e) {
            return t.querySelectorAll(e)
        }, insertAfter: function (t, e) {
            return e.parentNode.insertBefore(t, e.nextSibling)
        }, parents: function (t, e) {
            function a(t, e) {
                for (var a = 0, n = t.length; a < n; a++) if (t[a] === e) return !0;
                return !1
            }

            return function (t, e) {
                for (var n = document.querySelectorAll(e), o = t.parentNode; o && !a(n, o);) o = o.parentNode;
                return o
            }(t, e)
        }, children: function (t, e, a) {
            if (t && t.childNodes) {
                for (var n = [], o = 0, i = t.childNodes.length; o < i; ++o) 1 === t.childNodes[o].nodeType && mUtil.matches(t.childNodes[o], e, a) && n.push(t.childNodes[o]);
                return n
            }
        }, child: function (t, e, a) {
            var n = mUtil.children(t, e, a);
            return n ? n[0] : null
        }, matches: function (t, e, a) {
            var n = Element.prototype,
                o = n.matches || n.webkitMatchesSelector || n.mozMatchesSelector || n.msMatchesSelector || function (t) {
                    return -1 !== [].indexOf.call(document.querySelectorAll(t), this)
                };
            return !(!t || !t.tagName) && o.call(t, e)
        }, data: function (t) {
            return t = mUtil.get(t), {
                set: function (e, a) {
                    void 0 === t.customDataTag && (mUtilElementDataStoreID++, t.customDataTag = mUtilElementDataStoreID), void 0 === mUtilElementDataStore[t.customDataTag] && (mUtilElementDataStore[t.customDataTag] = {}), mUtilElementDataStore[t.customDataTag][e] = a
                }, get: function (e) {
                    return this.has(e) ? mUtilElementDataStore[t.customDataTag][e] : null
                }, has: function (e) {
                    return !(!mUtilElementDataStore[t.customDataTag] || !mUtilElementDataStore[t.customDataTag][e])
                }, remove: function (e) {
                    this.has(e) && delete mUtilElementDataStore[t.customDataTag][e]
                }
            }
        }, outerWidth: function (t, e) {
            if (!0 === e) {
                var a = parseFloat(t.offsetWidth);
                return a += parseFloat(mUtil.css(t, "margin-left")) + parseFloat(mUtil.css(t, "margin-right")), parseFloat(a)
            }
            return a = parseFloat(t.offsetWidth)
        }, offset: function (t) {
            var e = t.getBoundingClientRect();
            return {top: e.top + document.body.scrollTop, left: e.left + document.body.scrollLeft}
        }, height: function (t) {
            return mUtil.css(t, "height")
        }, visible: function (t) {
            return !(0 === t.offsetWidth && 0 === t.offsetHeight)
        }, attr: function (t, e, a) {
            if (void 0 !== (t = mUtil.get(t))) return void 0 === a ? t.getAttribute(e) : void t.setAttribute(e, a)
        }, hasAttr: function (t, e) {
            if (void 0 !== (t = mUtil.get(t))) return !!t.getAttribute(e)
        }, removeAttr: function (t, e) {
            void 0 !== (t = mUtil.get(t)) && t.removeAttribute(e)
        }, animate: function (t, e, a, n, o, i) {
            var l = {
                linear: function (t, e, a, n) {
                    return a * t / n + e
                }
            };
            if ("number" == typeof t && "number" == typeof e && "number" == typeof a && "function" == typeof n) {
                "string" == typeof o && l[o] && (o = l[o]), "function" != typeof o && (o = l.linear), "function" != typeof i && (i = function () {
                });
                var r = window.requestAnimationFrame || function (t) {
                    window.setTimeout(t, 1e3 / 60)
                }, s = e - t;
                n(t);
                var d = window.performance && window.performance.now ? window.performance.now() : +new Date;
                r(function l(c) {
                    var m = (c || +new Date) - d;
                    m >= 0 && n(o(m, t, s, a)), m >= 0 && m >= a ? (n(e), i()) : r(l)
                })
            }
        }, actualCss: function (t, e, a) {
            var n;
            if (t instanceof HTMLElement !== !1) return t.getAttribute("m-hidden-" + e) && !1 !== a ? parseFloat(t.getAttribute("m-hidden-" + e)) : (t.style.cssText = "position: absolute; visibility: hidden; display: block;", "width" === e ? n = t.offsetWidth : "height" === e && (n = t.offsetHeight), t.style.cssText = "", t.setAttribute("m-hidden-" + e, n), parseFloat(n))
        }, actualHeight: function (t, e) {
            return mUtil.actualCss(t, "height", e)
        }, actualWidth: function (t, e) {
            return mUtil.actualCss(t, "width", e)
        }, getScroll: function (t, e) {
            return e = "scroll" + e, t === window || t === document ? self["scrollTop" === e ? "pageYOffset" : "pageXOffset"] || browserSupportsBoxModel && document.documentElement[e] || document.body[e] : t[e]
        }, css: function (t, e, a) {
            if (t = mUtil.get(t)) if (void 0 !== a) t.style[e] = a; else {
                var n = (t.ownerDocument || document).defaultView;
                if (n && n.getComputedStyle) return e = e.replace(/([A-Z])/g, "-$1").toLowerCase(), n.getComputedStyle(t, null).getPropertyValue(e);
                if (t.currentStyle) return e = e.replace(/\-(\w)/g, function (t, e) {
                    return e.toUpperCase()
                }), a = t.currentStyle[e], /^\d+(em|pt|%|ex)?$/i.test(a) ? function (e) {
                    var a = t.style.left, n = t.runtimeStyle.left;
                    return t.runtimeStyle.left = t.currentStyle.left, t.style.left = e || 0, e = t.style.pixelLeft + "px", t.style.left = a, t.runtimeStyle.left = n, e
                }(a) : a
            }
        }, slide: function (t, e, a, n, o) {
            if (!(!t || "up" === e && !1 === mUtil.visible(t) || "down" === e && !0 === mUtil.visible(t))) {
                a = a || 600;
                var i = mUtil.actualHeight(t), l = !1, r = !1;
                mUtil.css(t, "padding-top") && !0 !== mUtil.data(t).has("slide-padding-top") && mUtil.data(t).set("slide-padding-top", mUtil.css(t, "padding-top")), mUtil.css(t, "padding-bottom") && !0 !== mUtil.data(t).has("slide-padding-bottom") && mUtil.data(t).set("slide-padding-bottom", mUtil.css(t, "padding-bottom")), mUtil.data(t).has("slide-padding-top") && (l = parseInt(mUtil.data(t).get("slide-padding-top"))), mUtil.data(t).has("slide-padding-bottom") && (r = parseInt(mUtil.data(t).get("slide-padding-bottom"))), "up" === e ? (t.style.cssText = "display: block; overflow: hidden;", l && mUtil.animate(0, l, a, function (e) {
                    t.style.paddingTop = l - e + "px"
                }, "linear"), r && mUtil.animate(0, r, a, function (e) {
                    t.style.paddingBottom = r - e + "px"
                }, "linear"), mUtil.animate(0, i, a, function (e) {
                    t.style.height = i - e + "px"
                }, "linear", function () {
                    n(), t.style.height = "", t.style.display = "none"
                })) : "down" === e && (t.style.cssText = "display: block; overflow: hidden;", l && mUtil.animate(0, l, a, function (e) {
                    t.style.paddingTop = e + "px"
                }, "linear", function () {
                    t.style.paddingTop = ""
                }), r && mUtil.animate(0, r, a, function (e) {
                    t.style.paddingBottom = e + "px"
                }, "linear", function () {
                    t.style.paddingBottom = ""
                }), mUtil.animate(0, i, a, function (e) {
                    t.style.height = e + "px"
                }, "linear", function () {
                    n(), t.style.height = "", t.style.display = "", t.style.overflow = ""
                }))
            }
        }, slideUp: function (t, e, a) {
            mUtil.slide(t, "up", e, a)
        }, slideDown: function (t, e, a) {
            mUtil.slide(t, "down", e, a)
        }, show: function (t, e) {
            t.style.display = e || "block"
        }, hide: function (t) {
            t.style.display = "none"
        }, addEvent: function (t, e, a, n) {
            void 0 !== (t = mUtil.get(t)) && t.addEventListener(e, a)
        }, removeEvent: function (t, e, a) {
            (t = mUtil.get(t)).removeEventListener(e, a)
        }, on: function (t, e, a, n) {
            if (e) {
                var o = mUtil.getUniqueID("event");
                return mUtilDelegatedEventHandlers[o] = function (a) {
                    for (var o = t.querySelectorAll(e), i = a.target; i && i !== t;) {
                        for (var l = 0, r = o.length; l < r; l++) i === o[l] && n.call(i, a);
                        i = i.parentNode
                    }
                }, mUtil.addEvent(t, a, mUtilDelegatedEventHandlers[o]), o
            }
        }, off: function (t, e, a) {
            t && mUtilDelegatedEventHandlers[a] && (mUtil.removeEvent(t, e, mUtilDelegatedEventHandlers[a]), delete mUtilDelegatedEventHandlers[a])
        }, one: function (t, e, a) {
            (t = mUtil.get(t)).addEventListener(e, function (t) {
                return t.target.removeEventListener(t.type, arguments.callee), a(t)
            })
        }, hash: function (t) {
            var e, a = 0;
            if (0 === t.length) return a;
            for (e = 0; e < t.length; e++) a = (a << 5) - a + t.charCodeAt(e), a |= 0;
            return a
        }, animateClass: function (t, e, a) {
            mUtil.addClass(t, "animated " + e), mUtil.one(t, "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                mUtil.removeClass(t, "animated " + e)
            }), a && mUtil.one(t.animationEnd, a)
        }, animateDelay: function (t, e) {
            for (var a = ["webkit-", "moz-", "ms-", "o-", ""], n = 0; n < a.length; n++) mUtil.css(t, a[n] + "animation-delay", e)
        }, animateDuration: function (t, e) {
            for (var a = ["webkit-", "moz-", "ms-", "o-", ""], n = 0; n < a.length; n++) mUtil.css(t, a[n] + "animation-duration", e)
        }, scrollTo: function (t, e, a) {
            a || (a = 600), zenscroll.toY(t, a)
        }, scrollToViewport: function (t, e) {
            e || (e = 1200), zenscroll.intoView(t, e)
        }, scrollToCenter: function (t, e) {
            e || (e = 1200), zenscroll.center(t, e)
        }, scrollTop: function (t) {
            t || (t = 600), zenscroll.toY(0, t)
        }, isArray: function (t) {
            return t && Array.isArray(t)
        }, ready: function (t) {
            (document.attachEvent ? "complete" === document.readyState : "loading" !== document.readyState) ? t() : document.addEventListener("DOMContentLoaded", t)
        }, isEmpty: function (t) {
            for (var e in t) if (t.hasOwnProperty(e)) return !1;
            return !0
        }, numberString: function (t) {
            for (var e = (t += "").split("."), a = e[0], n = e.length > 1 ? "." + e[1] : "", o = /(\d+)(\d{3})/; o.test(a);) a = a.replace(o, "$1,$2");
            return a + n
        }
    }
}();
mUtil.ready(function () {
    mUtil.init()
});
var mApp = function () {
    var t = {
        brand: "#716aca",
        metal: "#c4c5d6",
        light: "#ffffff",
        accent: "#00c5dc",
        primary: "#5867dd",
        success: "#34bfa3",
        info: "#36a3f7",
        warning: "#ffb822",
        danger: "#f4516c",
        focus: "#9816f4"
    }, e = function (t) {
        var e = t.data("skin") ? "m-tooltip--skin-" + t.data("skin") : "",
            a = "auto" === t.data("width") ? "m-tooltop--auto-width" : "",
            n = t.data("trigger") ? t.data("trigger") : "hover";
        t.tooltip({
            trigger: n,
            template: '<div class="m-tooltip ' + e + " " + a + ' tooltip" role="tooltip">                <div class="arrow"></div>                <div class="tooltip-inner"></div>            </div>'
        })
    }, a = function () {
        $('[data-toggle="m-tooltip"]').each(function () {
            e($(this))
        })
    }, n = function (t) {
        var e = t.data("skin") ? "m-popover--skin-" + t.data("skin") : "",
            a = t.data("trigger") ? t.data("trigger") : "hover";
        t.popover({
            trigger: a,
            template: '            <div class="m-popover ' + e + ' popover" role="tooltip">                <div class="arrow"></div>                <h3 class="popover-header"></h3>                <div class="popover-body"></div>            </div>'
        })
    }, o = function () {
        $('[data-toggle="m-popover"]').each(function () {
            n($(this))
        })
    }, i = function (t, e) {
        t = $(t), new mPortlet(t[0], e)
    }, l = function () {
        $('[m-portlet="true"]').each(function () {
            var t = $(this);
            !0 !== t.data("portlet-initialized") && (i(t, {}), t.data("portlet-initialized", !0))
        })
    }, r = function () {
        $("[data-tab-target]").each(function () {
            1 !== $(this).data("tabs-initialized") && ($(this).click(function (t) {
                t.preventDefault();
                var e = $(this), a = e.closest('[data-tabs="true"]'), n = $(a.data("tabs-contents")),
                    o = $(e.data("tab-target"));
                a.find(".m-tabs__item.m-tabs__item--active").removeClass("m-tabs__item--active"), e.addClass("m-tabs__item--active"), n.find(".m-tabs-content__item.m-tabs-content__item--active").removeClass("m-tabs-content__item--active"), o.addClass("m-tabs-content__item--active")
            }), $(this).data("tabs-initialized", !0))
        })
    };
    return {
        init: function (e) {
            e && e.colors && (t = e.colors), mApp.initComponents()
        }, initComponents: function () {
            jQuery.event.special.touchstart = {
                setup: function (t, e, a) {
                    "function" == typeof this && (e.includes("noPreventDefault") ? this.addEventListener("touchstart", a, {passive: !1}) : this.addEventListener("touchstart", a, {passive: !0}))
                }
            }, jQuery.event.special.touchmove = {
                setup: function (t, e, a) {
                    "function" == typeof this && (e.includes("noPreventDefault") ? this.addEventListener("touchmove", a, {passive: !1}) : this.addEventListener("touchmove", a, {passive: !0}))
                }
            }, jQuery.event.special.wheel = {
                setup: function (t, e, a) {
                    "function" == typeof this && (e.includes("noPreventDefault") ? this.addEventListener("wheel", a, {passive: !1}) : this.addEventListener("wheel", a, {passive: !0}))
                }
            }, $('[data-scrollable="true"]').each(function () {
                var t, e, a = $(this);
                mUtil.isInResponsiveRange("tablet-and-mobile") ? (t = a.data("mobile-max-height") ? a.data("mobile-max-height") : a.data("max-height"), e = a.data("mobile-height") ? a.data("mobile-height") : a.data("height")) : (t = a.data("max-height"), e = a.data("max-height")), t && a.css("max-height", t), e && a.css("height", e), mApp.initScroller(a, {})
            }), a(), o(), $("body").on("click", "[data-close=alert]", function () {
                $(this).closest(".alert").hide()
            }), l(), $(".custom-file-input").on("change", function () {
                var t = $(this).val();
                $(this).next(".custom-file-label").addClass("selected").html(t)
            }), r()
        }, initCustomTabs: function () {
            r()
        }, initTooltips: function () {
            a()
        }, initTooltip: function (t) {
            e(t)
        }, initPopovers: function () {
            o()
        }, initPopover: function (t) {
            n(t)
        }, initPortlet: function (t, e) {
            i(t, e)
        }, initPortlets: function () {
            l()
        }, scrollTo: function (t, e) {
            el = $(t);
            var a = el && el.length > 0 ? el.offset().top : 0;
            a += e || 0, jQuery("html,body").animate({scrollTop: a}, "slow")
        }, scrollToViewport: function (t) {
            var e = $(t).offset().top, a = t.height(), n = e - (mUtil.getViewPort().height / 2 - a / 2);
            jQuery("html,body").animate({scrollTop: n}, "slow")
        }, scrollTop: function () {
            mApp.scrollTo()
        }, initScroller: function (t, e, a) {
            mUtil.isMobileDevice() ? t.css("overflow", "auto") : (!0 !== a && mApp.destroyScroller(t), t.mCustomScrollbar({
                scrollInertia: 0,
                autoDraggerLength: !0,
                autoHideScrollbar: !0,
                autoExpandScrollbar: !1,
                alwaysShowScrollbar: 0,
                axis: t.data("axis") ? t.data("axis") : "y",
                mouseWheel: {scrollAmount: 120, preventDefault: !0},
                setHeight: e.height ? e.height : "",
                theme: "minimal-dark"
            }))
        }, destroyScroller: function (t) {
            t.mCustomScrollbar("destroy"), t.removeClass("mCS_destroyed")
        }, alert: function (t) {
            t = $.extend(!0, {
                container: "",
                place: "append",
                type: "success",
                message: "",
                close: !0,
                reset: !0,
                focus: !0,
                closeInSeconds: 0,
                icon: ""
            }, t);
            var e = mUtil.getUniqueID("App_alert"),
                a = '<div id="' + e + '" class="custom-alerts alert alert-' + t.type + ' fade in">' + (t.close ? '<button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button>' : "") + ("" !== t.icon ? '<i class="fa-lg fa fa-' + t.icon + '"></i>  ' : "") + t.message + "</div>";
            return t.reset && $(".custom-alerts").remove(), t.container ? "append" === t.place ? $(t.container).append(a) : $(t.container).prepend(a) : 1 === $(".page-fixed-main-content").size() ? $(".page-fixed-main-content").prepend(a) : ($("body").hasClass("page-container-bg-solid") || $("body").hasClass("page-content-white")) && 0 === $(".page-head").size() ? $(".page-title").after(a) : $(".page-bar").size() > 0 ? $(".page-bar").after(a) : $(".page-breadcrumb, .breadcrumbs").after(a), t.focus && mApp.scrollTo($("#" + e)), t.closeInSeconds > 0 && setTimeout(function () {
                $("#" + e).remove()
            }, 1e3 * t.closeInSeconds), e
        }, block: function (t, e) {
            var a, n, o, i = $(t);
            if ("spinner" === (e = $.extend(!0, {
                opacity: .03,
                overlayColor: "#000000",
                state: "brand",
                type: "loader",
                size: "lg",
                centerX: !0,
                centerY: !0,
                message: "",
                shadow: !0,
                width: "auto"
            }, e)).type ? o = '<div class="m-spinner ' + (a = e.skin ? "m-spinner--skin-" + e.skin : "") + " " + (n = e.state ? "m-spinner--" + e.state : "") + '"></div' : (a = e.skin ? "m-loader--skin-" + e.skin : "", n = e.state ? "m-loader--" + e.state : "", size = e.size ? "m-loader--" + e.size : "", o = '<div class="m-loader ' + a + " " + n + " " + size + '"></div'), e.message && e.message.length > 0) {
                var l = "m-blockui " + (!1 === e.shadow ? "m-blockui-no-shadow" : "");
                html = '<div class="' + l + '"><span>' + e.message + "</span><span>" + o + "</span></div>";
                i = document.createElement("div");
                mUtil.get("body").prepend(i), mUtil.addClass(i, l), i.innerHTML = "<span>" + e.message + "</span><span>" + o + "</span>", e.width = mUtil.actualWidth(i) + 10, mUtil.remove(i), "body" === t && (html = '<div class="' + l + '" style="margin-left:-' + e.width / 2 + 'px;"><span>' + e.message + "</span><span>" + o + "</span></div>")
            } else html = o;
            var r = {
                message: html,
                centerY: e.centerY,
                centerX: e.centerX,
                css: {top: "30%", left: "50%", border: "0", padding: "0", backgroundColor: "none", width: e.width},
                overlayCSS: {backgroundColor: e.overlayColor, opacity: e.opacity, cursor: "wait", zIndex: "10"},
                onUnblock: function () {
                    i && (mUtil.css(i, "position", ""), mUtil.css(i, "zoom", ""))
                }
            };
            "body" === t ? (r.css.top = "50%", $.blockUI(r)) : (i = $(t)).block(r)
        }, unblock: function (t) {
            t && "body" !== t ? $(t).unblock() : $.unblockUI()
        }, blockPage: function (t) {
            return mApp.block("body", t)
        }, unblockPage: function () {
            return mApp.unblock("body")
        }, progress: function (t, e) {
            var a = "m-loader m-loader--" + (e && e.skin ? e.skin : "light") + " m-loader--" + (e && e.alignment ? e.alignment : "right") + " m-loader--" + (e && e.size ? "m-spinner--" + e.size : "");
            mApp.unprogress(t), $(t).addClass(a), $(t).data("progress-classes", a)
        }, unprogress: function (t) {
            $(t).removeClass($(t).data("progress-classes"))
        }, getColor: function (e) {
            return t[e]
        }
    }
}();
$(document).ready(function () {
    mApp.init({})
}), function ($) {

	if (typeof mUtil === 'undefined') throw new Error('mUtil is required and must be included before mDatatable.');

	// plugin setup
	$.fn.mDatatable = function(options) {
		if ($(this).length === 0) {
			console.log('No mDatatable element exist.');
			return;
		}

		// global variables
		var datatable = this;

		// debug enabled?
		// 1) state will be cleared on each refresh
		// 2) enable some logs
		// 3) etc.
		datatable.debug = false;

		datatable.API = {
			record: null,
			value: null,
			params: null,
		};

		var Plugin = {
			/********************
			 ** PRIVATE METHODS
			 ********************/
			isInit: false,
			offset: 110,
			stateId: 'meta',
			ajaxParams: {},

			init: function(options) {
				var isHtmlTable = false;
				// data source option empty is normal table
				if (options.data.source === null) {
					Plugin.extractTable();
					isHtmlTable = true;
				}

				Plugin.setupBaseDOM.call();
				Plugin.setupDOM(datatable.table);
				Plugin.spinnerCallback(true);

				// set custom query from options
				Plugin.setDataSourceQuery(Plugin.getOption('data.source.read.params.query'));

				// on event after layout had done setup, show datatable
				$(datatable).on('m-datatable--on-layout-updated', Plugin.afterRender);

				if (datatable.debug) Plugin.stateRemove(Plugin.stateId);

				// initialize extensions
				$.each(Plugin.getOption('extensions'), function(extName, extOptions) {
					if (typeof $.fn.mDatatable[extName] === 'function')
						new $.fn.mDatatable[extName](datatable, extOptions);
				});

				// get data
				if (options.data.type === 'remote' || options.data.type === 'local') {
					if (options.data.saveState === false
						|| options.data.saveState.cookie === false
						&& options.data.saveState.webstorage === false) {
						Plugin.stateRemove(Plugin.stateId);
					}
					// get data for local datatable and local table
					if (options.data.type === 'local' && typeof options.data.source === 'object') {
						datatable.dataSet = datatable.originalDataSet = Plugin.dataMapCallback(options.data.source);
					}
					Plugin.dataRender();
				}

				if (!isHtmlTable) {
					// if not a html table, setup header
					Plugin.setHeadTitle();
					if (Plugin.getOption('layout.footer')) {
						Plugin.setHeadTitle(datatable.tableFoot);
					}
				}

				// hide header
				if (typeof options.layout.header !== 'undefined' &&
					options.layout.header === false) {
					$(datatable.table).find('thead').remove();
				}

				// hide footer
				if (typeof options.layout.footer !== 'undefined' &&
					options.layout.footer === false) {
					$(datatable.table).find('tfoot').remove();
				}

				// for normal and local data type, run layoutUpdate
				if (options.data.type === null ||
					options.data.type === 'local') {
					Plugin.setupCellField.call();
					Plugin.setupTemplateCell.call();

					// setup nested datatable, if option enabled
					Plugin.setupSubDatatable.call();

					// setup extra system column properties
					Plugin.setupSystemColumn.call();
					Plugin.redraw();
				}

				$(window).resize(Plugin.fullRender);

				$(datatable).height('');

				$(Plugin.getOption('search.input')).on('keyup', function(e) {
					if (Plugin.getOption('search.onEnter') && e.which !== 13) return;
					Plugin.search($(this).val());
				});

				return datatable;
			},

			/**
			 * Extract static HTML table content into datasource
			 */
			extractTable: function() {
				var columns = [];
				var headers = $(datatable).
					find('tr:first-child th').
					get().
					map(function(cell, i) {
						var field = $(cell).data('field');
						if (typeof field === 'undefined') {
							field = $(cell).text().trim();
						}
						var column = {field: field, title: field};
						for (var ii in options.columns) {
							if (options.columns[ii].field === field) {
								column = $.extend(true, {}, options.columns[ii], column);
							}
						}
						columns.push(column);
						return field;
					});
				// auto create columns config
				options.columns = columns;

				var rowProp = [];
				var source = [];

				$(datatable).find('tr').each(function() {
					if ($(this).find('td').length) {
						rowProp.push($(this).prop('attributes'));
					}
					var td = {};
					$(this).find('td').each(function(i, cell) {
						td[headers[i]] = cell.innerHTML.trim();
					});
					if (!mUtil.isEmpty(td)) {
						source.push(td);
					}
				});

				options.data.attr.rowProps = rowProp;
				options.data.source = source;
			},

			/**
			 * One time layout update on init
			 */
			layoutUpdate: function() {
				// setup nested datatable, if option enabled
				Plugin.setupSubDatatable.call();

				// setup extra system column properties
				Plugin.setupSystemColumn.call();

				// setup cell hover event
				Plugin.setupHover.call();

				if (typeof options.detail === 'undefined'
					// temporary disable lock column in subtable
					&& Plugin.getDepth() === 1) {
					// lock columns handler
					Plugin.lockTable.call();
				}

				Plugin.columnHide.call();

				Plugin.resetScroll();

				if (!Plugin.isInit) {
					$(datatable).trigger('m-datatable--on-init', {table: $(datatable.wrap).attr('id'), options: options});
					Plugin.isInit = true;
				}

				$(datatable).trigger('m-datatable--on-layout-updated', {table: $(datatable.wrap).attr('id')});
			},

			lockTable: function() {
				// todo; revise lock table responsive
				var lock = {
					lockEnabled: false,
					init: function() {
						// check if table should be locked columns
						lock.lockEnabled = Plugin.lockEnabledColumns();
						if (lock.lockEnabled.left.length === 0 &&
							lock.lockEnabled.right.length === 0) {
							return;
						}
						lock.enable();
					},
					enable: function() {
						var enableLock = function(tablePart) {
							// check if already has lock column
							if ($(tablePart).find('.m-datatable__lock').length > 0) {
								Plugin.log('Locked container already exist in: ', tablePart);
								return;
							}
							// check if no rows exists
							if ($(tablePart).find('.m-datatable__row').length === 0) {
								Plugin.log('No row exist in: ', tablePart);
								return;
							}

							// locked div container
							var lockLeft = $('<div/>').
								addClass('m-datatable__lock m-datatable__lock--left');
							var lockScroll = $('<div/>').
								addClass('m-datatable__lock m-datatable__lock--scroll');
							var lockRight = $('<div/>').
								addClass('m-datatable__lock m-datatable__lock--right');

							$(tablePart).find('.m-datatable__row').each(function() {
								var rowLeft = $('<tr/>').
									addClass('m-datatable__row').
									appendTo(lockLeft);
								var rowScroll = $('<tr/>').
									addClass('m-datatable__row').
									appendTo(lockScroll);
								var rowRight = $('<tr/>').
									addClass('m-datatable__row').
									appendTo(lockRight);
								$(this).find('.m-datatable__cell').each(function() {
									var locked = $(this).data('locked');
									if (typeof locked !== 'undefined') {
										if (typeof locked.left !== 'undefined' || locked === true) {
											// default locked to left
											$(this).appendTo(rowLeft);
										}
										if (typeof locked.right !== 'undefined') {
											$(this).appendTo(rowRight);
										}
									} else {
										$(this).appendTo(rowScroll);
									}
								});
								// remove old row
								$(this).remove();
							});

							if (lock.lockEnabled.left.length > 0) {
								$(datatable.wrap).addClass('m-datatable--lock');
								$(lockLeft).appendTo(tablePart);
							}
							if (lock.lockEnabled.left.length > 0 || lock.lockEnabled.right.length > 0) {
								$(lockScroll).appendTo(tablePart);
							}
							if (lock.lockEnabled.right.length > 0) {
								$(datatable.wrap).addClass('m-datatable--lock');
								$(lockRight).appendTo(tablePart);
							}
						};

						$(datatable.table).find('thead,tbody,tfoot').each(function() {
							var tablePart = this;
							if ($(this).find('.m-datatable__lock').length === 0) {
								$(this).ready(function() {
									enableLock(tablePart);
								});
							}
						});
					},
				};
				lock.init();
				return lock;
			},

			/**
			 * Render everything for resize
			 */
			fullRender: function() {
				// todo; full render datatable for specific condition only
				Plugin.spinnerCallback(true);
				$(datatable.wrap).removeClass('m-datatable--loaded');

				Plugin.insertData();
			},

			lockEnabledColumns: function() {
				var screen = $(window).width();
				var columns = options.columns;
				var enabled = {left: [], right: []};
				$.each(columns, function(i, column) {
					if (typeof column.locked !== 'undefined') {
						if (typeof column.locked.left !== 'undefined') {
							if (mUtil.getBreakpoint(column.locked.left) <= screen) {
								enabled['left'].push(column.locked.left);
							}
						}
						if (typeof column.locked.right !== 'undefined') {
							if (mUtil.getBreakpoint(column.locked.right) <= screen) {
								enabled['right'].push(column.locked.right);
							}
						}
					}
				});
				return enabled;
			},

			/**
			 * After render event, called by m-datatable--on-layout-updated
			 * @param e
			 * @param args
			 */
			afterRender: function(e, args) {
				if (args.table === $(datatable.wrap).attr('id')) {
					$(datatable).ready(function() {
						if (!Plugin.isLocked()) {
							Plugin.redraw();
							// work on non locked columns
							if (Plugin.getOption('rows.autoHide')) {
								Plugin.autoHide();
								// reset row
								$(datatable.table).find('.m-datatable__row').css('height', '');
							}
						}

						// row even class
						$(datatable.tableBody).find('.m-datatable__row').removeClass('m-datatable__row--even');
						if ($(datatable.wrap).hasClass('m-datatable--subtable')) {
							$(datatable.tableBody).find('.m-datatable__row:not(.m-datatable__row-detail):even').addClass('m-datatable__row--even');
						} else {
							$(datatable.tableBody).find('.m-datatable__row:nth-child(even)').addClass('m-datatable__row--even');
						}

						// redraw locked columns table
						if (Plugin.isLocked()) Plugin.redraw();
						$(datatable.tableBody).css('visibility', '');
						$(datatable.wrap).addClass('m-datatable--loaded');
						Plugin.scrollbar.call();
						Plugin.sorting.call();

						// Plugin.hoverColumn.call();
						Plugin.spinnerCallback(false);
					});
				}
			},

			hoverTimer: 0,
			isScrolling: false,
			setupHover: function() {
				$(window).scroll(function(e) {
					// stop hover when scrolling
					clearTimeout(Plugin.hoverTimer);
					Plugin.isScrolling = true;
				});

				$(datatable.tableBody).
					find('.m-datatable__cell').
					off('mouseenter', 'mouseleave').
					on('mouseenter', function() {
						// reset scroll timer to hover class
						Plugin.hoverTimer = setTimeout(function() {
							Plugin.isScrolling = false;
						}, 200);
						if (Plugin.isScrolling) return;

						// normal table
						var row = $(this).
							closest('.m-datatable__row').
							addClass('m-datatable__row--hover');
						var index = $(row).index() + 1;

						// lock table
						$(row).
							closest('.m-datatable__lock').
							parent().
							find('.m-datatable__row:nth-child(' + index + ')').
							addClass('m-datatable__row--hover');
					}).
					on('mouseleave', function() {
						// normal table
						var row = $(this).
							closest('.m-datatable__row').
							removeClass('m-datatable__row--hover');
						var index = $(row).index() + 1;

						// look table
						$(row).
							closest('.m-datatable__lock').
							parent().
							find('.m-datatable__row:nth-child(' + index + ')').
							removeClass('m-datatable__row--hover');
					});
			},

			/**
			 * Adjust width of locked table containers by resize handler
			 * @returns {number}
			 */
			adjustLockContainer: function() {
				if (!Plugin.isLocked()) return 0;

				// refer to head dimension
				var containerWidth = $(datatable.tableHead).width();
				var lockLeft = $(datatable.tableHead).
					find('.m-datatable__lock--left').
					width();
				var lockRight = $(datatable.tableHead).
					find('.m-datatable__lock--right').
					width();

				if (typeof lockLeft === 'undefined') lockLeft = 0;
				if (typeof lockRight === 'undefined') lockRight = 0;

				var lockScroll = Math.floor(containerWidth - lockLeft - lockRight);
				$(datatable.table).
					find('.m-datatable__lock--scroll').
					css('width', lockScroll);

				return lockScroll;
			},

			/**
			 * todo; not in use
			 */
			dragResize: function() {
				var pressed = false;
				var start = undefined;
				var startX, startWidth;
				$(datatable.tableHead).
					find('.m-datatable__cell').
					mousedown(function(e) {
						start = $(this);
						pressed = true;
						startX = e.pageX;
						startWidth = $(this).width();
						$(start).addClass('m-datatable__cell--resizing');

					}).
					mousemove(function(e) {
						if (pressed) {
							var i = $(start).index();
							var tableBody = $(datatable.tableBody);
							var ifLocked = $(start).closest('.m-datatable__lock');

							if (ifLocked) {
								var lockedIndex = $(ifLocked).index();
								tableBody = $(datatable.tableBody).
									find('.m-datatable__lock').
									eq(lockedIndex);
							}

							$(tableBody).find('.m-datatable__row').each(function(tri, tr) {
								$(tr).
									find('.m-datatable__cell').
									eq(i).
									width(startWidth + (e.pageX - startX)).
									children().
									width(startWidth + (e.pageX - startX));
							});

							$(start).children().css('width', startWidth + (e.pageX - startX));
						}

					}).
					mouseup(function() {
						$(start).removeClass('m-datatable__cell--resizing');
						pressed = false;
					});

				$(document).mouseup(function() {
					$(start).removeClass('m-datatable__cell--resizing');
					pressed = false;
				});
			},

			/**
			 * To prepare placeholder for table before content is loading
			 */
			initHeight: function() {
				if (options.layout.height && options.layout.scroll) {
					var theadHeight = $(datatable.tableHead).find('.m-datatable__row').height();
					var tfootHeight = $(datatable.tableFoot).find('.m-datatable__row').height();
					var bodyHeight = options.layout.height;
					if (theadHeight > 0) {
						bodyHeight -= theadHeight;
					}
					if (tfootHeight > 0) {
						bodyHeight -= tfootHeight;
					}
					$(datatable.tableBody).css('max-height', bodyHeight);
				}
			},

			/**
			 * Setup base DOM (table, thead, tbody, tfoot) and create if not exist.
			 */
			setupBaseDOM: function() {
				// keep original state before mDatatable initialize
				datatable.initialDatatable = $(datatable).clone();

				// main element
				if ($(datatable).prop('tagName') === 'TABLE') {
					// if main init element is <table>, wrap with div
					datatable.table = $(datatable).
						removeClass('m-datatable').
						addClass('m-datatable__table');
					if ($(datatable.table).parents('.m-datatable').length === 0) {
						datatable.table.wrap($('<div/>').
							addClass('m-datatable').
							addClass('m-datatable--' + options.layout.theme));
						datatable.wrap = $(datatable.table).parent();
					}
				} else {
					// create table
					datatable.wrap = $(datatable).
						addClass('m-datatable').
						addClass('m-datatable--' + options.layout.theme);
					datatable.table = $('<table/>').
						addClass('m-datatable__table').
						appendTo(datatable);
				}

				if (typeof options.layout.class !== 'undefined') {
					$(datatable.wrap).addClass(options.layout.class);
				}

				$(datatable.table).
					removeClass('m-datatable--destroyed').
					css('display', 'block');

				// force disable save state
				if (typeof $(datatable).attr('id') === 'undefined') {
					Plugin.setOption('data.saveState', false);
					$(datatable.table).attr('id', mUtil.getUniqueID('m-datatable--'));
				}

				// predefine table height
				if (Plugin.getOption('layout.minHeight'))
					$(datatable.table).css('min-height', Plugin.getOption('layout.minHeight'));

				if (Plugin.getOption('layout.height'))
					$(datatable.table).css('max-height', Plugin.getOption('layout.height'));

				// for normal table load
				if (options.data.type === null) {
					$(datatable.table).css('width', '').css('display', '');
				}

				// create table head element
				datatable.tableHead = $(datatable.table).find('thead');
				if ($(datatable.tableHead).length === 0) {
					datatable.tableHead = $('<thead/>').prependTo(datatable.table);
				}

				// create table head element
				datatable.tableBody = $(datatable.table).find('tbody');
				if ($(datatable.tableBody).length === 0) {
					datatable.tableBody = $('<tbody/>').appendTo(datatable.table);
				}

				if (typeof options.layout.footer !== 'undefined' &&
					options.layout.footer) {
					// create table foot element
					datatable.tableFoot = $(datatable.table).find('tfoot');
					if ($(datatable.tableFoot).length === 0) {
						datatable.tableFoot = $('<tfoot/>').appendTo(datatable.table);
					}
				}
			},

			/**
			 * Set column data before table manipulation.
			 */
			setupCellField: function(tableParts) {
				if (typeof tableParts === 'undefined') tableParts = $(datatable.table).children();
				var columns = options.columns;
				$.each(tableParts, function(part, tablePart) {
					$(tablePart).find('.m-datatable__row').each(function(tri, tr) {
						// prepare data
						$(tr).find('.m-datatable__cell').each(function(tdi, td) {
							if (typeof columns[tdi] !== 'undefined') {
								$(td).data(columns[tdi]);
							}
						});
					});
				});
			},

			/**
			 * Set column template callback
			 * @param tablePart
			 */
			setupTemplateCell: function(tablePart) {
				if (typeof tablePart === 'undefined') tablePart = datatable.tableBody;
				var columns = options.columns;
				$(tablePart).find('.m-datatable__row').each(function(tri, tr) {
					// row data object, if any
					var obj = $(tr).data('obj') || {};

					// @deprecated in v5.0.6
					// obj['getIndex'] = function() {
					// 	return tri;
					// };
					// @deprecated in v5.0.6
					// obj['getDatatable'] = function() {
					// 	return datatable;
					// };

					// @deprecated in v5.0.6
					var rowCallback = Plugin.getOption('rows.callback');
					if (typeof rowCallback === 'function') {
						rowCallback($(tr), obj, tri);
					}
					// before template row callback
					var beforeTemplate = Plugin.getOption('rows.beforeTemplate');
					if (typeof beforeTemplate === 'function') {
						beforeTemplate($(tr), obj, tri);
					}
					// if data object is undefined, collect from table
					if (typeof obj === 'undefined') {
						obj = {};
						$(tr).find('.m-datatable__cell').each(function(tdi, td) {
							// get column settings by field
							var column = $.grep(columns, function(n, i) {
								return $(td).data('field') === n.field;
							})[0];
							if (typeof column !== 'undefined') {
								obj[column['field']] = $(td).text();
							}
						});
					}

					$(tr).find('.m-datatable__cell').each(function(tdi, td) {
						// get column settings by field
						var column = $.grep(columns, function(n, i) {
							return $(td).data('field') === n.field;
						})[0];
						if (typeof column !== 'undefined') {
							// column template
							if (typeof column.template !== 'undefined') {
								var finalValue = '';
								// template string
								if (typeof column.template === 'string') {
									finalValue = Plugin.dataPlaceholder(column.template, obj);
								}
								// template callback function
								if (typeof column.template === 'function') {
									finalValue = column.template(obj, tri, datatable);
								}
								var span = document.createElement('span');
								span.innerHTML = finalValue;
								// insert to cell, wrap with span
								$(td).html(span);

								// set span overflow
								if (typeof column.overflow !== 'undefined') {
									$(span).css('overflow', column.overflow);
									$(span).css('position', 'relative');
								}
							}
						}
					});

					// after template row callback
					var afterTemplate = Plugin.getOption('rows.afterTemplate');
					if (typeof afterTemplate === 'function') {
						afterTemplate($(tr), obj, tri);
					}
				});
			},

			/**
			 * Setup extra system column properties
			 * Note: selector checkbox, subtable toggle
			 */
			setupSystemColumn: function() {
				datatable.dataSet = datatable.dataSet || [];
				// no records available
				if (datatable.dataSet.length === 0) return;

				var columns = options.columns;
				$(datatable.tableBody).
					find('.m-datatable__row').
					each(function(tri, tr) {
						$(tr).find('.m-datatable__cell').each(function(tdi, td) {
							// get column settings by field
							var column = $.grep(columns, function(n, i) {
								return $(td).data('field') === n.field;
							})[0];
							if (typeof column !== 'undefined') {
								var value = $(td).text();

								// enable column selector
								if (typeof column.selector !== 'undefined' &&
									column.selector !== false) {
									// check if checkbox exist
									if ($(td).find('.m-checkbox [type="checkbox"]').length > 0) return;
									$(td).addClass('m-datatable__cell--check');
									// append checkbox
									var chk = $('<label/>').
										addClass('m-checkbox m-checkbox--single').
										append($('<input/>').
											attr('type', 'checkbox').
											attr('value', value).
											on('click', function() {
												if ($(this).is(':checked')) {
													// add checkbox active row class
													Plugin.setActive(this);
												} else {
													// add checkbox active row class
													Plugin.setInactive(this);
												}
											})).
										append($('<span/>'));

									// checkbox selector has outline style
									if (typeof column.selector.class !== 'undefined') {
										$(chk).addClass(column.selector.class);
									}

									$(td).children().html(chk);
								}

								// enable column subtable toggle
								if (typeof column.subtable !== 'undefined' && column.subtable) {
									// check if subtable toggle exist
									if ($(td).find('.m-datatable__toggle-subtable').length > 0) return;
									// append subtable toggle
									$(td).
										children().
										html($('<a/>').
											addClass('m-datatable__toggle-subtable').
											attr('href', '#').
											attr('data-value', value).
											append($('<i/>').
												addClass(Plugin.getOption('layout.icons.rowDetail.collapse'))));
								}
							}
						});
					});

				// init checkbox for header/footer
				var initCheckbox = function(tr) {
					// get column settings by field
					var column = $.grep(columns, function(n, i) {
						return typeof n.selector !== 'undefined' && n.selector !== false;
					})[0];

					if (typeof column !== 'undefined') {
						// enable column selector
						if (typeof column.selector !== 'undefined' && column.selector !== false) {
							var td = $(tr).find('[data-field="' + column.field + '"]');
							// check if checkbox exist
							if ($(td).find('.m-checkbox [type="checkbox"]').length > 0) return;
							$(td).addClass('m-datatable__cell--check');

							// todo; check all, for server pagination
							// append checkbox
							var chk = $('<label/>').
								addClass('m-checkbox m-checkbox--single m-checkbox--all').
								append($('<input/>').
									attr('type', 'checkbox').
									on('click', function() {
										if ($(this).is(':checked')) {
											Plugin.setActiveAll(true);
										} else {
											Plugin.setActiveAll(false);
										}
									})).
								append($('<span/>'));

							// checkbox selector has outline style
							if (typeof column.selector.class !== 'undefined') {
								$(chk).addClass(column.selector.class);
							}

							$(td).children().html(chk);
						}
					}
				};

				if (options.layout.header) {
					initCheckbox($(datatable.tableHead).find('.m-datatable__row').first());
				}
				if (options.layout.footer) {
					initCheckbox($(datatable.tableFoot).find('.m-datatable__row').first());
				}
			},

			/**
			 * Adjust width to match container size
			 */
			adjustCellsWidth: function() {
				// get table width
				var containerWidth = $(datatable.tableHead).width();

				// offset reserved for sort icon
				var sortOffset = 20;

				// get total number of columns
				var columns = $(datatable.tableHead).find('.m-datatable__row:first-child').find('.m-datatable__cell:visible').length;
				if (columns > 0) {
					//  remove reserved sort icon width
					containerWidth = containerWidth - (sortOffset * columns);
					var minWidth = Math.floor(containerWidth / columns);

					// minimum width
					if (minWidth <= Plugin.offset) {
						minWidth = Plugin.offset;
					}

					$(datatable.table).
						find('.m-datatable__row').
						find('.m-datatable__cell:visible').
						each(function(tdi, td) {
							var width = minWidth;
							var dataWidth = $(td).data('width');
							if (typeof dataWidth !== 'undefined') {
								width = dataWidth;
							}
							$(td).children().css('width', parseInt(width));
						});
				}

				return datatable;
			},

			/**
			 * Adjust height to match container size
			 */
			adjustCellsHeight: function() {
				$.each($(datatable.table).children(), function(part, tablePart) {
					var totalRows = $(tablePart).find('.m-datatable__row').first().parent().find('.m-datatable__row').length;
					for (var i = 1; i <= totalRows; i++) {
						var rows = $(tablePart).find('.m-datatable__row:nth-child(' + i + ')');
						if ($(rows).length > 0) {
							var maxHeight = Math.max.apply(null, $(rows).map(function() {
								return $(this).height();
							}).get());
							$(rows).css('height', Math.ceil(parseInt(maxHeight)));
						}
					}
				});
			},

			/**
			 * Setup table DOM and classes
			 */
			setupDOM: function(table) {
				// set table classes
				$(table).find('> thead').addClass('m-datatable__head');
				$(table).find('> tbody').addClass('m-datatable__body');
				$(table).find('> tfoot').addClass('m-datatable__foot');
				$(table).find('tr').addClass('m-datatable__row');
				$(table).find('tr > th, tr > td').addClass('m-datatable__cell');
				$(table).find('tr > th, tr > td').each(function(i, td) {
					if ($(td).find('span').length === 0) {
						$(td).wrapInner($('<span/>').css('width', Plugin.offset));
					}
				});
			},

			/**
			 * Default scrollbar
			 * @returns {{tableLocked: null, init: init, onScrolling: onScrolling}}
			 */
			scrollbar: function() {
				var scroll = {
					scrollable: null,
					tableLocked: null,
					mcsOptions: {
						scrollInertia: 0,
						autoDraggerLength: true,
						autoHideScrollbar: true,
						autoExpandScrollbar: false,
						alwaysShowScrollbar: 0,
						mouseWheel: {
							scrollAmount: 120,
							preventDefault: false,
						},
						advanced: {
							updateOnContentResize: true,
							autoExpandHorizontalScroll: true,
						},
						theme: 'minimal-dark',
					},
					init: function() {
						// destroy previous custom scrollbar
						Plugin.destroyScroller(scroll.scrollable);
						var screen = mUtil.getViewPort().width;
						// setup scrollable datatable
						if (options.layout.scroll) {
							// add scrollable datatable class
							$(datatable.wrap).addClass('m-datatable--scroll');

							var scrollable = $(datatable.tableBody).find('.m-datatable__lock--scroll');

							// check if scrollable area have rows
							if ($(scrollable).find('.m-datatable__row').length > 0 && $(scrollable).length > 0) {
								scroll.scrollHead = $(datatable.tableHead).find('> .m-datatable__lock--scroll > .m-datatable__row');
								scroll.scrollFoot = $(datatable.tableFoot).find('> .m-datatable__lock--scroll > .m-datatable__row');
								scroll.tableLocked = $(datatable.tableBody).find('.m-datatable__lock:not(.m-datatable__lock--scroll)');
								if (screen > mUtil.getBreakpoint('lg')) {
									scroll.mCustomScrollbar(scrollable);
								} else {
									scroll.defaultScrollbar(scrollable);
								}
							} else if ($(datatable.tableBody).find('.m-datatable__row').length > 0) {
								scroll.scrollHead = $(datatable.tableHead).find('> .m-datatable__row');
								scroll.scrollFoot = $(datatable.tableFoot).find('> .m-datatable__row');
								if (screen > mUtil.getBreakpoint('lg')) {
									scroll.mCustomScrollbar(datatable.tableBody);
								} else {
									scroll.defaultScrollbar(datatable.tableBody);
								}
							}
						} else {
							$(datatable.table).
								// css('height', 'auto').
								css('overflow-x', 'auto');
						}
					},
					defaultScrollbar: function(scrollable) {
						$(scrollable).
							css('overflow', 'auto').
							css('max-height', Plugin.getOption('layout.height')).
							on('scroll', scroll.onScrolling);
					},
					onScrolling: function(e) {
						var left = $(this).scrollLeft();
						var top = $(this).scrollTop();
						$(scroll.scrollHead).css('left', -left);
						$(scroll.scrollFoot).css('left', -left);
						$(scroll.tableLocked).each(function(i, table) {
							$(table).css('top', -top);
						});
					},
					mCustomScrollbar: function(scrollable) {
						scroll.scrollable = scrollable;
						var height = Plugin.getOption('layout.height');
						// vertical and horizontal scrollbar
						var axis = 'xy';
						if (height === null) {
							// horizontal scrollbar
							axis = 'x';
						}
						var mcsOptions = $.extend({}, scroll.mcsOptions, {
							axis: axis,
							setHeight: $(datatable.tableBody).height(),
							callbacks: {
								whileScrolling: function() {
									var mcs = this.mcs;
									$(scroll.scrollHead).css('left', mcs.left);
									$(scroll.scrollFoot).css('left', mcs.left);
									$(scroll.tableLocked).each(function(i, table) {
										$(table).css('top', mcs.top);
									});
									// stop hover when scrolling
									clearTimeout(Plugin.hoverTimer);
									Plugin.isScrolling = true;
								},
							},
						});

						if (Plugin.getOption('layout.smoothScroll.scrollbarShown') === true) {
							$(scrollable).attr('data-scrollbar-shown', 'true');
						}

						// create a new instance for table body with scrollbar
						Plugin.mCustomScrollbar(scrollable, mcsOptions);
					},
				};
				scroll.init();
				return scroll;
			},

			/**
			 * Init custom scrollbar and reset position
			 * @param element
			 * @param options
			 */
			mCustomScrollbar: function(element, options) {
				$(datatable.tableBody).css('overflow', '');
				// check if any custom scrollbar exist in the element
				Plugin.destroyScroller($(datatable.table).find('.mCustomScrollbar'));
				$(element).mCustomScrollbar(options);
			},

			/**
			 * Set column title from options.columns settings
			 */
			setHeadTitle: function(tablePart) {
				if (typeof tablePart === 'undefined') tablePart = datatable.tableHead;
				tablePart = $(tablePart)[0];
				var columns = options.columns;
				var row = tablePart.getElementsByTagName('tr')[0];
				var ths = tablePart.getElementsByTagName('td');

				if (typeof row === 'undefined') {
					row = document.createElement('tr');
					tablePart.appendChild(row);
				}

				$.each(columns, function(i, column) {
					var th = ths[i];
					if (typeof th === 'undefined') {
						th = document.createElement('th');
						row.appendChild(th);
					}

					// set column title
					if (typeof column['title'] !== 'undefined') {
						th.innerHTML = column.title;
						th.setAttribute('data-field', column.field);
						mUtil.addClass(th, column.class);
						$(th).data(column);
					}

					// set header attr option
					if (typeof column.attr !== 'undefined') {
						$.each(column.attr, function(key, val) {
							th.setAttribute(key, val);
						});
					}

					// apply text align to thead/tfoot
					if (typeof column.textAlign !== 'undefined') {
						var align = typeof datatable.textAlign[column.textAlign] !== 'undefined' ? datatable.textAlign[column.textAlign] : '';
						mUtil.addClass(th, align);
					}
				});
				Plugin.setupDOM(tablePart);
			},

			/**
			 * Initiate to get remote or local data via ajax
			 */
			dataRender: function(action) {
				$(datatable.table).
					siblings('.m-datatable__pager').
					removeClass('m-datatable--paging-loaded');

				var buildMeta = function() {
					datatable.dataSet = datatable.dataSet || [];
					Plugin.localDataUpdate();
					// local pagination meta
					var meta = Plugin.getDataSourceParam('pagination');
					if (meta.perpage === 0) {
						meta.perpage = options.data.pageSize || 10;
					}
					meta.total = datatable.dataSet.length;
					var start = Math.max(meta.perpage * (meta.page - 1), 0);
					var end = Math.min(start + meta.perpage, meta.total);
					datatable.dataSet = $(datatable.dataSet).slice(start, end);
					return meta;
				};

				var afterGetData = function(result) {
					var localPagingCallback = function(ctx, meta) {
						if (!$(ctx.pager).hasClass('m-datatable--paging-loaded')) {
							$(ctx.pager).remove();
							ctx.init(meta);
						}
						$(ctx.pager).off().on('m-datatable--on-goto-page', function(e) {
							$(ctx.pager).remove();
							ctx.init(meta);
						});

						var start = Math.max(meta.perpage * (meta.page - 1), 0);
						var end = Math.min(start + meta.perpage, meta.total);

						Plugin.localDataUpdate();
						datatable.dataSet = $(datatable.dataSet).slice(start, end);

						// insert data into table content
						Plugin.insertData();
					};

					$(datatable.wrap).removeClass('m-datatable--error');
					// pagination enabled
					if (options.pagination) {
						if (options.data.serverPaging && options.data.type !== 'local') {
							// server pagination
							var serverMeta = Plugin.getObject('meta', result || null);
							if (serverMeta !== null) {
								Plugin.paging(serverMeta);
							} else {
								// no meta object from server response, fallback to local pagination
								Plugin.paging(buildMeta(), localPagingCallback);
							}
						} else {
							// local pagination can be used by remote data also
							Plugin.paging(buildMeta(), localPagingCallback);
						}
					} else {
						// pagination is disabled
						Plugin.localDataUpdate();
					}
					// insert data into table content
					Plugin.insertData();
				};

				// get local datasource
				if (options.data.type === 'local'
					// for remote json datasource
					|| typeof options.data.source.read === 'undefined' &&
					datatable.dataSet !== null
					// for remote datasource, server sorting is disabled and data already received from remote
					|| options.data.serverSorting === false && action === 'sort'
					|| options.data.serverFiltering === false && action === 'search'
				) {
					afterGetData();
					return;
				}

				// getting data from remote only
				Plugin.getData().done(afterGetData);
			},

			/**
			 * Process ajax data
			 */
			insertData: function() {
				datatable.dataSet = datatable.dataSet || [];
				var params = Plugin.getDataSourceParam();

				// get row attributes
				var pagination = params.pagination;
				var start = (Math.max(pagination.page, 1) - 1) * pagination.perpage;
				var end = Math.min(pagination.page, pagination.pages) * pagination.perpage;
				var rowProps = {};
				if (typeof options.data.attr.rowProps !== 'undefined' && options.data.attr.rowProps.length) {
					rowProps = options.data.attr.rowProps.slice(start, end);
				}

				// todo; fix performance
				var tableBody = document.createElement('tbody');
				tableBody.style.visibility = 'hidden';
				var colLength = options.columns.length;

				$.each(datatable.dataSet, function(rowIndex, row) {
					var tr = document.createElement('tr');
					tr.setAttribute('data-row', rowIndex);
					// keep data object to row
					$(tr).data('obj', row);

					if (typeof rowProps[rowIndex] !== 'undefined') {
						$.each(rowProps[rowIndex], function() {
							tr.setAttribute(this.name, this.value);
						});
					}

					var cellIndex = 0;
					var tds = [];
					for (var a = 0; a < colLength; a += 1) {
						var column = options.columns[a];
						var classes = [];
						// add sorted class to cells
						if (Plugin.getObject('sort.field', params) === column.field) {
							classes.push('m-datatable__cell--sorted');
						}

						// apply text align
						if (typeof column.textAlign !== 'undefined') {
							var align = typeof datatable.textAlign[column.textAlign] !==
							'undefined' ? datatable.textAlign[column.textAlign] : '';
							classes.push(align);
						}

						// var classAttr = '';
						if (typeof column.class !== 'undefined') {
							classes.push(column.class);
						}

						var td = document.createElement('td');
						mUtil.addClass(td, classes.join(' '));
						td.setAttribute('data-field', column.field);
						td.innerHTML = Plugin.getObject(column.field, row);
						tr.appendChild(td);
					}

					tableBody.appendChild(tr);
				});

				// display no records message
				if (datatable.dataSet.length === 0) {
					Plugin.destroyScroller($(datatable.table).find('.mCustomScrollbar'));
					var errorSpan = document.createElement('span');
					mUtil.addClass(errorSpan, 'm-datatable--error');
					errorSpan.innerHTML = Plugin.getOption('translate.records.noRecords');
					tableBody.appendChild(errorSpan);
					$(datatable.wrap).addClass('m-datatable--error m-datatable--loaded');
					Plugin.spinnerCallback(false);
				}

				// replace existing table body
				$(datatable.tableBody).replaceWith(tableBody);
				datatable.tableBody = tableBody;

				// layout update
				Plugin.setupDOM(datatable.table);
				Plugin.setupCellField([datatable.tableBody]);
				Plugin.setupTemplateCell(datatable.tableBody);
				Plugin.layoutUpdate();
			},

			updateTableComponents: function() {
				datatable.tableHead = $(datatable.table).children('thead');
				datatable.tableBody = $(datatable.table).children('tbody');
				datatable.tableFoot = $(datatable.table).children('tfoot');
			},

			/**
			 * Call ajax for raw JSON data
			 */
			getData: function() {
				Plugin.spinnerCallback(true);

				var ajaxParams = {
					dataType: 'json',
					method: 'GET',
					data: {},
					timeout: Plugin.getOption('data.source.read.timeout') || 30000,
				};

				if (options.data.type === 'local') {
					ajaxParams.url = options.data.source;
				}

				if (options.data.type === 'remote') {
					ajaxParams.url = Plugin.getOption('data.source.read.url');
					if (typeof ajaxParams.url !== 'string') ajaxParams.url = Plugin.getOption('data.source.read');
					if (typeof ajaxParams.url !== 'string') ajaxParams.url = Plugin.getOption('data.source');
					ajaxParams.headers = Plugin.getOption('data.source.read.headers');
					ajaxParams.method = Plugin.getOption('data.source.read.method') || 'POST';

					var data = Plugin.getDataSourceParam();
					// remove if server params is not enabled
					if (!Plugin.getOption('data.serverPaging')) {
						delete data['pagination'];
					}
					if (!Plugin.getOption('data.serverSorting')) {
						delete data['sort'];
					}
					ajaxParams.data = $.extend(true, ajaxParams.data, data, Plugin.getOption('data.source.read.params'));
				}

				return $.ajax(ajaxParams).done(function(response, textStatus, jqXHR) {
					datatable.lastResponse = response;
					// extendible data map callback for custom datasource
					datatable.dataSet = datatable.originalDataSet = Plugin.dataMapCallback(response);
					Plugin.setAutoColumns();
					$(datatable).trigger('m-datatable--on-ajax-done', [datatable.dataSet]);
				}).fail(function(jqXHR, textStatus, errorThrown) {
					Plugin.destroyScroller($(datatable.table).find('.mCustomScrollbar'));
					$(datatable).trigger('m-datatable--on-ajax-fail', [jqXHR]);
					$(datatable.tableBody).html($('<span/>').
						addClass('m-datatable--error').
						html(Plugin.getOption('translate.records.noRecords')));
					$(datatable.wrap).addClass('m-datatable--error m-datatable--loaded');
					Plugin.spinnerCallback(false);
				}).always(function() {
				});
			},

			/**
			 * Pagination object
			 * @param meta if null, local pagination, otherwise remote pagination
			 * @param callback for update data when navigating page
			 */
			paging: function(meta, callback) {
				var pg = {
					meta: null,
					pager: null,
					paginateEvent: null,
					pagerLayout: {pagination: null, info: null},
					callback: null,
					init: function(meta) {
						pg.meta = meta;

						// todo; if meta object not exist will cause error
						// always recount total pages
						pg.meta.pages = Math.max(Math.ceil(pg.meta.total / pg.meta.perpage), 1);

						// current page must be not over than total pages
						if (pg.meta.page > pg.meta.pages) pg.meta.page = pg.meta.pages;

						// set unique event name between tables
						pg.paginateEvent = Plugin.getTablePrefix();

						pg.pager = $(datatable.table).siblings('.m-datatable__pager');
						if ($(pg.pager).hasClass('m-datatable--paging-loaded')) return;

						// if class .m-datatable--paging-loaded not exist, recreate pagination
						$(pg.pager).remove();

						// if no pages available
						if (pg.meta.pages === 0) return;

						// update datasource params
						Plugin.setDataSourceParam('pagination', {
							page: pg.meta.page,
							pages: pg.meta.pages,
							perpage: pg.meta.perpage,
							total: pg.meta.total,
						});

						// default callback function, contains remote pagination handler
						pg.callback = pg.serverCallback;
						// custom callback function
						if (typeof callback === 'function') pg.callback = callback;

						pg.addPaginateEvent();
						pg.populate();

						pg.meta.page = Math.max(pg.meta.page || 1, pg.meta.page);

						$(datatable).trigger(pg.paginateEvent, pg.meta);

						pg.pagingBreakpoint.call();
						$(window).resize(pg.pagingBreakpoint);
					},
					serverCallback: function(ctx, meta) {
						Plugin.dataRender();
					},
					populate: function() {
						var icons = Plugin.getOption('layout.icons.pagination');
						var title = Plugin.getOption('translate.toolbar.pagination.items.default');
						// pager root element
						pg.pager = $('<div/>').addClass('m-datatable__pager m-datatable--paging-loaded clearfix');
						// numbering links
						var pagerNumber = $('<ul/>').addClass('m-datatable__pager-nav');
						pg.pagerLayout['pagination'] = pagerNumber;

						// pager first/previous button
						$('<li/>').
							append($('<a/>').
								attr('title', title.first).
								addClass('m-datatable__pager-link m-datatable__pager-link--first').
								append($('<i/>').addClass(icons.first)).
								on('click', pg.gotoMorePage).
								attr('data-page', 1)).
							appendTo(pagerNumber);
						$('<li/>').
							append($('<a/>').
								attr('title', title.prev).
								addClass('m-datatable__pager-link m-datatable__pager-link--prev').
								append($('<i/>').addClass(icons.prev)).
								on('click', pg.gotoMorePage)).
							appendTo(pagerNumber);

						// more previous pages
						$('<li/>').
							append($('<a/>').
								attr('title', title.more).
								addClass('m-datatable__pager-link m-datatable__pager-link--more-prev').
								html($('<i/>').addClass(icons.more)).
								on('click', pg.gotoMorePage)).
							appendTo(pagerNumber);

						$('<li/>').
							append($('<input/>').
								attr('type', 'text').
								addClass('m-pager-input form-control').
								attr('title', title.input).
								on('keyup', function() {
									// on keyup update [data-page]
									$(this).attr('data-page', Math.abs($(this).val()));
								}).
								on('keypress', function(e) {
									// on keypressed enter button
									if (e.which === 13) pg.gotoMorePage(e);
								})).
							appendTo(pagerNumber);

						var pagesNumber = Plugin.getOption('toolbar.items.pagination.pages.desktop.pagesNumber');
						var end = Math.ceil(pg.meta.page / pagesNumber) * pagesNumber;
						var start = end - pagesNumber;
						if (end > pg.meta.pages) {
							end = pg.meta.pages;
						}
						for (var x = start; x < end; x++) {
							var pageNumber = x + 1;
							$('<li/>').
								append($('<a/>').
									addClass('m-datatable__pager-link m-datatable__pager-link-number').
									text(pageNumber).
									attr('data-page', pageNumber).
									attr('title', pageNumber).
									on('click', pg.gotoPage)).
								appendTo(pagerNumber);
						}

						// more next pages
						$('<li/>').
							append($('<a/>').
								attr('title', title.more).
								addClass('m-datatable__pager-link m-datatable__pager-link--more-next').
								html($('<i/>').addClass(icons.more)).
								on('click', pg.gotoMorePage)).
							appendTo(pagerNumber);

						// pager next/last button
						$('<li/>').
							append($('<a/>').
								attr('title', title.next).
								addClass('m-datatable__pager-link m-datatable__pager-link--next').
								append($('<i/>').addClass(icons.next)).
								on('click', pg.gotoMorePage)).
							appendTo(pagerNumber);
						$('<li/>').
							append($('<a/>').
								attr('title', title.last).
								addClass('m-datatable__pager-link m-datatable__pager-link--last').
								append($('<i/>').addClass(icons.last)).
								on('click', pg.gotoMorePage).
								attr('data-page', pg.meta.pages)).
							appendTo(pagerNumber);

						// page info
						if (Plugin.getOption('toolbar.items.info')) {
							pg.pagerLayout['info'] = $('<div/>').
								addClass('m-datatable__pager-info').
								append($('<span/>').addClass('m-datatable__pager-detail'));
						}

						$.each(Plugin.getOption('toolbar.layout'), function(i, layout) {
							$(pg.pagerLayout[layout]).appendTo(pg.pager);
						});

						// page size select
						var pageSizeSelect = $('<select/>').
							addClass('selectpicker m-datatable__pager-size').
							attr('title', Plugin.getOption('translate.toolbar.pagination.items.default.select')).
							attr('data-width', '70px').
							val(pg.meta.perpage).
							on('change', pg.updatePerpage).
							prependTo(pg.pagerLayout['info']);

						var pageSizes = Plugin.getOption('toolbar.items.pagination.pageSizeSelect');
						// default value here, to fix override option by user
						if (pageSizes.length === 0) pageSizes = [10, 20, 30, 50, 100];
						$.each(pageSizes, function(i, size) {
							var display = size;
							if (size === -1) display = 'All';
							$('<option/>').
								attr('value', size).
								html(display).
								appendTo(pageSizeSelect);
						});

						// init selectpicker to dropdown
						$(datatable).ready(function() {
							$('.selectpicker').
								selectpicker().
								siblings('.dropdown-toggle').
								attr('title', Plugin.getOption(
									'translate.toolbar.pagination.items.default.select'));
						});

						pg.paste();
					},
					paste: function() {
						// insert pagination based on placement position, top|bottom
						$.each($.unique(Plugin.getOption('toolbar.placement')),
							function(i, position) {
								if (position === 'bottom') {
									$(pg.pager).clone(true).insertAfter(datatable.table);
								}
								if (position === 'top') {
									// pager top need some extra space
									$(pg.pager).
										clone(true).
										addClass('m-datatable__pager--top').
										insertBefore(datatable.table);
								}
							});
					},
					gotoMorePage: function(e) {
						e.preventDefault();
						// $(this) is a link of .m-datatable__pager-link

						if ($(this).attr('disabled') === 'disabled') return false;

						var page = $(this).attr('data-page');

						// event from text input
						if (typeof page === 'undefined') {
							page = $(e.target).attr('data-page');
						}

						pg.openPage(parseInt(page));
						return false;
					},
					gotoPage: function(e) {
						e.preventDefault();
						// prevent from click same page number
						if ($(this).hasClass('m-datatable__pager-link--active')) return;

						pg.openPage(parseInt($(this).data('page')));
					},
					openPage: function(page) {
						// currentPage is 1-based index
						pg.meta.page = parseInt(page);

						$(datatable).trigger(pg.paginateEvent, pg.meta);
						pg.callback(pg, pg.meta);

						// update page callback function
						$(pg.pager).trigger('m-datatable--on-goto-page', pg.meta);
					},
					updatePerpage: function(e) {
						e.preventDefault();
						if (Plugin.getOption('layout.height') === null) {
							// fix white space, when perpage is set from many records to less records
							$('html, body').animate({scrollTop: $(datatable).position().top});
						}

						pg.pager = $(datatable.table).
							siblings('.m-datatable__pager').
							removeClass('m-datatable--paging-loaded');

						// on change select page size
						if (e.originalEvent) {
							pg.meta.perpage = parseInt($(this).val());
						}

						$(pg.pager).
							find('select.m-datatable__pager-size').
							val(pg.meta.perpage).
							attr('data-selected', pg.meta.perpage);

						// update datasource params
						Plugin.setDataSourceParam('pagination', {
							page: pg.meta.page,
							pages: pg.meta.pages,
							perpage: pg.meta.perpage,
							total: pg.meta.total,
						});

						// update page callback function
						$(pg.pager).trigger('m-datatable--on-update-perpage', pg.meta);
						$(datatable).trigger(pg.paginateEvent, pg.meta);
						pg.callback(pg, pg.meta);

						// update pagination info
						pg.updateInfo.call();
					},
					addPaginateEvent: function(e) {
						// pagination event
						$(datatable).
							off(pg.paginateEvent).
							on(pg.paginateEvent, function(e, meta) {
								Plugin.spinnerCallback(true);

								pg.pager = $(datatable.table).siblings('.m-datatable__pager');
								var pagerNumber = $(pg.pager).find('.m-datatable__pager-nav');

								// set sync active page class
								$(pagerNumber).
									find('.m-datatable__pager-link--active').
									removeClass('m-datatable__pager-link--active');
								$(pagerNumber).
									find('.m-datatable__pager-link-number[data-page="' + meta.page + '"]').
									addClass('m-datatable__pager-link--active');

								// set next and previous link page number
								$(pagerNumber).
									find('.m-datatable__pager-link--prev').
									attr('data-page', Math.max(meta.page - 1, 1));
								$(pagerNumber).
									find('.m-datatable__pager-link--next').
									attr('data-page', Math.min(meta.page + 1, meta.pages));

								// current page input value sync
								$(pg.pager).each(function() {
									$(this).
										find('.m-pager-input[type="text"]').
										prop('value', meta.page);
								});

								$(pg.pager).find('.m-datatable__pager-nav').show();
								if (meta.pages <= 1) {
									// hide pager if has 1 page
									$(pg.pager).find('.m-datatable__pager-nav').hide();
								}

								// update datasource params
								Plugin.setDataSourceParam('pagination', {
									page: pg.meta.page,
									pages: pg.meta.pages,
									perpage: pg.meta.perpage,
									total: pg.meta.total,
								});

								$(pg.pager).
									find('select.m-datatable__pager-size').
									val(meta.perpage).
									attr('data-selected', meta.perpage);

								// clear active rows
								$(datatable.table).
									find('.m-checkbox > [type="checkbox"]').
									prop('checked', false);
								$(datatable.table).
									find('.m-datatable__row--active').
									removeClass('m-datatable__row--active');

								pg.updateInfo.call();
								pg.pagingBreakpoint.call();
								// Plugin.resetScroll();
							});
					},
					updateInfo: function() {
						var start = Math.max(pg.meta.perpage * (pg.meta.page - 1) + 1, 1);
						var end = Math.min(start + pg.meta.perpage - 1, pg.meta.total);
						// page info update
						$(pg.pager).
							find('.m-datatable__pager-info').
							find('.m-datatable__pager-detail').
							html(Plugin.dataPlaceholder(
								Plugin.getOption('translate.toolbar.pagination.items.info'), {
									start: start,
									end: pg.meta.perpage === -1 ? pg.meta.total : end,
									pageSize: pg.meta.perpage === -1 ||
									pg.meta.perpage >= pg.meta.total
										? pg.meta.total
										: pg.meta.perpage,
									total: pg.meta.total,
								}));
					},

					/**
					 * Update pagination layout breakpoint
					 */
					pagingBreakpoint: function() {
						// keep page links reference
						var pagerNumber = $(datatable.table).
							siblings('.m-datatable__pager').
							find('.m-datatable__pager-nav');
						if ($(pagerNumber).length === 0) return;

						var currentPage = Plugin.getCurrentPage();
						var pagerInput = $(pagerNumber).
							find('.m-pager-input').
							closest('li');

						// reset
						$(pagerNumber).find('li').show();

						// pagination update
						$.each(Plugin.getOption('toolbar.items.pagination.pages'),
							function(mode, option) {
								if (mUtil.isInResponsiveRange(mode)) {
									switch (mode) {
										case 'desktop':
										case 'tablet':
											var end = Math.ceil(currentPage / option.pagesNumber) *
												option.pagesNumber;
											var start = end - option.pagesNumber;
											$(pagerInput).hide();
											pg.meta = Plugin.getDataSourceParam('pagination');
											pg.paginationUpdate();
											break;

										case 'mobile':
											$(pagerInput).show();
											$(pagerNumber).
												find('.m-datatable__pager-link--more-prev').
												closest('li').
												hide();
											$(pagerNumber).
												find('.m-datatable__pager-link--more-next').
												closest('li').
												hide();
											$(pagerNumber).
												find('.m-datatable__pager-link-number').
												closest('li').
												hide();
											break;
									}

									return false;
								}
							});
					},

					/**
					 * Update pagination number and button display
					 */
					paginationUpdate: function() {
						var pager = $(datatable.table).
								siblings('.m-datatable__pager').
								find('.m-datatable__pager-nav'),
							pagerMorePrev = $(pager).
								find('.m-datatable__pager-link--more-prev'),
							pagerMoreNext = $(pager).
								find('.m-datatable__pager-link--more-next'),
							pagerFirst = $(pager).find('.m-datatable__pager-link--first'),
							pagerPrev = $(pager).find('.m-datatable__pager-link--prev'),
							pagerNext = $(pager).find('.m-datatable__pager-link--next'),
							pagerLast = $(pager).find('.m-datatable__pager-link--last');

						// get visible page
						var pagerNumber = $(pager).find('.m-datatable__pager-link-number');
						// get page before of first visible
						var morePrevPage = Math.max($(pagerNumber).first().data('page') - 1,
							1);
						$(pagerMorePrev).each(function(i, prev) {
							$(prev).attr('data-page', morePrevPage);
						});
						// show/hide <li>
						if (morePrevPage === 1) {
							$(pagerMorePrev).parent().hide();
						} else {
							$(pagerMorePrev).parent().show();
						}

						// get page after of last visible
						var moreNextPage = Math.min($(pagerNumber).last().data('page') + 1,
							pg.meta.pages);
						$(pagerMoreNext).each(function(i, prev) {
							$(pagerMoreNext).attr('data-page', moreNextPage).show();
						});

						// show/hide <li>
						if (moreNextPage === pg.meta.pages
							// missing dot fix when last hidden page is one left
							&& moreNextPage === $(pagerNumber).last().data('page')) {
							$(pagerMoreNext).parent().hide();
						} else {
							$(pagerMoreNext).parent().show();
						}

						// begin/end of pages
						if (pg.meta.page === 1) {
							$(pagerFirst).
								attr('disabled', true).
								addClass('m-datatable__pager-link--disabled');
							$(pagerPrev).
								attr('disabled', true).
								addClass('m-datatable__pager-link--disabled');
						} else {
							$(pagerFirst).
								removeAttr('disabled').
								removeClass('m-datatable__pager-link--disabled');
							$(pagerPrev).
								removeAttr('disabled').
								removeClass('m-datatable__pager-link--disabled');
						}
						if (pg.meta.page === pg.meta.pages) {
							$(pagerNext).
								attr('disabled', true).
								addClass('m-datatable__pager-link--disabled');
							$(pagerLast).
								attr('disabled', true).
								addClass('m-datatable__pager-link--disabled');
						} else {
							$(pagerNext).
								removeAttr('disabled').
								removeClass('m-datatable__pager-link--disabled');
							$(pagerLast).
								removeAttr('disabled').
								removeClass('m-datatable__pager-link--disabled');
						}

						// display more buttons
						var nav = Plugin.getOption('toolbar.items.pagination.navigation');
						if (!nav.first) $(pagerFirst).remove();
						if (!nav.prev) $(pagerPrev).remove();
						if (!nav.next) $(pagerNext).remove();
						if (!nav.last) $(pagerLast).remove();
					},
				};
				pg.init(meta);
				return pg;
			},

			/**
			 * Hide/show table cell defined by
			 * options[columns][i][responsive][visible/hidden]
			 */
			columnHide: function() {
				var screen = mUtil.getViewPort().width;
				// foreach columns setting
				$.each(options.columns, function(i, column) {
					if (typeof column.responsive !== 'undefined') {
						var field = column.field;
						var tds = $.grep($(datatable.table).find('.m-datatable__cell'), function(n, i) {
							return field === $(n).data('field');
						});
						if (mUtil.getBreakpoint(column.responsive.hidden) >= screen) {
							$(tds).hide();
						} else {
							$(tds).show();
						}
						if (mUtil.getBreakpoint(column.responsive.visible) <= screen) {
							$(tds).show();
						} else {
							$(tds).hide();
						}
					}
				});
			},

			/**
			 * Setup sub datatable
			 */
			setupSubDatatable: function() {
				var subTableCallback = Plugin.getOption('detail.content');
				if (typeof subTableCallback !== 'function') return;

				// subtable already exist
				if ($(datatable.table).find('.m-datatable__subtable').length > 0) return;

				$(datatable.wrap).addClass('m-datatable--subtable');

				options.columns[0]['subtable'] = true;

				// toggle on open sub table
				var toggleSubTable = function(e) {
					e.preventDefault();
					// get parent row of this subtable
					var parentRow = $(this).closest('.m-datatable__row');

					// get subtable row for sub table
					var subTableRow = $(parentRow).next('.m-datatable__row-subtable');
					if ($(subTableRow).length === 0) {
						// prepare DOM for sub table, each <tr> as parent and add <tr> as child table
						subTableRow = $('<tr/>').
							addClass('m-datatable__row-subtable m-datatable__row-loading').
							hide().
							append($('<td/>').
								addClass('m-datatable__subtable').
								attr('colspan', Plugin.getTotalColumns()));
						$(parentRow).after(subTableRow);
						// add class to even row
						if ($(parentRow).hasClass('m-datatable__row--even')) {
							$(subTableRow).addClass('m-datatable__row-subtable--even');
						}
					}

					$(subTableRow).toggle();

					var subTable = $(subTableRow).find('.m-datatable__subtable');

					// get id from first column of parent row
					var primaryKey = $(this).
						closest('[data-field]:first-child').
						find('.m-datatable__toggle-subtable').
						data('value');

					var icon = $(this).find('i').removeAttr('class');

					// prevent duplicate datatable init
					if ($(parentRow).hasClass('m-datatable__row--subtable-expanded')) {
						$(icon).addClass(Plugin.getOption('layout.icons.rowDetail.collapse'));
						// remove expand class from parent row
						$(parentRow).removeClass('m-datatable__row--subtable-expanded');
						// trigger event on collapse
						$(datatable).trigger('m-datatable--on-collapse-subtable', [parentRow]);
					} else {
						// expand and run callback function
						$(icon).addClass(Plugin.getOption('layout.icons.rowDetail.expand'));
						// add expand class to parent row
						$(parentRow).addClass('m-datatable__row--subtable-expanded');
						// trigger event on expand
						$(datatable).trigger('m-datatable--on-expand-subtable', [parentRow]);
					}

					// prevent duplicate datatable init
					if ($(subTable).find('.m-datatable').length === 0) {
						// get data by primary id
						$.map(datatable.dataSet, function(n, i) {
						  // primary id must be at the first column, otherwise e.data will be undefined
							if (primaryKey === n[options.columns[0].field]) {
								e.data = n;
								return true;
							}
							return false;
						});

						// deprecated in v5.0.6
						e.detailCell = subTable;

						e.parentRow = parentRow;
						e.subTable = subTable;

						// run callback with event
						subTableCallback(e);

						$(subTable).children('.m-datatable').on('m-datatable--on-init', function(e) {
							$(subTableRow).removeClass('m-datatable__row-loading');
						});
						if (Plugin.getOption('data.type') === 'local') {
							$(subTableRow).removeClass('m-datatable__row-loading');
						}
					}
				};

				var columns = options.columns;
				$(datatable.tableBody).
					find('.m-datatable__row').
					each(function(tri, tr) {
						$(tr).find('.m-datatable__cell').each(function(tdi, td) {
							// get column settings by field
							var column = $.grep(columns, function(n, i) {
								return $(td).data('field') === n.field;
							})[0];
							if (typeof column !== 'undefined') {
								var value = $(td).text();
								// enable column subtable toggle
								if (typeof column.subtable !== 'undefined' && column.subtable) {
									// check if subtable toggle exist
									if ($(td).find('.m-datatable__toggle-subtable').length > 0) return;
									// append subtable toggle
									$(td).html($('<a/>').
										addClass('m-datatable__toggle-subtable').
										attr('href', '#').
										attr('data-value', value).
										attr('title', Plugin.getOption('detail.title')).
										on('click', toggleSubTable).
										append($('<i/>').
											css('width', $(td).data('width')).
											addClass(Plugin.getOption('layout.icons.rowDetail.collapse'))));
								}
							}
						});
					});

				// $(datatable.tableHead).find('.m-datatable__row').first()
			},

			/**
			 * Datasource mapping callback
			 */
			dataMapCallback: function(raw) {
				// static dataset array
				var dataSet = raw;
				// dataset mapping callback
				if (typeof Plugin.getOption('data.source.read.map') === 'function') {
					return Plugin.getOption('data.source.read.map')(raw);
				} else {
					// default data mapping fallback
					if (typeof raw !== 'undefined' && typeof raw.data !== 'undefined') {
						dataSet = raw.data;
					}
				}
				return dataSet;
			},

			isSpinning: false,
			/**
			 * BlockUI spinner callback
			 * @param block
			 */
			spinnerCallback: function(block) {
				if (block) {
					if (!Plugin.isSpinning) {
						// get spinner options
						var spinnerOptions = Plugin.getOption('layout.spinner');
						if (spinnerOptions.message === true) {
							// use default spinner message from translation
							spinnerOptions.message = Plugin.getOption('translate.records.processing');
						}
						Plugin.isSpinning = true;
						if (typeof mApp !== 'undefined') {
							mApp.block(datatable, spinnerOptions);
						}
					}
				} else {
					Plugin.isSpinning = false;
					if (typeof mApp !== 'undefined') {
						mApp.unblock(datatable);
					}
				}
			},

			/**
			 * Default sort callback function
			 * @param data
			 * @param sort
			 * @param column
			 * @returns {*|Array.<T>|{sort, field}|{asc, desc}}
			 */
			sortCallback: function(data, sort, column) {
				var type = column['type'] || 'string';
				var format = column['format'] || '';
				var field = column['field'];

				return $(data).sort(function(a, b) {
					var aField = a[field];
					var bField = b[field];

					switch (type) {
						case 'date':
							if(typeof moment === 'undefined') {
                throw new Error('Moment.js is required.');
              }
							var diff = moment(aField, format).diff(moment(bField, format));
							if (sort === 'asc') {
								return diff > 0 ? 1 : diff < 0 ? -1 : 0;
							} else {
								return diff < 0 ? 1 : diff > 0 ? -1 : 0;
							}
							break;

						case 'number':
							if (isNaN(parseFloat(aField)) && aField != null) {
								aField = Number(aField.replace(/[^0-9\.-]+/g, ''));
							}
							if (isNaN(parseFloat(bField)) && bField != null) {
								bField = Number(bField.replace(/[^0-9\.-]+/g, ''));
							}
							aField = parseFloat(aField);
							bField = parseFloat(bField);
							if (sort === 'asc') {
								return aField > bField ? 1 : aField < bField ? -1 : 0;
							} else {
								return aField < bField ? 1 : aField > bField ? -1 : 0;
							}
							break;

						case 'string':
						default:
							if (sort === 'asc') {
								return aField > bField ? 1 : aField < bField ? -1 : 0;
							} else {
								return aField < bField ? 1 : aField > bField ? -1 : 0;
							}
							break;
					}
				});
			},

			/**
			 * Custom debug log
			 * @param text
			 * @param obj
			 */
			log: function(text, obj) {
				if (typeof obj === 'undefined') obj = '';
				if (datatable.debug) {
					console.log(text, obj);
				}
			},

			/**
			 * Auto hide columnds overflow in row
			 */
			autoHide: function() {
				$(datatable.table).find('.m-datatable__cell').show();
				$(datatable.tableBody).each(function() {
					while ($(this)[0].offsetWidth < $(this)[0].scrollWidth) {
						$(datatable.table).find('.m-datatable__row').each(function(i) {
							var cell = $(this).find('.m-datatable__cell').not(':hidden').last();
							$(cell).hide();
						});
						Plugin.adjustCellsWidth.call();
					}
				});

				var toggleHiddenColumns = function(e) {
					e.preventDefault();

					var row = $(this).closest('.m-datatable__row');
					var detailRow = $(row).next();

					if (!$(detailRow).hasClass('m-datatable__row-detail')) {
						$(this).find('i').
							removeClass(Plugin.getOption('layout.icons.rowDetail.collapse')).
							addClass(Plugin.getOption('layout.icons.rowDetail.expand'));

						var hidden = $(row).find('.m-datatable__cell:hidden').clone().show();

						detailRow = $('<tr/>').addClass('m-datatable__row-detail').insertAfter(row);
						var detailRowTd = $('<td/>').
							addClass('m-datatable__detail').
							attr('colspan', Plugin.getTotalColumns()).appendTo(detailRow);

						var detailSubTable = $('<table/>');
						$(hidden).each(function() {
							var field = $(this).data('field');
							var column = $.grep(options.columns, function(n, i) {
								return field === n.field;
							})[0];
							$(detailSubTable).
								append($('<tr class="m-datatable__row"></tr>').
									append($('<td class="m-datatable__cell"></td>').
										append($('<span/>').
											css('width', Plugin.offset).
											append(column.title))).
									append(this));
						});
						$(detailRowTd).append(detailSubTable);

					} else {
						$(this).find('i').
							removeClass(Plugin.getOption('layout.icons.rowDetail.expand')).
							addClass(Plugin.getOption('layout.icons.rowDetail.collapse'));
						$(detailRow).remove();
					}
				};

				// toggle show hidden columns
				$(datatable.tableBody).find('.m-datatable__row').each(function() {
					$(this).prepend($('<td/>').addClass('m-datatable__cell m-datatable__toggle--detail').
						append($('<a/>').
							addClass('m-datatable__toggle-detail').
							attr('href', '#').
							on('click', toggleHiddenColumns).
							append($('<i/>').
								css('width', '21px').// maintain width for both icons expand and collapse
								addClass(Plugin.getOption('layout.icons.rowDetail.collapse')))));

					// check if subtable toggle exist
					if ($(datatable.tableHead).find('.m-datatable__toggle-detail').length === 0) {
						$(datatable.tableHead).
							find('.m-datatable__row').
							first().
							prepend('<th class="m-datatable__cell m-datatable__toggle-detail"><span style="width: 21px"></span></th>');
						$(datatable.tableFoot).
							find('.m-datatable__row').
							first().
							prepend('<th class="m-datatable__cell m-datatable__toggle-detail"><span style="width: 21px"></span></th>');
					} else {
						$(datatable.tableHead).find('.m-datatable__toggle-detail').find('span').css('width', '21px');
					}
				});
			},

			/**
			 * todo; implement hover column
			 */
			hoverColumn: function() {
				$(datatable.tableBody).on('mouseenter', '.m-datatable__cell', function() {
					var colIdx = $(Plugin.cell(this).nodes()).index();
					$(Plugin.cells().nodes()).removeClass('m-datatable__cell--hover');
					$(Plugin.column(colIdx).nodes()).addClass('m-datatable__cell--hover');
				});
			},

			/**
			 * To enable auto columns features for remote data source
			 */
			setAutoColumns: function() {
				if (Plugin.getOption('data.autoColumns')) {
					$.each(datatable.dataSet[0], function(k, v) {
						var found = $.grep(options.columns, function(n, i) {
							return k === n.field;
						});
						if (found.length === 0) {
							options.columns.push({field: k, title: k});
						}
					});
					$(datatable.tableHead).find('.m-datatable__row').remove();
					Plugin.setHeadTitle();
					if (Plugin.getOption('layout.footer')) {
						$(datatable.tableFoot).find('.m-datatable__row').remove();
						Plugin.setHeadTitle(datatable.tableFoot);
					}
				}
			},

			/********************
			 ** HELPERS
			 ********************/

			/**
			 * Check if table is a locked colums table
			 */
			isLocked: function() {
				return $(datatable.wrap).hasClass('m-datatable--lock') || false;
			},

			/**
			 * Insert html into table content, take count mCustomScrollbar DOM to
			 * prevent replace
			 * @param html
			 * @param tablePart
			 */
			replaceTableContent: function(html, tablePart) {
				if (typeof tablePart === 'undefined') tablePart = datatable.tableBody;
				if ($(tablePart).hasClass('mCustomScrollbar')) {
					$(tablePart).find('.mCSB_container').html(html);
				} else {
					$(tablePart).html(html);
				}
			},

			/**
			 * Get total extra space of an element for width calculation, including
			 * padding, margin, border
			 * @param element
			 * @returns {number}
			 */
			getExtraSpace: function(element) {
				var padding = parseInt($(element).css('paddingRight')) +
					parseInt($(element).css('paddingLeft'));
				var margin = parseInt($(element).css('marginRight')) +
					parseInt($(element).css('marginLeft'));
				var border = Math.ceil(
					$(element).css('border-right-width').replace('px', ''));
				return padding + margin + border;
			},

			/**
			 * Insert data of array into {{ }} template placeholder
			 * @param template
			 * @param data
			 * @returns {*}
			 */
			dataPlaceholder: function(template, data) {
				var result = template;
				$.each(data, function(key, val) {
					result = result.replace('{{' + key + '}}', val);
				});
				return result;
			},

			/**
			 * Get table unique ID
			 * Note: table unique change each time refreshed
			 * @param suffix
			 * @returns {*}
			 */
			getTableId: function(suffix) {
				if (typeof suffix === 'undefined') suffix = '';
				var id = $(datatable).attr('id');
				if (typeof id === 'undefined') {
					id = $(datatable).attr('class').split(' ')[0];
				}
				return id + suffix;
			},

			/**
			 * Get table prefix with depth number
			 */
			getTablePrefix: function(suffix) {
				if (typeof suffix !== 'undefined') suffix = '-' + suffix;
				return Plugin.getTableId() + '-' + Plugin.getDepth() + suffix;
			},

			/**
			 * Get current table depth of sub table
			 * @returns {number}
			 */
			getDepth: function() {
				var depth = 0;
				var table = datatable.table;
				do {
					table = $(table).parents('.m-datatable__table');
					depth++;
				} while ($(table).length > 0);
				return depth;
			},

			/**
			 * Keep state item
			 * @param key
			 * @param value
			 */
			stateKeep: function(key, value) {
				key = Plugin.getTablePrefix(key);
				if (Plugin.getOption('data.saveState') === false) return;
				if (Plugin.getOption('data.saveState.webstorage') && localStorage) {
					localStorage.setItem(key, JSON.stringify(value));
				}
				if (Plugin.getOption('data.saveState.cookie')) {
					Cookies.set(key, JSON.stringify(value));
				}
			},

			/**
			 * Get state item
			 * @param key
			 * @param defValue
			 */
			stateGet: function(key, defValue) {
				key = Plugin.getTablePrefix(key);
				if (Plugin.getOption('data.saveState') === false) return;
				var value = null;
				if (Plugin.getOption('data.saveState.webstorage') && localStorage) {
					value = localStorage.getItem(key);
				} else {
					value = Cookies.get(key);
				}
				if (typeof value !== 'undefined' && value !== null) {
					return JSON.parse(value);
				}
			},

			/**
			 * Update data in state without clear existing
			 * @param key
			 * @param value
			 */
			stateUpdate: function(key, value) {
				var ori = Plugin.stateGet(key);
				if (typeof ori === 'undefined' || ori === null) ori = {};
				Plugin.stateKeep(key, $.extend({}, ori, value));
			},

			/**
			 * Remove state item
			 * @param key
			 */
			stateRemove: function(key) {
				key = Plugin.getTablePrefix(key);
				if (localStorage) {
					localStorage.removeItem(key);
				}
				Cookies.remove(key);
			},

			/**
			 * Get total columns.
			 */
			getTotalColumns: function(tablePart) {
				if (typeof tablePart === 'undefined') tablePart = datatable.tableBody;
				return $(tablePart).
					find('.m-datatable__row').
					first().
					find('.m-datatable__cell').length;
			},

			/**
			 * Get table row. Useful to get row when current table is in lock mode.
			 * Can be used for both lock and normal table mode.
			 * By default, returning result will be in a list of <td>.
			 * @param tablePart
			 * @param row 1-based index
			 * @param tdOnly Optional. Default true
			 * @returns {*}
			 */
			getOneRow: function(tablePart, row, tdOnly) {
				if (typeof tdOnly === 'undefined') tdOnly = true;
				// get list of <tr>
				var result = $(tablePart).find('.m-datatable__row:not(.m-datatable__row-detail):nth-child(' + row + ')');
				if (tdOnly) {
					// get list of <td> or <th>
					result = result.find('.m-datatable__cell');
				}
				return result;
			},

			/**
			 * Check if element has vertical overflow
			 * @param element
			 * @returns {boolean}
			 */
			hasOverflowY: function(element) {
				var children = $(element).find('.m-datatable__row');
				var maxHeight = 0;

				if (children.length > 0) {
					$(children).each(function(tdi, td) {
						maxHeight += Math.floor($(td).innerHeight());
					});

					return maxHeight > $(element).innerHeight();
				}

				return false;
			},

			/**
			 * Sort table row at HTML level by column index.
			 * todo; Not in use.
			 * @param header Header sort clicked
			 * @param sort asc|desc. Optional. Default asc
			 * @param int Boolean. Optional. Comparison value parse to integer.
			 *     Default false
			 */
			sortColumn: function(header, sort, int) {
				if (typeof sort === 'undefined') sort = 'asc'; // desc
				if (typeof int === 'undefined') int = false;

				var column = $(header).index();
				var rows = $(datatable.tableBody).find('.m-datatable__row');
				var hIndex = $(header).closest('.m-datatable__lock').index();
				if (hIndex !== -1) {
					rows = $(datatable.tableBody).
						find('.m-datatable__lock:nth-child(' + (hIndex + 1) + ')').
						find('.m-datatable__row');
				}

				var container = $(rows).parent();
				$(rows).sort(function(a, b) {
					var tda = $(a).find('td:nth-child(' + column + ')').text();
					var tdb = $(b).find('td:nth-child(' + column + ')').text();

					if (int) {
						// useful for integer type sorting
						tda = parseInt(tda);
						tdb = parseInt(tdb);
					}

					if (sort === 'asc') {
						return tda > tdb ? 1 : tda < tdb ? -1 : 0;
					} else {
						return tda < tdb ? 1 : tda > tdb ? -1 : 0;
					}
				}).appendTo(container);
			},

			/**
			 * Perform sort remote and local
			 */
			sorting: function() {
				var sortObj = {
					init: function() {
						if (options.sortable) {
							$(datatable.tableHead).
								find('.m-datatable__cell:not(.m-datatable__cell--check)').
								addClass('m-datatable__cell--sort').
								off('click').
								on('click', sortObj.sortClick);
							// first init
							sortObj.setIcon();
						}
					},
					setIcon: function() {
						var meta = Plugin.getDataSourceParam('sort');
						if ($.isEmptyObject(meta)) return;

						// sort icon beside column header
						var td = $(datatable.tableHead).
							find('.m-datatable__cell[data-field="' + meta.field + '"]').
							attr('data-sort', meta.sort);
						var sorting = $(td).find('span');
						var icon = $(sorting).find('i');

						var icons = Plugin.getOption('layout.icons.sort');
						// update sort icon; desc & asc
						if ($(icon).length > 0) {
							$(icon).removeAttr('class').addClass(icons[meta.sort]);
						} else {
							$(sorting).append($('<i/>').addClass(icons[meta.sort]));
						}
					},
					sortClick: function(e) {
						var meta = Plugin.getDataSourceParam('sort');
						var field = $(this).data('field');
						var column = Plugin.getColumnByField(field);
						// sort is disabled for this column
						if (typeof column.sortable !== 'undefined' &&
							column.sortable === false) return;

						$(datatable.tableHead).
							find('.m-datatable__cell > span > i').
							remove();

						if (options.sortable) {
							Plugin.spinnerCallback(true);

							var sort = 'desc';
							if (Plugin.getObject('field', meta) === field) {
								sort = Plugin.getObject('sort', meta);
							}

							// toggle sort
							sort = typeof sort === 'undefined' || sort === 'desc'
								? 'asc'
								: 'desc';

							// update field and sort params
							meta = {field: field, sort: sort};
							Plugin.setDataSourceParam('sort', meta);

							sortObj.setIcon();

							setTimeout(function() {
								Plugin.dataRender('sort');
								$(datatable).trigger('m-datatable--on-sort', meta);
							}, 300);
						}
					},
				};
				sortObj.init();
			},

			/**
			 * Update JSON data list linked with sort, filter and pagination.
			 * Call this method, before using dataSet variable.
			 * @returns {*|null}
			 */
			localDataUpdate: function() {
				// todo; fix twice execution
				var params = Plugin.getDataSourceParam();
				if (typeof datatable.originalDataSet === 'undefined') {
					datatable.originalDataSet = datatable.dataSet;
				}

				var field = Plugin.getObject('sort.field', params);
				var sort = Plugin.getObject('sort.sort', params);
				var column = Plugin.getColumnByField(field);
				if (typeof column !== 'undefined' && Plugin.getOption('data.serverSorting') !== true) {
					if (typeof column.sortCallback === 'function') {
						datatable.dataSet = column.sortCallback(datatable.originalDataSet, sort, column);
					} else {
						datatable.dataSet = Plugin.sortCallback(datatable.originalDataSet, sort, column);
					}
				} else {
					datatable.dataSet = datatable.originalDataSet;
				}

				// if server filter enable, don't pass local filter
				if (typeof params.query === 'object' && !Plugin.getOption('data.serverFiltering')) {
					params.query = params.query || {};

					var nestedSearch = function(obj) {
						for (var field in obj) {
							if (!obj.hasOwnProperty(field)) continue;
							if (typeof obj[field] === 'string') {
                                if (obj[field].toLowerCase() === search || obj[field].toLowerCase().indexOf(search) !== -1) {
                                    return true;
                                }
							}
							else if (typeof obj[field] === 'object') {
								return nestedSearch(obj[field]);
							}
						}
						return false;
					};

					// search
					var search = $(Plugin.getOption('search.input')).val();
					if (typeof search !== 'undefined' && search !== '') {
						search = search.toLowerCase();
						datatable.dataSet = $.grep(datatable.dataSet, nestedSearch);
						// remove generalSearch as we don't need this for next columns filter
						delete params.query[Plugin.getGeneralSearchKey()];
					}

					// remove empty element from array
					$.each(params.query, function(k, v) {
						if (v === '') {
							delete params.query[k];
						}
					});

					// filter array by query
					datatable.dataSet = Plugin.filterArray(datatable.dataSet, params.query);

					// reset array index
					datatable.dataSet = datatable.dataSet.filter(function() {
						return true;
					});
				}

				return datatable.dataSet;
			},

			/**
			 * Utility helper to filter array by object pair of {key:value}
			 * @param list
			 * @param args
			 * @param operator
			 * @returns {*}
			 */
			filterArray: function(list, args, operator) {
			    let print = function (a) {
                    console.log(a);
                };
				if (typeof list !== 'object') {
					return [];
				}

				if (typeof operator === 'undefined') operator = 'AND';

				if (typeof args !== 'object') {
					return list;
				}

				operator = operator.toUpperCase();

				if ($.inArray(operator, ['AND', 'OR', 'NOT']) === -1) {
					return [];
				}

				var count = Object.keys(args).length;
				var filtered = [];

				$.each(list, function(key, obj) {
					var to_match = obj;

					var matched = 0;
					$.each(args, function(m_key, m_value) {
						m_value = m_value instanceof Array ? m_value : [m_value];
						if (m_key === '') {
						    let m_index = {};
						    for (let i in m_value[1]) m_index[i] = m_value[1][i];
                            for (let i in m_index) {
						        m_index[i] = to_match[m_index[i]];
                            }
						    if (m_value[0](m_index)) matched++;
                        } else {
                            if (to_match.hasOwnProperty(m_key)) {
                                var lhs = to_match[m_key].toString().toLowerCase();
                                m_value.forEach(function(item, index) {
                                    if (typeof item === "function") {
                                        if (item(lhs)) matched++;
                                    } else {
                                        if (item.toString().toLowerCase() === lhs || lhs.indexOf(item.toString().toLowerCase()) !== -1) {
                                            matched++;
                                        }
                                    }
                                });
                            }

                        }
					});

					if (('AND' === operator && matched === count) ||
						('OR' === operator && matched > 0) ||
						('NOT' === operator && 0 === matched)) {
						filtered[key] = obj;
					}
				});

				list = filtered;

				return list;
			},

			/**
			 * Reset lock column scroll to 0 when resize
			 */
			resetScroll: function() {
				if (typeof options.detail === 'undefined' && Plugin.getDepth() === 1) {
					$(datatable.table).find('.m-datatable__row').css('left', 0);
					$(datatable.table).find('.m-datatable__lock').css('top', 0);
					$(datatable.tableBody).scrollTop(0);
				}
			},

			/**
			 * Get column options by field
			 * @param field
			 * @returns {boolean}
			 */
			getColumnByField: function(field) {
				if (typeof field === 'undefined') return;
				var result;
				$.each(options.columns, function(i, column) {
					if (field === column.field) {
						result = column;
						return false;
					}
				});
				return result;
			},

			/**
			 * Get default sort column
			 */
			getDefaultSortColumn: function() {
				var result;
				$.each(options.columns, function(i, column) {
					if (typeof column.sortable !== 'undefined'
						&& $.inArray(column.sortable, ['asc', 'desc']) !== -1) {
						result = {sort: column.sortable, field: column.field};
						return false;
					}
				});
				return result;
			},

			/**
			 * Helper to get element dimensions, when the element is hidden
			 * @param element
			 * @param includeMargin
			 * @returns {{width: number, height: number, innerWidth: number,
			 *     innerHeight: number, outerWidth: number, outerHeight: number}}
			 */
			getHiddenDimensions: function(element, includeMargin) {
				var props = {
						position: 'absolute',
						visibility: 'hidden',
						display: 'block',
					},
					dim = {
						width: 0,
						height: 0,
						innerWidth: 0,
						innerHeight: 0,
						outerWidth: 0,
						outerHeight: 0,
					},
					hiddenParents = $(element).parents().addBack().not(':visible');
				includeMargin = (typeof includeMargin === 'boolean')
					? includeMargin
					: false;

				var oldProps = [];
				hiddenParents.each(function() {
					var old = {};

					for (var name in props) {
						old[name] = this.style[name];
						this.style[name] = props[name];
					}

					oldProps.push(old);
				});

				dim.width = $(element).width();
				dim.outerWidth = $(element).outerWidth(includeMargin);
				dim.innerWidth = $(element).innerWidth();
				dim.height = $(element).height();
				dim.innerHeight = $(element).innerHeight();
				dim.outerHeight = $(element).outerHeight(includeMargin);

				hiddenParents.each(function(i) {
					var old = oldProps[i];
					for (var name in props) {
						this.style[name] = old[name];
					}
				});

				return dim;
			},

			getGeneralSearchKey: function() {
				var searchInput = $(Plugin.getOption('search.input'));
				return $(searchInput).prop('name') || $(searchInput).prop('id');
			},

			/**
			 * Get value by dot notation path string and to prevent undefined errors
			 * @param path String Dot notation path in string
			 * @param object Object to iterate
			 * @returns {*}
			 */
			getObject: function(path, object) {
				return path.split('.').reduce(function(obj, i) {
					return obj !== null && typeof obj[i] !== 'undefined' ? obj[i] : null;
				}, object);
			},

			/**
			 * Extend object
			 * @param obj
			 * @param path
			 * @param value
			 * @returns {*}
			 */
			extendObj: function(obj, path, value) {
				var levels = path.split('.'),
					i = 0;

				function createLevel(child) {
					var name = levels[i++];
					if (typeof child[name] !== 'undefined' && child[name] !== null) {
						if (typeof child[name] !== 'object' &&
							typeof child[name] !== 'function') {
							child[name] = {};
						}
					} else {
						child[name] = {};
					}
					if (i === levels.length) {
						child[name] = value;
					} else {
						createLevel(child[name]);
					}
				}

				createLevel(obj);
				return obj;
			},

			/********************
			 ** PUBLIC API METHODS
			 ********************/

			// delay timer
			timer: 0,

			/**
			 * Redraw datatable by recalculating its DOM elements, etc.
			 * @returns {jQuery}
			 */
			redraw: function() {
				Plugin.adjustCellsWidth.call();
				if (Plugin.isLocked()) {
					// fix hiding cell width issue
					Plugin.scrollbar();
					Plugin.resetScroll();

					Plugin.adjustCellsHeight.call();
				}
				Plugin.adjustLockContainer.call();
				Plugin.initHeight.call();
				return datatable;
			},

			/**
			 * Shortcode to reload
			 * @returns {jQuery}
			 */
			load: function() {
				Plugin.reload();
				return datatable;
			},

			/**
			 * Datasource reload
			 * @returns {jQuery}
			 */
			reload: function() {
				var delay = (function() {
					return function(callback, ms) {
						clearTimeout(Plugin.timer);
						Plugin.timer = setTimeout(callback, ms);
					};
				})();
				delay(function() {
					// local only. remote pagination will skip this block
					if (!options.data.serverFiltering) {
						Plugin.localDataUpdate();
					}
					Plugin.dataRender();
					$(datatable).trigger('m-datatable--on-reloaded');
				}, Plugin.getOption('search.delay'));
				return datatable;
			},

			/**
			 * Get record by record ID
			 * @param id
			 * @returns {jQuery}
			 */
			getRecord: function(id) {
				if (typeof datatable.tableBody === 'undefined') datatable.tableBody = $(datatable.table).children('tbody');
				$(datatable.tableBody).find('.m-datatable__cell:first-child').each(function(i, cell) {
					if (id === $(cell).text()) {
						var rowNumber = $(cell).closest('.m-datatable__row').index() + 1;
						datatable.API.record = datatable.API.value = Plugin.getOneRow(datatable.tableBody, rowNumber);
						return datatable;
					}
				});
				return datatable;
			},

			/**
			 * @deprecated in v5.0.6
			 * Get column of current record ID
			 * @param columnName
			 * @returns {jQuery}
			 */
			getColumn: function(columnName) {
				Plugin.setSelectedRecords();
				datatable.API.value = $(datatable.API.record).find('[data-field="' + columnName + '"]');
				return datatable;
			},

			/**
			 * Destroy datatable to original DOM state before datatable was
			 * initialized
			 * @returns {jQuery}
			 */
			destroy: function() {
				$(datatable).parent().find('.m-datatable__pager').remove();
				var initialDatatable = $(datatable.initialDatatable).addClass('m-datatable--destroyed').show();
				$(datatable).replaceWith(initialDatatable);
				datatable = initialDatatable;
				$(datatable).trigger('m-datatable--on-destroy');
				Plugin.isInit = false;
				initialDatatable = null;
				return initialDatatable;
			},

			/**
			 * Sort by column field
			 * @param field
			 * @param sort
			 */
			sort: function(field, sort) {
				// toggle sort
				sort = typeof sort === 'undefined' ? 'asc' : sort;

				Plugin.spinnerCallback(true);

				// update field and sort params
				var meta = {field: field, sort: sort};
				Plugin.setDataSourceParam('sort', meta);

				setTimeout(function() {
					Plugin.dataRender('sort');
					$(datatable).trigger('m-datatable--on-sort', meta);
					$(datatable.tableHead).
						find('.m-datatable__cell > span > i').
						remove();
				}, 300);

				return datatable;
			},

			/**
			 * @deprecated in v5.0.6
			 * Get current selected column value
			 * @returns {jQuery}
			 */
			getValue: function() {
				return $(datatable.API.value).text();
			},

			/**
			 * Set checkbox active
			 * @param cell JQuery selector or checkbox ID
			 */
			setActive: function(cell) {
				if (typeof cell === 'string') {
					// set by checkbox id
					cell = $(datatable.tableBody).
						find('.m-checkbox--single > [type="checkbox"][value="' + cell + '"]');
				}

				$(cell).prop('checked', true);

				// normal table
				var row = $(cell).
					closest('.m-datatable__row').
					addClass('m-datatable__row--active');

				var index = $(row).index() + 1;
				// lock table
				$(row).
					closest('.m-datatable__lock').
					parent().
					find('.m-datatable__row:nth-child(' + index + ')').
					addClass('m-datatable__row--active');

				var ids = [];
				$(row).each(function(i, td) {
					var id = $(td).find('.m-checkbox--single:not(.m-checkbox--all) > [type="checkbox"]').val();
					if (typeof id !== 'undefined') {
						ids.push(id);
					}
				});

				$(datatable).trigger('m-datatable--on-check', [ids]);
			},

			/**
			 * Set checkbox inactive
			 * @param cell JQuery selector or checkbox ID
			 */
			setInactive: function(cell) {
				if (typeof cell === 'string') {
					// set by checkbox id
					cell = $(datatable.tableBody).
						find('.m-checkbox--single > [type="checkbox"][value="' + cell + '"]');
				}

				$(cell).prop('checked', false);

				// normal table
				var row = $(cell).
					closest('.m-datatable__row').
					removeClass('m-datatable__row--active');
				var index = $(row).index() + 1;

				// lock table
				$(row).
					closest('.m-datatable__lock').
					parent().
					find('.m-datatable__row:nth-child(' + index + ')').
					removeClass('m-datatable__row--active');

				var ids = [];
				$(row).each(function(i, td) {
					var id = $(td).find('.m-checkbox--single:not(.m-checkbox--all) > [type="checkbox"]').val();
					if (typeof id !== 'undefined') {
						ids.push(id);
					}
				});

				$(datatable).trigger('m-datatable--on-uncheck', [ids]);
			},

			/**
			 * Set all checkboxes active or inactive
			 * @param active
			 */
			setActiveAll: function(active) {
				// todo; check if child table also will set active?
				var checkboxes = $(datatable.table).find('.m-datatable__body .m-datatable__row').
					find('.m-datatable__cell--check .m-checkbox [type="checkbox"]');
				if (active) {
					Plugin.setActive(checkboxes);
				} else {
					Plugin.setInactive(checkboxes);
				}
			},

			/**
			 * @deprecated in v5.0.6
			 * Get selected rows which are active
			 * @returns {jQuery}
			 */
			setSelectedRecords: function() {
				datatable.API.record = $(datatable.tableBody).find('.m-datatable__row--active');
				return datatable;
			},

			/**
			 * Get selected records
			 * @returns {null}
			 */
			getSelectedRecords: function() {
				// support old method
				Plugin.setSelectedRecords();
				datatable.API.record = datatable.rows('.m-datatable__row--active').nodes();
				return datatable.API.record;
			},

			/**
			 * Get options by dots notation path
			 * @param path String Dot notation path in string
			 * @returns {*}
			 */
			getOption: function(path) {
				return Plugin.getObject(path, options);
			},

			/**
			 * Set global options nodes by dots notation path
			 * @param path
			 * @param object
			 */
			setOption: function(path, object) {
				options = Plugin.extendObj(options, path, object);
			},

			/**
			 * Search filter for local & remote
			 * @param value
			 * @param columns. Optional list of columns to be filtered.
			 */
			search: function(value, columns) {
				if (typeof columns !== 'undefined') columns = $.makeArray(columns);
				var delay = (function() {
					return function(callback, ms) {
						clearTimeout(Plugin.timer);
						Plugin.timer = setTimeout(callback, ms);
					};
				})();

				delay(function() {
					// get query parameters
					var query = Plugin.getDataSourceQuery();

					// search not by columns
					if (typeof columns === 'undefined' && typeof value !== 'undefined') {
						query[''] = value;
					}


					// search by columns, support multiple columns
					if (typeof columns === 'object') {
						$.each(columns, function(k, column) {
							query[column] = value;
						});
						// remove empty element from arrays
						$.each(query, function(k, v) {
							if (v === '') {
							    if (typeof v !== "function" && $.isEmptyObject(v)) {
                                    delete query[k];
                                }
							}
						});
					}

					Plugin.setDataSourceQuery(query);

					// local filter only. remote pagination will skip this block
					if (!options.data.serverFiltering) {
						Plugin.localDataUpdate();
					}
					Plugin.dataRender('search');
				}, Plugin.getOption('search.delay'));
			},

			/**
			 * Set datasource paramsextractextract
			 * @param param
			 * @param value
			 */
			setDataSourceParam: function(param, value) {
				datatable.API.params = $.extend({}, {
					pagination: {page: 1, perpage: Plugin.getOption('data.pageSize')},
					sort: Plugin.getDefaultSortColumn(),
					query: {},
				}, datatable.API.params, Plugin.stateGet(Plugin.stateId));

				datatable.API.params = Plugin.extendObj(datatable.API.params, param, value);

				Plugin.stateKeep(Plugin.stateId, datatable.API.params);
			},

			/**
			 * Get datasource params
			 * @param param
			 */
			getDataSourceParam: function(param) {
				datatable.API.params = $.extend({}, {
					pagination: {page: 1, perpage: Plugin.getOption('data.pageSize')},
					sort: Plugin.getDefaultSortColumn(),
					query: {},
				}, datatable.API.params, Plugin.stateGet(Plugin.stateId));

				if (typeof param === 'string') {
					return Plugin.getObject(param, datatable.API.params);
				}

				return datatable.API.params;
			},

			/**
			 * Shortcode to datatable.getDataSourceParam('query');
			 * @returns {*}
			 */
			getDataSourceQuery: function() {
				return Plugin.getDataSourceParam('query') || {};
			},

			/**
			 * Shortcode to datatable.setDataSourceParam('query', query);
			 * @param query
			 */
			setDataSourceQuery: function(query) {
				Plugin.setDataSourceParam('query', query);
			},

			/**
			 * Get current page number
			 * @returns {number}
			 */
			getCurrentPage: function() {
				return $(datatable.table).
					siblings('.m-datatable__pager').
					last().
					find('.m-datatable__pager-nav').
					find('.m-datatable__pager-link.m-datatable__pager-link--active').
					data('page') || 1;
			},

			/**
			 * Get selected dropdown page size
			 * @returns {*|number}
			 */
			getPageSize: function() {
				return $(datatable.table).
					siblings('.m-datatable__pager').
					last().
					find('select.m-datatable__pager-size').
					val() || 10;
			},

			/**
			 * Get total rows
			 */
			getTotalRows: function() {
				return datatable.API.params.pagination.total;
			},

			/**
			 * Get full dataset in grid
			 * @returns {*|null|Array}
			 */
			getDataSet: function() {
				return datatable.originalDataSet;
			},

			/**
			 * @deprecated in v5.0.6
			 * Hide column by column's field name
			 * @param fieldName
			 */
			hideColumn: function(fieldName) {
				// add hide option for this column
				$.map(options.columns, function(column) {
					if (fieldName === column.field) {
						column.responsive = {hidden: 'xl'};
					}
					return column;
				});
				// hide current displayed column
				var tds = $.grep($(datatable.table).find('.m-datatable__cell'), function(n, i) {
					return fieldName === $(n).data('field');
				});
				$(tds).hide();
			},

			/**
			 * @deprecated in v5.0.6
			 * Show column by column's field name
			 * @param fieldName
			 */
			showColumn: function(fieldName) {
				// add hide option for this column
				$.map(options.columns, function(column) {
					if (fieldName === column.field) {
						delete column.responsive;
					}
					return column;
				});
				// hide current displayed column
				var tds = $.grep($(datatable.table).find('.m-datatable__cell'), function(n, i) {
					return fieldName === $(n).data('field');
				});
				$(tds).show();
			},

			destroyScroller: function(element) {
				if (typeof element === 'undefined') element = datatable.tableBody;
				$(element).each(function() {
					if ($(this).hasClass('mCustomScrollbar')) {
						try {
							mApp.destroyScroller($(this));
						} catch (e) {
							console.log(e);
						}
					}
				});
			},

			/**
			 * NEW API
			 */

			nodeTr: [],
			nodeTd: [],
			nodeCols: [],
			recentNode: [],

			table: function() {
				return datatable.table;
			},

			/**
			 * Select a single row from the table
			 * @param selector
			 * @returns {jQuery}
			 */
			row: function(selector) {
				Plugin.rows(selector);
				Plugin.nodeTr = Plugin.recentNode = $(Plugin.nodeTr).first();
				return datatable;
			},

			/**
			 * Select multiple rows from the table
			 * @param selector
			 * @returns {jQuery}
			 */
			rows: function(selector) {
				Plugin.nodeTr = Plugin.recentNode = $(datatable.tableBody).find(selector).filter('.m-datatable__row');
				return datatable;
			},

			/**
			 * Select a single column from the table
			 * @param index zero-based index
			 * @returns {jQuery}
			 */
			column: function(index) {
				Plugin.nodeCols = Plugin.recentNode = $(datatable.tableBody).find('.m-datatable__cell:nth-child(' + (index + 1) + ')');
				return datatable;
			},

			/**
			 * Select multiple columns from the table
			 * @param selector
			 * @returns {jQuery}
			 */
			columns: function(selector) {
				var context = datatable.table;
				if (Plugin.nodeTr === Plugin.recentNode) {
					context = Plugin.nodeTr;
				}
				var columns = $(context).find('.m-datatable__cell[data-field="' + selector + '"]');
				if (columns.length > 0) {
					Plugin.nodeCols = Plugin.recentNode = columns;
				} else {
					Plugin.nodeCols = Plugin.recentNode = $(context).find(selector).filter('.m-datatable__cell');
				}
				return datatable;
			},

			cell: function(selector) {
				Plugin.cells(selector);
				Plugin.nodeTd = Plugin.recentNode = $(Plugin.nodeTd).first();
				return datatable;
			},

			cells: function(selector) {
				var cells = $(datatable.tableBody).find('.m-datatable__cell');
				if (typeof selector !== 'undefined') {
					cells = $(cells).filter(selector);
				}
				Plugin.nodeTd = Plugin.recentNode = cells;
				return datatable;
			},

			/**
			 * Delete the selected row from the table
			 * @returns {jQuery}
			 */
			remove: function() {
				if ($(Plugin.nodeTr.length) && Plugin.nodeTr === Plugin.recentNode) {
					$(Plugin.nodeTr).remove();
				}
				Plugin.layoutUpdate();
				return datatable;
			},

			/**
			 * Show or hide the columns or rows
			 */
			visible: function(bool) {
				if ($(Plugin.recentNode.length)) {
					var locked = Plugin.lockEnabledColumns();
					if (Plugin.recentNode === Plugin.nodeCols) {
						var index = Plugin.recentNode.index();

						if (Plugin.isLocked()) {
							var scrollColumns = $(Plugin.recentNode).closest('.m-datatable__lock--scroll').length;
							if (scrollColumns) {
								// is at center of scrollable area
								index += locked.left.length + 1;
							} else if ($(Plugin.recentNode).closest('.m-datatable__lock--right').length) {
								// is at the right locked table
								index += locked.left.length + scrollColumns + 1;
							}
						}
					}

					if (bool) {
						if (Plugin.recentNode === Plugin.nodeCols) {
							delete options.columns[index].responsive;
						}
						$(Plugin.recentNode).show();
					} else {
						if (Plugin.recentNode === Plugin.nodeCols) {
							Plugin.setOption('columns.' + index + '.responsive', {hidden: 'xl'});
						}
						$(Plugin.recentNode).hide();
					}
					Plugin.redraw();
				}
			},

			/**
			 * Get the the DOM element for the selected rows or columns
			 * @returns {Array}
			 */
			nodes: function() {
				return Plugin.recentNode;
			},

			/**
			 * will be implemented soon
			 * @returns {jQuery}
			 */
			dataset: function() {
				return datatable;
			},

		};

		/**
		 * Public API methods can be used directly by datatable
		 */
		$.each(Plugin, function(funcName, func) {
			datatable[funcName] = func;
		});

		// initialize main datatable plugin
		if (typeof options !== 'undefined') {
			if (typeof options === 'string') {
				var method = options;
				datatable = $(this).data('mDatatable');
				if (typeof datatable !== 'undefined') {
					options = datatable.options;
					Plugin[method].apply(this, Array.prototype.slice.call(arguments, 1));
				}
			} else {
				if (!datatable.data('mDatatable') && !$(this).hasClass('m-datatable--loaded')) {
					datatable.dataSet = null;
					datatable.textAlign = {
						left: 'm-datatable__cell--left',
						center: 'm-datatable__cell--center',
						right: 'm-datatable__cell--right',
					};

					// merge default and user defined options
					options = $.extend(true, {}, $.fn.mDatatable.defaults, options);

					datatable.options = options;

					// init plugin process
					Plugin.init.apply(this, [options]);

					$(datatable.wrap).data('mDatatable', datatable);
				}
			}
		} else {
			// get existing instance datatable
			datatable = $(this).data('mDatatable');
			if (typeof datatable === 'undefined') {
				$.error('mDatatable not initialized');
			}
			options = datatable.options;
		}

		return datatable;
	};

	// default options
	$.fn.mDatatable.defaults = {
		// datasource definition
		data: {
			type: 'local',
			source: null,
			pageSize: 10, // display records per page
			saveState: {
				// save datatable state(pagination, filtering, sorting, etc) in cookie or browser webstorage
				cookie: false,
				webstorage: true,
			},

			serverPaging: false,
			serverFiltering: false,
			serverSorting: false,

			autoColumns: false,
			attr: {
				rowProps: [],
			},
		},

		// layout definition
		layout: {
			theme: 'default', // datatable will support multiple themes and designs
			class: 'm-datatable--brand', // custom wrapper class
			scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
			height: null, // datatable's body's fixed height
			minHeight: 300,
			footer: false, // display/hide footer
			header: true, // display/hide header

			// datatable custom scroll params
			smoothScroll: {
				scrollbarShown: true,
			},

			// datatable spinner
			spinner: {
				overlayColor: '#000000',
				opacity: 0,
				type: 'loader',
				state: 'brand',
				message: true,
			},

			// datatable UI icons
			icons: {
				sort: {asc: 'la la-arrow-up', desc: 'la la-arrow-down'},
				pagination: {
					next: 'la la-angle-right',
					prev: 'la la-angle-left',
					first: 'la la-angle-double-left',
					last: 'la la-angle-double-right',
					more: 'la la-ellipsis-h',
				},
				rowDetail: {expand: 'fa fa-caret-down', collapse: 'fa fa-caret-right'},
			},
		},

		// column sorting
		sortable: true,

		// resize column size with mouse drag coming soon)
		resizable: false,

		// column based filtering (coming soon)
		filterable: false,

		pagination: true,

		// inline and bactch editing (cooming soon)
		editable: false,

		// columns definition
		columns: [],

		search: {
			// enable trigger search by keyup enter
			onEnter: false,
			// input text for search
			input: null,
			// search delay in milliseconds
			delay: 400,
		},

		rows: {
			// deprecated
			callback: function() {},
			// call before row template
			beforeTemplate: function() {},
			// call after row template
			afterTemplate: function() {},
			// auto hide columns, if rows overflow. work on non locked columns
			autoHide: false,
		},

		// toolbar
		toolbar: {
			// place pagination and displayInfo blocks according to the array order
			layout: ['pagination', 'info'],

			// toolbar placement can be at top or bottom or both top and bottom repeated
			placement: ['bottom'],  //'top', 'bottom'

			// toolbar items
			items: {
				// pagination
				pagination: {
					// pagination type(default or scroll)
					type: 'default',

					// number of pages to display by breakpoints
					pages: {
						desktop: {
							layout: 'default',
							pagesNumber: 6,
						},
						tablet: {
							layout: 'default',
							pagesNumber: 3,
						},
						mobile: {
							layout: 'compact',
						},
					},

					// navigation buttons
					navigation: {
						prev: true, // display prev link
						next: true, // display next link
						first: true, // display first link
						last: true // display last link
					},

					// page size select
					pageSizeSelect: [] // display dropdown to select pagination size. -1 is used for "ALl" option
				},

				// records info
				info: true,
			},
		},

		// here we will keep all strings and message used by datatable UI so developer can easiliy translate to any language.
		// By default the stirngs will be in the plugin source and here can override it
		translate: {
			records: {
				processing: 'Please wait...',
				noRecords: 'No records found',
			},
			toolbar: {
				pagination: {
					items: {
						default: {
							first: 'First',
							prev: 'Previous',
							next: 'Next',
							last: 'Last',
							more: 'More pages',
							input: 'Page number',
							select: 'Select page size',
						},
						info: 'Displaying {{start}} - {{end}} of {{total}} records',
					},
				},
			},
		},

		extensions: {},
	};
}(jQuery);
var mDropdown = function (t, e) {
    var a = this, n = mUtil.get(t), o = mUtil.get("body");
    if (n) {
        var i = {
            toggle: "click",
            hoverTimeout: 300,
            skin: "light",
            height: "auto",
            maxHeight: !1,
            minHeight: !1,
            persistent: !1,
            mobileOverlay: !0
        }, l = {
            construct: function (t) {
                return mUtil.data(n).has("dropdown") ? a = mUtil.data(n).get("dropdown") : (l.init(t), l.setup(), mUtil.data(n).set("dropdown", a)), a
            }, init: function (t) {
                a.options = mUtil.deepExtend({}, i, t), a.events = [], a.eventHandlers = {}, a.open = !1, a.layout = {}, a.layout.close = mUtil.find(n, ".m-dropdown__close"), a.layout.toggle = mUtil.find(n, ".m-dropdown__toggle"), a.layout.arrow = mUtil.find(n, ".m-dropdown__arrow"), a.layout.wrapper = mUtil.find(n, ".m-dropdown__wrapper"), a.layout.defaultDropPos = mUtil.hasClass(n, "m-dropdown--up") ? "up" : "down", a.layout.currentDropPos = a.layout.defaultDropPos, "hover" === mUtil.attr(n, "m-dropdown-toggle") && (a.options.toggle = "hover")
            }, setup: function () {
                a.options.placement && mUtil.addClass(n, "m-dropdown--" + a.options.placement), a.options.align && mUtil.addClass(n, "m-dropdown--align-" + a.options.align), a.options.width && mUtil.css(a.layout.wrapper, "width", a.options.width + "px"), "1" === mUtil.attr(n, "m-dropdown-persistent") && (a.options.persistent = !0), "hover" === a.options.toggle && mUtil.addEvent(n, "mouseout", l.hideMouseout), l.setZindex()
            }, toggle: function () {
                return a.open ? l.hide() : l.show()
            }, setContent: function (t) {
                t = mUtil.find(n, ".m-dropdown__content").innerHTML = t;
                return a
            }, show: function () {
                if ("hover" === a.options.toggle && mUtil.hasAttr(n, "hover")) return l.clearHovered(), a;
                if (a.open) return a;
                if (a.layout.arrow && l.adjustArrowPos(), l.eventTrigger("beforeShow"), l.hideOpened(), mUtil.addClass(n, "m-dropdown--open"), mUtil.isMobileDevice() && a.options.mobileOverlay) {
                    var t = mUtil.css(n, "z-index") - 1, e = mUtil.insertAfter(document.createElement("DIV"), n);
                    mUtil.addClass(e, "m-dropdown__dropoff"), mUtil.css(e, "z-index", t), mUtil.data(e).set("dropdown", n), mUtil.data(n).set("dropoff", e), mUtil.addEvent(e, "click", function (t) {
                        l.hide(), mUtil.remove(this), t.preventDefault()
                    })
                }
                return n.focus(), n.setAttribute("aria-expanded", "true"), a.open = !0, l.eventTrigger("afterShow"), a
            }, clearHovered: function () {
                var t = mUtil.attr(n, "timeout");
                mUtil.removeAttr(n, "hover"), mUtil.removeAttr(n, "timeout"), clearTimeout(t)
            }, hideHovered: function (t) {
                if (!0 === t) {
                    if (!1 === l.eventTrigger("beforeHide")) return;
                    l.clearHovered(), mUtil.removeClass(n, "m-dropdown--open"), a.open = !1, l.eventTrigger("afterHide")
                } else {
                    if (!0 === mUtil.hasAttr(n, "hover")) return;
                    if (!1 === l.eventTrigger("beforeHide")) return;
                    var e = setTimeout(function () {
                        mUtil.attr(n, "hover") && (l.clearHovered(), mUtil.removeClass(n, "m-dropdown--open"), a.open = !1, l.eventTrigger("afterHide"))
                    }, a.options.hoverTimeout);
                    mUtil.attr(n, "hover", "1"), mUtil.attr(n, "timeout", e)
                }
            }, hideClicked: function () {
                !1 !== l.eventTrigger("beforeHide") && (mUtil.removeClass(n, "m-dropdown--open"), mUtil.data(n).remove("dropoff"), a.open = !1, l.eventTrigger("afterHide"))
            }, hide: function (t) {
                return !1 === a.open ? a : (mUtil.isDesktopDevice() && "hover" === a.options.toggle ? l.hideHovered(t) : l.hideClicked(), "down" === a.layout.defaultDropPos && "up" === a.layout.currentDropPos && (mUtil.removeClass(n, "m-dropdown--up"), a.layout.arrow.prependTo(a.layout.wrapper), a.layout.currentDropPos = "down"), a)
            }, hideMouseout: function () {
                mUtil.isDesktopDevice() && l.hide()
            }, hideOpened: function () {
                for (var t = mUtil.findAll(o, ".m-dropdown.m-dropdown--open"), e = 0, a = t.length; e < a; e++) {
                    var n = t[e];
                    mUtil.data(n).get("dropdown").hide(!0)
                }
            }, adjustArrowPos: function () {
                var t = mUtil.outerWidth(n),
                    e = mUtil.hasClass(a.layout.arrow, "m-dropdown__arrow--right") ? "right" : "left", o = 0;
                a.layout.arrow && (mUtil.isInResponsiveRange("mobile") && mUtil.hasClass(n, "m-dropdown--mobile-full-width") ? (o = mUtil.offset(n).left + t / 2 - Math.abs(parseInt(mUtil.css(a.layout.arrow, "width")) / 2) - parseInt(mUtil.css(a.layout.wrapper, "left")), mUtil.css(a.layout.arrow, "right", "auto"), mUtil.css(a.layout.arrow, "left", o + "px"), mUtil.css(a.layout.arrow, "margin-left", "auto"), mUtil.css(a.layout.arrow, "margin-right", "auto")) : mUtil.hasClass(a.layout.arrow, "m-dropdown__arrow--adjust") && (o = t / 2 - Math.abs(parseInt(mUtil.css(a.layout.arrow, "width")) / 2), mUtil.hasClass(n, "m-dropdown--align-push") && (o += 20), "right" === e ? (mUtil.css(a.layout.arrow, "left", "auto"), mUtil.css(a.layout.arrow, "right", o + "px")) : (mUtil.css(a.layout.arrow, "right", "auto"), mUtil.css(a.layout.arrow, "left", o + "px"))))
            }, setZindex: function () {
                var t = 101, e = mUtil.getHighestZindex(n);
                e >= t && (t = e + 1), mUtil.css(a.layout.wrapper, "z-index", t)
            }, isPersistent: function () {
                return a.options.persistent
            }, isShown: function () {
                return a.open
            }, eventTrigger: function (t, e) {
                for (var n = 0; n < a.events.length; n++) {
                    var o = a.events[n];
                    o.name === t && (1 === o.one ? 0 === o.fired && (a.events[n].fired = !0, o.handler.call(this, a, e)) : o.handler.call(this, a, e))
                }
            }, addEvent: function (t, e, n) {
                a.events.push({name: t, handler: e, one: n, fired: !1})
            }
        };
        return a.setDefaults = function (t) {
            i = t
        }, a.show = function () {
            return l.show()
        }, a.hide = function () {
            return l.hide()
        }, a.toggle = function () {
            return l.toggle()
        }, a.isPersistent = function () {
            return l.isPersistent()
        }, a.isShown = function () {
            return l.isShown()
        }, a.setContent = function (t) {
            return l.setContent(t)
        }, a.on = function (t, e) {
            return l.addEvent(t, e)
        }, a.one = function (t, e) {
            return l.addEvent(t, e, !0)
        }, l.construct.apply(a, [e]), !0, a
    }
};
mUtil.on(document, '[m-dropdown-toggle="click"] .m-dropdown__toggle', "click", function (t) {
    var e = this.closest(".m-dropdown");
    e && ((mUtil.data(e).has("dropdown") ? mUtil.data(e).get("dropdown") : new mDropdown(e)).toggle(), t.preventDefault())
}), mUtil.on(document, '[m-dropdown-toggle="hover"] .m-dropdown__toggle', "click", function (t) {
    if (mUtil.isDesktopDevice()) "#" === mUtil.attr(this, "href") && t.preventDefault(); else if (mUtil.isMobileDevice()) {
        var e = this.closest(".m-dropdown");
        e && ((mUtil.data(e).has("dropdown") ? mUtil.data(e).get("dropdown") : new mDropdown(e)).toggle(), t.preventDefault())
    }
}), mUtil.on(document, '[m-dropdown-toggle="hover"]', "mouseover", function (t) {
    if (mUtil.isDesktopDevice()) {
        this && ((mUtil.data(this).has("dropdown") ? mUtil.data(this).get("dropdown") : new mDropdown(this)).show(), t.preventDefault())
    }
}), document.addEventListener("click", function (t) {
    var e, a = mUtil.get("body"), n = t.target;
    if (e = a.querySelectorAll(".m-dropdown.m-dropdown--open")) for (var o = 0, i = e.length; o < i; o++) {
        var l = e[o];
        if (!1 === mUtil.data(l).has("dropdown")) return;
        var r = mUtil.data(l).get("dropdown"), s = mUtil.find(l, ".m-dropdown__toggle");
        mUtil.hasClass(l, "m-dropdown--disable-close") && (t.preventDefault(), t.stopPropagation()), s && n !== s && !1 === s.contains(n) && !1 === n.contains(s) ? !0 === r.isPersistent() ? !1 === l.contains(n) && r.hide() : r.hide() : !1 === l.contains(n) && r.hide()
    }
});
var mHeader = function (t, e) {
    var a = this, n = mUtil.get(t), o = mUtil.get("body");
    if (void 0 !== n) {
        var i = {classic: !1, offset: {mobile: 150, desktop: 200}, minimize: {mobile: !1, desktop: !1}}, l = {
            construct: function (t) {
                return mUtil.data(n).has("header") ? a = mUtil.data(n).get("header") : (l.init(t), l.build(), mUtil.data(n).set("header", a)), a
            }, init: function (t) {
                a.events = [], a.options = mUtil.deepExtend({}, i, t)
            }, build: function () {
                var t = 0;
                !1 === a.options.minimize.mobile && !1 === a.options.minimize.desktop || window.addEventListener("scroll", function () {
                    var e, n, i, l = 0;
                    mUtil.isInResponsiveRange("desktop") ? (l = a.options.offset.desktop, e = a.options.minimize.desktop.on, n = a.options.minimize.desktop.off) : mUtil.isInResponsiveRange("tablet-and-mobile") && (l = a.options.offset.mobile, e = a.options.minimize.mobile.on, n = a.options.minimize.mobile.off), i = window.pageYOffset, mUtil.isInResponsiveRange("tablet-and-mobile") && a.options.classic && a.options.classic.mobile || mUtil.isInResponsiveRange("desktop") && a.options.classic && a.options.classic.desktop ? i > l ? (mUtil.addClass(o, e), mUtil.removeClass(o, n)) : (mUtil.addClass(o, n), mUtil.removeClass(o, e)) : (i > l && t < i ? (mUtil.addClass(o, e), mUtil.removeClass(o, n)) : (mUtil.addClass(o, n), mUtil.removeClass(o, e)), t = i)
                })
            }, eventTrigger: function (t, e) {
                for (var n = 0; n < a.events.length; n++) {
                    var o = a.events[n];
                    o.name === t && (1 === o.one ? 0 === o.fired && (a.events[n].fired = !0, o.handler.call(this, a, e)) : o.handler.call(this, a, e))
                }
            }, addEvent: function (t, e, n) {
                a.events.push({name: t, handler: e, one: n, fired: !1})
            }
        };
        return a.setDefaults = function (t) {
            i = t
        }, a.on = function (t, e) {
            return l.addEvent(t, e)
        }, l.construct.apply(a, [e]), !0, a
    }
}, mMenu = function (t, e) {
    var a = this, n = !1, o = mUtil.get(t), i = mUtil.get("body");
    if (o) {
        var l = {
            autoscroll: {speed: 1200},
            accordion: {slideSpeed: 200, autoScroll: !0, autoScrollSpeed: 1200, expandAll: !0},
            dropdown: {timeout: 500}
        }, r = {
            construct: function (t) {
                return mUtil.data(o).has("menu") ? a = mUtil.data(o).get("menu") : (r.init(t), r.reset(), r.build(), mUtil.data(o).set("menu", a)), a
            }, init: function (t) {
                a.events = [], a.eventHandlers = {}, a.options = mUtil.deepExtend({}, l, t), a.pauseDropdownHoverTime = 0, a.uid = mUtil.getUniqueID()
            }, reload: function () {
                r.reset(), r.build()
            }, build: function () {
                a.eventHandlers.event_1 = mUtil.on(o, ".m-menu__toggle", "click", r.handleSubmenuAccordion), ("dropdown" === r.getSubmenuMode() || r.isConditionalSubmenuDropdown()) && (a.eventHandlers.event_2 = mUtil.on(o, '[m-menu-submenu-toggle="hover"]', "mouseover", r.handleSubmenuDrodownHoverEnter), a.eventHandlers.event_3 = mUtil.on(o, '[m-menu-submenu-toggle="hover"]', "mouseout", r.handleSubmenuDrodownHoverExit), a.eventHandlers.event_4 = mUtil.on(o, '[m-menu-submenu-toggle="click"] > .m-menu__toggle, [m-menu-submenu-toggle="click"] > .m-menu__link .m-menu__toggle', "click", r.handleSubmenuDropdownClick), a.eventHandlers.event_5 = mUtil.on(o, '[m-menu-submenu-toggle="tab"] > .m-menu__toggle, [m-menu-submenu-toggle="tab"] > .m-menu__link .m-menu__toggle', "click", r.handleSubmenuDropdownTabClick)), a.eventHandlers.event_6 = mUtil.on(o, ".m-menu__item:not(.m-menu__item--submenu) > .m-menu__link:not(.m-menu__toggle):not(.m-menu__link--toggle-skip)", "click", r.handleLinkClick)
            }, reset: function () {
                mUtil.off(o, "click", a.eventHandlers.event_1), mUtil.off(o, "mouseover", a.eventHandlers.event_2), mUtil.off(o, "mouseout", a.eventHandlers.event_3), mUtil.off(o, "click", a.eventHandlers.event_4), mUtil.off(o, "click", a.eventHandlers.event_5), mUtil.off(o, "click", a.eventHandlers.event_6)
            }, getSubmenuMode: function (t) {
                return mUtil.isInResponsiveRange("desktop") ? t && mUtil.hasAttr(t, "m-menu-submenu-toggle") ? mUtil.attr(t, "m-menu-submenu-toggle") : mUtil.isset(a.options.submenu, "desktop.state.body") ? mUtil.hasClass(i, a.options.submenu.desktop.state.body) ? a.options.submenu.desktop.state.mode : a.options.submenu.desktop.default : mUtil.isset(a.options.submenu, "desktop") ? a.options.submenu.desktop : void 0 : mUtil.isInResponsiveRange("tablet") && mUtil.isset(a.options.submenu, "tablet") ? a.options.submenu.tablet : !(!mUtil.isInResponsiveRange("mobile") || !mUtil.isset(a.options.submenu, "mobile")) && a.options.submenu.mobile
            }, isConditionalSubmenuDropdown: function () {
                return !(!mUtil.isInResponsiveRange("desktop") || !mUtil.isset(a.options.submenu, "desktop.state.body"))
            }, handleLinkClick: function (t) {
                !1 === r.eventTrigger("linkClick", this) && t.preventDefault(), ("dropdown" === r.getSubmenuMode(this) || r.isConditionalSubmenuDropdown()) && r.handleSubmenuDropdownClose(t, this)
            }, handleSubmenuDrodownHoverEnter: function (t) {
                if ("accordion" !== r.getSubmenuMode(this) && !1 !== a.resumeDropdownHover()) {
                    "1" === this.getAttribute("data-hover") && (this.removeAttribute("data-hover"), clearTimeout(this.getAttribute("data-timeout")), this.removeAttribute("data-timeout")), r.showSubmenuDropdown(this)
                }
            }, handleSubmenuDrodownHoverExit: function (t) {
                if (!1 !== a.resumeDropdownHover() && "accordion" !== r.getSubmenuMode(this)) {
                    var e = this, n = a.options.dropdown.timeout, o = setTimeout(function () {
                        "1" === e.getAttribute("data-hover") && r.hideSubmenuDropdown(e, !0)
                    }, n);
                    e.setAttribute("data-hover", "1"), e.setAttribute("data-timeout", o)
                }
            }, handleSubmenuDropdownClick: function (t) {
                if ("accordion" !== r.getSubmenuMode(this)) {
                    var e = this.closest(".m-menu__item");
                    "accordion" !== e.getAttribute("m-menu-submenu-mode") && (!1 === mUtil.hasClass(e, "m-menu__item--hover") ? (mUtil.addClass(e, "m-menu__item--open-dropdown"), r.showSubmenuDropdown(e)) : (mUtil.removeClass(e, "m-menu__item--open-dropdown"), r.hideSubmenuDropdown(e, !0)), t.preventDefault())
                }
            }, handleSubmenuDropdownTabClick: function (t) {
                if ("accordion" !== r.getSubmenuMode(this)) {
                    var e = this.closest(".m-menu__item");
                    "accordion" !== e.getAttribute("m-menu-submenu-mode") && (0 === mUtil.hasClass(e, "m-menu__item--hover") && (mUtil.addClass(e, "m-menu__item--open-dropdown"), r.showSubmenuDropdown(e)), t.preventDefault())
                }
            }, handleSubmenuDropdownClose: function (t, e) {
                if ("accordion" !== r.getSubmenuMode(e)) {
                    var a = o.querySelectorAll(".m-menu__item.m-menu__item--submenu.m-menu__item--hover:not(.m-menu__item--tabs)");
                    if (a.length > 0 && !1 === mUtil.hasClass(e, "m-menu__toggle") && 0 === e.querySelectorAll(".m-menu__toggle").length) for (var n = 0, i = a.length; n < i; n++) r.hideSubmenuDropdown(a[0], !0)
                }
            }, handleSubmenuAccordion: function (t, e) {
                var n, o = e || this;
                if ("dropdown" === r.getSubmenuMode(e) && (n = o.closest(".m-menu__item")) && "accordion" !== n.getAttribute("m-menu-submenu-mode")) t.preventDefault(); else {
                    var i = o.closest(".m-menu__item"), l = mUtil.child(i, ".m-menu__submenu, .m-menu__inner");
                    if (!mUtil.hasClass(o.closest(".m-menu__item"), "m-menu__item--open-always") && i && l) {
                        t.preventDefault();
                        var s = a.options.accordion.slideSpeed;
                        if (!1 === mUtil.hasClass(i, "m-menu__item--open")) {
                            if (!1 === a.options.accordion.expandAll) {
                                var d = o.closest(".m-menu__nav, .m-menu__subnav"),
                                    c = mUtil.children(d, ".m-menu__item.m-menu__item--open.m-menu__item--submenu:not(.m-menu__item--expanded):not(.m-menu__item--open-always)");
                                if (d && c) for (var m = 0, u = c.length; m < u; m++) {
                                    var p = c[0], f = mUtil.child(p, ".m-menu__submenu");
                                    f && mUtil.slideUp(f, s, function () {
                                        mUtil.removeClass(p, "m-menu__item--open")
                                    })
                                }
                            }
                            mUtil.slideDown(l, s, function () {
                                r.scrollToItem(o)
                            }), mUtil.addClass(i, "m-menu__item--open")
                        } else mUtil.slideUp(l, s, function () {
                            r.scrollToItem(o)
                        }), mUtil.removeClass(i, "m-menu__item--open")
                    }
                }
            }, scrollToItem: function (t) {
                mUtil.isInResponsiveRange("desktop") && a.options.accordion.autoScroll && "1" !== o.getAttribute("m-menu-scrollable") && mUtil.scrollToCenter(t, a.options.accordion.autoScrollSpeed)
            }, hideSubmenuDropdown: function (t, e) {
                e && (mUtil.removeClass(t, "m-menu__item--hover"), mUtil.removeClass(t, "m-menu__item--active-tab")), t.removeAttribute("data-hover"), t.getAttribute("m-menu-dropdown-toggle-class") && mUtil.removeClass(i, t.getAttribute("m-menu-dropdown-toggle-class"));
                var a = t.getAttribute("data-timeout");
                t.removeAttribute("data-timeout"), clearTimeout(a)
            }, showSubmenuDropdown: function (t) {
                var e = o.querySelectorAll(".m-menu__item--submenu.m-menu__item--hover, .m-menu__item--submenu.m-menu__item--active-tab");
                if (e) for (var a = 0, n = e.length; a < n; a++) {
                    var l = e[a];
                    t !== l && !1 === l.contains(t) && !1 === t.contains(l) && r.hideSubmenuDropdown(l, !0)
                }
                r.adjustSubmenuDropdownArrowPos(t), mUtil.addClass(t, "m-menu__item--hover"), t.getAttribute("m-menu-dropdown-toggle-class") && mUtil.addClass(i, t.getAttribute("m-menu-dropdown-toggle-class"))
            }, createSubmenuDropdownClickDropoff: function (t) {
                var e, a = (e = mUtil.child(t, ".m-menu__submenu") ? mUtil.css(e, "z-index") : 0) - 1,
                    n = document.createElement('<div class="m-menu__dropoff" style="background: transparent; position: fixed; top: 0; bottom: 0; left: 0; right: 0; z-index: ' + a + '"></div>');
                i.appendChild(n), mUtil.addEvent(n, "click", function (e) {
                    e.stopPropagation(), e.preventDefault(), mUtil.remove(this), r.hideSubmenuDropdown(t, !0)
                })
            }, adjustSubmenuDropdownArrowPos: function (t) {
                var e = mUtil.child(t, ".m-menu__submenu"), a = mUtil.child(e, ".m-menu__arrow.m-menu__arrow--adjust");
                mUtil.child(e, ".m-menu__subnav");
                if (a) {
                    var n = 0;
                    mUtil.child(t, ".m-menu__link");
                    mUtil.hasClass(e, "m-menu__submenu--classic") || mUtil.hasClass(e, "m-menu__submenu--fixed") ? mUtil.hasClass(e, "m-menu__submenu--right") ? (n = mUtil.outerWidth(t) / 2, mUtil.hasClass(e, "m-menu__submenu--pull") && (n += Math.abs(parseFloat(mUtil.css(e, "margin-right")))), n = parseInt(mUtil.css(e, "width")) - n) : mUtil.hasClass(e, "m-menu__submenu--left") && (n = mUtil.outerWidth(t) / 2, mUtil.hasClass(e, "m-menu__submenu--pull") && (n += Math.abs(parseFloat(mUtil.css(e, "margin-left"))))) : (mUtil.hasClass(e, "m-menu__submenu--center") || mUtil.hasClass(e, "m-menu__submenu--full")) && (n = mUtil.offset(t).left - (mUtil.getViewPort().width - parseInt(mUtil.css(e, "width"))) / 2, n += mUtil.outerWidth(t) / 2), mUtil.css(a, "left", n + "px")
                }
            }, pauseDropdownHover: function (t) {
                var e = new Date;
                a.pauseDropdownHoverTime = e.getTime() + t
            }, resumeDropdownHover: function () {
                return (new Date).getTime() > a.pauseDropdownHoverTime
            }, resetActiveItem: function (t) {
                for (var e, n, i = 0, l = (e = o.querySelectorAll(".m-menu__item--active")).length; i < l; i++) {
                    var r = e[0];
                    mUtil.removeClass(r, "m-menu__item--active"), mUtil.hide(mUtil.child(r, ".m-menu__submenu"));
                    for (var s = 0, d = (n = mUtil.parents(r, ".m-menu__item--submenu")).length; s < d; s++) {
                        var c = n[i];
                        mUtil.removeClass(c, "m-menu__item--open"), mUtil.hide(mUtil.child(c, ".m-menu__submenu"))
                    }
                }
                if (!1 === a.options.accordion.expandAll && (e = o.querySelectorAll(".m-menu__item--open"))) for (i = 0, l = e.length; i < l; i++) mUtil.removeClass(n[0], "m-menu__item--open")
            }, setActiveItem: function (t) {
                r.resetActiveItem(), mUtil.addClass(t, "m-menu__item--active");
                for (var e = mUtil.parents(t, ".m-menu__item--submenu"), a = 0, n = e.length; a < n; a++) mUtil.addClass(e[a], "m-menu__item--open")
            }, getBreadcrumbs: function (t) {
                var e, a = [], n = mUtil.child(t, ".m-menu__link");
                a.push({
                    text: e = mUtil.child(n, ".m-menu__link-text") ? e.innerHTML : "",
                    title: n.getAttribute("title"),
                    href: n.getAttribute("href")
                });
                for (var o = mUtil.parents(t, ".m-menu__item--submenu"), i = 0, l = o.length; i < l; i++) {
                    var r = mUtil.child(o[i], ".m-menu__link");
                    a.push({
                        text: e = mUtil.child(r, ".m-menu__link-text") ? e.innerHTML : "",
                        title: r.getAttribute("title"),
                        href: r.getAttribute("href")
                    })
                }
                return a.reverse()
            }, getPageTitle: function (t) {
                var e;
                return mUtil.child(t, ".m-menu__link-text") ? e.innerHTML : ""
            }, eventTrigger: function (t, e) {
                for (var n = 0; n < a.events.length; n++) {
                    var o = a.events[n];
                    o.name === t && (1 === o.one ? 0 === o.fired && (a.events[n].fired = !0, o.handler.call(this, a, e)) : o.handler.call(this, a, e))
                }
            }, addEvent: function (t, e, n) {
                a.events.push({name: t, handler: e, one: n, fired: !1})
            }
        };
        return a.setDefaults = function (t) {
            l = t
        }, a.setActiveItem = function (t) {
            return r.setActiveItem(t)
        }, a.reload = function () {
            return r.reload()
        }, a.getBreadcrumbs = function (t) {
            return r.getBreadcrumbs(t)
        }, a.getPageTitle = function (t) {
            return r.getPageTitle(t)
        }, a.getSubmenuMode = function (t) {
            return r.getSubmenuMode(t)
        }, a.hideDropdown = function (t) {
            r.hideSubmenuDropdown(t, !0)
        }, a.pauseDropdownHover = function (t) {
            r.pauseDropdownHover(t)
        }, a.resumeDropdownHover = function () {
            return r.resumeDropdownHover()
        }, a.on = function (t, e) {
            return r.addEvent(t, e)
        }, a.one = function (t, e) {
            return r.addEvent(t, e, !0)
        }, r.construct.apply(a, [e]), mUtil.addResizeHandler(function () {
            n && a.reload()
        }), n = !0, a
    }
};
document.addEventListener("click", function (t) {
    var e;
    if (e = mUtil.get("body").querySelectorAll('.m-menu__nav .m-menu__item.m-menu__item--submenu.m-menu__item--hover:not(.m-menu__item--tabs)[m-menu-submenu-toggle="click"]')) for (var a = 0, n = e.length; a < n; a++) {
        var o = e[a].closest(".m-menu__nav").parentNode;
        if (o) {
            var i, l = mUtil.data(o).get("menu");
            if (!l) break;
            if (!l || "dropdown" !== l.getSubmenuMode()) break;
            if (t.target !== o && !1 === o.contains(t.target)) if (i = o.querySelectorAll('.m-menu__item--submenu.m-menu__item--hover:not(.m-menu__item--tabs)[m-menu-submenu-toggle="click"]')) for (var r = 0, s = i.length; r < s; r++) l.hideDropdown(i[r])
        }
    }
});
var mOffcanvas = function (t, e) {
    var a = this, n = mUtil.get(t), o = mUtil.get("body");
    if (n) {
        var i = {}, l = {
            construct: function (t) {
                return mUtil.data(n).has("offcanvas") ? a = mUtil.data(n).get("offcanvas") : (l.init(t), l.build(), mUtil.data(n).set("offcanvas", a)), a
            }, init: function (t) {
                a.events = [], a.options = mUtil.deepExtend({}, i, t), a.overlay, a.classBase = a.options.baseClass, a.classShown = a.classBase + "--on", a.classOverlay = a.classBase + "-overlay", a.state = mUtil.hasClass(n, a.classShown) ? "shown" : "hidden"
            }, build: function () {
                if (a.options.toggleBy) if ("string" == typeof a.options.toggleBy) mUtil.addEvent(a.options.toggleBy, "click", l.toggle); else if (a.options.toggleBy && a.options.toggleBy[0] && a.options.toggleBy[0].target) for (var t in a.options.toggleBy) mUtil.addEvent(a.options.toggleBy[t].target, "click", l.toggle); else a.options.toggleBy && a.options.toggleBy.target && mUtil.addEvent(a.options.toggleBy.target, "click", l.toggle);
                var e = mUtil.get(a.options.closeBy);
                e && mUtil.addEvent(e, "click", l.hide)
            }, toggle: function () {
                l.eventTrigger("toggle"), "shown" === a.state ? l.hide(this) : l.show(this)
            }, show: function (t) {
                "shown" !== a.state && (l.eventTrigger("beforeShow"), l.togglerClass(t, "show"), mUtil.addClass(o, a.classShown), mUtil.addClass(n, a.classShown), a.state = "shown", a.options.overlay && (a.overlay = mUtil.insertAfter(document.createElement("DIV"), n), mUtil.addClass(a.overlay, a.classOverlay), mUtil.addEvent(a.overlay, "click", function (e) {
                    e.stopPropagation(), e.preventDefault(), l.hide(t)
                })), l.eventTrigger("afterShow"))
            }, hide: function (t) {
                "hidden" !== a.state && (l.eventTrigger("beforeHide"), l.togglerClass(t, "hide"), mUtil.removeClass(o, a.classShown), mUtil.removeClass(n, a.classShown), a.state = "hidden", a.options.overlay && a.overlay && mUtil.remove(a.overlay), l.eventTrigger("afterHide"))
            }, togglerClass: function (t, e) {
                var n, o = mUtil.attr(t, "id");
                if (a.options.toggleBy && a.options.toggleBy[0] && a.options.toggleBy[0].target) for (var i in a.options.toggleBy) a.options.toggleBy[i].target === o && (n = a.options.toggleBy[i]); else a.options.toggleBy && a.options.toggleBy.target && (n = a.options.toggleBy);
                if (n) {
                    var l = mUtil.get(n.target);
                    "show" === e && mUtil.addClass(l, n.state), "hide" === e && mUtil.removeClass(l, n.state)
                }
            }, eventTrigger: function (t, e) {
                for (var n = 0; n < a.events.length; n++) {
                    var o = a.events[n];
                    o.name === t && (1 === o.one ? 0 === o.fired && (a.events[n].fired = !0, o.handler.call(this, a, e)) : o.handler.call(this, a, e))
                }
            }, addEvent: function (t, e, n) {
                a.events.push({name: t, handler: e, one: n, fired: !1})
            }
        };
        return a.setDefaults = function (t) {
            i = t
        }, a.hide = function () {
            return l.hide()
        }, a.show = function () {
            return l.show()
        }, a.on = function (t, e) {
            return l.addEvent(t, e)
        }, a.one = function (t, e) {
            return l.addEvent(t, e, !0)
        }, l.construct.apply(a, [e]), !0, a
    }
}, mPortlet = function (t, e) {
    var a = this, n = mUtil.get(t), o = mUtil.get("body");
    if (n) {
        var l = {
            bodyToggleSpeed: 400,
            tooltips: !0,
            tools: {
                toggle: {collapse: "Collapse", expand: "Expand"},
                reload: "Reload",
                remove: "Remove",
                fullscreen: {on: "Fullscreen", off: "Exit Fullscreen"}
            }
        }, r = {
            construct: function (t) {
                return mUtil.data(n).has("portlet") ? a = mUtil.data(n).get("portlet") : (r.init(t), r.build(), mUtil.data(n).set("portlet", a)), a
            }, init: function (t) {
                a.element = n, a.events = [], a.options = mUtil.deepExtend({}, l, t), a.head = mUtil.child(n, ".m-portlet__head"), a.foot = mUtil.child(n, ".m-portlet__foot"), mUtil.child(n, ".m-portlet__body") ? a.body = mUtil.child(n, ".m-portlet__body") : 0 !== mUtil.child(n, ".m-form").length && (a.body = mUtil.child(n, ".m-form"))
            }, build: function () {
                var t = mUtil.find(a.head, "[m-portlet-tool=remove]");
                t && mUtil.addEvent(t, "click", function (t) {
                    t.preventDefault(), r.remove()
                });
                var e = mUtil.find(a.head, "[m-portlet-tool=reload]");
                e && mUtil.addEvent(e, "click", function (t) {
                    t.preventDefault(), r.reload()
                });
                var n = mUtil.find(a.head, "[m-portlet-tool=toggle]");
                n && mUtil.addEvent(n, "click", function (t) {
                    t.preventDefault(), r.toggle()
                });
                var o = mUtil.find(a.head, "[m-portlet-tool=fullscreen]");
                o && mUtil.addEvent(o, "click", function (t) {
                    t.preventDefault(), r.fullscreen()
                }), r.setupTooltips()
            }, remove: function () {
                !1 !== r.eventTrigger("beforeRemove") && (mUtil.hasClass(o, "m-portlet--fullscreen") && mUtil.hasClass(n, "m-portlet--fullscreen") && r.fullscreen("off"), r.removeTooltips(), mUtil.remove(n), r.eventTrigger("afterRemove"))
            }, setContent: function (t) {
                t && (a.body.innerHTML = t)
            }, getBody: function () {
                return a.body
            }, getSelf: function () {
                return n
            }, setupTooltips: function () {
                if (a.options.tooltips) {
                    var t = mUtil.hasClass(n, "m-portlet--collapse") || mUtil.hasClass(n, "m-portlet--collapsed"),
                        e = mUtil.hasClass(o, "m-portlet--fullscreen") && mUtil.hasClass(n, "m-portlet--fullscreen"),
                        i = mUtil.find(a.head, "[m-portlet-tool=remove]");
                    if (i) {
                        var l = e ? "bottom" : "top", r = new Tooltip(i, {
                            title: a.options.tools.remove,
                            placement: l,
                            offset: e ? "0,10px,0,0" : "0,5px",
                            trigger: "hover",
                            template: '<div class="m-tooltip m-tooltip--portlet tooltip bs-tooltip-' + l + '" role="tooltip">                            <div class="tooltip-arrow arrow"></div>                            <div class="tooltip-inner"></div>                        </div>'
                        });
                        mUtil.data(i).set("tooltip", r)
                    }
                    var s = mUtil.find(a.head, "[m-portlet-tool=reload]");
                    if (s) {
                        l = e ? "bottom" : "top", r = new Tooltip(s, {
                            title: a.options.tools.reload,
                            placement: l,
                            offset: e ? "0,10px,0,0" : "0,5px",
                            trigger: "hover",
                            template: '<div class="m-tooltip m-tooltip--portlet tooltip bs-tooltip-' + l + '" role="tooltip">                            <div class="tooltip-arrow arrow"></div>                            <div class="tooltip-inner"></div>                        </div>'
                        });
                        mUtil.data(s).set("tooltip", r)
                    }
                    var d = mUtil.find(a.head, "[m-portlet-tool=toggle]");
                    if (d) {
                        l = e ? "bottom" : "top", r = new Tooltip(d, {
                            title: t ? a.options.tools.toggle.expand : a.options.tools.toggle.collapse,
                            placement: l,
                            offset: e ? "0,10px,0,0" : "0,5px",
                            trigger: "hover",
                            template: '<div class="m-tooltip m-tooltip--portlet tooltip bs-tooltip-' + l + '" role="tooltip">                            <div class="tooltip-arrow arrow"></div>                            <div class="tooltip-inner"></div>                        </div>'
                        });
                        mUtil.data(d).set("tooltip", r)
                    }
                    var c = mUtil.find(a.head, "[m-portlet-tool=fullscreen]");
                    if (c) {
                        l = e ? "bottom" : "top", r = new Tooltip(c, {
                            title: e ? a.options.tools.fullscreen.off : a.options.tools.fullscreen.on,
                            placement: l,
                            offset: e ? "0,10px,0,0" : "0,5px",
                            trigger: "hover",
                            template: '<div class="m-tooltip m-tooltip--portlet tooltip bs-tooltip-' + l + '" role="tooltip">                            <div class="tooltip-arrow arrow"></div>                            <div class="tooltip-inner"></div>                        </div>'
                        });
                        mUtil.data(c).set("tooltip", r)
                    }
                }
            }, removeTooltips: function () {
                if (a.options.tooltips) {
                    var t = mUtil.find(a.head, "[m-portlet-tool=remove]");
                    t && mUtil.data(t).has("tooltip") && mUtil.data(t).get("tooltip").dispose();
                    var e = mUtil.find(a.head, "[m-portlet-tool=reload]");
                    e && mUtil.data(e).has("tooltip") && mUtil.data(e).get("tooltip").dispose();
                    var n = mUtil.find(a.head, "[m-portlet-tool=toggle]");
                    n && mUtil.data(n).has("tooltip") && mUtil.data(n).get("tooltip").dispose();
                    var o = mUtil.find(a.head, "[m-portlet-tool=fullscreen]");
                    o && mUtil.data(o).has("tooltip") && mUtil.data(o).get("tooltip").dispose()
                }
            }, reload: function () {
                r.eventTrigger("reload")
            }, toggle: function () {
                mUtil.hasClass(n, "m-portlet--collapse") || mUtil.hasClass(n, "m-portlet--collapsed") ? r.expand() : r.collapse()
            }, collapse: function () {
                if (!1 !== r.eventTrigger("beforeCollapse")) {
                    mUtil.slideUp(a.body, a.options.bodyToggleSpeed, function () {
                        r.eventTrigger("afterCollapse")
                    }), mUtil.addClass(n, "m-portlet--collapse");
                    var t = mUtil.find(a.head, "[m-portlet-tool=toggle]");
                    t && mUtil.data(t).has("tooltip") && mUtil.data(t).get("tooltip").updateTitleContent(a.options.tools.toggle.expand)
                }
            }, expand: function () {
                if (!1 !== r.eventTrigger("beforeExpand")) {
                    mUtil.slideDown(a.body, a.options.bodyToggleSpeed, function () {
                        r.eventTrigger("afterExpand")
                    }), mUtil.removeClass(n, "m-portlet--collapse"), mUtil.removeClass(n, "m-portlet--collapsed");
                    var t = mUtil.find(a.head, "[m-portlet-tool=toggle]");
                    t && mUtil.data(t).has("tooltip") && mUtil.data(t).get("tooltip").updateTitleContent(a.options.tools.toggle.collapse)
                }
            }, fullscreen: function (t) {
                if ("off" === t || mUtil.hasClass(o, "m-portlet--fullscreen") && mUtil.hasClass(n, "m-portlet--fullscreen")) r.eventTrigger("beforeFullscreenOff"), mUtil.removeClass(o, "m-portlet--fullscreen"), mUtil.removeClass(n, "m-portlet--fullscreen"), r.removeTooltips(), r.setupTooltips(), a.foot && (mUtil.css(a.body, "margin-bottom", ""), mUtil.css(a.foot, "margin-top", "")), r.eventTrigger("afterFullscreenOff"); else {
                    if (r.eventTrigger("beforeFullscreenOn"), mUtil.addClass(n, "m-portlet--fullscreen"), mUtil.addClass(o, "m-portlet--fullscreen"), r.removeTooltips(), r.setupTooltips(), a.foot) {
                        var e = parseInt(mUtil.css(a.foot, "height")),
                            i = parseInt(mUtil.css(a.foot, "height")) + parseInt(mUtil.css(a.head, "height"));
                        mUtil.css(a.body, "margin-bottom", e + "px"), mUtil.css(a.foot, "margin-top", "-" + i + "px")
                    }
                    r.eventTrigger("afterFullscreenOn")
                }
            }, eventTrigger: function (t) {
                for (i = 0; i < a.events.length; i++) {
                    var e = a.events[i];
                    e.name === t && (1 === e.one ? 0 === e.fired && (a.events[i].fired = !0, e.handler.call(this, a)) : e.handler.call(this, a))
                }
            }, addEvent: function (t, e, n) {
                return a.events.push({name: t, handler: e, one: n, fired: !1}), a
            }
        };
        return a.setDefaults = function (t) {
            l = t
        }, a.remove = function () {
            return r.remove(html)
        }, a.reload = function () {
            return r.reload()
        }, a.setContent = function (t) {
            return r.setContent(t)
        }, a.toggle = function () {
            return r.toggle()
        }, a.collapse = function () {
            return r.collapse()
        }, a.expand = function () {
            return r.expand()
        }, a.fullscreen = function () {
            return r.fullscreen("on")
        }, a.unFullscreen = function () {
            return r.fullscreen("off")
        }, a.getBody = function () {
            return r.getBody()
        }, a.getSelf = function () {
            return r.getSelf()
        }, a.on = function (t, e) {
            return r.addEvent(t, e)
        }, a.one = function (t, e) {
            return r.addEvent(t, e, !0)
        }, r.construct.apply(a, [e]), a
    }
}, mQuicksearch = function (t, e) {
    var a = this, n = mUtil.get(t), o = mUtil.get("body");
    if (n) {
        var l = {
            mode: "default",
            minLength: 1,
            maxHeight: 300,
            requestTimeout: 200,
            inputTarget: "m_quicksearch_input",
            iconCloseTarget: "m_quicksearch_close",
            iconCancelTarget: "m_quicksearch_cancel",
            iconSearchTarget: "m_quicksearch_search",
            spinnerClass: "m-loader m-loader--skin-light m-loader--right",
            hasResultClass: "m-list-search--has-result",
            templates: {error: '<div class="m-search-results m-search-results--skin-light"><span class="m-search-result__message">{{message}}</div></div>'}
        }, r = {
            construct: function (t) {
                return mUtil.data(n).has("quicksearch") ? a = mUtil.data(n).get("quicksearch") : (r.init(t), r.build(), mUtil.data(n).set("quicksearch", a)), a
            }, init: function (t) {
                a.element = n, a.events = [], a.options = mUtil.deepExtend({}, l, t), a.query = "", a.form = mUtil.find(n, "form"), a.input = mUtil.get(a.options.inputTarget), a.iconClose = mUtil.get(a.options.iconCloseTarget), "default" === a.options.mode && (a.iconSearch = mUtil.get(a.options.iconSearchTarget), a.iconCancel = mUtil.get(a.options.iconCancelTarget)), a.dropdown = new mDropdown(n, {mobileOverlay: !1}), a.cancelTimeout, a.processing = !1, a.requestTimeout = !1
            }, build: function () {
                mUtil.addEvent(a.input, "keyup", r.search), "default" === a.options.mode ? (mUtil.addEvent(a.input, "focus", r.showDropdown), mUtil.addEvent(a.iconCancel, "click", r.handleCancel), mUtil.addEvent(a.iconSearch, "click", function () {
                    mUtil.isInResponsiveRange("tablet-and-mobile") && (mUtil.addClass(o, "m-header-search--mobile-expanded"), a.input.focus())
                }), mUtil.addEvent(a.iconClose, "click", function () {
                    mUtil.isInResponsiveRange("tablet-and-mobile") && (mUtil.removeClass(o, "m-header-search--mobile-expanded"), r.closeDropdown())
                })) : "dropdown" === a.options.mode && (a.dropdown.on("afterShow", function () {
                    a.input.focus()
                }), mUtil.addEvent(a.iconClose, "click", r.closeDropdown))
            }, showProgress: function () {
                return a.processing = !0, mUtil.addClass(a.form, a.options.spinnerClass), r.handleCancelIconVisibility("off"), a
            }, hideProgress: function () {
                return a.processing = !1, mUtil.removeClass(a.form, a.options.spinnerClass), r.handleCancelIconVisibility("on"), mUtil.addClass(n, a.options.hasResultClass), a
            }, search: function (t) {
                if (a.query = a.input.value, 0 === a.query.length && (r.handleCancelIconVisibility("on"), mUtil.removeClass(n, a.options.hasResultClass), mUtil.removeClass(a.form, a.options.spinnerClass)), !(a.query.length < a.options.minLength || 1 === a.processing)) return a.requestTimeout && clearTimeout(a.requestTimeout), a.requestTimeout = !1, a.requestTimeout = setTimeout(function () {
                    r.eventTrigger("search")
                }, a.options.requestTimeout), a
            }, handleCancelIconVisibility: function (t) {
                "on" === t ? 0 === a.input.value.length ? (a.iconCancel && mUtil.css(a.iconCancel, "visibility", "hidden"), a.iconClose && mUtil.css(a.iconClose, "visibility", "visible")) : (clearTimeout(a.cancelTimeout), a.cancelTimeout = setTimeout(function () {
                    a.iconCancel && mUtil.css(a.iconCancel, "visibility", "visible"), a.iconClose && mUtil.css(a.iconClose, "visibility", "visible")
                }, 500)) : (a.iconCancel && mUtil.css(a.iconCancel, "visibility", "hidden"), a.iconClose && mUtil.css(a.iconClose, "visibility", "hidden"))
            }, handleCancel: function (t) {
                a.input.value = "", mUtil.css(a.iconCancel, "visibility", "hidden"), mUtil.removeClass(n, a.options.hasResultClass), r.closeDropdown()
            }, closeDropdown: function () {
                a.dropdown.hide()
            }, showDropdown: function (t) {
                0 === a.dropdown.isShown() && a.input.value.length > a.options.minLength && 0 === a.processing && (console.log("show!!!"), a.dropdown.show(), t && (t.preventDefault(), t.stopPropagation()))
            }, eventTrigger: function (t) {
                for (i = 0; i < a.events.length; i++) {
                    var e = a.events[i];
                    e.name === t && (1 === e.one ? 0 === e.fired && (a.events[i].fired = !0, e.handler.call(this, a)) : e.handler.call(this, a))
                }
            }, addEvent: function (t, e, n) {
                return a.events.push({name: t, handler: e, one: n, fired: !1}), a
            }
        };
        return a.setDefaults = function (t) {
            l = t
        }, a.search = function () {
            return r.handleSearch()
        }, a.showResult = function (t) {
            return a.dropdown.setContent(t), r.showDropdown(), a
        }, a.showError = function (t) {
            var e = a.options.templates.error.replace("{{message}}", t);
            return a.dropdown.setContent(e), r.showDropdown(), a
        }, a.showProgress = function () {
            return r.showProgress()
        }, a.hideProgress = function () {
            return r.hideProgress()
        }, a.search = function () {
            return r.search()
        }, a.on = function (t, e) {
            return r.addEvent(t, e)
        }, a.one = function (t, e) {
            return r.addEvent(t, e, !0)
        }, r.construct.apply(a, [e]), a
    }
}, mScrollTop = function (t, e) {
    var a = this, n = mUtil.get(t), o = mUtil.get("body");
    if (n) {
        var i = {offset: 300, speed: 600}, l = {
            construct: function (t) {
                return mUtil.data(n).has("scrolltop") ? a = mUtil.data(n).get("scrolltop") : (l.init(t), l.build(), mUtil.data(n).set("scrolltop", a)), a
            }, init: function (t) {
                a.events = [], a.options = mUtil.deepExtend({}, i, t)
            }, build: function () {
                navigator.userAgent.match(/iPhone|iPad|iPod/i) ? (window.addEventListener("touchend", function () {
                    l.handle()
                }), window.addEventListener("touchcancel", function () {
                    l.handle()
                }), window.addEventListener("touchleave", function () {
                    l.handle()
                })) : window.addEventListener("scroll", function () {
                    l.handle()
                }), mUtil.addEvent(n, "click", l.scroll)
            }, handle: function () {
                window.pageYOffset > a.options.offset ? mUtil.addClass(o, "m-scroll-top--shown") : mUtil.removeClass(o, "m-scroll-top--shown")
            }, scroll: function (t) {
                t.preventDefault(), mUtil.scrollTop(a.options.speed)
            }, eventTrigger: function (t, e) {
                for (var n = 0; n < a.events.length; n++) {
                    var o = a.events[n];
                    o.name === t && (1 === o.one ? 0 === o.fired && (a.events[n].fired = !0, o.handler.call(this, a, e)) : o.handler.call(this, a, e))
                }
            }, addEvent: function (t, e, n) {
                a.events.push({name: t, handler: e, one: n, fired: !1})
            }
        };
        return a.setDefaults = function (t) {
            i = t
        }, a.on = function (t, e) {
            return l.addEvent(t, e)
        }, a.one = function (t, e) {
            return l.addEvent(t, e, !0)
        }, l.construct.apply(a, [e]), !0, a
    }
}, mToggle = function (t, e) {
    var a = this, n = mUtil.get(t);
    mUtil.get("body");
    if (n) {
        var o = {togglerState: "", targetState: ""}, l = {
            construct: function (t) {
                return mUtil.data(n).has("toggle") ? a = mUtil.data(n).get("toggle") : (l.init(t), l.build(), mUtil.data(n).set("toggle", a)), a
            }, init: function (t) {
                a.element = n, a.events = [], a.options = mUtil.deepExtend({}, o, t), a.target = mUtil.get(a.options.target), a.targetState = a.options.targetState, a.togglerState = a.options.togglerState, a.state = mUtil.hasClasses(a.target, a.targetState) ? "on" : "off"
            }, build: function () {
                mUtil.addEvent(n, "mouseup", l.toggle)
            }, toggle: function () {
                return "off" === a.state ? l.toggleOn() : l.toggleOff(), a
            }, toggleOn: function () {
                return l.eventTrigger("beforeOn"), mUtil.addClass(a.target, a.targetState), a.togglerState && mUtil.addClass(n, a.togglerState), a.state = "on", l.eventTrigger("afterOn"), l.eventTrigger("toggle"), a
            }, toggleOff: function () {
                return l.eventTrigger("beforeOff"), mUtil.removeClass(a.target, a.targetState), a.togglerState && mUtil.removeClass(n, a.togglerState), a.state = "off", l.eventTrigger("afterOff"), l.eventTrigger("toggle"), a
            }, eventTrigger: function (t) {
                for (i = 0; i < a.events.length; i++) {
                    var e = a.events[i];
                    e.name === t && (1 === e.one ? 0 === e.fired && (a.events[i].fired = !0, e.handler.call(this, a)) : e.handler.call(this, a))
                }
            }, addEvent: function (t, e, n) {
                return a.events.push({name: t, handler: e, one: n, fired: !1}), a
            }
        };
        return a.setDefaults = function (t) {
            o = t
        }, a.getState = function () {
            return a.state
        }, a.toggle = function () {
            return l.toggle()
        }, a.toggleOn = function () {
            return l.toggleOn()
        }, a.toggle = function () {
            return l.toggleOff()
        }, a.on = function (t, e) {
            return l.addEvent(t, e)
        }, a.one = function (t, e) {
            return l.addEvent(t, e, !0)
        }, l.construct.apply(a, [e]), a
    }
}, mWizard = function (t, e) {
    var a = this, n = mUtil.get(t);
    mUtil.get("body");
    if (n) {
        var o = {startStep: 1, manualStepForward: !1}, l = {
            construct: function (t) {
                return mUtil.data(n).has("wizard") ? a = mUtil.data(n).get("wizard") : (l.init(t), l.build(), mUtil.data(n).set("wizard", a)), a
            }, init: function (t) {
                a.element = n, a.events = [], a.options = mUtil.deepExtend({}, o, t), a.steps = mUtil.findAll(n, ".m-wizard__step"), a.progress = mUtil.find(n, ".m-wizard__progress .progress-bar"), a.btnSubmit = mUtil.find(n, '[data-wizard-action="submit"]'), a.btnNext = mUtil.find(n, '[data-wizard-action="next"]'), a.btnPrev = mUtil.find(n, '[data-wizard-action="prev"]'), a.btnLast = mUtil.find(n, '[data-wizard-action="last"]'), a.btnFirst = mUtil.find(n, '[data-wizard-action="first"]'), a.events = [], a.currentStep = 1, a.stop = !1, a.totalSteps = a.steps.length, a.options.startStep > 1 && l.goTo(a.options.startStep), l.updateUI()
            }, build: function () {
                mUtil.addEvent(a.btnNext, "click", function (t) {
                    t.preventDefault(), l.goNext()
                }), mUtil.addEvent(a.btnPrev, "click", function (t) {
                    t.preventDefault(), l.goPrev()
                }), mUtil.addEvent(a.btnFirst, "click", function (t) {
                    t.preventDefault(), l.goFirst()
                }), mUtil.addEvent(a.btnLast, "click", function (t) {
                    t.preventDefault(), l.goLast()
                }), mUtil.on(n, ".m-wizard__step a.m-wizard__step-number", "click", function () {
                    for (var t, e = this.closest(".m-wizard__step"), n = mUtil.parents(this, ".m-wizard__steps"), o = mUtil.findAll(n, ".m-wizard__step"), i = 0, r = o.length; i < r; i++) if (e === o[i]) {
                        t = i + 1;
                        break
                    }
                    t && (!1 === a.options.manualStepForward ? t < a.currentStep && l.goTo(t) : l.goTo(t))
                })
            }, goTo: function (t) {
                if (t !== a.currentStep) {
                    var e;
                    if (e = (t = t ? parseInt(t) : l.getNextStep()) > a.currentStep ? l.eventTrigger("beforeNext") : l.eventTrigger("beforePrev"), !0 !== a.stop) return !1 !== e && (a.currentStep = t, l.updateUI(), l.eventTrigger("change")), t > a.startStep ? l.eventTrigger("afterNext") : l.eventTrigger("afterPrev"), a;
                    a.stop = !1
                }
            }, setStepClass: function () {
                l.isLastStep() ? mUtil.addClass(n, "m-wizard--step-last") : mUtil.removeClass(n, "m-wizard--step-last"), l.isFirstStep() ? mUtil.addClass(n, "m-wizard--step-first") : mUtil.removeClass(n, "m-wizard--step-first"), l.isBetweenStep() ? mUtil.addClass(n, "m-wizard--step-between") : mUtil.removeClass(n, "m-wizard--step-between")
            }, updateUI: function (t) {
                l.updateProgress(), l.handleTarget(), l.setStepClass();
                for (var e = 0, n = a.steps.length; e < n; e++) mUtil.removeClass(a.steps[e], "m-wizard__step--current m-wizard__step--done");
                for (e = 1; e < a.currentStep; e++) mUtil.addClass(a.steps[e - 1], "m-wizard__step--done");
                mUtil.addClass(a.steps[a.currentStep - 1], "m-wizard__step--current")
            }, stop: function () {
                a.stop = !0
            }, start: function () {
                a.stop = !1
            }, isLastStep: function () {
                return a.currentStep === a.totalSteps
            }, isFirstStep: function () {
                return 1 === a.currentStep
            }, isBetweenStep: function () {
                return !1 === l.isLastStep() && !1 === l.isFirstStep()
            }, goNext: function () {
                return l.goTo(l.getNextStep())
            }, goPrev: function () {
                return l.goTo(l.getPrevStep())
            }, goLast: function () {
                return l.goTo(a.totalSteps)
            }, goFirst: function () {
                return l.goTo(1)
            }, updateProgress: function () {
                if (a.progress) if (mUtil.hasClass(n, "m-wizard--1")) {
                    var t = a.currentStep / a.totalSteps * 100, e = mUtil.find(n, ".m-wizard__step-number"),
                        o = parseInt(mUtil.css(e, "width"));
                    mUtil.css(a.progress, "width", "calc(" + t + "% + " + o / 2 + "px)")
                } else if (mUtil.hasClass(n, "m-wizard--2")) {
                    a.currentStep;
                    var i = (a.currentStep - 1) * (1 / (a.totalSteps - 1) * 100);
                    mUtil.isInResponsiveRange("minimal-desktop-and-below") ? mUtil.css(a.progress, "height", i + "%") : mUtil.css(a.progress, "width", i + "%")
                } else {
                    t = a.currentStep / a.totalSteps * 100;
                    mUtil.css(a.progress, "width", t + "%")
                }
            }, handleTarget: function () {
                var t = a.steps[a.currentStep - 1], e = mUtil.get(mUtil.attr(t, "m-wizard-target")),
                    o = mUtil.find(n, ".m-wizard__form-step--current");
                mUtil.removeClass(o, "m-wizard__form-step--current"), mUtil.addClass(e, "m-wizard__form-step--current")
            }, getNextStep: function () {
                return a.totalSteps >= a.currentStep + 1 ? a.currentStep + 1 : a.totalSteps
            }, getPrevStep: function () {
                return a.currentStep - 1 >= 1 ? a.currentStep - 1 : 1
            }, eventTrigger: function (t) {
                for (i = 0; i < a.events.length; i++) {
                    var e = a.events[i];
                    e.name === t && (1 === e.one ? 0 === e.fired && (a.events[i].fired = !0, e.handler.call(this, a)) : e.handler.call(this, a))
                }
            }, addEvent: function (t, e, n) {
                return a.events.push({name: t, handler: e, one: n, fired: !1}), a
            }
        };
        return a.setDefaults = function (t) {
            o = t
        }, a.goNext = function () {
            return l.goNext()
        }, a.goPrev = function () {
            return l.goPrev()
        }, a.goLast = function () {
            return l.goLast()
        }, a.stop = function () {
            return l.stop()
        }, a.start = function () {
            return l.start()
        }, a.goFirst = function () {
            return l.goFirst()
        }, a.goTo = function (t) {
            return l.goTo(t)
        }, a.getStep = function () {
            return a.currentStep
        }, a.isLastStep = function () {
            return l.isLastStep()
        }, a.isFirstStep = function () {
            return l.isFirstStep()
        }, a.on = function (t, e) {
            return l.addEvent(t, e)
        }, a.one = function (t, e) {
            return l.addEvent(t, e, !0)
        }, l.construct.apply(a, [e]), a
    }
};
!function (t) {
    t.fn.mDatatable = t.fn.mDatatable || {}, t.fn.mDatatable.checkbox = function (e, a) {
        var n = {
            selectedAllRows: !1, selectedRows: [], unselectedRows: [], init: function () {
                n.selectorEnabled() && (a.vars.requestIds && e.setDataSourceParam(a.vars.requestIds, !0), n.selectedAllRows = e.getDataSourceParam(a.vars.selectedAllRows), t(e).on("m-datatable--on-layout-updated", function (a, o) {
                    o.table === t(e.wrap).attr("id") && e.ready(function () {
                        n.initVars(), n.initEvent(), n.initSelect()
                    })
                }))
            }, initEvent: function () {
                t(e.tableHead).find('.m-checkbox--all > [type="checkbox"]').click(function (o) {
                    if (n.selectedRows = n.unselectedRows = [], e.stateRemove("checkbox"), t(this).is(":checked") ? n.selectedAllRows = !0 : n.selectedAllRows = !1, !a.vars.requestIds) {
                        t(this).is(":checked") && (n.selectedRows = t.makeArray(t(e.tableBody).find('.m-checkbox--single > [type="checkbox"]').map(function (e, a) {
                            return t(a).val()
                        })));
                        var i = {};
                        i.selectedRows = t.unique(n.selectedRows), e.stateKeep("checkbox", i)
                    }
                    e.setDataSourceParam(a.vars.selectedAllRows, n.selectedAllRows), t(e).trigger("m-datatable--on-click-checkbox", [t(this)])
                }), t(e.tableBody).find('.m-checkbox--single > [type="checkbox"]').click(function (o) {
                    var i = t(this).val();
                    t(this).is(":checked") ? (n.selectedRows.push(i), n.unselectedRows = n.remove(n.unselectedRows, i)) : (n.unselectedRows.push(i), n.selectedRows = n.remove(n.selectedRows, i)), !a.vars.requestIds && n.selectedRows.length < 1 && t(e.tableHead).find('.m-checkbox--all > [type="checkbox"]').prop("checked", !1);
                    var l = {};
                    l.selectedRows = t.unique(n.selectedRows), l.unselectedRows = t.unique(n.unselectedRows), e.stateKeep("checkbox", l), t(e).trigger("m-datatable--on-click-checkbox", [t(this)])
                })
            }, initSelect: function () {
                n.selectedAllRows && a.vars.requestIds ? (e.hasClass("m-datatable--error") || t(e.tableHead).find('.m-checkbox--all > [type="checkbox"]').prop("checked", !0), e.setActiveAll(!0), n.unselectedRows.forEach(function (t) {
                    e.setInactive(t)
                })) : (n.selectedRows.forEach(function (t) {
                    e.setActive(t)
                }), !e.hasClass("m-datatable--error") && t(e.tableBody).find('.m-checkbox--single > [type="checkbox"]').not(":checked").length < 1 && t(e.tableHead).find('.m-checkbox--all > [type="checkbox"]').prop("checked", !0))
            }, selectorEnabled: function () {
                return t.grep(e.options.columns, function (t, e) {
                    return t.selector || !1
                })[0]
            }, initVars: function () {
                var t = e.stateGet("checkbox");
                void 0 !== t && (n.selectedRows = t.selectedRows || [], n.unselectedRows = t.unselectedRows || [])
            }, getSelectedId: function (t) {
                if (n.initVars(), n.selectedAllRows && a.vars.requestIds) {
                    void 0 === t && (t = a.vars.rowIds);
                    var o = e.getObject(t, e.lastResponse) || [];
                    return o.length > 0 && n.unselectedRows.forEach(function (t) {
                        o = n.remove(o, parseInt(t))
                    }), o
                }
                return n.selectedRows
            }, remove: function (t, e) {
                return t.filter(function (t) {
                    return t !== e
                })
            }
        };
        return e.checkbox = function () {
            return n
        }, "object" == typeof a && (a = t.extend(!0, {}, t.fn.mDatatable.checkbox.default, a), n.init.apply(this, [a])), e
    }, t.fn.mDatatable.checkbox.default = {
        vars: {
            selectedAllRows: "selectedAllRows",
            requestIds: "requestIds",
            rowIds: "meta.rowIds"
        }
    }
}(jQuery);
var mQuickSidebar = function () {
    var t = $("#m_quick_sidebar"), e = $("#m_quick_sidebar_tabs"), a = t.find(".m-quick-sidebar__content"),
        n = function () {
            !function () {
                var a = $("#m_quick_sidebar_tabs_messenger");
                if (0 !== a.length) {
                    var n = a.find(".m-messenger__messages"), o = function () {
                        var o = t.outerHeight(!0) - e.outerHeight(!0) - a.find(".m-messenger__form").outerHeight(!0) - 120;
                        n.css("height", o), mApp.initScroller(n, {})
                    };
                    o(), mUtil.addResizeHandler(o)
                }
            }(), function () {
                var t = $("#m_quick_sidebar_tabs_settings");
                if (0 !== t.length) {
                    var a = function () {
                        var a = mUtil.getViewPort().height - e.outerHeight(!0) - 60;
                        t.css("height", a), mApp.initScroller(t, {})
                    };
                    a(), mUtil.addResizeHandler(a)
                }
            }(), function () {
                var t = $("#m_quick_sidebar_tabs_logs");
                if (0 !== t.length) {
                    var a = function () {
                        var a = mUtil.getViewPort().height - e.outerHeight(!0) - 60;
                        t.css("height", a), mApp.initScroller(t, {})
                    };
                    a(), mUtil.addResizeHandler(a)
                }
            }()
        };
    return {
        init: function () {
            0 !== t.length && new mOffcanvas("m_quick_sidebar", {
                overlay: !0,
                baseClass: "m-quick-sidebar",
                closeBy: "m_quick_sidebar_close",
                toggleBy: "m_quick_sidebar_toggle"
            }).one("afterShow", function () {
                mApp.block(t), setTimeout(function () {
                    mApp.unblock(t), a.removeClass("m--hide"), n()
                }, 1e3)
            })
        }
    }
}();
$(document).ready(function () {
    mQuickSidebar.init()
});