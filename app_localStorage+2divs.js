//! -----------------TODO container DEFINITIONS -----------------
//! Selectors for todo container
const btn_add = document.getElementById("todo-button");
const todoInput = document.getElementById("todo-input");
const todoUl = document.getElementById("todo-ul");
let lastClickedTodoLi;
//! bring data from local
let todos = JSON.parse(localStorage.getItem("todos")) || [];

renderSavedTodos();
function renderSavedTodos() {
  todos.forEach((todo) => {
    createListElement(todo);
  });
}

function createListElement(todo) {
  //? we have destructured each todo object
  const { id, content, isDone } = todo;
  todoUl.innerHTML += `
	  <li id=${id} class=${isDone ? "checked" : ""}>
	  	<p class='pContentOfItem'>${content}</p>
	  	<i class="fa fa-check"></i>
		<i class="fa fa-trash"></i>
	  </li>`;
}
//! ----------------------------end-------------------------------
// 
// 
// 
// 
// 
//! -------------- COMPLETEDS container DEFINITIONS --------------
//! Selectors for completeds container
const btn_search = document.getElementById("button_search");
const searchInput = document.getElementById("search-input");
const completeds_Ul = document.getElementById("completeds-ul");
let lastClickedCompLi;
let tempHtmlObj = ""; //? for the last clicked one

//! bring data from local for completed todos
let completeds = JSON.parse(localStorage.getItem("completeds")) || [];

renderSaved_Completeds();
//? On start, read data from localStorage and create latest list
function renderSaved_Completeds() {
  completeds.forEach((i) => {
    createListElement_Completeds(i);
  });
}
function createListElement_Completeds(comp_item) {
  //? we have destructured each object
  const { id, content, isDone } = comp_item;
  completeds_Ul.innerHTML += `
	<li id=${id} class=${isDone ? "checked" : ""}>
	<p class='pContentOfItem'>${content}</p>
	<i class="fa fa-check"></i>
	<i class="fa fa-trash"></i>
	</li>`;
}
//! ----------------------------end-------------------------------
// 
// 
// 
// 
// 
//! -----------------TODO container EVENTS -----------------------
//! Let the input be active at the beginning
window.onload = function () {
  todoInput.focus();
};

//! Defining Add Button Event
btn_add.addEventListener("click", () => {
  //? Alert if inputBox is empty
  if (!todoInput.value) {
    alert("Please enter your todo");
  } else {
    //? if inputBox is not empty,
    const todoObject = {
      //? create info object
      id: new Date().getTime(),
      isDone: false,
      content: todoInput.value,
    };

    //? Push newly created todo into array
    todos.push(todoObject);

    //? Save final array to localStorage
    localStorage.setItem("todos", JSON.stringify(todos));

    //? add tick and trash buttons with the func.
    createListElement(todoObject);

    //? empty the input box
    todoInput.value = "";
  }
});

//! Event definition for delete
todoUl.addEventListener("click", (e) => {
  const id = e.target.parentElement.getAttribute("id");

  //! Last clicked TODO li item (To send completeds)
  lastClickedTodoLi = {
    id: e.target.parentElement.id,
    isDone: "true",
    content: e.target.parentElement.querySelector(".pContentOfItem").innerHTML,
  };

  //! If the event came from one of the delete button
  if (e.target.classList.contains("fa-trash")) {
    //? Delete the relevant element of the array :local
    todos = todos.filter((todo) => todo.id != id);

    //? Delete related li element in DOM
    e.target.parentElement.remove();

    //? Save final todos array to localStorage
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  //! If the event came from the completed-tick
  if (e.target.classList.contains("fa-check")) {

    //? Push last clicked item To completeds array
    completeds.push(lastClickedTodoLi);

    //? Add it To completed container :DOM
    tempHtmlObj = e.target.parentElement;
    completeds_Ul.append(tempHtmlObj);

    //? remove it From todo container
    todos = todos.filter((todo) => todo.id != tempHtmlObj.id);

    //? Save final arrays to localStorage (In order to see after refresh)
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("completeds", JSON.stringify(completeds));
  }
});

//! ----------------------------end-------------------------------
// 
// 
// 
// 
// 
// 
//! -----------------COMPLETEDS container EVENTS ------------------
//! Defining Search Button Event
btn_search.addEventListener("click", () => {  // AFTER V2
  //? Alert, if inputBox is empty
  if (!searchInput.value) {
    alert("Please enter your search word");
  } else {
    //? if inputBox is not empty,
    //? filter 'completed array' with search inputbox
    completeds = completeds.filter(completeds.content.includes(searchInput.value));
    console.log("here is the filter process for search button"); //!
    //? Save final array to localStorage
    localStorage.setItem("completeds", JSON.stringify(completeds));
    //   createListElement(todoInput);
      searchInput.value = '';
  }
});

//! Event definition for delete
completeds_Ul.addEventListener("click", (e) => {
  const id = e.target.parentElement.getAttribute("id");

  //! Last clicked COMPLETED li item (To send TODO)
  lastClickedCompLi = {
    id: e.target.parentElement.id,
    isDone: "false",
    content: e.target.parentElement.querySelector(".pContentOfItem").innerHTML,
  };

  //! If the event came from one of the delete buttons
  if (e.target.classList.contains("fa-trash")) {
    //? Delete the relevant element of the array
    completeds = completeds.filter((completed) => completed.id != id);

    //? Delete related li element in DOM:: you dont want it to see after refresh
    e.target.parentElement.remove();

    //? Save final completeds array to localStorage
    localStorage.setItem("completeds", JSON.stringify(completeds));
  }

  //! If the event came from the completed-tick
  if (e.target.classList.contains("fa-check")) {
    tempHtmlObj = e.target.parentElement;
    
    //? Delete the relevant element of the array
    completeds = completeds.filter((comp) => comp.id != tempHtmlObj.id);

    //? move it From completed container To todo container :? instead of this move it to local array and pull from there with the func.
    
    //? Push the item into todos and update
    todos.push(lastClickedCompLi);
  

    tempHtmlObj.remove();

    //? Save final arrays to localStorage 
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("completeds", JSON.stringify(completeds));

    todoUl.innerHTML = "";
    completeds_Ul.innerHTML = "";
    renderSaved_Completeds();
    renderSavedTodos()
  }
});
//! ----------------------------end-------------------------------
//
//
//
//
//
//
//
//
//
//
//
//
//

//? KEYDOWN EVENTS FOR GENERAL
//! Calling click function of add button by pressing enter key from the keyboard
todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    btn_add.click();
  }
});
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    btn_search.click();
  }
});
