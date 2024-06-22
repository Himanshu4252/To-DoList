
let url = 'https://type.fit/api/quotes';
let quote = document.getElementById("quote");

const getRandomNumber = () => {
    return Math.floor(Math.random() * 16);
  };

async function quotePrinter(){
    const response = await fetch(url);
    const quotes = await response.json();
    quote.innerText = (quotes[getRandomNumber()].text);
}
quotePrinter();

let addBtn = document.getElementById("addTaskBtn");
function forBtn(event) {
    event.preventDefault();
    let newTaskInput = document.getElementById("newTask");
    let newTask = newTaskInput.value;
    if(newTask===""){
        console.log("please enter you task first!!!");
        return;
    }
    addNewTasks(newTask);
    newTaskInput.value = ""; 
}
function addNewTasks(newTask){
    let pendingTaskNew = document.createElement("div");
    pendingTaskNew.classList.add('tasks');


    // let taskForm = document.createElement("form");
    let checkbox = document.createElement("input");
    let minusButton = document.createElement("button");
    minusButton.innerHTML = '<i class="fa-solid fa-circle-minus"></i>';
    minusButton.id = "minusBtn";
    checkbox.type = "checkbox";

    let taskSpan = document.createElement("span");

    pendingTaskNew.appendChild(checkbox);
    pendingTaskNew.appendChild(taskSpan);
    pendingTaskNew.appendChild(minusButton);
    // pendingTaskNew.appendChild(taskForm);
    taskSpan.textContent = newTask;

    document.getElementById("pendingTasks").appendChild(pendingTaskNew);

    minusButton.addEventListener("click", function(){
        event.preventDefault();
        pendingTaskNew.remove();
    })
    checkbox.addEventListener("change", function(){
        taskDone(checkbox);
    });
}
function taskDone(checkbox){
   let checkboxes = document.querySelectorAll('input[type="checkbox"]');
   let allUnchecked = true;
   checkboxes.forEach(cb => {
    if(cb.checked){
        allUnchecked = false;
    }
   });
   if(allUnchecked){
    saveBtn.style.display = "none";
   }
   else{
    saveBtn.style.display = "block";
   }
}


function taskCompleted(){
    let checkboxes = document.querySelectorAll('input[type = "checkbox"]');
    let completedTask;
    
    checkboxes.forEach(cb => {
        if(cb.checked){
            completedTask = cb.parentElement.querySelector('span').textContent;
            cb.parentElement.remove();
            achievedTasks(completedTask);
        }

        
    });
}
function achievedTasks(checkedTasks){
    let bossDiv = document.getElementById("completedTasksHtml");
    let completedTasksForm = document.createElement("div");
    let finishedtasks = document.createElement("span");

    completedTasksForm.classList.add('completeTasks');

    bossDiv.appendChild(completedTasksForm);
    completedTasksForm.appendChild(finishedtasks);
    
    finishedtasks.textContent = checkedTasks;

}

let saveBtn = document.createElement("button");
document.getElementById("pendingTasks").appendChild(saveBtn);
saveBtn.classList.add("saveBtn");
saveBtn.innerText = "save";

addBtn.addEventListener("click", forBtn);
saveBtn.addEventListener("click", taskCompleted);