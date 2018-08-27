    //GET (READ)
    $("#get-button").on('click', function(){
        $.ajax({
            url: 'http://localhost:3000/categories',
            method: 'GET',
            contentType: 'application/json',
            success: function(response)
            {
                let arr = [];
                for (let i=0; i<response.length; i++)
                {
            n = $('<tr>').append(`<td>${response[i].id}</td><td>${response[i].name}</td>`)
            let bEdit = $('<button>').html('Edit').addClass('btn btn-secondary btn-outline-primary');
            let bDelete = $('<button>').html('Delete').addClass('btn btn-secondary btn-danger margin');
            bDelete.on('click', () => {
            axios.delete('http://localhost:3000/categories/'+response[i].id);
            $("#get-button").click(); 
                });

                bEdit.on("click",()=>{
                    let input = $("#postName");
                    input.value = response[i].name;
                    let saveButton = $("<button>").html("SAVE").attr("type","button").addClass("btn btn-outline-primary btn-block btn-lg size").on('click', () => {
                        response[i].name = input.value;

                        axios.put('http://localhost:3000/categories/'+response[i].id, response[i]);
                        saveButton.remove();
                        $("input").val("")
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
    }
    axios.post('http://localhost:3000/categories',postObj);
    $("input,textarea").val("")
    $("#get-button").click();
});

$("#get-button").click();