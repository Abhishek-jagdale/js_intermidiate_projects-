import { render } from "./render.js";
import { addTodo, deleteTodo,} from "./store.js";
import { completedTodo, } from "./store.js";
import store from "./store.js"



// To reRender when cahnges are made in store.Todo
// event will trigger
window.addEventListener("todosChanged",()=>{
    console.log("event Trigerred!!")
    render(); // re-rendering
})
// Try to get store from localStorage
const storageFromlocal = JSON.parse(localStorage.getItem("store"));
if(storageFromlocal?.todos.length >0){
  store.todos = storageFromlocal;
}

// store.todos = []; 


// Phase 3rd to add newTodo from input Field of Ui 
// select todos to add new li inside ul 
 const form = document.querySelector("#form");
 // any btn in form work as submit 
// select input to create TodoTitle
const todoInput = document.querySelector(".todo-title-input")
//  applying addEventListner create newTodo click on subBtn
form.addEventListener("submit",(e)=>{
 e.preventDefault();
// storing inputTitle
const todoTitle = todoInput.value;
// creating newTodo {Object} to add inside store.todos arr[];
 const newTodo = {id:crypto.randomUUID(),title:todoTitle,completed:false};
// now call the addTodoFunction in store.js
  addTodo(newTodo);
// to Empty the inputfield
 todoInput.value = "";
});

// now to delete items from ui.
const todos = document.querySelector(".todos");
// using event delegation 
todos.addEventListener("click",(e)=>{
    const target = e.target;
    if(target.classList.contains("delete-todo-button")){
    // get the id of element which we want to remove
    // we will try to get the id of the clicked element
    const id = target.parentNode.parentNode.dataset.id;
    // pass it to deleteTodo function
         deleteTodo(id);
        // const id = target.closest(".todo").dataset.id;
    }
    }) 

    // phase 4 working on toggles checkbox
// adding event listener  using event delegation 
//  works on only checkbox
todos.addEventListener("change",(e)=>{
    const target = e.target;
    // to get the specific target we use if(condition)
    if(target.classList.contains("todo-checkbox")){
      const id = target.parentNode.parentNode.dataset.id;
    // It gives checkbox value helps to determine it is completed or not;
      const completed = target.checked;
      completedTodo(id,completed);

    }
})
// last phase 
// now to add localStorage functionalities 
// whenever you make change its should also reflect inside localStorage



render(); // To render items from store initially 