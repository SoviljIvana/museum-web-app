using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MuseumApp.Models
{
    public class CreateUserModel
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

        public bool IsAdmin { get; set; }
        public DateTime YearOfBirth { get; set; }
    }
}