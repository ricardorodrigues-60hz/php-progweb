$(document).ready(function () {
    var page = 1;
    var current_page = 1;
    var total_page = 0;
    var is_ajax_fire = 0;
    var types = new Map();
    var dataCon;
    createHeadTable();
    createForm();
    createEditForm();
    manageData();

    function manageData() {

        $.ajax({
            dataType: 'json',
            url: 'getCategoria.php',
            data: {page: page}
        }).done(function (data) {
            total_page = Math.ceil(data.total / 10);
            current_page = page;
            $('#pagination').twbsPagination({
                totalPages: total_page,
                visiblePages: current_page,
                onPageClick: function (event, pageL) {
                    page = pageL;
                    if (is_ajax_fire != 0) {
                        getPageData();
                    }
                }
            });

            manageRow(data.data);
            is_ajax_fire = 1;
        });
    }

    function getPageData() {
        $.ajax({
            dataType: 'json',
            url: 'getCategoria.php',

            data: {page: page}
        }).done(function (data) {
            manageRow(data.data);
        });
    }

    function manageRow(data) {

        dataCon = data;
        var rows = '';
        var i = 0;
        $.each(data, function (key, value) {
            rows = rows + '<tr>';
            rows = rows + '<td>' + value.codcategoria + '</td>';
            rows = rows + '<td>' + value.descricao + '</td>';
            rows = rows + '<td data-id="' + i++ + '">';
            rows = rows + '<button data-toggle="modal" data-target="#edit-item" class="btn btn-primary edit-item">Editar</button> ';
            rows = rows + '<button class="btn btn-danger remove-item">Deletar</button>';
            rows = rows + '</td>';
            rows = rows + '</tr>';
        });

        $("tbody").html(rows);
    }
    function createHeadTable() {

        var rows = '<tr>';
        rows = rows + '<th> Código </th>';
        rows = rows + '<th> Descrição </th>';
        rows = rows + '<th width="200px">Ação</th>'
        rows = rows + '</tr>'
        $("thead").html(rows);
    }
    function createForm() {

        var html = '';
        html = html + '<div class="form-group">';
        html = html + '<label class="control-label" for="codcategoria">Código</label>';
        html = html + '<input type="text" name="codcategoria" class="form-control" data-error="Por favor entre com o codcategoria" required />';
        html = html + '<div class="help-block with-errors"></div>';
        html = html + '</div>';
        html = html + '<div class="form-group">';
        html = html + '<label class="control-label" for="descricao">Descrição</label>';
        html = html + '<input type="text" name="descricao" class="form-control" data-error="Por favor entre com o descricao" required />';
        html = html + '<div class="help-block with-errors"></div>';
        html = html + '</div>';
        html = html + '<div class="form-group">';
        html = html + '<label class="control-label" for="tempo">tempo</label>';
        html = html + '<input type="text" name="tempo" class="form-control" data-error="Por favor entre com o tempo" required />';
        html = html + '<div class="help-block with-errors"></div>';
        html = html + '</div>';
        html = html + '<div class="form-group">';
        html = html + '<label class="control-label" for="valMulta">valMulta</label>';
        html = html + '<input type="text" name="valMulta" class="form-control" data-error="Por favor entre com o valMulta" required />';
        html = html + '<div class="help-block with-errors"></div>';
        html = html + '</div>';
        html = html + '<div class="form-group">';
        html = html + '<button type="submit" class="btn crud-submit btn-success">Salvar</button>';
        html = html + '</div>';
        $("#create-item").find("form").html(html);
    }
    function createEditForm() {

        var html = '<input type="hidden" name="cod" class="edit-id">';
        html = html + '<div class="form-group">';
        html = html + '<label class="control-label" for="codcategoria">Código</label>';
        html = html + '<input type="text" name="codcategoria" class="form-control" data-error="Por favor entre com o codcategoria" required />';
        html = html + '<div class="help-block with-errors"></div>';
        html = html + '</div>';
        html = html + '<div class="form-group">';
        html = html + '<label class="control-label" for="descricao">Descrição</label>';
        html = html + '<input type="text" name="descricao" class="form-control" data-error="Por favor entre com o descricao" required />';
        html = html + '<div class="help-block with-errors"></div>';
        html = html + '</div>';
        html = html + '<div class="form-group">';
        html = html + '<label class="control-label" for="tempo">tempo</label>';
        html = html + '<input type="text" name="tempo" class="form-control" data-error="Por favor entre com o tempo" required />';
        html = html + '<div class="help-block with-errors"></div>';
        html = html + '</div>';
        html = html + '<div class="form-group">';
        html = html + '<label class="control-label" for="valMulta">valMulta</label>';
        html = html + '<input type="text" name="valMulta" class="form-control" data-error="Por favor entre com o valMulta" required />';
        html = html + '<div class="help-block with-errors"></div>';
        html = html + '</div>';
        html = html + '<div class="form-group">';
        html = html + '<button type="submit" class="btn crud-submit-edit btn-success">Salvar</button>';
        html = html + '</div>';
        $("#edit-item").find("form").html(html);

    }


    $(".crud-submit").click(function (e) {
        e.preventDefault();
        var form_action = $("#create-item").find("form").attr("action");
        var codcategoria = $("#create-item").find("input[name='codcategoria']").val();
        var descricao = $("#create-item").find("input[name='descricao']").val();
        var tempo = $("#create-item").find("input[name='tempo']").val();
        var valMulta = $("#create-item").find("input[name='valMulta']").val();

        $.ajax({
            dataType: 'json',
            type: 'POST',
            url: form_action,
            data: {codcategoria: codcategoria, descricao: descricao, tempo: tempo, valMulta: valMulta}
        }).done(function (data) {
            $("#create-item").find("input[name='codcategoria']").val('');
            $("#create-item").find("input[name='descricao']").val('');
            $("#create-item").find("input[name='tempo']").val('');
            $("#create-item").find("input[name='valMulta']").val('');
            $("#create-item").find("input[name='associados']").val('');
            getPageData();
            $(".modal").modal('hide');
            toastr.success(data.msg, 'Alerta de Sucesso', {timeOut: 5000});

        });

    });
    $("body").on("click", ".edit-item", function () {
        var index = $(this).parent("td").data('id');

        var codcategoria = dataCon[index].codcategoria;
        var descricao = dataCon[index].descricao;
        var tempo = dataCon[index].tempo;
        var valMulta = dataCon[index].valMulta;


        $("#edit-item").find("input[name='codcategoria']").val(codcategoria);
        $("#edit-item").find("input[name='descricao']").val(descricao);
        $("#edit-item").find("input[name='tempo']").val(tempo);
        $("#edit-item").find("input[name='valMulta']").val(valMulta);
    });

    $(".crud-submit-edit").click(function (e) {

        e.preventDefault();
        var form_action = $("#edit-item").find("form").attr("action");
        var codcategoria = $("#edit-item").find("input[name='codcategoria']").val();
        var descricao = $("#edit-item").find("input[name='descricao']").val();
        var tempo = $("#edit-item").find("input[name='tempo']").val();
        var valMulta = $("#edit-item").find("input[name='valMulta']").val();

        $.ajax({
            dataType: 'json',
            type: 'POST',
            url: form_action,
            data: {codcategoria: codcategoria, descricao: descricao, tempo: tempo, valMulta: valMulta}

        }).done(function (data) {

            getPageData();
            $(".modal").modal('hide');
            toastr.success(data.msg, 'Alerta de Sucesso', {timeOut: 5000});
        });


    });

    function getDataSelect(type, select) {

        $.ajax({
            dataType: 'json', url: 'Acesso' + type,
            data: {page: page}
        }).done(function (data) {
            manageSelectOption(data.data, select, type);
        });
    }


});
