const allTasks = document.querySelectorAll('.new-task');
const taskList = document.querySelectorAll('.task-list');
const taskTemplate = document.querySelector('#task-template');


let tasks = [
    {
        id: 1,
        input: allTasks[0],
        list: taskList[0]
    },
    {
        id: 1,
        input: allTasks[1],
        list: taskList[1]
    },
    {
        id: 1,
        input: allTasks[2],
        list: taskList[2]
    },
    {
        id: 1,
        input: allTasks[3],
        list: taskList[3]
    },
    {
        id: 1,
        input: allTasks[4],
        list: taskList[4]
    }
]

tasks.forEach(task => task.input.addEventListener('keyup', (e) => {

    if (e.keyCode === 13 && validInput(task.input.value)) {
        addTask(task)
    }
}))


function addTask(x) {
    const taskElement = document.importNode(taskTemplate.content, true);
    const checkbox = taskElement.querySelector('input');
    checkbox.id = x.id;
    const label = taskElement.querySelector('label');
    label.htmlFor = x.id;
    label.append(x.input.value);
    x.list.appendChild(taskElement);
    x.input.value = '';
    x.id++;

}

function validInput(input) {
    input = input.replace(/\s+/g, '');
    if (input !== '') {
        return true;
    }
    return false;
}

document.body.addEventListener('click', (e) => {
    if(e.target.tagName === 'LABEL' || e.target.getAttribute('type') === "checkbox"){
        e.target.parentNode.remove();
    }
});

// Update day and weekday on load

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const weekdayContainer = document.getElementsByClassName("weekday");
const dayContainer = document.getElementsByClassName("day");


var dateCurrent = new Date();
for (let i = 0; i < 5; i++) {

    var day = 60 * 60 * 24 * i * 1000

    var endDate = new Date(dateCurrent.getTime() + day)
    var DOW = weekday[endDate.getDay()]

    weekdayContainer[i].innerHTML = DOW
    dayContainer[i].innerHTML = endDate.getDate()

}