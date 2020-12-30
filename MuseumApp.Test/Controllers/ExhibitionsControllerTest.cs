using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MuseumApp.Domain.Interfaces;
using MuseumApp.Domain.Models;
using MuseumApp.Controllers;
using Microsoft.EntityFrameworkCore;
using MuseumApp.Models;
using MuseumApp.Domain;

namespace MuseumApp.Tests.Controllers
{
    [TestClass]
    public class ExhibitionsControllerTest
    {
        private Mock<IExhibitionService> _mockExhibitionService;
        private ExhibitionDomainModel _exhibitionDomainModel;
        private List<ExhibitionDomainModel> _listOfExhibitionsDomainModel;
        private UpdateExhibitionModel _updateExhibitionModel;

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

        }

        [TestMethod]
        public void ExhibitionsController_GetCurrentExhibitions_ReturnOkObjectResult()
        {
            // Arrange
            int expectedStatusCode = 200; // expected result is 200
            IEnumerable<ExhibitionDomainModel> exhibitionDomainModels = _listOfExhibitionsDomainModel;
            Task<IEnumerable<ExhibitionDomainModel>> responseTask = Task.FromResult(exhibitionDomainModels);
            _mockExhibitionService = new Mock<IExhibitionService>();
            _mockExhibitionService.Setup(x => x.GetCurrentExhibitions()).Returns(responseTask);
            ExhibitionsController exhibitionsController = new ExhibitionsController(_mockExhibitionService.Object);

            // Act
            var resultAction = exhibitionsController.GetCurrentExhibitions().ConfigureAwait(false).GetAwaiter().GetResult().Result;
            var result = ((OkObjectResult)resultAction).Value;
            var resultList = ((List<ExhibitionDomainModel>)result);

            // Assert

            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(resultAction, typeof(OkObjectResult));
            Assert.AreEqual(expectedStatusCode, ((OkObjectResult)resultAction).StatusCode);
        }

        [TestMethod]
        public void ExhibitionsController_GetCurrentExhibitions_ReturnBadRequestObjectResult()
        {
            //Arange
            int expectedStatusCode = 400;
            string expectedErrorMessage = "Inner exception error message.";
            Exception exception = new Exception("Inner exception error message.");
            DbUpdateException dbUpdateException = new DbUpdateException("error", exception);

            _mockExhibitionService = new Mock<IExhibitionService>();
            _mockExhibitionService.Setup(x => x.GetCurrentExhibitions()).Throws(dbUpdateException);
            ExhibitionsController exhibitionsController = new ExhibitionsController(_mockExhibitionService.Object);

            //Act
            var resultAction = exhibitionsController.GetCurrentExhibitions().ConfigureAwait(false).GetAwaiter().GetResult().Result;
            var resultResponse = (BadRequestObjectResult)resultAction;
            var badObjectResult = ((BadRequestObjectResult)resultAction).Value;
            var errorResult = (ErrorResponseModel)badObjectResult;

            //Assert
            Assert.IsNotNull(resultResponse);
            Assert.AreEqual(expectedErrorMessage, errorResult.ErrorMessage);
            Assert.IsInstanceOfType(resultAction, typeof(BadRequestObjectResult));
            Assert.AreEqual(expectedStatusCode, resultResponse.StatusCode);


        }
        [TestMethod]
        public void ExhibitionConroller_CurrentExhibitions_DoesNotExist()
        {
            //Arrange
            int expectedStatusCode = 404;

            IEnumerable<ExhibitionDomainModel> exhibitionDomainModel = null;
            Task<IEnumerable<ExhibitionDomainModel>> responseTask = Task.FromResult(exhibitionDomainModel);
            _mockExhibitionService = new Mock<IExhibitionService>();
            _mockExhibitionService.Setup(x => x.GetCurrentExhibitions()).Returns(responseTask);
            ExhibitionsController exhibitionsController = new ExhibitionsController(_mockExhibitionService.Object);

            //Act
            var resultAction = exhibitionsController.GetCurrentExhibitions().ConfigureAwait(false).GetAwaiter().GetResult().Result;
            var result = ((ObjectResult)resultAction).Value;
            var resultErrorResponseModel = ((ErrorResponseModel)result).ErrorMessage;

            //Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(resultAction, typeof(ObjectResult));
            Assert.AreEqual(expectedStatusCode, ((ObjectResult)resultAction).StatusCode);


        }


