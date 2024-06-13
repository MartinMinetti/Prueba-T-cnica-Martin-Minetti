
function GuardarJugador() {

    let nombreJugador = $("#NombreJugador").val();
    let saldo = $("#Saldo").val();


    if (nombreJugador === "" || saldo === "") {

        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor, completa todos los campos.",
        });

    } else {
        $.ajax({

            url: '../../Juego/GuardarJugador',
    
            data: { NombreJugador: nombreJugador, Saldo: saldo },
    
            type: 'POST',
    
            dataType: 'json',
    
            success: function (resultado) {
    
                if (resultado == 1) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Se guardo correctamente",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    document.getElementById("saldo_consultar").innerText = saldo;
                    document.getElementById("NombreJugador").disabled = true;
                    document.getElementById("Saldo").disabled = true;
                } else {
                    if (resultado == 2) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Se modifico su saldo, porque ya estaba registrado",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        document.getElementById("saldo_consultar").innerText = saldo;
                        document.getElementById("NombreJugador").disabled = true;
                        document.getElementById("Saldo").disabled = true;
                    } else {
                        alert('Ocurrio algo');
                    }
                }
            },
    
            error: function (xhr, status) {
                alert('Disculpe, existió un problema');
            }
        });
    
    }
   
}


//PARTE PARA HACER FUNCIONAR LA RULETA 


function obtenerColor(numero) {
    if (numero === 0) return 'verde';
    const rojos = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    return rojos.includes(numero) ? 'rojo' : 'negro';
}

function girarRuleta() {
    const montoApuesta = parseFloat(document.getElementById('montoApuesta').value);
    const apuesta = document.getElementById('apuesta').value.toLowerCase();
    const saldo_consultar = parseFloat(document.getElementById('saldo_consultar').innerText)


    if (montoApuesta === "" || apuesta === "") {

        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor, completa todos los campos.",
        });

    }
    else {

        if (isNaN(montoApuesta) || montoApuesta <= 0 || montoApuesta > saldo_consultar) {

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Introduce un monto de apuesta válido.",
            });

        } else {

            const numeroApuesta = parseInt(apuesta);
            if (!isNaN(numeroApuesta) && (numeroApuesta < 0 || numeroApuesta > 36)) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "El número debe estar entre 0 y 36.",
                });

            }else{

                if (isNaN(numeroApuesta) &&  !["rojo", "negro", "par", "impar"].includes(apuesta)) {

                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "La apuesta al NO ser un número, debe ser 'rojo', 'negro', 'par' o 'impar'.",
                    });

                } else {
                    
                const numero = Math.floor(Math.random() * 37);
                const color = obtenerColor(numero);
    
                const resultadoDiv = document.getElementById('resultado');
                resultadoDiv.textContent = `Número: ${numero} - Color: ${color}`;
                resultadoDiv.className = color;
    
                evaluarApuesta(montoApuesta, apuesta, numero, color);
                }
            }
        }
    }

}




function evaluarApuesta(montoApuesta, apuesta, numero, color) {
    let mensaje = '';
    let ganancia = 0;
    let saldo_consultar = parseFloat(document.getElementById('saldo_consultar').innerText);

    if (apuesta === numero.toString()) {
        ganancia = montoApuesta * 3;
        mensaje = `¡Has acertado el número! Ganaste ${ganancia} créditos.`;
    } else if (apuesta === color) {
        ganancia = montoApuesta * 0.5;
        mensaje = `¡Has acertado el color! Ganaste ${ganancia} créditos.`;
    } else if (apuesta === 'par' && numero !== 0 && numero % 2 === 0) {
        ganancia = montoApuesta;
        mensaje = `¡Has acertado el par! Ganaste ${ganancia} créditos.`;
    } else if (apuesta === 'impar' && numero % 2 !== 0) {
        ganancia = montoApuesta;
        mensaje = `¡Has acertado el impar! Ganaste ${ganancia} créditos.`;
    } else {
        mensaje = 'No has acertado. ¡Inténtalo de nuevo!';
        ganancia = -montoApuesta;
    }

    saldo_consultar += ganancia;

    document.getElementById('saldo_consultar').innerText = saldo_consultar.toFixed(2);
    document.getElementById('Saldo').value = saldo_consultar.toFixed(2);
    document.getElementById('apuestaResultado').textContent = mensaje;
}



