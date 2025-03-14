$(document).ready(function () {
    $(".toggleBar").click(function () {
        $(".side-bar").addClass('sidebarActive');

    });
    $(".closeSidebar").click(function () {
        $(".side-bar").removeClass('sidebarActive');

    });
    $(".tablink").click(function () {
        $(".tablink").removeClass('active');
        $(this).addClass('active');


    });
})