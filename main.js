const newTaskContainers = document.querySelectorAll('.new-task');
const taskList = document.querySelectorAll('.task-list');
const taskTemplate = document.querySelector('#task-template');

// Update day and weekday on load

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekdayContainer = document.getElementsByClassName("weekday");
const dayContainer = document.getElementsByClassName("day");

let tasks = []

var dateCurrent = new Date();

for (let i = 0; i < 5; i++) {

    var day = 60 * 60 * 24 * i * 1000;

    var endDate = new Date(dateCurrent.getTime() + day);
    var DOW = weekday[endDate.getDay()];

    weekdayContainer[i].innerHTML = DOW;
    dayContainer[i].innerHTML = endDate.getDate();
    var dateFull = endDate.getDate() + " " + month[endDate.getMonth()] + " " + endDate.getFullYear();

    tasks.push({
        date: dateFull,
        input: newTaskContainers[i],
        list: taskList[i]

    });

}

window.addEventListener('load', (e) => {
    tasks.forEach(task => {
        if (localStorage.getItem(task.date) !== "") {
            var loadList = localStorage.getItem(task.date);
            loadList = loadList.split(',');

            loadList.forEach(item => {
                task.input.value = item;
                addTask(task);
            });
        }




    });
});
tasks.forEach(task => task.input.addEventListener('keyup', (e) => {

    if (e.keyCode === 13 && validInput(task.input.value)) {
        addTask(task);
        saveList();
    }
}))

// Saves date and list as a key-value pair
function saveList() {
    for (let index = 0; index < 5; index++) {
        let task = tasks[index];
        dateFull = task.date;

        let labels = [];

        task.list.querySelectorAll(".task").forEach(item => labels.push(item.childNodes[3].innerHTML));
        localStorage.setItem(dateFull, labels);

    }
}

function addTask(x) {

    const taskElement = document.importNode(taskTemplate.content, true);
    const label = taskElement.querySelector('label');
    label.append(x.input.value);
    x.list.appendChild(taskElement);
    x.input.value = '';

}

// Checks if input is empty/ consists of spaces
function validInput(input) {
    input = input.replace(/\s+/g, '');
    if (input !== '') {
        return true;
    }
    return false;
}

// When task is completed, it's automatically removed
document.body.addEventListener('click', (e) => {
    if (e.target.tagName === 'LABEL' || e.target.getAttribute('type') === "checkbox") {
        e.target.parentNode.remove();
        saveList();
    }
});