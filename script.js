// ===============================
// EVENT NAMES FOR OLD EVENT PAGES
// ===============================

const oldEventNames = {
    hackathon: "Hackathon 2026",
    cultural: "Cultural Fest",
    workshop: "Tech Workshop"
};


// ===============================
// DEFAULT EVENTS
// ===============================

const defaultEvents = [

    {
        name: "Hackathon 2026",
        date: "10 October 2026",
        time: "9:00 AM - 6:00 PM",
        venue: "Main Auditorium",
        description:
            "A college-level coding event where students can work together to develop innovative solutions to real-world problems.",
        fee: "Free"
    },

    {
        name: "Cultural Fest",
        date: "20 October 2026",
        time: "10:00 AM - 8:00 PM",
        venue: "College Ground",
        description:
            "A vibrant celebration featuring music, dance, performances and exciting activities.",
        fee: "Free"
    },

    {
        name: "Tech Workshop",
        date: "25 October 2026",
        time: "11:00 AM - 2:00 PM",
        venue: "Computer Lab",
        description:
            "An interactive workshop designed to help students learn new and useful technologies.",
        fee: "Free"
    }

];


// ===============================
// CREATE DEFAULT EVENTS
// ===============================

if (!localStorage.getItem("collegeEvents")) {

    localStorage.setItem(
        "collegeEvents",
        JSON.stringify(defaultEvents)
    );

}


// ===============================
// ORGANIZER LOGIN
// ===============================
// ===============================
// ORGANIZER LOGIN
// ===============================

// ===============================
// ORGANIZER LOGIN
// ===============================

const organizerLoginForm =
    document.getElementById("organizerLoginForm");

const loginMessage =
    document.getElementById("loginMessage");


if (organizerLoginForm) {

    organizerLoginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const passkey =
                document.getElementById("passkey").value;

            const correctPasskey = "1234";


            if (passkey === correctPasskey) {

                // Save organizer login status
                localStorage.setItem(
                    "organizerLoggedIn",
                    "true"
                );

                // Open organizer panel
                window.location.href =
                    "organizer.html";

            } else {

                loginMessage.textContent =
                    "Incorrect passkey. Please try again.";

            }

        }
    );

}

// ===============================
// ORGANIZER - ADD EVENT
// ===============================

const eventForm =
    document.getElementById("eventForm");

const eventSuccessMessage =
    document.getElementById("eventSuccessMessage");


if (eventForm) {

    eventForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const newEvent = {

                name:
                    document.getElementById(
                        "eventName"
                    ).value,

                date:
                    document.getElementById(
                        "eventDate"
                    ).value,

                time:
                    document.getElementById(
                        "eventTime"
                    ).value,

                venue:
                    document.getElementById(
                        "eventVenue"
                    ).value,

                description:
                    document.getElementById(
                        "eventDescription"
                    ).value,

                fee:
                    document.getElementById(
                        "eventFee"
                    ).value

            };


            let events =
                JSON.parse(
                    localStorage.getItem(
                        "collegeEvents"
                    )
                ) || [];


            events.push(newEvent);


            localStorage.setItem(
                "collegeEvents",
                JSON.stringify(events)
            );


            eventSuccessMessage.textContent =
                "Event added successfully!";


            eventForm.reset();

        }
    );

}


// ===============================
// DISPLAY ALL EVENTS ON HOME PAGE
// ===============================

const dynamicEvents =
    document.getElementById("dynamicEvents");


if (dynamicEvents) {

    const events =
        JSON.parse(
            localStorage.getItem(
                "collegeEvents"
            )
        ) || [];


    if (events.length === 0) {

        dynamicEvents.innerHTML =
            "<p>No events available.</p>";

    }


    events.forEach(
        function(event, index) {

            const eventCard =
                document.createElement("div");


            eventCard.className =
                "event-card";


            eventCard.innerHTML = `

                <h3>
                    ${event.name}
                </h3>

                <p>
                    📅 ${event.date}
                </p>

                <p>
                    ⏰ ${event.time}
                </p>

                <p>
                    📍 ${event.venue}
                </p>

                <p>
                    ${event.description}
                </p>

                <p>
                    <strong>
                        Registration Fee:
                    </strong>

                    ${event.fee}
                </p>

                <button
                    type="button"
                    onclick="openRegistration(${index})">

                    Register

                </button>

            `;


            dynamicEvents.appendChild(
                eventCard
            );

        }
    );

}


// ===============================
// OPEN REGISTRATION
// ===============================

