using Microsoft.AspNetCore.Mvc;
using tztd.Data;
using tztd.Models;
using tztd.ViewModels;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace tztd.Controllers
{
    public class ClientController : Controller
    {
        /// <summary>
        ///  Добавление нового клмента в систему
        /// </summary>
        /// <param name="model">Данные добовляемого пользователя</param>
        /// <param name="idsFounder">Список данных пользователей</param>
        /// <returns></returns>
        [HttpGet]
        [Route("/addclient")]
        public async Task<JsonResult> AppendFounder(ClientModel model, int[] idsFounder) {
            RequestStatus status;

            if (ModelState.IsValid) {
                using (ApplicationContext app = new ApplicationContext()) { 
                    var founders = await app.Founders.Where(f => idsFounder.Contains(f.Id)).ToListAsync();

                    if (await FindClient(model) > 0) { 
                        status = new RequestStatus () { Type = Data.TypeRequest.EROOR_EXSISTS, Response = model, MessageError = "В системе уже есть клиент с такими данными" };
                        return Json(status);
                    }

                    Client newClient = new Client() { INN = model.INN, FullName = model.FullName, TypeOrganization = model.TypeOrganization };
                    app.Clients.Add(newClient);
                    await app.SaveChangesAsync();

                    newClient.Founders.AddRange(founders);
                    await app.SaveChangesAsync();

                    status = new RequestStatus () { Type = Data.TypeRequest.ACCEPT, Response=newClient, Message = "Данная запись добавлена в базу данных" };
                    return Json (status);
                }
            }

            status = new RequestStatus () { Type = Data.TypeRequest.ERROR_VALIDATION, Response = model, MessageError = "Ошибка валидации" };
            return Json(status);
        }

        /// <summary>
        /// Обновление данных клиента
        /// </summary>
        /// <param name="id">id клиента</param>
        /// <param name="model">Данные для обновления</param>
        /// <returns></returns>
        [HttpGet]
        [Route("/editclient")]
        public async Task<JsonResult> UpdateFounder(int id, ClientModel model) {
            RequestStatus status;

            if (ModelState.IsValid) {
                using (ApplicationContext app = new ApplicationContext()) { 
                    if (await FindClient(id)) {
                        if (!await PermisionUpdate(model, id)) { 
                            status = new RequestStatus () { Type = Data.TypeRequest.EROOR_EXSISTS, MessageError = "В системе уже есть запись с такими данными" };
                            return Json (status);
                        }

                        Client clientUpdate = await app.Clients.FirstOrDefaultAsync(c => c.Id == id);
                        clientUpdate.UpdateData(model);
                        await app.SaveChangesAsync();

                        status = new RequestStatus () { Type = Data.TypeRequest.ACCEPT, Response=clientUpdate, Message = "Данная запись обновлена в базе данных" };
                        return Json(status);
                    }
                }
            }

            status = new RequestStatus () { Type = Data.TypeRequest.ERROR_VALIDATION, Response = model, MessageError = "Ошибка валидации" };
            return Json(status);
        }

        /// <summary>
        /// Получение списка клиентов в системе
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("/getclients")]
        public async Task<JsonResult> GetClients() {
            RequestStatus status;
            using (ApplicationContext app = new ApplicationContext()) {
                var clients = await app.Clients.ToListAsync();
                status = new RequestStatus () { Type = Data.TypeRequest.ACCEPT, Response = clients, Message = "Список клиентов в системе" };
                return Json(status);
            }
        }

        [HttpGet]
        [Route("/getclient")]
        public async Task<JsonResult> GetClient(int id) {
            RequestStatus status;
            using (ApplicationContext app = new ApplicationContext()) {
                if (await FindClient(id)) {
                    Client client = await app.Clients.FirstOrDefaultAsync(c => c.Id == id);
                    status = new RequestStatus () { Type = Data.TypeRequest.ACCEPT, Response=client, Message = "Искомый клиент" };
                    return Json(status);
                }
                status = new RequestStatus () { Type = Data.TypeRequest.ERROR, MessageError = "Данного клиента в системе не найдено" };
                return Json(status);
            }
        }

        /// <summary>
        /// Добавление учредителей клиенту
        /// </summary>
        /// <param name="id">id клиента</param>
        /// <param name="ids">id учредителей</param>
        /// <returns></returns>
        [HttpGet]
        [Route("/addfoundertoclient")]
        public async Task<JsonResult> AddFoundersToClient(int id, int[] ids) { 
            RequestStatus status;
            using (ApplicationContext app = new ApplicationContext()) {
                if (!await FindClient(id)) { 
                    status = new RequestStatus () { Type = Data.TypeRequest.ERROR, MessageError = "Не найден пользователь в базе данных" };
                    return Json(status);
                }
                
                Client client = await app.Clients.FirstOrDefaultAsync(c => c.Id == id);
                var founders = await app.Founders.Where(f => ids.Contains(f.Id)).ToListAsync();
                client.Founders.AddRange(founders);
                await app.SaveChangesAsync();

                status = new RequestStatus () { Type = Data.TypeRequest.ACCEPT, Message = "Клиенту добавлены новые учредители" };
                return Json(status);
            }
            status = new RequestStatus () { Type = Data.TypeRequest.ERROR, MessageError = "Произошла непредвиденная ошибка" };
            return Json(status);
        }

        /// <summary>
        /// Поиск пользователя в системе
        /// </summary>
        /// <param name="model">Данные искомого пользователя</param>
        /// <returns></returns>
        private async Task<int> FindClient(ClientModel model){
            using (ApplicationContext app = new ApplicationContext()) {
                Client client = await app.Clients.FirstOrDefaultAsync(c => c.INN == model.INN || c.FullName == model.FullName);
                if(client != null)
                    return client.Id;
            }
            return -1;
        }

        /// <summary>
        /// Проверка на обновление данных пользователя
        /// </summary>
        /// <param name="model">Данные для обновления</param>
        /// <param name="permissionId">не участвующий id</param>
        /// <returns></returns>
        private async Task<bool> PermisionUpdate(ClientModel model, int permissionId) { 
            using(ApplicationContext app = new ApplicationContext()){
                var clients = await app.Clients.Where(c => (c.INN == model.INN || c.FullName == model.FullName) && c.Id != permissionId).ToListAsync();
                return clients.Count() == 0;
            }
        }

        /// <summary>
        /// Поиск по id клиента
        /// </summary>
        /// <param name="id">id пользователя</param>
        /// <returns></returns>
        private async Task<bool> FindClient(int id) { 
            using(ApplicationContext app = new ApplicationContext()){
                Client client = await app.Clients.FirstOrDefaultAsync (c => c.Id == id);
                if (client != null)
                    return true;
            }
            return false;
        }
    }
}