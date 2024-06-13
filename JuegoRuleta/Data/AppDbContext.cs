using Microsoft.EntityFrameworkCore;
using JuegoRuleta.Models;

namespace Vetmania.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Jugador> Jugadores { get; set; }
    
}