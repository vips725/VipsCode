const Header = () => {
  return (
    <box justifyContent="center" alignItems="center">
        <box flexDirection="row" alignItems="center" gap={0.5} alignSelf="center">
            <ascii-font font="tiny" text="VIPS" color="gray"/>
            <ascii-font font="tiny" text="CODE" />
        </box>
    </box>
  )
}

export default Header
