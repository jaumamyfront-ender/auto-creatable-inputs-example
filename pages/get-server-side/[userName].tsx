import { CreatorDetailsWithVideosDTO } from "@/api-models/creatorDetailsWithVideosDTO";
import UserPage from "@/components/userPage";
import { get } from "@/utils/apiClient";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";

interface IProps {
  data: CreatorDetailsWithVideosDTO;
}

export const getServerSideProps: GetServerSideProps<IProps> = async ({
  params,
  locale,
}) => {
  const userName = params?.userName;

  try {
    const data = await get<CreatorDetailsWithVideosDTO>(
      `fan/creatorByName/${userName as string}/details`,
      locale || "pl"
    );

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
  return <UserPage data={data} />;
}
