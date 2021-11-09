var member1 = document.getElementById('member1')
var member2 = document.getElementById('member2')
var member3 = document.getElementById('member3')
var member4 = document.getElementById('member4')
// var member5 = document.getElementById('member5');

// Adding pseudo element to styles dynamically
var dynamicCSS = document.createElement('style')
dynamicCSS.innerHTML = '.true-validate::after {content: "✓";  }'
document.head.appendChild(dynamicCSS)

// event listener
document
  .getElementById('registrationForm')
  .addEventListener('submit', submitted)

// UOSC Team Registration API

const baseURL = 'https://ureckon-api-dev-spn77.ondigitalocean.app/uosc'

function eventSelected(event) {
  if (event.value === 'coding') {
    member1.style.display = 'block'
    member2.style.display = 'block'
    member3.style.display = 'none'
    member4.style.display = 'none'
    // member5.style.display = 'none';

    document.getElementById('member1-name').required = true
    document.getElementById('member1-class').required = true
    document.getElementById('member1-contact').required = true

    document.getElementById('member2-name').required = true
    document.getElementById('member2-class').required = true
    document.getElementById('member2-contact').required = true

    document.getElementById('member3-name').required = false
    document.getElementById('member3-class').required = false
    document.getElementById('member3-contact').required = false

    document.getElementById('member4-name').required = false
    document.getElementById('member4-class').required = false
    document.getElementById('member4-contact').required = false

    // document.getElementById("member5-name").required = false;
    // document.getElementById("member5-class").required = false;
    // document.getElementById("member5-contact").required = false;
  } else if (event.value === 'model') {
    member1.style.display = 'block'
    member2.style.display = 'block'
    member3.style.display = 'block'
    member4.style.display = 'block'
    // member5.style.display = "block";

    document.getElementById('member1-name').required = true
    document.getElementById('member1-class').required = true
    document.getElementById('member1-contact').required = true

    document.getElementById('member2-name').required = true
    document.getElementById('member2-class').required = true
    document.getElementById('member2-contact').required = true

    document.getElementById('member3-name').required = true
    document.getElementById('member3-class').required = true
    document.getElementById('member3-contact').required = true

    document.getElementById('member4-name').required = true
    document.getElementById('member4-class').required = true
    document.getElementById('member4-contact').required = true

    // document.getElementById("member5-name").required = true;
    // document.getElementById("member5-class").required = true;
    // document.getElementById("member5-contact").required = true;
  } else {
    document.getElementById('member1').style.display = 'none'
    document.getElementById('member2').style.display = 'none'
    document.getElementById('member3').style.display = 'none'
    document.getElementById('member4').style.display = 'none'
    // document.getElementById("member5").style.display = "none";
  }
}
function submitted(e) {
  e.preventDefault()

  let teamName = document.getElementById('teamName').value
  let school = document.getElementById('schoolName').value
  let event = document.getElementById('event').value
  let member1_name = document.getElementById('member1-name').value
  let member1_class = document.getElementById('member1-class').value
  let member1_contact = document.getElementById('member1-contact').value
  let member2_name = document.getElementById('member2-name').value
  let member2_class = document.getElementById('member2-class').value
  let member2_contact = document.getElementById('member2-contact').value
  let member3_name = document.getElementById('member3-name').value
  let member3_class = document.getElementById('member3-class').value
  let member3_contact = document.getElementById('member3-contact').value
  let member4_name = document.getElementById('member4-name').value
  let member4_class = document.getElementById('member4-class').value
  let member4_contact = document.getElementById('member4-contact').value

  fetch(baseURL, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
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
      console.log(response)

      // scroll to element
      document.getElementById('register-section').scrollIntoView()

      // alert condition
      if (response.ok) {
        // display success alert for 3 seconds
        document.getElementById('alertSuccess').style.display = 'block'

        // Clearing form state
        member1.style.display = 'none'
        member2.style.display = 'none'
        member3.style.display = 'none'
        member4.style.display = 'none'
        document.getElementById('registrationForm').reset()

        setTimeout(() => {
          document.getElementById('alertSuccess').style.display = 'none'
        }, 3000)

        // Remove pseudo CSS
        dynamicCSS.innerHTML = dynamicCSS.innerHTML.replace(
          /content: "✓";/,
          'content: ""'
        )

        return response.json()
      } else {
        document.getElementById('alertFailure').style.display = 'block'

        setTimeout(() => {
          document.getElementById('alertFailure').style.display = 'none'
        }, 3000)

        // Remove pseudo CSS
        dynamicCSS.innerHTML = dynamicCSS.innerHTML.replace(
          /content: "✓";/,
          'content: ""'
        )
        throw Error(response.statusText)
      }
    })
    .then((data) => {
      console.log(data)
    })
    .catch((error) => console.error(error))
}
