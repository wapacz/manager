/*
* @Description: Kanban board is a plugin for jQuery to dislpay tasks/issues in kanban style. Date are fetched in JSON format.
* @Author: Michal Lapacz
* @Date: 04.12.2012
*/
(function($) {
	var methods = {
        init:function() {
            options = this.data('kanban.options');
        
            $table = $("<table>").css({'border': '1px solid black'});
            $th = $("<th>");
            $tr = $("<tr>");
            for(var i in options.columns) {
                $th.append($("<td>"));
                $tr.append($("<td>"));
            }
            $table.append($th);
            $table.append($tr);
            //this.text("kanban");
            
            this.append($table);
        },
        getRow:function() {
            if(this.is("tr"))
                return this;
            else
                if(this.is("body")) return null; //to avoid infinite loop
            return methods.getRow.apply(this.parent());
        }
    };
    $.fn.kanban = function(method, options) {
        /***** Options initialize *****/
        var defaultOptions = {
            dataLink: "json.php",
            data: "",
            checkboxColumn: true,
            showDetailsColumn: true
        };
        
        /***** Initialize elements *****/
        var elements = {
            container: {
                instance: this
            }
        };
        
        /***** Global variables *****/
        var menu = null;
        var contextmenu = null;
        
        /***** Data initialize *****/
        this.data('kanban.options', $.extend(defaultOptions, options));
        this.data('kanban.elements', elements);
        
        /***** Method resolving *****/
        if(methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || ! method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.tooltip');
        } 
	};
})(jQuery);
