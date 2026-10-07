import type { Command } from "./types";
import {Commands} from "./Commands"

export function getFilteredCommands(query:string):Command[]{
    if(query.length===0)return Commands;
    return Commands.filter((cmd)=>cmd.name.toLowerCase().startsWith(query.toLowerCase()));
}