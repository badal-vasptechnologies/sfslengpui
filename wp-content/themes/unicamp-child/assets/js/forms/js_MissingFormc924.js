$(document).on('change', '.Rb_form', function () {
    var val = $("input:radio[name='Rb_form']:checked").val();

    if (val == "No")
    {
        
        $('.form-div').hide();
        $('.mob-div').show();
        ActiveSession();
    }
    else
    {
        $('.form-div').show();
        $('.mob-div').hide();
    }

});
$(document).on('click', '.btn-print', function () {
    var formid = $.trim($('.txt-form').val());
    if (formid == '') {
        easyAlert('Please Enter Form Id');
    }
    else
    {
        window.location.href = "print?id="+formid;
    }
});

$(document).on('click', '.btn-validate', function () {
    var sess = $.trim($('.cmb-year option:selected').val()); if (sess == undefined) { sess = ''; }
    var cls1 = $.trim($('.cmb-cls option:selected').val()); if (cls1 == undefined || cls1 == '0_' || cls1==null) { cls1 = ''; }
    var mob = $.trim($('.txt-Mob').val());
    var payid = $.trim($('.txt-Pay').val());
    if (sess == '')
    {
        easyAlert('Please Select Year');
    } else if (cls1 == '') {
        easyAlert('Please Select Class');
    } else if (mob == '' && payid=='') {
        easyAlert('Please Enter Primary Phone OR Payment Id');
    }
    else
    {
        $('#l1').show();
        $('#l2').show();
        $('.divdata').html("");
        var master =
        {
            str1: sess,
            str2: mob,
            str3: cls1,
            str4: payid

        };
        $.ajax({
            url: "../WebSrv/srvAdmission.asmx/LoadFormValidation",
            data: '{objA:' + JSON.stringify(master) + '  }',
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
               
                if (response.d.length > 0) {

                    if (response.d[0].str1 == "1")
                    {
                        
                        $('.divdata').html(response.d[0].str3);
                    }
                    else {
                        easyAlert(response.d[0].str2);

                    }

                }
            },
            complete: function (response) {
                $('#l1').hide();
                $('#l2').hide();
            }, error: function (response) {
                $('#l1').hide();
                $('#l2').hide();
                console.log(response.responseText);
            }
        });

    }
});
function ActiveSession() {
    $('#l1').show();
    $('#l2').show();
    var sel = $('#cmbYear');
    sel.empty();
    
    $.ajax({
        url: "../WebSrv/srvLogin.asmx/Loadactivesession",
        data: '{}',
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            var strArray = new Array();
            if (response.d.length > 0) {


                //strArray.push("{\"id\":\"0\",\"text\":\"Select Year\"}");
                id = response.d[0].str1;
                fromyear = response.d[0].str2.split('-')[0];
                for (var i = 0; i < response.d.length; i++) {

                    strArray.push("{\"id\":\"" + response.d[i].str1 + "\",\"text\":\"" + response.d[i].str2 + "\"}");

                }

            }
            data = "[" + strArray + "]";
        },
        error: function (response) {

        },
        failure: function (response) {

        },
        complete: function (response) {
            data = data.replace(/\\n/g, "\\n")
                .replace(/\\'/g, "\\'")
                .replace(/\\"/g, '\\"')
                .replace(/\\&/g, "\\&")
                .replace(/\\r/g, "\\r")
                .replace(/\\t/g, "\\t")
                .replace(/\\b/g, "\\b")
                .replace(/\\f/g, "\\f");
            data = data.replace(/[\u0000-\u0019]+/g, "");
            var p = JSON.parse(data);
            sel.select2({
                //theme: "classic",
                placeholder: "Select Year",
                closeOnSelect: true,
                allowClear: true,
                data: p,
                escapeMarkup: function (m) {
                    return m;
                }
            }).on('select2:close', function () {
                 
                LoadClassByYear();
                //showPreSaved(mobile, id);

            }).on('select2:select', function (e) {

            }).val(id).trigger('change');

            LoadClassByYear();

            
            
            $('#l1').hide();
            $('#l2').hide();
        }
    });
}
function LoadClassByYear() {
    $('#l1').show();
    $('#l2').show();
    var sessyear = $(".cmb-year option:selected").val();
    var year = $(".cmb-year option:selected").text();
    var master =
    {
        str1: sessyear,
        str2: year,
        str3:1
    }
    var sel = $('#cmbClass');
    sel.empty();
    sel.append("<option value='0_'>Select Class</option>");
    $.ajax({
        url: "../WebSrv/srvLogin.asmx/Loadclassbyyear",
        data: '{obj:' + JSON.stringify(master) + '}',
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            var strArray = new Array();

            if (response.d.length > 0) {

                for (var i = 0; i < response.d.length; i++) {
                    var classname = response.d[i].str1;
                    var displayno = response.d[i].str2;
                    var classid = response.d[i].str3;
                    var openstatus = response.d[i].str4;
                    var clsDisp = response.d[i].str5;
                    var stream = response.d[i].str6;
                    var prefix = response.d[i].str7;
                    var sessyear = response.d[i].str8;

                    strArray.push("{\"id\":\"" + classname + '_' + stream + '_' + prefix + '_' + sessyear + "\",\"text\":\"" + clsDisp + "\"}");
                }


            }
            data = "[" + strArray + "]";

        },
        error: function (response) {
            alert(response.responseText);
        },
        failure: function (response) {

        },
        complete: function (response) {
            data = data.replace(/\\n/g, "\\n")
                .replace(/\\'/g, "\\'")
                .replace(/\\"/g, '\\"')
                .replace(/\\&/g, "\\&")
                .replace(/\\r/g, "\\r")
                .replace(/\\t/g, "\\t")
                .replace(/\\b/g, "\\b")
                .replace(/\\f/g, "\\f");
            data = data.replace(/[\u0000-\u0019]+/g, "");
            var p = JSON.parse(data);
            sel.select2({
                //theme: "classic",
                placeholder: "Select Class",
                closeOnSelect: true,
                allowClear: true,
                data: p,
                escapeMarkup: function (m) {
                    return m;
                }
            }).on('select2:close', function () {
                var cl = $(this).val().split('_')[0];
                

            }).on('select2:select', function (e) {

            }).trigger('change');
            $('#l1').hide();
            $('#l2').hide();
        }
    });

}
