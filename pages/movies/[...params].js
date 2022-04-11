import { useRouter } from "next/router";
export default function Detail({ params }) {
  const router = useRouter();
  const [movieTitle, movieId] = params;
  return (
    <div>
      <h4>{movieTitle}</h4>
    </div>
  );
}

export async function getServerSideProps({ params: { params } }) {
  return {
    props: {
      params,
    },
  };
}
