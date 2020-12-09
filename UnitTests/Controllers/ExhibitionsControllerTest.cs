using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using MuseumApp.Domain.Interfaces;
using MuseumApp.Domain.Models;
using Microsoft.Extensions.Logging;

namespace MuseumApp.Tests.Controllers
{
    [TestClass]
   public class ExhibitionsControllerTest
    {
        private Mock<IExhibitionService> _mockExhibitionService;
        private Mock<IAuditoriumService> _mockAuditoriumService;
        private Mock<ITicketService> _mockTicketService;
        private Mock<IExhibitService> _mockExhibitService;
        private ExhibitionDomainModel _exhibitionDomainModel;
        private List<ExhibitionDomainModel> _listOfExhibitionsDomainModel;
        private Mock<ILogger<ExhibitionsController>> _mockILogger;
        [TestInitialize]
        public void TestInitialize()
        {
            _exhibitionDomainModel = new ExhibitionDomainModel()
            {
                ExhibitionId = 1,
                ExhibitionName = "New Exhibition Name",
                StartTime = DateTime.Now.AddDays(1),
                AuditoriumId = 1
            };
            _listOfExhibitionsDomainModel = new List<ExhibitionDomainModel>();
            _mockILogger = new Mock<ILogger<ExhibitionsController>>();
            _mockAuditoriumService = new Mock<IAuditoriumService>();
            _mockTicketService = new Mock<ITicketService>();
            _mockExhibitService = new Mock<IExhibitService>();
        }

        [TestMethod]
        public void ExhibitionsController_GetCurrentExhibitions_ReturnOkObjectResult()
        {
            // Arrange
            int expectedStatusCode = 200; // expected result is 200
            int expectedCount = 1;
            IEnumerable<ExhibitionDomainModel> exhibitionDomainModels = _listOfExhibitionsDomainModel;
            Task<IEnumerable<ExhibitionDomainModel>> responseTask = Task.FromResult(exhibitionDomainModels);
            _mockExhibitionService = new Mock<IExhibitionService>();
            _mockExhibitionService.Setup(x => x.GetCurrentExhibitions()).Returns(responseTask);
            ExhibitionsController exhibitionsController = new ExhibitionsController(_mockExhibitionService.Object);

            // Act
            var resultAction = exhibitionsController.GetCurrentExhibitions().ConfigureAwait(false).GetAwaiter().GetResult().Result;
            var result = ((OkObjectResult)resultAction).Value;
            var resultList = ((List<ExhibitDomainModel>)result);

            // Assert
            Assert.AreEqual(expectedStatusCode, ((OkObjectResult)resultAction).StatusCode);
            Assert.AreEqual(expectedCount, resultList.Count);
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(resultAction, typeof(OkObjectResult));
            Assert.AreEqual(_exhibitionDomainModel.ExhibitionId, resultList[0].ExhibitionId);
        }
    }
}
