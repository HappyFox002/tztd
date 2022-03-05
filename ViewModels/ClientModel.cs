using System.ComponentModel.DataAnnotations;
using tztd.Data;

namespace tztd.ViewModels
{
    public class ClientModel
    {
        [Required(ErrorMessage = "Не указан ИНН")]
        [StringLength(12, MinimumLength = 10, ErrorMessage = "Длина ИНН должна содержать от 10 до 12 чисел")]
        [RegularExpression(@"^[0-9 ]+$", ErrorMessage = "ИНН может содержать только цифры")]
        public string INN { get; set; }

        [Required(ErrorMessage ="Не указано название или фио")]
        [StringLength(60, MinimumLength = 5, ErrorMessage = "Длина ИНН должна содержать от 10 до 12 чисел")]
        public string FullName { get; set; }

        [Required(ErrorMessage = "Не указан тип организации")]
        public TypeOrgan TypeOrganization { get; set; }
    }
}