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
                    delete query[''];
                    self.setDataSourceQuery(query);
                    let val = parseInt($(this).val());
                    switch (val) {
                        case 0:
                            self.search('', 'final');
                            break;
                        case 1:
                            self.search([
                                function (index) {
                                    let num = parseFloat(index[0]);
                                    if (isNaN(num)) return false;
                                    return num < 80;
                                },
                                ['final']
                            ]);
                            break;
                        case 2:
                            self.search([
                                function (index) {
                                    let final = parseFloat(index[0]);
                                    if (isNaN(final)) return false;
                                    return final >= 80;
                                },
                                ['final']
                            ]);
                            break;
                        case 3:
                            self.search([
                                function (index) {
                                    let makeUp = parseFloat(index[0]), total = parseFloat(index[1]);
                                    if (isNaN(makeUp) || isNaN(total)) return false;
                                    return (makeUp >= 60 && total < 60);
                                },
                                ['makeUp', 'total']
                            ]);
                            break;
                        case 4:
                            self.search([
                                function (index) {
                                    let makeUp = parseFloat(index[0]);
                                    if (isNaN(makeUp)) return false;
                                    return makeUp < 60;
                                },
                                ['makeUp']
                            ]);
                            break;
                    }
                });


                $('#m_form_type').on('change', function () {
                    delete query['name'];
                    self.setDataSourceQuery(query);
                    let val = parseInt($(this).val());

                    switch (val) {
                        case 0:
                            self.search('', 'name');
                            break;
                        case 1:
                            self.search('实验', 'name');
                            break;
                        case 2:
                            self.search(function (s) {
                                return s.indexOf('实验') === -1;
                            }, 'name');
                            break;
                    }
                });

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
