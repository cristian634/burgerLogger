console.log("Script Loaded");

$(function(){
  
    $(".create-form").on("submit", function(event){
        event.preventDefault();
        
        var newBurger = {
            name: $("#newBurger").val().trim(),
            devoured: 0
        };
        console.log("submit clicked: " + newBurger);
        $.ajax("/api/burgers",{
            type: "POST",
            data: newBurger
        }).then(function(){
            console.log("new burger added");
            location.reload();
        });
    });

    $(".devour").on("click", function(event){
        var id = $(this).data("id");
        console.log(id + " clicked");   
        console.log($(this).data("devouring"));
        var changeDevour = $(this).data("devouring");
        var changeBool = {
            devoured: changeDevour
        };

        $.ajax("/api/burgers/"+id, {
            type: "PUT",
            data: changeBool
        }).then(function(){
            console.log("updated at id: " +id);
            location.reload();
        });
    });
});