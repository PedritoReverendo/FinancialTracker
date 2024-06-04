const transactionForm = document.getElementById("transaction-form");
const transactionsList = document.getElementById("transactions-list");
const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

transactionForm.addEventListener("submit", async function () {

  // traemos los valores de los inputs
  const description = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);

  // usamos asincronismo para el cargado de la imagen
  const image = await uploadImage();

  if (description && !isNaN(amount) && image) {
    transactions.push({ description, amount, image });
    saveTransactions();
    renderTransactions();
    transactionForm.reset(); // luego de enviar el formulario hacemos que se resetee
  } else {
    alert("Completa todos los campos y sube una imagen antes de enviar el formulario. Gracias");
  }
});

async function uploadImage() {
  const fileUploadInput = document.querySelector('.file-uploader');

  if (!fileUploadInput.value) return null;

  const image = fileUploadInput.files[0];

  if (!image.type.includes('image')) {
    alert('Subir unicamente Imagenes');
    return null; // indicamos que solo se pueda enviar imagenes
  }

  const reader = new FileReader();
  reader.readAsDataURL(image);

  // utilizo Await para que se cargue todo antes de leer la imagen y verifico.
  const dataURL = await new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

  return dataURL;
}

function renderTransactions() {
  transactionsList.innerHTML = "";
    // le mostramos al usuario las tansacciones:
  transactions.forEach((transaction, index) => {
    const transactionItem = document.createElement("div");
    transactionItem.classList.add("transactions_listt");

    transactionItem.innerHTML = `
    <div class= "just_list">
        <div class="transactions_list">
          <p><b>Descripcion: </b> ${transaction.description}</p>
        </div>
        <div class="transactions_list">
          <p class="text-lg"><b>Monto: </b> ${transaction.amount < 0 ? "-" : ""}$${Math.abs(transaction.amount)}</p>
        </div>
        <button class="button_delete" onclick="deleteTransaction(${index})"><b>ELIMINAR</b></button>
    </div>
      <div class="transactions_listtt">
        <img class="file-uploader reciptPicture" src="${transaction.image}" alt="Transaction Image">
      </div>
    `;

    transactionsList.appendChild(transactionItem);
  });
}
window.deleteTransaction = function (index) {
  transactions.splice(index, 1); // con esto hacemos que se borre el elemento del array que elijamos.
  saveTransactions();
  renderTransactions();
};

renderTransactions();