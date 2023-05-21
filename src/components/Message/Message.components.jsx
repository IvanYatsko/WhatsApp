const Message = ({ message, isMine }) => (
  <div className={`chat_message ${isMine ? "chat_message__mine" : ""}`}>
    {message}
  </div>
);

export default Message;
