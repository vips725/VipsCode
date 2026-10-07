import { useRef, useState } from "react";
import { useKeyboard, useRenderer } from "@opentui/react";
import type { KeyBinding, ScrollBoxRenderable, TextareaRenderable } from "@opentui/core";
import { CommandMenu } from "../command-menu";
import { getFilteredCommands } from "../command-menu/filter-commands"; // adjust path
import Status_bar from "./Status_bar";

type Props = {
  onSubmit: (input: string) => void;
  disabled?: boolean;
};

export const TEXTAREA_KEY_BINDINGS: KeyBinding[] = [
  { name: "return", action: "submit" },
  { name: "enter", action: "submit" },
  { name: "j", ctrl: true, action: "newline" },
  { name: "return", meta: true, action: "newline" },
  { name: "return", shift: true, action: "newline" },
  { name: "enter", shift: true, action: "newline" },
];

const Input_bar = ({ onSubmit, disabled = false }: Props) => {
  const renderer = useRenderer();
  const textareaRef = useRef<TextareaRenderable>(null);
  const scrollRef = useRef<ScrollBoxRenderable>(null);

  const [text, setText] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  // menu shows only while typing a single-line "/something"
  const showMenu = text.startsWith("/") && !text.includes(" ") && !text.includes("\n");
  const query = showMenu ? text.slice(1) : "";
  const filtered = showMenu ? getFilteredCommands(query) : [];
  const menuOpen = showMenu && filtered.length > 0;

  const clearInput = () => {
    textareaRef.current?.setText("");
    setText("");
    setSelectedIndex(0);
  };

  const executeCommand = (index: number) => {
    const cmd = filtered[index];
    if (!cmd) return;
    clearInput();
    if (cmd.action) {
      cmd.action({ exit: () => renderer.destroy() }); // match your ctx type in types.ts
    } else {
      onSubmit(cmd.value); // e.g. "/new" handled by the parent
    }
  };

  const handleSubmit = () => {
    if (disabled) return;
    if (menuOpen) {
      executeCommand(selectedIndex);
      return;
    }
    const value = textareaRef.current?.plainText ?? "";
    if (!value.trim()) return;
    onSubmit(value);
    clearInput();
  };

  const handleContentChange = () => {
    setText(textareaRef.current?.plainText ?? "");
    setSelectedIndex(0);
  };

  useKeyboard((key) => {
    if (!menuOpen || disabled) return;
    if (key.name === "down") {
      setSelectedIndex((i) => (i + 1) % filtered.length);
    } else if (key.name === "up") {
      setSelectedIndex((i) => (i - 1 + filtered.length) % filtered.length);
    } else if (key.name === "escape") {
      clearInput();
    }
  });

  return (
    <box width="100%" alignItems="center">
      {showMenu && (
        <box width="100%" paddingX={2} backgroundColor="#101018">
          <CommandMenu
            query={query}
            selectedIndex={selectedIndex}
            scrollRef={scrollRef}
            onSelect={setSelectedIndex}
            onExecute={executeCommand}
          />
        </box>
      )}

      <box border={["left"]} borderColor="cyan" width="100%">
        <box
          justifyContent="center"
          paddingX={2}
          paddingY={1}
          backgroundColor="#1A1A24"
          width="100%"
          gap={1}
        >
          <textarea
            ref={textareaRef}
            width="100%"
            focused={!disabled}
            keyBindings={TEXTAREA_KEY_BINDINGS}
            placeholder='Ask Anything... "Fix a bug in the database"'
            onContentChange={handleContentChange}
            onSubmit={handleSubmit}
          />
          <Status_bar />
        </box>
      </box>
    </box>
  );
};

export default Input_bar;