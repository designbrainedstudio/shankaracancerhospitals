/**********
  SEARCH AUTOFOCUS
  */

$("#search-box_open-button").click(function () {
  setTimeout(() => {
    document.getElementById("search").focus();
  }, 500);
});

$("#search-box-mobile_open-button").click(function () {
  setTimeout(() => {
    document.getElementById("search-mobile").focus();
  }, 500);
});
