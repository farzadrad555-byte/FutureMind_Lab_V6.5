
async function submitOrder(){

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const payment = document.getElementById("payment_method").value;


    if(!name || !email){
        alert("Please enter your name and email.");
        return;
    }


    const order = {

        name: name,
        email: email,
        product: "Hunter-X V44 Professional",
        amount: 990000,
        currency: "IRR",
        payment_method: payment,
        status: "PENDING"

    };


    try {

        const response = await fetch("/api/order",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body: JSON.stringify(order)

        });


        const result = await response.json();


        if(result.status === "success"){


            if(payment === "IR_GATEWAY"){

                alert("در حال انتقال به درگاه پرداخت...");

                window.location.href="/thank-you.html";

            }


            if(payment === "USDT"){

                window.location.href="/pages/usdt_payment.html";

            }


        } else {

            alert("Order failed.");

        }


    } catch(error){

        alert("Connection error.");

    }

}
