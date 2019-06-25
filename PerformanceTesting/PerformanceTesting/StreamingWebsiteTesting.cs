using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using PerformanceTesting.Pages;
using System;
using System.IO;
using System.Reflection;
using Xunit;

namespace PerformanceTesting
{
    public class StreamingWebsiteTesting
    {
        [Fact]
        public void NavigateToLogin()
        {
            using (var driver = new ChromeDriver(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)))
            {
                StreamingApp homePage = new StreamingApp(driver);
                homePage.Navigate();
                homePage.ClickSignUp();
                homePage.WaitUntilPlansAreLoaded();
                homePage.FillRegisterForm();
                homePage.FillPaymentForm();
                homePage.AddProfile();
                homePage.FindMovie();
                homePage.FindRecommendation();
            }
        }
    }
}
