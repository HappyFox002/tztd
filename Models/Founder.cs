using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using tztd.Data;

namespace tztd.Models {
    /// <summary>
    /// Сущность учредителя
    /// </summary>
    [Index ("INN", IsUnique = true, Name = "idxINN")]
    [Table ("Founders")]
    public class Founder {
        [Key]
        public int Id { get; set; }

        [MinLength (10)]
        [MaxLength (12)]
        public string INN { get; set; }

        [MinLength (4)]
        [MaxLength (20)]
        public string Name { get; set; }

        [MinLength (4)]
        [MaxLength (20)]
        public string Surname { get; set; }

        [MinLength (4)]
        [MaxLength (20)]
        public string Patronomyc { get; set; }

        public string FullName {
            get {
                return Surname + " " + Name + " " + Patronomyc;
            }
        }

        public DateTime DateAppend { get; set; }

        public DateTime DateEdit { get; set; }

        public List<Client> Clients { get; set; } = new ();
    }
}