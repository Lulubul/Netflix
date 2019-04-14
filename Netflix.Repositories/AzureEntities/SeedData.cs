using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Netflix.Repositories.AzureEntities
{
    public class SeedData : AbstractRepository
    {
        private readonly string _storageConnectionString;

        public SeedData(string storageConnectionString)
        {
            _storageConnectionString = storageConnectionString;
        }

        public async Task AddEntitesAsync()
        {
            var partionKey = Guid.NewGuid().ToString();
            var tvSeries = new List<TvSeriesEntity> {
                new TvSeriesEntity
                {
                    PartitionKey = partionKey,
                    RowKey =  "11c260fe-c2d3-42a2-b5de-edac53f9314b",
                    Name = "One Strange Rock",
                    Description = "",
                    Genres = "822f4ae9-393e-4927-b69d-174c266b5308",
                    Image = "https://occ-0-3032-768.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABRbsXRKRIXU95XgpmgqZzdMVpx1YsqF9Gq0zXsw2bU3HhgFarz98hY6rofzJ2S6CIq12QiDIvnVc-WgiJSmEGbSSdMJ5_ByE.webp?r=939"
                },
                new TvSeriesEntity {
                    PartitionKey = partionKey,
                    RowKey = "5ac12709-0025-4023-95d2-2c4e690acc22",
                    Name = "Flash",
                    Description = "",
                    Genres = "822f4ae9-393e-4927-b69d-174c266b5308",
                    Image = "https://occ-0-3032-768.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABV2Ug2r4TUikHQJypNB8RDj0bSIDgqVO5ZORnchk-54OEWE6G8TuIAcGqqER1Wle5zrRdLs5y8TCD_eQ5Vyv2xqGvveZAEOmjVf8d1kldMLcoHZAd-Ef8bPnsjmhEQFQgA.webp?r=39c"
                },
                new TvSeriesEntity
                {
                    PartitionKey = partionKey,
                    RowKey = "d05fd9c1-0d2a-43e3-9c7d-fcbde028691c",
                    Name = "Super Girl",
                    Description = "",
                    Genres = "822f4ae9-393e-4927-b69d-174c266b5308",
                    Image = "https://occ-0-3032-768.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABXpsefLDl4eR3TIh5VHh5iT4GXHjVHVpjy-Ev8Ag-SNht1ufo4BaHWdxfZS2m6ZxTIUv1BhQLfpUczeUYLV3j58_GcfJBwW_2P06XHDASUysVSYPjLs6iNipPURLwott6A.webp?r=d51",
                },
                new TvSeriesEntity
                {
                    PartitionKey = partionKey,
                    RowKey = "b1e63fda-4f1a-4dd9-a7b1-8fb4757b79c9",
                    Name = "Peaky Blinders",
                    Description = "Thomas schemes to get closer to Billy Kimber at the Cheltenham races, and considers an offer from IRA sympathizers to buy his stolen guns.",
                    Genres = "822f4ae9-393e-4927-b69d-174c266b5308",
                    Image = "https://occ-0-3032-768.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABcXm0tleWsBfN7vL3kOivse8Js183I_MOTU8q3BgSz3bXvvWzFENgDT1LXDUqRtM46fogUSZAqaJugupPcc265hnZk1hfTJm.webp?r=780",
                },
                new TvSeriesEntity
                {
                    PartitionKey = partionKey,
                    RowKey = "4cf3731a-29c2-4af7-b86c-71ef5a934e0d",
                    Name = "Marco Polo",
                    Description = "",
                    Genres = "822f4ae9-393e-4927-b69d-174c266b5308",
                    Image = "https://occ-0-3032-768.1.nflxso.net/dnm/api/v6/0DW6CdE4gYtYx8iy3aj8gs9WtXE/AAAABROUedyDkrdJSH6-uneDRNX2yi_DZAjNXK2-ffA-sJC-nKEtmApyiGzV8Wh6KubaAS47kYAZ1ZVfS-4ctJWSwLaQE7BBtqmM.jpg?r=afb"
                }
            };

            var table = GetTable("tvSeries", _storageConnectionString);
            TableBatchOperation batchOperation = new TableBatchOperation();
            foreach (var entity in tvSeries)
            {
                batchOperation.InsertOrMerge(entity);
            }
            await table.ExecuteBatchAsync(batchOperation);
        }
    }
}
