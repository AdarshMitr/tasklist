//Define UI Vars
const form=document.querySelector('#task-form');
const tasklist= document.querySelector('.collection');
const clearBtn=document.querySelector('.clear-tasks');
const filter=document.querySelector('#filter');
const taskInput=document.querySelector('#task');

//load all event listeners
loadEventListeners();
//load all event listeners
function loadEventListeners(){
    //DOM load evemt
    document.addEventListener('DOMContentLoaded',getTasks); 
    //Add task event
    form.addEventListener('submit',addTask);

    //Remove task event
    tasklist.addEventListener('click',removeTask);
    //Clear task event
    clearBtn.addEventListener('click',clearTasks);
    //Filter tasks event
    filter.addEventListener('keyup',filterTasks);
}
//Get Tasks from LS
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    } 
    tasks.forEach(function(task){
        //Create li element
const li=document.createElement('li');
//Add class
li.className='collection-item';
 //Create text node and append to li
 li.appendChild(document.createTextNode(task));

 //Create new link element
 const link=document.createElement('a');

 //Add class
 link.className='delete-item secondary-content';
 //Add icon html
 link.innerHTML='<i class="fa fa-remove"> </i>';
 //Append the link to li
 li.appendChild(link);

 //Append li to ul
 tasklist.appendChild(li);

    })
}

//Add Task
function addTask(e){
if(taskInput.value===''){
    alert('Add a task');
}

//Create li element
const li=document.createElement('li');
//Add class
li.className='collection-item';
 //Create text node and append to li
 li.appendChild(document.createTextNode(taskInput.value));

 //Create new link element
 const link=document.createElement('a');

 //Add class
 link.className='delete-item secondary-content';
 //Add icon html
 link.innerHTML='<i class="fa fa-remove"> </i>';
 //Append the link to li
 li.appendChild(link);

 //Append li to ul
 tasklist.appendChild(li);
 //Store in LS
 storeTaskInLocalStorage(taskInput.value);

 //Clear input
 taskInput.value='';

 
 e.preventDefault();
}
//Store Task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
//Remove Task
function removeTask(e){
if(e.target.parentElement.classList.contains('delete-item')){
   if(confirm('Are you Sure?')){
    e.target.parentElement.parentElement.remove();
    //Remove from LS
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
   }
   

}
}

//Remove from LS 
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));   
}
tasks.forEach(function(task){
    if(taskItem.textContent===task){
        tasks.splice(index,1);
    }
})
localStorage.setItem('tasks',JSON.stringify(tasks));
}
//Clear Tasks
function clearTasks(){
    //tasklist.innerHTML='';

    //Faster


    while(tasklist.firstChild){
        tasklist.removeChild(taskList.firstChild);
    }
    //https://www.measurethat.net/Benchmarks/Show/34/0/innerhtml-vs-removechild

    //Clear from LS
    clearTaskFromLocalStorage();
}
//Clear Tasks from LS
function clearTaskFromLocalStorage(){
    localStorage.clear();
}
//Filter Tasks
function filterTasks(e){
const text=e.target.value.toLowerCase();
document.querySelectorAll('.collection-item').forEach(function(task){
    const item=task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text)!=-1){
        task.style.display='block';
}else{
    task.style.display='none';
}
});
}