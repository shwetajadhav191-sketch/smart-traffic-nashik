let selectedCategory = "";


/* =========================
   SELECT CATEGORY
========================= */

function selectCategory(button, category) {

    // Remove selected class from all categories

    document
        .querySelectorAll(".category")
        .forEach(function (item) {

            item.classList.remove("selected");

        });


    // Add selected class to clicked category

    button.classList.add("selected");


    // Store selected category

    selectedCategory = category;


    // Show selected category

    let selected =
        document.getElementById("selectedCategory");


    selected.style.display = "block";


    selected.innerHTML =
        "Selected Category: " + category;
}


/* =========================
   SUBMIT COMPLAINT
========================= */

function submitComplaint() {

    let location =
        document
            .getElementById("location")
            .value
            .trim();


    let description =
        document
            .getElementById("description")
            .value
            .trim();


    /* CHECK CATEGORY */

    if (selectedCategory === "") {

        alert(
            "Please select a problem category."
        );

        return;
    }


    /* CHECK LOCATION */

    if (location === "") {

        alert(
            "Please enter the location."
        );

        return;
    }


    /* CHECK DESCRIPTION */

    if (description === "") {

        alert(
            "Please describe the problem."
        );

        return;
    }


    /* SHOW SUCCESS MESSAGE */

    let success =
        document.getElementById("successMessage");


    success.style.display = "block";


    success.innerHTML =
        "<strong>Complaint submitted successfully!</strong><br><br>" +

        "<strong>Category:</strong> " +
        selectedCategory +

        "<br>" +

        "<strong>Location:</strong> " +
        location +

        "<br>" +

        "<strong>Description:</strong> " +
        description;


    /* CLEAR FORM */

    document
        .getElementById("location")
        .value = "";


    document
        .getElementById("description")
        .value = "";


    /* REMOVE SELECTED CATEGORY */

    document
        .querySelectorAll(".category")
        .forEach(function (item) {

            item.classList.remove("selected");

        });


    selectedCategory = "";

}