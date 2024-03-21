function initializeQuickLinksMenu() {
    // Check if the elements exist before proceeding
    if (
      $(".qlmenu-menubutton").length === 0 ||
      $(".qlmenu").length === 0 ||
      $(".qlmenu-background").length === 0
    ) {
      return; // Exit function silently if any of the elements are missing
    }
  
    // Current menu state.
    var menuOpened = false;
  
    // Is menu currently animating to open/close. Used to disable further clicks when animating.
    var menuAnimationRunning = false;
  
    // Button and Menu elements.
    var quickLinksButton = $(".qlmenu-menubutton");
    var quickLinksMenu = $(".qlmenu");
    var quickLinksMenuBackground = $(".qlmenu-background");
  
    // Button to trigger the menu.
    quickLinksButton.on("click", function () {
      quickLinksMenuOpenClose();
    });
  
    // White background inside the menu component.
    quickLinksMenuBackground.on("click", function () {
      quickLinksMenuOpenClose();
    });
  
    // Menu Open/Close behavior.
    function quickLinksMenuOpenClose() {
      if (!menuAnimationRunning) {
        menuAnimationRunning = true;
  
        if (menuOpened) {
          console.log("FadeOut");
          setTimeout(fadeOutComplete, 500);
          quickLinksMenu.css("opacity", 0);
        } else {
          console.log("FadeIn");
          quickLinksMenu.css("opacity", 0);
          quickLinksMenu.removeClass("qlmenu-hide");
          setTimeout(fadeInStart, 50);
        }
      }
    }
  
    // On complete of fade out animation, hide the menu, set flags.
    function fadeOutComplete() {
      quickLinksMenu.addClass("qlmenu-hide");
      menuOpened = false;
      menuAnimationRunning = false;
  
      $("body").css("overflow", "auto");
    }
  
    // Start fade in of the menu, triggered on click of the menu button.
    function fadeInStart() {
      quickLinksMenu.css("opacity", 1);
      setTimeout(fadeInComplete, 500);
    }
  
    // On complete of fade in, set flags.
    function fadeInComplete() {
      menuOpened = true;
      menuAnimationRunning = false;
  
      $("body").css("overflow", "hidden");
    }
  }
  