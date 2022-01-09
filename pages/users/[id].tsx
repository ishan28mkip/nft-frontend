import type { NextPage, GetServerSidePropsContext } from "next";
import Axios from "axios";
import { Table, Button } from "antd";
import Link from "next/link";

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
  // Convert to table data format
  const tableData = userData.map((userDataItem) => {
    return { ...userDataItem.attributes, key: userDataItem.attributes.id };
  });
  return (
    <div>
      <Table dataSource={tableData} columns={columns} />
      {refer && (
        <Link href={`/search/${refer}`} passHref>
          <Button type="primary" size={"large"}>
            Go Back
          </Button>
        </Link>
      )}
    </div>
  );
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
      // show error dialog box for API error
    } finally {
      // setLoading(false);
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
