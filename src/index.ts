const { init } = require("./commands/init");
const { build } = require("./commands/build");
const { commit, push } = require("./commands/commit");
const { test } = require("./commands/test")
const { add } = require("./commands/add")

const [, , command, ...args] = process.argv;

switch (command) {
    case 'build': {
        build();
        break;
    }
    case "commit": {
        commit()
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
    case ".": {
        build();
        break;
    }
    case "test": {
        test()
        break;
    }
    case "init": {
        init()
        break;
    }
    case "add": {
        add()
        break;
    }
    default: {
        console.log(`Unknown command
            Avaible commands:
            init: initializes a n project
            build: builds the project
            commit: commits the project
            push: pushes the latest commit to repo
            test: builds the test commands
            Tip: use the n.config.json to automatically add args to push and commit and commands for build and test`);
        break;
    }
}