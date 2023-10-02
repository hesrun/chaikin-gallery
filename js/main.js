//page preloader
$( window ).on("load", function() {
	$('.page-loader').fadeOut(300);
});

$(document).ready(function () {

    $(".click-here").on("click", function () {
        $(".custom-model-main").addClass("model-open");
    });
    $(".close-btn, .bg-overlay, .close__flag").click(function () {
        $(".custom-model-main").removeClass("model-open");
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
        $(this)
            .parents(".dropdown")
            .find("dd a")
            .each(function () {
                $(this).removeClass("selected");
            });

        // Update selected value
        leSpan.html($(this).html());

        // If back to default, remove selected class else addclass on right element
        if ($(this).hasClass("default")) {
            leSpan.removeClass("selected");
        } else {
            leSpan.addClass("selected");
            $(this).addClass("selected");
        }

        // Close dropdown
        $(this).parents("ul").hide();
    });

    // Close all dropdown onclick on another element
    $(document).bind("click", function (e) {
        if (!$(e.target).parents().hasClass("dropdown"))
            $(".dropdown dd ul").hide();
    });

    $(".chaikin-gallery__item").mouseenter(function () {
        $(this).addClass("chaikin-gallery__item_active");
        $(this).prev().addClass("chaikin-gallery__item_near");
        $(this).next().addClass("chaikin-gallery__item_near");
    });
    $(".chaikin-gallery__item").mouseleave(function () {
        $(".chaikin-gallery__item").removeClass(
            "chaikin-gallery__item_active chaikin-gallery__item_near"
        );
    });

    $(".chaikin-gallery").on("mousemove", function (e) {
        wrapWidth = $(".chaikin-gallery").width();
        slidesWidth = $(".chaikin-gallery__inner").width();
        slides = $(".chaikin-gallery__inner");

        rangeX = Math.round(slidesWidth - wrapWidth);

        mouseX = e.pageX;

        offset = (mouseX / wrapWidth) * slidesWidth - mouseX;

        console.log(slidesWidth);

        slides.css({
            "-webkit-transform": "translate3d(" + -offset + "px,0,0)",
            transform: "translate3d(" + -offset + "px,0,0)",
        });
    });

    $(".ft__block").hover(
        function () {
            // задаем функцию при наведении курсора на элемент
            $(".main").css("visibility", "visible");
            $(".main").css("opacity", "1");
            $(".clock__img").css("opacity", "0");
            $(".privacy__policy").css("display", "none");
            $(".copyright").css("display", "none");
            $(".slogan").css("opacity", "0");
            $(".header__about").css("opacity", "0");
            $(".slogan").css("transition", "0.3s");
            $(".main__block__title").css("transition", "0.3s");
        },
        function () {
            // задаем функцию, которая срабатывает, когда указатель выходит из элемента
        }
    );

    $(".header__container").hover(
        function () {
            // задаем функцию при наведении курсора на элемент
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
        },
        function () {
            // задаем функцию, которая срабатывает, когда указатель выходит из элемента
        }
    );

    $(".chaikin-gallery__item").hover(
        function () {
            // задаем функцию при наведении курсора на элемент
        },
        function () {
            // задаем функцию, которая срабатывает, когда указатель выходит из элемента
        }
    );

    $(".product__block").hover(
        function () {
            // задаем функцию при наведении курсора на элемент

            $(".product__inner").css("opacity", "1");
            $(".product__block img").css("transform", "scale(1.1)");
            $(".product__block img").css("transition", "0.4s");
        },
        function () {
            // задаем функцию, которая срабатывает, когда указатель выходит из элемента
            $(".product__inner").css("opacity", "0");
            $(".product__block img").css("transform", "scale(1)");
            $(".product__block img").css("transition", "0.4s");
        }
    );

    $(".product__block2").hover(
        function () {
            // задаем функцию при наведении курсора на элемент

            $(".product__inner2").css("opacity", "1");
            $(".product__block2 img").css("transform", "scale(1.1)");
            $(".product__block2 img").css("transition", "0.4s");
        },
        function () {
            // задаем функцию, которая срабатывает, когда указатель выходит из элемента
            $(".product__inner2").css("opacity", "0");
            $(".product__block2 img").css("transform", "scale(1)");
            $(".product__block2 img").css("transition", "0.4s");
        }
    );

    $(".product__block3").hover(
        function () {
            // задаем функцию при наведении курсора на элемент

            $(".product__inner3").css("opacity", "1");
            $(".product__block3 img").css("transform", "scale(1.1)");
            $(".product__block3 img").css("transition", "0.4s");
        },
        function () {
            // задаем функцию, которая срабатывает, когда указатель выходит из элемента
            $(".product__inner3").css("opacity", "0");
            $(".product__block3 img").css("transform", "scale(1)");
            $(".product__block3 img").css("transition", "0.4s");
        }
    );

    $(".product__block4").hover(
        function () {
            // задаем функцию при наведении курсора на элемент

            $(".product__inner4").css("opacity", "1");
            $(".product__block4 img").css("transform", "scale(1.1)");
            $(".product__block4 img").css("transition", "0.4s");
        },
        function () {
            // задаем функцию, которая срабатывает, когда указатель выходит из элемента
            $(".product__inner4").css("opacity", "0");
            $(".product__block4 img").css("transform", "scale(1)");
            $(".product__block4 img").css("transition", "0.4s");
        }
    );

    $(".product__block5").hover(
        function () {
            // задаем функцию при наведении курсора на элемент

            $(".product__inner5").css("opacity", "1");
            $(".product__block5 img").css("transform", "scale(1.1)");
            $(".product__block5 img").css("transition", "0.4s");
        },
        function () {
            // задаем функцию, которая срабатывает, когда указатель выходит из элемента
            $(".product__inner5").css("opacity", "0");
            $(".product__block5 img").css("transform", "scale(1)");
            $(".product__block5 img").css("transition", "0.4s");
        }
    );

    $(".product__block6").hover(
        function () {
            // задаем функцию при наведении курсора на элемент

            $(".product__inner6").css("opacity", "1");
            $(".product__block6 img").css("transform", "scale(1.1)");
            $(".product__block6 img").css("transition", "0.4s");
        },
        function () {
            // задаем функцию, которая срабатывает, когда указатель выходит из элемента
            $(".product__inner6").css("opacity", "0");
            $(".product__block6 img").css("transform", "scale(1)");
            $(".product__block6 img").css("transition", "0.4s");
        }
    );

    $(".category__img").hover(
        function () {
            // задаем функцию при наведении курсора на элемент

            $(".category__img img").css("transform", "scale(1.1)");
            $(".category__img img").css("transition", "0.4s");
        },
        function () {
            // задаем функцию, которая срабатывает, когда указатель выходит из элемента

            $(".category__img img").css("transform", "scale(1)");
            $(".category__img img").css("transition", "0.7s");
        }
    );

    $(".ft__block2").hover(
        function () {
            // задаем функцию при наведении курсора на элемент

            $(".privacy__policy").css("opacity", "1");
            $(".privacy__policy").css("transition", "0.7s");
        },
        function () {
            // задаем функцию, которая срабатывает, когда указатель выходит из элемента

            $(".privacy__policy").css("opacity", "0");
            $(".privacy__policy").css("transition", "0.7s");
        }
    );

    let triggersModal = document.querySelectorAll(".js-show-modal");
    let modals = document.querySelectorAll(".js-modal");

    function closeModal() {
        modals.forEach((modal) => {
            if (modal.classList.contains("is-open")) {
                modal.classList.remove("is-open");
            }
        });
    }

    modals.forEach((modal) => {
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
        })
    );


    /* --------------------- тут исправил инциализацию слайдера --------------------- */ 


    $(".slider-for").each(function () {
        var slider = $(this);

        $(this).slick({
            slidesToShow: 1,
            infinite: false,
            //draggable: false,
            slidesToScroll: 1,
            arrows: true,
            dots: true,
            appendArrows: $(this).next().find('.slider-for__arrows'),
            appendDots: $(this).next().find('.slider-for__pagination'),
            //asNavFor: ".slider-nav",
    
            responsive: [
                {
                    breakpoint: 768,
                    settings: "unslick",
                },
            ],
        });
    });


    /* --------------------- это судя по всему уже не нужно --------------------- */

    // $(".slider-nav").slick({
    //     slidesToShow: 3,
    //     slidesToScroll: 1,

    //     asNavFor: ".slider-for",

    //     arrows: true,
    //     dots: false,

    //     focusOnSelect: true,
    //     responsive: [
    //         {
    //             breakpoint: 768,
    //             settings: "unslick",
    //         },
    //     ],
    // });


    $(".slider-for2").slick({
        slidesToShow: 1,
        infinite: false,
        draggable: false,
        slidesToScroll: 1,
        arrows: true,
        asNavFor: ".slider-nav2",

        responsive: [
            {
                breakpoint: 768,
                settings: "unslick",
            },
        ],
    });

    $(".slider-nav2").slick({
        slidesToShow: 3,
        slidesToScroll: 1,

        asNavFor: ".slider-for2",

        arrows: true,
        dots: false,

        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 768,
                settings: "unslick",
            },
        ],
    });

    $(".responsive").slick({
        slidesToShow: 1,
        infinite: false,
        slidesToScroll: 1,
        arrows: true,
    });

    $(".slide-nxt").slick({
        slidesToShow: 1,
        infinite: false,
        slidesToScroll: 1,
        arrows: true,
    });

    $(".last").click(function () {
        var slider = $(".slider-nav");
        slider[0].slick.slickGoTo(parseInt(3));
    });

    const burger = document.querySelector(".burger");
    const navbar = document.querySelector(".mt-mobile");
    const body = document.querySelector("body");
    const svg = document.querySelector(".svg");
    const svg2 = document.querySelector(".svg2");
    const profile = document.querySelector(".profile");

    burger.addEventListener("click", () => {
        navbar.classList.toggle("nav-open");
        body.classList.toggle("body-open");
        burger.classList.toggle("burger-open");
        svg.classList.toggle("svg_open");
        svg2.classList.toggle("svg_open2");
        profile.classList.toggle("profile__open");
    });

    const product__inner = document.querySelector(".product__inner");
    const body2 = document.querySelector("body");

    product__inner.addEventListener("click", () => {
        body2.classList.toggle("body-open2");
    });
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

            // this loop is for the refresh of tha page to keep the option as selected
            for (i = 0; i < sl; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;

                    h.innerHTML = this.innerHTML;
                    break;
                }
            }

            // if any option selected this will close the option list (jquery)
            $(".option-list").slideUp();
        });
    }
}

