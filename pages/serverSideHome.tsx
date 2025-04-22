import UsersList from "@/components/usersPage";
import { Users } from "@/types/Users";
import { get } from "@/utils/apiClient";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

interface IProps {
  data: Users;
}

export const getServerSideProps: GetServerSideProps<IProps> = async ({
  locale,
}) => {
  try {
    const data = await get<Users>(`fan/creator/names`, locale || "pl");

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default function ServerPage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <UsersList data={data} />;
}
