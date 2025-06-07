const { run } = require("./commands/run");
const { commit, push } = require("./commands/commit");

const [, , command, ...args] = process.argv;

switch (command) {
    case 'run': {
        run();
        break;
    }
    case "commit": {
        if (args[0]) {
            commit(args[0]);
        }
        else {
            console.log("Please provide a commit a message");
        }
        break;
    }
    case "push": {
        if (args[0] && args[1]) {
            push(args[0], args[1]);
        }
        else {
            console.log("Please provide both branch and remote name");
        }
        break;
    }
    default: {
        console.log(`Unknown command
            Avaible commands:
            init: initializes a n project
            run: runs the project
            commit: commits the project
            push: pushes the latest commit to repo
            test: runs the test commands
            Tip: use the n.config.json to automatically add args to push and commit and commands for run and test`);
        break;
    }
}