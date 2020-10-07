function showall() {
    document.getElementById("lists").classList.toggle("show");
  }
  function showAdder() {
    document.getElementById("new__list").classList.toggle("show");
  }
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.all_list__btn')) {
      var dropdowns = document.getElementsByClassName("list__names");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  