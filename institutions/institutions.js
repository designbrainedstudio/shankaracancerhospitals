// Scroll back to top
function scrollToInstitutionsList() {
    var tabs_offset = $(".section_institutions-list").offset();
  $(".institutions_back-to-top").click(function(event) {
    $('html, body').animate({
      scrollTop: (tabs_offset.top)
    }, 800);
  });
}