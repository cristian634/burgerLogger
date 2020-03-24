console.log("Script Loaded");
$(function(){
  
    $(".subButton").on("submit", function(event){
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
        var changeDevour = $(this).data(devoured);
        var changeBool = {
            devoured: changeDevour
        };

        $.ajax("/api/burgeres/"+id, {
            type: "PUT",
            data: changeBool
        }).then(function(){
            console.log("updated at id: " +id);
            location.reload();
        })
    })
});