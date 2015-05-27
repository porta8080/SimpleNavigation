function SimpleNavigation(){}

(function(){
    var checker = function(){
        if(jQuery || 'jQuery' in window){
            window['jQuery'].simpleNavigation = function(selector,obj){
                SimpleNavigation.start(selector,obj);
            }
        }else setTimeout(function() { checker(); }, 125);
    }
    
    checker();
})();

SimpleNavigation.amount = 0;
SimpleNavigation.current = 0;
SimpleNavigation.instance = null;
SimpleNavigation.elements = new Array();
SimpleNavigation.hashed_elements = {};
SimpleNavigation.body;
SimpleNavigation.mode = 'fade';
SimpleNavigation.time = 400;
SimpleNavigation.window = $(window);
SimpleNavigation.viewport_height = 0;
SimpleNavigation.viewport_width = 0;

SimpleNavigation.start = function(selector,obj){
    if(!obj) obj = {};
    if(!selector) selector = '[data-sn]';
    
    var els,el,i=0,mode,time,ea;
    SimpleNavigation.body = $(document.body);
    SimpleNavigation.body.css({'position':'relative','margin':'0','padding':'0','overflow':'hidden'});

    els = $(selector);
    SimpleNavigation.adjustSizeToViewport();
    
    var default_mode = ('mode' in obj) ? obj.mode : SimpleNavigation.mode;
    var default_time = ('time' in obj) ? obj.time : SimpleNavigation.time;
    
    if(SimpleNavigation.mode == 'fade'){
        els.each(function(){
            el = $(this);
            
            mode = el.attr('data-sn-mode');
            if(mode) mode = mode.toLowerCase();
            else mode = default_mode;
            
            time = el.attr('data-sn-time');
            if(time) time = time.toLowerCase();
            else time = default_time;
            
            el.css({'position':'absolute','top':0,'left':0,'z-index':(i+1),'overflow': 'hidden','width':'100%','height':'100%'});
            
            if(i > 0) el.css({'display':'none'});
            else{
              el.addClass('active');  
              el.css({'display':'block'});
            }
            
            ea = [el,i,mode,time];
            
            if(el.id && el.id != '') SimpleNavigation.hashed_elements[el.id] = ea;
            SimpleNavigation.elements.push(ea);
            
            i++;
        });
    }
    
    SimpleNavigation.amount = els.length;
    
    SimpleNavigation.window.resize(function(){
        SimpleNavigation.adjustSizeToViewport();
    });
};

SimpleNavigation.adjustSizeToViewport = function (){
    SimpleNavigation.viewport_height = SimpleNavigation.window.height();
    SimpleNavigation.viewport_width = SimpleNavigation.window.width();

    SimpleNavigation.body.css('height',SimpleNavigation.viewport_height);
    SimpleNavigation.body.css('width',SimpleNavigation.viewport_width);
};

SimpleNavigation.next = function(){
    var temp = SimpleNavigation.current + 1;
    if(temp < SimpleNavigation.amount) SimpleNavigation.current = temp;
    else SimpleNavigation.current = 0;
    
    SimpleNavigation.toggle(SimpleNavigation.elements[SimpleNavigation.current]);
};

SimpleNavigation.previous = function(){
    var temp = SimpleNavigation.current - 1;
    if(temp >= 0) SimpleNavigation.current = temp;
    else SimpleNavigation.current = SimpleNavigation.amount - 1;
    
    SimpleNavigation.toggle(SimpleNavigation.elements[SimpleNavigation.current]);
};

SimpleNavigation.reset = function(element){
    element.css({'height':'100%','width':'100%',margin:'0px',top:'0px',left:'0px',right:'auto',bottom:'auto'});
}

