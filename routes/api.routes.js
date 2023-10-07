const { Router } = require('express');
const balanceMegatarjeta = require("../src/scrapper");

const router = Router();

router.get('/', (req, res) => {
    res.send('Hi friend!');
});

router.post('/', async (req, res) => {
    let { cardID } = req.body;
    console.log(req.body);
    if (typeof cardID === 'number' && Number.isInteger(cardID)) {
        cardID = cardID.toString();
    }
    const saldo = await balanceMegatarjeta(cardID.toString());
    console.log("SALDO:", saldo);
    res.send(`Hi friend, your balance is ${saldo}`);
});

function intToString(integer) {
    if (typeof integer === 'number' && Number.isInteger(integer)) {
      return integer.toString();
    } else {
      return "No es un número entero válido";
    }
  }

module.exports = router;