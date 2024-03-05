const gallery = document.getElementById('gallery');
const searchDiv = document.querySelector('.search-container');
let employees;

// Fetch employee data and update them into employees variable
async function getEmployees(){
    try {
        const response = await fetch('https://randomuser.me/api/?results=12&nat=us,gb,ca&exc=login,registered,id');
        if (!response.ok) {
            console.error('Http error, status = ', response.status);
        }
        const employeesJSON = await response.json();
        employees = employeesJSON.results;
    } catch (error) {
        console.error(new Error('Error in fetching data:', error.message));
    }
     showEmployees(employees);
}

// Create and append employee cards to gallery
function showEmployees(array){

    array.map( employee => {
        let html = `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${employee.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
            </div>
        </div>
        `;
        gallery.insertAdjacentHTML('beforeend', html);
    });
}
getEmployees();

/**
 * Display a modal with employee information
 * @param {object} employee - Object containing information on selected employee
 * 
 * Clicking the close button removes the modal from the DOM
 */
function showModal(employee){
    const modalDiv = document.createElement('div');
    modalDiv.classList.add('modal-container');
    const DOB = new Date(employee.dob.date);
    
    modalDiv.innerHTML = `
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="modal-text">${employee.email}</p>
                <p class="modal-text cap">${employee.location.country}</p>
                <hr>
                <p class="modal-text">${employee.cell}</p>
                <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                <p class="modal-text">Birthday: ${DOB.getMonth() + 1} / ${DOB.getDate()} / ${DOB.getFullYear()}</p>
            </div>
        </div>
    `;
    document.body.appendChild(modalDiv);

    const closeButton = document.querySelector('#modal-close-btn');
    closeButton.addEventListener('click',() => modalDiv.remove());
}

// Event listener for click on gallery cards to display modal for the clicked employee
gallery.addEventListener('click', e => {
    const targetcard = e.target.closest('.card');
    if (targetcard) {
        const targetName = targetcard.querySelector('#name').textContent;
        const foundEmployee = employees.find( employee => `${employee.name.first} ${employee.name.last}` === targetName);
        showModal(foundEmployee);
    }
});

// Append search bar
searchDiv.innerHTML = `<form action="#" method="get">
                            <input type="search" id="search-input" class="search-input" placeholder="Search...">
                            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
                        </form>`;
// Grab search inputs to attach event listeners
const searchbar = searchDiv.querySelector('#search-input');
const searchButton = searchDiv.querySelector('#search-submit');

function searchEmployees(){
    gallery.innerHTML = '';
    const foundEmployees = employees.filter( employee => {
        let firstName = employee.name.first.toLowerCase();
        let lastName = employee.name.last.toLowerCase();
        if (firstName.includes(searchbar.value) || lastName.includes(searchbar.value)) {
            return true;
        } else {
            return false;
        }
    });
    if (foundEmployees.length === 0) {
        gallery.innerHTML = `<h3>No results found</h3>`;
    } else if (searchbar.value === '') {
        showEmployees(employees);
    } else {
        showEmployees(foundEmployees);
    }
}

searchButton.addEventListener('click', searchEmployees);
searchbar.addEventListener('keyup', searchEmployees);