import type { NextPage } from "next";
import { Input } from "antd";
import styles from "../styles/UserSearch.module.css";
import Axios from "axios";
import { useState } from "react";
import { Card, Spin, Button, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Search } = Input;

function isNumeric(value: string): boolean {
  return /^\d+$/.test(value);
}

interface AccountData {
  attributes: Attributes;
}

interface Attributes {
  id: number;
  user_id: number;
  name: string;
  balance: number;
}

const AccountSearch: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [accountData, setAccountData] = useState<AccountData | null>(null);

  const accountSearch = async (value: string) => {
    // Validate the value is a number
    if (value && isNumeric(value)) {
      setLoading(true);
      setAccountData(null);
      try {
        const { data } = await Axios.get(
          `https://sample-accounts-api.herokuapp.com/accounts/${value}`
        );
        setAccountData(data);
      } catch (e) {
        message.error("Account with the specified id does not exist");
      } finally {
        setLoading(false);
      }
    } else {
      message.error("Please provide number as input");
    }
  };
  return (
    <div>
      <Search
        placeholder="Enter AccountID"
        onSearch={accountSearch}
        enterButton
        loading={loading}
      />
      <p></p>
      {loading && <Spin size="large" />}
      {accountData && (
        <>
          <Card>
            <p>ID: {accountData.attributes.id}</p>
            <p>Name: {accountData.attributes.name}</p>
            <p>Balance: {accountData.attributes.balance}</p>
            <p>UserID: {accountData.attributes.user_id}</p>
          </Card>
          <p></p>
          <Link
            href={`/users/${accountData.attributes.user_id}?refer=accounts`}
            passHref
          >
            <Button
              type="primary"
              icon={<UserOutlined />}
              size={"large"}
              onClick={() => {
                setLoading(true);
                setAccountData(null);
              }}
            >
              Click to go to User Account Page
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default AccountSearch;
