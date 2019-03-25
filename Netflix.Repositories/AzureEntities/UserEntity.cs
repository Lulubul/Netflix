using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.WindowsAzure.Storage.Table;

namespace Netflix.Repositories.AzureEntities
{
    public class UserEntity: TableEntity
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string PlanId { get; set; }
    }
}
