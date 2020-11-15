using Microsoft.Azure.Cosmos.Table;
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

        public async Task AddTvSeriesEntitesAsync()
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

        public async Task AddMoviesEntitesAsync()
        {
            var partionKey = Guid.NewGuid().ToString();
            var tvSeries = new List<MovieEntity> {
                new MovieEntity
                {
                    PartitionKey = partionKey,
                    RowKey = Guid.NewGuid().ToString(),
                    Name = "Inside the real narcos",
                    Description = "",
                    Genres = "0b452f44-ffae-41d0-b125-dfee76a2d54a",
                    Image = "https://occ-0-3032-768.1.nflxso.net/dnm/api/v5/rendition/8235889aa78c638456a837ba52c96294bfd5070d/AAAABVMta4Fjh88G4OFYOKqY7dQjOKq2Aj4MGtFihhQaQKpfTCJ6BaLPH35JrZr_7pNHJVyKO1BjJLBqJzSBwBu7JtlqewoLhG2RHmMmnwq5x8Lx2HAE6mW0sqB6OMC9HX8oT8ziRrqs-KsOAZCqGTm446MVprFK5a241WggIGUf80_l4rDJSpPZ-cD-eHJqP6bSqNM3lGVtCQEGj_oVrpR42TG80nkyO0dTFnfg8nnQirC9Np7gOg-FwuZLKzM23bz1LtnWmX5s83YJzYf9bQ.webp"
                },
                new MovieEntity
                {
                    PartitionKey = partionKey,
                    RowKey = Guid.NewGuid().ToString(),
                    Name = "Mowgli the legend of jungle",
                    Description = "",
                    Genres = "0b452f44-ffae-41d0-b125-dfee76a2d54a",
                    Image = "https://occ-0-3032-768.1.nflxso.net/dnm/api/v5/rendition/8235889aa78c638456a837ba52c96294bfd5070d/AAAABXXMR156Hg0LTwBZbdYEpfFzV9DsS14wgrQFCZDa8ohmTWNBg9hk2TBUW8BAkRTOG8BWC_bPaRyMSt1lpYSp0XxdTqPB0X5PK6yZwSpBVYJZZ37oNrNCYhXm2hENCf5gIQ0FYUGkvjOELOqVjs-clHMyay1xvlrmDPt_mYCK7Z0JigMNavAuuHBQ10fZZoVud2zooCchN85_Q-QbHVcslnOwYaE8j66dRtln89TD8G-f41UPHSnvgl6JAiH2jEc5lI3kRSuwNgcoTYc21g.webp"
                },
                new MovieEntity
                {
                    PartitionKey = partionKey,
                    RowKey = Guid.NewGuid().ToString(),
                    Name = "Murder Mointain",
                    Description = "",
                    Genres = "0b452f44-ffae-41d0-b125-dfee76a2d54a",
                    Image = "https://occ-0-3032-768.1.nflxso.net/dnm/api/v5/rendition/8235889aa78c638456a837ba52c96294bfd5070d/AAAABVMta4Fjh88G4OFYOKqY7dQjOKq2Aj4MGtFihhQaQKpfTCJ6BaLPH35JrZr_7pNHJVyKO1BjJLBqJzSBwBu7JtlqewoLhG2RHmMmnwq5x8Lx2HAE6mW0sqB6OMC9HX8oT8ziRrqs-KsOAZCqGTm446MVprFK5a241WggIGUf80_l4rDJSpPZ-cD-eHJqP6bSqNM3lGVtCQEGj_oVrpR42TG80nkyO0dTFnfg8nnQirC9Np7gOg-FwuZLKzM23bz1LtnWmX5s83YJzYf9bQ.webp"
                },
                new MovieEntity
                {
                    PartitionKey = partionKey,
                    RowKey = Guid.NewGuid().ToString(),
                    Name = "Bird Box",
                    Description = "",
                    Genres = "0b452f44-ffae-41d0-b125-dfee76a2d54a",
                    Image = "https://occ-0-3032-768.1.nflxso.net/dnm/api/v5/rendition/8235889aa78c638456a837ba52c96294bfd5070d/AAAABYuRQJDvbcfKyM3lCUKoZb3CnTKIlRktbf9J_87XB9jxtmywOkQYBpPS8dvjtfLPrhGz2vGKmtkhX1_z4UtTDqmt0hey5bRyEV1C7SOZHxz3Qd_VdtqAcchELHedbkRYR2xmDsu3l4gYpU2FjisPtTCuKmvqhuE7Uykf50AmSmXpDkdDXhuKtNrcyDoKjFbkBguqucmFlEBCNXaCDkN3By1dYaSOaCDMUj-e-HxbY0s6lSim4mJxh6v6ASKKna0H8YVT21BKPLGHtkabfw.webp"
                },
                new MovieEntity
                {
                    PartitionKey = partionKey,
                    RowKey = Guid.NewGuid().ToString(),
                    Name = "Watership down",
                    Description = "",
                    Genres = "0b452f44-ffae-41d0-b125-dfee76a2d54a",
                    Image = "https://occ-0-3032-768.1.nflxso.net/dnm/api/v5/rendition/8235889aa78c638456a837ba52c96294bfd5070d/AAAABSaM9rO_DsASwj8LVbgd1WmAZNq-joiIVeDjdaDRY2qQyeRnE7LHsLfVhETAVZz1196lZUuxBf_1AMqqC5TC2Pa1eqJHIEX6zuCMriswa6MQ2AYbULrLVHfeZjLPZA37XDOHC8t1V-3B2A7tWhhbpcL2eZnEkUhjV52XSVagUU87TVv9SOItyf0trLHciooW1js-2jMzRlSRz4XLqTk9O04vRg9q2T4_nnnfjIVscj0x4Xd8aK2zPVvMAyD-n3FqUqg20wDsYVwpo7-mgw.webp"
                }
            };

            var table = GetTable("movies", _storageConnectionString);
            TableBatchOperation batchOperation = new TableBatchOperation();
            foreach (var entity in tvSeries)
            {
                batchOperation.InsertOrMerge(entity);
            }
            await table.ExecuteBatchAsync(batchOperation);
        }
    }
}
