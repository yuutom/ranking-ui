import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PlayerList from './pages/PlayerList';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'preline'
import Layout from './componets/Layout';
import KishiDetail from './pages/KishiDetail';
import KishiRanking from './pages/KishiRanking';
import Books from './pages/Books';
import JoryuList from './pages/JoryuList';
import JoryuRanking from './pages/JoryuRanking';
import JoryuDetail from './pages/JoryuDetail';

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
          <Route path="players/joryu" element={<JoryuList />} />
          <Route path="players/kishi/:kishiNumber" element={<KishiDetail />} />
          <Route path="players/joryu/:kishiNumber" element={<JoryuDetail />} />
          <Route path="ranking/kishi" element={<KishiRanking />} />
          <Route path="ranking/joryu" element={<JoryuRanking />} />
          <Route path="books" element={<Books />} />
        </Route>
      </Routes>
  )
}
