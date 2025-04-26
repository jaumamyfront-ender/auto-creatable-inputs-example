import { CreatorDetailsWithVideosDTO } from "@/api-models/creatorDetailsWithVideosDTO";
import UserPage from "@/components/userPage";
import { get } from "@/utils/apiClient";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

interface IProps {
  data: CreatorDetailsWithVideosDTO;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<IProps> = async ({
  params,
  locale,
}) => {
  const userName = params?.userName;

  if (!userName || typeof userName !== "string") {
    return { notFound: true };
  }

  try {
    const data = await get<CreatorDetailsWithVideosDTO>(
      `fan/creatorByName/${userName}/details`,
      locale || "pl"
    );

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

export default function StaticPage({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <UserPage data={data} />;
}
