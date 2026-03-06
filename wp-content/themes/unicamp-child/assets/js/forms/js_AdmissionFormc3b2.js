function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
$(document).ready(function () {


    MotherTounge();
    StateName();
    //LastSchool();
});


$(document).on('change', '.Rb_Sib', function () {
    var val = $("input:radio[name='Rb_Sib']:checked").val();

    if (val == "No") {
        $('.data-sibl').val("");
        $('.div-sib').hide();
    }
    else {
        $('.div-sib').show();
    }

});
$(document).on('change', '.Rb_Disease', function () {
    var val = $("input:radio[name='Rb_Disease']:checked").val();

    if (val == "No") {
        $('#txtDisease').css("pointer-events", "none");
        $('#txtDisease').val(val);
    }
    else {
        $('#txtDisease').css("pointer-events", "stroke");
        $('#txtDisease').val("");
    }

});
$(document).on('change', '.Rb_compet', function () {
    var val = $("input:radio[name='Rb_compet']:checked").val();

    if (val == "No") {
        $('#txtcompet').css("pointer-events", "none");
        $('#txtcompet').val(val);
    }
    else {
        $('#txtcompet').css("pointer-events", "stroke");
        $('#txtcompet').val("");
    }

});
$(document).on('click', '.btn-login', function () {
    otpGenerate();
});
$(document).on('click', '.btn-verify', function () {
    VefiryOTP();
});
//#region Next Button Click
$(document).on('keydown', '.a-regno', function (e) {
    var key = e.which || e.keyCode;
    var currentId = $(this).attr("id");
    var index = parseInt(currentId.split('_')[1]);

    if (key === 13 || key === 40) { // Enter or Down Arrow
        e.preventDefault();
        var next = $('#rega_' + (index + 1));
        if (next.length) next.focus();
    }

    if (key === 38) { // Up Arrow
        e.preventDefault();
        var prev = $('#rega_' + (index - 1));
        if (prev.length) prev.focus();
    }
});
$(document).on('change', '.a-regno', function () {


    var iid = $(this).attr("id").split('_')[1];
    if ($(this).val() == "") {
        $('#rega_' + iid).val("");
        $('#namea_' + iid).val("");
        $('#gendera_' + iid).val("");
        $('#clsa_' + iid).val("");
        $('#seca_' + iid).val("");
        return;
    }
    // Check for duplicate Reg No across other rows
    var currentVal = $(this).val().trim();
    var isDuplicate = false;

    $('.a-regno').each(function () {
        var loopId = $(this).attr("id").split('_')[1];
        if (loopId !== iid && $(this).val().trim() === currentVal && currentVal !== "") {
            isDuplicate = true;
            return false; // break loop
        }
    });
    if (currentVal == "") {
        $('#rega_' + iid).val("");
        $('#namea_' + iid).val("");
        $('#gendera_' + iid).val("");
        $('#clsa_' + iid).val("");
        $('#seca_' + iid).val("");
        return;
    }
    if (isDuplicate) {
        easyAlert('Duplicate Reg No detected');
        $('#rega_' + iid).val("");
        $('#namea_' + iid).val("");
        $('#gendera_' + iid).val("");
        $('#clsa_' + iid).val("");
        $('#seca_' + iid).val("");
        return;
    }

    var fromyear = $(".cmb-year option:selected").text().split('-')[0];
    var toyear = $(".cmb-year option:selected").text().split('-')[1];
    if (fromyear == undefined || fromyear == "") {
        easyAlert('Please select year at first step');
        return;
    }
    if (currentVal == "") {
        $('#rega_' + iid).val("");
        $('#namea_' + iid).val("");
        $('#gendera_' + iid).val("");
        $('#clsa_' + iid).val("");
        $('#seca_' + iid).val("");
    }

    var master =
    {

        str3: $(this).val(),
        str1: fromyear,
        str2: toyear,

    };
    $.ajax({
        url: "../WebSrv/srvAdmission.asmx/LoadSibling",
        data: '{obj:' + JSON.stringify(master) + '}',
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            //var sl = response.d[0].str1;



            if (response.d[0].str1 == "") {
                easyAlert('No Record Found');
                $('#rega_' + iid).val("");
                $('#namea_' + iid).val("");
                $('#gendera_' + iid).val("");
                $('#clsa_' + iid).val("");
                $('#seca_' + iid).val("");

            }
            else {
                $('#rega_' + iid).val(response.d[0].str1);
                $('#namea_' + iid).val(response.d[0].str2);
                $('#gendera_' + iid).val(response.d[0].str3);
                $('#clsa_' + iid).val(response.d[0].str4);
                $('#seca_' + iid).val(response.d[0].str5);



            }
        },
        complete: function (response) {
            $('#l1').hide();
            $('#l2').hide();
        }, error: function (response) {
            console.log(response.responseText);
        }
    });
});
$(document).on('click', '.btn-cls-year', function () {

    var year = $('.cmb-year option:selected').val();
    if (year == undefined || year == '' || year == '0') {
        var yr = getUrlVars()["p"];
        if (yr == undefined || yr == null) { yr = ""; }
        ActiveSession(yr);
        $('.search-div').show();
    }
    var cls = $('.cmb-cls option:selected').val();
    if (cls == undefined || cls == '' || cls == '0') {

    }
    $('#v-pills-bill-declare').removeClass('active');
    $('#v-pills-bill-declare').removeClass('show');
    $('.admission-panel').removeClass('active');
    $('#v-pills-class-info').addClass('active');
    $('#v-pills-class-info').addClass('show');
    $('#v-pills-class-info-tab').addClass('active');
});
$(document).on('click', '.btn-personal', function () {

    var cls = $('.cmb-cls option:selected').val().split('_')[0];
    var year = $('.cmb-year option:selected').val();
    if (year == undefined || year == '' || year == '0') {
        easyAlert('Please Select Year');
    }
    else if (cls == undefined || cls == '' || cls == '0') {
        easyAlert('Please Select Class');
    }
    else {

        $('#v-pills-class-info-tab').removeClass('active');
        $('#v-pills-class-info-tab').removeClass('show');
        $('#v-pills-class-info-tab').addClass('done');

        $('.admission-panel').removeClass('active');

        $('#v-pills-personal-info').addClass('active');
        $('#v-pills-personal-info').addClass('show');

        $('#v-pills-personal-info-tab').addClass('done');

        $('#btnPersonalSave').prop("disabled", false);
        $('#btnPersonalSave').addClass("btn-next-pills-communication");
        $('#btnPersonalSave').attr("data-nexttab", "v-pills-communication-tab");



        if (cls == '11' || cls == 'XI' || cls == '12' || cls == 'XII') {
            $('#ModelExistingStudent').modal("show");
        }
    }
});

$(document).on('keyup', '.txtcsname', function () {
    var fname = $('#txtfirstName').val();
    var mname = $('#txtMiddleName').val();
    var sname = $('#txtlastName').val();

    $('.lblConsStd').html(fname + ' ' + mname + ' ' + sname)

});
$(document).on('keyup', '.txtcfname', function () {
    var fname = $('#txtFatherName').val();
    var mname = $('#txtMotherName').val();


    $('.lblConsParent').html(fname + ' & ' + mname)

});
$(document).on('click', '.btn-save-pers', function () {

    var datas = [];

    if ($(".a-tr").length == 0) {

    }
    else {
        $(".a-tr").each(function () {

            var a = $.trim($(this).attr("id").split("_")[1]);
            var reg = $.trim($("#rega_" + a).val()); if (reg == undefined || reg == null || reg == "NA" || reg == "NO" || reg == "0") { reg = ""; }
            var name1 = $.trim($("#namea_" + a).val()); if (name1 == undefined || name1 == null || name1 == "NA" || name1 == "NO") { name1 = ""; }
            var gender = $.trim($("#gendera_" + a).val());
            var cls = $.trim($("#clsa_" + a).val());
            var sec = $.trim($("#seca_" + a).val());
            if (reg != "" && name1 != "") {
                datas.push("{_sl:'0',_adm_no:'" + reg + "',_name:'" + name1 + "',_gender:'" + gender + "',_class:'" + cls + "',_sec:'" + sec + "'}");
            }
        })
    }

    var frmid = '';
    var cls = $('.cmb-cls option:selected').val();
    var year = $('.cmb-year option:selected').val();
    var fn = $.trim($('.txtfirstName').val());
    var mn = $.trim($('.txtMiddleName').val());
    var ln = $.trim($('.txtlastName').val());

    var gn = $('.cmbgender  option:selected').val();
    var db = ""; //$('.txtdob').val();

    var dd = $('#txtdd').val();
    var mm = $('#txtmm').val();
    var yyyy = $('#txtyyyy').val();
    if (dd != "" && mm != "" && yyyy != "") {
        db = dd + "-" + mm + "-" + yyyy;
    }

    var age = $('.txtAge').val();
    var agenumber = $('.agenumber').html();
    var cls1 = cls.split('_')[0];
    var str = cls.split('_')[1];

    if (str == undefined || str == null) {
        str = "";
    }

    var nation = $('#cmbnationality').val();

    var comm = $('.cmbCommunity option:selected').val();
    var cas = $('.cmbCaste option:selected').val();
    var m_t = $('.cmbMotherToungue option:selected').val();
    var b_g = $('.cmbBloodgroup option:selected').val();

    var identi = $('.txtIdentification').val();

    var aadhar = $('.txtAadhar').val();
    var diet = $('.cmbDietary option:selected').val();
    var Rb_Disease = $("input:radio[name='Rb_Disease']:checked").val();
    var Dise = $.trim($('.txtDisease').val());
    var med = $("input:radio[name='Rb_Medicine']:checked").val();

    var SinGirlChild = $('.cmbSingleGirlChild option:selected').val();
    var Divy = $('.cmbDivyanngjan option:selected').val();
    var EvS = $('.cmbEWS option:selected').val();
    var EvSCategory = $('.cmbEWSCategory option:selected').val();
    var stream2op1 = '';

    var lastschoolname = $("#cmbLastSchool").val();
    var lastschooladdress = $("#txtLastSchoolAddress").val();
    if (lastschoolname == "OTHER") {
        lastschoolname = $('.txtLastSchool').val();
    }

    var residentialaddress = $("#txtResidential").val();
    var city = $("#txtCity").val();
    var state = $('#cmbState  option:selected').val();
    var pin = $('#txtPin').val();
    var pemail = $('#txtemail1').val();
    var semail = $('#txtemail2').val();
    var pmob = $('#txtPrimaryPhone').val();
    var smob = $('#txtSecondaryPhone').val();
    var wapp = $('#txtWhatsappNo').val();
    var distance = $('#cmbDistance option:selected').val();
    var pen = $.trim($('#txtPEN').val());

    var hightcm = $.trim($('#txtHeight').val());
    var weightkgs = $.trim($('#txtWeight').val());

    var comptpart = $.trim($('#txtcompet').val());
    var lastBoard = $('#cmbBoardName option:selected').val();
    var empwart = $("input:radio[name='Rb_Ward']:checked").val();

    if (year == undefined || year == '' || year == '0') {
        easyAlert('Please Select Year');
    }
    else if (cls == undefined || cls == '' || cls == '0' || cls1 == undefined) {
        easyAlert('Please Select Class');
    }
    else if (fn == '') {
        easyAlert('Please Enter First Name');

    }
    else if (ln == '') {
        easyAlert('Please Enter Last Name');

    }
    else if (gn == '') {
        easyAlert('Please Select Gender');

    } else if (db == '') {
        easyAlert('Please Enter DOB');
    }
    else if (hightcm == '' || hightcm == '0') {
        easyAlert('Please Enter Hight');
    }
    else if (weightkgs == '' || weightkgs == '0') {
        easyAlert('Please Enter Weight');
    }
    else if (cas == '') {
        easyAlert('Please Select Caste');
    } else if (nation == '') {
        easyAlert('Please Select Nationality');
    } else if (comm == '') {
        easyAlert('Please Select Community');
    } else if (m_t == '') {
        easyAlert('Please Select Mother Toungue');

    } else if (b_g == '') {
        easyAlert('Please Select Blood Group');
    }

    else if (diet == '') {
        easyAlert('Please Select Dietary Preferance');
    } else if (Dise == '') {
        easyAlert('Please Enter Disease Information');
    } else if (SinGirlChild == '') {
        easyAlert('Please Select Single Girl Child (Yes/No)');
    }
    //else if (Divy == '') {
    //    easyAlert('Please Select Divyanngjan (Yes/No)');
    //}

    else if (EvS == '') {
        easyAlert('Please Select EWS (Yes/No)');
    }
    else if (comptpart == '') {
        easyAlert('Please Enter Participated Competitions');
    }
    else if (lastschoolname === '' && !['Nursery', 'LKG', 'UKG'].includes(cls1)) {
        easyAlert('Please Enter Last School');
    } else if (lastschooladdress === '' && !['Nursery', 'LKG', 'UKG'].includes(cls1)) {
        easyAlert('Please Enter Last School Address');
    }
    else if (residentialaddress == '') {
        easyAlert('Please Enter Residential Address');
    }
    else if (city == '') {
        easyAlert('Please Enter City');
    }
    else if (state == '') {
        easyAlert('Please Enter State');

    }
    else if (pin == '') {
        easyAlert('Please Enter Pin');

    }
    else if (pemail == '') {
        easyAlert('Please Enter Primary Email');

    } else if (pmob == '') {
        easyAlert('Please Select Primary Phone');
    }
    else if (smob == '') {
        easyAlert('Please Select Secondary Phone');
    }
    else if (wapp == '') {
        easyAlert('Please Enter Whatsapp No');

    }
    else if (distance == '') {
        easyAlert('Please Select Distance');
    }
    else {

        var master =
        {

            _regno: $('.lblregno').html(),
            _frmid: frmid,
            _sl: $('.lblmainstd').html(),
            _typ: $('.lbltype').html(),
            _ss: $('.lblses').html(),
            _pmobile: $('#lblphone').html(),
            _frmid: '',
            _age: age,
            _agenumber: agenumber,
            _cls: cls1,
            _fn: fn,
            _mn: mn,
            _sn: ln,
            _sx: gn,
            _db: db,
            _cst: cas,
            _nation: nation,
            _comm: comm,
            _m_t: m_t,
            _b_g: b_g,
            _ident: identi,
            _disse: Dise,
            _medic: med,
            _SGirlChild: SinGirlChild,
            _Divyang: Divy,
            _EVS: EvS,
            _evscat: EvSCategory,
            _Aadhar: aadhar,
            _Diet: diet,
            _stream2op1: stream2op1,
            _stream1: str,
            _LastSchoolName: lastschoolname,
            _LastSchoolAddress: lastschooladdress,
            _residential_add: residentialaddress,
            _city: city,
            _state: state,
            _pin: pin,
            _email: pemail,
            _secondaryemail: semail,
            _primarymobile: pmob,
            _secondarymobile: smob,
            _whatsappNO: wapp,
            _homelocation: distance,
            _PEN: pen,
            _Hight: hightcm,
            _Weight: weightkgs,
            _Participation: comptpart,
            _Teacher_Ward: empwart,
            _LastSchoolAfilliation: lastBoard




        };
        $.ajax({
            url: "../WebSrv/srvAdmission.asmx/PersonalDetails",
            data: '{obj:' + JSON.stringify(master) + ' , datas:[' + datas + ']}',
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                var sl = response.d[0]._sl;

                if (response.d.length > 0) {

                    if (response.d[0]._valid == "1") {
                        $("#lblmainstd").html(sl);

                        //$("#txtPrimaryPhone").val(master._pmobile);
                        // Next To Health tab
                        $('#btnHealth').prop('disabled', false);
                        //$('#btnHealth').attr('data-nexttab', "v-pills-parent-tab");
                        $('#btnHealth').removeClass('btn-health-record');
                        $('#btnHealth').addClass('btn-health-record');

                        $('#v-pills-personal-info-tab').removeClass('active');
                        $('#v-pills-personal-info-tab').removeClass('show');
                        $('#v-pills-personal-info-tab').addClass('done');
                        $('.admission-panel').removeClass('active');

                        $('#v-pills-health-info').addClass('active');
                        $('#v-pills-health-info').addClass('show');
                        $('#v-pills-health-info-tab').addClass('done');


                        /*
                        $('#btnParents').prop('disabled', false);
                        $('#btnParents').attr('data-nexttab', "v-pills-Co-Curricular-tab");


                        $('#v-pills-personal-info-tab').removeClass('active');
                        $('#v-pills-personal-info-tab').removeClass('show');
                        $('#v-pills-personal-info-tab').addClass('done');
                        $('.admission-panel').removeClass('active');

                        $('#v-pills-parent').addClass('active');
                        $('#v-pills-parent').addClass('show');
                        $('#v-pills-parent-tab').addClass('done');

                        */
                        LoadHealthRecord(sl)
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
                console.log(response.responseText);
            }
        });

    }
});

$(document).on('click', '.btn-save-communication', function () {

    var residentialaddress = $("#txtResidential").val();
    var city = $("#txtCity").val();
    var state = $('#cmbState  option:selected').val();
    var pin = $('#txtPin').val();
    var pemail = $('#txtemail1').val();
    var semail = $('#txtemail2').val();
    var pmob = $('#txtPrimaryPhone').val();
    var smob = $('#txtSecondaryPhone').val();
    var wapp = $('#txtWhatsappNo').val();
    var distance = $('#cmbDistance option:selected').val();
    if (residentialaddress == '') {
        easyAlert('Please Enter Residential Address');
    }
    else if (city == '') {
        easyAlert('Please Enter City');
    }
    else if (state == '') {
        easyAlert('Please Enter State');

    }
    else if (pin == '') {
        easyAlert('Please Enter Pin');

    }
    else if (pemail == '') {
        easyAlert('Please Enter Primary Email');

    } else if (semail == '') {
        easyAlert('Please Enter Secondary Email');
    } else if (smob == '') {
        easyAlert('Please Select Secondary Phone');
    } else if (wapp == '') {
        easyAlert('Please Enter Whatsapp No');
    } else if (distance == '') {
        easyAlert('Please Select Distance');
    }
    else {
        var master =
        {
            _sl: $('.lblmainstd').html(),
            _residential_add: residentialaddress,
            _city: city,
            _state: state,
            _pin: pin,
            _email: pemail,
            _secondaryemail: semail,
            _primarymobile: pmob,
            _secondarymobile: smob,
            _whatsappNO: wapp,
            _homelocation: distance
        };
        $.ajax({
            url: "../WebSrv/srvAdmission.asmx/CommunicationDetails",
            data: '{obj:' + JSON.stringify(master) + '}',
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                var sl = response.d[0]._sl;

                if (response.d.length > 0) {

                    if (response.d[0]._valid == "1") {
                        $("#lblmainstd").html(sl);


                        $('#btnParents').prop('disabled', false);
                        $('#btnParents').attr('data-nexttab', "v-pills-lastschool-tab");

                        $('#v-pills-communication-tab').removeClass('active');
                        $('#v-pills-communication-tab').removeClass('show');
                        $('#v-pills-communication-tab').addClass('done');
                        $('.admission-panel').removeClass('active');
                        $('#v-pills-parent').addClass('active');
                        $('#v-pills-parent').addClass('show');
                        $('#v-pills-parent-tab').addClass('done');


                    }
                    else {
                        easyAlert(response.d[0].str2);

                    }

                }
            },
            complete: function (response) {
                $('#l1').hide();
                $('#l2').hide();
            }
        });





    }
});

