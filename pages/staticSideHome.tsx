export async function getStaticProps() {
  return {
    props: {
      buildTime: new Date().toISOString(),
    },
  };
}

export default function StaticPage({ buildTime }: { buildTime: string }) {
  return <h1>Static data: {buildTime}</h1>;
}
