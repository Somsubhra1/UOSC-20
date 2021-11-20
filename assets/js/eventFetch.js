const uoscEvents = document.querySelector("#uoscEvents");
const eventDropDown = document.querySelector("#event");

// category: "6198ad9dc084850023d6bfa7"
// code: "uosc-cluex"
// coordinators: Array(2)
// 0:
// email: "das.somsubhra1@gmail.com"
// name: "Somsubhra Das"
// phone: "09163975225"
// _id: "6198ae21c084850023d6bfad"
// [[Prototype]]: Object
// 1:
// email: "somsubhradas.uemk@gmail.com"
// name: "Somsubhra Das"
// phone: "09163975225"
// _id: "6198ae21c084850023d6bfae"
// [[Prototype]]: Object
// length: 2
// [[Prototype]]: Array(0)

// maxParticipants: 5
// minParticipants: 2

// __v: 0
// _id: "6198ae21c084850023d6bfac"

function getCoordinators(coordinators) {
  return coordinators
    .map(
      (coordinator) =>
        `
        <li class="mb-2">
          <span>
            ${coordinator.name}

            <a href="tel:${coordinator.phone}" class="text-dark" >
            <i class="fas fa-phone-volume mr-2"></i>
            </a>
            
            <a href="mailto:${coordinator.email}" class="text-dark"
              ><i class="fas fa-envelope mr-2"></i></a>
            
            </span>
        </li>
        `
    )
    .join("");
}

function getContent(events) {
  return events
    .map(
      (event) => `
        <div>
          <div class="box">
            <div class="image fit">
              <img src="${event.icon}" height="313" alt="" />
            </div>
            <div class="content">
              <header class="align-center">
                <h2>${event.eventName}</h2>
              </header>
              <p class="event-writeup">
                ${event.description} <br />
                Click on the registration link and bang on! <br />
              </p>
              <ul class="text-dark">
                ${getCoordinators(event.coordinators)}
              </ul>
              <footer class="align-center mt-4">
                <a
                  target="_blank"
                  href="${event.problemStatement}"
                  class="btn ps-btn btn-lg btn-info"
                  style="color: #fff"
                  download
                  >Problem Statement</a
                >
                <a
                  href="#three"
                  class="btn btn-lg btn-success register-btn"
                  style="color: #fff"
                  >Register</a
                >
              </footer>
            </div>
          </div>
        </div>
      `
    )
    .join("");
}

function populateDropdown(events) {
  return events
    .map(
      (event) =>
        `
        <option 
          value="${event._id}"
          data-min="${event.minParticipants}"
          data-max="${event.maxParticipants}"
        >
          ${event.eventName} &#40;${event.minParticipants} - ${event.maxParticipants} Members&#41;
        </option>
        `
    )
    .join("");
}

fetch(`${baseURL}/events/uoscEvents`, {
  method: "GET",
  mode: "cors",
  cache: "no-cache",
  headers: {
    "Content-Type": "application/json",
  },
  redirect: "follow",
  referrerPolicy: "no-referrer",
})
  .then((response) => response.json())
  .then((res) => {
    uoscEvents.innerHTML = getContent(res);
    eventDropDown.innerHTML += populateDropdown(res);
  })
  .catch((err) => console.log(err));
