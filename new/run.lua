local p = require("plis")


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
        config, err = p.readFile("config.json")
        if err ~= nil then
            return "The current folder is not a plis generator so you can not add a subcommand"
        end 
        config = p.jsonDecode(config)
        if config.sub_commands == nil then
            config.sub_commands = {}
        end
        inx = table.getn(config.sub_commands) + 1
        config.sub_commands[inx] = m.name
        p.toJsonFile("config.json",config)
        err = p.copyTemplateFolder("",m.name,m,{"test-project*",".*"})
    else
        err = p.copyTemplateFolder("","plis-"..m.name,m)
        if err ~= nil then 
        return err
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
