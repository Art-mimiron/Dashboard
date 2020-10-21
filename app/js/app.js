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


});