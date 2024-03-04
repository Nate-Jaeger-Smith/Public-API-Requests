
let employeeArray;
async function getEmployees(){
    try {
        const response = await fetch('https://randomuser.me/api/?results=12');
        if (!response.ok) {
            console.error('Http error, status = ', response.status);
        }
        const employees = await response.json();
        console.log(employees.results);
        employeeArray = employees.results;
    } catch (error) {
        console.error(new Error('Error in fetching data:', error.message));
    }
}