const gallery = document.getElementById('gallery');

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
    const employees = await getEmployees();

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