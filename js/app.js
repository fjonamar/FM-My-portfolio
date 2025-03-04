$(document).ready(function(){

    $(window).on('scroll', function(){
        var scroll = $(window).scrollTop();
        if (scroll >= 50) {
          $(".sticky").addClass("stickyadd");
        } else {
          $(".sticky").removeClass("stickyadd"); 
        }
    });

    // typpping js

    var typed = new Typed(".element",{
        strings: ["Fjona Marishta", "a Developer", "a Designer"],
        smartBackspace:true,
        typeSpeed:100,
        backSpeed:100,
        loop:true,
        loopCount: Infinity,
        startDelay:1000 
    });

    // progress bars

    var waypoint = new Waypoint({
      element: document.getElementById('exp-id'),
      handler: function() {
        var p = document.querySelectorAll('.progress-bar');
    p[0].setAttribute("style", "width:100%;transition: 1s all");
    p[1].setAttribute("style", "width:90%;transition: 1.5s all");
    p[2].setAttribute("style", "width:85%;transition: 1.7s all");
    p[3].setAttribute("style", "width:80%;transition: 2s all");
    p[4].setAttribute("style", "width:85%;transition: 2.3s all");
    p[5].setAttribute("style", "width:80%;transition: 2.5s all");
      },
      offset:'90%'
    });

    var filterizd = $('.filter-container').filterizr({
      animationDuration : .5,

    });
    
// Owl Carousel

$(".owl-carousel").owlCarousel({
  loop:true,
  autoplay:true,
  autoplayTimeout:4000,
  items:1
});

  $('.nav-pills .nav-link').on('click', function () {
      $('.nav-pills .nav-link').removeClass('active'); 
      $(this).addClass('active'); 
  });


  // search
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myList li").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});
});

// panel
function togglePanel(panel) {
  var panelElement = document.getElementById(panel + 'Panel');
  if (panelElement.style.display === "none") {
    panelElement.style.display = "block";
  } else {
    panelElement.style.display = "none";
  }
}

//  JSON Result returned from the API
// fetch('people.json').then(function (response){
//   return response.json();

// }).then(function (obj) {
//   console.log(obj);
// }).catch(function (error) {
//   console.error('Something went wrong with retrieving the people!');
//   console.error(error);
// })


// JSON function saveForm

function saveForm() {
  try {
    var formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    };
    
    localStorage.setItem('contactFormData', JSON.stringify(formData));
    
    // Retrieving the data from localStorage
    const data = localStorage.getItem('contactFormData');
    
    if (data) {
      console.log(data);
      alert('Form data saved successfully!');
    } else {
      throw new Error('Failed to save form data to localStorage.');
    }
  } catch (error) {
    console.error('An error occurred while saving form data:', error.message);
    alert('Failed to save form data. Please try again later.');
  }
}

// json

var usersData; // Variable to store the fetched data

// Fetch initial data and store it in a variable
fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
        usersData = data; // Store data in the variable
        // Call getData to display data in the table
        getData();
    });

var editFormData;

function getFormData() {
    return {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value
    }
}

function setSuccessMessage(message) {
    document.getElementById("message").innerHTML = message;
}


function submitForm() {
if (editFormData){

 editData();
 clearFormData();

}

else addUser(); 
}


function addUser() {
let payload = getFormData();
fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
    },
})
.then(response => response.json())
.then(json => {
 
    usersData.push(json);
    setSuccessMessage("User added successfully");
    getData(); // reload table 
})
.catch(error => {
    console.error('Error adding user:', error);
    setSuccessMessage("Failed to add user");
});
}
// edit data 
function editData() {
var formData = getFormData();
fetch('https://jsonplaceholder.typicode.com/users/' + editFormData.id, {
    method: 'PUT',
    body: JSON.stringify(formData),
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
    },
})
.then(response => {
    // Update editFormData directly with new values
    editFormData.name = formData.name;
    editFormData.email = formData.email;
    setSuccessMessage("User updated successfully");
    editFormData = null; // Reset editFormData
    getData(); // reload the table
});
}

// delete data
function deleteData(id) {
fetch('https://jsonplaceholder.typicode.com/users/' + id, {
    method: 'DELETE',
})
.then(response => {
    if (response.ok) {
        setSuccessMessage("User deleted successfully");
        // Remove the user from usersData array
        usersData = usersData.filter(user => user.id !== id);
        console.log(usersData);
        editFormData = null; // Reset editFormData
        clearFormData();
        getData(); // Reload the table
    } else {
        throw new Error('Failed to delete user');
    }
})
.catch(error => {
    console.error('Error deleting user:', error);
    setSuccessMessage("Failed to delete user");
});
}


// get data method
function getData() {
    var tmpData = "";
    console.log('json', usersData);
    usersData.forEach(user => {
        tmpData += "<tr>";
        tmpData += "<td>" + user.name + "</td>";
        tmpData += "<td>" + user.email + "</td>";
        tmpData += "<td><button class='btn btn-primary' onclick='editDataCall(" + user.id + ")'>Edit</button></td>";
        tmpData += "<td><button class='btn btn-danger' onclick='deleteData(" + user.id + ")'>Delete</button></td>";
        tmpData += "</tr>";
    });
    document.getElementById("tbData").innerHTML = tmpData;
}

function editDataCall(id) {
    // Find user in usersData by id
    var user = usersData.find(user => user.id === id);
    editFormData = user;
    setFormData(editFormData.name, editFormData.email);
}

function setFormData(name, email) {
    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
}

function clearFormData() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
}

