
async function submitOrder(){

    console.log("SUBMIT CLICKED");
    console.log("PRODUCT:", window.selectedProduct);

    if(!window.productReady || !window.selectedProduct){
        alert("Please wait, product is loading...");
        return;
    }

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    if(!name || !email){
        alert("Please enter your name and email");
        return;
    }

    const market = getMarket();

    const marketData = window.selectedProduct.markets[market];


    const orderData = {

        name: name,
        email: email,

        market: market,

        product: window.selectedProduct.name,
        product_id: window.selectedProduct.id,

        amount: marketData.price,

        currency: marketData.currency,

        payment_method: marketData.payment

    };


    try{

        const response = await fetch("/api/order",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(orderData)

        });


        const data = await response.json();


        if(data.status === "success"){

            localStorage.setItem(
                "order_id",
                data.order_id
            );

            window.location.href =
            "order_success.html";

        }
        else{

            alert("Order failed");

        }

    }

    catch(error){

        console.log(error);

        alert("Connection error");

    }

}
