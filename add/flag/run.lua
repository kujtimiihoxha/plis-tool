local p = require("plis")
local fs = require("fileSystem")
local json = require("json")
-- The main function called by plis.
function main()
   config, err = fs.readFile("config.json")
    if err ~= nil then
        return "The current folder is not a plis tool so you can not add a flag"
    end 
    config = json.decode(config)
    flag = {}
    flag.name = p.args.name
    if p.flags.short ~= "" then
        flag.short =  p.flags.short
    end
    flag.type = p.flags.type
    flag.description = "The '"..flag.name.. "' flag description'"
    if config.flags == nil then
        config.flags = {}
    end
    for i,f in ipairs(config.flags) do
        if f.name == flag.name then
            return "There is already a flag with the same name"
        end
    end
    inx = table.getn(config.flags) + 1
    config.flags[inx] = flag
    fs.writeFile("config.json",json.encodeF(config))
end