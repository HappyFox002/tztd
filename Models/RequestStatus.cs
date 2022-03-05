using tztd.Data;

namespace tztd.Models {
    /// <summary>
    /// Сущность ответа сервера клиенту
    /// </summary>
    public class RequestStatus {
        public TypeRequest Type { get; set; } = TypeRequest.ACCEPT;
        public object Response { get; set; } = null;
        public string Message { get; set; } = "Сообщение";
        public string MessageError { get; set; } = "Сообщение об ошибке";
    }
}