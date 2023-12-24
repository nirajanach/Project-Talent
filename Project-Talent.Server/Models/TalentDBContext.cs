using Microsoft.EntityFrameworkCore;

namespace Project_Talent.Server.Models
{
    public partial class TalentDBContext : DbContext
    {
        public TalentDBContext()
        {            
        }

        public TalentDBContext(DbContextOptions<TalentDBContext> options)
           : base(options)
        {
        }

        public virtual DbSet<Customer> Customers { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Sale> Sales { get; set; }
        public virtual DbSet<Store> Stores { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasColumnType("money");


            modelBuilder.Entity<Sale>()
                .Property(s => s.DateSold)
                .HasColumnType("datetime");

            modelBuilder.Entity<Customer>()
            .HasMany(c => c.ProductsSold)
            .WithOne(s => s.Customer)
            .HasForeignKey(s => s.CustomerId);

            modelBuilder.Entity<Product>()
                .HasMany(p => p.ProductSold)
                .WithOne(s => s.Product)
                .HasForeignKey(s => s.ProductId);

            modelBuilder.Entity<Store>()
                .HasMany(st => st.ProductSold)
                .WithOne(s => s.Store)
                .HasForeignKey(s => s.StoreId);
        }


        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
