$(document).ready(function () {
    
    
    $(".click-here").on('click', function() {
        $(".custom-model-main").addClass('model-open');
      }); 
    $(".close-btn, .bg-overlay, .close__flag").click(function(){
    $(".custom-model-main").removeClass('model-open');
    });

    $('form').submit(function(e) {
        $('.error__validate').html('');
        $('.msg_text').html('');
        var form_id = $(this).find('[name=form_id]').val();
        var $form = $(this);
        if($form.attr('method').toUpperCase() == 'POST'){
            $.ajax({
                type: $form.attr('method'),
                url: $form.attr('action'),
                data: $form.serialize(),
                dataType: 'JSON',
                success: function(response){
                    if(response.redirect_url){
                        window.location.href = response.redirect_url;
                    }else if(response.TYPE == 'ERROR'){
                        $('.error__validate').html(response.MESSAGE);
                    }else if(response.TYPE == 'OK'){
                        $('.msg_text').html(response.MESSAGE);
                        if(form_id == 'forgot_password'){
                            $('#modal_forgot-password').removeClass('is-open');
                            $('#modal_check-your-email').addClass('is-open')
                        }
                    }
                }
            }).done(function() {
                console.log('success');
            }).fail(function() {
                console.log('fail');
            });
            //РѕС‚РјРµРЅР° РґРµР№СЃС‚РІРёСЏ РїРѕ СѓРјРѕР»С‡Р°РЅРёСЋ РґР»СЏ РєРЅРѕРїРєРё submit
            e.preventDefault(); 
        }
    });
    
    $('#DONT_SHOW_NAME').on('change', function(){
        console.log($(this).is(':checked'));
        var checked = ($(this).is(':checked')) ? 1 : 0;
        
        $.ajax({
            type: 'post',
            url: '/ajax/action.php',
            data: {'form_id' : 'DONT_SHOW_NAME', 'value' : checked},
            success: function(response){
                console.log(response);
            }
        }).done(function() {
            console.log('success');
        }).fail(function() {
            console.log('fail');
        });
    });
    
    $('#TAB_BIDS_SELECT').on('change', function(){
        $('.tab_bids').hide();
        $('#'+$(this).val()).show();
    });
    
    $('#TAB_INVOICES_SELECT').on('change', function(){
        $('.tab_invoices').hide();
        $('#'+$(this).val()).show();
    });
    
    $('button').on('click', function(){
        if($(this).data('href')){
            var href = $(this).data('href');
            console.log(href);
            if(href){
                window.location = href;
            }
        }else if($(this).data('action')){
            console.log($(this).data('action'));
            var url = $(this).data('action');
            var method = $(this).data('method');
            var target = $(this).data('target');
            if(method == 'get'){
                $.get( url, {}, function( data ) { //  РїРµСЂРµРґР°РµРј Рё Р·Р°РіСЂСѓР¶Р°РµРј РґР°РЅРЅС‹Рµ СЃ СЃРµСЂРІРµСЂР° СЃ РїРѕРјРѕС‰СЊСЋ HTTP Р·Р°РїСЂРѕСЃР° РјРµС‚РѕРґРѕРј GET
                    //console.log(data); // РІСЃС‚Р°РІР»СЏРµРј РІ СЌР»РµРјРµРЅС‚ <div> РґР°РЅРЅС‹Рµ, РїРѕР»СѓС‡РµРЅРЅС‹Рµ РѕС‚ СЃРµСЂРІРµСЂР°
                    $('#content_payment_information').html(data);
                    $(''+target+'').addClass('is-open');
                });
            }else{
                $.ajax({
                    url: url,
                    method: method,
                    dataType: 'json',
                    //data: {text: 'РўРµРєСЃС‚'},
                    success: function(response){
                        if(response.result === 'true'){
                            location.reload();
                        }
                    }
                });
            }
        }
    });
    
    $('[name=FILTER_STATUS]').on('change', function(){
        var val = $(this).data('href');
        window.location = val;
    });
    
    $('#FILTER_CATEGORY').on('change', function(){
        console.log('FILTER_CATEGORY');
        var val = $(this).val();
        console.log(val);
        window.location = val;
    });
    
    $(document).on('click', '.showItem', function (e) {
        e.preventDefault();
        var item_id = $(this).data('elementId');
        var modal_id = $(this).data('modal');
        $.ajax({
            type: 'post',
            url: '/ajax/showItem.php',
            data: {'item_id' : item_id},
            dataType: 'json',
            success: function(response){
                console.log(response.PROPERTY_7.TEXT);
                $('.mName').html(response.NAME);
                $('.mProperty_7').html(response.PROPERTY_7);
                $('.mProperty_1').html(response.PROPERTY_1);
                $('.mProperty_2').html(response.PROPERTY_2);
                $('.mProperty_3').html(response.PROPERTY_3);
                $('.mProperty_4').html(response.PROPERTY_4);
                $('.mProperty_5').html(response.PROPERTY_5);
                $('.mProperty_6').html(response.PROPERTY_6);
                $('.mProperty_42').html(response.PROPERTY_42);
                $('.mProperty_43').html(response.PROPERTY_43);
                $('.timeLeft').html(response.TIME_LEFT);
                $('.dscr').html(response.DSCR);
                
                $('.mProperty_8').html('');
                var bSlick = false;
                $.each(response.IMAGES, function (i, src){
                    console.log(i, src);
                    $('.mProperty_8').append('<div>\
                        <div class="slide__img"><img src="'+src+'" alt=""></div>\
                    </div>');
                    bSlick = true;
                });
                
                console.log(bSlick);
                
                if(bSlick){
                    try{
                        $('.slide-nxt').slick({
                            slidesToShow: 1,
                            infinite: false,
                            slidesToScroll: 1,
                            arrows: true
                        });
                    }catch(e){
                        console.log(e);
                    }
                }
                $('.listBids').html('');
                $.each(response.LIST_BID, function (i, BID){
                    console.log(i, BID);
                    $('.listBids').append('<li>\
                            <a class="confirm-max-bind" data-bid="'+BID.BID+'" data-modal="modal_confirm-max-bind" data-element-id="'+item_id+'" >CHF '+BID.FORMATED+'</a>\
                        </li>');
                    bSlick = true;
                });
                
                console.log(modal_id);
                $('#modal_'+modal_id).addClass('is-open');
            }
        }).done(function() {
            console.log('success');
        }).fail(function() {
            console.log('fail');
        });
    });
    
    $(document).on('click', '.confirm-max-bind', function (e) {
        var elementId = $(this).data('elementId');
        var bid = $(this).data('bid');
        $('.setMaxBid').data('bid', bid);
        $('.setMaxBid').data('elementId', elementId);
        $('.maxBid').html($(this).html());
        $('.dialog').show();
        $('.dialog').css('z-index', '99999');
    });

    $(document).on('click', '.close-modal-btn', function (e) {
        $('.dialog').hide();
    });
    
    
    $(document).on('click', '.verifyAcc, .popUp', function (e) {
        e.preventDefault();
        $.modal.close();
        $.get(this.href, function (data) {
            modal = $(data).appendTo('body').modal({
                fadeDuration: 100,
                closeExisting: false,
                escapeClose: false,
                closeClass: 'mdi mdi-close',
                closeText: ''
            });

            modal.on($.modal.AFTER_CLOSE, function (event, modal) {
                modal.elm.remove();
            });
        });
    });
    
    $(document).on('change', '[name="UF_DELIVERY"]', function (e) {
        if ($(this).val() == 2) {
            $('#AnotherAdressShow').find('input').each(function(i, el){
                $(el).prop('required', true);
            });
            $('#AnotherAdressShow').fadeIn();
        } else {
            $('#AnotherAdressShow').fadeOut();
            $('#AnotherAdressShow').find('input').each(function(i, el){
                $(el).prop('required', false);
            });
        }
    });
    
    $(document).on('change', '[name="UF_TYPE"]', function (e) {
        console.log($(this).val());
        if ($(this).val() == 5){
            $('#WORK_COMPANY').find('input').prop('required', true);
            $('#WORK_COMPANY').fadeIn();
        }else{
            $('#WORK_COMPANY').fadeOut();
            $('#WORK_COMPANY').find('input').prop('required', false);
        }
    });
    
    $('.selected-item .text').on('change', function(){
        $(this).text();
    });
    
    $(document).on('click', '.setMaxBid', function(){
        var item_id = $(this).data('elementId');
        var bid = $(this).data('bid');
        $.ajax({
            type: 'post',
            url: '/local/templates/konstantin_chaikin/ajax/place_timebid.php',
            data: {'id' : item_id, 'bid' : bid},
            dataType: 'json',
            success: function(response){
                console.log(response);
                location.reload();
            }
        }).done(function() {
            console.log('success');
        }).fail(function() {
            console.log('fail');
        });
    });
    
    
    
    

    var dropdowns = $(".dropdown");

// Onclick on a dropdown, toggle visibility
    dropdowns.find("dt").click(function () {
        dropdowns.find("dd ul").hide();
        $(this).next().children().toggle();
    });

// Clic handler for dropdown
    dropdowns.find("dd ul li a").click(function () {
        var leSpan = $(this).parents(".dropdown").find("dt a span");

        // Remove selected class
        $(this).parents(".dropdown").find('dd a').each(function () {
            $(this).removeClass('selected');
        });

        // Update selected value
        leSpan.html($(this).html());

        // If back to default, remove selected class else addclass on right element
        if ($(this).hasClass('default')) {
            leSpan.removeClass('selected');
        } else {
            leSpan.addClass('selected');
            $(this).addClass('selected');
        }

        // Close dropdown
        $(this).parents("ul").hide();
    });

// Close all dropdown onclick on another element
    $(document).bind('click', function (e) {
        if (!$(e.target).parents().hasClass("dropdown"))
            $(".dropdown dd ul").hide();
    });


    $('.chaikin-gallery__item').mouseenter(function () {
        $(this).addClass('chaikin-gallery__item_active');
        $(this).prev().addClass('chaikin-gallery__item_near');
        $(this).next().addClass('chaikin-gallery__item_near');
    });
    $('.chaikin-gallery__item').mouseleave(function () {
        $('.chaikin-gallery__item').removeClass('chaikin-gallery__item_active chaikin-gallery__item_near');
    });





    $('.chaikin-gallery').on('mousemove', function (e) {
        wrapWidth = $('.chaikin-gallery').width();
        slidesWidth = $('.chaikin-gallery__inner').width();
        slides = $('.chaikin-gallery__inner');

        rangeX = Math.round(slidesWidth - wrapWidth);

        mouseX = e.pageX;

        offset = mouseX / wrapWidth * slidesWidth - mouseX;

        console.log(slidesWidth);

        slides.css({
            '-webkit-transform': 'translate3d(' + -offset + 'px,0,0)',
            'transform': 'translate3d(' + -offset + 'px,0,0)'
        });
    });

    $(".ft__block").hover(function () { // Р·Р°РґР°РµРј С„СѓРЅРєС†РёСЋ РїСЂРё РЅР°РІРµРґРµРЅРёРё РєСѓСЂСЃРѕСЂР° РЅР° СЌР»РµРјРµРЅС‚   
        $(".main").css("visibility", "visible");
        $(".main").css("opacity", "1");
        $(".clock__img").css("opacity", "0");
        $(".privacy__policy").css("display", "none");
        $(".copyright").css("display", "none");
        $(".slogan").css("opacity", "0");
        $(".header__about").css("opacity", "0");
        $(".slogan").css("transition", "0.3s");
        $(".main__block__title").css("transition", "0.3s");


    }, function () {// Р·Р°РґР°РµРј С„СѓРЅРєС†РёСЋ, РєРѕС‚РѕСЂР°СЏ СЃСЂР°Р±Р°С‚С‹РІР°РµС‚, РєРѕРіРґР° СѓРєР°Р·Р°С‚РµР»СЊ РІС‹С…РѕРґРёС‚ РёР· СЌР»РµРјРµРЅС‚Р°  


    });

    $(".header__container").hover(function () { // Р·Р°РґР°РµРј С„СѓРЅРєС†РёСЋ РїСЂРё РЅР°РІРµРґРµРЅРёРё РєСѓСЂСЃРѕСЂР° РЅР° СЌР»РµРјРµРЅС‚   
        $(".main").css("visibility", "hidden");
        $(".main").css("opacity", "0");
        $(".privacy__policy").css("display", "block");
        $(".copyright").css("display", "block");
        $(".clock__img").css("opacity", "1");

        $(".slogan").css("opacity", "1");
        $(".section__video-bg").css("opacity", "1");

        $(".header__about").css("opacity", "1");
        $(".slogan").css("transition", "0.3s");
        $(".main__block__title").css("transition", "0.3s");

    }, function () {// Р·Р°РґР°РµРј С„СѓРЅРєС†РёСЋ, РєРѕС‚РѕСЂР°СЏ СЃСЂР°Р±Р°С‚С‹РІР°РµС‚, РєРѕРіРґР° СѓРєР°Р·Р°С‚РµР»СЊ РІС‹С…РѕРґРёС‚ РёР· СЌР»РµРјРµРЅС‚Р°  


    });








    $(".chaikin-gallery__item").hover(function () { // Р·Р°РґР°РµРј С„СѓРЅРєС†РёСЋ РїСЂРё РЅР°РІРµРґРµРЅРёРё РєСѓСЂСЃРѕСЂР° РЅР° СЌР»РµРјРµРЅС‚   



    }, function () { // Р·Р°РґР°РµРј С„СѓРЅРєС†РёСЋ, РєРѕС‚РѕСЂР°СЏ СЃСЂР°Р±Р°С‚С‹РІР°РµС‚, РєРѕРіРґР° СѓРєР°Р·Р°С‚РµР»СЊ РІС‹С…РѕРґРёС‚ РёР· СЌР»РµРјРµРЅС‚Р°  

    });






    $(".product__block").hover(function () { // Р·Р°РґР°РµРј С„СѓРЅРєС†РёСЋ РїСЂРё РЅР°РІРµРґРµРЅРёРё РєСѓСЂСЃРѕСЂР° РЅР° СЌР»РµРјРµРЅС‚   

        $(".product__inner").css("opacity", "1");
        $(".product__block img").css("transform", "scale(1.1)");
        $(".product__block img").css("transition", "0.4s");


    }, function () { // Р·Р°РґР°РµРј С„СѓРЅРєС†РёСЋ, РєРѕС‚РѕСЂР°СЏ СЃСЂР°Р±Р°С‚С‹РІР°РµС‚, РєРѕРіРґР° СѓРєР°Р·Р°С‚РµР»СЊ РІС‹С…РѕРґРёС‚ РёР· СЌР»РµРјРµРЅС‚Р°  
        $(".product__inner").css("opacity", "0");
        $(".product__block img").css("transform", "scale(1)");
        $(".product__block img").css("transition", "0.4s");
    });






    $(".product__block2").hover(function () { // Р·Р°РґР°РµРј С„СѓРЅРєС†РёСЋ РїСЂРё РЅР°РІРµРґРµРЅРёРё РєСѓСЂСЃРѕСЂР° РЅР° СЌР»РµРјРµРЅС‚   

        $(".product__inner2").css("opacity", "1");
        $(".product__block2 img").css("transform", "scale(1.1)");
        $(".product__block2 img").css("transition", "0.4s");



    }, function () { // Р·Р°РґР°РµРј С„СѓРЅРєС†РёСЋ, РєРѕС‚РѕСЂР°СЏ СЃСЂР°Р±Р°С‚С‹РІР°РµС‚, РєРѕРіРґР° СѓРєР°Р·Р°С‚РµР»СЊ РІС‹С…РѕРґРёС‚ РёР· СЌР»РµРјРµРЅС‚Р°  
        $(".product__inner2").css("opacity", "0");
        $(".product__block2 img").css("transform", "scale(1)");
        $(".product__block2 img").css("transition", "0.4s");
    });

    $(".product__block3").hover(function () { // Р·Р°РґР°РµРј С„СѓРЅРєС†РёСЋ РїСЂРё РЅР°РІРµРґРµРЅРёРё РєСѓСЂСЃРѕСЂР° РЅР° СЌР»РµРјРµРЅС‚   

        $(".product__inner3").css("opacity", "1");
        $(".product__block3 img").css("transform", "scale(1.1)");
        $(".product__block3 img").css("transition", "0.4s");



    }, function () { // Р·Р°РґР°РµРј С„СѓРЅРєС†РёСЋ, РєРѕС‚РѕСЂР°СЏ СЃСЂР°Р±Р°С‚С‹РІР°РµС‚, РєРѕРіРґР° СѓРєР°Р·Р°С‚РµР»СЊ РІС‹С…РѕРґРёС‚ РёР· СЌР»РµРјРµРЅС‚Р°  
        $(".product__inner3").css("opacity", "0");
        $(".product__block3 img").css("transform", "scale(1)");
        $(".product__block3 img").css("transition", "0.4s");
    });




    $(".product__block4").hover(function () { // Р·Р°РґР°РµРј С„СѓРЅРєС†РёСЋ РїСЂРё РЅР°РІРµРґРµРЅРёРё РєСѓСЂСЃРѕСЂР° РЅР° СЌР»РµРјРµРЅС‚   

        $(".product__inner4").css("opacity", "1");
        $(".product__block4 img").css("transform", "scale(1.1)");
        $(".product__block4 img").css("transition", "0.4s");



    }, function () { // Р·Р°РґР°РµРј С„СѓРЅРєС†РёСЋ, РєРѕС‚РѕСЂР°СЏ СЃСЂР°Р±Р°С‚С‹РІР°РµС‚, РєРѕРіРґР° СѓРєР°Р·Р°С‚РµР»СЊ РІС‹С…РѕРґРёС‚ РёР· СЌР»РµРјРµРЅС‚Р°  
        $(".product__inner4").css("opacity", "0");
        $(".product__block4 img").css("transform", "scale(1)");
        $(".product__block4 img").css("transition", "0.4s");
    });


    $(".product__block5").hover(function () { // Р·Р°РґР°РµРј С„СѓРЅРєС†РёСЋ РїСЂРё РЅР°РІРµРґРµРЅРёРё РєСѓСЂСЃРѕСЂР° РЅР° СЌР»РµРјРµРЅС‚   

        $(".product__inner5").css("opacity", "1");
        $(".product__block5 img").css("transform", "scale(1.1)");
        $(".product__block5 img").css("transition", "0.4s");



    }, function () { // Р·Р°РґР°РµРј С„СѓРЅРєС†РёСЋ, РєРѕС‚РѕСЂР°СЏ СЃСЂР°Р±Р°С‚С‹РІР°РµС‚, РєРѕРіРґР° СѓРєР°Р·Р°С‚РµР»СЊ РІС‹С…РѕРґРёС‚ РёР· СЌР»РµРјРµРЅС‚Р°  
        $(".product__inner5").css("opacity", "0");
        $(".product__block5 img").css("transform", "scale(1)");
        $(".product__block5 img").css("transition", "0.4s");
    });

    $(".product__block6").hover(function () { // Р·Р°РґР°РµРј С„СѓРЅРєС†РёСЋ РїСЂРё РЅР°РІРµРґРµРЅРёРё РєСѓСЂСЃРѕСЂР° РЅР° СЌР»РµРјРµРЅС‚   

        $(".product__inner6").css("opacity", "1");
        $(".product__block6 img").css("transform", "scale(1.1)");
        $(".product__block6 img").css("transition", "0.4s");



    }, function () { // Р·Р°РґР°РµРј С„СѓРЅРєС†РёСЋ, РєРѕС‚РѕСЂР°СЏ СЃСЂР°Р±Р°С‚С‹РІР°РµС‚, РєРѕРіРґР° СѓРєР°Р·Р°С‚РµР»СЊ РІС‹С…РѕРґРёС‚ РёР· СЌР»РµРјРµРЅС‚Р°  
        $(".product__inner6").css("opacity", "0");
        $(".product__block6 img").css("transform", "scale(1)");
        $(".product__block6 img").css("transition", "0.4s");
    });


    $(".category__img").hover(function () { // Р·Р°РґР°РµРј С„СѓРЅРєС†РёСЋ РїСЂРё РЅР°РІРµРґРµРЅРёРё РєСѓСЂСЃРѕСЂР° РЅР° СЌР»РµРјРµРЅС‚   


        $(".category__img img").css("transform", "scale(1.1)");
        $(".category__img img").css("transition", "0.4s");



    }, function () { // Р·Р°РґР°РµРј С„СѓРЅРєС†РёСЋ, РєРѕС‚РѕСЂР°СЏ СЃСЂР°Р±Р°С‚С‹РІР°РµС‚, РєРѕРіРґР° СѓРєР°Р·Р°С‚РµР»СЊ РІС‹С…РѕРґРёС‚ РёР· СЌР»РµРјРµРЅС‚Р°  

        $(".category__img img").css("transform", "scale(1)");
        $(".category__img img").css("transition", "0.7s");
    });



    $(".ft__block2").hover(function () { // Р·Р°РґР°РµРј С„СѓРЅРєС†РёСЋ РїСЂРё РЅР°РІРµРґРµРЅРёРё РєСѓСЂСЃРѕСЂР° РЅР° СЌР»РµРјРµРЅС‚   

        $(".privacy__policy").css("opacity", "1");
        $(".privacy__policy").css("transition", "0.7s");




    }, function () { // Р·Р°РґР°РµРј С„СѓРЅРєС†РёСЋ, РєРѕС‚РѕСЂР°СЏ СЃСЂР°Р±Р°С‚С‹РІР°РµС‚, РєРѕРіРґР° СѓРєР°Р·Р°С‚РµР»СЊ РІС‹С…РѕРґРёС‚ РёР· СЌР»РµРјРµРЅС‚Р°  


        $(".privacy__policy").css("opacity", "0");
        $(".privacy__policy").css("transition", "0.7s");
    });




    let triggersModal = document.querySelectorAll(".js-show-modal");
    let modals = document.querySelectorAll(".js-modal");
    
    

    function closeModal() {
        modals.forEach(modal => {
            if (modal.classList.contains("is-open")) {
                modal.classList.remove("is-open");
            }
        });
    }


    modals.forEach(modal => {
        modal.addEventListener("click", function (event) {
            const isOutside = !event.target.closest(".modal__inner");
            const isCloseButton = event.target.matches(".js-close-modal");
            if (isCloseButton || isOutside) {
                closeModal();
            }
        });
    });

    triggersModal.forEach((button) =>
        button.addEventListener("click", function (e) {
            e.preventDefault();
            let modalID = this.dataset.modal;
            console.log(modalID);
            modals.forEach(function (modal) {
                if (modal.dataset.modal == modalID) {
                    modal.classList.add("is-open");
                }
            });
        }));




    $('.slider-for').slick({
        slidesToShow: 1,
        infinite: false,
        draggable: false,
        slidesToScroll: 1,
        arrows: true,
        asNavFor: '.slider-nav',

        responsive: [

            {
                breakpoint: 768,
                settings: "unslick"
            }
        ]
    });


    $('.slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,

        asNavFor: '.slider-for',

        arrows: true,
        dots: false,

        focusOnSelect: true,
        responsive: [

            {
                breakpoint: 768,
                settings: "unslick"
            }
        ]
    });



    $('.slider-for2').slick({
        slidesToShow: 1,
        infinite: false,
        draggable: false,
        slidesToScroll: 1,
        arrows: true,
        asNavFor: '.slider-nav2',

        responsive: [

            {
                breakpoint: 768,
                settings: "unslick"
            }
        ]
    });


    $('.slider-nav2').slick({
        slidesToShow: 3,
        slidesToScroll: 1,

        asNavFor: '.slider-for2',

        arrows: true,
        dots: false,

        focusOnSelect: true,
        responsive: [

            {
                breakpoint: 768,
                settings: "unslick"
            }
        ]
    });





    $('.responsive').slick({
        slidesToShow: 1,
        infinite: false,
        slidesToScroll: 1,
        arrows: true
    });

    


    $('.last').click(function () {
        var slider = $('.slider-nav');
        slider[0].slick.slickGoTo(parseInt(3));
    });

    const burger = document.querySelector('.burger');
    const navbar = document.querySelector('.mt-mobile');
    const body = document.querySelector('body');
    const svg = document.querySelector('.svg');
    const svg2 = document.querySelector('.svg2');
    const profile = document.querySelector('.profile');

    burger.addEventListener('click', () => {
        navbar.classList.toggle('nav-open');
        body.classList.toggle('body-open');
        burger.classList.toggle('burger-open');
        svg.classList.toggle('svg_open');
        svg2.classList.toggle('svg_open2');
        profile.classList.toggle('profile__open');
    });

    const product__inner = document.querySelector('.product__inner');
    const body2 = document.querySelector('body');

    if(product__inner){
        product__inner.addEventListener('click', () => {
            body2.classList.toggle('body-open2');
        });
    }


});


