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

        alert("Please select a problem category.");
        return;
    }


    /* CHECK LOCATION */

    if (location === "") {

        alert("Please enter the location.");
        return;
    }


    /* CHECK DESCRIPTION */

    if (description === "") {

        alert("Please describe the problem.");
        return;
    }


    /* PREPARE DATA */

    let formData = new FormData();

    formData.append("complaint_type", selectedCategory);
    formData.append("location", location);
    formData.append("description", description);


    /* ADD COMPLAINT IMAGE */

    let image = document.getElementById("complaintImage").files[0];

    if (image) {
        formData.append("complaint_image", image);
    }


    /* SEND DATA TO PHP */

    fetch("submit_complaint.php", {
        method: "POST",
        body: formData
    })

        .then(function (response) {
            return response.text();
        })

        .then(function (result) {

            if (result.includes("Complaint submitted successfully!")) {

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

            } else {

                alert("Something went wrong: " + result);

            }

        })

        .catch(function (error) {

            console.error("Error:", error);

            alert("Unable to submit complaint. Please try again.");

        });

}