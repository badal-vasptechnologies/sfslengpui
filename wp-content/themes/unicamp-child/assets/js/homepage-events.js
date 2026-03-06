jQuery(document).ready(function ($) {

    $.post(homeEvents.ajax_url, {
        action: 'get_homepage_events'
    }, function (res) {

        console.log('Homepage events response:', res);

        if (!res.success || !res.data || res.data.length === 0) {
            $('#homepageEventsList').html('<p>No events found</p>');
            return;
        }

        const today = new Date();
        today.setHours(0,0,0,0);

        /* ==================================================
           STEP 1: GROUP FUTURE EVENTS BY DATE → TYPE
        ================================================== */

        const groupedEvents = {};

        res.data.forEach(item => {

            const [d, m, y] = item.e_date.split('-');
            const eventDate = new Date(y, m - 1, d);
            eventDate.setHours(0,0,0,0);

            // Skip past dates
            if (eventDate < today) return;

            const dateKey = item.e_date;

            if (!groupedEvents[dateKey]) {
                groupedEvents[dateKey] = {
                    date: eventDate,
                    day: d,
                    month: new Date(y, m - 1).toLocaleString('en', { month: 'short' }),
                    types: {}
                };
            }

            item.event_name.forEach(ev => {
                const type = ev.type_code || 'OTHER';

                if (!groupedEvents[dateKey].types[type]) {
                    groupedEvents[dateKey].types[type] = [];
                }

                groupedEvents[dateKey].types[type].push(
                    ev.event_details || ev.event_name
                );
            });
        });

        /* ==================================================
           STEP 2: SORT DATES & LIMIT (NEXT 4 DATES)
        ================================================== */

        const sortedDates = Object.keys(groupedEvents)
            .sort((a, b) => groupedEvents[a].date - groupedEvents[b].date)
            .slice(0, 4);

        /* ==================================================
           STEP 3: RENDER HTML
        ================================================== */

        let html = '';

        if (sortedDates.length === 0) {
            html = '<p>No upcoming events</p>';
        } else {

            sortedDates.forEach(dateKey => {
                const group = groupedEvents[dateKey];

                html += `
                    <div class="ue-item">
                        <div class="ue-date">
                            <div class="ue-day">${group.day}</div>
                            <div class="ue-month">${group.month.toUpperCase()}</div>
                        </div>
                        <div class="ue-content">
                `;

                Object.keys(group.types).forEach(type => {

                    html += `
                        <div class="ue-type-group">
                            <div class="ue-type-title ue-type-${type.toLowerCase().replace(/\s+/g,'-')}">
                                ${formatEventType(type)}
                            </div>
                    `;

                    group.types[type].forEach(title => {
                        html += `<h4 class="ue-title">${title}</h4>`;
                    });

                    html += `</div>`;
                });

                html += `
                        </div>
                    </div>
                `;
            });
        }

        $('#homepageEventsList').html(html);
    });
});

/* ======================================
   Helper: Format event type nicely
====================================== */
function formatEventType(type) {
    const map = {
        'HOLIDAY': 'Holiday',
        'INSTRUCTIONAL DAY': 'Instructional Day',
        'INSTRUCTIONAL': 'Instructional Day',
        'MEETING': 'Meeting',
        'EXAM': 'Examination',
        'TRAINING': 'Training',
        'OTHER': 'Other'
    };

    return map[type] || type.replace(/_/g, ' ')
        .toLowerCase()
        .replace(/\b\w/g, l => l.toUpperCase());
}
