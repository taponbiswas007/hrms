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


// line chart


// head count chart
var options = {
    series: [
        {
            name: 'Actual',
            data: [
                {
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
        }
    ],
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
    series: [
        {
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
            legend: {
                position: 'bottom'
            }
        }
    }]
};

var chart = new ApexCharts(document.querySelector("#attendanceReport"), options);
chart.render();