$(document).on('click', '.btn-save-parentsdetails', function () {

    var fathername = $("#txtFatherName").val();
    var fatherqualification = $("#cmbfatherQualification option:selected").val();
    var fatherphone = $('#txtFatherPhone').val();
    var fatheremail = $('#txtFatherEmail').val();
    var fatheroffice = $('#txtFatherOfficeAddress').val();
    var fatherproff = $('#txtFatherProfession option:selected').val();
    if (fatherproff == 'Other') {
        fatherproff = $('.txtFatherProfession_other').val();
    }
    var fatherincome = $('#txtFatherIncome').val();
    var femplyment = $('.txtFatherEmployement option:selected').val();
    if (femplyment == 'Other') {
        femplyment = $('.txtFatherEmployement_other').val();
    }

    var fatherdesig = $('#txtFatherDesignation').val();


    var mothername = $('#txtMotherName').val();
    var motherqual = $('#cmbMotherQualification option:selected').val();
    var motherphone = $('#txtMotherPhone').val();
    var motheremail = $('#txtMotherEmail').val();
    var motheroffice = $('#txtMotherOfficeAddress').val();
    var motherproff = $('#txtMotherProfession option:selected').val();
    if (motherproff == 'Other') {
        motherproff = $('.txtMotherProfession_other').val();
    }


    var motherincome = $('#txtMotherIncome').val();
    var motherdesig = $('#txtMotherDesignation').val();
    var memplyment = $('#txtMotherEmployement').val();

    if (memplyment == 'Other') {
        memplyment = $('.txtMotherEmployement_other').val();
    }
    var totalincome = $('#txtFamilyAnnualIncome').val();

    if (fathername == '') {
        easyAlert("Please Enter Father's name");
    }
    else if (fatherqualification == '') {
        easyAlert("Please select Father's Educational Qualification");
    }
    else if (fatherphone == '') {
        easyAlert("Please Enter  Father's Phone");

    } else if (femplyment == '') {
        easyAlert("Please Enter Father's Employment");
    } else if (fatherproff == '') {
        easyAlert("Please Enter Father's Profession");
    }

    else if (fatherincome == '') {
        easyAlert("Please Select Father's income");
    } else if (mothername == '') {
        easyAlert("Please Enter Mother's Name");
    } else if (motherqual == '') {
        easyAlert("Please Select Mother's Educational Qualification");
    } else if (motherphone == '') {
        easyAlert("Please Enter Mother's phone");
    }
    else if (memplyment == '') {
        easyAlert("Please Enter Mother's Employment");
    } else if (motherproff == '') {
        easyAlert("Please Enter Mother's Profession");
    }
    /*
    else if (motherdesig == '') {
        easyAlert("Please Enter Mother's Designation");
    }*/
    else {

        var fname = $('#txtfirstName').val();
        var mname = $('#txtMiddleName').val();
        var sname = $('#txtlastName').val();

        $('.lblConsStd').html(fname + ' ' + mname + ' ' + sname)

        $('.lblConsParent').html(fathername + ' & ' + mothername)

        var master =
        {
            _sl: $('.lblmainstd').html(),
            _father: fathername,
            _fedu: fatherqualification,
            _fphone: fatherphone,
            _mother: mothername,
            _medu: motherqual,
            _mphone: motherphone,
            _foffice: fatheroffice,
            _foccup: fatherproff,
            _fincome: fatherincome,
            _moffice: motheroffice,
            _moccup: motherproff,
            _mincome: motherincome,
            _fatheremail: fatheremail,
            _motheremail: motheremail,
            _femplyment: femplyment,
            _memplyment: memplyment,
            _totalincome: totalincome,
            _fdesig: fatherdesig,
            _mdesig: motherdesig

        };
        $.ajax({
            url: "../WebSrv/srvAdmission.asmx/ParentsDetails",
            data: '{obj:' + JSON.stringify(master) + '}',
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                var sl = response.d[0]._sl;

                if (response.d.length > 0) {

                    if (response.d[0]._valid == "1") {
                        $("#lblmainstd").html(sl);
                        $('#v-pills-parent-tab').removeClass('active');
                        $('#v-pills-parent-tab').removeClass('show');
                        $('#v-pills-parent-tab').addClass('done');
                        $('.admission-panel').removeClass('active');

                        $('#v-pills-Co-Curricular').addClass('active');
                        $('#v-pills-Co-Curricular').addClass('show');
                        $('#v-pills-Co-Curricular-tab').addClass('done');

                        $('#btnCouricular').prop('disabled', false);
                        $('#btnCouricular').attr('data-nexttab', "v-pills-Transportation-tab");
                        //Cocoricularnext();
                        AdditionDetailsnext();
                    }
                    else {
                        easyAlert(response.d[0].str2);

                    }

                }
            },
            complete: function (response) {
                $('#l1').hide();
                $('#l2').hide();
            }
        });



    }
});

$(document).on('click', '.btn-save-lastschooldetails', function () {

    var lastschoolname = $("#cmbLastSchool").val();
    var lastschooladdress = $("#txtLastSchoolAddress").val();
    if (lastschoolname == "OTHER") {
        lastschoolname = $('.txtLastSchool').val();
    }

    if (lastschoolname == '') {
        easyAlert('Please Enter Last School');
    }
    else if (lastschooladdress == '') {
        easyAlert('Please Enter Last School Address');
    }
    else {
        var master =
        {
            _sl: $('.lblmainstd').html(),
            _LastSchoolName: lastschoolname,
            _LastSchoolAddress: lastschooladdress
        };
        $.ajax({
            url: "../WebSrv/srvAdmission.asmx/LastSchoolDetails",
            data: '{obj:' + JSON.stringify(master) + '}',
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                var sl = response.d[0]._sl;

                if (response.d.length > 0) {

                    if (response.d[0]._valid == "1") {
                        $("#lblmainstd").html(sl);


                        $('#btnAdditionalInfo').prop('disabled', false);
                        $('#btnAdditionalInfo').attr('data-nexttab', "v-pills-Co-Curricular-tab");

                        $('#v-pills-lastschool-tab').removeClass('active');
                        $('#v-pills-lastschool-tab').removeClass('show');
                        $('#v-pills-lastschool-tab').addClass('done');
                        $('.admission-panel').removeClass('active');
                        $('#v-pills-Additional-Information').addClass('active');
                        $('#v-pills-Additional-Information').addClass('show');
                        $('#v-pills-Additional-Information-tab').addClass('done');

                    }
                    else {
                        easyAlert(response.d[0].str2);

                    }

                }
            },
            complete: function (response) {
                $('#l1').hide();
                $('#l2').hide();
            }
        });




    }
});


//#endregion
$(document).on('click', '.nav-click-x', function () {
    $('.admission-panel').removeClass('active');
    $('.admission-panel').removeClass('show');
    var id = $(this).attr("aria-controls");
    $('#' + id).addClass('active');
    $('#' + id).addClass('show');
});
$(document).on('click', '.btn-add-adnd', function () {

    var regno = $.trim($('#txtARegNo').val());
    var name = $.trim($('#txtAname').val());
    var gender = $.trim($('#cmbAgender option:selected').val());
    var cls = $.trim($('#cmbAClass option:selected').val());
    var sec = $.trim($('#txtAsec').val());

    if (regno == '') {
        easyAlert('Please Enter Reg No');
    }
    else if (name == '') { easyAlert('Please Enter name'); }
    else if (gender == '' || gender == undefined) { easyAlert('Please Select Gender'); }
    else if (cls == '' || cls == undefined) { easyAlert('Please Select Class'); }
    else if (sec == '' || sec == undefined) { easyAlert('Please Select Section'); }
    else {
        var _valid = 1;
        $(".a-regno").each(function () {
            var regno1 = $(this).html();
            if (regno == regno1) {
                _valid = 0;
            }


        }).promise().done(function () {
            if (_valid == 0) {
                easyAlert('Student Details already in list');
            }
            else {
                var sl = $('.a-tr').length + 1;
                var _html = `<tr class='a-tr' id='a_${sl}'>
        <td style='text-align:right;width:20px;'>${sl}</td>
        <td style='text-align:right;width:60px;'><span id='rega_${sl}' class='a-regno'>${regno}</td>
        <td style='text-align:left;width:120px;'><span id='namea_${sl}'>${name}</td>
        <td style='text-align:left;width:40px;'><span id='gendera_${sl}'>${gender}</td>
        <td style='text-align:left;width:40px;'><span id='clsa_${sl}'>${cls}</td>
        <td style='text-align:left;width:60px;'><span id='seca_${sl}'>${sec}</td>
        <td style='text-align:center;width:10px;'><a style='cursor:pointer;' class='a-click' id='btn-${sl}'><i class='ri-close-line'></i></a></td>
        </tr> `;
                $('#tbody-adinfo').append(_html);
                $('#txtARegNo').val("");
                $('#txtAname').val("");

                $('#txtAsec').val("");

            }

        });

    }

});


