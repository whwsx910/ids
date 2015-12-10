/**
 * Created by chen3 on 10/16/15.
 */

var tblNumbers;
var payHandler;
var subscribePlan;
var panelNewNumber;
var panelNumberList;
var processNumberId;
var subscribeurl;
var resumeurl;
var nsflag;

$(function(){

    $('#menu_number').addClass('active');

    panelNumberList = $('#panelNumberTable');
    subscribeurl = '/admin/number/purchase';
    resumeurl = '/admin/number/resume';
    nsflag = true;

    initTables();
    initEvents();
    initComponents();

});


function initTables(){

    tblNumbers = $('#tblNumbers').DataTable({
        ajax:{
            'url': '/admin/ajax/number/myall',
            'type': 'POST'
        },
        autoWidth: false,
        columnDefs:[
            { "orderable": false, "targets": 4 },
            {
                targets: 0,
                width: '300px',
                render: function(data, type, full, meta){
                    expStr = null;
                    if(data != '-' ){
                        expStr = full[13];
                    }
                    cellString ='<div class="text-semibold"><a href="/admin/number/details/' + full[6] + '">' + (data=='-'?'Pending Purchase':data ) + '</a></div>';
                    cellString += '<div class="text-muted">' + (expStr==null?"":"Expire Date: "+ expStr) + '</div>';

                    return cellString;
                }
            },
            {
                targets: 1,
                width: '100px'
            },
            {
                targets: 2,
                width: '100px'
            },
            {
                width: '120px',
                searchable: false,
                targets: 3,
                'render': function(data, type, full, meta){
                    // Split data
                    capacities = data.split( '' );

                    cellStr = '';
                    if(capacities[0] == 1){
                        cellStr += '<i class="icon-phone2 text-info"> </i>';
                    }else{
                        cellStr += '<i class="icon-phone2 text-muted"> </i>';
                    }

                    cellStr += ' ';

                    if(capacities[1] == 1){
                        cellStr += '<i class="icon-bubble text-info"> </i>';
                    }else{
                        cellStr += '<i class="icon-bubble text-muted"> </i>';
                    }

                    cellStr += ' ';
                    if(capacities[2] == 1){
                        cellStr += '<i class="icon-image2 text-info"> </i>';
                    }else{
                        cellStr += '<i class="icon-image2 text-muted"> </i>';
                    }

                    return cellStr;
                }
            },
            {
                targets: 4,
                width: '250px',
                render: function(data, type, full, meta){

                    assignedBG = full[10]==null?(full[11]==null?null:full[11]):full[10];
                    assignedBGid = assignedBG==null?null:assignedBG.id;

                    assignedBusiness = null;
                    assignedGroup = null;

                    business = data.businesses;
                    groups = data.groups;

                    bizStr = '';
                    grpStr = '';

                    if(business != null ) {
                        for (i = 0; i < business.length; i++) {
                            if(assignedBGid == business[i].id){
                                assignedBusiness = business[i];
                            }
                            bizStr += '<option value="' + business[i].id + '" class="_assignbusiness" data-icon="briefcase3" ' + (assignedBGid == business[i].id ? 'selected' : '') + '>' + business[i].name + '</option>';
                        }
                    }

                    if(groups != null ) {
                        for (i = 0; i < groups.length; i++) {
                            if(assignedBGid == groups[i].id){
                                assignedGroup = groups[i];
                            }
                            grpStr += '<option value="' + groups[i].id + '" class="_assigngroup" data-icon="theater"' + (assignedBGid == groups[i].id ? 'selected' : '') + '>' + groups[i].name + '</option>';
                        }
                    }

                    cellStr = '<select data-pid="' + full[6] + '" name="assignbg" class="_assignbg select-icons" data-placeholder="Not Assigned" ' + (full[0]=="-"?"disabled":(full[7]?"":"disabled")) + ' ><option/>';

                    cellStr += '<optgroup label="My Businesses">';
                    cellStr += bizStr;
                    cellStr += '</optgroup>';

                    cellStr += '<optgroup label="My Groups">';
                    cellStr += grpStr;
                    cellStr += '</optgroup>';

                    cellStr += '</select>';

                    return cellStr;
                }
            },
            {
                targets: 5,
                width: '150px',
                render: function(data, type, full, meta){
                    return 'USD $'+data;
                }
            },
            {
                orderable: false,
                width: '50px',
                targets: 6,
                'render': function( data, type, full, meta){

                    cellStr = '<ul class="icons-list" ><li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-menu9 text-info"></i></a>';
                    cellStr += '<ul class="dropdown-menu dropdown-menu-right bizactions" data-nid="'+ full[6] + '", data-number="' + full[0] + '">';

                    if(!full[7]){
                        cellStr += '<li><a href="#" class="_subscribe"> <i class="icon-clipboard2"></i> Purchase Number Order</a></li>';
                    }else{
                        if(! (full[8] || full[9])) {
                            cellStr += '<li><a href="#" class="_unsubscribe"> <i class="icon-clipboard2"></i> Un-subscribe Number Order</a></li>';
                        }
                    }

                    // Resume if grace period
                    if(full[7] && full[9]){
                        cellStr += '<li><a href="#" class="_resumesubscribe"> <i class="icon-checkmark4"></i> Resume Number Order</a></li>';
                    }
                    // Edit/Delete option always available
                    cellStr += '<li><a href="#" class="_del"> <i class="text-warning icon-trash"></i> Delete Phone Number</a></li>';
                    cellStr += '</ul></li></ul>';

                    return cellStr;

                    //if(full[5] === 'available' || full[5] === 'subscribed')
                    //    return '<ul class="table-options" data-bid="'+ full[6] + '", data-bizname="' + full[1] + '"><li><a href="#" class="_edit"><span class="text-warning"><i class="fa fa-pencil"></i></span></a></li> <li><a href="#" class="_del"><span class="text-danger"><i class="fa fa-trash"></i></span></a></li> </ul>';
                    //else
                    //    return '<ul class="table-options" data-bid="' + full[6] + '", data-bizname="' + full[1] + '"><li><a href="#" class="_pay"><span class="text-primary"><i class="fa fa-credit-card"></i></span></a></li><li><a href="#" class="_edit"><span class="text-warning"><i class="fa fa-pencil"></i></span></a></li><li><a href="#" class="_del"><span class="text-danger"><i class="fa fa-trash"></i></span></a></li> </ul>';
                }
            }
        ],

        dom: '<"datatable-header"fl><"datatable-scroll-lg"t><"datatable-footer"ip>',
        language: {
            search: '<span>Filter:</span> _INPUT_',
            lengthMenu: '<span>Show:</span> _MENU_',
            paginate: { 'first': 'First', 'last': 'Last', 'next': '&rarr;', 'previous': '&larr;' }
        },
        lengthMenu: [ 15, 25, 50, 75, 100 ],
        displayLength: 15,

        drawCallback: function (settings) {
            var api = this.api();
            var rows = api.rows({page:'current'}).nodes();
            var last=null;


            $('#numcount').html(api.column(0).data().length);

            // Grouod rows
            api.column(1, {page:'current'}).data().each(function (group, i) {
                if (last !== group) {
                    $(rows).eq(i).before(
                        '<tr class="active"><td colspan="8" class="text-semibold">'+group+'</td></tr>'
                    );

                    last = group;
                }
            });

            /**
             * Switch assigner
             */
            $('._assignbg').change(function(){

                var id = $(this).find('option:selected').val();
                var pid = this.closest('select').getAttribute('data-pid');
                var assignGroup = $(this).find('option:selected').hasClass('_assigngroup');
                var assignBusiness = $(this).find('option:selected').hasClass('_assignbusiness');

                if(assignGroup){

                    swal({
                            title: "Assign number ?",
                            text: "The number will be assigned to selected group !",
                            type: "info",
                            showCancelButton: true,
                            confirmButtonColor: "#EF5350",
                            confirmButtonText: "Yes, Assign!",
                            cancelButtonText: "No, cancel pls!",
                            closeOnConfirm: true,
                            closeOnCancel: true
                        },
                        function(isConfirm) {
                            tblNumbers.ajax.reload();
                            if (isConfirm) {
                                $.ajax({
                                    url: '/admin/number/assigntogroup',
                                    type: 'POST',
                                    data: {'pid': pid, 'gid': id, '_token': csrf},
                                    success: function (data) {
                                        if (data.success) {
                                            tblNumbers.ajax.reload();
                                            swal({
                                                title: "Assigned!",
                                                text: "Phone number has been assigned !",
                                                confirmButtonColor: "#66BB6A",
                                                type: "success"
                                            });
                                        } else {
                                            if(data.used){
                                                swal({
                                                    title: "Number already been assigned",
                                                    text: "Number has been assigned to " + data.usedby + ", do you want to reassign this number ?",
                                                    type: "warning",
                                                    showCancelButton: true,
                                                    confirmButtonColor: "#EF5350",
                                                    confirmButtonText: "Yes, Re-Assign!",
                                                    cancelButtonText: "No, cancel pls!",
                                                    closeOnConfirm: true,
                                                    closeOnCancel: true
                                                },function(isConfirm){
                                                    if(isConfirm){
                                                        $.ajax({
                                                            url: '/admin/number/assigntogroup',
                                                            type: 'POST',
                                                            data: {'pid': pid, 'gid': id, 'switch':true, '_token': csrf},
                                                            success: function (data) {
                                                                if (data.success) {
                                                                    tblNumbers.ajax.reload();
                                                                    swal({
                                                                        title: "Assigned!",
                                                                        text: "Phone number  has been assigned !",
                                                                        confirmButtonColor: "#66BB6A",
                                                                        type: "success"
                                                                    });
                                                                }else{
                                                                }
                                                            }
                                                        });
                                                    }else{

                                                    }
                                                });
                                            }

                                            if(data.hasnumber){
                                                swal({
                                                    title: "Group already has number assigned to",
                                                    text: "Group already has number " + data.hasnumber + ", do you want to replace ?",
                                                    type: "warning",
                                                    showCancelButton: true,
                                                    confirmButtonColor: "#EF5350",
                                                    confirmButtonText: "Yes, Replace!",
                                                    cancelButtonText: "No, cancel pls!",
                                                    closeOnConfirm: true,
                                                    closeOnCancel: true
                                                },function(isConfirm){
                                                    if(isConfirm){
                                                        $.ajax({
                                                            url: '/admin/number/assigntogroup',
                                                            type: 'POST',
                                                            data: {'pid': pid, 'gid': id, 'switch':true, '_token': csrf},
                                                            success: function (data) {
                                                                if (data.success) {
                                                                    tblNumbers.ajax.reload();
                                                                    swal({
                                                                        title: "Assigned!",
                                                                        text: "Phone number  has been assigned !",
                                                                        confirmButtonColor: "#66BB6A",
                                                                        type: "success"
                                                                    });
                                                                }else{
                                                                }
                                                            }
                                                        });
                                                    }else{

                                                    }
                                                });
                                            }
                                        }
                                    }
                                });
                            } else {

                            }
                        });

                }else if(assignBusiness){

                    swal({
                            title: "Assign number ?",
                            text: "The number will be assigned to selected business !",
                            type: "info",
                            showCancelButton: true,
                            confirmButtonColor: "#EF5350",
                            confirmButtonText: "Yes, Assign!",
                            cancelButtonText: "No, cancel pls!",
                            closeOnConfirm: true,
                            closeOnCancel: true
                        },
                        function(isConfirm) {
                            tblNumbers.ajax.reload();
                            if (isConfirm) {
                                $.ajax({
                                    url: '/admin/number/assigntobusiness',
                                    type: 'POST',
                                    data: {'pid': pid, 'bid': id, '_token': csrf},
                                    success: function (data) {
                                        if (data.success) {
                                            tblNumbers.ajax.reload();
                                            swal({
                                                title: "Assigned!",
                                                text: "Phone number has been assigned !",
                                                confirmButtonColor: "#66BB6A",
                                                type: "success"
                                            });
                                        } else {
                                            if(data.used){
                                                swal({
                                                    title: "Number already been assigned",
                                                    text: "Number has been assigned to " + data.usedby + ", do you want to reassign this number ?",
                                                    type: "warning",
                                                    showCancelButton: true,
                                                    confirmButtonColor: "#EF5350",
                                                    confirmButtonText: "Yes, Re-Assign!",
                                                    cancelButtonText: "No, cancel pls!",
                                                    closeOnConfirm: true,
                                                    closeOnCancel: true
                                                },function(isConfirm){
                                                    if(isConfirm){
                                                        $.ajax({
                                                            url: '/admin/number/assigntobusiness',
                                                            type: 'POST',
                                                            data: {'pid': pid, 'bid': id, 'switch':true, '_token': csrf},
                                                            success: function (data) {
                                                                if (data.success) {
                                                                    tblNumbers.ajax.reload();
                                                                    swal({
                                                                        title: "Assigned!",
                                                                        text: "Phone number has been assigned !",
                                                                        confirmButtonColor: "#66BB6A",
                                                                        type: "success"
                                                                    });
                                                                }else{
                                                                }
                                                            }
                                                        });
                                                    }else{

                                                    }
                                                });
                                            }

                                            if(data.hasnumber){
                                                swal({
                                                    title: "Business already has number assigned to",
                                                    text: "Business already has number " + data.hasnumber + ", do you want to replace ?",
                                                    type: "warning",
                                                    showCancelButton: true,
                                                    confirmButtonColor: "#EF5350",
                                                    confirmButtonText: "Yes, Replace!",
                                                    cancelButtonText: "No, cancel pls!",
                                                    closeOnConfirm: true,
                                                    closeOnCancel: true
                                                },function(isConfirm){
                                                    if(isConfirm){
                                                        $.ajax({
                                                            url: '/admin/number/assigntobusiness',
                                                            type: 'POST',
                                                            data: {'pid': pid, 'bid': id, 'switch':true, '_token': csrf},
                                                            success: function (data) {
                                                                if (data.success) {
                                                                    tblNumbers.ajax.reload();
                                                                    swal({
                                                                        title: "Assigned!",
                                                                        text: "Phone number has been assigned !",
                                                                        confirmButtonColor: "#66BB6A",
                                                                        type: "success"
                                                                    });
                                                                }else{
                                                                }
                                                            }
                                                        });
                                                    }else{

                                                    }
                                                });
                                            }
                                        }
                                    }
                                });
                            } else {

                            }
                        });
                }

                //
            });

            /**
             * Subscribe to number
             */
            $('._subscribe').on('click', function(event){
                processNumberId = this.closest('ul').getAttribute('data-nid');
                subscribePlan='usa_number_monthly';

                subscribe(true);

            });

            $('._unsubscribe').on('click', function(event){
                processNumberId = this.closest('ul').getAttribute('data-nid');
                number = this.closest('ul').getAttribute('data-number');

                swal({
                        title: "Un-subscribe number: " + number + " ?",
                        text: "The number will be deleted after current subscribe period over !",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#EF5350",
                        confirmButtonText: "Yes, Un-subscribe!",
                        cancelButtonText: "No, cancel pls!",
                        closeOnConfirm: true,
                        closeOnCancel: true
                    },
                    function(isConfirm){
                        if (isConfirm) {
                            // Switch over to private.
                            var container = $('#panelNumberTable');
                            $(container).block({
                                message: '<i class="icon-spinner4 spinner"></i> Deleting phone number ......',
                                overlayCSS: {
                                    backgroundColor: '#1B2024',
                                    opacity: 0.85,
                                    cursor: 'wait'
                                },
                                css: {
                                    border: 0,
                                    padding: 0,
                                    backgroundColor: 'none',
                                    color: '#fff'
                                }
                            });

                            // UnSubscribe.
                            var container = $('#panelNumberTable');
                            $(container).block({
                                message: '<i class="icon-spinner4 spinner"></i> Un-subscribe phone number ......',
                                overlayCSS: {
                                    backgroundColor: '#1B2024',
                                    opacity: 0.85,
                                    cursor: 'wait'
                                },
                                css: {
                                    border: 0,
                                    padding: 0,
                                    backgroundColor: 'none',
                                    color: '#fff'
                                }
                            });

                            // Ajax call
                            $.ajax({
                                url: '/admin/number/unsubscribe',
                                type: 'POST',
                                data: {'nid': processNumberId, '_token': csrf},
                                success: function (data) {
                                    container.unblock();
                                    tblNumbers.ajax.reload();
                                    if (data.success) {
                                        swal({
                                            title: "Phone subscription canceled!",
                                            text: "Phone number: " + number + "'s subscription has been canceled.",
                                            confirmButtonColor: "#66BB6A",
                                            type: "success"
                                        });
                                    } else {
                                        swal({
                                            title: "Error!",
                                            text: "Opps! " + data.errmsg,
                                            confirmButtonColor: "#66BB6A",
                                            type: "success"
                                        });
                                    }
                                }
                            });
                        }
                        else{
                            // Do nothing
                        }
                    });
            });

            $('._resumesubscribe').on('click', function(event){
                var nid = this.closest('ul').getAttribute('data-nid');
                var number = this.closest('ul').getAttribute('data-number');

                swal({
                        title: "Resume subscription ?",
                        text: "Resume subscription will keep number: " + number + " active !",
                        type: "info",
                        showCancelButton: true,
                        confirmButtonColor: "#EF5350",
                        confirmButtonText: "Yes, Resume!",
                        cancelButtonText: "No, cancel pls!",
                        closeOnConfirm: true,
                        closeOnCancel: true
                    },
                    function(isConfirm) {
                        if(isConfirm){
                            processNumberId = nid;
                            subscribe(false);
                        }else{

                        }
                    }
                );

            });

            $('._del').on('click', function(event){
                var nid = this.closest('ul').getAttribute('data-nid');
                var number = this.closest('ul').getAttribute('data-number');
                // Remove phone number from database, and unsubscribe it.
                swal({
                        title: "Remove number: " + number + " ?",
                        text: "The Business or Group this number linked to may not able to send message out !",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#EF5350",
                        confirmButtonText: "Yes, Remove!",
                        cancelButtonText: "No, cancel pls!",
                        closeOnConfirm: true,
                        closeOnCancel: true
                    },
                    function(isConfirm){
                        if (isConfirm) {
                            // Switch over to private.
                            var container = $('#panelNumberTable');
                            $(container).block({
                                message: '<i class="icon-spinner4 spinner"></i> Deleting phone number ......',
                                overlayCSS: {
                                    backgroundColor: '#1B2024',
                                    opacity: 0.85,
                                    cursor: 'wait'
                                },
                                css: {
                                    border: 0,
                                    padding: 0,
                                    backgroundColor: 'none',
                                    color: '#fff'
                                }
                            });

                            // Ajax
                            $.ajax({
                                url:'/admin/number/delete',
                                type: 'POST',
                                data: {'nid':nid, '_token':csrf},
                                success: function(data){
                                    $(container).unblock();
                                    if(data.success){
                                        tblNumbers.ajax.reload();

                                        swal({
                                            title: "Phone number removed!",
                                            text: "Phone number: " + number +" has been unsubscribed and removed.",
                                            confirmButtonColor: "#66BB6A",
                                            type: "success"
                                        });
                                    }else{

                                    }
                                }
                            })
                        }
                        else {
                            // Do nothing
                        }
                    });
            });

            // Reverse last 3 dropdowns orientation
            $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');

            $('._assignbg').select2({
                placeholder: 'Not Assigned',
                formatResult: iconFormat,
                minimumResultsForSearch: "-1",
                width: '100%',
                formatSelection: iconFormat,
                escapeMarkup: function(m) { return m; }
            });
        },
        preDrawCallback: function(settings) {

            // Reverse last 3 dropdowns orientation
            $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');

            // Destroy Select2
            $('.select').select2('destroy');
        }
    });


    // Add placeholder to the datatable filter option
    $('.dataTables_filter input[type=search]').attr('placeholder','Type to filter...');


    // Enable Select2 select for the length option
    $('.dataTables_length select').select2({
        minimumResultsForSearch: "-1"
    });
}


