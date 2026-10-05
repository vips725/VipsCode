import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import Header from "./components/Header";
import Input_bar from "./components/Input_bar";

function App() {
  return (
    <box alignItems="center" justifyContent="center" 
    backgroundColor="#0D0D12" width="100%" height="100%">
      <Header/>
     <box width="100%" maxWidth={78} paddingX={2} paddingY={2} gap={1}>
      <Input_bar onSubmit={()=>{}}/>
     </box>
      </box>
  );
}

const renderer = await createCliRenderer();
createRoot(renderer).render(<App />);
