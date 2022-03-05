using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tztd.Data;
using tztd.Models;
using tztd.ViewModels;

namespace tztd.Controllers {
    public class FounderController : Controller {

        /// <summary>
        /// Добавление нового учредителя
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpGet]
        [Route ("/addfounder")]
        public async Task<JsonResult> AppendFounder (FounderModel model) {
            RequestStatus status;

            Console.WriteLine ($"ModelINN : {model.INN}, ModelFullName : {model.FullName}");

            if (ModelState.IsValid) {
                using (ApplicationContext app = new ApplicationContext ()) {
                    if (await app.Founders.AnyAsync ()) {
                        Founder founder = await app.Founders.FirstOrDefaultAsync (f => f.INN == model.INN || f.FullName == model.FullName);
                        if (founder != null) {
                            status = new RequestStatus () { Type = Data.TypeRequest.EROOR_EXSISTS, MessageError = "Данная запись существует" };
                            return Json (status);
                        }
                    }

                    DateTime currentDate = DateTime.Now;
                    app.Founders.Add (new Founder () { INN = model.INN, FullName = model.FullName, DateAppend = currentDate, DateEdit = currentDate });
                    await app.SaveChangesAsync ();
                    status = new RequestStatus () { Type = Data.TypeRequest.ACCEPT, Message = "Данная запись добавлена в базу данных" };
                    return Json (status);
                }
            }

            status = new RequestStatus () { Type = Data.TypeRequest.ERROR_VALIDATION, Response = model, MessageError = "Ошибка валидации" };
            return Json (status);
        }
    }
}