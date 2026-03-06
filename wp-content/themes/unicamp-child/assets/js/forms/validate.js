
$(document).on("keypress keyup blur", ".allownumericwithdecimal", function () {
    $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
    if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
        event.preventDefault();
    }
});


$(document).on("keypress keyup blur", ".allownumericwithoutdecimal", function () {
    $(this).val($(this).val().replace(/[^0-9]/g, ''));
    if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
        event.preventDefault();
    }
});

$(document).on("keypress keyup blur", ".UpperLetter", function () {
    $(this).val($(this).val().toUpperCase());
});

//$(document).on("keypress keyup blur", ".allownumericwithdecimalandAB", function () {
//    $(this).val($(this).val().replace(/[^A-B0-9\. ]/, ''));
//    if ((event.which != 46 || $(this).val().indexOf('.') != -1 || $(this).val().indexOf('A') != -1) && (event.which < 48 || event.which > 57)) {
//        event.preventDefault();
//    }
//});

$(document).on("keypress keyup blur", ".allownumericwithdecimalandAB", function () {
    $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
    if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
        event.preventDefault();
    }
});

