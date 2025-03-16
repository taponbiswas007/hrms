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

    // filter items
    // By default, all content divs are visible

    // Attach change event listener to checkboxes
    $('input[type="checkbox"]').change(function () {
        // Check if any checkbox is checked
        let anyChecked = false;
        $('input[type="checkbox"]').each(function () {
            if ($(this).is(':checked')) {
                anyChecked = true;
            }
        });

        // If no checkboxes are checked, show all content divs
        if (!anyChecked) {
            $('.myAttendance, .myLeaveBalance, .companyAnnouncement, .holidayList, .workAnniversaries, .birthdays, .employeeOnLeave').show();
        } else {
            // Hide all content divs first
            $('.myAttendance, .myLeaveBalance, .companyAnnouncement, .holidayList, .workAnniversaries, .birthdays, .employeeOnLeave').hide();

            // Show only the checked items
            $('input[type="checkbox"]:checked').each(function () {
                $('.' + $(this).attr('id')).show();
            });
        }
    });
})
document.querySelectorAll('.dropdown-menu .dropdown-item').forEach(item => {
    item.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent the dropdown from closing
    });
});