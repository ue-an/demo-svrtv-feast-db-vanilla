var feastbookordersTbl = '';
$(function() {
    // draw function [called if the database updates]
    function draw_data() {
        if ($.fn.dataTable.isDataTable('#feastbook-orders-tbl') && feastbookordersTbl != '') {
         feastbookordersTbl.draw(true)
        } else {
            load_data_feastbook_orders();
        }
    }
 
    //Load Data
    function load_data_feastbook_orders() {
     feastbookproducts = $('#feastbook-orders-tbl').DataTable({
            dom: '<"row"B>flr<"py-2 my-2"t>ip',
            "processing": true,
            "serverSide": true,
            "ajax": {
                url: "./feastbooks_table/get_feastbook_orders.php",
                method: 'POST'
            },
            columns: [{
                    data: 'order_id',
                    className: 'py-0 px-1'
                },
                {
                    data: 'order_status',
                    className: 'py-0 px-1'
                },
                {
                    data: 'order_created',
                    className: 'py-0 px-1'
                },
                {
                    data: 'order_completed',
                    className: 'py-0 px-1'
                },
                {
                    data: null,
                    orderable: false,
                    className: 'text-center py-0 px-1',
                    render: function(data, type, row, meta) {
                        console.log()
                        return '<a class="me-2 btn btn-sm rounded-0 py-0 edit_data_feastbook_order btn-primary" href="javascript:void(0)" data-id="' + (row.order_id) + '">Edit</a><a class="btn btn-sm rounded-0 py-0 delete_data_feastbook_order btn-danger" href="javascript:void(0)" data-id="' + (row.order_id) + '">Delete</a>';
                    }
                }
            ],
            drawCallback: function(settings) {
                $('.edit_data_feastbook_order').click(function() {
                    $.ajax({
                        url: './feastbooks_table/get_single_feastbook_order.php',
                        data: { fborderID: $(this).attr('data-id') },
                        method: 'POST',
                        dataType: 'json',
                        error: err => {
                            alert("An error occured while fetching single data")
                        },
                        success: function(resp) {
                            if (!!resp.status) {
                                Object.keys(resp.data).map(k => {
                                    if ($('#edit_modal_feastbook_order').find('input[name="' + k + '"]').length > 0)
                                        $('#edit_modal_feastbook_order').find('input[name="' + k + '"]').val(resp.data[k])
                                })
                                $('#edit_modal_feastbook_order').modal('show')
                            } else {
                                alert("An error occured while fetching single data")
                            }
                        }
                    })
                })
                $('.delete_data_feastbook_order').click(function() {
                    $.ajax({
                        url: './feastbooks_table/get_single_feastbook_order.php',
                        data: { fborderID: $(this).attr('data-id') },
                        method: 'POST',
                        dataType: 'json',
                        error: err => {
                            alert("An error occured while fetching single data")
                        },
                        success: function(resp) {
                            if (!!resp.status) {
                                $('#delete_modal_feastbook_order').find('input[name="fborderID"]').val(resp.data['order_id'])
                                $('#delete_modal_feastbook_order').modal('show')
                            } else {
                                alert("An error occured while fetching single data")
                            }
                        }
                    })
                })
            },
            buttons: [{
                text: "Import/ Bulk Entry",
                className: "btn btn-primary fw-bold py-0",
                action: function(e, dt, node, config) {
                    $('#add_modal_feastbook_order').modal('show')
                }
            },
            {
                text: "Refresh",
                className: "btn btn-primary fw-bold py-0",
                action: function(e, dt, node, config) {
                    feastbookordersTbl.draw(true);
                }
            },
            //will add new button for single entry
            // {
            //     text: "Add Record",
            //     className: "btn btn-primary fw-bold py-0",
            //     action: function(e, dt, node, config) {
            //         $('#add_modal_single').modal('show')
            //     }
            // },
            ],
            "order": [
                [1, "asc"]
            ],
            initComplete: function(settings) {
                $('.paginate_button').addClass('p-1')
            }
        });
    }
    load_data_feastbook_orders();
    //Saving new Data (Bulk)
    $('#new-fborder-frm').submit(function(e) {
            e.preventDefault()
            var file_data = $('#file-feastbook-order')[0].files[0];
            var form_data = new FormData();
            form_data.append('#file-feastbook-order', file_data);
            if (file_data != undefined) {
                $('#add_modal_fborder button').attr('disabled', true)
                $('#add_modal_fborder button[form="new-fborder-frm"]').text("importing ...")
                $.ajax({  
                    url:"./feastbooks_table/import_feastbook_order.php",  
                    method:"POST",
                    data:new FormData(this),  
                    contentType:false,          // The content type used when sending data to the server.  
                    cache:false,                // To unable request pages to be cached  
                    processData:false,          // To send DOMDocument or non processed data file it is set to false 
                    error: err => {
                        alert("An error occured. Please check the source code and try again")
                    }, 
                    success: function(resp) {
                        const resp_arr = resp.split("}");
                        if (resp_arr.some(res => res.status === 'failed')) {
                            alert("add message here if found some 'failed' result");
                        } else {
                            var _el = $('<div>')
                                    _el.hide()
                                    _el.addClass('alert alert-primary alert_msg')
                                    _el.text("Data successfully imported");
                                    $('#new-fborder-frm').get(0).reset()
                                    $('.modal').modal('hide')
                                    $('#msg').append(_el)
                                    _el.show('slow')
                                    draw_data();
                                    setTimeout(() => {
                                        _el.hide('slow')
                                            .remove()
                                    }, 2500)
                        }
                        $('#add_modal_fborder button').attr('disabled', false)
                        $('#add_modal_fborder button[form="new-fborder-frm"]').text("Import")
                        $('#add_modal_fborder #file-feastbook-order').val('');
                    }
               })  
            }
            return false;
        })
        // Update Data
    $('#edit-fborder-frm').submit(function(e) {
            e.preventDefault()
            $('#edit_modal_fborder button').attr('disabled', true)
            $('#edit_modal_fborder button[form="edit-fborder-frm"]').text("saving ...")
            $.ajax({
                url: './feastbooks_table/update_data_feastbook_order.php',
                data: $(this).serialize(),
                method: 'POST',
                dataType: "json",
                error: err => {
                    alert("An error occured. Please check the source code and try again")
                    $('#edit-fborder-frm').get(0).reset()
                },
                success: function(resp) {
                    if (!!resp.status) {
                        if (resp.status == 'success') {
                            var _el = $('<div>')
                            _el.hide()
                            _el.addClass('alert alert-primary alert_msg')
                            _el.text("Data successfully updated");
                            $('#edit-fborder-frm').get(0).reset()
                            $('.modal').modal('hide')
                            $('#msg').append(_el)
                            _el.show('slow')
                            draw_data();
                            setTimeout(() => {
                                _el.hide('slow')
                                    .remove()
                            }, 2500)
                        } else if (resp.status == 'success' && !!resp.msg) {
                            var _el = $('<div>')
                            _el.hide()
                            _el.addClass('alert alert-danger alert_msg form-group')
                            _el.text(resp.msg);
                            $('#edit-fborder-frm').append(_el)
                            _el.show('slow')
                        } else {
                            alert("An error occured. Please check the source code and try again")
                            $('#edit-fborder-frm').get(0).reset()
                        }
                    } else {
                        alert("An error occurred. Please check the source code and try again")
                        $('#edit-fborder-frm').get(0).reset()
                    }
 
                    $('#edit_modal_fborder button').attr('disabled', false)
                    $('#edit_modal_fborder button[form="edit-fborder-frm"]').text("Save")
                    $('#edit-fborder-frm').get(0).reset()
                }
            })
        })
        // DELETE Data
    $('#delete-fborder-frm').submit(function(e) {
        e.preventDefault()
        $('#delete_modal_fborder button').attr('disabled', true)
        $('#delete_modal_fborder button[form="delete-fborder-frm"]').text("deleting data ...")
        $.ajax({
            url: './feastbooks_table/delete_data_feastbook_order.php',
            data: $(this).serialize(),
            method: 'POST',
            dataType: "json",
            error: err => {
                alert("An error occured. Please check the source code and try again")
                $('#delete-fborder-frm').get(0).reset()
            },
            success: function(resp) {
                if (!!resp.status) {
                    if (resp.status == 'success') {
                        var _el = $('<div>')
                        _el.hide()
                        _el.addClass('alert alert-primary alert_msg')
                        _el.text("Data successfully deleted");
                        $('#delete-fborder-frm').get(0).reset()
                        $('.modal').modal('hide')
                        $('#msg').append(_el)
                        _el.show('slow')
                        draw_data();
                        setTimeout(() => {
                            _el.hide('slow')
                                .remove()
                        }, 2500)
                    } else if (resp.status == 'success' && !!resp.msg) {
                        var _el = $('<div>')
                        _el.hide()
                        _el.addClass('alert alert-danger alert_msg form-group')
                        _el.text(resp.msg);
                        $('#delete-fborder-frm').append(_el)
                        _el.show('slow')
                    } else {
                        alert("An error occured. Please check the source code and try again")
                        $('#delete-fborder-frm').get(0).reset()
                    }
                } else {
                    alert("An error occurred. Please check the source code and try again")
                    $('#delete-fborder-frm').get(0).reset()
                }
 
                $('#delete_modal_fborder button').attr('disabled', false)
                $('#delete_modal_fborder button[form="delete-fborder-frm"]').text("YEs")
                $('#delete-fborder-frm').get(0).reset()
            }
        })
    })
});

