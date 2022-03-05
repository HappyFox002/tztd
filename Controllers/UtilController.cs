using System;
using Microsoft.AspNetCore.Mvc;
using tztd.Data;

namespace tztd.Controllers {
    public class UtilController : Controller {

        [HttpGet]
        [Route("/recreate")]
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