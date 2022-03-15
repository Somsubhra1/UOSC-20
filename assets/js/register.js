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
          name="members.0.memberName"
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
          name="members.0.class"
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
          name="members.0.contact"
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
        class="form-group mt-3 wrap-input100 ${
          i <= min ? "validate-input" : ""
        } bg1"
        data-validate="Please Enter Member 1's Name"
      >
        <label class="label-input100">Name</label>
        <input
          type="text"
          name="members.${i - 1}.memberName"
          class="form-control input100"
          id="member1-name"
          placeholder="Enter your name"
          ${i <= min ? "required" : ""}
        />
      </div>
      <div
        class="form-group wrap-input100 ${i <= min ? "validate-input" : ""} bg1"
        data-validate="Please Enter Member 1's Class"
      >
        <label class="label-input100">Class</label>
        <input
          type="text"
          name="members.${i - 1}.class"
          class="form-control input100"
          id="member1-class"
          placeholder="Enter your class"
          ${i <= min ? "required" : ""}
        />
      </div>
      <div
        class="form-group wrap-input100 ${i <= min ? "validate-input" : ""} bg1"
        data-validate="Please Enter Member 1's Contact Number"
      >
        <label class="label-input100">Contact Number</label>
        <input
          type="text"
          name="members.${i - 1}.contact"
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

function attachValidations() {
  function validate(input) {
    if ($(input).attr("type") == "email" || $(input).attr("name") == "email") {
      if (
        $(input)
          .val()
          .trim()
          .match(
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
          ) == null
      ) {
        return false;
      }
    } else {
      if ($(input).val().trim() == "") {
        return false;
      }
    }
  }

  function showValidate(input) {
    var thisAlert = $(input).parent();
    $(thisAlert).addClass("alert-validate");
    $(thisAlert).append(
      '<span class="btn-hide-validate"><i class="fas fa-times"></i></span>'
    );
    $(".btn-hide-validate").each(function () {
      $(this).on("click", function () {
        hideValidate(this);
      });
    });
  }
  function hideValidate(input) {
    var thisAlert = $(input).parent();
    $(thisAlert).removeClass("alert-validate");
    $(thisAlert).find(".btn-hide-validate").remove();
  }

  $(".validate-input .input100").each(function () {
    $(this).on("blur", function () {
      if (validate(this) == false) {
        showValidate(this);
      } else {
        $(this).parent().addClass("true-validate");
      }
    });
  });
  var input = $(".validate-input .input100");
  $(".validate-form").on("submit", function () {
    var check = true;
    for (var i = 0; i < input.length; i++) {
      if (validate(input[i]) == false) {
        showValidate(input[i]);
        check = false;
      }
    }
    return check;
  });
}

function eventSelected(e) {
  const _id = e.value;
  const { min, max } = e.dataset;
  memberDetails.innerHTML = buildForm(min, max, _id === "null");

  attachValidations();
}

function unflatten(data) {
  var result = {};
  for (var i in data) {
    var keys = i.split(".");
    keys.reduce(function (r, e, j) {
      return (
        r[e] ||
        (r[e] = isNaN(Number(keys[j + 1]))
          ? keys.length - 1 == j
            ? data[i]
            : {}
          : [])
      );
    }, result);
  }
  return result;
}

function submitted(e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  let data = Object.fromEntries(formData);
  data = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== ""));
  data = unflatten(data);

  console.log(data);

  fetch(`${baseURL}/uosc`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log(response);

      // scroll to element
      document.getElementById("register-section").scrollIntoView();

      // alert condition
      if (response.ok) {
        // display success alert for 3 seconds
        document.getElementById("alertSuccess").style.display = "block";

        document.getElementById("registrationForm").reset();
        memberDetails.innerHTML = buildForm(0, 0, true);

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