$(document).on("click", ".btn-save-additionalinfo", function () {

    var datas = [];
    var sl = $('.lblmainstd').html();
    if ($(".a-tr").length == 0) { AdditionDetailsnext() }
    else {
        $(".a-tr").each(function () {
            var a = $.trim($(this).attr("id").split("_")[1]);
            var reg = $.trim($("#rega_" + a).html());
            var name1 = $.trim($("#namea_" + a).html());
            var gender = $.trim($("#gendera_" + a).html());
            var cls = $.trim($("#clsa_" + a).html());
            var sec = $.trim($("#seca_" + a).html());

            datas.push("{_sl:'" +
                sl +
                "',_adm_no:'" +
                reg +
                "',_name:'" +
                name1 +
                "',_gender:'" +
                gender +
                "',_class:'" +
                cls +
                "',_sec:'" +
                sec +
                "'}");


        }).promise().done(function () {

            $.ajax({
                url: "../WebSrv/srvAdmission.asmx/SaveAdditionalDetails",
                // data: '{datas:[' + datas + ']}',
                data: "{datas:[" + datas + "]}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                type: "POST",
                success: function (response) {
                    var sl = response.d[0]._sl;

                    if (response.d.length > 0) {
                        if (response.d[0]._valid == "1") {
                            $("#lblmainstd").html(sl);
                            AdditionDetailsnext();


                        } else {
                            easyAlert(response.d[0].str2);
                        }
                    }
                },
                complete: function (response) {
                    $('#l1').hide();
                    $('#l2').hide();
                },
                error: function (response) {
                    console.log(response.responseText);
                }
            });
        });

    }
});
function AdditionDetailsnext() {

    $('#step-3-table').html('');
    $('#step1-3-table').html('');

    var fromyear = $(".cmb-year option:selected").text().split('-')[0];
    var toyear = $(".cmb-year option:selected").text().split('-')[1];
    var cl = $('.cmb-cls option:selected').val().split('_')[0];
    var str = $('.cmb-cls option:selected').val().split('_')[1];

    var master =
    {
        str1: cl,
        str2: str,
        str3: fromyear,
        str4: toyear
    }

    $.ajax({
        url: "../WebSrv/srvAdmission.asmx/LoadCoCurDetail",
        data: '{obj:' + JSON.stringify(master) + '}',
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (response) {

            if (response.d.length > 0) {
                $('#step-3-table').html(response.d[0].str1);
                $('#step1-3-table').html(response.d[0].str2);
                GetTempCCA();
            }


        },
        complete: function (response) {
            $('#l1').hide();
            $('#l2').hide();

            $('#btnCouricular').prop('disabled', false);
            $('#btnCouricular').attr('data-nexttab', "v-pills-Transportation-tab");

            $('#v-pills-Additional-Information-tab').removeClass('active');
            $('#v-pills-Additional-Information-tab').removeClass('show');
            $('#v-pills-Additional-Information-tab').addClass('done');
            $('.admission-panel').removeClass('active');
            $('#v-pills-Co-Curricular').addClass('active');
            $('#v-pills-Co-Curricular').addClass('show');
            $('#v-pills-Co-Curricular-tab').addClass('done');

        }
    });



}
$(document).on("click", ".btn-save-cocurricular", function () {
    var sl = $('.lblmainstd').html();


    var fy = $('.cmb-year option:selected').text().split("-")[0];
    var ty = $('.cmb-year option:selected').text().split("-")[1];
    var datas = {};
    datas.str1 = sl;
    datas.str2 = fy;
    datas.str3 = ty;
    var data = [];
    var valid = 0;
    if ($('.chk-co-cur-act1').length > 0) {
        $('.chk-co-cur-act1').each(function () {
            if ($(this).is(":checked")) {
                valid = 1;
            }
        })
    }
    else {
        Cocoricularnext();
        valid = 1;
    }
    if (valid == 0) {
        easyAlert('Please Select from Club Activities');
    }
    else {
        $('.chk-co-cur-act').each(function () {
            if ($(this).is(":checked")) {
                var cid = $(this).attr('id').split("_")[1];
                data.push("{str1:'" + cid + "'}");
            }
        }).promise().done(function () {
            $.ajax({
                url: "../WebSrv/srvAdmission.asmx/UpdateCoCurData",
                data: '{obj:' + JSON.stringify(datas) + ',datas:[' + data + ']}',
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",

                success: function (response) {
                },
                complete: function (response) {
                    Cocoricularnext();
                },
                error: function (response) {

                }
            });
        });
    }


});
function Cocoricularnext() {

    $('#btnTransport').prop('disabled', false);
    $('#btnTransport').attr('data-nexttab', "v-pills-Stream-Subject-tab");

    $('#v-pills-Co-Curricular-tab').removeClass('active');
    $('#v-pills-Co-Curricular-tab').removeClass('show');
    $('#v-pills-Co-Curricular-tab').addClass('done');
    $('.admission-panel').removeClass('active');
    $('#v-pills-Transportation').addClass('active');
    $('#v-pills-Transportation').addClass('show');
    $('#v-pills-Transportation-tab').addClass('done');
}
$(document).on("click", ".btn-save-transport", function () {
    var transportation = $("#cmbTransMode option:selected").val();
    var busr = $("#cmbBusRoute option:selected").val();
    if (transportation == null || transportation == undefined) {
        transportation = '';
    } if (busr == null || busr == undefined) {
        busr = '0';
    }
    if (transportation == '') {
        easyAlert('Please select Mode');
    }
    else if (busr == '0' && transportation == 'ST') {
        easyAlert('Please Select Route');
    }
    else {
        var master =
        {
            _sl: $('.lblmainstd').html(),
            _bus: transportation,
            _busRoute: busr
        };
        $.ajax({
            url: "../WebSrv/srvAdmission.asmx/TransportDetails",
            data: '{obj:' + JSON.stringify(master) + '}',
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                var sl = response.d[0]._sl;

                if (response.d.length > 0) {

                    if (response.d[0]._valid == "1") {
                        $("#lblmainstd").html(sl);
                        $('#btnstreamsub').prop('disabled', false);
                        $('#btnstreamsub').attr('data-nexttab', "v-pills-Documents-tab");
                        $('#v-pills-Transportation-tab').removeClass('active');
                        $('#v-pills-Transportation-tab').removeClass('show');
                        $('#v-pills-Transportation-tab').addClass('done');
                        $('.admission-panel').removeClass('active');
                        $('#v-pills-Stream-Subject').addClass('active');
                        $('#v-pills-Stream-Subject').addClass('show');
                        $('#v-pills-Stream-Subject-tab').addClass('done');
                    }
                    else {
                        easyAlert(response.d[0]._msg);

                    }

                }
            },
            complete: function (response) {
                $('#l1').hide();
                $('#l2').hide();
            }
        });

    }
});

$(document).on("click", ".btn-save-subjectstream", function () {

    var year = $(".cmb-year option:selected").text().split('-')[0];
    var cl = $('.cmb-cls option:selected').val().split('_')[0];
    var str = $('.cmb-cls option:selected').val().split('_')[1];
    var cuet = $("input:radio[name='inlineRadioOptions1_cuet']:checked").val();
    if (cuet == undefined) { cuet = ""; }
    if (str == undefined || str == null) {
        str = "";
    }

    if (str != "") {
        var str1 = $('#cmbStreamSubjects1').val();
        var str2 = $('#cmbStreamSubjects2').val();
        var _ct1op1 = $('.ck-all11').length;
        var _ct1op2 = $('.ck-all12').length;
        var _ct1op3 = $('.ck-all13').length;

        var sub1op1 = $("input:radio[name='rb1_1']:checked").val();
        if (sub1op1 == undefined) {
            var ck = $("input[type=checkbox][name='rb1_1']").prop('checked');
            if (ck == undefined) {
                sub1op1 = '';
            }
            else {
                if (ck == true) {
                    sub1op1 = $("input[type=checkbox][name='rb1_1']").val();
                }
                else {
                    sub1op1 = '';
                }
            }
        }
        var sub1op2 = $("input:radio[name='rb1_2']:checked").val();
        if (sub1op2 == undefined) {
            var ck = $("input[type=checkbox][name='rb1_2']").prop('checked');
            if (ck == undefined) {
                sub1op2 = '';
            }
            else {
                if (ck == true) {
                    sub1op2 = $("input[type=checkbox][name='rb1_2']").val();
                }
                else {
                    sub1op2 = '';
                }
            }



        }
        var sub1op3 = $("input:radio[name='rb1_3']:checked").val(); if (sub1op3 == undefined) { sub1op3 = ''; }


        var _ct2op1 = $('.ck-all21').length;
        var _ct2op2 = $('.ck-all22').length;
        var _ct2op3 = $('.ck-all23').length;

        var sub2op1 = $("input:radio[name='rb2_1']:checked").val(); if (sub2op1 == undefined) {
            var ck = $("input[type=checkbox][name='rb2_1']").prop('checked');
            if (ck == undefined) {
                sub2op1 = '';
            }
            else {
                if (ck == true) {
                    sub2op1 = $("input[type=checkbox][name='rb2_1']").val();
                }
                else {
                    sub2op1 = '';
                }
            }

        }
        var sub2op2 = $("input:radio[name='rb2_2']:checked").val(); if (sub2op2 == undefined) { sub2op2 = ''; }
        var sub2op3 = $("input:radio[name='rb2_3']:checked").val(); if (sub2op3 == undefined) { sub2op3 = ''; }

        var valid = 1;
        if (str2 == null || str2 == undefined) {
            valid = 0;
            str2 = '';
        }
        if (str1 == '') {
            valid = 0;
            easyAlert('Please Select First Stream');
        }
        else if (str2 == '' || str2 == '0') {
            valid = 0;
            easyAlert('Please Select Second Stream ')
        }
        else if (str1 == 'IC JEE' && str2 != "IC NEET") {
            if (_ct2op1 > 0 && sub2op1 == '') {
                valid = 0;
                easyAlert('Please Select from Option 1')
            }
            else if (_ct2op2 > 0 && sub2op2 == '') {
                valid = 0;
                easyAlert('Please Select from Option 2')
            }
            else if (_ct2op3 > 0 && sub2op3 == '') {
                valid = 0;
                easyAlert('Please Select from Option 3')
            }
            else {
                valid = 1;
                //SaveStreamAndSub(str1, str2, sub1op1, sub1op2, sub1op3, sub2op1, sub2op2, sub2op3, cuet);
            }

        }
        else if (str1 == "IC NEET" && str2 != 'IC JEE') {
            if (_ct2op1 > 0 && sub2op1 == '') {
                valid = 0;
                easyAlert('Please Select from Option 1')
            }
            else if (_ct2op2 > 0 && sub2op2 == '') {
                valid = 0;
                easyAlert('Please Select from Option 2')
            }
            else if (_ct2op3 > 0 && sub2op3 == '') {
                valid = 0;
                easyAlert('Please Select from Option 3')
            }
            else {
                valid = 1;
                //SaveStreamAndSub(str1, str2, sub1op1, sub1op2, sub1op3, sub2op1, sub2op2, sub2op3, cuet);
            }

        }
        else if (str2 == 'IC JEE' && str1 != "IC NEET") {
            if (_ct1op1 > 0 && sub1op1 == '') {
                valid = 0;
                easyAlert('Please Select from Option 1')
            }
            else if (_ct1op2 > 0 && sub1op2 == '') {
                valid = 0;
                easyAlert('Please Select from Option 2')
            }
            else if (_ct1op3 > 0 && sub1op3 == '') {
                valid = 0;
                easyAlert('Please Select from Option 3')
            }
            else {
                valid = 1;
            }

        }
        else if (str2 == "IC NEET" && str1 != 'IC JEE') {
            if (_ct1op1 > 0 && sub1op1 == '') {
                valid = 0;
                easyAlert('Please Select from Option 1')
            }
            else if (_ct1op2 > 0 && sub1op2 == '') {
                valid = 0;
                easyAlert('Please Select from Option 2')
            }
            else if (_ct1op3 > 0 && sub1op3 == '') {
                valid = 0;
                easyAlert('Please Select from Option 3')
            }
            else {
                valid = 1;
            }

        }
        else if (str2 == "IC NEET" && str1 == 'IC JEE') {
            valid = 1;
        }
        else if (str1 == "IC NEET" && str2 == 'IC JEE') {
            valid = 1;
        }
        else {

            if (_ct1op1 > 0 && sub1op1 == '') {
                valid = 0;
                easyAlert('Please Select from Option 1')
            }
            else if (_ct1op2 > 0 && sub1op2 == '') {
                valid = 0;
                easyAlert('Please Select from Option 2')
            }
            else if (_ct1op3 > 0 && sub1op3 == '') {
                valid = 0;
                easyAlert('Please Select from Option 3')
            }

            else if (_ct2op1 > 0 && sub2op1 == '') {
                valid = 0;
                easyAlert('Please Select from Option 1')
            }
            else if (_ct2op2 > 0 && sub2op2 == '') {
                valid = 0;
                easyAlert('Please Select from Option 2')
            }
            else if (_ct2op3 > 0 && sub2op3 == '') {
                valid = 0;
                easyAlert('Please Select from Option 3')
            }
            else {
                valid = 1;
            }
        }
        if (valid == 1) {
            SaveStreamAndSub(str1, str2, sub1op1, sub1op2, sub1op3, sub2op1, sub2op2, sub2op3, cuet);

        }

    }
    else if (cl == '9' || cl == '10') {
        var str1 = "", str2 = "", sub2op1 = "", sub2op2 = "", sub2op3 = "";

        var _ct1op1 = $('.ck-all11').length;
        var _ct1op2 = $('.ck-all12').length;
        var _ct1op3 = $('.ck-all13').length;

        var sub1op1 = $("input:radio[name='rb1_1']:checked").val(); if (sub1op1 == undefined) { sub1op1 = ''; }
        var sub1op2 = $("input:radio[name='rb1_2']:checked").val(); if (sub1op2 == undefined) { sub1op2 = ''; }
        var sub1op3 = $("input:radio[name='rb1_3']:checked").val(); if (sub1op3 == undefined) { sub1op3 = ''; }

        if (_ct1op1 > 0 && sub1op1 == '') {
            easyAlert('Please Select from Option 1')
        }
        else if (_ct1op2 > 0 && sub1op2 == '') {
            easyAlert('Please Select from Option 2')
        }
        else if (_ct1op3 > 0 && sub1op3 == '') {
            easyAlert('Please Select from Option 3')
        }
        else {
            SaveStreamAndSub(str1, str2, sub1op1, sub1op2, sub1op3, sub2op1, sub2op2, sub2op3, cuet);
        }
    }
    else {
        Streamnext();
    }
});

