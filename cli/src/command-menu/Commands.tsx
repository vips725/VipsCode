import type { Command } from "./types";

export const Commands : Command[]=[
    {
        name:"new",
        description:"Start a new conversation",
        value:"/new",
    },
    {
        name:"exit",
        description:"Quit the application",
        value:"/exit",
        action:(ctx)=>{
            ctx.exit();
        }
    }
]