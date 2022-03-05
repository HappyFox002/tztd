using System.ComponentModel.DataAnnotations;

namespace tztd.ViewModels {
    /// <summary>
    /// Валидация отправленных данных
    /// </summary>
    public class FounderModel {
        [Required(ErrorMessage = "Не указан ИНН")]
        [StringLength(12, MinimumLength = 10, ErrorMessage = "Длина ИНН должна содержать от 10 до 12 чисел")]
        [RegularExpression(@"^[0-9 ]+$", ErrorMessage = "ИНН может содержать только цифры")]
        public string INN { get; set; }

        [Required(ErrorMessage = "Не указан название или ФИО")]
        [StringLength(60, MinimumLength = 5, ErrorMessage = "Длина названия или фио должна быть в диапазоне от 5 до 60")]
        public string FullName { get; set; }
    }
}