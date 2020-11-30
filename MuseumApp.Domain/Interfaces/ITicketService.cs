
using MuseumApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MuseumApp.Domain.Interfaces
{
    public interface ITicketService
    {
        Task<IEnumerable<TicketDomainModel>> GetAllTickets();

        Task<TicketDomainModel> GetTicketByIdAsync(int id);

        Task<TicketResultModel> CreateTicket(TicketDomainModel ticketModel);

        Task<TicketResultModel> DeleteTicket(int id);

        Task<TicketResultModel> UpdateTicket();

    }
}
