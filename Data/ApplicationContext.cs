using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using tztd.Models;

namespace tztd.Data {
    public class ApplicationContext : DbContext {

        public DbSet<Client> Clients { get; set; }
        public DbSet<Founder> Founders { get; set; }

        public ApplicationContext () {
            if (Database.EnsureCreated()) {
                InitData();
            }
        }

        public bool RecreateDatabase () {
            bool status = true;
            status = Database.EnsureDeleted ();
            if(status = Database.EnsureCreated ())
                status = InitData();
            return status;
        }

        protected override void OnConfiguring (DbContextOptionsBuilder optionsBuilder) {
            optionsBuilder.UseNpgsql ("Host=localhost;Port=5432;Database=teledoc;Username=admin;Password=tztd040322");
        }

        protected override void OnModelCreating (ModelBuilder modelBuilder) {
            modelBuilder.Entity<Client> ().Property (p => p.DateAppend).HasDefaultValueSql ("current_timestamp");
            modelBuilder.Entity<Client> ().Property (p => p.DateEdit).HasDefaultValueSql ("current_timestamp");
            modelBuilder.Entity<Founder> ().Property (p => p.DateAppend).HasDefaultValueSql ("current_timestamp");
            modelBuilder.Entity<Founder> ().Property (p => p.DateEdit).HasDefaultValueSql ("current_timestamp");
            modelBuilder.Entity<Client>()
                .HasMany(c => c.Founders)
                .WithMany(f => f.Clients)
                .UsingEntity(t => t.ToTable("ClientsAndFounders"));
        }

        private bool InitData() {
            using (ApplicationContext app = new ApplicationContext()) { 
                Client c1 = new Client() { INN = "123456789000", FullName = "ИП Аякин Г.В.", TypeOrganization = TypeOrgan.INDIVIDUAL, DateAppend = DateTime.Now.AddHours(1), DateEdit = DateTime.Now.AddHours(1)};
                Client c2 = new Client() { INN = "1234567010", FullName = "ООО \"Газпром\"", TypeOrganization = TypeOrgan.JURIDICAL, DateAppend = DateTime.Now.AddHours(2), DateEdit = DateTime.Now.AddHours(2)};
                Client c3 = new Client() { INN = "1234567895", FullName = "ООО \"PizzaTeam\"", TypeOrganization = TypeOrgan.JURIDICAL, DateAppend = DateTime.Now.AddHours(3), DateEdit = DateTime.Now.AddHours(3)};
                Client c4 = new Client() { INN = "123456789012", FullName = "ИП Романин Г.В.", TypeOrganization = TypeOrgan.INDIVIDUAL, DateAppend = DateTime.Now.AddHours(4), DateEdit = DateTime.Now.AddHours(4)};

                Founder f1 = new Founder() { INN = "123443210012", FullName = "ИП Артишкин А.Е.", DateAppend = DateTime.Now.AddHours(1), DateEdit = DateTime.Now.AddHours(1)};
                Founder f2 = new Founder() { INN = "1234002100", FullName = "ООО \"Промсвязь банк\"", DateAppend = DateTime.Now.AddHours(2), DateEdit = DateTime.Now.AddHours(2)};
                Founder f3 = new Founder() { INN = "3212002102", FullName = "ООО \"BurgerTeam\"", DateAppend = DateTime.Now.AddHours(3), DateEdit = DateTime.Now.AddHours(3)};
                Founder f4 = new Founder() { INN = "123443212222", FullName = "ИП Агралова А.А.", DateAppend = DateTime.Now.AddHours(4), DateEdit = DateTime.Now.AddHours(4)};

                app.Clients.AddRange(c1, c2, c3, c4);
                app.Founders.AddRange(f1,f2,f3,f4);

                app.SaveChanges();

                c1.Founders.Add(f1);
                c4.Founders.Add(f1);
                c2.Founders.Add(f2);
                c3.Founders.Add(f2);
                c3.Founders.Add(f3);
                c3.Founders.Add(f4);

                return app.SaveChanges() > 0;
            }
        }
    }
}