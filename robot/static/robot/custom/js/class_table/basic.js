const CalendarBasic = function () {
    return {
        init: function () {
            $.get('/api/ct', function(data, status) {
                $('#m_calendar').fullCalendar({
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay,listWeek'
                    },
                    editable: false,
                    eventLimit: true, // allow "more" link when too many events
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
                });
            });

            $('#export_ct').click(function () {
                let a = document.createElement('a');
                a.setAttribute('download', 'ClassTable.ics');
                a.setAttribute('href', '/api/exp_ct');
                a.click();
                a.remove();
            });
        }
    };
}();

jQuery(document).ready(function() {
    CalendarBasic.init();
});