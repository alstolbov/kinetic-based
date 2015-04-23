// trace THIS

var object = {
　　name : 'foo',
　　getName : function(){ //closure
        return {
            a : 111,
            b : this.name, // variable th is avaliable in the inner scope
            c : function(){
                return this.b;
            }
        };
 　}
};

console.log(object.getName().b);