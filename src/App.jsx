import { useState, useEffect } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-lg mx-auto mb-6">
      <input
        type="text"
        placeholder="Search by title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow p-2 rounded-xl border shadow"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
};

const BookCard = ({ book }) => {
  const coverId = book.cover_i;
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "https://via.placeholder.com/150x200?text=No+Cover";

  return (
    <div className="p-4 border rounded-xl shadow hover:shadow-lg transition bg-white flex flex-col">
      <img src={coverUrl} alt={book.title} className="w-full h-48 object-cover rounded mb-3" />
      <h3 className="font-bold text-lg mb-1">{book.title}</h3>
      <p className="text-sm text-gray-600">{book.author_name?.join(", ")}</p>
      <p className="text-xs text-gray-500">First Published: {book.first_publish_year || "N/A"}</p>
     
    </div>
  );
};

export default function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const fetchBooks = async (title) => {
    setLoading(true);
    try {
      const res = await fetch(`https://openlibrary.org/search.json?title=${title}`);
      const data = await res.json();
      setBooks(data.docs.slice(0, 20));
    } catch (err) {
      console.error("Error fetching books:", err);
    }
    setLoading(false);
  };

  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">📚 Book Finder</h1>
      <SearchBar onSearch={fetchBooks} />

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book, i) => (
            <BookCard key={i} book={book}  />
          ))}
        </div>
      )}

     
    </div>
  );
}
