namespace Repository;

public interface IRepository<T>
{
  Task<IEnumerable<T>> GetAsync();
  Task<T?> GetByIdAsync(int id);
  Task AddAsync(T entity);
  Task UpdateAsync(T entity);
  Task DeleteAsync(T entity);
}