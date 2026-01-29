function Filter({ setCategory }) {
  return (
    <div className="filter">
      <button onClick={() => setCategory("all")}>All</button>
      <button onClick={() => setCategory("electronics")}>Electronics</button>
      <button onClick={() => setCategory("fashion")}>Fashion</button>
    </div>
  );
}

export default Filter;
