using ApiTienda.Repository.Entities;
using Microsoft.EntityFrameworkCore;
using TiendaApi.Repository.Interfaces;

namespace TiendaApi.Repository
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
        {
        }

        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Articulo> Articulos { get; set; }
        public DbSet<Tienda> Tiendas { get; set; }
        public DbSet<Articulo_Tienda> Articulo_Tienda { get; set; }
        public DbSet<Cliente_Articulo> Cliente_Articulo { get; set; }
        public DbSet<Administrador> Administrador {  get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Cliente>().HasIndex(c => c.IdCliente).IsUnique();
            modelBuilder.Entity<Articulo>().HasIndex(c => c.Codigo).IsUnique();
            modelBuilder.Entity<Tienda>().HasIndex(c => c.IdTienda).IsUnique();
            modelBuilder.Entity<Articulo_Tienda>().HasKey(c => new { c.IdTienda, c.Codigo });
            modelBuilder.Entity<Cliente_Articulo>().HasKey(c => new { c.IdCliente, c.Codigo });
        }
    }
}
