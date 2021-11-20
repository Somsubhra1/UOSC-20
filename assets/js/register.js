var member1 = document.getElementById("member1");
var member2 = document.getElementById("member2");
var member3 = document.getElementById("member3");
var member4 = document.getElementById("member4");
// var member5 = document.getElementById('member5');

const memberDetails = document.querySelector("#memberDetails");

// Adding pseudo element to styles dynamically
var dynamicCSS = document.createElement("style");
dynamicCSS.innerHTML = '.true-validate::after {content: "✓";  }';
document.head.appendChild(dynamicCSS);

// event listener
document
  .getElementById("registrationForm")
  .addEventListener("submit", submitted);

// UOSC Team Registration API

function buildForm(min, max, reset) {
  if (reset) {
    return "";
  }

  let content = `
    <div class="mt-4">
      <h5>Member 1 &#40;Team Leader&#41; Details&#58;</h5>
      <div
        class="form-group mt-3 wrap-input100 validate-input bg1"
        data-validate="Please Enter Member 1's Name"
      >
        <label class="label-input100">Name</label>
        <input
          type="text"
          name="members[0]['memberName']"
          class="form-control input100"
          id="member1-name"
          placeholder="Enter your name"
          required
        />
      </div>
      <div
        class="form-group wrap-input100 validate-input bg1"
        data-validate="Please Enter Member 1's Class"
      >
        <label class="label-input100">Class</label>
        <input
          type="text"
          name="members[0]['class']"
          class="form-control input100"
          id="member1-class"
          placeholder="Enter your class"
          required
        />
      </div>
      <div
        class="form-group wrap-input100 validate-input bg1"
        data-validate="Please Enter Member 1's Contact Number"
      >
        <label class="label-input100">Contact Number</label>
        <input
          type="text"
          name="members[0]['contact']"
          class="form-control input100"
          id="member1-contact"
          placeholder="Enter your contact number"
          required
        />
      </div>
    </div>
  `;

  for (let i = 2; i <= max; i++) {
    content += `
    <div class="mt-4">
      <h5>Member ${i} Details&#58;</h5>
      <div
        class="form-group mt-3 wrap-input100 validate-input bg1"
        data-validate="Please Enter Member 1's Name"
      >
        <label class="label-input100">Name</label>
        <input
          type="text"
          name="members[]['memberName']"
          class="form-control input100"
          id="member1-name"
          placeholder="Enter your name"
          ${i <= min ? "required" : ""}
        />
      </div>
      <div
        class="form-group wrap-input100 validate-input bg1"
        data-validate="Please Enter Member 1's Class"
      >
        <label class="label-input100">Class</label>
        <input
          type="text"
          name="members[]['class']"
          class="form-control input100"
          id="member1-class"
          placeholder="Enter your class"
          ${i <= min ? "required" : ""}
        />
      </div>
      <div
        class="form-group wrap-input100 validate-input bg1"
        data-validate="Please Enter Member 1's Contact Number"
      >
        <label class="label-input100">Contact Number</label>
        <input
          type="text"
          name="members[]['contact']"
          class="form-control input100"
          id="member1-contact"
          placeholder="Enter your contact number"
          ${i <= min ? "required" : ""}
        />
      </div>
    </div>
    `;
  }

  return content;
}

function eventSelected(e) {
  const _id = e.value;
  const { min, max } = e.dataset;

  console.log(_id);

  memberDetails.innerHTML = buildForm(min, max, _id === "null");
}

function submitted(e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  // console.log(formData.entries());
  console.log(Object.fromEntries(formData));

  // const reqObj = {}
  // formData.forEach(data => {
  //   r
  // })

  return;

  let teamName = document.getElementById("teamName").value;
  let school = document.getElementById("schoolName").value;
  let event = document.getElementById("event").value;
  let member1_name = document.getElementById("member1-name").value;
  let member1_class = document.getElementById("member1-class").value;
  let member1_contact = document.getElementById("member1-contact").value;
  let member2_name = document.getElementById("member2-name").value;
  let member2_class = document.getElementById("member2-class").value;
  let member2_contact = document.getElementById("member2-contact").value;
  let member3_name = document.getElementById("member3-name").value;
  let member3_class = document.getElementById("member3-class").value;
  let member3_contact = document.getElementById("member3-contact").value;
  let member4_name = document.getElementById("member4-name").value;
  let member4_class = document.getElementById("member4-class").value;
  let member4_contact = document.getElementById("member4-contact").value;

  fetch(`${baseURL}/uosc`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      teamName: teamName,
      schoolName: school,
      eventName: event,
      members: [
        {
          memberName: member1_name,
          class: member1_class,
          contact: member1_contact,
        },
        {
          memberName: member2_name,
          class: member2_class,
          contact: member2_contact,
        },
        {
          memberName: member3_name,
          class: member3_class,
          contact: member3_contact,
        },
        {
          memberName: member4_name,
          class: member4_class,
          contact: member4_contact,
        },
      ],
    }),
  })
    .then((response) => {
      console.log(response);

      // scroll to element
      document.getElementById("register-section").scrollIntoView();

      // alert condition
      if (response.ok) {
        // display success alert for 3 seconds
        document.getElementById("alertSuccess").style.display = "block";

        // Clearing form state
        member1.style.display = "none";
        member2.style.display = "none";
        member3.style.display = "none";
        member4.style.display = "none";
        document.getElementById("registrationForm").reset();

        setTimeout(() => {
          document.getElementById("alertSuccess").style.display = "none";
        }, 3000);

        // Remove pseudo CSS
        dynamicCSS.innerHTML = dynamicCSS.innerHTML.replace(
          /content: "✓";/,
          'content: ""'
        );

        return response.json();
      } else {
        document.getElementById("alertFailure").style.display = "block";

        setTimeout(() => {
          document.getElementById("alertFailure").style.display = "none";
        }, 3000);

        // Remove pseudo CSS
        dynamicCSS.innerHTML = dynamicCSS.innerHTML.replace(
          /content: "✓";/,
          'content: ""'
        );
        throw Error(response.statusText);
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.error(error));
}
