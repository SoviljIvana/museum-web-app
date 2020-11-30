using System;
using System.Collections.Generic;
using System.Text;

namespace MuseumApp.Domain.Models
{
    public class TicketDomainModel
    {
        public int TicketId { get; set; }
        public int Payment { get; set; }
        public int ExhibitionId { get; set; }
        public int UserId { get; set; }
    }
}