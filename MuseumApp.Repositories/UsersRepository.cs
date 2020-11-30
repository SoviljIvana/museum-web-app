using Microsoft.EntityFrameworkCore;
using MuseumApp.Data.Context;
using MuseumApp.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MuseumApp.Repositories
{
    public interface IUsersRepository : IRepository<UserEntity>
    {
        UserEntity GetByUserName(string username);
    }
    public class UsersRepository : IUsersRepository
    {
        private readonly MuseumContext _museumContext;

        public UsersRepository(MuseumContext museumContext)
        {
            _museumContext = museumContext;
        }
        public UserEntity Delete(object id)
        {

            UserEntity entity = _museumContext.Users.Find(id);
            var result = _museumContext.Users.Remove(entity);
            return result.Entity;
        }
        public UserEntity GetByUserName(string username)
        {
            var data = _museumContext.Users.Include(x => x.Tickets).SingleOrDefault(x => x.Username == username);

            return data;
        }
        public async Task<IEnumerable<UserEntity>> GetAll()
        {
            var data = await _museumContext.Users.ToListAsync();
            if (data.Count == 0)
            {
                return null;
            }
            return data;
        }

        public async Task<UserEntity> GetByIdAsync(object id)
        {
            var data = await _museumContext.Users.FindAsync(id);
            return data;
        }

        public UserEntity Insert(UserEntity obj)
        {
            throw new NotImplementedException();
        }

        public void Save()
        {
            _museumContext.SaveChanges();
        }

        public UserEntity Update(UserEntity obj)
        {
            var updatedEntry = _museumContext.Users.Attach(obj).Entity;
            _museumContext.Entry(obj).State = EntityState.Modified;
            return updatedEntry;
        }
    }
}