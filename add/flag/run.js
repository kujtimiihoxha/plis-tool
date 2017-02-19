var p = require("plis")
var fs = require("fileSystem")
var json = require("json")
// The main function called by plis.
function main() {
    var config = fs.readFile("config.json")
    if (!config) {
        return "The current folder is not a plis tool so you can not add a flag"
    }
    config = json.decode(config)
    var flag = {
        name: p.args.name,
        type: p.flags.type,
        description: "The '" + p.args.name + "' flag description'"
    }
    if (p.flags.short != "") {
        flag.short = p.flags.short
    }
    if (!config.flags) {
        config.flags = []
    }
    var exists = false
    config.flags.forEach(function (f) {
        if (f.name == flag.name) {
            exists = true
        }
    })
    if (exists) {
        return "There is already a flag with the same name"
    }
    config.flags[config.flags.length] = flag
    fs.writeFile("config.json", json.encodeF(config),true)
}