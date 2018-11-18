using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Netflix.Services;

namespace Netflix.Api.Controllers
{
    public class WatchingListController
    {
        private readonly IWatchingListService _watchingListService;

        public WatchingListController(IWatchingListService watchingListService)
        {
            _watchingListService = watchingListService;
        }
        

    }
}
