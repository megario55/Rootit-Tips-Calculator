const express = require('express');
const app = express();
app.use(express.json()); 
const cors=require('cors')
app.use(cors());
app.use(express.urlencoded({ extended:true}))


// Endpoint to calculate tip
app.post('/calculate-tip', (req, res) => {
    const { amount, tipPercentage } = req.body;

    // Validate input
    if (typeof amount !== 'number' ||  amount <= 0) {
        return res.status(400).json({ error: 'Amount must be positive value' });
    }
    if (typeof tipPercentage !== 'number' || tipPercentage < 0 || tipPercentage > 100) {
        return res.status(400).json({ error: 'Tip percentage must be between 0 and 100' });
    }

    // Calculate tip
    const tip = (amount * tipPercentage) / 100;
    const total = amount + tip;

    // Return tip and total
    res.json({ tip, total });
});

app.listen(5000,'127.0.0.1', () => {
    console.log('server listening to 5000');
});



