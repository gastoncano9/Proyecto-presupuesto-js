'use strict';

class PresupuestoIngreso
{
    static contadorIngresos = 0;

    constructor(descripcion, precio)
    {
        this.descripcion = descripcion;
        this.precio = precio;
        this.id = ++PresupuestoIngreso.contadorIngresos;
    }

    get getDescripcion()
    {
        return this.descripcion;
    }

    set setDescripcion(descripcion)
    {
        this.descripcion = descripcion;
    }

    get getPrecio()
    {
        return this.precio;
    }

    set setPrecio(precio)
    {
        this.precio = precio;
    }
}

class PresupuestoEgreso
{
    static contadorEgresos = 0;

    constructor(descripcion, precio)
    {
        this.descripcion = descripcion;
        this.precio = precio;
        this.id = ++PresupuestoEgreso.contadorEgresos;
    }

    get getDescripcion()
    {
        return this.descripcion;
    }

    set setDescripcion(descripcion)
    {
        this.descripcion = descripcion;
    }

    get getPrecio()
    {
        return this.precio;
    }

    set setPrecio(precio)
    {
        this.precio = precio;
    }
}

const presupuestoIngreso = [];
const presupuestoEgreso = [];


const formatoMoneda = (valor) =>
{
    return valor.toLocaleString("en-US",{style:"currency", currency:"USD",minimumFractionDigits:2});
}

const cargarIngresos = () =>
{
    let acumuladorIngresos;
    acumuladorIngresos = 0;

    for(let presupuesto of presupuestoIngreso)
    {
        acumuladorIngresos += presupuesto.precio;
    }

    return acumuladorIngresos;
}

const cargarEgresos = () =>
{
    let acumuladorEgresos;
    acumuladorEgresos = 0;

    for(let presupuesto of presupuestoEgreso)
    {
        acumuladorEgresos += presupuesto.precio;
    }

    return acumuladorEgresos;
}

const presupuestoTotal = () =>
{
    let presupuesto;

    presupuesto = cargarIngresos() - cargarEgresos();

    document.querySelector(".presupuesto-disponible").innerHTML = formatoMoneda(presupuesto);
}

const cargarListaIngresos = () =>
{

    let descripcionYprecioIngreso = "";

    for(let presupuesto of presupuestoIngreso)
    {
        descripcionYprecioIngreso += `<li><p>${presupuesto.descripcion}</p> <span>+${formatoMoneda(presupuesto.precio)}</span> <button onclick = "eliminarIngreso(${presupuesto.id})">x</button></li>`;
    }

    document.querySelector(".ingreso").innerHTML = descripcionYprecioIngreso;
}

const cargarListaEgresos = () =>
{
    let descripcionYprecioEgreso = "";

    for(let presupuesto of presupuestoEgreso)
    {
        descripcionYprecioEgreso += `<li><p>${presupuesto.descripcion}</p> <span>-${formatoMoneda(presupuesto.precio)}</span> <button onclick = "eliminarEgreso(${presupuesto.id})">x</button></li>`;
    }

    document.querySelector(".egreso").innerHTML = descripcionYprecioEgreso;
}

const cargarHeader = () =>
{
    presupuestoTotal();
    document.getElementById("ingresos").innerHTML = formatoMoneda(cargarIngresos());
    document.getElementById("egresos").innerHTML = formatoMoneda(cargarEgresos());
}

const eliminarIngreso = (id) =>
{
    let indice = presupuestoIngreso.findIndex(ingreso => ingreso.id == id);
    presupuestoIngreso.splice(indice, 1);
    cargarHeader();
    cargarListaIngresos();
}

const eliminarEgreso = (id) =>
{
    let indice = presupuestoEgreso.findIndex(egreso => egreso.id == id);
    presupuestoEgreso.splice(indice, 1);
    cargarHeader();
    cargarListaEgresos();
}

const botonCheck = document.getElementById("boton-check");
botonCheck.addEventListener("click", insertar);

function insertar()
{
    let descripcion;
    let valor;
    let opcion;

    descripcion = document.getElementById("texto").value;
    valor = document.getElementById("number").value;
    opcion = document.querySelector("#select").value;
    valor = parseFloat(valor);

    if(descripcion != "" && valor < 9999999999)
    {
        if(opcion == "+")
        {
            let presupuestoParcialIngreso = new PresupuestoIngreso(descripcion, valor);
            presupuestoIngreso.push(presupuestoParcialIngreso);
        }
        else
        {
            if(opcion == "-")
            {
                let presupuestoParcialEgreso = new PresupuestoEgreso(descripcion, valor);
                presupuestoEgreso.push(presupuestoParcialEgreso);
            }
        }
    }
 
    cargarHeader();
    cargarListaEgresos();
    cargarListaIngresos();
}
