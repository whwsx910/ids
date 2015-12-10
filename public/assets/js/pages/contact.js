/**
 * Created by chen3 on 10/21/15.
 */

var tblContacts;
var tblGrp;
var modalNewContact;
var modalNewContactGroup;
var tblGrpRow;
var dropDownMenu;
var tblContactsSimple;

$(function(){

    $('#menu_contact').addClass('active');
    modalNewContact = $('#modal_new_contact .modal-content');
    modalNewContactGroup = $('#modal_new_contactgroup .modal-content');

    dropDownMenu = '<ul class="icons-list" ><li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-menu9 text-info"></i></a>';
    dropDownMenu += '<ul class="dropdown-menu dropdown-menu-right">';
    dropDownMenu += '<li><a href="#" class="_editgrp"> <i class="icon-pencil7"></i> Edit Group</a></li>';

    // Edit/Delete option always available
    dropDownMenu += '<li><a href="#" class="_delgrp"> <i class="text-warning icon-trash"></i> Delete Group</a></li>';
    dropDownMenu += '</ul></li></ul>';

    tblGrpRow = '<tr data-gid="{4}" data-gname="{0}"><td> <div class="media-left media-middle"> '+ dropDownMenu +'</a> </div>';
    tblGrpRow += ' <div class="media-body"> <div class="media-heading"> <a href="#" class="letter-icon-title">{0}</a> </div>';
    tblGrpRow += ' <div class="text-muted text-size-small"> {1}</div> </div></td>';
    //tblGrpRow += '<td> <span class="text-muted text-size-small">{2}</span> </td>';
    tblGrpRow += '<td> <h6 class="text-semibold no-margin"><span class="mcount">{3}</span> <a href="#"  class="text-size-small _managegrp">Manage</a> </h6>  </td> </tr>';

    initEvents();
    initComponents();
    initTables();
});

function initEvents(){

    /**
     * New user
     */
    $('#aNewUser').on('click', function(){
        cleanContactFormError();
        $('#modal_new_contact').modal({
            backdrop: 'static',
            keyboard: false
        });
    });

    /**
     * New group
     */
    $('#aNewGroup').on('click', function(){
        cleanContactGroupFormError();
        $('#modal_new_contactgroup').modal({
            backdrop: 'static',
            keyboard: false
        });
    });

    // Submit new contact group
    $('#formNewContactGroup').submit(function(event){
        cleanContactGroupFormError();
        $(modalNewContactGroup).block({
            message: '<i class="icon-spinner4 spinner"></i> Creating Contact Group, Please Wait ......',
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
            url: '/admin/contactgroup/new',
            data: postData,
            success: function(data){
                $(modalNewContactGroup).unblock();

                if(data.success){
                    $('#modal_new_contactgroup').modal('toggle');
                    initTblGroup();
                }else{
                    if(data.errmsgs){
                        if(data.errmsgs.name){
                            $('#formNewContactGroup #nameGroup').addClass('has-error');
                            $('#formNewContactGroup #err-name').show();
                        }
                        if(data.errmsgs.agreeterms){
                            $('#formNewContactGroup #terms-error').show();
                        }
                    }
                }
            }
        });

        event.preventDefault();

    });

    // Call ajax
    $('#formNewContact').submit(function(event){
        cleanContactFormError();
        $(modalNewContact).block({
            message: '<i class="icon-spinner4 spinner"></i> Creating Contact, Please Wait ......',
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
            url: '/admin/contact/new',
            data: postData,
            success: function(data){
                $(modalNewContact).unblock();
                if(data.success){
                    // reload table
                    tblContacts.ajax.reload();

                    // Toggle modal dialog
                    $('#modal_new_contact').modal('toggle');
                }else{
                    if(data.errmsgs) {
                        // Error
                        if (data.errmsgs.name) {
                            $('#formNewContact #nameGroup').addClass('has-error');
                            $('#formNewContact #err-name').show();
                        }

                        if (data.errmsgs.contactphone) {
                            $('#formNewContact #phoneGroup').addClass('has-error');
                            $('#formNewContact #err-phone').show();
                        }

                        if (data.errmsgs.contactemail) {
                            $('#formNewContact #emailGroup').addClass('has-error');
                            $('#formNewContact #err-email').show();
                        }

                        if (data.errmsgs.agreeterms) {
                            $('#formNewContact #terms-error').show();
                        }
                    }
                }
            }
        });

        event.preventDefault();

    });
}