        [TestMethod]
        public void ExhibitionsController_GetAllExhibitions_ReturnOkObjectResult()
        {
            //Arrange
            int expectedCode = 200;
            IEnumerable<ExhibitionDomainModel> exhibitionDomainModels = _listOfExhibitionsDomainModel;
            Task<IEnumerable<ExhibitionDomainModel>> responseTask = Task.FromResult(exhibitionDomainModels);
            _mockExhibitionService = new Mock<IExhibitionService>();
            _mockExhibitionService.Setup(x => x.GetAllExhibitions()).Returns(responseTask);
            ExhibitionsController exhibitionsController = new ExhibitionsController(_mockExhibitionService.Object);

            //Act
            var resultAction = exhibitionsController.GetAllExhibitions().ConfigureAwait(false).GetAwaiter().GetResult().Result;
            var result = ((ObjectResult)resultAction).Value;
            var resultList = ((List<ExhibitionDomainModel>)result);

            //Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(resultAction, typeof(ObjectResult));
            Assert.AreEqual(expectedCode, ((OkObjectResult)resultAction).StatusCode);
        }

        [TestMethod]
        public void ExhibitionController_GetAllExhibitions_ReturnNotFound()
        {
            //Arrange
            int expectedStatusCode = 404;

            IEnumerable<ExhibitionDomainModel> exhibitionDomainModels = null;
            Task<IEnumerable<ExhibitionDomainModel>> taskResponse = Task.FromResult(exhibitionDomainModels);
            _mockExhibitionService = new Mock<IExhibitionService>();
            _mockExhibitionService.Setup(x => x.GetAllExhibitions()).Returns(taskResponse);
            ExhibitionsController exhibitionsController = new ExhibitionsController(_mockExhibitionService.Object);

            //Act
            var resultAction = exhibitionsController.GetAllExhibitions().ConfigureAwait(false).GetAwaiter().GetResult().Result;
            var result = ((ObjectResult)resultAction).Value;
            // var resultErrorResponseModel = ((ErrorResponseModel)result).ErrorMessage;

            //Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(resultAction, typeof(ObjectResult));
            Assert.AreEqual(expectedStatusCode, ((NotFoundObjectResult)resultAction).StatusCode);
        }

