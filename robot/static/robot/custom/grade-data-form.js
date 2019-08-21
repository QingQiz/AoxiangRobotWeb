let GradeDataForm = function (year, term) {
    return {
        data: {
            type: 'remote',
            source: '/api/grade?y=' + year + '&t=' + term,
            pageSize: 20,
        },

        layout: {
            theme: 'default', // datatable theme
            class: '', // custom wrapper class
            scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
            footer: false // display/hide footer
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
                class: "m-checkbox m-checkbox--square",
                checked: true
            },
        }, {
            field: "name",
            title: "Name",
            textAlign: 'left'
        }, {
            field: "credit",
            title: "学分"
        }, {
            field: "usual",
            title: "平时成绩"
        }, {
            field: "midTerm",
            title: "期中成绩",
        }, {
            field: "experimental",
            title: "实验成绩",
        }, {
            field: "endTerm",
            title: "期末成绩",
        }, {
            field: "makeUp",
            title: "补考成绩"
        }, {
            field: "total",
            title: "总评成绩",
            // template: function (row) {
            //     let status = {
            //     };
            //     return '<span class="m-badge ' + status[row.Status].class + ' m-badge--wide">' + status[row.Status].title + '</span>';
            // }
        }, {
            field: "final",
            title: "最终",
            // template: function (row) {
            //     let status = {
            //     };
            //     return '<span class="m-badge m-badge--' + status[row.Type].state + ' m-badge--dot"></span>&nbsp;<span class="m--font-bold m--font-' + status[row.Type].state + '">' + status[row.Type].title + '</span>';
            // }
        }, {
            field: "GP",
            title: "绩点"
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