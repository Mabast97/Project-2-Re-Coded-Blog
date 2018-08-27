    //GET (READ)
    $("#get-button").on('click', function(){
        $.ajax({
            url: 'http://localhost:3000/posts',
            method: 'GET',
            contentType: 'application/json',
            success: function(response)
            {
                let arr = [];
                for (let i=0; i<response.length; i++)
                {
            n = $('<tr>').append(`<td>${response[i].id}</td><td>${response[i].name}</td><td>${response[i].categoryId}</td>`);
            let bEdit = $('<button>').html('Edit').addClass('btn btn-secondary btn-outline-primary');
            let bDelete = $('<button>').html('Delete').addClass('btn btn-secondary btn-danger margin');
            bDelete.on('click', () => {
            axios.delete('http://localhost:3000/posts/'+response[i].id);
            $("#get-button").click(); 
                });

                bEdit.on("click",()=>{
                    let inputsArray = $("#create-form input")
                    inputsArray[0].value = response[i].title;
                    inputsArray[1].value = response[i].name;
                    inputsArray[2].value = response[i].categoryId;
                    $("#postBody").val(response[i].body);
                    $("#comment").val(response[i].comment);
                    let saveButton = $("<button>").html("SAVE").attr("type","button").addClass("btn btn-outline-primary btn-block btn-lg size").on('click', () => {
                        response[i].title = inputsArray[0].value;
                        response[i].name = inputsArray[1].value;
                        response[i].categoryId = inputsArray[2].value;
                        response[i].body = $('#postBody').val();
                        response[i].comment = $('#comment').val();

                        axios.put('http://localhost:3000/posts/'+response[i].id, response[i]);
                        saveButton.remove();
                        $("input,textarea").val("")
                        });
                        $('#create-form').append(saveButton);
                });
                n.append($('<td>').append([bEdit, bDelete])); 
                arr.push(n);
                }
                 $('tbody').html(arr);
            } 
        });
    });

$("#addButton").on("click",()=>{
    let postObj = {
        title:$("#postTitle").val(),
        name:$("#postOwner").val(),
        body:$("#postBody").val(),
        categoryId:$("#CategoryID").val(),
        comment:$("#comment").val()
    }
    $("input,textarea").val("")
    axios.post('http://localhost:3000/posts',postObj);
    $("#get-button").click();
});

$("#get-button").click();