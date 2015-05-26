function OnePage(){
   
}

OnePage.amount = 0;
OnePage.current = 0;
OnePage.instance = null;
OnePage.elements = new Array();
OnePage.jq_elements = null;
OnePage.body;
OnePage.mode = 'fade';
OnePage.time = 400;
OnePage.window = $(window);
OnePage.viewport_height = 0;
OnePage.viewport_width = 0;

OnePage.start = function(selector){
    var els,el,i=0,mode,time;
    OnePage.body = $(document.body);
    OnePage.body.css({'position':'relative','margin':'0','padding':'0','overflow':'hidden'});

    OnePage.jq_elements = els = $(selector);
    OnePage.adjustSizeToViewport();
    
    if(OnePage.mode == 'fade'){
        els.each(function(){
            el = $(this);
            
            mode = el.attr('data-sn-mode');
            if(mode) mode = mode.toLowerCase();
            else mode = OnePage.mode;
            
            time = el.attr('data-sn-time');
            if(time) time = time.toLowerCase();
            else time = OnePage.time;
            
            el.css({'position':'absolute','top':0,'left':0,'z-index':(i+1),'overflow': 'hidden','width':'100%','height':'100%'});
            
            if(i > 0) el.css({'display':'none'});
            else{
              el.addClass('active');  
              el.css({'display':'block'});
            } 
            
            OnePage.elements.push([el,i,mode,time]);
            i++;
        });
    }
    
    OnePage.amount = els.length;
    
    OnePage.window.resize(function(){
        OnePage.adjustSizeToViewport();
    });
};

OnePage.adjustSizeToViewport = function (){
    OnePage.viewport_height = OnePage.window.height();
    OnePage.viewport_width = OnePage.window.width();

    OnePage.body.css('height',OnePage.viewport_height);
    OnePage.body.css('width',OnePage.viewport_width);
};

OnePage.next = function(){
    var temp = OnePage.current + 1;
    if(temp < OnePage.amount) OnePage.current = temp;
    else OnePage.current = 0;
    
    OnePage.toggle(OnePage.elements[OnePage.current]);
};

OnePage.previous = function(){
    var temp = OnePage.current - 1;
    if(temp >= 0) OnePage.current = temp;
    else OnePage.current = OnePage.amount - 1;
    
    OnePage.toggle(OnePage.elements[OnePage.current]);
};

OnePage.toggle = function(target){
    var mode = target[2];
    var time = target[3];
    var el,els = OnePage.elements, target_el, active, active_el;
    
    for(var k in els){
        el = $(els[k][0]);
        if(el.hasClass('active')){
            active_el = el;
            active = els[k];
            break;
        }
    }
    
    target_el = $(target[0]);

    if(mode == 'fade'){
        
        target_el.css({'bottom':'auto','top':'0px','left':'0px'});
        
        active_el.fadeOut(time);
        target_el.fadeIn(time);
    }
    
    else if(mode == 'vertical'){
        if(target[1] < active[1]){
            target_el.css({'top':-1 * OnePage.viewport_height,'bottom':'auto','display':'block'});
            active_el.css('top','auto');
        
            target_el.animate({top:0},time,function(){
                target_el.css('display','block');
            });
            
            active_el.animate({bottom: -1 * OnePage.viewport_height},time,function(){
                active_el.css('display','none');
            });
        }else{
            target_el.css({'bottom':-1 * OnePage.viewport_height,'top':'auto','display':'block'});
            
            target_el.animate({bottom:0},time,function(){
                target_el.css('display','block');
            });
            
            active_el.animate({top: -1 * OnePage.viewport_height},time,function(){
                active_el.css('display','none');
            });
        }
        
    }
    
    active_el.removeClass('active');
    target_el.addClass('active');
};