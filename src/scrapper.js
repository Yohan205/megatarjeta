const { URL } = require("./config");
//import { launch } from 'puppeteer';
const { launch } = require('puppeteer');
//import * as randomUseragent from "random-useragent";
const randomUseragent = require('random-useragent');

const balanceMegatarjeta = async (tarjetaID) => {

    const header = randomUseragent.getRandom((ua) => {
        return ua.browserName == 'Firefox';
     });

    const browser = await launch({
        headless: 'new',
        ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();

    await page.setUserAgent(header);

    await page.goto(`${URL}/index/saldo`);

    const tarjeta = await page.waitForSelector('#tarjeta')
    await tarjeta.type(tarjetaID);

    await page.click(".boton1");

    // if (page.url() != 'https://app4.utp.edu.co/pe/utp.php')
    //     throw new IncorrectData("Usuario y/o contrasela incorrectos");

    await new Promise( r => setTimeout(r, 600));
    const getSaldo = await page.evaluate( () => {
        const saldo =  document.querySelector('div#tdcomponenteSiglaDet:nth-child(5)').innerText;
        return saldo;
    });

    let balance = getSaldo.split(' ')[3].slice(6);

    // console.log("SALDO:", balance);

    await browser.close();

    return balance;
}

/**
 * Con eso puedo conseguir los campos de la tabla de movimientos
 * document.querySelector('#reporte > tbody > tr:nth-child(3)').innerText
 */

module.exports = balanceMegatarjeta