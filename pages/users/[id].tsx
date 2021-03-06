import type { NextPage, GetServerSidePropsContext } from "next";
import Axios from "axios";
import { Table, Button, Typography, message } from "antd";
import Link from "next/link";

const { Title } = Typography;

interface UserData {
  userData: [AccountData];
  refer: string;
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

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Balance",
    dataIndex: "balance",
    key: "balance",
  },
];

const Account: NextPage<UserData> = ({ userData, refer }) => {
  if (userData) {
    // Convert to table data format
    const tableData = userData.map((userDataItem) => {
      return { ...userDataItem.attributes, key: userDataItem.attributes.id };
    });
    return (
      <div>
        {refer && (
          <Link href={`/search/${refer}`} passHref>
            <Button type="primary" size={"large"}>
              Go Back
            </Button>
          </Link>
        )}
        <p></p>
        <Title level={3}>User Accounts</Title>
        <Table dataSource={tableData} columns={columns} />
      </div>
    );
  } else {
    return <div>Userdata could not be loaded</div>;
  }
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (context && context.params && context.params.id) {
    try {
      const { data } = await Axios.get(
        `https://sample-accounts-api.herokuapp.com/users/${context.params.id}/accounts`
      );
      return {
        props: {
          userData: data,
          refer: context.query.refer,
        },
      };
    } catch (e) {
      message.error("Account with the specified id does not exist");
    }
  }

  return {
    props: {
      userData: null,
      refer: "home",
    },
  };
}

export default Account;
