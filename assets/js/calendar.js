$(document).ready(function () {
    // Initialize calendar
    var calendar = $('#calendar').fullCalendar({
        header: false, // Hide default header
        defaultView: 'month',
        editable: false,
        height: 'auto',
        dayRender: function (date, cell) {
            // Add classes based on your design
            if (date.month() !== moment().month()) {
                $(cell).addClass('prev-and-next-munth-date');
            }

            // Add your custom classes (general-do, general-na) based on some condition
            if (date.date() % 2 === 0) {
                $(cell).addClass('general-do');
            } else {
                $(cell).addClass('general-na');
            }

            // Highlight today
            if (date.isSame(moment(), 'day')) {
                $(cell).addClass('active');
            }

            // Add click handler for modal
            $(cell).click(function () {
                var clickedDate = date.format('YYYY-MM-DD');
                showDailyRoutine(clickedDate);
            });
        },
        viewRender: function (view) {
            // Update the custom month/year display
            $('#current-month-year').text(view.title);
        }
    });

    // Custom navigation buttons
    $('#custom-prev').click(function () {
        $('#calendar').fullCalendar('prev');
    });

    $('#custom-next').click(function () {
        $('#calendar').fullCalendar('next');
    });

    // Function to show daily routine modal
    function showDailyRoutine(date) {
        // Here you would typically load data for the selected date
        // For this example, we'll just show the date
        $('#routine-content').html('<p>Details for ' + moment(date).format('MMMM D, YYYY') + '</p>');

        // Show the modal
        var modal = new bootstrap.Modal(document.getElementById('dailyroutineDetails'));
        modal.show();
    }
});