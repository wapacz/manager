/*
 * @Description: Kanban board is a plugin for jQuery to dislpay tasks/issues in kanban style. Data are fetched in JSON format.
 * @Author: Michal Lapacz
 * @Date: 04.12.2012
 */
(function($) {
    var KBBoard = {
        options : {
            columns           : [],
            databaseUrl       : "database.php",
            data              : "",
            checkboxColumn    : true,
            showDetailsColumn : true
        },
        gui : {
            board : null,
            main : null,
            header : null,
            header_height : 20,
            footer : null,
            footer_height : 20,
            panels : []
        },
        init : function (args) {
            // save reference to main board container
            KBBoard.gui.board = this;
            
            KBBoard.gui.board.css({
                'position':'absolute',
                'top':'0px',
                'left':'0px',
                'background':'white',
                'padding-top':'1px',
                'padding-left':'0px'
            });
            
            //alert($(window).height()+' : '+ KBBoard.gui.board.height());
            
            // KBBoard.gui.header = $('<div>').css({
                            // 'background':'red',
                            // 'position':'relative',
                            // 'margin-right':'10px',
                            // 'background':'#dddddd'
                         // });
                         
            // KBBoard.gui.main = $('<div>').css({
                            // 'overflow':'auto',
                            // 'background':'green',
                            // 'position':'relative'
                        // });
                        
            // KBBoard.gui.footer= $('<div>').css({
                            // 'background':'red',
                            // 'position':'relative'
                        // });
            
            NOF_COLUMN = 5;
            for(var columnIndex=0; columnIndex<NOF_COLUMN; columnIndex++) {
                var panel = new KBPanel('id'+columnIndex, 'title'+columnIndex);
                KBBoard.gui.board.append(panel.$);
                
                
                KBBoard.gui.board.append($('<div>').addClass('panel-separator').css({'background':'red', 'width':'1px', 'float':'left'}));
                
                //alert(panel.$.width());
                //panel.$.width(100);
                //panel.$header.height(30);
                //panel.$body.height(300);
                
                
                //KBBoard.gui.header.append($('<div>').css({'float':'left','width':100/NOF_COLUMN+'%'}).text('aaa'));
                //KBBoard.gui.main.append($('<div>').css({'background':'yellow','float':'left','width':100/NOF_COLUMN+'%'}).text('bbb'));
            }
            
            
            var panel = new KBPanel('id2-1', 'title2-1');
            $('#id2').data('container').instance.$body.append(panel.$);

            var panel = new KBPanel('id2-2', 'title2-2');
            $('#id2').data('container').instance.$body.append(panel.$);   

            var panel = new KBPanel('id2-1-1', 'title2-2-1');
            $('#id2-1').data('container').instance.$body.append(panel.$);   

            var panel = new KBPanel('id2-1-2', 'title2-2-2');
            $('#id2-1').data('container').instance.$body.append(panel.$);   
            
            
            // KBBoard.gui.board.append(KBBoard.gui.header);
            // KBBoard.gui.board.append($('<div>').css({'width':'100%', 'height':'1px', 'cursor':'NS-resize'}));
            // KBBoard.gui.board.append(KBBoard.gui.main);
            // KBBoard.gui.board.append($('<div>').css({'width':'100%', 'height':'1px', 'cursor':'NS-resize'}));
            // KBBoard.gui.board.append(KBBoard.gui.footer);
            
            // for(var i=0; i<500; i++) {
                // KBBoard.gui.main.append($('<div>').css({'clear':'both'}).html('aaaa'+i+'<br /><br />'));
            // }
            
            Global.activateEvents();
        },
        resize : function(width, height) {
                var nofColumns = KBBoard.gui.board.children('div.panel').length;
                
                KBBoard.gui.board.width(width);
                KBBoard.gui.board.height(height);
                
                width=width-1;
                height=height-2;
                
                // KBBoard.gui.main.width($(window).width());
                // KBBoard.gui.header.width($(window).width());
                // KBBoard.gui.footer.width($(window).width());
                
                
                // KBBoard.gui.header.height(KBBoard.gui.header_height);
                // KBBoard.gui.main.height($(window).height()-KBBoard.gui.header_height-KBBoard.gui.footer_height-2);
                // KBBoard.gui.footer.height(KBBoard.gui.footer_height);
                
                // KBBoard.gui.main.width($(window).width());
                // KBBoard.gui.header.width($(window).width());
                // KBBoard.gui.footer.width($(window).width());
                
                KBBoard.gui.board.children('div.panel').each(function() {
                    var panel = $(this).data('container').instance;
                    panel.resize((width/nofColumns)-1, height, 60, 1);
                });        
        }
    };
    var KBPanel = function (id, name) {
        var self = this;
        self.name = name;
        self.id = id;
        
        self.$ = $('<div>').addClass('panel').css({'background':'white', 'float':'left', 'border-left':'1px solid white'}).attr('id',id).data('container', {'instance' : self});
        self.$header = $('<div>').css({'background':'red'}).text(name).data('container', {'instance' : self});
        self.$body = $('<div>').css({'background':'green', 'margin-top':'1px'}).data('container', {'instance' : self});
        
        self.$.append(self.$header);
        self.$.append(self.$body);
    };
    KBPanel.prototype = {
        getJQObject : function() {
            return this._panel;
        },
        resize : function(width, height, headerHeight, level) {
            self = this;
            self.$.width(width);
            self.$.height(height);
            
            
            var headerH = headerHeight/level;
            var headerHUp = headerHeight/(level+1);
            
            var columns = self.$body.children('div.panel');
            var nofColumns = columns.length;
            
            if(nofColumns > 0) {
                self.$header.height(headerHUp);
                self.$body.height(height-headerHUp-1);
            }
            else {
                self.$header.height(headerH);
                self.$body.height(height-headerH-1);
            }
            
            columns.each(function() {
                var panel = $(this).data('container').instance;
                panel.resize((width/nofColumns)-1, height-headerHUp-1, headerH-1, level+1);
            }); 
        },
        addPanel : function(panel) {
            self = this;
            self.$body.append(panel);
        }
    };
    var KBIssue = function (id, name) {
    };
    KBIssue.prototype = {
        getJQObject : function() {
            
        }
    };
    var Global = {
        
        activateEvents : function() {
            $(window).resize(function() {
                KBBoard.resize($(window).width(), $(window).height());
                KBBoard.resize($(window).width(), $(window).height());
            });
            $(window).resize(); // fire event on the begning
        }
    };
    $.fn.kanbanBoard = function(method, options) {
        
        /***** Data initialize *****/
        KBBoard.options = $.extend(KBBoard.options, options);
        
        /***** Method resolving *****/
        if(KBBoard[method]) {
            return KBBoard[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || ! method) {
            return KBBoard.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist in jQuery.kanban-board');
        } 
	};
})(jQuery);
