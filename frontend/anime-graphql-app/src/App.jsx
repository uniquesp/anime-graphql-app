import { useState } from 'react'
import PaginationSwitcher from './components/PaginationSwitcher';
import AddAnime from './components/AnimeModal/AddAnime'
import LoadAll from './components/Pagination/LoadAll';
import OffsetPagination from './components/Pagination/OffsetPagination'
import CursorPagination from './components/Pagination/CursorPagination'
import RelayPagination from './components/Pagination/RelayPagination'
import RelayInfiniteScroll from './components/Pagination/RelayInfiniteScroll'


function App() {
  const [showModal, setShowModal] = useState(false)
 const [view, setView] = useState('loadAll');

  let ViewComponent;
  switch (view) {
    case 'offset':
      ViewComponent = OffsetPagination;
      break;
    case 'cursor':
      ViewComponent = CursorPagination;
      break;
    case 'relay':
      ViewComponent = RelayPagination;
      break;
    case 'infinite':
      ViewComponent = RelayInfiniteScroll;
      break;
    default:
      ViewComponent = LoadAll;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Anime List</h1>
      <button
        style={{ marginBottom: '15px', padding: '8px 16px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        onClick={() => setShowModal(true)}
      >
        + Add Anime
      </button>

      <PaginationSwitcher setView={setView} />
      <ViewComponent />
      {showModal && <AddAnime closeModal={() => setShowModal(false)} />}
    </div>
  );
}

export default App
