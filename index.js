new WOW().init();

var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    freeMode: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination1",
        clickable: true,
    },
    breakpoints: {
        550: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        900: {
            slidesPerView: 3,
            spaceBetween: 40,
        },
    }
});
var promoSwiper = new Swiper(".promoSwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination2",
        clickable: true,
    },
});

var ourBarSwiper = new Swiper(".our-barSwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination3",
        clickable: true,
    },
});

$(document).ready(function () {
    $('.header__link').on('click', function (event) {
        event.preventDefault();
        let target = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 1000);
    });

    $('#orderTable').on('click', function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $("#order").offset().top
        }, 1000)
    });

    let menu = $('.our-menu__link')

    menu.on('click', function (event) {
        event.preventDefault()
        menu.each(function () {
            $(this).removeClass('active')
        })

        $(this).addClass('active');

        let ourHookah = $(".our-hookah");
        let ourSnacks = $(".our-snaks");
        let ourCocktails = $(".our-cocktails");
        let ourBarMap = $(".our-map");

        ourHookah.hide();
        ourSnacks.hide();
        ourCocktails.hide();
        ourBarMap.hide();

        let userChose = $(this).text()
        if (userChose === "Кальяны") {
           if ($(window).width() < 790) {
               ourHookah.show().css({
                   "display": "flex",
                   "flex-direction": "column"
               });
           } else {
               ourHookah.show().css("display", "grid");
           }
        } else if (userChose === "Закуски") {
            if ($(window).width() < 790) {
                ourSnacks.show().css({
                    "display": "flex",
                    "flex-direction": "column"
                });
            } else {
                ourSnacks.show().css("display", "grid");
            }
        } else if (userChose === "Чай и б/а коктейли") {
            if ($(window).width() < 790) {
                ourCocktails.show().css({
                    "display": "flex",
                    "flex-direction": "column"
                });
            } else {
                ourCocktails.show().css("display", "grid");
            }
        } else if (userChose === "Барная карта") {
            if ($(window).width() < 790) {
                ourBarMap.show().css({
                    "display": "flex",
                    "flex-direction": "column"
                });
            } else {
                ourBarMap.show().css("display", "grid");
            }
        }
    });


    $('.our-bar__items').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0,1] // Will preload 0 - before current, and 1 after the current image
        },
    });


    let button = $("#btn");


    button.click(function () {
        let phone = $("#phone");
        let name = $("#name");
        let hasError = false;

        if (!name.val()) {
           name.next().show()
            name.css({
                "margin-bottom": "5px",
                "border": "1px solid red",
                "box-shadow": "none",

            })
            hasError = true;
        }
        if (!phone.val()) {
            phone.next().show()
            phone.css({
                "margin-bottom": "5px",
                "border": "1px solid red",
                "box-shadow": "none",
            })
            button.css("margin-top", "15px")
            hasError = true;
        }

        if (!hasError) {
            $.ajax({
                method: "POST",
                url: "https://testologia.ru/checkout",
                data: { name: name.val(), phone: phone.val() },
            })
                .done(function( msg ) {
                    if (msg.success === 1) {
                        alert("Ошибка")
                    }else {
                        $("#order-form").css("display", "none");
                        $("#orderTxt").css("display", "block");
                        $(".order__box").css("", "block");
                    }
                });
        }


    })

});



