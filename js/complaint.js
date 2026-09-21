let selectedCategory = "";


/* =========================
   SELECT CATEGORY
========================= */

function selectCategory(button, category) {

    document
        .querySelectorAll(".category")
        .forEach(function (item) {

            item.classList.remove("selected");

        });


    button.classList.add("selected");


    selectedCategory = category;


    let selected =
        document.getElementById("selectedCategory");


    selected.style.display = "block";


    selected.innerHTML =
        "Selected Category: " + category;

}


/* =========================
   SUBMIT
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


    if (selectedCategory === "") {

        alert(
            "Please select a problem category."
        );

        return;
    }


    if (location === "") {

        alert(
            "Please enter the location."
        );

        return;
    }


    if (description === "") {

        alert(
            "Please describe the problem."
        );

        return;
    }


    alert(

        "Complaint submitted successfully!\n\n" +

        "Category: " +
        selectedCategory +

        "\nLocation: " +
        location

    );

}

