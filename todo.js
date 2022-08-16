let itemArray;
if (localStorage.getItem("uuserprogress")) itemArray =  JSON.parse(localStorage.getItem("uuserprogress"));
else itemArray = [];



class userTask {
    constructor(name, cls) {
        this.name = name;
        this.cls = cls;
    }

    userClass = {
        work: "worktask",
        study: "studytask",
        life: "lifetask"
    }
    get createDiv() {
        let div = document.createElement("div");
        let p = document.createElement("p");
        let span = document.createElement("span");
        span.innerHTML = `  ${this.cls}`;
        p.innerHTML = this.name;
        p.append(span);
        div.append(p);
        div.className = this.userClass[this.cls];

        let itemInfo = [this.name, this.cls, this.userClass[this.cls]];
        itemArray.push(itemInfo);
        localStorage.setItem("uuserprogress", JSON.stringify(itemArray));



        div.insertAdjacentHTML("afterbegin", "<button type='button' class='readytask'><i class='fa fa-square-o' aria-hidden='true' style='font-size: 22px'></i></button>");
        div.insertAdjacentHTML("beforeend", "<button type='button'class='deltask'><i class='fa fa-times' aria-hidden='true' style='font-size: 22px'></i></button>");
        return div;
    }
}

let formTask = document.forms.formtask;
let newTask = formTask.newtask;
let classTask = formTask.classtask;
classTask.hidden = true;
let tasks = document.querySelector(".tasks");
let classclass = document.querySelector(".classclass");
let userError= document.querySelector(".usererror")
newTask.addEventListener("keydown", (event) => {
    if (event.code == "Enter") event.preventDefault();
})
let crTask = document.querySelector(".createtask");
crTask.hidden = true;

function createTask() {
    if (!newTask.value || !classTask.value)  return;
    let textNewTask = newTask.value;
    let className = classTask.value;
    let myTask = new userTask(textNewTask, className);

    tasks.prepend(myTask.createDiv);

    if (classclass.hidden) Array.from(document.querySelectorAll(".tasks div span")).forEach(i => i.hidden = true);

    this.hidden = true;
    newTask.value = "";
    focusTask.hidden = false;
    crTask.hidden = true; 
    cansel.hidden = true;   

}

function showInput() {
    this.hidden = true;
    cansel.hidden = false;
    addTask.hidden = false;
    crTask.hidden = false;
    newTask.focus();
}

function getCansel() {
    if (addTask.hidden) return;
    addTask.hidden = true;
    crTask.hidden = true;
    focusTask.hidden = false;
    this.hidden = true;
    newTask.value = "";
}

let addTask = document.querySelector(".addtask");
addTask.hidden = true;
addTask.addEventListener("click", createTask);
let focusTask = document.querySelector(".focustask");
focusTask.addEventListener("click", showInput);
let cansel = document.querySelector(".cansel");
cansel.hidden = true;
cansel.addEventListener("click", getCansel);


function getTask(event) {
    if (event.target.className == 'fa fa-times') { // удаление
        event.target.closest("div").remove();
    } else if (event.target.className=='fa fa-square-o'){ //выполнение
        event.target.className = "fa fa-check-square-o";
        event.target.closest("div").remove();
        tasks.append(event.target.closest("div"))
        event.target.closest("div").style.opacity = "0.7";
    } else if(event.target.className=="fa fa-check-square-o") { // отмена выполнения
        event.target.className = 'fa fa-square-o';
        event.target.closest("div").style.opacity = "1"
    } else return;
}
tasks.addEventListener("click", getTask);



