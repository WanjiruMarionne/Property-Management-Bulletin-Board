//Events display and development logic   
//Function to show the Events tab
// Function to show all events
function showAllEvents(container) {
    allEventsData.forEach(event => {
        displayEvent(container, event);
    });
}

//Function to fetch events data
function fetchEventsData() {
    // Fetch events
    return fetch("http://localhost:3000/events")
        .then(response => response.json())
        // Handle the fetched data
        .then(data => {
            console.log(data);
            return data; // Return the fetched data
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error; // Propagate the error
        });
}

// Function to display a single event
function displayEvent(container, event) {
    const eventDiv = document.createElement('div');
    eventDiv.classList.add('event-container');

    const title = document.createElement('p');
    title.classList.add('title');
    title.textContent = `Title: ${event.title}`;
    eventDiv.appendChild(title);

    const dateTime = document.createElement('p');
    dateTime.classList.add('date-time');
    dateTime.textContent = `Date and Time: ${event.date_time}`;
    eventDiv.appendChild(dateTime);

    //Truncate the events details so that only title and date shows
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

    //Append the additionalContent to the eventDiv 
    eventDiv.appendChild(additionalContent);

    //Append the eventDiv to the eventsContainer
    container.appendChild(eventDiv);

   
    eventDiv.style.top = `${allEventsData.indexOf(event) * 400}%`; // Adjust the multiplier as needed

    //Create a more details button to handle the truncated data
    const moreDetailsButton = document.createElement('button');
    moreDetailsButton.textContent = 'More Details';

    // Add a click event listener to the moreDetailsButton
    moreDetailsButton.addEventListener('click', function () {
    //Toggle the display style of additionalContent
    additionalContent.style.display = (additionalContent.style.display === 'none' || additionalContent.style.display === '') ? 'block' : 'none';
    });
}

// Function to hide all additional content
function hideAllAdditionalContent() {
    moreDetailsButtons.forEach(button => {
        const additionalContent = button.nextElementSibling;
        additionalContent.style.display = 'none';
    });
}

    // Function to show the Events tab
    function showEventsTab() {
        document.getElementById('events-container').style.display = 'block';
        document.getElementById('communityForumTab').style.display = 'none';
    
        const eventsContainer = document.getElementById('events-container');
        eventsContainer.innerHTML = '<h3>Scheduled Events</h3>';
        centerElement(eventsContainer);
        showAllEvents();
    
        fetchEventsData()
            .then(data => {
                allEventsData = data;
                showAllEvents(eventsContainer);
            })
            .catch(error => console.error('Error fetching event data:', error));
    }
    

//Community forum display and development logic    
    
// Function to show the community forum tab
function showCommunityForumTab() {
    const communityForumTab = document.getElementById('communityForumTab');
    communityForumTab.style.display = 'block';
    centerElement(communityForumTab);
    showCommunityForum();
    }

//Function to post comments
function postComment() {
    const commentInput = document.getElementById('commentInput');
    const newComment = commentInput.value.trim();

    //Declare the forum comments element
    let forumComments = [];
    if (newComment !== '') {
        forumComments.push(newComment);
        showCommunityForumTab();
        commentInput.value = '';
    }
}

//Function to show the comments section
function showCommunityForum() {
    let forumComments = [];
    const contentDiv = document.getElementById('commentsSection');
    contentDiv.innerHTML = '';
    contentDiv.innerHTML += forumComments.map(comment => `<p>${comment}</p>`).join('');
}

//Function to style the section when it shows on window
function centerElement(element) {
    element.style.position = 'absolute';
    element.style.top = '10%';
    element.style.left = '100%';
    element.style.textAlign = 'center';
}

