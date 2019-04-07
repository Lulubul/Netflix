using System.Threading.Tasks;

namespace Netflix.Services
{
    internal interface IJwtTokenService
    {
        Task<string> CreateToken(string username);
    }
}