var a, al, i, lfs, lfsl, b, c, p, g;
// looking for custom select div in html code
a = document.getElementsByClassName("custom-select");
al = a.length;

for (i = 0; i < al; i++) {

    // looking for select tag and counting it
    lfs = a[i].getElementsByTagName("select")[0];
    lfsl = lfs.length;

    // for the select tag that counted created a div
    b = document.createElement("div");
    b.setAttribute("class", "selected-item");
    a[i].appendChild(b);

    // created a span in the selected-item div
    p = document.createElement("span");
    p.setAttribute("class", "text");

    // set the what you have written in the options to the new span that we have created
    p.innerHTML = lfs.options[lfs.selectedIndex].innerHTML;

    // created a span in selected-item div for arrow down
    g = document.createElement("span");
    g.setAttribute("class", "arrow-down");



    // created a div that works as option list to hold options and placed it under selected-item div
    d = document.createElement("div");
    d.setAttribute("class", "option-list");
    a[i].appendChild(d);

    // created div for each option 
    for (j = 0; j < lfsl; j++) {
        c = document.createElement("div");
        c.setAttribute("class", "option");
        c.innerHTML = lfs.options[j].innerHTML;
        d.appendChild(c);
        b.appendChild(g);
        b.prepend(p);

        // this changes the clected item on click to options
        c.addEventListener("click", function () {
            var s, sl, h, i;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling.firstChild;

            // as you click on the options selected-item will update
            h.innerHTML = this.innerHTML;
            
            console.log(this.innerHTML);
            $('#UF_TYPE option:contains("'+this.innerHTML+'")').prop('selected', true).trigger('change');
            $('#FILTER_CATEGORY option:contains("'+this.innerHTML+'")').prop('selected', true).trigger('change');
            $('#TAB_BIDS_SELECT option:contains("'+this.innerHTML+'")').prop('selected', true).trigger('change');
            $('#TAB_INVOICES_SELECT option:contains("'+this.innerHTML+'")').prop('selected', true).trigger('change');

            // this loop is for the refresh of tha page to keep the option as selected
            for (i = 0; i < sl; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {

                    s.selectedIndex = i;

                    h.innerHTML = this.innerHTML;
                    break;
                }
            }

            // if any option selected this will close the option list (jquery)
            $('.option-list').slideUp();

        });
    }
}