function initEvents(){

    $('#aNewNumber').on('click', function(event){
        cleanFormNewNumberError();
        $('#modal_new_number').modal({
            backdrop: 'static',
            keyboard: false
        });

    });

    $('#modal_new_number #formNewNumber').submit(function(event){
        cleanFormNewNumberError();
        // Start processing
        $(panelNumberList).block({
            message: '<i class="icon-spinner4 spinner"></i> Creating Number Purchase Order ......',
            overlayCSS: {
                backgroundColor: '#1B2024',
                opacity: 0.85,
                cursor: 'wait'
            },
            css: {
                border: 0,
                padding: 0,
                backgroundColor: 'none',
                color: '#fff'
            }
        });

        postData = $(this).serializeArray();

        $.ajax({
            url: '/admin/number/create',
            type: 'POST',
            data: postData,
            success: function(data){
                $(panelNumberList).unblock();
                if(data.success){
                    subscribePlan = data.plan;
                    processNumberId = data.nid;
                    $('#modal_new_number').modal('toggle');

                    // Refresh
                    tblNumbers.ajax.reload();

                    // Payment option
                    swal({
                            title: "Buy Phone Number?",
                            text: "Number will be assigned only after you paid for your selection!",
                            type: "info",
                            showCancelButton: true,
                            confirmButtonColor: "#2196F3",
                            confirmButtonText: "Yes, buy now!",
                            cancelButtonText: "I'll buy later!",
                            closeOnConfirm: true,
                            closeOnCancel: false
                        },
                        function(isConfirm) {
                            if (isConfirm) {
                                subscribe(true);
                            }else{
                                swal({
                                    title: "Succeeded",
                                    text: "Your phone number purchase order created successfully",
                                    confirmButtonColor: "#2196F3",
                                    type: "success"
                                });
                            }
                        });

                }else{
                    if(data.errmsgs){
                        if(data.errmsgs.selCountry){
                            $('#selGroup').addClass('has-error');
                            $('#err-selCountry').show();
                        }
                        if(data.errmsgs.agreeterms){
                            $('#terms-error').show();
                        }
                    }
                }
            }
        });

        event.preventDefault();
    });
}

