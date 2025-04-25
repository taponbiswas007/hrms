$(document).ready(function () {

    // approve checkbox
    $('input[name="approval-status"]').on('change', function () {
        if (this.checked) {
            $('input[name="approval-status"]').not(this).prop('checked', false);
        }
    });


    // visible box
    const $input = $('.visibleItemaddbox input');
    const $dropdown = $('.visiblelistdropdown');
    const $dropdownItems = $('.visiblelistdropdown li');
    const $tagsContainer = $('.visibleItemaddbox ul');

    // Show dropdown when input is focused
    $input.on('focus', function () {
        filterDropdown();
    });

    // Hide dropdown when clicking outside
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.visibleItemaddbox').length) {
            $dropdown.removeClass('show');
        }
    });

    // Filter dropdown items
    $input.on('input', filterDropdown);

    // Handle click on dropdown items
    $dropdownItems.on('click', function () {
        const tagText = $(this).text().trim();

        // Hide item from dropdown
        $(this).addClass('hidden').hide();

        // Add tag
        const $tag = $(`
        <li>
          ${tagText}
          <span class="close">×</span>
        </li>
      `);

        // Handle removing tag
        $tag.find('.close').on('click', function () {
            $tag.remove();

            // Show this tag back in dropdown
            $dropdownItems.each(function () {
                if ($(this).text().trim() === tagText) {
                    $(this).removeClass('hidden').show();
                }
            });
        });

        // Insert before input
        $tag.insertBefore($input);
        $input.val('');
        filterDropdown(); // update dropdown display
    });

    // Filter dropdown function
    function filterDropdown() {
        const searchTerm = $input.val().toLowerCase();
        let hasMatches = false;

        $dropdownItems.each(function () {
            const text = $(this).text().toLowerCase();
            const isHidden = $(this).hasClass('hidden');
            if (text.includes(searchTerm) && !isHidden) {
                $(this).show();
                hasMatches = true;
            } else {
                $(this).hide();
            }
        });

        if (hasMatches) {
            $dropdown.addClass('show');
        } else {
            $dropdown.removeClass('show');
        }
    }





    // Toggle dropdown when clicking the button
    $(document).on('click', '.custom-dropdown-button', function (event) {
        event.stopPropagation();

        // Get the clicked button and its dropdown
        const $button = $(this);
        const $dropdown = $button.closest('.custom-dropdown');

        // Close all other dropdowns
        $('.custom-dropdown').not($dropdown).removeClass('active');

        // Toggle current dropdown
        $dropdown.toggleClass('active');
    });

    // Handle option selection
    $(document).on('click', '.custom-dropdown-option', function (event) {
        event.stopPropagation();

        const $option = $(this);
        const value = $option.data('value'); // Assuming you store value in data-value
        const text = $option.text();

        const $dropdown = $option.closest('.custom-dropdown');
        const $button = $dropdown.find('.custom-dropdown-button');

        // Update button text
        $button.text(text);

        // Close dropdown
        $dropdown.removeClass('active');

        console.log('Selected value:', value, 'Text:', text);

        // Optional: Trigger change event
        $dropdown.trigger('change', [value, text]);
    });

    // Close dropdowns when clicking outside
    $(document).on('click', function (event) {
        if (!$(event.target).closest('.custom-dropdown').length) {
            $('.custom-dropdown').removeClass('active');
        }
    });










    // Handle the "Reject" header checkbox
    $('thead .thCustom-checkbox:eq(0) input[type="checkbox"]').on('change', function () {
        var isChecked = $(this).prop('checked');
        // Check/uncheck all "Reject" column checkboxes in the table body
        $('tbody tr td:nth-child(12) .custom-checkbox input[type="checkbox"]').prop('checked', isChecked);
    });

    // Handle the "Approved" header checkbox
    $('thead .thCustom-checkbox:eq(1) input[type="checkbox"]').on('change', function () {
        var isChecked = $(this).prop('checked');
        // Check/uncheck all "Approved" column checkboxes in the table body
        $('tbody tr td:nth-child(13) .custom-checkbox input[type="checkbox"]').prop('checked', isChecked);
    });

    // Handle individual "Reject" column checkboxes
    $('tbody tr td:nth-child(12) .custom-checkbox input[type="checkbox"]').on('change', function () {
        var allChecked = true;
        // Check if all "Reject" column checkboxes are checked
        $('tbody tr td:nth-child(12) .custom-checkbox input[type="checkbox"]').each(function () {
            if (!$(this).prop('checked')) {
                allChecked = false;
                return false; // Exit the loop early if any checkbox is unchecked
            }
        });
        // Update the "Reject" header checkbox state
        $('thead .thCustom-checkbox:eq(0) input[type="checkbox"]').prop('checked', allChecked);
    });

    // Handle individual "Approved" column checkboxes
    $('tbody tr td:nth-child(13) .custom-checkbox input[type="checkbox"]').on('change', function () {
        var allChecked = true;
        // Check if all "Approved" column checkboxes are checked
        $('tbody tr td:nth-child(13) .custom-checkbox input[type="checkbox"]').each(function () {
            if (!$(this).prop('checked')) {
                allChecked = false;
                return false; // Exit the loop early if any checkbox is unchecked
            }
        });
        // Update the "Approved" header checkbox state
        $('thead .thCustom-checkbox:eq(1) input[type="checkbox"]').prop('checked', allChecked);
    });





    // header profile area
    $("#headerProfile").click(function (event) {
        $(".headerProfileDropdown").toggle();
        event.stopPropagation(); // Prevent the click from propagating to the document
    });

    $(document).click(function (event) {
        if (!$(event.target).closest(".headerProfileDropdown").length && !$(event.target).is("#headerProfile")) {
            $(".headerProfileDropdown").hide();
        }
    });




    // $('.sidebar-link-items').each(function () {
    //     const parentItem = $(this);
    //     const submenu = parentItem.find('.sidebar-submenu');
    //     let hoverTimeout;
    //     const submenuWidth = 200; // Set your desired submenu width
    //     const horizontalOffset = 0; // Space between parent and submenu

    //     // Pre-calculate submenu height without showing it
    //     submenu.css({
    //         'position': 'absolute',
    //         'visibility': 'hidden',
    //         'display': 'block',
    //         'width': submenuWidth
    //     });
    //     const submenuHeight = submenu.outerHeight();
    //     submenu.css({
    //         'position': '',
    //         'visibility': '',
    //         'display': ''
    //     });

    //     parentItem.hover(function () {
    //         clearTimeout(hoverTimeout);

    //         const offset = parentItem.offset();
    //         const parentWidth = parentItem.outerWidth();
    //         const parentHeight = parentItem.outerHeight();
    //         const windowHeight = $(window).height();
    //         const windowWidth = $(window).width();

    //         const spaceBelow = windowHeight - (offset.top + parentHeight);
    //         const spaceAbove = offset.top;
    //         const spaceRight = windowWidth - (offset.left + parentWidth + horizontalOffset + submenuWidth);

    //         // Calculate position
    //         let topPosition, leftPosition, maxHeight, overflowY = 'hidden';

    //         // Vertical positioning
    //         if (spaceBelow >= submenuHeight) {
    //             // Open downward - align to top of parent
    //             topPosition = offset.top;
    //             maxHeight = spaceBelow + parentHeight; // Include parent height in available space
    //         } else if (spaceAbove >= submenuHeight) {
    //             // Open upward - align to bottom of parent
    //             topPosition = offset.top + parentHeight - submenuHeight;
    //             maxHeight = spaceAbove + parentHeight; // Include parent height in available space
    //         } else {
    //             // Not enough space, use best available
    //             if (spaceBelow >= spaceAbove) {
    //                 // Open downward with scroll
    //                 topPosition = offset.top;
    //                 maxHeight = spaceBelow + parentHeight;
    //                 overflowY = 'auto';
    //             } else {
    //                 // Open upward with scroll
    //                 topPosition = Math.max(0, offset.top + parentHeight - submenuHeight);
    //                 maxHeight = Math.min(submenuHeight, spaceAbove + parentHeight);
    //                 overflowY = 'auto';
    //             }
    //         }

    //         // Horizontal positioning
    //         if (spaceRight >= 0) {
    //             // Open to the right
    //             leftPosition = offset.left + parentWidth + horizontalOffset;
    //         } else {
    //             // Open to the left if no space on right
    //             leftPosition = offset.left - submenuWidth - horizontalOffset;
    //         }

    //         // Apply styles
    //         submenu.appendTo('body').css({
    //             'position': 'absolute',
    //             'top': topPosition,
    //             'left': leftPosition,
    //             'width': submenuWidth,
    //             'display': 'block',
    //             'z-index': 99999,
    //             'overflow-y': overflowY,
    //             'max-height': maxHeight
    //         });

    //     }, function () {
    //         hoverTimeout = setTimeout(function () {
    //             if (!submenu.is(':hover')) {
    //                 submenu.hide().appendTo(parentItem);
    //             }
    //         }, 200);
    //     });

    //     submenu.hover(function () {
    //         clearTimeout(hoverTimeout);
    //     }, function () {
    //         hoverTimeout = setTimeout(function () {
    //             $(this).hide().appendTo(parentItem);
    //         }.bind(this), 200);
    //     });
    // });







    // $('.sidebar-link-items').each(function () {
    //     let parentItem = $(this);
    //     let submenu = parentItem.find('.sidebar-submenu');

    //     parentItem.hover(function () {
    //         let offset = parentItem.offset();
    //         let submenuHeight = submenu.outerHeight();
    //         let windowHeight = $(window).height();
    //         let spaceBelow = windowHeight - (offset.top + parentItem.outerHeight());
    //         let spaceAbove = offset.top;

    //         // Check if there's enough space below or above
    //         if (spaceBelow >= submenuHeight) {
    //             // Enough space below, show submenu from top to bottom
    //             submenu.appendTo('body').css({
    //                 position: 'absolute',
    //                 top: offset.top,
    //                 left: offset.left + 170, // Move 170px to the right
    //                 display: 'block',
    //                 zIndex: 99999,
    //                 overflowY: 'hidden' // Reset overflow
    //             });
    //         } else if (spaceAbove >= submenuHeight) {
    //             // Not enough space below, but enough space above, show submenu from bottom to top
    //             submenu.appendTo('body').css({
    //                 position: 'absolute',
    //                 top: offset.top + parentItem.outerHeight() - submenuHeight, // Align bottom of submenu with bottom of parent
    //                 left: offset.left + 170, // Move 170px to the right
    //                 display: 'block',
    //                 zIndex: 99999,
    //                 overflowY: 'hidden' // Reset overflow
    //             });
    //         } else {
    //             // Not enough space on either side, show in the direction with maximum space
    //             if (spaceBelow >= spaceAbove) {
    //                 // More space below, show submenu from top to bottom with scroll
    //                 submenu.appendTo('body').css({
    //                     position: 'absolute',
    //                     top: offset.top,
    //                     left: offset.left + 170, // Move 170px to the right
    //                     display: 'block',
    //                     zIndex: 99999,
    //                     overflowY: 'auto', // Enable scroll
    //                     maxHeight: spaceBelow // Limit height to available space
    //                 });
    //             } else {
    //                 // More space above, show submenu from bottom to top with scroll
    //                 submenu.appendTo('body').css({
    //                     position: 'absolute',
    //                     top: offset.top + parentItem.outerHeight() - Math.min(submenuHeight, spaceAbove), // Align bottom of submenu with bottom of parent
    //                     left: offset.left + 170, // Move 170px to the right
    //                     display: 'block',
    //                     zIndex: 99999,
    //                     overflowY: 'auto', // Enable scroll
    //                     maxHeight: spaceAbove // Limit height to available space
    //                 });
    //             }
    //         }
    //     }, function () {
    //         setTimeout(function () {
    //             if (!submenu.is(':hover')) {
    //                 submenu.hide().appendTo(parentItem);
    //             }
    //         }, 200); // Small delay to allow moving to submenu
    //     });

    //     submenu.hover(function () {
    //         $(this).show();
    //     }, function () {
    //         $(this).hide().appendTo(parentItem);
    //     });
    // });



    function adjustMenuItems() {
        // Check if the screen width is lg (992px or above)
        if ($(window).width() >= 992) {
            // Add the .dropend class to .splitmenuItems
            $('.splitmenuItems').addClass('dropend');
        } else {
            // Remove the .dropend class if the screen width is less than lg
            $('.splitmenuItems').removeClass('dropend');
        }
    }

    // Call the function on page load
    adjustMenuItems();

    // Call the function on window resize
    $(window).resize(function () {
        adjustMenuItems();
    });


    $('.todoitems').click(function () {
        $(this).next('.todosubtitle').slideToggle(); // Only toggles the next subtitle related to the clicked item
    });

    // holiday changer
    $('.holidayMenu li button').click(function () {
        $('.holidayMenu li button').removeClass('holidayActive');
        $(this).addClass('holidayActive');
    });

    $('.fixedHolidayBtn').click(function () {
        if (!$('.fixdHoliday').is(':visible')) {
            $('.optionalHoliday').fadeOut(200, function () {
                $('.fixdHoliday').fadeIn(200);
            });
        }
    });

    $('.optionalHolidayBtn').click(function () {
        if (!$('.optionalHoliday').is(':visible')) {
            $('.fixdHoliday').fadeOut(200, function () {
                $('.optionalHoliday').fadeIn(200);
            });
        }
    });


    // password visible
    // Function to toggle password visibility
    function togglePasswordVisibility(button, inputId) {
        var passwordInput = $(inputId);
        var icon = $(button).find('.toggle-icon');

        if (passwordInput.attr('type') === 'password') {
            // Change input type to text (show password)
            passwordInput.attr('type', 'text');
            // Replace SVG with open lock icon
            icon.replaceWith(`
                <svg class="toggle-icon" height="24px" width="24px" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
                </svg>
            `);
        } else {
            // Change input type to password (hide password)
            passwordInput.attr('type', 'password');
            // Replace SVG with closed lock icon
            icon.replaceWith(`
                <svg class="toggle-icon" height="24px" width="24px" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
            `);
        }
    }

    // Attach click event to both toggle buttons
    $('.passwordHideshowbtn').click(function (e) {
        e.preventDefault(); // Prevent the default button action
        var inputId = '#' + $(this).closest('.position-relative').find('input').attr('id'); // Get the associated input field
        togglePasswordVisibility(this, inputId); // Call the toggle function
    });
    // menu bar
    $(".toggleBar").click(function () {
        $(".side-bar").toggleClass('sidebarActive');

    });
    $(".closeSidebar").click(function () {
        $(".side-bar").removeClass('sidebarActive');

    });
    $(".tablink").click(function () {
        $(".tablink").removeClass('active');
        $(this).addClass('active');


    });

    // filter items
    // Function to update content visibility based on checkbox states
    function updateContentVisibility() {
        // Hide all content divs first
        $('.myAttendance, .myLeaveBalance, .companyAnnouncement, .todoList, .holidayList, .workAnniversaries, .birthdays, .employeeOnLeave').hide();

        // Show only the checked items
        $('input[type="checkbox"]:checked').each(function () {
            $('.' + $(this).attr('id')).show();
        });
    }

    // Function to handle "Select All" checkbox
    function handleSelectAll() {
        if ($('#SelectAll').is(':checked')) {
            // Check all checkboxes
            $('input[type="checkbox"]').prop('checked', true);
        } else {
            // Uncheck all checkboxes
            $('input[type="checkbox"]').prop('checked', false);
        }
        // Update content visibility
        updateContentVisibility();
    }

    // Attach change event listener to "Select All" checkbox
    $('#SelectAll').change(function () {
        handleSelectAll();
    });

    // Attach change event listener to other checkboxes
    $('input[type="checkbox"]').not('#SelectAll').change(function () {
        // If any checkbox is unchecked, uncheck "Select All"
        if (!this.checked) {
            $('#SelectAll').prop('checked', false);
        }
        // Update content visibility
        updateContentVisibility();
    });

    // Initialize content visibility on page load
    updateContentVisibility();


    // dashboard filter items
    function updateContentVisibilityDashboard() {
        // Hide all content divs first
        $('.organisationsalary, .organisationhead, .attendancereport, .organisationattrition').hide();

        // Show only the checked items by mapping checkbox IDs to their corresponding content classes
        $('input[type="checkbox"]:checked').not('#markAll').each(function () {
            let checkboxId = $(this).attr('id');
            let targetClass = '';

            // Map checkbox IDs to their corresponding content classes
            switch (checkboxId) {
                case 'organisationSala1ryTrend':
                    targetClass = 'organisationsalary';
                    break;
                case 'organisationHe2adCount':
                    targetClass = 'organisationhead';
                    break;
                case 'attendanc3eReport':
                    targetClass = 'attendancereport';
                    break;
                case 'organisationAttrition4Details':
                    targetClass = 'organisationattrition';
                    break;
                default:
                    break;
            }

            // Show the corresponding content div
            if (targetClass) {
                $('.' + targetClass).show();
            }
        });
    }

    function handleSelectAllDashboard() {
        let isChecked = $('#markAll').is(':checked');

        // Check/uncheck all checkboxes except "Select All"
        $('input[type="checkbox"]').not('#markAll').prop('checked', isChecked);

        // Update content visibility
        updateContentVisibilityDashboard();
    }

    // Attach event listener to "Select All" checkbox
    $('#markAll').change(function () {
        handleSelectAllDashboard();
    });

    // Attach event listener to individual checkboxes
    $('input[type="checkbox"]').not('#markAll').change(function () {
        // If all other checkboxes are checked, check "Select All"
        if ($('input[type="checkbox"]').not('#markAll').length === $('input[type="checkbox"]:checked').not('#markAll').length) {
            $('#markAll').prop('checked', true);
        } else {
            $('#markAll').prop('checked', false);
        }

        // Update content visibility
        updateContentVisibilityDashboard();
    });

    // Initialize content visibility on page load
    updateContentVisibilityDashboard();


    // status changer 
    $('.stausChangermenu li button').click(function () {
        $('.stausChangermenu li button').removeClass('active');
        $(this).addClass('active');
    });

    // filter by word 
    $('.filteringKeyword ul li button').click(function () {
        $('.filteringKeyword ul li button').removeClass('active');
        $(this).addClass('active');
    });

    // table collapseing 

    $('.addressTablelist li .showingHiddenbtn').click(function () {
        // If clicked button already has .active, remove it
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        }
        // Otherwise, remove .active from all buttons and add it to the clicked one
        else {
            $('.addressTablelist li .showingHiddenbtn').removeClass('active');
            $(this).addClass('active');
        }
    });



    $('.tab-content').hide(); // Hide all by default
    $('#pendingStatus').show().addClass('statusactive'); // Show default one

    function changeTab(target) {
        $('.tab-content.statusactive').fadeOut(300, function () {
            $(this).removeClass('statusactive');
            $('#' + target).fadeIn(300).addClass('statusactive');
        });
    }

    $('.pendingBtn').click(function () {
        changeTab('pendingStatus');
    });
    $('.approvedBtn').click(function () {
        changeTab('approvedStatus');
    });
    $('.cancelledBtn').click(function () {
        changeTab('cancelledStatus');
    });
    $('.rejectedBtn').click(function () {
        changeTab('rejectedStatus');
    });


    // status changer 
    $('.other_link_tab_area li button').click(function () {
        $('.other_link_tab_area li button').removeClass('active');
        $(this).addClass('active');
    });
    // $('.protab-content').hide();  // Hide all by default
    // $('#promotionArea').show().addClass('protabactive'); // Show default one

    function changeproTab(target) {
        $('.protab-content.protabactive').fadeOut(300, function () {
            $(this).removeClass('protabactive');
            $('#' + target).fadeIn(300).addClass('protabactive');
        });
    }

    $('.promotionBtn').click(function () {
        changeproTab('promotionArea');
    });
    $('.transferBtn').click(function () {
        changeproTab('transferArea');
    });
    $('.reassignmentBtn').click(function () {
        changeproTab('reassignmentArea');
    });
    $('.incrementDecrementBtn').click(function () {
        changeproTab('incrementDecrementArea');
    });





    // side bar items
    // $('.sidebarItem .submenu').click(function () {
    //     $('.sidebarItem .submenu').removeClass('sideBarActive');
    //     $(this).addClass('sideBarActive');
    // });


    // leave request table checkbox controller
    // Handle the reject_checkbox change event
    $('.reject_checkbox').change(function () {
        if ($(this).is(':checked')) {
            // When reject_checkbox is checked, check all checkboxes in reject_column
            $('.reject_column input[type="checkbox"]').prop('checked', true);
        } else {
            // When reject_checkbox is unchecked, uncheck all checkboxes in reject_column
            $('.reject_column input[type="checkbox"]').prop('checked', false);
        }
    });

    // Handle individual checkbox changes in reject_column
    $('.reject_column input[type="checkbox"]').change(function () {
        // Check if any checkbox in reject_column is unchecked
        const allChecked = $('.reject_column input[type="checkbox"]').length ===
            $('.reject_column input[type="checkbox"]:checked').length;

        // Update the reject_checkbox accordingly
        $('.reject_checkbox').prop('checked', allChecked);
    });


    $('.approved_checkbox').change(function () {
        if ($(this).is(':checked')) {
            // When reject_checkbox is checked, check all checkboxes in reject_column
            $('.approved_column input[type="checkbox"]').prop('checked', true);
        } else {
            // When reject_checkbox is unchecked, uncheck all checkboxes in reject_column
            $('.approved_column input[type="checkbox"]').prop('checked', false);
        }
    });

    // Handle individual checkbox changes in reject_column
    $('.approved_column input[type="checkbox"]').change(function () {
        // Check if any checkbox in reject_column is unchecked
        const allChecked = $('.approved_column input[type="checkbox"]').length ===
            $('.approved_column input[type="checkbox"]:checked').length;

        // Update the reject_checkbox accordingly
        $('.approved_checkbox').prop('checked', allChecked);
    });

})

















