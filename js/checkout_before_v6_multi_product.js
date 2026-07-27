
async function submitOrder(){

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();


    if(!name || !email){

        alert("Please enter your name and email.");
        return;

    }


    const paymentRequest = {

        name: name,
        email: email,
        product: "Hunter-X V44 Professional",
        amount: 990000,
        payment_method: "IR_GATEWAY"

    };


    try {


        const response = await fetch("/api/payment/request",{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body: JSON.stringify(paymentRequest)

        });



        const result = await response.json();



        if(result.status === "success"){


            const order = {

                name: name,
                email: email,
                product: "Hunter-X V44 Professional",
                amount: 990000,
                payment_id: result.payment_id,
                status: "PAID",
                date: new Date().toISOString()

            };



            const saveOrder = await fetch("/api/order",{

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },

                body: JSON.stringify(order)

            });



            const orderResult = await saveOrder.json();



            if(orderResult.status === "success"){

                window.location.href="../pages/order_success.html";

            }

        }

        else{

            alert("Payment request failed.");

        }


    }

    catch(error){

        alert("Connection error.");
        console.log(error);

    }


}
