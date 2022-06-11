//? Selectors
const btn = document.getElementById('todo-button');
const todoInput = document.getElementById('todo-input');
const todoUl = document.getElementById('todo-ul');

//? Let the input be active at the beginning
window.onload = function () {
	todoInput.focus();
  };

//? Defining Add Button Event
btn.addEventListener('click', (e) => {
	if (!todoInput.value) {
	  alert('Please enter your todo');
	} else {
	  todoUl.innerHTML += `
	  <li>
	  <p>${todoInput.value}</p>
	  <i class="fa fa-check"></i>
		<i class="fa fa-trash"></i>
	  </li>`;
	  todoInput.value = '';
	}
  });

//? Calling the click function of the add button by pressing the enter key from the keyboard
todoInput.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
	  btn.click();
	}
  });

	//? Event definition for delete and arrow buttons
	todoUl.addEventListener('click', (e) => {
		//! If the event came from one of the delete buttons
		if (e.target.classList.contains('fa-trash')) {
		//? Update the DOM by deleting the corresponding li element
		e.target.parentElement.remove();
		}

	//! If the event came from the delete or arrow buttons
	if (e.target.classList.contains('fa-check')) {
		//? If there is a class named checked in the relevant li element, delete it
		if (e.target.parentElement.classList.contains('checked')) {
		  e.target.parentElement.classList.remove('checked');
		} else {
		  //? If there is no class named checked in the relevant li element, add it
		  e.target.parentElement.classList.add('checked');
		}
	  }
	});