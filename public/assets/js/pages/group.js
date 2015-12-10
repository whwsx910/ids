/**
 * Created by chen3 on 10/15/15.
 */

var tblGroups;
var currentGid;
var currentGrpName;
var publicId;
var panelNewBiz;
var modalNewAnnouncement;
var containerAttachment;

$(function(){

    $('#menu_group').addClass('active');
    panelNewBiz = $('#modal_new_group .modal-content');
    panelNewAds = $('#modal_new_announcement .modal-content');
    panelBizList = $('#panelGroupTable');
    modalNewAnnouncement = $('#modal_new_announcement .modal-content');
    containerAttachment = $('#modal_new_announcement .modal-content');

    initComponents();
    initEvents();
    initTables();
    initScheduleAction();
    initAttachmentAction();

});

function initComponents(){


    $('#selCategories').select2({

    });

    $('#multiGroup').select2({
        placeholder: 'Contact groups',
        width: '100%'
    });

    $('#selContacts').select2({
        placeholder: 'Additional Contacts',
        width: '100%'
    })

    $('#selGrp').select2({
        placeholder: 'Select group for sending Announcement',
        ajax: {
            url: '/admin/ajax/data/groups/myall',
            type: 'POST',
            processResults: function (data) {
                return {
                    results: $.map(data, function (item) {
                        arrData = new Array();
                        for(i = 0; i<item.length; i++){
                            arrData.push( {
                                id: item[i][6],
                                text: item[i][0]
                            });
                        }

                        return arrData;
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

    $('.pickadate').pickadate({
        min: -0.1,
        max: false,
        format: 'yyyy-m-d',
        selectYears: true,
        selectMonths: true
    });

    $('.timePicker').pickatime({
        // TODO adjust min if date pick is greater than today
        //min: -0.1
    });

}

function initEvents(){

    // New group
    $('#aNewGrp').on('click', function(event){
        // Reset form
        document.getElementById('formNewGroup').reset();
        //TODO reset select2 dropdown list

        $('#modal_new_group').modal({
            backdrop: 'static',
            keyboard: false
        });
    });

    // Announcement
    $('#aNewAnnouncement').on('click', function(event){
        // Reset form
        document.getElementById('formNewAnnouncement').reset();

        $('#modal_new_announcement').modal({
            backdrop: 'static',
            keyboard: false
        });
    });

    // Call ajax
    $('#formNewGroup').submit(function(event){

        $('#nameGroup').removeClass('has-error');
        $('#err-name').hide();

        $('#categoryGroup').removeClass('has-error');
        $('#err-category').hide();

        $('#personGroup').removeClass('has-error');
        $('#err-contactperson').hide();

        $('#emailGroup').removeClass('has-error');
        $('#err-email').hide();

        $('#terms-error').hide();

        // Start processing
        // Start processing
        $(panelNewBiz).block({
            message: '<i class="icon-spinner4 spinner"></i> Creating Group ......',
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

        $.ajax({
            type: 'POST',
            url: '/admin/ajaxaction/group/new',
            data: postData,
            success: function(data){
                $(panelNewBiz).unblock();
                if(data.success){
                    // reload table
                    tblGroups.ajax.reload();

                    // Toggle modal dialog
                    $('#modal_new_group').modal('toggle');
                    swal({
                        title: "Succeeded",
                        text: "Your group been created successfully",
                        confirmButtonColor: "#2196F3",
                        type: "success"
                    });
                }else{
                    if(data.errmsg) {
                        // Error
                        if (data.errmsg.name) {
                            $('#nameGroup').addClass('has-error');
                            $('#err-name').show();
                        }

                        if (data.errmsg.category) {
                            $('#categoryGroup').addClass('has-error');
                            $('#err-category').show();
                        }

                        if (data.errmsg.contactperson) {
                            $('#personGroup').addClass('has-error');
                            $('#err-contactperson').show();
                        }

                        if (data.errmsg.contactemail) {
                            $('#emailGroup').addClass('has-error');
                            $('#err-email').show();
                        }

                        if (data.errmsg.agreeterms) {
                            $('#terms-error').show();
                        }
                    }
                }
            }
        });

        event.preventDefault();

    });

    /**
     * New announcement form submission
     */
    $('#modal_new_announcement #formNewAnnouncement').submit(function(event){

        // Clean form errors
        cleanNewAnnouncementFormError();
        // Start processing
        // Loading modal_progress
        $(modalNewAnnouncement).block({
            message: '<i class="icon-spinner4 spinner"></i> Sheduling Announcement, please wait ......',
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

        // Form data
        var postData = $(this).serializeArray();
        $.ajax(
            {
                method: "POST",
                url: "/admin/announcement/new",
                data: postData,
                success: function(data){
                    $(modalNewAnnouncement).unblock();
                    if(!data.success){
                        if(data.errmsgs.selGrp){
                            $('#selGroup').addClass('has-error');
                            $('#err-selgrp').show();
                        }
                        if(data.errmsgs.title){
                            $('#titleGroup').addClass('has-error');
                            $('#err-title').show();
                        }
                        if(data.errmsgs.announcementcontent){
                            $('#announcementcontent').addClass('has-error');
                            $('#err-content').show();
                        }
                        if(data.errmsgs.announcementagreeterms){
                            $('#err-terms').show();
                        }
                    }else{
                        $('#modal_new_announcement').modal('toggle');
                    }
                }
            }
        );

        event.preventDefault();
    });

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
            $(containerAttachment).block({
                message: '<i class="icon-spinner4 spinner"></i> Uploading Attachment, please wait ......',
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
            $(containerAttachment).unblock();
            if(response.success) {
                publicId = response.uploadedresult['public_id'];
                $('input[name=imagefilename]').val(response.uploadedresult['public_id']);
                $('input[name=imageurl]').val(response.uploadedresult['url']);
                $('input[name=imagesecureturl]').val(response.uploadedresult['secure_url']);

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

        // Loading modal_progress
        // Loading modal_progress
        $(containerAttachment).block({
            message: '<i class="icon-spinner4 spinner"></i> Deleting Attachment, please wait ......',
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
                    // Deleted

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

function initTables(){

    // Initialize data table
    tblGroups = $('#tblGroups').DataTable({
        ajax:{
            'url':'ajax/data/groups/myall',
            'type':'POST'
        },
        autoWidth: false,
        columnDefs: [
            {
                type: "string",
                width: '500px',
                targets: 0,
                'render': function(data, type, full , meta){
                    cellString ='<div class="text-semibold"><a href="/admin/group/details/' + full[6] + '">' + data + '</a></div>';
                    cellString += '<div class="text-muted">'+ full[8] + '</div>';

                    return cellString;
                }
            },
            {
                visible: false,
                targets: 2
            },
            {
                width: '50px',
                targets: 3,
                'render': function(data, type, full, meta){
                    pStr = full[7] ? 'Private':'Public';
                    cellStr = '<div class="btn-group">';
                    cellStr += '<a href="#" class="label ' + (full[7]?'label-danger':'label-info') + ' dropdown-toggle" data-toggle="dropdown">'+ pStr+' <span class="caret"></span></a>';

                    cellStr += '<ul class="dropdown-menu dropdown-menu-right" data-gid="' +full[6] + '" data-grpname="' + full[0] + '">';

                    cellStr += '<li class="_switchprivate ' + (full[7]?'active':'') + '"><a href="#"><i class="icon-bell-cross text-danger"></i> Private</a></li>';
                    cellStr += '<li class="_switchpublic ' + (full[7]?'':'active') + '"><a href="#"><i class="icon-bell3"></i></span> Public</a></li>';


                    cellStr += '</ul>';
                    //if(full[6]){
                    //    cellStr +=  '<li><span class="text-primary"><i class="fa fa-check-square-o"></i></span></li><li><a href="#" class="_switchtopublic"> <span class="text-primary"><i class="fa fa-retweet"></i> </span></a></li>';
                    //}else{
                    //    cellStr += '<li><span class="text-danger"><i class="fa fa-square-o"></i></span> </li><li><a href="#" class="_switchtoprivate"> <span class="text-primary"><i class="fa fa-retweet"></i> </span></a></li>';
                    //}

                    cellStr += '</div>';
                    return cellStr;
                }
            },
            {
                width: '50px',
                targets: 4,
                render: function(data, type, full, meta){
                    return full[3];
                }
            },
            {
                orderDataType: 'dom-text',
                type: 'string',
                targets: 5,
                'render': function(data, type, full, meta){
                    if(full[4] === 1){
                        return 'Owner';
                    }else{
                        return 'Receiver';
                    }
                }
            },
            {
                targets: 6,
                'render': function(data, type ,full, meta){
                    return '<a href=""><img src="http://www.gravatar.com/avatar/' + full[9] + '" alt="user profit image" class="img-circle img-xs"></a><a href="#" class="text-default">&nbsp;'+full[10]+'</i></a>';
                }
            },
            {
                orderable: false,
                width: '50px',
                searchable: false,
                targets: 7,
                'render': function( data, type, full, meta){

                    cellStr = '<ul class="icons-list" ><li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-menu9 text-info"></i></a>';
                    cellStr += '<ul class="dropdown-menu dropdown-menu-right bizactions" data-gid="'+ full[6] + '", data-grpname="' + full[0] + '">';
                    cellStr += '<li><a href="#" class="_edit"> <i class="icon-pencil7"></i> Edit Group</a></li>';
                    // Edit/Delete option always available
                    cellStr += '<li><a href="#" class="_del"> <i class="text-warning icon-trash"></i> Delete Group</a></li>';
                    cellStr += '</ul></li></ul>';

                    return cellStr;

                }
            },
            {
                width: '15%',
                targets: [5, 6, 7]
            }
        ],
        order: [[ 1, 'asc' ]],
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

            $('#grpcount').html(api.column(0).data().length);

            // Grouod rows
            api.column(2, {page:'current'}).data().each(function (group, i) {
                if (last !== group) {
                    $(rows).eq(i).before(
                        '<tr class="active"><td colspan="8" class="text-semibold">CATEGORY:- '+group+'</td></tr>'
                    );

                    last = group;
                }
            });

            // Datepicker
            $(".datepicker").datepicker({
                showOtherMonths: true,
                dateFormat: "d MM, y"
            });

            // Select2
            $('.select').select2({
                width: '150px',
                minimumResultsForSearch: "-1"
            });

            // Reverse last 3 dropdowns orientation
            $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');

            // Click event on private/public switch

            $('._switchprivate').on('click', function(event){
                gid = this.closest('ul').getAttribute('data-gid');
                gname = this.closest('ul').getAttribute('data-grpname');
                // Do nothing if already active
                if($(this).hasClass('active')){
                    // Do nothing
                }else {
                    swal({
                            title: "Switch group: " + gname + " to private?",
                            text: "All public subscribers to this group will be removed and can't UNDO !",
                            type: "info",
                            showCancelButton: true,
                            confirmButtonColor: "#EF5350",
                            confirmButtonText: "Yes, switch!",
                            cancelButtonText: "No, cancel pls!",
                            closeOnConfirm: true,
                            closeOnCancel: true
                        },
                        function(isConfirm){
                            if (isConfirm) {
                                // Switch over to private.
                                var container = $('#panelGroupTable');
                                $(container).block({
                                    message: '<i class="icon-spinner4 spinner"></i> Switching group to private ......',
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
                                    url:'/admin/ajaxaction/group/switchpublicprivate',
                                    type: 'POST',
                                    data: {'gid':gid, '_token':csrf},
                                    success: function(data){
                                        $(container).unblock();
                                        if(data.success){
                                            tblGroups.ajax.reload();

                                            swal({
                                                title: "Switched!",
                                                text: "Group: " + gname+" has been switched to private.",
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
                }
            });

            $('._switchpublic').on('click', function(event){
                gid = this.closest('ul').getAttribute('data-gid');
                gname = this.closest('ul').getAttribute('data-grpname');
                // Do nothing if already active
                if($(this).hasClass('active')){
                    // Do nothing
                }else {
                    swal({
                            title: "Switch group: " + gname + " to public?",
                            text: "Open to public allow every user can subscriber to this group !",
                            type: "info",
                            showCancelButton: true,
                            confirmButtonColor: "#EF5350",
                            confirmButtonText: "Yes, switch!",
                            cancelButtonText: "No, cancel pls!",
                            closeOnConfirm: true,
                            closeOnCancel: true
                        },
                        function(isConfirm){
                            if (isConfirm) {
                                // Switch over to private.
                                var container = $('#panelGroupTable');
                                $(container).block({
                                    message: '<i class="icon-spinner4 spinner"></i> Switching group to public ......',
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
                                    url:'/admin/ajaxaction/group/switchpublicprivate',
                                    type: 'POST',
                                    data: {'gid':gid, '_token':csrf},
                                    success: function(data){
                                        $(container).unblock();
                                        if(data.success){
                                            tblGroups.ajax.reload();

                                            swal({
                                                title: "Switched!",
                                                text: "Group: " + gname+" has been switched to public.",
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
                }
            });

            $('._del').on('click', function(event){

                gid = this.closest('ul').getAttribute('data-gid');
                gname = this.closest('ul').getAttribute('data-grpname');

                // Alert combination
                swal({
                        title: "Delete gorup " + gname + "?",
                        text: "You will not be able to recover this group once deleted!",
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
                            var container = $('#panelGroupTable');
                            $(container).block({
                                message: '<i class="icon-spinner4 spinner"></i> Deleting Group',
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
                                url: "/admin/group/delete",
                                data: {'gid':gid, '_token':csrf},
                                success: function(data) {
                                    container.unblock();
                                    if(data.success){
                                        // Success
                                        tblGroups.ajax.reload();
                                        swal({
                                            title: "Deleted!",
                                            text: "Group: " + gname+" has been deleted.",
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
            });


        },
        preDrawCallback: function(settings) {

            // Reverse last 3 dropdowns orientation
            $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');

            // Destroy Select2
            $('.select').select2('destroy');
        }
    });



    //tblGroups = $('#tblGroups').DataTable({
    //    'ajax':{
    //        'url':'ajax/data/groups/myall',
    //        'type':'POST'
    //    },
    //    "aoColumns": [
    //        null,
    //        { "sClass": "text-center" },
    //        { "sClass": "text-center"},
    //        { "sClass": "text-center"}
    //    ],
    //    'columnDefs':[
    //        { "orderable": false, "targets": 5 },
    //        {
    //            'targets': 0,
    //            'render': function(data, type, full, meta){
    //                return data;
    //            }
    //        },
    //        {
    //            'targets': 2,
    //            'render': function(data, type, full, meta){
    //                cellStr = '<ul class="table-options" data-gid="'+ full[5] +'" data-grpname="' + full[0] + '">';
    //                if(full[6]){
    //                    cellStr +=  '<li><span class="text-primary"><i class="fa fa-check-square-o"></i></span></li><li><a href="#" class="_switchtopublic"> <span class="text-primary"><i class="fa fa-retweet"></i> </span></a></li>';
    //                }else{
    //                    cellStr += '<li><span class="text-danger"><i class="fa fa-square-o"></i></span> </li><li><a href="#" class="_switchtoprivate"> <span class="text-primary"><i class="fa fa-retweet"></i> </span></a></li>';
    //                }
    //
    //                cellStr += '</ul>';
    //                return cellStr;
    //            }
    //        },
    //        {
    //            'targets': 4,
    //            'render': function(data, type, full, meta){
    //                if(full[3] === 1){
    //                    return 'Owner';
    //                }else{
    //                    return 'Receiver';
    //                }
    //            }
    //        },
    //        {
    //            'targets': 5,
    //            'render': function(data, type, full, meta){
    //                return full[4];
    //            }
    //        },
    //
    //        {
    //            'targets': 6,
    //            'render': function( data, type, full, meta){
    //
    //                cellStr = '<ul class="icons-list" ><li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-menu9 text-info"></i></a>';
    //                cellStr += '<ul class="dropdown-menu dropdown-menu-right bizactions" data-gid="'+ full[5] + '", data-grpname="' + full[0] + '">';
    //                cellStr += '<li><a href="#" class="_edit"> <i class="icon-pencil7"></i> Edit Group</a></li>';
    //                // Edit/Delete option always available
    //                cellStr += '<li><a href="#" class="_del"> <i class="text-warning icon-trash"></i> Delete Group</a></li>';
    //                cellStr += '</ul></li></ul>';
    //
    //                return cellStr;
    //
    //                //if(full[5] === 'available' || full[5] === 'subscribed')
    //                //    return '<ul class="table-options" data-bid="'+ full[6] + '", data-bizname="' + full[1] + '"><li><a href="#" class="_edit"><span class="text-warning"><i class="fa fa-pencil"></i></span></a></li> <li><a href="#" class="_del"><span class="text-danger"><i class="fa fa-trash"></i></span></a></li> </ul>';
    //                //else
    //                //    return '<ul class="table-options" data-bid="' + full[6] + '", data-bizname="' + full[1] + '"><li><a href="#" class="_pay"><span class="text-primary"><i class="fa fa-credit-card"></i></span></a></li><li><a href="#" class="_edit"><span class="text-warning"><i class="fa fa-pencil"></i></span></a></li><li><a href="#" class="_del"><span class="text-danger"><i class="fa fa-trash"></i></span></a></li> </ul>';
    //            }
    //        }]
    //});
    //
    ///**
    // * Event after datatable been fully loaded.
    // */
    //tblGroups.on('draw.dt', function(){
    //    $('#grpcount').html(tblGroups.column(0).data().length);
    //    $('.table-options a').on('click', function(){
    //        currentGid  = this.closest('ul').getAttribute('data-gid');
    //        currentGrpName = this.closest('ul').getAttribute('data-grpname');
    //        var type = this.getAttribute('class');
    //
    //        // Do function
    //        if(type === '_del'){
    //            $('#modal_del_group #grpname').html(currentGrpName);
    //            $('#modal_del_group').modal({
    //                backdrop: 'static',
    //                keyboard: false
    //            });
    //        }
    //
    //        if(type === '_switchtopublic'){
    //            $('#confirmGroupToPublic #groupName').html(currentGrpName);
    //            $('#confirmGroupToPublic').modal({
    //                backdrop: 'static',
    //                keyboard: false
    //            });
    //        }
    //
    //        if(type === '_switchtoprivate'){
    //            $('#confirmGroupToPrivate #groupName').html(currentGrpName);
    //            $('#confirmGroupToPrivate').modal({
    //                backdrop: 'static',
    //                keyboard: false
    //            });
    //        }
    //
    //        return false;
    //    });
    //});

    // Add placeholder to the datatable filter option
    $('.dataTables_filter input[type=search]').attr('placeholder','Type to filter...');


    // Enable Select2 select for the length option
    $('.dataTables_length select').select2({
        minimumResultsForSearch: "-1"
    });

}

function initScheduleAction(){

}

function initAttachmentAction(){

}

/**
 * Clean form errors
 */
function cleanNewAnnouncementFormError(){
    $('#selGroup').removeClass('has-error');
    $('#err-selgrp').hide();
    $('#titleGroup').removeClass('has-error');
    $('#err-title').hide();
    $('#announcementcontent').removeClass('has-error');
    $('#err-content').hide();
    $('#err-terms').hide();
}