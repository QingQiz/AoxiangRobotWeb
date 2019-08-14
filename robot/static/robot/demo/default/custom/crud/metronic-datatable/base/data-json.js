//== Class definition

const DatatableJsonRemoteDemo = function () {
    //== Private functions

    // basic demo
    const demo = function () {

        const datatable = $('.m_datatable').mDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: '/api/grade',
                pageSize: 20,
            },

            // layout definition
            layout: {
                theme: 'default', // datatable theme
                class: '', // custom wrapper class
                scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
                footer: false // display/hide footer
            },

            // column sorting
            sortable: true,

            pagination: true,

            search: {
                input: $('#generalSearch')
            },

            // columns definition
            columns: [{
                field: "name",
                title: "#",
                // width: 110,
                // sortable: false,
                selector: false,
                textAlign: 'left'
            }, {
                field: "credit",
                title: "学分"
            }, {
                field: "usual",
                title: "平时成绩"
                /*
                template: function (row) {
                    // callback function support for column rendering
                    return row.ShipCountry + ' - ' + row.ShipCity;
                }
                */

            }, {
                field: "midTerm",
                title: "期中成绩",
                // width: 110
            }, {
                field: "experimental",
                title: "实验成绩",
                responsive: {visible: 'lg'}
            }, {
                field: "endTerm",
                title: "期末成绩",
                responsive: {visible: 'lg'}
            }, {
                field: "makeUp",
                // title: "补考成绩",
                // // type: "date",
                // format: "MM/DD/YYYY"
            }, {
                field: "total",
                title: "总评成绩",
                // callback function support for column rendering
                // template: function (row) {
                //     const status = {
                //         1: {'title': 'Pending', 'class': 'm-badge--brand'},
                //         2: {'title': 'Delivered', 'class': ' m-badge--metal'},
                //         3: {'title': 'Canceled', 'class': ' m-badge--primary'},
                //         4: {'title': 'Success', 'class': ' m-badge--success'},
                //         5: {'title': 'Info', 'class': ' m-badge--info'},
                //         6: {'title': 'Danger', 'class': ' m-badge--danger'},
                //         7: {'title': 'Warning', 'class': ' m-badge--warning'}
                //     };
                //     return '<span class="m-badge ' + status[row.Status].class + ' m-badge--wide">' + status[row.Status].title + '</span>';
                // }
            }, {
                field: "final",
                title: "最终",
                // callback function support for column rendering
                // template: function (row) {
                //     const status = {
                //         1: {'title': 'Online', 'state': 'danger'},
                //         2: {'title': 'Retail', 'state': 'primary'},
                //         3: {'title': 'Direct', 'state': 'accent'}
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
                    const dropup = (datatable.getPageSize() - index) <= 4 ? 'dropup' : '';
                    return '\
						<div class="dropdown ' + dropup + '">\
							<a href="#" class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown">\
                                <i class="la la-ellipsis-h"></i>\
                            </a>\
						  	<div class="dropdown-menu dropdown-menu-right">\
						    	<a class="dropdown-item" href="#"><i class="la la-edit"></i> Edit Details</a>\
						    	<a class="dropdown-item" href="#"><i class="la la-leaf"></i> Update Status</a>\
						    	<a class="dropdown-item" href="#"><i class="la la-print"></i> Generate Report</a>\
						  	</div>\
						</div>\
						<a href="#" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="Download">\
							<i class="la la-download"></i>\
						</a>\
						<a href="#" class="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill" title="Edit settings">\
							<i class="la la-cog"></i>\
						</a>\
					';
                }
            }]
        });

        const query = datatable.getDataSourceQuery();

        $('#m_form_status').on('change', function () {
            datatable.search($(this).val(), 'Status');
        }).val(typeof query.Status !== 'undefined' ? query.Status : '');

        $('#m_form_type').on('change', function () {
            datatable.search($(this).val(), 'Type');
        }).val(typeof query.Type !== 'undefined' ? query.Type : '');

        $('#m_form_status, #m_form_type').selectpicker();

    };

    return {
        // public functions
        init: function () {
            demo();
        }
    };
}();

jQuery(document).ready(function () {
    DatatableJsonRemoteDemo.init();
});