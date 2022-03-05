using System;
using Microsoft.EntityFrameworkCore;
using tztd.Models;

namespace tztd.Data {
    public class ApplicationContext : DbContext {

        public DbSet<Client> Clients;
        public DbSet<Founder> Founders;

        public ApplicationContext () {
            Database.EnsureCreated ();
        }

        public bool RecreateDatabase () {
            bool status = true;
            status = Database.EnsureDeleted ();
            status = Database.EnsureCreated ();
            return status;
        }

        protected override void OnConfiguring (DbContextOptionsBuilder optionsBuilder) {
            optionsBuilder.UseNpgsql ("Host=localhost;Port=5432;Database=teledoc;Username=admin;Password=tztd040322");
        }

        protected override void OnModelCreating (ModelBuilder modelBuilder) {
            modelBuilder.Entity<Client> ().Property (p => p.DateAppend).HasDefaultValueSql ("current_timestamp");
            modelBuilder.Entity<Founder> ().Property (p => p.DateAppend).HasDefaultValueSql ("current_timestamp");
        }
    }
}