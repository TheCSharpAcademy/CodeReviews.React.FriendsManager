using Data;
using Microsoft.EntityFrameworkCore;

namespace Repository;

public class Repository<T>(FriendsDbContext dbContext) : IRepository<T> where T : class
{
  private readonly FriendsDbContext _dbContext = dbContext;
  private readonly DbSet<T> _dbSet = dbContext.Set<T>();
  
  public async Task<IEnumerable<T>> GetAsync()
  {
    return await _dbSet.ToListAsync();
  }

  public async Task<T?> GetByIdAsync(int id)
  {
    return await _dbSet.FindAsync(id);
  }

  public async Task AddAsync(T entity)
  {
    await _dbSet.AddAsync(entity);
    await _dbContext.SaveChangesAsync();
  }

  public async Task UpdateAsync(T entity)
  {
    _dbSet.Entry(entity).State = EntityState.Modified;
    await _dbContext.SaveChangesAsync();
  }

  public async Task DeleteAsync(T entity)
  {
    _dbSet.Remove(entity);
    await _dbContext.SaveChangesAsync();
  }
}