SimpleNavigation.jump = function(target){
    if($.isNumeric(target)){
        if(target < 0) target = 0;
        else if(target >= SimpleNavigation.amount) target = SimpleNavigation.amount - 1;
        
        SimpleNavigation.current = target;
        target = SimpleNavigation.elements[SimpleNavigation.current];
    }else{
        if(target.charAt(0) == '#') target = target.slice(1);
        
        if(target in SimpleNavigation.hashed_elements){
            target = SimpleNavigation.hashed_elements[target];
            
            SimpleNavigation.current = target[1];
        }
    }
    
    SimpleNavigation.toggle(target);
}

SimpleNavigation.toggle = function(target){
    var mode = target[2];
    var time = target[3];
    var el,els = SimpleNavigation.elements, target_el, active, active_el;
    
    for(var k in els){
        el = $(els[k][0]);
        if(el.hasClass('active')){
            active_el = el;
            active = els[k];
            break;
        }
    }
    
    target_el = $(target[0]);
    
    SimpleNavigation.reset(active_el);
    SimpleNavigation.reset(target_el);
    
    if(mode == 'fade'){
        target_el.css({'bottom':'auto','top':'0px','left':'0px'});
        
        active_el.fadeOut(time);
        target_el.fadeIn(time);
    }
    
    else if(mode == 'vertical'){
        if(target[1] < active[1]){
            target_el.css({'top':-1 * SimpleNavigation.viewport_height,'display':'block'});
            active_el.css('top','auto');
        
            target_el.animate({top:0},time,function(){
                target_el.css('display','block');
            });
            
            active_el.animate({bottom: -1 * SimpleNavigation.viewport_height},time,function(){
                active_el.css('display','none');
            });
        }else{
            target_el.css({'bottom':-1 * SimpleNavigation.viewport_height,'top':'auto','display':'block'});
            
            target_el.animate({bottom:0},time,function(){
                target_el.css('display','block');
            });
            
            active_el.animate({top: -1 * SimpleNavigation.viewport_height},time,function(){
                active_el.css('display','none');
            });
        }
    }
    
    else if(mode == 'horizontal'){
        if(target[1] < active[1]){
            target_el.css({'left':-1 * SimpleNavigation.viewport_width,'display':'block'});
            active_el.css('left','auto');
        
            target_el.animate({left:0},time,function(){
                target_el.css('display','block');
            });
            
            active_el.animate({right: -1 * SimpleNavigation.viewport_width},time,function(){
                active_el.css('display','none');
            });
        }else{
            target_el.css({'right':-1 * SimpleNavigation.viewport_width,'left':'auto','display':'block'});
            
            target_el.animate({right:0},time,function(){
                target_el.css('display','block');
            });
            
            active_el.animate({left: -1 * SimpleNavigation.viewport_width},time,function(){
                active_el.css('display','none');
            });
        }
    }
    
    else if(mode == 'expand'){
        if(target[1] < active[1]){
            target_el.css({display:'block'});
            active_el.animate({right:'auto',bottom:'auto',width: '100px', height: '100px', top: '50%', left: '50%', 'margin-top': '-50px', 'margin-left': '-50px'}, time, function(){ 
                active_el.css({'display':'none'});
            });
        }else{
            target_el.css({width: '100px', height: '100px', top: '50%', left: '50%', 'margin-top': '-50px','margin-left': '-50px',display:'block'});
            target_el.animate({width: '100%', height: '100%', top: '0px', left: '0px', 'margin-top': '0','margin-left': '0'},time,function(){ 
                active_el.css({'display':'none'});
            });
        }
    }
    
    else if(mode == 'hide'){
        if(target[1] < active[1]){
            target_el.css({display:'block'});
            active_el.animate({top: SimpleNavigation.viewport_height}, time, function(){ 
                active_el.css({'display':'none'});
            });
        }else{
            target_el.css({top: SimpleNavigation.viewport_height, display:'block'});
            target_el.animate({top: '0px'},time,function(){ 
                active_el.css({'display':'none'});
            });
        }
    }
    
    active_el.removeClass('active');
    target_el.addClass('active');
};