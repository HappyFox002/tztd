using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using tztd.Data;
using tztd.ViewModels;

namespace tztd.Models {
    /// <summary>
    /// Сущность учредителя
    /// </summary>
    [Index ("INN", IsUnique = true, Name = "idxINN")]
    [Index ("FullName", IsUnique = true, Name = "idxFullNameClient")]
    [Table ("Founders")]
    public class Founder {
        [Key]
        public int Id { get; set; }

        [MinLength (10)]
        [MaxLength (12)]
        public string INN { get; set; }

        [MinLength(5)]
        [MaxLength (60)]
        public string FullName {get;set;}

        public DateTime DateAppend { get; set; }

        public DateTime DateEdit { get; set; }

        [JsonIgnore]
        public List<Client> Clients { get; set; } = new List<Client>();

        public void UpdateData(FounderModel model) {
            this.INN = model.INN;
            this.FullName = model.FullName;
            this.DateEdit = DateTime.Now;
        }
    }
}