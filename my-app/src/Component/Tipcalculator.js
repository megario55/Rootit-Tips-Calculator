import React, { useState } from 'react';
import axios from 'axios';

function Tipcalculator() {
    const [amount, setAmount] = useState('');
    const [tipPercentage, setTipPercentage] = useState('');
    const [result, setResult] = useState({ tip: 0, total: 0 });

    const handleCalculateTip = async () => {
        const parsedAmount =parseFloat(amount);
        const parsedTipPercentage= parseFloat(tipPercentage)

        //validate input
        if(isNaN(parsedAmount) || parsedAmount <= 0){
            alert('Amount must be positive value')
            return;
        }
        if(isNaN(parsedTipPercentage) || parsedTipPercentage < 0 || parsedTipPercentage > 100){
            alert('Tip percentage must be between 0 and 100')
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/calculate-tip', {
                amount: parsedAmount,
                tipPercentage: parsedTipPercentage,
            });
            setResult(response.data);
        } catch (error) {
            console.error('Error calculating tip:', error);
        }
    }
  return (
    <div className='maintip' >
       
      <h1>Tips Calculator</h1>
      <div className='main'>
            <input
                type="number"
                placeholder="Bill Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            /><br/><br/>
            <input
                type="number"
                placeholder="Tip Percentage"
                value={tipPercentage}
                onChange={(e) => setTipPercentage(e.target.value)}
            /><br/><br/>
            <button onClick={handleCalculateTip}>Calculate Tip</button>
           
            </div>
            <div className='output'>
                <p>Tip: ${result.tip.toFixed(2)}</p>
                <p>Total: ${result.total.toFixed(2)}</p>
            </div>
    </div>
  )
}

export default Tipcalculator
