import { Input } from "antd";

const { TextArea } = Input;

const AddMessage = ({ sendMessage, value, setValue }) => (
  <TextArea
    className="chat_new-message"
    rows={4}
    placeholder="Enter the message"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    onPressEnter={sendMessage}
  />
);

export default AddMessage;
