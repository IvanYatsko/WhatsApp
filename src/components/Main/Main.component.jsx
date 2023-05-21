import { useState } from "react";
import Authorization from "../Authorization/Authorization.component";
import Chat from "../Chat/Chat.component";

const Main = () => {
  const [dataInstance, setDataInstance] = useState();

  return (
    <div className="main">
      {!dataInstance ? (
        <Chat dataInstance={dataInstance} />
      ) : (
        <Authorization
          setDataInstance={setDataInstance}
        />
      )}
    </div>
  );
};

export default Main;
