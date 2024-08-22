import store from "./store.js";


//1st Phase To get items from store and render it on todo ui

function render(){
  //  selecting todo to add newTodo 
 const todos = document.querySelector(".todos")
  //  Using map method add store todosElements  to inside ul to render 
   const todoElements = store.todos.map((todo)=>{
       return `<li class="todo" data-id="${todo.id}">
    <span class="todo-title ${todo.completed ? "completed":""}"> 
        ${todo.title}   </span>
    <div class="toggle-delete">
      <input type="checkbox" name="completed" class="todo-checkbox"
      ${todo.completed ? "checked":""} } />
      <button class="delete-todo-button">x</button>
    </div>
    </li>` 

    // we are getting array now we need to convert it toString

  }).join(""); 
   // to add this as innerHTml inside html Ul
  todos.innerHTML = todoElements;



}

export {render};