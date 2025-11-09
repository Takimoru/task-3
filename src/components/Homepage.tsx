import { CardDemo } from "./Card";

interface HomePageProps {
  title: string;
  body: string;
}

export default function HomePage({ title, body }: HomePageProps) {
  return (
    <>
      <CardDemo title={title} body={body} />
    </>
  );
}
