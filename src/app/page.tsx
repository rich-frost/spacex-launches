import { LaunchList } from './components/LaunchList';
import Search from './components/Search';

export default async function Home() {
  return (
    <>
      <header>
        <h1>SpaceX Launches</h1>
      </header>
      <main>
        <Search />
        <LaunchList />
      </main>
      <footer>Footer</footer>
    </>
  );
}
