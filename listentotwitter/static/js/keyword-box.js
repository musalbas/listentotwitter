function redirectKeyword(keyword) {
    if (keyword.indexOf('/') >= 0) {
        alert("Keywords shouldn't contain '/' mate.");
    } else if (keyword == '') {
        document.location.href = '/';
    } else {
        document.location.href = '/keyword/' + keyword;
    }
}

$(document).ready(function() {
    $('#keyword-form #keyword-input').focus();

    $('#keyword-form').submit(function() {
        redirectKeyword($('#keyword-form #keyword-input').val());
    });

    $('#keyword-form #keyword-input').focus(function() {
        $(this).select();
    });

    $('#keyword-form #keyword-input').trigger('focus');
});
