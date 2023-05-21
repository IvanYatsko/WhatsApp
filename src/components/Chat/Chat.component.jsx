import { useCallback, useEffect, useMemo, useState } from "react";
import Account from "../Account/Account.components";
import Phone from "../Phone/Phone.component";
import {
  deleteNotification,
  receiveNotification,
  sendMessage,
} from "../../api/api";
import NewMessage from "../NewMessage/NewMessage.components";
import Message from "../Message/Message.components";
import { nanoid } from "nanoid";

const Chat = ({ dataInstance }) => {
  const [accounts, setAccounts] = useState([]);
  const [messages, setMessages] = useState({});
  const [value, setValue] = useState("");

  useEffect(() => {
    const interval = setInterval(async () => {
      const result = await receiveNotification(dataInstance);
      if (result) {
        const message = result.body.messageData.textMessageData.textMessage;
        const phoneNumber = result.body.senderData.chatId.split("@")[0];
        setMessages((prev) => ({
          ...prev,
          [phoneNumber]: [
            ...(prev?.[phoneNumber] || []),
            { message, isMine: false },
          ],
        }));
        if (!accounts.find((item) => item.phone === phoneNumber)) {
          setAccounts((prev) => [
            ...prev.map((item) => ({ ...item, isActive: false })),
            { id: nanoid(8), phone: phoneNumber, isActive: true },
          ]);
        } else {
          setAccounts((prev) => [
            ...prev.map((item) => ({
              ...item,
              isActive: item.phone === phoneNumber,
            })),
          ]);
        }
        await deleteNotification(dataInstance, result.receiptId);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [accounts, dataInstance]);

  const phone = useMemo(
    () => accounts.find(({ isActive }) => isActive)?.phone,
    [accounts]
  );

  const addMessage = useCallback(
    async (e) => {
      const data = {
        chatId: `${phone}@c.us`,
        message: e.target.value,
      };
      setMessages((prev) => ({
        ...prev,
        [phone]: [
          ...(prev?.[phone] || []),
          { message: e.target.value, isMine: true },
        ],
      }));
      const result = await sendMessage(dataInstance, data);
      result?.idMessage && setValue("");
    },
    [dataInstance, phone]
  );

  return (
    <div className="chat">
      <div className="chat_left">
        <Phone setAccounts={setAccounts} />
        {accounts.map(({ id, phone: phoneNumber, isActive }) => (
          <Account
            key={id}
            phone={phoneNumber}
            isActive={isActive}
            setAccounts={setAccounts}
          />
        ))}
      </div>
      <div className="chat_right">
        <div className="chat_right__block">
          {phone &&
            messages[phone]?.map(({ message, isMine }) => (
              <Message key={message} message={message} isMine={isMine} />
            ))}
        </div>
        {phone && (
          <NewMessage
            sendMessage={addMessage}
            value={value}
            setValue={setValue}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;
