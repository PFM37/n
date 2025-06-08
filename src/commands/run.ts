const { nconfig, configExists, c, ask } = require("../global");

function run(arg: any) {
  if (configExists) {
    const command = nconfig.custom?.[arg];

    if (!command) {
      console.log(`Command "${arg}" not found in n.config.json -> custom`);
      process.exit();
    }

    c.exec(command, (error: any, stdout: any, stderr: any) => {
      if (error) {
        console.error("Error:", error.message);
      }
      if (stdout) {
        process.stdout.write(stdout);
      }
      if (stderr) {
        process.stderr.write(stderr);
      }
      process.exit();
    });
  } else {
    console.log("Looks like the n.config.json doesn't exist");
    const a = ask("Would you like to create? (y/n): ");
    if (a.toLowerCase() === "y") {
      // You probably want to trigger init here or create config
      console.log("Creating config not implemented here.");
    }
    process.exit();
  }
}

module.exports = { run };
export { run };