const flags = args.filter(arg => arg.startsWith("-"));
const params = args.filter(arg => !arg.startsWith("-"));

if (flags.includes("--force") || flags.includes("-f")) {
  console.log("Force flag detected!");
}