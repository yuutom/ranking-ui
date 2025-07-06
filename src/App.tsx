import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PlayerList from './pages/PlayerList';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'preline'
import Layout from './componets/Layout';
import KishiDetail from './pages/KishiDetail';
import Ranking from './pages/Ranking';
import Books from './pages/Books';

async function loadPreline() {
  return import('preline/dist/index.js');
}

export default function Example() {
  const location = useLocation();

  useEffect(() => {
    const initPreline = async () => {
      await loadPreline();

      if (
        window.HSStaticMethods &&
        typeof window.HSStaticMethods.autoInit === 'function'
      ) {
        window.HSStaticMethods.autoInit();
      }
    };

    initPreline();
  }, [location.pathname]);

  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="players/kishi" element={<PlayerList />} />
          <Route path="players/kishi/:kishiNumber" element={<KishiDetail />} />
          <Route path="ranking" element={<Ranking />} />
          <Route path="players/joryu" element={<PlayerList />} />
          <Route path="players/joryu/:kishiNumber" element={<KishiDetail />} />
          <Route path="books" element={<Books />} />
        </Route>
      </Routes>
  )
}
