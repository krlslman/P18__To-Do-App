//! Selectors
const btn = document.getElementById('todo-button');
const todoInput = document.getElementById('todo-input');
const todoUl = document.getElementById('todo-ul');

//! bring data from local
let todos = JSON.parse(localStorage.getItem('todos')) || [];

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
	  <li id=${id} class=${isDone ? 'checked' : ''}>
		<i class="fa fa-check"></i>
		<p>${content}</p>
		<i class="fa fa-trash"></i>
	  </li>`;
  }
  
//! Let the input be active at the beginning
window.onload = function () {
	todoInput.focus();
  };

//! Defining Add Button Event
btn.addEventListener('click', () => {
	//? Alert if inputBox is empty
	if (!todoInput.value) {
	  alert('Please enter your todo');
	} else {
	//? Alert if inputBox is empty
	  const todoObject = {
		//? create info object
		id: new Date().getTime(),
		isDone: false,
		content: todoInput.value,
	  };
  
	  //? Push newly created todo into array
	  todos.push(todoObject);
  
	  //? Save final array to localStorage
	  localStorage.setItem('todos', JSON.stringify(todos));
  
	  createListElement(todoObject);
	  todoInput.value = '';
	}
  });

//! Calling click function of add button by pressing enter key from the keyboard
todoInput.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
	  btn.click();
	}
  });



//! Event definition for delete and arrow buttons
todoUl.addEventListener('click', (e) => {
	const id = e.target.parentElement.getAttribute('id');

	//? If the event came from one of the delete buttons
	if (e.target.classList.contains('fa-trash')) {
	  //? Dizinin ilgili elementini sildi
	  todos = todos.filter((todo) => todo.id != id);
  
	  //? Save final todos array to localStorage
	  localStorage.setItem('todos', JSON.stringify(todos));
  
	  //? Delete related li element in DOM:: you dont want it to see after refresh
	  e.target.parentElement.remove();
	}

	//! If the event came from the delete or arrow buttons
  if (e.target.classList.contains('fa-check')) { 
	//? when click on a tick;


    //? Update the isDone part of the relevant element in the todos array
    todos.map((todo, index) => {
		//? 
      if (todo.id == id) {  //?  for clicked todo
        todos[index].isDone = !todos[index].isDone; //? 
      }
    });

    //? Save final todos array to localStorage : In order to see after refresh
    localStorage.setItem('todos', JSON.stringify(todos));

    //? If there is a class named checked in the relevant li element, delete it (DOM)
    if (e.target.parentElement.classList.contains('checked')) {
      e.target.parentElement.classList.remove('checked');
    } else {
      //? If there is no class named checked in the relevant li element, add it
      e.target.parentElement.classList.add('checked');
    }
  }
});