using System;
using System.Collections.Generic;
using System.Text;

namespace Netflix.Domain.Models.UserContext
{
    public class UserLogin
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
