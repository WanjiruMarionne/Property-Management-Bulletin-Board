// Function to show the Events tab
function showEventsTab() {
    const eventsContainer = document.getElementById('events-container');
    eventsContainer.innerHTML = '<h3>Scheduled Events</h3>';
    centerElement(eventsContainer);

    fetchEventsData()
        .then(data => {
            allEventsData = data;
            showAllEvents(eventsContainer);
        })
        .catch(error => console.error('Error fetching event data:', error));
}

// Function to show all events
function showAllEvents(container) {
    allEventsData.forEach(event => {
        displayEvent(container, event);
    });
}

// Function to fetch events data
function fetchEventsData() {
    return fetch("http://localhost:3000/events")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
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
    container.appendChild(eventDiv);
}

//Community forum display and development logic    

function showCommunityForumTab() {
    const communityForumTab = document.getElementById('communityForumTab');
    communityForumTab.style.display = 'block';
    centerElement(communityForumTab);
    showCommunityForum();
}

//Declare the forum comments element


function postComment() {
    const commentInput = document.getElementById('commentInput');
    const newComment = commentInput.value.trim();

    let forumComments = [];
    if (newComment !== '') {
        forumComments.push(newComment);
        showCommunityForumTab();
        commentInput.value = '';
    }
}

function showCommunityForum() {
    const contentDiv = document.getElementById('commentsSection');
    contentDiv.innerHTML = '';
    let forumComments = [];
    contentDiv.innerHTML += forumComments.map(comment => `<p>${comment}</p>`).join('');
}

function centerElement(element) {
    element.style.position = 'absolute';
    element.style.top = '10%';
    element.style.left = '150%';
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

    

    // Initially, show the limited events
    showEventsTab();

});