function SaveStreamAndSub(str1, str2, sub1op1, sub1op2, sub1op3, sub2op1, sub2op2, sub2op3, cuet) {
    var master =
    {
        _sl: $('#lblmainstd').html(),
        _stream1: str1,
        _stream2: str2,
        _stream1op1: sub1op1,
        _stream1op2: sub1op2,
        _stream1op3: sub1op3,
        _stream2op1: sub2op1,
        _stream2op2: sub2op2,
        _stream2op3: sub2op3,
        _cuet: cuet
    };
    $.ajax({
        url: "../WebSrv/srvAdmission.asmx/AddStreamDetails",
        data: '{obj:' + JSON.stringify(master) + '}',
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            var sl = response.d[0]._sl;

            if (response.d.length > 0) {

                if (response.d[0]._valid == "1") {
                    $("#lblmainstd").html(sl);
                    Streamnext();
                }
                else {
                    easyAlert(response.d[0]._msg);

                }

            }
        },
        complete: function (response) {
            $('#l1').hide();
            $('#l2').hide();
        }
    });
}
function Streamnext() {
    $('#btnDocument').prop('disabled', false);
    $('#btnDocument').attr('data-nexttab', "v-pills-payment-tab");
    $('#btnDocument').addClass('btn-upload-documents');




    $('#v-pills-Stream-Subject-tab').removeClass('active');
    $('#v-pills-Stream-Subject-tab').removeClass('show');
    $('#v-pills-Stream-Subject-tab').addClass('done');
    $('.admission-panel').removeClass('active');
    $('#v-pills-Documents').addClass('active');
    $('#v-pills-Documents').addClass('show');
    $('#v-pills-Documents-tab').addClass('done');
}
$(document).on("click", ".btn-upload-documents", function () {
    UploadDocuments();

});
$(document).on("change", "#file_photo", function () {
    var file = event.target.files[0];
    if (file.size > 204800) { // 200 KB in bytes
        easyAlert('File size exceeds 200 KB');
        $('#file_photo').val('');
        $('#Imgstd').attr('src', '');
    } else {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#Imgstd').attr('src', e.target.result);
        }
        reader.readAsDataURL(file);
    }

});
$(document).on("change", "#File_father", function () {
    var file = event.target.files[0];
    if (file.size > 204800) { // 200 KB in bytes
        easyAlert('File size exceeds 200 KB');
        $('#File_father').val('');
        $('#ImageFather').attr('src', '');
    } else {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#ImageFather').attr('src', e.target.result);
        }
        reader.readAsDataURL(file);
    }

});
$(document).on("change", "#File_mother", function () {
    var file = event.target.files[0];
    if (file.size > 204800) { // 200 KB in bytes
        easyAlert('File size exceeds 200 KB');
        $('#File_mother').val('');
        $('#ImageMother').attr('src', '');
    } else {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#ImageMother').attr('src', e.target.result);
        }
        reader.readAsDataURL(file);
    }

});
$(document).on("change", "#File_Birth", function () {
    var file = event.target.files[0];
    if (file.size > 204800) { // 200 KB in bytes
        easyAlert('File size exceeds 200 KB');
        $('#File_Birth').val('');

    } else {

    }

});
$(document).on("change", "#File_TC", function () {
    var file = event.target.files[0];
    if (file.size > 204800) { // 200 KB in bytes
        easyAlert('File size exceeds 200 KB');
        $('#File_TC').val('');

    } else {

    }

});
$(document).on("change", "#File_Caste", function () {
    var file = event.target.files[0];
    if (file.size > 204800) { // 200 KB in bytes
        easyAlert('File size exceeds 200 KB');
        $('#File_Caste').val('');

    } else {

    }

});
function UploadDocuments() {
    var fathertype = $("input:radio[name='rb_fathergaurd']:checked").val();
    var mothertype = $("input:radio[name='rb_mothergaurdian']:checked").val();

    var docfileInput1 = $("#file_photo")[0];
    var docfileInput2 = $("#File_father")[0];
    var docfileInput3 = $("#File_mother")[0];
    var docfileInput4 = $("#File_Birth")[0];
    var docfileInput5 = $("#File_TC")[0];
    var docfileInput6 = $("#File_Caste")[0];
    var docfileInput7 = $("#File_BAPTISM")[0];

    var selectedFile1 = docfileInput1.files[0];
    var selectedFile2 = docfileInput2.files[0];
    var selectedFile3 = docfileInput3.files[0];
    var selectedFile4 = docfileInput4.files[0];
    var selectedFile5 = docfileInput5.files[0];
    var selectedFile6 = docfileInput6.files[0];
    var selectedFile7 = docfileInput7.files[0];
    var comm = $('.cmbCommunity option:selected').val();

    var sl = $('.lblmainstd').html();
    if (selectedFile1 == "" || selectedFile1 == null || selectedFile1 == undefined) {
        easyAlert('Please Upload Student Image');
    }
    else if (selectedFile2 == "" || selectedFile2 == null || selectedFile2 == undefined) {
        easyAlert('Please upload ' + fathertype + ' Image');
    }
    else if (selectedFile3 == "" || selectedFile3 == null || selectedFile3 == undefined) {
        easyAlert('Please upload ' + mothertype + ' Image');
    }
    else if (selectedFile4 == "" || selectedFile4 == null || selectedFile4 == undefined) {
        easyAlert('Please Upload Birth Certificate');
    }
    else if (comm == 'Roman Catholic' && selectedFile4 == "" || selectedFile4 == null || selectedFile4 == undefined) {
        easyAlert('Please Upload Birth Certificate');
    }
    else {


        var request_by = sl;

        if (request_by == "") {
            easyAlert('Session Expired ! Please Re-Login');
        }
        else {
            $('#l1').show();
            $('#l2').show();
            //var files = fileUpload.files;
            var formdata = new FormData();
            formdata.append("doc1", selectedFile1);
            formdata.append("doc2", selectedFile2);
            formdata.append("doc3", selectedFile3);
            formdata.append("doc4", selectedFile4);
            formdata.append("doc5", selectedFile5);
            formdata.append("doc6", selectedFile6);
            formdata.append("doc7", selectedFile7);
            $.ajax({
                url: "../WebHandler/AdmissionHandler.ashx?id=" + sl + "&fathertype=" + fathertype + "&mothertype=" + mothertype,
                type: 'POST',
                data: formdata,
                cache: false,
                contentType: false,
                processData: false,
                success: function (response) {
                    //alert(response.responseText);
                    //$("#fileProgress").hide();
                },
                complete: function (file) {
                    Documentnext();
                    $('#l1').hide();
                    $('#l2').hide();
                }

            });




        }
    }
};

function Documentnext() {

    //v-source-info-tab
    $('#btnSource').prop('disabled', false);
    $('#btnSource').attr('data-nexttab', "v-source-info-tab");
    $('#btnSource').removeClass('btn-source');
    $('#btnSource').addClass('btn-source');


    $('#v-pills-Documents-tab').removeClass('active');
    $('#v-pills-Documents-tab').removeClass('show');
    $('#v-pills-Documents-tab').addClass('done');

    $('.admission-panel').removeClass('active');

    $('#v-source-info').addClass('active');
    $('#v-source-info-tab').addClass('active');
    $('#v-source-info').addClass('show');

}

function SourceNext() {

    $('#btnSocial').prop('disabled', false);
    $('#btnSocial').attr('data-nexttab', "v-pills-payment-tab");
    $('#btnSocial').removeClass('btn-social');
    $('#btnSocial').addClass('btn-social');


    $('#v-source-info-tab').removeClass('active');
    $('#v-source-info-tab').removeClass('show');
    $('#v-source-info-tab').addClass('done');

    $('.admission-panel').removeClass('active');

    $('#v-pills-Social').addClass('active');
    $('#v-pills-Social-tab').addClass('active');
    $('#v-pills-Social').addClass('show');
    $('#v-pills-Social').addClass('done');
    FormFees();
}
function Socialnext() {


    $('#btnPayment').prop('disabled', false);
    $('#btnPayment').attr('data-nexttab', "v-pills-payment-tab");
    $('#btnPayment').removeClass('btn-term');
    $('#btnPayment').addClass('btn-term');


    $('#v-pills-Social-tab').removeClass('active');
    $('#v-pills-Social-tab').removeClass('show');
    $('#v-pills-Social-tab').addClass('done');

    $('.admission-panel').removeClass('active');

    $('#v-pills-payment').addClass('active');
    $('#v-pills-payment').addClass('show');
    $('#v-pills-payment').addClass('done');
}
$(document).on('click', '.btn-term', function () {
    var year = $(".cmb-year option:selected").val();
    var cl = $('.cmb-cls option:selected').val().split('_')[0];
    var str = $('.cmb-cls option:selected').val().split('_')[1];

    if (year == undefined || year == null || year == '') {
        easyAlert('Please Select Year');
    }
    else if (cl == undefined || cl == null || cl == '' || cl == '0') {
        easyAlert('Please Select Class');
    }
    else {
        $('#l1').show();
        $('#l2').show();
        var master =
        {
            str1: cl,
            str2: str,
            str3: year

        };
        $.ajax({
            url: "../WebSrv/srvAdmission.asmx/LoadTermCondition",
            data: '{obj:' + JSON.stringify(master) + '}',
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                if (response.d.length > 0) {

                    var head = response.d[0].str1;
                    var body = response.d[0].str2;

                    $('#lbltermhead').html(head);
                    $('#lblterm').html(body);
                    $('#TermConditionModal').modal("show");
                    //                    $('#TermConditionModal').modal({ backdrop: 'static', keyboard: false });
                }
            },
            complete: function (response) {
                $('#l1').hide();
                $('#l2').hide();
            }
        });
    }

});
$(document).on('click', '.a-click', function () {
    var sl1 = $('.lblmainstd').html();
    var sl = $(this).attr("id").split('-')[1];
    var regno = $('#rega_' + sl).html();
    $.confirm({
        title: 'confirmation',
        content: 'Are you Sure ! Remove ?',
        icon: 'far fa-question',
        theme: 'material',
        type: 'blue',
        animation: 'zoom',
        closeAnimation: 'zoom',
        buttons: {
            confirm: {
                text: 'Yes',
                btnClass: 'btn-blue',
                action: function () {
                    $('#a_' + sl).remove();
                    var master =
                    {
                        _sl: $('.lblmainstd').html(),
                        _adm_no: regno,

                    };
                    $.ajax({
                        url: "../WebSrv/srvAdmission.asmx/DeleteAdditionalDetails",
                        data: '{obj:' + JSON.stringify(master) + '}',
                        dataType: "json",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        success: function (response) {


                            if (response.d.length > 0) {



                            }
                        },
                        complete: function (response) {
                            $('#l1').hide();
                            $('#l2').hide();
                        }
                    });

                }
            },
            cancel: function () {
                $('#l1').hide();
                $('#l2').hide();
            }
        }
    });
});

/*
$(document).on('select2:select', '.cmbLastSchool', function () {

    var sname = $(this).val().split('_')[0];
    var sadd = $(this).val().split('_')[1];

    if (sadd == undefined) {
        sadd = "";
    }

    $('.txtLastSchoolAddress').val(sadd);
    if (sname == "OTHER") {
        $('#divlastSchool').show();
        $('.txtLastSchool').val("");

        $('#txtLastSchool').attr('required', true);
    }
    else {
        $('#divlastSchool').hide();
        $('.txtLastSchool').val("");
        $('#txtLastSchool').removeAttr('required');

    }

});
*/

