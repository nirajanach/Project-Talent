using Microsoft.EntityFrameworkCore;
using Project_Talent.Server.Models.Dto;

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

            modelBuilder.Entity<Customer>(entity =>
            {

                entity.ToTable("Customer");

             
            });


            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("Product");


                entity.Property(p => p.Price)
                .HasColumnType("money");

            }
            );

            modelBuilder.Entity<Store>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable("Store");           
                   
            });

            modelBuilder.Entity<Sale>(
                entity =>
                {
                    entity.HasKey(e => e.Id);

                   
                    entity.Property(e => e.DateSold).HasColumnType("date");

                    entity.HasOne(d => d.Customer).WithMany(p => p.ProductsSold)
                        .HasForeignKey(d => d.CustomerId).OnDelete(DeleteBehavior.Cascade); ;

                    entity.HasOne(d => d.Product).WithMany(p => p.ProductSold)
                        .HasForeignKey(d => d.ProductId).OnDelete(DeleteBehavior.Cascade); ;

                    entity.HasOne(d => d.Store).WithMany(p => p.ProductSold)
                        .HasForeignKey(d => d.StoreId).OnDelete(DeleteBehavior.Cascade); ;
                });            

  

        }


        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

        public DbSet<SaleDto> SaleDto { get; set; }
    }
}
