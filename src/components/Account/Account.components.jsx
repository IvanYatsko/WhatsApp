import { Button } from "antd";
import { useCallback } from "react";

const Account = ({ phone, isActive, setAccounts }) => {
  const changeActiveAccounts = useCallback(() => {
    setAccounts((prev) => [
      ...prev.map((item) => ({
        ...item,
        isActive: item.phone === phone,
      })),
    ]);
  }, [phone, setAccounts]);

  return (
    <Button
      className={`chat_account ${isActive ? "chat_account__active" : ""}`}
      type="text"
      onClick={changeActiveAccounts}
    >
      {phone}
    </Button>
  );
};

export default Account;
