const params = new URLSearchParams(window.location.search);
  const producto = params.get("producto");
  document.getElementById("producto-nombre").textContent = producto || "Producto no especificado";
