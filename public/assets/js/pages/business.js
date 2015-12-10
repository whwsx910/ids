/**
 * Created by chen3 on 10/13/15.
 */

var tblBusiness;
var currentBid;
var currentBizName;
var payHandler;
// Loader
var panelNewBiz;
var panelBizList;
var panelNewAds;


$(function(){

    $('#menu_business').addClass('active');
    panelNewBiz = $('#modal_new_business .modal-content');
    panelNewAds = $('#modal_new_ads .modal-content');
    panelBizList = $('#panelBizTable');

    initComponents();
    initEvents();
    initTables();
    initScheduleAction();
    initAttachmentAction();
});

function initComponents(){

    // Select2 Box
    $('.select-search').select2({
    });

    /**
     * Ads form business select dropdown box.
     */
        //$('#selBiz').select2(
        //    {
        //        placeholder: 'Select business for sending Advertisement',
        //        ajax:{
        //            url: '/admin/ajax/data/business',
        //            method: 'POST',
        //            dataType: 'json',
        //            delay: 10,
        //            data: function (params) {
        //                return {
        //                    q: params.term, // search term
        //                    page: params.page
        //                };
        //            },
        //            processResults: function(data, page){
        //                return {
        //                    results: data.results
        //                }
        //            },
        //            cache: false
        //        },
        //        escapeMarkup: function(markup) {return markup; },
        //        minimumInputLength: 1,
        //        templateResult: formatBiz,
        //        templateSelection: formatBizSelection
        //    }
        //);

    $('#adsPay').select2({
        placeholder: 'Select pay value to explore to more customers'
    });

    $('#selBiz').select2({
        placeholder: 'Select business send Advertisement from',
        ajax: {
            url: '/admin/ajax/data/businesses/myallsubscribed',
            type: 'POST',
            processResults: function (data) {
                return {
                    results: $.map(data, function (item) {
                        return {
                            text: item.name,
                            id: item.id
                        }
                    })
                };
            }
        }
    });

    $('#category').select2({
        placeholder: 'Select category',
        ajax: {
            url: '/admin/ajax/category/all',
            type: 'POST',
            processResults: function (data) {
                return {
                    results: $.map(data, function (item) {
                        return {
                            text: item.name,
                            id: item.id
                        }
                    })
                };
            }
        }
    });

    $(".styled, .multiselect-container input").uniform({
        radioClass: 'choice'
    });


    payHandler = StripeCheckout.configure({
        key: stripeKey,
        image: '/admin/images/stripe_logo.png',
        locale: 'auto',
        name: 'Reminder Hub',
        panelLabel: 'Business Subscribe',
        allowRememberMe: false,
        closed: function(event){

        },
        token: function(token) {

            // Loading modal_progress
            $(panelBizList).block({
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
                url: "/admin/ajaxaction/pay/subscribe",
                data: {'email':token.email, 'bid':currentBid, 'token':token.id, '_token':csrf},
                success: function(data) {
                    if(data.success){
                        $(panelBizList).unblock();
                        // Success
                        reloadBusinessTable();
                        swal({
                            title: "Succeeded",
                            text: "Your business created and subscribed successfully",
                            confirmButtonColor: "#2196F3",
                            type: "success"
                        });
                    }else{
                        // Failed
                    }
                }
            });
        }
    });


    /**
     * New business button clicked
     */
    $('#aNewBiz').on('click', function(){
        $('#modal_new_business').modal({
            backdrop: 'static',
            keyboard: false
        });

    });

    /**
     * New ads button clicked
     */
    $('#aNewAds').on('click', function(){
        $('#modal_new_ads').modal({
            backdrop: 'static',
            keyboard: false
        })
    });


}

