function Addedtocart({ product }) {
  const storedItem = JSON.parse(localStorage.getItem("item")) || [];

  const doesNoteExist = storedItem.some((note) => note.id === product.id);

  const added = "Remove";
  const add = "Add to Cart";

  return (
    <>
      <button
        style={
          doesNoteExist
            ? {
                backgroundColor: "#232F3E",
                color: "#fff",
              }
            : null
        }
        className="btn btn3"
      >
        {doesNoteExist ? added : add}
      </button>
    </>
  );
}

export default Addedtocart;
