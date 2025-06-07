const { c } = require("./commit");
const { nconfig } = require("./run")

function test() {
    try {
        c.exec(JSON.parse(nconfig).test)
    }
    catch (err) {
        console.log(err)
    }
}

export { test }
exports = { test }