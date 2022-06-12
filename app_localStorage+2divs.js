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
	  	<p>${content}</p>
	  	<i class="fa fa-check"></i>
		<i class="fa fa-trash"></i>
	  </li>`;
}
function createListElement(todo) {
  //? we have destructured each todo object
  const { id, content, isDone } = todo;
  todoUl.innerHTML += `
	  <li id=${id} class=${isDone ? "checked" : ""}>
	  	<p>${content}</p>
	  	<i class="fa fa-check"></i>
		<i class="fa fa-trash"></i>
	  </li>`;
}
//! ----------------------------end-------------------------------

//! -------------- COMPLETEDS container DEFINITIONS --------------
//! Selectors for completeds container
const btn_search = document.getElementById("button_search");
const searchInput = document.getElementById("search-input");
const completeds_Ul = document.getElementById("completeds-ul");
let tempObj = "";

//! bring data from local for completed todos
let completeds = JSON.parse(localStorage.getItem("completeds")) || [];

// BURASI ÇALIŞMIYOR,2 FONKSİYON.
renderSaved_Completeds();
function renderSaved_Completeds() {
	completeds.forEach((i) => {
    createListElement_Completeds(i);
  });
}
function createListElement_Completeds(comp_item) {
	//? we have destructured each object
	// const { id, content, isDone } = item;
	// tempObj = { id, content, isDone };
	// completeds.unshift(tempObj);
	//? original;
	const { id, content, isDone } = comp_item;
	completeds.innerHTML += `
	<li id=${id} class=${isDone ? "checked" : ""}>
	<p>${content}</p>
	<i class="fa fa-check"></i>
	<i class="fa fa-trash"></i>
	</li>`;
	//! ??
	localStorage.setItem("completeds", JSON.stringify(completeds));
	completeds = JSON.parse(localStorage.getItem("completeds")) || [];

}


//! ----------------------------end-------------------------------

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

	//? add tich and trash buttons with func.
    createListElement(todoObject);
	//? empty input box
    todoInput.value = "";
  }
});

//! Event definition for delete
todoUl.addEventListener("click", (e) => {
  const id = e.target.parentElement.getAttribute("id");

//! FOR LAST CLİCKED Lİ
	lastClickedTodoLi = {'id' : e.target.parentElement.id, 'isDone':'true', 'content':e.target.querySelector()};

  //! If the event came from one of the delete buttons
  if (e.target.classList.contains("fa-trash")) {
    //? Delete the relevant element of the array
    todos = todos.filter((todo) => todo.id != id);

    //? Delete related li element in DOM:: you dont want it to see after refresh
    e.target.parentElement.remove();

    //? Save final todos array to localStorage
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  //! If the event came from the completed-tick
  if (e.target.classList.contains("fa-check")) {
    //? when click on a tick;

	const { id, content, isDone } =

	//? push the one to the completeds array
	// todoObject = {
	// 	//? create info object
	// 	id: new Date().getTime(),
	// 	isDone: false,
	// 	content: 'asd',
	//   };
  
	  //? Push newly created todo into array
	//   completeds.push(todoObject);
	  completeds.push(lastClickedTodoLi);

    //? move it From todo container To completed container
    tempObj = e.target.parentElement;
    completeds_Ul.append(tempObj);
    todos = todos.filter((todo) => todo.id != tempObj.id);


	//? OFF - aynı containerda checked-unchecked geçişinde kullandığımız kod bloğu
    // //? Update the isDone part of the relevant element in the todos array :local
    // todos.map((todo, index) => {
    // if (todo.id == id) {  //?  for clicked-todo
    // 	todos[index].isDone = !todos[index].isDone; //? reverse its isDone boolean
    // }
    // });

	// xxx  buraya odaklan;
    //? Save final todos array to localStorage : In order to see after refresh
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("completeds", JSON.stringify(completeds));


	//? OFF - aynı containerda checked-unchecked geçişinde kullandığımız kod bloğu
    // ? If there is a class named checked in the relevant li element, delete it (DOM)
    if (!e.target.parentElement.classList.contains("checked")) {
      e.target.parentElement.classList.add("checked");
    } 
  }
});

//! ----------------------------end-------------------------------




//! -----------------COMPLETEDS container EVENTS ------------------
//! Defining Search Button Event
// btn_search.addEventListener("click", () => {  //SONRA
//   //? Alert, if inputBox is empty
//   if (!searchInput.value) {
//     alert("Please enter your search word");
	
//   } else {
//     //? if inputBox is not empty,


//     //? filter completed array with search inputbox
//     //   completeds = completeds.filter(searchInput.value);
//     console.log("here is the filter process for search button"); //!

//     //? Save final array to localStorage
//     localStorage.setItem("completeds", JSON.stringify(completeds));

//     //   createListElement(todoInput);
//       searchInput.value = '';
//   }
// });

//! Event definition for delete
completeds_Ul.addEventListener("click", (e) => {
  const id = e.target.parentElement.getAttribute("id");

//! If the event came from one of the delete buttons
  if (e.target.classList.contains("fa-trash")) {
    //? Delete the relevant element of the array
    completeds = completeds.filter((completed) => completed.id != id);

    //? Delete related li element in DOM:: you dont want it to see after refresh
    e.target.parentElement.remove();

    //? Save final todos array to localStorage
    localStorage.setItem("completeds", JSON.stringify(completeds));
  }


  //! If the event came from the completed-tick
  if (e.target.classList.contains("fa-check")) {
    //? when click on a tick;

    //? move it From completed container To todo container
    tempObj = e.target.parentElement;
    todoUl.append(tempObj);

	//? remove item from completeds array
	// completeds.remove(tempObj);

	//! olmadanda şuan çalışıyor;
    // todos = todos.filter((todo) => todo.id != tempObj.id);
    // console.log('yess:' + tempObj.id);

    //? Update the isDone part of the relevant element in the todos array :local
    // todos.map((todo, index) => {
    //   if (todo.id == id) {
        //?  for clicked-todo
        // todos[index].isDone = !todos[index].isDone; //? reverse its isDone boolean
        // completeds[index].isDone = !completeds[index].isDone; //? reverse its isDone boolean
    //   }
    // });

    //? Save final todos array to localStorage : In order to see after refresh
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("completeds", JSON.stringify(completeds));

    //? If there is a class named checked in the relevant li element, delete it (DOM)
    if (e.target.parentElement.classList.contains("checked")) {
      e.target.parentElement.classList.remove("checked");
    } 
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
