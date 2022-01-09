import type { NextPage } from "next";
import { Input } from "antd";
import styles from "../styles/UserSearch.module.css";
import Axios from "axios";
import { useState } from "react";
import { Card, Spin, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Search } = Input;

function isNumeric(value: string): boolean {
  return /^\d+$/.test(value);
}

interface UserData {
  attributes: Attributes;
}

interface Attributes {
  id: number;
  name: string;
  account_ids: [number];
}

const UserSearch: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  const userSearch = async (value: string) => {
    // Validate the value is a number
    if (value && isNumeric(value)) {
      setLoading(true);
      setUserData(null);
      try {
        const { data } = await Axios.get(
          `https://sample-accounts-api.herokuapp.com/users/${value}`
        );
        setUserData(data);
      } catch (e) {
        // show error dialog box for API error
      } finally {
        setLoading(false);
      }
    } else {
      // show error dialog box for wrong input
    }
  };
  return (
    <div>
      <Search
        placeholder="Enter UserID"
        onSearch={userSearch}
        enterButton
        loading={loading}
      />
      {loading && <Spin size="large" />}
      {userData && (
        <>
          <Card>
            <p>ID: {userData.attributes.id}</p>
            <p>Name: {userData.attributes.name}</p>
          </Card>
          <Link href={`/users/${userData.attributes.id}?refer=users`} passHref>
            <Button type="primary" icon={<UserOutlined />} size={"large"}>
              Click to go to User Account Page
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default UserSearch;
