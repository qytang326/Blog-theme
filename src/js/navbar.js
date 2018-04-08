    var $body   = document.body;
    var $toggle = document.querySelector(".navbar-toggle");
    var $navbar = document.querySelector("#Quanyinblog_navbar");
    var $collapse = document.querySelector(".navbar-collapse");
    var __QuanyinNav__ = {
        close: function(){
            $navbar.className = " ";
             
            setTimeout(function(){
                 
                if($navbar.className.indexOf("in") < 0) {
                    $collapse.style.height = "0px"
                }
            },400)
        },
        open: function(){
            $collapse.style.height = "auto";
            $navbar.className += " in";
        }
    };
     
    $toggle.addEventListener("click", function(e){
        if ($navbar.className.indexOf("in") > 0) {
            __QuanyinNav__.close()
        }else{
            __QuanyinNav__.open()
        }
    });
    

    document.addEventListener("click", function(e){
        if(e.target == $toggle) return;
        if(e.target.className == "icon-bar") return;
        __QuanyinNav__.close();
    })