const { c } = require("../global");
const { nconfig } = require("../global")

function test() {
    try {
        c.exec(JSON.parse(nconfig).test)
    }
    catch (err) {
        console.log(err)
    }
}

export { test }
module.exports = { test }