// by clicking on the selected item the option list will toggle (jquery)
$('.selected-item').on("click", function (e) {
    $(this).next().slideToggle();
    $(this).parent().siblings().find('.option-list').slideUp();
    e.stopPropagation();
    $(this).children(".arrow-down").toggleClass("arrow-up");
    $(this).parent().siblings().find('.arrow-down').removeClass("arrow-up");
});

// click anywhere else to close all selec boxes
$('html , body').click(function (e) {
    $(".option-list").slideUp();
    $(".arrow-down").removeClass("arrow-up");
});


const items = document.querySelectorAll(".item");

items.forEach((item) => {
    item.addEventListener("click", () => {
        item.classList.toggle("open");
    });
});


function zoom(e) {
    var zoomer = e.currentTarget;
    e.offsetX ? offsetX = e.offsetX : offsetX = e.touches[0].pageX;
    e.offsetY ? offsetY = e.offsetY : offsetX = e.touches[0].pageX;
    x = offsetX / zoomer.offsetWidth * 100;
    y = offsetY / zoomer.offsetHeight * 100;
    zoomer.style.backgroundPosition = x + '% ' + y + '%';
}


//const modal = document.querySelector('dialog');
//const modalBox = document.getElementById('modal-box');
//const showModalBtn = document.getElementById('confirm-max-bind');
//const closeModalBtn = document.getElementById('close-modal-btn');
//
//let isModalOpen = false;

//showModalBtn.addEventListener('click', (e) => {
//    console.log(e);
//    modal.showModal();
//    isModalOpen = true;
//    e.stopPropagation();
//});

//closeModalBtn.addEventListener('click', () => {
//    modal.close();
//    isModalOpen = false;
//});
//
//document.addEventListener('click', (e) => {
//    if (isModalOpen && !modalBox.contains(e.target)) {
//        modal.close();
//    }
//});
