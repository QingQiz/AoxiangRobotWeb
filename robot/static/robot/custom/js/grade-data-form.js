let GradeDataForm = function (year, term) {
    let status_template = function(row, field) {
        if (row[field] === null) return '';
        let status;
        let grade = parseFloat(row[field]);
        if (!isNaN(grade)) {
            if (grade < 60) {
                status = 'danger';
            } else if (grade < 80) {
                status = 'warning';
            } else if (grade < 90) {
                status = 'accent';
            } else {
                status = 'success';
            }
        } else {
            if (row[field] === 'P') status = 'success';
            else status = 'secondary';
        }
        return `
            <span style="width: 110px;">
                <span class="m--font-bold m--font-` + status + `" style="font-size: 1.3rem">
                    ` + row[field] + `
                </span>
            </span>`;
    };
    return {
        data: {
            type: 'remote',
            source: '/api/grade?y=' + year + '&t=' + term,
            pageSize: 100,
        },

        layout: {
            theme: 'default',
            class: '',
            scroll: true,
            footer: false
        },

        sortable: true,

        pagination: true,

        search: {
            input: $('#generalSearch')
        },

        columns: [{
            field: "",
            title: "",
            width: 20,
            sortable: 0,
            textAlign: "center",
            selector: {
                class: "m-checkbox m-checkbox--square grade-point-select",
                checked: true
            },
        }, {
            field: "name",
            title: "Name",
            width: '160px',
            sortable: 'asc',
            textAlign: 'left',
            template: function (row) {
                let name = row.name;
                let index = name.indexOf('实验');
                if (index !== -1) {
                    return `
                        <span style="width: 110px;">
                            <span style="font-size: 1rem">
                                ` + name.slice(0, index) + `
                            </span>
                            <span class="m--font-bold m--font-success" style="font-size: 1rem">
                                实验
                            </span>
                            <span style="font-size: 1rem">
                                ` + name.slice(index + 2) + `
                            </span>
                        </span>`;
                } else {
                    return `
                        <span style="width: 110px;"><span style="font-size: 1rem">` + name + `</span></span>
                    `
                }
            }
        }, {
            field: "credit",
            title: "学分",
            width: '30px',
            textAlign: "center",
            template: function (row) {
                return `<span style="font-size: 1.1rem">` + row.credit + `</span>`;
            }
        }, {
            field: "usual",
            title: "平时成绩",
            width: '80px',
            textAlign: "center",
            template: function (row) {
                return status_template(row, 'usual');
            }
        }, {
            field: "midTerm",
            title: "期中成绩",
            width: '80px',
            textAlign: "center",
            template: function (row) {
                return status_template(row, 'midTerm');
            }
        }, {
            field: "experimental",
            title: "实验成绩",
            width: '80px',
            textAlign: "center",
            template: function (row) {
                return status_template(row, 'experimental');
            }
        }, {
            field: "endTerm",
            title: "期末成绩",
            width: '80px',
            textAlign: "center",
            template: function (row) {
                return status_template(row, 'endTerm');
            }
        }, {
            field: "makeUp",
            title: "补考成绩",
            width: '80px',
            textAlign: "center",
            template: function (row) {
                return status_template(row, 'makeUp');
            }
        }, {
            field: "total",
            title: "总评成绩",
            width: '80px',
            textAlign: "center",
            template: function (row) {
                return status_template(row, 'total');
            }
        }, {
            field: "final",
            title: "最终",
            width: '80px',
            textAlign: "center",
            template: function (row) {
                let status;
                let grade = parseFloat(row.final);
                if (!isNaN(grade)) {
                    if (grade < 60) {
                        status = 'danger';
                    } else if (grade < 80) {
                        status = 'warning';
                    } else if (grade < 90) {
                        status = 'accent';
                    } else {
                        status = 'success';
                    }
                } else {
                    if (row.final === 'P') status = 'success';
                    else status = 'secondary';
                }

                return `
                    <span style="width: 110px;">
                        <span class="m-badge m-badge--` + status + ` m-badge--wide" style="font-size: 1.3rem;">` + row.final + `</span>
                    </span>`;
            }
        }, {
            field: "GP",
            title: "绩点",
            width: '30px',
            textAlign: "center",
            template: function (row) {
                return `<span style="font-size: 1.1rem">` + row.GP + `</span>`;
            }
        }, {
            field: "Actions",
            width: 110,
            title: "Actions",
            sortable: false,
            overflow: 'visible',
            template: function (row, index, datatable) {
                let dropup = (datatable.getPageSize() - index) <= 4 ? 'dropup' : '';
                return `
                    <div class="dropdown ${dropup}">
                        <a href="#" class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown">
                            <i class="la la-ellipsis-h"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item" href="#"><i class="la la-edit"></i> Edit Details</a>
                            <a class="dropdown-item" href="#"><i class="la la-leaf"></i> Update Status</a>
                            <a class="dropdown-item" href="#"><i class="la la-print"></i> Generate Report</a>
                        </div>
                    </div>
                    <a href="#" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="Download">
                        <i class="la la-download"></i>
                    </a>
                    <a href="#" class="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill" title="Edit settings">
                        <i class="la la-cog"></i>
                    </a>`;
            }
        }]
    }
};