function openRegistration(index) {

    window.location.href =
        "dynamic-registration.html?event="
        + index;

}


// ===============================
// DYNAMIC EVENT REGISTRATION
// ===============================

const dynamicRegistrationForm =
    document.getElementById(
        "dynamicRegistrationForm"
    );


if (dynamicRegistrationForm) {

    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    const eventIndex =
        urlParams.get("event");


    const events =
        JSON.parse(
            localStorage.getItem(
                "collegeEvents"
            )
        ) || [];


    if (
        eventIndex === null ||
        !events[eventIndex]
    ) {

        document.getElementById(
            "eventName"
        ).textContent =
            "Event not found";


        dynamicRegistrationForm.style.display =
            "none";

    } else {

        const currentEvent =
            events[eventIndex];


        // Display event information

        document.getElementById(
            "eventName"
        ).textContent =
            currentEvent.name;


        document.getElementById(
            "eventDate"
        ).textContent =
            "📅 " + currentEvent.date;


        document.getElementById(
            "eventTime"
        ).textContent =
            "⏰ " + currentEvent.time;


        document.getElementById(
            "eventVenue"
        ).textContent =
            "📍 " + currentEvent.venue;


        document.getElementById(
            "eventDescription"
        ).textContent =
            currentEvent.description;


        document.getElementById(
            "eventFee"
        ).textContent =
            currentEvent.fee;


        // Unique participant storage

        const participantKey =
            "dynamicEventParticipants_"
            + eventIndex;


        // Registration

        dynamicRegistrationForm.addEventListener(
            "submit",
            function(event) {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "dynamicName"
                    ).value;


                const branch =
                    document.getElementById(
                        "dynamicBranch"
                    ).value;


                const year =
                    document.getElementById(
                        "dynamicYear"
                    ).value;


                const email =
                    document.getElementById(
                        "dynamicEmail"
                    ).value;


                const phone =
                    document.getElementById(
                        "dynamicPhone"
                    ).value;


                const registeredAt =
                    new Date().toLocaleTimeString(
                        [],
                        {
                            hour: "2-digit",
                            minute: "2-digit"
                        }
                    );


                const participant = {

                    name: name,

                    branch: branch,

                    year: year,

                    email: email,

                    phone: phone,

                    registeredAt: registeredAt

                };


                let participants =
                    JSON.parse(
                        localStorage.getItem(
                            participantKey
                        )
                    ) || [];


                participants.push(
                    participant
                );


                localStorage.setItem(
                    participantKey,
                    JSON.stringify(
                        participants
                    )
                );


                // Success message

                document.getElementById(
                    "dynamicSuccessMessage"
                ).textContent =
                    "Registration successful! Welcome, "
                    + name + "!";


                // Hide form

                dynamicRegistrationForm.style.display =
                    "none";


                // Show participants button

                const viewButton =
                    document.getElementById(
                        "dynamicViewParticipants"
                    );


                viewButton.href =
                    "participants.html?eventIndex="
                    + eventIndex;


                viewButton.style.display =
                    "inline-block";

            }
        );

    }

}


// ===============================
// DISPLAY DYNAMIC PARTICIPANTS
// ===============================

const participantList =
    document.getElementById(
        "participantList"
    );


if (
    participantList &&
    new URLSearchParams(
        window.location.search
    ).has("eventIndex")
) {

    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    const eventIndex =
        urlParams.get("eventIndex");


    const events =
        JSON.parse(
            localStorage.getItem(
                "collegeEvents"
            )
        ) || [];


    if (!events[eventIndex]) {

        document.getElementById(
            "eventTitle"
        ).textContent =
            "Event not found";


        participantList.innerHTML =
            "<p>Event does not exist.</p>";

    } else {

        const currentEvent =
            events[eventIndex];


        document.getElementById(
            "eventTitle"
        ).textContent =
            currentEvent.name
            + " Participants";


        const participantKey =
            "dynamicEventParticipants_"
            + eventIndex;


        const participants =
            JSON.parse(
                localStorage.getItem(
                    participantKey
                )
            ) || [];


        if (participants.length === 0) {

            participantList.innerHTML =
                "<p>No participants have registered yet.</p>";

        } else {

            participants.forEach(
                function(participant, index) {

                    const participantCard =
                        document.createElement(
                            "div"
                        );


                    participantCard.className =
                        "participant-card";


                    participantCard.innerHTML = `

                        <h3>
                            ${index + 1}.
                            ${participant.name}
                        </h3>

                        <p>
                            Branch:
                            ${participant.branch}
                        </p>

                        <p>
                            Year:
                            ${participant.year}
                        </p>

                        <p>
                            Email:
                            ${participant.email}
                        </p>

                        <p>
                            Phone:
                            ${participant.phone}
                        </p>

                        <p>
                          <p>
    Registered at:
    ${participant.registeredAt}
</p>

${localStorage.getItem("organizerLoggedIn") === "true" ? `
    <button
        type="button"
        onclick="deleteParticipant(${eventIndex}, ${index})">

        Delete Participant

    </button>
` : ""}

`;


                    participantList.appendChild(
                        participantCard
                    );

                }
            );

        }

    }

}


