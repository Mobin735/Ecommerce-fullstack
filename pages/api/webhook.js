// import { mongooseConnect } from "@/lib/mongoose";
// const stripe = require('stripe')(process.env.STRIPE_SK);
// import {buffer} from 'micro';

// export default async function handler(req,res) {
//     await mongooseConnect();

//     const sig = req.headers['stripe-signature'];

//     let event;

//     try {
//         event = stripe.Webhooks.constructEvent(await buffer(req), sig, endpointSecret);
//     } catch (error) {
//         Response.status(400).send(`Webhook Error: ${err.message}`);
//         return;
//     }

//     switch (event.type) {
//         case 'payment_intent.succeeded':
//             const paymetnIntentSucceeded = event.data.object;
        
//             break;

//         default:
//             console.log(`Unhandled event type ${event.type}`);    
//     }
// };  


// export const config = {
//     api: {bodyParser:false,}
// }