function otpGenerate() {
    var phone = $.trim($('#txtphonenumber').val());
    if (phone == '' || phone == undefined || phone.length != 10) {
        easyAlert('Please Enter Phone Number.');
    }
    else {
        $('#l1').show();
        $('#l2').show();
        var master = {
            str1: phone
        };
        $.ajax({
            url: "../WebSrv/srvLogin.asmx/CreateLoginOTP",
            data: '{obj:' + JSON.stringify(master) + '}',
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                if (response.d.length > 0) {
                    if (response.d[0].str1 == 0) {
                        easyAlert(response.d[0].str2);
                    }

                    $('#divLogin').empty();
                    $('#divLogin').html(response.d[0].str4);
                }
            },
            complete: function (response) {
                $('#l1').hide();
                $('#l2').hide();
            }, error: function (response) {
                console.log(response.responseText);
            }
        });

    }
}
function VefiryOTP() {
    var otp1 = $.trim($('#digit1-input').val());
    if (otp1 == undefined) { otp1 = ''; }
    var otp2 = $.trim($('#digit2-input').val());
    if (otp2 == undefined) { otp2 = ''; }
    var otp3 = $.trim($('#digit3-input').val());
    if (otp3 == undefined) { otp3 = ''; }
    var otp4 = $.trim($('#digit4-input').val());
    if (otp4 == undefined) { otp4 = ''; }
    if (otp1 == '' || otp2 == '' || otp3 == '' || otp4 == '') {
        easyAlert('Please Enter OTP');
    }
    else {
        $('#l1').show();
        $('#l2').show();
        var master =
        {
            str1: otp1 + "" + otp2 + "" + otp3 + "" + otp4,
            str2: $('#lblvPhone').attr("data-mob")
        };
        $.ajax({
            url: "../WebSrv/srvLogin.asmx/ValidateLoginOTP",
            data: '{obj:' + JSON.stringify(master) + '}',
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                if (response.d.length > 0) {
                    easyAlert(response.d[0].str2);
                    if (response.d[0].str1 == "1") {
                        //  $('.nav-click-x').removeClass('active');
                        $('#v-pills-bill-declare-tab').addClass('done');
                        $('#divLogin').empty();
                        $('#divLogin').html(response.d[0].str3);
                        $('.div-declare-btn').html(response.d[0].str4);
                    }

                }
            },
            complete: function (response) {
                $('#l1').hide();
                $('#l2').hide();
            }
        });

    }
}
$(document).on("click", "#yes", function () {
    //var sl = $("#appid").html();
    var sl = $("#appid option:selected").val();
    //alert(sl);
    $("#exampleModal").modal("hide");
    GetPreSavedDetails(sl);
    GetPreSavedCCA(sl);
});
function showPreSaved(mobile, yearid) {
    var master =
    {
        _pmobile: mobile,
        _ss: yearid
    };
    $.ajax({
        url: "../WebSrv/srvAdmission.asmx/GetPreSavedForm",
        data: '{obj:' + JSON.stringify(master) + '}',
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            if (response.d.length > 0) {
                $("#exampleModal").modal("show");
                $("#yes").show();
                $("#presaved").html(response.d[0].str);

            } else {
                $("#exampleModal").modal("hide");
                $("#presaved").html(response.d[0].str);
            }
        },
        complete: function (response) {
            $('#l1').hide();
            $('#l2').hide();
        }
    });
}

function GetPreSavedDetails(sl) {

    var master =
    {
        _sl: sl
    };
    $.ajax({
        url: "../WebSrv/srvAdmission.asmx/GetPreSavedDetails",
        data: '{obj:' + JSON.stringify(master) + '}',
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            if (response.d.length > 0) {
                $("#lblmainstd").html(sl);
                $("#cmbClass").val(response.d[0]._cls).trigger('change');
                $("#txtfirstName").val(response.d[0]._fn);
                $("#txtMiddleName").val(response.d[0]._mn);
                $("#txtlastName").val(response.d[0]._sn);
                $("#cmbgender").val(response.d[0]._sx).trigger('change');
                $("#txtdob").val(response.d[0]._db);
                $("#txtAge").val(response.d[0]._age);
                $("#cmbCaste").val(response.d[0]._cst).trigger('change');
                $("#cmbnationality").val(response.d[0]._nation);
                $("#cmbCommunity").val(response.d[0]._comm).trigger('change');
                $("#cmbMotherToungue").val(response.d[0]._m_t).trigger('change');
                $(".cmbBloodgroup").val(response.d[0]._b_g).trigger('change');
                $("#txtAadhar").val(response.d[0]._Aadhar);
                $("#cmbDietary").val(response.d[0]._Diet).trigger('change');
                $("#txtIdentification").val(response.d[0]._ident);
                $("input:radio[name='Rb_Disease']:checked").val(response.d[0]._disse);
                $("input:radio[name='Rb_Medicine']:checked").val(response.d[0]._medic);
                $(".cmbSingleGirlChild").val(response.d[0]._SGirlChild).trigger('change');
                $(".cmbDivyanngjan").val(response.d[0]._Divyang).trigger('change');
                $(".cmbEWS").val(response.d[0]._EVS).trigger('change');
                $(".cmbEWSCategory").val(response.d[0]._evscat).trigger('change');
                $("#txtResidential").val(response.d[0]._residential_add);
                $("#txtCity").val(response.d[0]._city);
                $("#cmbState ").val(response.d[0]._state).trigger('change');
                $("#txtPin ").val(response.d[0]._pin);
                $("#txtemail1 ").val(response.d[0]._email);
                $("#txtemail2 ").val(response.d[0]._secondaryemail);
                $("#txtPrimaryPhone ").val(response.d[0]._primarymobile);
                $("#txtSecondaryPhone ").val(response.d[0]._secondarymobile);
                $("#txtWhatsappNo ").val(response.d[0]._whatsappNO);
                $("#cmbDistance ").val(response.d[0]._homelocation).trigger('change');
                $("#cmbLastSchool ").val(response.d[0]._LastSchoolName);
                $("#txtLastSchoolAddress ").val(response.d[0]._LastSchoolAddress);
                $("#cmbTransMode ").val(response.d[0]._bus).trigger('change');
                $("#cmbBusRoute ").val(response.d[0]._busRoute).trigger('change');
                $("#cmbStreamSubjects ").val(response.d[0]._selectedStream).trigger('change');
                $("#txtFatherName ").val(response.d[0]._father);
                $("#cmbfatherQualification ").val(response.d[0]._fedu).trigger('change');
                $("#txtFatherPhone ").val(response.d[0]._fphone);
                $("#txtFatherEmail ").val(response.d[0]._fatheremail);
                $("#txtFatherOfficeAddress ").val(response.d[0]._foffice);
                $("#txtFatherProfession ").val(response.d[0]._foccup);
                $("#txtFatherIncome ").val(response.d[0]._fincome);
                $("#txtMotherName ").val(response.d[0]._mother);
                $("#cmbMotherQualification ").val(response.d[0]._medu).trigger('change');
                $("#txtMotherPhone ").val(response.d[0]._mphone);
                $("#txtMotherOfficeAddress ").val(response.d[0]._moffice);
                $("#txtMotherProfession ").val(response.d[0]._moccup);
                $("#txtMotherIncome ").val(response.d[0]._mincome);
            } else {
                easyAlert("No details found");
            }
        },
        complete: function (response) {
            $('#l1').hide();
            $('#l2').hide();
        }
    });
}

function GetPreSavedCCA(sl) {
    //var datas = [];
    var master =
    {
        _sl: sl,
    };
    $.ajax({
        url: "../WebSrv/srvAdmission.asmx/GetSavedCCA",
        data: '{obj:' + JSON.stringify(master) + '}',
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            if (response.d.length > 0) {
                var datas = [];

                response.d.forEach(function (item) {
                    datas.push("{_sl:'" +
                        master._sl +
                        "',_act_name:'" +
                        item._act_name +
                        "',_details:'" +
                        item._details +
                        "'}");
                });
                console.log(datas);
                var quiz = eval("(" + datas[0] + ")");
                var dance = eval("(" + datas[1] + ")");
                var music = eval("(" + datas[2] + ")");
                var singing = eval("(" + datas[3] + ")");
                var drawing = eval("(" + datas[4] + ")");
                var others = eval("(" + datas[5] + ")");
                $("#quiz_text ").val(quiz._details);
                $("#dancing_text ").val(dance._details);
                $("#music_text ").val(music._details);
                $("#singing_text ").val(singing._details);
                $("#draw_text ").val(drawing._details);
                $("#others_text ").val(others._details);
                console.log(quiz._details);
                console.log(dance._details);
            } else {
                console.log("No cca details found");
            }
        },
        complete: function (response) {
            $('#l1').hide();
            $('#l2').hide();
        }
    });
}
function ActiveSession(yr) {
    $('#l1').show();
    $('#l2').show();
    var sel = $('#cmbYear');
    sel.empty();
    var mobile = $.trim($('#lblphone').html());
    var id = yr;
    var fromyear = '';
    $.ajax({
        url: "../WebSrv/srvLogin.asmx/Loadactivesession",
        data: '{}',
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            var strArray = new Array();
            if (response.d.length > 0) {

                if (id == "") {
                    id = response.d[0].str1;
                    fromyear = response.d[0].str2.split('-')[0];
                }
                else {
                    fromyear = yr.substring(0, 4);
                }
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
                fromyear = $(this).text().split('-')[0];;
                $('#lblagedate').html('31/03/' + fromyear);
                $('.lbladate').html('31/03/' + fromyear);

                LoadClassByYear();
                //showPreSaved(mobile, id);

            }).on('select2:select', function (e) {

            }).val(id).trigger('change');

            LoadClassByYear();

            $('#lblagedate').html('31/03/' + fromyear);
            $('.lbladate').html('31/03/' + fromyear);

            //showPreSaved(mobile, id);
            $('#l1').hide();
            $('#l2').hide();
        }
    });
}
function LoadClassByYear() {
    $('#l1').show();
    $('#l2').show();
    var cl = getUrlVars()["c"];
    if (cl == undefined || cl == null) { cl = ""; }
    var id = "";
    if (cl != "") {

        var aa = cl.split('_');
        id = aa[0] + "_" + decodeURIComponent(aa[2]) + "_" + aa[4] + "_" + aa[3];
    }
    var sessyear = $(".cmb-year option:selected").val();
    var year = $(".cmb-year option:selected").text();
    var master =
    {
        str1: sessyear,
        str2: year
    }
    $('.div-cls-A').empty();
    $('.div-cls-A').html(`<label for="cmbClass" class="form-label">Class</label>
                                                                <select class="form-control cmb-cls" id="cmbClass"></select>`);


    var sel = $('#cmbClass');
    sel.empty();
    sel.append("<option value='0___0'>Select Class</option>");
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
            $('#l1').hide();
            $('#l2').hide();
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



            }).on('select2:select', function (e) {

            }).val(id).trigger('change');

            $('#l1').hide();
            $('#l2').hide();
        }
    });

}
$(document).on("change", ".cmb-cls", function () {

    var cl = "";
    try {
        cl = $(this).val().split('_')[0];
    } catch (error) {
        $('#l1').hide();
        $('#l2').hide();
    }



    if (cl == 0 || cl == undefined || cl == '') {
        $('.div-cls-btn').empty();
    }
    else {
        var str = $(this).val().split('_')[1]
        $('.lbltype').html($(this).val().split('_')[2]);
        $('.lblses').html($(this).val().split('_')[3]);


        var btn = `<button type="button" class="btn btn-light btn-label previestab" data-previous="v-pills-bill-declare-tab"><i class="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>Declaration</button>
                    <button type='button' class='btn btn-danger btn-label right ms-auto nexttab nexttab btn-personal'><i class='ri-arrow-right-line label-icon align-middle fs-16 ms-2'></i>Save & Next</button>                    `;
        $('.div-cls-btn').html(btn);

        $('#divCuet').html('');
        if (str == '' || str == undefined || str == null) {
            $('#cmbStreamSubjects1').val('');
            $('#cmbStreamSubjects2').val('');
            $('#tbl1ndSub').empty();
            $('#tbl2ndSub').empty();
            $('#tblstrcls').html(cl);
            $('.divStream').hide();
            if (cl == '8' || cl == '9' || cl == '10') {
                $('.divStream').show();
                $('.streamlist1').hide();
                $('.streamlist2').hide();


                var cuet = `   <div class="alert alert-danger alert-dismissible alert-additional fade show material-shadow" role="alert">
                                                                    <div class="alert-body">

                                                                        <div class="d-flex">

                                                                            <div class="flex-grow-1" style="display: flex;">

                                                                                <h5 class="alert-heading">Class ${cl} Foundation Course
                           
                                                                                     </h5>
                                                                                <div class="row" style="margin-right: 10px; position: absolute; right: 0">
                                                                                    <div class="col-md-12">
                                                                                        <div class="form-check form-check-inline">
                                                                                            <input class="form-check-input cls-cuet-std" type="radio" name="inlineRadioOptions1_cuet"   id="cuet_yes" value="Yes">
                                                                                            <label class="form-check-label" for="cuet_yes">Yes</label>
                                                                                        </div>
                                                                                        <div class="form-check form-check-inline">
                                                                                            <input class="form-check-input cls-cuet-std" type="radio" name="inlineRadioOptions1_cuet" checked id="cuet_no" value="No">
                                                                                            <label class="form-check-label" for="cuet_no">No</label>

                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="alert-content">
                                                                        <ul><li>Class ${cl} Foundation Course a preparation for NEET & JEE and other competitive exams. </li>
                                                                            <li>Foundation Course is scheduled from 2:15 PM to 3:30 PM, Monday to Saturday for Mathes, Physics, Chemistry, Biology and mental ability /Logical reasoning. </li>
                                                                             <li>An additional fee of Rs. 1000 will be charged and add to the regular monthly tuition fee of the student. </li>
                                                                             <li>The Selection is based on the <b>Foundation Course Entrance Test conducted by the school</b>. </li>

                                                                        </ul>
                                                			
 
                                                                       

                                                                    </div>
                                                                </div>`;

                if (cl == '9' || cl == '8' || cl == '10') {
                    $('#divCuet').html(cuet);
                }



                SubjectListByClass();
            }
            else {
                $('.divStreamNa').show();
            }
        }

        else {
            $('#cmbStreamSubjects1').val(str);

            StreamSubByCls();

            $('.streamlist1').show();
            $('.streamlist2').show()

            $('.divStreamNa').hide();
            $('.divStream').show();


            if (str.toLowerCase() == "commerce" || str.toLowerCase() == "humanities" || str.toLowerCase() == "art" || str.toLowerCase() == "arts" || str.toLowerCase() == "science") {

                var cuet = `   <div class="alert alert-danger alert-dismissible alert-additional fade show material-shadow" role="alert">
                                                                    <div class="alert-body">

                                                                        <div class="d-flex">

                                                                            <div class="flex-grow-1" style="display: flex;">

                                                                                <h5 class="alert-heading">CUET Coaching (Common University Entrance Test) 
                           
                                                                                     </h5>
                                                                                <div class="row" style="margin-right: 10px; position: absolute; right: 0">
                                                                                    <div class="col-md-12">
                                                                                        <div class="form-check form-check-inline">
                                                                                            <input class="form-check-input cls-cuet-std" type="radio" name="inlineRadioOptions1_cuet"   id="cuet_yes" value="Yes">
                                                                                            <label class="form-check-label" for="cuet_yes">Yes</label>
                                                                                        </div>
                                                                                        <div class="form-check form-check-inline">
                                                                                            <input class="form-check-input cls-cuet-std" type="radio" name="inlineRadioOptions1_cuet" checked id="cuet_no" value="No">
                                                                                            <label class="form-check-label" for="cuet_no">No</label>

                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="alert-content">
                                                                        <ul><li>CUET Coaching for Section I (English Language) & Section III (General Test)</li>
                                                                            <li>CUET classes are scheduled from 2:15 PM to 3:30 PM, Monday to Saturday.</li>
                                                                             <li>An additional fee of Rs. 1,000 will be applicable for the CUET program, in addition to the fee for the selected stream.</li>
                                                                             <li>The CUET Coaching shall be applicable only for the students opting for Science/Commerce/Humanities stream.</li>

                                                                        </ul>
                                                			
 
                                                                       

                                                                    </div>
                                                                </div>`;
                $('#divCuet').html(cuet);
            }

        }


    }



    if (cl.toLowerCase() == "nursery" || cl.toLowerCase() == "lkg" || cl.toLowerCase() == "1" || cl.toLowerCase() == "i") {
        ClassAgeYear();
        $('.pen-div').hide();
        $('#cmbLastSchool').removeAttr('required');
        $('#txtLastSchoolAddress').removeAttr('required');

        // Optionally hide the red asterisk
        $('#lblR1, #lblR2, #lblR3').hide();
        // Remove Last School Require  //

    }
    else {
        $('.pen-div').show();
        $('.age-baner').hide();
        $('#cmbLastSchool').attr('required', true);
        $('#txtLastSchoolAddress').attr('required', true);

        // Show the red asterisk
        $('#lblR1, #lblR2, #lblR3').show();
    }

    TransportMode();
});
function SetMaxDate(yearA, monthA) {

    const inputDate = $('#lblagedate').html();
    const parts = inputDate.split('/');
    const jsDate = new Date(parts[2], parts[1] - 1, parts[0]);

    var today = new Date(jsDate);//(parts[2]+'-'+parts[1]+'-'+ parts[0]);
    var maxDate = new Date(today.getFullYear() - yearA, today.getMonth() - monthA, today.getDate() - 0);

    const parsedDate = new Date(maxDate);

    // Extract day, month, and year
    const day = maxDate.getDate();
    const month = maxDate.getMonth() + 1; // Months are zero-based (January is 0)
    const year = maxDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    //  $('#txtdob').attr('data-date-end-date', formattedDate);
    $('#txtdob').val('');
}