// ===============================
// ORGANIZER - MANAGE EVENTS
// ===============================

const organizerEvents =
    document.getElementById(
        "organizerEvents"
    );


if (organizerEvents) {

    function displayOrganizerEvents() {

        organizerEvents.innerHTML = "";


        const events =
            JSON.parse(
                localStorage.getItem(
                    "collegeEvents"
                )
            ) || [];


        if (events.length === 0) {

            organizerEvents.innerHTML =
                "<p>No events added yet.</p>";

            return;

        }


        events.forEach(
            function(event, index) {

                const eventCard =
                    document.createElement(
                        "div"
                    );


                eventCard.className =
                    "event-card";


                eventCard.innerHTML = `

                    <h3>
                        ${event.name}
                    </h3>

                    <p>
                        📅 ${event.date}
                    </p>

                    <p>
                        ⏰ ${event.time}
                    </p>

                    <p>
                        📍 ${event.venue}
                    </p>

                    <p>
                        ${event.description}
                    </p>

                    <p>
                        <strong>
                            Registration Fee:
                        </strong>

                        ${event.fee}
                    </p>

                   <a
    href="participants.html?eventIndex=${index}"
    style="text-decoration: none;">

    <button type="button">
        View Participants
    </button>

</a>

<button
    type="button"
    onclick="deleteEvent(${index})">

    Delete Event

</button>
                `;


                organizerEvents.appendChild(
                    eventCard
                );

            }
        );

    }


    displayOrganizerEvents();

}


// ===============================
// DELETE EVENT
// ===============================

function deleteEvent(index) {

    const events =
        JSON.parse(
            localStorage.getItem(
                "collegeEvents"
            )
        ) || [];


    events.splice(
        index,
        1
    );


    localStorage.setItem(
        "collegeEvents",
        JSON.stringify(events)
    );


    location.reload();

}


// ===============================
// OLD EVENT PAGE REGISTRATION
// ===============================
// This keeps your old
// hackathon.html,
// cultural.html and
// workshop.html pages working.

const oldForm =
    document.getElementById(
        "registrationForm"
    );


if (oldForm) {

    oldForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "name"
                ).value;


            const registeredAt =
                new Date().toLocaleTimeString(
                    [],
                    {
                        hour: "2-digit",
                        minute: "2-digit"
                    }
                );


            const currentEvent =
                oldForm.getAttribute(
                    "data-event"
                );


            const storageKey =
                currentEvent
                + "Participants";


            const participant = {

                name: name,

                registeredAt:
                    registeredAt

            };


            let participants =
                JSON.parse(
                    localStorage.getItem(
                        storageKey
                    )
                ) || [];


            participants.push(
                participant
            );


            localStorage.setItem(
                storageKey,
                JSON.stringify(
                    participants
                )
            );


            const successMessage =
                document.getElementById(
                    "successMessage"
                );


            if (successMessage) {

               
                successMessage.textContent =
                    "Registration successful! Welcome, "
                    + name + "!";

            }


            oldForm.style.display =
                "none";


            const viewParticipants =
                document.getElementById(
                    "viewParticipants"
                );


            if (viewParticipants) {

                viewParticipants.style.display =
                    "inline-block";

            }

        }
    );

}
// ===============================
// DELETE PARTICIPANT
// ===============================

function deleteParticipant(eventIndex, participantIndex) {

    const participantKey =
        "dynamicEventParticipants_" + eventIndex;


    let participants =
        JSON.parse(
            localStorage.getItem(participantKey)
        ) || [];


    // Remove selected participant
    participants.splice(
        participantIndex,
        1
    );


    // Save updated participants
    localStorage.setItem(
        participantKey,
        JSON.stringify(participants)
    );


    // Refresh participant page
    location.reload();

}