function initComponents(){

    // Select2 Box
    $('.select-search').select2({
    });

    $(".styled, .multiselect-container input").uniform({
        radioClass: 'choice'
    });
}


function initTables(){
    tblGrp = $('#tblGrp tbody');

    // Get contact groups via AJAX
    initTblGroup();

    tblContacts = $('#tblContacts').DataTable({
        ajax:{
            url: '/admin/ajax/contact/mycontacts',
            type: 'POST'
        },

        autoWidth: false,
        'columnDefs':[
            { "orderable": false, "targets": [3,4] },
            {
                targets: 0,
                render: function(data, type, full , meta){
                    return '<a href=""><img src="http://www.gravatar.com/avatar/' + full[5] + '" alt="user profit image" class="img-rounded img-xs">&nbsp;' + data + '</a>'
                }
            },
            {
                targets: 1,
                render: function( data, type, full, meta ){
                    return (full[7])?'<span class="text-success">' + data + '</span>':'<span class="text-danger"> <s>'+data+'</s></span>';
                }
            },
            {
                'targets': 4,
                'searchable': false,
                'render': function( data, type, full, meta){

                    cellStr = '<ul class="icons-list" ><li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-menu9 text-info"></i></a>';
                    cellStr += '<ul class="dropdown-menu dropdown-menu-right" data-cid="'+ full[4] + '", data-cname="' + full[0] + '">';
                    cellStr += '<li><a href="#" class="_edit"> <i class="icon-pencil7"></i> Edit Contact</a></li>';

                    // Edit/Delete option always available
                    cellStr += '<li><a href="#" class="_del"> <i class="text-warning icon-trash"></i> Delete Contact</a></li>';
                    cellStr += '</ul></li></ul>';

                    return cellStr;

                    //if(full[5] === 'available' || full[5] === 'subscribed')
                    //    return '<ul class="table-options" data-bid="'+ full[6] + '", data-bizname="' + full[1] + '"><li><a href="#" class="_edit"><span class="text-warning"><i class="fa fa-pencil"></i></span></a></li> <li><a href="#" class="_del"><span class="text-danger"><i class="fa fa-trash"></i></span></a></li> </ul>';
                    //else
                    //    return '<ul class="table-options" data-bid="' + full[6] + '", data-bizname="' + full[1] + '"><li><a href="#" class="_pay"><span class="text-primary"><i class="fa fa-credit-card"></i></span></a></li><li><a href="#" class="_edit"><span class="text-warning"><i class="fa fa-pencil"></i></span></a></li><li><a href="#" class="_del"><span class="text-danger"><i class="fa fa-trash"></i></span></a></li> </ul>';
                }
            },
            {
                targets: [5,6],
                visible: false
            }
        ],
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

            // Grouod rows
            api.column(6, {page:'current'}).data().each(function (group, i) {
                if (last !== group) {
                    $(rows).eq(i).before(
                        '<tr class="active"><td colspan="8" class="text-semibold">'+group+'<span class="pull-right"> </span> </td></tr>'
                    );

                    last = group;
                }
            });

            // Delete contact
            $('._del').on('click', function(event){
                cid = this.closest('ul').getAttribute('data-cid');
                cname = this.closest('ul').getAttribute('data-cname');

                swal({
                        title: "Delete contact: " + cname + " ?",
                        text: "Once contact been deleted, it can't UNDO !",
                        type: "info",
                        showCancelButton: true,
                        confirmButtonColor: "#EF5350",
                        confirmButtonText: "Yes, Delete!",
                        cancelButtonText: "No, cancel pls!",
                        closeOnConfirm: true,
                        closeOnCancel: true
                    },
                    function(isConfirm){
                        if (isConfirm) {
                            // Block the table
                            container = $('#panelGroupTable');
                            $(container).block({
                                message: '<i class="icon-spinner4 spinner"></i> Deleting Contact, Please Wait ......',
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
                                url: '/admin/contact/delete',
                                type: 'POST',
                                data: {'_token':csrf, 'cid':cid},
                                success: function(data){
                                    $(container).unblock();
                                    if(data.success){
                                        tblContacts.ajax.reload();
                                        swal({
                                            title: "Contact Deleted!",
                                            text: "Contact: " + cname+" has been deleted from list.",
                                            confirmButtonColor: "#66BB6A",
                                            type: "success"
                                        });
                                    }else{
                                        swal({
                                            title: "ERROR!",
                                            text: data.errmsg,
                                            confirmButtonColor: "#66BB6A",
                                            type: "error"
                                        });
                                    }
                                }
                            })
                        }
                        else{
                        }
                    }
                );
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

function cleanContactFormError(){
    $('#formNewContact #nameGroup').removeClass('has-error');
    $('#formNewContact #err-name').hide();
    $('#formNewContact #phoneGroup').removeClass('has-error');
    $('#formNewContact #err-phone').hide();
    $('#formNewContact #emailGroup').removeClass('has-error');
    $('#formNewContact #err-email').hide();
    $('#formNewContact #terms-error').hide();
}

function cleanContactGroupFormError(){
    $('#formNewContactGroup #nameGroup').removeClass('has-error');
    $('#formNewContactGroup #err-name').hide();
    $('#formNewContactGroup #terms-error').hide();
}

/**
 * Init contact group table.
 */
function initTblGroup(){
    var tblGrpRows = '';
    $.ajax({
        url: '/admin/ajax/contact/mycontactgrps',
        type: 'POST',
        success: function(data){
            // Load to table.
            data.map(function(key, value, array){
                tblGrpRows += String.format(tblGrpRow, key[1], key[2]==null?'':key[2], '', key[3], key[0]);
            });

            // Add to table
            tblGrp.html(tblGrpRows);

            // Manage members for selected group
            $('._managegrp').on('click', function(event){
                thistr = this.closest('tr');
                gid = thistr.getAttribute('data-gid');
                gname = thistr.getAttribute('data-gname');
                inited = false;

                $.ajax({
                    url: '/admin/ajax/contact/bygroup',
                    type: 'POST',
                    data: {'cgid': gid},
                    success:function(data){
                        if(data.success){
                            // Format data
                            selecteddata = new Array();
                            for(i = 0; i<data.data.length; i++){
                                selecteddata.push({id:data.data[i][0], text:data.data[i][1]});
                            }
                            // Assign selected content.
                            $('#contacts').select2('data', selecteddata, true);
                        }else{
                            // Do nothing
                        }
                    }
                });

                // Get members in group data via ajax then init contacts select2.
                $('#contacts').select2({
                    multiple: true,
                    ajax: {
                        url: '/admin/ajax/contact/mycontacts',
                        type: 'POST',
                        processResults: function (data) {
                            return {
                                results: $.map(data, function (item) {
                                    arrData = new Array();
                                    for(i = 0; i<item.length; i++){
                                        arrData.push( {
                                            id: item[i][4],
                                            text: item[i][0]
                                        });
                                    }

                                    return arrData;
                                })
                            };
                        }
                    }

                })
                    .on("select2-selecting", function(event){
                        addContactToGroup(gid, event.val, event.object.text, gname);
                    })
                    .on("select2-removed", function(event){
                        removeContactFromGroup(gid, event.val, event.choice.text, gname);
                    });

                if(tblContactsSimple != null){
                    tblContactsSimple.destroy();
                }
                // Init manage contactgroup dialog
                tblContactsSimple = $('#tblContactsSimple').DataTable({

                    ajax:{
                        url: '/admin/ajax/contact/mycontacts',
                        type: 'POST'
                    },

                    autoWidth: false,

                    'columnDefs':[
                        { "orderable": false, "targets": [3] },
                        {
                            'targets': 3,
                            'searchable': false,
                            'render': function( data, type, full, meta){
                                index = $.inArray(gid,full[8]);
                                if(index == -1) {
                                    cellStr = '<a href="#" class="_addtocontactgroup" data-cid="'+full[4]+'" data-cname="' + full[0] +'"><i class="text-primary icon-download"></i> </a>';
                                }else {
                                    cellStr = '<a href="#" class="_removefromcontactgroup" data-cid="'+full[4]+'" data-cname="' + full[0] +'"> <i class="text-danger icon-upload"></i></a>';
                                }

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
                    displayLength: 25,

                    preDrawCallback: function(settings) {

                        // Reverse last 3 dropdowns orientation
                        $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');

                        // Destroy Select2
                        $('.select').select2('destroy');
                    },

                    drawCallback: function (settings) {
                        var api = this.api();

                        // Add contact to group
                        $('._addtocontactgroup').on('click', function(event){
                            cid = this.getAttribute('data-cid');
                            cname = this.getAttribute('data-cname');

                            addContactToGroup(gid, cid, cname, gname);

                            // Add to select2
                            // Get data
                            cdata = $('#contacts').select2('data');
                            cdata.push({'id':cid, 'text':cname});
                            // Reload contact select2.
                            $('#contacts').select2('data',cdata, true);

                            // Reset the group member #


                            event.preventDefault();
                        });

                        // Remove contact from group
                        $('._removefromcontactgroup').on('click', function(event){
                            cid = this.getAttribute('data-cid');
                            cname = this.getAttribute('data-cname');

                            removeContactFromGroup(gid, cid, cname, gname);

                            // Remove from select2
                            cdata = $('#contacts').select2('data');

                            for(var i = 0; i < cdata.length; i++) {
                                var obj = cdata[i];

                                if(cid === obj.id) {
                                    cdata.splice(i, 1);
                                }
                            }
                            // Reload contact select2.
                            $('#contacts').select2('data',cdata, true);

                            event.preventDefault();


                        });
                    }

                });

                // Add placeholder to the datatable filter option
                $('.dataTables_filter input[type=search]').attr('placeholder','Type to filter...');


                // Enable Select2 select for the length option
                $('.dataTables_length select').select2({
                    minimumResultsForSearch: "-1"
                });

                // Modal up
                $('#modal_manage_contactgroup').modal({
                    backdrop: 'static',
                    keyboard: false
                });

                event.preventDefault();
            });

            // Set delete action.
            $('._delgrp').on('click', function(event){

                gid = this.closest('tr').getAttribute('data-gid');
                gname = this.closest('tr').getAttribute('data-gname');

                swal({
                        title: "Delete contact group: " + gname + " ?",
                        text: "All contact link to this contact group will be unlinked and it can't be UNDO !",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#EF5350",
                        confirmButtonText: "Yes, Delete!",
                        cancelButtonText: "No, cancel pls!",
                        closeOnConfirm: true,
                        closeOnCancel: true
                    },
                    function(isConfirm){
                        if (isConfirm) {
                            // Switch over to private.
                            var container = $('#panelGroupTable');
                            $(container).block({
                                message: '<i class="icon-spinner4 spinner"></i> Deleting contact group, please wait ......',
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
                                url:'/admin/contactgroup/delete',
                                type: 'POST',
                                data: {'gid':gid, '_token':csrf},
                                success: function(data){
                                    $(container).unblock();
                                    if(data.success){
                                        initTblGroup();
                                        swal({
                                            title: "Contact group deleted!",
                                            text: "Contact group: " + gname +" has been deleted from system.",
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
        }
    });
}

function addContactToGroup(gid, cid, cname, gname){
    $('#modal_manage_contactgroup #txtStatus').html('Adding ' + cname + ' to group: ' + gname);
    // Ajax call back to add contact to contact group.
    $.ajax({
        url: '/admin/contact/addtogroup',
        type: 'POST',
        data: {'cgid':gid, 'cid':cid, '_token':csrf},
        success: function(data){
            if(data.success){
                $('#modal_manage_contactgroup #txtStatus').html('Succeed added ' + cname + ' to group: ' + gname);
                tblContactsSimple.ajax.reload();
            }else{
                $('#modal_manage_contactgroup #txtStatus').html('Error!!! ' + data.errmsg);
            }
        }
    });
}

function removeContactFromGroup(gid, cid, cname, gname){
    $('#modal_manage_contactgroup #txtStatus').html('Removing ' + cname + ' from group: ' + gname);
    // Ajax call back to remove contact from contact group
    $.ajax({
        url: '/admin/contact/removefromgroup',
        type: 'POST',
        data: {'cgid':gid, 'cid':cid, '_token':csrf},
        success: function(data){
            if(data.success){
                $('#modal_manage_contactgroup #txtStatus').html('Succeed removed ' + cname + ' from group: ' + gname);
                tblContactsSimple.ajax.reload();
            }else{
                $('#modal_manage_contactgroup #txtStatus').html('Error!!! ' + data.errmsg);
            }
        }
    });
}