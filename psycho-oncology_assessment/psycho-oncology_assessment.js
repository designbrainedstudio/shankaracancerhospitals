function initializeAssessment() {
  // Add "is-disabled" class and disable the submit button
  $("#assessment-submitBtn").addClass("is-disabled").prop("disabled", true);

  // Populate the questions
  populateQuestions();

  // Attach change event listener to radio buttons
  $(document).on("change", "input[type='radio']", function () {
    toggleSubmitButton();
  });

  // Attach click event listener to submit button
  $("#assessment-submitBtn").on("click", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Disable all components within the form and add "is-disabled" class to the submit button
    $(
      "#self-assessment-form input, #self-assessment-form button, #self-assessment-form select, #self-assessment-form textarea"
    ).prop("disabled", true);
    $(this).addClass("is-disabled");

    // Remove the "hide" class from element with ID "assessment-a"
    $("#assessment-a").removeClass("hide");

    // Call showScore function
    showScore();
  });
}

function populateQuestions() {
  // From assessmentQuestions variable.
  // Syntaxed -
  // var assessmentQuestions = [{"question":"Question 1 goes here","weight":1}, {"question":"Question 2 goes here","weight":2}, ...];

  // Function to shuffle an array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Shuffle the assessmentQuestions array
  shuffleArray(assessmentQuestions);

  var parentElement = $("#assessment-q-items");

  // Array to hold checklist items with their weights
  var checklistItems = [];

  // Clone the initial checklist item
  var checklistItem = $(".dbs_checklist_item").first().clone();

  // Clear the parent element to remove the initial item
  parentElement.empty();

  // Loop through the shuffled JSON list and create new items
  for (var i = 0; i < assessmentQuestions.length; i++) {
    var newItem = checklistItem.clone();
    newItem
      .find(".dbs_checklist_item-text")
      .text(assessmentQuestions[i].question);
    newItem.find(".dbs_checklist_item-number").text(i + 1);

    var inputName = "assessment-q";
    var inputId = "assessment-q-" + (i + 1);
    newItem.find("input[type='radio']").attr({
      type: "radio",
      name: inputName,
      id: inputId,
      "data-name": inputId,
      "data-weight": assessmentQuestions[i].weight,
    });

    // Add the new item to the parent element
    parentElement.append(newItem);

    // Add the new item and its weight to the checklistItems array
    checklistItems.push({
      element: newItem,
      weight: assessmentQuestions[i].weight,
    });
  }

  // Remove the "hide" class from the dbs_checklist_component element
  parentElement.removeClass("hide");

  // For demonstration, log the checklistItems array
  console.log(checklistItems);
}

function toggleSubmitButton() {
  if ($("input[type='radio']:checked").length > 0) {
    $("#assessment-submitBtn")
      .removeClass("is-disabled")
      .prop("disabled", false);
  } else {
    $("#assessment-submitBtn").addClass("is-disabled").prop("disabled", true);
  }
}

function showScore() {
  var selectedWeight = $("input[type='radio']:checked").data("weight");

  var resultTitle = "";
  var resultDescription = "";
  var colorBg = "";
  var colorText = "";

  if (selectedWeight >= 1 && selectedWeight <= 3) {
    resultTitle = "You might be under mild stress.";
    resultDescription =
      "You can practice the above mentioned grounding techniques/coping mechanisms and calm yourself down. You can reattempt this after one week to re-evaluate.";
    colorBg = "#40BAA4";
    colorText = "#ffffff";
  } else if (selectedWeight >= 4 && selectedWeight <= 6) {
    resultTitle = "You are under moderate stress.";
    resultDescription =
      "In addition to practicing some of the coping mechanisms previously mentioned, consulting a professional will give you better insights into how you can feel better sooner. Do attempt this test after a week’s time to re-evaluate yourself.";
    colorBg = "#FFD8A0";
    colorText = "#000000";
  } else if (selectedWeight >= 7 && selectedWeight <= 10) {
    resultTitle = "You need to see a doctor.";
    resultDescription =
      "You will definitely benefit from professional help to cope up with your stress and overcome the baggage that is weighing you down.";
    colorBg = "#D65454";
    colorText = "#ffffff";
  }

  // Populate the elements with the result
  $("#assessment-a-title").text(resultTitle).css("color", colorText);
  $("#assessment-a-description")
    .text(resultDescription)
    .css("color", colorText);
  $("#assessment-a-response").css("background-color", colorBg);

  $("html, body").animate(
    {
      scrollTop: $("#assessment-a").offset().top - $(window).height() * 0.2,
    },
    500
  );
}