function ClassAgeYear() {
    var yearid = $(".cmb-year option:selected").val();
    var cls = $('.cmb-cls option:selected').val().split('_')[0];
    var str = $('.cmb-cls option:selected').val().split('_')[1];
    $('#l1').show();
    $('#l2').show();
    $('.age-baner').hide();
    var master =
    {
        str1: yearid,
        str2: cls,
        str3: str
    }

    $.ajax({
        url: "../WebSrv/srvAdmission.asmx/LoadClsyearMonth",
        data: '{obj:' + JSON.stringify(master) + '}',
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (response) {

            console.log(response.d.length);
            if (response.d.length > 0) {
                var fromyear = response.d[0].str1;
                var frommonth = response.d[0].str2;
                var toyear = response.d[0].str3;
                var tomonth = response.d[0].str4;
                if (fromyear != "") {
                    if (cls == '0' || cls == '') {
                        $('.age-baner').hide();
                    }
                    else {
                        $('.age-baner').show();

                        $('.lblclsage').html(cls + ' ' + str);

                        SetMaxDate(fromyear, frommonth);
                        if (toyear == '' || toyear == '0') {
                            if (frommonth == '0' || frommonth == '') {
                                $('.age-content').html('<p class="mb-0">Student applying for Class ' + cls + ' ' + str + ' must be at least ' + fromyear + ' years old as on ' + $('#lblagedate').html() + '.</p>');
                            }
                            else {
                                $('.age-content').html('<p class="mb-0">Student applying for Class ' + cls + ' ' + str + ' must be at least ' + fromyear + ' years ' + frommonth + ' month old as on ' + $('#lblagedate').html() + '.</p>');

                            }
                        }
                        else {

                        }
                    }
                }
            }

        },
        error: function (response) {

        },
        failure: function (response) {

        },
        complete: function (response) {

            $('#l1').hide();
            $('#l2').hide();

        }
    });


}
function MotherTounge() {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../assets/json/mother-tongues.json?v=1.0.8");
    xhr.send();
    xhr.onload = function () {
        if (xhr.status == 200) {
            var data = JSON.parse(xhr.responseText);
            var dropdown = document.getElementById("cmbMotherToungue");

            for (var i = 0; i < data.mother_tongues.length; i++) {
                var option = document.createElement("option");

                option.value = data.mother_tongues[i];
                option.text = data.mother_tongues[i];
                dropdown.appendChild(option);
            }
        }
    };
}
function StateName() {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../assets/json/state-list.json?v=1.0.1");
    xhr.send();
    xhr.onload = function () {
        if (xhr.status == 200) {
            var data = JSON.parse(xhr.responseText);
            var dropdown = document.getElementById("cmbState");

            for (var i = 0; i < data.state_name.length; i++) {
                var option = document.createElement("option");

                option.value = data.state_name[i];
                option.text = data.state_name[i];
                dropdown.appendChild(option);
            }
        }
    };


}
function LastSchool() {
    /*
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "../assets/json/school-name.json?v=1.0.0");
        xhr.send();
        xhr.onload = function () {
            if (xhr.status == 200) {
                var data = JSON.parse(xhr.responseText);
                var dropdown = document.getElementById("cmbLastSchool");
    
                for (var i = 0; i < data.school_name.length; i++) {
                    var option = document.createElement("option");
    
                    option.value = data.school_name[i];
                    option.text = data.school_name[i].replace("_", ", ");
                    dropdown.appendChild(option);
                }
            }
        };
    
    */
}
function TransportMode() {
    $('#l1').show();
    $('#l2').show();
    var sel = $('#cmbTransMode');
    sel.empty();
    var year = $(".cmb-year option:selected").text().split('-')[0];
    var master =
    {
        str1: year

    }
    $.ajax({
        url: "../WebSrv/srvAdmission.asmx/getTranspType",
        data: '{obj:' + JSON.stringify(master) + '}',
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            var strArray = new Array();
            if (response.d.length > 0) {



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
            FormFees();
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
                placeholder: "Select Mode",
                closeOnSelect: true,
                allowClear: true,
                data: p,
                escapeMarkup: function (m) {
                    return m;
                }
            }).on('select2:close', function () {
                var vl = $(this).val();
                if (vl == 'ST') {
                    $('.divBusRoute').show();
                    TransportRoute(0);

                }
                else {
                    $('#lblTrnRegF').html('');
                    $('.divBusRoute').hide();
                    $('#cmbBusRoute').empty();
                }

            }).on('select2:select', function (e) {

            });

            $('#l1').hide();
            $('#l2').hide();

        }
    });

}

function TransportRoute(br) {
    $('#l1').show();
    $('#l2').show();
    var sel = $('#cmbBusRoute');
    sel.empty();
    var year = $(".cmb-year option:selected").text().split('-')[0];
    var master =
    {
        str1: year

    }
    $.ajax({
        url: "../WebSrv/srvAdmission.asmx/getTransPoint",
        data: '{obj:' + JSON.stringify(master) + '}',
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            var strArray = new Array();
            if (response.d.length > 0) {


                strArray.push("{\"id\":\"0\",\"text\":\"\"}");

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
                placeholder: "Select Point",
                closeOnSelect: true,
                allowClear: true,
                data: p,
                escapeMarkup: function (m) {
                    return m;
                }
            }).on('select2:close', function () {


            }).on('select2:select', function (e) {

            }).val(br).trigger("change");

            $('#l1').hide();
            $('#l2').hide();

        }
    });
    var a = `                  <div class="alert alert-danger alert-dismissible alert-additional fade show material-shadow" role="alert">
                                                                    <div class="alert-body">

                                                                        <div class="d-flex">

                                                                            <div class="flex-grow-1" style="display: flex;">

                                                                                <h5 class="alert-heading">School Trasport Registration
                           
                                                                                     </h5>
                              
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="alert-content">
                                                                        <ul><li>At the time of admission, a registration fee of ₹500 shall be payable to reserve the transportation seat. </li>
                                                                            <li>This fee must be paid along with the admission fee in order to confirm the seat in school transportation.</li>
             

                                                                        </ul>
                                                			
 
                                                                       

                                                                    </div>
                                                                </div>
                                           
                    `;
    $('#lblTrnRegF').html(a);
}
function SubjectListByClass() {
    $('#l1').show();
    $('#l2').show();

    $('#tbl1stSub').empty();

    var year = $(".cmb-year option:selected").text().split('-')[0];
    var cl = $('.cmb-cls option:selected').val().split('_')[0];
    var str = $('.cmb-cls option:selected').val().split('_')[1];

    var master =
    {
        str1: year,
        str2: cl,
        str3: str

    }
    $.ajax({
        url: "../WebSrv/srvAdmission.asmx/LoadSubjectOne",
        data: '{obj:' + JSON.stringify(master) + '}',
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (response) {

            if (response.d.length > 0) {
                $('#tbl1stSub').html(response.d[0].str1);


            }

        },
        error: function (response) {

        },
        failure: function (response) {

        },
        complete: function (response) {

            console.log(response.responseText);

            $('#l1').hide();
            $('#l2').hide();

        }
    });
}

function StreamSubByCls() {
    $('#l1').show();
    $('#l2').show();
    var sel = $('#cmbStreamSubjects2');
    $('#tbl1stSub').empty();
    sel.empty();
    var year = $(".cmb-year option:selected").text().split('-')[0];
    var cl = $('.cmb-cls option:selected').val().split('_')[0];
    var str = $('.cmb-cls option:selected').val().split('_')[1];

    var master =
    {
        str1: year,
        str2: cl,
        str3: str

    }
    $.ajax({
        url: "../WebSrv/srvAdmission.asmx/StreamTwoSubjectOne",
        data: '{obj:' + JSON.stringify(master) + '}',
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            var strArray = new Array();
            if (response.d.length > 0) {
                $('#tbl1stSub').html(response.d[0].str1);

                strArray.push("{\"id\":\"0\",\"text\":\"\"}");

                for (var i = 0; i < response.d.length; i++) {

                    strArray.push("{\"id\":\"" + response.d[i].str2 + "\",\"text\":\"" + response.d[i].str2 + "\"}");

                }

            }
            data = "[" + strArray + "]";
        },
        error: function (response) {
            console.log(response.responseText);
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
                placeholder: "Select Point",
                closeOnSelect: true,
                allowClear: true,
                data: p,
                escapeMarkup: function (m) {
                    return m;
                }
            }).on('select2:close', function () {

                Stream2Subject();
            }).on('select2:select', function (e) {

            });

            $('#l1').hide();
            $('#l2').hide();

        }
    });

}

function Stream2Subject() {
    $('#l1').show();
    $('#l2').show();
    $('#tbl2ndSub').empty();

    var year = $(".cmb-year option:selected").text().split('-')[0];
    var cl = $('.cmb-cls option:selected').val().split('_')[0];
    var str = $('#cmbStreamSubjects2').val();
    var master =
    {
        str1: year,
        str2: cl,
        str3: str

    }
    $.ajax({
        url: "../WebSrv/srvAdmission.asmx/StreamTwoSubjectList",
        data: '{obj:' + JSON.stringify(master) + '}',
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (response) {

            if (response.d.length > 0) {
                $('#tbl2ndSub').html(response.d[0].str1);
            }

        },
        error: function (response) {
            alert(response.responseText);
        },
        failure: function (response) {

        },
        complete: function (response) {

            $('#l1').hide();
            $('#l2').hide();


        }
    });
}
function FormFees() {
    var year = $(".cmb-year option:selected").val();
    var cl = $('.cmb-cls option:selected').val().split('_')[0];
    var str = $('.cmb-cls option:selected').val().split('_')[1];
    $('#l1').show();
    $('#l2').show();
    var master =
    {
        str1: year,
        str2: cl,
        str3: str

    }
    $.ajax({
        url: "../WebSrv/srvAdmission.asmx/getFormFees",
        data: '{obj:' + JSON.stringify(master) + '}',
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (response) {

            if (response.d.length > 0) {

                $('#lblFormFee').html(response.d[0].str1)



            }

        },
        error: function (response) {

        },
        failure: function (response) {

        },
        complete: function (response) {

            $('#l1').hide();
            $('#l2').hide();

        }
    });

}

function LoadHealthRecord(sl) {

    var master =
    {
        str1: sl



    }
    $.ajax({
        url: "../WebSrv/srvAdmission.asmx/LoadHealthRecord",
        data: '{obj:' + JSON.stringify(master) + '}',
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (response) {

            if (response.d.length > 0) {

                var adm = response.d[0].str1;
                $('#tblHealth').html(adm);
            }


        },
        error: function (response) {

        },
        failure: function (response) {

        },
        complete: function (response) {



        }
    });

}

