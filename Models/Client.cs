using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using tztd.Data;

namespace tztd.Models {
    /// <summary>
    /// Сущность клиента
    /// </summary>
    [Index ("INN", IsUnique = true, Name = "idxINN")]
    [Index ("Name", IsUnique = true, Name = "idxNameClient")]
    [Table ("Clients")]
    public class Client {
        [Key]
        public int Id { get; set; }

        [MinLength (10)]
        [MaxLength (12)]
        public string INN { get; set; }

        [MaxLength (60)]
        public string Name { get; set; }

        public TypeOrgan TypeOrganization { get; set; }

        public DateTime DateAppend { get; set; }

        public DateTime DateEdit { get; set; }

        public List<Founder> Founders { get; set; } = new ();
    }
}