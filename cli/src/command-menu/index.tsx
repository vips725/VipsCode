import type { RefObject } from "react"
import { type ScrollBoxRenderable, TextAttributes } from "@opentui/core"
import { getFilteredCommands } from "./filter-commands"
import { Commands } from "./Commands"

const MAX_VISIBLE_ITEMS = 8;

const COMMAND_COL_WIDTH = Math.max(...Commands.map((cmd) => cmd.name.length)) + 4;

type CommandMenuProps = {
    query: string;
    selectedIndex: number;
    scrollRef: RefObject<ScrollBoxRenderable | null>;
    onSelect: (index: number) => void;
    onExecute: (index: number) => void;
};
export function CommandMenu({
    query,
    selectedIndex,
    scrollRef,
    onSelect,
    onExecute,
}: CommandMenuProps) {
    const filtered = getFilteredCommands(query);
    const visibleHeight = Math.min(filtered.length, MAX_VISIBLE_ITEMS);

    if (filtered.length === 0) {
        return (
            <box paddingX={1}>
                <text attributes={TextAttributes.DIM} fg="gray">No commands found</text>
            </box>
        );
    }
    return (
        <scrollbox ref={scrollRef} height={visibleHeight}>
            {filtered.map((cmd, index) => {
                const isSelected = index === selectedIndex;
                return (
                    <box
                        key={cmd.name}
                        paddingX={1}
                        backgroundColor={isSelected ? "cyan" : undefined}
                        onMouseMove={() => onSelect(index)}
                        onMouseDown={() => onExecute(index)}
                    >
                        <box width={COMMAND_COL_WIDTH} flexShrink={0}>
                            <text
                                attributes={isSelected ? undefined : TextAttributes.DIM}
                                fg={isSelected ? "black" : "gray"}
                            >
                                {cmd.name}
                            </text>
                        </box>
                    </box>
                );
            })}
        </scrollbox>
    );
}