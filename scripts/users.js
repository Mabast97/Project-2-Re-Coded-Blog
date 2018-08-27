    //GET (READ)
    $("#get-button").on('click', function(){
        $.ajax({
            url: 'http://localhost:3000/users',
            method: 'GET',
            contentType: 'application/json',
            success: function(response)
            {
                let arr = [];
                for (let i=0; i<response.length; i++)
                {
            n = $('<tr>').append(`<td>${response[i].id}</td><td>${response[i].name}</td><td>${response[i].email}</td>`)
            let bEdit = $('<button>').html('Edit').addClass('btn btn-secondary btn-outline-primary');
            let bDelete = $('<button>').html('Delete').addClass('btn btn-secondary btn-danger margin');
            bDelete.on('click', () => {
            axios.delete('http://localhost:3000/users/'+response[i].id);
            $("#get-button").click(); 
                });

                bEdit.on("click",()=>{
                    let inputsArray = $("#create-form input")
                    inputsArray[0].value = response[i].name;
                    inputsArray[1].value = response[i].userName;
                    inputsArray[2].value = response[i].email;
                    $("textarea").val(response[i].body);
                    let saveButton = $("<button>").html("SAVE").attr("type","button").addClass("btn btn-outline-primary btn-block btn-lg size").on('click', () => {
                        response[i].title = inputsArray[0].value;
                        response[i].name = inputsArray[1].value;
                        response[i].email = inputsArray[2].value;
                        response[i].body = $('textarea').val();

                        axios.put('http://localhost:3000/users/'+response[i].id, response[i]);
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
        name:$("#postName").val(),
        userName:$("#postOwner").val(),
        email:$("#postEmail").val(),
        body:$("#postBody").val()
    }
    axios.post('http://localhost:3000/users',postObj);
    $("input,textarea").val("")
    $("#get-button").click();
});

$("#get-button").click();