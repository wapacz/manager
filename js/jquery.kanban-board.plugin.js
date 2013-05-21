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
            
            var $table = $("<table>").addClass("kanban-board ui-widget-content ui-corner-all");
            var $th = $("<tr>").addClass("header ui-widget-header");
            var $tr = $("<tr>").addClass("body ui-widget-content");
            
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
                $td_r.sortable({
                    connectWith: ".kanban-board-column",
                    placeholder: ".kanban-issue-placeholder",
                    start: function(event, ui) {
                        var element = $(ui.item[0]);
                        element.data('lastparent', element.parent());
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
                        //console.log("*");
                        //$(ui.item[0]).hide();
                        
                        var mylist = null;
                        
                        if(false) {
                            mylist = $(ui.item[0]).data('lastParent');
                            mylist.append(ui.item[0]);
                        }
                        else
                            mylist = $(this);
                        
                        var listitems = mylist.children('.kanban-issue').get();
                        
                        listitems.sort(function(a, b) {
                            var taskA = $(a).data('kanban-issue.task');
                            var taskB = $(b).data('kanban-issue.task');

                            var prioA = parseInt(taskA.priority);
                            var prioB = parseInt(taskB.priority);
                            var headA = taskA.heading.toLowerCase();
                            var headB = taskB.heading.toLowerCase();

                            //alert(headA<headB);
                            
                            return (prioA < prioB  ) ? -1 : (prioA > prioB) ? 1 : ( (headA < headB) ? -1 : 1 );
                        });        
                        $.each(listitems, function(idx, itm) {
                            //console.log("idx = "+idx+", itm = "+itm);
                            
                            mylist.append(itm);
                        });
                        
                        //$(ui.item[0]).fadeIn('slow');
                    }
                });
                $td_r.disableSelection();
                //$td_r.droppable({
                    //accept: ".kanban-issue",
                    //drop: function( event, ui ) {
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
                   // }
                //});
                
                $tr.append($td_r);
                
               
            }
                
            this.addClass("ui-widget");
            
            //$table.colResizable();
            this.append($table);
            
            methods.fetchData(this, $td_r);
            
            return this;
        },
        getRow:function() {
            if(this.is("tr"))
                return this;
            else
                if(this.is("body")) return null; //to avoid infinite loop
            return methods.getRow.apply(this.parent());
        },
        fetchData:function($container, $td) {
            var options = $container.data('kanban-board.options');
        
            $.ajax({
                type: "GET",
                dataType: "json",
                url: options.databaseUrl,
                async: true,
                cache: false,
                success: function(data) {
                    $.each(data, function(id, task) {
                        $td.append($("<div>").kanbanIssue(id, task));
                    });
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    refresh_modified();
                }
            });      
        }
    };
    $.fn.kanbanBoard = function(method, options) {
        /***** Options initialize *****/
        var defaultOptions = {
            columns           : [],
            databaseUrl       : "database.php",
            data              : "",
            checkboxColumn    : true,
            showDetailsColumn : true
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
        var options = $.extend(defaultOptions, options);
        this.data('kanban-board.options', options);
        this.data('kanban-board.elements', elements);
        
        /***** Method resolving *****/
        if(methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || ! method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist in jQuery.kanban-board');
        } 
	};
})(jQuery);


(function($) {
	var methods = {
        init:function(id, task) {
            //var options = this.data('kanban-issue.options');
            
            this.data('kanban-issue.task', task);
            
            var $detailsContainer = $("<div>");
            
            if(!task.priority)
                task.priority = 3;
            this.attr({"id":id});
            this.addClass("issue-"+task.priority);
            this.addClass("kanban-issue ui-widget ui-widget-content ui-corner-all");
            this.append($("<div>").text(task.heading));
            this.append($("<div>").text(task.type).addClass("type"));

            $detailsContainer.append($("<div>").text("Id: " + id));
            $detailsContainer.append($("<div>").text("Heading: " + task.heading));
            $detailsContainer.append($("<div>").text("Type: " + task.type));
            
            this.click(function() {
                $(this).css({"border": "1px red dotted", "background": "green"});
            });
            
            this.dblclick(function() {
                $detailsContainer.dialog({
                    title: "[" + task.type + "] " + task.heading,
                    resizable: true,
                    height:600,
                    width:940,
                    modal: false,
                    buttons: {
                        "Save": function() {
                            //TODO: save on server
                            $(this).dialog("close");
                        },
                        Cancel: function() {
                            $(this).dialog("close");
                        }
                    }
                })
            });          
            
           
            return this;
        }
    };
    $.fn.kanbanIssue = function(options) {
        method = null;
        /***** Options initialize *****/
        //var defaultOptions = {
        //
        //};
        
        /***** Initialize elements *****/
        //var elements = {
        //    container: {
        //        instance: this
        //    }
        //};
        
        /***** Data initialize *****/
        //this.data('kanban-issue.options', options);
        //this.data('kanban-issue.elements', elements);
        
        /***** Method resolving *****/
        if(methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || ! method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist in jQuery.kanban-issue');
        } 
	};
})(jQuery);
