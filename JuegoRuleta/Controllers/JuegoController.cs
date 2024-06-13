using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using JuegoRuleta.Models;
using Vetmania.Data;

namespace JuegoRuleta.Controllers;

public class JuegoController : Controller
{
    private readonly ILogger<JuegoController> _logger; 
    private AppDbContext _contexto;

    public JuegoController(ILogger<JuegoController> logger, AppDbContext contexto)
    {
        _logger = logger;
        _contexto = contexto;
    }

    public IActionResult Index()
    {
        return View();
    }



    public JsonResult GuardarJugador(string NombreJugador, decimal Saldo)
    {
        int resultado = 0;


        var Jugador = _contexto.Jugadores.Where(j => j.NombreCompleto == NombreJugador).FirstOrDefault();

        if (Jugador == null)
        {

            var AgregarJugador = new Jugador
            {
                NombreCompleto = NombreJugador,
                Saldo = Saldo
            };
            _contexto.Add(AgregarJugador);
            _contexto.SaveChanges();
            resultado = 1;
        }
        else
        {

            Jugador.Saldo = Saldo;
            _contexto.SaveChanges();
            resultado = 2;
            
        }


        return Json(resultado);
    }



}





