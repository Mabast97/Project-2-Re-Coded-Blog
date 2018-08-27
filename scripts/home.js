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
                    

            // $('#titleCount').html(response[i].title);
            // $('.writer').html(response[i].name);
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
                });
                //  $('footer').append([bEdit, bDelete]);
                //  $('.body').html(response[i].body);
                //  $('.card-text').html(response[i].comment);
                $('#hey').append(`<div class="wrapper"  id="row-${i}">\
                <div class="card" style="margin-top:20px;">\
                <div class="card-header">\
                  The <span id="titleCount">${response[i].title}</span> Title\
                  <div class="card-header">written by: <span class="writer">${response[i].name}</span></div>\
                </div>\
                <div class="card-body">\
                  <blockquote class="blockquote mb-0">\
                    <p class="body"> ${response[i].body}</p><hr/><hr/>\
                <div class="card-header"><span class="writer">${response[i].name}</span> Says : </div>\
                <div class="card-body border-info" style="background-color: lightgray;">\
                <h5 class="card-title"></h5>\
                <p class="card-text">${response[i].comment}</p>\
              </div>\
                    <footer class="blockquote-footer">You Can Edit or Delete !!!<div id="buttons"></div></footer>\
                  </blockquote>\
                </div>\
              </div>\
            </div>`).find(`#row-${i} footer`).append([bEdit, bDelete]);
                }
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