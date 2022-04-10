import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Seo from "../components/Seo";
export default function Home({ results: movies }) {
  const router = useRouter();

  const onClick = ({ id, original_title, poster_path }) => {
    router.push(
      {
        pathname: `/movies/${id}`,
        query: {
          // 보낼 데이터
          id,
          original_title,
          poster_path,
        },
      },
      `/movies/${id}`
    );
  };
  return (
    <div className="container">
      <Seo title="Home" />
      {movies?.map((movie) => {
        const { id, original_title, poster_path } = movie || {};
        return (
          <div
            onClick={() =>
              onClick({
                id,
                original_title,
                poster_path,
              })
            }
            className="movie"
            key={id}
          >
            <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} />
            <h4>
              <Link
                href={{
                  pathname: `/movies/${id}`,
                  query: {
                    // 보낼 데이터
                    id,
                    original_title,
                    poster_path,
                  },
                }}
                as={`/movies/${id}`}
              >
                <a>{original_title}</a>
              </Link>
            </h4>
          </div>
        );
      })}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie {
          cursor: pointer;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps() {
  const { results } = await (
    await fetch(`http://localhost:3000/api/movies/popular`)
  ).json();
  return {
    props: {
      results,
    },
  };
}
