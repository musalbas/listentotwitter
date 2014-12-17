function redirectKeyword(keyword) {
    document.location.href = '/keyword/' + keyword;
}

$(document).ready(function() {
    $('#keyword-form #keyword-input').focus();

    $('#keyword-form').submit(function() {
        redirectKeyword($('#keyword-form #keyword-input').val());
    });

    $('#keyword-form #keyword-input').focus(function() {
        if (this.setSelectionRange) {
            var len = $(this).val().length * 2;
            this.setSelectionRange(len, len);
        } else {
            $(this).val($(this).val());
        }
    });

    $('#keyword-form #keyword-input').trigger('focus');
});
