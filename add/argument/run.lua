local p = require("plis")
local fs = require("fileSystem")
local json = require("json")
-- The main function called by plis.
function main()
   config, err = fs.readFile("config.json")
    if err ~= nil then
        return "The current folder is not a plis generator so you can not add a flag"
    end 
    config = json.decode(config)
    arg = {}
    arg.name = p.args.name
    arg.type = p.flags.type
    arg.required = p.flags.required
    arg.description = "The '"..arg.name.. "' arg description'"
    if config.args == nil then
        config.args = {}
    end
    for i,a in ipairs(config.args) do
        if a.name == arg.name then
            return "There is already an argument with the same name"
        end
    end
    inx = table.getn(config.args) + 1
    config.args[inx] = arg
    fs.writeFile("config.json",json.encodeF(config))
end