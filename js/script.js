const gallery = document.getElementById('gallery');
let employees;

async function getEmployees(){
    try {
        const response = await fetch('https://randomuser.me/api/?results=12');
        if (!response.ok) {
            console.error('Http error, status = ', response.status);
        }
        const employees = await response.json();
        console.log(employees.results);
        const employeeArray = employees.results;
        return employeeArray;
    } catch (error) {
        console.error(new Error('Error in fetching data:', error.message));
    }
}

async function showEmployees(){
    employees = await getEmployees();

    employees.map( employee => {
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
showEmployees();

function showModal(employee){
    const modalDiv = document.createElement('div');
    const DOB = new Date(employee.dob.date);
    modalDiv.classList.add('modal-container');
    
    modalDiv.innerHTML = `
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="modal-text">${employee.email}</p>
                <p class="modal-text cap">${employee.location.city}</p>
                <hr>
                <p class="modal-text">${employee.cell}</p>
                <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                <p class="modal-text">Birthday: ${DOB.getMonth()} / ${DOB.getDate()} / ${DOB.getFullYear()}</p>
            </div>
        </div>
    `;
    document.body.appendChild(modalDiv);

    const closeButton = document.querySelector('#modal-close-btn');
    closeButton.addEventListener('click',() => modalDiv.remove());
}

gallery.addEventListener('click', e => {
    const targetcard = e.target.closest('.card');
    const targetName = targetcard.querySelector('#name').textContent;
    const foundEmployee = employees.find( employee => `${employee.name.first} ${employee.name.last}` === targetName);
    showModal(foundEmployee);
});