function showClass(event) {
    if (event.target.closest("span").classList[0]!="all") {
        classclass.hidden = true;
        Array.from(document.querySelectorAll(".tasks div span")).forEach(i => i.hidden = true)
        classTask.value = event.target.closest("span").classList[0].toLowerCase();
    } else {
        classclass.hidden = false;
        Array.from(document.querySelectorAll(".tasks div span")).forEach(i => i.hidden = false);
        classTask.value = "";
    }
    let alltask = Array.from(document.querySelectorAll(".tasks div"));
    alltask.forEach (i => (i.hidden = true));
    switch(event.target.closest("span").classList[0]) {
        case "all":
            alltask.forEach(i => (i.hidden = false));
            tasks.style.border = "2px solid #007fff"
            tasks.style.boxShadow = "0 5px 15px 1px #007fff"
            document.querySelectorAll(".btn").forEach(j=> j.style.background = "#007fff")
            break;
        case "work":
            alltask.forEach (i => {
                if (i.className=="worktask") i.hidden = false;
            });
            tasks.style.border = "2px solid rgb(211, 125, 13)"
            tasks.style.boxShadow = "0 5px 15px 1px rgb(211, 125, 13)"
            document.querySelectorAll(".btn").forEach(j=> j.style.background = "rgb(211, 125, 13)")
            break;
        case "study":
            alltask.forEach (i => {
                if (i.className=="studytask") i.hidden = false;
            });
            tasks.style.border = "2px solid #c300ff"
            tasks.style.boxShadow = "0 5px 15px 1px #c300ff";
            document.querySelectorAll(".btn").forEach(j=> j.style.background = "#c300ff")
            break;
        case "life":
            alltask.forEach (i => {
                if (i.className=="lifetask") i.hidden = false;
            });
            tasks.style.border = "2px solid #409d36";
            tasks.style.boxShadow = "0 5px 15px 1px #409d36"
            document.querySelectorAll(".btn").forEach(j=> j.style.background = "#409d36")
            break;
    }

}
let classmenu = document.querySelector(".classmenu");
classmenu.addEventListener("click", showClass);

function getRadio(event) {
    if (event.target.type!="radio") return;
    classTask.value = event.target.value;
}

let radio = document.querySelector(".radio");
radio.addEventListener("click", getRadio);


let myItem;
if (localStorage.getItem("tasksprogress")){
    myItem = JSON.parse(localStorage.getItem("tasksprogress"));
    let itemReady = []
    for (let j of JSON.parse(localStorage.getItem("tasksprogress")).reverse()) {
        if (j[3]=="fa fa-check-square-o") {
            itemReady.push(j);
            continue;
        } else tasks.prepend(recoverDiv(j));  
    }
    for (let q of itemReady.reverse()) {
        tasks.append(recoverDiv(q))
    }
}
else {
    myItem = [];
}

function recoverDiv(lst) {
    let div = document.createElement("div");
    let p = document.createElement("p");
    let span = document.createElement("span");
    span.innerHTML = `  ${lst[1]}`;
    p.innerHTML = lst[0];
    p.append(span);
    div.append(p);
    div.className = lst[2];
    div.insertAdjacentHTML("afterbegin", "<button type='button' class='readytask'><i class = '" + lst[3] + "' aria-hidden='true' style='font-size: 22px'></i></button>");
    div.insertAdjacentHTML("beforeend", "<button type='button'class='deltask'><i class='fa fa-times' aria-hidden='true' style='font-size: 22px'></i></button>");
    if (lst[3]=="fa fa-check-square-o") div.style.opacity = "0.7";
    return div
}

let cont = document.querySelector(".container")
cont.addEventListener("click", () => {
    myItem = [];
    if (document.querySelectorAll(".tasks div").length == 0) {
        localStorage.clear("tasksprogress");
        return;
    }
    let allP  = Array.from(document.querySelectorAll(".tasks div p")).map(i => i.innerHTML.slice(0,  i.innerHTML.indexOf("<")));
    let allSpan = Array.from(document.querySelectorAll(".tasks div p span"));
    let allClass = Array.from(document.querySelectorAll(".tasks div")).map(j => j.className)
    let allReadyTask = Array.from(document.querySelectorAll(".readytask i")).map(q => q.className);
    for (let k = 0; k<allP.length; k++) {
        let newitem = [allP[k], allSpan[k].innerHTML, allClass[k], allReadyTask[k]];
        myItem.push(newitem)
        localStorage.setItem("tasksprogress", JSON.stringify(myItem));
    }
})










