import { useCallback, useState } from "react";
import Account from "../Account/Account.components";
import Phone from "../Phone/Phone.component";
import Message from "../Message/Message.components";
import { sendMessage } from "../../api/api";

const Chat = ({ dataInstance }) => {
  const [accounts, setAccounts] = useState([]);

  const addMessage = useCallback(
    (e) => {
      const data = {
        chatId: `${accounts.find(({ isActive }) => isActive).phone}@c.us`,
        message: e.target.value,
      };
      const result = sendMessage(dataInstance, data);
      console.log(result);
    },
    [accounts, dataInstance]
  );

  return (
    <div className="chat">
      <div className="chat_left">
        <Phone setAccounts={setAccounts} />
        {accounts.map(({ id, phone, isActive }) => (
          <Account key={id} phone={phone} isActive={isActive} />
        ))}
      </div>
      <div className="chat_right">
        {accounts.find(({ isActive }) => isActive) && (
          <Message addMessage={addMessage} />
        )}
      </div>
    </div>
  );
};

export default Chat;
