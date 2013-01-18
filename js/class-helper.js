var Class = function(parent) {
    var klass = function() {
	this.init.apply(this, arguments);
    };

    //Zmiana prototypu klass
    if(parent) {
        var subclass = function(){};
        subclass.prototype = parent.prototype;
        klass.prototype = new subclass;
    };

    //Definicja skrotow
    klass.prototype.init = function(){};
    klass.fn = klass.prototype;
    klass.fn.parent = klass;
    klass._super = klass.__proto__;
    
    //Dodanie wlasciwosci klasy
    klass.extend = function(obj) {
	var extended = obj.extended;
	for(var i in obj) {
	    klass[i] = obj[i];
	}
	if(extended) //callback 
	    extended(klass);
    };

    //Dodanie wlasciwosci instancji
    klass.include = function(obj) {
	var included = obj.included;
	for(var i in obj) {
	    klass.fn[i] = obj[i];
	}
	if(included) //callback
	    included(klass);
    }

    //Dodanie funckcji proxy
    klass.proxy = function(func){
	var self = this;
	return(function(){
	    return func.apply(self, arguments);
	});
    }
    //Dodanie funkcji rowniez do instancji
    klass.fn.proxy = klass.proxy;

    return klass;
};