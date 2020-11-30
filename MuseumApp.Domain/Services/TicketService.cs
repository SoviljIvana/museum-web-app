using System;
using System.Collections.Generic;
using System.Text;
using MuseumApp.Domain.Common;
using MuseumApp.Domain.Interfaces;
using MuseumApp.Domain.Models;
using System.Threading.Tasks;
using MuseumApp.Repositories;

namespace MuseumApp.Domain.Services
{
    public class TicketService : ITicketService
    {
        private readonly ITicketsRepository _ticketRepository;

        public TicketService(ITicketsRepository ticketRepository)
        {
            _ticketRepository = ticketRepository;
        }

        public Task<TicketDomainModel> CreateTicket()
        {
            throw new System.NotImplementedException();
        }

        public Task<TicketResultModel> CreateTicket(TicketDomainModel ticketModel)
        {
            throw new System.NotImplementedException();
        }

        public Task<TicketDomainModel> DeleteTicket(int id)
        {
            throw new System.NotImplementedException();
        }

        public async Task<IEnumerable<TicketDomainModel>> GetAllTickets()
        {
            var data = await _ticketRepository.GetAll();
            if (data == null)
            {
                return null;
            }

            List<TicketDomainModel> list = new List<TicketDomainModel>();
            TicketDomainModel ticketModel;

            foreach (var item in data)
            {
                ticketModel = new TicketDomainModel
                {
                    TicketId = item.TicketId,
                    ExhibitionId = item.ExhibitionId,
                    Payment = item.Payment,
                    UserId = item.UserId
                };
                list.Add(ticketModel);
            };
            return list;

        }

        public async Task<TicketDomainModel> GetTicketByIdAsync(int id)
        {
            var data = await _ticketRepository.GetByIdAsync(id);

            if (data == null) return null;

            TicketDomainModel result;
            result = new TicketDomainModel
            {
                TicketId = data.TicketId,
                ExhibitionId = data.ExhibitionId,
                Payment = data.Payment,
                UserId = data.UserId
            };
            return result;
        }

        public Task<TicketDomainModel> UpdateTicket()
        {
            throw new System.NotImplementedException();
        }

        Task<TicketResultModel> ITicketService.DeleteTicket(int id)
        {
            throw new System.NotImplementedException();
        }

        Task<TicketResultModel> ITicketService.UpdateTicket()
        {
            throw new System.NotImplementedException();
        }
    }
}