var p = require("plis")
var fs = require("fileSystem")
var json = require("json")
// The main function called by plis.
function main() {
    var config = fs.readFile("config.json")
    if (!config) {
        return "The current folder is not a plis tool so you can not add an argument"
    }
    config = json.decode(config)
    var flags = p.flags
    var args = p.args
    var arg = {
        name: args.name,
        type: flags.type,
        required: flags.required,
        description: "The '" + args.name + "' arg description'",
    }
    if (!config.args) {
        config.args = []
    }
    var exists = false
    config.args.forEach(function (a) {
        if (a.name == arg.name) {
            exists = true
        }
    })
    if (exists) {
        return "There is already an argument with the same name"

    }
    config.args[config.args.length] = arg
    fs.writeFile("config.json", json.encodeF(config),true)
}