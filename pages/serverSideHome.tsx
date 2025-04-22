export async function getServerSideProps() {
  return {
    props: {
      time: new Date().toISOString(),
    },
  };
}

export default function ServerPage({ time }: { time: string }) {
  return <h1>Server-side data: {time}</h1>;
}
