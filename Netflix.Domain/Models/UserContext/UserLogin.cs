using System.ComponentModel.DataAnnotations;

namespace Netflix.Domain.Models.UserContext
{
    public class UserLogin
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
