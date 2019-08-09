const SnippetLogin = function () {

    const login = $('#m_login');

    const showErrorMsg = function (form, type, msg) {
        const alert = $('<div class="m-alert m-alert--outline alert alert-' + type + ' alert-dismissible" role="alert">\
			<button type="button" class="close" data-dismiss="alert" aria-label="Close"></button>\
			<span></span>\
		</div>');

        form.find('.alert').remove();
        alert.prependTo(form);
        //alert.animateClass('fadeIn animated');
        mUtil.animateClass(alert[0], 'fadeIn animated');
        alert.find('span').html(msg);
    };

    //== Private Functions

    const displayUsageForm = function () {
        login.removeClass('m-login--forget-password');
        login.removeClass('m-login--signin');

        login.addClass('m-login--usage');
        mUtil.animateClass(login.find('.m-login__usage')[0], 'flipInX animated');
    };

    const displaySignInForm = function () {
        login.removeClass('m-login--forget-password');
        login.removeClass('m-login--usage');

        login.addClass('m-login--signin');
        mUtil.animateClass(login.find('.m-login__signin')[0], 'flipInX animated');
        //login.find('.m-login__signin').animateClass('flipInX animated');
    };

    const displayForgetPasswordForm = function () {
        login.removeClass('m-login--signin');
        login.removeClass('m-login--usage');

        login.addClass('m-login--forget-password');
        //login.find('.m-login__forget-password').animateClass('flipInX animated');
        mUtil.animateClass(login.find('.m-login__forget-password')[0], 'flipInX animated');

    };

    const handleFormSwitch = function () {
        $('#m_login_forget_password').click(function (e) {
            e.preventDefault();
            displayForgetPasswordForm();
        });

        $('#m_login_forget_password_cancel').click(function (e) {
            e.preventDefault();
            displaySignInForm();
        });

        $('#m_login_usage').click(function (e) {
            e.preventDefault();
            displayUsageForm();
        });

        $('#m_login_usage_cancel').click(function (e) {
            e.preventDefault();
            displaySignInForm();
        });
    };

    const handleSignInFormSubmit = function () {
        $('#m_login_signin_submit').click(function (e) {
            e.preventDefault();
            const btn = $(this);
            const form = $(this).closest('form');

            form.validate({
                rules: {
                    username: {
                        required: true,
                    },
                    password: {
                        required: true
                    }
                }
            });

            if (!form.valid()) {
                return;
            }

            btn.addClass('m-loader m-loader--right m-loader--light').attr('disabled', true);

            form.ajaxSubmit({
                url: '/api/check',
                success: function (response, status, xhr, $form) {
                    // similate 2s delay
                    if (response['info'] === -1) {
                        setTimeout(function () {
                            btn.removeClass('m-loader m-loader--right m-loader--light').attr('disabled', false);
                            showErrorMsg(form, 'danger', 'Incorrect username or password.');
                        }, 2000);
                        return;
                    }
                    if ($form.find('input[name="remember"]').get(0).checked) {
                        document.cookie = "up=" + response['info'] + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
                    } else {
                        document.cookie = "up=" + response['info'];
                    }
                    // TODO jump back
                }
            });
        });
    };

    return {
        init: function () {
            handleFormSwitch();
            handleSignInFormSubmit();
        }
    };
}();

jQuery(document).ready(function () {
    SnippetLogin.init();
});