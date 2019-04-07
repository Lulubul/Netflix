﻿using System.ComponentModel.DataAnnotations;

namespace Netflix.Domain.Models.UserContext
{
    public class UserRegister: Entity
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string PlanId { get; set; }
    }
}
