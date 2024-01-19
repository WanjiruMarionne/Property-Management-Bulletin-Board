document.addEventListener('DOMContentLoaded', function() {

    fetch("http://localhost:3000/events")
    .then(response => response.json())
    .then(data => {
        console.log(data);

        const eventsContainer = document.getElementById('events-container');

        let moreDetailsButton;

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

            //Data display on screen break
            // Create a div for additional content
            const additionalContent = document.createElement('div');
            additionalContent.classList.add('additional-content');

            const location = document.createElement('p');
            location.textContent = `Location: ${event.location}`;
            additionalContent.appendChild(location);

            const impact = document.createElement('p');
            impact.textContent = `Impact: ${event.impact}`;
            additionalContent.appendChild(impact);

            const contact = document.createElement('p');
            contact.textContent = `Contact: ${event.contact}`;
            additionalContent.appendChild(contact);

            const reason = document.createElement('p');
            reason.textContent = `Reason: ${event.reason}`;
            additionalContent.appendChild(reason);

            const expectedDuration = document.createElement('p');
            expectedDuration.textContent = `Expected Duration: ${event.expected_duration}`;
            additionalContent.appendChild(expectedDuration);

            const alternativeAccess = document.createElement('p');
            alternativeAccess.textContent = `Alternative Access: ${event.alternative_access}`;
            additionalContent.appendChild(alternativeAccess);

            const updates = document.createElement('p');
            updates.textContent = `Updates: ${event.updates}`;
            additionalContent.appendChild(updates);

            // Append the additional content div to the event div
            eventDiv.appendChild(additionalContent);
            
            //Create a more details button for the additional content and add event listener
            const moreDetailsButton = document.createElement('button');
            moreDetailsButton.textContent = 'More Details';

            // Add a click event listener to the moreDetailsButton
            moreDetailsButton.addEventListener('click', function () {
                // Toggle the display style of additionalContent
                additionalContent.style.display = (additionalContent.style.display === 'none' || additionalContent.style.display === '') ? 'block' : 'none';
            });

            // Append the more details button to the event div
            eventDiv.appendChild(moreDetailsButton);

            
            // Append the event div to the events container
            eventsContainer.appendChild(eventDiv);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });



});