import Login from "./components/Pages/Login";
import PageBuilder from "./components/PageBuilder";

export default function Home() {
  return (
    <PageBuilder showAuroraBackground={true}>
      <Login />
    </PageBuilder>
  );
}
