using ApiTienda.Repository.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace ApiTienda.Utilis
{
    public class UtilsJwt
    {
        private readonly IConfiguration _configuration;
        public UtilsJwt(IConfiguration configuration)
        {
            this._configuration = configuration;
        }

        public string encriptarSHA256(string texto)
        {
            using (SHA256 _sha256 = SHA256.Create()) {
                byte[] bytes = _sha256.ComputeHash(Encoding.UTF8.GetBytes(texto));
                StringBuilder stringBuilder = new StringBuilder();
                for (int i=0; i< bytes.Length; i++)
                {
                    stringBuilder.Append(bytes[i].ToString("x2"));
                }
                return stringBuilder.ToString();
            }
            
        }

        public string generarJWT(string identifier, string nombre)
        {
            var user = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, identifier),
                new Claim(ClaimTypes.Name, nombre)
            };

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

            var jwtConfig = new JwtSecurityToken(
                claims: user,
                expires: DateTime.UtcNow.AddMinutes(20),
                signingCredentials: credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(jwtConfig);
        }
    }
}
