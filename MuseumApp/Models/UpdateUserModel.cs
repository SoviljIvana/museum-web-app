using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MuseumApp.Models
{
    public class UpdateUserModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime YearOfBirth { get; set; }
        public string Email { get; set; }
        public bool IsAdmin { get; set; }
    }
}