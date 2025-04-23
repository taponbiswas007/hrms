$(document).ready(function () {
    $(document).on('click', '.fc-day-number', function (e) {
        // Get the parent td element
        var parentTd = $(this).closest('td');

        // Stop the original event to prevent any other handlers
        e.stopPropagation();

        // Get the date from the parent td's data attribute or however it's stored
        // This depends on how your calendar stores the date - adjust as needed
        var dateStr = parentTd.data('date') ||
            parentTd.attr('data-date') ||
            $(this).data('date') ||
            $(this).attr('data-date');

        // If you can't get the date from data attributes, you might need to:
        // 1. Find the date from the calendar's API
        // 2. Or parse it from other elements in the cell

        // If you have the date, call the function directly
        if (dateStr) {
            showDailyRoutine(dateStr);
        }
        // Otherwise trigger the click on the parent td
        else {
            parentTd.trigger('click');
        }
    });
    // Initialize calendar
    var calendar = $('#calendar').fullCalendar({
        header: false, // Hide default header
        defaultView: 'month',
        editable: false,
        height: 'auto',
        dayRender: function (date, cell) {
            // Only apply classes if date is today or in the past
            if (date.isSameOrBefore(moment(), 'day')) {
                if (date.date() % 2 === 0) {
                    $(cell).addClass('general-do');
                } else {
                    $(cell).addClass('general-na');
                }
            }

            // Rest of your dayRender code...
            if (date.month() !== moment().month()) {
                $(cell).addClass('prev-and-next-munth-date');
            }

            if (date.isSame(moment(), 'day')) {
                $(cell).addClass('active');
            }

            $(cell).click(function () {
                showDailyRoutine(date);
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
        // Format the date for display
        var formattedDate = moment(date).format('MMMM D, YYYY');

        // Get the modal element
        var modalEl = document.getElementById('dailyroutineDetails');

        // Get existing modal instance or create new one
        var modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);

        // Update modal title with the selected date
        $('#dailyroutineDetails .modal-title').text('Daily Routine - ' + formattedDate);

        // ==============================================
        // OPTION 1: STATIC EXAMPLE DATA (DEMO PURPOSES)
        // ==============================================
        $('#dailyroutineDetails .modal-body').html(`
            <h3>Shift Name : <span>General</span></h3>
            <h3>Shift Start : <span>09:00 AM</span></h3>
            <h3>Shift End : <span>06:00 PM</span></h3>
            <h3>Time In : <span>08:55 AM</span></h3>
            <h3>Time Out : <span>06:05 PM</span></h3>
            <h3>Present Hours : <span>09:10</span></h3>
        `);

        // ==============================================
        // OPTION 2: DYNAMIC DATA (REAL IMPLEMENTATION)
        // ==============================================
        /*
        // Example AJAX call to get real data
        $.ajax({
            url: '/api/get-attendance',
            method: 'GET',
            data: { date: moment(date).format('YYYY-MM-DD') },
            success: function(response) {
                $('#dailyroutineDetails .modal-body').html(`
                    <h3>Shift Name : <span>${response.shiftName || '--'}</span></h3>
                    <h3>Shift Start : <span>${response.startTime || '--'}</span></h3>
                    <h3>Shift End : <span>${response.endTime || '--'}</span></h3>
                    <h3>Time In : <span>${response.timeIn || '--'}</span></h3>
                    <h3>Time Out : <span>${response.timeOut || '--'}</span></h3>
                    <h3>Present Hours : <span>${response.hoursWorked || '00:00'}</span></h3>
                `);
            },
            error: function() {
                $('#dailyroutineDetails .modal-body').html(`
                    <div class="alert alert-danger">
                        Failed to load attendance data
                    </div>
                    <h3>Shift Name : <span>--</span></h3>
                    <h3>Shift Start : <span>--</span></h3>
                    <h3>Shift End : <span>--</span></h3>
                    <h3>Time In : <span>--</span></h3>
                    <h3>Time Out : <span>--</span></h3>
                    <h3>Present Hours : <span>--</span></h3>
                `);
            }
        });
        */

        // Show the modal
        modal.show();

        // Close button handler (if needed)
        $('#dailyroutineDetails .btn-close').off('click').on('click', function () {
            modal.hide();
        });
    }
});