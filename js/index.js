
const transactions = JSON.parse(localStorage.getItem("transactions")) || []; //Traigo los datos que estan guardados en el localstorage, sino hay tal archivo que me devuelva en array vacio.

function calculateTotals() { //generamos una funcion que calcule los gastos o ingresos a partir de las transacciones.
    let totalIncome = 0;
    let totalExpenses = 0; // inicializamos variables con valores en 0

    transactions.forEach(transaction => {
        if (transaction.amount > 0) {
            totalIncome += transaction.amount;
        } else {
            totalExpenses += transaction.amount;
        };
    });

    document.getElementById("total-income").innerText = `$${totalIncome.toLocaleString('AR', { style: 'currency', currency: 'ars' })}`; // actualizamos los valores en el html y utilizamos la funcion 'toLocaleString' para darle el fromato correspondiente a los numeros.
    document.getElementById("total-expenses").innerText = `$${Math.abs(totalExpenses).toLocaleString('AR', {style: 'currency', currency: 'ars'})}`; // utilizamos MATH ya que nos ayuda a implementar funciones maematicas y utilizo el .abs para que me entregue el valor positivo de los gatos que tengo con el fin de mejorar la experiencia de usuario.
    document.getElementById("total-savings").innerText = `$${(totalIncome + totalExpenses).toLocaleString('AR', {style: 'currency', currency: 'ars'})}`; //aca hago la suma entre los valores ya que los gastos son numeros negativos, si fuesen positivos los dos deberia restarlos.
    return { totalIncome, totalExpenses };
};

const totals = calculateTotals();
const totalIncome = totals.totalIncome;
const totalExpenses = totals.totalExpenses;
