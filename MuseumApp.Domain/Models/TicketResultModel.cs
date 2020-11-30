using System;
using System.Collections.Generic;
using System.Text;

namespace MuseumApp.Domain.Models
{
    public class TicketResultModel
    {
        public TicketDomainModel Ticket { get; set; }

        public bool IsSuccessful { get; set; }

        public string ErrorMessage { get; set; }
    }
}