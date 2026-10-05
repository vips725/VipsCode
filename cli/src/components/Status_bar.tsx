import { TextAttributes } from "@opentui/core"

const Status_bar = () => {
  return (
    <box flexDirection="row" gap={1}>
      <text fg="cyan">Build</text>
      <text attributes={TextAttributes.DIM} fg="gray">
        &#8250;
      </text>
    </box>
  )
}

export default Status_bar
