var p = require("plis")
var fs = require("fileSystem")
var json = require("json")
var tp = require("templates")

function main() {
    var flags = p.flags
    var args = p.args
    var m = {
        name: args.name,
        type: flags.type,
        aliases: []
    }
    if (flags.aliases != "") {
        m.aliases = flags.aliases.split(",")
    }
    if (flags.subcommand) {
        var config = fs.readFile("config.json")
        if (!config) {
            return "The current folder is not a plis tool so you can not add a subcommand"
        }
        config = json.decode(config)
        if (!config.sub_commands) {
            config.sub_commands = []
        }
        m.type = config.script_type
        var exists = false
        config.sub_commands.forEach(function (c) {
            if (c == m.name) {
                exists = true
            }
        })
        if (exists) {
            return "A command with this name already exists"
        }
        config.sub_commands[config.sub_commands.length] = m.name
        fs.writeFile("config.json",json.encodeF(config))
        var err = tp.copyTemplateFolder("", m.name, m, ["test-project*", ".*", "run.*","README.md.tpl"])
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
        var err = tp.copyTemplateFolder("", "plis-" + m.name, m, ["run.*"])
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