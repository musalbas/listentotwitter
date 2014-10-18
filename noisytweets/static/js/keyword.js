$(document).ready(function() {
    keyword = window.location.pathname.split('/')[2];
    NoisyClient.setup(keyword);
    window.setInterval(function () { NoisyClient.ping(); }, 10000);
});
