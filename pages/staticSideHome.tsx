import UsersList from "@/components/usersPage";
import { get } from "@/utils/apiClient";
import { GetStaticProps, InferGetStaticPropsType } from "next";

type Users = string[];

interface IProps {
  data: Users;
}

export const getStaticProps: GetStaticProps<IProps> = async ({ locale }) => {
  try {
    const data = await get<Users>(`fan/creator/names`, locale || "pl");

    return {
      props: {
        data,
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default function ServerPage({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <UsersList data={data} />;
}
