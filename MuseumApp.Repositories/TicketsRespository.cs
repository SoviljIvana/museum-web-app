using Microsoft.EntityFrameworkCore;
using MuseumApp.Data.Context;
using MuseumApp.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MuseumApp.Repositories
{
    public interface ITicketsRepository : IRepository<TicketEntity>
    {

    }
    public class TicketsRepository : ITicketsRepository
    {
        private readonly MuseumContext _museumContext;

        public TicketsRepository(MuseumContext museumContext)
        {
            _museumContext = museumContext;
        }
        public TicketEntity Delete(object id)
        {
            TicketEntity entity = _museumContext.Tickets.Find(id);
            var result = _museumContext.Tickets.Remove(entity);
            return result.Entity;
        }

        public async Task<IEnumerable<TicketEntity>> GetAll()
        {
            var data = await _museumContext.Tickets.ToListAsync();
            return data;
        }

        public async Task<TicketEntity> GetByIdAsync(object id)
        {
            var data = await _museumContext.Tickets.FindAsync(id);
            return data;
        }

        public TicketEntity Insert(TicketEntity obj)
        {
            throw new NotImplementedException();
        }

        public void Save()
        {
            throw new NotImplementedException();
        }

        public TicketEntity Update(TicketEntity obj)
        {
            throw new NotImplementedException();
        }
    }
}
