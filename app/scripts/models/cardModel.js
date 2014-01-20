define(function(){
     
    function Card(options){
        
        this.id = id || '';
        this.name = name || 'Default name';
        this.type = type || 'task';
        this.status = status || 'toDo';
    };

    return Card;
});