        [TestMethod]
        public void ExhibitionController_GetAllExhibitions_ReturnBadRequest()
        {
            //Arrange
            int expectedStatusCode = 400;
            Exception exception = new Exception("Inner exception error message");
            DbUpdateException dbUpdateException = new DbUpdateException("error", exception);
            _mockExhibitionService = new Mock<IExhibitionService>();
            _mockExhibitionService.Setup(x => x.GetAllExhibitions()).Throws(dbUpdateException);

            ExhibitionsController exhibitionsController = new ExhibitionsController(_mockExhibitionService.Object);

            //Act
            var actionResult = exhibitionsController.GetAllExhibitions().ConfigureAwait(false).GetAwaiter().GetResult().Result;
            var badObjectResult = ((BadRequestObjectResult)actionResult).Value;
            var resultResponse = (BadRequestObjectResult)actionResult;

            //Assert
            Assert.IsNotNull(resultResponse);
            Assert.IsInstanceOfType(actionResult, typeof(BadRequestObjectResult));
            Assert.AreEqual(expectedStatusCode, resultResponse.StatusCode);




            //}

            //[TestMethod]
            //public void ExhibitionController_UpdateExhibition_ReturnNotFound()
            //{
            //    //Arrange
            //    int expectedStatusCode = 404;
            //    ExhibitionDomainModel exhibitionDomainModel = null;
            //    Task<ExhibitionDomainModel> responseTask = Task.FromResult(exhibitionDomainModel);

            //    _mockExhibitionService = new Mock<IExhibitionService>();
            //    _mockExhibitionService.Setup(x => x.GetExhibitionByIdAsync(It.IsAny<int>())).Returns(responseTask);
            //    ExhibitionsController exhibitionsController = new ExhibitionsController(_mockExhibitionService.Object);

            //    //Act
            //    var resultAction = exhibitionsController.PutExhibition(It.IsAny<int>(), It.IsAny<UpdateExhibitionModel>()).ConfigureAwait(false).GetAwaiter().GetResult();
            //    var result = ((ObjectResult)resultAction).Value;
            //    var resultErrorResponseModel = ((ErrorResponseModel)result).ErrorMessage;
            //    var resultStatusCode = ((ErrorResponseModel)result).StatusCode;
            //    var resultStatusCodeIntoInt = (int)resultStatusCode;

            //    //Assert
            //    Assert.IsNotNull(resultAction);
            //    Assert.AreEqual(expectedStatusCode, resultStatusCodeIntoInt);
            //    Assert.IsInstanceOfType(resultAction, typeof(ObjectResult));
            //}

            //[TestMethod]
            //public void ExhibitionController_UpdateExhibition_Accepted()
            //{
            //    //Arrange
            //    int expectedStatusCode = 202;
            //    UpdateExhibitionModel updateExhibitionModel = _updateExhibitionModel;
            //    ExhibitionDomainModel exhibitionDomainModel = _exhibitionDomainModel;
            //    CreateExhibitionResultModel createExhibitionResultModel = new CreateExhibitionResultModel()
            //    {
            //        Exhibition = _exhibitionDomainModel,
            //        IsSuccessfull = true,
            //        ErrorMessage = null

            //    };
            //    Task<ExhibitionDomainModel> responseTask = Task.FromResult(_exhibitionDomainModel);
            //    _mockExhibitionService = new Mock<IExhibitionService>();
            //    _mockExhibitionService.Setup(x => x.GetExhibitionByIdAsync(It.IsAny<int>())).Returns(responseTask);
            //    Task<CreateExhibitionResultModel> responseTaskUpdateExhibition = Task.FromResult(createExhibitionResultModel);
            //    ExhibitionsController exhibitionsController = new ExhibitionsController(_mockExhibitionService.Object);

            //    //Act
            //    var resultAction = exhibitionsController.PutExhibition(It.IsAny<int>(), updateExhibitionModel).ConfigureAwait(false).GetAwaiter().GetResult();
            //    var resultResponse = ((AcceptedResult)resultAction).Value;
            //    var statusCode = ((AcceptedResult)resultAction).StatusCode;
            //    var resultExhibitionDomainModel = (CreateExhibitionResultModel)resultResponse;

            //    //Assert
            //    Assert.IsNotNull(resultResponse);
            //    Assert.IsNotInstanceOfType(resultAction, typeof(AcceptedResult));
            //    Assert.IsTrue(resultExhibitionDomainModel.IsSuccessfull);
            //    Assert.IsNull(resultExhibitionDomainModel.ErrorMessage);
            //    Assert.AreEqual(expectedStatusCode, statusCode);

            //}



            //[TestMethod]
            //public void ExhibitionController_UpdateExhibition_Accepted()
            //{
            //    //Arrange
            //    int expectedStatusCode = 202;
            //    UpdateExhibitionModel updateExhibitionModel = _updateExhibitionModel;
            //    ExhibitionDomainModel exhibitionDomainModel = _exhibitionDomainModel;
            //    CreateExhibitionResultModel createExhibitionResultModel = new CreateExhibitionResultModel()
            //    {
            //        Exhibition = _exhibitionDomainModel,
            //        IsSuccessfull = true,
            //        ErrorMessage = null

            //    };
            //    Task<ExhibitionDomainModel> responseTask = Task.FromResult(_exhibitionDomainModel);
            //    _mockExhibitionService = new Mock<IExhibitionService>();
            //    _mockExhibitionService.Setup(x => x.GetExhibitionByIdAsync(It.IsAny<int>())).Returns(responseTask);
            //    Task<CreateExhibitionResultModel> responseTaskUpdateExhibition = Task.FromResult(createExhibitionResultModel);
            //    ExhibitionsController exhibitionsController = new ExhibitionsController(_mockExhibitionService.Object);

            //    //Act
            //    var resultAction = exhibitionsController.PutExhibition(It.IsAny<int>(), updateExhibitionModel).ConfigureAwait(false).GetAwaiter().GetResult();
            //    var resultResponse = ((AcceptedResult)resultAction).Value;
            //    var statusCode = ((AcceptedResult)resultAction).StatusCode;
            //    var resultExhibitionDomainModel = (CreateExhibitionResultModel)resultResponse;

            //    //Assert
            //    Assert.IsNotNull(resultResponse);
            //    Assert.IsNotInstanceOfType(resultAction, typeof(AcceptedResult));
            //    Assert.IsTrue(resultExhibitionDomainModel.IsSuccessfull);
            //    Assert.IsNull(resultExhibitionDomainModel.ErrorMessage);
            //    Assert.AreEqual(expectedStatusCode, statusCode);

            //}

        }
    }
}