// by clicking on the selected item the option list will toggle (jquery)
$(".selected-item").on("click", function (e) {
    $(this).next().slideToggle();
    $(this).parent().siblings().find(".option-list").slideUp();
    e.stopPropagation();
    $(this).children(".arrow-down").toggleClass("arrow-up");
    $(this).parent().siblings().find(".arrow-down").removeClass("arrow-up");
});

// click anywhere else to close all selec boxes
$("html , body").click(function (e) {
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
    e.offsetX ? (offsetX = e.offsetX) : (offsetX = e.touches[0].pageX);
    e.offsetY ? (offsetY = e.offsetY) : (offsetX = e.touches[0].pageX);
    x = (offsetX / zoomer.offsetWidth) * 100;
    y = (offsetY / zoomer.offsetHeight) * 100;
    zoomer.style.backgroundPosition = x + "% " + y + "%";
}

const modal = document.querySelector("dialog");
const modalBox = document.getElementById("modal-box");
const showModalBtn = document.getElementById("show-modal-btn");
const closeModalBtn = document.getElementById("close-modal-btn");

let isModalOpen = false;

showModalBtn.addEventListener("click", (e) => {
    modal.showModal();
    isModalOpen = true;
    e.stopPropagation();
});

closeModalBtn.addEventListener("click", () => {
    modal.close();
    isModalOpen = false;
});

document.addEventListener("click", (e) => {
    if (isModalOpen && !modalBox.contains(e.target)) {
        modal.close();
    }
});
