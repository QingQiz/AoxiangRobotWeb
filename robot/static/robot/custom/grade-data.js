let GradeData = function () {
    let grade = function () {
        let datatable = $('.m_datatable');
        datatable.each(function (index) {
            let self = $(this);
            if (self.find('table').length !== 0) return;
            setTimeout(function() {
                self.mDatatable(GradeDataForm(self.attr('year'), self.attr('term')));
                let query = self.getDataSourceQuery();

                $('#m_form_status').on('change', function () {
                    self.search($(this).val(), 'Status');
                }).val(typeof query.Status !== 'undefined' ? query.Status : '');

                $('#m_form_type').on('change', function () {
                    self.search($(this).val(), 'Type');
                }).val(typeof query.Type !== 'undefined' ? query.Type : '');

                $('#m_form_status, #m_form_type').selectpicker();
            }, 1000 * index);
        });
    };
    return {
        init: function () {
            grade();
        }
    };
}();
