/*
* @Description: Kanban board is a plugin for jQuery to dislpay tasks/issues in kanban style. Date are fetched in JSON format.
* @Author: Michal Lapacz
* @Date: 04.12.2012
*/
(function($) {
	var methods = {
        init:function() {
            var options = this.data('kanban-board.options');
            var oldColumn = null;
            
            $table = $("<table>").addClass("kanban-board ui-widget-content ui-corner-all");
            $th = $("<tr>").addClass("header ui-widget-header");
            $tr = $("<tr>").addClass("body ui-widget-content");
            
            $table.append($th);
            $table.append($tr);
            var columns = options.columns;
            var columnCount = options.columns.length;
            for(var i in columns) {
                $td_h = $("<td>").addClass("ui-widget-header").text(columns[i]);
                $th.append($td_h);
                
                $td_r = $("<td>").addClass("kanban-board-column ui-widget-content")
                $td_r.css({width: 100/columnCount+"%"});
                
                //$td_r.selectable();
                /*$td_r.sortable({
                    connectWith: ".kanban-board-column",
                    placeholder: ".kanban-issue-placeholder",
                    start: function(event, ui) {
                        var element = $(ui.item[0]);
                        element.data('lastParent', element.parent());
                    },
                    stop: function(event, ui) {
                        $('.kanban-board-column').removeClass('kanban-board-column-highlight');
                        oldColumn = null;
                    },
                    change: function(event, ui) {
                        $('.kanban-board-column').removeClass('kanban-board-column-highlight');
                        $(this).addClass('kanban-board-column-highlight');
                    },
                    update: function(event, ui) {
                        
                        $(ui.item[0]).hide();
                        
                        var mylist = null;
                        
                        if(false) {
                            mylist = $(ui.item[0]).data('lastParent');
                            mylist.append(ui.item[0]);
                        }
                        else
                            mylist = $(this);
                        
                        var listitems = mylist.children('.kanban-issue').get();
                        
                        listitems.sort(function(a, b) {
                            var compA = parseInt($(a).attr("id"));
                            var compB = parseInt($(b).attr("id"));
                            return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
                        });        
                        $.each(listitems, function(idx, itm) {
                            //console.log("idx = "+idx+", itm = "+itm);
                            
                            mylist.append(itm);
                        });
                        
                        $(ui.item[0]).fadeIn('slow');
                    }
                });
                $td_r.disableSelection();*/
                $td_r.droppable({
                    accept: ".kanban-issue",
                    drop: function( event, ui ) {
                        
                        //$(ui.draggable).hide();
                        
                        var mylist = null;
                        
                        if(false) {
                            mylist = $(ui.draggable).data('lastParent');
                            mylist.append(ui.draggable);
                        }
                        else
                            mylist = $(this);
                        
                        var listitems = mylist.children('.kanban-issue').get();
                        
                        listitems.sort(function(a, b) {
                            
                            var compA = parseInt($(a).attr("id"));
                            var compB = parseInt($(b).attr("id"));
                            
                            return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
                        });        
                        $.each(listitems, function(idx, itm) {
                            mylist.remove(itm);
                        });
                        $.each(listitems, function(idx, itm) {
                            mylist.append(itm);
                        });
                        
                        //$(ui.draggable).fadeIn('slow');
                    
                    
                    
                        //$(this).find('.kanban-issue').sort().appendTo($(this));
                        //$(this)
                        //    .addClass( "ui-state-highlight" )
                        //    .html( "Dropped!" );
                        //ui.draggable.remove();
                        //ui.draggable.fadeOut();
                        //$(this).hide();
                        //$(this).append(ui.draggable);
                        //$(this).show();
                        //ui.draggable.fadeIn();
                        //ui.draggable.hide();
                        //$container = $(this);
                        //ui.draggable.appendTo($container);
                        //ui.draggable.show();
                    }
                });
                
                $kbIssue = $("<div>").kanbanIssue({heading: "Issue 1", type: "CSR", priority: 1});                
                $td_r.append($kbIssue);
                $kbIssue = $("<div>").kanbanIssue({heading: "Issue 2", type: "CSR", priority: 2});
                $td_r.append($kbIssue);
                $kbIssue = $("<div>").kanbanIssue({heading: "Issue 3", type: "TR", priority: 3});
                $td_r.append($kbIssue);
                $kbIssue = $("<div>").kanbanIssue({heading: "Issue 4", type: "other"});
                $td_r.append($kbIssue);
                $kbIssue = $("<div>").kanbanIssue({heading: "Issue 5", type: "TR"});
                $td_r.append($kbIssue);
                $kbIssue = $("<div>").kanbanIssue({heading: "Issue 6", type: "TR", priority: 4});
                $td_r.append($kbIssue);
                
                $tr.append($td_r);
            }
            
            this.addClass("ui-widget");
            
            //$table.colResizable();
            this.append($table);
            
            return this;
        },
        getRow:function() {
            if(this.is("tr"))
                return this;
            else
                if(this.is("body")) return null; //to avoid infinite loop
            return methods.getRow.apply(this.parent());
        }
    };
    $.fn.kanbanBoard = function(method, options) {
        /***** Options initialize *****/
        var defaultOptions = {
            columns: ['TODO', 'Selected', 'Ongoing', 'Desing', 'Troubleshooting', 'Done'],
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
        this.data('kanban-board.options', $.extend(defaultOptions, options));
        this.data('kanban-board.elements', elements);
        
        /***** Method resolving *****/
        if(methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || ! method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.kanban-board');
        } 
	};
})(jQuery);


(function($) {
	var methods = {
        init:function() {
            var options = this.data('kanban-issue.options');
            var $detailsContainer = $("<div>");
            
            if(!options.priority)
                options.priority = 3;
            this.attr({"id":options.priority});
            this.addClass("issue-"+options.priority);
            this.addClass("kanban-issue ui-widget ui-widget-content ui-corner-all");
            this.append($("<div>").text(options.heading));
            this.append($("<div>").text(options.type).addClass("type"));
            //this.sortable(
            //    connectWith: ".kanban-board-column"
            //);
            this.draggable({
                revert: "invalid",
                //containment: "document",
                //snap: ".kanban-issue", 
                //snapMode: "outer",
                //helper: "clone",
            //    start: function() { $(this).addClass("onTop"); },
            //    stop: function() { $(this).removeClass("onTop"); }
            });
            //this.disableSelection();
            
            this.dblclick(function() {
                $detailsContainer.dialog({
                    title: "[" + options.type + "] " + options.heading,
                    resizable: true,
                    height:600,
                    width:940,
                    modal: false,
                    buttons: {
                        "Save": function() {
                            $(this).dialog("close");
                        },
                        Cancel: function() {
                            $(this).dialog("close");
                        }
                    }
                });
            });          
            
           
            return this;
        }
    };
    $.fn.kanbanIssue = function(options) {
        method = null;
        /***** Options initialize *****/
        var defaultOptions = {
        
        };
        
        /***** Initialize elements *****/
        var elements = {
            container: {
                instance: this
            }
        };
        
        /***** Data initialize *****/
        this.data('kanban-issue.options', options);
        this.data('kanban-issue.elements', elements);
        
        /***** Method resolving *****/
        if(methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || ! method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.kanban-issue');
        } 
	};
})(jQuery);
