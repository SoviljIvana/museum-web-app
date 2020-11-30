using System;
using System.Collections.Generic;
using System.Text;
using MuseumApp.Domain.Common;
using MuseumApp.Domain.Interfaces;
using MuseumApp.Domain.Models;
using System.Threading.Tasks;
using MuseumApp.Repositories;
using MuseumApp.Data.Entities;

namespace MuseumApp.Domain.Services
{
    public class UserService : IUserService
    {
        private readonly IUsersRepository _userRepository;

        public UserService(IUsersRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<UserDomainModel> GetUserByUserName(string username)
        {
            var data = _userRepository.GetByUserName(username);

            if (data == null)
            {
                return null;
            }

            UserDomainModel domainModel = new UserDomainModel
            {
                LastName = data.LastName,
                FirstName = data.FirstName,
                Username = data.Username,
                Password = data.Password,
                Email = data.Email,
                UserId = data.UserId,
                IsAdmin = data.IsAdmin,
                YearOfBirth = data.YearOfBirth
            };
            return domainModel;
        }


        public async Task<IEnumerable<UserDomainModel>> GetAllUsers()
        {
            var data = await _userRepository.GetAll();
            if (data == null)
            {
                return null;
            }

            List<UserDomainModel> list = new List<UserDomainModel>();
            UserDomainModel userDomainModel;


            foreach (var item in data)
            {
                userDomainModel = new UserDomainModel
                {
                    UserId = item.UserId,
                    Username = item.Username,
                    FirstName = item.FirstName,
                    LastName = item.LastName,
                    Password = item.Password,
                    YearOfBirth = item.YearOfBirth,
                    Email = item.Email
                };

                list.Add(userDomainModel);
            }


            return list;
        }

        public async Task<UserDomainModel> GetUserByIdAsync(int id)
        {
            var data = await _userRepository.GetByIdAsync(id);
            if (data == null)
            {
                return null;
            }

            UserDomainModel result = new UserDomainModel
            {
                UserId = data.UserId,
                Username = data.Username,
                Password = data.Password,
                FirstName = data.FirstName,
                LastName = data.LastName,
                YearOfBirth = data.YearOfBirth,
                Email = data.Email,
            };
            return result;
        }

        public async Task<UserResultModel> UpdateUser(UserDomainModel update)
        {
            var data = await _userRepository.GetByIdAsync(update.UserId);

            UserEntity user = new UserEntity
            {
                UserId = update.UserId,
                FirstName = update.FirstName,
                LastName = update.LastName,
                Username = update.Username,
                Password = update.Password,
                Email = update.Email,
                YearOfBirth = update.YearOfBirth
            };


            var updateUser = _userRepository.Update(user);

            if (updateUser == null)
            {
                return new UserResultModel
                {
                    IsSuccessful = false,
                    ErrorMessage = Messages.USER_UPDATE_ERROR,
                    User = null
                };
            }

            _userRepository.Save();


            UserResultModel result = new UserResultModel
            {
                IsSuccessful = true,
                ErrorMessage = null,
                User = new UserDomainModel
                {
                    UserId = updateUser.UserId,
                    FirstName = updateUser.FirstName,
                    LastName = updateUser.LastName,
                    Username = updateUser.Username,
                    Password = updateUser.Password,
                    Email = updateUser.Email,
                    YearOfBirth = updateUser.YearOfBirth
                }
            };
            return result;
        }



    }
}
