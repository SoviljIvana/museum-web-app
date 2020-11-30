
using MuseumApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
namespace MuseumApp.Domain.Interfaces
{
    public interface IUserService
    {

        Task<IEnumerable<UserDomainModel>> GetAllUsers();

        Task<UserDomainModel> GetUserByIdAsync(int id);

        Task<UserDomainModel> GetUserByUserName(string username);

        Task<UserResultModel> UpdateUser(UserDomainModel userDomainModel);
    }
}