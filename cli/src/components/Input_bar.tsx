import Status_bar from "./Status_bar";

type Props = {
    onSubmit: (input: string) => void;
    disabled?: boolean;
}

const Input_bar = ({onSubmit, disabled = false}: Props) => {
  return (
    <box width="100%"  alignItems="center" >
      <box>
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
            focused={!disabled}
            placeholder={`Ask Anything... "Fix a big in the database"`}
            />
            <Status_bar/>
        </box>
      </box>
    </box>
  )
}

export default Input_bar
