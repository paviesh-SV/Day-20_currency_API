//Got the URL for the currencies and rates from this website documentation: https://www.vatcomply.com/documentation

//Creating the data available from the URL in the form of options to be selected
fetch("https://api.vatcomply.com/currencies")
    .then((response) => response.json())
    .then((data) => {
        const curr1 = document.getElementById("currencyOrigin");
        const curr2 = document.getElementById("currencyConverted");

        for(const currency in data) {
            const option1 = document.createElement("option");
            const option2 = document.createElement("option");

            option1.innerHTML = `${data[currency]["name"]} (${data[currency]["symbol"]})`;
            option1.setAttribute("value", currency);

            option2.innerHTML = `${data[currency]["name"]} (${data[currency]["symbol"]})`;
            option2.setAttribute("value", currency);

            curr1.appendChild(option1);
            curr2.appendChild(option2);
        }
    })
    .catch((error) => {
        console.error(error);
    })

    
    //function to convert the currencies, it will display when submit button is pressed
    function convert(){

        const currencyOrgin = document.getElementById("currencyOrigin").value;
        const currencyConverted = document.getElementById("currencyConverted").value;
        const amount = document.getElementById("amount").value;

        fetch(`https://api.vatcomply.com/rates?base=${currencyOrgin}`)
            .then((response) => response.json())
            .then((data) => {
                const output = (amount * data["rates"][currencyConverted]).toFixed(2);
                const display = document.getElementById("display");

                display.innerHTML = `${amount} ${currencyOrgin} = ${output} ${currencyConverted}`; 
            })
            .catch((error) => {
                console.error(error);
            })
    } 