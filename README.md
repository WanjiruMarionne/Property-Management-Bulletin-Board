# Property-Management-Bulletin-Board



# Pending: 
1. Logo and social media icons on footer





#forecast-container #forecast-image {
    height: 25px;
    width: 25px;
    position: absolute;
}



#forecast-container #description-container {
    position: absolute;
    top: 30%;
    left: 40%;
    text-align: center;
}

#calendar-time {
    box-sizing: border-box;
    height: 50%;
    width: 20%;
    position: absolute;
    top: 15%;
    left: 77%;
}

#logo img {
    width: 50%;
    height: 80%;
}

.content-container {
    background-color:rgb(217, 217, 217);
}



 document.addEventListener('DOMContentLoaded', function() {

fetch("http://localhost:3000/events")
.then(response => {
    console.log(response);
    return response.json();
})
.then(data => {
    console.log(data);

    //Display the events on page
    const title = document.getElementById('title');
    const dateTime = document.getElementById('date-time');
    const location = document.getElementById('location');
    const impact = document.getElementById('impact');
    const contact = document.getElementById('contact');
    const reason = document.getElementById('reason');
    const expectedDuration = document.getElementById('expected-duration');
    const alternativeAccess = document.getElementById('alternative-access');
    const updates = document.getElementById('updates');

    //Link the events to JSON file and create respective elements
    const titleText = document.createElement('p');
    titleText.textContent = data.title;
    title.innerHTML = "";
    title.appendChild(titleText);

    const dateTimeText = document.createElement('p');
    dateTimeText.textContent = data.date_time;
    dateTime.innerHTML = "";
    dateTime.appendChild(dateTimeText);

    const locationText = document.createElement('p');
    locationText.textContent = data.location;
    location.innerHTML = "";
    location.appendChild(locationText);

    const impactText = document.createElement('p');
    impactText.textContent = data.impact;
    impact.innerHTML = "";
    impact.appendChild(impactText);

    const contactText = document.createElement('p');
    contactText.textContent = data.contact;
    contact.innerHTML = "";
    contact.appendChild(contactText);
    
    const reasonText = document.createElement('p');
    reasonText.textContent = data.reason;
    reason.innerHTML = "";
    reason.appendChild(reasonText);

    const expectedDurationText = document.createElement('p');
    expectedDurationText.textContent = data.expected_duration;
    expectedDuration.innerHTML = "";
    expectedDuration.appendChild(expectedDurationText);
    
    const alternativeAccessText = document.createElement('p');
    alternativeAccessText.textContent = data.alternative_access;
    alternativeAccess.innerHTML = "";
    alternativeAccess.appendChild(alternativeAccessText);

    updatesText = document.createElement('p');
    updatesText.textContent = data.updates;
    updates.innerHTML = "";
    updates.appendChild(updatesText);

   
})
.catch(error => {
    console.error('Error fetching data:', error);
});

});