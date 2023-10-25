using Microsoft.EntityFrameworkCore;
using WebApiLibro.Entidades;

public class DataContext:DbContext{
    public DataContext(DbContextOptions<DataContext>options):base(options){}
   //Entidad que mapea en .net Libro.cs que contiene la clase Libro
   public DbSet<Libro> Libro{get;set;}//public DbSet<Clase que mapea> nomTabla{get;set;}
   //si hay más tablas se van añadiendo aquí
}