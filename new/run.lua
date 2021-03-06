local p = require("plis")
local fs = require("fileSystem")
local json = require("json")
local tp = require("templates")

function main()
    flags = p.flags
    args = p.args
    m ={}
    m.name = args.name
    m.type = flags.type
    m.aliases = {}
    if flags.aliases ~= "" then
        m.aliases = split(flags.aliases,",")
    end
    if flags.subcommand then 
        config, err =fs.readFile("config.json")
        if err ~= nil then
            return "The current folder is not a plis tool so you can not add a subcommand"
        end 
        config = json.decode(config)
        m.type = config.script_type
        if config.sub_commands == nil then
            config.sub_commands = {}
        end
        for i,c in ipairs(config.sub_commands) do
            if c == m.name then
                return "There is already a command with the same name"
            end
         end
        inx = table.getn(config.sub_commands) + 1
        config.sub_commands[inx] = m.name
        fs.writeFile("config.json",json.encodeF(config),true)
        err =tp.copyTemplateFolder("",m.name,m,{"test-project*",".*","run.*","README.md.tpl"})
        if err ~= nil then 
            return err
        end
        if m.type == "lua" then
            err = tp.copyTemplate("run.lua.tpl","run.lua",m)
            if err ~= nil then 
                return err
            end
        elseif m.type == "js" then
            err = tp.copyTemplate("run.js.tpl","run.js",m)
            if err ~= nil then 
                return err
            end
        end
    else
        err = tp.copyTemplateFolder("","plis-"..m.name,m,{"run.*"})
        if err ~= nil then 
            return err
        end
        if m.type == "lua" then
            err = tp.copyTemplate("run.lua.tpl","run.lua",m)
            if err ~= nil then 
                return err
            end
        elseif m.type == "js" then
            err = tp.copyTemplate("run.js.tpl","run.js",m)
            if err ~= nil then 
                return err
            end
        end
    end
    return nil
end 

function split(s, delimiter)
    result = {};
    for match in (s..delimiter):gmatch("(.-)"..delimiter) do
        table.insert(result, match);
    end
    return result;
end