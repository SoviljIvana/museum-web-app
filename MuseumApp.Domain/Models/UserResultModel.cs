using System;
using System.Collections.Generic;
using System.Text;

namespace MuseumApp.Domain.Models
{
    public class UserResultModel
    {
        public UserDomainModel User { get; set; }

        public bool IsSuccessful { get; set; }

        public string ErrorMessage { get; set; }
    }
}