function initEvents(){

    // New ads
    /**
     * New Advertisement Form submission.
     */
    $('#formNewAds').submit(function (event){

        $('#bizGroup').removeClass('has-error');
        $('#selbiz-error').hide();
        $('#titleGroup').removeClass('has-error');
        $('#title-error').hide();
        $('#adsContentGroup').removeClass('has-error');
        $('#ads-content-error').hide();

        $('#ads-terms-error').hide();

        // Start processing
        $(panelNewAds).block({
            message: '<i class="icon-spinner4 spinner"></i> Creating Advertisement ......',
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

        var postData = $(this).serializeArray();
        $.ajax(
            {
                method: "POST",
                url: "/admin/ajaxaction/ads/new",
                data: postData,
                success: function(data){

                    $(panelNewAds).unblock();
                    if(!data.success){
                        if(data.errors.selBiz){
                            $('#bizGroup').addClass('has-error');
                            $('#selbiz-error').show();
                        }
                        if(data.errors.title){
                            $('#titleGroup').addClass('has-error');
                            $('#title-error').show();
                        }
                        if(data.errors.adscontent){
                            $('#adsContentGroup').addClass('has-error');
                            $('#ads-content-error').show();
                        }
                        if(data.errors.adsagreeterms){
                            $('#formNewAds #terms-error').show();
                        }
                    }else{
                        $('#modal_new_ads').modal('toggle');
                        swal({
                            title: "Succeeded",
                            text: "Your advertisement been created successfully",
                            confirmButtonColor: "#2196F3",
                            type: "success"
                        });
                    }
                }
            }
        );
        event.preventDefault();
    });

    // New Business Form submission.
    $('#formNewBusiness').submit(function (event){
        currentBid = null;
        // Remove all errors
        $('#nameGroup').removeClass('has-error');
        $('#name-error').hide();
        $('#categoryGroup').removeClass('has-error');
        $('#category-error').hide();
        $('#emailGroup').removeClass('has-error');
        $('#email-error').hide();
        $('#personGroup').removeClass('has-error');
        $('#person-error').hide();
        $('#terms-error').hide();

        var postData = $(this).serializeArray();


        $(panelNewBiz).block({
            message: '<i class="icon-spinner4 spinner"></i> Creating Business',
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

        // Start processing
        // Loading modal_progress

        $.ajax(
            {
                method: "POST",
                url: "/admin/ajaxaction/business/new",
                data: postData,
                success: function(data){
                    $(panelNewBiz).unblock();
                    if(!data.success){
                        if(data.errors) {
                            if (data.errors.name) {
                                // Name error (required)
                                $('#nameGroup').addClass('has-error');
                                $('#name-error').show();
                            }

                            if (data.errors.category) {
                                $('#categoryGroup').addClass('has-error');
                                $('#category-error').show();
                            }

                            if (data.errors.contactemail) {
                                // Email format error
                                $('#emailGroup').addClass('has-error');
                                $('#email-error').show();
                            }

                            if (data.errors.contactperson) {
                                // Contact person is required
                                $('#personGroup').addClass('has-error');
                                $('#person-error').show();
                            }

                            if (data.errors.agreeterms) {
                                $('#terms-error').show();
                            }
                        }
                    }else{
                        currentBid = data.id;
                        reloadBusinessTable();
                        $('#modal_new_business').modal('toggle');

                        swal({
                            title: "Business Created",
                            text: "Your business is created, please select a number for it !",
                            confirmButtonColor: "#2196F3",
                            type: "info"
                        });
                    }
                },
                error: function(jqXHR, textStatus, errorThrown){

                }
            }
        );
        event.preventDefault();
    });
}

function initTables(){

    tblBusiness = $('#tblBusiness').DataTable({
        'ajax':{
            'url':'ajax/data/businesses',
            'type':'POST'
        },
        autoWidth: false,

        'columnDefs':[
            { "orderable": false, "targets": 6 },
            {
                targets: 0,
                width: '80px',
                render: function (data, type, full, meta) {
                    if(data) return '<span class="text-info"><i class="icon-coin-dollar"></i></span>';
                    else return '<span><i class="icon-blocked"></i></span>';
                }
            },
            {
                targets: 1,
                render: function(data, type, full, meta){
                    cellString ='<div class="text-semibold"><a href="/admin/group/details/' + full[5] + '">' + data + '</a></div>';
                    cellString += '<div class="text-muted">'+ full[7] + '</div>';

                    return cellString;
                }
            },
            {
                targets: 5,
                'render': function(data, type ,full, meta){
                    return '<a href=""><img src="http://www.gravatar.com/avatar/' + full[8] + '" alt="user profit image" class="img-circle img-xs"></a><a href="#" class="text-default">&nbsp;'+full[9]+'</i></a>';
                }
            },
            {
                'targets': 6,
                'searchable': false,
                'render': function( data, type, full, meta){

                    cellStr = '<ul class="icons-list" ><li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-menu9 text-info"></i></a>';
                    cellStr += '<ul class="dropdown-menu dropdown-menu-right bizactions" data-bid="'+ full[5] + '", data-bizname="' + full[1] + '">';
                    cellStr += '<li><a href="#" class="_edit"> <i class="icon-pencil7"></i> Edit Business</a></li>';

                    // Edit/Delete option always available
                    cellStr += '<li><a href="#" class="_del"> <i class="text-warning icon-trash"></i> Delete Business</a></li>';
                    cellStr += '</ul></li></ul>';

                    return cellStr;

                    //if(full[5] === 'available' || full[5] === 'subscribed')
                    //    return '<ul class="table-options" data-bid="'+ full[6] + '", data-bizname="' + full[1] + '"><li><a href="#" class="_edit"><span class="text-warning"><i class="fa fa-pencil"></i></span></a></li> <li><a href="#" class="_del"><span class="text-danger"><i class="fa fa-trash"></i></span></a></li> </ul>';
                    //else
                    //    return '<ul class="table-options" data-bid="' + full[6] + '", data-bizname="' + full[1] + '"><li><a href="#" class="_pay"><span class="text-primary"><i class="fa fa-credit-card"></i></span></a></li><li><a href="#" class="_edit"><span class="text-warning"><i class="fa fa-pencil"></i></span></a></li><li><a href="#" class="_del"><span class="text-danger"><i class="fa fa-trash"></i></span></a></li> </ul>';
                }
            },{
                targets: 7,
                visible: false
            }],

        order: [[ 7, 'asc' ]],
        dom: '<"datatable-header"fl><"datatable-scroll-lg"t><"datatable-footer"ip>',
        language: {
            search: '<span>Filter:</span> _INPUT_',
            lengthMenu: '<span>Show:</span> _MENU_',
            paginate: { 'first': 'First', 'last': 'Last', 'next': '&rarr;', 'previous': '&larr;' }
        },
        lengthMenu: [ 15, 25, 50, 75, 100 ],
        displayLength: 25,
        drawCallback: function (settings) {

            var api = this.api();
            var rows = api.rows({page:'current'}).nodes();
            var last=null;

            $('#bizcount').html(api.column(0).data().length);

            // Grouod rows
            api.column(6, {page:'current'}).data().each(function (group, i) {
                if (last !== group) {
                    $(rows).eq(i).before(
                        '<tr class="active"><td colspan="8" class="text-semibold">CATEGORY:- '+group+'</td></tr>'
                    );

                    last = group;
                }
            });


            $('.bizactions a').on('click', function(){
                currentBid  = this.closest('ul').getAttribute('data-bid');
                currentBizName = this.closest('ul').getAttribute('data-bizname');
                var type = this.getAttribute('class');

                // Do function
                if(type === '_pay'){
                    subscribe();
                }else if(type === '_del'){
                    // Alert combination
                    swal({
                            title: "Delete business " + currentBizName + "?",
                            text: "You will not be able to recover this business information once deleted!",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#EF5350",
                            confirmButtonText: "Yes, delete it!",
                            cancelButtonText: "No, cancel pls!",
                            closeOnConfirm: true,
                            closeOnCancel: false
                        },
                        function(isConfirm){
                            if (isConfirm) {

                                // Loader
                                var container = $('#panelBizTable');
                                $(container).block({
                                    message: '<i class="icon-spinner4 spinner"></i> Deleting Business',
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
                                // Delete from database
                                // Send ajax
                                $.ajax({
                                    type: "POST",
                                    url: "/admin/business/delete",
                                    data: {'bid':currentBid, '_token':csrf},
                                    success: function(data) {
                                        container.unblock();
                                        if(data.success){
                                            // Success
                                            reloadBusinessTable();
                                            swal({
                                                title: "Deleted!",
                                                text: "Business: " + currentBizName+" has been deleted.",
                                                confirmButtonColor: "#66BB6A",
                                                type: "success"
                                            });
                                        }else{
                                            // Failed
                                        }
                                    }
                                });

                            }
                            else {
                                swal({
                                    title: "Cancelled",
                                    text: "Your business information is safe :)",
                                    confirmButtonColor: "#2196F3",
                                    type: "error"
                                });
                            }
                        });
                }

                return false;
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

/**
 * Subscribe (business), $5.99 for each business.
 */
function subscribe(){

    payHandler.open({
        name: 'Monthly Subscription',
        description: 'USA Local Number for Business',
        amount: 599
    });
}

/**
 * Reload business data table.
 */
function reloadBusinessTable(){
    tblBusiness.ajax.reload();
}


function formatBiz(biz){
    if(biz.loading) return biz.text;

    return '<div>'+biz.name+'</div>';
}

function formatBizSelection(biz){
    return biz.name || biz.text;
}

function initBusinessListSelect(){


    //// Remove all non-empty value
    //for(i = $('#selBiz option').length; i >0; i--){
    //    $('#selBiz option:eq(' + i +')').remove();
    //}
    //// load business select component
    //$.ajax({
    //    url: '/admin/ajax/data/businesses/myallsubscribed',
    //    type: 'POST',
    //    data: {'_token':csrf},
    //    success: function(data){
    //        // pop business list.
    //        for(i = 0; i<data.length; i++){
    //            $('#formNewAds #selBiz').append('<option value="' + data[i].id + '">'+ data[i].name + '</option>');
    //        }
    //
    //    }
    //});
    //
    //// Select2 enhance
    //$('#formNewAds #selBiz').select2({
    //    placeholder: 'Select business send Advertisement from '
    //});
}

function initScheduleAction(){

    $('.pickadate').pickadate({
        min: -0.1,
        max: false,
        format: 'yyyy-m-d',
        selectYears: true,
        selectMonths: true
    });

    $('.timePicker').pickatime({
        //min: -0.1
    });

    /**
     * Schedule button clicked
     */
    $('#btnSchedule').on('click', function(){

        $('#scheduleGroup').show();
        $('input[name=scheduled]').val('1');
        $('#btnSchedule').hide();
        $('#btnScheduleRemove').show();
        return false;
    });

    /**
     * Schedule remove button clicked
     */
    $('#btnScheduleRemove').on('click', function(){

        $('input[name=scheduled]').val('');
        $('#scheduleGroup').hide();
        $('#btnSchedule').show();
        $('#btnScheduleRemove').hide();

        return false;
    });
}

function initAttachmentAction(){

    var containerAttachment = $('#modal_new_ads .modal-content');
    /**
     * File updated
     * @type {*|jQuery|HTMLElement}
     */
    var btnUpload = $('#btnAttach');
    var uploader = new ss.SimpleUpload({
        button 	: btnUpload,
        url 	: '/admin/file/uploadimage',
        name	: 'imgfile',
        maxUploads	:	1,
        queue	:	false,
        accept	:	'image/*',
        allowedExtensions : ['jpg', 'png', 'jpeg', 'gif'],
        responseType: 'json',
        onSubmit	:	function(filaname, extension){
            // Loading modal_progress
            // Loader
            $(containerAttachment).block({
                message: '<i class="icon-spinner4 spinner"></i> Uploading Attachment',
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
        },
        onComplete	:	function(filename, response){
            if(response.success) {
                $(containerAttachment).unblock();

                publicId = response.uploadedresult['public_id'];
                $('#formNewAds input[name=imagefilename]').val(response.uploadedresult['public_id']);
                $('#formNewAds input[name=imageurl]').val(response.uploadedresult['url']);
                $('#formNewAds input[name=imagesecureturl]').val(response.uploadedresult['secure_url']);

                // Set image source
                $('#imgAttach').attr('src', response.uploadedresult['url']);

                // Rearrange
                $('#txtDiv').removeClass('col-sm-12').addClass('col-sm-9');
                $('#imgDiv').show();

                // Disable upload button and enable delete button
                $('#btnAttach').hide();
                $('#btnAttachDel').show();
            }
        }

    });

    /**
     * Delete attachment
     */
    $('#btnAttachDel').on('click', function(){

        $(containerAttachment).block({
            message: '<i class="icon-spinner4 spinner"></i> Deleting Attachment',
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

        $.ajax({
            type: 'POST',
            url: '/admin/file/deleteimage',
            data: {'publicId': publicId},
            success: function(data){
                $(containerAttachment).unblock();

                if(data['result'] == 'ok'){

                    $('input[name=imagefilename]').val('');
                    $('input[name=imageurl]').val('');
                    $('input[name=imagesecureturl]').val('');


                    // Rearrange
                    $('#txtDiv').removeClass('col-sm-9').addClass('col-sm-12');
                    $('#imgDiv').hide();
                    $('#imgAttach').attr('src', '');

                    // Enable attach button
                    $('#btnAttach').show();
                    $('#btnAttachDel').hide();

                }else{
                    // Something wrong with delete on server.
                }

            }
        });

        return false;
    });
}