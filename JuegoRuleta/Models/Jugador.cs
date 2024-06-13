using System.ComponentModel.DataAnnotations;

namespace JuegoRuleta.Models{

    public class Jugador{

        [Key]
        public required string NombreCompleto { get; set; }

        public required decimal Saldo { get; set; }


    }

}