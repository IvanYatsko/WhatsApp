const Account = ({ phone, isActive }) => (
  <div className={`chat_account ${isActive ? 'chat_account__active' : ''}`}>
    {phone}
  </div>
);

export default Account;
