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
            //$table.colResizable();
            $th = $("<tr>").addClass("header ui-widget-header");
            $tr = $("<tr>").addClass("body ui-widget-content");
            
            $table.append($th);
            $table.append($tr);
            var columns = options.columns;
            var columnCount = options.columns.length;
            for(var i in columns) {
                $td_h = $("<td>").addClass("ui-widget-header").text(columns[i]);
                $th.append($td_h);
                
                $td_r = $("<td>").addClass("kanban-board-column ui-widget-content").attr({'id':columns[i]});
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
                    //tolerance: 'fit',
                    //helper: 'clone',
                    accept: ".kanban-issue",
                    hoverClass: "ui-state-highlight",
                    addClasses: false,
                    activate: function(event, ui) {
                        console.log('activate');
                        $(ui.draggable).zIndex(5000);
                        $("div.issue-1").each(function(key,value) {
                            $(value).zIndex(4999);
                            //$(value).animate({opacity: 0.0});
                        });
                    },
                    drop: function(event, ui) {
                        console.log('dropped to: ' + $(event.target).attr('id'));
                        
                        //$(event.target).children().each(function(){
                        //    console.log($(this).attr('id'));
                        //});
                        $(ui.draggable).appendTo($(event.target));
                        $(ui.draggable).css({'possition':'', 'top':'', 'left':''}); // clear 
                        //$(ui.draggable).removeAttr('style');
                        $(ui.draggable).zIndex(0);
                        //$(ui.draggable).css('top', ui.position.top);
                        //$(ui.draggable).css('left', ui.position.left);
                        //$(ui.draggable).hide();
                        
                        $(ui.draggable).effect("highlight", {}, 2000);
                        $("div.issue-1").each(function(key,value) {
                            $(value).appendTo($(event.target));
                            //moved to deactivate function
                            //$(value).css({'possition':'', 'top':'', 'left':''}); // clear 
                            //$(value).zIndex(0);
                            $(value).effect("highlight", {}, 2000);
                        });
                        
                        $(".kanban-issue").removeClass("ui-state-highlight");
                        /*
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
                        */
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
                    },
                    deactivate: function( event, ui ) {
                        console.log('deactivate');
                        $("div.issue-1").each(function(key,value) {
                                $(value).css({'possition':'', 'top':'', 'left':''}); // clear 
                                $(value).zIndex(0);
                                //$(value).animate({opacity: 1.0});
                        });
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
            
            this.append($table);
            
            //$table.colResizable({
                //liveDrag: true
            //});
            
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
            columns: ['TODO', 'Selected', 'Ongoing', 'Design', 'Troubleshooting', 'Done'],
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
            //TODO: shoudl be moved to better place
            //var initLeftOffset = []
            //        ,initTopOffset = [];	    
            var selectedList = [];
            this.click( function() {
                console.log('selected');
                $(this).toggleClass("ui-state-highlight");
                //$(this).hide();
                //selectedList.push($(this));
            });            
            
            this.draggable({
                revert: "invalid",
                revertDuration: 0,
                delay: 150,
                //containment: "document",
                //snap: ".kanban-issue", 
                //snapMode: "outer",
                //helper: "clone",
            //    start: function() { $(this).addClass("onTop"); },
            //    stop: function() { $(this).removeClass("onTop"); }
                ////start: function (event,ui) {
                ////    console.log("start");
                ////    var pos = $(this).position();
                ////    //var counter = 0;
                ////    $("div.issue-1").each(function(key,value) {
                ////        var elemPos = $(value).position();
                ////        $(value).zIndex(4999);
                ////        initLeftOffset[key] = elemPos.left - pos.left;
                ////        initTopOffset[key] = elemPos.top - pos.top;
                ////        //initLeftOffset[key] = pos.left + (counter++)*2;
                ////        //initTopOffset[key] = pos.top - (counter++)*1;
                ////    });
                ////},
                drag: function(event,ui) {
                    var pos = $(this).offset();
                    var lenght = $("div.issue-1").length;
                    $("div.issue-1").each(function(key,value) {
                        //$(value).offset({
                        //    left: pos.left + initLeftOffset[key], 
                        //    top: pos.top + initTopOffset[key]
                        //});	
                        $(value).offset({
                            left: pos.left + (lenght - key)*2, 
                            top: pos.top + (lenght - key)*2
                        });	                        
                    });
                }//,
                //stop: function(event,ui) {
                //    console.log("stop");
                //    var pos = $(this).offset();
                    //$("div.issue-1").each(function(key,value) {
                        //$(value).offset({
                        //    left: pos.left + initLeftOffset[key], 
                        //    top: pos.top + initTopOffset[key]
                        //});
                        
                        //$(value).appendTo($(event.target));
                        //$(value).css({'possition':'', 'top':'', 'left':''}); // clear 
                        //$(value).zIndex(0);
                    //});
                //},
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