function initComponents(){

    panelNewNumber = $('#modal_new_number .modal-content');

    // Select2
    $('#selCountry').select2({
        placeholder: 'Select country'
    });

    $(".styled, .multiselect-container input").uniform({
        radioClass: 'choice'
    });
}

/**
 * Subscribe (business), $5.99 for each business.
 */
function subscribe(subscribeflag){
    nsFlag = subscribeflag;
    handlerUrl = nsFlag?subscribeurl:resumeurl;

    payHandler = StripeCheckout.configure({
        key: stripeKey,
        image: '/admin/images/stripe_logo.png',
        locale: 'auto',
        name: 'Reminder Hub',
        panelLabel: 'Subscribe',
        allowRememberMe: false,
        closed: function(event){

        },
        token: function(token) {

            // Loading modal_progress
            $(panelNumberList).block({
                message: '<i class="icon-spinner4 spinner"></i> Processing Payment ... Please wait !',
                overlayCSS: {
                    backgroundColor: '#1B2024',
                    opacity: 0.85,
                    cursor: 'wait'
                },
                css: {
                    border: 0,
                    padding: 0,
                    backgroundColor: 'none',
                    color: '#fff'
                }
            });
            // Use the token to create the charge with a server-side script.
            // You can access the token ID with `token.id`
            // Get back to server side for process.
            $.ajax({
                type: "POST",
                url: handlerUrl,
                data: {'email':token.email, 'nid':processNumberId, 'plan':subscribePlan, 'token':token.id, '_token':csrf},
                success: function(data) {
                    $(panelNumberList).unblock();
                    tblNumbers.ajax.reload();
                    if(data.success){

                        // Success
                        swal({
                            title: "Succeeded",
                            text: nsFlag?"Your successfully purchased a number, number will be assigned ASAP !":"Your number subscription been successfully resumed, you can continue use it !",
                            confirmButtonColor: "#2196F3",
                            type: "success"
                        });
                    }else{
                        // Failed
                        // Success
                        swal({
                            title: "Error",
                            text: "Oops! Error during purchase, please try again later !",
                            confirmButtonColor: "#2196F3",
                            type: "error"
                        });
                    }
                }
            });
        }
    });

    payHandler.open({
        name: 'Monthly Subscription',
        description: 'USA Local Phone Number',
        amount: 599
    });
}


function cleanFormNewNumberError(){
    $('#selGroup').removeClass('has-error');
    $('#err-selCountry').hide();
    $('#terms-error').hide();
}

// Format icon
function iconFormat(state) {
    var originalOption = state.element;
    return "<i class='icon-" + $(originalOption).data('icon') + "'></i>" + state.text;
}