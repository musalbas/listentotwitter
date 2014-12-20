var keywordBoxTipShowing = false;
var keywordBoxTipLastMessage = '';
var keywordChanged = false;

function redirectKeyword(keyword) {
    document.location.href = '/' + encodeURIComponent(keyword);
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

function reshowKeywordBoxTip() {
    if (keywordBoxTipShowing) {
        removeKeywordBoxTip();
        showKeywordBoxTip(keywordBoxTipLastMessage, false);
    }
}

function showKeywordBoxTip(message, fadeIn) {
    fadeIn = typeof fadeIn !== 'undefined' ? fadeIn : true;

    if (keywordBoxTipShowing) {
        return false;
    }

    keywordBoxTipShowing = true;
    keywordBoxTipLastMessage = message;

    $('#keyword-form #keyword-input').tooltipsy({
        content: message,
        showEvent: null,
        hideEvent: null,
        offset: [0, 1],
        show: fadeIn ? function(e, $el) {
            $el.fadeIn(300);
        } : function(e, $el) {
            $el.fadeIn(0);
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

    $(window).resize(function() {
        reshowKeywordBoxTip();
    });

    $(window).scroll(function() {
        reshowKeywordBoxTip();
    });

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
