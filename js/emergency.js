// ======================================
// Smart Traffic Nashik
// Emergency JavaScript
// ======================================


// Get all call buttons

const callButtons =
    document.querySelectorAll(
        ".call-btn, .small-call, .call-main"
    );


// Add click event to call buttons

callButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const number =
                button.getAttribute("href");


            // Get phone number

            if (number) {

                const phoneNumber =
                    number.replace("tel:", "");


                console.log(
                    "Calling emergency number: " +
                    phoneNumber
                );

            }

        }
    );

});