$(document).on('blur', '.txtdob', function () {

    var dd = $('#txtdd').val(); if (dd == undefined || dd == null) { dd = ""; }
    if (dd > 31) { $('#txtdd').val(""); dd = ""; }
    var mm = $('#txtmm').val(); if (mm == undefined || mm == null) { mm = ""; }
    if (mm > 12) { $('#txtmm').val(""); mm = ""; }
    var yyyy = $('#txtyyyy').val(); if (yyyy == undefined || yyyy == null) { yyyy = ""; }
    const dobString = dd + "/" + mm + "/" + yyyy;
    if (dd != "" && mm != "" && yyyy != "") {
        $('#l1').show();
        $('#l2').show();
        const dob = new Date(dobString);
        const fixedDateParts = $('#lblagedate').html().split('/');
        const fixedDate = new Date(fixedDateParts[2], fixedDateParts[1] - 1, fixedDateParts[0]);
        var year = $(".cmb-year option:selected").val();
        var cl = $('.cmb-cls option:selected').val().split('_')[0];
        var str = $('.cmb-cls option:selected').val().split('_')[1];

        var master =
        {
            _fromdate: dobString,// dob,
            _todate: $('#lblagedate').html(),//fixedDate,
            _sessid: year,
            _cls: cl,
            _stream: str,
            _stdname: $('.txtfirstName').val() + " " + $('.txtMiddleName').val() + " " + $('.txtlastName').val()
        };
        $.ajax({
            url: "../WebSrv/srvAdmission.asmx/AgeCalculation",
            data: '{obj:' + JSON.stringify(master) + '}',
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                if (response.d.length > 0) {
                    $('.txtAge').val(response.d[0]._age);
                    var _valid = response.d[0]._valid;
                    var _agenumber = response.d[0]._agenumber;
                    $('.agenumber').html(_agenumber);
                    if (_valid == "0") {
                        $('#AgeModal').modal("show");
                        $('#lblagemsg').html(response.d[0]._agemsg)
                        $('.btn-danger').hide();
                        $('.agenumber').html(0);
                    }


                }
            },
            complete: function (response) {
                $('#l1').hide();
                $('#l2').hide();
            }
        });
    }
    else {
        $('.txtAge').val('');
    }
});
$(document).on('click', '.btn-accept-age', function () {

    location.reload();
});
$(document).on('change', '.txtFatherProfession', function () {

    var aa = $('.txtFatherProfession option:selected').val();
    if (aa == 'Other') {
        $('#divFatherProfession').show();
        $('.txtFatherProfession_other').attr('required', true);
    }
    else {
        $('#divFatherProfession').hide();
        $('.txtFatherProfession_other').attr('required', false);
    }

});
$(document).on('change', '.txtFatherEmployement', function () {

    var aa = $('.txtFatherEmployement option:selected').val();
    if (aa == 'Other') {
        $('#divFatherEmployement').show();
        $('.txtFatherEmployement_other').attr('required', true);
    }
    else {
        $('#divFatherEmployement').hide();
        $('.txtFatherEmployement_other').attr('required', false);
    }

});

$(document).on('change', '.txtMotherProfession', function () {

    var aa = $('.txtMotherProfession option:selected').val();
    if (aa == 'Other') {
        $('#divMotherProfession').show();
        $('.txtMotherProfession_other').attr('required', true);
    }
    else {
        $('#divMotherProfession').hide();
        $('.txtMotherProfession_other').attr('required', false);
    }

});
$(document).on('change', '.txtMotherEmployement', function () {

    var aa = $('.txtMotherEmployement option:selected').val();
    if (aa == 'Other') {
        $('#divMotherEmployement').show();
        $('.txtMotherEmployement_other').attr('required', true);
    }
    else {
        $('#divMotherEmployement').hide();
        $('.txtMotherEmployement_other').attr('required', false);
    }

});
$(document).on('change', '.cmbCommunity', function () {

    var aa = $('.cmbCommunity option:selected').val();

    if (aa == 'Roman Catholic') {
        $('.lblbaptR').html('*')
        $('#File_BAPTISM').attr('required', true);
    }
    else {
        $('.lblbaptR').html('')
        $('#File_BAPTISM').attr('required', false);
    }

});

$(document).on('keyup', '.cls-income', function () {
    var sum = 0;
    $('.cls-income').each(function () {
        var value = parseFloat($(this).val());
        if (!isNaN(value)) {
            sum += value;
        }
    });
    $('#txtFamilyAnnualIncome').val(sum);
});
$(document).on('change', '.cls-ext-std', function () {
    var val = $(this).val();
    $('.txt-regNo-t').val('');
    if (val == "Yes") {
        $('.divVerify').show();
        $('.divVerify').val();
        $('.btn-v-close').hide(); $('.btn-prefill').show();

    }
    else {
        $('.divVerify').hide();
        $('.btn-v-close').show(); $('.btn-prefill').hide();
    }

});
$(document).on('click', '.btn-prefill', function () {
    var regno = $('.txt-regNo-t').val();
    if (regno == 0 || regno == undefined) { easyAlert('Please Enter Reg No to verify') }
    else {
        var fromyear = $(".cmb-year option:selected").text().split('-')[0];
        var toyear = $(".cmb-year option:selected").text().split('-')[1];

        var cl = $('.cmb-cls option:selected').val().split('_')[0];

        var master =
        {
            str1: regno,
            str2: fromyear,
            str3: toyear
        };
        $.ajax({
            url: "../WebSrv/srvAdmission.asmx/VerifyStudent",
            data: '{obj:' + JSON.stringify(master) + '}',
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                if (response.d.length > 0) {
                    var _valid = response.d[0]._valid;
                    if (_valid == "0") {
                        $('.lblregno').html("")
                        easyAlert(response.d[0]._msg);
                    }
                    else {
                        $('.lblregno').html(response.d[0]._regno)
                        $('.txtfirstName').val(response.d[0]._fn)
                        $('.txtMiddleName').val(response.d[0]._mn)
                        $('.txtlastName').val(response.d[0]._sn)
                        $('.cmbgender').val(response.d[0]._gender).trigger("change");

                        $('.txtfirstName').prop('readonly', true);
                        $('.txtMiddleName').prop('readonly', true);
                        $('.txtlastName').prop('readonly', true);

                        //$('#txtdob').moment.setDate(response.d[0]._db);

                        //$('.txtdob').val(response.d[0]._db)
                        $('#cmbnationality').val(response.d[0]._nation)
                        $('.cmbCommunity').val(response.d[0]._comm).trigger("change");
                        $('.cmbCaste').val(response.d[0]._cst).trigger("change");
                        $('.cmbMotherToungue').val(response.d[0]._m_t).trigger("change");
                        $('.cmbBloodgroup').val(response.d[0]._b_g).trigger("change");
                        $('.txtIdentification').val(response.d[0]._ident)

                        var _desg = response.d[0]._desg;
                        $('.txtDisease').val(_desg);
                        if (_desg != "No") {
                            _desg = "Yes";
                        }
                        $('input[name="Rb_Disease"][value="' + _desg + '"]').prop('checked', 'checked').trigger("change");
                        $('input[name="Rb_Medicine"][value="' + response.d[0]._medic + '"]').prop('checked', 'checked');

                        $('.cmbLastSchool').val("ST. FRANCIS DE SALES SCHOOL_GUWAHATI");
                        $("#txtLastSchoolAddress").val("GUWAHATI");

                        $('#txtFatherName').val(response.d[0]._father);
                        $('#txtMotherName').val(response.d[0]._mother);


                        $("#txtResidential").val(response.d[0]._residential_add);
                        $("#txtPrimaryPhone").val(response.d[0]._primarymobile);
                        $("#txtCity").val(response.d[0]._city);
                        $('#cmbState').val(response.d[0]._state).trigger("change");
                        $('#txtPin').val(response.d[0]._pin);
                        $('#txtemail1').val(response.d[0]._email);

                        $('#ModelExistingStudent').modal("hide");






                    }

                }
            },
            complete: function (response) {

                $('#l1').hide();
                $('#l2').hide();
            }, error: function (response) { alert(response.responseText); }
        });

    }
});

$(document).on('click', '.btn-social', function () {
    var sl = $('.lblmainstd').html();
    var val = $("input:radio[name='Rb_Social']:checked").val();
    if (val == undefined) {
        val = '';
    }
    if (sl == 0 || sl == undefined) { }
    else {
        if (val == '') { easyAlert('Please Select Concent'); }
        else {
            $('#l1').show();
            $('#l2').show();
            var master =
            {
                str1: sl,
                str2: val


            }
            $.ajax({
                url: "../WebSrv/srvAdmission.asmx/UpdateSocialConcent",
                data: '{obj:' + JSON.stringify(master) + '}',
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                success: function (response) {

                    if (response.d.length > 0) {
                        var aa = response.d[0].str1;
                        if (aa == 1) {
                            Socialnext();
                        }
                    }

                },
                error: function (response) {
                    $('#l1').hide();
                    $('#l2').hide();
                },
                failure: function (response) {

                },
                complete: function (response) {

                    $('#l1').hide();
                    $('#l2').hide();

                }
            });

        }
    }


});
$(document).on('click', '.btn-source', function () {
    debugger;
    var sl = $('.lblmainstd').html();
    var val = $("input:radio[name='Source_info']:checked").val();
    if (val == undefined) {
        val = '';
    }
    else if (val == 'Other') {
        val = $.trim($('#txtSource').val());
    }
    if (sl == 0 || sl == undefined) { }
    else {
        if (val == '') {
            easyAlert('Please Select Source');
        }
        else {
            $('#l1').show();
            $('#l2').show();
            var master =
            {
                str1: sl,
                str2: val


            }
            $.ajax({
                url: "../WebSrv/srvAdmission.asmx/UpdateSourceConcent",
                data: '{obj:' + JSON.stringify(master) + '}',
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                success: function (response) {

                    if (response.d.length > 0) {
                        var aa = response.d[0].str1;
                        if (aa == 1) {
                            SourceNext();

                        }
                    }

                },
                error: function (response) {
                    $('#l1').hide();
                    $('#l2').hide();
                },
                failure: function (response) {

                },
                complete: function (response) {

                    $('#l1').hide();
                    $('#l2').hide();

                }
            });

        }
    }


});

$(document).on('click', '.btn-acceptpay', function () {
    var sl = $('.lblmainstd').html();
    if (sl == 0 || sl == undefined) { }
    else {
        AcceptPay();
    }
});

function AcceptPay() {
    var year = $(".cmb-year option:selected").val();
    var yeardisp = $(".cmb-year option:selected").text();
    var cl = $('.cmb-cls option:selected').val().split('_')[0];
    var str = $('.cmb-cls option:selected').val().split('_')[1];
    var sl = $('.lblmainstd').html();
    var tp = $('#cmbTransMode option:selected').val();
    var master =
    {
        str1: year,
        str2: yeardisp,
        str3: cl,
        str4: str,
        str5: sl,
        str6: tp

    }
    $.ajax({
        url: "../WebSrv/srvAdmission.asmx/AcceptClick",
        data: '{obj:' + JSON.stringify(master) + '}',
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (response) {

            if (response.d.length > 0) {
                window.location = response.d[0].str1;



            }

        },
        error: function (response) {

        },
        failure: function (response) {

        },
        complete: function (response) {



        }
    });

}

//#region Prefill Search
$(document).on('click', '.search-prefill', function () {

    $('#ModelSearchPhone').modal("show");
});

