//? Selectors
const btn = document.getElementById('todo-button');
const todoInput = document.getElementById('todo-input');
const todoUl = document.getElementById('todo-ul');

//? Baslangicta input aktif olsun
window.onload = function () {
	todoInput.focus();
  };

//? Add Buton Event'inin tanimanmasi
btn.addEventListener('click', (e) => {
	if (!todoInput.value) {
	  alert('Please enter your todo');
	} else {
	  todoUl.innerHTML += `
	  <li>
		<i class="fa fa-check"></i>
		<p>${todoInput.value}</p>
		<i class="fa fa-trash"></i>
	  </li>`;
	  todoInput.value = '';
	}
  });