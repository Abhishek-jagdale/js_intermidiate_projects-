// 1st first thing is to store array inside object 

const store = {
    todos: [
        {
          id: "1",
          title: "Complete Task A",
          completed: false,
        },
        {
          id: "2",
          title: "Read Book",
          completed: true,
        },
        {
          id: "3",
          title: "Write Code",
          completed: true,
        },
      ]
}

// 2nd phase  To reRender Things we will create proxy of store 
const storeHandler = {
  // we can use traps to get data from object 
  get(target,property){
   console.log("Ohh you are trying to get store.todos")
    // imp to return target and property
    return target[property];
  },
  // we have set(traps) to set the property value
  set(target,property,value){
    target[property] = value;
    // console.log("you trygin to set property")
    if(property == "todos"){
      // we use customs evenst to trigger renderEffect 
      window.dispatchEvent(new Event("todosChanged"))
    }
    //  console.log("Oh you are trying to set property ")
    // if usermakes anyChange in store will also reflect on localStorage
    localStorage.setItem("store",JSON.stringify(store))
    return true;
  }
}
// phase3 creating  funcition to add newTodo inside store.todos;
function addTodo(newTodo){
  // creating a new array by adding newTodo inside store.todos 
  storeProxy.todos = [...storeProxy.todos,newTodo];
}
function deleteTodo(id){
  storeProxy.todos = storeProxy.todos.filter((todo)=>{
    // return the value which pass the condition 
   return todo.id !== id;
  })
}
function completedTodo(id,completed){
   storeProxy.todos = storeProxy.todos.map((todo)=>{
     if(todo.id == id){
      return {...todo,completed:completed}
     }else{
         return todo;
     }
   })
}

 


// new proxy it gives object  
const storeProxy = new Proxy(store,storeHandler);
export {addTodo,deleteTodo};
export {completedTodo};
export default storeProxy;