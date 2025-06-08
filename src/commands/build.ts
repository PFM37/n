const fs = require('fs');
const { c } = require("../global")
const { nconfig, configExists } = require("../global")
const { init } = require("./add")

function build() {
    if (configExists 
        /*
        Who will be a sillyionare, is this statement true
        A: 10011110 10011100 
        B: 01011001 01000101 01010011
        C: 01001000 01100101 01101100 01101100 00100000 01011001 01100101 01100001 01101000 11110000 10011111 10100110 10000101 11110000 10011111 10100110 10000101 11110000 10011111 10100110 10000101 
        D: 01100110 01110101 01100011 01101011 00100000 01101110 01101111
        */
    ) {
        if (nconfig && nconfig.build) {
            console.log('> npm install'); // i am gonna install all the dependencies, so the code doesn't crash like your brain does wile coding
            c.exec('npm install', (err: any, stdout: any) => {
            if (err) {
                console.error('npm install failed:', err); // you're brain is probably gonna crash after trying to read the error message
                return; // go back to your time, adopted kitler
            }
            else {
                console.log(stdout)
            }
            console.log('npm install completed\n',); // don't shout italian brainrot after this, this isn'y like you won world cup

            console.log(`> ${nconfig.build}`);
            c.exec(nconfig.build, (buildErr: any, out: any) => {
                if (buildErr) {
                console.error('build command failed:', buildErr); // Yeah another error to crash your brain and think you're a failure
                return;
                }
                else {
                    console.log(out) // prints your browser history 
                }
                console.log('build command completed successfully'); // Hell yeah
            });
            });
        }
    } else {
        console.error('n.config.json not found.'); // guess why? Because it wasn't fucking created. Ok you're a fucking piece of shit anyways and you probably doesn't know the full form of json so let me create it for you
        init();
    }
}

export { configExists, build, nconfig }
module.exports = { configExists, build, nconfig }