$(document).on('click', '.tra-click', function () {
    var sl = $(this).attr("id").split('_')[1];
    var datacls = $(this).attr("data-id");

    $('.cmb-cls').val(datacls).trigger('change');
    $("#ModelSearchPhone").modal("hide");
    $('.lblmainstd').html(sl)
    $('.lbltype').html(datacls.split('_')[2]);
    $('.lblses').html(datacls.split('_')[3]);
    LoadBasicPart(datacls, sl);
    LoadSibling(sl);

});
function LoadBasicPart(datacls, sl) {
    var master =
    {
        str1: datacls.split('_')[3],
        str2: sl



    }
    $.ajax({
        url: "../WebSrv/srvAdmission.asmx/GetPreSavedDetails",
        data: '{obj:' + JSON.stringify(master) + '}',
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (response) {

            if (response.d.length > 0) {
                // $('.div-table').html(response.d[0].str1);

                $('#txtPEN').val(response.d[0]._PEN);
                $('.txtfirstName').val(response.d[0]._fn);
                $('.txtMiddleName').val(response.d[0]._mn);
                $('.txtlastName').val(response.d[0]._sn);

                var db = response.d[0]._db

                $('#txtdd').val(db.split('_')[0])
                $('#txtmm').val(db.split('_')[1])
                $('#txtyyyy').val(db.split('_')[2])
                $('.txtAge').val(response.d[0]._age)
                $('.cmbgender').val(response.d[0]._sx).trigger("change");

                $('.cmbnationality').val(response.d[0]._nation).trigger("change");
                $('.cmbCommunity').val(response.d[0]._comm).trigger("change");
                $('.cmbCaste').val(response.d[0]._cst).trigger("change");
                $('.cmbBloodgroup').val(response.d[0]._b_g).trigger("change");
                $('.cmbMotherToungue').val(response.d[0]._m_t).trigger("change");

                $('.txtIdentification').val(response.d[0]._ident)
                $('.txtAadhar').val(response.d[0]._Aadhar)

                $('.cmbDietary').val(response.d[0]._Diet).trigger("change");

                var _disse = response.d[0]._disse
                if (_disse == "No") {
                    $('input[name="Rb_Disease"][value="No"]').prop('checked', 'checked');

                }
                else {
                    $('input[name="Rb_Disease"][value="Yes"]').prop('checked', 'checked');

                }

                $('.txtDisease').val(response.d[0]._disse)

                $('input[name="Rb_Medicine"][value="' + response.d[0]._medic + '"]').prop('checked', 'checked');

                $('.cmbSingleGirlChild').val(response.d[0]._SGirlChild).trigger("change");
                $('.cmbDivyanngjan').val(response.d[0]._Divyang).trigger("change");
                $('.cmbEWS').val(response.d[0]._EVS).trigger("change");
                $('.cmbEWSCategory').val(response.d[0]._evscat).trigger("change");

                $('#txtLastSchool').val(response.d[0]._LastSchoolName);

                $('#cmbLastSchool').val(response.d[0]._LastSchoolName);

                $("#txtLastSchoolAddress").val(response.d[0]._LastSchoolAddress);


                $("#txtResidential").val(response.d[0]._residential_add);
                $("#txtCity").val(response.d[0]._city);
                $('#cmbState').val(response.d[0]._state);
                $('#txtPin').val(response.d[0]._pin);
                $('#txtemail1').val(response.d[0]._email);
                $('#txtemail2').val(response.d[0]._secondaryemail);

                $('#txtPrimaryPhone').val(response.d[0]._primarymobile);
                $('#txtSecondaryPhone').val(response.d[0]._secondarymobile);
                $('#txtWhatsappNo').val(response.d[0]._whatsappNO);
                $('#cmbDistance').val(response.d[0]._homelocation).trigger("change");
                $('#txtHeight').val(response.d[0]._Hight);
                $('#txtWeight').val(response.d[0]._Weight)

                var _part = response.d[0]._Participation
                debugger;
                if (_part == "No" || _part == "") {
                    $('input[name="Rb_compet"][value="No"]').prop('checked', 'checked');
                    _part = "No"
                }
                else {
                    $('input[name="Rb_compet"][value="Yes"]').prop('checked', 'checked');
                    $('#txtcompet').prop("disabled", false).prop("readonly", false);
                }
                $('#txtcompet').val(_part);
                $('#cmbBoardName').val(response.d[0]._LastSchoolAfilliation).trigger("change");

                $('input[name="Rb_Ward"][value="' + response.d[0]._Teacher_Ward + '"]').prop('checked', 'checked');



                //#region Parents Details

                //#region Father
                $('#txtFatherName').val(response.d[0]._father);
                $('#cmbfatherQualification').val(response.d[0]._fedu).trigger("change");
                $('#txtFatherPhone').val(response.d[0]._fphone);
                $('#txtFatherEmail').val(response.d[0]._fatheremail);

                var _femplyment = response.d[0]._femplyment;
                if (_femplyment == "Self Employed" || _femplyment == "Government" || _femplyment == "Government Service" || _femplyment == "Private" || _femplyment == "Private Service" || _femplyment == "Retired") {
                    $('#txtFatherEmployement').val(_femplyment).trigger("change");

                }
                else {
                    $('#txtFatherEmployement').val("Other").trigger("change");
                    $('#txtFatherEmployement_other').val(_femplyment);
                }

                var _foccup = response.d[0]._foccup;
                const validOccupations = [
                    "Architect", "Army Personnel", "Banker", "Banking Services", "Business",
                    "Chartered Accountant", "Civil Services", "Defence Personnel", "Doctor",
                    "Engineer", "Entrepreneur", "IT Professional", "Journalist", "Lawyer",
                    "Nurse", "Sales Professional", "Social Worker", "Teacher"
                ];

                if (validOccupations.includes(_foccup)) {
                    $('#txtFatherProfession').val(_foccup).trigger("change");
                }
                else {
                    $('#txtFatherProfession').val("Other").trigger("change");
                    $('#txtFatherProfession_other').val(_foccup);
                }

                $('#txtFatherOfficeAddress').val(response.d[0]._foffice);
                $('#txtFatherIncome').val(response.d[0]._fincome).trigger("change");
                // #endregion
                //#region Mother

                $('#txtMotherName').val(response.d[0]._father);
                $('#cmbMotherQualification').val(response.d[0]._fedu).trigger("change");
                $('#txtMotherPhone').val(response.d[0]._fphone);
                $('#txtMotherEmail').val(response.d[0]._fatheremail);

                var _memplyment = response.d[0]._memplyment;
                if (_memplyment == "Self Employed" || _memplyment == "Government" || _memplyment == "Government Service" || _memplyment == "Private" || _memplyment == "Private Service" || _memplyment == "Retired" || _memplyment == "House Maker") {
                    $('#txtMotherEmployement').val(_memplyment).trigger("change");

                }
                else {
                    $('#txtMotherEmployement').val("Other").trigger("change");
                    $('#txtMotherEmployement_other').val(_memplyment);
                }

                var _moccup = response.d[0]._moccup;

                const validMotherOccupations = [
                    "Architect", "Army Personnel", "Banker", "Banking Services", "Business",
                    "Chartered Accountant", "Civil Services", "Defence Personnel", "Doctor",
                    "Engineer", "Entrepreneur", "IT Professional", "Journalist", "Lawyer",
                    "Nurse", "Sales Professional", "Social Worker", "Teacher", "House Maker"
                ];

                if (validMotherOccupations.includes(_moccup)) {
                    $('#txtMotherProfession').val(_moccup).trigger("change");
                }
                else {
                    $('#txtMotherProfession').val("Other").trigger("change");
                    $('#txtMotherProfession_other').val(_moccup);
                }

                $('#txtMotherOfficeAddress').val(response.d[0]._moffice);
                $('#txtMotherIncome').val(response.d[0]._mincome).trigger("change");
                //#endregion
                $('#txtFamilyAnnualIncome').val(response.d[0]._totalincome);
                //#endregion

                //#region Bus

                $('#cmbTransMode').val(response.d[0]._bus).trigger("change");
                if (response.d[0]._bus == 'ST') {
                    $('.divBusRoute').show();
                    TransportRoute(response.d[0]._busRoute);
                    //$('#cmbBusRoute').val(response.d[0]._busRoute).trigger("change");

                }
                else {
                    $('.divBusRoute').hide();
                    $('#cmbBusRoute').empty();
                }


                //#endregion

                var _cuet = response.d[0]._cuet;
                if (_cuet == "Yes") {
                    //inlineRadioOptions1_cuet
                    $('input[name="inlineRadioOptions1_cuet"][value="Yes"]').prop('checked', 'checked');

                }
                else {
                    $('input[name="inlineRadioOptions1_cuet"][value="No"]').prop('checked', 'checked');

                }
            }

        },
        error: function (response) {

        },
        failure: function (response) {

        },
        complete: function (response) {



        }
    });

}
function LoadSibling(sl) {

    var master =
    {
        str1: sl



    }
    $.ajax({
        url: "../WebSrv/srvAdmission.asmx/GetPreSavedSibling",
        data: '{obj:' + JSON.stringify(master) + '}',
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (response) {

            if (response.d.length > 0) {
                $('input[name="Rb_Sib"][value="Yes"]').prop('checked', 'checked').trigger("change");
                var aa = 0;
                for (var i = 0; i < response.d.length; i++) {
                    aa++;
                    var adm = response.d[i]._adm_no;
                    var name = response.d[i]._name;
                    var gender = response.d[i]._gender;
                    var cls = response.d[i]._cls;
                    var sec = response.d[i]._sec;

                    $('#rega_' + aa).val(adm);
                    $('#namea_' + aa).val(name);
                    $('#gendera_' + aa).val(adm);
                    $('#clsa_' + aa).val(cls).trigger("change");
                    $('#seca_' + aa).val(sec);
                }
            }
            else {
                $('input[name="Rb_Sib"][value="No"]').prop('checked', 'checked').trigger("change");



            }

        },
        error: function (response) {

        },
        failure: function (response) {

        },
        complete: function (response) {



        }
    });

}
function GetTempCCA() {
    var master =
    {
        str1: $('.lblmainstd').html()



    }
    $.ajax({
        url: "../WebSrv/srvAdmission.asmx/GetCCATemp",
        data: '{obj:' + JSON.stringify(master) + '}',
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (response) {

            if (response.d.length > 0) {

                for (var i = 0; i < response.d.length; i++) {
                    var adm = response.d[i].str1;
                    $("#chk_" + adm).prop("checked", true);
                }
            }


        },
        error: function (response) {

        },
        failure: function (response) {

        },
        complete: function (response) {



        }
    });



}
$(document).on('click', '.btn-tempData', function () {
    $('.div-table').html("");
    var phone = $.trim($('.txt-phone-s').val());
    if (phone == '') {
        easyAlert('Please Enter Phone No');
    }
    else {
        var year = $(".cmb-year option:selected").val();

        var master =
        {
            str1: year,
            str2: phone


        }
        $.ajax({
            url: "../WebSrv/srvAdmission.asmx/GetPreSavedForm",
            data: '{obj:' + JSON.stringify(master) + '}',
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (response) {

                if (response.d.length > 0) {
                    $('.div-table').html(response.d[0].str1);


                }

            },
            error: function (response) {

            },
            failure: function (response) {

            },
            complete: function (response) {



            }
        });

    }

});
//#endregion
const incomeOrder = [
    "LESS THAN 1 LAKH",
    "1–2.5 LAKHS",
    "2.5–5 LAKHS",
    "5–8 LAKHS",
    "8 LAKHS AND ABOVE"
];
function getAssumedIncome(fatherIncome, motherIncome) {
    const fIndex = incomeOrder.indexOf(fatherIncome);
    const mIndex = incomeOrder.indexOf(motherIncome);

    if (fIndex === -1 || mIndex === -1) return null;

    const maxIndex = Math.max(fIndex, mIndex);
    return incomeOrder[maxIndex];
}
$(document).on('change', '#txtFatherIncome, #txtMotherIncome', function () {

    const fatherIncome = $('#txtFatherIncome').val();
    const motherIncome = $('#txtMotherIncome').val();

    if (!fatherIncome || !motherIncome) {
        $('#txtFamilyAnnualIncome')
            .val('')
            .attr('placeholder', 'Select both incomes');
        return;
    }

    const assumedIncome = getAssumedIncome(fatherIncome, motherIncome);
    $('#txtFamilyAnnualIncome').val(assumedIncome || 'Invalid selection');
});
$(document).on('change', 'input[name="Source_info"]', function () {

    if ($(this).attr('id') === 'flexSwitchCheckChecked5') {
        $('.other-content').slideDown(); // Show the input field
    } else {
        $('.other-content').slideUp();   // Hide it if any other option is selected
        $('#txtSource').val('');         // Optional: clear the input
    }
});
$(document).on('change', '.Rb_health', function () {
    const selectedValue = $(this).val();
    const rbName = $(this).attr('name'); // e.g., Rb_health_2
    const idSuffix = rbName.split('_')[2]; // Extract "2" from "Rb_health_2"
    const txtBox = $('#txtHealthRecord_' + idSuffix);

    if (selectedValue === 'Yes') {
        txtBox.prop('readonly', false);
    } else if (selectedValue === 'No') {
        txtBox.prop('readonly', true).val('');
    }
});
$(document).on('change', '#cmbCommunity', function () {
    const selectedValue = $(this).val();

    if (selectedValue === 'Christian') {
        $.alert({
            title: 'Confirmation',
            content: 'Are you Roman Catholic?',
            icon: 'fa fa-question-circle',
            theme: 'bootstrap',
            type: 'blue',
            animation: 'zoom',
            closeAnimation: 'zoom',
            buttons: {
                yes: {
                    text: 'Yes',
                    btnClass: 'btn-blue',
                    action: function () {
                        // Append Roman Catholic if not already present
                        if ($('#cmbCommunity option[value="Roman Catholic"]').length === 0) {
                            $('#cmbCommunity').append(
                                $('<option>', {
                                    value: 'Roman Catholic',
                                    text: 'Roman Catholic',
                                    selected: true,
                                    hidden: true
                                })
                            ).trigger('change');
                        } else {
                            $('#cmbCommunity').val('Roman Catholic').trigger('change');
                        }
                    }
                },
                no: {
                    text: 'No',
                    btnClass: 'btn-default',
                    action: function () {
                        // Keep Christian selected
                    }
                }
            }
        });
    } else if (selectedValue != 'Roman Catholic') {
        // If Roman Catholic exists, offer to remove it
        if ($('#cmbCommunity option[value="Roman Catholic"]').length > 0) {
            $('#cmbCommunity option[value="Roman Catholic"]').remove();
        }
    }
});


$(document).on('click', '.btn-health-record', function () {

    let isValid = true;
    let missingRadio = [];
    let missingDetails = [];
    let records = [];

    $('.tr-health').each(function () {
        const row = $(this);
        const sl = row.find('td:first').text().trim();
        const healthId = row.attr('id').split('_')[2];
        const selected = $("input[name='Rb_health_" + healthId + "']:checked").val();
        const details = $('#txtHealthRecord_' + healthId).val().trim();

        if (!selected) {
            missingRadio.push(sl);
            isValid = false;
        } else if (selected === 'Yes' && details === '') {
            missingDetails.push(sl);
            isValid = false;
        }
        records.push({
            HealthRecordId: parseInt(healthId),
            Form_id: '',
            Health: selected,
            HealthDetails: selected === 'Yes' ? details : '',
            status: 1
        });


    });

    if (!isValid) {
        let msg = '';
        if (missingRadio.length > 0) {
            msg += 'Please select Yes/No for Symptoms';
        }
        if (missingDetails.length > 0) {
            msg += '\nPlease enter details for  Symptoms where Yes is selected.';
        }

        $.alert({
            title: 'Validation Alert',
            content: msg,
            icon: 'fa fa-exclamation-triangle',
            theme: 'bootstrap',
            type: 'red',
            animation: 'zoom',
            closeAnimation: 'zoom',
            buttons: {
                okay: {
                    text: 'OK',
                    btnClass: 'btn-red'
                }
            }
        });

        return false; // Prevent submission
    }
    const sl = parseInt($('#lblmainstd').html());
    const Dise = $.trim($('.txtDisease').val());
    const med = $("input:radio[name='Rb_Medicine']:checked").val();

    $.ajax({
        type: "POST",
        url: "../WebSrv/srvAdmission.asmx/SaveHealthRecords",
        data: JSON.stringify({ sl: sl, Dise: Dise, med: med, records: records }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            //$('#v-pills-health-info-tab').addClass('done');



            $('#btnParents').prop('disabled', false);
            $('#btnParents').attr('data-nexttab', "v-pills-Co-Curricular-tab");


            $('#v-pills-health-info-tab').removeClass('active');
            $('#v-pills-health-info-tab').removeClass('show');
            $('#v-pills-health-info-tab').addClass('done');
            $('.admission-panel').removeClass('active');

            $('#v-pills-parent').addClass('active');
            $('#v-pills-parent').addClass('show');
            $('#v-pills-parent-tab').addClass('done');

        },
        error: function (err) {

        }
    });



});