document.addEventListener('DOMContentLoaded', function() {
    
    //Handling the weather container
    //Weather information
    // Default latitude and longitude values for the town of application: set to Westlands-Kenya
    const latitude = -1.2667;
    const longitude = 36.8;

    //Other parameters
    const hourly = 'temperature_2m,rain,weather_code';
    const forecastDays = 1;

    // Fetch weather data
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=${hourly}&forecast_days=${forecastDays}`)
        .then(response => response.json())
        .then(data => {
            // Handle the fetched data
            console.log(data);

            // Link fetched data to HTML weather container
            const weatherText = document.getElementById('weather-text');
            const forecastImage = document.getElementById('forecast-image');
            const temperature = document.getElementById('temperature');
            const weatherDesc = document.getElementById('weather-desc');

            // Update the content based on the fetched data
            weatherText.textContent = 'Weather Forecast'; 
            temperature.textContent = `${data.hourly.temperature_2m[0]}°C`;
           

            //Use the weather code to display an image
            const weatherCode = data.hourly.weather_code[0];
            const imagePath = weatherCodeImage(weatherCode);

            // Create an image element and set its source
            const weatherImage = document.createElement('img');
            weatherImage.src = imagePath;
            weatherImage.alt = `Weather Code: ${data.hourly.weather_code[0]}`;

            // Append the image to the forecastImage div
            forecastImage.innerHTML = '';
            forecastImage.appendChild(weatherImage);

            // Create weather text description element      
            const weatherDescription = document.createElement('p');
            weatherDescription.textContent = weatherCodeDescription(weatherCode);

            // Append the text to the weatherDesc div
            weatherDesc.innerHTML= "";
            weatherDesc.appendChild(weatherDescription);


        })
        .catch(error => {
            // Handle errors
            console.error('Error fetching data:', error);
    });

    //Function for displaying the images based on the weather code
    function weatherCodeImage(code) {
        //Image path logic
        if (code >= 1 && code <= 2) {
            return './images/mostly-clear.png';
        } else if (code == 3) {
            return './images/partly-cloudy.png';
        } else if (code >= 4 && code <= 19) {
            return './images/mostly-cloudy-foggy.png';
        } else if (code >= 20 && code <= 29) {
            return './images/rain.png';
        } else {
            // Default image path if no match is found
            return './images/weather-unknown.png';
        }
    }

    //Function for displaying weather description based on the weather code
    function weatherCodeDescription(code) {
        //Weather description logic
        if (code >= 1 && code <= 2) {
            return "Mostly Clear";
        } else if (code === 3) {
            return "Partly Cloudy";
        } else if (code >= 4 && code <= 19) {
            return "Mostly Cloudy/Foggy";
        } else if (code >= 20 && code <= 29) {
            return "Rainy";
        } else {
            return '';
        }
    }

    //Handling the quotes container
    //Fetch quotes
    fetch('https://api.api-ninjas.com/v1/quotes?category=' + 'environmental', {
    headers: {
        'X-Api-Key': 'NuR9UNq5MFijxZF/OQrw9w==60mY6RXuJh6ocKLu'
    }
    })
    .then(response => {
        console.log('API Response:', response);
        return response.json();
    })
    // Handle the fetched data
    .then(data => {
        console.log('Fetched data:', data);

        // Link fetched data to HTML quotes container
        const quotationMark = document.getElementById('quotation-mark');
        const quoteElement = document.getElementById('quote');
        const authorElement = document.getElementById('author');

        // Update the content based on the fetched data, create and append elements
        const quotationMarkImage= document.createElement('img');
        quotationMarkImage.src = "./images/quotes.png";
        quotationMark.innerHTML = '';
        quotationMark.appendChild(quotationMarkImage);

        const quoteText = document.createElement('p');
        quoteText.textContent = data[0].quote;
        quoteElement.innerHTML = "";
        quoteElement.appendChild(quoteText);

        const authorText = document.createElement('p');
        authorText.textContent = data[0].author;
        authorElement.innerHTML = "";
        authorElement.appendChild(authorText);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });


    function fetchEventsData() {
        // Fetch events
        return fetch("http://localhost:3000/events")
            .then(response => response.json())
            // Handle the fetched data
            .then(data => {
                console.log(data);
                return data; // Return the fetched data
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                throw error; // Propagate the error
            });
    }

    function displayEvent(container, event) {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event-container');
    
        const title = document.createElement('p');
        title.classList.add('title');
        title.textContent = `Title: ${event.title}`;
        eventDiv.appendChild(title);
    
        const dateTime = document.createElement('p');
        dateTime.classList.add('date-time');
        dateTime.textContent = `Date and Time: ${event.date_time}`;
        eventDiv.appendChild(dateTime);
    
        //Truncate the events details so that only title and date shows
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
    
        //Append the additionalContent to the eventDiv 
        eventDiv.appendChild(additionalContent);
    
        //Append the eventDiv to the eventsContainer
        container.appendChild(eventDiv);

        //Create a more details button to handle the truncated data
        const moreDetailsButton = document.createElement('button');
        moreDetailsButton.textContent = 'More Details';
    
        // Add a click event listener to the moreDetailsButton
        moreDetailsButton.addEventListener('click', function () {
        //Toggle the display style of additionalContent
        additionalContent.style.display = (additionalContent.style.display === 'none' || additionalContent.style.display === '') ? 'block' : 'none';
        });
    
    
    }
    
    // Function to hide all additional content
    function hideAllAdditionalContent() {
        moreDetailsButtons.forEach(button => {
            const additionalContent = button.nextElementSibling;
            additionalContent.style.display = 'none';
        });
    }

    //DOM loading for events
    const maxInitialEventsToShow = 3;
    // Function to show 3 events
    function showLimitedEvents(container, maxEvents) {
        allEventsData.slice(0, maxEvents).forEach(event => {
            displayEvent(container, event);
        });
    }
    
    fetchEventsData()
        .then(data => {
            allEventsData = data;
            showLimitedEvents(eventsContainer, maxInitialEventsToShow);
        })
        .catch(error => console.error('Error fetching event data:', error));
    
        showLimitedEvents(eventsContainer, maxInitialEventsToShow);

});