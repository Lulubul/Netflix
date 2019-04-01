namespace Netflix.Domain.Models.UserContext
{
    public class UserRegister: Entity
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string PlanId { get; set; }
    }
}
