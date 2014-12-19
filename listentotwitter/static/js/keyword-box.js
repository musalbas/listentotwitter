var keywordBoxTipShowing = false;
var keywordChanged = false;

function redirectKeyword(keyword) {
    if (keyword.indexOf('/') >= 0) {
        alert("Keywords shouldn't contain '/' mate.");
    } else if (keyword == '') {
        document.location.href = '/';
    } else {
        document.location.href = '/keyword/' + keyword;
    }
}

function removeKeywordBoxTip() {
    if (!keywordBoxTipShowing) {
        return false;
    }

    $('#keyword-form #keyword-input').data('tooltipsy').hide();
    $('#keyword-form #keyword-input').data('tooltipsy').destroy();

    keywordBoxTipShowing = false;

    return true;
}

function showKeywordBoxTip(message) {
    if (keywordBoxTipShowing) {
        return false;
    }

    keywordBoxTipShowing = true;

    $('#keyword-form #keyword-input').tooltipsy({
        content: message,
        showEvent: null,
        hideEvent: null,
        offset: [0, 1],
        show: function(e, $el) {
            $el.fadeIn(300);
        },
    });
    $('#keyword-form #keyword-input').data('tooltipsy').show();

    return true;
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

    if ($('#keyword-form #keyword-input').val() == '') {
        showKeywordBoxTip("Type a word and press enter.");
    } else {
        function showKeywordBoxTipMessage() {
            keywordChanged = true;
            showKeywordBoxTip("Press enter to change keyword.");
        }

        $('#keyword-form #keyword-input').on('input', function() {
            showKeywordBoxTipMessage();
        });

        $('#keyword-form #keyword-input').focus(function() {
            if (keywordChanged) {
                showKeywordBoxTipMessage();
            }
        });

        $('#keyword-form #keyword-input').on('blur', function() {
            removeKeywordBoxTip();
        });
    }
});
