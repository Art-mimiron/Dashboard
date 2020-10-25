document.addEventListener("DOMContentLoaded", function() {
  'use strict';

  const opacity = document.querySelectorAll('.sidebar__icon_opacity'),
        sideLink = document.querySelectorAll('.sidebar__link'),
        searchBtn = document.querySelector('[data-search_btn'),
        searchBar = document.querySelector('[data-search_bar]'),
        searchLine = document.querySelector('[data-search_line]');

// Sidebar active + hover animation
  sideLink.forEach((item, i) => {
    item.addEventListener('mouseover', () => {
      opacity[i].style.opacity = '1';
      opacity[i].style.fill = '#DDE2FF';
    });
    item.addEventListener('mouseout', () => {
      opacity[i].style.opacity = '';
      opacity[i].style.fill = '';
    });
  });

  sideLink.forEach((item, i) => {
    item.addEventListener('click', () => {
      for (let i = 0; i < sideLink.length; i++) {
        sideLink[i].classList.remove('sidebar__link_active');
        opacity[i].classList.remove('sidebar__icon_active');
      }
      sideLink[i].classList.toggle('sidebar__link_active');
      opacity[i].classList.toggle('sidebar__icon_active');
    });
  });
  
//toggle searchbar
  searchBtn.addEventListener('click', () => {
    if (searchBar.hasAttribute('disabled')) {
      searchBar.removeAttribute('disabled');
      searchLine.style.transform = 'translatex(0%)';
    } else {
      searchBar.setAttribute('disabled', true);
      searchBar.value = '';
      searchLine.style.transform = 'translatex(100%)';
    }
  });

//creating new task

  let tasksDB = [
    {title: 'Update ticket report',
      status: 'default'},
    {title: 'Create new ticket example',
    status: 'new'},
    {title: 'Finish ticket update',
    status: 'urgent'}
  ];

/* tasksDB.reverse(); */

  const form = document.querySelector('.summary__task-create'),
        input = form.querySelector('input'),
        taskList = document.querySelector('.summary__tasks-list');


  class CreateTask{
    constructor(title, status) {
      this.title = title;
      this.status = status;
      
    }
    render() {
      const element = document.createElement('li');
      element.classList.add('summary__task');
      element.innerHTML = `
        <label class="summary__task-name">${this.title}
          <input type="checkbox" name="taskName" id="taskName">
          <span class="summary__checkmark"></span>
        </label>
        <button name="taskStatus" class="summary__status summary__status_${this.status}">${this.status}</button>
      `;
      taskList.append(element);
    }
  }



  const addTask = function() {
    taskList.innerHTML = '';
    for (let i = tasksDB.length -1; i >= 0; i--) {
      new CreateTask(tasksDB[i].title, tasksDB[i].status).render();
    }
  };


  const removeTask = function() {
    let taskRemove = document.querySelectorAll('#taskName');

    taskRemove.forEach((item, index) => {
      item.addEventListener('click', function() {
        setTimeout(()=> {
          taskItem[index].remove();
          tasksDB.splice(index, 1);
          tasksDB.sort();
        },300);
      });
    });
  };
  
  

  addTask();
  removeTask();
  let taskItem = document.querySelectorAll('.summary__task');


  form.addEventListener('submit', (e)=> {
    e.preventDefault();
    let newTask = input.value;

    if (input.value) {
      if(newTask.length > 21) {
        newTask = `${newTask.substr(0, 22)}...`;
      }
      tasksDB.push({title:`${newTask}`, status:'new'});
      if (tasksDB.length == 4) {tasksDB.splice(0, 1);}
      e.target.reset();
      addTask();
      taskItem = document.querySelectorAll('.summary__task');
    }
    removeTask();
  });
 

});