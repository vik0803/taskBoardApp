define(function(){

    function render(parameters){
        var addDiv = document.getElementById('add-card');
        addDiv.innerHTML = '<div class="input-group"><span class="input-group-addon"><input id="card-type" type="checkbox"></span><input id="card-name" type="text" class="form-control" placeholder="If checked - bug"><span class="input-group-btn"><button id="add" class="btn btn-default" type="button">Add</button></span></div>';
    }

    return {
        render:render
    };
});
