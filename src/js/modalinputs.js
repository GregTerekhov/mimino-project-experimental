document.addEventListener("DOMContentLoaded", function (e) {
    // default
    var els = document.querySelectorAll(".js-select");
    els.forEach(function (select) {
        NiceSelect.bind(select);
    });
    // seachable
    // var options = { searchable: true };
    // NiceSelect.bind(document.getElementById("seachable-select"), options);
});