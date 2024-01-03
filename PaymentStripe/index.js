const express = require('express');
const cors = require("cors")
const PORT = 8080

const stripe = require('stripe')('sk_test_51OTSOaSCLk89VVV2rKVOHYuhtVhatr42Idu62Nn2xa0Pr3Fsee5JL687eoWbCAkaU7DAMKXrSUkpvjmkcpuWyw2U00ZIT6Ag03');


const app = express();

app.use(cors());
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {

    console.log(req.body);

    const lineItems = req.body.map((e) => ({
        price_data: {
            currency: "inr",
            product_data: {
                name: e.brand
            },
            unit_amount: e.price * 100
        },
        quantity: e.quantity
    }))

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `http://localhost:5173/success`,
        cancel_url: `http://localhost:5173/cancel`,
    });

    res.json({ id: session.id });

    // res.send('POST REQUEST');


});

app.get("/", (req, res) => {

})

app.listen(8080, () => console.log('Running on port 8080'));


// SECRET KEY : sk_test_51OTSOaSCLk89VVV2rKVOHYuhtVhatr42Idu62Nn2xa0Pr3Fsee5JL687eoWbCAkaU7DAMKXrSUkpvjmkcpuWyw2U00ZIT6Ag03
// PUBLISHABLE KEY : pk_test_51OTSOaSCLk89VVV2y65ICM1KafKVLbOIhdp06xHCYFST0x3lQGymFiCjyl2Ji6qOcmmugvwPipgsLxtF6bDOhcNM00Msw33mYG