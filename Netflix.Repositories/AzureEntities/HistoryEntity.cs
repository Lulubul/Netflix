using Microsoft.WindowsAzure.Storage.Table;
using System;

namespace Netflix.Repositories.AzureEntities
{
    public class HistoryEntity : TableEntity
    {
        public string UserId;
        public string ItemId;
        public DateTime Date;
    }
}
