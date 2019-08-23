let GradeAddTerm = function () {
    let add = $('#add-term #m_accordion_8');
    let table = $('#add-table');

    let addTerm = function () {
        let year = new Date().getFullYear();
        let toggle_table = function (y, t) {
            add.find('#cb__' + y + '_' + t).change(function () {
                if ($(this).is(':checked')) {
                    init_data_table(y, t);
                    GradeData.init();
                } else {
                    let box = table.find('#table__' + y + '_' + t);
                    box.animate({
                        opacity: 0
                    }, 500);
                    box.animate({
                        height: 0,
                        marginTop: 0
                    }, 700, function () {
                        box.remove();
                        $('#gp__sum').trigger('gp--update');
                    });
                }
            });
        };
        for (let i = 0; i < 5; ++i) {
            if (i === 0 && new Date().getMonth() < '9' && new Date().getDate() < '25') continue;
            let c_y = year - i;
            let cnt = i + 1;
            add.append(`
                <div class="m-accordion m-accordion--default m-accordion--solid m-accordion--section m-accordion--padding-lg" id="m_accordion_8" role="tablist">
                    <div class="m-accordion__item">
                        <div class="m-accordion__item-head collapsed" role="tab" id="m_accordion_8_item_` + cnt + `_head" data-toggle="collapse" href="#m_accordion_8_item_` + cnt + `_body" aria-expanded="false" style="padding: 15px 28px; margin-top: 10px">
                            <span class="m-accordion__item-title">
                                ` + c_y + '  学年' + `
                            </span>
                            <span class="m-accordion__item-mode"></span>
                        </div>
                        <div class="m-accordion__item-body collapse" id="m_accordion_8_item_` + cnt + `_body" role="tabpanel" aria-labelledby="m_accordion_8_item_1_head" data-parent="#m_accordion_8" style="">
                            <div class="m-accordion__item-content">
                                <div class="m-checkbox-list">
                                    <label class="m-checkbox m-checkbox--square">
                                        <input type="checkbox" value="0" id="` + 'cb__' + c_y + '_0' + `">
                                            上学期
                                        <span></span>
                                    </label>
                                    <label class="m-checkbox m-checkbox--square">
                                        <input type="checkbox" value="1" id="` + 'cb__' + c_y + '_1' + `">
                                            下学期
                                        <span></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
            if (i === 0) add.find('#cb__' + year + '_1').attr('disabled', 'disabled');
            toggle_table(c_y, 0);
            toggle_table(c_y, 1);
        }
        if (new Date().getMonth() > 3) {
            add.find('#cb__' + (year - 1) + '_1').attr('checked', 'checked');
        } else {
            add.find('#cb__' + (year - 1) + '_0').attr('checked', 'checked');
        }
    };

    let init_data_table = function (year, term) {
        let id_body = year + '_' + term;
        table.children().eq(0).after(`
            <div class="m-portlet m-portlet--mobile" style="margin-bottom: 0; margin-top: 15px" id="table__` + id_body + `">
                <div class="m-portlet__head">
                    <div class="m-portlet__head-caption">
                        <div class="m-portlet__head-title">
                            <h3 class="m-portlet__head-text">
                                <div>
                                    <span style="margin-right: 100px">
                                        TITLE: ` + '  ' + year + ' 学年 (' + (term === 0 ? '上' : '下') +  '学期)' + ` 
                                    </span>
                                    学分绩：
                                    <span id="gp__` + id_body + `"></span>
                                </div>
                            </h3>
                        </div>
                    </div>

                    <div class="m-portlet__head-tools">
                        <ul class="m-portlet__nav">
                            <li class="m-portlet__nav-item">
                                <div class="m-dropdown m-dropdown--inline m-dropdown--arrow m-dropdown--align-right m-dropdown--align-push"
                                     m-dropdown-toggle="hover" aria-expanded="true">
                                    <a href="#" class="m-portlet__nav-link btn btn-lg btn-secondary  m-btn m-btn--icon m-btn--icon-only m-btn--pill  m-dropdown__toggle">
                                        <i class="la la-ellipsis-h m--font-brand"></i>
                                    </a>
                                    <div class="m-dropdown__wrapper" style="z-index: 101;">
                                        <span class="m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust" style="left: auto; right: 21.5px;"></span>
                                        <div class="m-dropdown__inner">
                                            <div class="m-dropdown__body">
                                                <div class="m-dropdown__content">
                                                    <ul class="m-nav">
                                                        <li class="m-nav__section m-nav__section--first">
                                                            <span class="m-nav__section-text">
                                                                Quick Actions
                                                            </span>
                                                        </li>
                                                        <li class="m-nav__item">
                                                            <a href="#" class="m-nav__link" id="rm__table_` + id_body + `">
                                                                <i class="m-nav__link-icon flaticon-delete-1"></i>
                                                                <span class="m-nav__link-text">
                                                                    Remove This Table
                                                                </span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="m-portlet__body">
                    <div class="m_datatable" year="` + (year % 100) + `" term="` + term + `" credit="0" grade="0">
                    </div>
                </div>
            </div>
        `);
        table.find('#rm__table_' + id_body).click(function () {
            add.find('#cb__' + id_body).click();
        });

        table.find('#table__' + id_body + ' .m_datatable').on('gp--update', function () {
            let credit = parseFloat($(this).attr('credit')), grade = parseFloat($(this).attr('grade'));
            table.find('#gp__' + id_body)
                .text((credit === 0 || isNaN(credit + grade)) ? '-' : (grade / credit).toFixed(2));
        });
    };

    let init_gp_sum = function () {
        $('#gp__sum').on('gp--update', function () {
            let credit = 0, grade = 0;
            $('.m_datatable').each(function () {
                credit += parseFloat($(this).attr('credit'));
                grade += parseFloat($(this).attr('grade'));
            });
            let res = (grade / credit).toFixed(2);
            let status;
            if (isNaN(res)) {
                status = 'secondary';
            } else {
                if (res < 60) {
                    status = 'danger'
                } else if (res < 80) {
                    status = 'warning';
                } else if (res < 90) {
                    status = 'accent';
                } else status = 'success';
            }
            $(this).html(`
                <span class="m-badge m-badge--` + status + ` m-badge--wide" style="font-size: 2.3rem; padding: 9px 20px; border-radius: 5rem">
                    ` + (isNaN(res) ? '-' : res) + `
                </span>
            `);
        });
    };

    return {
        init_add_menu: function () {
            addTerm();
        },
        init_data_table: function (year, term) {
            init_data_table(year, term);
        },
        init_gp_sum: function () {
            init_gp_sum();
        }
    }
}();

jQuery(document).ready(function () {
    GradeAddTerm.init_add_menu();
    GradeAddTerm.init_gp_sum();
    if (new Date().getMonth() > 3) {
        GradeAddTerm.init_data_table(new Date().getFullYear() - 1, 1);
    } else {
        GradeAddTerm.init_data_table(new Date().getFullYear() - 1, 0);
    }
    GradeData.init();
});
