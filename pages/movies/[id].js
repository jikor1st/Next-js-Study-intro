import { useRouter } from "next/router";
export default function Detail() {
  const router = useRouter();
  const { query } = router || {};
  return (
    <div>
      <h4>{query.original_title || "Loading..."}</h4>
    </div>
  );
}
