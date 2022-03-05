using System;
using Microsoft.AspNetCore.Mvc;
using tztd.Data;

namespace tztd.Controllers {
    public class UtilController : Controller {

        [Route("/recreate")]
        [HttpGet]
        public JsonResult CreateDatabase () {
            string status = "ok";
            using (ApplicationContext app = new ApplicationContext ()) {
                if (!app.RecreateDatabase ())
                    status = "error";
            }
            return Json (status);
        }
    }
}