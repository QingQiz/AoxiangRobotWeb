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
                    // self.search($(this).val(), 'Status');
                }).val(typeof query.Status !== 'undefined' ? query.Status : '');

                $('#m_form_type').on('change', function () {
                    // self.search($(this).val(), 'Type');
                }).val(typeof query.Type !== 'undefined' ? query.Type : '');

                $('#m_form_status, #m_form_type').selectpicker();

            }, 1000 * index);
            let wait_response = function () {
                if (self.lastResponse === undefined) {
                    setTimeout(wait_response, 100);
                } else {
                    let response = self.lastResponse;
                    if (response['error'] !== undefined) return;
                    if (response[0] === undefined) return;

                    let flg = {};
                    for (let i in response[0]) flg[i] = 0;
                    for (let i in flg) flg[i] = 0;
                    for (let i in response) {
                        for (let j in response[i]) {
                            if (response[i][j] !== null) {
                                flg[j]++;
                            }
                        }
                    }
                    for (let i in flg) {
                        if (flg[i] === 0) {
                            self.columns(i).visible(0);
                        }
                    }
                }
            };
            wait_response();
        });
    };
    return {
        init: function () {
            grade();
        }
    };
}();
