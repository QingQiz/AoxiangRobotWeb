let CalendarForm = function () {
    let cal = $('#m_calendar');
    let aniTime = 600;
    $('#btnSelCampus').css('pointer-events', 'none');
    cal.css('pointer-events', 'none').animate({
        opacity: 0,
    }, {
        duration: aniTime,
        complete: function () {
            $.ajax({
                url: '/ax/api/ct?cp=' + $('#btnSelCampus').attr('campus'),
                headers: {
                    'X-CSRFToken': Cookies.get('csrftoken')
                },
                type: 'POST',
                success: function (data) {
                    cal.fullCalendar('destroy').fullCalendar({
                        header: {
                            left: 'prev,next today',
                            center: 'title',
                            right: 'month,agendaWeek,agendaDay,listWeek'
                        },
                        editable: false,
                        eventLimit: true,
                        navLinks: true,
                        events: data,
                        eventRender: function (event, element) {
                            if (element.hasClass('fc-day-grid-event')) {
                                element.data('content', event.description);
                                element.data('placement', 'top');
                                mApp.initPopover(element);
                            } else if (element.hasClass('fc-time-grid-event')) {
                                element.find('.fc-title').append('<div class="fc-description">' + event.description + '</div>');
                            } else if (element.find('.fc-list-item-title').lenght !== 0) {
                                element.find('.fc-list-item-title').append('<div class="fc-description">' + event.description + '</div>');
                            }
                        }
                    }).fullCalendar('render');
                    cal.animate({
                        opacity: 1
                    }, {
                        duration: aniTime,
                        complete: function () {
                            cal.css('pointer-events', 'unset');
                            $('#btnSelCampus').css('pointer-events', 'unset');
                        }
                    });
                }
            });
        }
    });
};

let CalendarBasic = function () {
    return {
        init: function () {
            CalendarForm();
            $('#btnSelCampus').change(function () {
                CalendarForm();
            });

            $('#export_ct').click(function () {
                window.open('/ax/api/exp_ct.ics?cp=' + $('#btnSelCampus').attr('campus'));
            });
        }
    };
}();

jQuery(document).ready(function() {
    CalendarBasic.init();
});