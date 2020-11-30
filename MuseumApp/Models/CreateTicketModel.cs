using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MuseumApp.Models
{
    public class CreateTicketModel
    {
        public int TicketId { get; set; }
        public int Payment { get; set; }
        public int ExhibitionId { get; set; }
        public int UserId { get; set; }
    }
}