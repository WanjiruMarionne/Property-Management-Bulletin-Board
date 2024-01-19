document.addEventListener('DOMContentLoaded', function() {

    fetch("http://localhost:3000/events")
    .then(response => response.json())
    .then(data => {
        console.log(data);

        const eventsContainer = document.getElementById('events-container');

        // Iterate over the array of events
        data.forEach(event => {
            // Create a div for each event
            const eventDiv = document.createElement('div');
            eventDiv.classList.add('event-container');

            // Create and append elements for each event property
            const title = document.createElement('p');
            title.classList.add('title'); // Add title class
            title.textContent = `Title: ${event.title}`;
            eventDiv.appendChild(title);

            const dateTime = document.createElement('p');
            dateTime.classList.add('date-time'); // Add date-time class
            dateTime.textContent = `Date and Time: ${event.date_time}`;
            eventDiv.appendChild(dateTime);

            const location = document.createElement('p');
            location.textContent = `Location: ${event.location}`;
            eventDiv.appendChild(location);

            const impact = document.createElement('p');
            impact.textContent = `Impact: ${event.impact}`;
            eventDiv.appendChild(impact);

            const contact = document.createElement('p');
            contact.textContent = `Contact: ${event.contact}`;
            eventDiv.appendChild(contact);

            const reason = document.createElement('p');
            reason.textContent = `Reason: ${event.reason}`;
            eventDiv.appendChild(reason);

            const expectedDuration = document.createElement('p');
            expectedDuration.textContent = `Expected Duration: ${event.expected_duration}`;
            eventDiv.appendChild(expectedDuration);

            const alternativeAccess = document.createElement('p');
            alternativeAccess.textContent = `Alternative Access: ${event.alternative_access}`;
            eventDiv.appendChild(alternativeAccess);

            const updates = document.createElement('p');
            updates.textContent = `Updates: ${event.updates}`;
            eventDiv.appendChild(updates);

            // Append the eventDiv to the eventsContainer
            eventsContainer.appendChild(eventDiv);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });



});