document.querySelectorAll('.dropdown-menu .dropdown-item').forEach(item => {
    item.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent the dropdown from closing
    });
});


// line chart


// head count chart
var options = {
    series: [{
        name: 'Actual',
        data: [{
            x: 'April',
            y: 1292
        },
        {
            x: 'June',
            y: 4432
        },
        {
            x: 'July',
            y: 5423
        },
        {
            x: 'Aug',
            y: 6653
        },
        {
            x: 'Sep',
            y: 8133
        },
        {
            x: 'Oct',
            y: 7132
        },
        {
            x: 'Nov',
            y: 7332
        },
        {
            x: 'Dec',
            y: 6553
        }
        ]
    }],
    chart: {
        height: 350,
        type: 'bar'
    },
    plotOptions: {
        bar: {
            columnWidth: '20%',
            borderRadius: 2,

        }
    },
    colors: ['#7787FF'],
    dataLabels: {
        enabled: false
    }
};

var chart = new ApexCharts(document.querySelector("#headCount"), options);
chart.render();



// salary trend chart
var series = {
    monthDataSeries1: {
        prices: [8200, 8400, 8600, 8400, 8700, 7300, 9000],
        dates: [
            "23 Nov 2017", "24 Nov 2017", "25 Nov 2017", "26 Nov 2017",
            "27 Nov 2017", "28 Nov 2017", "29 Nov 2017"
        ]
    },
    monthDataSeries2: {
        prices: [7900, 8100, 8300, 8100, 8500, 7100, 8800], // Second line data
        color: "#CE2A96" // Stroke color for the second line
    }
};
var options = {
    series: [{
        name: "Series 1",
        data: series.monthDataSeries1.prices
    },
    {
        name: "Series 2",
        data: series.monthDataSeries2.prices
    }
    ],
    chart: {
        height: 350,
        type: 'line',
        id: 'areachart-2'
    },
    dataLabels: {
        enabled: true,
        enabledOnSeries: [2],
        style: {
            colors: ['#7787FF', '#CE2A96']
        }
    },
    stroke: {
        curve: ['smooth', 'smooth'],
        width: [2, 2],
        colors: ['#7787FF', '#CE2A96']
    },
    markers: {
        size: 4, // Set marker size
        colors: ['#7787FF', '#CE2A96'], // Marker colors matching the series
        strokeColors: '#fff', // White border for better visibility
        strokeWidth: 1, // Thin border
        shape: "circle" // Ensuring a circular shape
    },
    grid: {
        padding: {
            right: 30,
            left: 20
        }
    },

    labels: series.monthDataSeries1.dates,
    xaxis: {
        type: 'datetime'
    }
};

