import { Input } from "antd";

const { TextArea } = Input;

const Message = ({ addMessage }) => (
  <TextArea
    className="chat_message"
    rows={4}
    placeholder="Enter the message"
    maxLength={6}
    onPressEnter={addMessage}
  />
);

export default Message;
