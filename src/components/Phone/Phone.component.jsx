import { Button, Input, Space } from "antd";
import { useCallback, useState } from "react";
import { nanoid } from "nanoid";

const Phone = ({ setAccounts }) => {
  const [phone, setPhone] = useState("");

  const addPhone = useCallback(() => {
    setAccounts((prev) => [
      ...prev.map((item) => ({ ...item, isActive: false })),
      { id: nanoid(8), phone, isActive: true },
    ]);
    setPhone("");
  }, [phone, setAccounts]);

  return (
    <Space.Compact
      style={{
        width: "100%",
        padding: "15px 5px",
      }}
    >
      <Input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Enter the number in 70123456789 format"
        onPressEnter={addPhone}
      />
      <Button type="primary" onClick={addPhone}>
        Add
      </Button>
    </Space.Compact>
  );
};

export default Phone;
