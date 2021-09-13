var escenaActual="scene1";
$(function() {
//open image popup
    $('.open-image').on('click', function(){
        var scenaActual = $('.ipnrm-title').text();
        var aux;
        $( ".cls_mapa .punto_mapa" ).each(function( index ) {
            if($(this).data('area')== scenaActual){
                return aux = $(this);
            }
        });

        escenaActual = $(aux).data('sceneid');
        $('.punto_mapa').removeClass('select-scene');
        $(aux).addClass('select-scene');
        
    	showPopup($('#image-popup'));
    	return false;
    });
    
    $('.close-popup, .overlay-popup .close-layer').on('click', function(){
    	$('.overlay-popup.visible').removeClass('active');
    	setTimeout(function(){$('.overlay-popup.visible').removeClass('visible');}, 500);
    });

    function showPopup(id){
    	id.addClass('visible active');
    }
    
    $('.punto_mapa').on('click', function(){
        if(escenaActual!=$(this).data('sceneid')){
            $('.overlay-popup.visible').removeClass('active');
            setTimeout(function(){$('.overlay-popup.visible').removeClass('visible');}, 500);
            $("#mypanorama").ipanorama("loadscene", {sceneId: $(this).data('sceneid')});
        }
    });
});

