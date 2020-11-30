using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace MuseumApp.Data.Entities
{
    [Table("ticket")]

    public class TicketEntity
    {
        [Key]
        public int TicketId { get; set; }
        public int Payment { get; set; }
        public int ExhibitionId { get; set; }
        public int UserId { get; set; }
        public virtual ExhibitionEntity Exhibition { get; set; }
        public virtual UserEntity User { get; set; }

    }
}