var chart = new ApexCharts(document.querySelector("#salaryTrend"), options);
chart.render();

// attendance report

var options = {
    series: [44],
    chart: {
        type: 'donut',


    },
    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                width: 200
            },
            // legend: {
            //     position: 'bottom'
            // }
        }
    }],
    labels: ['Present'],
    colors: ['#3A5AFE'],
};

var chart = new ApexCharts(document.querySelector("#attendanceReport"), options);
chart.render();

// Organisation Attrition Details

var ottritionDetailsoptions = {
    series: [{
        name: 'Actual',
        data: [{
            x: 'April',
            y: 1 // 1%
        },
        {
            x: 'June',
            y: 0.5 // 0.5%
        },
        {
            x: 'July',
            y: 0.3 // 0.3%
        },
        {
            x: 'Aug',
            y: 0 // 0%
        },
        {
            x: 'Sep',
            y: 0.4 // 0.4%
        },
        {
            x: 'Oct',
            y: 1.5 // 1.5%
        },
        {
            x: 'Nov',
            y: 1.8 // 1.8%
        },
        {
            x: 'Dec',
            y: 1 // 1%
        }
        ]
    }],
    chart: {
        height: 350,
        type: 'bar'
    },
    plotOptions: {
        bar: {
            columnWidth: '20%',
            borderRadius: 2,
        }
    },
    colors: ['#7787FF'],
    dataLabels: {
        enabled: false
    },
    yaxis: {
        labels: {
            formatter: function (value) {
                return value + '%'; // Add % sign to y-axis labels
            }
        }
    },
    tooltip: {
        y: {
            formatter: function (value) {
                return value + '%'; // Add % sign to tooltip values
            }
        }
    }
};

var chart = new ApexCharts(document.querySelector("#organisationAttritionDetails"), ottritionDetailsoptions);
chart.render();


// filter over take items
function toggleSections() {
    const todoListContainer = document.getElementById('todoListContainer');
    const holidayListContainer = document.getElementById('holidayListContainer');
    const myLeaveBalanceCheckbox = document.getElementById('myLeaveBalance');
    const companyAnnouncementCheckbox = document.getElementById('companyAnnouncement');
    const myAttendanceCheckbox = document.getElementById('myAttendance');

    // Count how many checkboxes are unchecked
    const uncheckedCount = [myLeaveBalanceCheckbox, companyAnnouncementCheckbox, myAttendanceCheckbox]
        .filter(checkbox => !checkbox.checked).length;

    // If at least two checkboxes are unchecked, show To Do List first
    if (uncheckedCount >= 2) {
        todoListContainer.parentNode.insertBefore(todoListContainer, holidayListContainer);
    } else {
        // Otherwise, show Holiday List first
        todoListContainer.parentNode.insertBefore(holidayListContainer, todoListContainer);
    }
}