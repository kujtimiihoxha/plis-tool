var p = require("plis")
var fs = require("fileSystem")
var json = require("json")
var tp = require("templates")

function main() {
    flags = p.flags
    args = p.args
    m = {
        name: args.name,
        type: flags.type,
        aliases: []
    }
    if (flags.aliases != "") {
        m.aliases = flags.aliases.split(",")
    }
    if (flags.subcommand) {
        config = fs.readFile("config.json")
        if (!config) {
            return "The current folder is not a plis generator so you can not add a subcommand"
        }
        config = json.decode(config)
        if (!config.sub_commands) {
            config.sub_commands = []
        }
        config.sub_commands[config.sub_commands.length] = m.name
        p.toJsonFile("config.json", config)
        err = tp.copyTemplateFolder("", m.name, m, ["test-project*", ".*", "run.*"])
        if (!err) {
            return
        }
        if (m.type == "lua") {
            err = tp.copyTemplate("run.lua.tpl", "run.lua", m)
            if (!err) {
                return
            }
        } else if (m.type == "js") {
            err = tp.copyTemplate("run.js.tpl", "run.js", m)
            if (!err) {
                return
            }
        }
    }
    else {
        err = tp.copyTemplateFolder("", "plis-" + m.name, m, ["run.*"])
        if (!err) {
            return
        }
        if (m.type == "lua") {
            err = tp.copyTemplate("run.lua.tpl", "run.lua", m)
            if (!err) {
                return
            }
        } else if (m.type == "js") {
            err = tp.copyTemplate("run.js.tpl", "run.js", m)
            if (!err) {
                return
            }
        }
    }
    return
}