import Status_bar from "./Status_bar";
import type { KeyBinding } from "@opentui/core";

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

  const handleSubmit = (value: string) => {
    if (!value.trim()) return;

    onSubmit(value);
  };

  return (
    <box width="100%" alignItems="center">

      <box
        border={["left"]}
        borderColor="cyan"
        width="100%"
      >

        <box
          position="relative"
          justifyContent="center"
          paddingX={2}
          paddingY={1}
          backgroundColor="#1A1A24"
          width="100%"
          gap={1}
        >

          <textarea
            width="100%"
            focused={!disabled}
            keyBindings={TEXTAREA_KEY_BINDINGS}
            placeholder='Ask Anything... "Fix a bug in the database"'
          />

          <Status_bar />

        </box>

      </box>

    </box>
  );
};

export default Input_bar;